var main_item_id = null;

var item_map = null;
var max_footfall = 0;
var location_data = null;
var item_item_interaction_data = null;



var footfall_main_node_svg_text = null;
var footfall_node_svg_text = null;



var footfall_timeline_data = [];
var footfall_timeline_visit_count = 0


var lat_avg = 0;
var lon_avg = 0;


var mini_map_data = [
	
	
	{
        "category": "Worldwide", 
        "values": [						            
            {
                "value": 0, 
                "type": "Visits"
            }, 
            {
                "value": 0, 
                "type": "Purchase"
            }, 
            {
                "value": 0, 
                "type": "Cart Exits"
            }
        ]
    }, 

	
	{
        "category": "Unknown", 
        "values": [						            
            {
                "value": 0, 
                "type": "Visits"
            }, 
            {
                "value": 0, 
                "type": "Purchase"
            }, 
            {
                "value": 0, 
                "type": "Cart Exits"
            }
        ]
    }

 ];



$.get('content/svg/footfall_central_node.svg', function(text_data){
	
	footfall_main_node_svg_text = text_data;
//	console.log(footfall_main_node_svg_text);
		
}, 'text');


$.get('content/svg/footfall_node_m3.svg', function(text_data){
	
	footfall_node_svg_text = text_data;
//	console.log(footfall_node_svg_text);
		
}, 'text');




/////////////////////////--------map--------/////////////////////////




function draw_mini_map_tool()
{
	
	
	
	var tool_class_name = "footfall_map";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*8;
	var tool_max_h = su*3;
	
	
	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			
			"<div class='tool_box_header_name'> Map Overview </div>"+
			"<div class='tool_box_header_btn expand_btn flat_btn'></div>"+

			
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin'> </svg>"+
			"</div>"+
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:(tool_w),
//			height:tool_max_h,
			"min-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col");
	



	$(tool_dot_class_name + " .expand_btn").click(function(){
		
		window.location ="user/item/map?i="+getUrlParameter("i");
		
	});
	
}






function update_mini_map_tool()
{
//	console.log("update_mini_map_tool ==> ");
	
    var margin = {top: 10, right: 25, bottom: 40, left: 50};


	
	var barchart_w = lu*7;
	var barchart_h = su;
	
	var item_map_svg = d3.select(".footfall_map_svg")
                        	.append("svg")
                        	.attr("x",10)
                        	.attr("y",25)
                        	;

	
	
	
	var categoriesNames = mini_map_data.map(function(d) { return d.category; });
	var valueNames = mini_map_data[0].values.map(function(d) { return d.type; });
			
//	console.log("draw_item_mini_map : _draw : categoriesNames:=");
//	console.log(categoriesNames);
			
//	console.log("draw_item_mini_map : _draw : valueNames:=");
//	console.log(valueNames);
	
	
	var color = d3.scaleOrdinal()
    					.range(["#0432ff","#009fff","#00fcff"]);


	var x0_scale = d3.scaleBand()
					    .rangeRound([0, barchart_w])
//					    .paddingInner(0.01);
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
					.tickSize(10)
					;
	
	
	var yAxis = d3.axisLeft(y_scale).ticks(3);
	

	
		
	item_map_svg.append("g")
				  .attr("class", "mini_chart_axis_x")
//				  .attr("transform", "translate(0," + barchart_h + ")")
				  .attr("transform", "translate("+margin.left+"," + (barchart_h+margin.top) + ")")								  
				  .call(xAxis)					  
				  ;

	item_map_svg.append("g")
				  .attr("class", "mini_chart_axis_y")
//			      .style('opacity','0')
				  .attr("transform", "translate("+margin.left+","+margin.top+")")
			      .call(yAxis)	
			      ;
	
	var slice = item_map_svg.selectAll(".slice")
						      .data(mini_map_data)
						      .enter()
						      .append("g")
						      .attr("class", "g")
						      .attr("transform",function(d) { 
						    
						    	  return "translate(" + (x0_scale(d.category)+margin.left) + "," + (margin.top) + ")"; 
						    	  
						      });



	

	slice.selectAll("rect")
		      .data(function(d) { 
		    	  
		    	  return d.values; 
		    	  
		      })
		      .enter()
		      .append("rect")
		      .attr("width", 20)
		      .attr("x", function(d) { 
		    	  
		    	  return x1_scale(d.type); 
		    	  
		      })
//			  .attr('dy',  '0.32em')
		      .style("fill", function(d,i) {
		    	  
		    	  return colors.touch_type[i]; 
		    	  
		      })
		      .attr("y", function(d) { return y_scale(d.value); })
		      .attr("height", function(d) {
		    	  
		    	  return barchart_h - y_scale(d.value); 
		    	  
		      })
			  .call(function(){
		        	
		      })
		      ;
	 
	 
	
	
	 

	item_map_svg
     		.append("text")			
     		.text("Visits")
     		.attr("class","chart_main_axis_title")
     		.attr("x",0)
     		.attr("y",(barchart_h/2))
     		.style("text-anchor", "middle")
     		.attr("transform", "rotate(-90,12,"+(barchart_h/2)+")");        
     		;
     		
    
     		
    var rect_w =  su_3;
    var rect_h =  su_4;
    var x_offset = su*2;
    
    
     		
	d3.select(".footfall_map_svg")     
    	.append("rect")    
 		.style("fill", colors.visit)
        .attr("width", rect_w)
        .attr("height",rect_h)
        .attr("x",barchart_w/2+x_offset)
        .attr("y",su_8)
        ;
        		
	 
		
	d3.select(".footfall_map_svg")     
    	.append("text")
    	.attr("class","chart_main_legend_text")
    	.text("Visits")
 		.attr("x",barchart_w/2+rect_w+su_8+x_offset)
 		.attr("y",(su_4))
 		.style("text-anchor", "start")
        ;
        		
        
	 
		
	d3.select(".footfall_map_svg")     
    	.append("rect")    
 		.style("fill", colors.purchase)
        .attr("width", su_3)
        .attr("height",su_4)
        .attr("x",barchart_w/2+lu+x_offset)
        .attr("y",su_8)
        ;
        		
	 
		
	d3.select(".footfall_map_svg")     
    	.append("text")
    	.attr("class","chart_main_legend_text")
    	.text("Purchases")
        .attr("x",barchart_w/2+lu+rect_w+su_8+x_offset)
 		.attr("y",(su_4))
 		.style("text-anchor", "start")
        ;
	
	   
	 
	
	d3.select(".footfall_map_svg")     
    	.append("rect")    
 		.style("fill", colors.cartexit)
        .attr("width", su_3)
        .attr("height",su_4)
        .attr("x",barchart_w/2+lu+lu+x_offset)
        .attr("y",su_8)
        ;
        		
	 
		
	d3.select(".footfall_map_svg")     
    	.append("text")
    	.attr("class","chart_main_legend_text")
    	.text("Cart Exits")
 		.attr("x",barchart_w/2+lu+lu+rect_w+su_8+x_offset)
 		.attr("y",(su_4))
 		.style("text-anchor", "start")
        ;
        			 
	 
	 
}



function reshape_location_data()
{
	var deferred = new $.Deferred();

	
	
	var location_data_l = location_data.length;
	
	
	
	for (var i =0; i<location_data_l; i++){
		
		var data_elem = location_data[i];
//		console.log(data_elem);
		
		lat_avg = lat_avg + data_elem.lat;
		lon_avg = lon_avg + data_elem.lon;
		
		if ((data_elem.lat<0)||(data_elem.lon<0)){
			
			if (data_elem.touchType==1){
				
				mini_map_data[1].values[0].value = mini_map_data[1].values[0].value + data_elem.touchCount;
				
			}
			else if (data_elem.touchType==2){
				
				mini_map_data[1].values[1].value = mini_map_data[1].values[1].value + data_elem.touchCount;
				
			}
			else if (data_elem.touchType==3){
				
				mini_map_data[1].values[2].value = mini_map_data[1].values[2].value + data_elem.touchCount;
				
			} 
			
			
		}
		else {
			

			if (data_elem.touchType==1){
				
				mini_map_data[0].values[0].value = mini_map_data[0].values[0].value + data_elem.touchCount;
				
			}
			else if (data_elem.touchType==2){
				
				mini_map_data[0].values[1].value = mini_map_data[0].values[1].value + data_elem.touchCount;
				
			}
			else if (data_elem.touchType==3){
				
				mini_map_data[0].values[2].value = mini_map_data[0].values[2].value + data_elem.touchCount;
				
			} 
		};
			
		
		
		if (i+1==location_data_l){
			
			lat_avg = lat_avg/location_data_l;
			lon_avg = lon_avg/location_data_l;
			
			console.log(mini_map_data);

	    	deferred.resolve();

		}
		
	}
	
	
	
	return deferred.promise();
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
			"<div class='tool_box_header_name'> Visits Timeline </div>"+
			"<div class='tool_box_header_btn expand_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin'> </svg>"+
			"</div>"+
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:(tool_w),
			"min-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col");
	



	$(tool_dot_class_name + " .expand_btn").click(function(){
		
		window.location ="user/item/timeline?i="+getUrlParameter("i");
		
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








function draw_item_mini_timeline()
{
	
	
	
	Promise.all([get_item_timeline(main_item_id)]).then(_reshape_data);

	

	
	function _reshape_data([data])
	{
		console.log(data);
		
		
		
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
		
		
//		console.log(footprint_timeline_hourly_data);

		
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
////    			
//    			console.log(data_elem);
    			
    			footfall_timeline_visit_count = footfall_timeline_visit_count + 1;
    			
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
//		var color = d3.scaleOrdinal().range(["#009fff","#4DF2FF","#ff6000"]);
	    var margin = {top: 10, right: 25, bottom: 40, left: 50};
	    

		
		var item_timeline_mini_chart = d3.select(".footfall_timeline_svg")
											.append("svg")
											.attr("x",0)
											.attr("y",20)
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
						    .domain(time_unit_array)
//						    .paddingInner(0.01);
						    ;
		var x1_scale = d3.scaleBand()													    
						    .domain(valueNames)
						    .range([0, x0_scale.bandwidth()])
						    .paddingOuter(1.2)
						    .paddingInner(0.7)
							;
		var y_scale = d3.scaleLinear()
							.range([barchart_h, 0])
                    		.domain(
                    				[ 0, 
                    				  d3.max(
                    						  footprint_timeline_hourly_data, 
                    						  function(time_unit){ 
                    							  return d3.max( time_unit.touch_array, function(d){ return d.value; }); 							  
                    						  })
                    			    ]
                    			  );
                    		
		
		
		var xAxis = d3.axisBottom(x0_scale)
						.tickSize(4)
						.tickFormat(d => d + "hr");
						
		var yAxis = d3.axisLeft(y_scale)
						.ticks(1)
						.tickSize(10)
						.tickFormat(d => {
							
							return parseInt(d);
						});
						;


		
		
		item_timeline_mini_chart.append("g")
								  .attr("class", "mini_chart_axis_x")
								  .attr("transform", "translate("+( margin.left )+"," + (barchart_h+margin.top) + ")")								  
								  .call(xAxis)					  
								  ;

		item_timeline_mini_chart.append("g")
							      .attr("class", "mini_chart_axis_y")
							      .attr("transform", "translate("+( margin.left )+","+(margin.top)+")")
							      .call(yAxis)	
							      ;

		
//    	console.log(footprint_timeline_hourly_data);

    	
    	
		var slice = item_timeline_mini_chart.selectAll(".slice")
										      .data(footprint_timeline_hourly_data)
										      .enter()
										      .append("g")
										      .attr("class", "g")
										      .attr("transform",function(d) { return "translate(" + x0_scale(d.time_unit) + ",0)"; });

		if (footfall_timeline_visit_count>0)
		{
			slice.selectAll("rect")
		      .data(function(d) { 
//		    	  console.log([d.touch_array[0]]);
		    	  return [d.touch_array[0]]; 
		    	  
		      })
		      .enter()
		      .append("rect")
		      .attr("width", 10)
		      .attr("x", function(d) { 
//		    	  console.log(d);
		    	  return x1_scale(d.touch_type)+margin.left+2; 			    	  
		      })
//			  .attr('dy',  '0.32em')
		      .style("fill", function(d) {			    	  
//		    	  console.log(d);			    	 
		    	  return colors.touch_type[d.touch_type_num]; 			    	  
		      })
		      .attr("height",0)
		      .attr("y", (barchart_h+margin.top) )
		      .on("mouseenter",function(d,e,g){
		    	  
		    	  console.log(d);
		    	  console.log(e);
		    	  console.log(g);
		    	  
		    	  var dim = d3.select(this).node().getClientRects()[0];
		    	  console.log(dim);
		    	  
		    	  console.log(d3.mouse(this));

		    	  
		    	  draw_svg_tooltip(("Visits : "+d.value),d3.select(".footfall_timeline_svg"),[dim.x-su*2+su_8,d3.mouse(this)[1]]);
		    	  
		    	  
		    	  d3.select(this).attr("fill-opacity",1);
		    	  
		    	  
		      })
        	  .on("mouseleave",function(e){
        		  d3.select(this).attr("fill-opacity",0.95);
        		  remove_tooltip();
        	  })
		      .transition()
              .duration(1000)
              .delay(function (d, i) {	
            	  return i * 100;
              })	
		      .attr("y", function(d) {
		    	  
//		    	  return y_scale(d.value);
		    	  
		    	  var _y = y_scale(d.value)+margin.top;
			    	
			    	return (d.value==0?_y-3:_y); 
		    	  
		      })
		      .attr("height", function(d) {
//		    	  console.log(d);
//		    	  return (barchart_h - y_scale(d.value) + margin.top); 
		    	  
		    	  var h = (barchart_h - y_scale(d.value) );
			    	
			    	return (h==0?3:h); 
		    	  
		      })
		     
		      ;
		}	
		


		
		
		item_timeline_mini_chart
        		.append("text")			
        		.text("Visits")
        		.attr("class","chart_main_axis_title")
        		.attr("x",0)
        		.attr("y",(barchart_h/2))
        		.style("text-anchor", "middle")
        		.attr("transform", "rotate(-90,12,"+(barchart_h/2)+")");        
        		;
        		
        item_timeline_mini_chart
    			.append("text")			
    			.text("Time")
    			.attr("class","chart_main_axis_title")
    			.attr("x",(barchart_w/2+margin.left))
    			.attr("y",(barchart_h+margin.bottom-su_8))
    			.style("text-anchor", "middle")
    			;        		
		

 		
        var rect_w =  su_3;
        var rect_h =  su_4;
        var x_offset = su*2;
        
        
         		
    	d3.select(".footfall_timeline_svg")     
        	.append("rect")    
     		.style("fill", colors.visit)
            .attr("width", rect_w)
            .attr("height",rect_h)
            .attr("x",barchart_w/2+lu+lu+x_offset)
            .attr("y",su_8)
            ;
            		
    	 
    		
    	d3.select(".footfall_timeline_svg")     
        	.append("text")
        	.attr("class","chart_main_legend_text")
        	.text("Visits")
        	.attr("x",barchart_w/2+lu+lu+rect_w+su_8+x_offset)
     		.attr("y",(su_4))
     		.style("text-anchor", "start")
            ;		
	  
		  
		
	}
	
	
	
}







/////////////////////////--------footfall_graph--------/////////////////////////






function init_footfall_graph()
{
	
//	console.log("init_footfall_graph --------------- ");

	
    var footfall_graph_svg = d3.select(".footfall_graph_svg")
								.attr("x", 0)
								.attr("y", 0)
								;
    
    main_item_id = current_item_id;   
    
    var item_id_array = [];
    
    item_id_array.push(current_item_id);
    
    
    
    
    
    $.when(get_item_item_interaction_data(current_item_id)).done(function(data) {
    	
//    	console.log("footfall.init_footfall_graph : 1. data:=");
//    	console.log(data);    	
//    	console.log(data.itemMap);
    	
    	item_map = data.itemMap;
    	
////    	max_footfall = Math.max.apply(Math, item_map.map(function(o) { return o.footfall; }));
//    	
    	$.each( item_map, function( key, value ) {
    		
//    		console.log(value);
    		
    		max_footfall = ( value.footfallCount > max_footfall ) ?  value.footfallCount : max_footfall ;
    		
    	});
    	
    	
    	
    	
    	Promise.all([reshape_item_item_interaction_data(data)]).then(function ([data]){    	
        	
//    		console.log(data);
    		
	    	draw_footfall_graph(data);
    	
	    	height_cascade();
        	
        });  
    	
    	
    });
    
    

	
}





function draw_footfall_graph_tool()
{
	
	var tool_class_name = "footfall_graph";
	var tool_dot_class_name = " ."+tool_class_name;

	
	var tool_dot_class_name = "."+tool_class_name;
	
	var tool_w = lu*8;
	var tool_max_h = su*11;
	
		

	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Footfall Graph </div>"+
			"<div class='tool_box_header_btn up_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin'> </svg>"+
			"</div>"+
	"</div>")
		.css({
			left:(0),
//			top: (su+su_3),
			width:(tool_w),
			height:tool_max_h,
			"max-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col");
	




	$(tool_dot_class_name+" .up_btn ").click(function(){
		
		
		var dim = $(tool_dot_class_name)[0].getBoundingClientRect();
		

		window.scrollTo(0, dim.y+window.scrollY-gap_su_1);
		
	});
	
	
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
	console.log("draw_footfall_graph - ");
	console.log(footfall_graph_data);
	
	
	
	
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
    				.force('center', d3.forceCenter(footfall_graph_w/2, footfall_graph_h/2-su))
    				.force('cluster', cluster().strength(0.1))
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
								    		c = "footfall_node footfall_primary_node"
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
								    	
								    	
								    	console.log(d);
								    	draw_modal_info_svg_tool(d3.select(this),d3.mouse(this),item_item_interaction_data.itemMap[d.item_id]);	
								    	
								    	
//								    	d3.select(this).attr("filter", "url(#flat_shadow_up)");
//								    	draw_footfall_graph_info(d3.select(this),d);

								    
								    })
								    .on("mouseleave",function(d) {
								    	
								    	remove_modal_info_svg_tool();
								    	
								    	console.log(d);
								    	
								    })								  
								    .on("click",function(d) { 
								    									    
								    	
										window.location ="user/item/footfall?i="+d.item_id;

								    	
								    })


								    ;



	// a circle to represent the node
    node.append("circle")
        .attr("class", "footfall_node_circle") 	        
        .attr("r", function(d) {
        	
//	    	return secondary_node_d;
	    	
	    	return (d.item_id===current_item_id) ? lu_3 : secondary_node_d;
		}) 	 
//		.style("fill", function(d) {
//			
//			var c = d.item_id%12;
//
////			console.log(c);
//			
////	    	return (d.item_id===main_item_id) ? colors.main_node_bg : colors.secondary_node_bg;
//					
//			return (d.item_id===current_item_id) ? colors.main_node_bg : color_palette[c];
//		}) 	
		.style("stroke", function(d) {
			
			var c = parseInt(d.item_id)%12;
								
			return category_to_color(item_item_interaction_data.itemMap[d.item_id].catArray);
		}) 	
		.style("opacity", function(d) {
						
			return (d.item_id===current_item_id) ? 1 : 0.8;
			
		}) 	
        ;
	
   
 // Append images
    var images = node.append("svg:image")
          .attr("xlink:href",  function(d) { 
        	  return item_item_interaction_data.itemMap[d.item_id].imageUrl;})
          .attr("x", function(d) { 

        	  return (d.item_id===current_item_id) ?  -(lu_3-su_8-3) : -(secondary_node_d-su_8);
        	  
          })
          .attr("y", function(d) { 
        	  return (d.item_id===current_item_id) ?  -(lu_3-su_8-3) : -(secondary_node_d-su_8);
        	  
          })
          .attr("height",function(d) { 
        	  return (d.item_id===current_item_id) ?  (lu_3*2-su_4-6) : (secondary_node_d*2-su_4);
        	  
          })
          .attr("width",  function(d) { 
        	  return (d.item_id===current_item_id) ?  (lu_3*2-su_4-6) : (secondary_node_d*2-su_4);
        	  
          })
          ;
	
	

    
    
    
    
    
	$.get("content/svg/right_arrow_symb.svg", function(text_data){
		
		footfall_graph_svg
			.append("g")
			.attr("class","flat_btn")
			.attr("data-item_id","-1")
			.html(text_data)
			.attr("transform","translate("+(footfall_graph_w/2-lu_mi/2-symb_s*0.666)+", "+( (footfall_graph_h/2 -lu_mi/2 ) ) +") scale("+(0.666)+")")
			
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
    
    
    
//    console.log(footfall_graph_data.clusters[1]);
//    console.log("footfall_graph_data.clusters[1]" in window);
//    console.log(footfall_graph_data.clusters[0]);
//    console.log(footfall_graph_data.clusters[0] in window);
    
    
    
    
	$.get("content/svg/uncomplete_btn.svg", function(text_data){
		
	
        if (typeof footfall_graph_data.clusters[1]==='undefined'){
        	
        	
        	console.log("What!");
        	
        	
        	footfall_graph_svg
            		.append("g")
            		.attr("class","no_footfall_node")
            		.attr("data-item_id","-1")
            		.html(text_data)
            		.attr("transform","translate("+(footfall_graph_w/2-lu_mi/2-symb_s-su_3)+", "+( (footfall_graph_h/2 -lu_mi/2 ) ) +") scale("+(0.666)+")")
            		.on("mouseenter",function(e){
            			
            			console.log(d3.mouse(this));
                        		
            			var mouse_coord = d3.mouse(this);
            			
            			mouse_coord = [mouse_coord[0],mouse_coord[1]-su];
            			
            			mouse_coord = [su_2,-su_3];
            			
                		draw_svg_tooltip("No Incoming footfall",d3.select(this),mouse_coord);
                        		                        		
                	})
                	.on("mouseleave",function(e){                        		

                		remove_tooltip();
                		
                	})
                	;
        	
        }
        
        if (typeof footfall_graph_data.clusters[0]==='undefined'){
        	
        	
        	
    		footfall_graph_svg
    			.append("g")
    			.attr("class","no_footfall_node")
    			.attr("data-item_id","-1")
    			.html(text_data)
    			.attr("transform","translate("+(footfall_graph_w/2+lu_mi/2+su)+", "+( (footfall_graph_h/2 -lu_mi/2 ) ) +") scale("+(0.666)+")")
    			.on("mouseenter",function(e){
            			
            			console.log(d3.mouse(this));
                        		
            			var mouse_coord = d3.mouse(this);
            			
            			mouse_coord = [mouse_coord[0],mouse_coord[1]-su];
            			
            			mouse_coord = [su_2,-su_3];
            			
                		draw_svg_tooltip("No Out-going footfall",d3.select(this),mouse_coord);
                        		                        		
                	})
                	.on("mouseleave",function(e){                        		

                		remove_tooltip();
                		
                	})
    		
        	
        }
    
    

	}, "text");	
	
    
    
    

    function layoutTick(e) 
    {
    	
    	var x_left = 0;
    	var x_left_max = 0;
    	var x_right = 10000;
    	
    	
    	
    	node
    		.attr("transform", function(d) {
    			
//    			console.log(secondary_node_d);

    			var _x = d.x ;
    			var _y = d.y ;
    			var _rotate = 0;

		   	  
    			if ( d.cluster == 1 ){
    				
    				 
    			   	  if (d.x<=0)
    		    	  {
    		       		  d.x = 0;
    		       	  }
    		    	  
    		       	  if ( d.x >= ( footfall_graph_w/2 - 0 ) )
    		       	  {
    		       		  d.x = footfall_graph_w/2 - 0 ;
    		       	  }
    		       	  
    		       	  
    				

    				
    			} 
    			else if ( d.cluster == 0 ){
    				
    				 if (d.x<=footfall_graph_w/2 + symb_s*1 + secondary_node_d)
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
		   		
		   	  }
		   	  else
		   	  {
		   		  _x = d.x  ;
		   		  _y = d.y + su ;
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







/////////////////////////--------item_footfalls--------/////////////////////////




function init_footfall()
{
//	console.log("draw_single_footfalls --------------- ");
	


	$("<div class='layer1 left_col col'> </div>").appendTo(".main_content");

	$("<div class='layer1 right_col col'> </div>").appendTo(".main_content");

	
	
	draw_item_info_tool();

	
	Promise.all([get_single_item_data(current_item_id)]).then(function (){    	
    	
    	current_item_data = single_item_data;
    	update_item_info();
    	
    });  
	
	
	
	
	
	draw_footfall_graph_tool();
	init_footfall_graph();
	
	
	draw_timeline_tool();
		
	
	
	
	
	draw_item_mini_timeline();
//	
//	
//	draw_mini_map_tool();
	
	
	

	
	draw_mini_map_tool();

	
	Promise.all([get_item_location()])
	   .then( function (){
		   
//		   console.log(location_data);	
		   
		   Promise.all([reshape_location_data()]).then( function (){
			   			   
			   update_mini_map_tool();
			   
		   });		   
		   
	   });
	
	
	init_export_btn();
	
	
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
	var m = 2;
	var maxRadius = vu/3;
	var clusters = new Array(m);
	
	
	var dim = d3.select(".footfall_graph_svg").node().getClientRects()[0];
	var footfall_graph_w = dim.width;
	var footfall_graph_h = dim.height;
	
	
	console.log(data);
	
	
	
	var nodes = [];
	var item_item_interaction_list_l = data.item_item_interaction_list.length;
	
	
	for (var i=0; i<item_item_interaction_list_l;i++){
		
		var data_elem = data.item_item_interaction_list[i];
//		console.log(data_elem);
		
		var d;
		
		var cluster_id  = (data_elem.inCount==0)? 0 : 1;

		var _x = 0;
		var _y = 0;
		
		var r = 15;
		
		

		if (cluster_id==1){
			_x = 0  ;
		}
		else{
			_x =  footfall_graph_w/2+lu ;
		};
		
		
		console.log(data_elem);		
		
		console.log(_x);	
		
		
//		console.log( data.itemMap[data_elem.itemId2]);
		
		
		if ((typeof data.itemMap[data_elem.itemId2] !== 'undefined') 
				&& (data_elem.itemId2>0) 
				&& (data_elem.itemId1 != data_elem.itemId2)
		   )
		{


			d = {
				      cluster : cluster_id,
				      radius : r,
				      item_id : data_elem.itemId2, 
				      rank: data.itemMap[data_elem.itemId2].footfallRank,
//				      x : Math.cos(cluster_id / m * 2 * Math.PI) * footfall_graph_w/4 + footfall_graph_w / 2 + Math.random() ,
				      x : _x,
//				      y : Math.sin(cluster_id / m * 2 * Math.PI) * 300 + footfall_graph_h / 2 + Math.random() 
				      y : footfall_graph_h / 2 + Math.random()
				};		

			nodes.push(d);
		}
		

		
		if (!clusters[cluster_id] || (r > clusters[cluster_id].radius)) { 
			clusters[cluster_id] = d;			
		}

		
		
		if (i+1==item_item_interaction_list_l){
			var central_node = {
					cluster: 2,
					radius: vu/2,			
				    item_id : current_item_id, 
				    rank : item_map[current_item_id].footfallRank, 
					x: footfall_graph_w/2,
					y: footfall_graph_h/2
			};
			
			
			nodes.push(central_node);
			clusters.push(central_node);
			
			deferred.resolve({
				nodes : nodes,
				clusters : clusters
			});
		}
		
		
		
	}
	
	
	if (0==item_item_interaction_list_l){
		var central_node = {
				cluster: 2,
				radius: vu/2,			
			    item_id : current_item_id, 
			    rank : item_map[current_item_id].footfallRank, 
				x: footfall_graph_w/2,
				y: footfall_graph_h/2
		};
		
		
		nodes.push(central_node);
		clusters.push(central_node);
		
		deferred.resolve({
			nodes : nodes,
			clusters : clusters
		});
	}
	
	
	
	return deferred.promise();
}






function init_export_btn()
{
	
	$(".nav_export_btn")
			.click(function(e){
				
				console.log("nav_prediction_btn click");
				remove_tooltip();
				
				
				console.log(e);
				console.log($(this).offset());
				console.log($(this).position());
				console.log(e.originalEvent);
				console.log(window.scrollY);
				
				
				
				var tool_w = su*4;
				var tool_max_h = su*2;
				
				$(
					"<div class='modal_export'>" +
					"<div class='modal_export_box_header small_text bold_text'> &nbsp; &nbsp; &nbsp; &nbsp;Download CSVs" +
						"<div class='modal_export_box_header_btn cancel_btn flat_btn'></div>"+

					"</div>"+
					"<div class='modal_export_box_content'>" +
    					"<div class='modal_export_row small_text'> Product Overview Data" +
    						"<div class='modal_export_box_header_btn download_btn  prediction_data_download  '></div>"+
    					"</div>"+
    					"<div class='modal_export_row small_text'> Product Data" +
    						"<div class='modal_export_box_header_btn  download_btn  production_data_download '></div>"+
    					"</div>"+
					"</div>"+
					"</div>" 	
				)
				.css({
					left:(su+su_3),
//					top: (e.originalEvent.clientY+window.scrollY-su+su_8),
//					top: ($(this).position()[0]-tool_max_h/2),
					top: ($(this).position().top),
					width:(tool_w),
//					height:tool_max_h,
					"min-height" : (tool_max_h),
					
				})
				.data("view_status",1)
				.click(function(){
				
				})		
				.appendTo("body");
			
				$(".modal_export_box_header_btn")
    				.click(function(){
    					$(".modal_export").remove();
    					
    				});
				
				
				$(".prediction_data_download")
    				.click(function(){
    					_footfall_data_download();
    					
    				});
				

				$(".production_data_download")
    				.click(function(){
    					
    					_product_data_download();
    				});
				
				
				
			});
	

	
	
	
	
	var _footfall_data_download = function ()
	{
		console.log(current_item_data);	
		
		var export_data = [];
		
		
		export_data.push(["====","====","====","===="]);
		export_data.push(["Main Product","Exported On = "+Date()]);
		export_data.push([""]);
		

		var keys = Object.keys(current_item_data);
		var values = Object.values(current_item_data);
		
		var keys_l = keys.length;
		
		for (var i=0; i<keys_l; i++){
		
			
			if (keys[i]=="itemId"){
				export_data.push(["Item Id", values[i]]);				
			}

			if (keys[i]=="nameStr"){
				export_data.push(["Name", values[i]]);
			}

			if (keys[i]=="catArray"){
				export_data.push(["Categories", values[i]]);
			}

			if (keys[i]=="price"){
				export_data.push(["Price", values[i]]);
			}

			if (keys[i]=="descrStr"){
				export_data.push(["Description", values[i]]);
			}
			
			if (keys[i]=="imageUrl"){
				export_data.push(["Image URL", values[i]]);
			}

			if (keys[i]=="footfallRank"){
				export_data.push(["Footfall Rank", values[i]]);
			}

			if (keys[i]=="footfallPerc"){
				export_data.push(["Footfall Percentage", values[i]]);
			}

			if (keys[i]=="footfallCount"){
				export_data.push(["Footfall Count", values[i]]);
			}
			
			if (keys[i]=="visitCount"){
				export_data.push(["Visit Count", values[i]]);
			}
			
			if (keys[i]=="purchaseCount"){
				export_data.push(["Purchase Count", values[i]]);
			}
			
			if (keys[i]=="cartexitCount"){
				export_data.push(["Cartexit Count", values[i]]);
			}
			
		}

		export_data.push([""]);
		export_data.push([""]);
		export_data.push(["====","====","====","===="]);
		export_data.push(["Gain and Loss (Footfall)"]);
		export_data.push([""]);
		export_data.push(["====","Gain (In - Coming)","===="]);
		var export_item_row_header = [ 	"Index", "Name",	 "Item Id",	"Categories",	"Price","Footfall Rank", "Footfall Percentage",	 	"Footfall Count"	];		
		export_data.push(export_item_row_header);
		
		var _length = item_item_interaction_data.item_item_interaction_list.length;
		var count = 0;

		for (var i=0; i<_length; i++ ){
			
			var data_elem = item_item_interaction_data.item_item_interaction_list[i];
			
			if ((data_elem.outCount==0)&&(data_elem.itemId2!=-1)){
				
				
				var _item_data = item_item_interaction_data.itemMap[data_elem.itemId2];
//				console.log(_item_data);
				
				
				count = count+1;
				export_data.push([
					count,
					_item_data["nameStr"],
					_item_data["itemId"],
					_item_data["catArray"],
					_item_data["footfallRank"],
					_item_data["footfallPerc"],
					_item_data["footfallCount"],
					
					
				]);
			}
			
		}
		
		export_data.push([""]);
		export_data.push([""]);
		export_data.push(["====","Loss (Out - Going)","===="]);
		export_data.push([""]);
		var export_item_row_header = [ 	"Index", "Name",	 "Item Id",	"Categories",	"Price","Footfall Rank", "Footfall Percentage",	 	"Footfall Count"	];		
		export_data.push(export_item_row_header);
		
		var _length = item_item_interaction_data.item_item_interaction_list.length;
		var count = 0;

		for (var i=0; i<_length; i++ ){
			
			var data_elem = item_item_interaction_data.item_item_interaction_list[i];
			
			if ((data_elem.inCount==0)&&(data_elem.itemId2!=-1)){
				
				console.log(data_elem);
				var _item_data = item_item_interaction_data.itemMap[data_elem.itemId2];
				console.log(_item_data);
				
				
				count = count+1;
				export_data.push([
					count,
					_item_data["nameStr"],
					_item_data["itemId"],
					_item_data["catArray"],
					_item_data["footfallRank"],
					_item_data["footfallPerc"],
					_item_data["footfallCount"],
					
					
				]);
			}
			
		}
		
		
		
		
		
		console.log(export_data);		
		


		var csvString = export_data.map(row => row.join(',')).join('\n');
		var a         = document.createElement('a');
		a.href        = 'data:attachment/csv,' +  encodeURIComponent(csvString);
		a.target      = '_blank';
		a.download    = 'Product_Footprint_'+string_trim(current_item_data.nameStr,20)+'['+current_item_data.itemId+']'+'.csv';
		
		document.body.appendChild(a);
		a.click();
		
	}
	
	
	
	
	
	var _product_data_download = function ()
	{
		
//		console.log(a);
//		console.log(current_item_data);		
		
		var export_item_data = [];
		
		var keys = Object.keys(current_item_data);
		var values = Object.values(current_item_data);
		
		var keys_l = keys.length;
		
		for (var i=0; i<keys_l; i++){
		
			
			if (keys[i]=="itemId"){
				export_item_data.push(["Item Id", values[i]]);				
			}

			if (keys[i]=="nameStr"){
				export_item_data.push(["Name", values[i]]);
			}

			if (keys[i]=="catArray"){
				export_item_data.push(["Categories", values[i]]);
			}

			if (keys[i]=="price"){
				export_item_data.push(["Price", values[i]]);
			}

			if (keys[i]=="descrStr"){
				export_item_data.push(["Description", values[i]]);
			}
			
			if (keys[i]=="imageUrl"){
				export_item_data.push(["Image URL", values[i]]);
			}

			if (keys[i]=="footfallRank"){
				export_item_data.push(["Footfall Rank", values[i]]);
			}

			if (keys[i]=="footfallPerc"){
				export_item_data.push(["Footfall Percentage", values[i]]);
			}

			if (keys[i]=="footfallCount"){
				export_item_data.push(["Footfall Count", values[i]]);
			}
			
			if (keys[i]=="visitCount"){
				export_item_data.push(["Visit Count", values[i]]);
			}
			
			if (keys[i]=="purchaseCount"){
				export_item_data.push(["Purchase Count", values[i]]);
			}
			
			if (keys[i]=="cartexitCount"){
				export_item_data.push(["Cartexit Count", values[i]]);
			}
			
		}


		

		var csvString = export_item_data.map(row => row.join(',')).join('\n');
		var a         = document.createElement('a');
		a.href        = 'data:attachment/csv,' +  encodeURIComponent(csvString);
		a.target      = '_blank';
		a.download    = 'Product_'+string_trim(current_item_data.nameStr,20)+'['+current_item_data.itemId+']'+'.csv';
		
		
		
		document.body.appendChild(a);
		a.click();
		
	}
	
	
}





/////////////////////////--------Get Ajax Functions--------/////////////////////////






function get_item_location()
{
//	console.log("footfalls.get_item_location : item_id :=" +item_id);

	var deferred = new $.Deferred();

	$.ajax({
		type: "POST",
	    url: "itemlocation/get",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify( {"itemId": current_item_id}),
	    success: function(data)
	    {
//	    	console.log("footfalls.get_item_location : 1.data :=");
//	    	console.log(data);
	    	
	    	location_data = data;
	    	
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
		    	
		    	item_item_interaction_data = data ;
		    	
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



