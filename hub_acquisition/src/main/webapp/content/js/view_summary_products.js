

var product_info_list = [];

var product_info_map = {};


var type_info = {}

var sub_type_info = {}

var selected_date;



var consignment_list = [];

var consignment_map = {};



var product_total_weight_map = {};



function init_search_summary_products()
{
	


	selected_date = new Date(parseInt(getUrlParameter("d"))) 
		
	console.log(selected_date);
	
	if (isNaN(selected_date.getTime())){
		
		window.location="user/search/product_pricing";
				
		
	}
						
					
	$("#date_month_label").text(selected_date.getDate()+" "+ months[ selected_date.getMonth() ]  );
	
	$("#year_label").text( selected_date.getFullYear()  );
	
	$("#days_label").text(  days[ selected_date.getDay() ]  );	
	
	
	
	
	Promise
		.all([get_consignment_by_date(),get_all_product_info()])
        .then((data) => {
			
			console.log("step 1");
	
			console.log(data);	
			
			product_info_list = data[1].product_info_list;

			
			
			for (var i=0; i<product_info_list.length; i++){
				
//				add_product_info(product_info_list[i]);
				
				
				product_info = product_info_list[i];

				
				
				if (typeof product_info_map[product_info.category_id] == "undefined"){
					
					product_info_map[product_info.category_id] = {};
				
				}
				
				
				if (typeof product_info_map[product_info.category_id][product_info.type_id] == "undefined"){
					
					product_info_map[product_info.category_id][product_info.type_id] = {};
				
				}
				
				
				if (typeof product_info_map[product_info.category_id][product_info.type_id][product_info.sub_type_id] == "undefined"){
					
					product_info_map[product_info.category_id][product_info.type_id][product_info.sub_type_id] = product_info;
				
				}
				
				
				if (i+1==product_info_list.length){
					
					load_product_list();
					
				}
				
				
				
			}	
			
			return data[0];
	
		})
		.then((data) => {
			
			
			console.log("step 2");
			
			console.log(data);	
			
			
			consignment_list = data.consignment_list;
			
			
			load_info();
	    	

	    });
		
		

	

	
	
}















function load_info()
{
	
	for (var i=0; i<consignment_list.length; i++){
		
		data_elem = consignment_list[i];
		console.log(data_elem);
		
		
		product_id = data_elem.sub_type_id  +":"+ data_elem.type_id +":"+ data_elem.category_id;
		console.log(product_id);
		
		console.log(data_elem.weight);
		
		
		console.log($('div[data-product_id="'+product_id+'"]'));
		
		
		
		if (typeof product_total_weight_map[product_id]=="undefined"){
			
			product_total_weight_map[product_id] = parseFloat (data_elem.weight);
			
		}
		else{
			
			product_total_weight_map[product_id] = product_total_weight_map[product_id] + parseFloat (data_elem.weight);
		}
		
		
		$('div[data-product_id="'+product_id+'"] .product_process_info')
			.html(
//				'<div class="d-flex  justify-content-between ">'+
					'<div class="d-flex flex-column  ">'+  
						'<small class="text-secondary" > Total Acquired Weight </small>'+
						'<div class="text-dark">'+
							product_total_weight_map[product_id]+
						'</div>'+
					'</div>'+
					'<div class="d-flex flex-column  ">'+  
						'<small class="text-secondary" > Completed Processing Weight </small>'+
						'<div class="text-dark"> Unknown'+
							
						'</div>'+
					'</div>'+
					
					'<div class="d-flex flex-column  ">'+  
						'<small class="text-secondary" >Wastage Weight </small>'+
						'<div class="text-dark"> Unknown'+
							
						'</div>'+
					'</div>'+
					'<div class="d-flex flex-column  ">'+  
						'<small class="text-secondary" > Final Processed Weight </small>'+
						'<div class="text-dark"> Unknown'+
							
						'</div>'+
					'</div>'
					
//				'</div>'
			
			
			);

		
		
		
		
	}
	
	
	
	
}















function load_product_list()
{
	
	var cat_array = Object.keys(product_info_map);
	
	
	for (var i = 0; i<cat_array.length; i++){
		
		draw_categories(cat_array[i]);
		
		
		var type_array = Object.keys(product_info_map[cat_array[i]]);
		
//		console.log(type_array);
		
		for (var j = 0; j<type_array.length; j++){
			
			draw_types(cat_array[i],type_array[j]);
			
			var sub_type_array = Object.keys(product_info_map[cat_array[i]][type_array[j]]);
			
//			console.log(sub_type_array);
			
			for (var k = 0; k<sub_type_array.length; k++){
				
				
				draw_sub_types(cat_array[i],type_array[j],sub_type_array[k]);
				
				
			}
				
				
		}
		
		
		
	}
	
	
	
	
	
}








function draw_sub_types(category_id,type_id,sub_type_id)
{
	
	console.log(product_info_map[category_id][type_id][sub_type_id]);
	
	
	var _product_info = product_info_map[category_id][type_id][sub_type_id];
	
	
	$("[data-type_id='"+type_id+"'] .product_list_ul").append(
		
		$(
			'<div class="list-group-item list-group-item-action border rounded-lg px-3 py-2 m-1 text-dark" data-product_id="'+_product_info.id+'">'+
				'<div class="d-flex border-bottom " data-type_id='+sub_type_id+'>'+				
				'	<div class="  card-title text-capitalize flex-grow-1 align-self-center mt-2">'+sub_type_id+'</div>'+
				'	<div class=" badge text-monospace  bg-primary fw-bolder align-self-center">'+_product_info.name +'</div>'  +
				'</div>'+
				'<div class="d-flex mt-2 justify-content-between  product_process_info "> '+
				'</div>'+
			'</div>'
		)
		
	);
	
}








function draw_types(category_id,type_id)
{
	
	console.log(category_id);
	
	console.log(type_id);
	
	
	console.log($("[data-category_id='"+category_id+"']  "));
	
	
	$("[data-category_id='"+category_id+"'] .card-body ").append(
		
		$(
			'<div class="mt-4 text-primary" data-type_id='+type_id+'>'+				
			'	<h5 class="card-title text-capitalize  border-bottom">'+type_id+'</h5>'+
			'	<ul class="list-group list-group-flush product_list_ul"></ul>'+
			'</div>'
		)
		
	);
	
	
	
	
}





function draw_categories(category_id)
{
	
	$(".container-fluid").append(
		
		$(
			'<div class="row " data-category_id='+category_id+'>'+
			'	<div class="col">'+							
			'		<div class="card shadow mb-4">'+
			'			<div class="card-body">'+
			'				<h4 class="card-title text-capitalize">'+category_id+'</h4>'+
											
			'			</div>'+								
			'		</div>'+
			'	</div>'+
			'</div>'
		)
//		.data("category_id",category_id)
		
	);
	
}









function add_product_info(product_info)
{
	
//	console.log(product_info);
	
	
	var html = 
		 '   <a href="user/view/product_info?i='+product_info.id+'" class="list-group-item list-group-item-action  border-bottom  mb-5 border-info" >  '  + 
		 '     '  + 
		 '      '  + 
		 '       <div class="d-flex flex-row w-100 justify-content-between border-bottom mb-4">  '  + 
		 '   	    <h4 class="mb-1 text-dark "> '+product_info.category_name +'</h4>  '  + 
		 '   	    <div class="d-flex flex-column bd-highlight mr-3">  '  + 
		 '   		  <small class=" pb-2">Type</small>  '  + 
		 '   		  <h6 class="text-dark  font-weight-bold ">'+product_info.type_name +'</h6>											    '  + 
		 '   		</div>  '  + 
		 '   	      '  + 
		 '   	      '  + 
		 '   	      '  + 
		 '   	    <div class="d-flex flex-column bd-highlight mr-5">  '  + 
		 '   		  <small class="  pb-2">Sub Type</small>  '  + 
		 '   		  <h6 class="text-monospace  text-dark  ">'+product_info.sub_type_name +'</h6>											    '  + 
		 '   		</div>  '  + 
		 '       </div>  '  + 
		 '         '  + 
		 '         '  + 
		 '       <div class="d-flex flex-row w-100 justify-content-between ">  '  + 
		 '         '  + 
		 '        	<div class="d-flex flex-column bd-highlight mr-3">  '  + 
		 '   		  <small class=" bd-highlight pb-1">Readable Name</small>  '  + 
		 '   		  <h6 class="text-primary font-weight-bold ">'+product_info.readable_name +'</h6>											    '  + 
		 '   		</div>  '  + 
		 '   		  '  + 
		 '   		  '  + 
		 '   		<div class="d-flex flex-column bd-highlight ">  '  + 
		 '   		  <small class="   pb-1">System Tag</small>  '  + 
		 '   		   <p class="badge text-monospace  bg-primary fw-bolder p-1 ">'+product_info.name +'</p>											    '  + 
		 '   		</div>  '  + 
		 '         '  + 
		 '       </div>  '  + 
		 '         '  + 
		 '         '  + 
		 '         '  + 
		 '       <div class="d-flex  w-100 flex-row bd-highlight  mb-3">  '  + 
		 '   	  '  + 
		 '   	  '  + 
		 '   		<div class="d-flex  w-100 flex-column bd-highlight ">  '  + 
		 '   			<small class="   pb-1">Description </small>  '  + 
		 '   	    	<p class="mb-1   w-100 border rounded py-3 pl-2">'+product_info.desciption +'</p>  '  + 
		 '   		</div>  '  + 
		 '     '  + 
		 '     '  + 
		 '   	</div>  '  + 
		 '         '  + 
		 '         '  + 
		 '         '  + 
		 '  </a>  ' ; 
	
	
	
	$(".product_list_ul").append($(html));
	
	
}










function get_all_product_info()
{
    var deferred = new $.Deferred();
    
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/product_info/get/all",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",	       
	    success: function(data)
	    {
//	    	console.log("get all");
//	    	
//	    	
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






function get_consignment_by_date()
{
    var deferred = new $.Deferred();
    
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/consignment/get/by/created_date",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"createDate" : selected_date,
	    	
			
	    }),	        
	    success: function(data)
	    {
//	    	console.log("get all");
//	    	
//	    	
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






