package massdyn.hub.acquisition.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;

import massdyn.hub.acquisition.model.Farmer;
import massdyn.hub.acquisition.model.Farm;




public interface FarmRepository extends MongoRepository<Farm, String>
{

	@Query("{'id' : ?0}")
	public Farmer getById(String id);
		

	
	@Query(value = "{'farmer_id': {$regex : ?0, $options: 'i'}}")
	public List<Farm> findByFarmer_idRegex(String regexString);
	


	
	

}