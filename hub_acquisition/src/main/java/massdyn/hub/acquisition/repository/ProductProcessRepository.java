package massdyn.hub.acquisition.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import massdyn.hub.acquisition.model.ProductInfo;
import massdyn.hub.acquisition.model.ProductProcess;


public interface ProductProcessRepository extends MongoRepository<ProductProcess, String>
{

	
	
}
