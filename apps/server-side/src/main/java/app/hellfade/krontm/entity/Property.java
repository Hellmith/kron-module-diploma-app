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
@Table(name = "properties")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Property {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Long id;

	private String name;
	private String description;
	private String value;
	private String unit;
	private Boolean is_fast;
	private Boolean is_visible;
	private String color;

	@ManyToOne
	@JoinColumn(name = "option")
	private Option option;

	@ManyToOne
	@JoinColumn(name = "facility")
	private Facility facility;
}
