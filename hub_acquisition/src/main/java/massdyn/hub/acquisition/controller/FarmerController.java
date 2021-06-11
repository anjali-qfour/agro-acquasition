package massdyn.hub.acquisition.controller;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import massdyn.hub.acquisition.model.Consignment;
import massdyn.hub.acquisition.model.Farmer;
import massdyn.hub.acquisition.model.FarmerInvoice;
import massdyn.hub.acquisition.model.FarmerJson;
import massdyn.hub.acquisition.model.ProductTypes;
import massdyn.hub.acquisition.model.Relative;
import massdyn.hub.acquisition.model.TransporterF2H;
import massdyn.hub.acquisition.repository.FarmerRepository;
import massdyn.hub.acquisition.service.AWSS3Service;
import massdyn.hub.acquisition.service.FarmerService;









@RestController
@RequestMapping("/user/api/farmer")
public class FarmerController
{
	
	private static final Logger LOGGER = LogManager.getLogger(FarmerController.class);



	
	@Autowired(required = true)
	FarmerRepository farmerRepository;
	
	
	@Autowired(required = true)
	FarmerService farmerService;
		
	
	
	

	@ResponseBody
	@RequestMapping(value ="/get/by/id",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String getById(@RequestBody FarmerJson farmerJson) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("farmerJson = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(farmerJson, FarmerJson.class) );
    	
    	Farmer farmer = null;

    	try
   		{

    		farmer = farmerRepository.getById(farmerJson.id.toLowerCase());
    		
    		
    		Gson gson = new Gson();

        	
        	response = "{\"message\":\"success\", "
        			+ "\"farmer\" : " +gson.toJson(farmer, Farmer.class) + ""
        			+ "}";
		
        	
    		if (farmer==null) 
    		{
    			response = "{\"message\":\"not_found\"}";
    			
    		}
    		
    		
		} catch (Exception e)
		{
			
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());
			
			
			response = "{\"message\":\"error\"}";
			
			
		}
        
        

    	LOGGER.info("farmer = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(farmer, Farmer.class) );

        
        
        return response;
		
	}
	
	
	
	


	@ResponseBody
	@RequestMapping(value ="/get/by/phone",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String getByPhone(@RequestBody FarmerJson farmerJson) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("farmerJson = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(farmerJson, FarmerJson.class) );
    	

    	try
   		{

    		
    		
    		
			Type listType = new TypeToken<List<Farmer>>(){}.getType();

			
    		List<Farmer> farmerList  = farmerRepository.findByPhoneRegex(farmerJson.phone);
    		

			if (farmerList.size()>0) 
			{
				response = "{\"message\":\"success\", "
	        			+ "\"farmer_list\" : " + ( new GsonBuilder().create() ).toJson(farmerList, listType) + ""
	        			+ "}";
			}
			else
			{
				response = "{\"message\":\"not_found\" }";
			}
        	
    		
    		
    		
		} catch (Exception e)
		{
			
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());


			response = "{\"message\":\"error\"}";
			
			
			if (e.getMessage().toString().contains("non unique result"))
			{
				response = "{\"message\":\"duplicate\"}";

			}
			
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
    		
    		
    		List<Farmer> farmerList =  farmerService.getLatest();

    		    		
    		    		
    		
        	Type listType = new TypeToken<List<Farmer>>(){}.getType();
    		

    		if ( (farmerList==null) || (farmerList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else {
    			

            	response = "{\"message\":\"success\", "
            			+ "\"farmer_list\" : " + ( new GsonBuilder().create() ).toJson(farmerList, listType) + ""
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
    		
    		
    		long count =  farmerService.getCount();

    		    		

        	response = "{\"message\":\"success\", "
        			+ "\"farmer_count\" : " + count + ""
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
	@RequestMapping(value ="/add",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String add(@RequestBody Farmer farmer)
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("farmer= " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(farmer, Farmer.class) );

    	
        try
		{
        	
    		farmerService.add(farmer);

    		
        	response = "{\"message\":\"success\"}";
        	
			
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
        
        
		
        LOGGER.info("response 2= "+response);
        
		return response;

	}
	
	
	
	
	
	
	

	
	@ResponseBody
	@RequestMapping(value ="/update",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String update(@RequestBody Farmer farmer)
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("farmer = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(farmer, Farmer.class) );

    	
        try
		{


    		farmerService.update(farmer);

        	
        	
        	
        	response = "{\"message\":\"success\"}";
        	
			
		} catch (Exception e)
		{
			
			
			LOGGER.error(e.getLocalizedMessage());
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());
			LOGGER.error(e.hashCode());
			e.printStackTrace();
			
			response = "{\"message\":\"Error\"}";
			
			
			if (e.getCause().toString().contains("E11000")) {
				
				response = "{\"message\":\"duplicate_entry\"}";
				
			}
			
			
			

		}
        
        
		
        LOGGER.info("response = "+response);
        
		return response;

	}
	
	
	
	
	
	

	

	
	@ResponseBody
	@RequestMapping(value ="/search/by/name",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String searchByName(@RequestBody FarmerJson farmerJson)
//	public String add()
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("farmerJson = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(farmerJson, FarmerJson.class) );

    	
        try
		{

        	
        	Type listType = new TypeToken<List<Farmer>>(){}.getType();

        	
        	List<Farmer> farmerList = farmerService.searchByName(farmerJson);
        	


    		
    		if ( (farmerList==null) || (farmerList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else {
    			

            	response = "{\"message\":\"success\", "
            			+ "\"farmer_list\" : " + ( new GsonBuilder().create() ).toJson(farmerList, listType) + ""
            			+ "}";

    			
    		}
    		
        	
        	
        	
        	
        	
			
		} catch (Exception e)
		{
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
	@RequestMapping(value ="/search/by/phone",
					method = RequestMethod.POST, 
					consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String searchByPhone(@RequestBody FarmerJson farmerJson)
//	public String add()
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("farmerJson = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(farmerJson, FarmerJson.class) );

    	
        try
		{

        	

        	
        	List<Farmer> farmerList = farmerService.searchByPhone(farmerJson);
        	


    		
    		if ( (farmerList==null) || (farmerList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else {
    			
            	Type listType = new TypeToken<List<Farmer>>(){}.getType();

            	response = "{\"message\":\"success\", "
            			+ "\"farmer_list\" : " + ( new GsonBuilder().create() ).toJson(farmerList, listType) + ""
            			+ "}";

    			
    		}
    		
        	
        	
        	
        	
        	
			
		} catch (Exception e)
		{
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
	public String searchBetweenCreate_date(@RequestBody  Farmer farmer)
	{
        String response = "{\"message\":\"error\"}";
        

    	LOGGER.info("farmer = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(farmer, Farmer.class) );

        try
		{
        	
        	
        	List<Farmer> farmerList = farmerService.searchBetweenCreate_date(farmer);
        	
        	LOGGER.info("farmerList size = " + farmerList.size());
        	
    		

    		
    		if ( (farmerList==null) || (farmerList.size()==0) )
    		{
    			response = "{\"message\":\"not_found\"}";
    		}
    		else 
    		{
    			
    			
            	Type listType = new TypeToken<List<Farmer>>(){}.getType();


            	response = "{\"message\":\"success\", "
            			+ "\"farmer_list\" : " + ( new GsonBuilder().create() ).toJson(farmerList, listType) + ""
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
	@RequestMapping(value ="/file/upload/aadhar_card",
					method = RequestMethod.POST,
					consumes = {"multipart/form-data"},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String uploadAadharCard (@RequestPart(value= "file")   MultipartFile multipartFile, @RequestPart(value="farmer")   Farmer farmer)  
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("farmer = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(farmer, Farmer.class) );

    	

    	try
   		{
    		
    		HashMap<String, String> messageMap = farmerService.uploadAadharCard(multipartFile,farmer);
    		
    		
    		Gson gson = new GsonBuilder().create();

    		response = gson.toJson(messageMap);
    		
    		
    		
    		
		} catch (Exception e)
		{
			e.printStackTrace();
			
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());
			
			
			response = "{\"message\":\"error\"}";
			
			
		}
        
        
        return response;
		
	}
	
	
	
	
	

	
	@ResponseBody
	@RequestMapping(value ="/file/download/aadhar_card",
					method = RequestMethod.GET,					
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public ResponseEntity<ByteArrayResource> downloadAadharCard(@RequestParam(value = "i") String id, @RequestParam(value = "f")  String fileName ) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("fileName = " + fileName);
    	byte[] data = null;
    	
    	ByteArrayResource resource = null;
    	

    	try
   		{
    		data = farmerService.downloadAadharCard( id, fileName );

            resource = new ByteArrayResource(data);
            
            
            response = "{\"message\":\"success\"}";

//    		response = "{\"message\":\""+message+"\" }";
    		
    		
		} catch (Exception e)
		{
			e.printStackTrace();
			
			LOGGER.error(e.getMessage());
			LOGGER.error(e.getCause());
			
			
			response = "{\"message\":\"error\"}";
			
			
		}
        
        


        
    	return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                .body(resource);
		
	}
	
	
	
	
	
	
	
	@ResponseBody
	@RequestMapping(value ="/file/delete/aadhar_card",
					method = RequestMethod.POST,
					consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public String deleteAadharCard (@RequestBody  Farmer farmer)  
	{
		
		
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("farmer = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(farmer, Farmer.class) );

        try
		{
        	
        	
        	farmerService.deleteAadharCard(farmer);
        	
        	
        	response = "{\"message\":\"success\"}";
        	
        	


			
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










