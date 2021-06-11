package massdyn.hub.acquisition.model;

import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;

@Getter 
@Setter 
@AllArgsConstructor
@NoArgsConstructor
public class CognitoUser
{
	
	public String email;
	
	public String email_verified; 
	
	public String username;
	
	
	
	
	public String name;
	public String family_name; 
	public String phone;

	public boolean enabled;

	
	
	public String access_role;
	public String access_level;
	
	public boolean isAuthenticated;

	
	

}
