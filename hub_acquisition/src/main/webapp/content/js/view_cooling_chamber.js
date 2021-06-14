var cooling_chamber_data=[];

var consignment_ids_list=[];
var consignment_id_list=[];
var consignment_object=[];

var consignments="";

var _consigment_ids_str = "";

var cooling_chamber_id = "";
var cooling_chamber="";
var consigment_list=[];
var temperature= "";
var humidity = "";
var time = "";
var status="";

var cooling_chamber_id = getUrlParameter("i");

function init_view_cooling_chamber()
{
	
	
	console.log(cooling_chamber_id);
	
	Promise.all([get_cooling_chamber_by_id()]).then(function ([data]){
		
		console.log(data.cooling_chamber_list[0]);
		
		cooling_chamber_data = data.cooling_chamber_list[0];
		
		
		
		console.log(cooling_chamber_data);
		
		if ((data.message=="error")||(data.message=="not_found")){
			
			draw_modal_centered("Error","Something went wrong. cooling chamber Id is not found ");

		}
		else{
			
			
			$("#cooling_chamber_id_input").val(cooling_chamber_data.id);
						

			
			
			console.log(cooling_chamber_data.consigment_list.length);
			
			
			
			for (var i=0; i<cooling_chamber_data.consigment_list.length;i++)
			{
				
				_consigment_ids_str = _consigment_ids_str +"," +cooling_chamber_data.consigment_list[i].id;
				
				console.log(cooling_chamber_data.consigment_list[i].id);
				
				if (i+1==cooling_chamber_data.consigment_list.length)
				{
					
					$("#consignment_id_input").val(_consigment_ids_str.substring(1,_consigment_ids_str.length) );	
					
					console.log(_consigment_ids_str);
				}
				
			}
			
			
			console.log(cooling_chamber_data.consigment_list);
			
			$("#category_select").val(cooling_chamber_data.cooling_chamber);	
			
			//$("#status_select").val(cooling_chamber_data.status);
			
			$("#status_select option[data-id="+cooling_chamber_data.status+"]").attr('selected', 'selected');		
			
			console.log(cooling_chamber_data.status);		
			
			
			$("#temperature_input").val(cooling_chamber_data.temperature);			
			$("#humidity_input").val(cooling_chamber_data.humidity);
			
			$("#time_input").val(cooling_chamber_data.time);
			
			$("#add_time_input").val(0)
			
			
			}
			
			})
			
			
			
			
			$(".update_btn").click(function(){
		
		
				console.log("add_save");
		
				save_btn_click();
		
		
		
	});
	
	
	
}











function save_btn_click()
{
	
	
	$(".update_btn span i").attr("class", "spinner-border spinner-border-sm d-flex mt-1");


	for(var i=0;i<cooling_chamber_data.consigment_list.length;i++)
	{
		var consignment_obj={
			"id":cooling_chamber_data.consigment_list[i].id
		};
		consigment_list.push(consignment_obj);
	
		console.log(consigment_list);
	}	
	
	$("#consignment_id_input").val(consigment_list);

		cooling_chamber_data.status = $("#status_select").find(":selected").attr("data-id")
		
		var x=$( "#time_input").val();
		var y=$( "#add_time_input").val()
		var z= parseInt(x)+parseInt(y);
		
		$("#time_input").val(z);
					
		cooling_chamber_data.time=$("#time_input").val();	
		
		
		console.log(time);
		
		$("#add_time_input").val(0);
		
					
					
								Promise.all([update_cooling_chamber()]).then(function ([data]){
									
									console.log("promiss all................");
									
			
									if (data.message=="error"){
										
										$(".update_btn span i").attr("class", "fas fa-bug text-danger");
										
									}
									else if (data.message=="not_found"){
												
										
										$(".update_btn span i").attr("class", "fas fa-exclamation text-danger");
										
										
									}
									else if (data.message=="success"){
										
										$(".update_btn span i").attr("class", "fas fa-check");
													
										window.location = "user/view/cooling_chamber?i="+cooling_chamber_data.id;
										
										
									}
								
								}); 
								
							
}
				
				
			
	
	
	




























function get_cooling_chamber_by_id()
{
    var deferred = new $.Deferred();
    
	
	        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/cooling_chamber/forview/get/by/id",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : cooling_chamber_id,

	    	
	    
			
	    }),	    
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











function update_cooling_chamber()
{
	
	console.log("Enter in update")
	
    var deferred = new $.Deferred();
    
    var data = {'message':'error'};
    


	
	$.ajax({
		type: "POST",
	    url: "user/api/cooling_chamber/update",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    		"id" : cooling_chamber_data.id,	
				"consigment_list": consigment_list,
				"cooling_chamber" : cooling_chamber_data.cooling_chamber,	
          		"temperature": cooling_chamber_data.temperature,
				"humidity":cooling_chamber_data.humidity,
				"time": cooling_chamber_data.time,
				"status": cooling_chamber_data.status,
			
				"createDate":new Date(new Date(cooling_chamber_data.createDate).getTime()),
				
			
	    }),	    
	    success: function(data)
	    {
	    	console.log("saved");
	    	
	    	
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











