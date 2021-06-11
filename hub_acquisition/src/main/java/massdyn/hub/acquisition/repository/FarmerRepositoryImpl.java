package massdyn.hub.acquisition.repository;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import massdyn.hub.acquisition.model.Farmer;





@Repository
public class FarmerRepositoryImpl implements FarmerCustomRepository
{
	@Autowired
	private MongoTemplate mongoTemplate;

	@Override
	public void update(Farmer farmer)
	{
		
        Query query = new Query();
        
        
        query.addCriteria(Criteria.where("farmer_id").is(farmer.getId()));
        

    	
    	Document doc = new Document();
    	
    	mongoTemplate.getConverter().write(farmer, doc);
    	
    	Update update = Update.fromDocument(doc);

    	
    	
    	mongoTemplate.updateFirst(query, update, Farmer.class);

        
//        		(Criteria.where("farmer_id").is(farmer.getFarmer_id()));

        
        
//		mongoTemplate.upd
		
		
	}


}
