

saved = false;

var name = "";
var surname = "";
var phone = "";
var compname = "";
var vehicle_num = "";
var comp_address = "";
var comp_pincode = "";
var name = "";



function init_add_transporter_f2h()
{
	
	primary_id = create_primary_id();
	
	console.log("primary_id = "+primary_id);
	
	
	$("#transporter_f2h_id_input").val(primary_id);
	
	
	
	$(".add_save").click(function(){
		
		
		console.log("add_save");
		
		save_btn_click();
		
		
		
		
		
	});
	
	
}




function save_btn_click()
{
	
	console.log($("#transporter_f2h_name_input").val().textonly()  );
	
	
	$(".add_save span i").attr("class", "spinner-border spinner-border-sm d-flex mt-1");
	

	
	  name = $("#transporter_f2h_name_input").val().textonly();
	
	  surname = $("#transporter_f2h_surname_input").val().textonly();
	
	  phone = $("#transporter_f2h_phone_input").val().numberonly();
	
	
	
	  compname = $("#transporter_f2h_comp_name_input").val().textonly();
	
	  vehicle_num = $("#transporter_f2h_vehicle_num_input").val();
	
	
	
	  comp_address = $("#transporter_f2h_comp_address_input").val().textonly();
	
	  comp_pincode = $("#transporter_f2h_comp_pincode_input").val().numberonly();

	
	var validation_sum =0;

	
	if (name.replace(/[\s]/gi, '').length==0){
				
		draw_modal_centered("Incomplete Field","Please fill required informtion");

		$("#transporter_f2h_name_input").addClass("border-warning");		
		$("#transporter_f2h_name_input").siblings("label").addClass("text-warning")
		
	}
	else{
		
		$("#transporter_f2h_name_input").removeClass("border-warning");		
		$("#transporter_f2h_name_input").siblings("label").removeClass("text-warning")
		
		validation_sum+=1;
	}
		

	if (surname.replace(/[\s]/gi, '').length==0){
				
		draw_modal_centered("Incomplete Field","Please fill required informtion");

		$("#transporter_f2h_surname_input").addClass("border-warning");		
		$("#transporter_f2h_surname_input").siblings("label").addClass("text-warning")
		
	}
	else{
		
		$("#transporter_f2h_surname_input").removeClass("border-warning");		
		$("#transporter_f2h_surname_input").siblings("label").removeClass("text-warning")
		
		validation_sum+=1;
	}
	
	
	
	

	if (phone.length==0){
				
		draw_modal_centered("Incomplete Field","Please fill required informtion");

		$("#transporter_f2h_phone_input").addClass("border-warning");		
		$("#transporter_f2h_phone_input").siblings("label").addClass("text-warning")
		
	}
	else{
		
		if (validate_phone(phone)){
			
			$("#transporter_f2h_phone_input").removeClass("border-warning border-danger");		
			$("#transporter_f2h_phone_input").siblings("label").removeClass("text-warning text-danger")
			validation_sum+=1;
		}
		else{
			
			
//			draw_modal_centered("Error","Please fill correct phone number");

			$("#transporter_f2h_phone_input").addClass("border-danger");		
			$("#transporter_f2h_phone_input").siblings("label").addClass("text-danger")
		}
		
		
		
	}
	
	
	
	

	
	
	if (vehicle_num.replace(/[\s]/gi, '').length==0){
				
		draw_modal_centered("Incomplete Field","Please fill required informtion");

		$("#transporter_f2h_vehicle_num_input").addClass("border-warning");		
		$("#transporter_f2h_vehicle_num_input").siblings("label").addClass("text-warning")
		
	}
	else{
		
				
		if (validate_vehicle_number(vehicle_num)){
			
			$("#transporter_f2h_vehicle_num_input").removeClass("border-warning border-danger");		
			$("#transporter_f2h_vehicle_num_input").siblings("label").removeClass("text-warning text-danger");
			validation_sum+=1;
		}
		else{
			
			
//			draw_modal_centered("Error","Please fill correct vehicle number");

			$("#transporter_f2h_vehicle_num_input").addClass("border-danger");		
			$("#transporter_f2h_vehicle_num_input").siblings("label").addClass("text-danger");
			
		}
		
		
	}
	

	if (compname.replace(/[\s]/gi, '').length==0){
				
		draw_modal_centered("Incomplete Field","Please fill required informtion");
		
		$("#transporter_f2h_comp_name_input").addClass("border-warning");		
		$("#transporter_f2h_comp_name_input").siblings("label").addClass("text-warning")
		validation_sum+=1;
	}
	else{
		
		$("#transporter_f2h_comp_name_input").removeClass("border-warning");		
		$("#transporter_f2h_comp_name_input").siblings("label").removeClass("text-warning")
		validation_sum+=1;
		
	}
	
	
	
	
	if (comp_address.replace(/[\s]/gi, '').length==0){
				
		draw_modal_centered("Incomplete Field","Please fill required informtion");

		$("#transporter_f2h_comp_address_input").addClass("border-warning");		
		$("#transporter_f2h_comp_address_input").siblings("label").addClass("text-warning")
		
	}
	else{
		
		$("#transporter_f2h_comp_address_input").removeClass("border-warning");		
		$("#transporter_f2h_comp_address_input").siblings("label").removeClass("text-warning")
		validation_sum+=1;
		
	}
	
	
	
	
	

	if (comp_pincode.replace(/[\s]/gi, '').length==0){
				
		draw_modal_centered("Incomplete Field","Please fill required informtion");

		$("#transporter_f2h_comp_pincode_input").addClass("border-warning");		
		$("#transporter_f2h_comp_pincode_input").siblings("label").addClass("text-warning")
		
	}
	else{
		
		if (comp_pincode.length==6){
			
			$("#transporter_f2h_comp_pincode_input").removeClass("border-warning border-danger");		
			$("#transporter_f2h_comp_pincode_input").siblings("label").removeClass("text-warning text-danger")
			validation_sum+=1;
			
		}
		else{
			
			$("#transporter_f2h_comp_pincode_input").removeClass("border-danger");		
			$("#transporter_f2h_comp_pincode_input").siblings("label").removeClass("text-danger")
			
			
		}
		
		
		
	}
	
	
	
	
	console.log(validation_sum);
	
	
	
	if (validation_sum==7){
		
		Promise.all([save_transporter_f2h()]).then(function ([data]){
			
			
			console.log("completed");
			
			console.log(data);
			
			if (data.message=="error"){
		    	setTimeout(function(){ $(".add_save span i").attr("class", "fas fa-exclamation"); }, 1000);

			}
			else{
				setTimeout(function(){ $(".add_save span i").attr("class", "fas fa-check"); }, 1000);

			}
			


		}); 
		;
		
		
	}
	else{
		
		console.log("not saved");
		
		setTimeout(function(){ $(".add_save span i").attr("class", "fas fa-exclamation"); }, 1000);
		
	}
	
	
}








function save_transporter_f2h()
{
    var deferred = new $.Deferred();
    
//    MH-02-GG-333
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/transporter_f2h/add",	    
	    contentType: "application/json",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"transporter_f2h_id" : primary_id,
	    	"name":  name,
	    	"surname":  surname,
	    	"phone":phone,
	    	"vehicle_number":vehicle_num,
	    	"company_name":compname,
	    	"company_address":comp_address,
	    	"company_pincode":comp_pincode,

	    	
			
	    }),	    
	    success: function([data])
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








