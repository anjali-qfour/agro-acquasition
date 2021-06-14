package massdyn.hub.acquisition.service;

import java.sql.Time;
import java.util.ArrayList;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;

import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.GsonBuilder;

import massdyn.hub.acquisition.model.Consignment;
import massdyn.hub.acquisition.model.CoolingChamber;
import massdyn.hub.acquisition.model.TransporterF2H;
import massdyn.hub.acquisition.model.VendorPayment;
import massdyn.hub.acquisition.repository.CoolingChamberRepository;

@Service
public class CoolingChamberService {
	
	private static final Logger LOGGER = LogManager.getLogger(CoolingChamberService.class);

	@Autowired(required = true)
	CoolingChamberRepository coolingChamberRepository;
	

	public void add(CoolingChamber cooling_chamber) throws Exception
	{
		


    	LOGGER.info("student = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(cooling_chamber, CoolingChamber.class) );
    	
    	cooling_chamber.setCreateDate(new Date());
		
    	cooling_chamber.setUpdateDate(new Date());
    	
    	cooling_chamber.setType("single");
		
    	cooling_chamber.setActive(true);
		
    	cooling_chamber.setStatus("active");
		

    	coolingChamberRepository.save(cooling_chamber);
	}

	
	
	
	
	
	public void update(CoolingChamber cooling_chamber) throws Exception
	{
		


		LOGGER.info("cooling_chamber = " + 
				(new GsonBuilder().setPrettyPrinting().create())
					.toJson(cooling_chamber, CoolingChamber.class) );
		
		
		cooling_chamber.setType("single");
		
    	cooling_chamber.setActive(true);
		
		

		cooling_chamber.setUpdateDate(new Date());
		
		
    	coolingChamberRepository.save(cooling_chamber);
    	
    	
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	public List<CoolingChamber> getLatest() throws Exception
	{
		LOGGER.info("Latest : getLatest = " );

		
		List<CoolingChamber> cooling_chamberList = coolingChamberRepository.findTop100ByOrderByCreateDateDesc();
		
		
		
    	LOGGER.info("Latest : cooling_chamberList size = "+cooling_chamberList.size() );
    	
    	
    	return cooling_chamberList;
	
	}
	
	
	
	public Optional<CoolingChamber> getById(CoolingChamber cooling_chamber) throws Exception
	{
		
		
		
		Optional<CoolingChamber> optionalObj = coolingChamberRepository.findById(cooling_chamber.getId().toLowerCase());
		
		
		
		return optionalObj;
				
	}

	

	public List<CoolingChamber> searchBetweenCreate_date(CoolingChamber cooling_chamber) throws Exception
	{
		
		List<CoolingChamber> cooling_chamberList = coolingChamberRepository.findByCreate_dateBetween(cooling_chamber.getCreateDate(),cooling_chamber.getUpdateDate());
		
		return cooling_chamberList;
	}


	
	
	
	
}
