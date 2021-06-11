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

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.model.AdminCreateUserRequest;
import com.amazonaws.services.cognitoidp.model.AdminCreateUserResult;
import com.amazonaws.services.cognitoidp.model.AdminDisableUserRequest;
import com.amazonaws.services.cognitoidp.model.AdminGetUserRequest;
import com.amazonaws.services.cognitoidp.model.AdminGetUserResult;
import com.amazonaws.services.cognitoidp.model.AdminUpdateUserAttributesRequest;
import com.amazonaws.services.cognitoidp.model.AttributeType;
import com.google.gson.GsonBuilder;

import massdyn.hub.acquisition.model.ProductPricing;
import massdyn.hub.acquisition.repository.ProductPricingRepository;



@Service
@PropertySource(value =
{ "classpath:aws.properties" })
public class ProductPricingService
{

	private static final Logger LOGGER = LogManager.getLogger(ProductPricingService.class);

	

	@Autowired(required = true)
	ProductPricingRepository productPricingRepository;
	


	

	



	public void addBulk(List<ProductPricing> productPricing) throws Exception
	{
		productPricingRepository.saveAll(productPricing);
		
		
	}









	public List<ProductPricing> getByDate(ProductPricing productPricing) throws Exception
	{
		List<ProductPricing> productPricingList =  productPricingRepository.findAllByCreateDate(productPricing.getCreateDate());
		
		return productPricingList;
	}









	public List<ProductPricing> getAll() throws Exception
	{
		List<ProductPricing> productPricingList =  productPricingRepository.findAll();
		
		return productPricingList;
	}









	public Optional<ProductPricing> getByDateAndProduct(ProductPricing productPricing)
	{
		
		
		LOGGER.info(productPricing.getCreateDate().getTime());
		
		
		String id = productPricing.getProduct_info_id()+"-"+productPricing.getCreateDate().getTime();
		
		LOGGER.info("id="+id);

		
		Optional<ProductPricing>  productPricingOptional = productPricingRepository.findById(id);
		
		LOGGER.info(productPricingOptional.isPresent());
		
		
		return productPricingOptional;
	}




}
