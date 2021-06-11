package massdyn.hub.acquisition.controller;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import massdyn.hub.acquisition.model.Consignment;
import massdyn.hub.acquisition.model.ProductPricing;
import massdyn.hub.acquisition.service.ProductPricingService;








@RestController
@RequestMapping(value ="/user/api/product_pricing")
public class ProductPricingController
{

	
	private static final Logger LOGGER = LogManager.getLogger(ProductPricingController.class);


	@Autowired(required = true)
	ProductPricingService productPricingService;
	
	
	
	
	

	@ResponseBody
	@RequestMapping(value ="/get/by/date",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, "application/json"},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String getByDate(@RequestBody ProductPricing productPricing)
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info(" productPricing = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(productPricing, ProductPricing.class) );
    	

    	try
   		{
    		
        	
        	List<ProductPricing> productPricingList = productPricingService.getByDate(productPricing);
    		
    		

    		if ( (productPricingList==null) || (productPricingList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else 
    		{
    			
    			Type listType = new TypeToken<List<ProductPricing>>(){}.getType();
    			
    			
            	response = "{\"message\":\"success\", "
            			+ "\"product_pricing_list\" : " + ( new GsonBuilder().create() ).toJson(productPricingList, listType) + ""
            			+ "}";

    			
    		}
    		
    		
		} catch (Exception e)
		{
			
			e.printStackTrace();
			
			LOGGER.error(e.getLocalizedMessage());
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());
			
			
			response = "{\"message\":\"error\"}";
			
			
		}
        
        
        return response;
		
	}
	
	
	



	@ResponseBody
	@RequestMapping(value ="/get/by/date/and/product",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, "application/json"},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String getByDateAndProduct(@RequestBody ProductPricing productPricing)
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info(" productPricing = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(productPricing, ProductPricing.class) );
    	
    	
    	LOGGER.info(" productPricing = " + productPricing.getCreateDate());

    	try
   		{
    		
        	
    		Optional<ProductPricing> optionalObj = productPricingService.getByDateAndProduct(productPricing);
    		
    		
    		if (optionalObj.isPresent()) 
        	{

            	response = "{\"message\":\"success\", "
            			+ "\"product_pricing\" : " + ( (new GsonBuilder().setPrettyPrinting().create())
            													.toJson(optionalObj.get(), ProductPricing.class) ) + ""
            			+ "}";

        	}
    		
//    		
//    		
//
//    		if ( (productPricingList==null) || (productPricingList.size()==0) )
//    		{
//    			response = "{\"message\":\"not_found\"}";
//    		}
//    		else 
//    		{
//    			
//    			Type listType = new TypeToken<List<ProductPricing>>(){}.getType();
//    			
//    			
//            	response = "{\"message\":\"success\", "
//            			+ "\"product_pricing_list\" : " + ( new GsonBuilder().create() ).toJson(productPricingList, listType) + ""
//            			+ "}";
//
//    			
//    		}
//    		
//    		
//    		
    		
    		
    		
    		
		} catch (Exception e)
		{
			
			e.printStackTrace();
			
			LOGGER.error(e.getLocalizedMessage());
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());
			
			
			response = "{\"message\":\"error\"}";
			
			
		}
        
        
        return response;
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
}
