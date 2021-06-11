



function draw_checkbox()
{

	console.log("draw_checkbox - ");
	
	
	var dim = d3.select(".large_timeline_svg").node().getClientRects()[0];
	var radio_html_w = 167;
//	console.log("draw_checkbox : dim:=");
//	console.log(dim);
	
	
	var radio_html = $('<div class="large_timeline_radio "> '+
			              '<input type="radio" id="option-one" value="hourly" name="selector" checked>'+
			              '<label for="option-one">DAY</label>'+
			              '<input type="radio" id="option-two" value="weekly" name="selector">'+
			              '<label for="option-two">WEEK</label>'+
			              '<input type="radio" id="option-three" value="monthly" name="selector">'+
			              '<label for="option-three">MONTH</label></div>') ;
	
	
	
	
	
	$("#main_screen_div").append(radio_html);
	


	
	
	
	radio_html.css("top",(dim.y+vu/2));
	radio_html.css("left",( dim.x + dim.width - radio_html_w - hu/2) );

	
	$( "input[type=radio]" ).on( "click", function(d){
		
		console.log("draw_checkbox : $(this):=");
		console.log($(this));
		
		console.log("draw_checkbox : $(this).val:=");
		console.log($(this).val());
		
		console.log("draw_checkbox : $(this).is(:checked):=");
		console.log($(this).is(":checked"));
//		.removeAttr('checked');
		if ($(this).is(":checked")){
			
			if ($(this).val()==="hourly"){
				remove_large_timeline(".large_timeline_monthly_g");
				remove_large_timeline(".large_timeline_weekly_g");
				draw_timeline_hourly();
			};
			if ($(this).val()==="weekly"){
				remove_large_timeline(".large_timeline_hourly_g");
				remove_large_timeline(".large_timeline_monthly_g");
				draw_timeline_weekly();
			};
			if ($(this).val()==="monthly"){
				remove_large_timeline(".large_timeline_hourly_g");
				remove_large_timeline(".large_timeline_weekly_g");
				draw_timeline_monthly();
			};
			
			
		}; 
		
		
	});

	
	
	
}



function remove_large_timeline(svg_id)
{
	var deferred = new $.Deferred();
	
	console.log("remove_large_timeline - ");
	
	console.log("remove_large_timeline : svg_id = "+svg_id);
	

	var dim = d3.select(".large_timeline_svg").node().getClientRects()[0];

	d3.select(svg_id)
		.transition()
	    .duration(200)	    
	    .attr("transform","translate("+( hu )+", "+( dim.height*(6/12)   )+" ) scale("+0.01+")")
	    .attr("opacity",0.1)
//	    .selectAll("*")
	    .remove()
//	    .on("end",temp_func)
	    .call(function(){
	    	
	    	d3.select(svg_id).remove();
	    	deferred.resolve();
	    })
	    
	    ;
	
	
	
	
	
	return deferred.promise();
	
}



function draw_timeline_hourly()
{	
	console.log("draw_timeline_hourly - ");
	
	var current_timeline_data = footfall_timeline_data[0];
	
	console.log("draw_timeline_hourly : current_timeline_data := ");
	console.log(current_timeline_data);
	
	var barchart_w = hu*8;
	var barchart_h = vu*5;
	
	var dim = d3.select(".large_timeline_svg").node().getClientRects()[0];

	
	var barchart_svg = d3.select(".large_timeline_svg")
							.append("g")
							.attr("class","large_timeline_hourly_g")
							.attr("transform", "translate(" + ( hu )+ "," + (dim.height*(3/12) ) + ") scale(1.0)")
							.attr("opacity",1.0)
							;
	
	var time_unit_array = current_timeline_data.map(function(d) { return d.time_unit; });
	var valueNames = current_timeline_data[0].touch_array.map(function(d) { return d.touch_type; });

	
	var x0_scale = d3.scaleBand()
					    .rangeRound([0, barchart_w])
					    .paddingInner(0);
					    ;
	var x1_scale = d3.scaleBand()							
					    .paddingOuter(0)
					    .paddingInner(-2)
						;
	var y_scale = d3.scaleLinear().range([barchart_h, 0]).nice();

	
	
	x0_scale.domain(time_unit_array);
	x1_scale.domain(valueNames).range([0+7, x0_scale.bandwidth()+7]);
//	x1_scale.domain(valueNames).rangeRound([0, x0_scale.bandwidth()]);
	y_scale.domain(
			[ 0, 
			  d3.max(
					  current_timeline_data, 
					  function(time_unit){ 
						  return d3.max( time_unit.touch_array, function(d){ return d.value; }); 							  
					  })
		    ]
		  );
	
	

	
	var xAxis = d3.axisBottom(x0_scale)
					.tickSize(5)
					.tickFormat(d => d + " H");
	
	var yAxis = d3.axisLeft(y_scale).ticks(3);


	
	barchart_svg.append("g")
							  .attr("class", "x axis")
							  .attr("transform", "translate(0," + barchart_h + ")")
							  .call(xAxis)					  
							  ;

	barchart_svg.append("g")
						      .attr("class", "y axis")
						      .call(yAxis)	
						      ;

	var slice = barchart_svg.selectAll(".slice")
									      .data(current_timeline_data)
									      .enter().append("g")
									      .attr("class", "g")
									      .attr("transform",function(d) { return "translate(" + x0_scale(d.time_unit) + ",0)"; });

	
	
	
	

	slice.selectAll("rect")
		    .data(function(d) { 
//		  	  console.log([d.touch_array]);
		  	  return d.touch_array; 
		  	  
		    })
		    .enter().append("rect")
		    .attr("width", 6)
		    .attr("x", function(d) { return x1_scale(d.touch_type); })
//			.attr('dx',  '-2px')
		    .style("fill", function(d) {
		  	  
		  	  return color_palette[d.touch_type_num]; 
		  	  
		    })
		    .attr("y",  d => { return barchart_h; })
		    .attr("height", 0)
		    .transition()
            .duration(300)
            .delay(function (d, i) {	
                return i * 100;
            })
		    .attr("y", function(d) {
		    	var _y =  y_scale(d.value);
//		    	console.log((d.value));
//		  	  	console.log(y_scale(d.value));
		  	  	return (_y==barchart_h?_y-1:_y);
		  	  
		    })
		    .attr("height", function(d) {
		    	
		    	var h = barchart_h - y_scale(d.value);
		    	
		    	return (h==0?1:h); 
		  	  
		    })			 
		    ;

	barchart_svg
		.append("text")
		.attr("class", "large_chart_axis_text")
	    .attr("text-anchor", "middle")  
	    .attr("transform", "translate("+ (barchart_w/2) +","+(barchart_h+hu/2)+")rotate(0)")  // text is drawn off the screen top left, move down and out and rotate
	    .text("24 HOURS CYCLE")
	    ;

	barchart_svg
		.append("text")
		.attr("class", "large_chart_axis_text")
	    .attr("text-anchor", "middle")  
	    .attr("transform", "translate("+ (-vu) +","+(barchart_h/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate	    
	    .text("Visits")
	    ;
	
}



function draw_timeline_weekly()
{
	console.log("draw_timeline_weekly - ");

	
	var week_arr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	var current_timeline_data = footfall_timeline_data[1];
	
	
	
	
	
	var barchart_w = hu*8;
	var barchart_h = vu*5;
	
	var dim = d3.select(".large_timeline_svg").node().getClientRects()[0];

	
	var barchart_svg = d3.select(".large_timeline_svg")
							.append("g")
							.attr("class","large_timeline_weekly_g")
							.attr("transform", "translate(" + ( hu )+ "," + (dim.height*(3/12) ) + ") scale(1.0)")
							.attr("opacity",1.0)
							;

	var time_unit_array = current_timeline_data.map(function(d) { return d.time_unit; });
	var valueNames = current_timeline_data[0].touch_array.map(function(d) { return d.touch_type; });

	
	var x0_scale = d3.scaleBand()
					    .rangeRound([0, barchart_w])
					    .paddingInner(0);
					    ;
	var x1_scale = d3.scaleBand()							
					    .paddingOuter(0)
					    .paddingInner(-2)
						;
	var y_scale = d3.scaleLinear()
					.range([barchart_h, 0])
					.nice();

	
	
	x0_scale.domain(time_unit_array);
	x1_scale.domain(valueNames)
				.range([0+24, x0_scale.bandwidth()+24]);
//	x1_scale.domain(valueNames).rangeRound([0, x0_scale.bandwidth()]);
	y_scale.domain(
			[ 0, 
			  d3.max(
					  current_timeline_data, 
					  function(time_unit){ 
						  return d3.max( time_unit.touch_array, function(d){ return d.value; }); 							  
					  })
		    ]
		  );
	
	

	
	var xAxis = d3.axisBottom(x0_scale)
					.tickSize(5)
					.tickFormat(function(d, i){
					    return week_arr[i];
					})
					;
	
	
//	var xAxis = d3.axisBottom(x_scale)
//					.tickSize([])
//					.tickPadding(10)
//					.tickFormat(function(d, i){
//					    return week_arr[i];
//					})
//					;
	
	
	var yAxis = d3.axisLeft(y_scale).ticks(3);


	
	barchart_svg.append("g")
					  .attr("class", "x axis")
					  .attr("transform", "translate(0," + barchart_h + ")")
					  .call(xAxis)					  
					  ;

	barchart_svg.append("g")
				      .attr("class", "y axis")
				      .call(yAxis)	
				      ;

	var slice = barchart_svg.selectAll(".slice")
							      .data(current_timeline_data)
							      .enter().append("g")
							      .attr("class", "g")
							      .attr("transform",function(d) { return "translate(" + x0_scale(d.time_unit) + ",0)"; });

	
	
	
	

	slice.selectAll("rect")
		    .data(function(d) { 
		  	  console.log([d.touch_array]);
		  	  return d.touch_array; 
		  	  
		    })
		    .enter().append("rect")
		    .attr("width", 20)
		    .attr("x", function(d) { return x1_scale(d.touch_type); })
//			.attr('dx',  '-2px')
		    .style("fill", function(d) {
		  	  
		  	  return color_palette[d.touch_type_num]; 
		  	  
		    })
		    .attr("y",  d => { return barchart_h; })
		    .attr("height", 0)
		    .transition()
            .duration(300)
            .delay(function (d, i) {	
                return i * 100;
            })
		    .attr("y", function(d) {
		    	var _y =  y_scale(d.value);
		    	console.log((d.value));
		  	  	console.log(y_scale(d.value));
		  	  	return (_y==barchart_h?_y-1:_y);
		  	  
		    })
		    .attr("height", function(d) {
		    	
		    	var h = barchart_h - y_scale(d.value);
		    	
		    	return (h==0?1:h); 
		  	  
		    })			 
		    ;

	barchart_svg
		.append("text")
		.attr("class", "large_chart_axis_text")
	    .attr("text-anchor", "middle")  
	    .attr("transform", "translate("+ (barchart_w/2) +","+(barchart_h+hu/2)+")rotate(0)")  // text is drawn off the screen top left, move down and out and rotate
	    .text("WEEKLY CYCLE")
	    ;

	barchart_svg
		.append("text")
		.attr("class", "large_chart_axis_text")
	    .attr("text-anchor", "middle")  
	    .attr("transform", "translate("+ (-vu) +","+(barchart_h/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
	    .text("Visits")
	    ;
	
	

}



function draw_timeline_monthly()
{	
	console.log("draw_timeline_monthly - ");

	
	var month_arr = ["January","February","March","April","May","June","July","August","September","October","November","December"];

	var current_timeline_data = footfall_timeline_data[2];
	
	var barchart_w = hu*8;
	var barchart_h = vu*5;
	
	var dim = d3.select(".large_timeline_svg").node().getClientRects()[0];

	
	var barchart_svg = d3.select(".large_timeline_svg")
							.append("g")
							.attr("class","large_timeline_monthly_g")
							.attr("transform", "translate(" + ( hu )+ "," + (dim.height*(3/12) ) + ") scale(1.0)")
							.attr("opacity",1.0)
							;

	
	var time_unit_array = current_timeline_data.map(function(d) { return d.time_unit; });
	var valueNames = current_timeline_data[0].touch_array.map(function(d) { return d.touch_type; });

	
	var x0_scale = d3.scaleBand()
					    .rangeRound([0, barchart_w])
					    .paddingInner(0.0);
					    ;
	var x1_scale = d3.scaleBand()							
					    .paddingOuter(0)
					    .paddingInner(-1)
						;
	var y_scale = d3.scaleLinear()
					.range([barchart_h, 0])
					.nice();

	
	
	x0_scale.domain(time_unit_array);
	x1_scale.domain(valueNames)
				.range([0+10, x0_scale.bandwidth()+10]);
//	x1_scale.domain(valueNames).rangeRound([0, x0_scale.bandwidth()]);
	y_scale.domain(
			[ 0, 
			  d3.max(
					  current_timeline_data, 
					  function(time_unit){ 
						  return d3.max( time_unit.touch_array, function(d){ return d.value; }); 							  
					  })
		    ]
		  );
	
	

	
	var xAxis = d3.axisBottom(x0_scale)
					.tickSize(5)
					.tickFormat(function(d, i){
					    return month_arr[i];
					})
					;
	
	var yAxis = d3.axisLeft(y_scale).ticks(3);


	
	barchart_svg.append("g")
					  .attr("class", "x axis")
					  .attr("transform", "translate(0," + barchart_h + ")")
					  .call(xAxis)					  
					  ;

	barchart_svg.append("g")
				      .attr("class", "y axis")
				      .call(yAxis)	
				      ;

	var slice = barchart_svg.selectAll(".slice")
							      .data(current_timeline_data)
							      .enter().append("g")
							      .attr("class", "g")
							      .attr("transform",function(d) { return "translate(" + x0_scale(d.time_unit) + ",0)"; });

	
	
	
	

	slice.selectAll("rect")
		    .data(function(d) { 
		  	  console.log([d.touch_array]);
		  	  return d.touch_array; 
		  	  
		    })
		    .enter().append("rect")
		    .attr("width", 12)
		    .attr("x", function(d) { return x1_scale(d.touch_type); })
//			.attr('dx',  '-2px')
		    .style("fill", function(d) {
		  	  
		  	  return color_palette[d.touch_type_num]; 
		  	  
		    })
		    .attr("y",  d => { return barchart_h; })
		    .attr("height", 0)
		    .transition()
            .duration(300)
            .delay(function (d, i) {	
                return i * 100;
            })
		    .attr("y", function(d) {
		    	var _y =  y_scale(d.value);
		    	console.log((d.value));
		  	  	console.log(y_scale(d.value));
		  	  	return (_y==barchart_h?_y-1:_y);
		  	  
		    })
		    .attr("height", function(d) {
		    	
		    	var h = barchart_h - y_scale(d.value);
		    	
		    	return (h==0?1:h); 
		  	  
		    })			 
		    ;

	barchart_svg
		.append("text")
		.attr("class", "large_chart_axis_text")
	    .attr("text-anchor", "middle")  
	    .attr("transform", "translate("+ (barchart_w/2) +","+(barchart_h+hu/2)+")rotate(0)")  // text is drawn off the screen top left, move down and out and rotate
	    .text("MONTHLY CYCLE")
	    ;

	barchart_svg
		.append("text")
		.attr("class", "large_chart_axis_text")
	    .attr("text-anchor", "middle")  	    
	    .attr("transform", "translate("+ (-vu) +","+(barchart_h/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate	    
	    .text("Visits")
	    ;
	
	

}



function draw_timeline_item_info()
{
//	console.log("draw_timeline_item_info - ");
	
	
	var large_timeline_svg = d3.select(".large_timeline_svg");
	
	var dim = large_timeline_svg.node().getClientRects()[0];
	

	var barchart_w = hu*8;
	var barchart_h = vu*5;
	
	
	var item_name_timeline = item_map[main_item_id].nameStr;
	var item_cat_timeline = item_map[main_item_id].categoryStr;
	

	large_timeline_svg	
	    .append("text")
	    .attr("class", "caption_val")
		.text(string_trim(item_name_timeline,50))
		.attr("text-anchor", "start")
		.attr("x", (hu/2))
		.attr("y", (vu))
		;
	
	large_timeline_svg
		.append("line")	    
		.attr("class","frame_line")		
		.attr("x1", d => hu/2 )
	    .attr("y1", d => (vu+vr_gap_tn) )    	    
	    .attr("x2", d => ( hu ) )
	    .attr("y2", d => (vu+vr_gap_tn) )
	    .transition()
	    .duration(800)	 
	    .attr("x2", d => ( hu*6 ) )
	    ;
	
	
	
	large_timeline_svg
		.append("line")	    
		.attr("class","frame_line")	
		.attr("x1", d => hu )
	    .attr("y1", (dim.height - vu - 3 ))   	    
	    .attr("x2", d => ( hu+hz_gap_re ) )
	    .attr("y2", (dim.height - vu - 3 ))	    
	    ;
	
	
	
	large_timeline_svg	
	    .append("text")
	    .attr("class", "caption_text")
		.text("\u00A0 Rank")
		.attr("text-anchor", "start")
		.attr("x", (hu+hz_gap_re))
		.attr("y", (dim.height - vu))
		;


	large_timeline_svg	
	    .append("text")
	    .attr("class", "info_text")
		.text(string_trim(item_map[main_item_id].rankF,30))
		.attr("text-anchor", "start")
		.attr("x", (hu+hz_gap_re + 41 + hz_gap_tn ))
		.attr("y", (dim.height - vu ))
		;
	
	

	
	large_timeline_svg
		.append("line")	    
		.attr("class","frame_line")	
		.attr("x1", d => hu*4 )
	    .attr("y1", (dim.height - vu - 3 ))   	    
	    .attr("x2", d => ( hu*4+hz_gap_re ) )
	    .attr("y2", (dim.height - vu - 3 ))	    
	    ;
	
	
	large_timeline_svg	
	    .append("text")
	    .attr("class", "caption_text")
		.text("\u00A0 Footfall")
		.attr("text-anchor", "start")
		.attr("x",(hu*4+hz_gap_re))
		.attr("y", (dim.height - vu ))
		;

	
	large_timeline_svg	
	    .append("text")
	    .attr("class", "info_text")
		.text(item_map[main_item_id].footfall)
		.attr("text-anchor", "start")
		.attr("x", (hu*4+hz_gap_re + 87 + hz_gap_tn ))
		.attr("y", (dim.height - vu ))
		;

	
	large_timeline_svg
		.append("line")	    
		.attr("class","frame_line")	
		.attr("x1", d => hu*7 )
	    .attr("y1", (dim.height - vu - 3 ))   	    
	    .attr("x2", d => ( hu*7+hz_gap_re ) )
	    .attr("y2", (dim.height - vu - 3 ))	    
	    ;


	large_timeline_svg	
	    .append("text")
	    .attr("class", "caption_text")
		.text("\u00A0 Footfall(%)")
		.attr("text-anchor", "start")		
		.attr("x",(hu*7+hz_gap_re))
		.attr("y", (dim.height - vu ))
		;


	large_timeline_svg	
	    .append("text")
	    .attr("class", "info_text")
		.text((item_map[main_item_id].footfallPerc+" %"))
		.attr("text-anchor", "start")
		.attr("x", (hu*7+hz_gap_re + 97 + hz_gap_tn ))
		.attr("y", (dim.height - vu ))
		;
	
}






function draw_timeline_legends()
{
	console.log("draw_timeline_legends - ");
	
	
	$("<div class='large_timeline_legends small_text'> " +
			"<div class='legend_rect legend_visits_rect'></div>"+
			"<div class='legend_label'> Visits </div>"+
			"<div class='legend_rect legend_purchases_rect'></div>"+
			"<div class='legend_label'> Purchases </div>"+
			"<div class='legend_rect legend_cartexits_rect'></div>"+
			"<div class='legend_label'> Cart Exits </div>"+
			
				
	"</div>")
		.css({
			left: "5%",
			top: (su),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".large_timeline .tool_box_content");	
	
	
	$("<form class='large_timeline_radio_form small_text'> "+ 
		"<label class='radio_label'> "+
        	"<input type='radio' class='radio_btn' checked='checked' name='radio' value='hourly' > Daily "+
        	 "<span class='checkmark'></span>"+
        "</label> "+
        "<label class='radio_label'>"+
        	"<input type='radio'class='radio_btn'  name='radio'  value='weekly' > Weekly"+
        	"<span class='checkmark'></span>"+
        "</label>"+
        "<label class='radio_label'>"+
        	"<input type='radio' class='radio_btn' name='radio' value='monthly'  >  Monthly"+
        	"<span class='checkmark'></span>"+
        "</label>"+
	  "</form>")
	  .css({
			left: "70%",
			top: (su),
//			width:(tool_w),
//			height:tool_max_h,
//			"max-height" : (tool_max_h),
			
	  })
	  .appendTo(".large_timeline .tool_box_content");
	
	

	
	$( "input[type=radio]" ).on( "click", function(d){
		
		
		if ($(this).is(":checked")){
			
			console.log($(this).val());
			
			if ($(this).val()==="hourly"){
				
				Promise.all([
					remove_large_timeline(".large_timeline_monthly_g"),
					remove_large_timeline(".large_timeline_weekly_g")
					]).then(draw_timeline_hourly);
				
			};
			if ($(this).val()==="weekly"){
				
				
				Promise.all([
					remove_large_timeline(".large_timeline_hourly_g"),
					remove_large_timeline(".large_timeline_monthly_g")
					]).then(draw_timeline_weekly);
				
				
				
			};
			if ($(this).val()==="monthly"){
				
				
				Promise.all([
					remove_large_timeline(".large_timeline_hourly_g"),
					remove_large_timeline(".large_timeline_weekly_g")
					]).then(draw_timeline_monthly);
			};
			
		}
	});
	
	
	
}


function draw_timeline_legends1()
{
	console.log("draw_timeline_legends - ");
	
	
	var large_timeline_svg = d3.select(".large_timeline_svg");
	
	var dim = large_timeline_svg.node().getClientRects()[0];
	
	var rect_w = hz_gap_sm;
	var rect_h = vr_gap_sm;
	
	
	var barchart_w = hu*8;
	var barchart_h = vu*5;
	
	
	
	large_timeline_svg
 		.append("rect")
		.attr("class", "timeline_legend")				
	    .attr("width", rect_w)
		.attr("height", (rect_h))
		.attr("rx", 1)
		.attr("ry", 1)	
//		.attr("x", (hu*7+hz_gap_tn))
		.attr("x", (barchart_w/2 + hu))
//		.attr("x", (hu*3+hz_gap_tn))
		.attr("y", (dim.height/2-barchart_h/2-rect_h-vr_gap_tn))
		.style("fill",color_palette[0])
		
//		.attr("filter", "url(#normal_shadow)")	 
		;


	large_timeline_svg	
	    .append("text")
	    .attr("class", "large_chart_legend_text")
		.text("Visits")
		.attr("text-anchor", "start")
//		.attr("x", (hu*7+rect_w+hz_gap_sm))
//		.attr("y", (vr_gap_lg*2))
		.attr("x", (barchart_w/2 + hu + rect_w + hz_gap_tn))
		.attr("y", (dim.height/2-barchart_h/2-2*rect_h/3))
		;
	
	

	large_timeline_svg
 		.append("rect")
		.attr("class", "timeline_legend")				
	    .attr("width", rect_w)
		.attr("height", (rect_h))
		.attr("rx", 1)
		.attr("ry", 1)	
		.attr("x", (barchart_w/2 + hu*2 ))
		.attr("y", (dim.height/2-barchart_h/2-rect_h-vr_gap_tn))
		.style("fill",color_palette[1])		
		;
	
	

	large_timeline_svg	
	    .append("text")
	    .attr("class", "large_chart_legend_text")
		.text("Purchases")
		.attr("text-anchor", "start")
//		.attr("x", (hu*7+rect_w+hz_gap_sm))
//		.attr("y", (vr_gap_lg*2))
		.attr("x", (barchart_w/2 + hu*2 + rect_w + hz_gap_tn))
		.attr("y", (dim.height/2-barchart_h/2-2*rect_h/3))
		;
	
	


	large_timeline_svg
 		.append("rect")
		.attr("class", "timeline_legend")				
	    .attr("width", rect_w)
		.attr("height", (rect_h))
		.attr("rx", 1)
		.attr("ry", 1)	
		.attr("x", (barchart_w/2 + hu*3+ hz_gap_tn))
		.attr("y", (dim.height/2-barchart_h/2-rect_h-vr_gap_tn))
		.style("fill",color_palette[2])		
		;
	
	

	large_timeline_svg	
	    .append("text")
	    .attr("class", "large_chart_legend_text")
		.text("Cart Exits")
		.attr("text-anchor", "start")
//		.attr("x", (hu*7+rect_w+hz_gap_sm))
//		.attr("y", (vr_gap_lg*2))
		.attr("x", (barchart_w/2 + hu*3 + rect_w + hz_gap_tn + hz_gap_tn))
		.attr("y", (dim.height/2-barchart_h/2-2*rect_h/3))
		;
	
	

	
}



function draw_timeline(svg_elem)
{	
	console.log("draw_timeline - ");

	var dim = d3.select(".large_timeline_svg").node().getClientRects()[0];

	
//	d3.select(".large_timeline_svg")
//		.append("g")
//		.attr("class","large_timeline_g")
//		.attr("transform", "translate(" + ( hu )+ "," + (dim.height*(3/12) ) + ") scale(1.0)");

	
	draw_timeline_item_info();
	
	draw_timeline_legends();
	
	draw_checkbox();
	
	draw_timeline_hourly();
	
	
	
	
	
	
}




