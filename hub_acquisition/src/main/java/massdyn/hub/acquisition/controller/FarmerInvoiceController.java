package massdyn.hub.acquisition.controller;

import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
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
import massdyn.hub.acquisition.model.Farmer;
import massdyn.hub.acquisition.model.FarmerInvoice;
import massdyn.hub.acquisition.model.TransporterF2H;
import massdyn.hub.acquisition.model.TransporterF2HInvoice;
import massdyn.hub.acquisition.repository.TransporterF2HRepository;
import massdyn.hub.acquisition.service.FarmerInvoiceService;
import massdyn.hub.acquisition.service.TransporterF2HInvoiceService;
import massdyn.hub.acquisition.service.TransporterF2HService;










@RestController
@RequestMapping("/user/api/farmer_invoice")
public class FarmerInvoiceController
{
	
	private static final Logger LOGGER = LogManager.getLogger(FarmerInvoiceController.class);


	@Autowired(required = true)
	FarmerInvoiceService farmerInvoiceService;
		
	
	


	@ResponseBody
	@RequestMapping(value ="/get/by/id",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String getById(@RequestBody FarmerInvoice farmerInvoice) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("farmerInvoice = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(farmerInvoice, FarmerInvoice.class) );
    	


    	try
   		{


    		
    		Optional<FarmerInvoice> optionalObj = farmerInvoiceService.getById(farmerInvoice);
			
    
    		
    		Gson gson = new Gson();
		
		        	
        	if (optionalObj.isPresent()) 
        	{
        		
        		
        		
        		List<FarmerInvoice>  farmerInvoiceList = new ArrayList<FarmerInvoice>();
        		
        		farmerInvoiceList.add(optionalObj.get());
        		
            	Type listType = new TypeToken<List<FarmerInvoice>>(){}.getType();

        		
            	response = "{\"message\":\"success\", "
            			+ "\"farmer_invoice_list\" : " + ( new GsonBuilder().create() ).toJson(farmerInvoiceList, listType) + ""
            			+ "}";
            	
            	
        	}
        	else 
        	{
    			response = "{\"message\":\"not_found\"}";

        	}
    		    		
    	
    		
    		
		} catch (Exception e)
		{
			
			e.printStackTrace();
			LOGGER.error(e.getLocalizedMessage());
			LOGGER.error(e.getCause());
			
			response = "{\"message\":\"error\"}";
			
			
		}
        
        

        
        
        return response;
		
	}
	
	
	
	
	
	

	@ResponseBody
	@RequestMapping(value ="/get/latest",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, "application/json"},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String getLatest() 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("Latest : TransporterF2HInvoice = " );
    	

    	try
   		{
    		
    		
    		List<FarmerInvoice> farmerInvoiceList =  farmerInvoiceService.getLatest();

    		    		
    		    		
    		
        	Type listType = new TypeToken<List<FarmerInvoice>>(){}.getType();
    		

    		if ( (farmerInvoiceList==null) || (farmerInvoiceList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else {
    			

            	response = "{\"message\":\"success\", "
            			+ "\"farmer_invoice_list\" : " + ( new GsonBuilder().create() ).toJson(farmerInvoiceList, listType) + ""
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
	@RequestMapping(value ="/search/between/dates",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, "application/json"},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String searchBetweenDates(@RequestBody FarmerInvoice farmerInvoice) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("farmerInvoice = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(farmerInvoice, FarmerInvoice.class) );
    	

    	try
   		{
    		
    		
    		List<FarmerInvoice> farmerInvoiceList =  farmerInvoiceService.searchBetweenDates(farmerInvoice);
    		

        	
        	if ( (farmerInvoiceList==null)||(farmerInvoiceList.size()==0) )
        	{
    			response = "{\"message\":\"not_found\"}";

        	}
        	else if (farmerInvoiceList.size()>0)
        	{
        		
            	Type listType = new TypeToken<List<FarmerInvoice>>(){}.getType();

    			Gson gson = new Gson();
    			
    			response = "{\"message\":\"success\", "
	        			+ "\"farmer_invoice_list\" : " + ( new GsonBuilder().create() ).toJson(farmerInvoiceList, listType) + ""
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
	@RequestMapping(value ="/search/by/name",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, "application/json"},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String searchByName(@RequestBody FarmerInvoice farmerInvoice) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info(" farmerInvoice = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(farmerInvoice, FarmerInvoice.class) );
    	

    	try
   		{
    		
        	Type listType = new TypeToken<List<FarmerInvoice>>(){}.getType();


    		
        	List<FarmerInvoice>  farmerInvoiceList = farmerInvoiceService.searchByName(farmerInvoice);
    		
    		

    		if ( (farmerInvoiceList==null) || (farmerInvoiceList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else 
    		{
    			

            	response = "{\"message\":\"success\", "
            			+ "\"farmer_invoice_list\" : " + ( new GsonBuilder().create() ).toJson(farmerInvoiceList, listType) + ""
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
	@RequestMapping(value ="/search/by/phone",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, "application/json"},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String searchByPhone(@RequestBody FarmerInvoice farmerInvoice) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info(" farmerInvoice = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(farmerInvoice, FarmerInvoice.class) );
    	

    	try
   		{
    		
        	Type listType = new TypeToken<List<FarmerInvoice>>(){}.getType();


    		
        	List<FarmerInvoice>  farmerInvoiceList = farmerInvoiceService.searchByPhone(farmerInvoice);
    		
    		

    		if ( (farmerInvoiceList==null) || (farmerInvoiceList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else 
    		{
    			

            	response = "{\"message\":\"success\", "
            			+ "\"farmer_invoice_list\" : " + ( new GsonBuilder().create() ).toJson(farmerInvoiceList, listType) + ""
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
	
	
	
}










