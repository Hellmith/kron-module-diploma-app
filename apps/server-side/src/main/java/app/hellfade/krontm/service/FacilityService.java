package app.hellfade.krontm.service;

import app.hellfade.krontm.entity.Facility;
import java.util.List;
import java.util.Optional;

public interface FacilityService {
	List<Facility> getAll();
	Optional<Facility> getById(long id);
	Facility createWithParam(Facility facility);
	Facility updateByIdAndParam(long id, Facility facility);
	void deleteById(long id);
}
