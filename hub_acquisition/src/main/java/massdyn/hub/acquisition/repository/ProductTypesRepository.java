package massdyn.hub.acquisition.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import massdyn.hub.acquisition.model.ProductTypes;




public interface ProductTypesRepository extends MongoRepository<ProductTypes, String>
{

	@Query("{ 'product_categories_id' : ?0 }")
    List<ProductTypes> findByProductCategoriesId(String id);

	

}
