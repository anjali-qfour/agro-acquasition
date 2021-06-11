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
@Document(collection = "product_categories")
@CompoundIndex(name = "primary_index", def = "{'id' : 1}")
public class ProductCategories
{
	
	String id;
	
	
	String name;
	
	
	
	String desciption;
	
	

}
