/**
 * Определение пакета класса
 */
package app.hellfade.krontm.shared.repository;

/**
 * Импорт библиотек
 */
import app.hellfade.krontm.entity.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionRepository extends JpaRepository<Option, Long> {}
