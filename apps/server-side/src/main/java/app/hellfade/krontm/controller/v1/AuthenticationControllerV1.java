package app.hellfade.krontm.controller.v1;

import app.hellfade.krontm.controller.IAuthenticationController;
import app.hellfade.krontm.controller.base.BaseController;
import app.hellfade.krontm.entity.User;
import app.hellfade.krontm.service.AuthenticationService;
import app.hellfade.krontm.shared.utility.dto.request.AuthenticationRequest;
import app.hellfade.krontm.shared.utility.dto.response.AuthenticationResponse;
import app.hellfade.krontm.shared.utility.dto.response.TokenResponse;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class AuthenticationControllerV1 extends BaseController implements IAuthenticationController {

	@Value("${hellfade.token.header}")
	private String tokenHeader;

	private final AuthenticationService authenticationService;

	@Override
	public ResponseEntity<User> registrationRequest(AuthenticationRequest request) {
		return new ResponseEntity<User>(this.authenticationService.registrationUser(request), HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<AuthenticationResponse> authenticationRequest(AuthenticationRequest request) {
		return ResponseEntity.ok(this.authenticationService.authenticateUser(request));
	}

	@Override
	public ResponseEntity<TokenResponse> refreshTokenRequest(HttpServletRequest request) {
		return ResponseEntity.ok(this.authenticationService.refreshUserToken(request.getHeader(tokenHeader)));
	}
}
