


var item_data = null;
var item_map = {};



var interaction_history_data=null;
var item_rank_map={};
var item_rank_array=[];


var interaction_data = null;
var overall_time_array = {};
var overall_timeline_data = null;


var footfall_data=null;



var best_purchase_to_visit_item = {item_id:-1,ratio:0.0,footfallCount:0, price:0};
var best_cartexit_to_purchase_item = {item_id:-1,ratio:0.0,footfallCount:0, price:0};
var highest_footfall_item = {item_id:-1,footfallCount:0, price:0};
var lowest_footfall_item = {item_id:-1,footfallCount:10000, price:0};





function draw_overview()
{

    $("<div class='layer1 left_col col'> </div>").appendTo(".main_content");
    $("<div class='layer1 middle_col col'> </div>")
    	.css({
    	    left:lu*3+su+su
    	})
    	.appendTo(".main_content");
    $("<div class='layer1 right_col col'> </div>").appendTo(".main_content");


    
	draw_overview_timeline_tool();		

	
    
    Promise.all([get_item_data()]).then(function (){
    	
    	Promise.all([get_all_overall_timeline()]).then(function (){
    	    
    	    console.log(overall_timeline_data);
    	    
    	    update_overview_timeline_tool();		
    	    
    	    compute_last_week_perc();
    	});    	
	
		draw_footfall_overview_count_tool();
	
		draw_footfall_pricing_tool();		
	
	    Promise.all([get_interaction_history_data()]).then(function (){
	    	
//	    	console.log(interaction_history_data);
	    	    	
	    	Promise.all([compute_interaction_history_data()]).then(function (){
	    	    draw_current_popular_item_item();
	    	});
		
	    });
		
    });
    


    height_cascade();

	
}





function draw_footfall_pricing_tool()
{    
    var tool_class_name = "footfall_pricing";
    var tool_dot_class_name = " ."+tool_class_name;
    
    var tool_w = lu*8;
    var tool_max_h = su*7;
    
	
	
    $("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Pricing Optimization </div>"+
			"<div class='tool_box_header_btn expand_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin' height=480> </svg>"+
			"</div>"+
    "</div>")
            .css({
        	left:(0),
        	top: (0),
        	width:(tool_w),
        	"max-height" : (tool_max_h),
        
            })
            .data("view_status",1)
            .click(function(){
        
            })		
            .appendTo(".middle_col");
    

	$(tool_dot_class_name+" .expand_btn").click(function(){
		console.log("click");
		window.location ="user/overview/price_optimization";
	});
	
	
	
    compute_pricing();
    
    _draw();
    
    
    
    function _draw()
    {

//	console.log(item_data);
	
	var margin = {top: 33, right: 0, bottom: 30, left: 40};

	var this_chart_w = lu*7;
	var this_chart_h = su*4;
	


	var footfall_pricing_chart = d3.select(".footfall_pricing_svg")
                                	.append("svg")
                                	.attr("class","footfall_pricing_chart")
                                	.attr("x",0)
                                	.attr("y",0)
                                	;

	var x_scale = d3.scaleLinear()
                    	.rangeRound([margin.right, this_chart_w])
                    	.domain(d3.extent(item_data, d => d.price)).nice()
                    	;

	var y_scale = d3.scaleLinear()
                	.range([this_chart_h, margin.right])
                	.domain(d3.extent(item_data, d => d.footfallCount)).nice()
                	;

	var xAxis = d3.axisBottom(x_scale)
//                    	.tickSize(0)
//                    	.tickFormat(d3.timeFormat("%b-%y"))
                    	;

	var yAxis = d3.axisLeft(y_scale)
			.ticks(3)
		;


	footfall_pricing_chart.append("g")
                        	.attr("class", "x_axis")
                            .attr("transform", "translate("+margin.left+"," + (this_chart_h+margin.top) + ")")
                        	.call(xAxis)
                        	;

	footfall_pricing_chart.append("g")
                        	.attr("class", "y_axis")
                    		.attr("transform", "translate("+margin.left+","+margin.top+")")
                        	.call(yAxis)	
                        	;

	var line_footfall = d3.line()
                        	.curve(d3.curveStep)
        
                        	.x(d => {
                        	    
                        	    return (x_scale(d.price)+margin.left);
                        	    
                        	})
                        	.y(d => y_scale(d.footfallCount)+margin.top)
                        	.curve(d3.curveCardinal.tension(0.6))
                        	;
	
	var line_purchase = d3.line()
                        	.curve(d3.curveStep)                        
                        	.x(d => {
                        	    
                        	    return (x_scale(d.price)+margin.left);
                        	    
                        	})
                        	.y(d => y_scale(d.purchaseCount)+margin.top)
                        	.curve(d3.curveCardinal.tension(0.6))
                        	;


	
	footfall_pricing_chart.append("path")
                        	.datum(function(){

                        	    
                        	    return (
                        		    
                        		    [{
                        			footfallCount:0,
                        			price:10000
                        			
                                	    }]
                        		    .concat(item_data)
                        		    .concat([{
                        			footfallCount:0,
                        			price:0
                        			
                                	    }])
                            	    
                        	    );
                        	
                        	})
                        	.attr("class", "footfall_pricing_chart_visit_path")
                        	.attr("fill", "none")
                        	.attr("stroke", "var(--visit_color)")
                        	.attr("stroke-width", 1.5)
                        	.attr("stroke-linejoin", "round")
                        	.attr("stroke-linecap", "round")
                        	.attr("fill", "var(--visit_color)")
                        	.attr("fill-opacity",0.3)
                        	.attr("d", line_footfall)
                        	.on("mouseenter",function(e){
                        		
                        		draw_svg_tooltip("Visit",d3.select(".footfall_pricing_svg"),d3.mouse(this));
                        		d3.select(this).attr("fill-opacity",0.5);
                        		
                        		
                        	})
                        	.on("mouseleave",function(e){
                        		
                        		d3.select(this).attr("fill-opacity",0.3);
                        		remove_tooltip();
                        		
                        	})
                        	;
	
	
	
	footfall_pricing_chart.append("path")
                        	.datum(function(){
                        
                        	    
                        	    return (
                        		    
                        		    [{
                        			purchaseCount:0,
                        			price:10000
                        			
                                	    }]
                        		    .concat(item_data)
                        		    .concat([{
                        			purchaseCount:0,
                        			price:0
                        			
                                	    }])
                            	    
                        	    );
                        	
                        	})
                        	.attr("class", "footfall_pricing_chart_purchase_path")
                        	.attr("fill", "none")
                        	.attr("stroke", "var(--purchase_color)")
                        	.attr("stroke-width", 1.5)
                        	.attr("stroke-linejoin", "round")
                        	.attr("stroke-linecap", "round")
                        	.attr("fill", "var(--purchase_color)")
                        	.attr("fill-opacity",0.3)
                        	.attr("d", line_purchase)
                        	.on("mouseenter",function(){                        		
                        		draw_svg_tooltip("Purchase",d3.select(".footfall_pricing_svg"),d3.mouse(this));
                        		d3.select(this).attr("fill-opacity",0.5);
                        	})
                        	.on("mouseleave",function(e){
                        		d3.select(this).attr("fill-opacity",0.3);
                        		remove_tooltip();                        		
                        	})
                        	;
                        	
	
	
    footfall_pricing_chart
		.append("text")			
		.text("Footfall")
		.attr("class","chart_main_legend")
		.attr("x",0)
		.attr("y",(this_chart_h/2+margin.top))
		.style("text-anchor", "middle")
		.attr("transform", "rotate(-90,12,"+(this_chart_h/2+margin.top)+")");
		;
		
		
                		
	footfall_pricing_chart
		.append("text")			
		.text("Price Range")
		.attr("class","chart_main_legend")
		.attr("x",(this_chart_w/2+margin.left))
		.attr("y",(this_chart_h+margin.top+su_mi))
		.style("text-anchor", "middle")

		;                   	
	
	
	
	
	var _draw_lowest_tag = function(){
	    
		
		var direction =  (x_scale(lowest_footfall_item.price)+300>this_chart_w) ? -1 : 1;
		
		
		var price_opt_lowest_visit_g = footfall_pricing_chart
	                                		.append("g")
	                                		.attr("class", "price_opt_highest_visit_g")
	                                		.attr("transform", "translate("
	                                				+ (x_scale(lowest_footfall_item.price)+margin.left)+"," 
	                                				+ (y_scale(lowest_footfall_item.footfallCount)+margin.top) + ")")
	                                		.datum(
	                                			{
	                                			    direction:direction,
	                                			    parent:tool_class_name,
	                                			    item:item_map[lowest_footfall_item.item_id]
	                                			})
							.on("mouseenter",function(){
							    
							    
							    _draw_indicated_item(d3.select(this),d3.select(this).datum());
							    
							    
							})
							.on("mouseleave",function(){
							    
							    $(".chart_indicated_item").remove();  
							    
							})
							.on("click",function(){
							    
								window.location ="user/item/overview?i="+lowest_footfall_item.item_id;
							    
							})
							;
	                                		
		price_opt_lowest_visit_g	
			.append("circle")
			.attr("class", "price_opt_highest_visit_circle")
			.attr("r", 10)
			.attr("cx",0)
			.attr("cy",0)
			;
		
		price_opt_lowest_visit_g
			.append("line")
			.attr("class", "price_opt_highest_visit_line")		
			.attr("x1",(direction)*10)
			.attr("x2",(direction)*40)
			.attr("y1",0)
			.attr("y2",0)
			;
		
		price_opt_lowest_visit_g
	        	.append("rect")
	        	.attr("class", "price_opt_highest_visit_rect")		
	        	.attr("x",function(){
	        	    return (direction>0) ? 40 : (direction)*(40+70);
	        	})
	        	.attr("y",-15)
	        	.attr("width",70)
	        	.attr("height",30)
	        	;

		price_opt_lowest_visit_g
	        	.append("text")
	        	.attr('xml:space', 'preserve')
	        	.attr("class", "price_opt_highest_visit_text small_text")		
	        	.attr("x",function(){
	        	    return (direction>0) ? 40 : (direction)*(40+70);
	        	})
	        	.attr("y",0)
	        	.text(" Lowest")
	        	;
	};
	_draw_lowest_tag();
	
	

	var _draw_highest_tag = function(){
	    
		
		var direction =  (x_scale(highest_footfall_item.price)+300>this_chart_w) ? -1 : 1;
		
		
		var price_opt_highest_visit_g = footfall_pricing_chart
	                                		.append("g")
	                                		.attr("class", "price_opt_highest_visit_g")
	                                		.attr("transform", "translate("+(x_scale(highest_footfall_item.price)+margin.left)+"," + ( y_scale(highest_footfall_item.footfallCount)+margin.top) + ")")
	                                		.datum(
	                                			{
	                                			    direction:direction,
	                                			    parent:tool_class_name,
	                                			    item:item_map[highest_footfall_item.item_id]
	                                			})
							.on("mouseenter",function(){
							    
							    _draw_indicated_item(d3.select(this),d3.select(this).datum());
							    
							})
							.on("mouseleave",function(){
							    
							    $(".chart_indicated_item").remove();  
							    
							})
							.on("click",function(){
							    
								window.location ="user/item/overview?i="+highest_footfall_item.item_id;
							    
							})
							;
	                                		
		price_opt_highest_visit_g	
			.append("circle")
			.attr("class", "price_opt_highest_visit_circle")
			.attr("r", 10)
			.attr("cx",0)
			.attr("cy",0)
			;
		
		price_opt_highest_visit_g
			.append("line")
			.attr("class", "price_opt_highest_visit_line")		
			.attr("x1",(direction)*10)
			.attr("x2",(direction)*40)
			.attr("y1",0)
			.attr("y2",0)
			;
		
		price_opt_highest_visit_g
	        	.append("rect")
	        	.attr("class", "price_opt_highest_visit_rect")		
	        	.attr("x",function(){
	        	    return (direction>0) ? 40 : (direction)*(40+70);
	        	})
	        	.attr("y",-15)
	        	.attr("width",70)
	        	.attr("height",30)
	        	;

		price_opt_highest_visit_g
	        	.append("text")
	        	.attr('xml:space', 'preserve')
	        	.attr("class", "price_opt_highest_visit_text small_text")		
	        	.attr("x",function(){
	        	    return (direction>0) ? 40 : (direction)*(40+70);
	        	})
	        	.attr("y",0)
	        	.text(" Highest")
	        	;
		
		
	};
	_draw_highest_tag();
	
	
	
	var _draw_best_purchase_to_visit_tag = function(){
		
		var direction =  (x_scale(best_purchase_to_visit_item.price)+300>this_chart_w) ? -1 : 1;
		var rect_w = 130;
		
		var price_opt_highest_visit_g = footfall_pricing_chart
	                                		.append("g")
	                                		.attr("class", "price_opt_highest_visit_g")
	                                		.attr("transform", "translate(" 
	                                				+ (x_scale(best_purchase_to_visit_item.price)+margin.left)+"," 
	                                				+ (y_scale(best_purchase_to_visit_item.footfallCount)+margin.top) + ")")
	                                		.datum(
	                                			{
	                                			    direction:direction,
	                                			    parent:tool_class_name,
	                                			    item:item_map[best_purchase_to_visit_item.item_id]
	                                			})
							.on("mouseenter",function(){
							    
							    
							    _draw_indicated_item(d3.select(this),d3.select(this).datum());
							    
							    
							})
							.on("mouseleave",function(){
							    
							    $(".chart_indicated_item").remove();  
							    
							})
							.on("click",function(){
							    
								window.location ="user/item/overview?i="+best_purchase_to_visit_item.item_id;
							    
							})
							;
							;
		
		
		price_opt_highest_visit_g	
			.append("circle")
			.attr("class", "price_opt_highest_visit_circle")
			.attr("r", 10)
			.attr("cx",0)
			.attr("cy",0)
			;
		
		price_opt_highest_visit_g
			.append("line")
			.attr("class", "price_opt_highest_visit_line")		
			.attr("x1",(direction)*10)
			.attr("x2",(direction)*40)
			.attr("y1",0)
			.attr("y2",0)
			;
		
		price_opt_highest_visit_g
	        	.append("rect")
	        	.attr("class", "price_opt_highest_visit_rect")		
	        	.attr("x",function(){
	        	    return (direction>0) ? 40 : (direction)*(40+rect_w);
	        	})
	        	.attr("y",-15)
	        	.attr("width",rect_w)
	        	.attr("height",30)
	        	;

		price_opt_highest_visit_g
	        	.append("text")
	        	.attr('xml:space', 'preserve')
	        	.attr("class", "price_opt_highest_visit_text small_text")		
	        	.attr("x",function(){
	        	    return (direction>0) ? 40 : (direction)*(40+rect_w);
	        	})
	        	.attr("y",0)
	        	.text(" Best Performing")
	        	;		
		
		
		
	}
	_draw_best_purchase_to_visit_tag();
	
	
	
	var _draw_indicated_item = function(svg_elem,item_elem)
	{
	    
	    console.log(item_elem);
	    console.log(svg_elem.attr("class"));
	    
	    var dim = svg_elem.node().getClientRects()[0];
	    console.log(dim);
	    
		
	    $("<div class='chart_indicated_item '> " +
	    		 "<div class='chart_indicated_item_image'> <img src='"+item_elem.item.imageUrl+"' alt='*'> </div>"+
	    		 "<div class='chart_indicated_item_name small_text bold_text'> " +string_trim(item_elem.item.nameStr,28)+" </div>"+
	    		 "<div class='chart_indicated_item_indicator normal_text ' style='float:left'> " +
	    		 "<img src='content/svg/footfall_btn.svg' alt='*'> " +item_elem.item.footfallCount+" </div>"+
	    		 "<div class='chart_indicated_item_indicator normal_text '  style='float:right'>  " +
	    		 "<img src='content/svg/purchase_btn.svg' alt='*'> " +item_elem.item.purchaseCount+" </div>"+
	    "</div>")
    	    .css({
            	left: (item_elem.direction>0)?(dim.x+dim.width+10):(dim.x-300-10),
            	top: (dim.y+window.scrollY-33.5+15),
            	
             })
             .appendTo("."+item_elem.parent)
             .appendTo("body")
             ;
    	    
	    
	}


	

    }


    height_cascade();
    
    

}





function compute_pricing()
{
    var deferred = new $.Deferred();
    
    item_data_l = item_data.length;

    for (var i=0; i<item_data_l; i++){
	
	
//	item_data[i].price=Math.ceil(Math.random() * 10000);
	
	
	if (item_data_l==(i+1)){


	    deferred.resolve(
		    item_data.sort(function(a, b) { 
			return - ( a.price - b.price );			
		    })
		    );
		
	};
	
    }
    
    
    return deferred.promise();


}




function draw_overview_timeline_tool()
{
    var tool_class_name = "overview_time";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*8;
	var tool_max_h = su*7;

	
	
	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Overall Footfall Timeline </div>"+
			"<div class='tool_box_header_btn expand_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<div class='tool_box_content_comment'> Footfall of the entire brand over entire timeline</div>"+
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin' height=300> </svg>"+
			"</div>"+
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:(tool_w),
//			height:tool_max_h,
			"max-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".middle_col");
	
	
	
	$(tool_dot_class_name+" .expand_btn").click(function(){
		console.log("click");
		window.location ="user/overview/timeline";
	});
	


	
	height_cascade();
    
}





function update_overview_timeline_tool()
{
	
//	console.log("overview_time");
    
    var margin = {top: 0, right: 25, bottom: 30, left: 50};

	var this_chart_w = lu*7;
	var this_chart_h = su*4;
	
	var y_scale_extent = d3.extent(overall_timeline_data, d => {
		return new Date(d.timeStamp);			
	});
	
	
	var overall_time_chart = d3.select(".overview_time_svg")
                                    		.append("g")
                                    		.attr("class","overall_time_chart")
                                    		.attr("x",0)
                                    		.attr("y",0)
                                    		;

	var x_scale = d3.scaleUtc()
    				.rangeRound([margin.right, this_chart_w])
            			.domain(d3.extent(overall_timeline_data, d => {
            				
            				var datetime = new Date(d.timeStamp);

            				
            				return datetime;
            				
            			})
            			)
            			;
    		    
    var y_scale = d3.scaleLinear()
    				.range([this_chart_h, margin.right])
    				.domain(d3.extent(overall_timeline_data, d => {
        				
        				return d.touchCount;
        				
        			})).nice()
    				;
	
    var xAxis = d3.axisBottom(x_scale)
//    			.tickSize(0)
    			.tickFormat(d3.timeFormat("%b-%y"))
    			;
    			
	var yAxis = d3.axisLeft(y_scale)
//			.ticks(3)
			;


	overall_time_chart.append("g")
                    		  .attr("class", "mini_chart_axis_x")
                    		  .attr("transform", "translate("+margin.right+"," + this_chart_h + ")")
                    		  .call(xAxis)
                    		  ;
	
	overall_time_chart.append("g")
                		      .attr("class", "mini_chart_axis_y")
                		      .attr("transform", "translate("+margin.left+",0)")
                		      .call(yAxis)	
                		      ;
	
	var line = d3.line()
            		    .curve(d3.curveStep)
//            		    .defined(d => !isNaN(d.touchCount))
//            		    .defined(d => d.touchType==1)
            		    .x(d => {
            		    	
            		    	return x_scale(new Date(d.timeStamp))+margin.right;
            		    })
            		    .y(d => {
            		    	                		    	
            		    	return y_scale(d.touchCount)-1;
            		    });
	
	
	
	
	overall_time_chart.append("path")
//						  .datum(overall_timeline_data)
						  .attr("class", "line")
						  .datum(function(){
							  
							  return [{
								  		touchCount:0,
//								  		timeStamp:(new Date()).getTime()
								  		timeStamp:y_scale_extent[0]
								  		
								  		
								  		
								  	 }]
							  		 .concat(overall_timeline_data.filter(d => d.touchType==1))
							  		 .concat(
							  		 [{
							  			touchCount:0,
							  			timeStamp:y_scale_extent[1]                        			
                                	 }]);
							  
//							  return overall_timeline_data.filter(d => d.touchType==1);
						  })
            		      .attr("fill", "none")
            		      .attr("stroke", colors.visit)
            		      .attr("stroke-width", 1.5)
            		      .attr("stroke-linejoin", "round")
            		      .attr("stroke-linecap", "round")
            		      .attr("fill", colors.visit)
            		      .attr("fill-opacity",0.1)
            		      .attr("d", line)
					      .on("mouseenter",function(d){           
					    	  draw_svg_tooltip("Visits",d3.select(".overview_time_svg"),d3.mouse(this));
					    	  d3.select(this).attr("fill-opacity",0.3);
					      })
					      .on("mouseleave",function(e){
					    	  d3.select(this).attr("fill-opacity",0.1);
					    	  remove_tooltip();                        		
                          })
                          ;
	
	
	
	
	overall_time_chart.append("path")
				//		  .datum(overall_timeline_data)
						  .attr("class", "line")
						  .datum(function(){
							  
							  return [{
								  		touchCount:0,
								  		timeStamp:y_scale_extent[0]
								  	 }]
							  		 .concat(overall_timeline_data.filter(d => d.touchType==2))
							  		 .concat(
							  		 [{
							  			touchCount:0,
							  			timeStamp:y_scale_extent[1]	                        			
							  		 }]);
							  
//							  return overall_timeline_data.filter(d => d.touchType==2);
						  })
					      .attr("fill", "none")
					      .attr("stroke", colors.purchase)
					      .attr("stroke-width", 1.5)
					      .attr("stroke-linejoin", "round")
					      .attr("stroke-linecap", "round")
					      .attr("fill", colors.purchase)
            		      .attr("fill-opacity",0.1)
					      .attr("d", line)						      
					      .on("mouseenter",function(){                        		
					    	  draw_svg_tooltip("Purchases",d3.select(".overview_time_svg"),d3.mouse(this));
					    	  d3.select(this).attr("fill-opacity",0.5);
					      })
					      .on("mouseleave",function(e){
					    	  d3.select(this).attr("fill-opacity",0.3);
					    	  remove_tooltip();                        		
                          })
                          ;
	
	
	
	overall_time_chart.append("path")
				//		  .datum(overall_timeline_data)
						  .attr("class", "line")
						  .datum(function(){
							  return [{
							  		touchCount:0,
							  		timeStamp:y_scale_extent[0]
							  	 }]
						  		 .concat(overall_timeline_data.filter(d => d.touchType==3))
						  		 .concat(
						  		 [{
						  			touchCount:0,
						  			timeStamp:y_scale_extent[1]	                        			
						  		 }]);
							  
//							  return overall_timeline_data.filter(d => d.touchType==3);
						  })
					      .attr("fill", "none")
					      .attr("stroke", colors.cartexit)
					      .attr("stroke-width", 1.5)
					      .attr("stroke-linejoin", "round")
					      .attr("stroke-linecap", "round")
					      .attr("fill", colors.cartexit)
            		      .attr("fill-opacity",0.1)
					      .attr("d", line)
					      .on("mouseenter",function(){                        		
					    	  draw_svg_tooltip("Cart Exits",d3.select(".overview_time_svg"),d3.mouse(this));
					    	  d3.select(this).attr("fill-opacity",0.5);
					      })
					      .on("mouseleave",function(e){
					    	  d3.select(this).attr("fill-opacity",0.3);
					    	  remove_tooltip();                        		
                          })
	
	
	
	overall_time_chart
		.append("text")			
		.text("Footfall")
		.attr("class","chart_main_axis_title")
		.attr("x",0)
		.attr("y",(this_chart_h/2))
		.style("text-anchor", "middle")
		.attr("transform", "rotate(-90,12,"+(this_chart_h/2)+")");

		;
	
	overall_time_chart
		.append("text")			
		.text("Time")
		.attr("class","chart_main_axis_title")
		.attr("x",(this_chart_w/2+margin.left))
		.attr("y",(this_chart_h+margin.bottom))
		.style("text-anchor", "middle")

		;


	
	
	
	
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var lines = document.getElementsByClassName('line');
	
	var mouseG = overall_time_chart.append("g").attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
		      .attr("class", "mouse-line")
		      .style("stroke", "black")
		      .style("stroke-width", "1px")
		      .style("opacity", "0")
		      ;
	
	
    

	
    var mousePerLine = mouseG.select('.mouse-per-line')
						      .enter()
						      .append("g")
						      .attr("class", "mouse-per-line");

    
    mouseG.append("circle")
    			  .attr("class", "mouse-circle visit_indicator")
			      .attr("r", 5)
			      
			      ;
    
    mouseG.append("circle")
    			  .attr("class", "mouse-circle purchase_indicator")
			      .attr("r", 5)
			      
			      ;
    
    
    mouseG.append("circle")
    			  .attr("class", "mouse-circle cartexit_indicator")
			      .attr("r", 5)
			     
			      ;

    
    
    
    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', (this_chart_w-margin.right)) // can't catch mouse events on a g element
      .attr('height', this_chart_h)
      .attr('x', margin.left)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function() { // on mouse out hide line, circles and text
    	  
    	  d3.selectAll(".mouse-line")
	          	.style("opacity", "0")	          	
	          	;
    	  
    	  d3.selectAll(".mouse-circle")
	  				.style("opacity", "0")
	  				;
    	  
    	  $(".modal_chart_indicator").remove();

      })
      .on('mouseover', function() { // on mouse in show line, circles and text
    	  d3.select(".mouse-line")
	        .style("opacity", "1");
    	  d3.selectAll(".mouse-circle")
          	.style("opacity", "1");
//    	  d3.selectAll(".mouse-per-line text")
//          	.style("opacity", "1");
      })
      .on('mousemove', function() { // mouse moving over canvas
    	  
    	  
        var mouse = d3.mouse(this);
        
//        console.log(mouse);
        
        d3.select(".mouse-line")
          .attr("d", function() {
        	  var d = "M" + (mouse[0]) + "," + (this_chart_h);
        	  d += " " + (mouse[0]) + "," + 25;
        	  return d;
          });
        
        var x_invert = x_scale.invert(mouse[0]-margin.right);
//        console.log(x_invert);
        
        y_invert_array = [0,0,0];
       
        
        
        for (var i=0; i<3; i++){
        	
        	var end_visit = lines[i].getTotalLength();
        	var beginning_visit = 0;
             
            var target_visit = null;
            
            while (true){
            	
            	target_visit = Math.floor((beginning_visit + end_visit) / 2);
            	pos_visit = lines[i].getPointAtLength(target_visit);
            	if ((target_visit === end_visit || target_visit === beginning_visit) && pos_visit.x !== mouse[0]) {
            		break;
            		
            	}
            	if (pos_visit.x > mouse[0]) end_visit = target_visit;
            	else if (pos_visit.x < mouse[0]) beginning_visit = target_visit;
            	else break; //position found
            }
            
          
            
            if (i==0){
//            	console.log("visit_indicator");
            	d3.select(".visit_indicator")
            		.attr("transform","translate(" + mouse[0] + "," + pos_visit.y +")");	
//            	console.log([ mouse[0],pos_visit.y  ]);
            	
            	y_invert_array[0]= y_scale.invert(pos_visit.y).toFixed(0);
            	
            }
            if (i==1){
//            	console.log("purchase_indicator");
            	d3.select(".purchase_indicator")
            		.attr("transform","translate(" + mouse[0] + "," + pos_visit.y +")");
//            	console.log([ mouse[0],pos_visit.y  ]);
            	y_invert_array[1]= y_scale.invert(pos_visit.y).toFixed(0);
        	
            }
            if (i==2){
//            	console.log("cartexit_indicator");
            	d3.select(".cartexit_indicator")
            		.attr("transform","translate(" + mouse[0] + "," + pos_visit.y +")");
//            	console.log([ mouse[0],pos_visit.y  ]);
            	y_invert_array[2]= y_scale.invert(pos_visit.y).toFixed(0);
            	
            }
            
            if (i+1==3){
            	var dim = $(".overview_time")[0].getBoundingClientRect();;
 	            
// 	    	    console.log(dim);
 	            draw_modal_timeline_indicator(mouse[0]+dim.x,dim.y,[x_invert,y_invert_array]);
 	         
            }
            
        	
        }
        
	
      });	
}









function compute_last_week_perc()
{
	
	var today_date = new Date();
	
	
	today_date = new Date ( d3.extent(overall_timeline_data, d => {
		
		return d.timeStamp;
		
	})[1]);
	
	
	
	
	var this_week_millisec = (today_date).getTime() - (7 * 24 * 60 * 60 * 1000);
	
	var last_week_millisec = (today_date).getTime() - (100 * 24 * 60 * 60 * 1000);
	
	
	
	var _length = overall_timeline_data.length;
	
	var this_week_touchcount = [0,0,0];
	
	var last_week_touchcount = [0,0,0];
	
	
	
	for (var i=0; i<_length;i++){
		
		var data_elem = overall_timeline_data[i];
		
//		console.log(data_elem);
		
		if (data_elem.timeStamp>=this_week_millisec){
			
			this_week_touchcount[data_elem.touchType-1] = this_week_touchcount[data_elem.touchType-1] + data_elem.touchCount;
			
		}
		
		
		
		if ((last_week_millisec<=data_elem.timeStamp) && (this_week_millisec>data_elem.timeStamp)){
		
			console.log(data_elem);			
			console.log(data_elem.timeStamp);
			
			last_week_touchcount[data_elem.touchType-1] = last_week_touchcount[data_elem.touchType-1] + data_elem.touchCount;
			
		}
		

		
		
		if (i+1==_length){
			
			console.log(last_week_touchcount);
			console.log(this_week_touchcount);
			
			console.log(this_week_touchcount[0]/last_week_touchcount[0] * 100   + "%");

			
			var weekly_visit_perc = ((this_week_touchcount[0] - last_week_touchcount[0])/last_week_touchcount[0] * 100 ).toFixed(1); 
			var weekly_purchase_perc = ((this_week_touchcount[1] - last_week_touchcount[1])/last_week_touchcount[1] * 100).toFixed(1); 
			var weekly_cartexit_perc = ((this_week_touchcount[2] - last_week_touchcount[2])/last_week_touchcount[2] * 100).toFixed(1);
			
			
			
			$(".weekly_visit_perc").text( weekly_visit_perc + "%" );
			$(".weekly_purchase_perc").text( weekly_purchase_perc + "%" );
			$(".weekly_cartexit_perc").text( weekly_cartexit_perc + "%" );
			
			
//			$(".weekly_purchase_perc").parent().find(".div_arrow")
			
			
			if (this_week_touchcount[0] - last_week_touchcount[0]   ){
				
			};
			
			
		};
		
		
		
		
	}
	
	
	
	

}













function draw_modal_timeline_indicator(mouse_x,mouse_y,chart_indicator_data)
{
	

	
	var tool_w = su*4;
//	var tool_max_h = su*2;
	
//	console.log(chart_indicator_data);
	
	var formatted_date = chart_indicator_data[0].getDate() + '-' + (chart_indicator_data[0].getMonth()+1) + '-' + chart_indicator_data[0].getFullYear();

	
	if ($(".modal_chart_indicator").length==0){
		
			$(
				"<div class='modal_chart_indicator'>" +
//				"<div class='modal_export_box_header small_text bold_text'> &nbsp; &nbsp; &nbsp; &nbsp;Download CSVs" +
//					"<div class='modal_export_box_header_btn cancel_btn flat_btn'></div>"+
//	
//				"</div>"+
				"<div class='modal_chart_indicator_content'>" +
				
					"<div class='modal_chart_indicator_row small_text'> " +
						"<div class='modal_chart_indicator_row_name date_value normal_text '> " +
						formatted_date +
						"</div> "+
					"</div>"+
					"<div class='modal_chart_indicator_row small_text'> " +
						"<div class='modal_chart_indicator_row_name small_text bold_text visit_text'> Visits </div> "+
						"<div class='modal_chart_indicator_row_value visit_value normal_text '> "+chart_indicator_data[1][0]+" </div> "+					
					"</div>"+
					"<div class='modal_chart_indicator_row small_text'> " +
						"<div class='modal_chart_indicator_row_name small_text bold_text purchase_text'> Purchases </div> "+
						"<div class='modal_chart_indicator_row_value purchase_value normal_text '> 30304 </div> "+
						
					"</div>"+
					"<div class='modal_chart_indicator_row small_text'> " +
						"<div class='modal_chart_indicator_row_name small_text bold_text cartexit_text'> Cart Exits </div> "+
						"<div class='modal_chart_indicator_row_value cartexit_value normal_text '> 30304 </div> "+
					
					"</div>"+
				"</div>"+
				"</div>" 	
			)
			.css({
				left:(mouse_x-tool_w/2),
				top: (window.scrollY+mouse_y-su),
				width:(tool_w),
	//			height:tool_max_h,
//				"min-height" : (tool_max_h),
				
			})
			.data("view_status",1)
			.click(function(){
			
			})		
			.appendTo("body");
			
	}	
	else{
		
//		console.log(chart_indicator_data[1][0]);
		
		
		$(".modal_chart_indicator")
			.css({
					left:(mouse_x-tool_w/2+su_3),					
				});
		$(".date_value").text(formatted_date);
		$(".visit_value").text(chart_indicator_data[1][0]);
		$(".purchase_value").text(chart_indicator_data[1][1]);
		$(".cartexit_value").text(chart_indicator_data[1][2]);
	}
	
}











function draw_footfall_overview_count_tool()
{

	var tool_class_name = "footfall_overview_count";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*3;
	var tool_max_h = su*9;

	
	
	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Footfall </div>"+
			"<div class='tool_box_header_btn expand_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<div class='tool_box_content_comment'> Total Footfall Fractions </div>"+			
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin' height=260> </svg>"+
			"</div>"+
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:(tool_w),
//			height:tool_max_h,
			"max-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col");

	
	
	Promise.all([compute_footfall()]).then(function ([data]){
	    
//	    console.log(data);
	    

	    
	    var circle_buffer = 0;
	    
	    
	    var visit_area = Math.sqrt(footfall_data.total_visit_count/Math.PI)*2;
	    var purchase_area = Math.sqrt(footfall_data.total_purchase_count/Math.PI)*2;
	    var cartexit_area = Math.sqrt(footfall_data.total_cartexit_count/Math.PI)*2;
	    
	    
	    
	    var total_diameter = visit_area+purchase_area+cartexit_area;
	    
	    
	    
	    var visit_diameter = (visit_area/total_diameter)*150;
	    var purchase_diameter = (purchase_area/total_diameter)*150;
	    var cartexit_diameter = (cartexit_area/total_diameter)*150;
	    
	    
	    
	    var footfall_overview_count_svg = d3.select(".footfall_overview_count_svg")
                        	    	.append("svg")
                        	    	.attr("x",10)
                        	    	.attr("y",10);
                        	    
	    
	    
	    footfall_overview_count_svg
	    	.append("circle")
	    	.attr("style","fill:var(--visit_color)")	    	
//	    	.attr("opacity",0.5)
	    	.attr("cx", visit_diameter/2)
            .attr("cy", visit_diameter/2)
            .attr("r", visit_diameter/2);
	    	;
	    
	    footfall_overview_count_svg
    		.append("line")
    		.style("stroke", "black")
    		.attr("x1", visit_diameter+su_8)
    		.attr("y1", visit_diameter/2) 
    		.attr("x2", 140)    
    		.attr("y2", visit_diameter/2)
		;
	    
	    footfall_overview_count_svg
	    	.append("text")	
	    	.attr('xml:space', 'preserve')
	    	.attr('class', 'small_text bold_text')
	    	.text(("Visits"))
	    	.attr("x", 140 +su_8)
	    	.attr("y", visit_diameter/2-su_8)
	    	;
	    
	    footfall_overview_count_svg
	    	.append("text")	
	    	.attr('xml:space', 'preserve')
	    	.attr('class', 'normal_text')
	    	.text((footfall_data.total_visit_count))
	    	.attr("x", 140 +su_8)
	    	.attr("y", visit_diameter/2+su_8)
	    	;
	    
	    if (purchase_diameter<50){
		circle_buffer += 30;
	    };
	    
	    footfall_overview_count_svg
		 .append("circle")
		 .attr("style","fill:var(--purchase_color)")		 
//	    	 .attr("opacity",0.5)
		 .attr("cx", visit_diameter/2)
	         .attr("cy", visit_diameter+purchase_diameter/2+circle_buffer)
	         .attr("r", purchase_diameter/2);
		 ;
	    	    	
	    footfall_overview_count_svg
			.append("line")
			.style("stroke", "black")
			.attr("x1", visit_diameter/2+purchase_diameter/2+su_8)
			.attr("y1", visit_diameter+purchase_diameter/2+circle_buffer)
			.attr("x2", 140)    
	    		.attr("y2", visit_diameter+purchase_diameter/2+circle_buffer)
			;	
	    
	    footfall_overview_count_svg
	    	.append("text")	
	    	.attr('xml:space', 'preserve')
	    	.attr('class', 'small_text bold_text')
	    	.text(("Purchases"))
	    	.attr("x", 140 +su_8)
	    	.attr("y", visit_diameter+purchase_diameter/2+circle_buffer-su_8)
	    	;
	    
	    footfall_overview_count_svg
	    	.append("text")	
	    	.attr('xml:space', 'preserve')
	    	.attr('class', 'normal_text')
	    	.text((footfall_data.total_purchase_count))
	    	.attr("x", 140 +su_8)
	    	.attr("y", visit_diameter+purchase_diameter/2+circle_buffer+su_8)
	    	;
		    	    
	    
	    if (purchase_diameter<50){
	    	circle_buffer += 30;
	    };
	    
	    
	    footfall_overview_count_svg
			.append("circle")
			.attr("style","fill:var(--cartexit_color)")			
//			.attr("opacity",0.5)
			.attr("cx", visit_diameter/2)
			.attr("cy", visit_diameter+purchase_diameter+cartexit_diameter/2+circle_buffer)
			.attr("r", cartexit_diameter/2)
			;
	    
	    footfall_overview_count_svg
    		.append("line")
    		.style("stroke", "black")
    		.attr("x1", visit_diameter/2+cartexit_diameter/2+su_8)
    		.attr("y1", visit_diameter+purchase_diameter+cartexit_diameter/2+circle_buffer)
    		.attr("x2", 140)    
    		.attr("y2", visit_diameter+purchase_diameter+cartexit_diameter/2+circle_buffer)
    		;		    
	    
	    
	    footfall_overview_count_svg
	    	.append("text")	
	    	.attr('xml:space', 'preserve')
	    	.attr('class', 'small_text bold_text')
	    	.text(("Cart Exits"))
	    	.attr("x", 140 +su_8)
		.attr("y", visit_diameter+purchase_diameter+cartexit_diameter/2+circle_buffer-su_8)	    		    
	    	;
	    
	    footfall_overview_count_svg
	    	.append("text")	
	    	.attr('xml:space', 'preserve')
	    	.attr('class', 'normal_text')
	    	.text((footfall_data.total_cartexit_count))
	    	.attr("x", 140 +su_8)
	    	.attr("y", visit_diameter+purchase_diameter+cartexit_diameter/2+circle_buffer+su_8)
	    	;
		    	    
	   
	    
	    var footfall_overview_count_tool_ul = $("<ul class ='footfall_overview_count_tool_ul normal_text'></ul>")
	    					.appendTo(tool_dot_class_name+" .tool_box_content");
	    
	    $("<li class ='footfall_overview_count_tool_li'>" +
				"<div class='tool_box_content_comment'> Percentage Variations (weekly)</div>"+
	    		"</div>" +	    		
	    "</li>")
	    .appendTo(footfall_overview_count_tool_ul);
	    
	    
	    $("<li class ='footfall_overview_count_tool_li small_text '>" +
	    		"<div class ='footfall_overview_count_tool_li_tt_name bold_text'> Visits </div>" +
	    		"<div class ='div_arrow arrow_up'> </div>" +
	    		"<div class ='footfall_overview_count_tool_li_tt_value weekly_visit_perc'> 0% </div>" +
	    "</li>")
	    .appendTo(footfall_overview_count_tool_ul);
	    
	    
	    $("<li class ='footfall_overview_count_tool_li small_text '>" +
	    		"<div class ='footfall_overview_count_tool_li_tt_name bold_text'> Purchases </div>" +	    
	    		"<div class ='div_arrow arrow_down'> </div>" +
	    		"<div class ='footfall_overview_count_tool_li_tt_value weekly_purchase_perc'> 0% </div>" +
	    "</li>")
	    .appendTo(footfall_overview_count_tool_ul);
	    
	    
	    $("<li class ='footfall_overview_count_tool_li small_text '>" +
	    		"<div class ='footfall_overview_count_tool_li_tt_name bold_text'> Cart Exits </div>" +
	    		"<div class ='div_arrow arrow_up'> </div>" +
	    		"<div class ='footfall_overview_count_tool_li_tt_value weekly_cartexit_perc'> 0% </div>" +
	    "</li>")
	    .appendTo(footfall_overview_count_tool_ul);
	    
	    
	    
	    
	    
	   
	   		
	});
	    
	height_cascade();
}





function draw_current_popular_item_item()
{

	var tool_class_name = "current_popular_item ";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*3;
	var tool_max_h = su*3;

	

	$("<div class='"+tool_class_name+"layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'>Popular Item </div>"+
			"<div class='tool_box_header_btn expand_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<div class='tool_box_content_comment'> Based on last 5 user selections </div>"+

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
	
	
	
	Promise.all([compute_interaction_history_data()]).then(function (){
	    
		
		console.log(item_map[item_rank_array[0].item_id]);
		
		var imageUrl = item_map[item_rank_array[0].item_id].imageUrl;
		
		console.log((imageUrl==null)? "content/images/image1.jpg":imageUrl);
		
		
	    $("<div class='tool_box_content_block tool_box_content_block_image'><img src='"+
	    		"content/images/image1.jpg"+
	    		"' alt='*'></div>")
	    	.appendTo(tool_dot_class_name+".tool_box_content");
	    
	    $("<div class='tool_box_content_block tool_box_content_block_text normal_text'><span>"+item_map[item_rank_array[0].item_id].nameStr+"</span></div>")
	    	.appendTo(tool_dot_class_name+".tool_box_content");
	    
	    

	   		
	});

	
	
	
	$(tool_dot_class_name+" .tool_box_header_btn")
		.click(function(){
		    
		    draw_current_popular_item_expanded();
		    
		});
	
	
	
	
	
	height_cascade();

	
	
}





function draw_current_popular_item_expanded()
{

    $(".col").addClass("blur");
	
    $('html, body').css({
	    overflow: 'hidden',
	    height: '100%'
    });    
    
    
    var parent_dim = $(".current_popular_item")[0].getBoundingClientRect();
    
    
    var tool_class_name = "current_popular_item_expanded ";
    var tool_dot_class_name = " ."+tool_class_name;
    
    	
    	
    var tool_w = lu*6;
    var tool_max_h = su*9;
    
    

    $("<div class='"+tool_class_name+" layer1 tool_box '> " +
		"<div class='tool_box_header large_text'>" +
		"<div class='tool_box_header_name'> Current Popular Products </div>"+
		"<div class='tool_box_header_btn cancel_btn flat_btn'></div>"+
		"</div>" +	
		"<div class='tool_box_content'>" +
		
		"</div>"+
    "</div>")
	.css({
		left:(parent_dim.x),
		top: (parent_dim.y+window.scrollY),
		width:(parent_dim.widht),
//		height:(parent_dim.height),		
	})
	.animate({
	    left:($(window).width()/2-tool_w/2 ),
	    top: (su*2+su_3+window.scrollY),
	    width:(tool_w),
//	    height:tool_max_h,
	    "max-height" : (tool_max_h),
	},250)
	.data("view_status",1)
	.click(function(){
	
	})		
	.appendTo("body");
	

    
    $(tool_dot_class_name+".cancel_btn").click(function(){
	
	//	console.log("cancel_btn");
		
		$(".col").removeClass("blur");
		
		$('html, body').css({
		    overflow: 'auto',
		    height: 'auto'
		});
		
		$(tool_dot_class_name).remove();
	
    });
    

    

    var	tool_box_ul = $( "<ul> " +
                    		"<li class='tool_box_ul_li_header small_text bold_text' > " +
                			"<div class='tool_box_ul_li_header_col pupular_item_header_bullet'> Index </div>"+
                			"<div class='tool_box_ul_li_header_col pupular_item_header_name'>Name</div>"+
                			"<div class='tool_box_ul_li_header_col pupular_item_header_footfallrank'>Footfall Rank</div>"+
                			
                          "</li>"+
    					"</ul>" ).addClass("tool_box_ul popular_item_ul").css({
	
	"max-height" : (tool_max_h-lu),
		
    })
    .appendTo(tool_dot_class_name + ".tool_box_content");
	
	
    

	
	
    $.each(item_rank_array,function(i,v){	
	
	
    	console.log(v);
    	
    	var li = $("<li class='tool_box_ul_li normal_text' data-itemId='"+ v.item_id +"'> " +
			"<div class='tool_box_ul_li_bullet'></div>"+
			"<div class='tool_box_ul_li_value pupular_item_li_index'>"+(i+1)+"</div>"+
			"<div class='tool_box_ul_li_img'><img src='"+item_map[v.item_id].imageUrl+"' alt='*'> </div>"+
			"<div class='tool_box_ul_li_name'><span>"+ string_trim(item_map[v.item_id].nameStr,250) +"</span></div>"+
			"<div class='tool_box_ul_li_value pupular_item_li_footfallrank'><div>"+ (item_map[v.item_id].footfallRank) +"</div></div>"+		
		   "</li>")
		.data("item",item_map[v.item_id])
		.click(function()
			{
		    	console.log("clicked");
				console.log($(this).attr("item"));
				console.log(v.item_id );
				window.location ="user/item/overview?i="+v.item_id ;				
			})
		.appendTo($(".popular_item_ul"))
		;		
    });
	
    
    
    
    
    
}





function compute_interaction_history_data()
{
    var deferred = new $.Deferred();

    interaction_history_data_l = interaction_history_data.length;
    var total_footfall_count = 0;
    

    
    var item_id = null;
    
    for (var i=0; i<interaction_history_data_l; i++){
	
	item_id = interaction_history_data[i].itemId;
	
	if (item_rank_map[item_id]==null){
	    item_rank_map[item_id] = 
                        	    {
		    			item_id : item_id,
		    			count : 1                        		    
                        	    };
	}
	else{
	    item_rank_map[item_id].count = item_rank_map[item_id].count + 1;		
	};
	
	
		
	if (interaction_history_data_l==(i+1)){
	    
//	    console.log(item_rank_map);
	    item_rank_array = Object.values(item_rank_map);	    
//	    console.log(item_rank_array);
	    
//	    item_rank_array = item_rank_array.sort(function(a, b) { 
//		  return - ( a.count - b.count );
//	    });
	    
//	    console.log(item_rank_array);	    
	    
	    deferred.resolve(
		    item_rank_array.sort(function(a, b) { 
			return - ( a.count - b.count );			
		    })
		    );
	    
	};
	
    };

    
    

    return deferred.promise();
}





function compute_footfall()
{
    var deferred = new $.Deferred();
    
    var item_data_l = item_data.length;
    var total_footfall_count = 0;
    var total_visit_count = 0;
    var total_purchase_count = 0;
    var total_cartexit_count = 0;
            

    
    for (var i=0; i<item_data_l; i++){
	
    	total_footfall_count = total_footfall_count + parseInt(item_data[i].footfallCount);
    	total_visit_count = total_visit_count + parseInt(item_data[i].visitCount);
    	total_purchase_count = total_purchase_count + parseInt(item_data[i].purchaseCount);
    	total_cartexit_count = total_cartexit_count + parseInt(item_data[i].cartexitCount);
    	
    	item_data[i].price=Math.ceil(Math.random() * 10000);
    
    	
    	var purchase_to_visit_ratio =  item_data[i].purchaseCount/item_data[i].visitCount;
    //	console.log("purchase_to_visit_ratio : "+purchase_to_visit_ratio+" : isFinite(purchase_to_visit_ratio)="+isFinite(purchase_to_visit_ratio));
    	
    	if ((purchase_to_visit_ratio>=best_purchase_to_visit_item.ratio) && (isFinite(purchase_to_visit_ratio))){
//    	    console.log(item_data[i]);
    	    best_purchase_to_visit_item.item_id = item_data[i].itemId;
    	    best_purchase_to_visit_item.ratio = purchase_to_visit_ratio;
    	    best_purchase_to_visit_item.footfallCount = item_data[i].footfallCount;
    	    best_purchase_to_visit_item.price = item_data[i].price;
    	};
    	
    	
    	
    	var cartexit_to_purchase_ratio =  item_data[i].cartexitCount/item_data[i].purchaseCount;
    
    	if ((cartexit_to_purchase_ratio<=best_purchase_to_visit_item.ratio) && (isFinite(cartexit_to_purchase_ratio))){
    	    best_cartexit_to_purchase_item.item_id = item_data[i].itemId;
    	    best_cartexit_to_purchase_item.ratio = cartexit_to_purchase_ratio;
    	};
    	
    	
    	
    
    	if ((highest_footfall_item.footfallCount <= item_data[i].footfallCount)&& (isFinite(purchase_to_visit_ratio))){
    	    highest_footfall_item.item_id = item_data[i].itemId;
    	    highest_footfall_item.footfallCount = item_data[i].footfallCount;
    	    highest_footfall_item.price = item_data[i].price;
    	};
    	
    	
    	
    	if (lowest_footfall_item.footfallCount >= item_data[i].footfallCount){
    	    lowest_footfall_item.item_id = item_data[i].itemId;
    	    lowest_footfall_item.footfallCount = item_data[i].footfallCount;
    	    lowest_footfall_item.price = item_data[i].price;
    	};
    	
    	
    	
    //	console.log(item_data[i].itemId);
    
    	item_map[item_data[i].itemId] = item_data[i];
    	
    	
    	
    	if (item_data_l==(i+1)){
    
    	    footfall_data = {
    		    total_footfall_count:total_footfall_count,
    		    total_visit_count:total_visit_count,
    		    total_purchase_count:total_purchase_count,
    		    total_cartexit_count:total_cartexit_count,
    	    };
    	    deferred.resolve(footfall_data);
    		
    	};
	
    };

    
    

    return deferred.promise();

}














function get_all_overall_timeline()
{
    var deferred = new $.Deferred();
	
	$.ajax({
		type: "POST",
	    url: "overalltimeline/get/all",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
//	    data:  JSON.stringify( {"itemId": central_itemId}),
	    success: function(data)
	    {
	    	console.log(data);

	    	overall_timeline_data = data;
	    	
	    	deferred.resolve(overall_timeline_data.sort(function(a,b){
			    return (a.timeStamp) - (b.timeStamp);
			}));
	 	    	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	      console.log(jqXHR);
	      console.log(textStatus);
	      console.log(errorThrown);
	//              relogin();
	
	
	    }
	});
	
	return deferred.promise();
}










function get_overall_time_data()
{
    var deferred = new $.Deferred();
    
    
    
    Promise.all([get_all_interaction()]).then(function (){
	
	var overall_time_map={};
	
	var interaction_data_l=interaction_data.length;
	
	for (var i=0; i<interaction_data_l; i++){
	    
	    interaction_timestamp = interaction_data[i].timeStamp;
	    
//	    console.log(interaction_timestamp);
	    
	    var date = new Date(interaction_timestamp);
//	    console.log(date);
	    
	    date.setHours(date.getHours());
	    date.setMinutes(0);
	    date.setSeconds(0);
//	    console.log(date);
		
	    	    
	    
	    if (overall_time_map[date]==null){
		
	    	overall_time_map[date] = 
	                        	    {
			    			date : date,
			    			count : 1                        		    
	                        	    };	    
	    }
	    else{
		
		overall_time_map[date].count = overall_time_map[date].count + 1;
		    
	    };
	    	    	    
	    if (interaction_data_l==(i+1)){	
		
		overall_time_array = Object.values(overall_time_map);
		deferred.resolve(overall_time_array.sort(function(a,b){
		    return new Date(b.date) - new Date(a.date);
		}));
		
		
		
	    }
	    
	}
	
    });
    
    return deferred.promise();
    
}





function get_all_interaction()
{
    var deferred = new $.Deferred();
	
	$.ajax({
		type: "POST",
	    url: "interaction/get/all",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
//	    data:  JSON.stringify( {"itemId": central_itemId}),
	    success: function(data)
	    {
//	    	console.log(data);

	    	interaction_data = data;
	    	
	    	deferred.resolve(item_data);
	 	    	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	      console.log(jqXHR);
	      console.log(textStatus);
	      console.log(errorThrown);
	//              relogin();
	
	
	    }
	});
	
	return deferred.promise();
}





function get_item_data()
{
	var deferred = new $.Deferred();
	
	$.ajax({
		type: "POST",
	    url: "item/get/all",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
//	    data:  JSON.stringify( {"itemId": central_itemId}),
	    success: function(data)
	    {
//	    	console.log(data);

	    	item_data = data;
	    	
	    	deferred.resolve(item_data);
	 	    	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	      console.log(jqXHR);
	      console.log(textStatus);
	      console.log(errorThrown);
	//              relogin();
	
	
	    }
	});
	
	return deferred.promise();

}





function get_interaction_history_data()
{
	var deferred = new $.Deferred();
	
	$.ajax({
		type: "POST",
	    url: "interaction_history/get/all",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
//	    data:  JSON.stringify( {"itemId": central_itemId}),
	    success: function(data)
	    {
//	    	console.log(data);

	    	interaction_history_data = data;
	    	
	    	deferred.resolve(interaction_history_data);
	 	    	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	      console.log(jqXHR);
	      console.log(textStatus);
	      console.log(errorThrown);
	//              relogin();
	
	
	    }
	});
	
	return deferred.promise();

}















function f11(){
	
	
	 var beginning_visit = 0;
     var end_visit = lines[0].getTotalLength();
     var target_visit = null;
     
     
     while (true){
     	
     	target_visit = Math.floor((beginning_visit + end_visit) / 2);
     	pos_visit = lines[0].getPointAtLength(target_visit);
     	if ((target_visit === end_visit || target_visit === beginning_visit) && pos_visit.x !== mouse[0]) {
     		break;
     		
     	}
     	if (pos_visit.x > mouse[0]) end_visit = target_visit;
     	else if (pos_visit.x < mouse[0]) beginning_visit = target_visit;
     	else break; //position found
     }
	
	
	
	
	
	
	
	 var color = d3.scaleOrdinal(d3.schemeCategory10);


		
		var mouseG = overall_time_chart.append("g").attr("class", "mouse-over-effects");

	    mouseG.append("path") // this is the black vertical line to follow mouse
			      .attr("class", "mouse-line")
			      .style("stroke", "black")
			      .style("stroke-width", "1px")
			      .style("opacity", "0")
			      ;
		
		
	    var lines = document.getElementsByClassName('line');

		
	    var mousePerLine = mouseG.selectAll('.mouse-per-line')
							      .data(overall_timeline_data)
							      .enter()
							      .append("g")
							      .attr("class", "mouse-per-line");

	    
	    mousePerLine.append("circle")
				      .attr("r", 7)
				      .style("stroke", function(d) {
				        return colors.touch_type[d.touchType-1];
				      })
				      .style("fill", "none")
				      .style("stroke-width", "1px")
				      .style("opacity", "0");

		
	    mousePerLine.append("text")
	      			.attr("transform", "translate(10,3)");

		
		
		
	    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
	      .attr('width', this_chart_w) // can't catch mouse events on a g element
	      .attr('height', this_chart_h)
	      .attr('fill', 'none')
	      .attr('pointer-events', 'all')
	      .on('mouseout', function() { // on mouse out hide line, circles and text
	    	  
	    	  d3.selectAll(".mouse-line")
	          	.style("opacity", "0")
	          	.remove()
	          	;
	    	  d3.selectAll(".mouse-per-line circle")
	          	.style("opacity", "0")
	          	.remove()
	          	;
	    	  d3.selectAll(".mouse-per-line text")
	          	.style("opacity", "0")
	          	.remove()
	          	;
	      })
	      .on('mouseover', function() { // on mouse in show line, circles and text
	    	  d3.select(".mouse-line")
		        .style("opacity", "1");
	    	  d3.selectAll(".mouse-per-line circle")
	          	.style("opacity", "1");
	    	  d3.selectAll(".mouse-per-line text")
	          	.style("opacity", "1");
	      })
	      .on('mousemove', function() { // mouse moving over canvas
	    	  
	    	  
	        var mouse = d3.mouse(this);
	        
	        d3.select(".mouse-line")
	          .attr("d", function() {
	            var d = "M" + mouse[0] + "," + this_chart_h;
	            d += " " + mouse[0] + "," + 0;
	            return d;
	          });
		
		

	        d3.selectAll(".mouse-per-line")
	        	.attr("transform", function(d, i) {
	        		
	        		if (i<lines.length){	        			
	        		
		        		console.log(this_chart_w/mouse[0])
		        		var xDate = x_scale.invert(mouse[0]),
			                bisect = d3.bisector(function(d) { return d.touchStamp; }).right;
			                idx = bisect(d.touchCount, xDate);
			            
			                
			            console.log(lines);
			            console.log(i);
		                
			            var beginning = 0;
			            var end = lines[i].getTotalLength();
			            var target = null;
			          
			            while (true){
			            	target = Math.floor((beginning + end) / 2);
			            	pos = lines[i].getPointAtLength(target);
			            	if ((target === end || target === beginning) && pos.x !== mouse[0]) {
			            		break;
			            		
			            	}
			            	if (pos.x > mouse[0])      end = target;
			            	else if (pos.x < mouse[0]) beginning = target;
			            	else break; //position found
			            }
			            
			            d3.select(this)
			            	.select('text')
			            	.text(y_scale.invert(pos.y).toFixed(2))
			            	.style("stroke", function(d) {
			            		return colors.touch_type[d.touchType-1];
						    });
		            

	        		}
	        		
		              
		            return "translate(" + mouse[0] + "," + pos.y +")";
	          });
	      });
		
}