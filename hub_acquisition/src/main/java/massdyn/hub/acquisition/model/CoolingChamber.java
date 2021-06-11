package massdyn.hub.acquisition.model;


import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.DBRef;
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
@Document(collection = "cooling_chamber")
@CompoundIndex(name = "primary_index", def = "{'id' : 1}")
public class CoolingChamber {
	
	@Id
	@Field("id")
	private String id;
	
	
	
	@DBRef(lazy=true)
	List<Consignment> consigment_list;
	
	@Field("cooling_chamber")
	private String cooling_chamber;
	
	@Field("temperature")
	private String temperature;
	


	
	@Field("humidity")
	private String humidity;
	

	@Field("time")
	private String time;
	
	@Field("harvest_date")
	private Date harvest_date;
	
	
	@Field("create_date")
	private Date createDate;
	
	@Field("update_date")
	private Date updateDate;

	@Field("status")
	private String status;

	/*
	 * active
	 * initiated
	 * failed
	 * completed
	 * disputed
	 * 
	 */

	
	
	@Field("type")
	private String type;
	
	
	/*
	 * Group
	 * single
	 * 
	 */
	
	

	@Field("active")
	private boolean active;
	
	
	
	

}
