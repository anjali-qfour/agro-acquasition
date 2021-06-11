

saved = false;



var name = "";
var surname = "";
var phone = "";
var home_address = "";
var home_pincode = "";



var relative_list_json=[];

var deleted_relative_list=[];



var aadhar_card = "";
var pan_card = "";



var farm_area = -1;
var irrigation_type = "";

var seeds_used = "";
var fertilizer = "";
var insecticides = "";

var weather_predictions_source = "";
var weather_predictions_useful = "";

var market_information_source = "";
var market_information_useful = "";

var farm_address = "";
var farm_pincode = "";



var loan_amount = -1;
var bank_name = "";






var farmer_data = null;

var farm_index = 0;
//var farm_index_list = Array.from(Array(10), (_,x) => x);

var deleted_farm_id_list = [];

var farm_index_list = [];







var payment_index = 0;

var payment_index_list = [];

var deleted_payment_id_list = [];

var vendor_payment_list_json = [];














function init_view_farmer()
{
	
	
	Promise.all([get_farmer_by_id()]).then(function ([data]){
		
		
		console.log("completed");
		
		console.log(data);
		
		if ((data.message=="error")||(data.message=="not_found")){
			
			draw_modal_centered("Error","Something went wrong. Farmer Id is not found ");

		}
		else{
			
			
			
			farmer_data =  data.farmer;
			
			$("#farmer_name_input").val(farmer_data.name);			
			$("#farmer_surname_input").val(farmer_data.surname);			
			$("#farmer_phone_input").val(farmer_data.phone);			
			$("#home_address_input").val(farmer_data.home_address);			
			$("#home_pincode_input").val(farmer_data.home_pincode);
			
			$("#aadhar_card_input").val(farmer_data.aadhar_card);
			$("#pan_card_input").val(farmer_data.pan_card);
			
			
			
			

			
			
			
			$("#loan_amount_input").val(farmer_data.loan_amount);
			$("#bank_name_input").val(farmer_data.bank_name);
			
			
			
			
			
			
			if (farmer_data.farm_list.length>0){
				
				for (var i = 0; i<farmer_data.farm_list.length; i++){
					
					
					farm_index_list.push(parseInt ( farmer_data.farm_list[i].farm_index) ); 

					add_farm_detail_with_data(farmer_data.farm_list[i], false);

					
										
					if (i+1==farmer_data.farm_list.length){
						
					
						setTimeout(function(){
							
							$("#farm_tab_nav").find(".nav-link:last")[0].click();
						
						}, 400);

					}
					
					
					
				}
				
			}
			
			
			
			
			if (farmer_data.relative_list.length>0){
			
				for (var i = 0; i<farmer_data.relative_list.length; i++){
					
					add_relative(farmer_data.relative_list[i]);
					
					if (i+1==farmer_data.relative_list.length){
					
						ini_add_relative();
		
					}
					
				}
				
				
				
				
			};
			
			
				
			
			if (farmer_data.vendor_payment_list.length>0){
			
				for (var i = 0; i<farmer_data.vendor_payment_list.length; i++){
					
					payment_index_list.push(parseInt ( farmer_data.vendor_payment_list[i].payment_index) ); 
					
					add_payment_detail_with_data(farmer_data.vendor_payment_list[i],false);
					
					
					if (i+1==farmer_data.vendor_payment_list.length){
						
					
						setTimeout(function(){
							
							$("#payment_tab_nav").find(".nav-link:last")[0].click();
						
						}, 400);

					}
					
					
					
				}
				
				
			};
			
			
				

			
			
	
			set_upload_event("#aadhar_card_upload_input",
						"farmer/"+farmer_id+"/aadhar_card/", farmer_id);
	
		
			
			if (farmer_data.aadhar_card_file_list.length>0){
			
				for (var i = 0; i<farmer_data.aadhar_card_file_list.length; i++){
					
					add_aadhar_card_file_list(farmer_data.aadhar_card_file_list[i]);
					
				}
				
				
			};
			
			
			
	
			set_upload_event("#pan_card_upload_input",
						"farmer/"+farmer_id+"/pan_card/", farmer_id);
	
		
			
			
			if (farmer_data.pan_card_file_list.length>0){
			
				for (var i = 0; i<farmer_data.pan_card_file_list.length; i++){
					
					add_pan_card_file_list(farmer_data.pan_card_file_list[i]);
					
				}
				
				
			};
			
			
			set_upload_event("#address_proof_upload_input",
					"farmer/"+farmer_id+"/address_proof/", farmer_id);
	
		
	
			
			
			if (farmer_data.address_proof_file_list.length>0){
			
				for (var i = 0; i<farmer_data.address_proof_file_list.length; i++){
					
					add_address_proof_file_list(farmer_data.address_proof_file_list[i]);
					
				}
				
				
			};
			
			
	
			

		}
	
	}); 
	
	
	
	
	$("#farmer_id_input").val(primary_id);
	
	
	
	$(".update_btn").click(function(){
		
		update_btn_click();

		
	});
	
	
	
	
	
	
	
	$("#add_farm_btn").click(function(){
		
		add_farm_detail($(this));
		
	});
	
	
	
	
	
	
	$("#add_payment_btn").click(function(){
		
		add_payment_detail($(this));
		
	});
	
	
	
	
	
	
}









function add_farm_detail(add_farm_btn)
{
	
	
	
	[_farm_index, farm_index_list] =  get_index_list(farm_index_list);
	
	
	
	var farm_data = {
						id : random_string(32),
						
						farmer_id: farmer_id,
						
						farm_index: _farm_index,
						
						farm_area : "",
						
						irrigation_type : "not_selected",

						seeds_used: "",
						fertilizer: "",
						insecticides: "",
						weather_predictions_source : "",					
						market_information_source : "",
						
						weather_predictions_useful : "not_selected",
						market_information_useful : "not_selected",

						farm_address : "",
						farm_pincode : "",
						
								
					};
						
	


	
	
	
	
	add_farm_detail_with_data(farm_data, true);
	
	
	setTimeout(function(){
		
			$("#farm"+_farm_index+"-tab")[0].click();
		
		}, 
		200)
	
	
}









function add_farm_detail_with_data(farm_data, newly_created)
{
	
	
	
	_farm_index = parseInt( farm_data.farm_index ) ;
	



	console.log(_farm_index);

	
	
	var farm_html = 
	'<div class="row">'+
	'	<div class="col">'+
	'   <button class="btn btn-danger btn-sm btn-icon-split float-right rounded-pill delete_farm_btn" type="button"  >  '  + 
	'     '  + 
	'   	<span class="icon text-white-50 rounded-circle">  '  + 
	'   		<i class="fas fa-trash"></i>  '  + 
	'   	</span>  '  + 
	'   	<span class="text">Delete Farm '+_farm_index+'</span>  '  + 
	'     '  + 
	'   </button>  ' +
	'	</div>'+
	'</div>'+	
	'<div class="row">'+
	'	<div class="col-6">'+
	'	'+
	'		<div class="form-group mb-4">'+
	'			<label for="farm_area_input'+_farm_index+'">Area of Farm (in acres)</label> '+
	'			<input id="farm_area_input'+_farm_index+'" class="form-control area_input"  type="text" placeholder="">'+
	'		</div>'+
	'	'+
	'	</div>'+
	'	<div class="col-6">'+
	'	'+
	'		<div class="form-group">'+
	'        	<label for="selection_irrigation'+_farm_index+'">Select Irrigation </label>'+
	'        	<select class="form-control" id="selection_irrigation'+_farm_index+'">'+
	'	            <option data-opt = "not_selected">Not Selected</option>											            '+
	'	            <option data-opt = "canal">Canal</option>'+
	'	            <option data-opt = "drip">Drip</option>'+
	'	            <option data-opt = "sprinkler">Sprinkler</option>											            '+
	'	        </select>'+
	'    	</div>'+
	'	'+
	'	</div>'+
	'</div>'+
	'<div class="row">'+
	'	<div class="col-4">'+
	'		<div class="form-group mb-4">'+
	'			<label for="seeds_used_input">Used seeds</label> '+
	'			<input class="form-control " id="seeds_used_input'+_farm_index+'" type="text" placeholder="">'+
	'		</div>'+
	'		'+
	'	</div>'+
	'	'+
	'	<div class="col-4">'+
	'	'+
	'		<div class="form-group mb-4">'+
	'			<label for="fertilizer_input'+_farm_index+'">Fertilizer</label> '+
	'			<input class="form-control " id="fertilizer_input'+_farm_index+'" type="text" placeholder="">'+
	'		</div>'+
	'	</div>'+
	'	'+
	'	<div class="col-4">	'+
	'		<div class="form-group mb-4">'+
	'			<label for="insecticides_input'+_farm_index+'">Insecticides</label> '+
	'			<input class="form-control " id="insecticides_input'+_farm_index+'" type="text" placeholder="">'+
	'		</div>'+
	'	</div>'+
	''+
	'</div>'+
	


	'<div class="row mb-3">'+
	'	<div class="col-10">'+
	''+
	'		<div class="form-group mb-4">'+
	'			<label for="weather_predictions_source_input'+_farm_index+'">Weather predictions source</label> '+
	'			<input class="form-control " id="weather_predictions_source_input'+_farm_index+'" type="text" placeholder="">'+
	'		</div>'+
	''+
	'	</div>'+
	''+
	'	<div class="col-2">'+
	''+
	'		<div class="form-group">'+
	'			<label for="weather_predictions_useful_select'+_farm_index+'">Is it useful?</label>'+
	'			<select class="form-control" id="weather_predictions_useful_select'+_farm_index+'">'+
	'	            <option data-opt = "not_selected">Not Selected</option>											            													'+
	'				<option  data-opt = "yes" >Yes</option>'+
	'				<option  data-opt = "no">No</option>'+
	'				<option  data-opt = "sometime">Sometime</option>'+
	'				'+
	'			</select>'+
	'		</div>'+
	''+
	'	</div>'+
	''+
	'</div>'+
	''+
	''+
	'<div class="row ">'+
	'	<div class="col-10">'+
	''+
	'		<div class="form-group mb-4">'+
	'			<label for="market_information_source_input'+_farm_index+'">Market information source</label> '+
	'			<input class="form-control " id="market_information_source_input'+_farm_index+'" type="text" placeholder="">'+
	'		</div>'+
	''+
	'	</div>'+
	''+
	'	<div class="col-2">'+
	''+
	'		<div class="form-group">'+
	'			<label for="market_information_useful_select'+_farm_index+'">Is it useful?</label>'+
	'			<select class="form-control" id="market_information_useful_select'+_farm_index+'">'+
	'				<option data-opt = "not_selected" >Not Selected</option>'+
	'				<option  data-opt = "yes">Yes</option>'+
	'				<option  data-opt = "no">No</option>'+
	'				<option  data-opt = "sometime">Sometime</option>														'+
	'			</select>'+
	'		</div>'+
	''+
	'	</div>'+
	''+
	'</div>'+ 
	'   <div class="row ">  '  + 
	 '   	<div class="col-9">  '  + 
	 '     '  + 
	 '   		<div class="form-group ">  '  + 
	 '   			<label for="farm_address_input'+_farm_index+'">Farm address</label>  '  + 
	 '   			<textarea class="form-control" id="farm_address_input'+_farm_index+'" rows="3"></textarea>  '  + 
	 '   		</div>  '  + 
	 '   	</div>  '  + 
	 '   	  '  + 
	 '   	<div class="col-3">  '  + 
	 '   		<div class="form-group mb-4">  '  + 
	 '   			<label for="farm_pincode_input'+_farm_index+'">Farm pincode</label>   '  + 
	 '   			<input class="form-control " id="farm_pincode_input'+_farm_index+'" type="text" placeholder="">  '  + 
	 '   		</div>  '  + 
	 '   	</div>  '  + 
	 '  </div>  ' ; 





	
	
	
	$('<li class="nav-item mr-1" role="presentation">'  + 
		'<a class="nav-link " id="farm'+_farm_index+'-tab" data-toggle="tab" href="#farm'+_farm_index+'" role="tab" aria-controls="farm'+_farm_index+'" aria-selected="false">Farm '+_farm_index +'</a>'  + 
	'</li>')
		.appendTo("#farm_tab_nav");
	
	

	
	var tabpanel = $('<div class="tab-pane fade  " id="farm'+_farm_index+'" '+ 
							'data-farm_id='+farm_data.id+' data-newly_created='+newly_created+' data-farm_index='+_farm_index+' '+  
							'role="tabpanel" aria-labelledby="farm'+_farm_index+'-tab">'+
					'</div>')
						.appendTo("#farm_tab_content");
						
					

	tabpanel.html(farm_html);
	


	
	$("#farm"+_farm_index+" .delete_farm_btn").click(function(){
		
		delete_farm_btn_click($(this));
		
	});
	


	
	
	
	$("#farm_area_input"+_farm_index).val(farm_data.farm_area);
	
	
	$('#selection_irrigation'+_farm_index+' option[data-opt='+farm_data.irrigation_type+']').attr('selected', 'true');
	
	
	
	
	$("#seeds_used_input"+_farm_index).val(farm_data.seeds_used);
	
	$("#fertilizer_input"+_farm_index).val(farm_data.fertilizer);
	
	$("#insecticides_input"+_farm_index).val(farm_data.insecticides);
	
	
	
	
	$("#weather_predictions_source_input"+_farm_index).val(farm_data.weather_predictions_source);
	
	$("#market_information_source_input"+_farm_index).val(farm_data.market_information_source);
	
	
	
	$("#weather_predictions_useful_select"+_farm_index + " option[data-opt="+farm_data.weather_predictions_useful+"]").attr('selected', 'true');
	
	$("#market_information_useful_select"+_farm_index + " option[data-opt="+farm_data.market_information_useful+"]").attr('selected', 'true');
	
	

	
	$("#farm_address_input"+_farm_index).val(farm_data.farm_address);
	
	$("#farm_pincode_input"+_farm_index).val(farm_data.farm_pincode);






}










function delete_farm_btn_click(delete_farm_btn)
{
	
	
	
	var deleted_tab_pane = $(delete_farm_btn).closest(".tab-pane");

	console.log(deleted_tab_pane);
	
	console.log(deleted_tab_pane.data("newly_created"));
	
	
	

	var nav_item_a_id = "#"+deleted_tab_pane.attr("aria-labelledby");
	
	$(nav_item_a_id).parent().remove();

	var current_farm_index =  parseInt( deleted_tab_pane.attr("data-farm_index")) ;
		
	farm_index_list.splice(farm_index_list.indexOf( current_farm_index ), 1);

	if (!deleted_tab_pane.data("newly_created")){
		
		deleted_farm_id_list.push ( deleted_tab_pane.attr("data-farm_id") );
		
	}



	deleted_tab_pane.remove();
	
	
	
	if ($("#farm_tab_nav").find(".nav-link:first").length>0){
		
		$("#farm_tab_nav").find(".nav-link:first")[0].click();
			
	};




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

	
	var upload_input_id = "#address_proof_upload_input";

	
	var upload_full_path = "farmer/"+farmer_id+"/address_proof/"+file_name;


	
	var file_elem = 		
					$(  
						'<div data-file_name='+file_name+' class="d-flex mb-2 align-items-center uploaded_file_name">'+	
						'	<div class="float-left w-100">'+									
						'		<a class="d-flex align-items-center" href="user/api/file/download/?i='+farmer_id+'&f='+upload_full_path+'" download="'+file_name+'">'+
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

	
	var upload_full_path = "farmer/"+farmer_id+"/pan_card/"+file_name;

	
	
	var file_elem = 		
					$(  
						'<div data-file_name='+file_name+' class="d-flex mb-2 align-items-center uploaded_file_name">'+	
						'	<div class="float-left w-100">'+									
						'		<a class="d-flex align-items-center" href="user/api/file/download/?i='+farmer_id+'&f='+upload_full_path+'" download="'+file_name+'">'+
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
	
	var upload_full_path = "farmer/"+farmer_id+"/aadhar_card/"+file_name;

	
	
	
	var file_elem = 		
					$(  
						'<div  class="d-flex mb-2 align-items-center uploaded_file_name">'+	
						'	<div class="float-left w-100">'+									
						'		<a class="d-flex align-items-center" href="user/api/file/download/?i='+farmer_id+'&f='+upload_full_path+'" download="'+file_name+'">'+
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



















function add_relative(relative_elem)
{
	
	console.log(relative_elem);
	
	
	
	
	
	var html = '';

	html += '<div id="relative_list_'+ random_string(3) +'" class="relative_list card pt-2 pl-2 mb-2 current_relative" data-id='+relative_elem.id+'>';

	html += '	<div class="row"> ';
	html += '		<div class="col-4">';

	html += '			<div class="form-group">';
	html += '		    	<label for="relative_name_input" class=" font-weight-bolder text-black-75 small ">Name of relative</label>';
	html += '		    	<input class="form-control "  id="relative_name_input" type="text" placeholder="" value= "'+relative_elem.name+'">';
	html += '	    	</div>';

	html += '		</div>';
	html += '		<div class="col-3">';

	html += '			<div class="form-group">';
	html += '		    	<label for="relative_relation_input" class=" font-weight-bolder text-black-75 small ">Relation</label>';
	html += '		    	<input class="form-control " id="relative_relation_input" type="text" placeholder="" value="'+relative_elem.relation+'" >';
	html += '	    	</div>';

	html += '		</div>';

	html += '		<div class="col-1">';

	html += '			<div class="form-group">';
	html += '		    	<label for="relative_age_input" class=" font-weight-bolder text-black-75 small ">Age</label>';
	html += '		    	<input class="form-control "  id="relative_age_input"  type="text" placeholder="" value="'+relative_elem.age+'">';
	html += '	    	</div>';

	html += '		</div>';

	html += '		<div class="col-3 ">';

	html += '    		<div class="">';
	html += '    			<div class="form-group  ">';
	html += '			    	<label for="relative_education_input" class=" font-weight-bolder text-black-75 small ">Education</label>';
	html += '			    	<input class="form-control "  id="relative_education_input"   type="text" placeholder="" value="'+relative_elem.education+'">';
	html += '		    	</div>';

	html += '            </div>';

	html += '		</div>';

	html += '		<div class="col-1 ">';
	html += '			<div class="form-group py-2">';
	html += '				<label for="removeRow "></label>';

	html += '                <button id="removeRow" type="button" class="btn btn-danger btn-md mt-4 shadow-sm btn-icon btn-circle">';
	html += '                	<i class="fa fa-trash" aria-hidden="true"></i>';
	html += '                </button>';

	html += '            </div>';
	html += '		</div>';

	html += '	</div>';

	html += '</div>';

	$('#new_relative_row').append(html);
	
}













function ini_add_relative()
{
	

	$("#addRow")
			.click(
					function() {
						var html = '';

						html += '<div id="relative_list_'+ random_string(3) +'" class="relative_list card pt-2 pl-2 mb-2 new_relative"  data-id='+ random_string(32)+'>';

						html += '	<div class="row"> ';
						html += '		<div class="col-4">';

						html += '				<div class="form-group">';
						html += '		    	<label for="relative_name_input" class=" font-weight-bolder text-black-75 small ">Name of relative</label>';
						html += '		    	<input class="form-control "  id="relative_name_input" type="text" placeholder="">';
						html += '	    	</div>';

						html += '		</div>';
						html += '		<div class="col-3">';

						html += '				<div class="form-group">';
						html += '		    	<label for="relative_relation_input" class=" font-weight-bolder text-black-75 small ">Relation</label>';
						html += '		    	<input class="form-control " id="relative_relation_input" type="text" placeholder="">';
						html += '	    	</div>';

						html += '		</div>';

						html += '		<div class="col-1">';

						html += '				<div class="form-group">';
						html += '		    	<label for="relative_age_input" class=" font-weight-bolder text-black-75 small ">Age</label>';
						html += '		    	<input class="form-control "  id="relative_age_input"  type="text" placeholder="">';
						html += '	    	</div>';

						html += '		</div>';

						html += '		<div class="col-3 ">';

						html += '    		<div class="">';
						html += '    			<div class="form-group  ">';
						html += '			    	<label for="relative_education_input" class=" font-weight-bolder text-black-75 small ">Education</label>';
						html += '			    	<input class="form-control "  id="relative_education_input"   type="text" placeholder="">';
						html += '		    	</div>';

						html += '            </div>';

						html += '		</div>';

						html += '		<div class="col-1 ">';
						html += '			<div class="form-group py-2">';
						html += '				<label for="removeRow "></label>';

						html += '                <button id="removeRow" type="button" class="btn btn-danger btn-md mt-4 shadow-sm btn-icon btn-circle">';
						html += '                	<i class="fa fa-trash" aria-hidden="true"></i>';
						html += '                </button>';

						html += '            </div>';
						html += '		</div>';

						html += '	</div>';

//						html += '</div>';

						$('#new_relative_row').append(html);
					});

	// remove row
	$(document).on('click', '#removeRow', function() {
		
		
		console.log($(this).closest(".relative_list"));
				
		console.log($(this).closest(".relative_list").data());
		
		
		if (typeof $(this).closest(".relative_list").data().id != "undefined"){
			
			deleted_relative_list.push($(this).closest(".relative_list").data().id);
				
		}
		
		
		$(this).closest('.relative_list').remove();

		
	});


}




function update_btn_click1()
{
	
	
	Promise.all([upload_files_sequentially(), delete_files_sequentially()])
			.then(function ([data]){ 
		
		
		
		
		
	});
	
	
	
	
//	var extracted_file_list = extract_uploaded_file_names("#aadhar_card_upload_input");
	
//	console.log(extracted_file_list);
	
}






function update_btn_click()
{
	
//	console.log("update_btn_click");
	
	
	
	
	
	$(".update_btn span i").attr("class", "spinner-border spinner-border-sm d-flex mt-1");

	
	var promises = [];


		
	promises.push(validate_name("#farmer_name_input",true));
	promises.push(validate_name("#farmer_surname_input",true));
	promises.push(validate_phone("#farmer_phone_input",true));
		
	
		
		
	if ($("#home_address_input").val().length>0){
		
		
//		console.log("#home_address_input");
		
		promises.push( validate_text("#home_address_input",false) );

	}
	
	
	if ($("#home_pincode_input").val().length>0){
		
//		console.log("#home_pincode_input");

		promises.push( validate_pincode("#home_pincode_input",false) );

	}
	


	if ($("#aadhar_card_input").val().length>0){
		
//		console.log("#aadhar_card_input");

		promises.push( validate_text("#aadhar_card_input",false) );
		
	}
	
	if ($("#pan_card_input").val().length>0){
		
//		console.log("#pan_card_input");
		
		promises.push( validate_text("#pan_card_input",false) );
		
	}
	
	
	
	
	/* ------------------------------------ */	

	
	

	if ($("#loan_amount_input").val().length>0){
		
//		console.log("#loan_amount_input");
		
		promises.push( validate_number("#loan_amount_input",false) );
		
	}
	

	
	if ($("#bank_name_input").val().length>0){
		
//		console.log("#bank_name_input");
		
		promises.push( validate_text("#bank_name_input",false) );
		
	}
	
			
	
	
	irrigation_type = $('#selection_irrigation').find(":selected").data("opt");

	weather_predictions_useful = $('#weather_predictions_useful_input').find(":selected").data("opt");

	market_information_useful = $('#market_information_useful_input').find(":selected").data("opt");
	
	

	


	
	var relative_row_list = $(".relative_list .row");
	
	
	for (i=0; i<relative_row_list.length; i++){
		
		
		var relative_elem_id = $(relative_row_list[i]).parent().attr("id");
		
		
		promises.push( validate_name("#"+relative_elem_id +" #relative_name_input",false) );
		
		promises.push( validate_name("#"+relative_elem_id +" #relative_relation_input",false) );
		
		promises.push( validate_age("#"+relative_elem_id +" #relative_age_input",false) );
		
		promises.push( validate_name("#"+relative_elem_id +" #relative_education_input",false) );
		 
		
		
	}
						
				


	
	$("#farm_tab_content .tab-pane").each((i,tab_pane)=>{
		
		
		$(tab_pane).find("input").each((j,d)=>{
			
			
			if ($(d).val().length>0){
				
				
				
				
				if ($(d).hasClass("area_input")){
					
					console.log($(d).attr("id"));
					
					promises.push( validate_number("#"+$(d).attr("id") ,false) );

					
				}
				else{
					
					console.log($(d).attr("id"));
					promises.push( validate_text("#"+$(d).attr("id") ,false) );

				}
				
				
			};
			
			
		});
		
		
	});
	
		
		
		
		
	
	
	
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
	
	
	
	
	
	
	
	
		
	

	
		
//	console.log(promises);
	
	
		
	
	Promise
		.all(promises)
        .then((data) => {
	
			console.log(data);
			
			for (var i=1; i< data.length; i++){
				
				if (!data[i][0]){
				
					console.log("error in validation exited on = "+data[i][2]);
					
					
					if (typeof $(data[i][2]).closest(".tab-pane").attr("aria-labelledby")!="undefined"){
						
						$("#"+ $(data[i][2]).closest(".tab-pane").attr("aria-labelledby") )[0].click();
							
					}
					
					$(".update_btn i").attr("class","fas fa-exclamation ");

					
					return;
				}
				
				
				
				if(i+1==data.length){
					
					
					name = $("#farmer_name_input").val().replace(/\s\s+/g, ' ').trim();
					
					surname = $("#farmer_surname_input").val().replace(/\s\s+/g, ' ').trim();
					
					phone = $("#farmer_phone_input").val();
					
					
					/* ------------------------------------ */	

					home_address = $("#home_address_input").val().replace(/\s\s+/g, ' ').trim();
					home_pincode = $("#home_pincode_input").val();
					
					
					aadhar_card = $("#aadhar_card_input").val().replace(/\s\s+/g, ' ').trim();
					pan_card = $("#pan_card_input").val().replace(/\s\s+/g, ' ').trim();
					
		
					
					loan_amount = $("#loan_amount_input").val();
					bank_name = $("#bank_name_input").val().replace(/\s\s+/g, ' ').trim();
					


					/* ------------------------------------ */	
				
					
					
					
					var relative_row_list = $(".relative_list .row");
					
					relative_list_json = [];
					
					
					
					for (var j=0; j<relative_row_list.length; j++){
						
				
						
						console.log($(relative_row_list[j]).parent().attr("id"));
	
						console.log($(relative_row_list[j]).parent().data().id);
						
						
						var relative_elem = {
								id : $(relative_row_list[j]).parent().data().id,
								farmer_id: farmer_id,
								name : $(relative_row_list[j]).find("#relative_name_input").val(),
								relation: $(relative_row_list[j]).find("#relative_relation_input").val(),
								age: $(relative_row_list[j]).find("#relative_age_input").val(),
								education: $(relative_row_list[j]).find("#relative_education_input").val(),
								
						};
						
						console.log(relative_elem);
						
						relative_list_json.push(relative_elem);
						
						
					}
					
					
					
					

					/* ------------------------------------ */	
				
					
					
					
					
					
										
					var farm_tab_pane_list = $("#farm_tab_content .tab-pane");
					
					farm_list_json = [];
					
					
					for (var j=0; j<farm_tab_pane_list.length; j++){
						
						
						console.log(farm_tab_pane_list[j]);
						console.log($(farm_tab_pane_list[j]));
						
						var farm_tab_pane = $(farm_tab_pane_list[j]);
						
						
						console.log(farm_tab_pane.attr("data-farm_index"));
						
						var _farm_index=farm_tab_pane.attr("data-farm_index");
						
						console.log("_farm_index = "+_farm_index);
						
						
						
						var farm_elem = {
								id : farm_tab_pane.attr("data-farm_id"),
								farmer_id: farmer_id,
								farm_index: _farm_index,
								farm_area : $("#farm_area_input"+_farm_index).val(),
								
								irrigation_type : $('#selection_irrigation'+_farm_index).find(":selected").data("opt"),

								seeds_used: $("#seeds_used_input"+_farm_index).val().replace(/\s\s+/g, ' ').trim(),
								fertilizer: $("#fertilizer_input"+_farm_index).val().replace(/\s\s+/g, ' ').trim(),
								insecticides: $("#insecticides_input"+_farm_index).val().replace(/\s\s+/g, ' ').trim(),
								weather_predictions_source : $("#weather_predictions_source_input"+_farm_index).val().replace(/\s\s+/g, ' ').trim(),					
								market_information_source : $("#market_information_source_input"+_farm_index).val().replace(/\s\s+/g, ' ').trim(),
								
								weather_predictions_useful : $("#weather_predictions_useful_select"+_farm_index).find(":selected").data("opt"),
								market_information_useful : $("#market_information_useful_select"+_farm_index).find(":selected").data("opt"),

								farm_address : $("#farm_address_input"+_farm_index).val().replace(/\s\s+/g, ' ').trim(),
								farm_pincode : $("#farm_pincode_input"+_farm_index).val(),
								
								
						};
						
						
						farm_list_json.push(farm_elem);
						
							
					}
					
					console.log(farm_list_json);
					
					console.log(deleted_farm_id_list);

					
					
					
					
					
					
					
					
					
					
					
					

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
						
							

								Promise.all([update_farmer()]).then(function ([data]){
									
									
									console.log("completed");
									
									console.log(data);
									
									if (data.message=="error"){
										
								    	setTimeout(function(){ $(".update_btn span i").attr("class", "fas fa-exclamation"); }, 1000);
						
									}
									else{
										
										$(".update_btn span i").attr("class", "fas fa-check");
										
										window.location = "user/view/farmer?i="+farmer_id;
		
									}
								
								}); 
					
					
					
						
					});
	


				
					


	
					
					
				}
				
				
				
				
				
			}
			
			
		});


}





























function update_farmer()
{
    var deferred = new $.Deferred();
    
        
    var data = {'message':'error'};
    

	var payload = 
	{ 
	    	
	    	"id" : farmer_id,
	    	"name":  name,
	    	"surname":  surname,
	    	"phone":phone,
	    	"home_address":home_address,
	    	"home_pincode":home_pincode,
	    	
	    	"aadhar_card":aadhar_card,
			"aadhar_card_file_list": extract_upload_file_names("#aadhar_card_upload_input"),


	    	"pan_card":pan_card,	
			"pan_card_file_list": extract_upload_file_names("#pan_card_upload_input"),

			"address_proof_file_list": extract_upload_file_names("#address_proof_upload_input"),

    	

	    	"relative_list":relative_list_json,
			"deleted_relative_list" : deleted_relative_list,

			"farm_list" :farm_list_json,
			
			"deleted_farm_list" :deleted_farm_id_list,
	    	
	    	
	    	"loan_amount":loan_amount,
	    	"bank_name":bank_name,
	    	

			"vendor_payment_list" :  vendor_payment_list_json  ,
			"deleted_vendor_payment_list": deleted_payment_id_list,
			
	    }


	$.ajax({
		type: "POST",
	    url: "user/api/farmer/update",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify(payload
		),	    
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















function get_farmer_by_id()
{
    var deferred = new $.Deferred();
    
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/farmer/get/by/id",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : primary_id,
	    	
			
	    }),	    
	    success: function(data)
	    {
	    	
//	    	console.log(data);
	    	
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





