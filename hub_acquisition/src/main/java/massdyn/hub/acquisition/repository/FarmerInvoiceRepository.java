package massdyn.hub.acquisition.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import massdyn.hub.acquisition.model.Consignment;
import massdyn.hub.acquisition.model.FarmerInvoice;
import massdyn.hub.acquisition.model.TransporterF2HInvoice;

public interface FarmerInvoiceRepository extends MongoRepository<FarmerInvoice, String> 
{

	

	@Query(value = "{'full_name': {$regex : ?0, $options: 'i'}}")
	public List<FarmerInvoice> findByFullNameRegex(String regexString);

	
	@Query(value = "{'phone': {$regex : ?0, $options: 'i'}}")
	public List<FarmerInvoice> findByPhoneRegex(String regexString);
	
	
	
	public List<FarmerInvoice> findTop100ByOrderByCreateDateDesc();
	
	
	
	

	
	@Query(value = "{'create_date':{ $gte: ?0, $lte: ?1}}")
	public List<FarmerInvoice> findByCreateDateBetween(Date createDate, Date updateDate);



}
