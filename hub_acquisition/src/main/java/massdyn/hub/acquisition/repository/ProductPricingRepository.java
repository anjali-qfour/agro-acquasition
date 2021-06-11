package massdyn.hub.acquisition.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import massdyn.hub.acquisition.model.ProductPricing;





public interface ProductPricingRepository extends MongoRepository<ProductPricing, String>
{



	@Query(value = "{'create_date':?0 }")
	public List<ProductPricing> findAllByCreateDate(Date createDate);
	
	
}
