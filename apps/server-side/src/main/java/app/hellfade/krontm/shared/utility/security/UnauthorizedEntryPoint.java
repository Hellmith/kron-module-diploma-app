/**
 * Определение пакета класса
 */
package app.hellfade.krontm.shared.utility.security;

/**
 * Импорт библиотек
 */
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * Объявление класса UnauthorizedEntryPoint
 * @Component - указывает, что данный класс является компонентом Spring
 */
@Component
public class UnauthorizedEntryPoint implements AuthenticationEntryPoint {

	// Реализация метода commence() интерфейса AuthenticationEntryPoint
	@Override
	public void commence(
		HttpServletRequest request,
		HttpServletResponse response,
		AuthenticationException authException
	) throws IOException, ServletException {
		// Установка кода ошибки и сообщения при ошибке авторизации
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Доступ запрещен");
	}
}
