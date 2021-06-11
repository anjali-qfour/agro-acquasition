

saved = false;


var primary_id = "";

var name = "";
var surname = "";
var phone = "";
var home_address = "";
var home_pincode = "";




var aadhar_card = "";
var pan_card = "";
var relative_list_json=[];





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






function init_add_farmer()
{
	
	primary_id = create_primary_id();
	$("#farmer_id_input").val(primary_id);
	
	
	ini_add_relative();
	
	
	
	$(".add_save").click(function(){
		
		
		
		
		save_btn_click();
		
		
		
		
		
	});
	
	$(".farm_detail_row .nav-item a").click(function(){
		
		update_farm_detail($(this));
		
	});
	
	
}








function update_farm_detail(d)
{
	
	console.log("update_farm_detail");
	
	console.log(d);
	console.log($(d));
	
	
	$(".farm_detail_row .nav-item a").removeClass("active");
	
	
	
	$(d).addClass("active");

	
	
	
}








function save_btn_click()
{
	
	console.log("save_btn_click");
	
	
	


	var promises = [];
		
	promises.push(validate_name("#farmer_name_input",false));
	promises.push(validate_name("#farmer_surname_input",false));
	promises.push(validate_phone("#farmer_phone_input",false));
		
		
		
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

	if ($("#farm_area_input").val().length>0){
		
		promises.push( validate_number("#farm_area_input",false) );
		
	}

	irrigation_type = $('#selection_irrigation').find(":selected").data("opt");
	
	
	
	/* ------------------------------------ */	
	
	if ($("#seend_used_input").val().length>0){
		
		promises.push( validate_name("#seend_used_input",false) );
		
	}
	
	
	if ($("#fertilizer_input").val().length>0){
		
		promises.push( validate_name("#fertilizer_input",false) );
		
	}
	
	
	if ($("#insecticides_input").val().length>0){
		
		promises.push( validate_name("#insecticides_input",false) );
		
	}
	
	
	/* ------------------------------------ */	

	if ($("#weather_predictions_source_input").val().length>0){
		
		promises.push( validate_name("#weather_predictions_source_input",false) );
		
	}
	
	weather_predictions_useful = $('#weather_predictions_useful_input').find(":selected").data("opt");

	
	
	if ($("#market_information_source_input").val().length>0){
		
		promises.push( validate_name("#market_information_source_input",false) );
		
	}
	
	market_information_useful = $('#market_information_useful_input').find(":selected").data("opt");

	
	/* ------------------------------------ */	
	
	

	
	if ($("#farm_address_input").val().length>0){
		
		promises.push( validate_name("#farm_address_input",false) );
		
	}
	

	
	if ($("#farm_pincode_input").val().length>0){
		
		promises.push( validate_pincode("#farm_pincode_input",false) );
		
	}
	
	
	
	
	/* ------------------------------------ */	

	
	

	if ($("#loan_amount_input").val().length>0){
		
		promises.push( validate_number("#loan_amount_input",false) );
		
	}
	

	
	if ($("#bank_name_input").val().length>0){
		
		promises.push( validate_text("#bank_name_input",false) );
		
	}
	
	
	
	var relative_row_list = $(".relative_list .row");
	
	
	for (i=0; i<relative_row_list.length; i++){
		
		
		var relative_elem_id = $(relative_row_list[i]).parent().attr("id");
		
		promises.push( validate_name("#"+relative_elem_id +" #relative_name_input",false) );
		
		promises.push( validate_name("#"+relative_elem_id +" #relative_relation_input",false) );
		
		promises.push( validate_age("#"+relative_elem_id +" #relative_age_input",false) );
		
		promises.push( validate_name("#"+relative_elem_id +" #relative_education_input",false) );
		 
		
		
	}
						
				
	

	
		
	console.log(promises);
	
	
	
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
					
					
					console.log("success");
					
					
					console.log(data);

					
					name = $("#farmer_name_input").val().replace(/\s\s+/g, ' ').trim();
					
					surname = $("#farmer_surname_input").val().replace(/\s\s+/g, ' ').trim();
					
					phone = $("#farmer_phone_input").val();
					
					
					/* ------------------------------------ */	

					home_address = $("#home_address_input").val().replace(/\s\s+/g, ' ').trim();
					home_pincode = $("#home_pincode_input").val();
					
					
					aadhar_card = $("#aadhar_card_input").val().replace(/\s\s+/g, ' ').trim();
					pan_card = $("#pan_card_input").val().replace(/\s\s+/g, ' ').trim();
					
					
					
					
					farm_area = $("#farm_area_input").val();
					
					seeds_used = $("#seend_used_input").val().replace(/\s\s+/g, ' ').trim();
					fertilizer = $("#fertilizer_input").val().replace(/\s\s+/g, ' ').trim();
					insecticides = $("#insecticides_input").val().replace(/\s\s+/g, ' ').trim();
					
					
					
					weather_predictions_source = $("#weather_predictions_source_input").val().replace(/\s\s+/g, ' ').trim();
					
					market_information_source = $("#market_information_source_input").val().replace(/\s\s+/g, ' ').trim();
					
					farm_address = $("#farm_address_input").val().replace(/\s\s+/g, ' ').trim();
					farm_pincode = $("#farm_pincode_input").val();
					
					
					
					loan_amount = $("#loan_amount_input").val();
					bank_name = $("#bank_name_input").val().replace(/\s\s+/g, ' ').trim();
					



					/* ------------------------------------ */	
				
					
					
					
					var relative_row_list = $(".relative_list .row");
					
					relative_list_json = [];
					
					
					
					for (var j=0; j<relative_row_list.length; j++){
						
				
						
						console.log($(relative_row_list[j]).parent().attr("id"));
	
						
						
						var relative_elem = {
								id : random_string(32),
								name : $(relative_row_list[j]).find("#relative_name_input").val(),
								relation: $(relative_row_list[j]).find("#relative_relation_input").val(),
								age: $(relative_row_list[j]).find("#relative_age_input").val(),
								education: $(relative_row_list[j]).find("#relative_education_input").val(),
								
						};
						
						console.log(relative_elem);
						
						relative_list_json.push(relative_elem);
						
						
					}






					$(".add_save span i").attr("class", "spinner-border spinner-border-sm d-flex mt-1");

					Promise.all([set_farmer()]).then(function ([data]){
						
						
						console.log("completed");
						
						console.log(data);
						
						if (data.message=="error"){
							
					    	setTimeout(function(){ $(".add_save span i").attr("class", "fas fa-exclamation"); }, 1000);
			
						}
						else{
							
							$(".add_save span i").attr("class", "fas fa-check");
							
							setTimeout(function(){
								
//								window.location = "user/view/farmer?id="+primary_id;
			
							}, 1000);
			
						}
					
					}); 





					
				}
				
			}
	
	
	});
	
	
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
		$(this).closest('.relative_list').remove();
	});


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
	    	
	    	"id" : primary_id,
	    	"name":  name,
	    	"surname":  surname,
	    	"phone":phone,
	    	"home_address":home_address,
	    	"home_pincode":home_pincode,
	    	
	    	"aadhar_card":aadhar_card,
	    	"pan_card":pan_card,	    	
	    	"relative_list":JSON.stringify( relative_list_json),
	    	
	    	"farm_area":farm_area,
	    	"irrigation_type":irrigation_type,
	    	"seeds_used":seeds_used,
	    	"fertilizer":fertilizer,
	    	"insecticides":insecticides,
	    	
	    	"weather_predictions_source":weather_predictions_source,
	    	"weather_predictions_useful":weather_predictions_useful,
	    	"market_information_source":market_information_source,
	    	"market_information_useful":market_information_useful,
	    	"farm_address":farm_address,
	    	"farm_pincode":farm_pincode,
	    	
	    	
	    	"loan_amount":loan_amount,
	    	"bank_name":bank_name,
	    	
			
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






