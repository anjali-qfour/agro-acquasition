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
@Document(collection = "consignment")
@CompoundIndex(name = "primary_index", def = "{'id' : 1}")
public class Consignment 
{
//	@CompoundIndex(name = "primary_index", def = "{'id' : 1}")
//	@Id
//	private String  id;

	@Id
	@Field("id")
	private String id;
	
	
	@Field("name")
	private String name;
	


	
	@Field("category_id")
	private String category_id;
	

	@Field("type_id")
	private String type_id;
	
	
	@Field("sub_type_id")
	private String sub_type_id;
	
	
	

	@Field("product_rate")
	private double product_rate;
	
	

	@Field("harvest_date")
	private Date harvest_date;
	

	@Field("weight")
	private double weight;
	
	
	
	
	
	

	@Field("transporter_f2h_id")
	private String transporter_f2h_id;
	

	@Field("transporter_f2h_full_name")
	private String transporter_f2h_full_name;
	

	@Field("transporter_f2h_phone")
	private String transporter_f2h_phone;
	

	@Field("transporter_f2h_rate_type")
	private String transporter_f2h_rate_type;
	/**
	 * Weight
	 * unit
	 * upfront
	 */
	
	@Field("transporter_f2h_rate_amount")
	private double transporter_f2h_rate_amount;
	
	
	@Field("transporter_f2h_rate")
	private double transporter_f2h_rate;
	


	@Field("transporter_f2h_invoice_id")
	private String transporter_f2h_invoice_id;
	



	
	
	
	@Field("farmer_id")
	private String farmer_id;
	

	@Field("farmer_full_name")
	private String farmer_full_name;
	

	@Field("farmer_phone")
	private String farmer_phone;
	


	@Field("farmer_payment_amount")
	private String farmer_payment_amount;
	
	

	@Field("farmer_f2h_payment_status")
	private String farmer_f2h_payment_status;

	/*
	 * not_initiated
	 * initiated
	 * failed
	 * completed
	 * disputed
	 * 
	 */

	

	@Field("farmer_invoice_id")
	private String farmer_invoice_id;
	
	
	
	
	
	@Field("create_date")
	private Date createDate;
	
	@Field("update_date")
	private Date updateDate;
	

	
}




