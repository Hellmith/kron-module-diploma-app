/**
 * Определение пакета класса
 */
package app.hellfade.krontm.shared.utility.dto.request;

/**
 * Импорт библиотек
 */
import app.hellfade.krontm.shared.utility.dto.base.BaseModel;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationRequest extends BaseModel {

	@NotNull(message = "Необходимо указать имя пользователя")
	private String username;

	@NotNull(message = "Необходимо указать пароль")
	private String password;

	@NotNull(message = "Устройство не объявлено")
	private String device;
}
