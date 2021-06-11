package massdyn.hub.acquisition.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.model.AdminGetUserRequest;
import com.amazonaws.services.cognitoidp.model.AdminGetUserResult;
import com.amazonaws.services.cognitoidp.model.AttributeType;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import massdyn.hub.acquisition.configuration.CognitoConfiguration;
import massdyn.hub.acquisition.controller.HomeController;
import massdyn.hub.acquisition.model.CognitoUser;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;




@Service
@PropertySource(value ={ "classpath:aws.properties" })
public class AuthenticationService
{
	private static final Logger LOGGER = LogManager.getLogger(AuthenticationService.class);

	
	@Autowired
	CognitoConfiguration cognitoConfig;




	

	@Value("${aws.userpoolid}")
	private String userPoolId;

	
	
	

	public CognitoUser getUser(HttpServletRequest httpServletRequest, String[] pageAccessRoles)
	{
		CognitoUser cognitoUser = new CognitoUser();
		
		
        boolean isAuthenticated = false;
        
        
        OkHttpClient okHttpClient = new OkHttpClient();
        
        
        
        
		
		String url = "https://agrotech.auth.ap-south-1.amazoncognito.com/oauth2/userInfo";
		
		
		

		String accesstoken = httpServletRequest.getHeader("x-amzn-oidc-accesstoken");
		String idtoken = httpServletRequest.getHeader("x-amzn-oidc-identity");
		String data = httpServletRequest.getHeader("x-amzn-oidc-data");
		
		
		
		LOGGER.info("accesstoken 1 = "+accesstoken );
		LOGGER.info("idtoken 1 = "+idtoken );
		LOGGER.info("data 1 = "+data );
		
		
		
		


		if (idtoken!=null && accesstoken!=null)
		{

			
			Request request = new Request.Builder()
										    .url(url)
										    .addHeader("Authorization", "Bearer " + accesstoken)
										    .build();
			
			try
			{
				
				Response response = okHttpClient.newCall(request).execute();
				
				if (response.isSuccessful())
				{
					String responseBodyStr = response.body().string();
					
					
					LOGGER.info("responseBodyStr 1 = " +responseBodyStr);
					
					
					Gson gson = new Gson(); 
				    
				    cognitoUser = gson.fromJson(responseBodyStr, CognitoUser.class);
					
				    
				    

					LOGGER.info("cognitoUser 1 = " 
							+ ( new  GsonBuilder().setPrettyPrinting().create()).toJson(cognitoUser) );
					
					
					
					cognitoUser =  getUserAttributes(cognitoUser);
					
					

					LOGGER.info("cognitoUser 2 = " 
							+ ( new  GsonBuilder().setPrettyPrinting().create()).toJson(cognitoUser) );
					
					
					
									
					
					
					
					if ( validateAuthentication(cognitoUser, pageAccessRoles) )
					{
						cognitoUser.isAuthenticated = true;
					}
					else
					{
						cognitoUser.isAuthenticated = false;
					}

					
					
					
					
					
				}
				else 
				{
					cognitoUser.setAuthenticated(false);
				}


			}
			catch (Exception e)
			{
				
				e.getStackTrace();
				
				LOGGER.error(e.getMessage());
				LOGGER.error(e.getLocalizedMessage());
				LOGGER.error(e.getCause());			
					
				
			}
		
			
		}
		
		
		cognitoUser.isAuthenticated = true;

		
		return cognitoUser;
		
		
	}

	
	

	
	
	public boolean validateAuthentication(CognitoUser cognitoUser, String[] pageAccessRoles)
	{
		
		boolean valid = false;
		
		
		LOGGER.info(pageAccessRoles);
		
		
		
		HashMap<String, Integer> accessLevelMap = new HashMap<>(); 
		  
		accessLevelMap.put("all", 0); 
		accessLevelMap.put("excecutive", 1);
		accessLevelMap.put("manager", 2);
		accessLevelMap.put("headofdeparment", 3);
		accessLevelMap.put("chiefexcecutive", 4);
		accessLevelMap.put("partner", 5);
		accessLevelMap.put("superuser", 6);
		
		
		HashMap<String, Integer> pageAccessRolesMap = new HashMap<>(); 

		
		for (int i=0; i<pageAccessRoles.length; i++)
		{
			String [] pageAccessRole = pageAccessRoles[i].split(":");
			
			pageAccessRolesMap.put(pageAccessRole[0], accessLevelMap.get(pageAccessRole[1]));
			
		}
		
		
		LOGGER.info (pageAccessRolesMap.get(cognitoUser.access_role));
		
		
		
		if (pageAccessRolesMap.get(cognitoUser.access_role)==null)
		{
			LOGGER.info ("no access");
		}		
		else
		{
			LOGGER.info ("role granted");
			
			int accessLevelNo = accessLevelMap.get(cognitoUser.access_level);
			
			
			LOGGER.info ("user accessLevelNo = "+accessLevelNo);
			
			LOGGER.info ("page accessLevelNo = "+pageAccessRolesMap.get(cognitoUser.access_role));
			
			if (pageAccessRolesMap.get(cognitoUser.access_role)<=accessLevelNo)
			{
				LOGGER.info ("access level granted");
				
				valid = true;
			}
			else 
			{
				LOGGER.info ("access level NOT granted");
				
			}
			
			
		}
		
		
		if (pageAccessRolesMap.get("all")!=null)
		{
			LOGGER.info ("All can see");
			valid = true;
		}	
		
		
		if (cognitoUser.access_role=="superuser")
		{
			valid = true;
		}
        
		
		
		
		return valid;
		
	}

	
	
	
	
	
	
	
	
	
	
	
	public CognitoUser getUser(HttpServletRequest httpServletRequest, String[] accessRoles, String[] accessLevel)
	{
		CognitoUser cognitoUser = new CognitoUser();
		
		
        boolean isAuthenticated = false;
        
        
        OkHttpClient okHttpClient = new OkHttpClient();
        
        
        
        
		
		String url = "https://agrotech.auth.ap-south-1.amazoncognito.com/oauth2/userInfo";
		
		
		

		String accesstoken = httpServletRequest.getHeader("x-amzn-oidc-accesstoken");
		String idtoken = httpServletRequest.getHeader("x-amzn-oidc-identity");
		String data = httpServletRequest.getHeader("x-amzn-oidc-data");
		
		
		
		LOGGER.info("accesstoken 1 = "+accesstoken );
		LOGGER.info("idtoken 1 = "+idtoken );
		LOGGER.info("data 1 = "+data );
		
		
		
		


		if (idtoken!=null && accesstoken!=null)
		{

			
			Request request = new Request.Builder()
										    .url(url)
										    .addHeader("Authorization", "Bearer " + accesstoken)
										    .build();
			
			try
			{
				
				Response response = okHttpClient.newCall(request).execute();
				
				if (response.isSuccessful())
				{
					String responseBodyStr = response.body().string();
					
					
					LOGGER.info("responseBodyStr 1 = " +responseBodyStr);
					
					
					Gson gson = new Gson(); 
				    
				    cognitoUser = gson.fromJson(responseBodyStr, CognitoUser.class);
					
				    
				    

					LOGGER.info("cognitoUser 1 = " 
							+ ( new  GsonBuilder().setPrettyPrinting().create()).toJson(cognitoUser) );
					
					
					
					cognitoUser =  getUserAttributes(cognitoUser);
					
					

					LOGGER.info("cognitoUser 2 = " 
							+ ( new  GsonBuilder().setPrettyPrinting().create()).toJson(cognitoUser) );
					
					
					
					if ( (Arrays.asList(accessRoles).contains(cognitoUser.access_role)) && (Arrays.asList(accessLevel).contains(cognitoUser.access_level)) )
					{
						cognitoUser.isAuthenticated = true;
					}
					else
					{
						cognitoUser.isAuthenticated = false;
					}

					
					
					
					
					
				}
				else 
				{
					cognitoUser.setAuthenticated(false);
				}


			}
			catch (Exception e)
			{
				
				e.getStackTrace();
				
				LOGGER.error(e.getMessage());
				LOGGER.error(e.getLocalizedMessage());
				LOGGER.error(e.getCause());			
					
				
			}
		
			
		}
		
		
		cognitoUser.isAuthenticated = true;
		
		
		return cognitoUser;
		
		
	}



	
	public CognitoUser getUserAttributes(CognitoUser cognitoUser) throws Exception
	{
		

    	LOGGER.info("userEmail = " + cognitoUser.getEmail());
    	
    	
		AWSCognitoIdentityProvider cognitoClient = cognitoConfig.getAmazonCognitoIdentityClient();

		AdminGetUserRequest adminGetUserRequest = new AdminGetUserRequest()
															.withUserPoolId(userPoolId)
															.withUsername(cognitoUser.getEmail())
															;
		
		
		
		AdminGetUserResult adminGetUserResult = cognitoClient.adminGetUser(adminGetUserRequest);
		

//		LOGGER.info("adminGetUserResult = " + 
//				(new GsonBuilder().setPrettyPrinting().create())
//					.toJson(adminGetUserResult, AdminGetUserResult.class) );

    
		cognitoUser.enabled = adminGetUserResult.getEnabled();
		
		
		List attributeTypeList = new ArrayList<AttributeType>();

		attributeTypeList = adminGetUserResult.getUserAttributes();
		
		
		for (int i=0; i<attributeTypeList.size(); i++)
		{
			AttributeType attributeType =  (AttributeType) attributeTypeList.get(i);
			
//
//	    	LOGGER.info("attributeType = " + 
//					(new GsonBuilder().setPrettyPrinting().create())
//						.toJson(attributeType, AttributeType.class) );
	    	
	    	if (attributeType.getName().indexOf("name")==0) 
	    	{
	    		cognitoUser.name = attributeType.getValue();
	    		
	    	}
	    	

	    	if (attributeType.getName().indexOf("family_name")==0) 
	    	{
	    		cognitoUser.family_name = attributeType.getValue();
	    	}
	    	

	    	if (attributeType.getName().indexOf("email")==0) 
	    	{
	    		cognitoUser.email = attributeType.getValue();
	    	}
	    	

	    	if (attributeType.getName().indexOf("custom:access_data")==0) 
	    	{
	    		String[] access_data = attributeType.getValue().split(":");
	    		cognitoUser.access_role = access_data[0];
	    		cognitoUser.access_level = access_data[1];
	    	}



	    	if (attributeType.getName().indexOf("custom:phone")==0) 
	    	{
	    		cognitoUser.phone = attributeType.getValue();
	    	}

			
		}
		
		
		
		
		
		return cognitoUser;
		
	}

	

}
