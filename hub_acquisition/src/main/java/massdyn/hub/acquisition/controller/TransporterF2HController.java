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
import massdyn.hub.acquisition.repository.TransporterF2HRepository;
import massdyn.hub.acquisition.service.TransporterF2HService;










@RestController
@RequestMapping("/user/api/transporter_f2h")
public class TransporterF2HController
{
	
	private static final Logger LOGGER = LogManager.getLogger(TransporterF2HController.class);


	@Autowired(required = true)
	TransporterF2HService transporterF2HService;
		
	

	@Autowired(required = true)
	TransporterF2HRepository transporterF2HRepository;
		

	
	
	
	
	@ResponseBody
	@RequestMapping(value ="/add", method = RequestMethod.POST, produces = {"application/json"} )
	public String add(@RequestBody TransporterF2H transporterF2H)
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("transporterF2H = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2H, TransporterF2H.class) );

        try
		{
        	
        	
        	
        	transporterF2HService.add(transporterF2H);
        	
        	
        	
        	response = "{\"message\":\"success\"}";
        	
			
		} catch (Exception e)
		{
			
			e.printStackTrace();
			
			
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
	@RequestMapping(value ="/update", method = RequestMethod.POST, produces = {"application/json"} )
	public String update(@RequestBody TransporterF2H transporterF2H)
//	public String add()
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("transporterF2H = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2H, TransporterF2H.class) );

        try
		{
        	
        	
        	transporterF2HService.update(transporterF2H);        	
        	
        	response = "{\"message\":\"success\"}";
        	
			
		} catch (Exception e)
		{
			
			e.printStackTrace();
			
			
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
	@RequestMapping(value ="/get/by/id",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String getById(@RequestBody TransporterF2H transporterF2H) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("transporterF2H = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2H, TransporterF2H.class) );
    	


    	try
   		{

 
        	Optional<TransporterF2H> optionalObj = transporterF2HService.getById(transporterF2H);
        	
        	
        	LOGGER.info("TransporterF2H optionalObj.isPresent() = " + optionalObj.isPresent());
        	
    		Gson gson = new Gson();

        	
        	if (optionalObj.isPresent()) 
        	{
        		List<TransporterF2H>  transporterF2HList = new ArrayList<TransporterF2H>();
        		
        		transporterF2HList.add(optionalObj.get());
        		
        		
            	Type listType = new TypeToken<List<TransporterF2H>>(){}.getType();



            	LOGGER.info("consignment = " + 
        				(new GsonBuilder().setPrettyPrinting().create())
        					.toJson(optionalObj.get(), TransporterF2H.class) );


            	response = "{\"message\":\"success\", "
            			+ "\"transporter_f2h_list\" : " + ( new GsonBuilder().create() ).toJson(transporterF2HList, listType) + ""
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

    	LOGGER.info("Latest : transporterF2HList = " );
    	

    	try
   		{
    		
    		List<TransporterF2H> transporterF2HList =  transporterF2HService.getLatest();

    		
    		    		
    		
        	Type listType = new TypeToken<List<TransporterF2H>>(){}.getType();
    		

    		if ( (transporterF2HList==null) || (transporterF2HList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else {
    			

            	response = "{\"message\":\"success\", "
            			+ "\"transporter_f2h_list\" : " + ( new GsonBuilder().create() ).toJson(transporterF2HList, listType) + ""
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
	public String searchByName(@RequestBody TransporterF2H transporterF2H) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("searchByName transporterF2H = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2H, TransporterF2H.class) );
    	

    	try
   		{
    		
        	Type listType = new TypeToken<List<TransporterF2H>>(){}.getType();


    		
        	List<TransporterF2H>  transporterF2HList = transporterF2HService.searchByName(transporterF2H);
    		
    		

    		if ( (transporterF2HList==null) || (transporterF2HList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else {
    			

            	response = "{\"message\":\"success\", "
            			+ "\"transporter_f2h_list\" : " + ( new GsonBuilder().create() ).toJson(transporterF2HList, listType) + ""
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
	public List<TransporterF2H> getByPhone(@RequestBody TransporterF2H transporterF2H) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("transporterF2H = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2H, TransporterF2H.class) );
    	
    	List<TransporterF2H> transporterF2HList  = new ArrayList<TransporterF2H>();

    	try
   		{

//    		transporterF2H = transporterF2HRepository.getByPhone(transporterF2H.getPhone());
    		
    		transporterF2HList = transporterF2HRepository.findByPhoneRegex(transporterF2H.getPhone());
    		
    		
    		if (transporterF2HList==null) 
    		{
    			response = "{\"message\":\"not_found\"}";
    			transporterF2H.setId("not_found");
    		}
    		
    		
		} catch (Exception e)
		{
			
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());
			
			
			response = "{\"message\":\"error\"}";
			
			transporterF2H.setId("error");
			
		}
        
        

    	LOGGER.info("transporter_f2h = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2H, TransporterF2H.class) );

        
        
        return transporterF2HList;
		
	}
	
	
	
	
	
	
	

	@ResponseBody
	@RequestMapping(value ="/search/by/phone",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, "application/json"},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String searchByPhone(@RequestBody TransporterF2H transporterF2H) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("searchByPhone : transporterF2H = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2H, TransporterF2H.class) );
    	

    	try
   		{
    		


    		
        	List<TransporterF2H>  transporterF2HList = transporterF2HService.searchByPhone(transporterF2H);
    		
    		

    		if ( (transporterF2HList==null) || (transporterF2HList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else {
    			
            	Type listType = new TypeToken<List<TransporterF2H>>(){}.getType();

            	response = "{\"message\":\"success\", "
            			+ "\"transporter_f2h_list\" : " + ( new GsonBuilder().create() ).toJson(transporterF2HList, listType) + ""
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
	public String searchBetweenCreate_date(@RequestBody TransporterF2H transporterF2H) 
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("transporterF2H = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2H, TransporterF2H.class) );

        try
		{
        	
        	
        	List<TransporterF2H> transporterF2HList = transporterF2HService.searchBetweenCreate_date(transporterF2H);
        	
        	LOGGER.info("transporterF2HList size = " + transporterF2HList.size());
        	
    		

        	
        	if ( (transporterF2HList==null) || (transporterF2HList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else {
    			
            	Type listType = new TypeToken<List<TransporterF2H>>(){}.getType();

            	response = "{\"message\":\"success\", "
            			+ "\"transporter_f2h_list\" : " + ( new GsonBuilder().create() ).toJson(transporterF2HList, listType) + ""
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
    		
    		
    		long count =  transporterF2HService.getCount();

    		    		

        	response = "{\"message\":\"success\", "
        			+ "\"transporter_f2h_count\" : " + count + ""
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
	
	
	
	
	
	
	
	
	
}










