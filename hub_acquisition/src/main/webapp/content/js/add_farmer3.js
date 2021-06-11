

		



var farmer_id = "";

var name = "";
var surname = "";
var phone = "";
var home_address = "";
var home_pincode = "";


var relative_list_json=[];
var deleted_relative_list=[];





var aadhar_card = "";
var aadhar_card_file_list=[];
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











var num_of_farm = 0;

//var farm_index_list = Array.from(Array(10), (_,x) => x);


var farm_index_list = [];

var deleted_farm_id_list = [];




var vendor_payment_list_json = [];









function init_add_farmer()
{
	
	
	console.log("init_add_farmer");

	
	farmer_id = create_primary_id();
	$("#farmer_id_input").val(farmer_id);
	
	
	ini_add_relative();
	
	
	
	$(".add_save").click(function(){
		
		save_btn_click();
		
	});
	
	
	
	
	
	$("#add_farm_btn").click(function(){
		
		add_farm_detail($(this));
		
	});
	
	
	
	
	set_upload_event("#aadhar_card_upload_input",
						"farmer/"+farmer_id+"/aadhar_card/", farmer_id);
	
		
	
	
	
	set_upload_event("#pan_card_upload_input",
						"farmer/"+farmer_id+"/pan_card/", farmer_id);
	
		
		
	
	
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
		
		$("#farm_tab").find(".nav-link:first")[0].click();
			
	};
	
	
	
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




function save_btn_click()
{
	
	console.log("save_btn_click");
	
	$(".add_save span i").attr("class", "spinner-border spinner-border-sm d-flex mt-1");

	
	var promises = [];


		
	promises.push(validate_name("#farmer_name_input",true));
	promises.push(validate_name("#farmer_surname_input",true));
	promises.push(validate_phone("#farmer_phone_input",true));
		
	
		
		
	if ($("#home_address_input").val().length>0){
		
		promises.push( validate_text("#home_address_input",false) );

	}
	
	
	if ($("#home_pincode_input").val().length>0){
		
		promises.push( validate_pincode("#home_pincode_input",false) );

	}
	


	if ($("#aadhar_card_input").val().length>0){

		promises.push( validate_text("#aadhar_card_input",false) );
		
	}
	
	if ($("#pan_card_input").val().length>0){
		
		promises.push( validate_text("#pan_card_input",false) );
		
	}
	
	
	
	
	/* ------------------------------------ */	

	
	

	if ($("#loan_amount_input").val().length>0){
		
		promises.push( validate_number("#loan_amount_input",false) );
		
	}
	

	
	if ($("#bank_name_input").val().length>0){
		
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
					
					promises.push( validate_number("#"+$(d).attr("id") ,false) );

					
				}
				else{
					
					promises.push( validate_text("#"+$(d).attr("id") ,false) );

				}
				
				
			};
			
			
		});
		
		
	});
	
	
	
	
	console.log(promises)
		
		
		
	
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
					
					$(".add_save i").attr("class","fas fa-exclamation ");
					
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
					
					

	

	
	
				
					payment_bank_name = $("#payment_bank_name_input").val().replace(/\s\s+/g, ' ').trim();
					
					payment_bank_branch_name = $("#payment_bank_branch_name_input").val().replace(/\s\s+/g, ' ').trim();
					
					ifsc_code = $("#ifsc_code_input").val().replace(/\s\s+/g, ' ').trim();
					
					
					account_name = $("#account_name_input").val().replace(/\s\s+/g, ' ').trim();
					
					account_number = $("#account_number_input").val().replace(/\s\s+/g, ' ').trim();
					
					gst_number = $("#gst_number_input").val().replace(/\s\s+/g, ' ').trim();



					/* ------------------------------------ */	
				
					
					
					var relative_row_list = $(".relative_list .row");
					
					relative_list_json = [];
					
					
					
					for (var j=0; j<relative_row_list.length; j++){
						
				
						
						console.log($(relative_row_list[j]).parent().attr("id"));
	
						
						
						var relative_elem = {
								id : random_string(32),
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

								seeds_used: $("#seend_used_input"+_farm_index).val().replace(/\s\s+/g, ' ').trim(),
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
					
					console.log(farm_list_json)
					
					

					var vendor_payment_elem = {
						
						
						id : random_string(32),
						
						type : "farmer",
							
						name : $("#payment_bank_name_input").val().replace(/\s\s+/g, ' ').trim(),
			
						branch_name : $("#payment_bank_branch_name_input").val().replace(/\s\s+/g, ' ').trim(),
			
						ifsc_code : $("#ifsc_code_input").val().replace(/\s\s+/g, ' ').trim(),
			
			
						account_name : $("#account_name_input").val().replace(/\s\s+/g, ' ').trim(),
			
						account_number : $("#account_number_input").val().replace(/\s\s+/g, ' ').trim(),
			
						gst_number : $("#gst_number_input").val().replace(/\s\s+/g, ' ').trim(),

						
						
					}; 
					
					
					vendor_payment_list_json.push(vendor_payment_elem);



					

					
					
					
					
					

					/* ------------------------------------ */	
				
					


					Promise.all([set_farmer()]).then(function ([data]){
						
						
						console.log("completed");
						
						console.log(data);
						
						if (data.message=="error"){
							
					    	setTimeout(function(){ $(".add_save span i").attr("class", "fas fa-exclamation"); }, 1000);
			
						}
						else{
							
							$(".add_save span i").attr("class", "fas fa-check");
							
							setTimeout(function(){
								
								window.location = "user/view/farmer?i="+farmer_id;
			
							}, 1000);
			
						}
					
					}); 
					
					

					
				}
				
				
				
			}
			
			
				
				
			
			 
		});
		
	
	
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
	'			<label for="seend_used_input">Used seeds</label> '+
	'			<input class="form-control " id="seend_used_input'+num_of_farm+'" type="text" placeholder="">'+
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
		
		delete_farm_btn_click($(this));
		
	});
	
	$('[data-bs-toggle="tooltip"]').tooltip();

	

}


































function ini_add_relative()
{
	

	$("#addRow")
			.click(
					function() {
						var html = '';
//						html += '<div id="relative_list">';

						html += '<div id="relative_list_'+ random_string(3) +'" class="relative_list card pt-2 pl-2 mb-2">';

						html += '	<div class="row"> ';
						html += '		<div class="col-4">';

						html += '				<div class="form-group">';
						html += '		    	<label for="product_weight_input" class=" font-weight-bolder text-black-75 small ">Name of relative</label>';
						html += '		    	<input class="form-control "  id="relative_name_input" type="text" placeholder="">';
						html += '	    	</div>';

						html += '		</div>';
						html += '		<div class="col-3">';

						html += '				<div class="form-group">';
						html += '		    	<label for="product_weight_input" class=" font-weight-bolder text-black-75 small ">Relation</label>';
						html += '		    	<input class="form-control " id="relative_relation_input" type="text" placeholder="">';
						html += '	    	</div>';

						html += '		</div>';

						html += '		<div class="col-1">';

						html += '				<div class="form-group">';
						html += '		    	<label for="product_weight_input" class=" font-weight-bolder text-black-75 small ">Age</label>';
						html += '		    	<input class="form-control "  id="relative_age_input"  type="text" placeholder="">';
						html += '	    	</div>';

						html += '		</div>';

						html += '		<div class="col-3 ">';

						html += '    		<div class="">';
						html += '    			<div class="form-group  ">';
						html += '			    	<label for="product_weight_input" class=" font-weight-bolder text-black-75 small ">Education</label>';
						html += '			    	<input class="form-control "  id="relative_education_input"   type="text" placeholder="">';
						html += '		    	</div>';

						html += '            </div>';

						html += '		</div>';

						html += '		<div class="col-1 ">';
						html += '			<div class="form-group py-2">';
						html += '				<label for="product_weight_input "></label>';

						html += '                <button id="removeRow" type="button" class="btn btn-danger btn-md mt-4 shadow-sm btn-icon btn-circle"  data-bs-toggle="tooltip" data-bs-placement="left" title="Permanently delete" >';
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
		$(this).closest('.relative_list').remove();
	});

	$('[data-bs-toggle="tooltip"]').tooltip();
	
	

}























function set_farmer()
{
    var deferred = new $.Deferred();
    
//    MH-02-GG-333
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/farmer/add",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : farmer_id,
	    	"name":  name,
	    	"surname":  surname,
	    	"phone":phone,
	    	"home_address":home_address,
	    	"home_pincode":home_pincode,
	    	
	    	"aadhar_card":aadhar_card,
			"aadhar_card_file_list":extract_uploaded_file_names("#aadhar_card_upload_input"),
			
	    	"pan_card":pan_card,	    	
			"pan_card_file_list":extract_uploaded_file_names("#pan_card_upload_input"),

	    	"relative_list":  relative_list_json  ,
			"deleted_relative_list" : deleted_relative_list,

			"farm_list" :   farm_list_json  ,
	    	

	    	
	    	"loan_amount":loan_amount,
	    	"bank_name":bank_name,


			"vendor_payment_list" :  vendor_payment_list_json  ,
	    	
			
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






