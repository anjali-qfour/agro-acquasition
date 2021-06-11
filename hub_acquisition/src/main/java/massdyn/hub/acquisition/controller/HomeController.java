package massdyn.hub.acquisition.controller;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.gson.Gson;

import massdyn.hub.acquisition.configuration.WebSecurityConfig;
import massdyn.hub.acquisition.model.CognitoUser;
import massdyn.hub.acquisition.service.AuthenticationService;

@Controller
public class HomeController
{
	
	private static final Logger LOGGER = LogManager.getLogger(HomeController.class);

	@Autowired 
	private AuthenticationService authenticationService;
	
	
	



	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	protected String root()
	{
		LOGGER.info("root");

		String returnUrl = "root";
        
		
	
		
        
		return returnUrl;
	}
	
	
	
	@RequestMapping(value = "home", method = RequestMethod.GET)
	protected String home()
	{
		LOGGER.info("home");

		String returnUrl = "root";
        
		
        
		return returnUrl;
	}
	
	

	@RequestMapping(value = "user/home", method = RequestMethod.GET)
	protected String userHome(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");
		
		
		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"all:all"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "view/view_home";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		
		
		
		
		return returnUrl;
		
		
	}
	

	
	@RequestMapping(value = "user/add/farmer", method = RequestMethod.GET)
	protected String add_farmer(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");

		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "add/add_farmer";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		
		
		return returnUrl;
		
		
	}
	
	
	
	@RequestMapping(value = "user/search/farmer", method = RequestMethod.GET)
	protected String searchFarmer(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");

		
		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "search/search_farmer";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		return returnUrl;
	}

	
	
	
	
	
	
	
	@RequestMapping(value = "user/view/farmer", method = RequestMethod.GET)
	protected String view_farmer(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");

		
		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "view/view_farmer";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		return returnUrl;
	}
	
	
	
	

	@RequestMapping(value = "user/add/transporter_f2h", method = RequestMethod.GET)
	protected String addTransporterF2H(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");

		
		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "add/add_transporter_f2h";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		return returnUrl;
	}
	
	

	@RequestMapping(value = "user/search/transporter_f2h", method = RequestMethod.GET)
	protected String searchTransporterF2H(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");

		
		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "search/search_transporter_f2h";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		return returnUrl;
		


	}
	

	@RequestMapping(value = "user/view/transporter_f2h", method = RequestMethod.GET)
	protected String viewTransporterF2H(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");


		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "view/view_transporter_f2h";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		return returnUrl;
	}
	
	

	@RequestMapping(value = "user/add/consignment", method = RequestMethod.GET)
	protected String addconsignment(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");


		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl =  "add/add_consignment";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		return returnUrl;
	}
	

	

	@RequestMapping(value = "user/search/consignment", method = RequestMethod.GET)
	protected String searchConsignment(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");

		

		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "search/search_consignment";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		return returnUrl;
	}
	
	

	@RequestMapping(value = "user/search/transporter_f2h_invoice", method = RequestMethod.GET)
	protected String searchTransporterF2HInvoice(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");


		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "search/search_transporter_f2h_invoice";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		return returnUrl;
	}
	
	
	
	

	@RequestMapping(value = "user/view/transporter_f2h_invoice", method = RequestMethod.GET)
	protected String viewTransporterF2HInvoice(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");


		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "view/view_transporter_f2h_invoice";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		return returnUrl;
	}
	
	
	
	
	

	@RequestMapping(value = "user/search/farmer_invoice", method = RequestMethod.GET)
	protected String searchFarmerInvoice(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");

		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "search/search_farmer_invoice";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		return returnUrl;
	}
	
	
	
	

	@RequestMapping(value = "user/view/farmer_invoice", method = RequestMethod.GET)
	protected String viewFarmerInvoice(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");


		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "view/view_farmer_invoice";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		return returnUrl;
	}
	
	
	
	
	
	
	
	@RequestMapping(value = "user/view/consignment", method = RequestMethod.GET)
	protected String viewConsignment(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");

		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "view/view_consignment";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}

		return returnUrl;
	}
	
	

	

	
	
	@RequestMapping(value = "user/search/summary/products", method = RequestMethod.GET)
	protected String search_summary_products(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");

		
		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "search/search_summary_products";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		return returnUrl;
	}
	
	
	
	
	

	

	
	
	@RequestMapping(value = "user/view/summary/products", method = RequestMethod.GET)
	protected String view_summary_products(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");

		
		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "view/view_summary_products";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		return returnUrl;
	}
	
	
	
	
	
	
	
	
	
	
	@RequestMapping(value = "user/add/cooling_chamber", method = RequestMethod.GET)
	protected String addCoolingChamber(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");

		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "add/add_cooling_chamber";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}

		return returnUrl;
	}
	
	
	@RequestMapping(value = "user/search/cooling_chamber", method = RequestMethod.GET)
	protected String searchCoolingChamber(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");

		

		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "search/search_cooling_chamber";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		return returnUrl;
	}
	
	
	
	@RequestMapping(value = "user/search_for_view/cooling_chamber", method = RequestMethod.GET)
	protected String searchForViewCoolingChamber(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");

		

		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "search/search_for_view_cooling_chamber";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		return returnUrl;
	}
	
	
	
	@RequestMapping(value = "user/view/cooling_chamber", method = RequestMethod.GET)
	protected String viewCooling_chamber(final HttpServletRequest req, final HttpServletResponse res,final Model model)
	{
		LOGGER.info("Started");


		String returnUrl = "/error";
		
		String [] pageAccessRoles = {"partner:partner","acquisition_operator:excecutive"};
		
		
		CognitoUser cognitoUser = authenticationService.getUser(req, pageAccessRoles);
		
		Gson gson = new Gson(); 
		
		
		
		if (cognitoUser.isAuthenticated()) 
		{
			returnUrl = "view/view_cooling_chamber";
			
			model.addAttribute("userinfo", gson.toJson(cognitoUser, CognitoUser.class) );

		}
		else 
		{
			returnUrl = "error/insufficient_access";
		}
		

		return returnUrl;
	}
	
	
	

//	@RequestMapping(value = "error/insufficient_access", method = RequestMethod.GET)
//	protected String insufficientAccess(final HttpServletRequest req, final HttpServletResponse res,final Model model)
//	{
//		LOGGER.info("Started");
//
//		String returnUrl = "search/search_farmer";
//		
////		String [] accessRoles = {"all"};
////		
////		authenticationUtil.setRequest(req);
////		
////        if (authenticationUtil.isAuthenticated(accessRoles))
////        {
////            model.addAttribute("userinfo",  authenticationUtil.getUserInfo() );
////
////        }
////        else
////        {
////    		returnUrl = "error/insufficient_access";
////        }
//
//		return returnUrl;
//	}


	
//	@RequestMapping("/error")
//	public String handleError(HttpServletRequest request) {
//	    Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
//	    
//	    if (status != null) {
//	        Integer statusCode = Integer.valueOf(status.toString());
//	    
//	        if(statusCode == HttpStatus.NOT_FOUND.value()) {
//	            return "error-404";
//	        }
//	        else if(statusCode == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
//	            return "error-500";
//	        }
//	    }
//	    return "error/error";
//	}
//	
	
	
//	@GetMapping("/error")
//	public String getDefaultPage(@RequestHeader(name = "errorcode") String errorCode) 
//	{
//		LOGGER.info("error code : " + errorCode);
//	  return "error";
//	}
	
	
	
	
	
}




//db.vendor_payment.remove({});db.transporter_f2h.remove({});db.farm.remove({});db.farmer.remove({});db.relative.remove({});


