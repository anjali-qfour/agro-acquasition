package massdyn.hub.acquisition.service;

import java.util.ArrayList;
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
import massdyn.hub.acquisition.repository.FarmerInvoiceRepository;
import massdyn.hub.acquisition.repository.FarmerRepository;
import massdyn.hub.acquisition.repository.ProductCategoriesRepository;
import massdyn.hub.acquisition.repository.ProductSubTypesRepository;
import massdyn.hub.acquisition.repository.ProductTypesRepository;
import massdyn.hub.acquisition.repository.TransporterF2HRepository;



@Service
public class FarmerInvoiceService
{

	private static final Logger LOGGER = LogManager.getLogger(FarmerInvoiceService.class);

	



	@Autowired(required = true)
	FarmerInvoiceRepository farmerInvoiceRepository;





	public FarmerInvoice createAndAdd(Consignment consignment) throws Exception
	{
		FarmerInvoice farmerInvoice = new FarmerInvoice();
		
		String farmerInvoiceId = UUID.randomUUID().toString().substring(0, 13);;
				
		farmerInvoice.setId(farmerInvoiceId);
		
		
		
		farmerInvoice.setConsignment_id(consignment.getId());
		
		
		farmerInvoice.setFull_name(consignment.getFarmer_full_name());
		
		farmerInvoice.setPhone(consignment.getFarmer_phone());
		
		
		farmerInvoice.setCategory_id(consignment.getCategory_id());
		
		farmerInvoice.setType_id(consignment.getType_id());
		
		farmerInvoice.setSub_type_id(consignment.getSub_type_id());
		
		
		
		farmerInvoice.setRate(consignment.getProduct_rate());
		
		
		
		
		farmerInvoice.setWeight(consignment.getWeight());
		
		
		
		farmerInvoice.setCreateDate(new Date());
		
		farmerInvoice.setUpdateDate(new Date());
		
		
		

		
		farmerInvoice.setPayment_amount(consignment.getWeight()*10);
		
		
		farmerInvoice.setStatus("pending");

		
		
		farmerInvoiceRepository.save(farmerInvoice);
		
				
		return farmerInvoice;
	}





	public Optional<FarmerInvoice> getById(FarmerInvoice farmerInvoice)
	{
		Optional<FarmerInvoice> optionalObj = farmerInvoiceRepository.findById(farmerInvoice.getId().toLowerCase());
		
		return optionalObj;

	}






	public List<FarmerInvoice> getLatest() throws Exception
	{
		LOGGER.info("Latest : getLatest = " );

		
		List<FarmerInvoice> farmerInvoiceList = farmerInvoiceRepository.findTop100ByOrderByCreateDateDesc();
		
		
		
    	LOGGER.info("Latest : farmerInvoiceList size = "+farmerInvoiceList.size() );
    	
    	
    	return farmerInvoiceList;
	}





	public List<FarmerInvoice> searchBetweenDates(FarmerInvoice farmerInvoice) throws Exception
	{
		List<FarmerInvoice> farmerInvoiceList = farmerInvoiceRepository
													.findByCreateDateBetween(
															farmerInvoice.getCreateDate(),
															farmerInvoice.getUpdateDate()
															);

		return farmerInvoiceList;		
	}





	public List<FarmerInvoice> searchByName(FarmerInvoice farmerInvoice) throws Exception
	{
		
		LOGGER.info("farmerInvoice = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(farmerInvoice, FarmerInvoice.class) );
    
		
		List<FarmerInvoice> farmerInvoiceList = farmerInvoiceRepository.findByFullNameRegex(farmerInvoice.getFull_name());
		
		
		
		
		
		
		
		return farmerInvoiceList;
	}





	public List<FarmerInvoice> searchByPhone(FarmerInvoice farmerInvoice)
	{
		
		List<FarmerInvoice> farmerInvoiceList = farmerInvoiceRepository.findByPhoneRegex(farmerInvoice.getPhone());
		
		
		return farmerInvoiceList;
	}






	
	




	
		
}
