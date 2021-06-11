

var item_data = null;
var item_map = {};


var category_index = 0; // 0 for top category, 1 for sub category



var graph_data = {nodes:{},links:{}};
var node_count_min = 0;
var node_count_max = 0;
var max_link_value = 0;
var max_link_count = 0;


function init_overview_category_foi()
{
	
    $("<div class='layer1 left_col col'> </div>").appendTo(".main_content");
    
    draw_overview_category_graph_tool();
    
    clear_graph();
    
    draw_top_category();
    
    
}


function clear_graph()
{
	
	console.log("clear_graph * ");

	remove_link_info_tool();
	remove_node_info_tool();
	
	item_data = null;
    item_map = {};


    graph_data = {nodes:{},links:{}};
    max_link_value = 0;
    max_link_count = 0;

	d3.select(".overview_category_graph_svg").selectAll("g").remove();
	
	
	
}







function draw_top_category()
{
	clear_graph();
	
	console.log("draw_top_category");
	
	category_index = 0;
	
	Promise.all([get_item_data()]).then(function (){
	    
		compute_item_array_to_map();
	    
	    Promise.all([get_all_sim_data()]).then(function (){
		    
		    Promise.all([compute_graph_data(category_index)]).then(function (){

		    	update_overview_category_graph_tool();
			    
		    }); 		    

	    }); 
	    
	    
	});   
}





function draw_sub_category()
{
	clear_graph();
	
	category_index = 1;
	
	Promise.all([get_item_data()]).then(function (){
	    
		compute_item_array_to_map();
	    
	    Promise.all([get_all_sim_data()]).then(function (){
		    
		    Promise.all([compute_graph_data(category_index)]).then(function (){

		    	update_overview_category_graph_tool();
			    
		    }); 		    

	    }); 
	    
	    
	});   
}





function draw_overview_category_graph_tool()
{
    var tool_class_name = "overview_category_graph";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*11;
	var tool_max_h = su*11;

	
	
	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Flow of Interest </div>"+
			"<div class='tool_box_header_btn up_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<div class='tool_box_content_comment'> Footfall of the entire brand over entire timeline</div>"+
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin' height=600> " +
			
			"</svg>"+
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
	
	

	$(tool_dot_class_name+" .up_btn").click(function(){
		
//		console.log("up_btn");
		
		var dim = $(tool_dot_class_name)[0].getBoundingClientRect();

		window.scrollTo(0, dim.y-su_8);
		
	});
	
	
	draw_category_switch_tool();

	
	height_cascade();
    
}










function draw_category_switch_tool()
{
	
	var tool_w = lu*11;

	
	$("<div class=' switch_tool small_text bold_text'> " +
			"<div class=' switch_left_name '> Top Category </div>" +
			"<div class=' switch_box small_text '> " +
				"<input type='checkbox' id='switch' /><label for='switch'>Toggle</label>  " +	  
			"</div> " +
			"<div class=' switch_right_name '>Sub Category</div>" +
	  "</div>")
	  .css({
			left:(tool_w - lu*3),
			top: (su),
//			visibility: "hidden",
//			width:(tool_w),
//			height:tool_max_h,
			
	  })
	  .appendTo( ".overview_category_graph .tool_box_content")
	  ;

	
	
	$( "input[type=checkbox]" ).on( "click", function(){
		
		var n = $( "input:checked" ).length;
		  
		console.log("input:checked = "+typeof n);
		
		if (n==1){
			remove_link_info_tool();
			remove_node_info_tool();
			clear_graph();
			    
			draw_sub_category();
			
			
		}
		else{
			remove_link_info_tool();
			remove_node_info_tool();
			clear_graph();
			    
			draw_top_category();
			
		};


		
	} );

	
	
	
}






function update_overview_category_graph_tool()
{
	
	var graph_svg = d3.select(".overview_category_graph_svg")
						.style("cursor","grab")
						.on("mousedown", function(){
							console.log("mousedown");
						    d3.event.stopPropagation();

							d3.select(this).style("cursor","grabbing")
						})
						.on("click", function(){
							d3.selectAll('.link_pred').style('stroke-opacity', '0.6').attr("marker-mid","none");

						    d3.selectAll('.node_g').style('opacity', '1');
						    
						    remove_link_info_tool();

						    remove_node_info_tool();

						    
						    toggle = 0;
						});
						
	graph_svg.append("defs").selectAll("marker")
						    .data(["suit", "licensing", "resolved"])
						  .enter().append("svg:marker")
						    .attr("id", "marker_arrow")
						    .attr("viewBox", "0 -5 10 10")
						    .attr("refX", 4)
						    .attr("markerUnits", "userSpaceOnUse")
						    .attr("markerWidth", 7)
						    .attr("markerHeight", 7)
						    .attr("orient", "auto")
						  .append("svg:path")
						    .attr("d", "M0,-5L10,0L0,5")
						    .style("fill",(category_index==0)?"var(--blue_color)":"var(--green_color)");
						;
						
						
	
	var graph_g = graph_svg.append("g");
	

	var width = parseInt(graph_svg.style("width"));
	var height = parseInt(graph_svg.style("height"));
	
	console.log(width);
	console.log(height);
	var toggle = 0;


	console.log(graph_data);


    var nodes = graph_data.nodes;
	var links = graph_data.links;
	
	
	var node = null;
	var node_text = null;
	var link = null;
	
	

	function neighboring(a, b) {
		
		return linkedByIndex[a.category + ',' + b.category];
//		return linkedByIndex[a.itemId + "," + b.itemId] || linkedByIndex[b.itemId + "," + a.itemId] || a.itemId == b.itemId;

	}
	var linkedByIndex = {};	 
	// build a dictionary of nodes that are linked
    links.forEach(function(d) {
    	
    	
        linkedByIndex[d.source + "," + d.target] = 1;
   
    });
   

	
	
	

	var node_radius_funct = function(d)
	{
		
		var max_r = su;
		var min_r = su_8;
		
//		node_count_min =  0;
//		node_count_max = 0;
		
		
//		var _r = ((node_count_max-node_count_min)*(d-node_count_min))/(max_r-min_r) + node_count_min;
		
		var _r = (max_r-min_r)*( (d-node_count_min)/(node_count_max-node_count_min) )+min_r;
		
		

		return _r;
	}
	
	
	
	var link_length_funct = function(d)
	{
//		var max_link_value = 0;
//		var max_link_count = 0;
		
		
		var max_link_length = 500;
		
		var link_length = d.value*( max_link_length / max_link_value );
		
		
//		return d*50;
		return link_length;
	}
	
	
	var forceCharge = d3.forceManyBody().strength(-1000);

	var simulation = d3.forceSimulation()
						.alphaDecay(0.3)
						.force("center", d3.forceCenter( (width/2), (height/2) )) 
						.force('charge', forceCharge)
					    .force('collision', d3.forceCollide().radius(function(d) {
					    		return (node_radius_funct(d.count)+2);
							})
						)
						.force("link", d3.forceLink()
											.id(function(d){
												
//												console.log(d);
												return d.category; 
												
											})
											.distance(function(d) { return ( link_length_funct(d) ); })
//											.strength(0.5)
											) 
						;

	graph_svg.call(
		    d3.zoom()
		        .scaleExtent([.1, 4])
		        .on("zoom", function() { graph_g.attr("transform", d3.event.transform); })
		        .on("end",function(){
		        	graph_svg.style("cursor","grab");
		        })
		);
	
	
	

	
    // add the curved links to our graphic
    link = graph_g.append("g").selectAll(".link")
 	        .data(links)
 	        .enter()
 	        .append("path")
 	        .attr("class", "link_pred")
 	        .attr("opacity", 1.0)
 	        .style("stroke-width", function(d){
// 	        	return d.value/d.count;
 	        	return d.count*( 5 / max_link_count );
 	        })
 	        .style("stroke", function(d){
 	        	return (category_index==0)?"var(--blue_color)":"var(--green_color)";
 	        })
 	        .on('click', function(d) {
 	        	
 	        	d3.event.stopPropagation();
 	        	
 	        	draw_link_info_tool(d);
 	        	
 	        })
 	        
	 	    ;
	
    
    
	node = graph_g.append("g")
					 .selectAll(".node_g")
				     .data(nodes)
				     .enter()
				     .append("g")
				     .attr("class", "node_g")
				     .call(
					    d3.drag()
					        .on("start", dragstarted)
					        .on("drag", dragged)
					        .on("end", dragended)
					 )
					 .on('click', function(d) {
					      if (toggle == 0) {
							  d3.event.stopPropagation();

							  
							  draw_node_info_tool(d);
							  
							  
						      // Ternary operator restyles links and nodes if they are adjacent.
						      d3.selectAll('.link_pred')
						      		.style('stroke-opacity', function (l) {
						      			return l.target == d || l.source == d ? 0.75 : 0.1;
						      			
						      		})
						      		.attr("marker-mid", function(l) { 
						      			
						      			return l.target == d || l.source == d ? "url(#marker_arrow)" : "none";
						      		});
						      
						      d3.selectAll('.node_g').style('opacity', function (n) {
							      return neighboring(d, n) ? 1 : 0.1;
						      });
						      d3.select(this).style('opacity', 1);
						      toggle = 1;
					      }
					      else {
						      // Restore nodes and links to normal opacity.
						      d3.selectAll('.link_pred').style('stroke-opacity', '0.6').attr("marker-mid","none");
						      d3.selectAll('.node_g').style('opacity', '1');
						      toggle = 0;
					      }
				      });
	

	
	// a circle to represent the node
    node.append("circle")
	        .attr("class", "circle_node_pred") 	        
	        .attr("r", function(d) {
		    	return (node_radius_funct(d.count));
			}) 	 
			.style("fill", function(d) {				
		    	return (category_index==0)?"var(--blue_color)":"var(--green_color)" ;
			}) 		
	        ;
    
    
    
    
    node.append("text")
    		.attr("class", "text_node_pred")
    		.text(function(d) {
    			
    			return (d.category);
        	   
    		})  
    		.attr('dy', (4) )
		    ;
	
	
    var node_position = function (d) {
       
        return "translate(" + d.x + "," + d.y + ")";
    }

    function link_position(d) {
    	
    	 var x1 = d.source.x,
         y1 = d.source.y,
         x2 = d.target.x,
         y2 = d.target.y,
         dx = x2 - x1,
         dy = y2 - y1,
         dr = Math.sqrt(dx * dx + dy * dy),

         // Defaults for normal edge.
         drx = dr,
         dry = dr,
         xRotation = 0, // degrees
         largeArc = 0, // 1 or 0
         sweep = 1; // 1 or 0

         // Self edge.
         if ( x1 === x2 && y1 === y2 ) {
	           // Fiddle with this angle to get loop oriented.
	           xRotation = -45;
	
	           // Needs to be 1.
	           largeArc = 1;
	
	           // Change sweep to change orientation of loop. 
	           sweep = 0;
	
	           // Make drx and dry different to get an ellipse
	           // instead of a circle.
	           drx = 40;
	           dry = 20;
	           
	           // For whatever reason the arc collapses to a point if the beginning
	           // and ending points of the arc are the same, so kludge it.
	           x2 = x2 + 1;
	           y2 = y2 + 1;
         } 
         return "M" + x1 + "," + y1 + "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " + x2 + "," + y2;

  
    	
    	
    }

	function ticked() {
	
//		link
//	      .attr("x1", function(d) { return d.source.x; })
//	      .attr("y1", function(d) { return d.source.y; })
//	      .attr("x2", function(d) { return d.target.x; })
//	      .attr("y2", function(d) { return d.target.y; });
		
//	    link.attr("d", positionLink);
		
		
		link.attr("d", link_position);



		
        node.attr("transform", node_position);

		
	}
	

	function dragstarted(d) {
	    d3.event.sourceEvent.stopPropagation();
	    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	    d.fx = d.x;
	    d.fy = d.y;

	}

	function dragged(d) {
	    d.fx = d3.event.x;
	    d.fy = d3.event.y;
	}

	function dragended(d) {
	    if (!d3.event.active) simulation.alphaTarget(0);
	    d.fx = null;
	    d.fy = null;
	}

	
	
	
	
	simulation
	    .nodes(nodes)
	    .on("tick", ticked)
	    ;
	
	simulation.force("link")
    	.links(links);



	
}





function compute_item_array_to_map()
{
	var deferred = new $.Deferred();
    var item_data_l = item_data.length;

    for (var i=0; i<item_data_l; i++){
    	
    	
    	item_map[item_data[i].itemId] = item_data[i];


    	if (i+1==item_data_l){
    		item_data = null;
    		deferred.resolve();
    	};
    }
    
    return deferred.promise();
	
}




function compute_graph_data(category_index)
{
	var deferred = new $.Deferred();
    var sim_data_l = sim_data.length;
    
    
    
    var _add_link = function(source,target,value){
    	
    	var link_key = source+"+"+target;
    	
    	if (graph_data.links.hasOwnProperty(link_key)){

//    		console.log("link found ");
    		graph_data.links[link_key].count = graph_data.links[link_key].count + 1; 
    		graph_data.links[link_key].value = graph_data.links[link_key].value + value; 
        	
    	}
    	else{
    		
//    		console.log(" link not found ");
    		graph_data.links[link_key] = {
            		
            		"source":source,
        			"target":target,
        			"value":value,
        			"count":1
            	};
    		
    		
    	};
    	
    	
    	
    	
    	
    	
    	
    	

    	
    };
    
    
    
    

    for (var i=0; i<sim_data_l; i++){
    	    	
    	var data_elem = sim_data[i];
    	
    	
    	var top_category = get_category(item_map[data_elem.itemId].catArray.toLowerCase(),category_index);
    	
    	console.log(top_category);
    	
    	if (graph_data.nodes.hasOwnProperty(top_category)){

    		graph_data.nodes[top_category].count = graph_data.nodes[top_category].count + 1; 
        	
    	}
    	else{
    		
    		graph_data.nodes[top_category] = { 
    				
    				"category": top_category,
    				"count" : 1,
    				
    		};
    	};
    		
    	var simItems_str = data_elem.simItems.toString().replace(/i/g, "\"i\"").replace(/s/g, "\"s\"");

    	var simItems = JSON.parse(simItems_str);    	    	

    	$.each(simItems,function(i,d){
    		
        	
        	var pred_top_category = get_category(item_map[d.i].catArray.toLowerCase(),category_index);


        	if (graph_data.nodes.hasOwnProperty(pred_top_category)){

        		graph_data.nodes[pred_top_category].count = graph_data.nodes[pred_top_category].count + 1; 
            	
        	}
        	else{
        		
        		graph_data.nodes[pred_top_category] = { 
        				
        				"category": pred_top_category,
        				"count" : 1,
        				
        		};
        	};
    	

        	
        	_add_link(top_category,pred_top_category,d.s);
        	
        
    		
    		
    	});
    	


    	if (i+1==sim_data_l){

    		
    		graph_data.nodes = Object.values(graph_data.nodes);
    		graph_data.links = Object.values(graph_data.links);
    		
    		sim_data = null;
    		
    		Promise.all([compute_graph_data_max()]).then(function (){

    			deferred.resolve(graph_data);
			    
		    }); 
    		
    		
    		
    		
    		
    	};
    }
    
    
    
    
    
    
    return deferred.promise();
	

}




function compute_graph_data_max()
{

	var deferred = new $.Deferred();
	
	
	
	var node_count_extent = d3.extent(graph_data.nodes, d => {
		return (d.count);			
	});
	
	node_count_min = node_count_extent[0];
	node_count_max = node_count_extent[1];
	

	var _length = graph_data.links.length;

	for (var i=0; i<_length; i++){
    	    	
    	var data_link_elem = graph_data.links[i];
    	    	
    	if (max_link_value<data_link_elem.value){
    		max_link_value = data_link_elem.value;
    	};
    	
    	
    	if (max_link_count<data_link_elem.count){
    		max_link_count = data_link_elem.count;
    	};
    	
    	
    	
    	
    	if (i+1==_length){
    		
    		deferred.resolve(graph_data);
    		
    		console.log(max_link_value,max_link_count);

    	}
    	
    }
    
    return deferred.promise();

	
}





function remove_link_info_tool()
{
	$(".link_info").remove();
}





function draw_link_info_tool(link_info_data)
{
	
	console.log("link_info");
	console.log(link_info_data);
	

	
	
	var _draw = function(){
		
		
		var tool_class_name = "link_info";
		var tool_dot_class_name = " ."+tool_class_name;

		
		
		var tool_w = lu*3;
		var tool_max_h = su*5;

		var dim = $(".overview_category_graph")[0].getBoundingClientRect();

		
		
		
		$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
				"<div class='tool_box_header'>" +
				"<div class='tool_box_header_name'> Link </div>"+
				"<div class='tool_box_header_btn link_symb'></div>"+
				"</div>" +	
				"<div class='tool_box_content'>" +
					"<div class=' general_info_content '></div>"+
									
				"</div>"+
		"</div>")
			.css({
				left:(dim.width-tool_w-su_3),
				top: (su+su_2),
				width:(tool_w),
//				height:tool_max_h,
				"min-height" : (tool_max_h),
				
			})
			.data("view_status",1)
			.click(function(){
			
			})		
			.appendTo(".overview_category_graph .tool_box_content");
		
		
		

		 var tool_box_ul = $("<div class='tool_box_ul_header small_text bold_text '> About </div>"+
				 			"<ul> " +
					    	
							"</ul>" )
							.addClass("tool_box_ul link_info_ul")
							.css({
					
								"max-height" : (su*2),
				
							})
							.appendTo(tool_dot_class_name + " .tool_box_content .general_info_content");
		
		 var li = $("<li class='tool_box_ul_li small_text'> " +				
					"<div class='tool_box_ul_li_name bold_text'><span> From </span></div>"+				
					"<div class='tool_box_ul_li_value'><div>"+ (link_info_data.source.category) +"</div></div>"+		
				   "</li>")
				   .appendTo($(".link_info_ul"));	
		
		 var li = $("<li class='tool_box_ul_li small_text'> " +				
					"<div class='tool_box_ul_li_name bold_text'><span> To </span></div>"+				
					"<div class='tool_box_ul_li_value'><div>"+ (link_info_data.target.category) +"</div></div>"+		
				   "</li>")
				   .appendTo($(".link_info_ul"));	
		 
		 var li = $("<li class='tool_box_ul_li small_text'> " +				
					"<div class='tool_box_ul_li_name bold_text'><span> Strength </span></div>"+				
					"<div class='tool_box_ul_li_value'><div>"+ (link_info_data.value.toFixed(2)) +"</div></div>"+		
				   "</li>")
				   .appendTo($(".link_info_ul"));	
		 
		 
		 
		 
		
	};
	
	
	
	if ($(".link_info").length==0){
		remove_node_info_tool();

		_draw();
	}
	else{
		remove_link_info_tool();
		remove_node_info_tool();
		_draw();
	};
		
	

}





function remove_node_info_tool()
{
	$(".node_info").remove();
}



function draw_node_info_tool(node_info_data)
{
	
	console.log("node_info_data");
	console.log(node_info_data);
	
	var outgoing_node_list = [];
	var incoming_node_list = [];

	
	
	var _compute_neighboring_node_list = function(){
		

		var _length = graph_data.links.length;
		
		
		for (var i=0; i<_length; i++){
			
			var data_elem = graph_data.links[i];
			
			if (data_elem.source==node_info_data){
				outgoing_node_list.push({
						"category" : data_elem.target,
						"prediction_value": data_elem.value,
						"prediction_count": data_elem.count,
						
					});
			};
			if (data_elem.target==node_info_data){
				incoming_node_list.push({
					"category" : data_elem.source,
					"prediction_value": data_elem.value,
					"prediction_count": data_elem.count,
					
				});
			};
			
			if (i+1==_length){
				
				outgoing_node_list.sort((a,b)=> b.prediction_value - a.prediction_value);
				incoming_node_list.sort((a,b)=> b.prediction_value - a.prediction_value);
				
				console.log(outgoing_node_list);
				console.log(incoming_node_list);
				
				$.each(outgoing_node_list, function(i,d){
					
					console.log(d);
					
					var li = $("<li class='tool_box_ul_li small_text'> " +																
									"<div class='tool_box_ul_li_value'><div>"+ (d.category.category) +"</div></div>"+		
							    "</li>")
							   .appendTo($(".outgoing_node_list_content .node_list_ul"));
					 
					 
					
				});
				
				
				$.each(incoming_node_list, function(i,d){
					
					console.log(d);
					
					var li = $("<li class='tool_box_ul_li small_text'> " +																
									"<div class='tool_box_ul_li_value'><div>"+ (d.category.category) +"</div></div>"+		
							    "</li>")
							   .appendTo($(".incoming_node_list_content .node_list_ul"));
					 
					 
					
				});
				
				
				
				
			};
			
			
		};
		 
		
	};
	
	
	
	
	var _draw = function(){
		
		
		var tool_class_name = "node_info";
		var tool_dot_class_name = " ."+tool_class_name;

		
		
		var tool_w = lu*3;
		var tool_max_h = su*5;

		var dim = $(".overview_category_graph")[0].getBoundingClientRect();

		
		
		
		$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
				"<div class='tool_box_header'>" +
				"<div class='tool_box_header_name'> Node </div>"+
				"<div class='tool_box_header_btn node_symb'></div>"+
				"</div>" +	
				"<div class='tool_box_content'>" +
					"<div class=' general_info_content '></div>"+
					"<div class=' outgoing_node_list_content '></div>" +
					"<div class=' incoming_node_list_content '></div>" +
					
					
				"</div>"+
		"</div>")
			.css({
				left:(dim.width-tool_w-su_3),
				top: (su+su_2),
				width:(tool_w),
//				height:tool_max_h,
				"min-height" : (tool_max_h),
				
			})
			.data("view_status",1)
			.click(function(){
			
			})		
			.appendTo(".overview_category_graph .tool_box_content");
		
		
		 var tool_box_ul = $("<div class='tool_box_ul_header small_text bold_text '> About </div>"+
				 			"<ul> " +
					    	
							"</ul>" )
							.addClass("tool_box_ul node_info_ul")
							.css({
					
								"max-height" : (su*2),
				
							})
							.appendTo(tool_dot_class_name + " .tool_box_content .general_info_content");
		
		
		 var li = $("<li class='tool_box_ul_li small_text'> " +				
					"<div class='tool_box_ul_li_name bold_text'><span>Category </span></div>"+				
					"<div class='tool_box_ul_li_value'><div>"+ (node_info_data.category) +"</div></div>"+		
				   "</li>")
				   .appendTo($(".node_info_ul"));
		 
		 var li = $("<li class='tool_box_ul_li small_text'> " +				
					"<div class='tool_box_ul_li_name bold_text'><span>Rank </span></div>"+				
					"<div class='tool_box_ul_li_value'><div>"+ (node_info_data.count) +"</div></div>"+		
				   "</li>")
				   .appendTo($(".node_info_ul"));
		 
		 
		 
		 
		 
			
		 var tool_box_ul = $("<div class='tool_box_ul_header small_text bold_text '> Outgoing Categories <div class=' right_link_symb  '></div> </div>"+								
				 			"<ul class='tool_box_ul node_list_ul '> </ul>" )
							.css({
					
								"max-height" : (su*2),
				
							})
							.appendTo(tool_dot_class_name + " .tool_box_content .outgoing_node_list_content");
			
		 var tool_box_ul = $("<div class='tool_box_ul_header small_text bold_text '> Incoming Categories <div class=' left_link_symb '></div>  </div>"+								
				 			"<ul class='tool_box_ul node_list_ul '> </ul>" )
							.css({
					
								"max-height" : (su*2),
				
							})
							.appendTo(tool_dot_class_name + " .tool_box_content .incoming_node_list_content");
		
		 
		 
		 
		 
		 
		_compute_neighboring_node_list(); 
		 
		 
	
				   

		
		
	};
	
	
	
	if ($(".node_info").length==0){
		remove_link_info_tool();

		_draw();
	}
	else{
		remove_link_info_tool();
		remove_node_info_tool();
		_draw();
	};
		
	

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




function update_overview_category_graph_tool1()
{
	
	var graph_svg = d3.select(".overview_category_graph_svg")
						.style("cursor","grab")
						.on("mousedown", function(){
							console.log("mousedown");
						    d3.event.stopPropagation();

							d3.select(this).style("cursor","grabbing")
						})
						.on("click", function(){
							 d3.selectAll('.link_pred').style('stroke-opacity', '0.6');
						     d3.selectAll('.node_g').style('opacity', '1');
						      toggle = 0;
						})
						;
	
	var graph_g = graph_svg.append("g");
	

	var width = parseInt(graph_svg.style("width"));
	var height = parseInt(graph_svg.style("height"));
	
	console.log(width);
	console.log(height);
	var toggle = 0;



    var nodes = graph_data.nodes;
	var links = graph_data.links;
	
	
	var node = null;
	var node_text = null;
	var link = null;
	
	

	function neighboring(a, b) {
		
		return linkedByIndex[a.category + ',' + b.category];
//		return linkedByIndex[a.itemId + "," + b.itemId] || linkedByIndex[b.itemId + "," + a.itemId] || a.itemId == b.itemId;

	}
	var linkedByIndex = {};	 
	// build a dictionary of nodes that are linked
    links.forEach(function(d) {
    	
    	
        linkedByIndex[d.source + "," + d.target] = 1;
   
    });
   

	
	console.log(graph_data);
	
	
	var link_length_funct = function(d)
	{
		return d*50;
	}
	
	
	var forceCharge = d3.forceManyBody().strength(-100);

	var simulation = d3.forceSimulation()
						.alphaDecay(0.3)
						.force("center", d3.forceCenter( (width/2), (height/2) )) 
						.force('charge', forceCharge)
					    .force('collision', d3.forceCollide().radius(function(d) {
					    	return (d.footfallCount+2);
							})
						)
						.force("link", d3.forceLink()
											.id(function(d){
												
//												console.log(d);
												return d.category; 
												
											})
											.distance(function(d) { return ( link_length_funct(d.value) ); })
											) 
						;

	graph_svg.call(
		    d3.zoom()
		        .scaleExtent([.1, 4])
		        .on("zoom", function() { graph_g.attr("transform", d3.event.transform); })
		        .on("end",function(){
		        	graph_svg.style("cursor","grab");
		        })
		);
	

    // add the curved links to our graphic
    link = graph_g.append("g").selectAll(".link")
 	        .data(links)
 	        .enter()
 	        .append("line")
 	        .attr("class", "link_pred")
 	        .attr("opacity", 1.0)
 	        .style("stroke-width", function(d){
 	        	
 	        	return 1;
 	        })
 	        .style("stroke-linecap", "round")			 	        
	 	    ;
	
    
    
	node = graph_g.append("g")
					 .selectAll(".node_g")
				     .data(nodes)
				     .enter()
				     .append("g")
				     .attr("class", "node_g")
				     .call(
					    d3.drag()
					        .on("start", dragstarted)
					        .on("drag", dragged)
					        .on("end", dragended)
					 )
					 .on('click', function(d, i) {
					      if (toggle == 0) {
							    d3.event.stopPropagation();

						      // Ternary operator restyles links and nodes if they are adjacent.
						      d3.selectAll('.link_pred').style('stroke-opacity', function (l) {
							      return l.target == d || l.source == d ? 1 : 0.1;
						      });
						      d3.selectAll('.node_g').style('opacity', function (n) {
							      return neighboring(d, n) ? 1 : 0.1;
						      });
						      d3.select(this).style('opacity', 1);
						      toggle = 1;
					      }
					      else {
						      // Restore nodes and links to normal opacity.
						      d3.selectAll('.link_pred').style('stroke-opacity', '0.6');
						      d3.selectAll('.node_g').style('opacity', '1');
						      toggle = 0;
					      }
				      });
	

	
	// a circle to represent the node
    node.append("circle")
	        .attr("class", "circle_node_pred") 	        
	        .attr("r", function(d) {
//	        	console.log(d);
		    	return (d.count);
			}) 	 
			.style("fill", function(d) {				
		    	return "#009fff" ;
			}) 		
	        ;
	
	
	
    var node_position = function (d) {
       
        return "translate(" + d.x + "," + d.y + ")";
    }


	function ticked() {
	
		link
	      .attr("x1", function(d) { return d.source.x; })
	      .attr("y1", function(d) { return d.source.y; })
	      .attr("x2", function(d) { return d.target.x; })
	      .attr("y2", function(d) { return d.target.y; });
		
		
		
        node.attr("transform", node_position);

		
	}
	

	function dragstarted(d) {
	    d3.event.sourceEvent.stopPropagation();
	    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	    d.fx = d.x;
	    d.fy = d.y;

	}

	function dragged(d) {
	    d.fx = d3.event.x;
	    d.fy = d3.event.y;
	}

	function dragended(d) {
	    if (!d3.event.active) simulation.alphaTarget(0);
	    d.fx = null;
	    d.fy = null;
	}

	
	
	
	
	simulation
	    .nodes(nodes)
	    .on("tick", ticked)
	    ;
	
	simulation.force("link")
    	.links(links);



	
}





function compute_graph_data1()
{
	var deferred = new $.Deferred();
    var sim_data_l = sim_data.length;

    for (var i=0; i<sim_data_l; i++){
    	    	
    	var data_elem = sim_data[i];
    	
    	
    	var top_category = get_category(item_map[data_elem.itemId]).catArray;
    	
    	
    	graph_data.nodes[data_elem.itemId]=(item_map[data_elem.itemId]);
    	
    	
    	var simItems_str = data_elem.simItems.toString().replace(/i/g, "\"i\"").replace(/s/g, "\"s\"");
    	
    	var simItems = JSON.parse(simItems_str);    	    	
    	
    	$.each(simItems,function(i,d){
    		
//        	graph_data.nodes[data_elem.itemId]=(item_map[d.i]);
        	
        	graph_data.nodes[d.i]=(item_map[d.i]);
        	
//        	console.log(item_map[d.i]);
        	
        	if (item_map[d.i]==null){
        		console.log(d.i);
        	};
        	
        	
        	
        	graph_data.links.push({
        		
        		"source":data_elem.itemId,
				"target":d.i.toString(),
				"value":d.s
        	});

    		
    		
    	});
    	


    	if (i+1==sim_data_l){
    		
    		graph_data.nodes = Object.values(graph_data.nodes);
    		sim_data = null;
    		console.log(graph_data);
    		deferred.resolve(graph_data);
    		
    	};
    }
    
    return deferred.promise();
	

}



