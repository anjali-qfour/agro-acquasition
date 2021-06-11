package massdyn.hub.acquisition.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
@PropertySource(value = {"classpath:aws.properties"})
public class AWSConfig 
{
	@Value("${aws.access.keyid}")
    private String accessKey;
    @Value("${aws.access.secret}")
    private String accessSecret;

    @Bean
	public AmazonS3 getAmazonS3Cient() 
    {
		final BasicAWSCredentials basicAWSCredentials = new BasicAWSCredentials("AKIAYW3QO2TSGXIMCMVP", "s7npoF5byvvuGgV2p8SX08VgSd/Oy4FxwFSbFnNv");
		// Get AmazonS3 client and return the s3Client object.
		

		
		return AmazonS3ClientBuilder
				.standard()
				.withRegion(Regions.fromName("ap-south-1"))
				.withCredentials(new AWSStaticCredentialsProvider(basicAWSCredentials))
				.withForceGlobalBucketAccessEnabled(true)
				.build();
	}
    
    
    
    
    

}
