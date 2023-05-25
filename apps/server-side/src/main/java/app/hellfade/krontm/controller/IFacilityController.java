package app.hellfade.krontm.controller;

import app.hellfade.krontm.entity.Facility;
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

@RequestMapping("/facilities")
public interface IFacilityController {
	@GetMapping
	@Operation(summary = "Получение всех объектов", tags = "Объекты")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<List<Facility>> getFacilities();

	@GetMapping("/{id}")
	@Operation(summary = "Получение объекта по идентификатору", tags = "Объекты")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Optional<Facility>> getFacility(@PathVariable("id") long id);

	@PostMapping
	@Operation(summary = "Создание нового объекта", tags = "Объекты")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Facility> postFacility(@RequestBody Facility facility);

	@PutMapping("/{id}")
	@Operation(summary = "Обновление объекта по идентификатору", tags = "Объекты")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Facility> putFacility(@PathVariable("id") long id, @RequestBody Facility facility);

	@DeleteMapping("/{id}")
	@Operation(summary = "Удаление объекта по идентификатору", tags = "Объекты")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Void> deleteFacility(@PathVariable("id") long id);
}
