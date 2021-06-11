var location_data = null;

var heatMapData = [
		  {location: new google.maps.LatLng(37.782, -122.447), weight: 0.5},
		  new google.maps.LatLng(37.782, -122.445),
		  {location: new google.maps.LatLng(37.782, -122.443), weight: 2},
		  {location: new google.maps.LatLng(37.782, -122.441), weight: 3},
		  {location: new google.maps.LatLng(37.782, -122.439), weight: 2},
		  new google.maps.LatLng(37.782, -122.437),
		  {location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},

		  {location: new google.maps.LatLng(37.785, -122.447), weight: 3},
		  {location: new google.maps.LatLng(37.785, -122.445), weight: 2},
		  new google.maps.LatLng(37.785, -122.443),
		  {location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
		  new google.maps.LatLng(37.785, -122.439),
		  {location: new google.maps.LatLng(37.785, -122.437), weight: 2},
		  {location: new google.maps.LatLng(37.785, -122.435), weight: 3}
		];

var map;

var rectangle = null;

var lat_avg = 0;
var lon_avg = 0;


var max_touch_count = [0,0,0,0];

var map_circle_array = [];



var mini_map_data = [
	
	
	{
        "category": "Worldwide", 
        "values": [						            
            {
                "value": 0, 
                "type": "Visits"
            }, 
            {
                "value": 0, 
                "type": "Purchase"
            }, 
            {
                "value": 0, 
                "type": "Cart Exits"
            }
        ]
    }, 

	
	{
        "category": "Unknown", 
        "values": [						            
            {
                "value": 0, 
                "type": "Visits"
            }, 
            {
                "value": 0, 
                "type": "Purchase"
            }, 
            {
                "value": 0, 
                "type": "Cart Exits"
            }
        ]
    }

 ];


function init_item_map()
{

	$("<div class='layer1 left_col col'> </div>").appendTo(".main_content");

	$("<div class='layer1 right_col col'> </div>").appendTo(".main_content");
	
	draw_map_location_tool();
	
	
	draw_mini_map_tool();
		
		
	draw_item_info_tool();	
	    
    Promise.all([get_single_item_data(current_item_id)]).then(function (){
    	
    	current_item_data = single_item_data;
    	
    	update_item_info();
    	
    });  
	    		
	Promise.all([get_item_location()])
	   .then( function (){
		   
		   console.log(location_data);	
		   
		   Promise.all([reshape_location_data()]).then( function (){
			   
			   draw_map();
			   
			   update_mini_map_tool();
			   
			   height_cascade();
			   
		   });		   
		   
	   });
	
	init_export_btn();
	
	
	height_cascade();
}




function draw_mini_map_tool()
{
	
	
	
	var tool_class_name = "item_mini_map";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*8;
	var tool_max_h = su*3;
	
	
	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Map </div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin'> </svg>"+
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
	

	
}






function update_mini_map_tool()
{
	console.log("update_mini_map_tool ==> ");
	
    var margin = {top: 10, right: 25, bottom: 40, left: 50};


	
	var barchart_w = lu*7;
	var barchart_h = su;
	
	var item_map_svg = d3.select(".item_mini_map_svg")
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
				  .attr("class", "mini_chart_axis_x")
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
		    	  
		    	  console.log(colors.touch_type);
		    	  console.log(d);
		    	  console.log(i);
		    	  console.log(colors.touch_type[i]);
		    	  
		    	  
		    	  
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
     		
    
     		
    var rect_w =  su_3;
    var rect_h =  su_4;
    var x_offset = su*2;
    
    
     		
	d3.select(".item_mini_map_svg")     
    	.append("rect")    
 		.style("fill", colors.visit)
        .attr("width", rect_w)
        .attr("height",rect_h)
        .attr("x",barchart_w/2+x_offset)
        .attr("y",su_8)
        ;
        		
	 
		
	d3.select(".item_mini_map_svg")     
    	.append("text")
    	.attr("class","chart_main_legend_text")
    	.text("Visits")
 		.attr("x",barchart_w/2+rect_w+su_8+x_offset)
 		.attr("y",(su_4))
 		.style("text-anchor", "start")
        ;
        		
        
	 
		
	d3.select(".item_mini_map_svg")     
    	.append("rect")    
 		.style("fill", colors.purchase)
        .attr("width", su_3)
        .attr("height",su_4)
        .attr("x",barchart_w/2+lu+x_offset)
        .attr("y",su_8)
        ;
        		
	 
		
	d3.select(".item_mini_map_svg")     
    	.append("text")
    	.attr("class","chart_main_legend_text")
    	.text("Purchases")
        .attr("x",barchart_w/2+lu+rect_w+su_8+x_offset)
 		.attr("y",(su_4))
 		.style("text-anchor", "start")
        ;
	
	   
	 
	
	d3.select(".item_mini_map_svg")     
    	.append("rect")    
 		.style("fill", colors.cartexit)
        .attr("width", su_3)
        .attr("height",su_4)
        .attr("x",barchart_w/2+lu+lu+x_offset)
        .attr("y",su_8)
        ;
        		
	 
		
	d3.select(".item_mini_map_svg")     
    	.append("text")
    	.attr("class","chart_main_legend_text")
    	.text("Cart Exits")
 		.attr("x",barchart_w/2+lu+lu+rect_w+su_8+x_offset)
 		.attr("y",(su_4))
 		.style("text-anchor", "start")
        ;
        			 
	 
	 
}






function draw_map_location_tool()
{
	
	var tool_class_name = "map_location";
	var tool_dot_class_name = " ."+tool_class_name;

	
	var tool_dot_class_name = "."+tool_class_name;
	
	var tool_w = lu*8;
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
	
	
	draw_loading_div($(tool_dot_class_name+" .tool_box_content"),{x:(0),y:(0)})

	
	height_cascade();
	
	
	
	
	
//	Promise.all([get_item_item_sim_data(central_itemId)]).then(function (data){
//		
//		
//		upldate_item_info();
//		
//		Promise.all([reshape_pred_graph_data(data)]).then(draw_pred_graph);
//		
//		
//		
//		
//	});

	
	
	
	
	
}








function reshape_location_data()
{
	
	
	var deferred = new $.Deferred();

	
	
	var location_data_l = location_data.length;
	
	
	
	for (var i =0; i<location_data_l; i++){
		
		var data_elem = location_data[i];
//		console.log(data_elem);
		
		lat_avg = lat_avg + data_elem.lat;
		lon_avg = lon_avg + data_elem.lon;
		
		if ((data_elem.lat<0)||(data_elem.lon<0)){
			
			if (data_elem.touchType==1){
				
				mini_map_data[1].values[0].value = mini_map_data[1].values[0].value + data_elem.touchCount;
				
			}
			else if (data_elem.touchType==2){
				
				mini_map_data[1].values[1].value = mini_map_data[1].values[1].value + data_elem.touchCount;
				
			}
			else if (data_elem.touchType==3){
				
				mini_map_data[1].values[2].value = mini_map_data[1].values[2].value + data_elem.touchCount;
				
			} 
			
			
		}
		else {
			

			if (data_elem.touchType==1){
				
				mini_map_data[0].values[0].value = mini_map_data[0].values[0].value + data_elem.touchCount;
				
			}
			else if (data_elem.touchType==2){
				
				mini_map_data[0].values[1].value = mini_map_data[0].values[1].value + data_elem.touchCount;
				
			}
			else if (data_elem.touchType==3){
				
				mini_map_data[0].values[2].value = mini_map_data[0].values[2].value + data_elem.touchCount;
				
			} 
		};
			
		
		
		if (i+1==location_data_l){
			
			lat_avg = lat_avg/location_data_l;
			lon_avg = lon_avg/location_data_l;
			
			console.log(mini_map_data);

	    	deferred.resolve();

		}
		
	}
	
	
	
	return deferred.promise();
}




function draw_map()
{
	var mapOptions = {
	        center: new google.maps.LatLng(lat_avg, lon_avg),
	        zoom : 4,
	        mapTypeControlOptions: {
	            mapTypeIds: []
	        },
	        mapTypeId: google.maps.MapTypeId.roadmap,
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
	
	
	
	
	console.log(mapOptions);

	map = new google.maps.Map(document.getElementById('map'), mapOptions);
 
 
	$.each(location_data, function( i, data_elem ) {
		
		
		var fillColor = colors.touch_type[0];
   	 	if (data_elem.touchType==1){fillColor = colors.visit;}
   	 	else if (data_elem.touchType==2){fillColor = colors.purchase;}
   	 	else if (data_elem.touchType==3){fillColor = colors.cartexit;}
		
   	 	
   	 	var circle = new google.maps.Circle({
	         strokeColor: '#FFF',
	         strokeOpacity: 0,
	         strokeWeight: 0,
	         fillColor: fillColor,
	         fillOpacity: 0.5,
	         map: map,
//	         center:new google.maps.LatLng(33.808678, -117.918921),
	         center:new google.maps.LatLng(data_elem.lat,data_elem.lon),
	         radius: 1000*111*0.66,
	         
		});
		
		
		google.maps.event.addListener(circle, 'mouseover', function (event) {
			console.log('circle radius changed');
			console.log(event);
			console.log(i);
		        
		});

		


		
		
		
		if ((i+1)==location_data.length){
			
			draw_chart_legends($(".map_location .tool_box_content"),{x:(lu*8-su*6.5),y:(su)});
			draw_checkbox();
//			draw_maptype_switch_tool();
			$(".map_location .tool_content_loader").remove();

			
		};
		
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
		
	
	radio_html.css("top",(su+su_8));
	radio_html.css("left",( su_8 ) );

	
	$( "input[type=radio]" ).on( "click", function(d){
		
//		console.log("draw_checkbox : $(this):=");
//		console.log($(this));
//		
//		console.log("draw_checkbox : $(this).val:=");
//		console.log($(this).val());
//		
//		console.log("draw_checkbox : $(this).is(:checked):=");
//		console.log($(this).is(":checked"));

		
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
				
//				update_heatmap(-1);
				update_map_circles(checkbox_values.indexOf($(this).val()));

				
			}
			else{
				
//				update_heatmap(checkbox_values.indexOf($(this).val()));
				update_map_circles(-1);

				
			};

			
			
			
		}; 
		
		
	});

	
	
	
}









function update_map_circles(display_touch_type)
{
	
	
//	if (heatmap!=null){
//		heatmap.setMap(null);
//
//	};	 	
	
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










function init_export_btn()
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
    					"<div class='modal_export_row small_text'> Product Location Data" +
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
    					_map_data_download();
    					
    				});
				

				$(".production_data_download")
    				.click(function(){
    					
    					_product_data_download();
    				});
				
				
				
			});
	

	
	
	
	
	var _map_data_download = function ()
	{
		console.log(current_item_data);	
		
		var export_data = [];
		
		
		export_data.push(["====","====","====","===="]);
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
		export_data.push(["====","====","====","===="]);
		export_data.push(["Available Map Coordinate"]);
		export_data.push([""]);
		var export_item_row_header = [ 	"Index", "Lattitude", "Longitude",	"Touch Type","Footfall" 	];		
		export_data.push(export_item_row_header);
		
		var _length = location_data.length;
		var count = 0;

		for (var i=0; i<_length; i++ ){
			
			var data_elem = location_data[i];
			
			
				
			count = count+1;
			export_data.push([
				count,
				data_elem["lat"],
				data_elem["lon"],
				data_elem["touchType"],
				data_elem["touchCount"],
				
				
				
			]);
			
			
			if (i+1==_length){
				
				console.log(export_data);		
				


				var csvString = export_data.map(row => row.join(',')).join('\n');
				var a         = document.createElement('a');
				a.href        = 'data:attachment/csv,' +  encodeURIComponent(csvString);
				a.target      = '_blank';
				a.download    = 'Product_Location_'+string_trim(current_item_data.nameStr,20)+'['+current_item_data.itemId+']'+'.csv';
				
				document.body.appendChild(a);
				a.click();
				
			}
			
			
		}

		
		
		
		
		
		
		
	}
	
	
	
	
	
	var _product_data_download = function ()
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








function get_item_location()
{
//	console.log("footfalls.get_item_location : item_id :=" +item_id);

	var deferred = new $.Deferred();

	$.ajax({
		type: "POST",
	    url: "itemlocation/get",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify( {"itemId": current_item_id}),
	    success: function(data)
	    {
//	    	console.log("footfalls.get_item_location : 1.data :=");
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