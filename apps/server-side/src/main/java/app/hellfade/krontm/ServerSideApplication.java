/**
 * Определение пакета класса
 */
package app.hellfade.krontm;

/**
 * Импорт библиотек
 */
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Объявление класса ServerSideApplication
 */
@SpringBootApplication
public class ServerSideApplication {

	// Объявление метода main
	public static void main(String[] args) {
		// Запуск приложения Spring Boot на сервере
		SpringApplication.run(ServerSideApplication.class, args);
	}
}
