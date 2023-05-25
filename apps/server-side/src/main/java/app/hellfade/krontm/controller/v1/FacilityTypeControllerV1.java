package app.hellfade.krontm.controller.v1;

import app.hellfade.krontm.controller.IFacilityTypeController;
import app.hellfade.krontm.controller.base.BaseController;
import app.hellfade.krontm.entity.FacilityType;
import app.hellfade.krontm.service.FacilityTypeService;
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
public class FacilityTypeControllerV1 extends BaseController implements IFacilityTypeController {

	private final FacilityTypeService facilityTypeService;

	@GetMapping
	public ResponseEntity<List<FacilityType>> getFacilityTypes() {
		List<FacilityType> data = facilityTypeService.getAll();

		return ResponseEntity.ok(data);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Optional<FacilityType>> getFacilityType(@PathVariable long id) {
		Optional<FacilityType> data = facilityTypeService.getById(id);

		return ResponseEntity.ok(data);
	}

	@PostMapping
	public ResponseEntity<FacilityType> postFacilityType(@RequestBody FacilityType facilityType) {
		FacilityType data = facilityTypeService.createWithParam(facilityType);

		return ResponseEntity.ok(data);
	}

	@PutMapping("/{id}")
	public ResponseEntity<FacilityType> putFacilityType(@PathVariable("id") long id, @RequestBody FacilityType facilityType) {
		FacilityType data = facilityTypeService.updateByIdAndParam(id, facilityType);

		return ResponseEntity.ok(data);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteFacilityType(@PathVariable("id") long id) {
		facilityTypeService.deleteById(id);

		return ResponseEntity.ok().build();
	}
}
