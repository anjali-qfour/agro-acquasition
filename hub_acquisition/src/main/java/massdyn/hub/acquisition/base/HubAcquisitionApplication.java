package massdyn.hub.acquisition.base;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "massdyn.hub.acquisition.*")
@EnableMongoRepositories(basePackages ={ "massdyn.hub.acquisition.repository"})
public class HubAcquisitionApplication  extends SpringBootServletInitializer 
{

//	@Override
//	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
//		return application.sources(HubAcquisitionApplication.class);
//	}

	public static void main(String[] args)
	{
		SpringApplication.run(HubAcquisitionApplication.class, args);
	}

}
