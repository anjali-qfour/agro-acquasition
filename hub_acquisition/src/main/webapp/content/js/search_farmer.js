
var farmer_list=[];


var start_date;

var end_date;



function init_search_farmer()
{
	
	
	
	var container = $('form').length > 0 ? $('.bootstrap-iso form').parent(): "body";
	
	var options = {
		format : 'dd M yyyy',
		container : 'body',
		todayHighlight : true,
		autoclose : true,
	};


	$('input[name="start_date"]').datepicker(options).on('changeDate', start_date_change);
	
	$('input[name="end_date"]').datepicker(options).on('changeDate', end_date_change);
	
	
	
	
	
	$("#name_switchcheck").change(function() {
		
		$(".form-check-input:not(#name_switchcheck)").prop( "checked", false );
		
		$(".form-check-input:not(#name_switchcheck)").removeClass("text-dark");
			
		$(this).siblings().addClass("text-dark");
	    
		$("#search_input").attr("placeholder","").prop('disabled', false);
		
		
	});



	
	$("#id_switchcheck").change(function() {
		
		$(".form-check-input:not(#id_switchcheck)").prop( "checked", false );
		
		$(".form-check-input:not(#id_switchcheck)").siblings().removeClass("text-dark");
				
		$(this).siblings().addClass("text-dark");
		
		$("#search_input").attr("placeholder","").prop('disabled', false);;
	    
	});
	
	
		
	$("#phone_switchcheck").change(function() {
		
		$(".form-check-input:not(#phone_switchcheck)").prop( "checked", false );
		
		$(".form-check-input:not(#phone_switchcheck)").siblings().removeClass("text-dark");
				
		$(this).siblings().addClass("text-dark");
		
		$("#search_input").attr("placeholder","").prop('disabled', false);;
		

		
	    
	});
	
	
	
		
	$("#date_switchcheck").change(function() {
		
		$(".form-check-input:not(#date_switchcheck)").prop( "checked", false );

		$(".form-check-input:not(#date_switchcheck)").siblings().removeClass("text-dark");
				
		$(this).siblings().addClass("text-dark");
		
		$("#search_input").attr("placeholder","Search All").prop('disabled', true);;
		
		
		$("#search_input").val("");
		

		
	    
	});
	
	

	$("#search_btn").click(function(){
//		e.preventDefault();
		search_btn_click();	
		
	});
	
	
	$("form").keypress(function(e) {
		
		
		
		
	    if(e.which == 13) {
			e.preventDefault();
			search_btn_click();	        
	    }
	});
	
	
	
	
	
	
	load_latest_farmer();
	
	
}









function start_date_change(e)
{
	
	console.log(e);
	
	$("#start_date").popover('dispose');
	
	if ( $('input[name="end_date"]').datepicker('getDate') == null){
		
		$('input[name="end_date"]').datepicker('setDate',new Date());
	}
	
	
	
	if (!$("#date_switchcheck").is(":checked")){
		
		$("#date_switchcheck").trigger("click");	
		
	} 
	
	
	
}








function end_date_change(e)
{
	
	console.log(e);
	
	
	
	if ( $('input[name="start_date"]').datepicker('getDate') == null){
		
		$('input[name="start_date"]').datepicker('setDate',new Date($('input[name="end_date"]').datepicker('getDate')));
	}
	
	
	if (!$("#date_switchcheck").is(":checked")){
		
		$("#date_switchcheck").trigger("click");	
		
	} 
	
	
	
}














function search_btn_click()
{
	
	console.log("search_btn_click");
	
	
	
	$("#search_indicator i").attr("class", "spinner-border spinner-border-sm d-flex ");
	
	$(".search_result_message ").text("");
	
	$("#search_table_wrapper").empty();
		
	
	
	$(".search_table_header").text("Search Results");
	
	
	console.log("search_btn_click 1");
	
	
	
	if (( $("#search_input").val().length<4) && (!$("#date_switchcheck").is(":checked")) ){
		
		console.log("less than 4");
	    
		$("#search_indicator i").attr("class", "fas fa-exclamation text-danger");
							
		$(".search_result_message ").text("At least 4 characters are required");
				
		$(".search_result_row").collapse('show');
		
		return ;
				
	}
	

	
	if ($("#name_switchcheck").is(":checked") ){
		
		console.log("search_btn_click 2");
		
		Promise.all([search_farmer_by_name()]).then(function ([data]){
			
			console.log(data);
			
			
			load_search_result(data)
			
			
		});
						
					
		
		
	};
	
	
	
	
	if ($("#id_switchcheck").is(":checked") ){
		
		
		console.log("search_btn_click 3");
		
		Promise.all([search_farmer_by_id()]).then(function ([data]){
			
			console.log(data);
			
			
			load_search_result(data)
			
		});
		
	};
	
	
	
	
	
	if ($("#phone_switchcheck").is(":checked") ){
		
		console.log("search_btn_click 4");
		
		
		Promise.all([search_farmer_by_phone()]).then(function ([data]){
			
			console.log(data);
			
			load_search_result(data)
			
		});
		
		
	};
	
	
	
	
	console.log("search_btn_click 5");
	
	
		
	if ($("#date_switchcheck").is(":checked")==true ){
	
		
		console.log("date_switchcheck ");

		start_date = $('input[name="start_date"]').datepicker('getDate');
		
		end_date = $('input[name="end_date"]').datepicker('getDate');
		
		
		
		
		
		
		if (start_date == null)
		{
			
			$("#search_indicator i").attr("class", "fas fa-exclamation text-danger");
								
			$(".search_result_message ").text("Please specify the Start Date ");
		

				
				
			return;
			
		}
		else if (end_date == null) {
				
			
			
			$("#search_indicator i").attr("class", "fas fa-exclamation text-danger");
								
			$(".search_result_message ").text("Please specify the End Date ");
		

				
		
			return;
				
		}	
		else if (new Date(start_date).getTime() > new Date(end_date).getTime()){
			
			
			$("#search_indicator i").attr("class", "fas fa-exclamation text-danger");
								
			$(".search_result_message ").text(" The Start date can not to greater than the End data ");
			
			
			return;
			
		}
		else{
			

			
			Promise.all([search_farmer_between_create_date()]).then(function ([data]){
				
				
				load_search_result(data)
				
			});
		
		}
				
			
		
	};
	
	
	
	
	
	
	
	
	
	
}





function load_latest_farmer()
{
	
		
	Promise.all([get_farmer_latest()])
			.then(function ([data]){
		
				console.log(data);
				
				
				farmer_list = data.farmer_list;
				
				
						
				if (data.message=="error"){
					
					$(".search_result_row").collapse('show');
					
					
					$(".search_result_row .col .col").html($('<div class="search_message text-danger "> Something went wrong, try again.</div>'));
					
				}
				else if (data.message=="not_found"){
					
					
					$(".search_result_row").collapse('show');
					
					$(".search_result_row .col .col").html($('<div class="search_message text-warning "> No Search Results Found </div>'));
					
					$(".search_result_list").empty();
					
					$(".search_table_header").text(" No Search Results Found ");
					
				}
				else if (data.message=="success"){
							
					$(".search_row").collapse('show');
					
					$(".search_message").remove();
					
					$(".search_table_row .col").append($('<table id="search_table" class="table table-bordered table-hover dataTable" width="100%"></table>'));
					
					

					draw_search_table();
					
					
					
				
				}
		
		
		
		
	});
	
}








function draw_search_table()
{
						
						
	console.log(farmer_list);
	
	$(".search_table_row .col ").html($('<table id="search_table" class="table table-bordered table-hover dataTable" width="100%"></table>'));

	
	search_table = $('#search_table')
						.DataTable({
							        data: farmer_list,
									destroy: true,
	//								dom: "Bfrtip",
	//								select: true,
									order: [[ 3, "desc" ]],
									columns: [
									            {
													title:"Farmer ID",
													data: "id",
													
													render: function(data, type, row, meta) {
														return  '<span class="text-uppercase text-monospace ">'+data+'</span>';
													}
												},
												{
													title:"Full Name  ",
													data: "name" ,
													render: function(data, type, row, meta) {
														console.log(row);
														return  '<span class="text-capitalize text-primary" >'
																	+row.name +' '+ row.surname 
																+'</span>';
													}
													
												},
												
												{
													title:"Phone ",
													data: "phone" ,
													render: function(data, type, row, meta) {
														return  '<span class="  " >'+data+'</span>';
													}
													
												},
												{
													title:"Created Date",
													data: "createDate",
													render: function(data, type, row, meta) {
														return  '<span class="text-capitalize text-dark" >'+data+'</span>';
														

													}
												},
									            
									        ],
							        
							        
							    });
			
			
		$('#search_table tbody').on('click', 'tr', function () {
			
			
			window.location = "user/view/farmer?i="+search_table.row( this ).data().id;
			
		} );
		
		
		
		
		
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
		
			
					
		$(".search_message").remove();
		
		$(".search_table_row .col").append($('<table id="search_table" class="table table-bordered table-hover dataTable" width="100%"></table>'));
		
		

		draw_search_table();
					
					
		
	
		
	}
	
	
}








function get_farmer_latest()
{
    var deferred = new $.Deferred();
    
//    MH-02-GG-333
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/farmer/get/latest",	    
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






function search_farmer_between_create_date()
{
	
	var deferred = new $.Deferred();

    
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/farmer/search/between/create_date",	  
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
			"createDate" : start_date,
	    	"updateDate":  end_date,

			
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


