

saved = false;

var transporter_f2h_id ="";


var name = "";
var surname = "";
var phone = "";
var vehicle_num = "";

var comp_name = "";
var comp_address = "";
var comp_pincode = "";









var payment_index = 0;

var payment_index_list = [];

var deleted_payment_id_list = [];

var vendor_payment_list_json = [];








function init_add_transporter_f2h()
{
	
	transporter_f2h_id = create_primary_id();
	
	
	
	$("#transporter_f2h_id_input").val(transporter_f2h_id);
	
	
	
	
	set_upload_event("#driving_licence_upload_input",
						"transporter_f2h/"+transporter_f2h_id+"/driving_licence/", transporter_f2h_id);
	
		
		
	set_upload_event("#aadhar_card_upload_input",
						"transporter_f2h/"+transporter_f2h_id+"/aadhar_card/", transporter_f2h_id);
	
		
	
	
	
	set_upload_event("#pan_card_upload_input",
						"transporter_f2h/"+transporter_f2h_id+"/pan_card/", transporter_f2h_id);
	
		
		
	
	
	$("#add_payment_btn").click(function(){
		
		add_payment_detail($(this));
		
	});
	
	
	$(".add_save").click(function(){
		
		
		console.log("add_save");
		
		save_btn_click();
		
		
		
	});
	
	
}








function add_payment_detail(add_farm_btn)
{

	[_payment_index, payment_index_list] =  get_index_list(payment_index_list);

	
	
	console.log(_payment_index);
	
	console.log(payment_index_list);
	
	
	
	
	var payment_data = {
						id : random_string(32),
						
						type: "farmer",
						
						payment_index: _payment_index,
						
						bank_name:"",
						branch_name:"",
						
						
						ifsc_code:"",
						account_name:"",
						account_number:"",
						
						
						gst_number:"",
						
						
						
								
					};
					
	add_payment_detail_with_data(payment_data);


}






function add_payment_detail_with_data(payment_data)
{
	
	
	_payment_index = parseInt( payment_data.payment_index ) ;

		
	var payment_html = 
	
				'<div class="row">'+
				'	<div class="col">'+
				'   <button class="btn btn-danger btn-sm btn-icon-split float-right rounded-pill delete_payment_btn" type="button"  >  '  + 
				'     '  + 
				'   	<span class="icon text-white-50 rounded-circle">  '  + 
				'   		<i class="fas fa-trash"></i>  '  + 
				'   	</span>  '  + 
				'   	<span class="text">Delete Payment Detail '+_payment_index+'</span>  '  + 
				'     '  + 
				'   </button>  ' +
				'	</div>'+
				'</div>'+	
	
				'<div class="row ">'+
				'	<div class="col-4">'+
				''+
				'		<div class="form-group mb-4">'+
				'			<label for="payment_bank_name_input'+_payment_index+'"> Bank name </label> '+
				'			<input  id="payment_bank_name_input'+_payment_index+'" class="form-control " type="text" placeholder="">'+
				'		</div>'+
				''+
				'	</div>'+
				'	'+
				'	'+
				'	<div class="col-4">'+
				''+
				'		<div class="form-group mb-4">'+
				'			<label for="payment_bank_branch_name_input'+_payment_index+'"> Branch name</label> '+
				'			<input  id="payment_bank_branch_name_input'+_payment_index+'" class="form-control " type="text" placeholder="">'+
				'		</div>'+
				''+
				'	</div>'+
				''+
				'	<div class="col-4">'+
				''+
				'		<div class="form-group mb-4">'+
				'			<label for="ifsc_code_input'+_payment_index+'">IFSC code</label> '+
				'			<input id="ifsc_code_input'+_payment_index+'" class="form-control "  type="text" placeholder="">'+
				'		</div>'+
				''+
				'	</div>'+
				''+
				'</div>'+
				''+
				''+
				''+
				'<div class="row ">'+
				''+
				''+
				''+
				'	<div class="col-4">'+
				''+
				'		<div class="form-group mb-4">'+
				'			<label for="account_name_input'+_payment_index+'">Account name</label> '+
				'			<input id= "account_name_input'+_payment_index+'" class="form-control "  type="text" placeholder="">'+
				'		</div>'+
				''+
				'	</div>'+
				'	'+
				'	'+
				'	'+
				'	<div class="col-4">'+
				''+
				'		<div class="form-group mb-4">'+
				'			<label for="account_number_input'+_payment_index+'"> Account number </label> '+
				'			<input  id="account_number_input'+_payment_index+'" class="form-control " type="text" placeholder="">'+
				'		</div>'+
				''+
				'	</div>'+
				''+
				'	'+
				'	'+
				'	<div class="col-4">'+
				''+
				'		<div class="form-group mb-4">'+
				'			<label for="gst_number_input'+_payment_index+'">GST number </label> '+
				'			<input id="gst_number_input'+_payment_index+'" class="form-control "  type="text" placeholder="">'+
				'		</div>'+
				''+
				'	</div>'+
				'	'+
				''+
				'</div>';
				

	
	
	
	
	$(
		'<li class="nav-item mr-1" role="presentation">'  + 
			'<a class="nav-link " id="payment'+_payment_index+'-tab" data-toggle="tab" href="#payment'+_payment_index+'" role="tab" aria-controls="payment'+_payment_index+'" aria-selected="false">Payment Detail '+_payment_index +'</a>'  + 
		'</li>'
	)
	.appendTo("#payment_tab_nav");
	
	
	
	
	
	var tabpanel = $('<div class="tab-pane fade  " id="payment'+_payment_index+'" '+ 
							'data-payment_id='+payment_data.id+' data-new_payment=true data-payment_index='+_payment_index+' '+  
							'role="tabpanel" aria-labelledby="payment'+_payment_index+'-tab">'+
					'</div>')
						.appendTo("#payment_tab_content");
						
		
	
	tabpanel.html(payment_html);

	
	
	$("#payment_tab_nav").find(".nav-link:last")[0].click();
	
	
	
	
	
	
	
	
	
	$("#payment_bank_name_input"+_payment_index).val(payment_data.bank_name);
	
	$("#payment_bank_branch_name_input"+_payment_index).val(payment_data.branch_name);
	
	$("#ifsc_code_input"+_payment_index).val(payment_data.ifsc_code);
	
	
	$("#account_name_input"+_payment_index).val(payment_data.account_name);
	
	$("#account_number_input"+_payment_index).val(payment_data.account_number);
	
	$("#gst_number_input"+_payment_index).val(payment_data.gst_number);
	
	
		
						
	
	
	
	$("#payment"+_payment_index+" .delete_payment_btn").click(function(){
		
		delete_payment_btn_click($(this));
		
	});
	

	

	
}








function delete_payment_btn_click(delete_payment_btn)
{
	
	
	
	console.log(delete_payment_btn);
	
	
	
	var deleted_tab_pane = $(delete_payment_btn).closest(".tab-pane");



	var nav_item_a_id = "#"+deleted_tab_pane.attr("aria-labelledby");
	
	$(nav_item_a_id).parent().remove();
	

	

	var current_index =  parseInt( deleted_tab_pane.attr("data-payment_index")) ;
		
	payment_index_list.splice(payment_index_list.indexOf( current_index ), 1);

	deleted_payment_id_list.push ( deleted_tab_pane.attr("data-payment_id") ); 

	



	deleted_tab_pane.remove();
	
	
	
	if ($("#payment_tab_nav").find(".nav-link:first").length>0){
		
		$("#payment_tab_nav").find(".nav-link:first")[0].click();
			
	};




}







function save_btn_click()
{
	

	var promises = [];
		
	promises.push(validate_name("#transporter_f2h_name_input",true));
	promises.push(validate_name("#transporter_f2h_surname_input",true));
	promises.push(validate_phone("#transporter_f2h_phone_input",true));
	promises.push(validate_vehicle_number("#transporter_f2h_vehicle_num_input",true));
	
	
	if ($("#comp_name_input").val().length>0){
		
		promises.push( validate_name("#comp_name_input",false) );

		
	}
	
	
	if ($("#comp_address_input").val().length>0){
		
		promises.push( validate_text("#comp_address_input",false) );

		
	}
	
	
	
	if ($("#comp_pincode_input").val().length>0){
		
		promises.push( validate_pincode("#comp_pincode_input",false) );

		
	}
	
	
	
	
	
	/* ------------------------------------ */	

	
	
	

	if ($("#aadhar_card_input").val().length>0){
		
//		console.log("#aadhar_card_input");

		promises.push( validate_text("#aadhar_card_input",false) );
		
	}
	
	if ($("#pan_card_input").val().length>0){
		
//		console.log("#pan_card_input");
		
		promises.push( validate_text("#pan_card_input",false) );
		
	}
	
	
	/* ------------------------------------ */	

	
	
	
	
	
	
	
	$("#payment_tab_content .tab-pane").each((i,tab_pane)=>{
		
		
		$(tab_pane).find("input").each((j,d)=>{
			
			
			
			if ($(d).val().length>0){
				
				
				
				if ($(d).attr("id").indexOf("payment_bank_name_input")>=0){
										
					promises.push( validate_text("#"+$(d).attr("id") ,false) );
					
				}
				if ($(d).attr("id").indexOf("payment_bank_branch_name_input")>=0){
										
					promises.push( validate_text("#"+$(d).attr("id") ,false) );
					
				}
				if ($(d).attr("id").indexOf("ifsc_code_input")>=0){
										
					promises.push( validate_text("#"+$(d).attr("id") ,false) );
					
				}
				if ($(d).attr("id").indexOf("account_name_input")>=0){
										
					promises.push( validate_text("#"+$(d).attr("id") ,false) );
					
				}
				if ($(d).attr("id").indexOf("account_number_input")>=0){
										
					promises.push( validate_text("#"+$(d).attr("id") ,false) );
					
				}
				if ($(d).attr("id").indexOf("gst_number_input")>=0){
										
					promises.push( validate_text("#"+$(d).attr("id") ,false) );
					
				}
				
				
				
				
			};
			
			
		});
		
		
	});
	
	
	
	
	/* ------------------------------------ */	

	
	
	
	
	
	
	
	
	
	
	
	
	
	Promise
		.all(promises)
        .then((data) => {
			
			console.log(data);
			
			
			
			for(var i=0; i<data.length; i++){
				
				if (!data[i][0]){
					
					console.log("error: validation");
					
					return;
				}
				
				
				
				if(i+1==data.length){
					
					name = $("#transporter_f2h_name_input").val().replace(/\s\s+/g, ' ').trim();
					
					surname = $("#transporter_f2h_surname_input").val().replace(/\s\s+/g, ' ').trim();
					
					phone = $("#transporter_f2h_phone_input").val();
					
					vehicle_num = $("#transporter_f2h_vehicle_num_input").val()
										.replace(/\s\s+/g, ' ')
										.trim()
										.replace(/\s/g, '-')
										;
					
					
	
					aadhar_card = $("#aadhar_card_input").val().replace(/\s\s+/g, ' ').trim();
					pan_card = $("#pan_card_input").val().replace(/\s\s+/g, ' ').trim();
				
									
					comp_name = $("#comp_name_input").val();
					comp_address = $("#comp_address_input").val();
					comp_pincode = $("#comp_pincode_input").val();
					
					
				





					payment_tab_pane_list = $("#payment_tab_content .tab-pane");
					
					vendor_payment_list_json = [];
					
					


					for (var j=0; j<payment_tab_pane_list.length; j++){
						
						
						var payment_tab_pane = $(payment_tab_pane_list[j]);
						
						var _payment_index = payment_tab_pane.attr("data-payment_index");
						
						
						console.log(payment_tab_pane);
						
						console.log(_payment_index);

						
						var vendor_payment_elem = {
							
							
							id : payment_tab_pane.attr("data-payment_id"),
							
							payment_index: _payment_index,

							
							type : "farmer",
								
							bank_name : $("#payment_bank_name_input"+_payment_index).val().replace(/\s\s+/g, ' ').trim(),
				
							branch_name : $("#payment_bank_branch_name_input"+_payment_index).val().replace(/\s\s+/g, ' ').trim(),
				
							ifsc_code : $("#ifsc_code_input"+_payment_index).val().replace(/\s\s+/g, ' ').trim(),
				
				
							account_name : $("#account_name_input"+_payment_index).val().replace(/\s\s+/g, ' ').trim(),
				
							account_number : $("#account_number_input"+_payment_index).val().replace(/\s\s+/g, ' ').trim(),
				
							gst_number : $("#gst_number_input"+_payment_index).val().replace(/\s\s+/g, ' ').trim(),
	
							
						}; 
						
						
						
						console.log(vendor_payment_elem);
						
						
						vendor_payment_list_json.push(vendor_payment_elem);
						
					
					
					}
					
					
					
					
					
					
	
					Promise.all([upload_files_sequentially(), delete_files_sequentially()])
							.then(function ([data]){ 
			
					
								Promise.all([set_transporter_f2h()]).then(function ([data]){
									
									
									if (data.message=="error"){
										
								    	setTimeout(function(){ $(".add_save span i").attr("class", "fas fa-exclamation"); }, 1000);
						
									}
									else{
										
										$(".add_save span i").attr("class", "fas fa-check");
										
										setTimeout(function(){
											
			//								window.location = "user/view/transporter_f2h?i="+transporter_f2h_id;
						
										}, 1000);
						
									}
								
								});
								
								
								
					}); 
					
					
					
					
					
					 
					
				}
				
				
			}
	
	
	
	});
	
	
}




	




function set_transporter_f2h()
{
	
    var deferred = new $.Deferred();
    
    var data = {'message':'error'}; 
  
	
	$.ajax({
		type: "POST",
	    url: "user/api/transporter_f2h/add",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : transporter_f2h_id,
	    	"name":  name,
	    	"surname":  surname,
	    	"phone":phone,
	    	"vehicle_number":vehicle_num,
	    	
	    	"company_name":comp_name,
	    	"company_address":comp_address,	    		    	
	    	"company_pincode":comp_pincode,

			
			"vendor_payment_list" :  vendor_payment_list_json,
			"deleted_vendor_payment_list" : deleted_payment_id_list,

	    	

	    	"aadhar_card":aadhar_card,
			"aadhar_card_file_list": extract_upload_file_names("#aadhar_card_upload_input"),


	    	"pan_card":pan_card,	
			"pan_card_file_list": extract_upload_file_names("#pan_card_upload_input"),


	    	"driving_licence_file_list":extract_upload_file_names("#driving_licence_upload_input"),
	    	
			
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







