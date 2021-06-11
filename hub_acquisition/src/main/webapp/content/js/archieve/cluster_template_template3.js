


var cluster_template_data = null;

var cluster_analysis_data = null;

var purchase_freq_data;
var touchtype_pie_data;

var regiUserData;
var purchaseUserCountPerActMonth_data;
var avgPurchaseCountPerActMonth_data;
var avgPurchaseAmountPerActMonth_data;




var filter_list_data = [];





var list_header = "<li class='tool_box_ul_li_header normal_text bold_text' > " +

	"<div class='tool_box_ul_li_header_col template_header_name'>Name</div>"+
	"<div class='tool_box_ul_li_header_col template_header_createdon'>Created On</div>"+
	

"</li>";


var list_loading = "<li class='list_loading template_li shine'>  &nbsp; </li>";


var list_no_cluster_template = "<li class='list_no_result template_li small_text bold_text faint_text' > " +
"<div class='tool_box_ul_li_header_col'>  No Cluster Template Created ...</div>"+
"</li>";

var filter_index = 1;



var attribute_map={
		
		"age":"Age",
		"visit_count":"Visit Count",
		"purchase_count":"Purchase Count",
		"total_purchase_amount":"Total Purchase Amount",
		"cartexit_count":"Cart Exit Count",
		
		
};


var relation_map={
		
		"none":"&#61;&#62;&#60;",
		"eq":"&#61;&#61;",
		"gr":"&#62;",
		"le":"&#60",
		"eqgr":"&#61;&#62;",
		"eqle":"&#61;&#60;",
		"noteqle":"&#33;&#61;",
		
		
};




var andor_map={
		
		"none":"AND/OR",
		"and":"AND",
		"or":"OR",
		
};




function init_cluster_template_template()
{

    $("<div class=' layer1 left_col col'> </div>").appendTo(".main_content");
  
    draw_template_overview();
    
    draw_analysis();
    
    if (typeof current_cluster_template_id === 'undefined'){
    	
    	$("<div class='toolbox_section normal_text bold_text faint_text cluster_template_section '  >"+
				
				"<div class='toolbox_section_header  '  > Status </div>"+
				
				"First, Create cluster by adding filters"+

		  "</div>")
		  .appendTo(".analysis .tool_box_content");
    	
    }
    else{
    	
    	Promise.all([get_cluster_template()]).then(function (){
    		
        	update_template_overview();
        	
            height_cascade();


    	}); 
    	
    	Promise.all([get_cluster_analysis()]).then(function (){
    		
    		
    		console.log(cluster_analysis_data);
    		
    		
    		if (typeof cluster_analysis_data=='undefined'){
    			
    			$("<div class='toolbox_section normal_text bold_text faint_text cluster_template_section '  >"+
    					
    					"<div class='toolbox_section_header  '  > Status </div>"+
    					
    					"Only saved and not computed"+

    			  "</div>")
    			  .appendTo(".analysis .tool_box_content");
    			
    			
    		}    			
    		else if (cluster_analysis_data.status==1){
    			
    			$("<div class='toolbox_section normal_text bold_text faint_text cluster_template_section '  >"+
    					
    					"<div class='toolbox_section_header  '  > Status </div>"+
    					
    					"Only saved and not computed"+

    			  "</div>")
    			  .appendTo(".analysis .tool_box_content");
    			
    			
    			
    			
    		}
    		else if (cluster_analysis_data.status==2){
    			
    			$("<div class='toolbox_section normal_text bold_text faint_text cluster_template_section '  >"+
    					
    					"<div class='toolbox_section_header  '  > Status </div>"+
    					
    					"We are computing, please wait..."+

    			  "</div>")
    			  .appendTo(".analysis .tool_box_content");
    			
    			
    			
    		}
    		else if (cluster_analysis_data.status==3){
    			
    			$(".analysis .tool_box_content .toolbox_section").remove();

    			
    			
    			purchaseUserCountPerActMonth_data = JSON.parse(cluster_analysis_data.purchaseUserCountPerActMonth);

    			
    			
    			draw_overview();


    			draw_touchtype_pie();

    			draw_purchase_freq();
    			
    			
    			
    			draw_avgPurchaseCountPerActMonth();

    			draw_avgPurchaseAmountPerActMonth();
    			
    			height_cascade();
    			
    		}
    			
     		
        	
            height_cascade();


    	}); 
    	
    	
    }
    	
    
    
    height_cascade();

    
    
}



function draw_analyisis_overview()
{

	
	regiUserData = JSON.parse(cluster_analysis_data.regiUserData);

	
	var regiUserCount = regiUserData[2];
	
	var regiUserPerc = (regiUserData[2]/cluster_analysis_data.totalUsers)*100;
	
	
	$("<div class='toolbox_section normal_text bold_text cluster_analysis_section touchtype_overview_section  '  >"+
			
			"<div class='toolbox_section_header faint_text'> Overview </div>"+

			"<div class='half_section'>" +
				"<div class='half_section_header  small_text bold_text faint_text '> Total Customers </div>"+
				"<div class= half_section_value large_text '>  " + cluster_analysis_data.totalUsers+"</div>"+
			"</div>"+
			

			"<div class='half_section'>" +
				"<div class='half_section_header  small_text bold_text faint_text '> Total Purchase Amount </div>"+
				"<div class= half_section_value large_text '>  " + cluster_analysis_data.totalValue+"</div>"+
			"</div>"+
			
			"<div class='half_section'>" +
				"<div class='half_section_header  small_text bold_text faint_text '> Total Purchase Amount </div>"+
				"<div class= half_section_value large_text '>  " + ( regiUserCount +" ("+regiUserPerc+"%)") +"</div>"+
			"</div>"+
			

			"<div class='half_section'>" +
				"<div class='half_section_header  small_text bold_text faint_text '> Completed on  </div>"+
				"<div class= half_section_value large_text '>  " + ( new Date(cluster_analysis_data.completedTime)).getStdFormat() +"</div>"+
			"</div>"+
			
			
	  "</div>")
	  .appendTo(".analysis .tool_box_content");
	



}







function draw_avgPurchaseCountPerActMonth()
{
	
	avgPurchaseCountPerActMonth_data = JSON.parse(cluster_analysis_data.avgPurchaseCountPerActMonth);
	
	
	
	
	
	avgPurchaseCountPerActMonth_data = Object.keys(avgPurchaseCountPerActMonth_data).map(d=>{
		
		
		
		
		return {
			
			x_value : parseInt(d),
			y_value : avgPurchaseCountPerActMonth_data[d]/purchaseUserCountPerActMonth_data[parseInt(d)]
			
			
		};
		
		
	});
	
 	
	

	$("<div class='toolbox_section normal_text bold_text faint_text cluster_analysis_section avgPurchaseCountPerActMonth  '  >"+
			
			"<div class='toolbox_section_header'> Purchase count per active month </div>"+
//			"<svg class=' purchase_freq_svg' preserveAspectRatio='xMinYMin'></svg>"+

	  "</div>")
	  .appendTo(".analysis .tool_box_content");
	
	
	var barchart_w = su*18;
	var barchart_h = su*5;
	
	
	
	
	d3.select(".avgPurchaseCountPerActMonth")
							.append("svg")
                        	.attr("class","avgPurchaseCountPerActMonth_svg")
                        	.attr("transform", "translate(" + ( 0 )+ "," + ( 0 ) + ") scale(1.0)")
							.attr(								
								"width",barchart_w
							)
							.attr(
								"height",barchart_h
							);

	var barchart_svg = d3.select(".avgPurchaseCountPerActMonth_svg");
	
	
	
	var margin = {top: 30, right: 10, bottom: 30, left: 50};
   
	
	

	var x_scale = d3.scaleBand()
					    .rangeRound([margin.left, barchart_w-margin.right])
					    .padding(0.666);
					    ;
					
	
	var time_unit_array = avgPurchaseCountPerActMonth_data.map(function(d) { return d.x_value; });

	
	x_scale.domain(time_unit_array);

	
	
	
	
	var y_scale = d3.scaleLinear().range([barchart_h-margin.bottom, (margin.top)]).nice();

	
	y_scale.domain(
			[ 0, 
			  d3.max(
					  avgPurchaseCountPerActMonth_data, 
					  function(d){ return d.y_value; }
					 )
		    ]
		  );
					
	
	var xAxis = d3.axisBottom(x_scale);
	
	
	var yAxis = d3.axisLeft(y_scale).ticks(3);

	
	
	
	barchart_svg.append("g")
					  .attr("class", "x_axis")
					  .attr("transform", "translate("+( 0 )+"," + (barchart_h-margin.bottom ) + ")")								  
					  .call(xAxis)					  
					  ;

	barchart_svg.append("g")
				      .attr("class", "y_axis")
				      .attr("transform", "translate("+( margin.left )+","+( 0 )+")")
				      .call(yAxis)	
				      ;

	
	var slice = barchart_svg.selectAll(".bar")
						    .data(avgPurchaseCountPerActMonth_data)
						    .enter()
						    .append("g")
						    .attr("class", "bar")
//						    .attr("transform",function(d) { return "translate(" + x_scale(d.x_value) + ",0)"; })	
						    
						    .append("rect")		    
						    .attr("x", function(d) { 
						    	
						    	
//						    	return x_scale(d.x_value)+margin.left+margin.right+rect_w/2;
						    	return x_scale(d.x_value);
//						    	return x_scale.bandwidth();
						    })
						    .attr("y", function(d) {
						    	
//						    	console.log(d);
//						    	
//						    	console.log(y_scale(d.y_value));
						    	
						    	return y_scale(d.y_value);
						  	  
						    })
						    .attr("height", function(d) {
						    	
						    	
						    	return  (barchart_h - y_scale(d.y_value) - margin.top);
						  	  
						    })
						    .attr("width", function(){
						    	return x_scale.bandwidth();
						    })
						    .on("mouseenter",function(d){ 
						    	
						    	var dim = d3.select(this).node().getClientRects()[0];
						    							    
						    	console.log(d3.event.clientX);
						    	console.log(d3.event.clientY);

//						    	draw_svg_tooltip((d.x_value+"s : "+d.y_value),d3.select(".purchase_freq_svg"),[dim.x-su*2+su_8,d3.mouse(this)[1]]);

						    	var mouse_x = d3.event.clientX;
						    	var mouse_y = d3.event.clientY+window.scrollY;
						    	
						    	var tooltip_message_div = 
						    		$("<div class=' tooltip_box_row '>" +
						    				"<div class=' tooltip_box_row_name  faint_text'> Number of customers </div>"+
						    				"<div class=' tooltip_box_row_value large_text thin_text visit_text'>" +d.x_value+ "</div>"+
						    		  "</div> <br/>"+
						    		  "<div class=' tooltip_box_row '>" +
						    		  		"<div class=' tooltip_box_row_name  faint_text'> Purchase orders per customer </div>"+
						    		  		"<div class=' tooltip_box_row_value large_text thin_text visit_text'>" +Math.ceil(d.y_value)+ "</div>"+
					    			  "</div>"
						    		
						    		
						    		);
						    	
						    	
						    	
						    	draw_connetor_tooltip(tooltip_message_div,mouse_x,mouse_y);
						    	
						    	
						    	
						    })
				        	.on("mouseleave",function(e){
				        		  remove_tooltip();
				        	})
						    ;
	


	barchart_svg
    		.append("text")			
    		.text("Purchase order count")
    		.attr("class","chart_main_axis_title")
    		.attr("x",0)
    		.attr("y",(barchart_h/2))
    		.style("text-anchor", "middle")
    		.attr("transform", "rotate(-90,12,"+(barchart_h/2)+")");        
    		;
    		

	barchart_svg
			.append("text")			
			.text("Number of active months")
			.attr("class","chart_main_axis_title x_axis_title_text")
			.attr("x",(barchart_w/2-margin.left/2))
			.attr("y",(barchart_h-margin.bottom/6))
			.style("text-anchor", "middle")
			;          	
	
	
	
}





function draw_avgPurchaseAmountPerActMonth()
{
	
	avgPurchaseAmountPerActMonth_data = JSON.parse(cluster_analysis_data.avgPurchaseAmountPerActMonth);
	
	
	console.log(avgPurchaseAmountPerActMonth_data);
	console.log((purchaseUserCountPerActMonth_data));
	
	avgPurchaseAmountPerActMonth_data = Object.keys(avgPurchaseAmountPerActMonth_data).map(d=>{
		
		return {
			
			x_value : parseInt(d),
			y_value : avgPurchaseAmountPerActMonth_data[d]/purchaseUserCountPerActMonth_data[parseInt(d)]
			
		};
		
		
	});
	
	console.log(avgPurchaseAmountPerActMonth_data);
	

	$("<div class='toolbox_section normal_text bold_text faint_text cluster_analysis_section avgPurchaseAmountPerActMonth '  >"+
			
			"<div class='toolbox_section_header'> Purchase amount per active month </div>"+
//			"<svg class=' purchase_freq_svg' preserveAspectRatio='xMinYMin'></svg>"+

	  "</div>")
	  .appendTo(".analysis .tool_box_content");
	
	
	var barchart_w = su*18;
	var barchart_h = su*5;
	
	
	
	
	d3.select(".avgPurchaseAmountPerActMonth")
							.append("svg")
                        	.attr("class","avgPurchaseAmountPerActMonth_svg")
                        	.attr("transform", "translate(" + ( 0 )+ "," + ( 0 ) + ") scale(1.0)")
							.attr(								
								"width",barchart_w
							)
							.attr(
								"height",barchart_h
							);

	var barchart_svg = d3.select(".avgPurchaseAmountPerActMonth_svg");
	
	
	
	var margin = {top: 30, right: 10, bottom: 30, left: 50};
   
	
	

	var x_scale = d3.scaleBand()
					    .rangeRound([margin.left, barchart_w-margin.right])
					    .padding(0.666);
					    ;
					
	
	var time_unit_array = avgPurchaseAmountPerActMonth_data.map(function(d) { return d.x_value; });

	console.log(time_unit_array);
	
	x_scale.domain(time_unit_array);

	
	
	
	
	var y_scale = d3.scaleLinear().range([barchart_h-margin.bottom, (margin.top)]).nice();

	
	y_scale.domain(
			[ 0, 
			  d3.max(
					  avgPurchaseAmountPerActMonth_data, 
					  function(d){ return d.y_value; }
					 )
		    ]
		  );
					
	
	var xAxis = d3.axisBottom(x_scale);
	
	
	var yAxis = d3.axisLeft(y_scale).ticks(3);

	
	
	
	barchart_svg.append("g")
					  .attr("class", "x_axis")
					  .attr("transform", "translate("+( 0 )+"," + (barchart_h-margin.bottom ) + ")")								  
					  .call(xAxis)					  
					  ;

	barchart_svg.append("g")
				      .attr("class", "y_axis")
				      .attr("transform", "translate("+( margin.left )+","+( 0 )+")")
				      .call(yAxis)	
				      ;

	
	var slice = barchart_svg.selectAll(".bar")
						    .data(avgPurchaseAmountPerActMonth_data)
						    .enter()
						    .append("g")
						    .attr("class", "bar")
//						    .attr("transform",function(d) { return "translate(" + x_scale(d.x_value) + ",0)"; })	
						    
						    .append("rect")		    
						    .attr("x", function(d) { 
						    	
						    	
//						    	return x_scale(d.x_value)+margin.left+margin.right+rect_w/2;
						    	return x_scale(d.x_value);
//						    	return x_scale.bandwidth();
						    })
						    .attr("y", function(d) {
						    	
//						    	console.log(d);
//						    	
//						    	console.log(y_scale(d.y_value));
						    	
						    	return y_scale(d.y_value);
						  	  
						    })
						    .attr("height", function(d) {
						    	
						    	
						    	return  (barchart_h - y_scale(d.y_value) - margin.top);
						  	  
						    })
						    .attr("width", function(){
						    	return x_scale.bandwidth();
						    })
						    .on("mouseenter",function(d){ 
						    	
						    	var dim = d3.select(this).node().getClientRects()[0];
						    							    
						    	console.log(d3.event.clientX);
						    	console.log(d3.event.clientY);

//						    	draw_svg_tooltip((d.x_value+"s : "+d.y_value),d3.select(".purchase_freq_svg"),[dim.x-su*2+su_8,d3.mouse(this)[1]]);

						    	var mouse_x = d3.event.clientX;
						    	var mouse_y = d3.event.clientY+window.scrollY;
						    	
						    	var tooltip_message_div = 
						    		$("<div class=' tooltip_box_row '>" +
						    				"<div class=' tooltip_box_row_name  faint_text'> Number of customers </div>"+
						    				"<div class=' tooltip_box_row_value large_text thin_text visit_text'>" +d.x_value+ "</div>"+
						    		  "</div> <br/>"+
						    		  "<div class=' tooltip_box_row '>" +
						    		  		"<div class=' tooltip_box_row_name  faint_text'> Purchase orders per customer </div>"+
						    		  		"<div class=' tooltip_box_row_value large_text thin_text visit_text'>" +Math.ceil(d.y_value)+ "</div>"+
					    			  "</div>"
						    		
						    		
						    		);
						    	
						    	
						    	
						    	draw_connetor_tooltip(tooltip_message_div,mouse_x,mouse_y);
						    	
						    	
						    	
						    })
				        	.on("mouseleave",function(e){
				        		  remove_tooltip();
				        	})
						    ;
	


	barchart_svg
    		.append("text")			
    		.text("Average purchase amount")
    		.attr("class","chart_main_axis_title")
    		.attr("x",0)
    		.attr("y",(barchart_h/2))
    		.style("text-anchor", "middle")
    		.attr("transform", "rotate(-90,12,"+(barchart_h/2)+")");        
    		;
    		

	barchart_svg
			.append("text")			
			.text("Number of active months")
			.attr("class","chart_main_axis_title x_axis_title_text")
			.attr("x",(barchart_w/2-margin.left/2))
			.attr("y",(barchart_h-margin.bottom/6))
			.style("text-anchor", "middle")
			;          	
	
	
	
}





function draw_purchase_freq()
{
	
	purchase_freq_data = JSON.parse(cluster_analysis_data.purchaseFreqData);
	
	purchase_freq_data = Object.keys(purchase_freq_data).map(d=>{
		
		
		return {
			
			x_value : parseInt(d),
			y_value : purchase_freq_data[d]
			
			
		};
		
		
	});
	
	
	

	$("<div class='toolbox_section normal_text bold_text faint_text cluster_analysis_section purchase_freq_section '  >"+
			
			"<div class='toolbox_section_header'> Purchase Frequency </div>"+
//			"<svg class=' purchase_freq_svg' preserveAspectRatio='xMinYMin'></svg>"+

	  "</div>")
	  .appendTo(".analysis .tool_box_content");
	
	
	var barchart_w = su*18;
	var barchart_h = su*5;
	
	
	
	
	d3.select(".purchase_freq_section")
							.append("svg")
                        	.attr("class","purchase_freq_svg")
                        	.attr("transform", "translate(" + ( 0 )+ "," + ( 0 ) + ") scale(1.0)")
							.attr(								
								"width",barchart_w
							)
							.attr(
								"height",barchart_h
							);

	var barchart_svg = d3.select(".purchase_freq_svg");
	
	
	
	var margin = {top: 30, right: 10, bottom: 30, left: 50};
   
	
	

	var x_scale = d3.scaleBand()
					    .rangeRound([margin.left, barchart_w-margin.right])
					    .padding(0.666);
					    ;
					
	
	var time_unit_array = purchase_freq_data.map(function(d) { return d.x_value; });

	
	x_scale.domain(time_unit_array);

	
	
	
	
	var y_scale = d3.scaleLinear().range([barchart_h-margin.bottom, (margin.top)]).nice();

	
	y_scale.domain(
			[ 0, 
			  d3.max(
					  purchase_freq_data, 
					  function(d){ return d.y_value; }
					 )
		    ]
		  );
					
	
	var xAxis = d3.axisBottom(x_scale);
	
	
	var yAxis = d3.axisLeft(y_scale).ticks(3);

	
	
	
	barchart_svg.append("g")
					  .attr("class", "x_axis")
					  .attr("transform", "translate("+( 0 )+"," + (barchart_h-margin.bottom ) + ")")								  
					  .call(xAxis)					  
					  ;

	barchart_svg.append("g")
				      .attr("class", "y_axis")
				      .attr("transform", "translate("+( margin.left )+","+( 0 )+")")
				      .call(yAxis)	
				      ;

	
	var slice = barchart_svg.selectAll(".bar")
						    .data(purchase_freq_data)
						    .enter()
						    .append("g")
						    .attr("class", "bar")
//						    .attr("transform",function(d) { return "translate(" + x_scale(d.x_value) + ",0)"; })	
						    
						    .append("rect")		    
						    .attr("x", function(d) { 
						    	
//						    	console.log(x_scale(d.x_value));
						    	
//						    	return x_scale(d.x_value)+margin.left+margin.right+rect_w/2;
						    	return x_scale(d.x_value);
//						    	return x_scale.bandwidth();
						    })
						    .attr("y", function(d) {
						    	
//						    	console.log(d);
//						    	
//						    	console.log(y_scale(d.y_value));
						    	
						    	return y_scale(d.y_value);
						  	  
						    })
						    .attr("height", function(d) {
						    	
						    	
						    	return  (barchart_h - y_scale(d.y_value) - margin.top);
						  	  
						    })
						    .attr("width", function(){
						    	return x_scale.bandwidth();
						    })
						    .on("mouseenter",function(d){ 
						    	
						    	var dim = d3.select(this).node().getClientRects()[0];
						    							    
//						    	console.log(d3.event.clientX);
//						    	console.log(d3.event.clientY);

//						    	draw_svg_tooltip((d.x_value+"s : "+d.y_value),d3.select(".purchase_freq_svg"),[dim.x-su*2+su_8,d3.mouse(this)[1]]);

						    	var mouse_x = d3.event.clientX;
						    	var mouse_y = d3.event.clientY+window.scrollY;
						    	
						    	var tooltip_message_div = 
						    		$("<div class=' tooltip_box_row '>" +
						    				"<div class=' tooltip_box_row_name  faint_text'> Number of customers </div>"+
						    				"<div class=' tooltip_box_row_value large_text thin_text visit_text'>" +d.x_value+ "</div>"+
						    		  "</div> <br/>"+
						    		  "<div class=' tooltip_box_row '>" +
						    		  		"<div class=' tooltip_box_row_name  faint_text'> Purchase orders per customer </div>"+
						    		  		"<div class=' tooltip_box_row_value large_text thin_text visit_text'>" +d.y_value+ "</div>"+
					    			  "</div>"
						    		
						    		
						    		);
						    	
						    	
						    	
						    	draw_connetor_tooltip(tooltip_message_div,mouse_x,mouse_y);
						    	
						    	
						    	
						    })
				        	.on("mouseleave",function(e){
				        		  remove_tooltip();
				        	})
						    ;
	


	barchart_svg
    		.append("text")			
    		.text("Touch Count")
    		.attr("class","chart_main_axis_title")
    		.attr("x",0)
    		.attr("y",(barchart_h/2))
    		.style("text-anchor", "middle")
    		.attr("transform", "rotate(-90,12,"+(barchart_h/2)+")");        
    		;
    		

	barchart_svg
			.append("text")			
			.text("Number of Purchases")
			.attr("class","chart_main_axis_title x_axis_title_text")
			.attr("x",(barchart_w/2-margin.left/2))
			.attr("y",(barchart_h-margin.bottom/6))
			.style("text-anchor", "middle")
			;          	
	
	
	
}





function draw_touchtype_pie()
{
	
	touchtype_pie_data = JSON.parse(cluster_analysis_data.touchtypeData);
	
	touchtype_pie_data = Object.keys(touchtype_pie_data).map(d=>{
		
		var name = "";
		if (parseInt(d)==1){name="Visits"};
		if (parseInt(d)==2){name="Purchases"};
		if (parseInt(d)==3){name="Cart Exits"};
		
		return {
			
			x_value : name,
			y_value : touchtype_pie_data[d]
			
			
		};
		
		
	});


	$("<div class='toolbox_section normal_text bold_text faint_text cluster_analysis_section touchtype_pie_section '  >"+
			
			"<div class='toolbox_section_header'> Touch Type Count </div>"+

	  "</div>")
	  .appendTo(".analysis .tool_box_content");
	

	var barchart_w = lu*5;
	var barchart_h = su*7;
	
	var rect_w = 6;
	
	
    const radius = Math.min(barchart_w, barchart_h) / 2;

    var color = d3.scaleOrdinal()
    				.range(["#98abc5", "#8a89a6", "#7b6888"]);


	
	d3.select(".touchtype_pie_section")
							.append("svg")
                        	.attr("class","touchtype_pie_section_svg")
                        	.attr(								
								"width",barchart_w
							)
							.attr(
								"height",barchart_h
							)													
							;
	
	var barchart_svg = d3.select(".touchtype_pie_section_svg")
							.append("g")
							.attr("transform", "translate(" + ( barchart_w/2 )+ "," + ( barchart_h/2 ) + ") scale(1.0)");

	
	var pie = d3.pie()
			    .value(d => {
			    	
			    	return d.y_value;			    	
			    })
			    .sort(null);
	
	
	
	var arc = d3.arc()
			    .innerRadius(radius/3)
			    .outerRadius(radius*0.666);
	
	
	var g = barchart_svg
					.selectAll(".arc")
				    .data(pie(touchtype_pie_data))
				    .enter()
				    .append("g")
				    .attr("class", "arc");
	
	g.append("path")
	    .attr("d", arc)
	    .style("fill", function(d,i) { return colors.touch_type[i]; })
	    .on("mouseenter",function(d){ 
						    	
		    	var dim = d3.select(this).node().getClientRects()[0];
		    							    
		    
		    	var mouse_x = d3.event.clientX;
		    	var mouse_y = d3.event.clientY+window.scrollY;
		    	
		    	var tooltip_message_div = 
		    		$("<div class=' tooltip_box_row '>" +
		    				"<div class=' tooltip_box_row_name  faint_text'> Type </div>"+
		    				"<div class=' tooltip_box_row_value large_text thin_text visit_text'>" +d.data.x_value+ "</div>"+
		    		  "</div> <br/>"+
		    		  "<div class=' tooltip_box_row '>" +
		    		  		"<div class=' tooltip_box_row_name  faint_text'> Count </div>"+
		    		  		"<div class=' tooltip_box_row_value large_text thin_text visit_text'>" +d.data.y_value+ "</div>"+
	    			  "</div>"
		    		
		    		
		    		);
		    	
		    	
		    	
		    	draw_connetor_tooltip(tooltip_message_div,mouse_x,mouse_y);
		    	
		    	
		    	
		    })
        	.on("mouseleave",function(e){
        		  remove_tooltip();
        	})
		    ;
	    ;

	var labelArc = d3.arc()
					    .outerRadius(radius/2 )
					    .innerRadius(radius/2);

	g.append("text")
	      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
	      .attr("dy", ".35em")
	      .text(function(d) {  return d.data.x_value; });
	
    height_cascade();

    
    
    
}












function draw_analysis()
{
	
	
	var tool_class_name = "analysis";
	var tool_dot_class_name = " ."+tool_class_name;

	  
    var tool_width = full_tool_width;
    var tool_min_h = full_tool_height/2;
   
	
 
	
	$("<div class='"+tool_class_name+" layer1 tool_box normal_text'> " +
			"<div class='tool_box_header'>" +
			
				"<div class='tool_box_header_name large_text'> Cluster Analysis </div>"+
				
			"</div>" +
			
			"<div class='tool_box_content'>" +
		
			
			"</div>"+
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:tool_width,
			"min-height": tool_min_h		
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col");
}



function draw_template_overview()
{
	
	var tool_class_name = "template_overview ";
	var tool_dot_class_name = " ."+tool_class_name;

	  
    var tool_width = full_tool_width;
    var tool_min_h = full_tool_height*0.666;
   
	
	$("<div class='"+tool_class_name+" layer1 tool_box normal_text'> " +
			"<div class='tool_box_header'>" +
			
				"<div class='tool_box_header_name large_text'> Filter List </div>"+
			
			"</div>" +
			"<div class='tool_box_content'>" +
			
			
				"<div class='input_text_group search_users_input_group'>" +
					"<input type='input' class='input_text_field cluster_template_name_input_text' placeholder='search_users' name='name'   " +
					" value='' required />" +
					"<label for='name' class='input_text_label'>Give Cluster Name </label>" +
				"</div>" +

				"<div class='tool_box_section_text_btn small_text bold_text add_filter_btn'> Add Filter </div>"+
				
				"<ul id='sortable' class='filter_ul'>  </ul>"+
				
				"<div class='filter_message_group '> " +
					"<div class='success_message small_text filter_message'> </div>" +
				"</div>"+

				
				"<div class='filter_seperator_group '> </div>" +

				
				"<div class='tool_box_section_text_btn small_text bold_text save_cluster_template_btn'> Save </div>"+
				"<div class='tool_box_section_text_btn small_text bold_text compute_cluster_template_btn'> Compute </div>"+

			
			"</div>"+
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:tool_width,
			"min-height": tool_min_h		
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col");
	

//	$( "#sortable" ).sortable();	
//	$( "#sortable" ).disableSelection();
    
    
	
	$(".add_filter_btn").click(function(){
		
		
		if (validate_filter(filter_index-1)){
			draw_filter();	
			filter_index = filter_index+1;
		};
	
		
		height_cascade();
		
		$(".save_cluster_template_btn").css({"display":"inline-block"});
		$(".compute_cluster_template_btn").css({"display":"inline-block"});

		
	});

	
	


	$(".save_cluster_template_btn").click(function(){
		
		
		
		if ($(".cluster_template_name_input_text").val().length==0){
			
			$(".filter_message")
				.removeClass("success_message").addClass("error_message")
				.css({"opacity":1})
				.text("Error : Give name to this Cluster Template.");

			setTimeout(function() {
			
				$(".filter_message")
					.removeClass("error_message").addClass("success_message")
					.css({"opacity":0})
					.text("");
			  
			}, 5000);
			
			
			
		}
		else{
			
			if (validate_filter_all() ){
				
				Promise.all([save_cluster_template()]).then(function ([data]){
					
					console.log(data);
					
					if (data==true){
						
						 if (typeof getUrlParameter("i") === 'undefined'){
							 console.log("current_cluster_template_id not found ");
							 
							 
							 window.location = "analyze/clustertemplate/template?i="+current_cluster_template_id;
						  	 
						 }
						
					}
					
					
				});
				
			};
			
			
		};
		
		
		
	});
	
	
	
	$(".compute_cluster_template_btn").click(function(){



		if ($(".cluster_template_name_input_text").val().length==0){
			
			$(".filter_message")
				.removeClass("success_message").addClass("error_message")
				.css({"opacity":1})
				.text("Error : Give name to this Cluster Template.");

			setTimeout(function() {
			
				$(".filter_message")
					.removeClass("error_message").addClass("success_message")
					.css({"opacity":0})
					.text("");
			  
			}, 5000);
			
			
			
		}
		else{
			
			if (validate_filter_all() ){
				
				Promise.all([save_cluster_template()]).then(function ([data]){
					
					console.log(data);
					
					if (data==true){
						
						compute_cluster_analysis();
						
						
						if (typeof getUrlParameter("i") === 'undefined'){
							 console.log("current_cluster_template_id not found ");
							 
							 
							 window.location = "analyze/clustertemplate/template?i="+current_cluster_template_id;
						  	 
						}
						
						$(".filter_message")
							.removeClass("error_message").addClass("success_message")
							.css({"opacity":1})
							.text("Queued for computation");
						
						$(".analysis .tool_box_content .toolbox_section").remove();
						
						
						
						$("<div class='toolbox_section normal_text bold_text faint_text cluster_template_section '  >"+
								
								"<div class='toolbox_section_header  '  > Status </div>"+
								
								"Queued for computation"+

						  "</div>")
						  .appendTo(".analysis .tool_box_content");
						
						
					
						setTimeout(function() {
						
							$(".filter_message")
								.removeClass("error_message").addClass("success_message")
								.css({"opacity":0})
								.text("");
						  
						}, 5000);

						
					}
					
					
				});
				
			};
			
			
		};
		
		
		
	});
	
	$(".compute_cluster_template_btn").click(function(){
		
	
		console.log("compute_cluster_template_btn");
		
		
		
		
		Promise.all([save_cluster_template()]).then(function (){
			
						
			
			
			
			

		});
//		
//		
//		
	});
	
	
	
}



function save_cluster_template()
{
	var deferred = new $.Deferred();

	filter_list_data = [];
	
	var status = false;
	
	
	$(".filter_ul li").each(function(i,data_elem){
		
		
		console.log("---- ---- ---- ---- ");
		
		console.log($(data_elem).find(".filter_index").text());
		
		console.log($(data_elem).find(".attribute_dropdown .dropdown_btn").data());
		
		console.log($(data_elem).find(".value_input_text_1").val());
		
		console.log($(data_elem).find(".value_input_text_1").val());
		
		
		var value1 = 0;
		
		if ($(data_elem).find(".value_input_text_1").val()=="Min"){
			
			value1 = "min";
		}
		else{
			
			value1 = $(data_elem).find(".value_input_text_1").val();
			
		};
		
		
		
		var value2 = 0;

		if ($(data_elem).find(".value_input_text_2").val()=="Max"){
			
			value2 = "max";
		}
		else{
			
			value2 = $(data_elem).find(".value_input_text_2").val();
		};
		
		
		var filter_data = {
				
				"filter_index":$(data_elem).find(".filter_index").text(),
				"attribute":$(data_elem).find(".attribute_dropdown .dropdown_btn").data("value"),				
				"value1":value1,				
				"value2":value2,
				
		};
		
		
		filter_list_data.push(filter_data);
		
		
		

		
	});	
	
	
		

	Promise.all([set_cluster_template()]).then(function ([data]){
		
		
		if (data.message=="success"){
			
			current_cluster_template_id = data.clusterTemplateId;
			
			$(".filter_message")
				.removeClass("error_message").addClass("success_message")
				.css({"opacity":1})
				.text("Saved...");
		
			setTimeout(function() {
			
			$(".filter_message")
				.removeClass("error_message").addClass("success_message")
				.css({"opacity":0})
				.text("");
			  
			}, 5000);
			status = true;
		}
		else{
			
			
			$(".filter_message")
				.removeClass("success_message").addClass("error_message")
				.css({"opacity":1})
				.text("Error occurred Cluster is not saved ");
			
	
			setTimeout(function() {
			
			$(".filter_message")
				.removeClass("error_message").addClass("success_message")
				.css({"opacity":0})
				.text("");
			  
			}, 5000);
		
			
		};
		
		
		
		deferred.resolve(status);
		
	}); 	


	
	return deferred.promise();

}







function update_template_overview()
{
	
	
	$(".cluster_template_name_input_text").val(cluster_template_data.name);
	
	
	var filterList = JSON.parse(cluster_template_data.filterListJson);
	
	
	$.each(filterList,function(i,data_elem){
		
		
		var rnd = random_string(2);
		
		
		var value1 = data_elem.value1;
		var attr_value1 = "";
		
//		console.log(data_elem.attribute);
//		console.log(data_elem.value1);
//		console.log(data_elem.value2);
		
		if(data_elem.value1=="min"){
			value1 = "Min";
			attr_value1 = "min";
		};
		

		var attr_value2 = "";
		var value2 = data_elem.value2;
			
		if(data_elem.value2=="max"){
			value2 = "Max"
			attr_value2 = "max";
		};
		

		$("<li class='ui-state-default'>" +
				"<div class='toolbox_section cluster_template_section ' data-filter_index="+filter_index+ ">"+
			
					"<div class='filter_index bold_text'> " +(i+1) + " </div>" +
					

					"<div class='dropdown_group attribute_dropdown' data-selector_type='attribute'>"+
						"<button class='dropdown_btn normal_text bold_text' data-value='"+data_elem.attribute+"' >"+attribute_map[data_elem.attribute]+"</button>"+
						"<div class='dropdown_content small_text'>"+
						    "<div class='dropdown_content_elem' data-attr_name='Age' data-attr_value='age'>Age</div>"+
						    "<div class='dropdown_content_elem' data-attr_name='Visit Count' data-attr_value='visit_count'>Visit Count</div>"+
						    "<div class='dropdown_content_elem' data-attr_name='Purchase Count' data-attr_value='purchase_count'>Purchase Count</div>"+
						    "<div class='dropdown_content_elem' data-attr_name='Total Purchase Amount' data-attr_value='total_purchase_amount'>Total Purchase Amount</div>"+					    
						    "<div class='dropdown_content_elem' data-attr_name='Cart Exit Count' data-attr_value='cartexit_count'>Cart Exit Count</div>"+
						    "<div class='dropdown_content_elem' data-attr_name='Location' data-attr_value='location'>Location</div>"+

						"</div>"+
					"</div>"+


					"<div class='filter_dash normal_text bold_text'> &#8212; </div>"+

	

					"<div class='filter_words normal_text bold_text'> From </div>"+
					
					"<div class='dropdown_group value_dropdown value_dropdown_min  ' data-selector_type='value_dropdown'>"+
						"<input type='input' class='dropdown_input normal_text bold_text value_input_text_1' " +
							"placeholder='Value' data-value='"+attr_value1+"'  name='name'  value='" +value1+"' required />" + 
						
						"<div class='dropdown_content small_text'>"+
						    "<div class='dropdown_content_elem' data-attr_name='Min' data-attr_value='min'> Min </div>"+
						    
					    "</div>"+
					"</div>"+

					"<div class='filter_words normal_text bold_text'> To </div>"+
					
					"<div class='dropdown_group value_dropdown value_dropdown_max ' data-selector_type='value_dropdown'>"+
						"<input type='input' class='dropdown_input normal_text bold_text value_input_text_2' " +
						"placeholder='Value' data-value='"+attr_value2+"'  name='name'  value='" +value2+"' required />" +
						
						"<div class='dropdown_content small_text'>"+
						    "<div class='dropdown_content_elem' data-attr_name='Max' data-attr_value='max'> Max </div>"+
						    
					    "</div>"+
					"</div>"+
					

					
					
					"<div class='filter_cancel_btn filter_cancel_btn_"+rnd+" delete_btn'>  </div>" +

				"</div>" +
		"</li>")
		.appendTo(".filter_ul")
		;
			
		

		$(".filter_cancel_btn_"+rnd).click(function(){
			
			
			var deleted_filter_index = $(this).parent().find(".filter_index").text();
			
//			console.log("deleted_filter_index = "+deleted_filter_index);
			
			$(this).parent().parent().remove();
			
			var filter_size = $(".filter_ul .filter_index").length;
				
			
			$(".filter_ul .filter_index").each(function(i,data_elem){
				
				
//				console.log("i = "+i);
//				console.log(data_elem);
//				console.log("i="+$(data_elem).text());
//				
				var this_filter_index = parseInt($(data_elem).text());
				
				
				
				if (deleted_filter_index < this_filter_index){
					
//					console.log("this_filter_index = "+this_filter_index);
					
					this_filter_index = this_filter_index - 1;
				
					$(data_elem).text(this_filter_index);
					
					$(data_elem).parent().data("filter_index",filter_index);
					
					filter_index = filter_index - 1;
					
				};
				
				
				if (filter_size==(i+1)){
					
//					$(this).parent().remove();
					
					filter_index = filter_size + 1;
					
				};
				
				
			})
			
			
//			$(this).parent().remove();
//			
//			filter_index = filter_index - 1;
			

		});
		
		
		
		filter_index = filter_index+1;
		
		
	});
		

	
	$(".dropdown_content_elem").click(function(){
				
		var dropdown_group = $(this).parent().parent();
		
		console.log($(this).data("attr_value"));
		console.log(dropdown_group.data("selector_type"));
		
		
		if ($(this).data("attr_value")=="location"){
			
			console.log("Locaation");
		};
		
		
		if (dropdown_group.data("selector_type")=="value_dropdown"){
			
			var dropdown_input = dropdown_group.find(".dropdown_input");
			
			dropdown_input.data("name",$(this).data("attr_name"));
			dropdown_input.data("value",$(this).data("attr_value"));
			
			dropdown_input.val($(this).data("attr_name"));
			
		};
		
		
		var dropdown_btn = dropdown_group.find(".dropdown_btn");
		
		dropdown_btn.data("name",$(this).data("attr_name"));
		dropdown_btn.data("value",$(this).data("attr_value"));

		
		
		dropdown_btn.html($(this).data("attr_name"));
		dropdown_btn.val($(this).data("attr_name"));
		
		
	});
	

	
	
	
	
	
	
	$(".save_cluster_template_btn").css({"display":"inline-block"});

	$(".compute_cluster_template_btn").css({"display":"inline-block"});

	
	
	
	
	
}








function validate_filter(this_filter_index)
{
	
	var valid = true;
	
	$(".filter_message")
		.removeClass("success_message").addClass("error_message")
		.css({"opacity":0})
		.text("");
	
//	console.log($("[data-filter_index="+(this_filter_index)+"]"));
	
	var filter_li = $("[data-filter_index="+(this_filter_index)+"]").parent();
	
	

	if(filter_li.length>0){
		
		
		var value1_val =  filter_li.find(".value_input_text_1").val();
		
		
		var value2_val =  filter_li.find(".value_input_text_2").val();		
		
		if ( (!isNaN( value1_val )) && (!isNaN( value2_val )) ){
		
			
			if (parseFloat(value1_val)>parseFloat(value2_val)){
				
				
				$(".filter_message")
					.css({"opacity":1})
					.text("In Fitler no. "+this_filter_index+" : From Value is greater tham TO Value");
		
				valid = false;
				
			};
			
		};

		
		if (filter_li.find(".value_input_text_2").val()!="Max"){
			
			if( 
					(isNaN( filter_li.find(".value_input_text_2").val() ))
					||
					(filter_li.find(".value_input_text_2").val().length==0)
			){
				$(".filter_message")
					.css({"opacity":1})
					.text("In Fitler no. "+this_filter_index+" : 'To' value is in inccorect format.");
			
				valid = false;
			}
			
		};
		
		

		
		if (filter_li.find(".value_input_text_1").val()!="Min"){
			
			if( 
					(isNaN( filter_li.find(".value_input_text_1").val() ))
					||
					(filter_li.find(".value_input_text_1").val().length==0)
			){
				$(".filter_message")
					.css({"opacity":1})
					.text("In Fitler no. "+this_filter_index+" : 'From' value is in inccorect format.");
			
				valid = false;
			}
			
		};
		
		
		
		
		
		
		

		if (filter_li.find(".attribute_dropdown .dropdown_btn").data("value")=="none"){
			
			console.log("Please select attribute_dropdown");
			
			$(".filter_message")
				.css({"opacity":1})
				.text("In Fitler no. "+this_filter_index+" : Please select 'Attribute'.");
			
			valid = false;
			
		};
		
	};
	
	
	
	
		
	return valid;
}






function validate_filter_all()
{

	

	if ($(".filter_ul li").length>0){
	
		for (var i=1; i<=$(".filter_ul li").length; i++){
			
			console.log("validate_filter_all : i = "+1);
			
			if (!validate_filter(i)){
				
				console.log("validate_filter_all : not valid : i = "+1);
				
				
				return false
				
			};
			
		}
		
	}
	else{
		

		$(".filter_message")
			.removeClass("success_message").addClass("error_message")
			.css({"opacity":1})
			.text("Create one or more filters to create cluster");
		
		
		setTimeout(function() {
			
			$(".filter_message")
				.removeClass("error_message").addClass("success_message")
				.css({"opacity":0})
				.text("");
		  
		}, 5000);
	
		return false;
		
	}
		
	


	return true;
}








function draw_filter()
{
	
	var rnd = random_string(2);
	
		$("<li class='ui-state-default'>" +
				
			"<div class='toolbox_section cluster_template_section ' data-filter_index="+filter_index+ ">"+
			
			"<div class='filter_index bold_text'> " + filter_index + " </div>" +

			
			"<div class='dropdown_group attribute_dropdown' data-selector_type='attribute'>"+
				"<button class='dropdown_btn normal_text bold_text' data-value='none' >Select Attribute</button>"+
				"<div class='dropdown_content small_text'>"+
				    "<div class='dropdown_content_elem' data-attr_name='Age' data-attr_value='age'>Age</div>"+
				    "<div class='dropdown_content_elem' data-attr_name='Visit Count' data-attr_value='visit_count'>Visit Count</div>"+
				    "<div class='dropdown_content_elem' data-attr_name='Purchase Count' data-attr_value='purchase_count'>Purchase Count</div>"+
				    "<div class='dropdown_content_elem' data-attr_name='Total Purchase Amount' data-attr_value='total_purchase_amount'>Total Purchase Amount</div>"+					    
				    "<div class='dropdown_content_elem' data-attr_name='Cart Exit Count' data-attr_value='cartexit_count'>Cart Exit Count</div>"+
				"</div>"+
			"</div>"+


			"<div class='filter_dash normal_text bold_text'> &#8212; </div>"+


			"<div class='filter_words normal_text'> From </div>"+
			
			"<div class='dropdown_group value_dropdown value_dropdown_min  ' data-selector_type='value_dropdown'>"+
				"<input type='input' class='dropdown_input normal_text bold_text value_input_text_1' " +
					"placeholder='Value'  name='name'  value='' required />" + 
				
				"<div class='dropdown_content small_text'>"+
				    "<div class='dropdown_content_elem' data-attr_name='Min' data-attr_value='eq'> Min </div>"+
				    
			    "</div>"+
			"</div>"+
			
			"<div class='filter_words normal_text'> To </div>"+
			
			"<div class='dropdown_group value_dropdown value_dropdown_max ' data-selector_type='value_dropdown'>"+
				"<input type='input' class='dropdown_input normal_text bold_text value_input_text_2' placeholder='Value'  name='name'  value='' required />" +
				
				"<div class='dropdown_content small_text'>"+
				    "<div class='dropdown_content_elem' data-attr_name='Max' data-attr_value='eq'> Max </div>"+
				    
			    "</div>"+
			"</div>"+
			

			
			
			
			"<div class='filter_cancel_btn filter_cancel_btn_"+rnd+" delete_btn'>  </div>" +

			
		"</div>" +
		"</li>")
		.appendTo(".filter_ul")
		;
		
		
		

		
		$(".dropdown_content_elem").click(function(){
					
			var dropdown_group = $(this).parent().parent();
			
			console.log(dropdown_group.data("selector_type"));
			
			
			if (dropdown_group.data("selector_type")=="value_dropdown"){
				
				var dropdown_input = dropdown_group.find(".dropdown_input");
				
				dropdown_input.data("name",$(this).data("attr_name"));
				dropdown_input.data("value",$(this).data("attr_value"));
				
				dropdown_input.val($(this).data("attr_name"));
				

				
			};
			
			
			var dropdown_btn = dropdown_group.find(".dropdown_btn");
			
			dropdown_btn.data("name",$(this).data("attr_name"));
			dropdown_btn.data("value",$(this).data("attr_value"));

			
			
			dropdown_btn.html($(this).data("attr_name"));
			dropdown_btn.val($(this).data("attr_name"));
			
			
		});
		
		
		
		$(".filter_cancel_btn_"+rnd).click(function(){
			
			
			var deleted_filter_index = $(this).parent().find(".filter_index").text();
			
			
			$(this).parent().parent().remove();
			
			var filter_size = $(".filter_ul .filter_index").length;
			
			
			
			
			
			
			$(".filter_ul .filter_index").each(function(i,data_elem){
				
				
//				console.log("i = "+i);
//				console.log(data_elem);
//				console.log("i="+$(data_elem).text());
//				
				var this_filter_index = parseInt($(data_elem).text());
				
				
				
				if (deleted_filter_index < this_filter_index){
					
					console.log("this_filter_index = "+this_filter_index);
					
					this_filter_index = this_filter_index - 1;
				
					$(data_elem).text(this_filter_index);
					
					$(data_elem).parent().data("filter_index",filter_index);
					
					filter_index = filter_index - 1;
					
				};
				
				
				if (filter_size==(i+1)){
					
//					$(this).parent().remove();
					
					filter_index = filter_size + 1;
					
				};
				
				
			})
			
			
//			$(this).parent().remove();
//			
//			filter_index = filter_index - 1;
			
			
			

		});
		

}





function get_cluster_template()
{
	var deferred = new $.Deferred();
	
	$.ajax({
		type: "POST",
	    url: "clustertemplate/get/byId",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify( {
	    	"dashboardUserId":  "parnil@qfour.com",
	    	"clusterTemplateId" : current_cluster_template_id
	    	
	    }),
	    success: function(data)
	    {
//	    	console.log(data);
//	    	console.log(data.length);
	    	cluster_template_data = data[0];
	    	
	    
	    	
	    	deferred.resolve(cluster_template_data);
	 	    	    
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



function set_cluster_template()
{
	var deferred = new $.Deferred();
	
	$.ajax({
		type: "POST",
	    url: "clustertemplate/set",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify( {
	    	"dashboardUserId":  "parnil@qfour.com",
	    	"name":  $(".cluster_template_name_input_text").val(),
	    	"filterListJson":  JSON.stringify(filter_list_data),

	    }),
	    success: function(data)
	    {
	    	console.log(data);

	    	
	    	cluster_template_data = data;
	    	
	    
	    	
	    	deferred.resolve(cluster_template_data);
	 	    	    
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



function get_cluster_analysis()
{
	var deferred = new $.Deferred();
	
	$.ajax({
		type: "POST",
	    url: "clusteranalysis/get",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify( {
	    	"dashboardUserId":  "parnil@qfour.com",
	    	"clusterTemplateId":  current_cluster_template_id,
	    	"filterListJson":  JSON.stringify(filter_list_data),

	    }),
	    success: function([data])
	    {
//	    	console.log(data);

	    	
	    	cluster_analysis_data = data;
	    
	    	
	    	deferred.resolve(cluster_analysis_data);
	 	    	    
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





function compute_cluster_analysis()
{
	var deferred = new $.Deferred();
	
	
	console.log(current_cluster_template_id);
	
	$.ajax({
		type: "POST",
	    url: "clusteranalysis/start",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify( {
	    	"dashboardUserId":  "parnil@qfour.com",
	    	"clusterTemplateId":  current_cluster_template_id,
	    	"filterListJson":  JSON.stringify(filter_list_data),

	    }),
	    success: function(data)
	    {
	    	console.log(data);

	    	
	    	cluster_template_data = data;
	    
	    	
	    	deferred.resolve(cluster_template_data);
	 	    	    
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


