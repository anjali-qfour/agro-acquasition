

var max_touchCount_map_array = [0,0,0,0,0];




function map_indicator_barchart(svg_elem,indicator_data,dim)
{
	console.log("map_indicator_barchart1 - ");
	
//	var dim = d3.select(svg_elem).node().getClientRects()[0];
	var map_dim = d3.select(".large_map_svg").node().getClientRects()[0];
	
	var greyColor = "#898989";
	var barColor = d3.interpolateInferno(0.4);
	var highlightColor = d3.interpolateInferno(0.3);

	
	var barchart_w = lu_mi;
	var barchart_h = su*2;
	
//	var formatPercent = d3.format(".0%");
	
	
	
	
	var world_indicator_g = d3.select(".world_indicator");
	 
//	console.log(world_indicator_g.node().parentNode);
		
	var barchart_svg = d3.select(".large_map_svg")
							.append("g")
							.attr("class","world_indicator_barchart")
							.attr("transform", "translate(" + ( dim.x )+ "," + (dim.y) + ")");

	
	var x_scale = d3.scaleBand()
		    			.range([0, barchart_w])
		    			.padding(0.4);
	
	var y_scale = d3.scaleLinear()
						.range([barchart_h, 0]);
	
	var xAxis = d3.axisBottom(x_scale).tickSize([]).tickPadding(10);
	var yAxis = d3.axisLeft(y_scale)
//					.tickFormat(formatPercent)
					;
	
	x_scale.domain(indicator_data.map( d => { return d.touchType; }));
	y_scale.domain([0, d3.max(indicator_data,  d => { return d.value; })]);
//	y_scale.domain([0, 100]);
	
	
	

	barchart_svg.append("g")
			        .attr("class", "x axis")
			        .attr("transform", "translate(0," + (barchart_h) + ")")
			        .call(xAxis)
			        .selectAll("text")	
			        .style("text-anchor", "start")
			        
			        .attr("transform", function(d) {
			        
			        	return "rotate(90)" 
			        	
			        })
			        .attr("dx", "4px")
			        .attr("dy", "-9px")
			        ;
//	barchart_svg.append("g")
//			        .attr("class","y axis")
//			        .call(yAxis);



	barchart_svg.selectAll(".bar")
			        .data(indicator_data)
			        .enter().append("rect")
			        .attr("class", "bar")
			        .style("display", d => { return d.value === null ? "none" : null; })
			        .style("fill",  d => {
			        	var c = color_palette[0];
			        	if (d.touchType==="Visits"){c = color_palette[0];};
			        	if (d.touchType==="Purchases"){c = color_palette[1];};
			        	if (d.touchType==="Cart Exits"){c = color_palette[2];};
			        	
			        	
			        	return c;
//			            return d.value === d3.max(indicator_data,  d => { return d.value; }) ? highlightColor : barColor
			        })
			        .attr("x",  d => { return x_scale(d.touchType); })
			        .attr("width", x_scale.bandwidth())
		            .attr("y",  d => { return barchart_h; })
		            .attr("height", 0)
		                .transition()
		                .duration(750)
		                .delay(function (d, i) {
//		                	console.log(i);	
		                    return i * 150;
		                })
			        .attr("y",  d => { return y_scale(d.value); })
			        .attr("height",  d => { return barchart_h - y_scale(d.value); });

	barchart_svg.selectAll(".label")        
			        .data(indicator_data)
			        .enter()
			        .append("text")
			        .attr("class", "chart_value")
			        .style("display",  d => { return d.value === null ? "none" : null; })
			        .attr("x", ( d => { return x_scale(d.touchType) + (x_scale.bandwidth() / 2) -8 ; }))
			            .style("fill",  d => { 
			                return d.value === d3.max(indicator_data,  d => { return d.value; }) 
			                ? highlightColor : greyColor
			                })
			        .attr("y",  d => { return barchart_h; })
			            .attr("height", 0)
			                .transition()
			                .duration(750)
			                .delay((d, i) => { return i * 150; })
			        .text( d => { return (d.value); })
			        .attr("y",  d => { return y_scale(d.value) + .1; })
			        .attr("dx", "0.3em")
			        .attr("dy", "-.7em"); 
	
	

}




function draw_world_indicator(indicator_data)
{
//	console.log("draw_world_indicator - ");
	
//	console.log("draw_world_indicator : indicator_data :=");
//	console.log(indicator_data);
	
	
	var svg_elem = indicator_data.svg_elem;
	var dataset = indicator_data.dataset;
//	console.log("draw_world_indicator : dataset :=");
//	console.log(dataset);
		
	
	
	var dim = d3.select(".large_map_svg").node().getClientRects()[0];
	var world_indicator_g = null;
	
	
	
	
//    $.get("content/svg/world_symb.svg", function(text_data){
//    	
////    	console.log(dim);
//    	
//    	world_indicator_g = d3.select(svg_elem)
//					    		.append("g")
//					    		.attr("class","world_indicator")
//					    		.html(text_data)
//					    		.attr("transform","translate("+( dim.width-hu )+", "+( dim.height*(10/12) ) +" ) scale("+(0.4)+")")
//					//    		.attr("transform","translate("+( 300  )+", "+( 200 ) +" ) scale("+(0.5)+")")
//					    		;
////    	console.log(world_indicator_g);
//    	
//    	
//     	
//	}, "text");	
	
	
	
	   
    map_indicator_barchart(".large_map_svg",
    						dataset,
    						{
    							x:lu*9,
    							y:su*5,
    	
    						});
    
    
    d3.select(".large_map_svg")
    	.append("text")  
    	.attr("class","small_text bold_text")
    	.text("WORLDWIDE")
    	.attr("x",lu*9+hz_gap_lg/2)
    	.attr("y", su*5+su*3+10)
    	.attr("text-anchor","middle")
    	; 	
	
   
}




function draw_no_location_indicator(indicator_data)
{
//	console.log("draw_no_location_indicator - ");
	
	
	var dim = d3.select(".large_map_svg").node().getClientRects()[0];
	console.log("draw_no_location_indicator : dim :=");
	console.log(dim);
	
	
	
	var dataset = [
	    {"year":"2016", "value": .06},
	    {"year":"2017", "value": .95},
	    {"year":"2018", "value": .31}
	];

	var svg_elem = indicator_data.svg_elem;
	var dataset = indicator_data.dataset;
	
//    $.get("content/svg/no_location.svg", function(text_data){
//    	
//   
//    	d3.select(svg_elem)
//    		.append("g")
//    		.attr("class","no_location_indicator")
//    		.html(text_data)
//    		.attr("transform","translate("+( dim.width-hu  )+", "+( dim.height*(5/12) ) +" ) scale("+(0.4)+")")
//    		;
//    	
//    	
//     	
//	}, "text");	
    
    map_indicator_barchart(".large_map_svg",
    						dataset,
    						{
    							x:lu*9,
    							y:su+su_3,
    	
    						});
    
    d3.select(".large_map_svg")
    	.append("text")  
    	.attr("class"," small_text bold_text")
    	.text("UNKNOWN")
    	.attr("x",lu*9+hz_gap_lg/2)
    	.attr("y", su*4+10)
    	.attr("text-anchor","middle")
    	;
    
}




function draw_checkbox_map()
{

//	console.log("draw_checkbox - ");
	
	
	var dim = d3.select(".map_svg").node().getClientRects()[0];
//	console.log("draw_checkbox : dim:=");
//	console.log(dim);
	
	var radio_html_w = 260;

	var radio_html = $('<div class="large_map_radio"> '+
						  '<input type="radio" id="option-one" value="all" name="selector" checked>'+
				          '<label for="option-one" >All</label>'+
			              '<input type="radio" id="option-two" value="visit" name="selector">'+
			              '<label for="option-two" style="color:'+color_palette[0]+'">VISITS</label>'+
			              '<input type="radio" id="option-three" value="purchase" name="selector">'+
			              '<label for="option-three" style="color:'+color_palette[1]+'">PURCHASE</label>'+
			              '<input type="radio" id="option-four" value="cartexit" name="selector">'+
			              '<label for="option-four" style="color:'+color_palette[2]+'">CART EXITS</label></div>') ;
	
	
	
	
	
	$("#main_screen_div").append(radio_html);
	


	
	
	
	
	radio_html.css("top",(dim.y+vu/2));
//	radio_html.css("left",( dim.x+dim.width - hu*3  ) );
//	radio_html.css("left",( dim.x + hu*9 - hu*3 ) );
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
			
			
			if ($(this).val()==="all"){
				
			
				

				$('.map_circle[data-touchType!=0]').each(function(){
				    $(this).attr("opacity", 1.0);				
				});
				
				
			};
			
			if ($(this).val()==="visit"){
				
				$('.map_circle[data-touchType=1]').prop("opacity", 0.1);
				
				
				$('.map_circle[data-touchType=1]').each(function(){
				    $(this).attr("opacity", 1.0);				
				});
				

				$('.map_circle[data-touchType!=1]').each(function(){
				    $(this).attr("opacity", 0.0);				
				});
				
				
			};
			if ($(this).val()==="purchase"){

				$('.map_circle[data-touchType=2]').each(function(){
				    $(this).attr("opacity", 1.0);				
				});
				

				$('.map_circle[data-touchType!=2]').each(function(){
				    $(this).attr("opacity", 0.0);				
				});
			};
			if ($(this).val()==="cartexit"){

				$('.map_circle[data-touchType=3]').each(function(){
				    $(this).attr("opacity", 1.0);				
				});
				

				$('.map_circle[data-touchType!=3]').each(function(){
				    $(this).attr("opacity", 0.0);				
				});
			};
			
			
		}; 
		
		
		
		
		
		
	});

	
	
	
}




function draw_map_legends1()
{
	console.log("draw_map_legends - ");
	
	
	var map_svg = d3.select(".map_svg");
	
	var dim = map_svg.node().getClientRects()[0];
	
	var rect_w = hz_gap_sm;
	var rect_h = vr_gap_sm;
	
	
	map_svg
 		.append("rect")
		.attr("class", "map_legend")				
	    .attr("width", rect_w)
		.attr("height", (rect_h))
		.attr("rx", 1)
		.attr("ry", 1)	
		.attr("x", (hu*6+hz_gap_lg))
//		.attr("y", (vr_gap_lg+vr_gap_lg-vr_gap_tn-4))
		.attr("y", (dim.height - hu))
		.style("fill",color_palette[0])
		
//		.attr("filter", "url(#normal_shadow)")	 
		;


	map_svg	
	    .append("text")
	    .attr("class", "large_chart_legend_text")
		.text("Visits")
		.attr("text-anchor", "start")
		.attr("x", (hu*6+rect_w+hz_gap_lg+hz_gap_tn))
//		.attr("y", (vr_gap_lg*2))
		.attr("y", (dim.height - hu + hz_gap_tn))
		;
	
	

	map_svg
 		.append("rect")
		.attr("class", "map_legend")				
	    .attr("width", rect_w)
		.attr("height", (rect_h))
		.attr("rx", 1)
		.attr("ry", 1)	
		.attr("x", (hu*6+hz_gap_lg))
//		.attr("y", (vr_gap_lg*2+vr_gap_re-vr_gap_tn-4))
		.attr("y", (dim.height - hu + vr_gap_re))
		.style("fill",color_palette[1])
		
//		.attr("filter", "url(#normal_shadow)")	 
		;


	map_svg	
	    .append("text")
	    .attr("class", "large_chart_legend_text")
		.text("Purchases")
		.attr("text-anchor", "start")
		.attr("x", (hu*6+rect_w+hz_gap_lg+hz_gap_tn))
//		.attr("y", (vr_gap_lg*2+vr_gap_re))
		.attr("y", (dim.height - hu + hz_gap_tn + vr_gap_re))
		;
	
	


	map_svg
 		.append("rect")
		.attr("class", "map_legend")				
	    .attr("width", rect_w)
		.attr("height", (rect_h))
		.attr("rx", 1)
		.attr("ry", 1)	
		.attr("x", (hu*6+hz_gap_lg))
//		.attr("y", (vr_gap_lg*2+vr_gap_re*2-vr_gap_tn-4))
		.attr("y", (dim.height - hu + vr_gap_re*2))
		.style("fill",color_palette[2])
		
//		.attr("filter", "url(#normal_shadow)")	 
		;


	map_svg	
	    .append("text")
	    .attr("class", "large_chart_legend_text")
		.text("Cart Exits")
		.attr("text-anchor", "start")
		.attr("x", (hu*6+rect_w+hz_gap_lg+hz_gap_tn))
//		.attr("y", (vr_gap_lg*2+vr_gap_re*2))
		.attr("y", (dim.height - hu + hz_gap_tn + vr_gap_re*2))
		;
	
	
	
}




function draw_map_legends()
{
	console.log("draw_map_legends - ");
	
	
	$("<div class='large_map_legends small_text'> " +
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
		.appendTo(".large_map .tool_box_content");	
	
	
	
	
	
	  $(
	  "<div class='large_map_checkbox checkbox_container small_text'> " +
		  "<label class='checkbox_label'>All"+
		  "<input type='checkbox' checked='true' value='all' >"+
		  "<span class='checkbox_checkmark'></span>"+
		  "</label>"+
		  "<label class='checkbox_label' >Visits"+
		  "<input type='checkbox' checked='true' value='visits'>"+
		  "<span class='checkbox_checkmark'></span>"+
		  "</label>"+
		  "<label class='checkbox_label'>Purchases"+
		  "<input type='checkbox'checked='true' value='purchases'>"+
		  "<span class='checkbox_checkmark'></span>"+
		  "</label>"+
		  "<label class='checkbox_label'>Cart Exits"+
		  "<input type='checkbox' checked='true' value='cartexits' >"+
		  "<span class='checkbox_checkmark'></span>"+
		  "</label>"+
		  
	  "</div>"
	  )
	  .css({
			left: "65%",
			top: (su),
//			width:(tool_w),
//			height:tool_max_h,
//			"max-height" : (tool_max_h),
			
	  })
	  .appendTo(".large_map .tool_box_content");
	
	
	
	  $( "input[type=checkbox]" ).on( "click", function(d){
		  
		  	
			
			if ($(this).val()=="all"){
				$(":checkbox").prop("checked",true);
			}
			else{
				$(":checkbox[value!='"+$(this).val()+"']").prop("checked",false);
				$(":checkbox[value='"+$(this).val()+"']").prop("checked",true);
				
			}
			
			
			
			
			
			
			
			
			if ($(this).val()==="all"){
			
				$('.map_circle[data-touchType!=0]').each(function(){
				    $(this).attr("opacity", 1.0);				
				});
				
				
			};
			
			if ($(this).val()==="visits"){
				
				$('.map_circle[data-touchType=1]').prop("opacity", 0.1);
				
				
				$('.map_circle[data-touchType=1]').each(function(){
				    $(this).attr("opacity", 1.0);				
				});
				

				$('.map_circle[data-touchType!=1]').each(function(){
				    $(this).attr("opacity", 0.0);				
				});
				
				
			};
			if ($(this).val()==="purchases"){

				$('.map_circle[data-touchType=2]').each(function(){
				    $(this).attr("opacity", 1.0);				
				});
				

				$('.map_circle[data-touchType!=2]').each(function(){
				    $(this).attr("opacity", 0.0);				
				});
			};
			if ($(this).val()==="cartexits"){

				$('.map_circle[data-touchType=3]').each(function(){
				    $(this).attr("opacity", 1.0);				
				});
				

				$('.map_circle[data-touchType!=3]').each(function(){
				    $(this).attr("opacity", 0.0);				
				});
			};

			
		  
		  
	  });
			
	
	
	
}




function draw_map_item_info()
{
//	console.log("draw_map_item_info - ");
	
	
	var map_svg = d3.select(".map_svg");
	
	var dim = map_svg.node().getClientRects()[0];
	
	
	
	var item_name_map = item_map[main_item_id].nameStr;
	var item_cat_timeline = item_map[main_item_id].categoryStr;
	

	map_svg	
	    .append("text")
	    .attr("class", "caption_val")
		.text(string_trim(item_name_map,50))
		.attr("text-anchor", "start")
		.attr("x", (hu/2))
		.attr("y", (vu))
		;
	
//  ------------<  Title  >------------	

	map_svg
		.append("line")	    
		.attr("class","frame_line")		
		.attr("x1", d => hu/2 )
	    .attr("y1", d => (vu+vr_gap_tn) )    	    
//	    .attr("x2", d => ( hu ) )
	    .attr("y2", d => (vu+vr_gap_tn) )	    	 
	    .attr("x2", d => ( hu*6 ) )
	    ;
	
	
		
	map_svg
		.append("line")	    
		.attr("class","frame_line")		
		.attr("x1", d => (hu*6+hz_gap_lg) )
	    .attr("y1", (hu - 3))  
	    .attr("x2", d => ((hu*6+hz_gap_lg) + hz_gap_re ) )
	    .attr("y2", (hu - 3))
	    ;

	
//  ------------<  Rank  >------------	

	
	map_svg	
	    .append("text")
	    .attr("class", "caption_text")
		.text("\u00A0 Rank")
		.attr("text-anchor", "start")
		.attr("x", ((hu*6+hz_gap_lg) + hz_gap_re ) )
		.attr("y", (hu))
		;


	map_svg	
	    .append("text")
	    .attr("class", "info_text")
		.text((item_map[main_item_id].footfall+" %"))
		.attr("text-anchor", "end")
		.attr("x", ((hu*6+hz_gap_lg) + hu + hz_gap_lg - 10 ) )
		.attr("y", (hu))
		;
	
	
//  ------------<  Footfall  >------------
	
	map_svg
		.append("line")	    
		.attr("class","frame_line")		
		.attr("x1", d => (hu*6+hz_gap_lg) )
	    .attr("y1", (hu  + hz_gap_lg - 3))  
	    .attr("x2", d => ((hu*6+hz_gap_lg) + hz_gap_re ) )
	    .attr("y2", (hu  + hz_gap_lg - 3))
	    ;

	
	map_svg	
	    .append("text")
	    .attr("class", "caption_text")
		.text("\u00A0 Footfall")
		.attr("text-anchor", "start")
		.attr("x", ((hu*6+hz_gap_lg) + hz_gap_re ) )
		.attr("y", (hu + hz_gap_lg ))
		;



	map_svg	
	    .append("text")
	    .attr("class", "info_text")
		.text((item_map[main_item_id].footfall+" %"))
		.attr("text-anchor", "end")
		.attr("x", ((hu*6+hz_gap_lg) + hu + hz_gap_lg - 10 ) )
		.attr("y", (hu + hz_gap_lg ))
		;
	
	
//  ------------<  Footfall(%)  >------------
	
	
	map_svg
		.append("line")	    
		.attr("class","frame_line")		
		.attr("x1", d => (hu*6+hz_gap_lg) )
	    .attr("y1", (hu  + hz_gap_lg*2 - 3))  
	    .attr("x2", d => ((hu*6+hz_gap_lg) + hz_gap_re ) )
	    .attr("y2", (hu  + hz_gap_lg*2 - 3))

	    ;
	
	
	
	map_svg	
	    .append("text")
	    .attr("class", "caption_text")
		.text("\u00A0 Footfall(%)")
		.attr("text-anchor", "start")
		.attr("x", ((hu*6+hz_gap_lg) + hz_gap_re ) )
		.attr("y", (hu + hz_gap_lg*2 ))
		;


	map_svg	
	    .append("text")
	    .attr("class", "info_text")
		.text((item_map[main_item_id].footfallPerc+" %"))
		.attr("text-anchor", "end")
		.attr("x", ((hu*6+hz_gap_lg) + hu + hz_gap_lg - 10 ) )
		.attr("y", (hu + hz_gap_lg*2 ))
		;
}




function draw_map(svg_elem,location_data)
{
	
	console.log("draw_map - ");
	
//	console.log(svg_elem);	
//	console.log(d3.select(svg_elem));
	
//	draw_map_item_info();
//	
//	draw_checkbox_map();
	
	draw_map_legends();
	
	
	
	
	
	var promises = [
		  d3.json("content/js/india-districts.json"),
		  d3.json("content/js/ne_10m_admin_0_Kashmir_Occupied.json"),
		  d3.json("content/js/IND.geo.json"),
		  _reshape_map_data(location_data)
		];
		
	
	
	
	
	
	Promise.all(promises).then(draw_main_map);
		
	
	function draw_main_map([topoMain,topoKashmir,country_data,reshape_location_data]) 
	{
		
		console.log("draw_main_map==>");
		
		
		
		var districts, disputed,  scale = 800;
		
		var dim = d3.select(svg_elem).node().getClientRects()[0];

		

		
		 // Features for districts and disputed areas
        districts = topojson.feature(topoMain, topoMain.objects.IND_adm2);
        disputed = topojson.feature(topoKashmir, topoKashmir.objects.ne_10m_admin_0_Kashmir_Occupied);
        
        

	      
        var projection = d3.geoMercator()
				            .center([90, 23])
				            .scale(scale)					            
				            .translate([dim.width / 2, dim.height /2+su_2])
				            ;
        
        
        var path = d3.geoPath().projection(projection);
        
        
        
        var svg = d3.select(svg_elem)
        				.append("g")
				        .attr("width", dim.width-hz_gap_re)
				        .attr("height", dim.height)
				        .attr("x",0)
				        .attr("y",0)
				        .attr("transform", "translate(0, 0)")
//				        .attr("filter", "url(#normal_shadow)")
				        ;
        
        
        svg.selectAll(".district")
			  .data(districts.features)
			  .enter()
			  .append("path")
			  .attr("class", "district")
			  .style("fill", function(d) {
				  return "#fff"; 
			  })
			  .attr("d", path)
			  ;

        
        svg.selectAll(".disputed")
	        .data(disputed.features)
	        .enter().append("path")
	        .attr("class", "disputed")
	        .attr("d", path);
     
     
        
        svg.selectAll("circle")
			.data(reshape_location_data).enter()
			.append("circle")
			.attr("class", "map_circle")
			.attr("cx", function (d) {
				return ( projection(d.position)[0] ); 
			})
			.attr("cy", function (d) {
				return ( projection(d.position)[1] ); 
			})
			.attr("opacity", 1.0)
			.attr("r", "8px")
			.attr("fill",  function (d) {
//				var color_palette = ["#b2c8f0","#009fff","#6678e8","#b2c8f0","#22c8e6"];				
				return color_palette[d.touchType-1];
			})
			.attr("fill-opacity", function (d) {

				return ( parseFloat(d.touchCount)/parseFloat(max_touchCount_map_array[d.touchType]*1.2) ); 
			})
			.attr("data-touchType", function (d) {

				return (d.touchType); 
			})			
			;
        
        


        
        
//        draw_world_indicator(svg_elem);
//        draw_no_location_indicator(svg_elem);
        
        
		console.log(country_data);
		console.log(reshape_location_data);

		
//		$.each(reshape_location_data, function( i, data_elem ) {
//			
//			
//			if (d3.geoContains(india_data.features[0], data_elem.position )){
//				
//			}
//			else{
//				console.log("india_data.features := ");
//				console.log(data_elem);
//			};
//			
//			
//		});

		Promise.all([_reshape_world_indicator_data(svg_elem,reshape_location_data,country_data)])
			   .then( function ([indicator_data]){
				   
				   draw_world_indicator(indicator_data);
				   
				   draw_no_location_indicator(indicator_data);
				   
				   console.log(indicator_data);
				   
				   
			   });

		
    	
        


	}
	
	
	
	function _reshape_world_indicator_data(svg_elem,reshape_location_data,country_data)
	{
		var deferred = new $.Deferred();
		var reshape_world_indicator_data = [];
		var final_reshape_world_indicator_data = null;
		
		
		var world_visit_count = 0;
		var world_purchase_count = 0;
		var world_cartexit_count = 0;
		var location_data_length = reshape_location_data.length;

		
		var dataset = [
		    {"touchType":"2016", "value": .56},
		    {"touchType":"2017", "value": .95},
		    {"touchType":"2018", "value": .81}
		];
		
		
		
		
		
		$.each(reshape_location_data, function( i, data_elem ) {
			
//			console.log("_reshape_world_indicator_data.reshape_location_data data_elem:= ");
//			console.log(data_elem.position);
//			console.log(i);
			
			
			if (d3.geoContains(country_data.features[0], data_elem.position )){
//				console.log("Inside");
				
			}
			else{
//				console.log("Outside");
//				console.log(data_elem);
				
				if (data_elem.touchType==1){
					world_visit_count = world_visit_count+data_elem.touchCount;
					
				}
				else if(data_elem.touchType==2) {
					world_purchase_count = world_purchase_count+data_elem.touchCount;
				}
				else if(data_elem.touchType==3) {
					world_cartexit_count = world_cartexit_count+data_elem.touchCount;
				};
				
			};
			
			if (location_data_length-1==i){
				
				final_reshape_world_indicator_data = {
						svg_elem : svg_elem,
						dataset : [
						    {"touchType":"Visits", "value": world_visit_count},
						    {"touchType":"Purchases", "value": world_purchase_count},
						    {"touchType":"Cart Exits", "value": world_cartexit_count}
						]						
				};
				
				console.log("_reshape_world_indicator_data.reshape_location_data : final_reshape_world_indicator_data := ");
				console.log(final_reshape_world_indicator_data);
				
				
//				return;
				};
			
			
		});
		
		
		
		
		deferred.resolve(final_reshape_world_indicator_data);
		
		return deferred.promise();
		
	}
	
	
	

	function _reshape_map_data(location_data)
	{
		var deferred = new $.Deferred();
		
		console.log(location_data);
		
		
		var location_data_length = location_data.length;		
		var reshape_location_data = [];		
		var reshape_location_data2 = [];
		
		

		
		$.each(location_data, function( i, data_elem ) {
			
//			console.log("--------");
//			console.log(i);
//			console.log(data_elem);
			
			if (max_touchCount_map_array[data_elem.touchType]<data_elem.touchCount){
				max_touchCount_map_array[data_elem.touchType]=data_elem.touchCount;
				
			};
			
			reshape_location_data.push(
			{
				touchType : data_elem.touchType,
				touchCount : data_elem.touchCount,
				position : [					
					parseFloat(data_elem.lon),
					parseFloat(data_elem.lat)					
				]				
			}		
			
			
			);
			
			
			
			if (location_data_length-1==i){
//			if (5==i){
				
//				console.log("map.reshape_map_data : reshape_location_data := ");
//				console.log(reshape_location_data);
				reshape_location_data2 = reshape_location_data;
				return;

				
			};
			
		});
		
		
		
		deferred.resolve(reshape_location_data2);
		
		return deferred.promise();
		
	}
	

}





