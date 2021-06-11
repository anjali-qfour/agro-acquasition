
var consignment_list=[];
var consignment_id_list=[];
var consignment_id_url ="";

function init_search_cooling_chamber()
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
	
	

	
	$("#id_switchcheck").change(function() {
		
		$(".form-check-input:not(#id_switchcheck)").prop( "checked", false );
		
		$(".form-check-input:not(#id_switchcheck)").siblings().removeClass("text-dark");
				
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
	
	
	
	
	
	load_latest_consignment();
	
	
	
	
}









function start_date_change(e)
{
	
	console.log(e);
	
	$("#start_date").popover('dispose');
	
	if ( $('input[name="end_date"]').datepicker('getDate') == null)
	{
		
		$('input[name="end_date"]').datepicker('setDate',new Date());
	}
	
	
	
	if (!$("#date_switchcheck").is(":checked")){
		
		$("#date_switchcheck").trigger("click");	
		
	} 
	
	
	
}








function end_date_change(e)
{
	
	console.log(e);
	
	
	
	if ( $('input[name="start_date"]').datepicker('getDate') == null)
	{
		
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
	
	$("#search_table_wrapper").empty(); // can't
		
	
	
	$(".search_table_header").text("Search Results");
	
	
	
	
	if (( $("#search_input").val().length<4) && (!$("#date_switchcheck").is(":checked")) ){
		
		console.log("less than 4");
	    
		$("#search_indicator i").attr("class", "fas fa-exclamation text-danger");
							
		$(".search_result_message ").text("At least 4 characters are required");
		
				
		$(".search_result_row").collapse('show');
	
		return ;
				
	}
	
	
	
	if ($("#id_switchcheck").is(":checked") ){
		
		
		Promise.all([search_consignment_by_id()]).then(function ([data]){
			
			console.log(data);
			
			
			
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
			

			
			Promise.all([search_consignment_between_dates()]).then(function ([data]){
				
				
				load_search_result(data)
				
			});
		
		}
				
			
		
	};
	
	
	
	
	
	
}








function load_search_result(data)
{
	
	consignment_list = data.consignment_list;

	
	
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













function load_latest_consignment()
{
	
		
	Promise.all([get_consignment_latest()])
			.then(function ([data]){
		
				console.log(data);
				
				
				consignment_list = data.consignment_list;
				
				
						
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
						
						
	console.log(consignment_list);
	
	$(".search_table_row .col ").html($('<table id="search_table" class="table table-bordered table-hover dataTable" width="100%"></table>'));

	
	search_table = $('#search_table')
						.DataTable({
							        data: consignment_list,
									destroy: true,
	//								dom: "Bfrtip",
	//								select: true,
	
									
									columnDefs: [
							             {
							                 "targets": 0,
							                 "width": "8%",
							                 "orderable": false,
							                 "checkboxes": {
							                     selectRow: true
							                 },

							 
							             },
							            
								     ],
//								
								       "select": {
								          "style": 'single',
									      selector: 'td:first-child'
								      },


									order: [[ 4, "desc" ]],
									
									select: true,

									columns: [
												{
									                'data':'',
									                'defaultContent':'',
									                'checkboxes':{
										
									                    'selectRow':true
									                },
													className: 'select_checkbox',
													render: function (data, type, full, meta){
											             return '<input type="checkbox" name="id[]" >';
										         	}
												},
															
									            {
													title:"Consignment ID",
													data: "id",
													
													render: function(data, type, row, meta) {
														return  '<span class="text-uppercase text-monospace ">'+data+'</span>';
													}
												},
												{
												    title:"Product Type",
													data: "type_id" ,
													render: function(data, type, row, meta) {
														return  '<span class="text-capitalize type_id" data-consignment_id="'+row.id+'" >'+data+'</span>';
													}
													
												},
												{
													title:"Product Weight",
													data: "weight" ,
													render: function(data, type, row, meta) {
														return  '<small class="text-monospace text-dark fw-bold " >'+data+'</small>';
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
			
			
		$('#search_table tbody').on('click', 'tr', function (e) {
			
			if ($(e.currentTarget).find(".select_checkbox input").is(":checked")){
				
				$(e.currentTarget).find(".select_checkbox input").prop( "checked", false );
				
			}
			else{
				
				$(e.currentTarget).find(".select_checkbox input").prop( "checked", true );;
			}
			
			
		} );
		
		
		
		$(".ask_group_btn").click(function(e){
			
			
			ask_group_btn_click();
			
		});
		
		
		
		$(".group_btn").click(function(e){
			
		
			group_btn_click();
			
		});
		
		
		
		
}






function ask_group_btn_click()
{
	
	var select_checkbox_list =  $(".select_checkbox input:checked");
	
	
	console.log(select_checkbox_list.length);
	
	if (select_checkbox_list.length==0){
		
		$(".ask_group_message").html("Select single consignment to begin");
		
	}
	else if (select_checkbox_list.length>5){
		
		$(".ask_group_message").html("Select only 5 consignment at time");
		
	}
	else{
		
		
		for(var i=0;i<select_checkbox_list.length;i++)
		{
				
		var _consignment_id=($($(".select_checkbox input:checked").get(i)).closest("tr").find(".type_id").data().consignment_id)
			
		
		consignment_id_list.push(_consignment_id);
		
		consignment_id_url = consignment_id_url +"_"+_consignment_id;
		
		console.log(consignment_id_list);
		
		console.log(consignment_id_url);
		}
		
		$(".ask_group_message").html('Grouping all consignment togather <br>for Cooling Chamber, <span class="font-monospace text-uppercase badge bg-primary"> '+consignment_id_list+'</span> <br><br>');
	

		
	};
	

}







function group_btn_click()
{
	
	
	window.location = "user/add/cooling_chamber?i="+consignment_id_url;
	
	
	
}









function get_consignment_latest()
{
    var deferred = new $.Deferred();
    
//    MH-02-GG-333
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/cooling_chamber/get/latest",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
//	    data:  JSON.stringify({ 
//	    	
//	    	"id" : $("#search_input").val(),
//	    	"transporter_f2h_full_name":  $("#search_input").val(),
//	    	"farmer_full_name": $("#search_input").val(),
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








function search_consignment_by_id()
{
    var deferred = new $.Deferred();
    
//    MH-02-GG-333
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/cooling_chamber/get/by/id",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	
		    "id" : $("#search_input").val(),
	    //	"transporter_f2h_full_name":  $("#search_input").val(),
	    //	"farmer_full_name": $("#search_input").val(),
	
	    
			
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






function search_consignment_between_dates()
{
	
	var deferred = new $.Deferred();

    
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/consignment/search/between/create_date",	  
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







