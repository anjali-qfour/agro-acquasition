

// ---------------------< Ajax >---------------------



var currency_isocode = null;
var currency_symb = null;

function get_currency_from_system_parameters()
{

	var deferred = new $.Deferred();

	$.ajax({
		type: "POST",
	    url: "system_parameters/get/currency",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	"dashboardUserId": current_dashboard_user_id,
		
	    	
	    }),
	    success: function(data)
	    {
	    	console.log("get_currency_from_system_parameters : 1.data :=");
	    	console.log(data);
	    	
	    	if (data[0].key=="currency_symb"){
	    		currency_symb = data[0].valueAsString;
	    		currency_isocode = data[1].valueAsString;
	    	}
	    	else{
	    		currency_isocode = data[0].valueAsString;
	    		currency_symb = data[1].valueAsString;
	    	};


	    	
	    	deferred.resolve(data);
	    	
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	           console.log(jqXHR);
	           console.log(textStatus);
	           console.log(errorThrown);
	    }
	    
	});
	
	return deferred.promise();

	
}









function get_item(_dashboard_user_id, _item_id)
{
    var deferred = new $.Deferred();
	
	$.ajax({
		type: "POST",
	    url: "item/get/by/item_id",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"itemId" : _item_id,
	    	"dashboardUserId": _dashboard_user_id,
			
	    }),	    
	    success: function([data])
	    {
//	    	console.log(data);
	    	
	    	deferred.resolve(data);
	 	    	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	      console.log(jqXHR);
	      console.log(textStatus);
	      console.log(errorThrown);
	
	    }
	});
	
	return deferred.promise();
}






var all_category_data = [];
function get_all_category()
{
    var deferred = new $.Deferred();
	
	$.ajax({
		type: "POST",
	    url: "item/category/get/all",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"dashboardUserId": current_dashboard_user_id,
			
	    }),	    
	    success: function(data)
	    {
	    	console.log(data);
	    	all_category_data = data;
	    	
	    	deferred.resolve(all_category_data);
	 	    	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	      console.log(jqXHR);
	      console.log(textStatus);
	      console.log(errorThrown);
	
	    }
	});
	
	return deferred.promise();
}











function get_system_parameters()
{

	var deferred = new $.Deferred();

	$.ajax({
		type: "POST",
	    url: "system_parameters/get/all",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	"dashboardUserId": current_dashboard_user_id,
		
	    	
	    }),
	    success: function(data)
	    {
	    	
//	    	console.log("single_email_template_data : 1.data :=");
//	    	console.log(data);

	    	system_parameters_data = data;
	    	
	    	system_parameters_data = data.reduce(function(map, obj) {
	    		
	    		var data_elem = {
	    				valueAsDouble:obj.valueAsDouble,
	    				valueAsInteger:obj.valueAsInteger,
	    				valueAsString:obj.valueAsString,
	    		};
	    		
	    	    map[obj.key] = data_elem;
	    	    return map;
	    	}, {});
	    	
//	    	console.log(system_parameters_data);

	    	
	    	deferred.resolve(system_parameters_data);
	    	
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	           console.log(jqXHR);
	           console.log(textStatus);
	           console.log(errorThrown);
	    }
	    
	});
	
	return deferred.promise();

	
}











function get_item_data()
{
	var deferred = new $.Deferred();
	
	$.ajax({
		type: "POST",
	    url: "item/get/all",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify(
	    		{
	    	    	"dashboardUserId": current_dashboard_user_id,
	    			
	    		}),
	    success: function(data)
	    {
//	    	console.log(data);

	    	item_data = data;
	    	
	    	deferred.resolve(item_data);
	 	    	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	      console.log(jqXHR);
	      console.log(textStatus);
	      console.log(errorThrown);
	//              relogin();
	
	
	    }
	});
	
	return deferred.promise();

}








