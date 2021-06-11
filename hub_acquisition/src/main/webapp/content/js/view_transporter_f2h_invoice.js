

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

var final_amount = 0;

var farmer_map = {};


function init_view_transporter_f2h_invoice()
{
	
	
	$(".update_btn").click(function(){
		
		
		console.log("add_save");
		
		update_btn_click();
		
		
		
	});
	
	
	
	
	
	$(".generate_xml_btn").click(function(){
		
		
		console.log("generate_xml_btn");
		
		generate_xml();
		
		
	});
	
	
	
	
	
	$(".print_invoice_btn").click(function(){
		
		
		print_invoice_btn_click();
		
		
	});
	
	
	
	
	
	
	
	
	Promise.all([get_transporter_f2h_invoice_by_id()]).then(function ([data]){
		
		
		transporter_f2h_invoice_data = data.transporter_f2h_invoice_list[0];
		
		if ((data.message=="error")||(data.message=="not_found")){
			
			draw_modal_centered("Error","Something went wrong. Farmer Id is not found ");

		}
		else{
			
			
			$("#transporter_f2h_id_input").val(transporter_f2h_invoice_data.id);			
			$("#transporter_f2h_full_name_input").val(transporter_f2h_invoice_data.full_name);			
			$("#transporter_f2h_phone_input").val(transporter_f2h_invoice_data.phone);			

			
			$("#status_select option[data-id="+transporter_f2h_invoice_data.status+"]").attr('selected', 'selected');
			
			
			if(typeof transporter_f2h_invoice_data.transporterF2HInvoiceList != "undefined"){
				
				draw_multi_invoice();
			}
			else{
				
				draw_single_invoice();
			}
	
			
			
		}

	
	}); 
	
	
}







function print_invoice_btn_click()
{
	
//	js_doc = new jsPDF('p', 'mm', [500, 500]);	
	
	js_doc = new jsPDF();
	
	var gro_logo_invoice_DataURL = ""; 	
	

	
	
	html_str = 
				'<div id="html_pdf" class=" p-5 " style="background-color:white;" >'+
				
					'<div class="d-flex mb-5 justify-content-center " >'+
						'<div class="h2 text-uppercase font-weight-bold text-right" > TRANSPORTER INVOICE </div>'+
					'</div>'+
				   	
		
					'<div class="d-flex justify-content-between mb-5  px-3 py-2 " style="border-left: 5px solid black; border-right: 5px solid black;" >'+
					
						'<div class=" ">'+
							'<div class=" text-dark" >Name</div>'+
							'<div class="  h5 text-dark font-weight-bold " >'+transporter_f2h_invoice_data.full_name +'</div>'+
						'</div>'+
						'<div class=" ">'+
							'<div class=" text-dark text-right" >Date</div>'+
							'<div class=" h5 text-dark text-right font-weight-bold " >'+new Date(transporter_f2h_invoice_data.createDate).toLocaleDateString()+'</div>'+
						'</div>'+
						
					'</div>'+
					
					
					$(".invoice_details_row").html()+
					
					
			    '</div>'				
				;
	
	
	
	
	
	html_elem = $(html_str).hide().appendTo("body") ;
	

	html_elem.css({ "background-color" : "white"});
	
	
	console.log(html_elem);




	
	Promise
		.all([				
				getBase64Image("content/images/Gro_logo_tagline_invoice.png", "image/png")
		])
        .then(([gro_logo_invoice_DataURL]) => {
			
			
			
			
			
//			$("#html_pdf .printout_row").addClass("m-1");
			
			js_doc.addHTML($(html_elem.show()) , 3, 3, function(){
				
				$("#html_pdf").remove();
								
				js_doc.addImage(gro_logo_invoice_DataURL, 'PNG', 10, 5, 
									20, 20,
									"gro_invoice", "NONE", 0
									
									);
				
			    js_doc.autoPrint();
				
				window.open(js_doc.output('bloburi'));
						
			});
	
	
		});
	
//	 
//	
//	Promise
//		.all([getBase64Image("content/images/Gro_logo_tagline_invoice.png", "image/png")])
//        .then(([gro_logo_invoice_DataURL]) => {
//			
//			
//			js_doc.addHTML($(html_elem.show()) , 3, 3, function(){
//				
////				$("#html_pdf").remove();
//				
////				console.log(gro_logo_invoice_DataURL);
//				
//				js_doc.addImage(gro_logo_invoice_DataURL, 'PNG', 10, 5, 
//									20, 20,
//									"gro_invoice", "NONE", 0
//									
//									);
//				
//			    js_doc.autoPrint();
//				
//				window.open(js_doc.output('bloburi'));
//						
//			});
//			
//	
//	
//	
//	});
	
	

	
}








function draw_single_invoice()
{
	
	
	
	
	Promise.all([get_consignment_by_id(transporter_f2h_invoice_data.consignment_id)])
			.then(function ([consignment_data]){
				
				console.log(consignment_data);

				var data_elem = transporter_f2h_invoice_data;
				
				
				
					
				 _final_amount = -1;
			
				var _rate_type_label = "";
				
				if (data_elem.rate_type=="weight"){
					
					_final_amount = parseFloat(data_elem.rate)*parseFloat(data_elem.rate_amount);
					
					_rate_type_label = "Weight(kg)";
					
					console.log(_final_amount);
					
				}
				else if(data_elem.rate_type=="unit"){
					
					_final_amount = parseFloat(data_elem.rate)*parseFloat(data_elem.rate_amount);
					_rate_type_label = " Units";
				}
				else if(data_elem.rate_type=="unfront"){
					
					_rate_type_label = "Upfront";
					
					_final_amount = parseFloat(data_elem.rate);
				}
				
				final_amount = final_amount + _final_amount;
				
				
				
				
				
				
				var html =  
							$(
								'<div class="d-flex mb-5 pb-5 ">'+
								
									'<div class="mr-2">'+
										'<small> &nbsp; </small>'+
										'<small>'+
											'<div class="text-uppercase text-monospace text-dark">'+
												(1)+	
											'</div>'+
										'</small>'+
									'</div>'+
								
									'<div class="mr-4">'+
										'<small>Consigment Id</small>'+
										
										'<div class="text-uppercase text-monospace text-dark">'+
											'<small>'+data_elem.consignment_id +'</small>'+
										'</div>'+
										
									'</div>'+
									'<div class="mr-4  ">'+
										'<small>Farmer Name</small>'+
										'<div class="text-uppercase    text-dark  ">'+
											'<small>'+farmer_map[data_elem.consignment_id]+'</small>'+
										'</div>'+
										
									'</div>'+
									
									'<div class="mr-4  ">'+
										'<small>Product type</small>'+
										'<div class="text-uppercase text-monospace text-dark  ">'+
											'<small>'+data_elem.product_type+'</small>'+
										'</div>'+
										
									'</div>'+
									'<div class="mr-4  ">'+
										'<small> Weight(kg) </small>'+
										'<div class="text-uppercase text-monospace text-dark  ">'+
											'<small>'+data_elem.weight+'</small>'+
										'</div>'+
										
									'</div>'+
									'<div class="mr-4">'+
										'<small>Rate Type</small>'+
										'<div class="text-uppercase  text-dark   ">'+
											'<small>'+data_elem.rate_type+'</small>'+
										'</div>'+
										
									'</div>'+
									'<div class="mr-4">'+
										'<small>Rate</small>'+
										'<div class="text-uppercase  text-dark   ">'+
											'<small>'+data_elem.rate+'</small>'+
										'</div>'+
										
									'</div>'+
									'<div class="mr-4   ">'+
										'<small>'+_rate_type_label+'</small>'+
										'<div class="text-uppercase  text-dark   ">'+
											'<small>'+data_elem.rate_amount+'</small>'+
										'</div>'+
									'</div>'+
									'<div class="mr-2 pl-2  ml-auto text-end">'+
										
										'<div class="d-flex  flex-column ">'+
											'<div style="text-align: right; " ><small class="">Price </small></div>'+
											'<div class="text-capitalize  text-dark  ">'+
												"Rs. "+_final_amount+
											'</div>'+
										'</div>'+
										
									'</div>'+
								'</div>'
							)
				;
				
				$(".invoice_details").append(html);
					
		

					
		
				$(
					'<div class="d-flex mb-3  mt-5 pt-4 border-top text-dark ">'+
						'<div class="mr-2 pl-2 ml-2 "> Total amount </div>'+
						'<div class="mr-2 ml-auto">'+
							"Rs. "+final_amount+
						' </div>'+					
					'</div>'+
					'<div class="d-flex mb-3 text-dark ">'+
						'<div class="mr-2 pl-2 ml-2 "> GST 18% </div>'+
						'<div class="mr-2 ml-auto">'+
							"Rs. "+(final_amount*0.18)+
						' </div>'+					
					'</div>'+
					'<div class="d-flex mb-3 pt-3 text-dark " style="border-top-style: dotted; border-top-width:1px; ">'+
						'<div class="mr-2 pl-2 ml-2 font-weight-bold "> Final amount </div>'+
						'<div class="mr-2 ml-auto font-weight-bold">'+
							"Rs. "+(final_amount+(final_amount*0.18))+
						' </div>'+					
					'</div>'
				)
				.appendTo(".invoice_details");

	});
	
	
	

}












function draw_multi_invoice()
{
	
	
	var promise_list = [];
	
	for (var i=0; i<transporter_f2h_invoice_data.transporterF2HInvoiceList.length; i++){
			
			promise_list.push(
					
					get_consignment_by_id(transporter_f2h_invoice_data.transporterF2HInvoiceList[i].consignment_id)
				
				);
			
	}
		
	
	
	
	
	Promise.all(promise_list).then(function (consignment_list){
		
		console.log(consignment_list);
		
		
		/**
			Step 1 First for loop to get farmers name
		*/
		
		 
		
		for (var i=0; i<consignment_list.length; i++){
			
			console.log(consignment_list[i].consignment_list[0]);
			
			var _consignment_id = consignment_list[i].consignment_list[0].id;
			
			var _farmer_full_name = consignment_list[i].consignment_list[0].farmer_full_name;
			
			farmer_map[_consignment_id] = _farmer_full_name;
			
			
			if (i+1==consignment_list.length){
				
				
			/**
				Step 2 - Interate over transporter invoices
			*/
				
				for (var j=0; j<transporter_f2h_invoice_data.transporterF2HInvoiceList.length; j++){
					
					var data_elem = transporter_f2h_invoice_data.transporterF2HInvoiceList[j];

					
					 _final_amount = -1;
				
					var _rate_type_label = "";
					
					if (data_elem.rate_type=="weight"){
						
						_final_amount = parseFloat(data_elem.rate)*parseFloat(data_elem.rate_amount);
						
						_rate_type_label = "Weight(kg)";
						
						console.log(_final_amount);
						
					}
					else if(data_elem.rate_type=="unit"){
						
						_final_amount = parseFloat(data_elem.rate)*parseFloat(data_elem.rate_amount);
						_rate_type_label = " Units";
					}
					else if(data_elem.rate_type=="unfront"){
						
						_rate_type_label = "Upfront";
						
						_final_amount = parseFloat(data_elem.rate);
					}
					
					final_amount = final_amount + _final_amount;
					
					
					
					
					
					
					var html =  
								$(
									'<div class="d-flex mb-2  ">'+
									
										'<div class="mr-2">'+
											'<small> &nbsp; </small>'+
											'<small>'+
												'<div class="text-uppercase text-monospace text-dark">'+
													(j+1)+	
												'</div>'+
											'</small>'+
										'</div>'+
									
										'<div class="mr-4">'+
											'<small>Consigment Id</small>'+
											
											'<div class="text-uppercase text-monospace text-dark">'+
												'<small>'+data_elem.consignment_id +'</small>'+
											'</div>'+
											
										'</div>'+
										'<div class="mr-4  ">'+
											'<small>Farmer Name</small>'+
											'<div class="text-uppercase    text-dark  ">'+
												'<small>'+farmer_map[data_elem.consignment_id]+'</small>'+
											'</div>'+
											
										'</div>'+
										
										'<div class="mr-4  ">'+
											'<small>Product type</small>'+
											'<div class="text-uppercase text-monospace text-dark  ">'+
												'<small>'+data_elem.product_type+'</small>'+
											'</div>'+
											
										'</div>'+
										'<div class="mr-4  ">'+
											'<small> Weight(kg) </small>'+
											'<div class="text-uppercase text-monospace text-dark  ">'+
												'<small>'+data_elem.weight+'</small>'+
											'</div>'+
											
										'</div>'+
										'<div class="mr-4">'+
											'<small>Rate Type</small>'+
											'<div class="text-uppercase  text-dark   ">'+
												'<small>'+data_elem.rate_type+'</small>'+
											'</div>'+
											
										'</div>'+
										'<div class="mr-4">'+
											'<small>Rate</small>'+
											'<div class="text-uppercase  text-dark   ">'+
												'<small>'+data_elem.rate+'</small>'+
											'</div>'+
											
										'</div>'+
										'<div class="mr-4   ">'+
											'<small>'+_rate_type_label+'</small>'+
											'<div class="text-uppercase  text-dark   ">'+
												'<small>'+data_elem.rate_amount+'</small>'+
											'</div>'+
										'</div>'+
										'<div class="mr-2 pl-2  ml-auto text-end">'+
											
											'<div class="d-flex  flex-column ">'+
												'<div style="text-align: right; " ><small class="">Price </small></div>'+
												'<div class="text-uppercase  text-dark  ">'+
													_final_amount+
												'</div>'+
											'</div>'+
											
										'</div>'+
									'</div>'
								)
					;
					
					$(".invoice_details").append(html);
					
		
				
		
					if (j+1==transporter_f2h_invoice_data.transporterF2HInvoiceList.length){
						
									
						
						/**
							Step 3 - Final Summary and calculations 
						*/
							
						
						
						$(
							'<div class="d-flex mb-3  mt-5 pt-4 border-top text-dark ">'+
								'<div class="mr-2 pl-2 ml-2 "> Total amount </div>'+
								'<div class="mr-2 ml-auto">'+
									final_amount+
								' </div>'+					
							'</div>'+
							'<div class="d-flex mb-3 text-dark ">'+
								'<div class="mr-2 pl-2 ml-2 "> GST 18% </div>'+
								'<div class="mr-2 ml-auto">'+
									(final_amount*0.18)+
								' </div>'+					
							'</div>'+
							'<div class="d-flex mb-3 pt-3 text-dark " style="border-top-style: dotted; border-top-width:1px; ">'+
								'<div class="mr-2 pl-2 ml-2 font-weight-bold "> Final amount </div>'+
								'<div class="mr-2 ml-auto font-weight-bold">'+
									(final_amount+(final_amount*0.18))+
								' </div>'+					
							'</div>'
						)
						.appendTo(".invoice_details");
						
					}
					
				}
		
				
				
				
				
			}

			

		}
		
	});
	
	
	
	
	
}










function generate_xml()
{
	
	var xmlDocument = $.parseXML('<root />');	
	var xmlObj = xmlDocument.createElement('invoice_id');
	xmlObj.appendChild(document.createTextNode(transporter_f2h_invoice_data.id));	
	xmlDocument.documentElement.appendChild(xmlObj);	
	
	xmlObj = xmlDocument.createElement('full_name');
	xmlObj.appendChild(document.createTextNode(transporter_f2h_invoice_data.full_name));	
	xmlDocument.documentElement.appendChild(xmlObj);	
	
	
	
	xmlObj = xmlDocument.createElement('phone');
	xmlObj.appendChild(document.createTextNode(transporter_f2h_invoice_data.phone));	
	xmlDocument.documentElement.appendChild(xmlObj);	
	
	
	
	xmlObj = xmlDocument.createElement('status');
	xmlObj.appendChild(document.createTextNode(transporter_f2h_invoice_data.status));	
	xmlDocument.documentElement.appendChild(xmlObj);	
	
	
	
	xmlObj = xmlDocument.createElement('rate');
	xmlObj.appendChild(document.createTextNode(transporter_f2h_invoice_data.rate));	
	xmlDocument.documentElement.appendChild(xmlObj);	
	
	
	
	xmlObj = xmlDocument.createElement('product_name');
	xmlObj.appendChild(document.createTextNode(transporter_f2h_invoice_data.product_name));	
	xmlDocument.documentElement.appendChild(xmlObj);	
	
	
	
	
	xmlObj = xmlDocument.createElement('rate');
	xmlObj.appendChild(document.createTextNode(transporter_f2h_invoice_data.rate));	
	xmlDocument.documentElement.appendChild(xmlObj);	
	
	
	
	
	
	console.log(xmlDocument);




	var link = document.createElement('a');
	
	link.setAttribute('href', 'data:application/download,' + encodeURIComponent(
		'<?xml version="1.0" encoding="UTF-8"?>'
		+ (new XMLSerializer()).serializeToString(xmlDocument)
		));
	
	link.setAttribute('download', ""+ transporter_f2h_invoice_data.id+"-"+ transporter_f2h_invoice_data.full_name.replace(" ","_") +".xml");
	link.click();



}













function update_btn_click()
{
	
	
	$(".update_btn span i").attr("class", "spinner-border spinner-border-sm d-flex mt-1");


	
	transporter_f2h_invoice_data.status = $("#status_select").find(":selected").attr("data-id")
	
	

	
	
	Promise.all([update_transporter_f2h_invoice()]).then(function ([data]){
		
		
		

		if (data.message=="error"){
			
			$(".update_btn span i").attr("class", "fas fa-bug text-danger");
			
		}
		else if (data.message=="not_found"){
					
			
			$(".update_btn span i").attr("class", "fas fa-exclamation text-danger");
			
			
		}
		else if (data.message=="success"){
			
			console.log(transporter_f2h_invoice_data);
			
			window.location = "user/view/transporter_f2h_invoice?i="+transporter_f2h_invoice_data.id;

			
		}
	
	}); 
					
	
	
}








function get_transporter_f2h_invoice_by_id()
{
    var deferred = new $.Deferred();
    
	
	        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/transporter_f2h_invoice/get/by/id",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : transporter_f2h_invoice_id,

			
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








function update_transporter_f2h_invoice()
{
    var deferred = new $.Deferred();
    

	console.log("set_transporter_f2h");
	
	
	        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/transporter_f2h_invoice/update",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : transporter_f2h_invoice_data.id,
			"consignment_id" : transporter_f2h_invoice_data.consignment_id,
			"transporter_f2h_id" : transporter_f2h_invoice_data.transporter_f2h_id,
	    	"full_name":  transporter_f2h_invoice_data.full_name,
	    	"phone":transporter_f2h_invoice_data.phone,
	    	"rate":transporter_f2h_invoice_data.rate,
	    	
//	    	"units":transporter_f2h_invoice_data.units,
	    	"weight":transporter_f2h_invoice_data.weight,	    		    	
	    	"payment_amount":transporter_f2h_invoice_data.payment_amount,
			"product_type":transporter_f2h_invoice_data.product_type,
			"status":transporter_f2h_invoice_data.status,
			
			"createDate":new Date(transporter_f2h_invoice_data.createDate),
	    	
			
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









function get_consignment_by_id(consignment_id)
{
    var deferred = new $.Deferred();
    
	
	        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/consignment/get/by/id",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : consignment_id,

	    	
	    
			
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




