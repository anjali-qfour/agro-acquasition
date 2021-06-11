package massdyn.hub.acquisition.service;

import java.util.ArrayList;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import massdyn.hub.acquisition.model.Consignment;
import massdyn.hub.acquisition.model.Farmer;
import massdyn.hub.acquisition.model.FarmerInvoice;
import massdyn.hub.acquisition.model.FarmerJson;
import massdyn.hub.acquisition.model.ProductCategories;
import massdyn.hub.acquisition.model.ProductSubTypes;
import massdyn.hub.acquisition.model.ProductTypes;
import massdyn.hub.acquisition.model.TransporterF2H;
import massdyn.hub.acquisition.model.TransporterF2HInvoice;
import massdyn.hub.acquisition.repository.ConsignmentRepository;
import massdyn.hub.acquisition.repository.FarmerRepository;
import massdyn.hub.acquisition.repository.ProductCategoriesRepository;
import massdyn.hub.acquisition.repository.ProductSubTypesRepository;
import massdyn.hub.acquisition.repository.ProductTypesRepository;
import massdyn.hub.acquisition.repository.TransporterF2HRepository;



@Service
public class ConsigmentService
{

	private static final Logger LOGGER = LogManager.getLogger(ConsigmentService.class);

	



	@Autowired(required = true)
	TransporterF2HInvoiceService transporterF2HInvoiceService;


	@Autowired(required = true)
	FarmerInvoiceService farmerInvoiceService;



	@Autowired(required = true)
	ConsignmentRepository consignmentRepository;




	@Autowired(required = true)
	FarmerService farmerService;
	

	public void add(Consignment consignment) throws Exception
	{
		
		TransporterF2HInvoice transporterF2HInvoice = transporterF2HInvoiceService.createAndAdd(consignment);
		
		consignment.setTransporter_f2h_invoice_id(transporterF2HInvoice.getId());
		
		
		
		
		FarmerInvoice farmerInvoice = farmerInvoiceService.createAndAdd(consignment);

		consignment.setFarmer_invoice_id(farmerInvoice.getId());
		
		
		
		
		
		
    	
    	consignment.setCreateDate((new Date()));
    	consignment.setUpdateDate((new Date()));
    	

		
		
		consignmentRepository.save(consignment);
		
		
	}





	public Optional<Consignment> getById(Consignment consignment) throws Exception
	{
		
		
		
		Optional<Consignment> optionalObj = consignmentRepository.findById(consignment.getId().toLowerCase());
		
		
		
		return optionalObj;
				
	}





	public List<Consignment> searchBetweenCreate_date(Consignment consignment) throws Exception
	{
		
		List<Consignment> consignmentList = consignmentRepository.findByCreate_dateBetween(consignment.getCreateDate(),consignment.getUpdateDate());
		
		return consignmentList;
	}





	public List<Consignment> getLatest() throws Exception
	{
		LOGGER.info("Latest : getLatest = " );

		
		List<Consignment> consignmentList = consignmentRepository.findTop100ByOrderByCreateDateDesc();
		
		
		
    	LOGGER.info("Latest : consignmentList size = "+consignmentList.size() );
    	
    	
    	return consignmentList;
	
	}





	public List<Consignment> searchByName(Consignment consignment) throws Exception
	{
		List<Consignment> farmerFullNameConsignmentList = consignmentRepository.findByFarmerFullNameRegex(consignment.getFarmer_full_name());

		List<Consignment> transporterFullNameConsignmentList = consignmentRepository.findByTransporterFullNameRegex(consignment.getTransporter_f2h_full_name());

		List<Consignment> consignmentList = new ArrayList<Consignment>();
		
		
		

		if (farmerFullNameConsignmentList!=null)
		{
			consignmentList.addAll(farmerFullNameConsignmentList);
		}
		

		if (transporterFullNameConsignmentList!=null)
		{
			consignmentList.addAll(transporterFullNameConsignmentList);
		}
		
		
		return consignmentList;
	}





	public List<Consignment> searchByPhone(Consignment consignment) throws Exception
	{
		List<Consignment> farmerPhoneConsignmentList = consignmentRepository.findByFarmerPhoneRegex(consignment.getFarmer_phone());

		List<Consignment> transporterPhoneConsignmentList = consignmentRepository.findByFarmerPhoneRegex(consignment.getTransporter_f2h_phone());
		
		List<Consignment> consignmentList = new ArrayList<Consignment>();
		
		
		

		if (farmerPhoneConsignmentList!=null)
		{
			consignmentList.addAll(farmerPhoneConsignmentList);
		}
		

		if (transporterPhoneConsignmentList!=null)
		{
			consignmentList.addAll(transporterPhoneConsignmentList);
		}
		
		
		return consignmentList;
	}





	public long getCount() throws Exception
	{

		return consignmentRepository.count();

	}





	public Optional<Farmer> getFarmer(Consignment consignment) throws Exception
	{


		Farmer farmer = new Farmer();
    	
		Optional<Farmer> farmerOptional = null;
    	
		Optional<Consignment> consignmentOptional = this.getById(consignment);

    	
    	if (consignmentOptional.isPresent()) 
    	{
    		
    		Consignment consignmentData = consignmentOptional.get();
    		
    		
    		farmer.setId(consignmentData.getFarmer_id());
    		
    		
    		farmerOptional = farmerService.getById(farmer);
    		
    		
    	}
    	
		
		
		
		
		return farmerOptional;
	}





	public List<Consignment> getByCreatedDate(Consignment consignment) throws Exception
	{
		
		
		
		
		Calendar calendar = Calendar.getInstance(); 
		
		calendar.setTime(consignment.getCreateDate()); 
		calendar.add(Calendar.DATE, 1);
		
		
		Date nextDate = new Date();
		nextDate = calendar.getTime();
		
		
		List<Consignment> consignmentList = consignmentRepository.findByCreate_dateBetween(consignment.getCreateDate(),nextDate);

		
		LOGGER.info(consignment.getCreateDate());
		LOGGER.info(nextDate);
		
		LOGGER.info("Latest : consignmentList.size = "+ consignmentList.size() );
		
		
		
		
		return consignmentList;
	}






	
		
}
