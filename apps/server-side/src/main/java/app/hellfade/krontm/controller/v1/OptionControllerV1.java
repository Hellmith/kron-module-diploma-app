package app.hellfade.krontm.controller.v1;

import app.hellfade.krontm.controller.IOptionController;
import app.hellfade.krontm.controller.base.BaseController;
import app.hellfade.krontm.entity.Option;
import app.hellfade.krontm.service.OptionService;
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
public class OptionControllerV1 extends BaseController implements IOptionController {

	private final OptionService optionService;

	@GetMapping
	public ResponseEntity<List<Option>> getOptions() {
		List<Option> data = optionService.getAll();

		return ResponseEntity.ok(data);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Optional<Option>> getById(@PathVariable long id) {
		Optional<Option> data = optionService.getById(id);

		return ResponseEntity.ok(data);
	}

	@PostMapping
	public ResponseEntity<Option> postOption(@RequestBody Option option) {
		Option data = optionService.createWithParam(option);

		return ResponseEntity.ok(data);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Option> putOption(@PathVariable("id") long id, @RequestBody Option option) {
		Option data = optionService.updateByIdWithParam(id, option);

		return ResponseEntity.ok(data);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteOption(@PathVariable("id") long id) {
		optionService.deleteById(id);

		return ResponseEntity.ok().build();
	}
}
