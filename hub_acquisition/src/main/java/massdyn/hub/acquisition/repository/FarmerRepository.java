package massdyn.hub.acquisition.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;

import massdyn.hub.acquisition.model.Farmer;
import massdyn.hub.acquisition.model.FarmerInvoice;
import massdyn.hub.acquisition.model.TransporterF2H;




public interface FarmerRepository extends MongoRepository<Farmer, String>, FarmerCustomRepository
{

	@Query("{'id' : ?0}")
	public Farmer getById(String id);
	
	@Query("{'phone' : ?0}")
	public Farmer getByPhone(String phone);
	

	
	@Query(value = "{'name': {$regex : ?0, $options: 'i'}}")
	public List<Farmer> findByNameRegex(String regexString);
	

	
	@Query(value = "{'surname': {$regex : ?0, $options: 'i'}}")
	public List<Farmer> findBySurnameRegex(String regexString);
	

	@Query(value = "{'phone': {$regex : ?0, $options: 'i'}}")
	public List<Farmer> findByPhoneRegex(String regexString);
	


	

	
	public List<Farmer> findTop100ByOrderByCreateDateDesc();
	
	
	
	@Query(value = "{'create_date':{ $gte: ?0, $lte: ?1}}")
	public List<Farmer> findBetweenCreate_date(Date createDate, Date updateDate);
	
	
	

}