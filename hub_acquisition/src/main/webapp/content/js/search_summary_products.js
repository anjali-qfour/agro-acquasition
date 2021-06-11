
var timestamp;

var product_pricing_list;

var product_pricing_mean_map = {};

var product_pricing_mean_list = [];

var product_pricing_map = {};







function init_search_summary_products()
{
	
					
	
	draw_calendar();
	
		
//	Promise
//		.all([get_all_prices()])
//        .then(([data]) => {
//	
//	
//			product_pricing_list = data.product_pricing_list;
//	
//			
//			compute_completion();
//			
//			
//			update_mean_product_prices();
//	
//	
//		});
//		
	
	
	
	
	$(".see_today_btn").click(function(){
		
		console.log(  new Date(  (new Date()).toDateString()  ).getTime()   );

		window.location="user/view/summary/products?d="+( new Date( (new Date()).toDateString() ).getTime() );

	});
	
	
	
}





function update_mean_product_prices()
{
	
		
	var product_pricing_mean_map_i = {};
	
	
	for (var i =0; i<product_pricing_list.length; i++){
		
		
		var data_elem =product_pricing_list[i];
		
		
		if (typeof product_pricing_mean_map[data_elem.product_info_id]=="undefined"){
			
			product_pricing_mean_map[data_elem.product_info_id] = parseFloat(data_elem.price);
			
			product_pricing_mean_map_i[data_elem.product_info_id] = 1;
		}
		else{
			
//			console.log("------------ ------------");
//			
//			console.log("i = "+i);
//			
//			console.log("new price = "+  parseFloat(data_elem.price));
//			
//			console.log("stored price = "+ product_pricing_mean_map[data_elem.product_info_id] );
//			
//			console.log("_i = "+_i);
			
			product_pricing_mean_map_i[data_elem.product_info_id] = product_pricing_mean_map_i[data_elem.product_info_id] + 1;
			
			var _i = product_pricing_mean_map_i[data_elem.product_info_id];
			
			product_pricing_mean_map[data_elem.product_info_id] = ( ( product_pricing_mean_map[data_elem.product_info_id] * (_i-1) ) + parseFloat(data_elem.price) ) / _i;
			
		}
		
		
		if (i+1==product_pricing_list.length){
			
			
			var product_info_id_list = Object.keys(product_pricing_mean_map);
			
			
			
			for (var j = 0; j < product_info_id_list.length; j++ ){
				
				product_pricing_mean_list.push({
					
					id : product_info_id_list[j],
					product_info_id : product_info_id_list[j],
					mean_price : product_pricing_mean_map[product_info_id_list[j]],
					
				});
				
				
				if (j+1==product_info_id_list.length){
					
					add_product_pricing_mean();
					
				}
				
				
			}
			
			
		}
		
		
		
	}
	
	
}





function compute_completion()
{
	
	
	
	
	
	
	for (var i =0; i<product_pricing_list.length; i++){
		
		
//		console.log(product_pricing_list[i]);
		var data_elem =product_pricing_list[i];
		
		var current_date = new Date(data_elem.createDate);
		
		var data_elem_date = new Date(current_date.getFullYear(),(current_date.getMonth()),current_date.getDate());
		
		
		
		
		if (typeof product_pricing_map[data_elem_date]=="undefined"){
			
			product_pricing_map[data_elem_date] = 1;
		}
		else{
			
			product_pricing_map[data_elem_date] = product_pricing_map[data_elem_date] +1;
		}
		
		
		
		product_pricing_list[i]["startDate"] = data_elem_date;
		product_pricing_list[i]["endDate"] = data_elem_date;
		
		
		
//		startDate: new Date(currentYear, 2, 16),
//	                endDate: new Date(currentYear, 2, 19)
		
		
		if (i+1==product_pricing_list.length){
			
			draw_calendar();
			
		};
		
	}
	
	
}




function draw_calendar()
{
	
	
	var currentYear = new Date().getFullYear();

	
	$('#calendar').calendar(
		
		{

			clickDay: function(e){ 
				
				console.log(e);
				
				console.log(e.timeStamp)
				
				console.log(e.date)
				
				console.log(e.date.getTime())
				
				window.location="user/view/summary/products?d="+(e.date.getTime());
				
				
			},
			style:'custom',
		    enableContextMenu: true,
//		    customDayRenderer: function(element, date) {
//		        if (date.getDay() === 6 || date.getDay() === 0) {
//		            $(element).css('background-color', '#e4edec');
//		            $(element).css('border-radius', '15px');
//		        } 
//		    },
		    customDataSourceRenderer: function(element, date, event) {
		        // This will override the background-color to the event's color
				console.log(element);
				console.log(date);
				console.log(event);
				var bg_color = "#00ac69";
				var max_data_count = 2;
				
				
				
				if (event.length<max_data_count){
					bg_color = "#f4a100"
				}
				
		        $(element).css({
					'background-color': bg_color,
					'border-radius': '10px',
					'color': 'white',
					'border': '2px solid white',
			
				});
		        
		    },
//			dataSource : product_pricing_list,
//			dataSource: [
//	            {
//	                id: 0,
//	                name: 'Google I/O',
//	                location: 'San Francisco, CA',
//	                startDate: new Date(currentYear, 4, 28),
//	                endDate: new Date(currentYear, 4, 28)
//	            },
//	            {
//	                id: 1,
//	                name: 'Microsoft Convergence',
//	                location: 'New Orleans, LA',
//	                startDate: new Date(currentYear, 2, 16),
//	                endDate: new Date(currentYear, 2, 19)
//	            }
//			],
			
			
			
			
			
			
			
			
			
		}
		
		
	)
	
	$('#calendar').data('calendar').setDataSource(product_pricing_list); 	
	
}









function get_all_prices()
{
	
	 var deferred = new $.Deferred();
    
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/product_pricing/get/all",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    
	    success: function(data)
	    {
	    	
	    	console.log(data);

	    	
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













function add_product_pricing_mean()
{
    var deferred = new $.Deferred();
    
        
    var data = {'message':'error'};


	
	$.ajax({
		type: "POST",
	    url: "user/api/product_pricing_mean/add/bulk",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
     	data:  JSON.stringify(product_pricing_mean_list),	    
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





