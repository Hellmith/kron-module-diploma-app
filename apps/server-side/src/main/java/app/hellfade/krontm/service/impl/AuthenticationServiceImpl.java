/**
 * Определение пакета класса
 */
package app.hellfade.krontm.service.impl;

import app.hellfade.krontm.entity.User;
import app.hellfade.krontm.model.user.SecurityUser;
import app.hellfade.krontm.service.AuthenticationService;
import app.hellfade.krontm.shared.repository.UserRepository;
import app.hellfade.krontm.shared.utility.dto.request.AuthenticationRequest;
import app.hellfade.krontm.shared.utility.dto.response.AuthenticationResponse;
import app.hellfade.krontm.shared.utility.dto.response.TokenResponse;
import app.hellfade.krontm.shared.utility.security.TokenUtils;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

	private final AuthenticationManager authenticationManager;
	private final TokenUtils tokenUtils;
	private final UserDetailsService userDetailsService;
	private final UserRepository userRepository;

	@Autowired
	public AuthenticationServiceImpl(
		AuthenticationManager authenticationManager,
		TokenUtils tokenUtils,
		UserDetailsService userDetailsService,
		UserRepository userRepository
	) {
		this.authenticationManager = authenticationManager;
		this.tokenUtils = tokenUtils;
		this.userDetailsService = userDetailsService;
		this.userRepository = userRepository;
	}

	public User registrationUser(AuthenticationRequest request) {
		userRepository
			.findByUsername(request.getUsername())
			.ifPresent(user -> {
				throw new IllegalStateException("Пользователь с указанным именем пользователя уже существует");
			});

		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String hashedPassword = passwordEncoder.encode(request.getPassword());

		User newUser = User
			.builder()
			.username(request.getUsername())
			.password(hashedPassword)
			.lastPasswordReset(new Date())
			.authorities(userRepository.count() == 0 ? "ADMIN" : "USER")
			.build();

		return userRepository.save(newUser);
	}

	public AuthenticationResponse authenticateUser(AuthenticationRequest request) {
		try {
			Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
			);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
			String token = tokenUtils.generateToken(userDetails, request.getDevice());
			String authority = userDetails.getAuthorities().iterator().next().getAuthority();

			return new AuthenticationResponse(token, authority);
		} catch (AuthenticationException e) {
			throw new BadCredentialsException("Неверное имя пользователя или пароль.");
		}
	}

	public TokenResponse refreshUserToken(String token) {
		String username = tokenUtils.getUsernameFromToken(token);
		SecurityUser user = (SecurityUser) userDetailsService.loadUserByUsername(username);

		if (tokenUtils.canTokenBeRefreshed(token, user.getLastPasswordReset())) {
			return new TokenResponse(tokenUtils.refreshUserToken(token));
		}

		return new TokenResponse();
	}
}
