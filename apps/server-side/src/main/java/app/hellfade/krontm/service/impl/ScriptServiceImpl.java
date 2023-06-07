/**
 * Определение пакета класса
 */
package app.hellfade.krontm.service.impl;

import app.hellfade.krontm.entity.Script;
import app.hellfade.krontm.service.ScriptService;
import app.hellfade.krontm.shared.repository.ScriptRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScriptServiceImpl implements ScriptService {

	private final ScriptRepository scriptRepository;

	@Autowired
	public ScriptServiceImpl(ScriptRepository scriptRepository) {
		this.scriptRepository = scriptRepository;
	}

	@Override
	public List<Script> getAll() {
		return scriptRepository.findAll();
	}

	@Override
	public Optional<Script> getById(long id) {
		return scriptRepository.findById(id);
	}

	@Override
	public Script createWithParam(Script script) {
		return scriptRepository.save(script);
	}

	@Override
	public Script updateByIdWithParam(long id, Script script) {
		Optional<Script> optionalScriptToUpdate = scriptRepository.findById(id);
		Script scriptToUpdate = optionalScriptToUpdate.get();

		scriptToUpdate.setDesign_web(script.getDesign_web());

		return scriptRepository.save(scriptToUpdate);
	}

	@Override
	public void deleteById(long id) {
		scriptRepository.deleteById(id);
	}
}
