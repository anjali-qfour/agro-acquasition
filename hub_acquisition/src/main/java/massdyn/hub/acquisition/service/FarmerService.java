package massdyn.hub.acquisition.service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import massdyn.hub.acquisition.model.Consignment;
import massdyn.hub.acquisition.model.Farm;
import massdyn.hub.acquisition.model.Farmer;
import massdyn.hub.acquisition.model.FarmerInvoice;
import massdyn.hub.acquisition.model.FarmerJson;
import massdyn.hub.acquisition.model.ProductCategories;
import massdyn.hub.acquisition.model.ProductSubTypes;
import massdyn.hub.acquisition.model.ProductTypes;
import massdyn.hub.acquisition.model.Relative;
import massdyn.hub.acquisition.model.TransporterF2HInvoice;
import massdyn.hub.acquisition.model.VendorPayment;
import massdyn.hub.acquisition.repository.FarmRepository;
import massdyn.hub.acquisition.repository.FarmerRepository;
import massdyn.hub.acquisition.repository.ProductCategoriesRepository;
import massdyn.hub.acquisition.repository.ProductSubTypesRepository;
import massdyn.hub.acquisition.repository.ProductTypesRepository;
import massdyn.hub.acquisition.repository.RelativeRepository;
import massdyn.hub.acquisition.repository.VendorPaymentRepository;



@Service
public class FarmerService
{

	private static final Logger LOGGER = LogManager.getLogger(FarmerService.class);

	
	
	@Autowired(required = true)
	AWSS3Service awsS3Service;


	@Autowired(required = true)
	FarmerRepository farmerRepository;
	
	@Autowired(required = true)
	RelativeRepository relativeRepository;
	
	
	@Autowired(required = true)
	FarmRepository farmRepository;
	

	@Autowired(required = true)
	VendorPaymentRepository vendorPaymentRepository;
	
	
	
	
	

	public List<Farmer> searchByName(FarmerJson farmerJson) throws Exception
	{
		
		List<Farmer> nameFarmerList = farmerRepository.findByNameRegex(farmerJson.name);
		
		List<Farmer> surnameFarmerList = farmerRepository.findBySurnameRegex(farmerJson.name);
		
		
		List<Farmer> farmerList = new ArrayList<Farmer>();
		
		
		if (nameFarmerList!=null)
		{
			farmerList.addAll(nameFarmerList);
		}
		

		if (surnameFarmerList!=null)
		{
			farmerList.addAll(surnameFarmerList);
		}
		
		
		return farmerList;
	}





	public List<Farmer> searchByPhone(FarmerJson farmerJson) throws Exception
	{
		List<Farmer> farmerList = farmerRepository.findByPhoneRegex(farmerJson.name);
		
		
		
		
		
		
		return farmerList;
	}






	public void add(Farmer farmer) throws Exception
	{
		
		farmer.setCreateDate(new Date());
    	
    	farmer.setUpdateDate(new Date());
    	
    	
    	
    	
    	
    	List<Relative> relativeList = farmer.getRelative_list();
    	
    	if ((relativeList.size()>0))
    	{
        	relativeRepository.saveAll(relativeList);

    	}
    	
    	

    	
    	List<Farm> farmList = farmer.getFarm_list();
    	
    	if ((farmList.size()>0))
    	{
    		farmRepository.saveAll(farmList);

    	}
    	
    	
    	List<VendorPayment> vendorPaymentList = farmer.getVendor_payment_list();
    	
    	if ((vendorPaymentList.size()>0))
    	{
    		vendorPaymentRepository.saveAll(vendorPaymentList);

    	}
    	
    	
    	
    	
    	farmerRepository.save(farmer);

		
	}
	
	
	


	public void update(Farmer farmer) throws Exception 
	{
		

		farmer.setUpdateDate(new Date());
    	
    	
    	
    	
    	
    	List<Relative> relativeList = farmer.getRelative_list();
    	
    	if ((relativeList.size()>0))
    	{
        	relativeRepository.saveAll(relativeList);

    	}
    	
    	

    	
    	List<Farm> farmList = farmer.getFarm_list();
    	
    	if ((farmList.size()>0))
    	{
    		farmRepository.saveAll(farmList);

    	}
    	
    	
    	List<VendorPayment> vendorPaymentList = farmer.getVendor_payment_list();
    	
    	if ((vendorPaymentList.size()>0))
    	{
    		vendorPaymentRepository.saveAll(vendorPaymentList);

    	}
    	
    	
    	
    	
    	List<String> deletedRelativeList =  farmer.getDeleted_relative_list();
    	    	
    	if ((deletedRelativeList.size()>0))
    	{
    		deletedRelativeList.forEach(deletedRelative->{
    			relativeRepository.deleteById(deletedRelative);
    		});
    		
    	}
    	
    	

    	
    	List<String> deletedFarmList =  farmer.getDeleted_farm_list();
    	    	
    	if ((deletedFarmList.size()>0))
    	{
    		deletedFarmList.forEach(deletedFarm->{
    			farmRepository.deleteById(deletedFarm);
    		});
    		
    	}
    	
    	

    	
    	List<String> deletedVendorPaymentList =  farmer.getDeleted_vendor_payment_list();
    	    	
    	if ((deletedVendorPaymentList.size()>0))
    	{
    		deletedVendorPaymentList.forEach(deletedVendorPayment->{
    			vendorPaymentRepository.deleteById(deletedVendorPayment);
    		});
    		
    	}
    	
    	
		

    	farmerRepository.save(farmer);

		
		
	}

	
	
	
	
	public void add1(FarmerJson farmerJson) throws Exception
	{
		
		
    	Farmer farmer = new Farmer();
    	
    	
    	farmer.setId(farmerJson.id);
    	farmer.setName(farmerJson.name);
    	farmer.setSurname(farmerJson.surname);
    	farmer.setPhone(farmerJson.phone);
    	
    	farmer.setCreateDate(new Date());
    	
    	farmer.setUpdateDate(new Date());
    	
    	
    	Type relativeListType = new TypeToken<List<Relative>>() {}.getType();
    	
    	List<Relative> relativeList = new Gson().fromJson(farmerJson.relative_list, relativeListType);

    	farmer.setRelative_list(relativeList);

    	relativeRepository.saveAll(relativeList);
		

    	
    	
    	Type farmListType = new TypeToken<List<Farm>>() {}.getType();
    	
    	List<Farm> farmList = new Gson().fromJson(farmerJson.farm_list, farmListType);

    	farmer.setFarm_list(farmList);

    	farmRepository.saveAll(farmList);

    	
    	
    	Type vendorPaymentListType = new TypeToken<List<VendorPayment>>() {}.getType();
 
    	List<VendorPayment> vendorPaymentList = new Gson().fromJson(farmerJson.vendor_payment_list, vendorPaymentListType);
    	
    	farmer.setVendor_payment_list(vendorPaymentList);
    	
    	vendorPaymentRepository.saveAll(vendorPaymentList);

    	
    	farmerRepository.save(farmer);
    	
	}
	
	
	
	


	public void update1(FarmerJson farmerJson) throws Exception
	{
		
		
    	Farmer farmer = new Farmer();
    	
    	
    	farmer.setId(farmerJson.id);
    	farmer.setName(farmerJson.name);
    	farmer.setSurname(farmerJson.surname);
    	farmer.setPhone(farmerJson.phone);
    	
    	
    	Type relativeListType = new TypeToken<List<Relative>>() {}.getType();
    	
    	List<Relative> relativeList = new Gson().fromJson(farmerJson.relative_list, relativeListType);

    	farmer.setRelative_list(relativeList);

    	relativeRepository.saveAll(relativeList);
		

    	
    	
    	Type farmListType = new TypeToken<List<Farm>>() {}.getType();
    	
    	List<Farm> farmList = new Gson().fromJson(farmerJson.farm_list, farmListType);

    	farmer.setFarm_list(farmList);

    	farmRepository.saveAll(farmList);

    	
    	
    	LOGGER.info("farmerJson = "+farmerJson);
    	
    	
    	Type stringArrayType = new TypeToken<List<String>>() {}.getType();
    	
    	List<String> deletedFarmIdList = new Gson().fromJson(farmerJson.deleted_farm_id_list, stringArrayType);
    	
    	for (String deletedFarmId :deletedFarmIdList )    		
    	{
    		
    		LOGGER.info("deletedFarmId = "+deletedFarmId);
    		
    		farmRepository.deleteById(deletedFarmId);
    		
    	}

    	
    	
    	
    	
    	Type vendorPaymentListType = new TypeToken<List<VendorPayment>>() {}.getType();
    	
    	List<VendorPayment> vendorPaymentList = new Gson().fromJson(farmerJson.vendor_payment_list, vendorPaymentListType);

    	farmer.setVendor_payment_list(vendorPaymentList);

    	vendorPaymentRepository.saveAll(vendorPaymentList);
		
    	
    	
    	
    	
    	
    	
    	
    	
    	
    	farmerRepository.save(farmer);
    	
	}





	public List<Farmer> getLatest()
	{

		
		List<Farmer> farmerList = farmerRepository.findTop100ByOrderByCreateDateDesc();
		
		
		
    	LOGGER.info("Latest : farmerList size = "+farmerList.size() );
    	
    	
    	return farmerList;
	}





	public List<Farmer> searchBetweenCreate_date(Farmer farmer)
	{
		List<Farmer> farmerList = farmerRepository
										.findBetweenCreate_date(
												farmer.getCreateDate(),
												farmer.getUpdateDate()
												);

		return farmerList;

	}





	public HashMap<String, String> uploadAadharCard(MultipartFile multipartFile, Farmer farmer) throws Exception 
	{
		
		String message = "error";
		
//		LOGGER.info(" multipartFile getContentType = "+multipartFile.getContentType() );
//		
//		LOGGER.info(" multipartFile getName = "+multipartFile.getName() );
//		
//		LOGGER.info(" multipartFile getOriginalFilename = "+multipartFile.getOriginalFilename() );
		
		Random rand = new Random(); 
		  

		
		String uploadFileName = farmer.getId()+
									"-"+"aadhar_card" + 
									"-"+rand.nextInt(10000)+
									multipartFile.getOriginalFilename()
												 .substring(multipartFile.getOriginalFilename().lastIndexOf("."));

		
		String uploadFullPath = "farmer/"+farmer.getId()+"/"+ uploadFileName;
				
	    HashMap<String, String> messageMap = new HashMap<String, String>();
		
		message = awsS3Service.uploadFile(multipartFile,uploadFullPath);
		
		
		messageMap.put("message", message);
		messageMap.put("file_name", uploadFileName);
		
		
		return messageMap;
	}
	
	
	
	
	
	
	@Async
	public byte[] downloadAadharCard(String id, String fileName ) throws Exception 
	{
		byte[] content = null;
		

		String uploadFullPath = "farmer/"+id+"/"+ fileName;
		
		
		

		content = awsS3Service.downloadFile(uploadFullPath);
		

		return content;
	}
	
	
	
	


	public void deleteAadharCard(Farmer farmer) throws Exception 
	{
		
		String uploadFullPath = "farmer/"+farmer.getId()+"/"+ farmer.getName();

		
		awsS3Service.deleteFile(uploadFullPath);
		
		
		
	}








	public long getCount()
	{
		return farmerRepository.count();
	}






	public Optional<Farmer> getById(Farmer farmer) throws Exception
	{
		
		
		
		Optional<Farmer> optionalObj = farmerRepository.findById(farmer.getId());
		
		
		
		return optionalObj;
				
	}

	
	
	
		
}
