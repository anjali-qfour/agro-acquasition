package massdyn.hub.acquisition.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;

import massdyn.hub.acquisition.model.Farmer;
import massdyn.hub.acquisition.model.Relative;




public interface RelativeRepository extends MongoRepository<Relative, String>
{

	@Query("{'id' : ?0}")
	public Farmer getById(String id);
		

	
	@Query(value = "{'name': {$regex : ?0, $options: 'i'}}")
	public List<Relative> findByNameRegex(String regexString);
	


	
	

}