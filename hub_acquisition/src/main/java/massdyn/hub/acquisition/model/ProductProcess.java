package massdyn.hub.acquisition.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
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
@Document(collection = "product_process")
@CompoundIndex(name = "primary_index", def = "{'id' : 1}")
public class ProductProcess

{
	@Id	
	@Field("id")
	String id;
	
	@DBRef(lazy=true)
    ProductProcess productProcess_parent;
	
	
	@Field("consignment_id")
	String consignment_id;
	
	@Field("product_info_id")
	String product_info_id;
	
	@Field("readable_name")
	String readable_name;
	
	
	
	@Field("category_id")
	String category_id;
	@Field("category_name")
	String category_name;
	
	
	
	@Field("type_id")
	String type_id;
	@Field("type_name")
	String type_name;
	
	
	
	@Field("sub_type_id")
	String sub_type_id;
	@Field("sub_type_name")
	String sub_type_name;
	
	
	
	
	@Field("acquired_weight")
	String acquired_weight;
	

	@Field("processed_weight")
	String processed_weight;

	
	@Field("sorting_machine_status")
	String sorting_machine_status;

	
	
	
	
	
	@Field("product_class")
	String product_class;

	
	
	
	
	
	
	@Field("create_date")
	Date createDate;
	
	
	
	
	

}
