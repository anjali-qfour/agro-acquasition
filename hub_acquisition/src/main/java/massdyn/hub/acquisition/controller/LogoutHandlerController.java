package massdyn.hub.acquisition.controller;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Controller;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class LogoutHandlerController implements LogoutHandler 
{

  
	private static final Logger LOGGER = LogManager.getLogger(LogoutHandlerController.class);



	@Override
	public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
	{
		
		LOGGER.info("Reset AWSELBAuthSessionCookie");
		
		try {
			Cookie awsCookie1 = new Cookie("AcquisitionSessionCookie-0", "deleted");
			awsCookie1.setMaxAge(-1);
			awsCookie1.setPath("/");
	        response.addCookie(awsCookie1);
	        
			Cookie awsCookie2 = new Cookie("AcquisitionSessionCookie-1", "deleted");
			awsCookie2.setMaxAge(-1);
			awsCookie2.setPath("/");
	        response.addCookie(awsCookie2);
	        
	        
			Cookie awsCookie3 = new Cookie("AcquisitionSessionCookie-2", "deleted");
			awsCookie3.setMaxAge(-1);
			awsCookie3.setPath("/");
	        
			response.addCookie(awsCookie3);
	        
	        response.sendRedirect("https://agrotech.auth.ap-south-1.amazoncognito.com/logout?client_id=6v450fao1dgoec2cj1ntdfvqid&logout_uri=https://acquisition.gro-systems.com/home");
	        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");
	        response.setHeader("Pragma", "no-cache");
	        response.setDateHeader("Expires", -1);
	        
	        
	        
//	        request.getSession().invalidate();
	        
	        
		} 
		catch (IOException e) 
		{
			LOGGER.error("Exception in redirecting to logout.url URL", e);
	 	}
		
	}

}
