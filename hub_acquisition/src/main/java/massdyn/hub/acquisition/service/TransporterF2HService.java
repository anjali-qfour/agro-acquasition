package massdyn.hub.acquisition.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;


import com.google.gson.GsonBuilder;

import massdyn.hub.acquisition.model.Consignment;
import massdyn.hub.acquisition.model.Farmer;
import massdyn.hub.acquisition.model.FarmerInvoice;
import massdyn.hub.acquisition.model.FarmerJson;
import massdyn.hub.acquisition.model.ProductCategories;
import massdyn.hub.acquisition.model.ProductSubTypes;
import massdyn.hub.acquisition.model.ProductTypes;
import massdyn.hub.acquisition.model.TransporterF2H;
import massdyn.hub.acquisition.model.VendorPayment;
import massdyn.hub.acquisition.repository.FarmerRepository;
import massdyn.hub.acquisition.repository.ProductCategoriesRepository;
import massdyn.hub.acquisition.repository.ProductSubTypesRepository;
import massdyn.hub.acquisition.repository.ProductTypesRepository;
import massdyn.hub.acquisition.repository.TransporterF2HRepository;
import massdyn.hub.acquisition.repository.VendorPaymentRepository;



@Service
public class TransporterF2HService
{

	private static final Logger LOGGER = LogManager.getLogger(TransporterF2HService.class);

	



	@Autowired(required = true)
	TransporterF2HRepository transporterF2HRepository;
	
	@Autowired(required = true)
	VendorPaymentRepository vendorPaymentRepository;
	
	
		

	

	public void add(TransporterF2H transporterF2H) throws Exception
	{
		


    	LOGGER.info("transporterF2H = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2H, TransporterF2H.class) );



    	List<VendorPayment> vendorPaymentList = transporterF2H.getVendor_payment_list();
    	
    	if ((vendorPaymentList.size()>0))
    	{
    		vendorPaymentRepository.saveAll(vendorPaymentList);

    	}
    	 	
    	
    	
		
		transporterF2H.setCreateDate((new Date()));
    	transporterF2H.setUpdateDate((new Date()));
    		
    	

    	transporterF2HRepository.save(transporterF2H);
    	
		
	}
	
	
	
	
	
	
	
	
	public void update(TransporterF2H transporterF2H) throws Exception
	{
		


		LOGGER.info("transporterF2H = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2H, TransporterF2H.class) );

		
		

    	transporterF2H.setUpdateDate((new Date()));
    	
    	

    	List<VendorPayment> vendorPaymentList = transporterF2H.getVendor_payment_list();
    	
    	if ((vendorPaymentList.size()>0))
    	{
    		vendorPaymentRepository.saveAll(vendorPaymentList);

    	}
    	 	
    	
    	

    	List<String> deletedVendorPaymentList =  transporterF2H.getDeleted_vendor_payment_list();
    	    	
    	if ((deletedVendorPaymentList.size()>0))
    	{
    		deletedVendorPaymentList.forEach(deletedVendorPayment->{
    			vendorPaymentRepository.deleteById(deletedVendorPayment);
    		});
    		
    	}
    	
    	
    	
    	

    	transporterF2HRepository.save(transporterF2H);
    	
    	
		
	}
	
	
	
	
	
	
	

	public List<TransporterF2H> searchByName(TransporterF2H transporterF2H) throws Exception
	{
		
		LOGGER.info("transporterF2H = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(transporterF2H, TransporterF2H.class) );
    
		
		List<TransporterF2H> nameTransporterF2HList = transporterF2HRepository.findByNameRegex(transporterF2H.getName());
		
		List<TransporterF2H> surnameTransporterF2HList = transporterF2HRepository.findBySurnameRegex(transporterF2H.getName());
		
		
		List<TransporterF2H> transporterF2HList = new ArrayList<TransporterF2H>();
		
		
		if (nameTransporterF2HList!=null)
		{
			transporterF2HList.addAll(nameTransporterF2HList);
		}
		

		if (surnameTransporterF2HList!=null)
		{
			transporterF2HList.addAll(surnameTransporterF2HList);
		}
		
		
		
		
		return transporterF2HList;
	}



	
	
	
	
	public List<TransporterF2H> searchByPhone(TransporterF2H transporterF2H) throws Exception
	{
		
		List<TransporterF2H> transporterF2HList = transporterF2HRepository.findByPhoneRegex(transporterF2H.getPhone());

		
		
		return transporterF2HList;
	}






	public Optional<TransporterF2H> getById(TransporterF2H transporterF2H) throws Exception
	{
		
		Optional<TransporterF2H> optionalObj = transporterF2HRepository.findById(transporterF2H.getId().toLowerCase());
		
		
		
		return optionalObj;
				
	}






	public List<TransporterF2H> getLatest() throws Exception
	{
		LOGGER.info("Latest : getLatest = " );

		
		List<TransporterF2H> transporterF2HList = transporterF2HRepository.findTop100ByOrderByCreateDateDesc();
		
		
		
    	LOGGER.info("Latest : transporterF2HList size = "+transporterF2HList.size() );
    	
    	
    	return transporterF2HList;
	
	}







	public List<TransporterF2H> searchBetweenCreate_date(TransporterF2H transporterF2H)
	{
		List<TransporterF2H> transporterF2HList = transporterF2HRepository
															.findBetweenCreate_date(
																	transporterF2H.getCreateDate(),
																	transporterF2H.getUpdateDate()
																	);

		return transporterF2HList;	
	}







	public long getCount()
	{
		return transporterF2HRepository.count();

	}




	
		
}
