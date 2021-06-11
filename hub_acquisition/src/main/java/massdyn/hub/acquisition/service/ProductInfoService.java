package massdyn.hub.acquisition.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;


import com.google.gson.GsonBuilder;


import massdyn.hub.acquisition.model.ProductCategories;
import massdyn.hub.acquisition.model.ProductInfo;
import massdyn.hub.acquisition.model.ProductSubTypes;
import massdyn.hub.acquisition.model.ProductTypes;
import massdyn.hub.acquisition.repository.ProductCategoriesRepository;
import massdyn.hub.acquisition.repository.ProductInfoRepository;
import massdyn.hub.acquisition.repository.ProductSubTypesRepository;
import massdyn.hub.acquisition.repository.ProductTypesRepository;



@Service
public class ProductInfoService
{

	private static final Logger LOGGER = LogManager.getLogger(ProductInfoService.class);

	


	@Autowired(required = true)
	ProductCategoriesRepository productCategoriesRepository;
	

	@Autowired(required = true)
	ProductTypesRepository productTypesRepository;
	
	@Autowired(required = true)
	ProductSubTypesRepository productSubTypesRepository;
	
	

	@Autowired(required = true)
	ProductInfoRepository productInfoRepository;
	


	public List<ProductCategories> getAllCategories() throws Exception
	{
		
		
		List<ProductCategories> productCategoriesList = productCategoriesRepository.findAll();
		
		
		
		return productCategoriesList;
		
		
	}


	public List<ProductTypes> getAllTypes(ProductCategories productCategories) throws Exception
	{
		
		List<ProductTypes> productTypesList = new ArrayList<>();
		
		productTypesList = productTypesRepository.findByProductCategoriesId(productCategories.getId());
		
		LOGGER.info("productTypesList = " + productTypesList.size() );
    
		
		
		return productTypesList;
	}



	public List<ProductSubTypes> getAllSubTypes(ProductSubTypes productSubTypes)
	{
		List<ProductSubTypes> productSubTypesList = new ArrayList<>();
		
		productSubTypesList = productSubTypesRepository.findByProductTypesId(productSubTypes.getId());
		
		LOGGER.info("productSubTypesList = " + productSubTypesList.size() );
    
		
		
		return productSubTypesList;
	}
	

	public List<ProductInfo> getAll() throws Exception 
	{
		
		List<ProductInfo> productInfoList = productInfoRepository.findAll();
		
		
		return productInfoList;
	}
}
