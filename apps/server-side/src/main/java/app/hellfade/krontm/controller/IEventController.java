package app.hellfade.krontm.controller;

import app.hellfade.krontm.entity.Event;
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

@RequestMapping("/events")
public interface IEventController {
	@GetMapping
	@Operation(summary = "Получение всех событий", tags = "События")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<List<Event>> getEvents();

	@GetMapping("/{id}")
	@Operation(summary = "Получение события по идентификатору", tags = "События")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Optional<Event>> getEvent(@PathVariable("id") long id);

	@PostMapping
	@Operation(summary = "Создание нового события", tags = "События")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Event> postEvent(@RequestBody Event event);

	@PutMapping("/{id}")
	@Operation(summary = "Обновление события по идентификатору", tags = "События")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Event> putEvent(@PathVariable("id") long id, @RequestBody Event event);

	@DeleteMapping("/{id}")
	@Operation(summary = "Удаление события по идентификатору", tags = "События")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Void> deleteEvent(@PathVariable("id") long id);
}
