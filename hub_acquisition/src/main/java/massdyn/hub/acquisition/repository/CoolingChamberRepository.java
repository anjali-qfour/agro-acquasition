package massdyn.hub.acquisition.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import massdyn.hub.acquisition.model.Consignment;
import massdyn.hub.acquisition.model.CoolingChamber;

public interface CoolingChamberRepository extends MongoRepository<CoolingChamber, String> 
{

	
	public List<CoolingChamber> findTop100ByOrderByCreateDateDesc();
	
	
	@Query(value = "{'create_date':{ $gte: ?0, $lte: ?1}}")
	List<CoolingChamber> findByCreate_dateBetween(Date startDate, Date endDate);

	
	
}
