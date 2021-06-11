package massdyn.hub.acquisition.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.amazonaws.util.IOUtils;

import massdyn.hub.acquisition.model.Farmer;

import com.amazonaws.services.s3.model.DeleteObjectRequest;

 
@Service
@PropertySource(value = {"classpath:aws.properties"})
public class AWSS3Service 
{
	private static final Logger LOGGER = LogManager.getLogger(AWSS3Service.class);

	@Autowired
	AmazonS3 amazonS3Client;

    @Value("${s3.bucket}")
    String bucketName;


    
    
    public void deleteFolder(String keyName) 
    {
		LOGGER.info("AWSS3Servises.deleteFolder : bucketName = " +bucketName);

		LOGGER.info("AWSS3Servises.deleteFolder : bucketName = "+amazonS3Client.listObjects(bucketName, keyName).getObjectSummaries().size() );

		
		
		for (S3ObjectSummary file : amazonS3Client.listObjects(bucketName, keyName).getObjectSummaries())
		{
			LOGGER.info("AWSS3Servises.deleteFolder : file = " +file.getKey());

			amazonS3Client.deleteObject(bucketName, file.getKey());
		}
		
//    	amazonS3Client.deleteObject(new DeleteObjectRequest(bucketName, keyName));

    }
    
    
    
    public void uploadFile(String keyName, String localUploadFilePath) 
    {
    	try 
    	{
    		
			LOGGER.info("AWSS3Servises.uploadFile : keyName = "+keyName);

			LOGGER.info("AWSS3Servises.uploadFile : localUploadFilePath = "+localUploadFilePath);

    		
    		File file = new File(localUploadFilePath);
          
    		amazonS3Client.putObject(new PutObjectRequest(bucketName, keyName, file));
          
        } 
    	catch (AmazonServiceException ase) 
    	{
    		LOGGER.info("Caught an AmazonServiceException from PUT requests, rejected reasons:");
    		LOGGER.info("Error Message:    " + ase.getMessage());
    		LOGGER.info("HTTP Status Code: " + ase.getStatusCode());
    		LOGGER.info("AWS Error Code:   " + ase.getErrorCode());
    		LOGGER.info("Error Type:       " + ase.getErrorType());
    		LOGGER.info("Request ID:       " + ase.getRequestId());
    		
    	} 
    	catch (AmazonClientException ace) 
    	{
    		LOGGER.info("Caught an AmazonClientException: ");
    		LOGGER.info("Error Message: " + ace.getMessage());
        };
        
        
      
    }

    
    
    
    
	@Async
	public String uploadFile(final MultipartFile multipartFile, String uploadFullPath) 
	{
		String message = "error";

		LOGGER.info("File upload in progress.");
		try
		{
			
			LOGGER.info("validateFileType = "+validateFileType(multipartFile));

			
			if (validateFileType(multipartFile))
			{
				final File file = convertMultiPartFileToFile(multipartFile);
				
				
				
				uploadFileToS3Bucket(bucketName,uploadFullPath, file);
				
				
				LOGGER.info("File upload is completed.");
				
				file.delete(); // To remove the file locally created in the project folder.
				
				message = "success";
				
			}
			else 
			{
				message = "invalid_type";
				
			}
			
			
			
			
			
		
		} catch (final AmazonServiceException ex)
		{
			LOGGER.info("File upload is failed.");
			LOGGER.error("Error= {} while uploading file.", ex.getMessage());
			
			message = ex.getMessage();
			
		}
		
		
		return message;
	}

	
	
	
	
	private File convertMultiPartFileToFile(final MultipartFile multipartFile)
	{
		final File file = new File(multipartFile.getOriginalFilename());
		
		try (final FileOutputStream outputStream = new FileOutputStream(file))
		{
			
			outputStream.write(multipartFile.getBytes());
			
		} catch (final IOException ex)
		{
			LOGGER.error("Error converting the multi-part file to file= ", ex.getMessage());
		}
		
		return file;
	}
	
	
	private void uploadFileToS3Bucket(final String bucketName, String uploadFullPath, final File file)
	{
		
		

		
		final PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, uploadFullPath, file);
		
		amazonS3Client.putObject(putObjectRequest);
	}
	 
	
	
	

	
	@Async
	public byte[] downloadFile(String filePath)
	{
		byte[] content = null;

		final S3Object s3Object = amazonS3Client.getObject(bucketName, filePath);
		
		final S3ObjectInputStream stream = s3Object.getObjectContent();
		
		try
		{
			content = IOUtils.toByteArray(stream);
			
			LOGGER.info("File downloaded successfully.");
			
			s3Object.close();
			
			
		} catch (final IOException ex)
		{
			LOGGER.info("IO Error Message= " + ex.getMessage());
		}
		return content;
	}
	
	
	
	
	
	


	private boolean validateFileType(MultipartFile multipartFile)
	{
		boolean isValid = false;

		LOGGER.info(multipartFile.getContentType());
		
		LOGGER.info(multipartFile.getContentType().equalsIgnoreCase("image/png"));

		
		
		if (multipartFile.getContentType().equalsIgnoreCase("image/jpeg"))
		{
			
			isValid =true;
			
		}
		
		if (multipartFile.getContentType().equalsIgnoreCase("image/png"))
		{
			
			isValid =true;
			
		}
		
		return isValid;
	}

	
	

    public void deleteFile(String filePath) throws Exception 
    {
    	final DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(bucketName, filePath);
    	
    	amazonS3Client.deleteObject(deleteObjectRequest);
		

    }
	
	
	
}
