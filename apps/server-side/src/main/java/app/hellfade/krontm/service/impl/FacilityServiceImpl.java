package app.hellfade.krontm.service.impl;

import app.hellfade.krontm.entity.Facility;
import app.hellfade.krontm.service.FacilityService;
import app.hellfade.krontm.shared.repository.FacilityRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FacilityServiceImpl implements FacilityService {

	private final FacilityRepository facilityRepository;

	@Autowired
	public FacilityServiceImpl(FacilityRepository facilityRepository) {
		this.facilityRepository = facilityRepository;
	}

	@Override
	public List<Facility> getAll() {
		return facilityRepository.findAll();
	}

	@Override
	public Optional<Facility> getById(long id) {
		return facilityRepository.findById(id);
	}

	@Override
	public Facility createWithParam(Facility facility) {
		return facilityRepository.save(facility);
	}

	@Override
	public Facility updateByIdAndParam(long id, Facility facility) {
		Optional<Facility> optionalFacilityToUpdate = facilityRepository.findById(id);
		Facility facilityToUpdate = optionalFacilityToUpdate.get();

		facilityToUpdate.setName(facility.getName());
		facilityToUpdate.setMode(facility.getMode());
		facilityToUpdate.setCoord_x(facility.getCoord_x());
		facilityToUpdate.setCoord_y(facility.getCoord_y());
		facilityToUpdate.setFacility_type(facility.getFacility_type());
		facilityToUpdate.setScript(facility.getScript());

		return facilityRepository.save(facilityToUpdate);
	}

	@Override
	public void deleteById(long id) {
		facilityRepository.deleteById(id);
	}
}
