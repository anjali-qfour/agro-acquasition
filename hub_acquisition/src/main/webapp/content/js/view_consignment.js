
var consignment_data = [];

var transporter_f2h_invoice_data = [];

var transporter_f2h_invoice_id = "";




function init_view_consignment()
{
	
	
	
	
		


	$(".refreash_btn").click(function(){
		
		
		
		
		window.location = "user/view/consignment?i="+consignment_id;

		
		
	});
	
	
	Promise.all([get_consignment_by_id()]).then(function ([data]){
		
		consignment_data = data.consignment_list[0];
		
		if ((data.message=="error")||(data.message=="not_found")){
			
			draw_modal_centered("Error", "Something went wrong. Consignment Id is not found ");

		}
		else if (data.message=="success"){
			
			add_recieved_consignment_box();
	
			transporter_f2h_invoice_id = consignment_data.transporter_f2h_invoice_id;
			
			
			Promise.all([get_transporter_f2h_invoice_by_id()]).then(function ([data]){
				
				console.log(data);
				
				transporter_f2h_invoice_data = data.transporter_f2h_invoice_list[0];
				
				add_transporter_f2h_invoice_box();
				
			});
			
			
		}

	
	}); 
	
	
	
	
}









function add_transporter_f2h_invoice_box()
{
		
	var creation_date = new Date(transporter_f2h_invoice_data.createDate);

	var html = 
			 '   <li id="transporter_f2h_invoice_box" >  '  + 
			 '   	<!-- begin timeline-time -->  '  + 
			 '          <div class="timeline-time">  '  + 
			 '          	<span class="date">'+creation_date.getDate()+' '+months[creation_date.getMonth()]+' '+creation_date.getFullYear()+'</span>  '  + 
			 '              <span class="time">'+creation_date.getHours()+':'+creation_date.getMinutes()+':'+creation_date.getSeconds()+'.'+creation_date.getMilliseconds()+'</span>  '  + 
			 '          </div>  '  + 
			 '          <!-- end timeline-time -->  '  + 
			 '          <!-- begin timeline-icon -->  '  + 
			 '          <div class="timeline-icon ">  '  + 
			 '          	<a  class="" href="javascript:;">&nbsp;</a>  '  + 
			 '         	</div>  '  + 
			 '         	<!-- end timeline-icon -->  '  + 
			 '         	<!-- begin timeline-body -->  '  + 
			 '         	<div class="timeline-body shadow">  '  + 
			 '              <div class="timeline-header">  '  + 
			 '              	<a class="timeline-header-text d-flex justify-content-between " href="user/view/transporter_f2h_invoice?i='+transporter_f2h_invoice_data.id+'"> '  + 
			 
			 '				   		<span class="text-primary" > Transporter Invoice  </span>'  +
		     '				   		<span class=" small text-muted fw-lighter text-uppercase text-monospace ">  '+transporter_f2h_invoice_data.id+' </span>'  +
			 '   					<span class=" icon text-primary" >  '  + 
			 '   						<i class="fas fa-dolly"></i>								  '  + 
			 '  					</span>  ' +
			 '					</a>  '  +
	 	 	 
			 '              </div>  '  + 
			 '              <div class="timeline-content">  '  + 
		
			 '              	<div class="value-row mb-3">  '  + 
			 '              		<span class="variable-name">Transporter ID : </span>  '  + 
			 '              		<a  href="user/view/transporter_f2h?i='+transporter_f2h_invoice_data.transporter_f2h_id+'" class="variable-value text-uppercase text-monospace"> '+transporter_f2h_invoice_data.transporter_f2h_id+' </a>  '  + 
			 '              	</div>  '  + 
			 '              	  '  + 
			 '              	<div class="value-row mb-3">  '  + 
			 '              		<span class="variable-name"> Total amount including GST : </span>  '  + 
			 '              		<span class="variable-value">Rs. '+transporter_f2h_invoice_data.payment_amount+' </span>  '  + 
			 '              	</div>  '  + 
			 '                   '  + 

			 '              </div>  '  + 
			 '                '  + 
			 '              <div class="timeline-footer">  '  + 			 
			 '                '  + 
			 '                 <div  class="m-r-15 ">  '  + 
			 '                 	<i class="fa fa-circle fa-xs text-muted fa-fw fa-lg m-r-3"></i>   '  + 
			 '                 	Status : <span class="variable-value status_text text-capitalize"> Unknown </span>  '  + 
			 '                 	</div>  '  + 
			 '              </div>  '  + 
			 '                '  + 
			 '           	</div>  '  + 
			 '           <!-- end timeline-body -->  '  + 
			 '      		</li>  '  + 
			 '       		  '  + 
			 '     		  ' ; 
	
	
	
	$(".timeline").append($(html));
	
	
	if (transporter_f2h_invoice_data.status=="pending"){
		
		$("#transporter_f2h_invoice_box .timeline-footer i").attr("class","spinner-grow text-warning spinner-grow-sm mr-1 " )
		
		$("#transporter_f2h_invoice_box .timeline-icon a").attr("class","bg-warning");
		
		
	}
	else if (transporter_f2h_invoice_data.status=="initiated"){
		
		$("#transporter_f2h_invoice_box .timeline-footer i").attr("class","fa fa-circle fa-xs text-primary fa-fw fa-lg m-r-3 " )
		$("#transporter_f2h_invoice_box .timeline-icon a").attr("class","bg-primary");
		
	} 
	else if (transporter_f2h_invoice_data.status=="failed"){
		
		$("#transporter_f2h_invoice_box .timeline-footer i").attr("class","spinner-grow text-danger spinner-grow-sm mr-1 " )
		$("#transporter_f2h_invoice_box .timeline-icon a").attr("class","bg-danger");

		
	} 
	else if (transporter_f2h_invoice_data.status=="completed"){
		
		$("#transporter_f2h_invoice_box .timeline-footer i").attr("class","fa fa-circle fa-xs text-success fa-fw fa-lg m-r-3 " )
		$("#transporter_f2h_invoice_box .timeline-icon a").attr("class","bg-success");

		
	} 
	else if (transporter_f2h_invoice_data.status=="disputed"){
		
		$("#transporter_f2h_invoice_box .timeline-footer i").attr("class","spinner-grow text-danger spinner-grow-sm mr-1 " )
		$("#transporter_f2h_invoice_box .timeline-icon a").attr("class","bg-danger");
	} 
	
	
	$("#transporter_f2h_invoice_box .status_text").text(transporter_f2h_invoice_data.status);
	
	
	
	
	
	
	
}






function add_xray_instrument_box()
{
	
	var html = 
			 '   <li>  '  + 
			 '   <!-- begin timeline-time -->  '  + 
			 '     <div class="timeline-time">  '  + 
			 '     	<span class="date">24 February 2014</span>  '  + 
			 '         <span class="time">08:17</span>  '  + 
			 '     </div>  '  + 
			 '     <!-- end timeline-time -->  '  + 
			 '     <!-- begin timeline-icon -->  '  + 
			 '     <div class="timeline-icon ">  '  + 
			 '     	<a  class="bg-warning" href="javascript:;">&nbsp;</a>  '  + 
			 '    	</div>  '  + 
			 '    	<!-- end timeline-icon -->  '  + 
			 '    	<!-- begin timeline-body -->  '  + 
			 '    	<div class="timeline-body shadow">  '  + 
 			 '    		<div class="timeline-header-text d-flex justify-content-between "> '  + 			 
			 '		    	<a href="user/view/consignment/#consignment_details">Processing : X-Ray machine data</a>'  +
		     '				<span class=" small text-muted fw-lighter text-uppercase text-monospace ">  '+consignment_data.id+' </span>'  +
			 '   			<span class=" icon text-primary" >  '  + 
			 '   				<i class="fas fa-cogs"></i>								  '  + 
			 '  			</span>  ' +
			 '			</div>  '  +
			 '         <div class="timeline-content">  '  + 
			 '           '  + 
			 '           '  + 
			 '         	<span class="text-muted  fas fa-circle " role="status" aria-hidden="true"></span>  '  + 
			 '           '  + 
			 '         	<span class="variable-name ml-2 "> Not started </span>  '  + 
			 '        	    '  + 
			 '         	  '  + 
			 '         </div>  '  + 
			 '           '  + 
			 '         <div class="timeline-footer">  '  + 
			 '   <!-- 						            	<span class="fa-stack fa-fw stats-icon"> -->  '  + 
			 '   <!-- 					                  	<i class="fa fa-circle fa-xs fa-angle-left text-success text-inverse-lighter"></i> -->  '  + 
			 '   <!-- <!-- 					                  	<i class="fa fa-heart fa-stack-1x fa-inverse t-plus-1"></i> -->   '  + 
			 '   <!-- 					                  	</span> -->  '  + 
			 '           '  + 
			 '            <a href="javascript:;" class="m-r-15 ">  '  + 
			 '            	<i class="fa fa-circle fa-xs text-muted fa-fw fa-lg mr-2 "></i>   '  + 
			 '            	Status : <span class="variable-value mt-1"> Not Started </span>  '  + 
			 '            	</a>  '  + 
			 '         </div>  '  + 
			 '          '  + 
			 '     	</div>  '  + 
			 '     <!-- end timeline-body -->  '  + 
			 '   </li>  '  + 
			 '    ' ; 
	
	$(".timeline").append($(html));
	
	
	
}








function add_sorting_instrument_box()
{
	
	var html = 
			 '   <li>  '  + 
			 '   <!-- begin timeline-time -->  '  + 
			 '     <div class="timeline-time">  '  + 
			 '     	<span class="date">24 February 2014</span>  '  + 
			 '         <span class="time">08:17</span>  '  + 
			 '     </div>  '  + 
			 '     <!-- end timeline-time -->  '  + 
			 '     <!-- begin timeline-icon -->  '  + 
			 '     <div class="timeline-icon ">  '  + 
			 '     	<a  class="bg-warning" href="javascript:;">&nbsp;</a>  '  + 
			 '    	</div>  '  + 
			 '    	<!-- end timeline-icon -->  '  + 
			 '    	<!-- begin timeline-body -->  '  + 
			 '    	<div class="timeline-body shadow">  '  + 
			 '			<div class="timeline-header-text d-flex justify-content-between "> '  + 			 
			 '		    	<a href="user/view/consignment/#consignment_details">Processing : Sorting Machine data</a>'  +
		     '				<span class=" small text-muted fw-lighter text-uppercase text-monospace ">  '+consignment_data.id+' </span>'  +
			 '   			<span class=" icon text-primary" >  '  + 
			 '   				<i class="fas fa-cogs"></i>								  '  + 
			 '  			</span>  ' +
			 '			</div>  '  +
			 '         <div class="timeline-content">  '  + 
			 '           '  + 
			 '           '  + 
			 '         	<span class="text-muted fas fa-circle " role="status" aria-hidden="true"></span>  '  + 
			 '           '  + 
			 '         	<span class="variable-name ml-2 "> Not started </span>  '  + 
			 '        	    '  + 
			 '         	  '  + 
			 '         </div>  '  + 
			 '           '  + 
			 '         <div class="timeline-footer">  '  + 

			 '           '  + 
			 '            <a href="javascript:;" class="m-r-15 ">  '  + 
			 '            	<i class="fa fa-circle fa-xs text-muted fa-fw fa-lg mr-2 "></i>   '  + 
			 '            	Status : <span class="variable-value mt-1"> Not Started  </span>  '  + 
			 '            	</a>  '  + 
			 '         </div>  '  + 
			 '          '  + 
			 '     	</div>  '  + 
			 '     <!-- end timeline-body -->  '  + 
			 '   </li>  '  + 
			 '    ' ; 
	
	$(".timeline").append($(html));
	
	
	
}















function add_recieved_consignment_box()
{
	
	
	var creation_date = new Date(consignment_data.createDate);
	
	console.log(creation_date);
	
	
	var html = 
			 '   <li>  '  + 
			 '   	<!-- begin timeline-time -->  '  + 
			 '          <div class="timeline-time">  '  + 
			 '          	<span class="date">'+creation_date.getDate()+' '+months[creation_date.getMonth()]+' '+creation_date.getFullYear()+'</span>  '  + 
			 '              <span class="time">'+creation_date.getHours()+':'+creation_date.getMinutes()+':'+creation_date.getSeconds()+'.'+creation_date.getMilliseconds()+'</span>  '  + 
			 '          </div>  '  + 
			 '          <!-- end timeline-time -->  '  + 
			 '          <!-- begin timeline-icon -->  '  + 
			 '          <div class="timeline-icon ">  '  + 
			 '          	<a  class="bg-success" href="javascript:;">&nbsp;</a>  '  + 
			 '         	</div>  '  + 
			 '         	<!-- end timeline-icon -->  '  + 
			 '         	<!-- begin timeline-body -->  '  + 
			 '         	<div class="timeline-body shadow">  '  + 
			 '              <div class="timeline-header">  '  + 
			 '              	<a class="timeline-header-text d-flex justify-content-between " href="user/view/consignment?i='+consignment_data.id+'"> '  + 
			 
			 '				   		<span class="text-primary" > Received Consigment </span>'  +
		     '				   		<span class=" small text-muted fw-lighter text-uppercase text-monospace ">  '+consignment_data.id+' </span>'  +
			 '   					<span class=" icon text-primary" >  '  + 
			 '   						<i class="fas fa-dolly"></i>								  '  + 
			 '  					</span>  ' +
			 '					</a>  '  +
	 	 	 
			 '              </div>  '  + 
			 '              <div class="timeline-content">  '  + 
			 '              	<div class="value-row mb-3">  '  + 
			 '              		<span class="variable-name">Farm ID : </span>  '  + 
			 '              		<a href="user/view/farmer?i='+consignment_data.farmer_id+'" class="variable-value text-uppercase text-monospace"> '+consignment_data.farmer_id+' </a>  '  + 
			 '              	</div>  '  + 
		
			 '              	<div class="value-row mb-3">  '  + 
			 '              		<span class="variable-name">Transporter ID : </span>  '  + 
			 '              		<a  href="user/view/transporter_f2h?i='+consignment_data.transporter_f2h_id+'" class="variable-value text-uppercase text-monospace"> '+consignment_data.transporter_f2h_id+' </a>  '  + 
			 '              	</div>  '  + 
			 '              	  '  + 
			 '              	<div class="value-row mb-3">  '  + 
			 '              		<span class="variable-name">Product Type : </span>  '  + 
			 '              		<span class="variable-value">'+consignment_data.sub_type_id+' </span>  '  + 
			 '              	</div>  '  + 
			 '                   '  + 
			 '              	<div class="value-row mb-3">  '  + 
			 '              		<span class="variable-name">Weight : </span>  '  + 
			 '              		<span class="variable-value"> '+consignment_data.weight+' kg </span>  '  + 
			 '              	</div>  '  + 			 
			 '                   '  + 
			 '              </div>  '  + 
			 '                '  + 
			 '              <div class="timeline-footer">  '  + 			 
			 '                '  + 
			 '                 <div  class="m-r-15 ">  '  + 
			 '                 	<i class="fa fa-circle fa-xs text-success fa-fw fa-lg m-r-3"></i>   '  + 
			 '                 	Status : <span class="variable-value"> Completed </span>  '  + 
			 '                 	</div>  '  + 
			 '              </div>  '  + 
			 '                '  + 
			 '           	</div>  '  + 
			 '           <!-- end timeline-body -->  '  + 
			 '      		</li>  '  + 
			 '       		  '  + 
			 '     		  ' ; 
	
	
	
	$(".timeline").append($(html));
	
	
	
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








function get_consignment_by_id()
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
	    	"update_ts":(new Date(transporter_f2h_data.update_ts)),
	    	
			
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







