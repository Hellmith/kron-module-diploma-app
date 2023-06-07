/**
 * Определение пакета класса
 */
package app.hellfade.krontm.entity;

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
@Table(name = "facilities")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Facility {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Long id;

	private String name;
	private Integer mode;
	private Double coord_x;
	private Double coord_y;

	@ManyToOne
	@JoinColumn(name = "facility_type")
	private FacilityType facility_type;

	@ManyToOne
	@JoinColumn(name = "script", nullable = true)
	private Script script;
}
