/**
 * Определение пакета класса
 */
package app.hellfade.krontm.service.impl;

import app.hellfade.krontm.entity.User;
import app.hellfade.krontm.service.UserService;
import app.hellfade.krontm.shared.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	@Autowired
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public List<User> getAll() {
		return userRepository.findAll();
	}

	@Override
	public Optional<User> getByUsername(String username) {
		return userRepository.findByUsername(username);
	}
}
