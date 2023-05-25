package app.hellfade.krontm.controller.v1;

import app.hellfade.krontm.controller.IPropertyController;
import app.hellfade.krontm.controller.base.BaseController;
import app.hellfade.krontm.entity.Property;
import app.hellfade.krontm.service.PropertyService;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PropertyControllerV1 extends BaseController implements IPropertyController {

	private final PropertyService propertyService;

	@GetMapping
	public ResponseEntity<List<Property>> getProperties() {
		List<Property> data = propertyService.getAll();

		return ResponseEntity.ok(data);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Optional<Property>> getProperty(@PathVariable long id) {
		Optional<Property> data = propertyService.getById(id);

		return ResponseEntity.ok(data);
	}

	@PostMapping
	public ResponseEntity<Property> postProperty(@RequestBody Property property) {
		Property data = propertyService.createWithParam(property);

		return ResponseEntity.ok(data);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Property> putProperty(@PathVariable("id") long id, @RequestBody Property property) {
		Property data = propertyService.updateByIdAndParam(id, property);

		return ResponseEntity.ok(data);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteProperty(@PathVariable("id") long id) {
		propertyService.deleteById(id);

		return ResponseEntity.ok().build();
	}
}
