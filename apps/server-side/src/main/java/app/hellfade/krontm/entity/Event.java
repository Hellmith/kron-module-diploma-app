/**
 * Определение пакета класса
 */
package app.hellfade.krontm.entity;

import app.hellfade.krontm.entity.base.BaseEntity;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "events")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Long id;

	private String name;
	private Double value;

	private LocalDateTime date_arrival;
	private LocalDateTime date_confirm;

	@ManyToOne
	@JoinColumn(name = "facility")
	private Facility facility;

	@ManyToOne
	@JoinColumn(name = "property")
	private Property property;
}
