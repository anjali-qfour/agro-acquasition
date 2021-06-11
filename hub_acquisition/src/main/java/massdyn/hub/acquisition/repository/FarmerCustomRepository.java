package massdyn.hub.acquisition.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;

import massdyn.hub.acquisition.model.Farmer;





public interface FarmerCustomRepository  
{
	
	public void update(Farmer farmer);

	
}