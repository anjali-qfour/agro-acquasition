package massdyn.hub.acquisition.model;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
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
public class FarmerJson implements Serializable
{

//	@Id
//	public String  id;

	public String id;
	
	
	public String name;
	

	
	public String surname;
	
	public String phone;
	
	

	public String home_address;


	public String home_pincode;



	public String aadhar_card_num;


	public String pan_card_num;
	
	

	public String relative_list;
	
	public String farm_list;
	
	public String deleted_farm_id_list;
	
	
	
	
	
	
	public String vendor_payment_list;

	
	

    
    
	public Timestamp create_ts;
	
	public Timestamp update_ts;
	

	
}




