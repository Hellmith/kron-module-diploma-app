package app.hellfade.krontm.controller;

import app.hellfade.krontm.entity.Script;
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

@RequestMapping("/scripts")
public interface IScriptController {
	@GetMapping
	@Operation(summary = "Получение всех скриптов", tags = "Скрипты")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<List<Script>> getScripts();

	@GetMapping("/{id}")
	@Operation(summary = "Получение скрипта по идентификатору", tags = "Скрипты")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Optional<Script>> getById(@PathVariable("id") long id);

	@PostMapping
	@Operation(summary = "Создание нового скрипта", tags = "Скрипты")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Script> postScript(@RequestBody Script script);

	@PutMapping("/{id}")
	@Operation(summary = "Обновление скрипта по идентификатору", tags = "Скрипты")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Script> putScript(@PathVariable("id") long id, @RequestBody Script script);

	@DeleteMapping("/{id}")
	@Operation(summary = "Удаление скрипта по идентификатору", tags = "Скрипты")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Void> deleteScript(@PathVariable("id") long id);
}
