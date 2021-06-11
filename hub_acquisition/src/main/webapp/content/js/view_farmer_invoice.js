





var farmer_invoice_data;

var farmer_data;






function init_view_farmer_invoice()
{
	
	
	
	
	
	
	Promise.all([get_farmer_invoice_by_id()]).then(function ([data]){
		
		console.log(data);
		
		farmer_invoice_data = data.farmer_invoice_list[0];
		
		
		$("#farmer_invoice_id_input").val(farmer_invoice_data.id);
		
		
		$("#farmer_full_name_input").val(farmer_invoice_data.full_name);
		
		
		$("#farmer_phone_input").val(farmer_invoice_data.phone);
		
		
		
		_final_amount = parseFloat( farmer_invoice_data.rate ) * parseFloat( farmer_invoice_data.weight );



					
		var html =  
					$(
						'<div class="d-flex px-4 py-3 mb-2 " style="min-height:250px;">'+
						
							'<div class="mr-4">'+
								'<small>Consigment Id</small>'+
								
								'<div class="text-uppercase text-monospace text-dark">'+
									'<small>'+farmer_invoice_data.consignment_id +'</small>'+
								'</div>'+
								
							'</div>'+
							
							
							'<div class="mr-4  ">'+
								'<small>Product type</small>'+
								'<div class="text-uppercase text-monospace text-dark  ">'+
									'<small>'+
										farmer_invoice_data.category_id+":"+
										farmer_invoice_data.type_id+":"+
										farmer_invoice_data.sub_type_id+
									'</small>'+
								'</div>'+
								
							'</div>'+
							
							
							'<div class="mr-4">'+
								'<small>Rate</small>'+
								'<div class="text-uppercase  text-dark   ">'+
									'<small>'+farmer_invoice_data.rate+'</small>'+
								'</div>'+
								
							'</div>'+
							
							
							'<div class="mr-4  ">'+
								'<small> Weight(kg) </small>'+
								'<div class="text-uppercase text-monospace text-dark  ">'+
									'<small>'+farmer_invoice_data.weight+'</small>'+
								'</div>'+
								
							'</div>'+
							
							'<div class="  ml-auto text-end">'+
								
								'<div class="d-flex  flex-column ">'+
									'<div style="text-align: right; " ><small class="">Price </small></div>'+
									'<div style="text-align: right; " class="text-capitalize  text-dark  ">'+
										"Rs. "+_final_amount+
									'</div>'+
								'</div>'+
								
							'</div>'+
						'</div>'
					)
					;
					
	  $(".invoice_details").append(html);
					
					
	  total_amount = parseFloat(farmer_invoice_data.rate) *  parseFloat(farmer_invoice_data.weight);

	  gst_total_amount = parseFloat ( parseFloat(total_amount*0.18).toFixed(2) );

	  final_amount = parseFloat(total_amount+gst_total_amount).toFixed(2);
			
	
						
		$(	'<div class=" px-4 ">'+
				'<div class="d-flex mb-3  mt-5 pt-4  border-top text-dark ">'+
					'<div class="  "> Total amount </div>'+
					'<div class="  ml-auto">'+
						"Rs. "+total_amount+
					' </div>'+					
				'</div>'+
				'<div class="d-flex mb-3 text-dark ">'+
					'<div class="  "> GST 18% </div>'+
					'<div class="  ml-auto">'+
						"Rs. "+(total_amount*0.18)+
					' </div>'+					
				'</div>'+
				'<div class="d-flex mb-3 pt-3 text-dark " style="border-top-style: dotted; border-top-width:1px; ">'+
					'<div class="  font-weight-bold "> Final amount </div>'+
					'<div class="  ml-auto font-weight-bold">'+
						"Rs. "+final_amount+
					' </div>'+					
				'</div>'+
			'</div>'
		)
		.appendTo(".invoice_details");
		

	
	}); 
	
	
	
	
	
	
	
	$(".print_invoice_btn").click(function(){
		
		
		print_invoice_btn_click();
		
		
	});
	
	
	
	
	


}









function print_invoice_btn_click()
{
	
	js_doc = new jsPDF();
	
	var gro_logo_invoice_DataURL = ""; 	
	

	
	
	
	html_str = 
				'<div id="html_pdf" class=" p-5 " style="background-color:white;" >'+
				
				
					'<div class="d-flex mb-5 justify-content-center " style=" padding-bottom:50px; border-bottom: 1px solid black;" >'+
						'<div class="h2 text-uppercase font-weight-bold text-right" > VENDOR INVOICE </div>'+
					'</div>'+
					
					'<div class=" d-flex  flex-column mx-1">'+
				   	
		
		
						'<div class="d-flex justify-content-between mb-3  px-3 py-2" style=" border-left: 5px solid black; border-right: 5px solid black;" >'+
						
							'<div class=" ">'+
								'<div class=" text-dark" >Name</div>'+
								'<div class="  h5 text-dark font-weight-bold " >'+farmer_invoice_data.full_name +'</div>'+
							'</div>'+
							'<div class=" ">'+
								'<div class=" text-dark text-right" >Date</div>'+
								'<div class=" h5 text-dark text-right font-weight-bold " >'+new Date(farmer_invoice_data.createDate).toLocaleDateString()+'</div>'+
							'</div>'+
							
						'</div>'+
						
						'<div class=" mb-4  px-3 " style=" border-left: 5px solid black; ">'+
						
							'<div class=" invoice_farmer_address">'+
								'<div class=" text-dark" >Address</div>'+
								'<div class=" h5 text-dark text-left font-weight-bold " ></div>'+
							'</div>'+
						
						'</div>'+
					
					
					'</div>'+
					
					
					
					
					
					
					$(".invoice_details_row").html()+
					
					
			    '</div>'				
				;
	
	
	
	
	
	html_elem = $(html_str).hide().appendTo("body") ;
	

	html_elem.css({ "background-color" : "white"});
	
	
	
	
	
	Promise
		.all([
				get_farmer_from_consignment_id(),
				getBase64Image("content/images/Gro_logo_tagline_invoice.png", "image/png")
		])
        .then(([_farmer_data,gro_logo_invoice_DataURL]) => {
			
			farmer_data = _farmer_data.farmer_list[0];
			
			$(".invoice_farmer_address .h5").html(farmer_data.home_address +". "+farmer_data.home_pincode);
			
			$("#html_pdf .printout_row").addClass("m-1");
			
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
		
		
		
	
}





function print_invoice_btn_click1()
{
	
//	js_doc = new jsPDF('p', 'mm', [500, 500]);	
	
	js_doc = new jsPDF();
	
	var gro_logo_invoice_DataURL = ""; 	
	

	
	
	html_str = 
				'<div id="html_pdf" class=" p-5 " style="background-color:white;" >'+
				
				
					'<div class="d-flex mb-5 justify-content-center " >'+
						'<div class="h2 text-uppercase font-weight-bold text-right" > INVOICE </div>'+
					'</div>'+
				   	
		
					'<div class="d-flex justify-content-between mb-5 mx-1 px-3 py-2" style="background:#6cb3df" >'+
					
						'<div class=" ">'+
							'<div class=" text-dark" >Name</div>'+
							'<div class="  h5 text-dark font-weight-bold " >'+farmer_invoice_data.full_name +'</div>'+
						'</div>'+
						'<div class=" ">'+
							'<div class=" text-dark text-right" >Date</div>'+
							'<div class=" h5 text-dark text-right font-weight-bold " >'+new Date(farmer_invoice_data.createDate).toLocaleDateString()+'</div>'+
						'</div>'+
						
					'</div>'+
					
					
					$(".invoice_details_row").html()+
					
					
			    '</div>'				
				;
	
	
	
	
	
	html_elem = $(html_str).hide().appendTo("body") ;
	

	html_elem.css({ "background-color" : "white"});
	
	
	
	Promise
		.all([getBase64Image("content/images/Gro_logo_tagline_invoice.png", "image/png")])
        .then(([gro_logo_invoice_DataURL]) => {
			
			
			js_doc.addHTML($(html_elem.show()) , 3, 3, function(){
				
				$("#html_pdf").remove();
				
//				console.log(gro_logo_invoice_DataURL);
				
				js_doc.addImage(gro_logo_invoice_DataURL, 'PNG', 10, 5, 
									20, 20,
									"gro_invoice", "NONE", 0
									
									);
				
			    js_doc.autoPrint();
				
				window.open(js_doc.output('bloburi'));
						
			});
			
	
	
	
	});
	
	
	
}














	



function get_farmer_invoice_by_id(consignment_id)
{
    var deferred = new $.Deferred();
    
	
	        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/farmer_invoice/get/by/id",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : farmer_invoice_id,

	    	
	    
			
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












function get_farmer_from_consignment_id(consignment_id)
{
    var deferred = new $.Deferred();
    
	
	        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/consignment/get/farmer",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"id" : farmer_invoice_data.consignment_id,
			
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







