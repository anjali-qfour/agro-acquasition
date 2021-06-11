

saved = false;

var transporter_f2h_data = null;

var name = "";
var surname = "";
var phone = "";
var vehicle_num = "";

var comp_name = "";
var comp_address = "";
var comp_pincode = "";

var create_ts = "";
var update_ts = "";










var payment_index = 0;

var payment_index_list = [];

var deleted_payment_id_list = [];

var vendor_payment_list_json = [];









function init_view_transporter_f2h()
{
	
	

	
	
	
	
	Promise.all([get_transporter_f2h_by_id()]).then(function ([data]){
		
		transporter_f2h_data = data.transporter_f2h_list[0];
		
		if ((data.message=="error")||(data.message=="not_found")){
			
			draw_modal_centered("Error","Something went wrong. Farmer Id is not found ");

		}
		else{
			
			
			$("#transporter_f2h_id_input").val(transporter_f2h_data.id);			
			$("#transporter_f2h_name_input").val(transporter_f2h_data.name);			
			$("#transporter_f2h_surname_input").val(transporter_f2h_data.surname);			
			$("#transporter_f2h_phone_input").val(transporter_f2h_data.phone);			
			$("#transporter_f2h_vehicle_num_input").val(transporter_f2h_data.vehicle_number);
			
			$("#comp_name_input").val(transporter_f2h_data.company_name);
			$("#comp_address_input").val(transporter_f2h_data.company_address);
			$("#comp_pincode_input").val(transporter_f2h_data.company_pincode);
			
			
			
			
			
			
			
			
			
			
			if (transporter_f2h_data.vendor_payment_list.length>0){
			
				for (var i = 0; i<transporter_f2h_data.vendor_payment_list.length; i++){
					
					payment_index_list.push( parseInt( transporter_f2h_data.vendor_payment_list[i].payment_index) ); 
					
					add_payment_detail_with_data(transporter_f2h_data.vendor_payment_list[i],false);
					
					
					if (i+1==transporter_f2h_data.vendor_payment_list.length){
						
					
						setTimeout(function(){
							
							$("#payment_tab_nav").find(".nav-link:last")[0].click();
						
						}, 400);

					}
					
					
					
				}
				
				
			};
			
			
			
			
			
			
			
			set_upload_event("#aadhar_card_upload_input",
								"transporter_f2h/"+transporter_f2h_id+"/aadhar_card/", transporter_f2h_id);
			
				
			
			
			
			if (transporter_f2h_data.aadhar_card_file_list.length>0){
			
				for (var i = 0; i<transporter_f2h_data.aadhar_card_file_list.length; i++){
					
					add_aadhar_card_file_list(transporter_f2h_data.aadhar_card_file_list[i]);
					
				}
				
				
			};
			
			
						
			set_upload_event("#pan_card_upload_input",
								"transporter_f2h/"+transporter_f2h_id+"/pan_card/", transporter_f2h_id);
			
			
			if (transporter_f2h_data.pan_card_file_list.length>0){
			
				for (var i = 0; i<transporter_f2h_data.pan_card_file_list.length; i++){
					
					add_pan_card_file_list(transporter_f2h_data.pan_card_file_list[i]);
					
				}
				
				
			};
			
			
			

			set_upload_event("#driving_licence_upload_input",
									"transporter_f2h/"+transporter_f2h_id+"/driving_licence/", transporter_f2h_id);
				
				
			
			if (transporter_f2h_data.driving_licence_file_list.length>0){
			
				for (var i = 0; i<transporter_f2h_data.driving_licence_file_list.length; i++){
					
					add_address_proof_file_list(transporter_f2h_data.driving_licence_file_list[i]);
					
				}
				
				
			};
			
			
			
			
		}

	
	}); 
	
	
	
	
	
	
	$(".update_btn").click(function(){
		
		
		console.log("add_save");
		
		save_btn_click();
		
		
		
	});
	
	
	
	
	
	$("#add_payment_btn").click(function(){
		
		add_payment_detail($(this));
		
	});
	
	
	
	
	
}















function add_payment_detail(add_farm_btn)
{

	[_payment_index, payment_index_list] =  get_index_list(payment_index_list);



	
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
					
					
	add_payment_detail_with_data(payment_data, true);
	
	setTimeout(function(){
			$("#payment"+_payment_index+"-tab")[0].click();
		}, 
		200);
	
		



}











function add_payment_detail_with_data(payment_data, newly_created)
{
	
	
	console.log(payment_data);
	
	_payment_index = parseInt( payment_data.payment_index ) ;

		
	var payment_html = 
	
				'<div class="row" >'+
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
							'data-payment_id='+payment_data.id+' data-newly_created='+newly_created+' data-payment_index='+_payment_index+' '+  
							'role="tabpanel" aria-labelledby="payment'+_payment_index+'-tab">'+
					'</div>')
						.appendTo("#payment_tab_content");
						
		
	
	tabpanel.html(payment_html);

	
	
	
	
	
	
	
	
	
	
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
	
	

	
	var deleted_tab_pane = $(delete_payment_btn).closest(".tab-pane");
	
	


	var nav_item_a_id = "#"+deleted_tab_pane.attr("aria-labelledby");
	
	$(nav_item_a_id).parent().remove();
	

	

	var current_index =  parseInt( deleted_tab_pane.attr("data-payment_index")) ;
		
	payment_index_list.splice(payment_index_list.indexOf( current_index ), 1);
	
	
	if (!deleted_tab_pane.data("newly_created")){
		
		deleted_payment_id_list.push ( deleted_tab_pane.attr("data-payment_id") );
		
	}

	 

	



	deleted_tab_pane.remove();
	
	
	
	if ($("#payment_tab_nav").find(".nav-link:first").length>0){
		
		$("#payment_tab_nav").find(".nav-link:first")[0].click();
			
	};




}














function add_address_proof_file_list(address_proof_file)
{
	var file_name = address_proof_file;

	
	var upload_input_id = "#driving_licence_upload_input";

	

	var upload_full_path = "transporter_f2h/"+transporter_f2h_id+"/address_proof/"+file_name;

	
	var file_elem = 		
					$(  
						'<div data-file_name='+file_name+' class="d-flex mb-2 align-items-center uploaded_file_name">'+	
						'	<div class="float-left w-100">'+									
						'		<a class="d-flex align-items-center" href="user/api/file/download/?f='+upload_full_path+'" download="'+file_name+'">'+
						'			<div class="float-left"><i class="fas fa-file-image fa-2x text-info mr-1 float-left"></i></div>'+
						'			<div class="ml-1">'+file_name+' </div>'+
						'		</a>'+
						'	</div>'+																								
						'	<div  class="btn btn-sm btn-danger btn-md ml-2 shadow-sm btn-icon btn-circle float-right flex-shrink-1 cursor_on delete_uploaded_file">'+
						'		<i class="fas fa-trash-alt"></i>'+ 
						'	</div>'+
						'</div>'
						
					);
					
	
	$(upload_input_id).closest(".row")
									.find(".uploaded_file_name_list")
									.append(file_elem);
	
	
			
	file_elem.find(".delete_uploaded_file")
					.click(function(d){

						delete_btn_click($(this), upload_input_id, file_name);
						
					});
	

	

	
	file_map[upload_input_id][file_name] = {
												file : {},
												upload_full_path: upload_full_path,
												status: "old",
		
											};			
		
}











function add_pan_card_file_list(pan_card_file)
{

	console.log(pan_card_file);
	
	var file_name = pan_card_file;
	
	
	var upload_input_id = "#pan_card_upload_input";

	var upload_full_path = "transporter_f2h/"+transporter_f2h_id+"/pan_card/"+file_name;

	
	
	var file_elem = 		
					$(  
						'<div data-file_name='+file_name+' class="d-flex mb-2 align-items-center uploaded_file_name">'+	
						'	<div class="float-left w-100">'+									
						'		<a class="d-flex align-items-center" href="user/api/file/download/?f='+upload_full_path+'" download="'+file_name+'">'+
						'			<div class="float-left"><i class="fas fa-file-image fa-2x text-info mr-1 float-left"></i></div>'+
						'			<div class="ml-1">'+file_name+' </div>'+
						'		</a>'+
						'	</div>'+																								
						'	<div  class="btn btn-sm btn-danger btn-md ml-2 shadow-sm btn-icon btn-circle float-right flex-shrink-1 cursor_on delete_uploaded_file">'+
						'		<i class="fas fa-trash-alt"></i>'+ 
						'	</div>'+
						'</div>'
						
					);		
	
	
	$(upload_input_id).closest(".row")
									.find(".uploaded_file_name_list")
									.append(file_elem);
	
	
			
	file_elem.find(".delete_uploaded_file")
					.click(function(d){

						delete_btn_click($(this), upload_input_id, file_name);
						
					});
	
	

	
	file_map[upload_input_id][file_name] = {
												file : {},
												upload_full_path: upload_full_path,
												status: "old",
		
		
											};
		
	
	
}







function add_aadhar_card_file_list(aadhar_card_file)
{

	console.log(aadhar_card_file);
	
	var upload_input_id = "#aadhar_card_upload_input";
	
	var file_name = aadhar_card_file;
	

	var upload_full_path = "transporter_f2h/"+transporter_f2h_id+"/aadhar_card/"+file_name;
	
	
	
	var file_elem = 		
					$(  
						'<div  class="d-flex mb-2 align-items-center uploaded_file_name">'+	
						'	<div class="float-left w-100">'+									
						'		<a class="d-flex align-items-center" href="user/api/file/download/?f='+upload_full_path+'" download="'+file_name+'">'+
						'			<div class="float-left"><i class="fas fa-file-image fa-2x text-info mr-1 float-left"></i></div>'+
						'			<div class="ml-1">'+file_name+' </div>'+
						'		</a>'+
						'	</div>'+																								
						'	<div  class="btn btn-sm btn-danger btn-md ml-2 shadow-sm btn-icon btn-circle float-right flex-shrink-1 cursor_on delete_uploaded_file">'+
						'		<i class="fas fa-trash-alt"></i>'+ 
						'	</div>'+
						'</div>'
						
					)
					.data(
						{file_name:file_name,upload_full_path:upload_full_path}
					);	;		
	
	
	$(upload_input_id).closest(".row")
									.find(".uploaded_file_name_list")
									.append(file_elem);
	
			
	file_elem.find(".delete_uploaded_file")
					.click(function(d){

						delete_btn_click($(this), upload_input_id, file_name);
						
					});
	
	
//	console.log(file_map[upload_input_id][file_name]);
	
	file_map[upload_input_id][file_name] = {
												file : {},
												upload_full_path: upload_full_path,
												status: "old",
		
		
											};
		
	
}









function save_btn_click()
{
	
	
	$(".update_btn span i").attr("class", "spinner-border spinner-border-sm d-flex mt-1");


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
					
					
					
					
					comp_name = $("#comp_name_input").val();
					comp_address = $("#comp_address_input").val();
					comp_pincode = $("#comp_pincode_input").val();
					
					
					aadhar_card = $("#aadhar_card_input").val().replace(/\s\s+/g, ' ').trim();
					pan_card = $("#pan_card_input").val().replace(/\s\s+/g, ' ').trim();
				
					
				
				
				
				

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
			
					

								Promise.all([update_transporter_f2h()]).then(function ([data]){
									
									
									
			
									if (data.message=="error"){
										
										$(".update_btn span i").attr("class", "fas fa-bug text-danger");
										
									}
									else if (data.message=="not_found"){
												
										
										$(".update_btn span i").attr("class", "fas fa-exclamation text-danger");
										
										
									}
									else if (data.message=="success"){
										
										$(".update_btn span i").attr("class", "fas fa-check");
													
										setTimeout(function(){
											
											window.location = "user/view/transporter_f2h?i="+transporter_f2h_id;
						
										}, 500);
									
										
										
									}
								
								}); 
								
								
							});
					
				}
				
				
			}
	
	
	
	});
	
	
}








function get_transporter_f2h_by_id()
{
    var deferred = new $.Deferred();
    
	
	        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/transporter_f2h/get/by/id",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : transporter_f2h_id,

	    	
	    
			
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








function update_transporter_f2h()
{
    var deferred = new $.Deferred();
    

	console.log("set_transporter_f2h");
	
	
	        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/transporter_f2h/update",	    
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

			"createDate" : new Date(transporter_f2h_data.createDate),
	    	
			
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







