package app.hellfade.krontm.controller.v1;

import app.hellfade.krontm.controller.IEventController;
import app.hellfade.krontm.controller.base.BaseController;
import app.hellfade.krontm.entity.Event;
import app.hellfade.krontm.service.EventService;
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
public class EventControllerV1 extends BaseController implements IEventController {

	private final EventService eventService;

	@GetMapping
	public ResponseEntity<List<Event>> getEvents() {
		List<Event> data = eventService.getAll();

		return ResponseEntity.ok(data);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Optional<Event>> getEvent(@PathVariable long id) {
		Optional<Event> data = eventService.getById(id);

		return ResponseEntity.ok(data);
	}

	@PostMapping
	public ResponseEntity<Event> postEvent(@RequestBody Event event) {
		Event data = eventService.createWithParam(event);

		return ResponseEntity.ok(data);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Event> putEvent(@PathVariable("id") long id, @RequestBody Event event) {
		Event data = eventService.updateByIdAndParam(id, event);

		return ResponseEntity.ok(data);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteEvent(@PathVariable("id") long id) {
		eventService.deleteById(id);

		return ResponseEntity.ok().build();
	}
}
