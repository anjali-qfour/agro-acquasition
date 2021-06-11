package massdyn.hub.acquisition.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;


import com.google.gson.GsonBuilder;

import massdyn.hub.acquisition.model.FarmerInvoice;
import massdyn.hub.acquisition.model.ProductCategories;
import massdyn.hub.acquisition.model.ProductInfo;
import massdyn.hub.acquisition.model.ProductProcess;
import massdyn.hub.acquisition.model.ProductSubTypes;
import massdyn.hub.acquisition.model.ProductTypes;
import massdyn.hub.acquisition.repository.ProductCategoriesRepository;
import massdyn.hub.acquisition.repository.ProductInfoRepository;
import massdyn.hub.acquisition.repository.ProductProcessRepository;
import massdyn.hub.acquisition.repository.ProductSubTypesRepository;
import massdyn.hub.acquisition.repository.ProductTypesRepository;



@Service
public class ProductProcessService
{

	private static final Logger LOGGER = LogManager.getLogger(ProductProcessService.class);

	
	@Autowired(required = true)
	ProductProcessRepository productProcessRepository;
	
	
	
	
	public void setSorting_machine_status(String id, String status) throws Exception
	{
		
		Optional<ProductProcess> optionalObj = productProcessRepository.findById(id);
		
		if (optionalObj.isPresent()) 
		{
			ProductProcess productProcess = optionalObj.get();
			
			productProcess.setSorting_machine_status(status);
			
			productProcessRepository.save(productProcess);			
			
		}
		else 
		{
			throw new NullPointerException();
			
		}
		
		
		
		
	}
	
	
	

	
}
