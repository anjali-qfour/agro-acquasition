 


var item_data = null;
var item_map = {};

var price_extent = null;


var highest_visit_item = {name:"Highest Visits",class_text:"highest_visit",item_id:-1,value:0,touch_count:0, price:0};
var highest_purchase_item = {name:"Highest Purchases",class_text:"highest_purchase",item_id:-1,value:0,touch_count:0, price:0};
var highest_cartexit_item = {name:"Highest Cart Exits",class_text:"highest_cartexit",item_id:-1,value:0,touch_count:0, price:0};


var highest_net_sell = {name:"Highest Net Sell",class_text:"highest_netsell",item_id:-1,value:0,touch_count:0,price:0,net_sell:0};


var convertion_ratio = {name:"Best Conversion",class_text:"best_conversion",item_id:-1,value:0,touch_count:0, price:0,ratio:0};
var cartexit_ratio = {name:"Worst Cart Exits",class_text:"worst_cartexit",item_id:-1,value:0,touch_count:0, price:0,ratio:0};


var item_tag_array = [highest_visit_item,highest_purchase_item,highest_cartexit_item,
	highest_net_sell,convertion_ratio,cartexit_ratio];






var highest_visit_cat = {name:"Highest Visits",class_text:"highest_visit",item_id:-1,value:0,touch_count:0, price:0};
var highest_purchase_cat = {name:"Highest Purchases",class_text:"highest_purchase",item_id:-1,value:0,touch_count:0, price:0};
var highest_cartexit_cat = {name:"Highest Cart Exits",class_text:"highest_cartexit",item_id:-1,value:0,touch_count:0, price:0};









var category_data = {};



var category_price_data = {keys:[],values:[]};







function init_overview_price_optimization()
{
    $("<div class='layer1 left_col col'> </div>").appendTo(".main_content");
	

    draw_footfall_pricing_tool();
	
    draw_category_pricing_tool();
    

    Promise.all([get_item_data()]).then(function (){
    
    	Promise.all([compute_item_data()]).then(function (){
    		
    		Promise.all([compute_pricing()]).then(function (){
        		
        		update_footfall_pricing_tool();		

        	});
        		
    	    height_cascade();
    	});
    	
    	
    	
    	
    	Promise.all([compute_category_data_step1()]).then(function (){
    		
    		Promise.all([compute_category_data_step2()]).then(function (){
    			
    			
    			update_category_pricing_tool(Object.keys(category_data)[0]);
    			
    		
    		});
    		
    		
    	    height_cascade();
        });

    });
    
    
    
    

}





function draw_footfall_pricing_tool()
{    
    var tool_class_name = "footfall_pricing";
    var tool_dot_class_name = " ."+tool_class_name;
    
	
	var tool_w = lu*11;
	var tool_max_h = su*8;
 
	
	
    $("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Product Pricing Optimization </div>"+
			
			"<div class='tool_box_header_btn tag_btn flat_btn'></div>"+
			"<div class='tool_box_header_btn up_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin' height=480> </svg>"+
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
    


	$(tool_dot_class_name+" .tag_btn ")
		.click(function(){
		    
			if ($(".tag_list_expanded").length==0){
				draw_tag_list_expanded();	
			}
			else{
				$(".tag_list_expanded").remove();
			}
		    
		    
		});
    
    


	$(tool_dot_class_name+" .up_btn ").click(function(){
		
		console.log("up_btn");
		
		var dim = $(tool_dot_class_name)[0].getBoundingClientRect();
		
		console.log(dim);

		window.scrollTo(0, dim.y+window.scrollY+gap_su_1);
		
	});
    
    
	draw_chart_legends($(tool_dot_class_name+" .tool_box_content"),{x:(tool_w-su*6),y:(su+su_3)})



    height_cascade();
    
    

}





function update_footfall_pricing_tool()
{

	console.log("update_footfall_pricing_tool 2");
	
	var margin = {top: lu_3, right: lu_3, bottom: lu_3, left: lu_3};

	var this_chart_w = lu*10;
	var this_chart_h = su*6;
	
	var _draw_tag = function(tag_data, tag_text){
		
		var direction =  (x_scale(highest_visit_item.price)+300>this_chart_w) ? -1 : 1;

		var tag_g = chart_tag_g
			    		.append("g")
//			    		.style("clip-path", "url(#clip)")
//			    		.attr("clip-path", function(){ return 'url("#clip")';})
			    		.attr("class", "chart_tag "+tag_data.class_text)								    		
			    		.attr("transform", "translate("
			    				+(x_scale(tag_data.price)+margin.left)
			    				+"," 
			    				+ ( y_scale(tag_data.touch_count)+margin.top) 
			    				+ ")")
			    		.datum(
			    			{
			    			    direction:direction,
			    			    parent:"footfall_pricing",
			    			    item:item_map[tag_data.item_id],
			    			    x_axis_value :tag_data.price,
			    			    y_axis_value :tag_data.touch_count,
			    			})
						.on("mouseenter",function(){
						    
							d3.select(this)
								.style("opacity",0.666)
								;
							
						    _draw_indicated_item(d3.select(this),d3.select(this).datum());
						    
						})
						.on("mouseleave",function(){
							
							d3.select(this)
								.style("opacity",0.165)
								;
						    
						    $(".chart_indicated_item").remove();  
						    
						})
						.on("click",function(){
						    
							window.location ="user/item/overview?i="+tag_data.item_id;
						    
						})
						
						;
		tag_g	
			.append("circle")
			.attr("class", "chart_tag_circle")
			.attr("r", 8)
			.attr("cx",0)
			.attr("cy",0)
			;
	
		tag_g
			.append("line")
			.attr("class", "chart_tag_line")		
			.attr("x1",(direction)*10)
			.attr("x2",(direction)*40)
			.attr("y1",0)
			.attr("y2",0)
			;
	


		tag_g
        	.append("text")
        	.attr('xml:space', 'preserve')
        	.attr("class", "chart_tag_text small_text")		
        	.attr("x",function(){
        	    return (direction>0) ? 40 : (direction)*(40+70);
        	})
        	.attr("y",0)
        	.text(tag_text)
        	;
		
	}
	

	
	var _draw_indicated_item = function(svg_elem,item_elem)
	{
	    
//	    console.log(item_elem);
//	    console.log(svg_elem.attr("class"));
	    
	    var dim = svg_elem.node().getClientRects()[0];
//	    console.log(dim);
	    
		
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
            	top: (dim.y+window.scrollY-33.5+10),
            	
             })
             .appendTo("body")
             ;
    	    
	    
	}


	


	var footfall_pricing_chart = d3.select(".footfall_pricing_svg")
                                	.append("svg")
                                	.attr("class","footfall_pricing_chart")
                                	.attr("x",0)
                                	.attr("y",0)
                                	;
	
	var chart_tag_g = footfall_pricing_chart
							.append("g")
							.attr("class","chart_tag_g")		
							.attr("clip-path", function(){ return 'url("#clip")';})
							;

	
	
	d3.select(".footfall_pricing_svg")
						  .append("defs").append("clipPath")
						    .attr("id", "clip")
						  .append("rect")
						  	.attr("x", (margin.right*2))
						  	.attr("y", (0))
						    .attr("width", this_chart_w-margin.right*2)
						    .attr("height", this_chart_h+margin.top);
	
	
	
    var footfall_pricing_chart_dim = footfall_pricing_chart.node().getClientRects()[0];
    
    


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
//                        	.style("clip-path", "url(#clip)")
                            .attr("transform", "translate("+margin.left+"," + (this_chart_h+margin.top) + ")")
                        	.call(xAxis)
                        	;

	footfall_pricing_chart.append("g")
                        	.attr("class", "y_axis")
//                        	.style("clip-path", "url(#clip)")
                    		.attr("transform", "translate("+(margin.left+margin.right)+","+margin.top+")")
                        	.call(yAxis)	
                        	;

	var line_visit = d3.line()
//                        	.curve(d3.curveStep)
//        					.curve(d3.curveCardinal.tension(0.6))
							.curve(d3.curveLinear)

                        	.x(d => {
                        		
//                        	    console.log(d.price);
                        	    return (x_scale(d.price)+margin.left);
                        	    
                        	})
                        	.y(d => y_scale(d.visitCount)+margin.top)
                        	;
	
	var line_purchase = d3.line()
//                        	.curve(d3.curveStep)                         	
//        					.curve(d3.curveCardinal.tension(0.6))
							.curve(d3.curveLinear)
                        	.x(d => {
                        	    
//                        		console.log(d.price);
//                        		console.log(x_scale(d.price));
                        		
                        	    return (x_scale(d.price)+margin.left);
                        	    
                        	})
                        	.y(d => {
                        		
//                        		console.log(d);
                        		
                        		return y_scale(d.purchaseCount)+margin.top;
                        	})
                        	;

	
	var line_cartexit = d3.line()
//					    	.curve(d3.curveStep)                         	
//        					.curve(d3.curveCardinal.tension(0.6))
							.curve(d3.curveLinear)                     
					    	.x(d => {
					    	    
					//    		console.log(d.price);
					//    		console.log(x_scale(d.price));
					    		
					    	    return (x_scale(d.price)+margin.left);
					    	    
					    	})
					    	.y(d => {
					    		
//					    		console.log(d);
					    		
					    		return y_scale(d.cartexitCount)+margin.top;
					    	})
					    	;

	
                        	
	
	
	footfall_pricing_chart.insert("path",":first-child")
//							.append("path")
                        	.datum(function(){
                        
                        		   return (
   	                        		    
   	                        		    [{
   		                        			footfallCount:0,
   		                        			purchaseCount:0,
   		                        			cartexitCount:0,
   		                        			price:price_extent[0]	                        			
   	                                	}]
   	                        		    .concat(item_data)
   	                        		    .concat(
   	                        		    		[{
   				                        			footfallCount:0,
   				                        			purchaseCount:0,
   				                        			cartexitCount:0,
   				                        			price:price_extent[1]	                        			
   	                        		    		}]
   	                        		    	   )
   	                        		    	   
   	                        	    );
                        	
                        	})
                        	.attr("class", "line product_cartexit_line")
                        	.attr("fill", "none")
                        	.attr("stroke", "var(--cartexit_color)")
                        	.attr("stroke-width", 0.75)
                        	.attr("stroke-linejoin", "round")
                        	.attr("stroke-linecap", "round")
                        	.attr("stroke-opacity", 0.666)
                        	.attr("fill-opacity",0.888)
                        	.attr("fill", "url(#cartexit_gradient)")
//                        	.attr("fill", "var(--cartexit_color)")
//                        	
                        	.attr("d", line_cartexit)
                        	.on("mouseenter",function(){                        		
                        		draw_svg_tooltip("Cart Exits",d3.select(".footfall_pricing_svg"),d3.mouse(this));
                        		d3.select(this).attr("fill-opacity",0.95);
                        	})
                        	.on("mouseleave",function(e){
                        		d3.select(this).attr("fill-opacity",0.888)
                        		remove_tooltip();                        		
                        	})
                        	.call(function(){


    	
                        		_draw_tag(highest_net_sell,"Highest Net Sell");		
                        		_draw_tag(highest_visit_item,"Highest Visits");
                        		_draw_tag(highest_purchase_item,"Highest Purcases");
                        		_draw_tag(highest_cartexit_item,"Highest Cart Exits");
                        		_draw_tag(convertion_ratio,"Best Convertion Ratio");
                        		_draw_tag(cartexit_ratio,"Worst Cartexit to Purchase Ratio");

                        		
                        		
                        	})
                        	;
                        	;		
	

                        	
	footfall_pricing_chart.insert("path",":first-child")
//                        							.append("path")
                        	.datum(function(){
                        
                        		   return (
   	                        		    
   	                        		    [{
   	                        		    	visitCount:0,
   		                        			purchaseCount:0,
   		                        			price:price_extent[0]	                        			
   	                                	}]
   	                        		    .concat(item_data)
   	                        		    .concat(
   	                        		    		[{
   	                        		    			visitCount:0,
   				                        			purchaseCount:0,
   				                        			price:price_extent[1]	                        			
   	                        		    		}]
   	                        		    	   )
   	                        		    	   
   	                        	    );
                        	
                        	})
                        	.attr("class", "line product_purchase_line")
                        	.attr("fill", "none")
                        	.attr("stroke", "var(--purchase_color)")
                        	.attr("stroke-width", 0.75)
                        	.attr("stroke-linejoin", "round")
                        	.attr("stroke-linecap", "round")
                        	.attr("stroke-opacity", 0.666)
                        	.attr("fill", "url(#purchase_gradient)")
                        	.attr("fill-opacity",0.888)
//                                                	.attr("fill", "var(--purchase_color)")
//                                                	.attr("fill-opacity",0.1)
                        	.attr("d", line_purchase)
                        	.on("mouseenter",function(){                        		
                        		draw_svg_tooltip("Purchases",d3.select(".footfall_pricing_svg"),d3.mouse(this));
                        		d3.select(this).attr("fill-opacity",1);
                        	})
                        	.on("mouseleave",function(e){
                        		d3.select(this).attr("fill-opacity",0.888)
                        		remove_tooltip();                        		
                        	})
                        	;	
                        	
	footfall_pricing_chart
							.insert("path",":first-child")
//                        							.append("path")
                        	.datum(function(){
                        		
                        		
                        	    return (
                        		    
                        		    [{
                        		    	visitCount:0,
	                        			purchaseCount:0,
	                        			price:price_extent[0]	                        			
                                	}]
                        		    .concat(item_data)
                        		    .concat(
                        		    		[{
                        		    			visitCount:0,
			                        			purchaseCount:0,
			                        			price:price_extent[1]	                        			
                        		    		}]
                        		    	   )
                        		    	   
                        	    );
                        	
                        	})
                        	.attr("class", " line product_visit_line ")
                        	.attr("fill", "none")
                        	.attr("stroke", "var(--visit_color)")
                        	.attr("stroke-width", 0.75)
                        	.attr("stroke-linejoin", "round")
                        	.attr("stroke-linecap", "round")
                        	.attr("stroke-opacity", 0.666)
                        	.attr("fill", "url(#visit_gradient)")
//                          .attr("fill", "var(--visit_color)")
                        	.attr("fill-opacity",0.888)
                        	.attr("d", line_visit)
                        	.on("mouseenter",function(e){
                        		
                        		draw_svg_tooltip("Visits",d3.select(".footfall_pricing_svg"),d3.mouse(this));
                        		d3.select(this).attr("fill-opacity",1);
                        		
                        		
                        	})
                        	.on("mouseleave",function(e){
                        		
                        		d3.select(this).attr("fill-opacity",0.888)
                        		remove_tooltip();
                        		
                        	})
                        	;
	

	
	
    footfall_pricing_chart
		.append("text")			
		.text("Footfall")
		.attr("class","chart_main_axis_title")
		.attr("x",0)
		.attr("y",(this_chart_h/2+margin.top))
		.style("text-anchor", "middle")
		.attr("transform", "rotate(-90,12,"+(this_chart_h/2+margin.top)+")");
		;
		
		
                		
	footfall_pricing_chart
		.append("text")			
		.text("Price Range")
		.attr("class","chart_main_axis_title")
		.attr("x",(this_chart_w/2+margin.left))
		.attr("y",(this_chart_h+margin.top+su_mi))
		.style("text-anchor", "middle")

		;                   	
	
	
	
	footfall_pricing_chart.call(zoom);

//	d3.select(".footfall_pricing_svg").call(zoom);
	
	
	
	
	function zoom(svg) {

		console.log("zoom(svg)");
		
		
		
//		var extent = [
//			[margin.left, margin.top], 
//			[this_chart_w - margin.right*2, this_chart_h - margin.top]
//		];

		var extent = [
			[margin.left, 0], 
			[this_chart_w , this_chart_h ]
		];
		

		function zoomed() {

			console.log("zoomed");
			
			var zoom_scale = d3.event.transform.k;

			console.log("zoom_scale = "+zoom_scale);
			
			x_scale
//				.rangeRound([margin.right, this_chart_w]
				.range([margin.left, this_chart_w - margin.right]
				.map(d => d3.event.transform.applyX(d)));

			svg.select(".product_visit_line")
				.attr("d", line_visit);
			
			svg.select(".product_purchase_line")
				.attr("d", line_purchase);
			
			svg.select(".product_cartexit_line")
				.attr("d", line_cartexit);

			svg.select(".x_axis")
				.call(
						d3.axisBottom(x_scale)
						  .ticks(Math.abs(zoom_scale*10))
				     )
				.on("end", function(){
					footfall_pricing_chart.attr("transform", "translate("
		    				+ ( footfall_pricing_chart_dim.x )
		    				+"," 
		    				+ ( footfall_pricing_chart_dim.y ) 
		    				+ ")");
				});
			
			d3.selectAll(".chart_tag").nodes()
					.map(function(d) { 
						
						var _datum = d3.select(d).datum();
						console.log(_datum);
						d3.select(d).attr("transform", "translate("
						    				+(x_scale(_datum.x_axis_value)+margin.left)
						    				+"," 
						    				+ ( y_scale(_datum.y_axis_value)+margin.top) 
						    				+ ")");
						
						return d.parentNode; 
						
					});
			
			console.log(d3.selectAll(".chart_tag"));
			
			
		}
		
		
		
		var zooming = d3.zoom()
						.scaleExtent([1, 50])
						.translateExtent(extent)
						.extent(extent)
						.on("zoom", zoomed);

		
		svg.call(zooming);
		
		console.log(svg);
		
	}
	
	

	
	

}






function draw_tag_list_expanded()
{
    var tool_class_name = "tag_list_expanded";
    var tool_dot_class_name = " ."+tool_class_name;
    
	
	var tool_w = lu*5;
	var tool_max_h = su*8;
 
	
	
    $("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> TAG list </div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<div class='tool_box_content_comment'> Based on last 5 user selections </div>"+

			"</div>"+
    "</div>")
            .css({
        	left:(lu*11-tool_w-su-su_3),
        	top: (0),
        	width:(tool_w),
        	"min-height" : (tool_max_h),
        
            })
            .data("view_status",1)
            .click(function(){
        
            })		
            .appendTo(".footfall_pricing");
    


	$(tool_dot_class_name+" .tool_box_header_btn")
		.click(function(){
		    
		    draw_tag_list_expanded();
		    
		});
	
	
    var	tool_box_ul = $( "<ul> " +
	    		"<li class='tool_box_ul_li_header small_text bold_text ' > " +
				"<div class='tool_box_ul_li_header_col tag_item_header_bullet'> Tag </div>"+
				"<div class='tool_box_ul_li_header_col tag_item_header_name'>Name</div>"+
				"<div class='tool_box_ul_li_header_col tag_item_header_value'>Value</div>"+
				
				"</li>"+
			"</ul>" )
			.addClass("tool_box_ul tag_item_ul")
			.css({
	
				"max-height" : (tool_max_h-lu),

			})
			.appendTo(tool_dot_class_name + " .tool_box_content");
	

	

	
    $.each(item_tag_array,function(i,v){	
	
	
	    	console.log(v);
	    	
	    	var li = $("<li class='tool_box_ul_li "+v.class_text+" small_text'> " +
				"<div class='tool_box_ul_li_bullet'></div>"+
				"<div class='tool_box_ul_li_name bold_text'><span>"+ v.name +"</span></div>"+
				"<div class='tool_box_ul_li_name'><span>"+ string_trim(v.item.nameStr,25) +"</span></div>"+
				"<div class='tool_box_ul_li_value'><div>"+ (v.value) +"</div></div>"+		
			   "</li>")
			.data("item",item_map[v.item_id])
			.click(function()
				{
			    	console.log("clicked");
					console.log($(this).attr("item"));
					console.log(v.item_id );
					window.location ="user/item/overview?i="+v.item_id ;				
				})
			.mouseenter(function(e){
				console.log(".chart_tag ."+v.class_text);
				d3.select(".chart_tag ."+v.class_text).dispatch("mouseenter");
			})	
			.appendTo($(".tag_item_ul"))
			;		
    });
	
	
	
	
}








function compute_pricing()
{
    var deferred = new $.Deferred();
    
    
    price_extent = d3.extent(item_data, d => {
		return d.price;			
	});
    
    
    item_data_l = item_data.length;
    

    for (var i=0; i<item_data_l; i++){
    	
    	var data_elem = item_data[i];
    	
    	
    	if (item_data[i].price<0){
    		item_data[i].price = 0;
    	};
	
	
	
	
		if (item_data_l==(i+1)){
	
	
			price_extent[0]=0;
			
		    deferred.resolve(
			    item_data.sort(function(a, b) { 
				return - ( b.price - a.price );			
			    })
			    );
		    
			
		};
	
    }
    
    
    return deferred.promise();

}







function compute_item_data()
{
	var deferred = new $.Deferred();
    var item_data_l = item_data.length;

    for (var i=0; i<item_data_l; i++){
    	
//    	console.log(item_data[i]);
    	
    	
    	if ((highest_visit_item.touch_count <= item_data[i].visitCount)){
    	    highest_visit_item.item_id = item_data[i].itemId;
    	    highest_visit_item.touch_count = item_data[i].visitCount;
    	    highest_visit_item.price = item_data[i].price;
    	    highest_visit_item.value = item_data[i].visitCount;
    	    highest_visit_item.item = item_data[i];

    	};

    	
    	
    	if ((highest_purchase_item.touch_count <= item_data[i].purchaseCount)){
    		highest_purchase_item.item_id = item_data[i].itemId;
    		highest_purchase_item.touch_count = item_data[i].purchaseCount;
    		highest_purchase_item.price = item_data[i].price;
    		highest_purchase_item.value = item_data[i].purchaseCount;
    		highest_purchase_item.item = item_data[i];
    	};    	
    	
    	
    	
    	if ((highest_cartexit_item.touch_count <= item_data[i].cartexitCount)){
    		highest_cartexit_item.item_id = item_data[i].itemId;
    		highest_cartexit_item.touch_count = item_data[i].cartexitCount;
    		highest_cartexit_item.price = item_data[i].price;
    		highest_cartexit_item.value = item_data[i].cartexitCount;

    		highest_cartexit_item.item = item_data[i];
    	};    
    	
    	
    	
    	if (highest_net_sell.net_sell<(item_data[i].price*item_data[i].purchaseCount)){
    		
    		highest_net_sell.net_sell = item_data[i].price*item_data[i].purchaseCount;
    		highest_net_sell.item_id = item_data[i].itemId;
    		highest_net_sell.touch_count = item_data[i].purchaseCount;
    		highest_net_sell.price = item_data[i].price;
    		highest_net_sell.value = item_data[i].price*item_data[i].purchaseCount;

    		
    		highest_net_sell.item = item_data[i];
    		
    	};
    	
    	
    	
    	
    	if (convertion_ratio.ratio<(item_data[i].purchaseCount/item_data[i].visitCount)){
    		
    		var ratio = item_data[i].cartexitCount/item_data[i].purchaseCount;
    		if (isFinite(ratio)){
    		
	    		convertion_ratio.ratio = item_data[i].purchaseCount/item_data[i].visitCount;
	    		convertion_ratio.item_id = item_data[i].itemId;
	    		convertion_ratio.touch_count = item_data[i].footfallCount;
	    		convertion_ratio.price = item_data[i].price;
	    		convertion_ratio.value = item_data[i].purchaseCount/item_data[i].visitCount;

	    		convertion_ratio.item = item_data[i];
	    		
    		}
    		
    	}    	
    	
    	
    	if (cartexit_ratio.ratio<(item_data[i].cartexitCount/item_data[i].purchaseCount)){
    		
    		var ratio = item_data[i].cartexitCount/item_data[i].purchaseCount;
    		if (isFinite(ratio)){
        		cartexit_ratio.ratio = item_data[i].cartexitCount/item_data[i].purchaseCount;
        		cartexit_ratio.item_id = item_data[i].itemId;
        		cartexit_ratio.touch_count = item_data[i].footfallCount;
        		cartexit_ratio.price = item_data[i].price;
	    		highest_visit_item.value = item_data[i].cartexitCount/item_data[i].purchaseCount;

        		
        		cartexit_ratio.item = item_data[i];
    		}
    		
    	}    	
    	
    	
    	
    	
     	
    	item_map[item_data[i].itemId] = item_data[i];
       	

    	if (i+1==item_data_l){
    		 deferred.resolve();
    	};
    }
    
    return deferred.promise();
	
}






function compute_category_data_step1()
{
	var deferred = new $.Deferred();
    var item_data_l = item_data.length;
    
    var min_price = 1000000;
    var max_price = 0;
    
    

    
    for (var i=0; i<item_data_l; i++){
    	
    	var top_category = item_data[i].catArray.split(">>")[0];
    	
//    	console.log(top_category);
//    	console.log(category_data[top_category]);
    	
    	if (category_data[top_category]==null){
    		
    		category_data[top_category] = [item_data[i]];
    		
    	}
    	else{
    		category_data[top_category].push(item_data[i]);
    	};
    	
    	
    	if (min_price > item_data[i].price){
    		min_price = item_data[i].price;
    	}
    	
    	if (max_price < item_data[i].price){
    		max_price = item_data[i].price;
    	}
    	
    	

    	
    	
       	
    	if ((highest_visit_cat.touch_count <= item_data[i].visitCount)){
    		highest_visit_cat.item_id = item_data[i].itemId;
    		highest_visit_cat.touch_count = item_data[i].visitCount;
    		highest_visit_cat.price = item_data[i].price;
    	    highest_visit_cat.value = item_data[i].visitCount;
    	    highest_visit_cat.item = item_data[i];

    	};

    	
    	
    
    	if (i+1==item_data_l){
    		deferred.resolve();
//    		console.log(category_data);
//    		console.log(max_price);
//    		console.log(min_price);
    		
    		
    	};
   }
   
   return deferred.promise();

}






function compute_category_data_step2()
{
	
	var deferred = new $.Deferred();

	
	var promises = [];
	
	var key_array = Object.keys(category_data);
	
	var _length = key_array.length;
	
	
	for (var i = 0; i < _length; i++) {

//		promises.push(Math.min.apply(Math, category_data[key_array[i]].map(function(o) { return o.price; })))
//
//	    promises.push(Math.max.apply(Math, category_data[key_array[i]].map(function(o) { return o.price; })));
//		
		promises.push(
				category_data[key_array[i]].sort(function(a, b) { 
					return - ( b.price - a.price );			
			    })
		);
		
		
		category_price_data.keys.push(key_array[i].trim());

	}
	
	Promise.all(promises).then(function(data) {
		
		console.log(data);
		
		data.map(d=>category_price_data.values.push ( d ));
//		category_price_data.values.push ( [data] );		

	});
	
	
	


}







function draw_category_pricing_tool()
{
	var tool_class_name = "category_pricing";
    var tool_dot_class_name = " ."+tool_class_name;
    
	
    
	var tool_w = lu*11;
	var tool_max_h = su*8;
 
	
	
    $("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"" +
			"<div class='tool_box_header_name'> Category Pricing Optimization </div>"+			
			
			"<div class='tool_box_header_btn tag_btn flat_btn'></div>"+
			"<div class='tool_box_header_btn up_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin' height=480> </svg>"+
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
    
    $(tool_dot_class_name+" .tag_btn ")
		.click(function(){
		    
			if ($(".tag_category_expanded").length==0){
				draw_category_list_expanded();	
			}
			else{
				$(".tag_category_expanded").remove();
			}
		    
		    
		});
    
    

	$(tool_dot_class_name+" .up_btn ").click(function(){
		
		console.log("up_btn");
		
		var dim = $(tool_dot_class_name)[0].getBoundingClientRect();
		
		console.log(dim);

		window.scrollTo(0, dim.y+window.scrollY+gap_su_1);
		
	});
    
   
	draw_chart_legends($(tool_dot_class_name+" .tool_box_content"),{x:(tool_w-su*6),y:(su+su_3)})

	
	
}







function update_category_pricing_tool(cat_text)
{
	
//	console.log("#"+cat_text.trim()+"#");
//	
//	console.log(category_data[cat_text]);
	
	var cat_i = category_price_data.keys.indexOf(cat_text.trim());
	
//	console.log(cat_i);
	
//	console.log(category_price_data.values[cat_i]);

	
	
	d3.select(".category_pricing_chart").remove();
	
	
	

	var margin = {top: lu_3, right: lu_3, bottom: lu_3, left: lu_3};

	var this_chart_w = lu*10;
	var this_chart_h = su*6;
	


	var category_pricing_chart = d3.select(".category_pricing_svg")
                                	.append("svg")
                                	.attr("class","category_pricing_chart")
                                	.attr("x",0)
                                	.attr("y",0)
                                	;

	d3.select(".category_pricing_svg")
						  .append("defs").append("clipPath")
						    .attr("id", "category_chart_clip")
						  .append("rect")
						  	.attr("x", (margin.right*2))
						  	.attr("y", (0))
						    .attr("width", this_chart_w-margin.right*2)
						    .attr("height", this_chart_h+margin.top);
	
	

	var x_scale = d3.scaleLinear()
                    	.rangeRound([margin.left, this_chart_w])
                    	.domain(d3.extent(category_price_data.values[cat_i], d => d.price))
                    	;

	var y_scale = d3.scaleLinear()
	                	.range([this_chart_h, margin.top])
	                	.domain(d3.extent(category_price_data.values[cat_i], d => d.visitCount))
	                	;

	var xAxis = d3.axisBottom(x_scale)
//                    	.tickSize(0)
//                    	.tickFormat(d3.timeFormat("%b-%y"))
                    	;

	var yAxis = d3.axisLeft(y_scale)
//					.ticks(3)
					;


	category_pricing_chart.append("g")
                        	.attr("class", "x_axis")
                            .attr("transform", "translate("+margin.left+"," + (this_chart_h+margin.top) + ")")
                        	.call(xAxis)
                        	;

	category_pricing_chart.append("g")
                        	.attr("class", "y_axis")
                    		.attr("transform", "translate("+(margin.left+margin.right)+","+margin.top+")")
                        	.call(yAxis)	
                        	;

	
	
	var line_visit = d3.line()
							.x(d => {
								
							    
							    return (x_scale(d.price)+margin.left);
							    
							})
							.y(d => y_scale(d.visitCount)+margin.top)
//							.curve(d3.curveCardinal.tension(0.6))
							.curve(d3.curveLinear)
							;	
	
	
	
	var line_purchase = d3.line()
						.x(d => {
							
					//	    console.log(d.price);
						    return (x_scale(d.price)+margin.left);
						    
						})
						.y(d => y_scale(d.purchaseCount)+margin.top)
//						.curve(d3.curveCardinal.tension(0.6))
						.curve(d3.curveLinear)
						;
	

	
	var line_cartexit = d3.line()
						.x(d => {
							
						    return (x_scale(d.price)+margin.left);
						    
						})
						.y(d => { 
//							console.log(d.price);						    
//						    console.log("x="+(x_scale(d.price)+margin.left) );
//						    console.log(d.cartexitCount);
//						    console.log("y="+(y_scale(d.cartexitCount)+margin.top));
						    
							return y_scale(d.cartexitCount)+margin.top;
						})						
//						.curve(d3.curveCardinal.tension(0.6))
						.curve(d3.curveLinear)
						;
	
	
	
	

	category_pricing_chart.append("path")							
                        	.datum(function(){
                        		
                        		
                        	    return (
                        		    
                        		    [{
                        		    	visitCount:0,
	                        			purchaseCount:0,
	                        			price:category_price_data.values[cat_i][0].price	                        			
                                	}]
                        		    .concat(category_price_data.values[cat_i])
                        		    .concat(
                        		    		[{
                        		    			visitCount:0,
			                        			purchaseCount:0,
			                        			price:category_price_data.values[cat_i][category_price_data.values[cat_i].length-1].price	                        			
                        		    		}]
                        		    	   )
                        		    	   
                        	    );
                        	
                        	})
                        	.attr("class", "category_path category_visit_line")
                        	.attr("clip-path", function(){ return 'url("#category_chart_clip")';})
                        	.attr("fill", "none")
                        	.attr("stroke", "var(--visit_color)")
                        	.attr("stroke-width", 0.75)
                        	.attr("stroke-linejoin", "round")
                        	.attr("stroke-linecap", "round")
                        	.attr("stroke-opacity", 0.666)
                        	.attr("fill", "url(#full_visit_gradient)")
//                        	.attr("fill", "var(--visit_color)")
//                        	.attr("fill-opacity",0.1)
                        	.attr("d", line_visit)
                        	.on("mouseenter",function(e){
                        		
                        		draw_svg_tooltip("Visits",d3.select(".footfall_pricing_svg"),d3.mouse(this));
                        		d3.select(this).attr("fill-opacity",0.5);                        		
                        		
                        	})
                        	.on("mouseleave",function(e){
                        		
                        		d3.select(this).attr("fill-opacity",0.1);
                        		remove_tooltip();
                        		
                        	})
                        	;
	


	category_pricing_chart.append("path")							
                        	.datum(function(){
                        		
                        		
                        	    return (
                        		    
                        		    [{
                        		    	visitCount:0,
	                        			purchaseCount:0,
	                        			price:category_price_data.values[cat_i][0].price	                        			
                                	}]
                        		    .concat(category_price_data.values[cat_i])
                        		    .concat(
                        		    		[{
                        		    			visitCount:0,
			                        			purchaseCount:0,
			                        			price:category_price_data.values[cat_i][category_price_data.values[cat_i].length-1].price	                        			
                        		    		}]
                        		    	   )
                        		    	   
                        	    );
                        	
                        	})
                        	.attr("class", "category_path category_purchase_line")
                        	.attr("clip-path", function(){ return 'url("#category_chart_clip")';})
                        	.attr("fill", "none")
                        	.attr("stroke", "var(--purchase_color)")
                        	.attr("stroke-width", 0.75)
                        	.attr("stroke-linejoin", "round")
                        	.attr("stroke-linecap", "round")
                        	.attr("stroke-opacity", 0.666)
                        	.attr("fill", "url(#full_purchase_gradient)")
//                        	.attr("fill", "var(--purchase_color)")
//                        	.attr("fill-opacity",0.1)
                        	.attr("d", line_purchase)
                        	.on("mouseenter",function(e){
                        		
                        		draw_svg_tooltip("Visits",d3.select(".footfall_pricing_svg"),d3.mouse(this));
                        		d3.select(this).attr("fill-opacity",0.5);                        		
                        		
                        	})
                        	.on("mouseleave",function(e){
                        		
                        		d3.select(this).attr("fill-opacity",0.1);
                        		remove_tooltip();
                        		
                        	})
                        	;
	
	
	

	category_pricing_chart.append("path")
                        	.datum(function(){
                        		
                        		
                        	    return (
                        		    
                        		    [{
                        		    	cartexitCount:0,
	                        			purchaseCount:0,
	                        			price:category_price_data.values[cat_i][0].price	                        			
                                	}]
                        		    .concat(category_price_data.values[cat_i])
                        		    .concat(
                        		    		[{
                        		    			cartexitCount:0,
			                        			purchaseCount:0,
			                        			price:category_price_data.values[cat_i][category_price_data.values[cat_i].length-1].price	                        			
                        		    		}]
                        		    	   )
                        		    	   
                        	    );
                        	
                        	})
                        	.attr("class", " category_path category_cartexit_line")
                        	.attr("clip-path", function(){ return 'url("#category_chart_clip")';})
                        	.attr("fill", "none")
                        	.attr("stroke", "var(--cartexit_color)")
                        	.attr("stroke-width", 0.75)
                        	.attr("stroke-linejoin", "round")
                        	.attr("stroke-linecap", "round")
                        	.attr("stroke-opacity", 0.666)
                        	.attr("fill", "url(#full_cartexit_gradient)")
//                        	.attr("fill", "var(--cartexit_color)")
//                        	.attr("fill-opacity",0.1)
                        	.attr("d", line_cartexit)
                        	.on("mouseenter",function(e){
                        		
                        		draw_svg_tooltip("Visits",d3.select(".footfall_pricing_svg"),d3.mouse(this));
                        		d3.select(this).attr("fill-opacity",0.5);                        		
                        		
                        	})
                        	.on("mouseleave",function(e){
                        		
                        		d3.select(this).attr("fill-opacity",0.1);
                        		remove_tooltip();
                        		
                        	})
                        	;
	

	
	category_pricing_chart
		.append("text")			
		.text("Footfall")
		.attr("class","chart_main_axis_title")
		.attr("x",0)
		.attr("y",(this_chart_h/2+margin.top))
		.style("text-anchor", "middle")
		.attr("transform", "rotate(-90,12,"+(this_chart_h/2+margin.top)+")");
		;
		
		
                		
	category_pricing_chart
		.append("text")			
		.text("Price Range")
		.attr("class","chart_main_axis_title")
		.attr("x",(this_chart_w/2+margin.left))
		.attr("y",(this_chart_h+margin.top+su_mi))
		.style("text-anchor", "middle")

		;                   	
	
		
	
	

	
	
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var lines = document.getElementsByClassName('category_path');
    
    console.log(lines);
	
	var mouseG = category_pricing_chart.append("g").attr("class", "mouse-over-effects");

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
    			  .attr("class", "mouse-circle visit_circle_indicator")
			      .attr("r", 5)
			      
			      ;
    
    mouseG.append("circle")
    			  .attr("class", "mouse-circle purchase_circle_indicator")
			      .attr("r", 5)
			      
			      ;
    
    
    mouseG.append("circle")
    			  .attr("class", "mouse-circle cartexit_circle_indicator")
			      .attr("r", 5)
			     
			      ;

    
    
    
    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', (this_chart_w-margin.right)) // can't catch mouse events on a g element
      .attr('height', this_chart_h-margin.top)
      .attr('x', (margin.left+margin.right))
      .attr('y', (margin.top+margin.bottom))
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function() { // on mouse out hide line, circles and text
    	  
    	  d3.selectAll(".mouse-line")
	          	.style("opacity", 0)	          	
	          	;
    	  
    	  d3.selectAll(".mouse-circle")
	  				.style("opacity", 0)
	  				;
    	  
    	  $(".modal_chart_indicator").remove();

      })
      .on('mouseover', function() { // on mouse in show line, circles and text
    	  d3.select(".mouse-line")
	        .style("opacity", 1);
    	  d3.selectAll(".mouse-circle")
          	.style("opacity", 1);
//    	  d3.selectAll(".mouse-per-line text")
//          	.style("opacity", "1");
      })
      .on('mousemove', function() { // mouse moving over canvas
    	  
    	  
        var mouse = d3.mouse(this);
        
//        console.log(mouse);
        
        d3.select(".mouse-line")
          .attr("d", function() {
        	  var d = "M" + (mouse[0]) + "," + (this_chart_h+margin.top);
        	  d += " " + (mouse[0]) + "," + (margin.top+margin.bottom);
        	  return d;
          });
        
        var x_invert = x_scale.invert(mouse[0]-margin.right);
//        console.log(x_invert);
        
        y_invert_array = [0,0,0];
       
        
        
        for (var i=0; i<y_invert_array.length; i++){
        	
        	var end_visit = lines[i].getTotalLength();
        	var beginning_visit = 0;
             
            var target_visit = null;
            
            while (true){
            	
            	target_visit = Math.floor((beginning_visit + end_visit) / 2);
            	pos = lines[i].getPointAtLength(target_visit);
            	if ((target_visit === end_visit || target_visit === beginning_visit) && pos.x !== mouse[0]) {
            		break;
            		
            	}
            	if (pos.x > mouse[0]) end_visit = target_visit;
            	else if (pos.x < mouse[0]) beginning_visit = target_visit;
            	else break; //position found
            }
            
          
            
            if (i==0){
//            	console.log("visit_indicator");
            	d3.select(".visit_circle_indicator")
            		.attr("transform","translate(" + mouse[0] + "," + pos.y +")");	
//            	console.log([ mouse[0],pos_visit.y  ]);
            	
            	y_invert_array[0]= Math.abs(y_scale.invert(pos.y-margin.top).toFixed(0));
            	
            }
            
            if (i==1){
//            	console.log("purchase_indicator");
            	d3.select(".purchase_circle_indicator")
            		.attr("transform","translate(" + mouse[0] + "," + pos.y +")");
//            	console.log([ mouse[0],pos_visit.y  ]);
            	y_invert_array[1]= Math.abs(y_scale.invert(pos.y-margin.top).toFixed(0));
        	
            }            

            if (i==2){
//            	console.log("cartexit_indicator");
            	d3.select(".cartexit_circle_indicator")
            		.attr("transform","translate(" + mouse[0] + "," + pos.y +")");
//            	console.log([ mouse[0],pos_visit.y  ]);
            	y_invert_array[2]= Math.abs(y_scale.invert(pos.y-margin.top).toFixed(0));
            	
            }

            
            
            
            if (i+1==3){
            	var dim = $(".category_pricing_chart")[0].getBoundingClientRect();
 	            
 	    	    console.log(dim);
 	    	    console.log(mouse);
 	            draw_modal_timeline_indicator(mouse[0],dim.y,[x_invert,y_invert_array]);
 	         
            }
            
        	
        }
        
	
      });	

    
    
    
    
    
    
	
    category_pricing_chart.call(zoom);
	
    
    
    function zoom(svg) {

		console.log("zoom(svg)");
		
		
		
//		var extent = [
//			[margin.left, margin.top], 
//			[this_chart_w - margin.right*2, this_chart_h - margin.top]
//		];

		var extent = [
			[margin.left, 0], 
			[this_chart_w , this_chart_h ]
		];
		

		function zoomed() {

			console.log("zoomed");
			
			var zoom_scale = d3.event.transform.k;

			console.log("zoom_scale = "+zoom_scale);
			

			
			x_scale
//				.rangeRound([margin.right, this_chart_w]
				.range([margin.left, this_chart_w - margin.right]
				.map(d => d3.event.transform.applyX(d)));

			svg.select(".category_visit_line")
				.attr("d", line_visit);
			
			svg.select(".category_purchase_line")
				.attr("d", line_purchase);
			
			svg.select(".category_cartexit_line")
				.attr("d", line_cartexit);

			svg.select(".x_axis")
				.call(
						d3.axisBottom(x_scale)
						  .ticks(Math.abs(zoom_scale*10))
				     )
				.on("end", function(){
//					footfall_pricing_chart.attr("transform", "translate("
//		    				+ ( footfall_pricing_chart_dim.x )
//		    				+"," 
//		    				+ ( footfall_pricing_chart_dim.y ) 
//		    				+ ")");
				});
			
			d3.selectAll(".chart_tag").nodes()
					.map(function(d) { 
						
						var _datum = d3.select(d).datum();
						console.log(_datum);
						d3.select(d).attr("transform", "translate("
						    				+(x_scale(_datum.x_axis_value)+margin.left)
						    				+"," 
						    				+ ( y_scale(_datum.y_axis_value)+margin.top) 
						    				+ ")");
						
						return d.parentNode; 
						
					});
			
			console.log(d3.selectAll(".chart_tag"));
			
			
		}
		
		
		
		var zooming = d3.zoom()
						.scaleExtent([1, 50])
						.translateExtent(extent)
						.extent(extent)
						.on("zoom", zoomed);

		
		svg.call(zooming);
		
	}
    
    
    
    
}









function draw_modal_timeline_indicator(mouse_x,mouse_y,chart_indicator_data)
{
	

	
	var tool_w = su*4;
//	var tool_max_h = su*2;
	
	console.log(chart_indicator_data);
	console.log(chart_indicator_data[0].toFixed(0));
	
//	var formatted_date = chart_indicator_data[0].getDate() + '-' + (chart_indicator_data[0].getMonth()+1) + '-' + chart_indicator_data[0].getFullYear();

	
	if ($(".modal_chart_indicator").length==0){
		
			$(
				"<div class='modal_chart_indicator'>" +
//				"<div class='modal_export_box_header small_text bold_text'> &nbsp; &nbsp; &nbsp; &nbsp;Download CSVs" +
//					"<div class='modal_export_box_header_btn cancel_btn flat_btn'></div>"+
//	
//				"</div>"+
				"<div class='modal_chart_indicator_content'>" +
				
					"<div class='modal_chart_indicator_row small_text'> " +
						"<div class='modal_chart_indicator_row_name small_text bold_text'> Price </div> "+
						"<div class='modal_chart_indicator_row_value price_value normal_text '> "+( chart_indicator_data[0].toFixed(0) ) +" </div> "+					
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
				left:(mouse_x-lu_8),
				top: (window.scrollY+mouse_y-su*3),
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
					left:(mouse_x-lu_8),			
				});
		$(".price_value").text(chart_indicator_data[0].toFixed(0));
		$(".visit_value").text(chart_indicator_data[1][0]);
		$(".purchase_value").text(chart_indicator_data[1][1]);
		$(".cartexit_value").text(chart_indicator_data[1][2]);
	}
	
}




function draw_category_list_expanded()
{
    var tool_class_name = "tag_category_expanded";
    var tool_dot_class_name = " ."+tool_class_name;
    
	
	var tool_w = lu*4;
	var tool_max_h = su*8;
 
	
	
    $("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Category List </div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<div class='tool_box_content_comment'> Based on last 5 user selections </div>"+

			"</div>"+
    "</div>")
            .css({
        	left:(lu*11-tool_w-su-su_3),
        	top: (0),
        	width:(tool_w),
        	"min-height" : (tool_max_h),
        
            })
            .data("view_status",1)
            .click(function(){
        
            })		
            .appendTo(".category_pricing");
    


	$(tool_dot_class_name+" .tool_box_header_btn")
		.click(function(){
		    
		    draw_tag_list_expanded();
		    
		});
	
	
    var	tool_box_ul = $( "<ul> " +
				    		"<li class='tool_box_ul_li_header small_text bold_text ' > " +
								"<div class='tool_box_ul_li_header_col cat_list_header_bullet'>  </div>"+
								"<div class='tool_box_ul_li_header_col cat_list_header_name'>Category</div>"+				
							"</li>"+
						"</ul>" )
						.addClass("tool_box_ul tag_item_ul")
						.css({
				
							"max-height" : (tool_max_h-lu),
			
						})
						.appendTo(tool_dot_class_name + " .tool_box_content");
	

	

	
    $.each(category_price_data.keys,function(i,v){	
	
	
	    	console.log(v);
	    	
	    	var li = $("<li class='tool_box_ul_li small_text'> " +
				"<div class='tool_box_ul_li_bullet'></div>"+
				"<div class='tool_box_ul_li_name bold_text'><span>"+ v +"</span></div>"+
//				"<div class='tool_box_ul_li_name'><span>"+ string_trim(v.item.nameStr,25) +"</span></div>"+
//				"<div class='tool_box_ul_li_value'><div>"+ (v.value) +"</div></div>"+		
			   "</li>")
			.data("item",item_map[v.item_id])
			.click(function()
				{
			    	console.log("clicked");
			    	update_category_pricing_tool(v);
					$(".tag_category_expanded").remove();

									
				})
			.mouseenter(function(e){
				console.log(".chart_tag ."+v.class_text);
				d3.select(".chart_tag ."+v.class_text).dispatch("mouseenter");
			})	
			.appendTo($(".tag_item_ul"))
			;		
    });
	
	
	
	
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





