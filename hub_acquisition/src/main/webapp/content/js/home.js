






function init_home()
{
	
	
	
	Promise.all([get_farmer_count()]).then(function ([data]){
		
		
		console.log("completed");
		
		console.log(data);
		
		if (data.message=="success"){
			
			
			$(".vendor_box .card-body h2").text(data.farmer_count);
			

		}
		
		
	
	});
	
	
	
	
	Promise.all([get_consigment_count()]).then(function ([data]){
		
		
		console.log("get_consigment_count");
		
		console.log(data);
		
		if (data.message=="success"){
			
			
			$(".consignment_box .card-body h2").text(data.consigment_count);
			

		}
		
		
	
	}); 
			
			
			

	Promise.all([get_transporter_f2h_count()]).then(function ([data]){
		
		
		console.log("completed");
		
		console.log(data);
		
		if (data.message=="success"){
			
			
			$(".transporter_box .card-body h2").text(data.transporter_f2h_count);
			

		}
		
		
	
	}); 
						
					
	
	
}











function get_transporter_f2h_count()
{
    var deferred = new $.Deferred();
    
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/transporter_f2h/get/count",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",    
	    success: function(data)
	    {
	    	
	    	console.log(data);
	    	
	    	deferred.resolve(data);
	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	    	

			console.log("error ");

	    	console.log(jqXHR);
	    	console.log(textStatus);
	    	console.log(errorThrown);
	      
	    	deferred.resolve(data);
	    }
	});
	
	return deferred.promise();
}










function get_consigment_count()
{
    var deferred = new $.Deferred();
    
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/consignment/get/count",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",    
	    success: function(data)
	    {
	    	
	    	console.log(data);
	    	
	    	deferred.resolve(data);
	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	    	

			console.log("error ");

	    	console.log(jqXHR);
	    	console.log(textStatus);
	    	console.log(errorThrown);
	      
	    	deferred.resolve(data);
	    }
	});
	
	return deferred.promise();
}









function get_farmer_count()
{
    var deferred = new $.Deferred();
    
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/farmer/get/count",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",    
	    success: function(data)
	    {
	    	
	    	console.log(data);
	    	
	    	deferred.resolve(data);
	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	    	

			console.log("error ");

	    	console.log(jqXHR);
	    	console.log(textStatus);
	    	console.log(errorThrown);
	      
	    	deferred.resolve(data);
	    }
	});
	
	return deferred.promise();
}





