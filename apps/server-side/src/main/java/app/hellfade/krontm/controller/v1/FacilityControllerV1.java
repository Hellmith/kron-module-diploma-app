package app.hellfade.krontm.controller.v1;

import app.hellfade.krontm.controller.IFacilityController;
import app.hellfade.krontm.controller.base.BaseController;
import app.hellfade.krontm.entity.Facility;
import app.hellfade.krontm.service.FacilityService;
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
public class FacilityControllerV1 extends BaseController implements IFacilityController {

	private final FacilityService facilityService;

	@GetMapping
	public ResponseEntity<List<Facility>> getFacilities() {
		List<Facility> data = facilityService.getAll();

		return ResponseEntity.ok(data);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Optional<Facility>> getFacility(@PathVariable long id) {
		Optional<Facility> data = facilityService.getById(id);

		return ResponseEntity.ok(data);
	}

	@PostMapping
	public ResponseEntity<Facility> postFacility(@RequestBody Facility facility) {
		Facility data = facilityService.createWithParam(facility);

		return ResponseEntity.ok(data);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Facility> putFacility(@PathVariable("id") long id, @RequestBody Facility facility) {
		Facility data = facilityService.updateByIdAndParam(id, facility);

		return ResponseEntity.ok(data);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteFacility(@PathVariable("id") long id) {
		facilityService.deleteById(id);

		return ResponseEntity.ok().build();
	}
}
