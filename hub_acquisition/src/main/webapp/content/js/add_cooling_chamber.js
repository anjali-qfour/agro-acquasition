
var cooling_chamber_id = "";

var cooling_chamber="";
var consigment_list=[];
var consignment_id_list=[];


var temperature= "";
var humidity = "";
var time = "";

var consignment_id = getUrlParameter("i").substring(1);


function init_add_cooling_chamber()
{
	
 	consignment_id_list= consignment_id.split("_");

	console.log(consignment_id_list);
	
	cooling_chamber_id = create_consignment_id();
	console.log(cooling_chamber_id);
	$("#cooling_chamber_id_input").val(cooling_chamber_id);
	
	$("#consignment_id_input").val(consignment_id_list);
	
	cooling_chamber=$("#category_select").val();
	temperature= $("#temperature_input").val();
	humidity= $("#humidity_input").val();
	time= $("#time_input").val();
	
	
	
	
	for(var i=0;i<consignment_id_list.length;i++)
	{
		var consignment_obj={
			"id":consignment_id_list[i]
		};
		consigment_list.push(consignment_obj);
	
		console.log(consigment_list);
	}	
	

	
	
	console.log("enter");
	

	
	$(".save_cooling_chamber_btn").click(function(){
		
		
		console.log("btn_click");
	   save_cooling_chamber_btn_click();
			
	});
	
}


function save_cooling_chamber_btn_click()
{
	$(".save_cooling_chamber_btn span i").attr("class", "spinner-border spinner-border-sm d-flex mt-1");


	var promises = [];
		
	promises.push(validate_select("#category_select",true));
	
	promises.push(validate_number("#temperature_input",true));
	
	promises.push(validate_number("#humidity_input",true));
	
	promises.push(validate_number("#time_input",true));	
	
	
	Promise
		.all(promises)
        .then((data) => {
			
			console.log(data);
			
			
			for(var i=0; i<data.length; i++){
				
				console.log(data[i][0]);
				if (!data[i][0]){
					
					console.log("error: validation");
					console.log(data[i]);
					
					
					 $(".save_cooling_chamber_btn span i").attr("class", "fas fa-bolt");
				
				
					return;
				}
				
				
				if(i+1==data.length){
					

					Promise.all([add_cooling_chamber()]).then(function ([data]){
						
						
						console.log("completed");
						
						console.log(data);
						
						if (data.message=="error"){
							
					    	setTimeout(function(){ $(".save_cooling_chamber_btn span i").attr("class", "fas fa-bolt"); }, 1000);
			
						}
						else{
							
							$(".save_cooling_chamber_btn span i").attr("class", "fas fa-check");
							
							setTimeout(function(){
								
			
							}, 1000);
			
						}
					
					}); 
				}
				
				
			}
			
	});



}

function add_cooling_chamber()	
{
	
	var deferred= new $.Deferred();
	var data  = {'message':'error'}
	
	
	console.log("inside ajax function");
	$.ajax({
		type: "POST",
	    url: "/user/api/cooling_chamber/add",	   
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({
		
				"id" : cooling_chamber_id,	
				"consigment_list" : consigment_list, 
				"cooling_chamber" : $("#category_select").val(),	
          		"temperature": $("#temperature_input").val(),
				"humidity":$("#humidity_input").val(),
				"time": $("#time_input").val(),
				
		
		}),

		success:function(data)
		{
		console.log(data)
		deferred.resolve(data);
		},
		error:function (jqXHR, textStatus, errorThrown) {
	    	
		

	    	console.log(jqXHR);
	    	console.log(textStatus);
	    	console.log(errorThrown);
	      
	    	deferred.resolve(data);
	    }
	});	
	console.log("ajax function end");
	
	return deferred.promise();
	
}




