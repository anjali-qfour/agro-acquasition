

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
			
			
			$(".product_name").text(transporter_f2h_invoice_data.product_type);			
			$(".weight").text(transporter_f2h_invoice_data.weight);			
			$(".rate").text(transporter_f2h_invoice_data.rate);
			
			
			
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







