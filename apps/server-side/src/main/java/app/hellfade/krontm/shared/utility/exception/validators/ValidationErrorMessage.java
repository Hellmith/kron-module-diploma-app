/**
 * Определение пакета класса
 */
package app.hellfade.krontm.shared.utility.exception.validators;

/**
 * Импорт библиотек
 */
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ValidationErrorMessage {

	private List<Violation> violations = new ArrayList<>();
}
