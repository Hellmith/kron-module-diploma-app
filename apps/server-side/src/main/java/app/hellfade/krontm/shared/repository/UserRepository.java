/**
 * Определение пакета класса
 */
package app.hellfade.krontm.shared.repository;

/**
 * Импорт библиотек
 */
import app.hellfade.krontm.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);
	boolean existsByUsername(String username);
}
