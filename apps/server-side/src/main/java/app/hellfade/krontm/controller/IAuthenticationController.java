package app.hellfade.krontm.controller;

import app.hellfade.krontm.entity.User;
import app.hellfade.krontm.shared.utility.dto.request.AuthenticationRequest;
import app.hellfade.krontm.shared.utility.dto.response.AuthenticationResponse;
import app.hellfade.krontm.shared.utility.dto.response.TokenResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/auth")
public interface IAuthenticationController {
	@PostMapping("/register")
	@SecurityRequirements
	@Operation(summary = "Регистрация пользователя", tags = "Авторизация")
	@ApiResponse(responseCode = "200", description = "Успешная регистрация")
	ResponseEntity<User> registrationRequest(@RequestBody @Valid AuthenticationRequest request);

	@PostMapping
	@SecurityRequirements
	@Operation(summary = "Авторизация пользователя", tags = "Авторизация")
	@ApiResponse(responseCode = "200", description = "Успешная авторизация")
	ResponseEntity<AuthenticationResponse> authenticationRequest(@RequestBody @Valid AuthenticationRequest request);

	@GetMapping("/refresh")
	@Operation(summary = "Обновление токена пользователя", tags = "Авторизация")
	@ApiResponse(responseCode = "200", description = "Успешное обновление токена")
	ResponseEntity<TokenResponse> refreshTokenRequest(HttpServletRequest request);
}
