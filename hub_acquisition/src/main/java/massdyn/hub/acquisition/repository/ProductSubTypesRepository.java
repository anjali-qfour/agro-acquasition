package massdyn.hub.acquisition.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import massdyn.hub.acquisition.model.ProductSubTypes;


 
public interface ProductSubTypesRepository extends MongoRepository<ProductSubTypes, String>
{

	@Query("{ 'product_types_id' : ?0 }")
    List<ProductSubTypes> findByProductTypesId(String id);
}
