package app.hellfade.krontm.model.user;

import app.hellfade.krontm.entity.User;
import org.springframework.security.core.authority.AuthorityUtils;

public class UserFactory {

	public static SecurityUser create(User user) {
		return new SecurityUser(
			user.getId(),
			user.getUsername(),
			user.getPassword(),
			user.getLastPasswordReset(),
			AuthorityUtils.commaSeparatedStringToAuthorityList(user.getAuthorities())
		);
	}
}
