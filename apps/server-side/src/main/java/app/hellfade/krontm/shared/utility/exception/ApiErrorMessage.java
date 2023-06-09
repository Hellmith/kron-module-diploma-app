/**
 * Определение пакета класса
 */
package app.hellfade.krontm.shared.utility.exception;

/**
 * Импорт библиотек
 */
import app.hellfade.krontm.shared.utility.exception.validators.Violation;
import java.util.Date;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiErrorMessage {

	private int statusCode;
	private Date timestamp;
	private String message;
	private String description;
	private List<Violation> causes;
}
