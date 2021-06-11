var location_data = null;

var location_map = {};

var map;
var heatmap =null ;


var rectangle = null;

var lat_avg = 0;
var lon_avg = 0;

var max_touch_count = [0,0,0,0];

var map_circle_array = [];






function init_overview_map()
{
    $("<div class='layer1 left_col col'> </div>").appendTo(".main_content");

	
	draw_map_location_tool();
    
//    draw_mini_map_tool();
    
    Promise.all([get_item_location_all()]).then(function (){
    	

    	Promise.all([compute_location()]).then(function (){
    		
//        	console.log(location_map);	

    		update_map_location_tool(0);
    		
    		
		
    	});
    	
		
	    height_cascade();
	});
    


}






function draw_map_location_tool()
{
	
	var tool_class_name = "map_location";
	var tool_dot_class_name = " ."+tool_class_name;

	
	var tool_dot_class_name = "."+tool_class_name;
	

	var tool_w = lu*11;
	var tool_max_h = su*11;
		

	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Heatmap </div>"+
			"<div class='tool_box_header_btn up_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<div id='map'></div>" +
			"</div>" +
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
		
		console.log("up_btn");
		
		var dim = $(tool_dot_class_name)[0].getBoundingClientRect();

		window.scrollTo(0, dim.y);
		
	});
	
	
	$(tool_dot_class_name+" .tool_box_content")
		.css({
			
			height:tool_max_h,

		});
	
	
	
	draw_loading_div($(tool_dot_class_name+" .tool_box_content"),{x:(0),y:(0)})


	
	height_cascade();
	
	
	
}







function update_map_location_tool(display_touch_type)
{
	
	
	var mapOptions = {
	        center: new google.maps.LatLng(lat_avg, lon_avg),
	        zoom : 4,
	        mapTypeControlOptions: {
	            mapTypeIds: []
	        },
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        streetViewControl: false,
//	        disableDefaultUI: true,
	        styles : [
	            {
	                "featureType": "all",
	                "elementType": "geometry.fill",
	                "stylers": [
	                    {
	                        "weight": "2.00"
	                    }
	                ]
	            },
	            {
	                "featureType": "all",
	                "elementType": "geometry.stroke",
	                "stylers": [
	                    {
	                        "color": "#9c9c9c"
	                    }
	                ]
	            },
	            {
	                "featureType": "all",
	                "elementType": "labels.text",
	                "stylers": [
	                    {
	                        "visibility": "on"
	                    }
	                ]
	            },
	            {
	                "featureType": "landscape",
	                "elementType": "all",
	                "stylers": [
	                    {
	                        "color": "#f2f2f2"
	                    }
	                ]
	            },
	            {
	                "featureType": "landscape",
	                "elementType": "geometry.fill",
	                "stylers": [
	                    {
	                        "color": "#ffffff"
	                    }
	                ]
	            },
	            {
	                "featureType": "landscape.man_made",
	                "elementType": "geometry.fill",
	                "stylers": [
	                    {
	                        "color": "#ffffff"
	                    }
	                ]
	            },
	            
	            {
	                "featureType": "poi.park",
	                "elementType": "geometry",
	                "stylers": [
	                    {
	                        "color": "#dedede"
	                    },
	                    {
	                        "lightness": 21
	                    }
	                ]
	            },
	            {
	                "featureType": "poi.park",
	                "elementType": "geometry.fill",
	                "stylers": [
	                    {
	                        "color": "#d1ecc7"
	                    }
	                ]
	            },
	            {
	                "featureType": "road",
	                "elementType": "all",
	                "stylers": [
	                    {
	                        "saturation": -100
	                    },
	                    {
	                        "lightness": 45
	                    }
	                ]
	            },
	            {
	                "featureType": "road",
	                "elementType": "geometry.fill",
	                "stylers": [
	                    {
	                        "color": "#eeeeee"
	                    }
	                ]
	            },
	            {
	                "featureType": "road",
	                "elementType": "labels.text.fill",
	                "stylers": [
	                    {
	                        "color": "#7b7b7b"
	                    }
	                ]
	            },
	            {
	                "featureType": "road",
	                "elementType": "labels.text.stroke",
	                "stylers": [
	                    {
	                        "color": "#ffffff"
	                    }
	                ]
	            },
	            {
	                "featureType": "road.highway",
	                "elementType": "all",
	                "stylers": [
	                    {
	                        "visibility": "simplified"
	                    }
	                ]
	            },
	            {
	                "featureType": "road.arterial",
	                "elementType": "labels.icon",
	                "stylers": [
	                    {
	                        "visibility": "off"
	                    }
	                ]
	            },
	            {
	                "featureType": "transit",
	                "elementType": "all",
	                "stylers": [
	                    {
	                        "visibility": "off"
	                    }
	                ]
	            },
	            {
	                "featureType": "water",
	                "elementType": "all",
	                "stylers": [

	                    {
	                        "visibility": "on"
	                    }
	                ]
	            },
	            
	            {
	                "featureType": "water",
	                "elementType": "labels.text.fill",
	                "stylers": [
	                    {
	                        "color": "#070707"
	                    }
	                ]
	            },
	            {
	                "featureType": "water",
	                "elementType": "labels.text.stroke",
	                "stylers": [
	                    {
	                        "color": "#ffffff"
	                    }
	                ]
	            }
	        ]

	    };

	

	map = new google.maps.Map(document.getElementById('map'), mapOptions);
	 
	

	$.each(location_map, function( i, data_elem ) {
		
		
		var fillColor = colors.touch_type[0];
   	 	if (data_elem.touchType==1){fillColor = colors.visit;}
   	 	else if (data_elem.touchType==2){fillColor = colors.purchase;}
   	 	else if (data_elem.touchType==3){fillColor = colors.cartexit;}
   	 	
   		
   	 
//		console.log(i);

   	 	var fill_opacity = data_elem.touchCount/max_touch_count[data_elem.touchType]<0.04 ? 0.04 : data_elem.touchCount/max_touch_count[data_elem.touchType];
	
   	 	
   	 	
   	 	
   	 	var circle = new google.maps.Circle({
	         strokeColor: '#FFF',
	         strokeOpacity: 0,
	         strokeWeight: 0,
	         fillColor: fillColor,
	         fillOpacity: fill_opacity,
	         map: map,
//	         center:new google.maps.LatLng(33.808678, -117.918921),
	         center:new google.maps.LatLng(data_elem.lat,data_elem.lon),
	         radius: 1000*111*0.666,
	         
		});
		
		
		google.maps.event.addListener(circle, 'mouseover', function (event) {
			console.log('circle radius changed');
			console.log(event);
			console.log(i);
			console.log(data_elem);
		        
		});
		
		map_circle_array.push({
								circle:circle,
								data:data_elem,
								location: new google.maps.LatLng(data_elem.lat,data_elem.lon),
								weight: data_elem.touchCount/max_touch_count[data_elem.touchType],
							 });
		
		
		if ((i+1)==location_map.length){
			
			draw_chart_legends($(".map_location .tool_box_content"),{x:(lu*11-su*7),y:(su+su_8)});
			draw_checkbox();
			draw_maptype_switch_tool();
			$(".map_location .tool_content_loader").remove();

			
		};

   	 
		
	});
	
    
    
	

}





function update_map_circles(display_touch_type)
{
	
	
	if (heatmap!=null){
		heatmap.setMap(null);

	};	 	
	
	$.each(map_circle_array, function( i, data_elem ) {
		
		
		
		
	
   	 	var data_elem = map_circle_array[i];
   	 	
//   	 	console.log(data_elem);

   	 	if (display_touch_type==-1){
   	 		data_elem.circle.setVisible(false);
   	 	}
   	 	else if (display_touch_type>0){
   	 		
   	 	
	   	 	if (data_elem.data.touchType!==display_touch_type){
	   	 		data_elem.circle.setVisible(false);
	   	 	}
	   	 	else{
	   	 		data_elem.circle.setVisible(true);
	   	 	};
   	 	
   	 	}
   	 	else{
   	 		
   	 		data_elem.circle.setVisible(true);
   	 		
   	 	};
   	 	
   	 	
//   	 	data_elem.fillOpacity = 0;
//   	 	
//   	 	if 
//   	 	
//   	 	data_elem.setMap(null);
//   	 	
//		if ((data_elem.touchType==1 && display_touch_type!=1)&&(display_touch_type!=0)){data_elem.fillOpacity = 0;}
//	 	else if ((data_elem.touchType==2 && display_touch_type!=2)&&(display_touch_type!=0)){data_elem.fillOpacity = 0;}
//	 	else if ((data_elem.touchType==3 && display_touch_type!=3)&&(display_touch_type!=0)){data_elem.fillOpacity = 0;}
//

   	 	

//   	 	console.log(data_elem.fillOpacity);
   	 


		
	});	
}







function draw_checkbox()
{

//	console.log("draw_checkbox - ");
	
	
	var dim = d3.select(".map_location").node().getClientRects()[0];
	var radio_html_w = 167;
//	console.log("draw_checkbox : dim:=");
//	console.log(dim);
	
	
	var radio_html = $('<div class="map_radio small_text bold_text"> '+
						  '<input type="radio" id="option-one" value="all" name="selector" checked>'+
				          '<label for="option-one">All</label>'+              
					      '<input type="radio" id="option-one" value="visit" name="selector">'+
			              '<label for="option-one">Visits</label>'+
			              '<input type="radio" id="option-two" value="purchase" name="selector">'+
			              '<label for="option-two">Purchases</label>'+
			              '<input type="radio" id="option-three" value="cartexit" name="selector">'+
			              '<label for="option-three">Cart Exits</label></div>') 
			             
			              ;
	
	
	
	
	
	$(".map_location .tool_box_content").append(radio_html);
	


	
	
	
	radio_html.css("top",(su+su_4));
	radio_html.css("left",( su_8 ) );

	
	$( "input[type=radio]" ).on( "click", function(d){
		
		console.log("draw_checkbox : $(this):=");
		console.log($(this));
		
		console.log("draw_checkbox : $(this).val:=");
		console.log($(this).val());
		
		console.log("draw_checkbox : $(this).is(:checked):=");
		console.log($(this).is(":checked"));

		
		if ($(this).is(":checked")){
			
//			if ($(this).val()==="all"){
//				update_map_circles(0);
//			};
//			if ($(this).val()==="visit"){
//				
//				update_map_circles(1);
//			};
//			if ($(this).val()==="purchase"){
//				update_map_circles(2);
//
//			};
//			if ($(this).val()==="cartexit"){
//				update_map_circles(3);
//
//			};
			
			var checkbox_values = ["all","visit","purchase","cartexit"];

			console.log($( ".switch_tool input[type=checkbox]:checked" ).length);
			
			console.log(checkbox_values.indexOf($(this).val()));
			
			$( ".switch_tool input[type=checkbox]").prop("checked", false);

			if ($( ".switch_tool input[type=checkbox]:checked" ).length==0){
				
				update_heatmap(-1);
				update_map_circles(checkbox_values.indexOf($(this).val()));

				
			}
			else{
				
				update_heatmap(checkbox_values.indexOf($(this).val()));
				update_map_circles(-1);

				
			};

			
			
			
		}; 
		
		
	});

	
	
	
}








function draw_maptype_switch_tool()
{
	
	var tool_w = lu*11;

	
	$("<div class=' switch_tool small_text bold_text'> " +
			"<div class=' switch_left_name '> Gridmap </div>" +
			"<div class=' switch_box small_text '> " +
				"<input type='checkbox' id='switch' /><label for='switch'>Toggle</label>  " +	  
			"</div> " +
			"<div class=' switch_right_name '>Heatmap</div>" +
	  "</div>")
	  .css({
			left:(400),
			top: (su+su_4+3),
//			visibility: "hidden",
//			width:(tool_w),
//			height:tool_max_h,
			
	  })
	  .appendTo( ".map_location .tool_box_content")
	  ;

	
	
	$( ".switch_tool input[type=checkbox]" ).on( "click", function(){
		
		var n = $( "input:checked" ).length;
		  
		var checkbox_values = ["all","visit","purchase","cartexit"];

		
		if (n==1){
			
			update_heatmap(-1);
			update_map_circles(checkbox_values.indexOf($( "input[type=radio]:checked" ).val()));

		}
		else{
			
			update_map_circles(-1);
			
			update_heatmap(checkbox_values.indexOf($( "input[type=radio]:checked" ).val()));
		};


		
	} );

	
	
	
}




function update_heatmap(display_touch_type)
{

	var checkbox_values = ["all","visit","purchase","cartexit"];
	
	
	if (display_touch_type==-1){
		if (heatmap != null){

			heatmap.setMap(null);
			heatmap = null;

		};
		
		update_map_circles(checkbox_values.indexOf($( ".switch_tool input[type=radio]:checked" ).val()));
		
	}
	else if (display_touch_type==0){
		heatmap = new google.maps.visualization.HeatmapLayer({
			  data: map_circle_array,
			  map: map,
			  dissipating : true,
			  radius : 12,

		});

	}
	else{
		
		console.log(display_touch_type);
		
		update_map_circles(-1);
		
//		if (heatmap != null){
//			console.log("heatmap != null");
//
//			heatmap.setMap(null);
//
//			heatmap = null;
//
//		}
//		else{
//			console.log("heatmap == null");
//		};
		
		
//		heatmap.setData(map_circle_array.filter(d=> d.data.touchType===display_touch_type));
//		heatmap.setMap(map);
		
		heatmap = new google.maps.visualization.HeatmapLayer({
			  data: map_circle_array.filter(d=> d.data.touchType===display_touch_type),
			  map: map,
			  radius : 12,

		});

		
	};
	
	
	
}





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
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin' height="+su*2+"> </svg>"+
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
		
		window.location ="overview/map";
		
	});
	
	
	
	
	
	draw_chart_legends($(tool_dot_class_name+" .tool_box_content"),{x:(tool_w-su*6),y:(su_la)})

	
}






function update_mini_map_tool()
{
	console.log("update_mini_map_tool ==> ");
	
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
				  .attr("class", " x_axis ")
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
     		
    
     	 
	 
	 
}




function compute_location()
{
    var deferred = new $.Deferred();
    
    var _length = location_data.length;

    for (var i=0; i<_length; i++){
    	
    	var data_elem = location_data[i];
    	    	
//    	console.log(data_elem);
    	
//    	console.log( Math.floor( data_elem.lat ) );
    	
    	var data_elem_lat = Math.floor( data_elem.lat );
    	var data_elem_lon = Math.floor( data_elem.lon );
		var data_elem_type = data_elem.touchType;

    	
    	lat_avg = lat_avg + data_elem.lat;
		lon_avg = lon_avg + data_elem.lon;
		
		
    	
    	    	
    	if (typeof location_map[[data_elem_lat,data_elem_lon,data_elem.touchType]] == "undefined") {    	
    		
    		
    		
    		
    		location_map[[data_elem_lat,data_elem_lon,data_elem.touchType]] = {
    				
    				"lat":data_elem.lat,
    				"lon":data_elem.lon,
    				"touchType":data_elem.touchType,
    				"touchCount":data_elem.touchCount,
    				
    				
    		};
    	}
    	else{
    		
    		location_map[[data_elem_lat,data_elem_lon,data_elem_type]].touchCount 
    						= location_map[[data_elem_lat,data_elem_lon,data_elem_type]].touchCount 
    							+  data_elem.touchCount;
    		
    		if (max_touch_count[data_elem_type]<location_map[[data_elem_lat,data_elem_lon,data_elem_type]].touchCount ){
    			
    			
    			max_touch_count[data_elem_type]=location_map[[data_elem_lat,data_elem_lon,data_elem_type]].touchCount ;
    		};
    	};
    	
    	
    	
    	
    	
    	location_data[i] = null;
    	
    	if (_length==(i+1)){
        	
    		lat_avg = lat_avg/_length;
			lon_avg = lon_avg/_length;
		
    		location_map = Object.values(location_map);
    		
    		location_data = null;
    		
		    deferred.resolve();
    	};
    }
    
    
    
    return deferred.promise();
	
}









function get_item_location_all()
{
//	console.log("footfalls.get_item_location : item_id :=" +item_id);

	var deferred = new $.Deferred();

	$.ajax({
		type: "POST",
	    url: "itemlocation/get/all",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
//	    data:  JSON.stringify( {"itemId": current_item_id}),
	    success: function(data)
	    {
//	    	console.log("footfalls.get_item_location_al : 1.data :=");
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

