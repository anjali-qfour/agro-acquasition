package massdyn.hub.acquisition.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import massdyn.hub.acquisition.model.TransporterF2H;




public interface TransporterF2HRepository extends MongoRepository<TransporterF2H, String> 
{

	
	
	

	@Query("{'phone' : ?0}")
	public TransporterF2H getByPhone(String phone);
	
	
	
	@Query(value = "{'name': {$regex : ?0, $options: 'i'}}")
	public List<TransporterF2H> findByNameRegex(String regexString);
	

	@Query(value = "{'surname': {$regex : ?0, $options: 'i'}}")
	public List<TransporterF2H> findBySurnameRegex(String regexString);
	
	
	@Query(value = "{'phone': {$regex : ?0, $options: 'i'}}")
	public List<TransporterF2H> findByPhoneRegex(String regexString);
	

	@Query(value = "{'_id': {$regex : ?0, $options: 'i'}}")
	public List<TransporterF2H> findByIdRegex(String regexString);

	public List<TransporterF2H> findTop100ByOrderByCreateDateDesc();


	@Query(value = "{'create_date':{ $gte: ?0, $lte: ?1}}")
	public List<TransporterF2H> findBetweenCreate_date(Date createDate, Date updateDate);
	
	
	
	
	
}