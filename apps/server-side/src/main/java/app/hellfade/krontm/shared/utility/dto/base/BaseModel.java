/**
 * Определение пакета класса
 */
package app.hellfade.krontm.shared.utility.dto.base;

/**
 * Импорт библиотек
 */
import java.io.Serializable;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

public class BaseModel implements Serializable {

	@Override
	public String toString() {
		return ReflectionToStringBuilder.toString(this);
	}
}
