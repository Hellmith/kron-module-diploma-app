/**
 * Определение пакета класса
 */
package app.hellfade.krontm.shared.utility.exception;

/**
 * Импорт библиотек
 */
import java.util.Date;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class NoUserFoundAdvice {

	@ExceptionHandler(NoUserFoundException.class)
	public ResponseEntity<ApiErrorMessage> resourceNotFoundException(NoUserFoundException ex, WebRequest request) {
		ApiErrorMessage message = ApiErrorMessage
			.builder()
			.statusCode(HttpStatus.NOT_FOUND.value())
			.timestamp(new Date())
			.message(ex.getMessage())
			.description(request.getDescription(false))
			.build();
		return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
	}
}
