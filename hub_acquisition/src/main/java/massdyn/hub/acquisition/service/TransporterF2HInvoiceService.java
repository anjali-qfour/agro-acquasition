package massdyn.hub.acquisition.service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import massdyn.hub.acquisition.model.Consignment;
import massdyn.hub.acquisition.model.Farm;
import massdyn.hub.acquisition.model.Farmer;
import massdyn.hub.acquisition.model.FarmerJson;
import massdyn.hub.acquisition.model.ProductCategories;
import massdyn.hub.acquisition.model.ProductSubTypes;
import massdyn.hub.acquisition.model.ProductTypes;
import massdyn.hub.acquisition.model.Relative;
import massdyn.hub.acquisition.model.TransporterF2H;
import massdyn.hub.acquisition.model.TransporterF2HInvoice;
import massdyn.hub.acquisition.repository.ConsignmentRepository;
import massdyn.hub.acquisition.repository.FarmerInvoiceRepository;
import massdyn.hub.acquisition.repository.FarmerRepository;
import massdyn.hub.acquisition.repository.ProductCategoriesRepository;
import massdyn.hub.acquisition.repository.ProductSubTypesRepository;
import massdyn.hub.acquisition.repository.ProductTypesRepository;
import massdyn.hub.acquisition.repository.TransporterF2HInvoiceRepository;
import massdyn.hub.acquisition.repository.TransporterF2HRepository;



@Service
public class TransporterF2HInvoiceService
{

	private static final Logger LOGGER = LogManager.getLogger(TransporterF2HInvoiceService.class);

	



	@Autowired(required = true)
	TransporterF2HInvoiceRepository transporterF2HInvoiceRepository;




	public TransporterF2HInvoice createAndAdd(Consignment consignment) throws Exception
	{
		
		TransporterF2HInvoice transporterF2HInvoice = new TransporterF2HInvoice();
		
		String transporterF2HInvoiceId = UUID.randomUUID().toString().substring(0, 13);;
				
		transporterF2HInvoice.setId(transporterF2HInvoiceId);
		
		transporterF2HInvoice.setConsignment_id(consignment.getId());
		
		
		transporterF2HInvoice.setTransporter_f2h_id(consignment.getTransporter_f2h_id());
		
		transporterF2HInvoice.setFull_name(consignment.getTransporter_f2h_full_name());
		
		transporterF2HInvoice.setPhone(consignment.getTransporter_f2h_phone());
				
		transporterF2HInvoice.setRate(consignment.getTransporter_f2h_rate());
		
		transporterF2HInvoice.setPayment_amount(consignment.getTransporter_f2h_rate()*consignment.getWeight());
			
		transporterF2HInvoice.setProduct_type(consignment.getSub_type_id());
		
		transporterF2HInvoice.setWeight(consignment.getWeight());
		
		
		
		
		transporterF2HInvoice.setRate_type(consignment.getTransporter_f2h_rate_type());
		transporterF2HInvoice.setRate_amount(consignment.getTransporter_f2h_rate_amount());
		transporterF2HInvoice.setRate(consignment.getTransporter_f2h_rate());
		
		
		
		
		transporterF2HInvoice.setType("single");
		
		transporterF2HInvoice.setActive(true);
		
		
		
		
		transporterF2HInvoice.setCreateDate(new Date());
		
		transporterF2HInvoice.setUpdateDate(new Date());
		
		
		transporterF2HInvoice.setStatus("pending");
		
		
		
		
		transporterF2HInvoiceRepository.save(transporterF2HInvoice);
		
		
		
		return transporterF2HInvoice;
	}




	public List<TransporterF2HInvoice> searchByName(TransporterF2HInvoice transporterF2HInvoice) throws Exception
	{
		
		List<TransporterF2HInvoice> transporterF2HInvoiceList = transporterF2HInvoiceRepository
																	.findByFullNameRegex(transporterF2HInvoice.getFull_name());

		
		
		return transporterF2HInvoiceList;
	}

	
	
	
	
	

	public List<TransporterF2HInvoice> searchByPhone(TransporterF2HInvoice transporterF2HInvoice) throws Exception
	{
		
		List<TransporterF2HInvoice> transporterF2HInvoiceList = transporterF2HInvoiceRepository
																	.findByPhoneRegex(transporterF2HInvoice.getPhone());

		
		
		
		
		
		return transporterF2HInvoiceList;
	}




	public List<TransporterF2HInvoice>  getLatest()  throws Exception
	{
		
    	LOGGER.info("Latest : getLatest = " );

		
		List<TransporterF2HInvoice> transporterF2HInvoiceList = transporterF2HInvoiceRepository.findTop10ByOrderByCreateDateDesc();
		
		
		transporterF2HInvoiceList = transporterF2HInvoiceList.stream()
																.filter(invoice->invoice.isActive())
																.collect(Collectors.toList());  ;
		
		
		
    	LOGGER.info("Latest : transporterF2HInvoiceList size = "+transporterF2HInvoiceList.size() );
    	
    	
    	return transporterF2HInvoiceList;

	}
	
	
	
	


	public Optional<TransporterF2HInvoice> getById(TransporterF2HInvoice transporterF2HInvoice)  throws Exception
	{
		
		
		
		Optional<TransporterF2HInvoice> optionalObj = transporterF2HInvoiceRepository.findById(transporterF2HInvoice.getId().toLowerCase());
		
		
		
		return optionalObj;
				
	}




	public void update(TransporterF2HInvoice transporterF2HInvoice)  throws Exception
	{
    	transporterF2HInvoice.setUpdateDate((new Date()));
    	
    	transporterF2HInvoiceRepository.save(transporterF2HInvoice);

		
	}


	
	
	
	


	public List<TransporterF2HInvoice> searchBetweenDates(TransporterF2HInvoice transporterF2HInvoice) throws Exception
	{
		
		List<TransporterF2HInvoice> transporterF2HInvoiceList = transporterF2HInvoiceRepository
																	.findByCreateDateBetween(
																			transporterF2HInvoice.getCreateDate(),
																			transporterF2HInvoice.getUpdateDate()
																			);

		return transporterF2HInvoiceList;
	}


	
	
	
	
	


	public  void getByIdAndTime(TransporterF2HInvoice transporterF2HInvoice)throws Exception
	{
		
		
		Date nowDate = new Date();
		
		Date oneHourBefore = new Date(System.currentTimeMillis() - (6 * 60 * 60 * 1000));
		
		
    	List<TransporterF2HInvoice> fullInvoiceList = 
    			transporterF2HInvoiceRepository
    				.findByIdAndCreateDateBetween(
    						transporterF2HInvoice.getTransporter_f2h_id(), nowDate, oneHourBefore);
		
    	LOGGER.info("fullInvoiceList size = " +fullInvoiceList.size());

		

    	
    	
    	List<TransporterF2HInvoice> activeInvoiceList = new ArrayList<TransporterF2HInvoice>();
    	
    	
    	for (int i=0; i<fullInvoiceList.size(); i++)
		{
    		
    		LOGGER.info("fullInvoiceList isActive = " +fullInvoiceList.get(i).isActive() );
    		
    		LOGGER.info("fullInvoiceList getType = " +fullInvoiceList.get(i).getType());
    		
    		
    		if ( fullInvoiceList.get(i).isActive() && fullInvoiceList.get(i).getType().contains("single"))
    		{
    			activeInvoiceList.add(fullInvoiceList.get(i));    			
    		}
			
		}
    	
    	
    	
    	LOGGER.info("activeInvoiceList size = " +activeInvoiceList.size());

    	
    	
    	if (activeInvoiceList.size()>0)
    	{

        	for (int i=0; i<activeInvoiceList.size(); i++)
    		{
    			
        		activeInvoiceList.get(i).setActive(false);
    			
    			transporterF2HInvoiceRepository.save(activeInvoiceList.get(i));
    			
    		}
        	

        	
        	
        	
        	
        	
        	TransporterF2HInvoice transporterF2HInvoiceGroup = new TransporterF2HInvoice();
        	
        	String transporterF2HInvoiceId = UUID.randomUUID().toString().substring(0, 13);;
    		
        	transporterF2HInvoiceGroup.setId(transporterF2HInvoiceId);
    		
        	transporterF2HInvoiceGroup.setTransporter_f2h_id( transporterF2HInvoice.getTransporter_f2h_id() );
        	
        	transporterF2HInvoiceGroup.setFull_name(activeInvoiceList.get(0).getFull_name());
        	
        	transporterF2HInvoiceGroup.setPhone(activeInvoiceList.get(0).getPhone());
        	
        	transporterF2HInvoiceGroup.setTransporterF2HInvoiceList(activeInvoiceList);
        	
        	transporterF2HInvoiceGroup.setProduct_type("multi");
        	
        	transporterF2HInvoiceGroup.setCreateDate(new Date());
        	
        	transporterF2HInvoiceGroup.setStatus("pending");
        	
        	
        	transporterF2HInvoiceGroup.setType("group");
        	
        	transporterF2HInvoiceGroup.setActive(true);
        	
        	
        	
        	
        	
    		transporterF2HInvoiceRepository.save(transporterF2HInvoiceGroup);
        	
        	
    	}
    	
    	
    	

    	
    
		
		

    	
		
	}





	
		
}
