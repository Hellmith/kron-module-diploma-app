package app.hellfade.krontm.service;

import app.hellfade.krontm.entity.FacilityType;
import java.util.List;
import java.util.Optional;

public interface FacilityTypeService {
	List<FacilityType> getAll();
	Optional<FacilityType> getById(long id);
	FacilityType createWithParam(FacilityType facilityType);
	FacilityType updateByIdAndParam(long id, FacilityType facilityType);
	void deleteById(long id);
}
