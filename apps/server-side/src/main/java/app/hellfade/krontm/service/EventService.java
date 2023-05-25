package app.hellfade.krontm.service;

import app.hellfade.krontm.entity.Event;
import java.util.List;
import java.util.Optional;

public interface EventService {
	List<Event> getAll();
	Optional<Event> getById(long id);
	Event createWithParam(Event event);
	Event updateByIdAndParam(long id, Event event);
	void deleteById(long id);
}
