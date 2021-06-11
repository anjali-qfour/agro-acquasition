package massdyn.hub.acquisition.model;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "relative")
public class Relative 
{

	@Id
	private String id;
	

	
	@Field("farmer_id")
	private String farmer_id;

	@Field("name")
	private String name;
	

	
	@Field("relation")
	private String relation;
	
	@Field("age")
	private double age;
	
	

	@Field("education")
	private String education;
	
	
	
	
	
	
	
	@Field("create_ts")
	private Timestamp create_ts;
	
	@Field("update_ts")
	private Timestamp update_ts;
	
	
}
