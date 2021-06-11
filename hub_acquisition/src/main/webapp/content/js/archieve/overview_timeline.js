var x_invert = null;
//        console.log(x_invert);
        
var y_invert_array = [0,0,0];
       
var marker_mouse_x = 0;
var marker_mouse_y = 0;

var marker_count = 0;


var marker_coord = [[0,0],[0,0]];

var chart_indicator_array = [[],[]];


var overall_timeline_data = null;

var overall_timeline_ratio_data = {};

var weekly_conversion_data = {};

var dayofyear_conversion_data = {};

var dayofmonth_conversion_data = {};

var top_5_weekly_conversion_data = [];
var top_5_dayofyear_conversion_data = {};
var top_5_dayofmonth_conversion_data = {};








function init_overview_timeline()
{
	
    $("<div class='layer1 left_col col'> </div>").appendTo(".main_content");
    
    draw_overview_timeline_tool();
    
    draw_overview_timeline_ratio_tool();
    
    draw_conversion_dwm_tool();
    
    Promise.all([get_all_overall_timeline()]).then(function (){
	    
//	    console.log(overall_timeline_data);
	    
	    update_overview_timeline_tool();	
	    
	    
	    
	    Promise.all([compute_ratios()]).then(function (){
	    	
		    console.log(overall_timeline_ratio_data);
		    
		    update_overview_timeline_ratio_tool();
		    
		    update_conversion_dwm_tool(weekly_conversion_data);
		    


	    }); 
	    
	    
	});   
    
}




function draw_conversion_dwm_tool()
{
    var tool_class_name = "conversion_dwm";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*11;
	var tool_max_h = su*8;

	
	
	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Conversion Predictor </div>"+
			"<div class='tool_box_header_btn up_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<div class='tool_box_content_comment'> Ratios over entire timeline</div>"+
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin' height=420> </svg>"+
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
	


	$(tool_dot_class_name+" .up_btn ").click(function(){
		
		console.log("up_btn");
		
		var dim = $(tool_dot_class_name)[0].getBoundingClientRect();
		
		console.log(dim);

		window.scrollTo(0, dim.y+window.scrollY-gap_su_1);
		
	});
	

//	draw_chart_legends($(tool_dot_class_name+" .tool_box_content"),{x:(tool_w-su*6),y:(su+su_3)})

	draw_checkbox();
	
	height_cascade();
    
}



function update_conversion_dwm_tool( conversion_data )
{
	
//	console.log("overview_time");
	
	
	var svg_class_name = "conversion_dwm_svg ";

	var svg_dot_class_name = " .conversion_dwm_svg ";
	
	var margin = {top: lu_3, right: lu_3, bottom: lu_3, left: lu_3};

	var this_chart_w = lu*10;
	var this_chart_h = su*6;

	d3.select(".conversion_dwm_svg g").remove();

	var y_scale_extent = d3.extent(conversion_data, d => {
		return new Date(d.timeStamp);			
	});
	
	var top_5_conversion_data=[];
	var unit_of_time = "";
	var no_of_ticks = 10 ;
	var today_time_unit = 0;
	var today_date = new Date();
	if (conversion_data.length==53){
		unit_of_time="w";
		no_of_ticks=26;
		today_time_unit = today_date.getWeek();
		top_5_conversion_data = top_5_weekly_conversion_data;
		};
	if (conversion_data.length==366){
		unit_of_time="D";
		no_of_ticks=366/24;
		today_time_unit = today_date.getDayOfYear();
		top_5_conversion_data = top_5_dayofyear_conversion_data;
		};
		
	if (conversion_data.length==31){
		unit_of_time="D";
		no_of_ticks=31;
		today_time_unit = today_date.getDate();
		top_5_conversion_data = top_5_dayofmonth_conversion_data;
		};
	
	
	
	
	var chart_g = d3.select(".conversion_dwm_svg")
                                    		.append("g")
                                    		.attr("x",0)
                                    		.attr("y",0)
                                    		;

	
	
	
	var x_scale = d3.scaleLinear()
    				.range([ margin.left, this_chart_w ])
//            			.domain([0,d3.extent(conversion_data, d => {return d.timeStamp;})[1]] )
            			.domain( d3.extent(conversion_data, d => {return d.timeStamp;}) )
            			;
    		    
    var y_scale = d3.scaleLinear()
    				.range([this_chart_h, margin.right])
    				.domain([0,100])
//    				.nice()
    				;
	
    var xAxis = d3.axisBottom(x_scale)
    			.ticks(no_of_ticks)
//    			.tickSize(0)
    			.tickFormat(function(d){
    				
    			    return (d+unit_of_time)
    			 })
    			;
    			
	var yAxis = d3.axisLeft(y_scale)
//			.ticks(3)
			.tickFormat(function(d){
    				
    			    return (d+"%")
    		})
			;


	chart_g.append("g")
        		  .attr("class", "x_axis")
        		  .attr("transform", "translate("+margin.left+"," + (this_chart_h) + ")")
        		  .call(xAxis)
        		  ;
	
	chart_g.append("g")
    		      .attr("class", "y_axis")
         		  .attr("transform", "translate("+(margin.left+margin.right)+","+(0)+")")
    		      .call(yAxis)	
    		      ;
	
	var visit_to_purchase_line = d3.line()
            		    .curve(d3.curveLinear)
//            		    .defined(d => !isNaN(d.touchCount))
//            		    .defined(d => d.touchType==1)
            		    .x(d => {
            		    	
            		    	return x_scale(d.timeStamp)+margin.left;
            		    })
            		    .y(d => {
            		    	var _ratio = d.purchaseCount/d.visitCount;
            		    	
//            		    	console.log(_ratio);   
            		    	if (_ratio<0){
            		    		
            		    		_ratio=0;
            		    		
            		    	};
            		    	if (_ratio>=1){
            		    		
            		    		_ratio=1;
            		    		
            		    	};
            		    	if (isNaN(_ratio)){_ratio=0};
            		    	if (!isFinite(_ratio)){_ratio=1};
            		    	if (_ratio==null){_ratio=0};
            		    	
            		    	return y_scale(_ratio*100)-1;
            		    });
	
	
	
	
	chart_g.append("path")
//						  .datum(overall_timeline_data)
						  .attr("class", "converstion_dwm_line")
						  .datum(function(){
							  
							  return [{
								  		visitCount:0,
								  		purchaseCount:0,
								  		cartexitCount:0,
//								  		timeStamp:(new Date()).getTime()
								  		timeStamp:y_scale_extent[0]
								  		
								  	 }]
							  		 .concat(conversion_data)
							  		 .concat(
							  		 [{
							  			visitCount:0,
								  		purchaseCount:0,
								  		cartexitCount:0,
							  			timeStamp:y_scale_extent[1]                        			
                                	 }]);
							  
//							  return overall_timeline_data.filter(d => d.touchType==1);
						  })
            		      .attr("fill", "none")
            		      .attr("stroke", colors.visit)
            		      .attr("stroke-width", 1)
            		      .attr("stroke-linejoin", "round")
            		      .attr("stroke-linecap", "round")
            		      .attr("stroke-opacity", 0.666)
            		      .attr("fill", "url(#full_visit_gradient)")
//            		      .attr("fill", colors.visit)            		      
//            		      .attr("fill-opacity",0.1)
            		      .attr("d", visit_to_purchase_line)
					      .on("mouseenter",function(d){           
					    	  draw_svg_tooltip("Visits",chart_g,d3.mouse(this));
					    	  d3.select(this).attr("fill-opacity",0.3);
					      })
					      .on("mouseleave",function(e){
					    	  d3.select(this).attr("fill-opacity",0.1);
					    	  remove_tooltip();                        		
                          })
                          ;
	
	
	
	var draw_today_marker = function(inverse_direction)
	{

//		today_time_unit = 52;
//		console.log(today_time_unit);
		
		
		
		var direction = 0;
		if ((x_scale(today_time_unit)+margin.left+0.5-su_2)<this_chart_w-su_2){
			direction = 1;
		};
		if (inverse_direction>0){
			direction = (direction>0)? 0:1;
		};

		
		var today_marker = chart_g
								.append("g")
								.attr("class", "today_marker")
								.attr("transform","translate(" + (x_scale(today_time_unit)+margin.left+0.5-su_2) + "," + su*2 +")");
								;
								
								
		today_marker.append("path")     
				    .style("stroke", "var(--blue_color)")
				    .style("stroke-width", "2px")
				    .style("stroke-linecap", "round")
				    .style("stroke-linejoin", "arcs")
				    .style("opacity", 1)
				    .attr("d", function() {
				    	var d = "m 30 240 l 0 -220 m 0 0 l " +
				    			((direction>0)?30:-30)+" -20";  
				    	return d;
				    });
		today_marker
			.append("text")			
			.text("Today")
			.attr("x",((direction>0)?66:-6))
			.attr("class","chart_main_axis_title")
			.style("fill", "var(--blue_color)")
			.style("text-anchor", ((direction>0)?"start":"end") )
			;
	};
	
	draw_today_marker(0);
	
	
	
	
	
	
	
	var draw_nextopportunity_marker = function()
	{
//		console.log(top_5_conversion_data);

		var _diff_array = top_5_conversion_data.map(d=>{return d.timeStamp - today_time_unit});
		
		
		
		var _extent = d3.extent(_diff_array);
		
		var _min_extent = _extent[0];
		var _max_extent = _extent[1];
		
		
		
		var selected_diff = 0;
		
		if ((_max_extent<0)&&(_min_extent<0)){
			selected_diff = _min_extent;
		};
		
		if (_min_extent>=0){
			selected_diff = _min_extent;

		}
		else{
			selected_diff = _max_extent;

		};

//		console.log("selected_diff:=");
//		console.log(selected_diff);
		
		

		var next_optimum_data = top_5_conversion_data[_diff_array.indexOf(selected_diff)];
		
		
		var direction = 0;
		if ((x_scale(next_optimum_data.timeStamp)+margin.left+0.5-su_2)<this_chart_w-su_2){
			direction = 1;
		};

		var next_marker = chart_g
							.append("g")
							.attr("class", "next_marker")
							.attr("transform","translate(" + (x_scale(next_optimum_data.timeStamp)+margin.left+0.5-su_2) + "," + su*2 +")");					
							;

							
		next_marker.append("path")     
				    .style("stroke", "var(--green_color)")
				    .style("stroke-width", "2px")
				    .style("stroke-linecap", "round")
				    .style("stroke-linejoin", "arcs")
				    .style("opacity", 1)
				    .attr("d", function() {
				    	var d = "m 30 240 l 0 -220 m 0 0 l " +
				    			((direction>0)?30:-30)+" -20";  
				    	return d;
				    });

		next_marker
			.append("text")			
			.text("Next Best")
			.attr("x",((direction>0)?66:-6))
			.attr("class","chart_main_axis_title")
			.style("fill", "var(--green_color)")
			.style("text-anchor", ((direction>0)?"start":"end") )
			;	
		
		
		console.log(x_scale(selected_diff));
		
    	var dim1 = $(".today_marker")[0].getBoundingClientRect();;
    	var dim2 = $(".next_marker")[0].getBoundingClientRect();;

		console.log(dim1);
		console.log(dim2);

		
		if ((dim1.x+dim1.width+su_8)>dim2.x){
			
			d3.select(".today_marker").remove();
			
			draw_today_marker(1);

		};
		
		
	};
	
	draw_nextopportunity_marker();

	
	
	
	
	
	
	chart_g
		.append("text")			
		.text("Conversion Percentage")
		.attr("class","chart_main_axis_title")
		.attr("x",0)
		.attr("y",(this_chart_h/2))
		.style("text-anchor", "middle")
		.attr("transform", "rotate(-90,12,"+(this_chart_h/2)+")");
		;
	
	chart_g
		.append("text")			
		.text("Time")
		.attr("class","chart_main_axis_title")
		.attr("x",(this_chart_w/2+margin.left))
		.attr("y",(this_chart_h+margin.bottom))
		.style("text-anchor", "middle")
		;


	
	
	
	

    var lines = document.getElementsByClassName('converstion_dwm_line');

	
	var mouseG = chart_g.append("g").attr("class", "mouse-over-effects");

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
    			  .attr("class", "mouse-circle converstion_dwm_indicator")
			      .attr("r", 5)			      
			      ;
  
    
    
    
    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', (this_chart_w-margin.right)) // can't catch mouse events on a g element
      .attr('height', this_chart_h)
      .attr('x',  margin.right+margin.left)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('dblclick', function() { // on mouse in show line, circles and text


      })
      .on('click', function() { // on mouse in show line, circles and text
    	  


      })
      .on('mouseout', function() { // on mouse out hide line, circles and text
    	  
    	  d3.select(svg_dot_class_name+" .mouse-line")
		          	.style("opacity", 0)	          	
		          	;
    	  
    	  d3.select(svg_dot_class_name+" .mouse-circle")
	  				.style("opacity", 0)
	  				;
    	  
    	  $(" .modal_chart_indicator").remove();

      })
      .on('mouseover', function() { // on mouse in show line, circles and text
    	  
//    	  console.log("mouseover");
    	  
    	  d3.select(svg_dot_class_name+" .mouse-line")
	        .style("opacity",1);
    	  
    	  d3.select(svg_dot_class_name+" .mouse-circle")
          	.style("opacity", 1);
    	  
      })
      .on('mousemove', function() { // mouse moving over canvas
    	  
    	  
        var mouse = d3.mouse(this);
        
//        console.log(mouse);
        
        d3.select(svg_dot_class_name+" .mouse-line")
          .attr("d", function() {
        	  var d = "M" + (mouse[0]) + "," + (this_chart_h);
        	  d += " " + (mouse[0]) + "," + 25;
        	  return d;
          });
        
        
        
        
        
        x_invert = x_scale.invert(mouse[0]-margin.right);
//        console.log(x_invert);
        
        y_invert_array = Array.apply(null, new Array(lines.length)).map(Number.prototype.valueOf,0);

        
        for (var i=0; i<lines.length; i++){
        	
        	var end_y = lines[i].getTotalLength();
        	var beginning_y = 0;
             
            var target_y = null;
            
            while (true){
            	
            	target_y = Math.floor((beginning_y + end_y) / 2);
            	pos_y = lines[i].getPointAtLength(target_y);
            	if ((target_y === end_y || target_y === beginning_y) && pos_y.x !== mouse[0]) {
            		break;
            		
            	}
            	if (pos_y.x > mouse[0]) end_y = target_y;
            	else if (pos_y.x < mouse[0]) beginning_y = target_y;
            	else break; //position found
            }
            
          
            
            if (i==0){
//            	console.log("visit_indicator");
            	d3.select(svg_dot_class_name+" .converstion_dwm_indicator")
            		.attr("transform","translate(" + mouse[0] + "," + pos_y.y +")");
            	
            	y_invert_array[0]= y_scale.invert(pos_y.y);
            	
            }
           
            
            if (i+1==lines.length){
            	
            	var dim = $(".conversion_dwm")[0].getBoundingClientRect();;
 	            
 	    	    marker_mouse_x = mouse[0];
 	    	    marker_mouse_y = dim.y;	    
 	    	    
 	    	    
// 	    	    if (conversion_data.length==31){};
 	    	    
 	    	    var y_axis_value = Math.floor(x_invert);
 	    	    
 	    	    draw_modal_conversion_dwm_indicator(mouse[0]+dim.x,dim.y+su+su_4,[y_axis_value,y_invert_array]);
 	         
            }
            
        	
        }
        
	
      });	

    
    
    
}




function draw_checkbox()
{

	console.log("draw_checkbox - ");
	
	
	var dim = d3.select(".conversion_dwm").node().getClientRects()[0];
	var radio_html_w = 167;
//	console.log("draw_checkbox : dim:=");
//	console.log(dim);
	
	
	var radio_html = $('<div class="large_chart_radio small_text"> '+
			              '<input type="radio" id="option-one" value="weekly" name="selector" checked>'+
			              '<label for="option-one">Weekly</label>'+
			              '<input type="radio" id="option-two" value="monthly" name="selector">'+
			              '<label for="option-two">Monthly</label>'+
			              '<input type="radio" id="option-three" value="yearly" name="selector">'+
			              '<label for="option-three">Yearly</label></div>') 
			              ;
	
	
	
	
	
	$(".conversion_dwm .tool_box_content").append(radio_html);
	


	
	
	
	radio_html.css("top",(su+su_2));
	radio_html.css("left",( su+su_2 ) );

	
	$( "input[type=radio]" ).on( "click", function(d){
		
		console.log("draw_checkbox : $(this):=");
		console.log($(this));
		
		console.log("draw_checkbox : $(this).val:=");
		console.log($(this).val());
		
		console.log("draw_checkbox : $(this).is(:checked):=");
		console.log($(this).is(":checked"));
//		.removeAttr('checked');
		if ($(this).is(":checked")){
			
			if ($(this).val()==="weekly"){
				
				update_conversion_dwm_tool(weekly_conversion_data);
				 				    
			};
			if ($(this).val()==="monthly"){
				
				update_conversion_dwm_tool(dayofmonth_conversion_data);
				
			};
			if ($(this).val()==="yearly"){
				
				update_conversion_dwm_tool(dayofyear_conversion_data);
				
			};
			
			
		}; 
		
		
	});

	
	
	
}




function draw_modal_conversion_dwm_indicator(mouse_x,mouse_y,chart_indicator_data)
{
	
	var tool_w = su*4;
//	var tool_max_h = su*2;
	
//	console.log(chart_indicator_data);
	

	var y_axis_value = chart_indicator_data[0];
	
	
	
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
							y_axis_value +
						"</div> "+
					"</div>"+
					"<div class='modal_chart_indicator_row small_text'> " +
						"<div class='modal_chart_indicator_row_name small_text bold_text visit_text'> Converion Percentage </div> "+
						"<div class='modal_chart_indicator_row_value conversion_perc normal_text '> "+ parseFloat(chart_indicator_data[1][0]).toFixed(1)+"% </div> "+					
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
		$(".date_value").text( y_axis_value );
		$(".conversion_perc").text(parseFloat(chart_indicator_data[1][0]).toFixed(1)+"%");
		
		
	}
	
}















function draw_overview_timeline_ratio_tool()
{
    var tool_class_name = "overview_timeline_ratio";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*11;
	var tool_max_h = su*8;

	
	
	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Conversion Ratio </div>"+
			"<div class='tool_box_header_btn up_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<div class='tool_box_content_comment'> Ratios over entire timeline</div>"+
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin' height=420> </svg>"+
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
	


	$(tool_dot_class_name+" .up_btn ").click(function(){
		
		console.log("up_btn");
		
		var dim = $(tool_dot_class_name)[0].getBoundingClientRect();
		
		console.log(dim);

		window.scrollTo(0, dim.y+window.scrollY-gap_su_1);
		
	});
	


	
	height_cascade();
    
}





function update_overview_timeline_ratio_tool()
{
	
//	console.log("overview_time");
	
	
	var svg_class_name = "overview_timeline_ratio_svg ";

	var svg_dot_class_name = " .overview_timeline_ratio_svg ";
	
	var margin = {top: lu_3, right: lu_3, bottom: lu_3, left: lu_3};

	var this_chart_w = lu*10;
	var this_chart_h = su*6;
	
	var y_scale_extent = d3.extent(overall_timeline_ratio_data, d => {
		return new Date(d.timeStamp);			
	});
	
	
	
	var chart_g = d3.select(".overview_timeline_ratio_svg")
                                    		.append("g")
                                    		.attr("class","overall_time_chart")
                                    		.attr("x",0)
                                    		.attr("y",0)
                                    		;

	d3.select(".overview_timeline_ratio_svg")
						  .append("defs").append("clipPath")
						    .attr("id", "ratio_chart_clip")
						  .append("rect")
						  	.attr("x", (margin.right*2))
						  	.attr("y", (0))
						    .attr("width", this_chart_w-margin.right*2)
						    .attr("height", this_chart_h+margin.top);
	
	
	var x_scale = d3.scaleUtc()
    				.rangeRound([margin.left, this_chart_w])
            			.domain(d3.extent(overall_timeline_ratio_data, d => {
            				
            				var datetime = new Date(d.timeStamp);

            				
            				return datetime;
            				
            			})
            			)
            			;
    		    
    var y_scale = d3.scaleLinear()
    				.range([this_chart_h, margin.right])
    				.domain([0,100])
//    				.nice()
    				;
	
    var xAxis = d3.axisBottom(x_scale)
//    			.tickSize(0)
    			.tickFormat(d3.timeFormat("%b-%y"))
    			;
    			
	var yAxis = d3.axisLeft(y_scale)
//			.ticks(3)
			.tickFormat(function(d){
    				
    			    return (d+"%")
    		})
			;


	chart_g.append("g")
        		  .attr("class", "x_axis")
        		  .attr("transform", "translate("+margin.left+"," + (this_chart_h) + ")")
        		  .call(xAxis)
        		  ;
	
	chart_g.append("g")
    		      .attr("class", "y_axis")
         		  .attr("transform", "translate("+(margin.left+margin.right)+","+(0)+")")
    		      .call(yAxis)	
    		      ;
	
	var visit_to_purchase_line = d3.line()
            		    .curve(d3.curveLinear)
//            		    .defined(d => !isNaN(d.touchCount))
//            		    .defined(d => d.touchType==1)
            		    .x(d => {
            		    	
            		    	return x_scale(new Date(d.timeStamp))+margin.right;
            		    })
            		    .y(d => {
            		    	var _ratio = d.purchaseCount/d.visitCount;
            		    	
//            		    	console.log(_ratio);   
            		    	if (_ratio<0){
            		    		
            		    		console.log(d);
            		    		_ratio=0;
            		    		
            		    	};
            		    	if (_ratio>=1){
            		    		
            		    		_ratio=1;
            		    		
            		    	};
            		    	if (isNaN(_ratio)){_ratio=0};
            		    	if (!isFinite(_ratio)){_ratio=1};
            		    	if (_ratio==null){_ratio=0};
            		    	
            		    	return y_scale(_ratio*100)-1;
            		    });
	
	
	
	
	chart_g.append("path")
//						  .datum(overall_timeline_data)
						  .attr("class", "visit_to_purchase_line")
						  .datum(function(){
							  
							  return [{
								  		visitCount:0,
								  		purchaseCount:0,
								  		cartexitCount:0,
//								  		timeStamp:(new Date()).getTime()
								  		timeStamp:y_scale_extent[0]
								  		
								  	 }]
							  		 .concat(overall_timeline_ratio_data)
							  		 .concat(
							  		 [{
							  			visitCount:0,
								  		purchaseCount:0,
								  		cartexitCount:0,
							  			timeStamp:y_scale_extent[1]                        			
                                	 }]);
							  
//							  return overall_timeline_data.filter(d => d.touchType==1);
						  })
						  .attr("clip-path", function(){ return 'url("#time_chart_clip")';})
            		      .attr("fill", "none")
            		      .attr("stroke", colors.visit)
            		      .attr("stroke-width", 1)
            		      .attr("stroke-linejoin", "round")
            		      .attr("stroke-linecap", "round")
            		      .attr("stroke-opacity", 0.666)
            		      .attr("fill", "url(#visit_gradient)")
//            		      .attr("fill", colors.visit)
//            		      .attr("fill-opacity",0.1)
            		      .attr("d", visit_to_purchase_line)
					      .on("mouseenter",function(d){           
					    	  draw_svg_tooltip("Visits",chart_g,d3.mouse(this));
					    	  d3.select(this).attr("fill-opacity",0.3);
					      })
					      .on("mouseleave",function(e){
					    	  d3.select(this).attr("fill-opacity",0.1);
					    	  remove_tooltip();                        		
                          })
                          ;
	
	
	
	
	
	chart_g
		.append("text")			
		.text("Conversion Percentage")
		.attr("class","chart_main_axis_title")
		.attr("x",0)
		.attr("y",(this_chart_h/2))
		.style("text-anchor", "middle")
		.attr("transform", "rotate(-90,12,"+(this_chart_h/2)+")");
		;
	
	chart_g
		.append("text")			
		.text("Time")
		.attr("class","chart_main_axis_title")
		.attr("x",(this_chart_w/2+margin.left))
		.attr("y",(this_chart_h+margin.bottom))
		.style("text-anchor", "middle")
		;


	
	
	
	

    var lines = document.getElementsByClassName('visit_to_purchase_line');

	
	var mouseG = chart_g.append("g").attr("class", "mouse-over-effects");

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
    			  .attr("class", "mouse-circle conversion_ratio_indicator")
			      .attr("r", 5)			      
			      ;
  
    
    
    
    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', (this_chart_w-margin.right-margin.left)) // can't catch mouse events on a g element
      .attr('height', this_chart_h)
      .attr('x',  margin.right+margin.left)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('dblclick', function() { // on mouse in show line, circles and text


      })
      .on('click', function() { // on mouse in show line, circles and text
    	  


      })
      .on('mouseout', function() { // on mouse out hide line, circles and text
    	  
    	  d3.select(svg_dot_class_name+" .mouse-line")
		          	.style("opacity", 0)	          	
		          	;
    	  
    	  d3.select(svg_dot_class_name+" .mouse-circle")
	  				.style("opacity", 0)
	  				;
    	  
    	  $(" .modal_chart_indicator").remove();

      })
      .on('mouseover', function() { // on mouse in show line, circles and text
    	  
    	  console.log("mouseover");
    	  
    	  d3.select(svg_dot_class_name+" .mouse-line")
//    	  mousePerLine
	        .style("opacity",1);
    	  
    	  d3.select(svg_dot_class_name+" .mouse-circle")
          	.style("opacity", 1);
    	  
    	  console.log( d3.select(svg_dot_class_name+" .mouse-line"));

      })
      .on('mousemove', function() { // mouse moving over canvas
    	  
    	  
        var mouse = d3.mouse(this);
        
//        console.log(mouse);
        
        d3.select(svg_dot_class_name+" .mouse-line")
//        mousePerLine
          .attr("d", function() {
        	  var d = "M" + (mouse[0]) + "," + (this_chart_h);
        	  d += " " + (mouse[0]) + "," + 25;
        	  return d;
          });
        
        
        
        
        
        x_invert = x_scale.invert(mouse[0]-margin.right);
//        console.log(x_invert);
        
        y_invert_array = Array.apply(null, new Array(lines.length)).map(Number.prototype.valueOf,0);

        
        for (var i=0; i<lines.length; i++){
        	
        	var end_y = lines[i].getTotalLength();
        	var beginning_y = 0;
             
            var target_y = null;
            
            while (true){
            	
            	target_y = Math.floor((beginning_y + end_y) / 2);
            	pos_y = lines[i].getPointAtLength(target_y);
            	if ((target_y === end_y || target_y === beginning_y) && pos_y.x !== mouse[0]) {
            		break;
            		
            	}
            	if (pos_y.x > mouse[0]) end_y = target_y;
            	else if (pos_y.x < mouse[0]) beginning_y = target_y;
            	else break; //position found
            }
            
          
            
            if (i==0){
//            	console.log("visit_indicator");
            	d3.select(svg_dot_class_name+" .conversion_ratio_indicator")
            		.attr("transform","translate(" + mouse[0] + "," + pos_y.y +")");
            	

            	
            	y_invert_array[0]= y_scale.invert(pos_y.y);
            	
            }
           
            
            if (i+1==lines.length){
            	var dim = $(".overview_timeline_ratio")[0].getBoundingClientRect();;
 	            
 	    	    marker_mouse_x = mouse[0];
 	    	    marker_mouse_y = dim.y;	    	    	    
 	    	    
 	    	    draw_modal_timeline_ratio_indicator(mouse[0]+dim.x,dim.y+su+su_4,[x_invert,y_invert_array]);
 	         
            }
            
        	
        }
        
	
      });	
    
    
    
    

	
    chart_g.call(zoom);

	
	
	
	
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

//			console.log("zoomed");
			
			var zoom_scale = d3.event.transform.k;

//			console.log("zoom_scale = "+zoom_scale);
			
			x_scale
//				.rangeRound([margin.right, this_chart_w]
				.range([margin.left, this_chart_w - margin.right]
				.map(d => d3.event.transform.applyX(d)));

			svg.select(".visit_to_purchase_line")
				.attr("d", visit_to_purchase_line);
			
			

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









function draw_modal_timeline_ratio_indicator(mouse_x,mouse_y,chart_indicator_data)
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
						"<div class='modal_chart_indicator_row_name small_text bold_text visit_text'> Converion Percentage </div> "+
						"<div class='modal_chart_indicator_row_value conversion_perc normal_text '> "+ parseFloat(chart_indicator_data[1][0]).toFixed(1)+"% </div> "+					
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
		$(".conversion_perc").text(parseFloat(chart_indicator_data[1][0]).toFixed(1)+"%");
		
		
	}
	
}











function draw_overview_timeline_tool()
{
    var tool_class_name = "overview_time";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*11;
	var tool_max_h = su*8;

	
	
	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Overall Footfall Timeline </div>"+
			"<div class='tool_box_header_btn up_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<div class='tool_box_content_comment'> Footfall of the entire brand over entire timeline</div>"+
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin' height=420> </svg>"+
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
	


	$(tool_dot_class_name+" .up_btn ").click(function(){
		
		console.log("up_btn");
		
		var dim = $(tool_dot_class_name)[0].getBoundingClientRect();
		
		console.log(dim);

		window.scrollTo(0, dim.y+window.scrollY+gap_su_1);
		
	});
	

	draw_chart_legends($(tool_dot_class_name+" .tool_box_content"),{x:(tool_w-su*6),y:(su+su_3)})

	
	height_cascade();
    
}





function update_overview_timeline_tool()
{
	
//	console.log("overview_time");
    
	var margin = {top: lu_3, right: lu_3, bottom: lu_3, left: lu_3};

	var this_chart_w = lu*10;
	var this_chart_h = su*6;
	
	var y_scale_extent = d3.extent(overall_timeline_data, d => {
		return new Date(d.timeStamp);			
	});
	
	
	var overall_time_chart = d3.select(".overview_time_svg")
                                    		.append("g")
                                    		.attr("class","overall_time_chart")
                                    		.attr("x",0)
                                    		.attr("y",0)
                                    		;

	d3.select(".overview_time_svg")
						  .append("defs").append("clipPath")
						    .attr("id", "time_chart_clip")
						  .append("rect")
						  	.attr("x", (margin.right*2))
						  	.attr("y", (0))
						    .attr("width", this_chart_w-margin.right*2)
						    .attr("height", this_chart_h+margin.top);
	
	
	var x_scale = d3.scaleUtc()
    				.rangeRound([margin.left, this_chart_w])
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
                    		  .attr("class", "x_axis")
                    		  .attr("transform", "translate("+margin.left+"," + (this_chart_h) + ")")
                    		  .call(xAxis)
                    		  ;
	
	overall_time_chart.append("g")
                		      .attr("class", "y_axis")
                     		  .attr("transform", "translate("+(margin.left+margin.right)+","+(0)+")")
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
						  .attr("clip-path", function(){ return 'url("#time_chart_clip")';})
            		      .attr("fill", "none")
            		      .attr("stroke", colors.visit)
            		      .attr("stroke-width", 0.75)
            		      .attr("stroke-linejoin", "round")
            		      .attr("stroke-linecap", "round")
            		      .attr("stroke-opacity", 0.666)
            		      .attr("fill", "url(#visit_gradient)")
//            		      .attr("fill", colors.visit)
//            		      .attr("fill-opacity",0.1)
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
						  .attr("clip-path", function(){ return 'url("#time_chart_clip")';})
					      .attr("fill", "none")
					      .attr("stroke", colors.purchase)
					      .attr("stroke-width", 0.75)
					      .attr("stroke-linejoin", "round")
					      .attr("stroke-linecap", "round")
//					      .attr("stroke-opacity", 0.666)
            		      .attr("fill", "url(#purchase_gradient)")
//					      .attr("fill", colors.purchase)
//            		      .attr("fill-opacity",0.1)
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
						  .attr("clip-path", function(){ return 'url("#time_chart_clip")';})
					      .attr("fill", "none")
					      .attr("stroke", colors.cartexit)
					      .attr("stroke-width", 0.75)
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
      .on('dblclick', function() { // on mouse in show line, circles and text
    	  
    	  console.log("remove all");
    	  remove_timeline_marker();
    	  marker_coord = [[0,0],[0,0]];
    	  marker_count = 0;
    	  chart_indicator_array = [[],[]];

      })
      .on('click', function() { // on mouse in show line, circles and text
    	  
    	  
    	  draw_timeline_marker(marker_mouse_x,marker_mouse_y,[x_invert,y_invert_array]);


      })
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
        
        x_invert = x_scale.invert(mouse[0]-margin.right);
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
 	            
 	    	    
 	    	    marker_mouse_x = mouse[0];
 	    	    marker_mouse_y = dim.y;	    	    	    
 	    	    
 	            draw_modal_timeline_indicator(mouse[0]+dim.x,dim.y,[x_invert,y_invert_array]);
 	         
            }
            
        	
        }
        
	
      });	
    
    
    
    
    
    
    
    
}





function remove_timeline_marker()
{
	d3.selectAll(".timeline_marker").remove();
	d3.selectAll(".timeline_marker_overlay").remove();
	$(".total_range_toolbox").remove();

	
	
}





function draw_timeline_marker(mouse_x,mouse_y,chart_indicator_data)
{
//	console.log(mouse_x);
//	console.log(mouse_y);
	console.log(chart_indicator_data);
	
	
	marker_count = marker_count +1;
	

	if (marker_count==1){
		console.log("put marker");
		marker_coord[0][0]=mouse_x;
		marker_coord[0][1]=mouse_y;
		
		chart_indicator_array[0]=chart_indicator_data;
		
		
		_draw();
	}
	else if (marker_count==2){
		console.log("put marker &  compute");
		marker_coord[1][0]=mouse_x;
		marker_coord[1][1]=mouse_y;
		
		chart_indicator_array[1]=chart_indicator_data;
		
		compute_selected_range();
		
		Promise.all([compute_selected_range()]).then(function ([data]){
			
			console.log(data);
			
			if (data[3]>0){
				draw_range_total_toolbox(data);
				
				
				
			}
			else {
				remove_timeline_marker();
			}
			
			
			    
			    
			    
		});   
		    
		
		
		
		_draw_overlay();
		_draw();
	}
	else if (marker_count==3){
		console.log("reset and put marker");
		remove_timeline_marker();
		marker_count = 1;
		marker_coord[0][0]=mouse_x;
		marker_coord[0][1]=mouse_y;
		
		chart_indicator_array[0]=chart_indicator_data;
		
		
		_draw();
		
		
	}
	
	
	function _draw_overlay()
	{
		
		var _x =  ( (marker_coord[0][0] - marker_coord[1][0]) > 0 ) ? marker_coord[1][0] : marker_coord[0][0] ;
		var _y =  ( (marker_coord[0][1] - marker_coord[1][1]) > 0 ) ? marker_coord[0][1] : marker_coord[1][1] ;
		
		console.log(_x);
		console.log(Math.abs( marker_coord[0][0] - marker_coord[1][0] ));
		
		
		d3.select(".overview_time_svg")			
			.append("rect")
			.attr("class","timeline_marker_overlay")
			.attr('width', Math.abs( marker_coord[0][0] - marker_coord[1][0] ) ) 
			.attr('height', su*6-25)
			.attr('x', _x )
			.attr('y', 25 )
		
	}
	
	
	function _draw(){
		
		d3.select(".overview_time_svg")
			.append("line")
			.attr("class","timeline_marker")
			.style("stroke", "black")  
		    .attr("x1", ( mouse_x ) )     
		    .attr("y1", 30)      
		    .attr("x2", mouse_x )     
		    .attr("y2", su*6); 
	
		
		
		var formatted_date = chart_indicator_data[0].getDate() + '-' + (chart_indicator_data[0].getMonth()+1) + '-' + chart_indicator_data[0].getFullYear();

		
		d3.select(".overview_time_svg")
			.append('g:text')
			.attr("class","timeline_marker small_text bold_text")
			.text( formatted_date )
			.style("text-anchor", "middle")
			.attr("x", mouse_x )
			.attr("y", su_8 )
			;
		
		
		
		
	
		d3.select(".overview_time_svg")
			.append('g')
			.attr("class","timeline_marker")
			.selectAll("circle")
			.data(chart_indicator_data[1])
			.enter()
			.append("circle")
			.attr("class", function(d,i){
				var marker_class = "";
				if (i==0){ marker_class="visit_marker"; }
				if (i==1){ marker_class="purchase_marker"; }
				if (i==2){ marker_class="cartexit_marker"; }
				
				return "marker_circle "+marker_class;
			} )
			.attr("r", 5)
			.attr("cx", mouse_x)
			.attr("cy", function(d,i,j){
				
	//			console.log(d);
	//			console.log(i);
	//			console.log(j);
				
				return 25*(i+1);
			})
			;
		
		
		d3.select(".overview_time_svg")
			.append('g')
			.attr("class","timeline_marker")
			.selectAll("text")
			.data(chart_indicator_data[1])
			.enter()
			.append("text")
			.attr("class", function(d,i){
				var marker_class = "";
				if (i==0){ marker_class="visit_marker"; }
				if (i==1){ marker_class="purchase_marker"; }
				if (i==2){ marker_class="cartexit_marker"; }
				
				return "small_text "+marker_class;
			} )
			.text(function(d,i){
		
				return d;
			} )
	//		.text("Footfall")
			.attr("x",mouse_x+su_4)
			.attr("y", function(d,i,j){
				
	//			console.log(d);
	//			console.log(i);
	//			console.log(j);
				
				return 25*(i+1);
			})
			.style("text-anchor", "start")		
			;
		
	}
	

}






function draw_range_total_toolbox(data)
{
	

	var tool_w = lu*2;
	var tool_max_h = su*8;

	
	
	var dim = $(".overview_time .tool_box_content")[0].getBoundingClientRect();
	console.log(dim);
	
	
	
	if ($(".total_range_toolbox").length==0){
		
		 $(
				"<div class='total_range_toolbox'>" +
//					"<div class='modal_export_box_header small_text bold_text'> &nbsp; &nbsp; &nbsp; &nbsp;Download CSVs" +
//						"<div class='modal_export_box_header_btn cancel_btn flat_btn'></div>"+
//		
//					"</div>"+
					"<div class='modal_chart_indicator_content'>" +
						"<div class='modal_chart_indicator_row small_text'> " +

							"<div class='modal_chart_indicator_row_name  small_text bold_text '> Days </div> "+
							"<div class='modal_chart_indicator_row_value  normal_text '> "+data[3]+" </div> "+
						"</div>"+
						"<div class='modal_chart_indicator_row small_text'> " +
							"<div class='modal_chart_indicator_row_name small_text bold_text visit_text'> Visits </div> "+
							"<div class='modal_chart_indicator_row_value   normal_text '> 2343 </div> "+					
						"</div>"+
						"<div class='modal_chart_indicator_row small_text'> " +
							"<div class='modal_chart_indicator_row_name small_text bold_text purchase_text'> Purchases </div> "+
							"<div class='modal_chart_indicator_row_value   normal_text '> 30304 </div> "+
							
						"</div>"+
						"<div class='modal_chart_indicator_row small_text'> " +
							"<div class='modal_chart_indicator_row_name small_text bold_text cartexit_text'> Cart Exits </div> "+
							"<div class='modal_chart_indicator_row_value   normal_text '> 30304 </div> "+
						
						"</div>"+
					"</div>"+
				"</div>" 	
			)
			.css({
				left:(dim.width-tool_w+su_3),
				top: (su+su_3),
				width:(tool_w),
	//			height:tool_max_h,
//				"min-height" : (tool_max_h),
				
			})
			.data("view_status",1)
			.click(function(){
			
			})		
			.appendTo(".overview_time .tool_box_content");
		
		
	};
	
	
	
	
}








function compute_selected_range()
{
	var deferred = new $.Deferred();
	
	var _length = overall_timeline_data.length;
	
	
	
	console.log(chart_indicator_array);
	
	var start_time = (new Date(chart_indicator_array[0][0])).getTime();
	console.log(start_time);
	
	
	var end_time = (new Date(chart_indicator_array[1][0])).getTime();
	console.log(end_time);
	
	
	var total_touchcount_array = [0,0,0,0];

	var day_count = 0;
	
	
	for (var i=0; i<_length; i++){
		
		
		var data_elem = overall_timeline_data[i];
		
//		console.log(data_elem);
		
//		overall_timeline_ratio_data{}
		
		
		
		if ((data_elem.timeStamp > start_time ) && (data_elem.timeStamp < end_time )){
			
			var touchCount = data_elem.touchCount;
			var touchType = data_elem.touchType-1;			
			
			total_touchcount_array[touchType] =  total_touchcount_array[touchType] + touchCount;
//			console.log(total_touchcount_array);

			day_count = day_count+1;
			
		};
		
		
		if (i+1==_length){
			total_touchcount_array[3]=day_count;
			console.log(total_touchcount_array);

			deferred.resolve(total_touchcount_array);
		};
		
	} 
	
	
	return deferred.promise();
}






function compute_ratios()
{
	var deferred = new $.Deferred();
	
	var _length = overall_timeline_data.length;
	
	

	
	
	for (var i=0; i<_length; i++){
				
		var data_elem = overall_timeline_data[i];
		
		
		
		
//		console.log(overall_timeline_ratio_data[data_elem.timeStamp]);
		
//		console.log(overall_timeline_ratio_data[data_elem.timeStamp]==null);
		
		if (overall_timeline_ratio_data[data_elem.timeStamp]==null){
			
			overall_timeline_ratio_data[data_elem.timeStamp]={
					timeStamp : data_elem.timeStamp,
//					touchType : data_elem.touchType,
//					touchCount: data_elem.touchCount, 					
					visitCount : (data_elem.touchType==1)?data_elem.touchCount:0,
					purchaseCount : (data_elem.touchType==2)?data_elem.touchCount:0,
					cartexitCount : (data_elem.touchType==3)?data_elem.touchCount:0,							
			};
			
		}
		else{
			
			if (data_elem.touchType==1){
				overall_timeline_ratio_data[data_elem.timeStamp].visitCount = overall_timeline_ratio_data[data_elem.timeStamp].visitCount +data_elem.touchCount;
			}
			else if (data_elem.touchType==2){
				overall_timeline_ratio_data[data_elem.timeStamp].purchaseCount = overall_timeline_ratio_data[data_elem.timeStamp].purchaseCount +data_elem.touchCount;
			}
			else if (data_elem.touchType==3){
				overall_timeline_ratio_data[data_elem.timeStamp].cartexitCount = overall_timeline_ratio_data[data_elem.timeStamp].cartexitCount +data_elem.touchCount;
			};
			
			
		};
		
		

//		console.log(data_elem);
		
		var date = new Date(data_elem.timeStamp);
		
		var week_of_year = date.getWeek();
		
		var day_of_year = date.getDayOfYear();

		var day_of_month = date.getDate();

		
		

		

		
		if (dayofmonth_conversion_data[day_of_month]==null){
			
			dayofmonth_conversion_data[day_of_month]={
					timeStamp : day_of_month,
//					touchType : data_elem.touchType,
//					touchCount: data_elem.touchCount, 					
					visitCount : (data_elem.touchType==1)?data_elem.touchCount:0,
					purchaseCount : (data_elem.touchType==2)?data_elem.touchCount:0,
					cartexitCount : (data_elem.touchType==3)?data_elem.touchCount:0,							
			};
		}
		else{
			
			if (data_elem.touchType==1){
				dayofmonth_conversion_data[day_of_month].visitCount = dayofmonth_conversion_data[day_of_month].visitCount + data_elem.touchCount;
			}
			else if (data_elem.touchType==2){
				dayofmonth_conversion_data[day_of_month].purchaseCount = dayofmonth_conversion_data[day_of_month].purchaseCount + data_elem.touchCount;
			}
			else if (data_elem.touchType==3){
				dayofmonth_conversion_data[day_of_month].cartexitCount = dayofmonth_conversion_data[day_of_month].cartexitCount + data_elem.touchCount;
			}
			
		};
		
		
		
		
		
		
		
		if (dayofyear_conversion_data[day_of_year]==null){
			
			dayofyear_conversion_data[day_of_year]={
					timeStamp : day_of_year,
//					touchType : data_elem.touchType,
//					touchCount: data_elem.touchCount, 					
					visitCount : (data_elem.touchType==1)?data_elem.touchCount:0,
					purchaseCount : (data_elem.touchType==2)?data_elem.touchCount:0,
					cartexitCount : (data_elem.touchType==3)?data_elem.touchCount:0,							
			};
		}
		else{
			
			if (data_elem.touchType==1){
				dayofyear_conversion_data[day_of_year].visitCount = dayofyear_conversion_data[day_of_year].visitCount + data_elem.touchCount;
			}
			else if (data_elem.touchType==2){
				dayofyear_conversion_data[day_of_year].purchaseCount = dayofyear_conversion_data[day_of_year].purchaseCount + data_elem.touchCount;
			}
			else if (data_elem.touchType==3){
				dayofyear_conversion_data[day_of_year].cartexitCount = dayofyear_conversion_data[day_of_year].cartexitCount + data_elem.touchCount;
			}
			
		};
		
		
		
		
		
		
		
		
		if (weekly_conversion_data[week_of_year]==null){
			
			weekly_conversion_data[week_of_year]={
					timeStamp : week_of_year,
//					touchType : data_elem.touchType,
//					touchCount: data_elem.touchCount, 					
					visitCount : (data_elem.touchType==1)?data_elem.touchCount:0,
					purchaseCount : (data_elem.touchType==2)?data_elem.touchCount:0,
					cartexitCount : (data_elem.touchType==3)?data_elem.touchCount:0,							
			};
		}
		else{
			
			if (data_elem.touchType==1){
				weekly_conversion_data[week_of_year].visitCount = weekly_conversion_data[week_of_year].visitCount + data_elem.touchCount;
			}
			else if (data_elem.touchType==2){
				weekly_conversion_data[week_of_year].purchaseCount = weekly_conversion_data[week_of_year].purchaseCount + data_elem.touchCount;
			}
			else if (data_elem.touchType==3){
				weekly_conversion_data[week_of_year].cartexitCount = weekly_conversion_data[week_of_year].cartexitCount + data_elem.touchCount;
			}
			
		};

		
		
		
		
		
		
		
		
		
		
		
		
		

		
		if (i+1==_length){

			overall_timeline_ratio_data = Object.values(overall_timeline_ratio_data);
			
			weekly_conversion_data = Object.values(weekly_conversion_data);
			
			dayofyear_conversion_data = Object.values(dayofyear_conversion_data);

			dayofmonth_conversion_data = Object.values(dayofmonth_conversion_data);

			
			top_5_weekly_conversion_data = [].concat(weekly_conversion_data)
												.sort(function(b,a) {
													return a.purchaseCount/a.visitCount - b.purchaseCount/b.visitCount;													
												})
												.slice(0,5)
												;
			

			
			top_5_dayofmonth_conversion_data = [].concat(dayofmonth_conversion_data)
													.sort(function(b,a) {
														return a.purchaseCount/a.visitCount - b.purchaseCount/b.visitCount;													
													})
													.slice(0,5)
													;
			
			
			top_5_dayofyear_conversion_data = [].concat(dayofyear_conversion_data)
													.sort(function(b,a) {
														return a.purchaseCount/a.visitCount - b.purchaseCount/b.visitCount;													
													})
													.slice(0,5)
													;


			
			

			deferred.resolve(top_5_dayofyear_conversion_data);
			
		};
		
	} 
	
	
	return deferred.promise();
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





