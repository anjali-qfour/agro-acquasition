package massdyn.hub.acquisition.model;

import java.time.ZonedDateTime;
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
@Document(collection = "product_pricing")
@CompoundIndex(name = "primary_index", def = "{'id' : 1}")
public class ProductPricing
{
	@Id	
	@Field("id")
	String id;
	
	@Field("product_info_id")
	String product_info_id;
	
	@Field("unit")
	String unit;
	
	@Field("price")
	String price;
	
	@Field("create_date")
	Date createDate;
	
	
	
	
	

}
