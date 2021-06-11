package massdyn.hub.acquisition.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;

@Configuration
@PropertySource(value = {"classpath:aws.properties"})
public class CognitoConfiguration
{

	@Value("${aws.access.keyid}")
    private String accessKey;
	
	@Value("${aws.access.secret}")
    private String accessSecret;
	
	
	
	@Bean
	public AWSCognitoIdentityProvider getAmazonCognitoIdentityClient()
	{
		 return AWSCognitoIdentityProviderClientBuilder
				 	.standard()
				 	.withCredentials(new AWSStaticCredentialsProvider( new BasicAWSCredentials( accessKey, accessSecret ) ))				 	
				 	.withRegion(Regions.fromName("ap-south-1"))
				 	.build();
				 	
				 	
	}

}
