/**
 * Определение пакета класса
 */
package app.hellfade.krontm.shared.configuration;

/**
 * Импорт библиотек
 */
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

@Configuration
public class OpenApi30Configuration {

	private final String X_AUTH_TOKEN = "X-Auth-Token";
	private final String API_TITLE = StringUtils.capitalize("КРОН-ТМ Модуль");

	@Bean
	public OpenAPI OpenAPI() {
		return new OpenAPI()
			.info(new Info().title(String.format("%s API", API_TITLE)).version("v1"))
			.components(
				new Components()
					.addSecuritySchemes(X_AUTH_TOKEN, new SecurityScheme().name(X_AUTH_TOKEN).type(SecurityScheme.Type.APIKEY).in(SecurityScheme.In.HEADER))
			)
			.addSecurityItem(new SecurityRequirement().addList(X_AUTH_TOKEN));
	}
}
