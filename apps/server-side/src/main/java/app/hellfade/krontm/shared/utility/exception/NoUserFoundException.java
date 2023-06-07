/**
 * Определение пакета класса
 */
package app.hellfade.krontm.shared.utility.exception;

/**
 * Импорт библиотек
 */
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class NoUserFoundException extends UsernameNotFoundException {

	public NoUserFoundException(String username) {
		super(String.format("Пользователь с именем '%s' не найден.", username));
	}
}
