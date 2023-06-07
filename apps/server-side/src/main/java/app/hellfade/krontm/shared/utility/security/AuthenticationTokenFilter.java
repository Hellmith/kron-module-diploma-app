/**
 * Определение пакета класса
 */
package app.hellfade.krontm.shared.utility.security;

/**
 * Импорт библиотек
 */
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

/**
 * Объявление класса AuthenticationTokenFilter
 * @RequiredArgsConstructor - помечает конструктор с обязательными проинициализированными полями
 */
@RequiredArgsConstructor
public class AuthenticationTokenFilter extends UsernamePasswordAuthenticationFilter {

	// Внедряем значение из файла конфигурации с именем из переменной
	@Value("${hellfade.token.header}")
	private String tokenHeader;

	// Поля класса инжектируются через конструктор
	private final TokenUtils tokenUtils;
	private final UserDetailsService userDetailsService;

	// Объявляем метод фильтрации
	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
		throws IOException, ServletException {
		// Приводим запрос к HTTP-запросу для получения заголовка
		HttpServletRequest httpRequest = (HttpServletRequest) req;
		// Получаем токен из заголовка
		String token = httpRequest.getHeader(tokenHeader);
		// Получаем имя пользователя из токена
		String username = tokenUtils.getUsernameFromToken(token);
		// Проверяем, что имя существует и пользователь не авторизован
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			// Загружаем детали пользователя по имени
			UserDetails details = userDetailsService.loadUserByUsername(username);
			// Валидируем токен
			if (tokenUtils.validateToken(token, details)) {
				// Создаем аутентификацию на основе данных о пользователе
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
					details,
					null,
					details.getAuthorities()
				);
				// Устанавливаем созданную аутентификацию в контекст безопасности приложения
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}
		// Вызываем следующий фильтр в цепочке
		chain.doFilter(req, res);
	}
}
