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
import massdyn.hub.acquisition.repository.TransporterF2HRepository;
import massdyn.hub.acquisition.service.ConsigmentService;
import massdyn.hub.acquisition.service.TransporterF2HService;



@RestController
@RequestMapping("/user/api/consignment")
public class ConsignmentController
{
	
	private static final Logger LOGGER = LogManager.getLogger(ConsignmentController.class);


	@Autowired(required = true)
	ConsigmentService consigmentService;
		

	
	
	
	
	@ResponseBody
	@RequestMapping(value ="/add", method = RequestMethod.POST, produces = {"application/json"} )
	public String add(@RequestBody Consignment consignment)
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("consignment = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(consignment, Consignment.class) );

        try
		{
        	
         	
        	consigmentService.add(consignment);
        	

        	
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
	
	
	

	

	

	@ResponseBody
	@RequestMapping(value ="/get/latest",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, "application/json"},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String getLatest() 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("Latest : Consignment = " );
    	

    	try
   		{
    		
    		List<Consignment> consignmentList =  consigmentService.getLatest();

    		    		
    		    		
    		
        	Type listType = new TypeToken<List<Consignment>>(){}.getType();
    		

    		if ( (consignmentList==null) || (consignmentList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else {
    			

            	response = "{\"message\":\"success\", "
            			+ "\"consignment_list\" : " + ( new GsonBuilder().create() ).toJson(consignmentList, listType) + ""
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
	@RequestMapping(value ="/get/by/id", method = RequestMethod.POST, produces = {"application/json"} )
	public String getById(@RequestBody Consignment consignment)
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("consignment = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(consignment, Consignment.class) );

        try
		{
        	
        	
        	Optional<Consignment> optionalObj = consigmentService.getById(consignment);
        	
        	
        	LOGGER.info("consignment optionalObj.isPresent() = " + optionalObj.isPresent());
        	
    		Gson gson = new Gson();

        	
        	if (optionalObj.isPresent()) 
        	{
        		List<Consignment>  consignmentList = new ArrayList<Consignment>();
        		
        		consignmentList.add(optionalObj.get());
        		
        		
            	Type listType = new TypeToken<List<Consignment>>(){}.getType();



            	LOGGER.info("consignment = " + 
        				(new GsonBuilder().setPrettyPrinting().create())
        					.toJson(optionalObj.get(), Consignment.class) );


            	response = "{\"message\":\"success\", "
            			+ "\"consignment_list\" : " + ( new GsonBuilder().create() ).toJson(consignmentList, listType) + ""
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
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());
			LOGGER.error(e.hashCode());
			
			
			response = "{\"message\":\"error\"}";

		}
        
        
		
        LOGGER.info("response = "+response);
        
		return response;

	}
	
	


	


	
	@ResponseBody
	@RequestMapping(value ="/get/by/created_date", method = RequestMethod.POST, produces = {"application/json"} )
	public String getByCreatedDate(@RequestBody Consignment consignment)
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("consignment = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(consignment, Consignment.class) );

        try
		{
        	List<Consignment> consignmentList = consigmentService.getByCreatedDate(consignment);
        	

    		if ( (consignmentList==null) || (consignmentList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else 
    		{
    			
    			Type listType = new TypeToken<List<Consignment>>(){}.getType();

            	response = "{\"message\":\"success\", "
            			+ "\"consignment_list\" : " + ( new GsonBuilder().create() ).toJson(consignmentList, listType) + ""
            			+ "}";

    			
    		}
    		
			
		} catch (Exception e)
		{
			
			e.printStackTrace();
			
			LOGGER.error(e.getLocalizedMessage());
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());
			LOGGER.error(e.hashCode());
			
			
			response = "{\"message\":\"error\"}";

		}
        
        
		
        LOGGER.info("response = "+response);
        
		return response;

	}
	
	
	
	

	@ResponseBody
	@RequestMapping(value ="/search/by/name",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, "application/json"},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String searchByName(@RequestBody Consignment consignment)
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info(" consignment = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(consignment, Consignment.class) );
    	

    	try
   		{
    		
        	

    		
        	List<Consignment>  consignmentList = consigmentService.searchByName(consignment);
    		
    		

    		if ( (consignmentList==null) || (consignmentList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else 
    		{
    			
    			Type listType = new TypeToken<List<Consignment>>(){}.getType();

            	response = "{\"message\":\"success\", "
            			+ "\"consignment_list\" : " + ( new GsonBuilder().create() ).toJson(consignmentList, listType) + ""
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
	public String searchByPhone(@RequestBody Consignment consignment)
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info(" consignment = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(consignment, Consignment.class) );
    	

    	try
   		{
    		
        	Type listType = new TypeToken<List<Consignment>>(){}.getType();


    		
        	List<Consignment>  consignmentList = consigmentService.searchByPhone(consignment);
    		
    		

    		if ( (consignmentList==null) || (consignmentList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else 
    		{
    			

            	response = "{\"message\":\"success\", "
            			+ "\"consignment_list\" : " + ( new GsonBuilder().create() ).toJson(consignmentList, listType) + ""
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
	@RequestMapping(value ="/search/between/create_date", method = RequestMethod.POST, produces = {"application/json"} )
	public String searchBetweenCreate_date(@RequestBody Consignment consignment)
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("consignment = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(consignment, Consignment.class) );

        try
		{
        	
        	
        	List<Consignment> consignmentList = consigmentService.searchBetweenCreate_date(consignment);
        	
        	LOGGER.info("consignment size = " + consignmentList.size());
        	
    		

        	
        	if (consignmentList.size()==0)
        	{
    			response = "{\"message\":\"not_found\"}";

        	}
        	else if (consignmentList.size()>0)
        	{
        		
    			Type listType = new TypeToken<List<Farmer>>(){}.getType();

    			Gson gson = new Gson();
    			
    			response = "{\"message\":\"success\", "
	        			+ "\"consignment_list\" : " + ( new GsonBuilder().create() ).toJson(consignmentList, listType) + ""
	        			+ "}";

        	}

			
		} catch (Exception e)
		{
			
			e.printStackTrace();
			
			LOGGER.error(e.getLocalizedMessage());
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());
			LOGGER.error(e.hashCode());
			
			
			response = "{\"message\":\"error\"}";

		}
        
        
		
        LOGGER.info("response = "+response);
        
		return response;

	}
	
	
	
	
	
	
	
	
	


	

	@ResponseBody
	@RequestMapping(value ="/get/count",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, "application/json"},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String getCount() 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("Latest : getCount = " );
    	

    	try
   		{
    		
    		
    		long count =  consigmentService.getCount();

    		    		

        	response = "{\"message\":\"success\", "
        			+ "\"consigment_count\" : " + count + ""
        			+ "}";
    		
        	
    		
    		
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
	@RequestMapping(value ="/get/farmer", method = RequestMethod.POST, produces = {"application/json"} )
	public String getFarmer(@RequestBody Consignment consignment)
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("consignment = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(consignment, Consignment.class) );

        try
		{
        	
        	
        	Optional<Farmer> farmerOptional = consigmentService.getFarmer(consignment);
        	
        	
        	
        	if (farmerOptional.isPresent()) 
        	{
        		List<Farmer>  farmerList = new ArrayList<Farmer>();
        		
        		farmerList.add(farmerOptional.get());
        		
        		
            	Type listType = new TypeToken<List<Farmer>>(){}.getType();



            	LOGGER.info("farmerOptional = " + 
        				(new GsonBuilder().setPrettyPrinting().create())
        					.toJson(farmerOptional.get(), Farmer.class) );


            	response = "{\"message\":\"success\", "
            			+ "\"farmer_list\" : " + ( new GsonBuilder().create() ).toJson(farmerList, listType) + ""
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
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());
			LOGGER.error(e.hashCode());
			
			
			response = "{\"message\":\"error\"}";

		}
        
        
		
        LOGGER.info("response = "+response);
        
		return response;

	}
	
	
	
	
}










