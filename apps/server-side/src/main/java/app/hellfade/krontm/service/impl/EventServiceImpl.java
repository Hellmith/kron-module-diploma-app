package app.hellfade.krontm.service.impl;

import app.hellfade.krontm.entity.Event;
import app.hellfade.krontm.service.EventService;
import app.hellfade.krontm.shared.repository.EventRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventServiceImpl implements EventService {

	private final EventRepository eventRepository;

	@Autowired
	public EventServiceImpl(EventRepository eventRepository) {
		this.eventRepository = eventRepository;
	}

	@Override
	public List<Event> getAll() {
		return eventRepository.findAll();
	}

	@Override
	public Optional<Event> getById(long id) {
		return eventRepository.findById(id);
	}

	@Override
	public Event createWithParam(Event event) {
		return eventRepository.save(event);
	}

	@Override
	public Event updateByIdAndParam(long id, Event event) {
		Optional<Event> optionalEventToUpdate = eventRepository.findById(id);
		Event eventToUpdate = optionalEventToUpdate.get();

		eventToUpdate.setName(event.getName());
		eventToUpdate.setValue(event.getValue());
		eventToUpdate.setDate_confirm(event.getDate_confirm());

		return eventRepository.save(eventToUpdate);
	}

	@Override
	public void deleteById(long id) {
		eventRepository.deleteById(id);
	}
}
