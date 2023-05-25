package app.hellfade.krontm.shared.utility.dto.response;

import app.hellfade.krontm.shared.utility.dto.base.BaseModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AuthenticationResponse extends BaseModel {

	private String token;
	private String authorities;
}
