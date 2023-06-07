/**
 * Определение пакета класса
 */
package app.hellfade.krontm.controller;

import app.hellfade.krontm.entity.Option;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/options")
public interface IOptionController {
	@GetMapping
	@Operation(summary = "Получение всех опций", tags = "Опции")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<List<Option>> getOptions();

	@GetMapping("/{id}")
	@Operation(summary = "Получение опции по идентификатору", tags = "Опции")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Optional<Option>> getById(@PathVariable("id") long id);

	@PostMapping
	@Operation(summary = "Создание новой опции", tags = "Опции")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Option> postOption(@RequestBody Option option);

	@PutMapping("/{id}")
	@Operation(summary = "Обновление опции по идентификатору", tags = "Опции")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Option> putOption(@PathVariable("id") long id, @RequestBody Option option);

	@DeleteMapping("/{id}")
	@Operation(summary = "Удаление опции по идентификатору", tags = "Опции")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Void> deleteOption(@PathVariable("id") long id);
}
