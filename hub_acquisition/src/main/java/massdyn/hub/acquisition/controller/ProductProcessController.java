package massdyn.hub.acquisition.controller;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import massdyn.hub.acquisition.model.ProductCategories;
import massdyn.hub.acquisition.model.ProductInfo;
import massdyn.hub.acquisition.model.ProductSubTypes;
import massdyn.hub.acquisition.model.ProductTypes;
import massdyn.hub.acquisition.service.ProductInfoService;
import massdyn.hub.acquisition.service.ProductProcessService;



@RestController
@RequestMapping(value ="/user/api/product_info")
public class ProductProcessController
{

	
	private static final Logger LOGGER = LogManager.getLogger(ProductProcessController.class);


	@Autowired(required = true)
	ProductProcessService productProcessService;
	
	
	
	
	
	

	
	
	


	
	
}
