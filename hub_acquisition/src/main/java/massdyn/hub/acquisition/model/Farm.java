package massdyn.hub.acquisition.model;

import java.io.Serializable;
import java.sql.Timestamp;
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
@Document(collection = "farm")
@CompoundIndex(name = "primary_index", def = "{'id' : 1}")
public class Farm 
{
//	@CompoundIndex(name = "primary_index", def = "{'id' : 1}")
//	@Id
//	private String  id;

	@Id
	@Field("id")
	private String id;
	
	
	@Field("farmer_id")
	private String farmer_id;

	@Field("farm_index")
	private String farm_index;
	
	
	
	@Field("farm_area")
	private String farm_area;
	

	
	@Field("irrigation_type")
	private String irrigation_type;
	
	@Field("fertilizer")
	private String fertilizer;
	
	

	@Field("insecticides")
	private String insecticides;


	@Field("seeds_used")
	private String seeds_used;



	@Field("weather_predictions_source")
	private String weather_predictions_source;


	@Field("market_information_source")
	private String market_information_source;
	
	

	@Field("weather_predictions_useful")
	private String weather_predictions_useful;


	@Field("market_information_useful")
	private String market_information_useful;
	
	

	@Field("farm_address")
	private String farm_address;


	@Field("farm_pincode")
	private String farm_pincode;
	
	
	
	

	@Field("create_ts")
	private Timestamp create_ts;
	
	@Field("update_ts")
	private Timestamp update_ts;
	

	
	
}




