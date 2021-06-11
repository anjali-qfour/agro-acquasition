package massdyn.hub.acquisition.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import massdyn.hub.acquisition.model.ProductInfo;


public interface ProductInfoRepository extends MongoRepository<ProductInfo, String>
{

	
	
}
