/**
 * Определение пакета класса
 */
package app.hellfade.krontm.service;

import app.hellfade.krontm.entity.Property;
import java.util.List;
import java.util.Optional;

public interface PropertyService {
	List<Property> getAll();
	Optional<Property> getById(long id);
	Property createWithParam(Property property);
	Property updateByIdAndParam(long id, Property property);
	void deleteById(long id);
}
