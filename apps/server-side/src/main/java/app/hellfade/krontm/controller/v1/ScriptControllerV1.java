package app.hellfade.krontm.controller.v1;

import app.hellfade.krontm.controller.IScriptController;
import app.hellfade.krontm.controller.base.BaseController;
import app.hellfade.krontm.entity.Script;
import app.hellfade.krontm.service.ScriptService;
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
public class ScriptControllerV1 extends BaseController implements IScriptController {

	private final ScriptService scriptService;

	@GetMapping
	public ResponseEntity<List<Script>> getScripts() {
		List<Script> data = scriptService.getAll();

		return ResponseEntity.ok(data);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Optional<Script>> getById(@PathVariable long id) {
		Optional<Script> data = scriptService.getById(id);

		return ResponseEntity.ok(data);
	}

	@PostMapping
	public ResponseEntity<Script> postScript(@RequestBody Script script) {
		Script data = scriptService.createWithParam(script);

		return ResponseEntity.ok(data);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Script> putScript(@PathVariable("id") long id, @RequestBody Script script) {
		Script data = scriptService.updateByIdWithParam(id, script);

		return ResponseEntity.ok(data);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteScript(@PathVariable("id") long id) {
		scriptService.deleteById(id);

		return ResponseEntity.ok().build();
	}
}
