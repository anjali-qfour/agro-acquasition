package massdyn.hub.acquisition.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
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
@Document(collection = "farmer_invoice")
@CompoundIndex(name = "primary_index", def = "{'id' : 1}")
public class FarmerInvoice
{

	@Id
	@Field("id")
	private String id;
	

	@Field("consignment_id")
	private String consignment_id;
	
	

	@Field("farmer_id")
	private String farmer_id;

	
	
	
	@Field("full_name")
	private String full_name;
	

	
	@Field("phone")
	private String phone;
	
	
	
	
	@Field("weight")
	private double weight;

	@Field("rate")
	private double rate;
	
	
	
	@Field("category_id")
	private String category_id;
	

	@Field("type_id")
	private String type_id;
	
	
	@Field("sub_type_id")
	private String sub_type_id;
	
	

	@Field("payment_amount")
	private double payment_amount;
	
	

	@Field("status")
	private String status;

	/*
	 * not_initiated
	 * initiated
	 * failed
	 * completed
	 * disputed
	 * 
	 */

	
	
	
	
	@Field("create_date")
	private Date createDate;
	
	@Field("update_date")
	private Date updateDate;
	


}
