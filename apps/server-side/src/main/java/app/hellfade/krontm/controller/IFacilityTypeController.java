/**
 * Определение пакета класса
 */
package app.hellfade.krontm.controller;

import app.hellfade.krontm.entity.FacilityType;
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

@RequestMapping("/facility-types")
public interface IFacilityTypeController {
	@GetMapping
	@Operation(summary = "Получение всех типа объекта", tags = "Типы объекта")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<List<FacilityType>> getFacilityTypes();

	@GetMapping("/{id}")
	@Operation(summary = "Получение типа объекта по идентификатору", tags = "Типы объекта")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Optional<FacilityType>> getFacilityType(@PathVariable("id") long id);

	@PostMapping
	@Operation(summary = "Создание нового типов объекта", tags = "Типы объекта")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<FacilityType> postFacilityType(@RequestBody FacilityType facilityType);

	@PutMapping("/{id}")
	@Operation(summary = "Обновление типа объекта по идентификатору", tags = "Типы объекта")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<FacilityType> putFacilityType(@PathVariable("id") long id, @RequestBody FacilityType facilityType);

	@DeleteMapping("/{id}")
	@Operation(summary = "Удаление типа объекта по идентификатору", tags = "Типы объекта")
	@ApiResponse(responseCode = "200", description = "Успешно")
	ResponseEntity<Void> deleteFacilityType(@PathVariable("id") long id);
}
