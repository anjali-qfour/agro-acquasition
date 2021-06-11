
var farmer_list=[];


function init_search_farmer()
{
	
	
	
	
	$("#name_switchcheck").change(function() {
		
		$(".form-check-input:not(#name_switchcheck)").prop( "checked", false );	
		
	    
	});



	
	$("#id_switchcheck").change(function() {
		
		$(".form-check-input:not(#id_switchcheck)").prop( "checked", false );
		
	    
	});
	
	
		
	$("#phone_switchcheck").change(function() {
		
		$(".form-check-input:not(#phone_switchcheck)").prop( "checked", false );
		
	    
	});
	
	

	$("#search_btn").click(function(){
				
		search_btn_click();	
		
	});
	
	
	$("form").on('keypress',function(e) {
	    if(e.which == 13) {
			search_btn_click();	        
	    }
	});
	
	
	
}



function search_btn_click()
{
	
	console.log("search_btn_click");
	
	
	
	$("#search_indicator i").attr("class", "spinner-border spinner-border-sm d-flex ");
	
	$(".search_result_message ").text("");
	
	$(".search_result_list").empty();
	
	
	
	if ($("#search_input").val().length<4){
		
		console.log("less than 4");
	    
		$("#search_indicator i").attr("class", "fas fa-exclamation text-danger");
							
		$(".search_result_message ").text("At least 4 characters are required");
				
		$(".search_result_row").collapse('show');
		
		return ;
				
	}
	

	
	if ($("#name_switchcheck").is(":checked") ){
		
		
		
		Promise.all([search_farmer_by_name()]).then(function ([data]){
			
			console.log(data);
			
			
			load_search_result(data)
			
			
		});
						
					
		
		
	};
	
	
	
	
	if ($("#id_switchcheck").is(":checked") ){
		
		
		Promise.all([search_farmer_by_id()]).then(function ([data]){
			
			console.log(data);
			
			data.farmer_list = [data.farmer];
			
			load_search_result(data)
			
		});
		
	};
	
	
	
	
	
	if ($("#phone_switchcheck").is(":checked") ){
		
		
		Promise.all([search_farmer_by_phone()]).then(function ([data]){
			
			console.log(data);
			
			load_search_result(data)
			
		});
		
		
	};
	
	
	
	
}






function load_search_result(data)
{
	
	farmer_list = data.farmer_list;

	
	
	if (data.message=="not_found"){
				
		
		$("#search_indicator i").attr("class", "fas fa-exclamation text-danger");
		
		$(".search_result_message ").text("No results found");
		
		$(".search_result_row").collapse('show');
		
	}
	else if (data.message=="success"){
		
		
		$(".search_result_row").collapse('show');
		
		$("#search_indicator i").attr("class", "fas fa-check text-success");
		
		for (var i=0; i<farmer_list.length; i++){
			
			
			console.log(farmer_list[i]);
			
			$(".search_result_list ").append(
				
				$(
					'<a href="user/view/farmer?i='+farmer_list[i].id+'" class="list-group-item list-group-item-action rounded-0 border-right-0 border-left-0 border-top-0" aria-current="true">'+
					'	<div class="d-flex w-100 justify-content-between mb-0">'+									
					'		<div>'+
					'			<small class="text-muted ">Id </small>'+
					'    		<p class="text-uppercase text-monospace mb-0">'+farmer_list[i].id+'</p>'+
					'		</div>'+									
					'		<div>'+
					'			<small class="text-muted ">Name </small>'+
					'			<h5 class="mb-0 text-primary">'+farmer_list[i].name+' '+farmer_list[i].surname+'</h5>'+
					'		</div>'+
					'		<div>'+
					'			<small class="text-muted ">Phone </small>'+
					'			<p class="mb-0 text-primary">'+farmer_list[i].phone+'</p>'+
					'		</div>'+							   								    	
					'   </div>'+
					'</a>'	  				
				)
				
			);
			
			
		}
		
	}
	
	
}








function search_farmer_by_name()
{
    var deferred = new $.Deferred();
    
//    MH-02-GG-333
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/farmer/search/by/name",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : $("#search_input").val(),
	    	"name":  $("#search_input").val(),
	    	"phone": $("#search_input").val(),

	    	
	    
			
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







function search_farmer_by_id()
{
    var deferred = new $.Deferred();
    
//    MH-02-GG-333
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/farmer/get/by/id",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : $("#search_input").val(),
	    	"name":  $("#search_input").val(),
	    	"phone": $("#search_input").val(),

	    	
	    
			
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





function search_farmer_by_phone()
{
    var deferred = new $.Deferred();
    
//    MH-02-GG-333
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/farmer/search/by/phone",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : $("#search_input").val(),
	    	"name":  $("#search_input").val(),
	    	"phone": $("#search_input").val(),

	    	
	    
			
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

