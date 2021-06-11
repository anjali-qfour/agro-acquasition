
var opt_data = null;

var optimization_data = [];

var x_max = 0;
var y_max = 0;
var z_max = 0;

var x_min = 10000;
var y_min = 10000;
var z_min = 10000;

xGrid = [], scatter = [], zLine = [];



function init_overview_optimization()
{
	
	$("<div class='layer1 left_col col'> </div>").appendTo(".main_content");
		
	draw_optimization_tool();
	
	Promise.all([get_anomaly_item_category_data()]).then(function (){
//		compute_anomaly_item_category_data();
		
		
		Promise.all([compute_anomaly_item_category_data()]).then(function (){
			update_optimization_tool();
		});

	});
	
 
}



function draw_optimization_tool()
{
    var tool_class_name = "optimization";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*11;
	var tool_max_h = su*12;

	
	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Conversion Predictor </div>"+
			"<div class='tool_box_header_btn up_btn flat_btn'></div>"+
			"<div class='tool_box_header_btn settings_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<div class='tool_box_content_comment'> Ratios over entire timeline</div>"+			
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin' height=660> </svg>"+
			"<div class='tool_box_settings'> </div>"+
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
		
//		console.log("up_btn");
		
		var dim = $(tool_dot_class_name)[0].getBoundingClientRect();
		
		window.scrollTo(0, dim.y+window.scrollY-gap_su_1);
		
	});
	
	$(tool_dot_class_name+" .settings_btn ").click(function(){
		
//		console.log("settings_btn");
		document.querySelector(tool_dot_class_name+" .tool_box_settings ").classList.toggle("expand");

		
	});
	
	$(tool_dot_class_name+" .tool_box_settings ")
		.css({
			left:(tool_w-lu-su_2),
			top: (su+su_3),
			
		})
		.click(function(){
			
			
			
		});
	
	
	
	
	height_cascade();
    
}



function compute_anomaly_item_category_data()
{
	
	var deferred = new $.Deferred();
	
	
	var z_max = 16;
	
	
	var j=10;

   
    
    for(var y = -j; y < j; y=y+1)
    {
        for(var x = -j; x < j; x=x+1)
        {
//        	console.log("x="+x);
//        	console.log("y="+y);
        	
            xGrid.push([x, y, 0]);
        }
    }

    d3.range(0, (z_max+2*z_max/10), z_max/10).forEach(function(d){
    	zLine.push([0, 0, d]); 
    	
    });

	
	for (var i=0; i<anomaly_item_category_data.length; i++){    		
		
		var data_elem = anomaly_item_category_data[i];
		
		if (data_elem.pc1>x_max){
			x_max = data_elem.pc1;
		}
		
		if (data_elem.pc2>y_max){
			y_max = data_elem.pc2;
		}
		
		if (data_elem.normNetSell>z_max){
			z_max = data_elem.normNetSell;
		}
		
		
		if (data_elem.pc1<x_min){
			x_min = data_elem.pc1;
		}
		
		if (data_elem.pc2<y_min){
			y_min = data_elem.pc2;
		}
		
		if (data_elem.normNetSell<z_min){
			z_min = data_elem.normNetSell;
		}
		
//		console.log(data_elem);
		
        scatter.push(
        		{
        			x: data_elem.pc1, y: data_elem.pc2, z: data_elem.normNetSell*z_max, 
        			id: 'point_' + i , item_id : data_elem.item_id,
        			normDistance: data_elem.normDistance,
        			rank: data_elem.rank,
        		});

		
		if (i+1==anomaly_item_category_data.length){
			
	    	deferred.resolve(anomaly_item_category_data);
			
		};
		
		
	}
	
	return deferred.promise();

}



function update_optimization_tool()
{

	var origin = [500, 430]; 
	var j = 10; 
	var scale = 23;
 
	var beta = 0; 
	var alpha = 0; 
	var key = function(d){ return d.id; }; 
	var startAngle = Math.PI/4;
	var distance_threshold = 1;
	
	var xAngle = startAngle*1;
	var yAngle = 0;
	var zAngle = startAngle*1;
		
	var this_chart_w = lu*11;
	var this_chart_h = su*10;
	
	
	var extent = [
		[0, 0], 
		[this_chart_w , this_chart_h ]
	];
	var zoom_scale = 1;
	
	
    var svg = d3.select('.optimization_svg').call(
						    		d3.drag()
										.on('drag', dragged)
										.on('start', dragStart)
										.on('end', dragEnd)
		    							
										).append('g');
	d3.select('.optimization_svg').call(d3.zoom()
											.scaleExtent([-100, +100])
											.translateExtent(extent)
											.extent(extent)
											.on("zoom", zoomed)).append('g');
	
	
    
    var color  = d3.scaleOrdinal(d3.schemeSet3);
    var mx, my, mouseX, mouseY;

    var grid3d = d3._3d()
			        .shape('GRID', 20)
			        .origin(origin)
			        .rotateX(xAngle)
			        .rotateY(yAngle)
			        .rotateZ(zAngle)
			        .scale(scale);

    var point3d = d3._3d()
			        .x(function(d){ return d.x; })
			        .y(function(d){ return d.y; })
			        .z(function(d){ return d.z; })
			        .origin(origin)
			        .rotateX(xAngle)
			        .rotateY(yAngle)
			        .rotateZ(zAngle)
			        .scale(scale);

    var zScale3d = d3._3d()
				        .shape('LINE_STRIP')
				        .origin(origin)
				        .rotateX(xAngle)
				        .rotateY(yAngle)
				        .rotateZ(zAngle)
				        .scale(scale);

    
    
    
    function processData(data, tt){

//    	console.log(data);
    	
        /* ----------- GRID ----------- */

        var xGrid = svg.selectAll('path.grid').data(data[0], key);

        xGrid
            .enter()
            .append('path')
            .attr('class', '_3d grid')
            .merge(xGrid)
            .attr('stroke', '#666')
            .attr('stroke-width', 0.1)
            .attr('stroke-opacity', 0.7)
            .attr('fill', function(d){ return d.ccw ? '#efefef' : '#999'; })
            .attr('fill-opacity', 0.95)
            .attr('d', grid3d.draw);

        xGrid.exit().remove();

        /* ----------- POINTS ----------- */

        var points = svg.selectAll('circle').data(data[1], key);
        

        points
            .enter()
            .append('circle')
            .attr('class', '_3d item_dots')
            .attr('opacity', 0)
            .attr('cx', posPointX)
            .attr('cy', posPointY)
            .attr('data-item_id', function(d){  return  d; })
            .merge(points)
            .transition().duration(tt)
            .attr('r', 6)
            .attr('fill', function(d){             	
            	return  d3.interpolateRdYlGn(d.normDistance);             	
            })
            .attr('opacity', function(d){  return  d.normDistance<distance_threshold ? 0.6:0.0; })
            .attr('cx', posPointX)
            .attr('cy', posPointY)
            .call(function(){
            	
            });

        points.exit().remove();

        /* ----------- z-Scale ----------- */

        var zScale = svg.selectAll('path.zScale').data(data[2]);

        zScale
            .enter()
            .append('path')
            .attr('class', '_3d zScale')
            .merge(zScale)
            .attr('stroke', 'black')
            .attr('stroke-width', .5)
            .attr('d', zScale3d.draw);

        zScale.exit().remove();

         /* ----------- y-Scale Text ----------- */

        var zText = svg.selectAll('text.zText').data(data[2][0]);

        zText
            .enter()
            .append('text')
            .attr('class', '_3d zText small_text faint_text')
            .attr('dx', '.3em')
            .merge(zText)
            .each(function(d){
                d.centroid = {x: d.rotated.x, y: d.rotated.y, z: d.rotated.z};
            })
            .attr('x', function(d){ return d.projected.x; })
            .attr('y', function(d){ return d.projected.y; })
            .attr('z', function(d){ return d.projected.z; })
            .text(function(d,i){
            	
//            	console.log(d );
//            	console.log(i );
//            	return d[2] >= 0 ? d[2] : '';
            	
            	var t = i;
            	
            	if (i==11){t=""};
            	if (i==10){t="Max"};
            	
            	return t;
            	
            });

        zText.exit().remove();

        d3.selectAll('._3d').sort(d3._3d().sort);
    }

    function posPointX(d){
        return d.projected.x;
    }

    function posPointY(d){
        return d.projected.y;
    }

    
    
    
    
    
	function init(){

		console.log(xGrid.length);
        
        
        var data = [
            grid3d(xGrid),
            point3d(scatter),
            zScale3d([zLine])
        ];
        
        
        processData(data, 1000);
    }

    function dragStart(){
        mx = d3.event.x;
        my = d3.event.y;
        
    }

    function dragged(){
        mouseX = mouseX || 0;
        mouseY = mouseY || 0;
        beta   = (d3.event.x - mx + mouseX) * Math.PI / 360 ;
        alpha  = (d3.event.y - my + mouseY) * Math.PI / 360  * (-1);
        var data = [
        	
        	grid3d.rotateY(beta - yAngle).rotateX(alpha + xAngle)(xGrid),
            point3d.rotateY(beta - yAngle).rotateX(alpha + xAngle)(scatter),
            zScale3d.rotateY(beta - yAngle).rotateX(alpha + xAngle)([zLine]),
        ];
        processData(data, 0);
    }

    function dragEnd(){
    	
        mouseX = d3.event.x - mx + mouseX;
        mouseY = d3.event.y - my + mouseY;
    }

    function zoomed() {

		console.log("zoomed");
		
		var current_zoom_scale = d3.event.transform.k;
		console.log("zoom_scale = "+zoom_scale);
		console.log("current_zoom_scale = "+current_zoom_scale);

		
		
		if (zoom_scale>current_zoom_scale){
			zAngle = zAngle + Math.PI / 12 ;
		
		}
		else{
			zAngle = zAngle - Math.PI / 12 ;
		};
		zoom_scale = current_zoom_scale;

		
//		console.log(d3.event.transform);
		
	
		var data = [
	        	grid3d.rotateZ( zAngle)(xGrid),
	            point3d.rotateZ(  zAngle) (scatter),
	            zScale3d.rotateZ(  zAngle) ([zLine]),
	        ];
		
		
	    processData(data, 0);
		
		
	}
	
    
    var throttle_ui = function(){
    	

    	$("<div class='scroll scroll4 small_text bold_text'>" +
    			"<div class='content'></div>" +
    			"<div class='scroll_perc'>100%</div>" +
    	"</div>")
    		.css({
    			left:(lu*8),
    			top: (su+su_3),
//    			width:(tool_w),
//    			height:tool_max_h,
//    			"min-height" : (tool_max_h),
    			
    		})
    		.data("view_status",1)
    		.click(function(){
    		
    		})
//    		.fadeTo(300, 0)
    		.appendTo(".optimization .tool_box_content .tool_box_settings")
    		.scroll(function(d) {
    			
    			var max_scroll = 800;

    			var scroll_y = parseInt($(this).scrollTop());
    			
    			distance_threshold = 1-scroll_y/max_scroll;
    			
    			console.log((Math.ceil(distance_threshold*100)));
    			
    			$(".scroll_perc").html((Math.abs(distance_threshold*100).toFixed(0))+"%");
    			
    			var data = [
    	        	grid3d.rotateZ( zAngle)(xGrid),
    	            point3d.rotateZ(  zAngle) (scatter),
    	            zScale3d.rotateZ(  zAngle) ([zLine]),
    	        ];
    		
    		
    	        processData(data, 0);
    			
    			
    		});
    		;
    	
    };
    
    throttle_ui();
    
    
	
	init();
	
	
	
	
	
}








function update_optimization_tool1()
{

	var origin = [500, 400]; 
	var j = 10; 
	var scale = 8;
	var scatter = []; 
	var zLine = []; 
	var xGrid = []; 
	var beta = 0; 
	var alpha = 0; 
	var key = function(d){ return d.id; }; 
	var startAngle = Math.PI/4;
	
	var xAngle = startAngle*1;
	var yAngle = 0;
	var zAngle = startAngle*1;
		
	var this_chart_w = lu*11;
	var this_chart_h = su*10;
	
	
	var extent = [
		[0, 0], 
		[this_chart_w , this_chart_h ]
	];
	var zoom_scale = 1;
	
	
    var svg    = d3.select('.optimization_svg').call(
						    		d3.drag()
										.on('drag', dragged)
										.on('start', dragStart)
										.on('end', dragEnd)
		    							
										).append('g');
	d3.select('.optimization_svg').call(d3.zoom()
											.scaleExtent([-100, +100])
											.translateExtent(extent)
											.extent(extent)
											.on("zoom", zoomed)).append('g');
	
	
    
    var color  = d3.scaleOrdinal(d3.schemeSet3);
    var mx, my, mouseX, mouseY;

    var grid3d = d3._3d()
			        .shape('GRID', 20)
			        .origin(origin)
			        .rotateX(xAngle)
			        .rotateY(yAngle)
			        .rotateZ(zAngle)
			        .scale(scale);

    var point3d = d3._3d()
			        .x(function(d){ return d.x; })
			        .y(function(d){ return d.y; })
			        .z(function(d){ return d.z; })
			        .origin(origin)
			        .rotateX(xAngle)
			        .rotateY(yAngle)
			        .rotateZ(zAngle)
			        .scale(scale);

    var zScale3d = d3._3d()
				        .shape('LINE_STRIP')
				        .origin(origin)
				        .rotateX(xAngle)
				        .rotateY(yAngle)
				        .rotateZ(zAngle)
				        .scale(scale);

    
    
    
    function processData(data, tt){

//    	console.log(data);
    	
        /* ----------- GRID ----------- */

        var xGrid = svg.selectAll('path.grid').data(data[0], key);

        xGrid
            .enter()
            .append('path')
            .attr('class', '_3d grid')
            .merge(xGrid)
            .attr('stroke', '#666')
            .attr('stroke-width', 0.1)
            .attr('stroke-opacity', 0.7)
            .attr('fill', function(d){ return d.ccw ? '#efefef' : '#999'; })
            .attr('fill-opacity', 0.95)
            .attr('d', grid3d.draw);

        xGrid.exit().remove();

        /* ----------- POINTS ----------- */

        var points = svg.selectAll('circle').data(data[1], key);
        

        points
            .enter()
            .append('circle')
            .attr('class', '_3d item_dots')
            .attr('opacity', 0)
            .attr('cx', posPointX)
            .attr('cy', posPointY)
            .attr('data-item_id', function(d){ console.log(d); return  d; })
            .merge(points)
            .transition().duration(tt)
            .attr('r', 3)
//            .attr('stroke', function(d){ return color(d.id); })
            .attr('fill', function(d){ return  d3.interpolateRdYlGn(d.z/50); })
            .attr('opacity', 0.7)
            .attr('cx', posPointX)
            .attr('cy', posPointY)
            .call(function(){

//            	Promise.all([get_anomaly_item_category_data()]).then(function (){
//            		update_anomaly_indicator_tool();
//
//            	});
            	
            	
            });

        points.exit().remove();

        /* ----------- z-Scale ----------- */

        var zScale = svg.selectAll('path.zScale').data(data[2]);

        zScale
            .enter()
            .append('path')
            .attr('class', '_3d zScale')
            .merge(zScale)
            .attr('stroke', 'black')
            .attr('stroke-width', .5)
            .attr('d', zScale3d.draw);

        zScale.exit().remove();

         /* ----------- y-Scale Text ----------- */

        var zText = svg.selectAll('text.zText').data(data[2][0]);

        zText
            .enter()
            .append('text')
            .attr('class', '_3d zText tiny_text')
            .attr('dx', '.3em')
            .merge(zText)
            .each(function(d){
                d.centroid = {x: d.rotated.x, y: d.rotated.y, z: d.rotated.z};
            })
            .attr('x', function(d){ return d.projected.x; })
            .attr('y', function(d){ return d.projected.y; })
            .attr('z', function(d){ return d.projected.z; })
            .text(function(d){
//            	console.log(d[2]);
            	return d[2] >= 0 ? d[2] : ''; 
            	
            });

        zText.exit().remove();

        d3.selectAll('._3d').sort(d3._3d().sort);
    }

    function posPointX(d){
        return d.projected.x;
    }

    function posPointY(d){
        return d.projected.y;
    }

    
    
    
    
    
	function init(){
        
		var cnt = 0;
		
        for(var y = -j; y < j; y++)
        {
            for(var x = -j; x < j; x++)
            {
//            	console.log("y="+y);
//            	console.log("x="+x);
            	
                xGrid.push([x, y, 0]);
//                scatter.push({x: x, y: d3.randomUniform(0, -10)(), z: z, id: 'point_' + cnt++});
            }
        }
        

        d3.range(0, 55, 5).forEach(function(d){
        	zLine.push([0, 0, d]); 
        	
        });

        var data = [
            grid3d(xGrid),
            point3d(scatter),
            zScale3d([zLine])
        ];
        
        
        processData(data, 1000);
    }

    function dragStart(){
        mx = d3.event.x;
        my = d3.event.y;
        
    }

    function dragged(){
        mouseX = mouseX || 0;
        mouseY = mouseY || 0;
        beta   = (d3.event.x - mx + mouseX) * Math.PI / 300 ;
        alpha  = (d3.event.y - my + mouseY) * Math.PI / 300  * (-1);
        var data = [
        	
        	grid3d.rotateY(beta - yAngle).rotateX(alpha + xAngle)(xGrid),
            point3d.rotateY(beta - yAngle).rotateX(alpha + xAngle)(scatter),
            zScale3d.rotateY(beta - yAngle).rotateX(alpha + xAngle)([zLine]),
        ];
        processData(data, 0);
    }

    function dragEnd(){
    	
        mouseX = d3.event.x - mx + mouseX;
        mouseY = d3.event.y - my + mouseY;
    }

//    d3.selectAll('button').on('click', init);

    d3.json("content/js/pca_item.json").then( function(data,error) {
    	
//    	console.log(error);
    	
    	opt_data = data;
//    	console.log(opt_data);
    	
    	for (var i=0; i<opt_data.length; i++){    		
    		
    		var data_elem = opt_data[i];
    		
    		if (data_elem[0]>x_max){
    			x_max = data_elem[0];
    		}
    		
    		if (data_elem[1]>y_max){
    			y_max = data_elem[1];
    		}
    		
    		if (data_elem[2]>z_max){
    			z_max = data_elem[2];
    		}
    		
    		
    		if (data_elem[0]<x_min){
    			x_min = data_elem[0];
    		}
    		
    		if (data_elem[1]<y_min){
    			y_min = data_elem[1];
    		}
    		
    		if (data_elem[2]<z_min){
    			z_min = data_elem[2];
    		}
    		
//    		console.log(data_elem);
    		
            scatter.push(
            		{
            			x: data_elem[0], y: data_elem[1], z: data_elem[2]*50, 
            			id: 'point_' + i,
            			
            		});

    		
    		if (i+1==opt_data.length){
    			
    			init();
    			
    		};
    		
    		
    	}
    	
    	
    	
        
    });

    function zoomed() {

		console.log("zoomed");
		
		
		
		
		var current_zoom_scale = d3.event.transform.k;
		console.log("zoom_scale = "+zoom_scale);
		console.log("current_zoom_scale = "+current_zoom_scale);

		
		
		if (zoom_scale>current_zoom_scale){
			zAngle = zAngle + Math.PI / 15 ;
		
		}
		else{
			zAngle = zAngle - Math.PI / 15 ;
		};
		zoom_scale = current_zoom_scale;

		
//		console.log(d3.event.transform);
		
		
		

		
		
		 var data = [
	        	grid3d.rotateZ( zAngle)(xGrid),
	            point3d.rotateZ(  zAngle) (scatter),
	            zScale3d.rotateZ(  zAngle) ([zLine]),
	        ];
	        processData(data, 0);
		
		
		
		
	}
	

    
	
	
}



function update_anomaly_indicator_tool()
{
	
	console.log(d3.select('.optimization_svg')
					.selectAll('circle'));
	
	d3.selectAll('.item_dots')
		.each(function(d) {
						
			d3.select(this).attr('fill', function(d){
//				console.log(d);
	        	return  "black"; 
	        	
	        });
			
		});
	
	
	
        

		
	
}





function get_anomaly_item_category_data()
{
	var deferred = new $.Deferred();
	
//	console.log(item_id);
	
	
	$.ajax({
		type: "POST",
	    url: "anomalyItemCategoryList/getall",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
//	    data:  JSON.stringify( {"itemId": item_id}),
	    success: function(data)
	    {
	    	console.log(data);

	    	anomaly_item_category_data = data;
	    	
	    	deferred.resolve(anomaly_item_category_data);
	 	    	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	      console.log(jqXHR);
	      console.log(textStatus);
	      console.log(errorThrown);
	      
	      anomaly_item_category_data = {error:"Not found"};
	      
	      deferred.resolve(anomaly_item_category_data);	
	
	    }
	});
	
	return deferred.promise();

}




