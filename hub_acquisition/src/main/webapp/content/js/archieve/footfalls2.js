var main_item_id = null;

var item_map = null;
var max_footfall = 0;
var location_data = null;

var footfall_main_node_svg_text = null;
var footfall_node_svg_text = null;

$.get('content/svg/footfall_central_node.svg', function(text_data){
	
	footfall_main_node_svg_text = text_data;
	console.log(footfall_main_node_svg_text);
		
}, 'text');


$.get('content/svg/footfall_node_m3.svg', function(text_data){
	
	footfall_node_svg_text = text_data;
	console.log(footfall_node_svg_text);
		
}, 'text');


/////////////////////////--------footfall_graph--------/////////////////////////


function init_footfall_graph(item_id)
{
	
//	console.log("init_footfall_graph --------------- ");

	
    var footfall_graph_svg = d3.select("#layer2_svg")
								.append("svg")
								.attr("class", "footfall_in_out_svg")
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
	    	draw_footfall_graph(data);
	    	draw_footfall_info_panel({item_id:item_id});

    	});
    	
    	
    	
    	
    	
    });
    
    

	
}



function remove_footfall_graph_info(svg_elem,d)
{
//	console.log("remove_footfall_graph_info - ");
//	
//	console.log("remove_footfall_graph_info : d:= ");
//	console.log(svg_elem.attr("data-selected"));
	
	
	

	$(".footfall_graph_info").remove();
	svg_elem.attr("filter", "url(#normal_shadow)");

	
	if (parseInt(svg_elem.attr("data-selected"))===0){
//		svg_elem.attr("filter", "url(#normal_shadow)")
	};
	
	
}



function draw_footfall_graph_info(svg_elem,_item_data)
{
//	console.log("draw_footfall_graph_info - ");
	
	var item_id = _item_data.item_id;
	var cluster_id = parseInt( _item_data.cluster);
	var connection_symb_path = "";
	if (cluster_id===2){ 
		return;
	}
	else if (cluster_id===1) { connection_symb_path = "content/svg/in_link_symb.svg" }
	else if (cluster_id===0) { connection_symb_path = "content/svg/out_link_symb.svg" }

	 
	

	var dim_circle = svg_elem.node().getBoundingClientRect();
	
	var footfall_graph_info_svg_w = hu*5;
	var footfall_graph_info_svg_h = vu*5;
	
	var rect_w = hu*3;
	var rect_h = vu*2;
	
	var rect_x = hu+hz_gap_sm;
	var rect_y = footfall_graph_info_svg_h/2-rect_h/2;
	
		
	
	

	
	
	var dim_svg = svg_elem.node().getClientRects()[0];

	
	
    var footfall_graph_info_svg = d3.select("#layer2_svg")
    								.append("svg")
    								.attr("class", "footfall_graph_info footfall_graph_info_svg")
    								.attr("x", 0)
    								.attr("y", 0)
    								.attr("width", footfall_graph_info_svg_w)
    								.attr("height", footfall_graph_info_svg_h) 
    								;
    

	
    footfall_graph_info_svg
		.attr("x", (dim_circle.x+dim_circle.width-hu/2))
		.attr("y", (dim_circle.y+dim_circle.height/2-footfall_graph_info_svg_h/2-vu))			
		;


    footfall_graph_info_svg
		    	.append("rect")
				.attr("class", "footfall_graph_info_rect footfall_graph_info")				
			    .attr("width", rect_w)
				.attr("height", (rect_h))
				.attr("rx", 10)
				.attr("ry", 10)	
				.attr("x", (rect_x))
				.attr("y", (rect_y))
				.attr("filter", "url(#normal_shadow)")	 
				;
		
				
    
    footfall_graph_info_svg
			    .append("line")
			    .attr("class", "footfall_graph_info_conn footfall_graph_info")
				.attr("x1", hz_gap_tn)
				.attr("y1", (footfall_graph_info_svg_h/2))
				.attr("x2", hu+hz_gap_tn)
				.attr("y2", (footfall_graph_info_svg_h/2))
				.attr("stroke", "#000")
				.attr("stroke-width", 2)
				.attr("stroke-linecap", "round")
				.attr("stroke-dasharray",("1 5 "+(hu-6-6-6)+""))
				.style("marker-start","url(#marker_dot)") 
				.style("marker-end","url(#marker_dot)")
				;
    
    
    
    $.get(connection_symb_path, function(text_data){
				
    	footfall_graph_info_svg																							
							.append("g")
//							.attr("class","item_timeline_btn")		
							.attr("transform","translate("+( rect_x + rect_w/2 - symb_w*(0.7)/2 )+", "+( rect_y+vr_gap_tn )+" ) scale("+0.7+")")																						
							.html(						
									text_data						
							 )
							
//							.attr("filter", "url(#normal_shadow)")
							
							;
		
	}, 'text')	
	;
	
    
    
    
    
    
    _draw_row(2,"Name",string_trim(item_map[item_id].nameStr,30) );
    _draw_row(3,"Category",string_trim(item_map[item_id].categoryStr,30));
    _draw_row(4,"Footfall",string_trim(item_map[item_id].footfall,20));
    _draw_row(5,"Rank",string_trim(item_map[item_id].rankF,20));
    
    
    
    
    
    
    
    
    function _draw_row(row_index, caption_row_info, val_row_info)
    {

        footfall_graph_info_svg
    			    .append("text")
    			    .attr("class", "caption_text footfall_graph_info_text footfall_graph_info")
    				.text(caption_row_info)
    				.attr("text-anchor", "start")
    				.attr("x", (rect_x+hz_gap_tn))
    				.attr("y", (rect_y+vr_gap_tn+vr_gap_re*row_index))
    				;
        
        footfall_graph_info_svg
    			    .append("text")
    			    .attr("class", "info_text footfall_graph_info_name_val footfall_graph_info")
    				.text("zpopwer")
    			    .text(val_row_info)
//    				.attr("text-anchor", "start")
    				.attr("x", (rect_x+hu))
    				.attr("y", (rect_y+vr_gap_tn+vr_gap_re*row_index))
    				;
      	
    }
	
   
    
       
	
	$(".footfall_graph_info")
		.css("opacity",1.0)
		.css("z-index",29)
		;
	
	
	
}



function draw_footfall_info_panel( info_panel_data )
{
	
//	console.log("draw_footfall_info_panel - ");
	
//	console.log("footfall.draw_footfall_info_panel : info_panel_data :=");
//	console.log(info_panel_data);
	
	var _item_id = info_panel_data.item_id;
	
	set_goto_footfall_nav_btn(info_panel_data.item_id);
	
	$(".info_panel_svg").remove();
	
	var layer2_svg = d3.select("#layer2_svg");
	
    var layer2_svg_w = parseInt(layer2_svg.style("width"));
    var layer2_svg_h = parseInt(layer2_svg.style("height"));
    
    var info_panel = layer2_svg
//						.append("svg")
						.insert("svg",":first-child")
						.attr("class", "info_panel_svg info_panel")
						.attr("x", layer2_svg_w*(9/12))
						.attr("y", 0)
						.attr("width", (layer2_svg_w*(3/12)-hz_gap_tn*2-hu/2 ) )
						.attr("height", vu*10)
						.style("position", "fixed")
						.style("z-index", 13)																		
						;
    
    _draw_title("Information Panel");
    
    
    _draw_row(1,"Name",string_trim(item_map[_item_id].nameStr,30 ));
    _draw_row(2,"Category",string_trim(item_map[_item_id].categoryStr.split("  ")[1],30 ));
    _draw_row(3,"Price",string_trim(item_map[_item_id].price,30 ));
    _draw_row(4,"Rank",string_trim(item_map[_item_id].rankF,30 ));
    
   
	
    _draw_row(5,"Footfall %", function(){
    	
    	return String(
				parseFloat(String(item_map[_item_id].footfallPerc).substring(0,6))
				*
				parseFloat(100)
				).substring(0,5)
				+
				" %";
    });
    
    _draw_row(6,"Footfall",item_map[_item_id].footfall); 
    _draw_row(7,"Visits",item_map[_item_id].visitCount); 
    _draw_row(8,"Purchases",item_map[_item_id].purchaseCount);
    _draw_row(9,"Cart Exits",item_map[_item_id].cartexitCount);
   

    
    
    function _draw_row(row_index, caption_row_info, val_row_info)
    {
    	
    	d3.select(".info_panel_svg")
    		.append("text")
		    .attr("class", "caption_text info_panel")
			.text(caption_row_info)
			.attr("text-anchor", "start")
			.transition()
			.attr("x", (hz_gap_tn))
			.attr("y", (vu*(2/3)*(row_index+2)) )
			.on("end", function(){
				
				var caption_info_panel = d3.select(this);
				
				d3.select(".info_panel_svg")
					.append("text")
				    .attr("class", "info_text  info_panel")
					.text(val_row_info)
					.attr("text-anchor", "start")				
					.attr("x", function(){ 
						
						return (hu);
//						return (hz_gap_re+ parseInt(caption_info_panel.node().getComputedTextLength() ));
					})
					.attr("y", (vu*(2/3)*(row_index+2)) )
					.call(wrap, (symb_w*2-hz_gap_re))
					;
			})
			
			;

    }	
    
    function _draw_title(title_text)
    {
    	d3.select(".info_panel_svg")
			.append("text")
		    .attr("class", "info_title info_panel")
			.text(title_text)
			.attr("text-anchor", "start")
			.transition()
			.attr("x", (hz_gap_tn))
			.attr("y", (vu/3*2) );

    	d3.select(".info_panel_svg")
    	    .insert("line",":first-child")
    		.attr("class","frame_line")
    		.transition()
    		.attr("x1", d => hz_gap_tn )
    	    .attr("y1", d => vu )    	    
    	    .attr("x2", d => ( hu*4-hz_gap_tn*2 ) )
    	    .attr("y2", d => vu )
    	    
    	    ;
    	
    	
    }
	
}



function footfall_node_click(svg_elem,d)
{
	console.log("footfall_node_click - ");
	
	console.log("footfall_node_click : selected := ");
	console.log(svg_elem.attr("data-selected"));
	
	d3.selectAll(".footfall_node")
		.select("circle")
//		.attr("fill", "url(#blueGradient)")
		.attr("fill", function(d){
			
			var f = "url(#blueGradient)";
			
			console.log(d)
			
			if (d.cluster==2)
			{
				f = "#4DF2FF";
			}
			
	    	
	    	return f;
	    })
	;
	
	
	
	if (parseInt(svg_elem.attr("data-selected"))==1){
		
		window.location = 'user/single_item_footfall?item_id=' + svg_elem.attr("data-item_id");
		
	}
	else{

		
		d3.selectAll(".footfall_node")
			.attr("data-selected",0)
			.style("stroke-width", 0)		
			;
		
		
		
//		console.log("footfall_node_click : selectAll.d := ");
		console.log(d3.selectAll(".footfall_node[data-selected='1']") );
		
//		d3.selectAll("[data-cluster_id='0']>circle")
//			.style("stroke", "none")
//			.style("stroke-width", 0);
		
//		d3.selectAll("[data-cluster_id='1']").style("fill", color_palette[0]);
//		d3.selectAll("[data-cluster_id='2']").style("fill", "rgb(0, 250, 146)");
		
		
		draw_footfall_info_panel(d);
		
		svg_elem.attr("data-selected",1);
		
		svg_elem.select("circle")
//				.style("stroke", color_palette[4])
//				.style("stroke-width", 4)
//				.style("fill", "rgb(0, 250, 146)")
				.attr("fill", "url(#orangeGradient)")
				;
		
	}
		
	
	
	
	
	
	
}



function draw_footfall_graph(footfall_graph_data)
{
//	console.log("draw_footfall_graph - ");
//
//	console.log(footfall_graph_data);
	
	
	
	
	
	
	
	var nodes = footfall_graph_data.nodes;
	var clusters = footfall_graph_data.clusters;
		
		
	
    var footfall_graph_svg = d3.select(".footfall_in_out_svg")
//								.append("svg")
//								.attr("class", "footfall_in_out_svg")
//								.attr("x", 0)
//								.attr("y", 0)
								;

	var dim = d3.select("#layer2_svg").node().getClientRects()[0];
	var footfall_graph_w = dim.width;
	var footfall_graph_h = dim.height;
	var padding = 1;
	
//    var color = d3.scaleSequential(d3.interpolateRainbow).domain(d3.range(3));
    var color = ["#009fff","#009fff","#00fa92"];
//	console.log(color[0]);
    
    var force = d3.forceSimulation()
    				.force('center', d3.forceCenter(footfall_graph_w*(9/12)/2-vu/2, footfall_graph_h*(9/12)/2))
    				.force('cluster', cluster().strength(0.9))
    				.force('collide', d3.forceCollide(d => d.radius + padding).strength(0.9))
    				.on('tick', layoutTick)
    				.nodes(nodes);
    
    var node = footfall_graph_svg.selectAll("g.footfall_node")
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
								    .on("mouseover",function(d) { 
								    	
								    	console.log(d);
								    	
								    	d3.select(this).attr("filter", "url(#focus_shadow)");
								    	draw_footfall_graph_info(d3.select(this),d);
								    
								    })
								    .on("mouseleave",function(d) { 
								    	
								    	remove_footfall_graph_info(d3.select(this),d);
								    	
								    	d3.select(this).attr("filter", "url(#normal_shadow)")
								    	
								    })
								    .on("mousedown",function(d) { 
								    	
								    	d3.select(this).attr("filter", "url(#pressed_shadow)");
								    
								    })
								    .on("mouseup",function(d) { 
								    	
								    	d3.select(this).attr("filter", "url(#focus_shadow)");
								    
								    })
								    .on("click",function(d) { 
								    	
								    	footfall_node_click(d3.select(this),d);
								    	
								    })								    
								    ;

   
   

	
    node.html(function(d){
		
//		console.log(d);
		
		var h = footfall_node_svg_text;
		if (d.cluster==2){
			h = footfall_main_node_svg_text;
		};
		
		return h;
	}).attr("filter", "url(#normal_shadow)")
	;
    
    
    
    node.append("text")    
//	 	.text("123")
	 	.text(function(d){
//	 		console.log(d);
//	 		return "723";
	    	return d.rank;
	    })
		.attr("text-anchor", "middle")
		.style("font-size", "30px")
		.attr("x", 50)
		.attr("y", 60)// vetrically alighing wrt text height 24.5/4 =~ 6
		;
	
	
	
	
	
	
	
	
	
	
    
    
    var left_connector_circle = footfall_graph_svg.append("circle")
								   .attr("class","footfall_in_out_connect_circle")
								   .attr("cx",clusters[2].x )
								   .attr("cy",clusters[2].y )
								   .attr("r",5)
								   ;
    var right_connector_circle = footfall_graph_svg.append("circle")
								   .attr("class","footfall_in_out_connect_circle")
								   .attr("cx",clusters[2].x )
								   .attr("cy",clusters[2].y )
								   .attr("r",5)
								   ;    
    
    
    var line = d3.line()
					    .x(function(d) { return d.x; })
					    .y(function(d) { return d.y; });
    
    
    var right_line_coord = [{x: clusters[2].x, y: clusters[2].y}, {x: clusters[2].x, y: clusters[2].y}]
    
    var left_line_coord = [{x: clusters[2].x, y: clusters[2].y}, {x: clusters[2].x, y: clusters[2].y}]
    
    
    var right_line = footfall_graph_svg
						.insert("path",":first-child")
						.attr("class", "right_line")
						.attr('d', function(d) { return line(right_line_coord); })
//						.attr("fill","")  
			            .attr("stroke","#444")  
			            .attr("stroke-width",1)  
//			            .attr(stroke-dasharray,"10")
//						.style("marker-start","url(#arrow)")  
//						.style("marker-mid","url(#arrow)")  
//					    .style("marker-end","url(#arrow)")
//			            .attr('marker-mid', function (d) { return 'url(#arrow2)'; })
						;    
    
    
    

    
    var left_line = footfall_graph_svg
						.insert("path",":first-child")
						.attr('d', function(d) { return line(left_line_coord); })
//						.attr("fill","white")  
					    .attr("stroke","blue")  
					    .attr("stroke-width",2)
//					    .attr(stroke-dasharray,"100")
					//	.style("marker-start","url(#arrow)")  
					//	.style("marker-mid","url(#arrow)")  
					//    .style("marker-end","url(#arrow)")
//					    .style('marker-mid', function (d) { return 'url(#arrow1)'; })
					    ;    

    
    var in_cluster_text = footfall_graph_svg
    						.insert("text",":first-child")
    						.text('\u2022 Inward')
						// 	.text(text_msg)
							.attr("text-anchor", "start")
							.attr("class", "caption_text")
							.attr("x", clusters[2].x)
							.attr("y", clusters[2].y)// vetrically alighing wrt text height 24.5/4 =~ 6
							;
    

    
    var out_cluster_text = footfall_graph_svg
    						.insert("text",":first-child")
    						.text('Outward \u2022')
						// 	.text(text_msg)
							.attr("text-anchor", "end")
							.attr("class", "caption_text")
							.attr("x", clusters[2].x)
							.attr("y", clusters[2].y)// vetrically alighing wrt text height 24.5/4 =~ 6
							;
    
    

    function layoutTick(e) 
    {
    	
    	var x_left = 0;
    	var x_left_max = 0;
    	var x_right = 10000;
    	
    	
    	
    	node
    		.attr("transform", function(d) {
    			
//    		  console.log(d);

		   	  var _x = d.x ;
	   		  var _y = d.y ;
		   	  var _scale = 0.6;
		   	  var _rotate = 0;
    		  
    		
	    	  if (d.x<=d.radius)
	    	  {
	       		  d.x = d.radius;
	       	  }
	    	  
	       	  if (d.x>= (footfall_graph_w*(9/12) - d.radius ) )
	       	  {
	       		  d.x = footfall_graph_w*(9/12) - d.radius ;
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
	       	  
	       	  if (d.y<=d.radius)
	       	  {
		   		  d.y = d.radius;
		   	  }
	       	  
		   	  if (d.y>=((footfall_graph_h*(9/12) - d.radius )))
		   	  {
		   		  d.y = d.radius;
		   	  }
		   	  
		   	  
		   	  if ( d.cluster == 2 )
		   	  {
		   		  _x = d.x - 30;
		   		  _y = d.y - 30;
		   	  }
		   	  
		   	  
		   	  if ( d.cluster == 2 )
		   	  {
		   		  _x = d.x - 40;
		   		  _y = d.y - 40;
		   		  _scale = 0.8;
		   		
		   	  }
		   	  else
		   	  {
		   		  _x = d.x -25;
		   		  _y = d.y -25;
		   		  _scale = d.radius/50;
		   		
		   	  }
    		
	    	return "translate(" + (_x) + "," + (_y) + ") " + " scale("+_scale+") ";
	    	
	    })
    	
    	
    	
    	
    	
    	left_connector_circle
// 		    .attr("cx", ( clusters[2].x - (clusters[2].x - x_left)*(2/3))   )
		    .attr("cx", ( x_left + vu/2 ) )
		    .attr("cy", ( clusters[1].y ) )		    
		    .attr("r",5)
		    ;

    	right_connector_circle
// 		    .attr("cx", ( clusters[2].x + (x_right - clusters[2].x )*(1/3))   )
		    .attr("cx", ( x_right - vu/2 )   )
// 		    .attr("cy", ( clusters[1].y - ( clusters[2].y - clusters[1].y )*(1/2) ) )
		    .attr("cy", ( clusters[0].y ) )
		    .attr("r",5)		    
		    ;
    	

    	
        right_line_coord = [{x: clusters[2].x, y: clusters[2].y}, {x: ( x_right - vu/2 ), y: ( clusters[0].y  )}];
        left_line_coord = [{x: ( x_left + vu/2 ), y: ( clusters[1].y )},{x: clusters[2].x, y: clusters[2].y}];
        
        
        
        var curve_path = "M20,70 T80,100 T160,80 T200,90";

        
    	right_line
	    	.attr('d', line(right_line_coord) )
			.attr("fill","none")  
	        .attr("stroke","black")  
	        .attr("stroke-width",2)  
	        .attr("stroke-dasharray","0 50 200")
//	        .style("marker-mid","url(#arrow)")
//	        .style("marker-end","url(#arrow)")
//	        .attr('marker-mid', function (d) { return 'url(#arrow1)'; })
	        ;
        
        left_line
	    	.attr('d', line(left_line_coord) )
			.attr("fill","none")  
	        .attr("stroke","black")  
	        .attr("stroke-width",2)  
	        .attr("stroke-dasharray","100")
//	        .style("marker-mid","url(#arrow)")
//	        .attr("marker-start","url(#arrow)")
	//        .attr('marker-mid', function (d) { return 'url(#arrow)'; })
	        ;
        
        
        in_cluster_text
	        .attr("x", left_line_coord[0].x)
			.attr("y", ( left_line_coord[0].y + vu))// vetrically alighing wrt text height 24.5/4 =~ 6
			;
        	

        out_cluster_text
	        .attr("x", right_line_coord[1].x)
			.attr("y", ( right_line_coord[1].y - vu))// vetrically alighing wrt text height 24.5/4 =~ 6
			;
	
    	
    	
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
    			
    			let x = d.x - cluster.x;
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






/////////////////////////--------item_map--------/////////////////////////



function draw_item_large_map()
{
//	console.log("draw_item_large_map - ");
	
	var dim = d3.select("#layer2_svg").node().getClientRects()[0];

	var map_btn_svg = d3.select(".item_map_btn");
	
	var layer3_svg = d3.select("#main_screen_div")
						.append("svg")
						.attr("class", "layer3_svg")
						.attr("x", hu/2)
						.attr("y", vu)
						.style("height", ($( window ).height()-vu) )
						.style("width", ($( window ).width()-hu/2) )
					//	.style("backdrop-filter", "blur(2px)" )
						;
	
	d3.select("#layer2_svg").attr("filter", "url(#blur)");
	
	$(".item_map_btn").detach().appendTo(".layer3_svg");

	
	d3.select(".item_map_btn")
		.transition()
	 	.duration(1000)	 	
	 	.attr("transform","translate("+( hu )+", "+(  dim.height*(2/3)/2  )+" ) scale("+0.5+")")	 	
	 	.on("end", function(){
	 		
	 		var map_svg = layer3_svg
	 							.append("svg")
	 							.attr("class", "map_svg")
	 							.attr("x", dim.x+hu+hz_gap_re)
	 							.attr("y", dim.y-vu+vr_gap_tn)
	 							.attr("width", dim.width*(10/12))
	 							.attr("height", dim.height*(12/12))
	 							.attr("filter", "url(#normal_shadow)")	 							
	 							;
	 		
	 		map_svg.append("rect")
	 				.attr("class", "map_rect")	
	 				.attr("x", vr_gap_tn)
	 				.attr("y", vr_gap_tn)
	 			    .attr("width", dim.width*(10/12)-hz_gap_lg)
	 				.attr("height", dim.height*(12/12)-vr_gap_lg)
	 				.attr("rx", 10)
	 				.attr("ry", 10)	 				
	 			    ;
	 		
	 		
	 		draw_map(".map_svg",location_data);
	 		
			d3.select(".item_map_btn").attr('pointer-events', 'auto');

	 		
	 		
	 	})
	 	.attr("filter", "url(#focus_shadow)")
	 	;
	
	
	
	
	
	
	
	d3.select(".item_map_mini_chart").attr("data-chart_state",2);

	
	
	
	
	
}



function remove_item_large_map()
{
	var item_map_btn_svg = d3.select(".item_map_btn");
	
	var dim = d3.select("#layer2_svg").node().getClientRects()[0];
	
	
	d3.select(".large_map_radio").remove();
	
	d3.select(".map_svg")
		.transition()
		.duration(100)
		.attr("opacity",0.0)
		.on("end", function(){
			d3.select(this).remove();
			d3.select("#layer2_svg").attr("filter", "none");
			
			
			item_map_btn_svg
				.transition()
			 	.duration(1000)
				.attr("transform","translate("+( dim.width*(9/12)-hu*2 + 0.5*symb_h )+", "
						+( dim.height*(9/12) + ( dim.height*(3/12)/2) - 0.5*symb_h/2 )+" ) scale("+0.5+")")
				.on("end", function(){
					$(".item_map_btn").detach().appendTo("#layer2_svg");
					$(".layer3_svg").remove();
					
					d3.select(".item_map_btn").attr('pointer-events', 'auto');
					
				});
				;
			
		});


	


	d3.select(".item_map_mini_chart").attr("data-chart_state",1);
	
	
}



function draw_item_mini_map()
{
	
	
	
	Promise.all([get_item_location(main_item_id)]).then(_reshape_data);

	
	
	function _reshape_data([data])
	{
//		console.log("draw_item_mini_map._reshape_data : data:=");
//		console.log(data);
		
		location_data = data;
		
		
//		console.log("draw_item_mini_map._reshape_data : location_data:=");
//		console.log(location_data.length);
		
		var total_visit_count = 0;
		var total_purchase_count = 0;
		var total_cartexit_count = 0;
		
		$.each(data, function( i, data_elem ) {
			
//			console.log("draw_item_mini_map._reshape_data : data_elem:=");
//			console.log(data_elem);
			
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

//		console.log("draw_item_mini_map._reshape_data : total_visit_count := "+total_visit_count);
//		console.log("draw_item_mini_map._reshape_data : total_purchase_count := "+total_purchase_count);
//		console.log("draw_item_mini_map._reshape_data : total_cartexit_count := "+total_cartexit_count);
		
		
		
		
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
		
		
		
		
		
		_draw(mini_map_data);
		
		
		
		
		
	}
	
	
	function _draw(mini_map_data)
	{		
//		console.log("draw_item_mini_map : _draw");
		
//		console.log("draw_item_mini_map : _draw : mini_map_data:=");
//		console.log(mini_map_data);
		
		
		var barchart_w = hu*5;
		var barchart_h = vu/2;
		
		var item_map_svg = d3.select(".item_map_mini_chart");
		
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
			        	set_attr_active(".item_map_btn",1);
			        	
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



function mininize_item_mini_map()
{
//	console.log("mininize_item_mini_map - ");

	var dim = d3.select(".item_map_btn").node().getClientRects()[0];

	d3.select(".item_map_mini_chart")
		.transition()
		.duration(1000)
		.attr("transform","translate("+( dim.x-dim.width/2 )+", "+( dim.y-dim.height/2 )+" ) scale("+0.01+")")
		;
	
//	.attr('transform', "translate("+(  dim.width*(9/12)-hu*2 + logo_scale*symb_h + logo_scale*symb_h )+", "
//			  +( dim.height*(9/12) + (dim.height*(3/12)/2) - vu/2/2  )+") scale("+0.01+")")
	
	d3.select(".item_map_mini_chart").attr("data-chart_state",0);
	
	
}



function expand_item_mini_map()
{
//	console.log("expand_item_mini_map - ");

//	var dim = d3.select(".item_timeline_btn").node().getClientRects()[0];
	
	var logo_scale = 0.5;
	
	var layer2_svg = d3.select("#layer2_svg");	
	
	var dim = layer2_svg.node().getClientRects()[0];
	
	

	
//	Promise.all([d3.select(".item_timeline_btn").node().getClientRects()[0] ]).then(_expand);

	

//	function _expand([dim]){

//		console.log("dim :=");
//		console.log(dim);

		d3.select(".item_map_mini_chart")
			.transition()
			.duration(1000)
			.attr('transform', "translate("+( dim.width*(9/12)-hu*2 + logo_scale*symb_h - hu*5 - logo_scale*symb_h/2 )+", "
				  +( dim.height*(9/12) + (dim.height*(3/12)/2) - vu/2/2   )+") scale("+1.0+")")
		
			;

		
//	}
		
		
	d3.select(".item_map_mini_chart").attr("data-chart_state",1);
	
	d3.select(".item_map_btn").attr('pointer-events', 'auto');

		
}



function item_map_btn_mouseenter(svg_elem)
{
//	console.log("item_map_btn_mouseenter - ");
//	
//	console.log(svg_elem);
	
	svg_elem.attr("filter", "url(#focus_shadow)");
	
	
}



function item_map_btn_mouseleave(svg_elem)
{
//	console.log("item_map_btn_mouseleave - ");
	
	svg_elem.attr("filter", "url(#normal_shadow)");
}



function item_map_btn_click()
{	
	
//	console.log("item_map_btn_click - ");

	d3.select(".item_map_btn").attr('pointer-events', 'none');

	
	var dim = d3.select(".item_timeline_btn").node().getBoundingClientRect();

	var chart_state_timeline = parseInt(d3.select(".item_timeline_mini_chart").attr("data-chart_state"));
	var chart_state_map = parseInt(d3.select(".item_map_mini_chart").attr("data-chart_state"));
	
	var active = parseInt(d3.select(".item_map_btn").attr("data-active"));

//	console.log("item_map_btn_click : chart_state_timeline = "+chart_state_timeline);
//	console.log("item_map_btn_click : active = "+active);
//	console.log("item_map_btn_click : chart_state_map = "+chart_state_map);
	
	if (active==1){
		
		
		if (chart_state_map==0){
			
			mininize_item_mini_timeline();
			
			expand_item_mini_map();
		};
		
	
		if (chart_state_map==1){
			
			set_attr_active(".item_timeline_btn",0);
			
			draw_item_large_map();
			
		};
		

		if (chart_state_map==2){
			
			set_attr_active(".item_timeline_btn",1);
			remove_item_large_map();
			
		};
	
	}
	
	
	
}



function init_item_map()
{
//	console.log("init_item_map - ");
	
	var logo_scale = 0.5;	
	
	var layer2_svg = d3.select("#layer2_svg");
	
	var dim = layer2_svg.node().getClientRects()[0];
	
	
	
	layer2_svg
	  .append('g')
	  .attr("class","item_map_mini_chart")
	  .attr("data-chart_state",0)
	  .attr("data-addon",0)
	  .attr('transform', "translate("+(  dim.width*(9/12)-hu*2 + logo_scale*symb_h + logo_scale*symb_h )+", "
			  +( dim.height*(9/12) + (dim.height*(3/12)/2) - vu/2/2  )+") scale("+0.01+")")

//	  .attr('transform', "translate("+( dim.width*(9/12)-hu*2 + logo_scale*symb_h  )+", "
//			  +( dim.height*(9/12) + (dim.height*(3/12)/2) - vu/2/2  - vr_gap_tn  )+") scale("+0.01+")")
	  ;
	
//	  .attr('transform', "translate("+( hu+logo_scale*symb_h/2 )+", "
//			  +( dim.height*(9/12) + (dim.height*(3/12)/2) - vu/2/2   )+") scale("+0.01+")")

	$.get('content/svg/map_btn.svg', function(text_data){
		
			
		
		var layer2_svg_g = layer2_svg
								.append("g")
								.attr("class","item_map_btn")
								.attr("data-addon",0)
								.attr("data-expand",0)
								.attr("data-active",0)
								.attr("transform","translate("+( dim.width*(9/12)-hu*2 + logo_scale*symb_h  )+", "
										+( dim.height*(9/12) + (dim.height*(3/12)/2) - logo_scale*symb_h/2    )+" ) scale("+logo_scale+")")															
								.html(						
										text_data						
								 )								
								.on("click", function(){ item_map_btn_click(d3.select(this));} )
								.on("mouseenter", function(){ item_map_btn_mouseenter(d3.select(this));} )
								.on("mouseleave", function(){ item_map_btn_mouseleave(d3.select(this));} )
								.on("mousedown",function(d) { 
									d3.select(this).attr("filter", "url(#pressed_shadow)");									
								})
								.on("mouseup",function(d) { 
									d3.select(this).attr("filter", "url(#focus_shadow)");
								})
								.attr("filter", "url(#normal_shadow)")								
								;
		
		add_waiting_ring(".item_map_btn");
		
		draw_item_mini_map();
		
	}, 'text')	
	;
	
	
	

}






/////////////////////////--------item_timeline--------/////////////////////////





var footfall_timeline_data = [];





function draw_item_large_timeline()
{

//	console.log("draw_item_large_timeline - ");
	
	var dim = d3.select("#layer2_svg").node().getClientRects()[0];

	
	
	var layer3_svg = d3.select("#main_screen_div")
						.append("svg")
						.attr("class", "layer3_svg")
						.attr("x", hu/2)
						.attr("y", vu)
						.style("height", ($( window ).height()-vu) )
						.style("width", ($( window ).width()-hu/2) )
//						.style("backdrop-filter", "blur(2px)" )
						;
	d3.select("#layer2_svg").attr("filter", "url(#blur)");
	
	
	$(".item_timeline_btn").detach().appendTo(".layer3_svg");
	
		
	d3.select(".item_timeline_btn")
		.transition()
	 	.duration(1000)	 	
	 	.attr("transform","translate("+( hu )+", "+(  dim.height*(2/3)/2  )+" ) scale("+0.5+")")	 	
	 	.on("end", function(){
	 		
	 		var map_svg = layer3_svg
	 							.append("svg")
	 							.attr("class", "large_timeline_svg")
	 							.attr("x", dim.x+hu+hz_gap_re)
	 							.attr("y", dim.y-vu+vr_gap_tn)
	 							.attr("width", dim.width*(10/12))
	 							.attr("height", dim.height*(12/12))
	 							.attr("filter", "url(#normal_shadow)")	 							
	 							;
	 		
	 		map_svg.append("rect")
	 				.attr("class", "large_timeline_rect")	
	 				.attr("x", vr_gap_tn)
	 				.attr("y", vr_gap_tn)
	 			    .attr("width", dim.width*(10/12)-hz_gap_lg)
	 				.attr("height", dim.height*(12/12)-vr_gap_lg)
	 				.attr("rx", 10)
	 				.attr("ry", 10)	 				
	 			    ;
	 		
	 		draw_timeline(".large_timeline_svg");
	 		
	 		d3.select(".item_timeline_btn").attr('pointer-events', 'auto');
	 		
	 		
	 	})
	 	.attr("filter", "url(#focus_shadow)")
	 	;

	
	d3.select(".item_timeline_mini_chart").attr("data-chart_state",2);


}





function remove_item_large_timeline()
{
	
	var item_timeline_btn_svg = d3.select(".item_timeline_btn");
	
	var dim = d3.select("#layer2_svg").node().getClientRects()[0];

	d3.select(".large_timeline_svg")
		.transition()
		.duration(1000)
		.attr("opacity",0.0)
		.on("end", function(){
			d3.select(this).remove();
			d3.select("#layer2_svg").attr("filter", "none");
		});
			
	d3.select(".large_timeline_radio").remove();
	
	
	item_timeline_btn_svg
		.transition()
	 	.duration(1000)
	 	.attr("transform","translate("+( hu )+", "
									+( dim.height*(9/12) + (dim.height*(3/12)/2) - 0.5*symb_h/2   )+" ) scale("+0.5+")")	
		.on("end", function(){
			$(".item_timeline_btn").detach().appendTo("#layer2_svg");
			$(".layer3_svg").remove();
			d3.select(".item_timeline_btn").attr('pointer-events', 'auto');
			
			
		});
		;

	d3.select(".item_timeline_mini_chart").attr("data-chart_state",1);
	
	
	
	
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
					
			
		var barchart_w = hu*5;
		var barchart_h = vu/2;
		var color = d3.scaleOrdinal().range(["#0432ff","#009fff","#00fcff"]);
			
			
		var item_timeline_mini_chart = d3.select(".item_timeline_mini_chart");
		
		
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
			        	
			        	set_attr_active(".item_timeline_btn",1);
			        	expand_item_mini_timeline();
			        	
			      })
			      ;
	  
		  
		
	}
	
	
	
}





function mininize_item_mini_timeline()
{
	console.log("mininize_item_mini_timeline - ");

	var dim = d3.select(".item_timeline_btn").node().getClientRects()[0];

	d3.select(".item_timeline_mini_chart")
		.transition()
		.duration(1000)
		.attr("transform","translate("+( dim.x-dim.width/2 )+", "+( dim.y-dim.height/2 )+" ) scale("+0.01+")")
		;
	
	d3.select(".item_timeline_mini_chart").attr("data-chart_state",0);
	
	
}






function expand_item_mini_timeline()
{
//	console.log("expand_item_mini_timeline - ");

//	var dim = d3.select(".item_timeline_btn").node().getClientRects()[0];
	
	
	var layer2_svg = d3.select("#layer2_svg");	
	
	var dim = layer2_svg.node().getClientRects()[0];
	
	

	
//	Promise.all([d3.select(".item_timeline_btn").node().getClientRects()[0] ]).then(_expand);

	

//	function _expand([dim]){

//		console.log("dim :=");
//		console.log(dim);

		d3.select(".item_timeline_mini_chart")
			.transition()
			.duration(1000)
			.attr('transform', "translate("+( hu + hu  )+", "
				  +( dim.height*(9/12) + (dim.height*(3/12)/2) - vu/2/2   )+") scale("+1.0+")")
		
			;

		
//	}
		
		
	d3.select(".item_timeline_mini_chart").attr("data-chart_state",1);
	
	d3.select(".item_timeline_btn").attr('pointer-events', 'auto');

	
		
}






function item_timeline_btn_mouseenter(svg_elem)
{
//	console.log("item_timeline_btn_mouseenter - ");
	
//	console.log(svg_elem);
	
	svg_elem.attr("filter", "url(#focus_shadow)");
	
	
}






function item_timeline_btn_mouseleave(svg_elem)
{
//	console.log("item_timeline_btn_mouseleave - ");
	
	svg_elem.attr("filter", "url(#normal_shadow)");
}






function item_timeline_btn_click(svg_elem)
{
	console.log("item_timeline_btn_click - ");
	
	d3.select(".item_timeline_btn").attr('pointer-events', 'none');
	
	var dim = d3.select(".item_map_btn").node().getBoundingClientRect();
	var chart_state_map = parseInt(d3.select(".item_map_mini_chart").attr("data-chart_state"));
	var chart_state_timeline = parseInt(d3.select(".item_timeline_mini_chart").attr("data-chart_state"));

	var active = parseInt(d3.select(".item_timeline_btn").attr("data-active"));
	
	
	console.log("item_timeline_btn_click : chart_state_map = "+chart_state_map);
	console.log("item_timeline_btn_click : active = "+active);	


	if (active==1){
		
		if (chart_state_timeline==0){
			mininize_item_mini_map();
			
			expand_item_mini_timeline();
		};
		
	
		if (chart_state_timeline==1){
			
			set_attr_active(".item_map_btn",0);
			
			draw_item_large_timeline();
		};
		

		if (chart_state_timeline==2){
			
			set_attr_active(".item_map_btn",1);
			remove_item_large_timeline();
			
		};
	
	
	}
	
	
	
	
}






function init_item_timeline()
{
//	console.log("init_item_timeline - ");
	
	var layer2_svg = d3.select("#layer2_svg");	
	
	var dim = layer2_svg.node().getClientRects()[0];
	
	var logo_scale = 0.5;	
	
	var layer2_svg_g = null;
	
	

	layer2_svg
	  .append('g')
	  .attr("class","item_timeline_mini_chart")
	  .attr("data-chart_state",0)
	  .attr("data-addon",0)		  	
	  .attr('transform', "translate("+( hu+logo_scale*symb_h/2 )+", "
			  +( dim.height*(9/12) + (dim.height*(3/12)/2) - vu/2/2   )+") scale("+0.01+")")
//	  .attr("transform","translate("+( dim.x-dim.width/2 )+", "+( dim.y-dim.height/2 )+" ) scale("+0.01+")")

			  
	  ;

	
	$.get('content/svg/timeline_btn.svg', function(text_data){
		
			
		
		layer2_svg_g = layer2_svg																							
							.append("g")
							.attr("class","item_timeline_btn")
							.attr("data-active",0)							
							.attr("transform","translate("+( hu )+", "
									+( dim.height*(9/12) + (dim.height*(3/12)/2) - logo_scale*symb_h/2   )+" ) scale("+logo_scale+")")															
							.html(						
									text_data						
							 )
							.on("click", function(){ item_timeline_btn_click(d3.select(this));} )
							
							.on("mouseenter", function(){ item_timeline_btn_mouseenter(d3.select(this));} )
							.on("mouseleave", function(){ item_timeline_btn_mouseleave(d3.select(this));} )
							.on("mousedown",function(d) { 
								d3.select(this).attr("filter", "url(#pressed_shadow)");									
							})
							.on("mouseup",function(d) { 
								d3.select(this).attr("filter", "url(#focus_shadow)");
							})
							.attr("filter", "url(#normal_shadow)")
							
							;
																
								
		add_waiting_ring(".item_timeline_btn");
		
//		mininize_item_mini_timeline();
		
		draw_item_mini_timeline();
		
		
		
		
	}, 'text')	
	;
	
	
	
	
	
}







/////////////////////////--------item_footfalls--------/////////////////////////




function init_single_footfalls_frame()
{
	
//	console.log("init_single_footfalls_frame - ");

	
	var layer2_svg = d3.select("#layer2_svg");
	var dim = d3.select("#layer2_svg").node().getClientRects()[0];


	layer2_svg
	    .insert("line",":first-child")
		.attr("class","frame_line")
		.attr("x1", d => dim.width*(9/12) )
	    .attr("y1", d => 0 )
	    .attr("x2", d => dim.width*(9/12) )
	    .attr("y2", d => dim.height )
	    
	    ;
	
	
	layer2_svg
	    .insert("line",":first-child")
		.attr("class","frame_line")
		.attr("x1", d => 0 )
	    .attr("y1", d => dim.height*(9/12) )
	    .attr("x2", d => dim.width*(9/12) )
	    .attr("y2", d => dim.height*(9/12) )
	    
	    ;

	
	
	
}




function draw_single_footfalls(item_id)
{
//	console.log("draw_single_footfalls --------------- ");
	
	focus_layer2();
	
	init_single_footfalls_frame();
	
	init_item_timeline();
	
	init_item_map();
	
	init_footfall_graph(item_id);
	
	footfall_switch_nav_btn.set_item_id(main_item_id);

	export_nav_btn.set_export_funct(export_footfall);
	
	
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
	
	
	var dim = d3.select("#layer2_svg").node().getClientRects()[0];
	var footfall_graph_w = dim.width;
	var footfall_graph_h = dim.height;
	
	
//	console.log(item_map);
	
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
		
		
		
		if (typeof item_map[data_elem.itemId2] === 'undefined')
		{
			d = {
				      cluster : cluster_id,
				      radius : 0,
				      item_id : 1, 
				      rank: -111,
				      x : Math.cos(cluster_id / m * 2 * Math.PI) * 300 + footfall_graph_w / 2 + Math.random(),
				      y : Math.sin(cluster_id / m * 2 * Math.PI) * 300 + footfall_graph_h / 2 + Math.random()
				};			
		}
		else{
			
			d = {
				      cluster : cluster_id,
				      radius : r,
				      item_id : data_elem.itemId2, 
				      rank: item_map[data_elem.itemId2].rankF,
				      x : Math.cos(cluster_id / m * 2 * Math.PI) * 300 + footfall_graph_w / 2 + Math.random(),
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
	    	console.log("footfalls.get_item_timeline : 1.data :=");
	    	console.log(data);
	    	
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
		    url: "api/explorequeue/set",	    
		    contentType: "application/json; charset=utf-8",
		    dataType: "json",
		    data:  JSON.stringify( {"userId": item_id}),
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



