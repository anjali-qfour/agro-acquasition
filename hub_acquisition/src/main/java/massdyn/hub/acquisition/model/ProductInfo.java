package massdyn.hub.acquisition.model;

import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "product_info")
@CompoundIndex(name = "primary_index", def = "{'id' : 1}")
public class ProductInfo
{
	
	String id;
	
	String name;
	String readable_name;
	String desciption;
	
	
	String category_id;
	String category_name;
	
	
	String type_id;
	String type_name;
	
	String sub_type_id;
	String sub_type_name;
	
	
	
	
	
	

}
