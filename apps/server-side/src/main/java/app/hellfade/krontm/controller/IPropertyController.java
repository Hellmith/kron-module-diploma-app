package app.hellfade.krontm.controller;

import app.hellfade.krontm.entity.Property;
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

@RequestMapping("/properties")
public interface IPropertyController {
	@GetMapping
	@Operation(summary = "Получение всех свойств", tags = "Свойства")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<List<Property>> getProperties();

	@GetMapping("/{id}")
	@Operation(summary = "Получение свойства по идентификатору", tags = "Свойства")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Optional<Property>> getProperty(@PathVariable("id") long id);

	@PostMapping
	@Operation(summary = "Создание нового свойства", tags = "Свойства")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Property> postProperty(@RequestBody Property property);

	@PutMapping("/{id}")
	@Operation(summary = "Обновление свойства по идентификатору", tags = "Свойства")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Property> putProperty(@PathVariable("id") long id, @RequestBody Property property);

	@DeleteMapping("/{id}")
	@Operation(summary = "Удаление свойства по идентификатору", tags = "Свойства")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Void> deleteProperty(@PathVariable("id") long id);
}
