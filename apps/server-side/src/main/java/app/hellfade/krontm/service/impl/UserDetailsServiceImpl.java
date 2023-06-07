/**
 * Определение пакета класса
 */
package app.hellfade.krontm.service.impl;

import app.hellfade.krontm.model.user.UserFactory;
import app.hellfade.krontm.shared.repository.UserRepository;
import app.hellfade.krontm.shared.utility.exception.NoUserFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	private final UserRepository userRepository;

	@Autowired
	public UserDetailsServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return userRepository.findByUsername(username).map(UserFactory::create).orElseThrow(() -> new NoUserFoundException(username));
	}
}
