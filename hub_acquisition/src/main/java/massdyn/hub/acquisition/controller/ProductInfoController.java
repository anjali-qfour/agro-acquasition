package massdyn.hub.acquisition.controller;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import massdyn.hub.acquisition.model.ProductCategories;
import massdyn.hub.acquisition.model.ProductInfo;
import massdyn.hub.acquisition.model.ProductSubTypes;
import massdyn.hub.acquisition.model.ProductTypes;
import massdyn.hub.acquisition.service.ProductInfoService;



@RestController
@RequestMapping(value ="/user/api/product_info")
public class ProductInfoController
{

	
	private static final Logger LOGGER = LogManager.getLogger(ProductInfoController.class);


	@Autowired(required = true)
	ProductInfoService productInfoService;
	
	
	

	
	
	@ResponseBody
	@RequestMapping(value ="/get/all",
					method = RequestMethod.POST, 
					consumes = {"application/json"},
		            produces = { "application/json" }		    
					)
	public String getAll()
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("productInfo = ");

    	
        try
		{

        	
        	List<ProductInfo> productInfoList =  productInfoService.getAll();
        	
        	
			Type listType = new TypeToken<List<ProductInfo>>(){}.getType();
			
			


			if (productInfoList.size()>0) 
			{
				response = "{\"message\":\"success\", "
	        			+ "\"product_info_list\" : " + ( new GsonBuilder().create() ).toJson(productInfoList, listType) + ""
	        			+ "}";
			}
			else
			{
				response = "{\"message\":\"not_found\" }";
			}

        	
        	
			
		} catch (Exception e)
		{
			LOGGER.error(e.getLocalizedMessage());
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());
			LOGGER.error(e.hashCode());
			
			response = "{\"message\":\"Error\"}";
			
			
		}
        
        
		
        LOGGER.info("response = "+response);
        
		return response;

	}
	
	
	

	
	@ResponseBody
	@RequestMapping(value ="/categories/get/all",
					method = RequestMethod.POST, 
					consumes = {"application/json"},
		            produces = { "application/json" }		    
					)
	public String getAllCategories()
	{
        String response = "{\"message\":\"error\"}";
        

    	
        try
		{

        	
			Type listType = new TypeToken<List<ProductCategories>>(){}.getType();

        	
        	List<ProductCategories> productCategoriesList = productInfoService.getAllCategories();
        	
  
        	

        	response = "{\"message\":\"success\", "
        			+ "\"product_categories_list\" : " + ( new GsonBuilder().create() ).toJson(productCategoriesList, listType) + ""
        			+ "}";
			
        	
		} catch (Exception e)
		{
			LOGGER.error(e.getLocalizedMessage());
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());
			LOGGER.error(e.hashCode());
			
			response = "{\"message\":\"Error\"}";
			
			if (e.getLocalizedMessage().toString().contains("E11000")) {
				
				response = "{\"message\":\"duplicate_entry\"}";				
			}
			
		}
        
        
		
        LOGGER.info("response = "+response);
        
		return response;

	}
	
	

	
	

	
	@ResponseBody
	@RequestMapping(value ="/types/get/all",
					method = RequestMethod.POST, 
					consumes = {"application/json"},
		            produces = { "application/json" }		    
					)
	public String getAllTypes(@RequestBody ProductCategories productCategories)
	{
        String response = "{\"message\":\"error\"}";
        


    	LOGGER.info("productCategories = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(productCategories, ProductCategories.class) );

    	
    	
        try
		{

        	
			Type listType = new TypeToken<List<ProductTypes>>(){}.getType();

        	
			List<ProductTypes> productTypesList = productInfoService.getAllTypes(productCategories);
        	
  
			if (productTypesList.size()>0) 
			{
				response = "{\"message\":\"success\", "
	        			+ "\"product_types_list\" : " + ( new GsonBuilder().create() ).toJson(productTypesList, listType) + ""
	        			+ "}";
			}
			else
			{
				response = "{\"message\":\"not_found\" }";
			}
        	

        	
			
        	
		} catch (Exception e)
		{
			LOGGER.error(e.getLocalizedMessage());
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());
			LOGGER.error(e.hashCode());
			
			response = "{\"message\":\"Error\"}";
			
			if (e.getLocalizedMessage().toString().contains("E11000")) {
				
				response = "{\"message\":\"duplicate_entry\"}";				
			}
			
		}
        
        
		
        LOGGER.info("response = "+response);
        
		return response;

	}
	
	

	
	
	
	
	
	
	


	
	@ResponseBody
	@RequestMapping(value ="/sub_types/get/all",
					method = RequestMethod.POST, 
					consumes = {"application/json"},
		            produces = { "application/json" }		    
					)
	public String getAllSubTypes(@RequestBody ProductSubTypes productSubTypes)
	{
        String response = "{\"message\":\"error\"}";
        


    	LOGGER.info("productSubTypes = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(productSubTypes, ProductSubTypes.class) );

    	
    	
        try
		{

        	
			Type listType = new TypeToken<List<ProductSubTypes>>(){}.getType();

        	
			List<ProductSubTypes> productSubTypesList = productInfoService.getAllSubTypes(productSubTypes);
        	
  
			if (productSubTypesList.size()>0) 
			{
				response = "{\"message\":\"success\", "
	        			+ "\"product_sub_types_list\" : " + ( new GsonBuilder().create() ).toJson(productSubTypesList, listType) + ""
	        			+ "}";
			}
			else
			{
				response = "{\"message\":\"not_found\" }";
			}
        	

        	
			
        	
		} catch (Exception e)
		{
			LOGGER.error(e.getLocalizedMessage());
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());
			LOGGER.error(e.hashCode());
			
			response = "{\"message\":\"Error\"}";
			
			if (e.getLocalizedMessage().toString().contains("E11000")) {
				
				response = "{\"message\":\"duplicate_entry\"}";				
			}
			
		}
        
        
		
        LOGGER.info("response = "+response);
        
		return response;

	}
	
	

	
	
}
