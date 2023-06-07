/**
 * Определение пакета класса
 */
package app.hellfade.krontm.shared.repository;

/**
 * Импорт библиотек
 */
import app.hellfade.krontm.entity.FacilityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacilityTypeRepository extends JpaRepository<FacilityType, Long> {}
