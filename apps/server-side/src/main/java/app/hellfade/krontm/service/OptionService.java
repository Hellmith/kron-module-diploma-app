/**
 * Определение пакета класса
 */
package app.hellfade.krontm.service;

import app.hellfade.krontm.entity.Option;
import java.util.List;
import java.util.Optional;

public interface OptionService {
	List<Option> getAll();
	Optional<Option> getById(long id);
	Option createWithParam(Option option);
	Option updateByIdWithParam(long id, Option option);
	void deleteById(long id);
}
