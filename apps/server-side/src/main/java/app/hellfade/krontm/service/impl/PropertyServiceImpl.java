package app.hellfade.krontm.service.impl;

import app.hellfade.krontm.entity.Property;
import app.hellfade.krontm.service.PropertyService;
import app.hellfade.krontm.shared.repository.PropertyRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PropertyServiceImpl implements PropertyService {

	private final PropertyRepository propertyRepository;

	@Autowired
	public PropertyServiceImpl(PropertyRepository propertyRepository) {
		this.propertyRepository = propertyRepository;
	}

	@Override
	public List<Property> getAll() {
		return propertyRepository.findAll();
	}

	@Override
	public Optional<Property> getById(long id) {
		return propertyRepository.findById(id);
	}

	@Override
	public Property createWithParam(Property property) {
		return propertyRepository.save(property);
	}

	@Override
	public Property updateByIdAndParam(long id, Property property) {
		Optional<Property> optionalPropertyToUpdate = propertyRepository.findById(id);
		Property propertyToUpdate = optionalPropertyToUpdate.get();

		propertyToUpdate.setDescription(property.getDescription());
		propertyToUpdate.setName(property.getName());
		propertyToUpdate.setIs_visible(property.getIs_visible());
		propertyToUpdate.setValue(property.getValue());
		propertyToUpdate.setUnit(property.getUnit());
		propertyToUpdate.setIs_fast(property.getIs_fast());
		propertyToUpdate.setColor(property.getColor());
		propertyToUpdate.setOption(property.getOption());

		return propertyRepository.save(propertyToUpdate);
	}

	@Override
	public void deleteById(long id) {
		propertyRepository.deleteById(id);
	}
}
