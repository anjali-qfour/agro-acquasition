package massdyn.hub.acquisition.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import massdyn.hub.acquisition.model.ProductCategories;

public interface ProductCategoriesRepository extends MongoRepository<ProductCategories , String>
{

	
}
