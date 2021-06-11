var main_item_id = null;

var item_map = null;
var max_footfall = 0;
var location_data = null;

var footfall_main_node_svg_text = null;
var footfall_node_svg_text = null;

var color_palette = ["#009fff","#4DF2FF","#ff6000","#b2c8f0","#6678e8","#b2c8f0"];


var footfall_timeline_data = [];


var hover_info_click=0;

$.get('content/svg/footfall_central_node.svg', function(text_data){
	
	footfall_main_node_svg_text = text_data;
//	console.log(footfall_main_node_svg_text);
		
}, 'text');


$.get('content/svg/footfall_node_m3.svg', function(text_data){
	
	footfall_node_svg_text = text_data;
//	console.log(footfall_node_svg_text);
		
}, 'text');




/////////////////////////--------map--------/////////////////////////



function extended_map_tool()
{
	
	
	var tool_class_name = "large_map";
	var tool_dot_class_name = " ."+tool_class_name;

	
	var tool_dot_class_name = "."+tool_class_name;
	
	var tool_w = lu*11;
	var tool_max_h = su*10;
	
	
	$(".col").addClass("blur");
	
	$('html, body').css({
	    overflow: 'hidden',
	    height: '100%'
	});
	

	$("<div class='"+tool_class_name+" layer1 tool_box '> " +
			"<div class='tool_box_header large_text'>" +
			"<div class='tool_box_header_name'> Map </div>"+
			"<div class='tool_box_header_btn cancel_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin'> </svg>"+
			"</div>"+
	"</div>")
		.css({
			left:(su+su_3+su_3),
			top: (su+su_3+window.scrollY),
			width:(tool_w),
			height:tool_max_h,
			"max-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo("body");
	

	
	
	$(tool_dot_class_name + " .cancel_btn").click(function(){

		console.log("click");
				
		$(".col").removeClass("blur");
		
		$('html, body').css({
		    overflow: 'auto',
		    height: 'auto'
		});
		
		$(tool_dot_class_name).remove();
		
		
	});
	
	
	draw_map(".large_map_svg",location_data)
	
}



function draw_mini_map_tool()
{
	
	
	
	var tool_class_name = "footfall_map ";
	var tool_dot_class_name = " ."+tool_class_name;

	
	var tool_dot_class_name = "."+tool_class_name;
	
	var tool_w = lu*8;
	var tool_max_h = su*3;
	
	
	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Map </div>"+
			"<div class='tool_box_header_btn expand_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<svg class='main_svg item_map_mini_chart "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin'> </svg>"+
			"</div>"+
	"</div>")
		.css({
			left:(0),
			top: (su+su),
			width:(tool_w),
			height:tool_max_h,
			"max-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col");
	



	$(tool_dot_class_name + " .expand_btn").click(function(){
		
		
		
		extended_map_tool();
		

		
	});
	
	
	
	
	
	

	
	Promise.all([get_item_location(main_item_id)]).then(function ([data]){
		
		
//		reshape_location_data(data);
		
		Promise.all([reshape_location_data(data)]).then(draw_mini_map);
				
		height_cascade();
		
		
	});

	
	
}



function reshape_location_data(data)
{
//	console.log("draw_item_mini_map._reshape_data : data:=");
//	console.log(data);
	
	
	var deferred = new $.Deferred();
	
	
	
	
	location_data = data;
	
	
//	console.log("draw_item_mini_map._reshape_data : location_data:=");
//	console.log(location_data.length);
	
	var total_visit_count = 0;
	var total_purchase_count = 0;
	var total_cartexit_count = 0;
	
	$.each(data, function( i, data_elem ) {
		
//		console.log("draw_item_mini_map._reshape_data : data_elem:=");
//		console.log(data_elem);
		
		if (data_elem.touchType==1){
			total_visit_count = total_visit_count+data_elem.touchCount;	
			
		};	
		if (data_elem.touchType==2){
			total_purchase_count = total_purchase_count+data_elem.touchCount;	
			
		};	

		if (data_elem.touchType==3){
			total_cartexit_count = total_cartexit_count+data_elem.touchCount;	
			
		};	
		
		
	});

//	console.log("draw_item_mini_map._reshape_data : total_visit_count := "+total_visit_count);
//	console.log("draw_item_mini_map._reshape_data : total_purchase_count := "+total_purchase_count);
//	console.log("draw_item_mini_map._reshape_data : total_cartexit_count := "+total_cartexit_count);
	
	
	
	
	var mini_map_data = [
		
		{
	        "category": "National", 
	        "values": [						            
	            {
	                "value": total_visit_count, 
	                "type": "Visits"
	            }, 
	            {
	                "value": total_purchase_count, 
	                "type": "Purchase"
	            }, 
	            {
	                "value": total_cartexit_count, 
	                "type": "Cart Exits"
	            }
	        ]
	    }, 
		
		{
	        "category": "Worldwide", 
	        "values": [						            
	            {
	                "value": 12, 
	                "type": "Visits"
	            }, 
	            {
	                "value": 96, 
	                "type": "Purchase"
	            }, 
	            {
	                "value": 20, 
	                "type": "Cart Exits"
	            }
	        ]
	    }, 

		
		{
	        "category": "Unknown", 
	        "values": [						            
	            {
	                "value": 12, 
	                "type": "Visits"
	            }, 
	            {
	                "value": 56, 
	                "type": "Purchase"
	            }, 
	            {
	                "value": 10, 
	                "type": "Cart Exits"
	            }
	        ]
	    }

	 ];
	
	
	
	
	
//	_draw(mini_map_data);
	
	deferred.resolve(mini_map_data);
	
	return deferred.promise();
	
	
	
}



function draw_mini_map([mini_map_data])
{

	_draw(mini_map_data);
	
	function _draw(mini_map_data)
	{		
		console.log("draw_item_mini_map : _draw");
		
//		console.log("draw_item_mini_map : _draw : mini_map_data:=");
//		console.log(mini_map_data);
		
		
		var barchart_w = lu*7;
		var barchart_h = su;
		
		var item_map_svg = d3.select(".item_map_mini_chart")
								.append("svg")
								.attr("x",10)
								.attr("y",10);
		
		var categoriesNames = mini_map_data.map(function(d) { return d.category; });
		var valueNames = mini_map_data[0].values.map(function(d) { return d.type; });
				
//		console.log("draw_item_mini_map : _draw : categoriesNames:=");
//		console.log(categoriesNames);
				
//		console.log("draw_item_mini_map : _draw : valueNames:=");
//		console.log(valueNames);
		
		
		var color = d3.scaleOrdinal()
	    					.range(["#0432ff","#009fff","#00fcff"]);


		var x0_scale = d3.scaleBand()
						    .rangeRound([0, barchart_w])
//						    .paddingInner(0.01);
						    ;
		
		var x1_scale = d3.scaleBand()							
						    .paddingOuter(1.2)
						    .paddingInner(0.7)
							;
		
		var y_scale = d3.scaleLinear().range([barchart_h, 0]);
		
		
		


		
				
		x0_scale.domain(categoriesNames);
		x1_scale.domain(valueNames).range([0, x0_scale.bandwidth()]);
		y_scale.domain(
						[ 0, 
						  d3.max(mini_map_data, function(category){
							  
							  		return d3.max( category.values, function(d){ return d.value; }); 
							    })
					    ]
					  );

		
		var xAxis = d3.axisBottom(x0_scale)
						.tickSize(0)
						;
		
		
		var yAxis = d3.axisLeft(y_scale).ticks(3);
		

		
			
		item_map_svg.append("g")
					  .attr("class", "x axis")
					  .attr("transform", "translate(0," + barchart_h + ")")
					  .call(xAxis)					  
					  ;

		item_map_svg.append("g")
				      .attr("class", "y axis")
//				      .style('opacity','0')
				      .call(yAxis)	
				      ;
		
		 var slice = item_map_svg.selectAll(".slice")
							      .data(mini_map_data)
							      .enter().append("g")
							      .attr("class", "g")
							      .attr("transform",function(d) { return "translate(" + x0_scale(d.category) + ",0)"; });



		
		 slice.selectAll("rect")
			      .data(function(d) { return d.values; })
			      .enter().append("rect")
			      .attr("width", 10)
			      .attr("x", function(d) { return x1_scale(d.type); })
//				  .attr('dy',  '0.32em')
			      .style("fill", function(d) { return color(d.type) })
			      .attr("y", function(d) { return y_scale(d.value); })
			      .attr("height", function(d) { return barchart_h - y_scale(d.value); })
				  .call(function(){
			        	
			      })
			      ;


		
	}
	

	function _get_data()
	{
//		console.log("draw_item_mini_map : _get_data");
		
		var dataset = [
			
							{
						        "category": "National", 
						        "values": [						            
						            {
						                "value": 32, 
						                "type": "Visits"
						            }, 
						            {
						                "value": 56, 
						                "type": "Purchase"
						            }, 
						            {
						                "value": 80, 
						                "type": "Cart Exits"
						            }
						        ]
						    }, 
							
							{
						        "category": "Worldwide", 
						        "values": [						            
						            {
						                "value": 12, 
						                "type": "Visits"
						            }, 
						            {
						                "value": 96, 
						                "type": "Purchase"
						            }, 
						            {
						                "value": 20, 
						                "type": "Cart Exits"
						            }
						        ]
						    }, 
			
							
							{
						        "category": "Unknown", 
						        "values": [						            
						            {
						                "value": 12, 
						                "type": "Visits"
						            }, 
						            {
						                "value": 56, 
						                "type": "Purchase"
						            }, 
						            {
						                "value": 10, 
						                "type": "Cart Exits"
						            }
						        ]
						    }
			
			
			
			
			
			
			
						 ];
		
		
		get_item_location("1")
		
		
		return dataset;
		

		
	}
	
}





/////////////////////////--------timeline--------/////////////////////////





function draw_timeline_tool()
{
	
	var tool_class_name = "footfall_timeline";
	var tool_dot_class_name = " ."+tool_class_name;

	
	var tool_dot_class_name = "."+tool_class_name;
	
	var tool_w = lu*8;
	var tool_max_h = su*3;
	
		

	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Timeline </div>"+
			"<div class='tool_box_header_btn expand_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin'> </svg>"+
			"</div>"+
	"</div>")
		.css({
			left:(0),
			top: (su+su_3+su_3),
			width:(tool_w),
			height:tool_max_h,
			"max-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col");
	



	$(tool_dot_class_name + " .expand_btn").click(function(){
		
		
		
		extended_timeline_tool();
		

		console.log("click");
		
	});
	
	
	
	
	
	
	height_cascade();
	
	
	
	
	
//	Promise.all([get_item_item_sim_data(central_itemId)]).then(function (data){
//		
//		
//		upldate_item_info();
//		
//		Promise.all([reshape_pred_graph_data(data)]).then(draw_pred_graph);
//		
//		
//		
//		
//	});

	
	
	
	
	
}







function extended_timeline_tool()
{
	
	
	var tool_class_name = "large_timeline";
	var tool_dot_class_name = " ."+tool_class_name;

	
	var tool_dot_class_name = "."+tool_class_name;
	
	var tool_w = lu*11;
	var tool_max_h = su*10;
	
	
	$(".col").addClass("blur");
	
//	$('html, body').css({
//	    overflow: 'hidden',
//	    height: '100%'
//	});
	

	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Timeline </div>"+
			"<div class='tool_box_header_btn cancel_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin'> </svg>"+
			"</div>"+
	"</div>")
		.css({
			left:(su+su_3+su_3),
			top: (su+su_3+window.scrollY),
			width:(tool_w),
			height:tool_max_h,
			"max-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo("body");
	
	draw_timeline_hourly();

	draw_timeline_legends();
	
	$(tool_dot_class_name + " .cancel_btn").click(function(){

		console.log("click");
				
		$(".col").removeClass("blur");
		
		$('html, body').css({
		    overflow: 'auto',
		    height: 'auto'
		});
		
		$(tool_dot_class_name).remove();
		
		
	});
	
	

	
}





function draw_item_mini_timeline()
{
	Promise.all([get_item_timeline(main_item_id)]).then(_reshape_data);

	

	
	function _reshape_data([data])
	{
//		console.log(data);
		
		
		
//		var footprint_timeline_hourly_data = (new Array(24)).fill(0);		
//		var footprint_timeline_weekly_data = (new Array(7)).fill(0);		
//		var footprint_timeline_monthly_data = (new Array(12)).fill(0);
		
		
		

		
		var footprint_timeline_hourly_data = new Array(24).fill().map(function(item, index, arr) {
		    return ({
		    	
		    	"time_unit" : index,
		    	"touch_array" : [
		    		{
		    			"touch_type_num": 0, 
		                "touch_type": "Visit",
		                "value": 0
		            },
		            {
		            	"touch_type_num": 1, 
		                "touch_type": "Purchase",
		                "value": 0
		            },
		            {
		            	"touch_type_num": 2,
		                "touch_type": "Cartexit",
		                "value": 0
		            }
		    		
		    	]
		    	
		    });
		});
		
		
		var footprint_timeline_weekly_data = new Array(7).fill().map(function(item, index, arr) {
		    return ({
		    	
		    	"time_unit" : index,
		    	"touch_array" : [
		    		{
		    			"touch_type_num": 0, 
		                "touch_type": "Visit",
		                "value": 0
		            },
		            {
		            	"touch_type_num": 1, 
		                "touch_type": "Purchase",
		                "value": 0
		            },
		            {
		            	"touch_type_num": 2,
		                "touch_type": "Cartexit",
		                "value": 0
		            }
		    		
		    	]
		    	
		    });
		});
		
		

		var footprint_timeline_monthly_data = new Array(12).fill().map(function(item, index, arr) {
		    return ({
		    	
		    	"time_unit" : index,
		    	"touch_array" : [
		    		{
		    			"touch_type_num": 0, 
		                "touch_type": "Visit",
		                "value": 0
		            },
		            {
		            	"touch_type_num": 1, 
		                "touch_type": "Purchase",
		                "value": 0
		            },
		            {
		            	"touch_type_num": 2,
		                "touch_type": "Cartexit",
		                "value": 0
		            }
		    		
		    	]
		    	
		    });
		});
		
		
		
		
    	$.each(data, function( i, data_elem ) {

//    		console.log(i);
//    		console.log(data_elem);
//    		console.log(data_elem.touchCount);
    		
    		if (data_elem.timeCat==1){
//    			footprint_timeline_hourly_data[data_elem.timeUnit] = data_elem.touchCount;
    			
//    			footprint_timeline_hourly_data[data_elem.timeUnit]
    			
//    			console.log("timeCat==1");
//    			
//    			console.log(data_elem);
    			
    			footprint_timeline_hourly_data[data_elem.timeUnit].touch_array[data_elem.touchType-1].value = parseInt(data_elem.touchCount);
    			
    			
    		};
    		

    		if (data_elem.timeCat==2){
    			
    			footprint_timeline_weekly_data[data_elem.timeUnit-2].touch_array[data_elem.touchType-1].value = parseInt(data_elem.touchCount);

    		};
    		

    		if (data_elem.timeCat==4){

    			footprint_timeline_monthly_data[data_elem.timeUnit-1].touch_array[data_elem.touchType-1].value = parseInt(data_elem.touchCount);

    		};
		
    		
    	});
    	
    	footfall_timeline_data = [footprint_timeline_hourly_data,footprint_timeline_weekly_data,footprint_timeline_monthly_data];
    	
    	
//    	console.log(footprint_timeline_hourly_data);
    	
    	_draw([footprint_timeline_hourly_data])
//		
    
	  }
	
	


	function _draw([footprint_timeline_hourly_data])
	{
//		console.log("footprint_timeline_hourly_data := ");
//		console.log(footprint_timeline_hourly_data);
					
			
		var barchart_w = lu*7;
		var barchart_h = su;
		var color = d3.scaleOrdinal().range(["#0432ff","#009fff","#00fcff"]);
		
		var item_timeline_mini_chart = d3.select(".footfall_timeline_svg")
											.append("svg")
											.attr("x",10)
											.attr("y",10)
											;
			
//		var item_timeline_mini_chart = d3.select(".footfall_timeline_svg");
		
		
		var time_unit_array = footprint_timeline_hourly_data.map(function(d) { return d.time_unit; });
//		console.log("time_unit_array := ");
//		console.log(time_unit_array);
		
		var valueNames = footprint_timeline_hourly_data[0].touch_array.map(function(d) { return d.touch_type; });
//		console.log("valueNames := ");
//		console.log(valueNames);
		
			
		var x0_scale = d3.scaleBand()
						    .rangeRound([0, barchart_w])
//						    .paddingInner(0.01);
						    ;
		var x1_scale = d3.scaleBand()							
						    .paddingOuter(1.2)
						    .paddingInner(0.7)
							;
		var y_scale = d3.scaleLinear().range([barchart_h, 0]);
		
		
		x0_scale.domain(time_unit_array);
		x1_scale.domain(valueNames).range([0, x0_scale.bandwidth()]);
		y_scale.domain(
				[ 0, 
				  d3.max(
						  footprint_timeline_hourly_data, 
						  function(time_unit){ 
							  return d3.max( time_unit.touch_array, function(d){ return d.value; }); 							  
						  })
			    ]
			  );
		
		
		
		var xAxis = d3.axisBottom(x0_scale).tickSize(0).tickFormat(d => d + " H");;
		var yAxis = d3.axisLeft(y_scale).ticks(3);


		
		
		item_timeline_mini_chart.append("g")
								  .attr("class", "x axis")
								  .attr("transform", "translate(0," + barchart_h + ")")
								  .call(xAxis)					  
								  ;

		item_timeline_mini_chart.append("g")
							      .attr("class", "y axis")
							      .call(yAxis)	
							      ;

		var slice = item_timeline_mini_chart.selectAll(".slice")
										      .data(footprint_timeline_hourly_data)
										      .enter().append("g")
										      .attr("class", "g")
										      .attr("transform",function(d) { return "translate(" + x0_scale(d.time_unit) + ",0)"; });

		
		

		slice.selectAll("rect")
			      .data(function(d) { 
//			    	  console.log([d.touch_array[0]]);
			    	  return [d.touch_array[0]]; 
			    	  
			      })
			      .enter().append("rect")
			      .attr("width", 10)
			      .attr("x", function(d) { return x1_scale(d.touch_type); })
//				  .attr('dy',  '0.32em')
			      .style("fill", function(d) {
			    	  
			    	  return color_palette[d.touch_type_num]; 
			    	  
			      })
			      .attr("y", function(d) {
//			    	  console.log(d);
			    	  return y_scale(d.value);
			    	  
			      })
			      .attr("height", function(d) {
			    	  
			    	  return (barchart_h - y_scale(d.value)); 
			    	  
			      })
				  .call(function(){
			        	
//			        	set_attr_active(".item_timeline_btn",1);
//			        	expand_item_mini_timeline();
			        	
			      })
			      ;
	  
		  
		
	}
	
	
	
}







/////////////////////////--------footfall_graph--------/////////////////////////






function init_footfall_graph(item_id)
{
	
//	console.log("init_footfall_graph --------------- ");

	
    var footfall_graph_svg = d3.select(".footfall_graph_svg")

								.attr("x", 0)
								.attr("y", 0)
								;
    
    main_item_id = item_id;   
    
    var item_id_array = [];
    
    item_id_array.push(item_id);
    
    
    
    
    
    $.when(get_item_item_interaction_data(item_id)).done(function(data) {
    	
//    	console.log("footfall.init_footfall_graph : 1. data:=");
//    	console.log(data);    	
//    	console.log(data.itemMap);
    	
    	item_map = data.itemMap;
    	
//    	max_footfall = Math.max.apply(Math, item_map.map(function(o) { return o.footfall; }));
    	
    	$.each( item_map, function( key, value ) {
    		max_footfall = ( value.footfall > max_footfall ) ?  value.footfall : max_footfall ;
    		
    	});
    	
    	
    	$.when(reshape_item_item_interaction_data(data)).done(function(data) { 
    		
//    		console.log(data);
    		
	    	draw_footfall_graph(data);
	    	
	    	
	    	draw_item_info_tool();
	    	upldate_item_info();
	    	

    	});
    	
    	
    	
    	
    	
    });
    
    

	
}





function draw_footfall_graph_tool()
{
	
	var tool_class_name = "footfall_graph";
	var tool_dot_class_name = " ."+tool_class_name;

	
	var tool_dot_class_name = "."+tool_class_name;
	
	var tool_w = lu*8;
	var tool_max_h = su*9;
	
		

	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'></div>" +	
			"<div class='tool_box_content'>" +
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin'> </svg>"+
			"</div>"+
	"</div>")
		.css({
			left:(0),
			top: (su+su_3),
			width:(tool_w),
			height:tool_max_h,
			"max-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col");
	




	$( ".tool_box_header" )
		.append($(
				"<div class='tool_box_header_name'> Footfall Graph </div>"
				 
				))
				;
	
	
	
	var _draw_search_btn = function ()
	{
		$.get("content/svg/search_btn.svg", function(text_data){
						
			
			d3.select(".search_btn")
					.append("svg")
					.attr("height",lu/3)
					.attr("width",lu/3)
					.attr("preserveAspectRatio","xMidYMid")
					.append("g")
					.attr("class","upload_confirm upload_btn")
					.html(text_data)
					.attr("transform","translate("
							+( 0 )+", "
							+( 0 )								
							+" ) scale("+(btn_scale)+")")				
					.on("click", function(d) {
						
						
						console.log($(".search_input").val().length);
						
						if ($(".search_input").val().length<3){
							$(".modal_error_msg").text("[ Project name is too short ]");
						}
						else{
							
							
							window.location ="user/search/results?q="+$(".search_input").val();
							
							
							
						};
						
						


					});
			
			
		}, "text");	
	}
	
	_draw_search_btn();
	
	
	
	
	
	
	
	
	
	
	
	
	
//	Promise.all([get_item_item_sim_data(central_itemId)]).then(function (data){
//		
//		
//		upldate_item_info();
//		
//		Promise.all([reshape_pred_graph_data(data)]).then(draw_pred_graph);
//		
//		
//		
//		
//	});

	
	
	
	
	
	
	
	
	
}





function draw_footfall_graph(footfall_graph_data)
{
//	console.log("draw_footfall_graph - ");
//
//	console.log(footfall_graph_data);
	
	
	
	
	var nodes = footfall_graph_data.nodes;
	var clusters = footfall_graph_data.clusters;
		
	var secondary_node_d = su_3; 	
	
    var footfall_graph_svg = d3.select(".footfall_graph_svg")
//								.append("svg")
//								.attr("class", "footfall_in_out_svg")
    							.classed("footfall_in_out_svg",true)
								.attr("x", 0)
								.attr("y", 0)
								
								;

	var dim = d3.select(".footfall_graph_svg").node().getClientRects()[0];
	var footfall_graph_w = dim.width;
	var footfall_graph_h = dim.height;
	
	
	var padding = 1;
	var center_node_size = 0.8;
	
//    var color = d3.scaleSequential(d3.interpolateRainbow).domain(d3.range(3));
    var color = ["#009fff","#009fff","#00fa92"];
    
    var force = d3.forceSimulation()
    				.force('center', d3.forceCenter(footfall_graph_w/2-30, footfall_graph_h/2))
    				.force('cluster', cluster().strength(0.9))
    				.force('collide', d3.forceCollide(d => secondary_node_d + 1).strength(1))    				
    				.on('tick', layoutTick)
    				.nodes(nodes);
    
    var node = footfall_graph_svg
    				.selectAll("g.footfall_node")
								    .data(nodes)
								    .enter()
								    .append("g")
								    .attr("class",function(d){
								    	var c = "footfall_node";
								    	
								    	if (d.cluster==2){
								    		c = "footfall_node footfall_main_node"
								    	};
								    	
								    	return c;
								    })
								    .attr("data-footprint_count",function(d){
								    	
								    	return d.footfall_count;
								    })
								    .attr("data-item_id",function(d){
								    	
								    	return d.item_id;
								    })
								    .attr("data-cluster_id",function(d){
								    	
								    	return d.cluster;
								    })
								    .attr("data-selected",0)
								    .on("mouseenter",function(d) { 
								    	
								    	
								    	d3.select(this).attr("filter", "url(#flat_shadow_up)");
								    	draw_footfall_graph_info(d3.select(this),d);
								    
								    })
								    .on("mouseleave",function(d) { 
								    	
								    	remove_footfall_graph_info(d3.select(this),d);
								    	
								    	d3.select(this).attr("filter", "none")
								    	
								    })								  
								    .on("click",function(d) { 
								    									    
								    	footfall_node_click(d3.select(this),d);
								    	
								    })


								    ;



	// a circle to represent the node
    node.append("circle")
        .attr("class", "footfall_node_circle") 	        
        .attr("r", function(d) {
        	
//	    	return secondary_node_d;
	    	
	    	return (d.item_id===main_item_id) ? lu_3 : secondary_node_d;
		}) 	 
		.style("fill", function(d) {
			
			var c = d.item_id%12;

			console.log(c);
			
//	    	return (d.item_id===main_item_id) ? colors.main_node_bg : colors.secondary_node_bg;
			
			
			return (d.item_id===main_item_id) ? colors.main_node_bg : color_palette[c];
		}) 	
		.style("opacity", function(d) {
						
			return (d.item_id===main_item_id) ? 1 : 0.5;
			
		}) 	
        ;
	
   
    
	
//    node.html(function(d){
//		
////		console.log(d);
//		
//		var h = footfall_node_svg_text;
//		if (d.cluster==2){
//			h = footfall_main_node_svg_text;
//		};
//		
//		return h;
//	})
//	
//	;
    
    
    
    node.append("text")    
	 	.text(function(d){
//	 		console.log(d);
	 		return d.item_id;
	    })
	    .attr("class", function(d) {
	    	return (d.item_id===primary_item_id) ? "footfall_primary_node_text" : "footfall_secondary_node_text"  ;
		}) 
		.attr("text-anchor", "middle")
		.attr("x", 0)
		.attr("y", "1%")
		;
	

    
    
    
    
    
	$.get("content/svg/right_arrow_symb.svg", function(text_data){
		
		footfall_graph_svg
			.append("g")
			.attr("class","flat_btn")
			.attr("data-item_id","-1")
			.html(text_data)
			.attr("transform","translate("+(footfall_graph_w/2-lu_mi/2-symb_s*0.666)+", "+( (footfall_graph_h/2 -lu_mi/2 ) ) +") scale("+(0.666)+")")
//			.select("g")
//			.selectAll("*")
//			.attr("fill","black")
//			.attr("stroke","black")
			;
		

		footfall_graph_svg
			.append("g")
			.attr("class","flat_btn")
			.attr("data-item_id","-1")
			.html(text_data)
			.attr("transform","translate("+(footfall_graph_w/2+lu_mi/2)+", "+( (footfall_graph_h/2 -lu_mi/2 ) ) +") scale("+(0.666)+")")
			;
		
		
	}, "text");	
	
    
  
	


 

    $("<div class='footfall_graph_sub_title gain_from_text' > <div> Gained From </div><span >&#8614;</span> </div>")
    	.appendTo(".footfall_graph .tool_box_content")
   	;
 
    $("<div class='footfall_graph_sub_title loss_to_text' > <span>&#8614;</span> <div>Lossed To </div> </div>")
    	.appendTo(".footfall_graph .tool_box_content")
	;
    
    

    function layoutTick(e) 
    {
    	
    	var x_left = 0;
    	var x_left_max = 0;
    	var x_right = 10000;
    	
    	
    	
    	node
    		.attr("transform", function(d) {
    			
//    			console.log(d);

    			var _x = d.x ;
    			var _y = d.y ;
    			var _scale = 1;
    			var _rotate = 0;

		   	  
    			if ( d.cluster == 1 ){
    				
    				 
    			   	  if (d.x<=secondary_node_d)
    		    	  {
    		       		  d.x = secondary_node_d;
    		       	  }
    		    	  
    		       	  if (d.x>= ( footfall_graph_w/2 - symb_s*1 - d.radius*2 ) )
    		       	  {
    		       		  d.x = footfall_graph_w/2 - symb_s*1 - d.radius*2;
    		       	  }
    				
    				
    				
    			} 
    			else if ( d.cluster == 0 ){
    				
    				 if (d.x<=footfall_graph_w/2 + symb_s*1+secondary_node_d)
    		    	  {
    		       		  d.x = footfall_graph_w/2 + symb_s*1 +secondary_node_d;
    		       	  }
    		    	  
    		       	  if (d.x>= (footfall_graph_w - d.radius*2 ) )
    		       	  {
    		       		  d.x = footfall_graph_w - d.radius*2 ;
    		       	  }
    		       	  
    				
    			}
		   	  
		   	 

	       	  
	       	  
	       	  
	       	  if (d.y<=+secondary_node_d+su_mi)
	       	  {
		   		  d.y = +secondary_node_d+su_mi;
		   	  }
	       	  
		   	  if (d.y>=((footfall_graph_h - d.radius*2 )))
		   	  {
		   		  d.y = (footfall_graph_h - d.radius*2);
		   	  }

		   	  
		   	  
		   	  
		   	  
	       	  if ((x_left<d.x)&&(d.x<clusters[2].x))
	       	  {
	       		  x_left = d.x;
	       	  };	
	       	  
	       	  if ( d.cluster == 1 )
	       	  {	       		  
	       		  if (x_left<d.x){
	       			  x_left = d.x;
	       		  };
	       	  };	       	  
	
	       	  if ( d.cluster == 0 )
	       	  {	       		  	       		  
	       		  if (x_right>d.x){
	       			  x_right = d.x;
	       		  };	       		  
	       	  };
	       	  
	       	  
	     
		   	  
		   	  if ( d.cluster == 2 )
		   	  {
		   		  _x = footfall_graph_w/2;
		   		  _y = footfall_graph_h/2;
		   		  _scale = 0.8;
		   		
		   	  }
		   	  else
		   	  {
		   		  _x = d.x  ;
		   		  _y = d.y  ;
//		   		  _scale = d.radius/50;
		   		
		   	  }
    		
	    	return "translate(" + (_x) + "," + (_y) + ") " + " scale("+1+") ";
	    	
	    })
    	
    	
    
    	
    	
    }
    
    
    
    
    function cluster () 
    {
    	var nodes, strength = 0.1;
    	
// 		console.log("clusters:=");
//     	console.log(clusters);
    	
    	function force (alpha){
    		
    		alpha *= strength * alpha;
    		

    		
    		nodes.forEach(function(d) {
    			
//     			console.log(d);
     			
    			var cluster = clusters[d.cluster];
    			
//    			console.log(cluster);
    	    	
    			if (cluster === d) return;
    			
    			let x = d.x - cluster.x ;
    			let y = d.y - cluster.y;
    			let l = Math.sqrt(x * x + y * y);
    			let r = d.radius + cluster.radius;

				if (l != r) {
				  l = (l - r) / l * alpha;
				  d.x -= x *= l;
				  
				  d.y -= y *= l;
				  cluster.x += x;
				  cluster.y += y;
				}
				
    	    });
    	 }
    	
    	force.initialize = function (_) {
  		  nodes = _;
  		}
    	
    	force.strength = _ => {
  		  strength = _ == null ? strength : _;
  		  return force;
  		};
    	
    	return force;

    }
	
}





function draw_footfall_graph_info(svg_elem,_item_data)
{
	
//	console.log(svg_elem);
//	console.log(_item_data);
	

	if (hover_info_click==1){
		
		return;
		
	};

	

	
		
	
	var dim_circle = svg_elem.node().getBoundingClientRect();

	
	var _item_id = _item_data.item_id;
	
//	console.log(dim_circle);
	
	var hover_info_h = su*7;
	var hover_info_w = lu*3;
	var hover_info_max_h = su*7;
	
	
	$("<div class='hover_info large_text'> " +
			"<div class='hover_info_header'> " +
			"<div class='hover_box_header_name'> Information </div>"+
			"<div class='hover_box_header_btn hover_cancel_btn flat_btn'>  </div>"+
			"</div>" +	
			"<div class='hover_info_content'>" +
			"</div>"+
	"</div>")
		.css({
			left:(dim_circle.x+lu_2),
//			top: (window.scrollY+dim_circle.y+dim_circle.height/2-lu-su),
			top: (window.scrollY+dim_circle.y-hover_info_h/2+dim_circle.height/2),
			width:(lu*3),
			height:(hover_info_h),
			"max-height" : (hover_info_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo("body");
	
	
	
	
	
	var _draw_cancel_btn = function ()
	{
		$.get("content/svg/cancel_btn.svg", function(text_data){
						
			
			d3.select(".hover_cancel_btn")
					.append("svg")
					.attr("height",lu/3)
					.attr("width",lu/3)
					.attr("preserveAspectRatio","xMidYMid")
					.append("g")					
					.html(text_data)
					.attr("transform","translate("
							+( 0 )+", "
							+( 0 )								
							+" ) scale("+(btn_scale)+")")	
					
					.on("click", function(d) {
						
						hover_info_click=0;
						d3.event.stopPropagation();
						
						remove_footfall_graph_info();


					})
					.select("g")
						.selectAll("*")
						.attr("fill","#DB7C0E")
						.attr("stroke","#DB7C0E")
						;
			
			
		}, "text");	
	}
	
	_draw_cancel_btn();
	
	
	
	
	

	var	 hover_box_ul = $( "<ul> </ul>" ).addClass("hover_box_ul").css({
		
//		"max-height" : (lu*2),
		
	})
	.appendTo(".hover_info .hover_info_content");
	
	

    
    
//    _draw_row(2,"Name",string_trim(item_map[item_id].nameStr,30) );
//    _draw_row(3,"Category",string_trim(item_map[item_id].categoryStr,30));
//    _draw_row(4,"Footfall",string_trim(item_map[item_id].footfall,20));
//    _draw_row(5,"Rank",string_trim(item_map[item_id].rankF,20));
    



	
	$("<li class='hover_box_ul_li normal_text'>" +
			  "<div class='hover_box_ul_li_image'> <img src='content/image/image1.jpg' alt='*'> </div>"+
		  "</li>")
		  .appendTo(hover_box_ul)	   
		  ;

	
	
	
	
	$("<li class='hover_box_ul_li normal_text'>" +
		  "<div class='hover_box_ul_li_name large_text'> name </div>"+
		  "<div class='hover_box_ul_li_value '> <span>"+string_trim(item_map[_item_id].nameStr,35) +"</span> </div>"+
	  "</li>")
	  .appendTo(hover_box_ul)	   
	  ;

	
	
	

	$("<li class='hover_box_ul_li normal_text'>" +
		  "<div class='hover_box_ul_li_name large_text'> Category </div>"+
		  "<div class='hover_box_ul_li_value '> <span>"+string_trim(item_map[_item_id].categoryStr,35) +"</span> </div>"+
	  "</li>")
	  .appendTo(hover_box_ul)	   
	  ;

		
	
	
	

	$("<li class='hover_box_ul_li normal_text'>" +
		  "<div class='hover_box_ul_li_name large_text'> Footfall </div>"+
		  "<div class='hover_box_ul_li_value '> <span>"+string_trim(item_map[_item_id].footfall,35) +"</span> </div>"+
	  "</li>")
	  .appendTo(hover_box_ul)	   
	  ;

		
	
	
	

	$("<li class='hover_box_ul_li normal_text'>" +
		  "<div class='hover_box_ul_li_name large_text'> Rank </div>"+
		  "<div class='hover_box_ul_li_value '> <span>"+string_trim(item_map[_item_id].rankF,35) +"</span> </div>"+
	  "</li>")
	  .appendTo(hover_box_ul)	   
	  ;

	
	
	
	$(".hover_info_header").click(function(event){
		
		hover_info_click=0;
		event.stopPropagation();
		
		remove_footfall_graph_info();
		
	});
	
	
	
	$(".hover_info").click(function(){
		
		window.location = 'user/item/footfall?i=' + svg_elem.attr("data-item_id");
		
	});


}





function remove_footfall_graph_info()
{
	if (hover_info_click==0){
		
		$(".hover_info").remove();
		d3.selectAll(".footfall_node")
			.select("circle")
			.attr("fill", function(d){
				
				var f = "url(#blueGradient)";
				
//				console.log(d)
				
				if (d.cluster==2)
				{
					f = "#4DF2FF";
				}
				
		    	
		    	return f;
			});
		
	};
	
	
	
}





function footfall_node_click(svg_elem,d)
{
	console.log("footfall_node_click - ");
	
	console.log("footfall_node_click : selected := ");
	console.log(svg_elem.attr("data-selected"));
	

	if (hover_info_click==1){
		
		return;
		
	}
	else{
		hover_info_click=1;
	};
	
	
	
	
	
	
	d3.selectAll(".footfall_node")
		.select("circle")
		.attr("fill", function(d){
			
			var f = "#009fff";
			
//			console.log(d)
			
			if (d.cluster==2)
			{
				f = "#4DF2FF";
			}
			
	    	
	    	return f;
	})
	.call(function(){
		
		svg_elem.attr("data-selected",1);
		
		svg_elem.select("circle")				
				.attr("fill", "url(#orangeGradient)")
				;
		
	})
	;
	
	
	
	$(".hover_info ").css(
			{
//				background: rgba(204, 204, 255, 0.3),
//				background: "#DB7C0E",
				"border": "5px solid #DB7C0E",
				cursor :"pointer",

			}
			
	);
	
	$(".hover_info .hover_info_header").css(
			{
				color: "#DB7C0E",
				"border-bottom": "2px solid #DB7C0E",

			}
			
	);
	
	$(".hover_cancel_btn").css(
			{
				opacity: 1,
				
			}
			
	);
	
	$(".hover_info").toggleClass('hover_clicked');
	
	
		
	
	
	
	
	
	
}








/////////////////////////--------item_footfalls--------/////////////////////////




function init_footfall(item_id)
{
//	console.log("draw_single_footfalls --------------- ");
	

	
	
	

	$("<div class='layer1 left_col col'> </div>").appendTo(".main_content");

	$("<div class='layer1 right_col col'> </div>").appendTo(".main_content");

	
	
	
	
	draw_footfall_graph_tool();
	init_footfall_graph(item_id);
	
	
	draw_timeline_tool();	
	draw_item_mini_timeline();
	
	
	draw_mini_map_tool();
	
	
	height_cascade();
	
	
	
//	footfall_switch_nav_btn.set_item_id(main_item_id);

//	export_nav_btn.set_export_funct(export_footfall);
	
	
//	draw_item_mini_timeline();
	
//	expand_item_mini_timeline();	
	
//	draw_single_item_item_interaction();

	
}




function reshape_item_item_interaction_data(data)
{
	var deferred = new $.Deferred();
	
	var n = 50;
	var m = 2;
	var maxRadius = vu/3;
	var clusters = new Array(m);
	
	
	var dim = d3.select(".footfall_graph_svg").node().getClientRects()[0];
	var footfall_graph_w = dim.width;
	var footfall_graph_h = dim.height;
	
	

	
	var nodes = data.item_item_interaction_list.map(function(data_elem,i){
		
		
//		console.log("-----------------");
//		console.log(data_elem.itemId2);
//		console.log(item_map[data_elem.itemId2]);
		
		var d;
		
		var cluster_id  = (i<n)? 0 : 1;

		var r = 10;
		if (item_map[data_elem.itemId2]!=null){
			r = (item_map[data_elem.itemId2].footfall/max_footfall)*maxRadius;
		}
		
		
		
		var _x = 0;
		var _y = 0;
		
//		console.log(cluster_id);
		
		if (cluster_id==1){
			_x = 0  ;
		}
		else{
			_x =  footfall_graph_w*0.7 ;
		};
			
		
		
		
		if (typeof item_map[data_elem.itemId2] === 'undefined')
		{
			d = {
				      cluster : cluster_id,
				      radius : 0,
				      item_id : 1, 
				      rank: -111,
//				      x : Math.cos(cluster_id / m * 2 * Math.PI) * footfall_graph_w/2 + footfall_graph_w / 2 + Math.random() ,
				      x : _x,
				      y : Math.sin(cluster_id / m * 2 * Math.PI) * footfall_graph_h/4 + footfall_graph_h / 2 + Math.random()
				};			
		}
		else{
			
			d = {
				      cluster : cluster_id,
				      radius : r,
				      item_id : data_elem.itemId2, 
				      rank: item_map[data_elem.itemId2].rankF,
//				      x : Math.cos(cluster_id / m * 2 * Math.PI) * footfall_graph_w/4 + footfall_graph_w / 2 + Math.random() ,
				      x : _x,
				      y : Math.sin(cluster_id / m * 2 * Math.PI) * 300 + footfall_graph_h / 2 + Math.random()
				};			
		}
		

		
		if (!clusters[cluster_id] || (r > clusters[cluster_id].radius)) { 
			clusters[cluster_id] = d;
			
			
		}

		
		
		return d;
	});
	
	

	var central_node = {
			cluster: 2,
			radius: vu/2,			
		    item_id : main_item_id, 
		    rank : item_map[main_item_id].rankF, 
			x: footfall_graph_w/2,
			y: footfall_graph_h/2
	};
	
	
	nodes.push(central_node);
	clusters.push(central_node);
	
	deferred.resolve({
		nodes : nodes,
		clusters : clusters
	});


	return deferred.promise();

}




function draw_item_info_tool()
{

	var tool_class_name = "item_info ";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*3;
	var tool_max_h = su*9;

	
	
	

	$("<div class='"+tool_class_name+"layer1 tool_box large_text'> " +
			"<div class='tool_box_header'></div>" +	
			"<div class='tool_box_content'></div>"+
	"</div>")
		.css({
			left:(0),
			top: (su+su_3),
			width:(tool_w),
			height:tool_max_h,
			"max-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".right_col");
	




	$( tool_dot_class_name+".tool_box_header" )
		.append($(
				"<div class='tool_box_header_name'> Product Information </div>"+					
				"<div class='tool_box_header_btn search_btn flat_btn'></div>"

				 
				))
				;
	
	

	var	 tool_box_ul = $( "<ul> </ul>" ).addClass("tool_box_ul").css({
		
		"max-height" : (tool_max_h),
		
	})
	.appendTo(tool_dot_class_name+".tool_box_content");
	

	
	
}





function upldate_item_info()
{
	console.log(item_map[main_item_id]);
	
	
	var item_info_data = item_map[main_item_id];
	
	
	var tool_box_ul = $(".item_info .tool_box_ul");
	
	
	

	
	$("<li class='tool_box_ul_li normal_text'>" +
			  "<div class='tool_box_ul_li_image'> <img src='content/image/image1.jpg' alt='*'> </div>"+
		  "</li>")
		  .appendTo(tool_box_ul)	   
		  ;

	
	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> name </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"+item_info_data.nameStr +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> categories </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"
		  	+string_trim(
		  			item_info_data.categoryStr.trim().replace(/\s{2,}/g,">").slice(3), 
		  			30 )+"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> Description </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"+string_trim(item_info_data.descrStr,30 )+"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
		
	
	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> price </div>"+
		  "<div class='tool_box_ul_li_value '><span> "+item_info_data.price +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	

	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> rank </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"+item_info_data.rankF +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> footfall Percentage </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"+item_info_data.footfallPerc +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> footfall  </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"+item_info_data.footfall +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> visit count  </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"+item_info_data.visitCount +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> purchase Count  </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"+item_info_data.purchaseCount +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	

	
	
	
	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> cart exit Count  </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"+item_info_data.cartexitCount +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	

	
	
	
	
}




/////////////////////////--------Get Ajax Functions--------/////////////////////////




function get_item_location(item_id)
{
//	console.log("footfalls.get_item_location : item_id :=" +item_id);

	var deferred = new $.Deferred();

	$.ajax({
		type: "POST",
	    url: "itemlocation/get",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify( {"itemId": item_id}),
	    success: function(data)
	    {
//	    	console.log("footfalls.get_item_location : 1.data :=");
//	    	console.log(data);
	    	
	    	deferred.resolve(data);
	    	
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	           console.log(jqXHR);
	           console.log(textStatus);
	           console.log(errorThrown);
	    }
	    
	});
	
	return deferred.promise();

	
}



function get_item_timeline(item_id)
{
//	console.log("footfalls.get_item_timeline : item_id :=" +item_id);

	var deferred = new $.Deferred();

	$.ajax({
		type: "POST",
	    url: "itemtimeline/get",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify( {"itemId": item_id}),
	    success: function(data)
	    {
//	    	console.log("footfalls.get_item_timeline : 1.data :=");
//	    	console.log(data);
	    	
	    	deferred.resolve(data);
	    	
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	           console.log(jqXHR);
	           console.log(textStatus);
	           console.log(errorThrown);
	    }
	    
	});
	
	return deferred.promise();

	
}



function get_item_item_interaction_data(item_id)
{
//	console.log("footfalls.get_item_item_interaction_data._get_data : item_id :=" +item_id);
	
	var deferred = new $.Deferred();
		
	$.ajax({
			type: "POST",
		    url: "itemiteminteraction/get",	    
		    contentType: "application/json; charset=utf-8",
		    dataType: "json",
		    data:  JSON.stringify( {"itemId": item_id}),
		    success: function(data)
		    {
//		    	console.log("footfalls.init_footfall_graph._get_data : 1.data :=");
//		    	console.log(data);
		    	
		    	deferred.resolve(data);
		    	
		    },
		    error: function (jqXHR, textStatus, errorThrown) {
		           console.log(jqXHR);
		           console.log(textStatus);
		           console.log(errorThrown);
		    }
	});
	   
	return deferred.promise();
};



function get_item_list(item_Id_Array)
{
//	console.log("footfalls.get_item_list : item_Id_Array :=");
//	console.log(item_Id_Array);
	
	var deferred = new $.Deferred();

	
	$.ajax({
	
		type: "POST",
	    url: "item/getlist",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify( {"itemIdArray": item_Id_Array}),
	    success: function(data){
//	    	console.log("footfalls.get_item_list : data :=");
//	    	console.log(data);
	    	
	    	deferred.resolve(data);
	    	
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	           console.log(jqXHR);
	           console.log(textStatus);
	           console.log(errorThrown);
	    }
	    

		
	});	
	
	return deferred.promise();
	
}



