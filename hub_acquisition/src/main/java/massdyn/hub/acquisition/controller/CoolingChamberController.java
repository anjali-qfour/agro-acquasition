package massdyn.hub.acquisition.controller;

import java.lang.reflect.Type;
import java.util.ArrayList;
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
import massdyn.hub.acquisition.model.CoolingChamber;
import massdyn.hub.acquisition.model.Farmer;
import massdyn.hub.acquisition.model.TransporterF2H;
import massdyn.hub.acquisition.service.ConsigmentService;
import massdyn.hub.acquisition.service.CoolingChamberService;

@RestController
@RequestMapping("/user/api/cooling_chamber")
public class CoolingChamberController {
	
	private static final Logger LOGGER = LogManager.getLogger(CoolingChamberController.class);


	@Autowired(required = true)
	CoolingChamberService coolingChamberService;
		

	@Autowired(required = true)
	ConsigmentService consigmentService;
	
	
	
	@ResponseBody
	@RequestMapping(value ="/add", method = RequestMethod.POST, produces = {"application/json"} )
	public String add(@RequestBody CoolingChamber cooling_chamber)
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("cooling_chamber = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(cooling_chamber, CoolingChamber.class) );

        try
		{
        	
         	
        	coolingChamberService.add(cooling_chamber);
        	

        	
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
	@RequestMapping(value ="/update", method = RequestMethod.POST, produces = {"application/json"} )
	public String update(@RequestBody CoolingChamber cooling_chamber)
//	public String add()
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("cooling_chamber = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(cooling_chamber, CoolingChamber.class) );

        try
		{
        	
        	
        	coolingChamberService.update(cooling_chamber);        	
        	
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
	@RequestMapping(value ="/get/latest",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, "application/json"},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String getLatest() 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("Latest : CoolingChamber = " );
    	

    	try
   		{
    		
    		List<Consignment> consignmentlist =  consigmentService.getLatest();

    		    		
    		    		
    		
        	Type listType = new TypeToken<List<Consignment>>(){}.getType();
    		

    		if ( (consignmentlist==null) || (consignmentlist.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else {
    			

            	response = "{\"message\":\"success\", "
            			+ "\"consignment_list\" : " + ( new GsonBuilder().create() ).toJson(consignmentlist, listType) + ""
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
        		List<Consignment> consignmentlist = new ArrayList<Consignment>();
        		
        		consignmentlist.add(optionalObj.get());
        		
        		
            	Type listType = new TypeToken<List<Consignment>>(){}.getType();



            	LOGGER.info("cooling_chamber = " + 
        				(new GsonBuilder().setPrettyPrinting().create())
        					.toJson(optionalObj.get(), Consignment.class) );


            	response = "{\"message\":\"success\", "
            			+ "\"consignment_list\" : " + ( new GsonBuilder().create() ).toJson(consignmentlist, listType) + ""
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
	@RequestMapping(value ="/forview/get/latest",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, "application/json"},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String getLatest1() 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("Latest : CoolingChamber = " );
    	

    	try
   		{
    		
    		List<CoolingChamber> coolingchamberlist =  coolingChamberService.getLatest();

	
        	Type listType = new TypeToken<List<CoolingChamber>>(){}.getType();
    		

    		if ( (coolingchamberlist==null) || (coolingchamberlist.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else {
    			

            	response = "{\"message\":\"success\", "
            			+ "\"cooling_chamber_list\" : " + ( new GsonBuilder().create() ).toJson(coolingchamberlist, listType) + ""
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
	@RequestMapping(value ="/forview/get/by/id", method = RequestMethod.POST, produces = {"application/json"} )
	public String getById1(@RequestBody CoolingChamber coolingChamber)
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("coolingChamber = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(coolingChamber, CoolingChamber.class) );

        try
		{
        	
        	
        	Optional<CoolingChamber> optionalObj = coolingChamberService.getById(coolingChamber);
        	
        	
        	LOGGER.info("coolingChamber optionalObj.isPresent() = " + optionalObj.isPresent());
        	
    		Gson gson = new Gson();

        	
        	if (optionalObj.isPresent()) 
        	{
        		List<CoolingChamber> coolingChamberlist = new ArrayList<CoolingChamber>();
        		
        		coolingChamberlist.add(optionalObj.get());
        		
        		
            	Type listType = new TypeToken<List<CoolingChamber>>(){}.getType();



            	LOGGER.info("cooling_chamber = " + 
        				(new GsonBuilder().setPrettyPrinting().create())
        					.toJson(optionalObj.get(), CoolingChamber.class) );


            	response = "{\"message\":\"success\", "
            			+ "\"cooling_chamber_list\" : " + ( new GsonBuilder().create() ).toJson(coolingChamberlist, listType) + ""
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
	@RequestMapping(value ="/search/between/create_date", method = RequestMethod.POST, produces = {"application/json"} )
	public String searchBetweenCreate_date(@RequestBody CoolingChamber cooling_chamber)
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("cooling_chamber = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(cooling_chamber, CoolingChamber.class) );

        try
		{
        	
        	
        	List<CoolingChamber> cooling_chamberList = coolingChamberService.searchBetweenCreate_date(cooling_chamber);
        	
        	LOGGER.info("cooling_chamber size = " + cooling_chamberList.size());
        	
    		

        	
        	if (cooling_chamberList.size()==0)
        	{
    			response = "{\"message\":\"not_found\"}";

        	}
        	else if (cooling_chamberList.size()>0)
        	{
        		
    			Type listType = new TypeToken<List<Farmer>>(){}.getType();

    			Gson gson = new Gson();
    			
    			response = "{\"message\":\"success\", "
	        			+ "\"cooling_chamber_list\" : " + ( new GsonBuilder().create() ).toJson(cooling_chamberList, listType) + ""
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
	
	
	
	
	
	
	

	

}
