/**
 * Определение пакета класса
 */
package app.hellfade.krontm.service;

import app.hellfade.krontm.entity.Script;
import java.util.List;
import java.util.Optional;

public interface ScriptService {
	List<Script> getAll();
	Optional<Script> getById(long id);
	Script createWithParam(Script script);
	Script updateByIdWithParam(long id, Script script);
	void deleteById(long id);
}
