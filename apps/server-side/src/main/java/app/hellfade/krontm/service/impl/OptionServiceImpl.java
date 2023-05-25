package app.hellfade.krontm.service.impl;

import app.hellfade.krontm.entity.Option;
import app.hellfade.krontm.service.OptionService;
import app.hellfade.krontm.shared.repository.OptionRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OptionServiceImpl implements OptionService {

	private final OptionRepository optionRepository;

	@Autowired
	public OptionServiceImpl(OptionRepository optionRepository) {
		this.optionRepository = optionRepository;
	}

	@Override
	public List<Option> getAll() {
		return optionRepository.findAll();
	}

	@Override
	public Optional<Option> getById(long id) {
		return optionRepository.findById(id);
	}

	@Override
	public Option createWithParam(Option option) {
		return optionRepository.save(option);
	}

	@Override
	public Option updateByIdWithParam(long id, Option option) {
		Optional<Option> optionalScriptToUpdate = optionRepository.findById(id);
		Option optionToUpdate = optionalScriptToUpdate.get();

		optionToUpdate.setName(option.getName());
		optionToUpdate.setValue(option.getValue());

		return optionRepository.save(optionToUpdate);
	}

	@Override
	public void deleteById(long id) {
		optionRepository.deleteById(id);
	}
}
