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
import massdyn.hub.acquisition.model.TransporterF2H;
import massdyn.hub.acquisition.model.TransporterF2HInvoice;
import massdyn.hub.acquisition.repository.TransporterF2HRepository;
import massdyn.hub.acquisition.service.TransporterF2HInvoiceService;
import massdyn.hub.acquisition.service.TransporterF2HService;










@RestController
@RequestMapping("/user/api/transporter_f2h_invoice")
public class TransporterF2HInvoiceController
{
	
	private static final Logger LOGGER = LogManager.getLogger(TransporterF2HInvoiceController.class);


	@Autowired(required = true)
	TransporterF2HInvoiceService transporterF2HInvoiceService;
		
	
	


	@ResponseBody
	@RequestMapping(value ="/get/by/id",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String getById(@RequestBody TransporterF2HInvoice transporterF2HInvoice) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("transporterF2HInvoice = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2HInvoice, TransporterF2HInvoice.class) );
    	


    	try
   		{


    		
    		Optional<TransporterF2HInvoice> optionalObj = transporterF2HInvoiceService.getById(transporterF2HInvoice);

        	
    		
    		
    		Gson gson = new Gson();
		
		        	
        	if (optionalObj.isPresent()) 
        	{

        		List<TransporterF2HInvoice>  transporterF2HInvoiceList = new ArrayList<TransporterF2HInvoice>();
        		
        		transporterF2HInvoiceList.add(optionalObj.get());
        		
            	Type listType = new TypeToken<List<TransporterF2HInvoice>>(){}.getType();

        		
            	response = "{\"message\":\"success\", "
            			+ "\"transporter_f2h_invoice_list\" : " + ( new GsonBuilder().create() ).toJson(transporterF2HInvoiceList, listType) + ""
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
	@RequestMapping(value ="/search/by/name",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, "application/json"},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String searchByName(@RequestBody TransporterF2HInvoice transporterF2HInvoice) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("searchByName transporterF2HInvoice = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2HInvoice, TransporterF2HInvoice.class) );
    	

    	try
   		{
    		
        	Type listType = new TypeToken<List<TransporterF2HInvoice>>(){}.getType();


    		
        	List<TransporterF2HInvoice>  transporterF2HInvoiceList = transporterF2HInvoiceService.searchByName(transporterF2HInvoice);
    		
    		

    		if ( (transporterF2HInvoiceList==null) || (transporterF2HInvoiceList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else 
    		{
    			

            	response = "{\"message\":\"success\", "
            			+ "\"transporter_f2h_invoice_list\" : " + ( new GsonBuilder().create() ).toJson(transporterF2HInvoiceList, listType) + ""
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
	@RequestMapping(value ="/get/by/phone",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String getByPhone(@RequestBody TransporterF2HInvoice transporterF2HInvoice) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("transporterF2HInvoice = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2HInvoice, TransporterF2HInvoice.class) );
    	

    	try
   		{

    		Type listType = new TypeToken<List<TransporterF2HInvoice>>(){}.getType();


    		
        	List<TransporterF2HInvoice>  transporterF2HInvoiceList = transporterF2HInvoiceService.searchByPhone(transporterF2HInvoice);
    		
    		

    		if ( (transporterF2HInvoiceList==null) || (transporterF2HInvoiceList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else 
    		{
    			

            	response = "{\"message\":\"success\", "
            			+ "\"transporter_f2h_invoice_list\" : " + ( new GsonBuilder().create() ).toJson(transporterF2HInvoiceList, listType) + ""
            			+ "}";

    			
    		}
    		
    		
    		
		} catch (Exception e)
		{
			
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
	public String searchByPhone(@RequestBody TransporterF2HInvoice transporterF2HInvoice) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("searchByPhone : transporterF2HInvoice = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2HInvoice, TransporterF2HInvoice.class) );
    	

    	try
   		{
    		
    		Type listType = new TypeToken<List<TransporterF2HInvoice>>(){}.getType();


    		
        	List<TransporterF2HInvoice>  transporterF2HInvoiceList = transporterF2HInvoiceService.searchByPhone(transporterF2HInvoice);
    		
    		

    		if ( (transporterF2HInvoiceList==null) || (transporterF2HInvoiceList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else 
    		{
    			

            	response = "{\"message\":\"success\", "
            			+ "\"transporter_f2h_invoice_list\" : " + ( new GsonBuilder().create() ).toJson(transporterF2HInvoiceList, listType) + ""
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
	public String searchBetweenDates(@RequestBody TransporterF2HInvoice transporterF2HInvoice) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("transporterF2HInvoice = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2HInvoice, TransporterF2HInvoice.class) );
    	

    	try
   		{
    		
    		
    		List<TransporterF2HInvoice> transporterF2HInvoiceList =  transporterF2HInvoiceService.searchBetweenDates(transporterF2HInvoice);
    		

        	
        	if ( (transporterF2HInvoiceList==null)||(transporterF2HInvoiceList.size()==0) )
        	{
    			response = "{\"message\":\"not_found\"}";

        	}
        	else if (transporterF2HInvoiceList.size()>0)
        	{
        		
            	Type listType = new TypeToken<List<TransporterF2HInvoice>>(){}.getType();

    			Gson gson = new Gson();
    			
    			response = "{\"message\":\"success\", "
	        			+ "\"transporter_f2h_invoice_list\" : " + ( new GsonBuilder().create() ).toJson(transporterF2HInvoiceList, listType) + ""
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
    		
    		
    		List<TransporterF2HInvoice> transporterF2HInvoiceList =  transporterF2HInvoiceService.getLatest();
    		
    		
    		    		
    		
        	Type listType = new TypeToken<List<TransporterF2HInvoice>>(){}.getType();


    		
    		
    		

    		if ( (transporterF2HInvoiceList==null) || (transporterF2HInvoiceList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else {
    			

            	response = "{\"message\":\"success\", "
            			+ "\"transporter_f2h_invoice_list\" : " + ( new GsonBuilder().create() ).toJson(transporterF2HInvoiceList, listType) + ""
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
	@RequestMapping(value ="/get/by/id/and/time",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, "application/json"},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String getByIdAndTime(@RequestBody TransporterF2HInvoice transporterF2HInvoice) 
	{
        String response = "{\"message\":\"error\"}";


    	LOGGER.info("transporterF2HInvoice = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2HInvoice, TransporterF2HInvoice.class) );
    	

    	try
   		{
    		
    		
    		transporterF2HInvoiceService.getByIdAndTime(transporterF2HInvoice);
    		
    		
    		
        	response = "{\"message\":\"success\"}";
        	
    		
    		
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
	@RequestMapping(value ="/update", 
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
					)
	public String update(@RequestBody TransporterF2HInvoice transporterF2HInvoice)
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("transporterF2HInvoice = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2HInvoice, TransporterF2HInvoice.class) );

        try
		{
        	
        	
        	transporterF2HInvoiceService.update(transporterF2HInvoice);
        	
        	
        	response = "{\"message\":\"success\"}";
        	
			
		} catch (Exception e)
		{
			LOGGER.error(e.getLocalizedMessage());
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());
			LOGGER.error(e.hashCode());
			
			
			response = "{\"message\":\"duplicate_entry\"}";

		}
        
        
		
        LOGGER.info("response = "+response);
        
		return response;

	}
	
	
	
	
	
	
}










