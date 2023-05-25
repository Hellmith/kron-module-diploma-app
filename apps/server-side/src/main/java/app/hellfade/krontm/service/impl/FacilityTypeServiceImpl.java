package app.hellfade.krontm.service.impl;

import app.hellfade.krontm.entity.FacilityType;
import app.hellfade.krontm.service.FacilityTypeService;
import app.hellfade.krontm.shared.repository.FacilityTypeRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FacilityTypeServiceImpl implements FacilityTypeService {

	private final FacilityTypeRepository facilityTypeRepository;

	@Autowired
	public FacilityTypeServiceImpl(FacilityTypeRepository facilityTypeRepository) {
		this.facilityTypeRepository = facilityTypeRepository;
	}

	@Override
	public List<FacilityType> getAll() {
		return facilityTypeRepository.findAll();
	}

	@Override
	public Optional<FacilityType> getById(long id) {
		return facilityTypeRepository.findById(id);
	}

	@Override
	public FacilityType createWithParam(FacilityType facilityType) {
		return facilityTypeRepository.save(facilityType);
	}

	@Override
	public FacilityType updateByIdAndParam(long id, FacilityType facilityType) {
		Optional<FacilityType> optionalFacilityTypeToUpdate = facilityTypeRepository.findById(id);
		FacilityType facilityTypeToUpdate = optionalFacilityTypeToUpdate.get();

		facilityTypeToUpdate.setName(facilityType.getName());
		facilityTypeToUpdate.setShort_name(facilityType.getShort_name());
		facilityTypeToUpdate.setNode_index(facilityType.getNode_index());

		return facilityTypeRepository.save(facilityTypeToUpdate);
	}

	@Override
	public void deleteById(long id) {
		facilityTypeRepository.deleteById(id);
	}
}
