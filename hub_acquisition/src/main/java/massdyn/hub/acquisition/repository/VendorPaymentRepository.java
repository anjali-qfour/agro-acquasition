package massdyn.hub.acquisition.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;

import massdyn.hub.acquisition.model.Farmer;
import massdyn.hub.acquisition.model.VendorPayment;
import massdyn.hub.acquisition.model.Farm;




public interface VendorPaymentRepository extends MongoRepository<VendorPayment, String>
{

	
	

}