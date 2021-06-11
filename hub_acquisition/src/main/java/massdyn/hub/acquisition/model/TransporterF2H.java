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
@Document(collection = "transporter_f2h")
@CompoundIndex(name = "primary_index", def = "{'id' : 1}")
public class TransporterF2H implements Serializable 
{

//	@Id
//	private String id;

	@Id
	@Field("id")
	private String id;
	
	
	@Field("name")
	private String name;
	

	
	@Field("surname")
	private String surname;
	
	@Field("phone")
	private String phone;

	@Field("vehicle_number")
	private String vehicle_number;
	
	@Field("company_name")
	private String company_name;
	

	
	@Field("company_address")
	private String company_address;
	
	@Field("company_pincode")
	private String company_pincode;
	
	
	


	

	@DBRef(lazy=true)
    private List<VendorPayment> vendor_payment_list;
	
	@Field("deleted_vendor_payment_list")
	private List<String> deleted_vendor_payment_list;
	
	
	
	
	
	


	@Field("aadhar_card_num")
	private String aadhar_card_num;

	@Field("aadhar_card_file_list")
	private List<String> aadhar_card_file_list;
	
	
	
	@Field("pan_card_num")
	private String pan_card_num;
	
	@Field("pan_card_file_list")
	private List<String> pan_card_file_list;
	

	@Field("driving_licence_file_list")
	private List<String> driving_licence_file_list;

	
	
	
	
	
	@Field("create_date")
	private Date createDate;
	
	@Field("update_date")
	private Date updateDate;

	
	
	
}




