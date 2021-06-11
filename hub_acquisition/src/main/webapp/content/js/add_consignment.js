

saved = false;


var consignment_id = "";
var transporter_data = null;

var farmer_data = null;

var transporter_data = null;





var product_categories_list  = null;
var product_types_list = null
var product_sub_types_list = null





var category_id = "";
var category_text = "";

var type_id = "";
var type_text = "";

var sub_type_id = "";
var sub_type_text = "";






function init_add_consignment()
{
	
	consignment_id = create_consignment_id();
	
	
	$("#consignment_id_input").val(consignment_id);
	
	
	load_category_select();
	
	
	$("#category_select").on('change', function() {
		
		
		
		
		load_product_types();
		
		
		
	});
		
	
	
	$("#type_select").on('change', function() {
		
		
		
		
		load_product_sub_types();
		
		
		
	});
		
	
	
	
	
	$("#sub_type_select").on('change', function() {
		
		
		sub_type_id = $("#sub_type_select option:selected").data("id");
		
		sub_type_text = $("#sub_type_select option:selected").text();	
		
		set_product_price();
		
	});
	
	
	
	
	
	$('#transporter_rate_amount_input').attr('readonly', true);
	
	

	
	
	$("#product_weight_input").val(0);
		
	$("#transporter_rate_amount_input").val( $("#product_weight_input").val() );	
	
	$("#transporter_rate_select").on('change', function() {
		
		transporter_rate_select_change();
				
	});
		
	


	$("#transporter_id_btn").click(function(){
		
		
		console.log("transporter_id_indicator");

		
		find_transporter_by_id();
		
		
	});
	

	$("#transporter_phone_btn").click(function(){
		
		
		find_transport_by_phone();
		
		
	});
	
	
	
	$("#farmer_id_btn").click(function(){
		
		
		find_farmer_by_id();
		
		
	});
	

	
	$("#farmer_phone_btn").click(function(){
		
		
		find_farmer_by_phone();
		
		
	});
	
	
	$(".save_consignment_btn").click(function(){
		
		
		save_consignment_btn_click();
		
		
	});
	
	
	
	
	$(".print_label_btn").click(function(){
		
		
		print_label_btn_click();
		
		
	});
	
	
	
	
}


	



function transporter_rate_select_change()
{
	
	 rate_type = $("#transporter_rate_select option:selected").data("id");
	
	console.log(rate_type);
	
	if (rate_type=="weight"){
		
		console.log( $("#product_weight_input").val());
		
		$('#transporter_rate_amount_input').attr('readonly', true);
		
		$("#transporter_rate_amount_input").val( $("#product_weight_input").val() );
		
		$("#transporter_rate_input").closest("div").find("label").text(" Rate");
		
		//console.log($("#transporter_rate_input").closest("div").find("label").text(" Rate"));
		
		if ($("#product_weight_input").val().length==0||(parseFloat($("#product_weight_input").val())==0)){
			
			
			
			$("#transporter_rate_select option[data-id=not_selected]").prop('selected', true);
			
			$(".warning_model_message").html("You have to add the Weight (kg) to select this option. ");
			
			$('#warning_model').modal('show');
			
		}
		
		

		
	}
	
	
	if (rate_type=="unit"){
		
		console.log( $(".product_weight_input").val());
		
		$('#transporter_rate_amount_input').attr('readonly', false);
		
		$("#transporter_rate_amount_input").val( $("#product_weight_input").val() );
		
		$("#transporter_rate_input").closest("div").find("label").text("Rate ");

	}
	
	
	
	if (rate_type=="upfront"){
		
		console.log( $(".product_weight_input").val());
		
		$('#transporter_rate_amount_input').attr('readonly', false);
		
		$("#transporter_rate_amount_input" ).attr('disabled', true);
	
	
		$("#transporter_rate_amount_input").val( $("#product_weight_input").val() );
		
		
		$("#transporter_rate_input").closest("div").find("label").text("Payment amount");
		
		
	}
	
	
	
}










function set_product_price()
{
	
	
	
	
	Promise
		.all([get_product_price_by_date()])
        .then(([data]) => {
	
			console.log(data);
			
			
			if (data.message=="success"){
				
				$("#product_rate_input").val(data.product_pricing.price);
							

			
			}
		
			
		
		
		});
	
		
				
						
	
		
	
}











function print_label_btn_click()
{
	js_doc = new jsPDF('l', 'mm', [105, 150]);	
	
	
	
	if ((typeof farmer_data == "undefined") || (farmer_data==null)){
		$(".warning_model_message").html("Please first select the Farmer.  ");
			
		$('#warning_model').modal('show');
		return;
	}
	
	
	
	if ((typeof transporter_data == "undefined")|| (transporter_data == null)){
		$(".warning_model_message").html("Please first select the Trasporter. ");
			
		$('#warning_model').modal('show');
		return;
	}
	
	
	 html_str = 
	
	
			'<table border="0" style="width:100%; background-color:white;">'+
			
				'<tr style="  border:0; background:white;">'+
					'<td style="padding:0rem 0rem 2rem 0rem; margin: 0 auto; text-align:center; font-size:50px; font-weight:bold; color:black;  text-transform:uppercase; ">'+consignment_id+'</td>'+
				'</tr>'+
				'<tr style=" border-top:1px solid gray; background:WhiteSmoke;">'+
					'<td style="padding:0.5rem 1rem 0.5rem 5rem;  font-size:30px; "> &mdash; Farmer '+'</td>'+
				'</tr>'+
				'<tr style="  border-bottom:1px solid gray;">'+
					'<td style="padding:2rem 5rem 2rem 5rem; width:50%; color:black; border-right:2px solid black;  font-size:50px; text-transform:uppercase;">'+
						farmer_data[0].id+
					'</td>'+
					'<td style="" >'+
						'<div style="padding-left:3rem; font-size:30px; ">'+farmer_data[0].name+' '+farmer_data[0].surname+'</div>'+				
					'</td>'+
				'</tr>'+
				'<tr style=" border-top:1px solid gray; background:WhiteSmoke;">'+
					'<td style="padding:0.5rem 1rem 0.5rem 5rem;  font-size:30px; "> &mdash; Transporter '+'</td>'+
				'</tr>'+
				'<tr style="  border-bottom:1px solid gray;">'+
					'<td style="padding:2rem 5rem 2rem 5rem; width:50%; color:black; border-right:2px solid black;  font-size:50px; text-transform:uppercase;">'+
						transporter_data[0].id+
					'</td>'+
					'<td style="" >'+
						'<div style="padding-left:3rem; font-size:30px; ">'+transporter_data[0].name+' '+transporter_data[0].surname+'</div>'+
						'<div style="padding-left:3rem; font-size:30px; color:black; ">'+transporter_data[0].vehicle_number+'</div>'+
					'</td>'+
				'</tr>'+
				
			'</table>'
	
	
	js_elem = $(html_str).hide().appendTo("body");
	
	
	
	
	Promise
		.all([create_barcode_png_dataurl(consignment_id)])
        .then(([barcode_DataURL]) => {
			
			js_doc.addImage(barcode_DataURL, 'PNG', 10, 10, 
							js_doc.internal.pageSize.width -20, 30,
							"consignment_id", "NONE", 0
							
							);
			
			js_doc.addHTML($(js_elem.show()), 0, 40, function(){
				
				js_elem.hide();
				
			    js_doc.autoPrint();
				
				window.open(js_doc.output('bloburi'));
				
			});





			
//			js_doc.fromHTML(html_str,
//					10, 45, 
//					{
//						'width': js_doc.internal.pageSize.width,
//						'elementHandlers': specialElementHandlers
//
//					}
//					
//			);
//			
//												
//			js_doc.autoPrint();
//			
//			window.open(js_doc.output('bloburi'));
	
		});
	
	
	
}


























function save_consignment_btn_click()
{
	console.log("save_consignment_btn_click");
	
	
	$(".save_consignment_btn span i").attr("class", "spinner-border spinner-border-sm d-flex mt-1");

	
	var promises = [];
		
	promises.push(validate_select("#category_select",true));
	promises.push(validate_select("#type_select",true));
	promises.push(validate_select("#sub_type_select",true));
	
	promises.push(validate_number("#product_rate_input",true));
	
	promises.push(validate_date("#product_harv_date",true));
	promises.push(validate_number("#product_weight_input",true));
	

	promises.push(validate_select("#transporter_rate_select",true));
	promises.push(validate_number("#transporter_rate_amount_input",true));	
	promises.push(validate_text("#transporter_rate_input",true));

	promises.push(validate_text("#farmer_name_input",true));



	
	
	Promise
		.all(promises)
        .then((data) => {
			
			console.log(data);
			
			
			
			if ($("#transporter_name_input").val().length==0){
				
				$("#transporter_id_input").removeClass("border-blue");		
				$("#transporter_id_input").parent().siblings("label").removeClass("text-blue")

				$("#transporter_id_input").addClass("border-danger");		
				$("#transporter_id_input").parent().siblings("label").addClass("text-danger")
				
				
				
			}
			else{
				
				console.log("transporter_id_input - good");
				
				$("#transporter_id_input").removeClass("border-danger border-danger");		
				$("#transporter_id_input").parent().siblings("label").removeClass("text-danger")

				$("#transporter_id_input").addClass("border-blue");		
				$("#transporter_id_input").parent().siblings("label").addClass("text-blue")
			} 
			
			
			
			
			if  ($("#farmer_name_input").val().length==0){
				
				
				$("#farmer_id_input").removeClass("border-blue");		
				$("#farmer_id_input").parent().siblings("label").removeClass("text-blue")

				$("#farmer_id_input").addClass("border-danger");		
				$("#farmer_id_input").parent().siblings("label").addClass("text-danger")
				
			}
			else{
				
				console.log("farmer_id_input - good");
				
				$("#farmer_id_input").removeClass("border-danger ");		
				$("#farmer_id_input").parent().siblings("label").removeClass("text-danger")

				$("#farmer_id_input").addClass("border-blue");		
				$("#farmer_id_input").parent().siblings("label").addClass("text-blue")
			} 
			
			
			
			
			console.log(data);
			
			
			for(var i=0; i<data.length; i++){
				
				console.log(data[i][0]);
				if (!data[i][0]){
					
					console.log("error: validation");
					console.log(data[i]);
					
					
					 $(".save_consignment_btn span i").attr("class", "fas fa-bolt");
				
				
					return;
				}
				
				
				if(i+1==data.length){
					
					
					

					Promise.all([add_consignment()]).then(function ([data]){
						
						
						console.log("completed");
						
						console.log(data);
						
						if (data.message=="error"){
							
					    	setTimeout(function(){ $(".save_consignment_btn span i").attr("class", "fas fa-bolt"); }, 1000);
			
						}
						else{
							
							$(".save_consignment_btn span i").attr("class", "fas fa-check");
							
							setTimeout(function(){
								
								window.location = "user/view/consignment?i="+consignment_id;
			
							}, 1000);
			
						}
					
					}); 
				}
				
				
			}
			
			
			
			
			

	
	});

	
}












function find_farmer_by_phone()
{
	$("#farmer_phone_indicator i").attr("class", "spinner-border spinner-border-sm d-flex mt-1");
	
	var farmer_phone = $("#farmer_phone_input").val().toLowerCase();
	
	
	$(".farmer-id-group .dropdown-menu ").empty();
	$(".farmer-phone-group .dropdown-menu ").empty();
	
	
	
	if (farmer_phone.length<5){
		
			

		$(".farmer-phone-group .dropdown-menu ").append(
		
				
			$('<div class="dropdown-divider"></div>'+
				'<div class="dropdown-item" href="#"> Search term is too short. At least 5 characters are required.'+				
			'</div>')
		);
		
		
		
		$(".farmer-phone-group .dropdown-menu ").addClass("shadow");
	
		
		setTimeout(() => {
			
			$("#farmer_phone_indicator i").attr("class", "fas text-danger fa-exclamation-circle blink");
			
			$(".farmer-phone-group input").trigger("click");

		}, 300);

		
		return;		
	}
	
	
	
	Promise.all([get_farmer_by_phone(farmer_phone)]).then(function ([data]){
		
		
		console.log(data);
		
		farmer_data = data.farmer_list;
		
		
		if (data.message=="error"){
			
			$("#farmer_phone_indicator i").attr("class", "fas fa-bug text-danger");

			fill_farmer_notfound();
			
		}
		else if(data.message=="not_found"){
			
			$("#farmer_phone_indicator i").attr("class", "fas text-danger fa-exclamation-circle");
			
			
			$(".farmer-phone-group .dropdown-menu ").append(
		
				
				$('<div class="dropdown-divider"></div>'+
				  '<a class="dropdown-item "  target="_blank" href="user/add/farmer" >  '+
						'Farmer not found. Try again or '+
						'<span class="badge badge-primary  float-right  ">Click to add</span>'+				
				  '</a>')
				
			);
			
			
			
			$(".farmer-phone-group .dropdown-menu ").addClass("shadow");
		
			
			setTimeout(() => {
				
				$("#farmer_phone_indicator i").attr("class", "fas text-danger fa-exclamation-circle blink");
				
				$(".farmer-phone-group input").trigger("click");
	
			}, 300);
			

			fill_farmer_notfound();
			
		}
		else{
			

			load_farmer_phone_dropdown();
			
			
		}
		
		
		
	});


}






function load_farmer_phone_dropdown()
{
	var _length = (farmer_data.length>5)? 5 : farmer_data.length;
	
	$("#farmer_phone_indicator i").attr("class", "fas text-warning fa-question-circle blink");

	
	$(".farmer-phone-group .dropdown-menu ").addClass("shadow");
	
	
	
	for (var i = 0; i<_length; i++){
		
		console.log(farmer_data[i]);
		
		
		$(".farmer-phone-group .dropdown-menu ").append(
			
			$('<a class="dropdown-item" >'+
//			  '<small class="text-muted d-flex w-100 mb-1 ">'+transporter_data[i].name +' '+transporter_data[i].surname+'</small>'+
			  '<div class="d-flex w-100 justify-content-between">'+
				  '<span class="text-muted text-uppercase text-monospace"> '+farmer_data[i].id+' </span>'+
				  '<small>'+farmer_data[i].name+' '+farmer_data[i].surname+'</small>'+
			  '</div>'+
			  '<h5>'+farmer_data[i].phone+'</h5>'+
			  '</a>')
			.data(farmer_data[i])
			.click(function(e){


				console.log($(this).data());
				

				
				
				
				

				$("#farmer_id_indicator i").attr("class", "fas text-success fa-check-circle");
				
				$("#farmer_phone_indicator i").attr("class", "fas text-success fa-check-circle");
				
				

				
				$("#farmer_id_input").val( $(this).data().id );
				
				$("#farmer_phone_input").val($(this).data().phone);
				
				$("#farmer_name_input").val($(this).data().name + " " + $(this).data().surname );

				
			})			
		);
		
		
		
		
		
			
	}
		
	$(".farmer-phone-group .dropdown-menu ").append(	
		$('<div class="dropdown-divider"></div>'+
		'<a class="dropdown-item" href="#">To find more narrow your search  </a>')
	);
	
	$(".farmer-phone-group input ").trigger("click");
	
}








function find_farmer_by_id()
{
	
	$("#farmer_id_indicator i").attr("class", "spinner-border spinner-border-sm d-flex mt-1");
	
	var farmer_id = $("#farmer_id_input").val().toLowerCase();
	
	
	$(".farmer-id-group .dropdown-menu ").empty();
	$(".farmer-phone-group .dropdown-menu ").empty();
	
	console.log(farmer_id);
	
	
	
	
	if (farmer_id.length<6){
		
			

		$(".farmer-id-group .dropdown-menu ").append(
		
				
			$('<div class="dropdown-divider"></div>'+
				'<div class="dropdown-item" href="#"> Search term is too short. At least 6 characters are required.'+				
			'</div>')
		);
		
		
		
		$(".farmer-id-group .dropdown-menu ").addClass("shadow");
	
		
		setTimeout(() => {
			
			$("#farmer_id_indicator i").attr("class", "fas text-danger fa-exclamation-circle blink");
			
			$(".farmer-id-group input").trigger("click");

		}, 300);

		
		return;		
	}
	
	
	

	

	Promise.all([get_farmer_by_id(farmer_id)]).then(function ([data]){
		
		
		console.log(data);
		
		farmer_data = data.farmer;
		
		console.log(farmer_data);
		
		if (data.message=="error"){
			
			$("#farmer_id_indicator i").attr("class", "fas text-danger fa-exclamation-circle");

			fill_transporter_notfound();
			
		}
		else if(data.message=="not_found"){
			
			$(".farmer-id-group .dropdown-menu ").append(
			
					
				$('<div class="dropdown-divider"></div>'+
				  '<a class="dropdown-item "  target="_blank" href="user/add/farmer" >  '+
						'Farmer not found. Try again or '+
						'<span class="badge badge-primary  float-right  ">Click to add</span>'+				
				  '</a>')
			);
			
			
			
			$(".farmer-id-group .dropdown-menu ").addClass("shadow");
		
			
			setTimeout(() => {
				
				$("#farmer_id_indicator i").attr("class", "fas text-danger fa-exclamation-circle blink");
				
				$(".farmer-id-group input").trigger("click");
	
			}, 300);
			
			fill_farmer_notfound();
			
		}
		else{
			
			$("#farmer_id_indicator i").attr("class", "fas text-success fa-check-circle");
			$("#farmer_phone_indicator i").attr("class", "fas text-success fa-check-circle");

			
			
			$("#farmer_id_input").val( farmer_data.id );
			$("#farmer_phone_input").val(farmer_data.phone);
			
			$("#farmer_name_input").val(farmer_data.name + " " + farmer_data.surname );

			
			
		}
		
		
	
	});
	
}





function find_transporter_by_id()
{
	console.log("find_transporter_by_id");

	$("#transporter_id_indicator i").attr("class", "spinner-border spinner-border-sm d-flex mt-1");
	
	var transporter_id = $("#transporter_id_input").val().toLowerCase();
	
	
	if (transporter_id.length<6){
		
		console.log("less that 6");
		
				

		$(".transporter-id-group .dropdown-menu ").append(
		
				
			$('<div class="dropdown-divider"></div>'+
			'<a class="dropdown-item" href="#"> Search term is too short. At least 6 characters are required.  </a>')
		);
		
		
		
		$(".transporter-id-group .dropdown-menu ").addClass("shadow");
	
		
		setTimeout(() => {
			
			$("#transporter_id_indicator i").attr("class", "fas text-danger fa-exclamation-circle blink");
			
			$(".transporter-id-group input").trigger("click");

		}, 300);

		
		return;
	}
	
	
	
	
	
	

	Promise.all([get_transporterf2h_by_id(transporter_id)]).then(function ([data]){
		
		
		console.log(data);
		
		
		transporter_data = data.transporter_f2h;
		

		if (data.message=="error"){
			
			$("#transporter_phone_indicator i").attr("class", "text-danger  fas fa-bug");

			fill_transporter_notfound();
			
		}
		else if(data.message=="not_found"){
			
			
			$("#transporter_id_indicator i").attr("class", "fas text-danger fa-exclamation-circle");
			
				

			$(".transporter-id-group .dropdown-menu ").append(
			
				
				$('<div class="dropdown-divider"></div>'+
				  '<a class="dropdown-item "  target="_blank" href="user/add/transporter_f2h" >  '+
						'Transporter not found. Try again or '+
						'<span class="badge badge-primary  float-right  ">Click to add</span>'+				
				  '</a>')
			);
			
			
			
			$(".transporter-id-group .dropdown-menu ").addClass("shadow");
		
			
			setTimeout(() => {
				
				$("#transporter_id_indicator i").attr("class", "fas text-danger fa-exclamation-circle blink");
				
				$(".transporter-id-group input").trigger("click");
	
			}, 300);


			fill_transporter_notfound();
			
		}
		else{
			
			$("#transporter_id_indicator i").attr("class", "fas text-success fa-check-circle");
			$("#transporter_phone_indicator i").attr("class", "fas text-success fa-check-circle");

			
			
			$("#transporter_id_input").val( transporter_data.id);
			$("#transporter_phone_input").val(transporter_data.phone);
			
			$("#transporter_name_input").val(transporter_data.name + " " + transporter_data.surname );
			$("#transporter_vehicle_num_input").val(transporter_data.vehicle_number );

			
			
		}
		
		
	
	});
	
	
	
	
	
	
}













function find_transport_by_phone()
{
	console.log("find_transport_by_phone");
	
	$("#transporter_phone_indicator i").attr("class", "spinner-border spinner-border-sm d-flex mt-1");
	
	var transport_phone = $("#transporter_phone_input").val().toLowerCase();
	
	
	
	$(".transporter-id-group .dropdown-menu ").empty();
	$(".transporter-phone-group .dropdown-menu ").empty();
	
	
	
	
	if (transport_phone.length<5){
		
			

		$(".transporter-phone-group .dropdown-menu ").append(
		
				
			$('<div class="dropdown-divider"></div>'+
				'<div class="dropdown-item" href="#"> Search term is too short. At least 5 characters are required.'+				
			'</div>')
		);
		
		
		
		$(".transporter-phone-group .dropdown-menu ").addClass("shadow");
	
		
		setTimeout(() => {
			
			$("#transporter_phone_indicator i").attr("class", "fas text-danger fa-exclamation-circle blink");
			
			$(".transporter-phone-group input").trigger("click");

		}, 300);

		
		return;		
	}
	
	
	Promise.all([search_transporterf2h_by_phone(transport_phone)]).then(function ([data]){
		
		console.log(data);
		

		
		transporter_data = data.transporter_f2h_list;
		
		
		
		if (data.message=="error"){
			
			$("#transporter_phone_indicator i").attr("class", "text-danger  fas fa-bug");

			fill_transporter_notfound();
			
		}
		else if(data.message=="not_found"){
			
			$("#transporter_phone_indicator i").attr("class", "fas text-danger fa-exclamation-circle");
			
			$(".transporter-phone-group .dropdown-menu ").append(
			
					
				$('<div class="dropdown-divider"></div>'+
				  '<a class="dropdown-item "  target="_blank" href="user/add/transporter_f2h" >  '+
						'Transporter not found. Try again. '+
						'<span class="badge badge-primary  float-right  ">Click to add</span>'+				
				  '</a>')
			);
			
			
			
			$(".transporter-phone-group .dropdown-menu ").addClass("shadow");
		
			
			setTimeout(() => {
				
				$("#transporter_phone_indicator i").attr("class", "fas text-danger fa-exclamation-circle blink");
				
				$(".transporter-phone-group input").trigger("click");
	
			}, 300);
			
			
			fill_transporter_notfound();
			
		}
		else{
			
//			$("#transporter_phone_indicator i").attr("class", "fas text-success fa-check-circle");

			load_transporter_phone_dropdown();
			
			
		}

	}); 
}


















function load_product_sub_types()
{
	
	$("#sub_type_select option[data-id!=not_selected]").remove();



	type_id = $("#type_select option:selected").data("id");
	
	type_text = $("#type_select option:selected").text();				
					
	
	console.log(type_id);
	
	console.log(type_text);
	
	
	
	Promise
		.all([get_all_product_sub_types()])
        .then(([data]) => {
	
			console.log(data);
							
			product_sub_types_list =  data.product_sub_types_list;
			
			
			if (data.message=="success"){
			
	
				for (var i =0 ; i<product_sub_types_list.length; i++){
					
					$("#sub_type_select").append(
						
						$('<option data-id='+product_sub_types_list[i].id+' >'+product_sub_types_list[i].name+'</option>')
						
					);
					
				}
			}
	});
	
	
	
	
}






function load_product_types()
{
	

	$("#type_select option[data-id!=not_selected]").remove();
	
	
	$("#sub_type_select option[data-id!=not_selected]").remove();
	
	
	
	
	category_id = $("#category_select option:selected").data("id");
	
	category_text = $("#category_select option:selected").text();				
					
	
	console.log(category_id);
	
	console.log(category_text);
		
		
	Promise
		.all([get_all_product_types()])
        .then(([data]) => {
	
			console.log(data);
							
			product_types_list =  data.product_types_list;
			
			if (data.message=="success"){
				
				for (var i =0 ; i<product_types_list.length; i++){
				
					$("#type_select").append(
						
						$('<option data-id='+product_types_list[i].id+' >'+product_types_list[i].name+'</option>')
						
					);
				
				}
			}
			 
			
			
	
	});
	  
}






function load_category_select()
{
	
	
	Promise
		.all([get_all_product_categories()])
        .then(([data]) => {
	
	
			console.log(data);
			
			
			product_categories_list =  data.product_categories_list;
			
			
			for (var i =0 ; i<product_categories_list.length; i++){
				
				$("#category_select").append(
					
					$('<option data-id='+product_categories_list[i].id+' >'+product_categories_list[i].name+'</option>')
					
				);
				
			}
			
	});
	
	
}





function load_type_select()
{
	
	
	Promise
		.all([get_all_product_types()])
        .then(([data]) => {
	
			console.log(data);
							
			product_types_list =  data.product_types_list;
			
			for (var i =0 ; i<product_types_list.length; i++){
				
				$("#type_select").append(
					
					$('<option data-id='+product_types_list[i].id+' >'+product_types_list[i].name+'</option>')
					
				);
				
			}
	
	});
	  
	
	
	
}




function load_sub_type_select()
{
	
		
		Promise
			.all([get_all_product_sub_types()])
	        .then(([data]) => {
		
				console.log(data);
								
				product_sub_types_list =  data.product_sub_types_list;
				
				
				for (var i =0 ; i<product_types_list.length; i++){
				
				$("#sub_type_select").append(
					
					$('<option data-id='+product_types_list[i].id+' >'+product_types_list[i].name+'</option>')
					
				);
				
			}
		
		});
}









function load_transporter_phone_dropdown()
{
	var _length = (transporter_data.length>4)? 5 : transporter_data.length;
	
	$("#transporter_phone_indicator i").attr("class", "fas text-warning fa-question-circle blink");

	
	$(".transporter-phone-group .dropdown-menu ").addClass("shadow");
	
	$(".transporter-phone-group .dropdown-menu ").empty();
	
	for (var i = 0; i<_length; i++){
		
		console.log(transporter_data[i]);
		
		
		$(".transporter-phone-group .dropdown-menu ").append(
			
			$('<a class="dropdown-item" >'+
//			  '<small class="text-muted d-flex w-100 mb-1 ">'+transporter_data[i].name +' '+transporter_data[i].surname+'</small>'+
			  '<div class="d-flex w-100 justify-content-between">'+
				  '<span class="text-muted text-uppercase text-monospace"> '+transporter_data[i].id+' </span>'+
				  '<small>'+transporter_data[i].name+' '+transporter_data[i].surname+'</small>'+
			  '</div>'+


			  '<h5>'+transporter_data[i].phone+'</h5>'+
			  '</a>')
			.data(transporter_data[i])
			.click(function(e ){

				
				
				$("#transporter_id_indicator i").attr("class", "fas text-success fa-check-circle");
				
				$(".transporter-id-group .dropdown-menu ").empty();
				
				
				$("#transporter_phone_indicator i").attr("class", "fas text-success fa-check-circle");
				
				
				$("#transporter_id_input").val( $(this).data().id );
				$("#transporter_phone_input").val($(this).data().phone);
				
				$("#transporter_name_input").val($(this).data().name + " " + $(this).data().surname );
				$("#transporter_vehicle_num_input").val($(this).data().vehicle_number );

				
			})			
		);
		
		
		
		
		
			
	}
		
	$(".transporter-phone-group .dropdown-menu ").append(	
		$('<div class="dropdown-divider"></div>'+
		'<a class="dropdown-item" href="#">To find more narrow your search  </a>')
	);
	
	$(".transporter-phone-group input ").trigger("click");
	
}













function fill_transporter_notfound()
{
	
	
	$("#transport_id_indicator i").attr("class", "fas text-danger fa-exclamation-circle");
	
	$("#transporter_phone_indicator i").attr("class", "fas text-danger fa-exclamation-circle");

	
	
	$("#transporter_id_input").val("" );
	$("#transporter_phone_input").val("");
	$("#transporter_name_input").val("" );
	$("#transporter_vehicle_num_input").val("" );

	
	
	
}





function find_farmer_phone()
{
	$("#farmer_phone_indicator i").attr("class", "spinner-border spinner-border-sm d-flex mt-1");
	
	

	var farmer_phone = $("#farmer_phone_input").val().toLowerCase();
	
	
	
	Promise.all([get_farmer_by_phone(farmer_phone)]).then(function (){


		console.log(farmer_data);
		
		
		if (farmer_data.farmer_id=="error"){
			
//			$("#farmer_id_indicator i").attr("class", "spinner-border spinner-border-sm d-flex mt-1");
			$("#farmer_phone_indicator i").attr("class", "fas text-danger fa-exclamation-circle");

			fill_farmers_notfound();
			
		}
		else if(farmer_data.farmer_id=="not_found"){
			
			$("#farmer_phone_indicator i").attr("class", "fas text-danger fa-exclamation-circle");

			fill_farmers_notfound();
			
		}
		else if(farmer_data.farmer_id=="duplicate"){
			
			$("#farmer_phone_indicator i").attr("class", "fas text-danger fa-clone");
			
			fill_farmers_notfound();

		}
		else{
			
			$("#farmer_phone_indicator i").attr("class", "fas text-success fa-check-circle");
			fill_farmers_detail();

		}

		
		
		
	}); 
	
}






function fill_farmers_detail()
{
	$("#farmer_id_input").val(farmer_data.farmer_id);
	$("#farmer_phone_input").val(farmer_data.phone);	
	$("#farmer_name_input").val(farmer_data.name);
	$("#farmer_surname_input").val(farmer_data.surname);
	
	$("#farmer_phone_indicator i").attr("class", "fas text-success fa-check-circle");

	$("#farmer_id_indicator i").attr("class", "fas text-success fa-check-circle");


}




function fill_farmer_notfound()
{


	$("#farmer_id_indicator i").attr("class", "fas text-danger fa-exclamation-circle");

	$("#farmer_phone_indicator i").attr("class", "fas text-danger fa-exclamation-circle");

	$("#farmer_id_input").val("");
	$("#farmer_name_input").val("" );
	$("#farmer_surname_input").val("" );
	$("#farmer_phone_input").val("" );
	
	
	
	
}








	




function search_transporterf2h_by_phone(transport_phone)
{
    var deferred = new $.Deferred();
    

        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/transporter_f2h/search/by/phone",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"phone" : transport_phone,
	    	
			
	    }),	    
	    success: function(data)
	    {
	    	
//	    	console.log(data);
	    	
	    	
	    	deferred.resolve(data);
	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	    	

			console.log("error ");
			
			transporter_data = data;

	    	deferred.resolve(transporter_data);
	    	
	    	console.log(jqXHR);
	    	console.log(textStatus);
	    	console.log(errorThrown);
	    	
	    }
	});
	
	return deferred.promise();
}








function get_transporterf2h_by_id(transporter_id)
{
    var deferred = new $.Deferred();
    

        
    var data = {'message':'error'};
    
	console.log(transporter_id);

	
	$.ajax({
		type: "POST",
	    url: "user/api/transporter_f2h/get/by/id",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : transporter_id,
	    	
			
	    }),	    
	    success: function(data)
	    {
	    	
//	    	console.log(data);
	    	
//	    	transporter_data = data;
	    	
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








function get_farmer_by_id(farmer_id)
{
    var deferred = new $.Deferred();
    

        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/farmer/get/by/id",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : farmer_id,
	    	
			
	    }),	    
	    success: function(data)
	    {
	    	
//	    	console.log(data);
	    	
//	    	farmer_data = data;
	    	
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






function get_farmer_by_phone(farmer_phone)
{
    var deferred = new $.Deferred();
    

        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/farmer/get/by/phone",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"phone" : farmer_phone,
	    	
			
	    }),	    
	    success: function(data)
	    {
	    	
//	    	console.log(data);
	    	
	    	farmer_data = data;
	    	
	    	deferred.resolve(farmer_data);
	    
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






function get_all_product_categories()
{
    var deferred = new $.Deferred();
    

        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/product_info/categories/get/all",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
    
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








function get_all_product_types()
{
    var deferred = new $.Deferred();
    

        
    var data = {'message':'error'};
    

	console.log(category_id);
	
	console.log(category_text);
		
	
	$.ajax({
		type: "POST",
	    url: "user/api/product_info/types/get/all",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
     	data:  JSON.stringify({ 
	    	
	    	"id"  : category_id,
			"name"  : category_text,
			
			
			
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








function get_all_product_sub_types()
{
    var deferred = new $.Deferred();
    

        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/product_info/sub_types/get/all",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
     	data:  JSON.stringify({ 
	    	
	    	"id"  : type_id,
			"name"  : type_text,
			
			
			
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










function add_consignment()
{
	
	 var deferred = new $.Deferred();
    

        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/consignment/add",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : consignment_id,

			"category_id" : $("#category_select option:selected" ).data("id"),
			"type_id" : $("#type_select option:selected" ).data("id"),
			"sub_type_id" : $("#sub_type_select option:selected" ).data("id"),
			
			
			"product_rate" : $("#product_rate_input").val(),
			"harvest_date" : $("#product_harv_date").datepicker('getDate'),
			"weight" : $("#product_weight_input").val(),
			
			"transporter_f2h_id" : $("#transporter_id_input").val(),
			"transporter_f2h_full_name" : $("#transporter_name_input").val(),
			"transporter_f2h_phone" : $("#transporter_phone_input").val(),
			
			"transporter_f2h_rate_type" :  $("#transporter_rate_select option:selected" ).data("id"),
			"transporter_f2h_rate_amount" : $("#transporter_rate_amount_input").val(),
			"transporter_f2h_rate" : $("#transporter_rate_input").val(),
			
			
			
			
			"farmer_id" : $("#farmer_id_input").val(),
	    	"farmer_full_name" : $("#farmer_name_input").val(),
			"farmer_phone" : $("#farmer_phone_input").val(),
			
			
	    }),	    
	    success: function(data)
	    {
	    	
//	    	console.log(data);
	    	
	    	transporter_data = data;
	    	
	    	deferred.resolve(transporter_data);
	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	    	

			console.log("error ");
			
			transporter_data = data;

	    	deferred.resolve(transporter_data);
	    	
	    	console.log(jqXHR);
	    	console.log(textStatus);
	    	console.log(errorThrown);
	    	
	    }
	});
	
	return deferred.promise();
}






function get_product_price_by_date()
{
    var deferred = new $.Deferred();
    

        
    var data = {'message':'error'};
    
	
	
	$.ajax({
		type: "POST",
	    url: "user/api/product_pricing/get/by/date/and/product",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
     	data:  JSON.stringify({ 
	    	
	    	"product_info_id"  : sub_type_id+":"+type_id+":"+category_id,
			"createDate": (new Date( (new Date()).toDateString() )),
//	    	"createDate" : (new Date( (new Date()).toDateString() )).getTime() - (new Date()).getTimezoneOffset()*60*1000  ,

			
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






















//	farmer_data=
//	[
//    {
//        "id": "hgap-6895",
//        "name": "Gaurav",
//        "surname": "Tripathi",
//        "phone": "57 57830528",
//        "home_address": "11, Kalpana Villas, Chandpole Kanpur",
//        "home_pincode": "197764",
//        "aadhar_card_file_list": [],
//        "pan_card_file_list": [],
//        "address_proof_file_list": [],
//        "relative_list": [],
//        "deleted_relative_list": [],
//        "farm_list": [],
//        "deleted_farm_list": [],
//        "vendor_payment_list": [],
//        "deleted_vendor_payment_list": [],
//        "createDate": "Mar 18, 2021 4:08:33 PM",
//        "updateDate": "Mar 18, 2021 4:08:33 PM"
//    }
//	]
//	
//	
//	transporter_data = 
//	[
//    {
//        "id": "ulpb-9800",
//        "name": "Dilip",
//        "surname": "Dixit",
//        "phone": "0778 0557034",
//        "vehicle_number": "MH-03-BG-4990",
//        "company_name": "",
//        "company_address": "",
//        "company_pincode": "",
//        "vendor_payment_list": [],
//        "deleted_vendor_payment_list": [],
//        "aadhar_card_file_list": [],
//        "pan_card_file_list": [],
//        "driving_licence_file_list": [],
//        "createDate": "Mar 18, 2021 4:55:12 PM",
//        "updateDate": "Mar 18, 2021 4:55:12 PM"
//    }
//	]
//	
	

