

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

var num_of_farm = 0;

//var farm_index_list = Array.from(Array(10), (_,x) => x);

var farm_index_list = [];

var deleted_farm_id_list = [];







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
					
					add_farm_detail_with_data(farmer_data.farm_list[i]);

					
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
					
					add_vendor_payment(farmer_data.vendor_payment_list[i]);
					
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
						'		<a class="d-flex align-items-center" href="user/api/farmer/download/?i='+farmer_id+'&f='+file_name+'" download="'+file_name+'">'+
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
						'		<a class="d-flex align-items-center" href="user/api/farmer/download/?i='+farmer_id+'&f='+file_name+'" download="'+file_name+'">'+
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
						'		<a class="d-flex align-items-center" href="user/api/farmer/download/?i='+farmer_id+'&f='+file_name+'" download="'+file_name+'">'+
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











function add_vendor_payment(vendor_payment)
{
	
	
	console.log(vendor_payment);
	
	
	
	$(".payment_detail").data("id",vendor_payment.id);
	
	$("#payment_bank_name_input").val(vendor_payment.name);
			
	$("#payment_bank_branch_name_input").val(vendor_payment.branch_name);
			
	$("#ifsc_code_input").val(vendor_payment.ifsc_code);
			
			
	$("#account_name_input").val(vendor_payment.account_name);
			
	$("#account_number_input").val(vendor_payment.account_number);
			
	$("#gst_number_input").val(vendor_payment.gst_number);

	
	
}














function add_farm_detail_with_data(farm_data1)
{
	
	farm_data = farm_data1;
	
	console.log(farm_data);
	
	
	num_of_farm = parseInt( farm_data.farm_index ) ;
	
	
	farm_index_list.push(num_of_farm);
	
	
	
	
	
	
	
	var farm_html = 
	'<div class="row">'+
	'	<div class="col">'+
	'   <button class="btn btn-danger btn-sm btn-icon-split float-right rounded-pill delete_farm_btn" type="button" '+
	' 		data-bs-toggle="tooltip" data-bs-placement="left" title="Permanently delete" >  '  + 
	'     '  + 
	'   	<span class="icon text-white-50 rounded-circle">  '  + 
	'   		<i class="fas fa-trash"></i>  '  + 
	'   	</span>  '  + 
	'   	<span class="text">Delete Farm '+num_of_farm+'</span>  '  + 
	'     '  + 
	'   </button>  ' +
	'	</div>'+
	'</div>'+	
	'<div class="row">'+
	'	<div class="col-6">'+
	'	'+
	'		<div class="form-group mb-4">'+
	'			<label for="farm_area_input'+num_of_farm+'">Area of Farm (in acres)</label> '+
	'			<input id="farm_area_input'+num_of_farm+'" class="form-control area_input"  type="text" placeholder="">'+
	'		</div>'+
	'	'+
	'	</div>'+
	'	<div class="col-6">'+
	'	'+
	'		<div class="form-group">'+
	'        	<label for="selection_irrigation'+num_of_farm+'">Select Irrigation </label>'+
	'        	<select class="form-control" id="selection_irrigation'+num_of_farm+'">'+
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
	'			<input class="form-control " id="seeds_used_input'+num_of_farm+'" type="text" placeholder="">'+
	'		</div>'+
	'		'+
	'	</div>'+
	'	'+
	'	<div class="col-4">'+
	'	'+
	'		<div class="form-group mb-4">'+
	'			<label for="fertilizer_input'+num_of_farm+'">Fertilizer</label> '+
	'			<input class="form-control " id="fertilizer_input'+num_of_farm+'" type="text" placeholder="">'+
	'		</div>'+
	'	</div>'+
	'	'+
	'	<div class="col-4">	'+
	'		<div class="form-group mb-4">'+
	'			<label for="insecticides_input'+num_of_farm+'">Insecticides</label> '+
	'			<input class="form-control " id="insecticides_input'+num_of_farm+'" type="text" placeholder="">'+
	'		</div>'+
	'	</div>'+
	''+
	'</div>'+
	


	'<div class="row mb-3">'+
	'	<div class="col-10">'+
	''+
	'		<div class="form-group mb-4">'+
	'			<label for="weather_predictions_source_input'+num_of_farm+'">Weather predictions source</label> '+
	'			<input class="form-control " id="weather_predictions_source_input'+num_of_farm+'" type="text" placeholder="">'+
	'		</div>'+
	''+
	'	</div>'+
	''+
	'	<div class="col-2">'+
	''+
	'		<div class="form-group">'+
	'			<label for="weather_predictions_useful_select'+num_of_farm+'">Is it useful?</label>'+
	'			<select class="form-control" id="weather_predictions_useful_select'+num_of_farm+'">'+
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
	'			<label for="market_information_source_input'+num_of_farm+'">Market information source</label> '+
	'			<input class="form-control " id="market_information_source_input'+num_of_farm+'" type="text" placeholder="">'+
	'		</div>'+
	''+
	'	</div>'+
	''+
	'	<div class="col-2">'+
	''+
	'		<div class="form-group">'+
	'			<label for="market_information_useful_select'+num_of_farm+'">Is it useful?</label>'+
	'			<select class="form-control" id="market_information_useful_select'+num_of_farm+'">'+
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
	 '   			<label for="farm_address_input'+num_of_farm+'">Farm address</label>  '  + 
	 '   			<textarea class="form-control" id="farm_address_input'+num_of_farm+'" rows="3"></textarea>  '  + 
	 '   		</div>  '  + 
	 '   	</div>  '  + 
	 '   	  '  + 
	 '   	<div class="col-3">  '  + 
	 '   		<div class="form-group mb-4">  '  + 
	 '   			<label for="farm_pincode_input'+num_of_farm+'">Farm pincode</label>   '  + 
	 '   			<input class="form-control " id="farm_pincode_input'+num_of_farm+'" type="text" placeholder="">  '  + 
	 '   		</div>  '  + 
	 '   	</div>  '  + 
	 '  </div>  ' ; 





	
	

	$(".farm_detail_row .nav-item a").removeClass("active");
	
	$(".farm_detail_row .tab-pane").removeClass("show active");
	
	
	
	
	$('<li class="nav-item mr-1" role="presentation">'  + 
		'<a class="nav-link active" id="farm'+num_of_farm+'-tab" data-bs-toggle="tab" href="#farm'+num_of_farm+'" role="tab" aria-controls="farm'+num_of_farm+'" aria-selected="true">Farm '+num_of_farm +'</a>'  + 
	'</li>').appendTo("#farm_tab");
	
	
	
	var tabpanel = $('<div class="tab-pane fade show active" id="farm'+num_of_farm+'" '+  
						'data-farm_id='+farm_data.id+' data-new_farm=false data-farm_index='+farm_data.farm_index+' '+  
						'role="tabpanel" aria-labelledby="farm'+num_of_farm+'-tab"></div>')
						.appendTo("#farm_tab_content");
						

	tabpanel.html(farm_html);
	


	
	$("#farm"+num_of_farm+" .delete_farm_btn").click(function(){
		
		delete_farm_btn_click($(this));
		
	});
	
	$('[data-bs-toggle="tooltip"]').tooltip();

	
	
	
	$("#farm_area_input"+num_of_farm).val(farm_data.farm_area);
	
	
	$('#selection_irrigation'+num_of_farm+' option[data-opt='+farm_data.irrigation_type+']').attr('selected', 'true');
	
	
	
	
	$("#seeds_used_input"+num_of_farm).val(farm_data.seeds_used);
	
	$("#fertilizer_input"+num_of_farm).val(farm_data.fertilizer);
	
	$("#insecticides_input"+num_of_farm).val(farm_data.insecticides);
	
	
	
	
	$("#weather_predictions_source_input"+num_of_farm).val(farm_data.weather_predictions_source);
	
	$("#market_information_source_input"+num_of_farm).val(farm_data.market_information_source);
	
	
	
	$("#weather_predictions_useful_select"+num_of_farm + " option[data-opt="+farm_data.weather_predictions_useful+"]").attr('selected', 'true');
	
	$("#market_information_useful_select"+num_of_farm + " option[data-opt="+farm_data.market_information_useful+"]").attr('selected', 'true');
	
	

	
	$("#farm_address_input"+num_of_farm).val(farm_data.farm_address);
	
	$("#farm_pincode_input"+num_of_farm).val(farm_data.farm_pincode);



}










function add_farm_detail()
{
	
	console.log("update_farm_detail");
	
	
	num_of_farm = find_next_index();
	
	
	
	
	
	
	
	var farm_html = 
	'<div class="row">'+
	'	<div class="col">'+
	'   <button class="btn btn-danger btn-sm btn-icon-split float-right rounded-pill delete_farm_btn" type="button" '+
	' 		data-bs-toggle="tooltip" data-bs-placement="left" title="Permanently delete" >  '  + 
	'     '  + 
	'   	<span class="icon text-white-50 rounded-circle">  '  + 
	'   		<i class="fas fa-trash"></i>  '  + 
	'   	</span>  '  + 
	'   	<span class="text">Delete Farm '+num_of_farm+'</span>  '  + 
	'     '  + 
	'   </button>  ' +
	'	</div>'+
	'</div>'+	
	'<div class="row">'+
	'	<div class="col-6">'+
	'	'+
	'		<div class="form-group mb-4">'+
	'			<label for="farm_area_input'+num_of_farm+'">Area of Farm (in acres)</label> '+
	'			<input id="farm_area_input'+num_of_farm+'" class="form-control area_input"  type="text" placeholder="">'+
	'		</div>'+
	'	'+
	'	</div>'+
	'	<div class="col-6">'+
	'	'+
	'		<div class="form-group">'+
	'        	<label for="selection_irrigation'+num_of_farm+'">Select Irrigation </label>'+
	'        	<select class="form-control" id="selection_irrigation'+num_of_farm+'">'+
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
	'			<input class="form-control " id="seeds_used_input'+num_of_farm+'" type="text" placeholder="">'+
	'		</div>'+
	'		'+
	'	</div>'+
	'	'+
	'	<div class="col-4">'+
	'	'+
	'		<div class="form-group mb-4">'+
	'			<label for="fertilizer_input'+num_of_farm+'">Fertilizer</label> '+
	'			<input class="form-control " id="fertilizer_input'+num_of_farm+'" type="text" placeholder="">'+
	'		</div>'+
	'	</div>'+
	'	'+
	'	<div class="col-4">	'+
	'		<div class="form-group mb-4">'+
	'			<label for="insecticides_input'+num_of_farm+'">Insecticides</label> '+
	'			<input class="form-control " id="insecticides_input'+num_of_farm+'" type="text" placeholder="">'+
	'		</div>'+
	'	</div>'+
	''+
	'</div>'+
	


	'<div class="row mb-3">'+
	'	<div class="col-10">'+
	''+
	'		<div class="form-group mb-4">'+
	'			<label for="weather_predictions_source_input'+num_of_farm+'">Weather predictions source</label> '+
	'			<input class="form-control " id="weather_predictions_source_input'+num_of_farm+'" type="text" placeholder="">'+
	'		</div>'+
	''+
	'	</div>'+
	''+
	'	<div class="col-2">'+
	''+
	'		<div class="form-group">'+
	'			<label for="weather_predictions_useful_input'+num_of_farm+'">Is it useful?</label>'+
	'			<select class="form-control" id="weather_predictions_useful_input'+num_of_farm+'">'+
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
	''+
	''+
	''+
	''+
	'<div class="row ">'+
	'	<div class="col-10">'+
	''+
	'		<div class="form-group mb-4">'+
	'			<label for="market_information_source_input'+num_of_farm+'">Market information source</label> '+
	'			<input class="form-control " id="market_information_source_input'+num_of_farm+'" type="text" placeholder="">'+
	'		</div>'+
	''+
	'	</div>'+
	''+
	'	<div class="col-2">'+
	''+
	'		<div class="form-group">'+
	'			<label for="market_information_useful_input'+num_of_farm+'">Is it useful?</label>'+
	'			<select class="form-control" id="market_information_useful_input'+num_of_farm+'">'+
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
	'   			<label for="farm_address_input'+num_of_farm+'">Farm address</label>  '  + 
	'   			<textarea class="form-control" id="farm_address_input'+num_of_farm+'" rows="3"></textarea>  '  + 
	'   		</div>  '  + 
	'   	</div>  '  + 
	'   	  '  + 
	'   	<div class="col-3">  '  + 
	'   		<div class="form-group mb-4">  '  + 
	'   			<label for="farm_pincode_input'+num_of_farm+'">Farm pincode</label>   '  + 
	'   			<input class="form-control " id="farm_pincode_input'+num_of_farm+'" type="text" placeholder="">  '  + 
	'   		</div>  '  + 
	'   	</div>  '  + 
	'  </div>  ' ; 





	
	

	$(".farm_detail_row .nav-item a").removeClass("active");
	
	$(".farm_detail_row .tab-pane").removeClass("show active");
	
	
	
	
	$('<li class="nav-item mr-1" role="presentation">'  + 
		'<a class="nav-link active" id="farm'+num_of_farm+'-tab" data-bs-toggle="tab" href="#farm'+num_of_farm+'" role="tab" aria-controls="farm'+num_of_farm+'" aria-selected="true">Farm '+num_of_farm +'</a>'  + 
	'</li>').appendTo("#farm_tab");
	
	
	
	var tabpanel = $('<div class="tab-pane fade show active" id="farm'+num_of_farm+'" '+  
	'data-farm_id='+random_string(8)+' data-new_farm=true data-farm_index='+num_of_farm+' '+  
	'role="tabpanel" aria-labelledby="farm'+num_of_farm+'-tab"></div>').appendTo("#farm_tab_content");

	tabpanel.html(farm_html);
	


	
	$("#farm"+num_of_farm+" .delete_farm_btn").click(function(){
		
		
		console.log($(this));
		
		
		delete_farm_btn_click($(this));
		
	});
	
	$('[data-bs-toggle="tooltip"]').tooltip();

	

}

















function delete_farm_btn_click(d)
{
	console.log($(d));
	
	console.log($(d).closest(".tab-pane "));
	
	console.log($(d).closest(".tab-pane ").attr("id"));
	
	console.log($(d).closest(".tab-pane ").attr("aria-labelledby"));
	
	
	
	$("#"+$(d).closest(".tab-pane ").attr("id")).remove();
	
	$("#"+$(d).closest(".tab-pane ").attr("aria-labelledby")).parent().remove();
	

	
	

	console.log( $(d).closest(".tab-pane ").attr("data-farm_index") );
	
	console.log( parseInt( $(d).closest(".tab-pane ").attr("data-farm_index"))  );
	
	var current_farm_index =  parseInt( $(d).closest(".tab-pane ").attr("data-farm_index")) ;
	
	console.log( farm_index_list );
	
	console.log( farm_index_list.indexOf( current_farm_index ) );
	
	
	
	
	farm_index_list.splice(farm_index_list.indexOf( parseInt( $(d).closest(".tab-pane ").attr("data-farm_index")) ), 1);
	
	
	
	
	
	deleted_farm_id_list.push ( $(d).closest(".tab-pane ").attr("data-farm_id") ); 
	
	
	if ($("#farm_tab").find(".nav-link:first").length>0){
		
//		$("#farm_tab").find(".nav-link:first")[0].click();
		
		console.log( $("#farm_tab").find(".nav-link:first") );
		
			
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
	
	
	/* ------------------------------------ */	

	
	if ($("#payment_bank_name_input").val().length>0){
		
		promises.push( validate_text("#payment_bank_name_input",false) );
		
	}
	
	if ($("#payment_bank_branch_name_input").val().length>0){
		
		promises.push( validate_text("#payment_bank_branch_name_input",false) );
		
	}
		
	if ($("#ifsc_code_input").val().length>0){
		
		promises.push( validate_text("#ifsc_code_input",false) );
		
	}

		
	if ($("#account_name_input").val().length>0){
		
		promises.push( validate_text("#account_name_input",false) );
		
	}
			
		
	if ($("#account_number_input").val().length>0){
		
		promises.push( validate_text("#account_number_input",false) );
		
	}
	
			
	if ($("#gst_number_input").val().length>0){
		
		promises.push( validate_text("#gst_number_input",false) );
		
	}
	
	

	
	/* ------------------------------------ */	

		
	
	
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
				
					
					
					
					
					
										
					var farm_tab_pane_list = $(".tab-pane");
					
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
								
								weather_predictions_useful : $("#weather_predictions_useful_input"+_farm_index).find(":selected").data("opt"),
								market_information_useful : $("#market_information_useful_input"+_farm_index).find(":selected").data("opt"),

								farm_address : $("#farm_address_input"+_farm_index).val().replace(/\s\s+/g, ' ').trim(),
								farm_pincode : $("#farm_pincode_input"+_farm_index).val(),
								
								
						};
						
						
						farm_list_json.push(farm_elem);
						
							
					}
					
					console.log(farm_list_json);
					
					console.log(deleted_farm_id_list);

					
					var vendor_payment_elem = {
						
						
						id : $(".payment_detail").data().id,
						
						type : "farmer",
							
						name : $("#payment_bank_name_input").val().replace(/\s\s+/g, ' ').trim(),
			
						branch_name : $("#payment_bank_branch_name_input").val().replace(/\s\s+/g, ' ').trim(),
			
						ifsc_code : $("#ifsc_code_input").val().replace(/\s\s+/g, ' ').trim(),
			
			
						account_name : $("#account_name_input").val().replace(/\s\s+/g, ' ').trim(),
			
						account_number : $("#account_number_input").val().replace(/\s\s+/g, ' ').trim(),
			
						gst_number : $("#gst_number_input").val().replace(/\s\s+/g, ' ').trim(),

						
						
					}; 
					
					
					vendor_payment_list_json.push(vendor_payment_elem);
					
					
					
					
					
					
	
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
								
//								window.location = "user/view/farmer?i="+farmer_id;

				
							}
						
						}); 
					
					
					
						
						
						
					});
	


				
					


	
					
					
				}
				
				
				
				
				
			}
			
			
		});


}






function find_next_index()
{
	selected_index = 1;
	
	
	current_index = 1;
	
	
	
	
	
	for (var i=0; i<farm_index_list.length;i++){
		
		console.log("---");
		console.log("i="+i);
//		console.log(d);
		console.log("current_index="+current_index);
//		console.log("selected_index="+selected_index);
		console.log("farm_index_list.length="+farm_index_list.length);
		
		
		console.log("not found="+(typeof farm_index_list.find(d1=> d1==current_index)=="undefined"));

		
		if (typeof farm_index_list.find(d1=> d1==current_index)=="undefined"){
			
			console.log("adding missing ");
			console.log("current_index 2 = "+current_index);

			farm_index_list.push(current_index);
			
			
			return current_index;

			
		};	
		
		
		current_index = current_index+1;
		
		if (i+1==farm_index_list.length){
			
			
			console.log("end of loop ");
			console.log("current_index 2 = "+current_index);
			
			farm_index_list.push(current_index);

			return current_index;
			
		};
			
		
		
	}
	
	
	
	if (farm_index_list.length==0){
	
		console.log("first one ");
		farm_index_list.push(current_index);

	};
		


	console.log("current_index 3 = "+current_index);

	return current_index;


}













function update_farmer()
{
    var deferred = new $.Deferred();
    
//    MH-02-GG-333
        
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
//			"aadhar_card_file_list":[],


	    	"pan_card":pan_card,	
			"pan_card_file_list": extract_upload_file_names("#pan_card_upload_input"),

			"address_proof_file_list": extract_upload_file_names("#address_proof_upload_input"),

    	

	    	"relative_list":relative_list_json,
			"deleted_relative_list" : deleted_relative_list,

			"farm_list" :farm_list_json,
			
			
			"deleted_farm_id_list" :deleted_farm_id_list,
	    	
	    	
	    	"loan_amount":loan_amount,
	    	"bank_name":bank_name,
	    	

			"vendor_payment_list" :  vendor_payment_list_json  ,

			
	    }

	console.log(payload);

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
    
//    MH-02-GG-333
        
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





