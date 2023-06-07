/**
 * Определение пакета класса
 */
package app.hellfade.krontm.entity;

import app.hellfade.krontm.entity.base.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "facility_types")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FacilityType extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Long id;

	private String name;
	private String short_name;
	private Integer node_index;
}
