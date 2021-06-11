package massdyn.hub.acquisition.controller;

import java.lang.reflect.Type;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
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
import massdyn.hub.acquisition.model.FileInfo;
import massdyn.hub.acquisition.model.TransporterF2H;
import massdyn.hub.acquisition.model.TransporterF2HInvoice;
import massdyn.hub.acquisition.repository.TransporterF2HRepository;
import massdyn.hub.acquisition.service.AWSS3Service;
import massdyn.hub.acquisition.service.FarmerInvoiceService;
import massdyn.hub.acquisition.service.TransporterF2HInvoiceService;
import massdyn.hub.acquisition.service.TransporterF2HService;










@RestController
@RequestMapping("/user/api")
public class AWSS3Controller
{
	
	private static final Logger LOGGER = LogManager.getLogger(AWSS3Controller.class);

	

	@Autowired(required = true)
	AWSS3Service awsS3Service;



	@ResponseBody
	@RequestMapping(value ="/file/upload",
					method = RequestMethod.POST,
					consumes = {"multipart/form-data"},
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }		    
					)
	public String fileUpload (@RequestPart(value= "file")   MultipartFile multipartFile, @RequestPart(value="fileInfo") FileInfo fileInfo)  
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("fileInfo = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(fileInfo, FileInfo.class) );

    	try
   		{
    		
    		
    		
    		
    		String message = awsS3Service.uploadFile(multipartFile, fileInfo.getUpload_full_path());
    		
    		
    		
    		
    		Gson gson = new GsonBuilder().create();

			response = "{\"message\":\""+message+"\"}";
    		
    		
    		
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
	@RequestMapping(value ="/file/delete",
					method = RequestMethod.POST,
					consumes = { MediaType.APPLICATION_JSON_VALUE, "application/json" }	,
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }		    
					)
	public String fileDelete (@RequestBody FileInfo fileInfo)  
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("fileInfo = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(fileInfo, FileInfo.class) );

    	try
   		{
    		
    		
    		
    		
    		awsS3Service.deleteFile(fileInfo.getUpload_full_path());
    		
    		
    		
    		
    		Gson gson = new GsonBuilder().create();

    		response = "{\"message\":\"success\"}";
    		
    		
    		
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
	@RequestMapping(value ="/file/download",
					method = RequestMethod.GET,					
		            produces = { MediaType.APPLICATION_JSON_VALUE, "application/json" }
		    
					)
	public ResponseEntity<ByteArrayResource> downloadAadharCard( @RequestParam(value = "f")  String uploadFullFilePath ) 
	{
        String response = "{\"message\":\"error\"}";

    	LOGGER.info("uploadFullFilePath = " + uploadFullFilePath);
    	
    	byte[] data = null;
    	
    	ByteArrayResource resource = null;
    	

    	try
   		{
//    		data = farmerService.downloadAadharCard(uploadFullFilePath );

    		data = awsS3Service.downloadFile(uploadFullFilePath);
    		
    		
    		
            resource = new ByteArrayResource(data);
            
            
            response = "{\"message\":\"success\"}";

    		
    		
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
//                .header("Content-disposition", "attachment; filename=\"" + fileName + "\"")
                .body(resource);
		
	}
	
	
	
	
	
	
	
	
}










