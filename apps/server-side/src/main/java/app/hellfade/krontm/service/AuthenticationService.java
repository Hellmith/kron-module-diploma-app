package app.hellfade.krontm.service;

import app.hellfade.krontm.entity.User;
import app.hellfade.krontm.shared.utility.dto.request.AuthenticationRequest;
import app.hellfade.krontm.shared.utility.dto.response.AuthenticationResponse;
import app.hellfade.krontm.shared.utility.dto.response.TokenResponse;

public interface AuthenticationService {
	User registrationUser(AuthenticationRequest authenticationRequest);
	AuthenticationResponse authenticateUser(AuthenticationRequest authenticationRequest);
	TokenResponse refreshUserToken(String token);
}
