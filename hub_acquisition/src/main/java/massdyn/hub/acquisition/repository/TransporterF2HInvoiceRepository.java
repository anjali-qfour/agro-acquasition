package massdyn.hub.acquisition.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import massdyn.hub.acquisition.model.Consignment;
import massdyn.hub.acquisition.model.FarmerInvoice;
import massdyn.hub.acquisition.model.TransporterF2H;
import massdyn.hub.acquisition.model.TransporterF2HInvoice;

public interface TransporterF2HInvoiceRepository extends  PagingAndSortingRepository<TransporterF2HInvoice, String> 
{
	
	
	

	@Query(value = "{'full_name': {$regex : ?0, $options: 'i'}}")
	public List<TransporterF2HInvoice> findByFullNameRegex(String regexString);

	
	@Query(value = "{'phone': {$regex : ?0, $options: 'i'}}")
	public List<TransporterF2HInvoice> findByPhoneRegex(String regexString);
	
	
	
	public List<TransporterF2HInvoice> findTop10ByOrderByCreateDateDesc( );

	
	
	
	@Query(value = "{'create_date':{ $gte: ?0, $lte: ?1}}")
	public List<TransporterF2HInvoice> findByCreateDateBetween(Date createDate, Date updateDate);


	@Query(value = "{$and: [ {'transporter_f2h_id' : ?0}, {'create_date':{ $gte: ?2, $lte: ?1}}  ]}")
//	@Query(value = "{$and: [ {'transporter_f2h_id' : ?0} ]}")
	public List<TransporterF2HInvoice> findByIdAndCreateDateBetween(String transporter_f2h_id, Date nowDate, Date pastDate);
	
	
	
}
