package app.hellfade.krontm.service;

import app.hellfade.krontm.entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
	List<User> getAll();
	Optional<User> getByUsername(String username);
}
