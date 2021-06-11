
var farmer_invoice_list=[];





function init_search_famrer_invoice()
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
	
	
	
	
	
	
	load_latest_invoices();
	
	
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













function load_latest_invoices()
{
		
		
	Promise.all([get_farmer_invoice_latest()])
			.then(function ([data]){
		
				console.log(data);
				
				
				farmer_invoice_list = data.farmer_invoice_list;
				
				
						
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











function search_btn_click()
{
	
	console.log("search_btn_click");
	
	
	
	$("#search_indicator i").attr("class", "spinner-border spinner-border-sm d-flex ");
	
	$(".search_result_message ").text("");
	
	$("#search_table_wrapper").empty();
		
	
	
	$(".search_table_header").text("Search Results");
	
	
	
	
	if (( $("#search_input").val().length<4) && (!$("#date_switchcheck").is(":checked")) ){
		
		console.log("less than 4");
	    
		$("#search_indicator i").attr("class", "fas fa-exclamation text-danger");
							
		$(".search_result_message ").text("At least 4 characters are required");
				
		
		return ;
				
	}
	

	
	if ($("#name_switchcheck").is(":checked") ){
		
		console.log("name_switchcheck");

		
		Promise.all([search_farmer_invoice_by_name()]).then(function ([data]){
			
			
			load_search_result(data);
			
			
		});
			
		
	};
	
	
	
	if ($("#id_switchcheck").is(":checked") ){
		
		
		Promise.all([get_farmer_invoice_by_id()]).then(function ([data]){
			
			

			
			load_search_result(data)
			
		});
		
	};
	
	
	
	
	
	if ($("#phone_switchcheck").is(":checked") ){
		
		console.log("phone_switchcheck");

		
		Promise.all([search_farmer_invoice_by_phone()]).then(function ([data]){
			
			
			load_search_result(data)
			
		});
		
		
	};
	
	
	
	
	
	
	
	
		
	if ($("#date_switchcheck").is(":checked") ){
	
		
		
		start_date = $('input[name="start_date"]').datepicker('getDate');
		
		end_date = $('input[name="end_date"]').datepicker('getDate');
		
		
		
		if (start_date == null)
		{
			
			$("#search_indicator i").attr("class", "fas fa-exclamation text-danger");
								
			$(".search_result_message ").text("Please specify the Start Date ");
		

				
				
			return;
			
		}
		else if (start_date == null) {
				
			
			
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
			

			
			Promise.all([search_farmer_invoice_between_dates()]).then(function ([data]){
				
				
				load_search_result(data)
				
			});
		
		}
				
			
		
	};
	
	
	
	
	
	
	
	
	
	
}










function load_search_result(data)
{
	
	console.log(data);

	
	farmer_invoice_list = data.farmer_invoice_list;




	if (data.message=="error"){
		
		$("#search_indicator i").attr("class", "fas fa-bug text-danger");
		
		$(".search_result_message ").text("Something went wrong, try again");
		
		$(".search_result_row").collapse('show');
		
	}
	else if (data.message=="not_found"){
				
		
		$("#search_indicator i").attr("class", "fas fa-exclamation text-danger");
		
		$(".search_result_message ").text("No results found");
		
		$(".search_result_row").collapse('show');
		
	}
	else if (data.message=="success"){
		
		
		$(".search_result_row").collapse('show');
		
		$("#search_indicator i").attr("class", "fas fa-check text-success");
		
		
		draw_search_table();
		
		

		
	}
	
	
}










function draw_search_table()
{
						
						
	console.log(farmer_invoice_list);
	
	$(".search_table_row .col ").html($('<table id="search_table" class="table table-bordered table-hover dataTable" width="100%"></table>'));

	
	search_table = $('#search_table')
						.DataTable({
							        data: farmer_invoice_list,
									destroy: true,
	//								dom: "Bfrtip",
	//								select: true,
									order: [[ 3, "desc" ]],
									columns: [
									            {
													title:"Farmer Invoice Id",
													data: "id",
													
													render: function(data, type, row, meta) {
														return  '<small class="text-uppercase text-monospace fw-bold transporter_id">'+data+'</small>';
													}
												},
												{
													title:"Full name ",
													data: "full_name" ,
													render: function(data, type, row, meta) {
														return  '<span class="text-capitalize" >'+data+'</span>';
													}
													
												},
												{
													title:"Product type",
													data: "sub_type_id" ,
													render: function(data, type, row, meta) {
														return  '<small class="text-monospace text-dark fw-bold " >'+data+'</small>';
													}
													
												},
												{
													title:"Created date",
													data: "createDate",
													render: function(data, type, row, meta) {
														return  '<small class="" >'+data+'</small>';
													} 
												},

												
												{
													title:"Status",
													data: "status",
													render: function(data, type, row, meta) {
														console.log(data);
														
														var class_type = "";
														
														if (data=="pending"){
															class_type ="bg-warning text-dark";
														}
														if (data=="initiated"){
															class_type ="bg-primary ";
														}
														if (data=="failed"){
															class_type ="bg-danger ";
														}
														if (data=="completed"){
															class_type ="bg-success ";
														}
														if (data=="disputed"){
															class_type ="bg-danger ";
														}
														
														return ' <span class="badge rounded-pill text-capitalize '+class_type+'">'+data+'</span>';

													}
												},
												
												{
													data:'',
									                defaultContent:'',									               
													
													render: function (data, type, row, meta){
														

														return  '<a href= "'+"user/view/farmer_invoice?i="+row.id+'" data-transporter_f2h_id="'+row.id+'"   class="btn btn-info btn-sm btn-icon-split rounded-pill gothere_btn"  >'+ 
																'<span class="icon text-white-50" >'+
																	'<i class="fas fa-arrow-right"></i>'+ 
																'</span>'+
																'<span class="text"> Go </span>'+
																'</a>';
																
										         	}
												},
									            
									        ],
							        
							        
							    });
			
			
//		$('#search_table tbody').on('click', 'tr', function () {
//			
//			
//			window.location = "user/view/farmer_invoice?i="+search_table.row( this ).data().id;
//			
//		} );
		
		
		
		
		
}




function search_farmer_invoice_by_name()
{
    var deferred = new $.Deferred();
    
	console.log("search_farmer_invoice_by_name");
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/farmer_invoice/search/by/name",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : $("#search_input").val(),
	    	"full_name":  $("#search_input").val(),
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







function get_farmer_invoice_by_id()
{
    var deferred = new $.Deferred();
    
	
	        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/farmer_invoice/get/by/id",	    
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





function search_farmer_invoice_by_phone()
{
    var deferred = new $.Deferred();

	console.log("search_farmer_invoice_by_phone");
    
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/farmer_invoice/search/by/phone",	  
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











function get_farmer_invoice_latest()
{
    var deferred = new $.Deferred();

	console.log("search_farmer_by_phone");
    
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/farmer_invoice/get/latest",	  
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
//	    data:  JSON.stringify({ 
//	    	
//	    	"id" : $("#search_input").val(),
//	    	"name":  $("#search_input").val(),
//	    	"phone": $("#search_input").val(),
//
//	    	
//	    
//			
//	    }),	    
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







function search_farmer_invoice_between_dates()
{
	
	var deferred = new $.Deferred();

	console.log("search_transporter_f2h_invoice_by_phone");
    
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/farmer_invoice/search/between/dates",	  
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


