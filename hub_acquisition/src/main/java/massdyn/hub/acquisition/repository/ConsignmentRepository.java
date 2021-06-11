package massdyn.hub.acquisition.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import massdyn.hub.acquisition.model.Consignment;
import massdyn.hub.acquisition.model.CoolingChamber;
import massdyn.hub.acquisition.model.Farmer;
import massdyn.hub.acquisition.model.FarmerInvoice;
import massdyn.hub.acquisition.model.TransporterF2H;




public interface ConsignmentRepository extends MongoRepository<Consignment, String> 
{
	
	
	

	@Query(value = "{'farmer_full_name': {$regex : ?0, $options: 'i'}}")
	public List<Consignment> findByFarmerFullNameRegex(String regexString);

	

	@Query(value = "{'transporter_f2h_full_name': {$regex : ?0, $options: 'i'}}")
	public List<Consignment> findByTransporterFullNameRegex(String regexString);

	

	@Query(value = "{'farmer_phone': {$regex : ?0, $options: 'i'}}")
	public List<Consignment> findByFarmerPhoneRegex(String regexString);
	
	
	@Query(value = "{'transporter_f2h_phone': {$regex : ?0, $options: 'i'}}")
	public List<Consignment> findByTransporterPhoneRegex(String regexString);
	
	
	
	
	

	@Query(value = "{'create_date':{ $gte: ?0, $lte: ?1}}")
	List<Consignment> findByCreate_dateBetween(Date startDate, Date endDate);

	
	
	
	public List<Consignment> findTop100ByOrderByCreateDateDesc();
	
	
	
	

	
//	@Query(value = "{'create_date':{ $gte: ?0, $lte: ?1}}")
//	public List<Consignment> findByCreateDateBetween(Date createDate, Date updateDate);
	
	
	
	

	@Query(value = "{'create_date':?0 }")
	public List<Consignment> findAllByCreateDate(Date createDate);
	


	
	
	//@Query("{'id' : ?0}")
	//public CoolingChamber getById(String id);
	
	
	
	
}