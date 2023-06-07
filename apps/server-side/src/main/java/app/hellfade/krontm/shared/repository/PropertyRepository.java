/**
 * Определение пакета класса
 */
package app.hellfade.krontm.shared.repository;

/**
 * Импорт библиотек
 */
import app.hellfade.krontm.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {}
