/**
 * Определение пакета класса
 */
package app.hellfade.krontm.controller;

import app.hellfade.krontm.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/users")
public interface IUserController {
	@GetMapping
	@Operation(summary = "Получение всех пользователей", tags = "Пользователи")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<List<User>> getUsers();

	@GetMapping("/{username}")
	@Operation(summary = "Получение пользователя по имени", tags = "Пользователи")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<User> getUser(@PathVariable("username") String username);
}
