package massdyn.hub.acquisition.model;

import java.io.Serializable;
import java.sql.Timestamp;
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
@Document(collection = "transporter_f2h_invoice")
@CompoundIndex(name = "primary_index", def = "{'id' : 1}")
public class TransporterF2HInvoice
{

//	@Id
//	private String id;

	@Id
	@Field("id")
	private String id;
	
	
	
	@DBRef(lazy=true)
	List<TransporterF2HInvoice> transporterF2HInvoiceList;
	


	@Field("consignment_id")
	private String consignment_id;
	
	

	@Field("transporter_f2h_id")
	private String transporter_f2h_id;
	
	

	@Field("full_name")
	private String full_name;
	
	
	@Field("phone")
	private String phone;
	
	

	
	@Field("weight")
	private double weight;
	
	
	
	
	@Field("rate_type")
	private String rate_type;
	/**
	 * weight
	 * unit
	 * upfront
	 */
	

	
	@Field("rate_amount")
	private double rate_amount;
	
	

	
	@Field("rate")
	private double rate;
	
	
	

	@Field("payment_amount")
	private double payment_amount;
	
	
	


	@Field("product_type")
	private String product_type;
	
	
	

	@Field("status")
	private String status;

	/*
	 * pending
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
	
	
	
	
	
	
	
	
	
	@Field("create_date")
	private Date createDate;
	
	@Field("update_date")
	private Date updateDate;
	


	
	
}




