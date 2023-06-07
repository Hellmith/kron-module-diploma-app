/**
 * Определение пакета класса
 */
package app.hellfade.krontm.controller.base;

/**
 * Импорт библиотек Logger и LoggerFactory
 */
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Объявление класса BaseController
 */
public class BaseController {

	/**
	 * Использование конструктора Logger и LoggerFactory для создания и настройки конфигурации
	 * логирования по классу, может быть использован для записи логов при работе с контроллером
	 */

	// Объявление экземпляра логгера
	protected Logger logger = LoggerFactory.getLogger(this.getClass());
}
