package app.hellfade.krontm.controller.v1;

import app.hellfade.krontm.controller.IUserController;
import app.hellfade.krontm.controller.base.BaseController;
import app.hellfade.krontm.entity.User;
import app.hellfade.krontm.service.UserService;
import app.hellfade.krontm.shared.utility.exception.NoUserFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserControllerV1 extends BaseController implements IUserController {

	private final UserService userService;

	@GetMapping
	public ResponseEntity<List<User>> getUsers() {
		return ResponseEntity.ok(userService.getAll());
	}

	@GetMapping("/{username}")
	public ResponseEntity<User> getUser(@PathVariable("username") String username) {
		User aUser = userService.getByUsername(username).orElseThrow(() -> new NoUserFoundException(username));
		return ResponseEntity.ok(aUser);
	}
}
