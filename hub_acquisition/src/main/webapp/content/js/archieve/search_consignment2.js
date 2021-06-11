
var farmer_list=[];


var start_date;
var end_date


function init_search_consignment()
{
	
	var start_date_input = $('input[name="start_date"]');  
	var end_date_input = $('input[name="end_date"]');  

	var container = $('form').length > 0 ? $('.bootstrap-iso form').parent(): "body";
	
	var options = {
		format : 'dd MM yyyy',
		container : 'body',
		todayHighlight : true,
		autoclose : true,
	};


	start_date_input.datepicker(options).on('changeDate', start_date_change);
	
	end_date_input.datepicker(options).on('changeDate', end_date_change);
	
	
	
	$("#search_btn").click(function(){
		
		$("#search_btn").popover('dispose');
		
		if ($("#search_input").val().length==0){
			
			
			
			start_date = $('input[name="start_date"]').datepicker('getDate');
			
			end_date = $('input[name="end_date"]').datepicker('getDate');
			
			
			
			
			if (start_date == null)
			{
			
				$("#start_date")
					.popover({
							    trigger: 'click hover focus',
							    container: $(this).parent(),
							    placement: 'bottom',
							    html: true,
								title:'<span class="text-warning " >Warning</span>',
							    content: 'Select Start Date'
							})
					.popover('show');
					
					
				return;
				
			}			
			else if (start_date == null) {
				
			
				$("#end_date")
					.popover({
							    trigger: 'click hover focus',
							    container: $(this).parent(),
							    placement: 'bottom',
							    html: true,
								title:'<span class="text-warning " >Warning</span>',
							    content: 'Select End Date'
							})
					.popover('show');
		
				return;
				
			}
			
			
			else if (new Date(start_date).getTime() > new Date(end_date).getTime()){
				
				
				
			
				$("#start_date")
					.popover({
							    trigger: 'click hover focus',
							    container: $(this).parent(),
							    placement: 'bottom',
							    html: true,
								title:'<span class="text-warning " >Warning</span>',
							    content: 'Start Date can not be later than end date.'
							})
					.popover('show');
					
					
				return;
				
				
			}
			else {
				
				
				console.log("Search all for give dates");
				
				
				
				
				
				
				
					
				Promise
					.all([search_consignment_by_create_date()])
			        .then(([data]) => {
						
						console.log(data);
						
						
						
						if (data.message=="error"){
							
							$(".search_result_row").collapse('show');
							
							
							$(".search_result_row .col .col").html($('<div class="search_message text-danger "> Something went wrong, try again.</div>'));
							
						}
						else if (data.message=="not_found"){
							
							
							$(".search_result_row").collapse('show');
							
							$(".search_result_row .col .col").html($('<div class="search_message text-warning "> No Consignments found </div>'));
						}
						else if (data.message=="success"){
							
							$(".search_result_row").collapse('show');
							
							$(".search_message").remove();
							
							$(".search_result_row .col .col").append($('<table id="search_table" class="table table-bordered table-hover dataTable" width="100%"></table>'));
							
							consignment_list = data.consignment_list;
							
							
						
							
							
						

							search_table = $('#search_table')
												.DataTable( {
														        data: consignment_list,
						 										destroy: true,
								//								dom: "Bfrtip",
								//								select: true,
																columns: [
																            {
																				title:"Consignment Id",
																				data: "id",
																				className: "consignment_id"
																			},
																			{
																				title:"Product type",
																				data: "sub_type_id" 
																			},
																			{
																				title:"Created date",
																				data: "create_date" 
																			},
																			
																			{
																				title:"Update date",
																				data: "update_date" 
																			},
																            
																        ],
														        
														        
														    });
		
		 					$('#search_table tbody').on('click', 'tr', function () {
								
								
								window.location = "user/view/consignment?i="+search_table.row( this ).data().id;
								
							} );
		
		
		
							
							
							
						}
						
						
						
						
						
						
						
						
										
						
					});
							
				
				
			}
			
			
			
			
			
		}
		else if (($("#search_input").val().length==14)){
			
			
			console.log("Search specific id");
			
			
		}
		else{
			
			
			
			$("#search_input")
				.popover({
						    trigger: 'click hover focus',
						    container: $(this).parent(),
						    placement: 'bottom',
						    html: true,
							title:'<span class="text-warning " >Warning</span>',
						    content: 'Standard consignment Id is 14 character long.'
						})
				.popover('show');
		
		
			
			
		};
		
		
		
	});
	
	
	
}



function start_date_change(e)
{
	
	console.log(e);
	
	$("#start_date").popover('dispose');
	
	if ( $('input[name="end_date"]').datepicker('getDate') == null){
		
		$('input[name="end_date"]').datepicker('setDate',new Date());
	}
	
	
}



function end_date_change(e)
{
	
	console.log(e);
	
	
	
	if ( $('input[name="start_date"]').datepicker('getDate') == null){
		
		$('input[name="start_date"]').datepicker('setDate',new Date($('input[name="end_date"]').datepicker('getDate')));
	}
	
	
	
	
}










function search_consignment_by_create_date()
{
    var deferred = new $.Deferred();

	console.log("search_consignment_by_create_date");
    
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/consignment/search/bewteen/create_date",	  
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"create_date" : start_date,
	    	"update_date":  end_date,

	    	
	    
			
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







