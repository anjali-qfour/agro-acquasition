
	
	
var node_size_max = 1;
var link_size_max = 1;
	
var item_prediction_data = null;

var prediction_graph_data = null;


var item_info_map = {};


var core_item_list_length = 0;





function init_predictions()
{
	


	$("<div class='layer1 left_col col'> </div>").appendTo(".main_content");
	
	
	
	$("<div class='layer1 right_col col'> </div>").appendTo(".main_content");

	

	draw_pred_graph_tool();
	
	

	Promise.all([get_single_item_data(current_item_id)]).then(function (){    	
    	
    	current_item_data = single_item_data;
    	update_item_info();
    	
    });  
	
	
	
	Promise.all([get_item_prediction_data(current_item_id)]).then(function (data){
		
		Promise.all([reshape_pred_graph_data(data)]).then(function(){
			update_pred_graph_tool();
		});
		
	});
	
	
	
	
	
	
	
	
	draw_item_info_tool();
	
	export_prediction();
	
	height_cascade();

	
}






function draw_pred_graph_tool()
{
	
	var tool_class_name = "pred_graph";
	var tool_dot_class_name = " ."+tool_class_name;

		
	var tool_w = lu*8;
	var tool_max_h = su*16;
	
		

	$("<div id='pred_graph_id' class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Prediction Graph </div>"+
			"<div class='tool_box_header_btn up_btn flat_btn'></div>"+
			"<div class='tool_box_header_btn fullscreen_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<div class='tool_box_content_comment'> Based on last 5 user selections </div>" +
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin'> </svg>"+
			"<svg class='main_svg "+tool_class_name+"_text_svg' preserveAspectRatio='xMinYMin'> </svg>"+
			"</div>"+
	"</div>")
		.css({
//			left:(0),
//			top: (su+su_3),
			width:(tool_w),
			height:tool_max_h,
			"min-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col");
	

	

	$(tool_dot_class_name+" .fullscreen_btn ").click(function(){
		
		var elem = document.getElementById("pred_graph_id");

		if ($(tool_dot_class_name).data().view_status==1){

			
			if (elem.requestFullscreen) {				
				$(tool_dot_class_name).data().view_status = 2;
			    elem.requestFullscreen();
			  } else if (elem.mozRequestFullScreen) { /* Firefox */
				  $(tool_dot_class_name).data().view_status = 2;
			    elem.mozRequestFullScreen();
			  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
				  $(tool_dot_class_name).data().view_status = 2;
			    elem.webkitRequestFullscreen();
			  } else if (elem.msRequestFullscreen) { /* IE/Edge */
				  $(tool_dot_class_name).data().view_status = 2;
			    elem.msRequestFullscreen();
			  }
			  

			  $(this).removeClass( "fullscreen_btn" );
			  $(this).addClass( "normalscreen_btn" );

			  update_pred_graph_tool();
			  
			  $(".switch_tool").css({
					left:(window.innerWidth-su-su-su_2),
					top: (su+su_8-4),
					
			  });
			  
			  

			
		}
		else if ($(tool_dot_class_name).data().view_status==2){
			
			$(tool_dot_class_name).data().view_status = 1;

			document.exitFullscreen();		
			
			$(this).removeClass( "normalscreen_btn" );
			$(this).addClass( "fullscreen_btn" );
			
			update_pred_graph_tool();
			
			  
			$(".switch_tool").css({
					left:(tool_w-su-su-su_2),
					top: (su+su_8-4),					
			});

			
			
		};
			
		
		
		
	});


	$(tool_dot_class_name+" .up_btn ").click(function(){
		
		
		var dim = $(tool_dot_class_name)[0].getBoundingClientRect();
		

		window.scrollTo(0, dim.y+window.scrollY-gap_su_1);
		
	});

	

	
	draw_prediction_switch_tool();
	
	
}






function draw_prediction_switch_tool()
{
	
	var tool_w = lu*8;
	
	$("<div class=' switch_tool small_text bold_text'> " +
			"<div class=' switch_left_name '> All </div>" +
			"<div class=' switch_box small_text '> " +
				"<input type='checkbox' id='switch' /><label for='switch'>Toggle</label>  " +	  
			"</div> " +
			"<div class=' switch_right_name '> Core </div>" +
	  "</div>")
	  .css({
			left:(tool_w-su-su-su_2),
			top: (su+su_8-4),
//			visibility: "hidden",
//			width:(tool_w),
//			height:tool_max_h,
			
	  })
	  .appendTo( ".pred_graph .tool_box_content")
	  ;

	
	
	$( ".switch_tool input[type=checkbox]" ).on( "click", function(){
		
		var n = $( "input:checked" ).length;
		
		
		if (n==1){

			console.log("key");
			console.log(item_prediction_data);
			
			core_item_list_length = Math.floor(item_prediction_data.length*0.75);
//			console.log(_length);

			update_pred_graph_tool();

			
		}
		else{
			
			console.log("all");
			
			core_item_list_length = 0;
			update_pred_graph_tool();
			
		};


		
	} );

	
	
	
}








function reshape_pred_graph_data ([data])
{
//	console.log(data);
	
	var deferred = new $.Deferred();

	var data_reshape = {"nodes":[],"links":[]};
		
	var item_prediction_data_l = item_prediction_data.length;
		
	var promise_all = [];

	for (var  i=0; i<item_prediction_data_l; i++){
		
		promise_all.push(get_single_item_data(item_prediction_data[i].i));
		
		if (item_prediction_data_l==i+1){
			
			Promise.all(promise_all).then(function(item_info_array) {
				
//				  console.log("promise_all completed:");
				  
//				  console.log(item_info_array);
				  
				  var item_info_array_l = item_info_array.length;
				  
				  for (var j=0; j<item_info_array_l; j++){					  
					  
					  var data_elem = item_info_array[j];		
					  
//					  console.log(data_elem);					  
					  
					  
					  item_info_map[data_elem.itemId] = data_elem;					  
					  
//					  var result = item_prediction_data.find(obj => {
//						  						  
//						  return ( obj.i == data_elem.itemId ) ? obj.s : {} ;
//						  
//					  });
					  
					  var result = item_prediction_data.find( d => d.i === data_elem.itemId );
					  
					  
					  var node_json = {
							"itemId":data_elem.itemId,
							"nameStr":data_elem.nameStr,
							"totalCount": data_elem.footfallCount,
							"rank": data_elem.footfallRank
					  };
					  
					  data_reshape.nodes.push(node_json);					  
					  
					  var link_json = {
								"source":current_item_data.itemId,
//								"source":current_item_id,
								"target":data_elem.itemId,
								"value":result.s
					  };
						
					  data_reshape.links.push(link_json);
						
						
					  if (item_info_array_l==j+1){
						  
						  var node_json = {
									"itemId":current_item_data.itemId,
									"nameStr":current_item_data.nameStr,
									"totalCount": current_item_data.footfallCount,
									"rank": current_item_data.footfallRank
									
						  };
						  
						  data_reshape.nodes.push(node_json);		
						  						  
						  
						  node_size_max = d3.max(data_reshape.nodes, function(d){return d.totalCount;});
						  link_size_max = d3.max(data_reshape.links, function(d){return d.value;});
						  
//						  var fg = data_reshape;
//						  
//						  console.log("fg = ");
//						  console.log(fg);
							
						  prediction_graph_data = data_reshape;
						  
						  deferred.resolve(prediction_graph_data);
						  
					  }


					  
				  }
				  
				
			});
			
		}

		
	}

	return deferred.promise();

}






function update_pred_graph_tool()
{
//	console.log(data);
	
	d3.select(".pred_graph_svg").selectAll("*").remove();
	d3.select(".pred_graph_text_svg").selectAll("*").remove();
	
	
	var width = parseInt(d3.select(".pred_graph_svg").style("width"));
	var height = parseInt(d3.select(".pred_graph_svg").style("height"));  
	
	console.log($(".pred_graph").data().view_status);

	if ($(".pred_graph").data().view_status == 1){
		
		  width = lu*8-su_mi;
		  height = parseInt(d3.select(".pred_graph_svg").style("height"));  
		
		
	}
	else{
		width = window.innerWidth;
		height = window.innerHeight;
		
	};
	
	console.log(width);
	console.log(height);

	
	var pred_graph_svg = d3.select(".pred_graph_svg")
								.append("g")	
								.attr("class","pred_graph_svg_g")
								.style("filter", "url(#gooey)")		
								;
	

	
	  
	

	
	var pred_graph_text_svg = d3.select(".pred_graph_text_svg")									
									.style("position", "absolute")
									.style("left", gap_su_2 )
									.style("top", su )
									.attr("x",0)
									.attr("y",su)
									.style("width",width)
									.style("height",(height-su))
									;
	
	
	
	var max_r = su/2;
	

    var nodes = null;
	var links = null;

	
	var node = null;
	var node_text = null;
	var link = null;
	
	
	var linkedByIndex = {};	 
	
	
	var force_ended = 0;


	
	var node_size_funct = function(d){

//		node_size_funct(d.totalCount)
				
		var max_size = lu_2;
		
		
		var node_size_scale =  (parseInt(d)/node_size_max);

		
		return  ( node_size_scale*max_size );
	};

	

	
	
	var link_size_funct = function(d){
				
		var max_length = su*5;
		if (core_item_list_length<=0){
			max_length = su*6;
		}
		else{
			max_length = su*8;			
		};
		
//		console.log(d);
//		console.log(link_size_max);
//		console.log((1 - parseInt(d)/link_size_max ) );
//		console.log((1 - parseInt(d)/link_size_max )*max_length  );
		
		return ( ( 1 - parseInt(d)/link_size_max )*max_length );
//		return 50;
	};
	


	var forceCharge = d3.forceManyBody().strength(1000).distanceMax(400).distanceMin(50);

	
	
	var simulation = d3.forceSimulation()
						.alphaDecay(0.2)
						.force("center", d3.forceCenter( (width/2), (height/2-lu) )) 
						.force('charge', forceCharge)
					    .force('collision', d3.forceCollide().radius(function(d) {
//					    	return (vu);
					    	return ( node_size_funct(d.totalCount)*2 );
						})
						)
						.force("link", d3.forceLink()
										 	.id(function(d) { return d.itemId; })
										 	.distance(function(d) {
//										 			console.log(d);
										 			return ( link_size_funct(d.value) ); 
										 		})
										 	) 
						;
			
	
		

    
    var update = function ()
    {
    	  // add the nodes to the simulation and
	    // tell it what to do on each tick
    	
    	
	    simulation
	        .nodes(nodes)
	        .on("tick", ticked)
	        .on("end", function (){
//	        	force_ended = 1;
			});

	    // add the links to the simulation
	    simulation
	        .force("link")
	        .links(links);

    }
    
  

	
	var ticked = function () {
//	        link.attr("d", positionLink);
		
    	

		
			if (force_ended==1){
//				pulse_div_remove("#layer1_svg"); 
			};
				
		
//			force_ended = 0;
	        
	        link
		        .attr("x1", function(d) { return d.source.x; })
		        .attr("y1", function(d) { return d.source.y; })
		        .attr("x2", function(d) { return d.target.x; })
		        .attr("y2", function(d) { return d.target.y; });
	        
	        node.attr("transform", positionNode);
	        
	        node_text.attr("transform", text_position_node);
	        
	}
    

	
	
	var isConnected = function (a, b) {

		return linkedByIndex[a.itemId + "," + b.itemId] || linkedByIndex[b.itemId + "," + a.itemId] || a.itemId == b.itemId;
	}
	    

	
	// move the node based on forces calculations
    var positionNode = function (d) {
        // keep the node within the boundaries of the svg
    	
//    	console.log(node_size_funct(d.totalCount));
//    	    	
//    	console.log(d);
//    	
//    	console.log(central_itemId);
    	
    	if (d.itemId===current_item_id){
    		
    		
    		if (d.x < (width/2 - lu_2)  ) {
                d.x = (width/2 - lu_2);
            };
            
            if (d.x > (width/2 + lu_2) ) {
                d.x = (width/2 + lu_2);
            };
            
            if (d.y < (height/2 - lu_2)  ) {
                d.y = (height/2 - lu_2);
            };
            
            if (d.y > (height/2 + lu_2) ) {
                d.y = (height/2 + lu_2);
            };
            
    		
    	
    		
    	}
    	else{
            if (d.x < (node_size_funct(d.totalCount))) {
                d.x = (node_size_funct(d.totalCount));
            };
            if (d.y < (node_size_funct(d.totalCount))) {
                d.y = (node_size_funct(d.totalCount));
            };
            if (d.x > (width/3*2+100-node_size_funct(d.totalCount))) {
                d.x = (width/3*2+100-node_size_funct(d.totalCount));
            };
            if (d.y > (height-node_size_funct(d.totalCount)*2)  ) {
                d.y = (height-node_size_funct(d.totalCount)*2);
            };
    		
    		
    	};
    	
    	
    	

        return "translate(" + d.x + "," + d.y + ")";
    }

	
	// move the node based on forces calculations
    var text_position_node = function (d) {
        // keep the node within the boundaries of the svg
    	
//    	console.log(node_size_funct(d.totalCount));
//    	    	
//    	console.log(d);
//    	
//    	console.log(central_itemId);
    	
    	if (d.itemId===current_item_id){
    		
    		
    		if (d.x < (width/2 - lu_2)  ) {
                d.x = (width/2 - lu_2);
            };
            
            if (d.x > (width/2 + lu_2) ) {
                d.x = (width/2 + lu_2);
            };
            
            if (d.y < (height/2 - lu_2)  ) {
                d.y = (height/2 - lu_2);
            };
            
            if (d.y > (height/2 + lu_2) ) {
                d.y = (height/2 + lu_2);
            };
            
    		
    	
    		
    	}
    	else{
            if (d.x < (node_size_funct(d.totalCount))) {
                d.x = (node_size_funct(d.totalCount));
            };
            if (d.y < (node_size_funct(d.totalCount))) {
                d.y = (node_size_funct(d.totalCount));
            };
            if (d.x > (width/3*2+100-node_size_funct(d.totalCount))) {
                d.x = (width/3*2+100-node_size_funct(d.totalCount));
            };
            if (d.y > (height-node_size_funct(d.totalCount)*2)  ) {
                d.y = (height-node_size_funct(d.totalCount)*2);
            };
    		
    		
    	};
    	
    	
        return "translate(" + (d.x - gap_su_1) + "," + (d.y-su+lu_3) + ")";
    }

	
    	
    
    var single_pred_node_click = function(svg_elem)
    {
    	console.log("single_pred_node_click - ");
    	
    	var item_id = svg_elem.attr("data-item_id");
    	
    	console.log(item_id);
    	
    	
    	window.location = 'user/item/predictions?i=' + svg_elem.attr("data-item_id");
    	
    	
    	
//    	d3.selectAll(".node_g")
//    		.attr("data-selected",function (d){    			
//    			console.log(d);    			
//    			var s = 0;    			
//    			if (d.itemId===item_id){
//    				s = 1;
//    				
//    				d3.select(this).select("circle").style("fill","#009fff");
//    				
//    			}
//    			else{
//    				d3.select(this).select("circle").style("fill","#4DF2FF");
//    			};
//    				
//    			return s;
//    		})
//    		;
    	
    	
//    	pulse_div_remove("#layer1_svg"); 
     	
    	
//    	if (svg_elem.attr("data-selected")!=="1"){
//
//        	d3.selectAll(".node_g").select(".node_circle_single_pred").style("stroke","blue");
//        	d3.selectAll(".node_g").select(".node_circle_single_pred").style("stroke-width",0);
//
//
//        	d3.selectAll(".node_g")
//        		.transition()
//        		.duration(10)
//        		.attr("data-selected",0)
//        		.on("end", function(){
//        			            	
//        			svg_elem.attr("data-selected",1);
//        			
//
//        	    	svg_elem.select(".node_circle_single_pred").style("stroke","red");
//        	    	svg_elem.select(".node_circle_single_pred").style("stroke-width",4);
//        	    	
//        	    	
////        	    	console.log(svg_elem.attr("class"));
////        	    	console.log($(".node_g[data-selected='1']")[0] );
//        	    	
//        	    	
//        	    	 
//        	    	
//        	    	
//        		})
//        		;
//        	
////        	console.log(svg_elem.attr("data-item_id"));
//
//        	
//        	
////        	get_item_data(svg_elem.attr("data-item_id"),draw_footfall_info_panel);
//    		
//    	}
//    	else{
//    		
//    		window.location = 'user/single_item_pred?item_id=' + svg_elem.attr("data-item_id");
//    		
//    	}
//    	;
    		
    	
    	
    
        return function(d) {
//        	console.log(d);
        };
    	
    	

    	
    }
    
	    
    // fade nodes on hover
    var single_pred_node_mouseover = function (svg_elem) {
    	
//    	console.log("single_pred_node_mouseover - ");

    	console.log(svg_elem.attr("class"));
    	
    	svg_elem.select(".node_circle_single_pred").style("stroke","green");
    	svg_elem.select(".node_circle_single_pred").style("stroke-width",4);
    	
    
        return function(d) {
//        	console.log(d);
        };
    }

    
    
    var single_pred_node_mouseout = function (svg_elem) {

//    	console.log("single_pred_node_mouseout - ");

    	if (parseInt(svg_elem.attr("data-selected"))==0 ){

        	svg_elem.select(".node_circle_single_pred").style("stroke","blue");
        	svg_elem.select(".node_circle_single_pred").style("stroke-width",0);
        	   		
    	};
    	
        return function(d) {
//        	console.log(d);
        };
    }

   
	
    var _draw = function ()
    {
//    	console.log("draw_single_item_similarity.draw");
//    	console.log(data);		

//    	nodes = prediction_graph_data.nodes.filter(d=>(((item_prediction_data.findIndex(({ i }) => i === d.itemId)) > core_item_list_length  )?true:false ));
    	
    	
    	nodes = prediction_graph_data.nodes.filter(
    			d=>{
    				

    				var found = false ; 
 					var found_i = (item_prediction_data.findIndex(({ i }) => i === d.itemId));
 					if ( found_i >= core_item_list_length  ){
 						found = true;
 					};
 					if ( current_item_id  === d.itemId){
 						found = true;
 					};
    				
 					return found;
    			});
    	
    	
 	    
 	    links = prediction_graph_data.links.filter(
 				d=> {
 					
 					
 					var found = false ; 
 					var found_i = -1;
 					
 					if (d.target.itemId==null){
 						found_i = (item_prediction_data.findIndex(({ i }) => i === d.target));
 					}
 					else{
 						found_i = (item_prediction_data.findIndex(({ i }) => i === d.target.itemId));
 					};
 					
 					 
 					if ( found_i >= core_item_list_length ){
 						found = true;
 					}; 					
 					if ( current_item_id  === d.target){
 						found = true;
 					};

 					return found;
 				});
 	    
    	


 	    // add the curved links to our graphic
 	    link = pred_graph_svg.selectAll(".link")
		 	        .data(
		 	        		links
		 	        				)
		 	        .enter()
		 	        .append("line")
		 	        .attr("class", "link_pred")
		 	        .attr("data-item_id", function(d){		 	        	
		 	        	return d.target;
		 	        })
		 	        .attr("opacity", 1.0)
		 	        .style("stroke-width", function(d){
		 	        	
//		 	        	console.log(d);
//		 	        	return 11.75+1*(1-link_size_funct(d.value));
		 	        	return 11;
		 	        })
		 	        .style("stroke-linecap", "round")			 	        
		 	        .style("filter", "url(#blurFilter)")		 	        
		 	        ;

 	    // add the nodes to the graphic
 	    node = pred_graph_svg.selectAll(".node_g")
		 	        .data(nodes)
		 	        .enter()
		 	        .append("g")
		 	        .attr("class", "node_g")
		 	        		 	        
		 	        ;
 	    
 	    d3.selectAll(".node_g")
			.attr("data-clicked",0)
			.attr("data-hover",0)
			.attr("data-selected", function(d) {

				return (d.itemId===current_item_id)? 1 : 0 ;
			})
			.attr("data-full_name",function(d){return d.nameStr})
			.attr("data-item_id",function(d){return d.itemId})
			.on('click', function(d){
				d3.event.stopPropagation();  
				
//				console.log(d3.select(this));
//				single_pred_node_click(d3.select(this)); 
				
			})
    
		    ;
 	    

 	    // a circle to represent the node
 	    node.append("circle")
 	        .attr("class", "circle_node_pred") 	        
 	        .attr("r", function(d) { 	        	
 	        	var _r = d.totalCount ;
 	        	if (d.itemId===current_item_id){
 	        		
 	        		if (_r >= node_size_max/3){
 	        			_r = d.totalCount ;
 	        			
 	        		}
 	        		else{
 	        			_r = node_size_max/3;
 	        			
 	        		};
 	        	};
 		    	return node_size_funct(_r);
 			}) 	 
 			.style("fill", function(d) {
 				 				
 		    	return (d.itemId===current_item_id)? "#009fff" : "#4DF2FF" ;
 			}) 	 			
 			.style("filter", "url(#blurFilter)")	
 	        ;

 	    
 	    
 	   

 	   node_text = pred_graph_text_svg.selectAll(".node_text")
                   .data(nodes)
                   .enter()
                   .append("g")
                   .append("text")
                   .attr("class", "text_node_pred")
                   .attr("data-item_id", function(d){
                	   return d.itemId;
		 	        })
                   .text(function(d) {
                	   
//                	   return (string_trim(d.nameStr,30));
                	   return string_trim(d.nameStr,20);
                	   
                   })                   
                   .attr('x', function(d){
                	   var x_offset = 10;
                	   if (d.itemId==current_item_data.itemId){
                		   x_offset = 0;
                	   }
                	   return x_offset;
                   })
                   .attr('y', (su+3))
                   .style("font-size",function(){
                	   var fs = 10;
                	   if (d3.select(this).data()[0].itemId==current_item_data.itemId){
                		   fs = 17;
                	   }
                	   return fs;
                   })
                   .style("fill",function(){
                	   var fs = "#666";
                	   if (d3.select(this).data()[0].itemId==current_item_data.itemId){
                		   fs = "#000";
                	   }
                	   return fs;
                   })
                   .on("mouseenter",function(){
                	   
                	   console.log("enter");
                	   console.log(d3.select(this).data());
                	   
                	   var appendto_elem = "body";
                	   
                	   
                	   console.log();
                	   
                	   if ($(".pred_graph").data().view_status==2){
                		   appendto_elem = ".pred_graph";
                	   };
                	   
                	   if (d3.select(this).data()[0].itemId==current_item_data.itemId){
                		   
                		   draw_modal_info_svg_tool(appendto_elem,d3.select(this),d3.mouse(this),current_item_data);
                		   
                	   }
                	   else{
                		   draw_modal_info_svg_tool(appendto_elem,d3.select(this),d3.mouse(this),item_info_map[d3.select(this).data()[0].itemId]);
                		   
                	   };
                	   
                   })
		 	       .on("mouseleave",function(){
     		    	  
		 	    	  remove_modal_info_svg_tool();
		 	        	
		 	       })
		 	       .on("click",function(){
		 	    	   
     		    	  window.location = 'user/item/prediction?i=' + d3.select(this).data()[0].itemId ;
		 	        	
		 	       })
		 	       .call(wrap, su*3 );
                   ;


 	    
 	   // build a dictionary of nodes that are linked
	   links.forEach(function(d) {
	        linkedByIndex[d.source + "," + d.target] = 1;
	   
	   });
	   
	   
	 	   	 
	   
	   
 	   update();
		
    }
		
	
    _draw();
	
	

	
//	d3.select(".pred_graph_text_svg").call(
//			    d3.zoom()
//			        .scaleExtent([.666, 3])
//			        .on("zoom", function() { 
//			        	d3.select(".pred_graph_text_svg").attr("transform", d3.event.transform); 
//			        	d3.select(".pred_graph_svg_g").attr("transform", d3.event.transform);	
//			        })
//			        .on("end",function(){
//			        	d3.select(".pred_graph_text_svg").style("cursor","grab");
//			        })
//			);
			  
	
    
    
    
    
}








function export_prediction()
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
    					"<div class='modal_export_row small_text'> Prediction Data" +
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
    					_prediction_data_download();
    					
    				});
				

				$(".production_data_download")
    				.click(function(){
    					
    					_product_data_download();
    				});
				
				
				
			});
	

	
	
	
	
	function _prediction_data_download()
	{
		console.log(item_prediction_data);	
		
		var export_data = [];
		
		var item_prediction_data_l = item_prediction_data.length;
		
		
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
		export_data.push(["List of Predicted Products"]);
		export_data.push([""]);
		
		
		
		
		var export_item_row_header = [ 	"Index", "Prediction Number",	"Name",	 "Item Id",	"Categories",	"Price",  "Description"	,"Image URL"	,"Footfall Rank", "Footfall Percentage",	 	"Footfall Count",	 	"Visit Count",	 	"Purchase Count",		"Cartexit Count"	];		
		export_data.push(export_item_row_header);
		

		
		for (var i=0; i<item_prediction_data_l; i++){
			
			var item_id = item_prediction_data[i].i;
			
			var item_data = item_info_map[item_id]; 
			
			var export_item_row_values = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
			
			export_item_row_values[0]=i ;
			export_item_row_values[1]=item_prediction_data[i].s ;
			export_item_row_values[2]='\"'+item_data.nameStr+'\"' ;
			export_item_row_values[3]=item_data.itemId ;
			export_item_row_values[4]='\"'+item_data.catArray +'\"';
			export_item_row_values[5]=item_data.price ;
			export_item_row_values[6]='\"'+item_data.descrStr+'\"' ;
			export_item_row_values[7]=item_data.imageUrl ;
			export_item_row_values[8]=item_data.footfallRank ;
			export_item_row_values[9]=item_data.footfallPerc ;
			export_item_row_values[10]=item_data.footfallCount ;
			export_item_row_values[11]=item_data.visitCount ;
			export_item_row_values[12]=item_data.purchaseCount ;
			export_item_row_values[13]=item_data.cartexitCount ;
			
			
			export_data.push(export_item_row_values);
			
			
		}
		
		
		console.log(export_data);
		
		


		var csvString = export_data.map(row => row.join(',')).join('\n');
		var a         = document.createElement('a');
		a.href        = 'data:attachment/csv,' +  encodeURIComponent(csvString);
		a.target      = '_blank';
		a.download    = 'Product_'+string_trim(current_item_data.nameStr,20)+'['+current_item_data.itemId+']'+'.csv';
		
		
		
		document.body.appendChild(a);
		a.click();
		
	}
	
	
	
	
	
	function _product_data_download()
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










function get_item_prediction_data()
{
	var deferred = new $.Deferred();
	
	$.ajax({
		type: "POST",
	    url: "item/sim/get",	    
	    contentType: "application/json; charset=utf-8",
//	    dataType: "json",
	    data:  JSON.stringify( {"itemId": current_item_id}),
	    success: function(data)
	    {
//	    	console.log(data);
	    	
	    	prediction_data = data;
	    	
//	    	console.log(prediction_data);
	    	
	    	var s1 = prediction_data.simItems.replace(/i/gi,"\"i\"").replace(/s/gi,"\"s\"");

//	    	console.log(s1);
	    	
	    	var j1 = JSON.parse(s1);
	    	
//	    	console.log(j1);
	    	
	    	item_prediction_data = JSON.parse(s1).map(d => { return {"i":(String(d.i)),"s":d.s} }).sort((a,b)=>a.s-b.s);
	    	
//	    	console.log(item_prediction_data);

//			item_prediction_data.sort((a,b)=>a.s-b.s);

	    	core_item_list_length = 0;
	    	

	    	deferred.resolve(item_prediction_data);
	 	    	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	      console.log(jqXHR);
	      console.log(textStatus);
	      console.log(errorThrown);
	      deferred.resolve({error:jqXHR.status});
	
	
	    }
	});
	
	return deferred.promise();

}









