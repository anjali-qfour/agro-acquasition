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
@Document(collection = "vendor_payment")
@CompoundIndex(name = "primary_index", def = "{'id' : 1}")
public class VendorPayment 
{
//	@CompoundIndex(name = "primary_index", def = "{'id' : 1}")
//	@Id
//	private String  id;

	@Id
	@Field("id")
	private String id;
	
	
	

	@Field("type")
	private String type;
	

	
	

	@Field("payment_index")
	private String payment_index;
	
	
	
	@Field("bank_name")
	private String bank_name;
	

	
	@Field("branch_name")
	private String branch_name;
	
	@Field("ifsc_code")
	private String ifsc_code;
	
	

	@Field("account_name")
	private String account_name;


	@Field("account_number")
	private String account_number;



	@Field("gst_number")
	private String gst_number;


	
	
	
	
	@Field("create_date")
	private Date createDate;
	
	@Field("update_date")
	private Date updateDate;
	

	
}




