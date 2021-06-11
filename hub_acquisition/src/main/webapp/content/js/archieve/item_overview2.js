


var single_item_data = null;

var item_prediction_data = null;



function draw_item_overview()
{

    $("<div class='layer1 left_col col'> </div>").appendTo(".main_content");
    $("<div class='layer1 middle_col col'> </div>")
    	.css({
    	    left:lu*3+su+su
    	})
    	.appendTo(".main_content");
    $("<div class='layer1 right_col col'> </div>").appendTo(".main_content");


    
    draw_item_info_tool();	

    Promise.all([get_single_item_data()]).then(function (){	
        
        update_item_info();
        
        draw_footfall_item();
        
        
        Promise.all([get_item_prediction_data()]).then(function (){
        	
            draw_predictions_item();

        });

		
    });    
    
    draw_promotions_item();
    
    draw_stylewith_item();
    
    
    
    height_cascade();

	
}




function draw_footfall_item()
{

	var tool_class_name = "footfall";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*3;
	var tool_max_h = su*9;

	

	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Footfall </div>"+
			"<div class='tool_box_header_btn expand_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<svg class='main_svg "+tool_class_name+"_svg' preserveAspectRatio='xMinYMin' height=280> </svg>"+
			"</div>"+
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:(tool_w),
			height:tool_max_h,
			"max-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col");
	
	
	var _draw_count_chart = function(){
		
		var circle_buffer = 30;
		var label_x = 170;
		
		console.log(single_item_data);
		
		var visit_area = Math.sqrt(single_item_data.visitCount/Math.PI)*2;
		var purchase_area = Math.sqrt(single_item_data.purchaseCount/Math.PI)*2;
		var cartexit_area = Math.sqrt(single_item_data.cartexitCount/Math.PI)*2;
		    
	    var total_diameter = visit_area+purchase_area+cartexit_area;
	    
	    var visit_diameter = (visit_area/total_diameter)*150;
	    var purchase_diameter = (purchase_area/total_diameter)*150;
	    var cartexit_diameter = (cartexit_area/total_diameter)*150;
	    
	    
	    
	    var footfall_overview_count_svg = d3.select(".footfall_svg")
                                	    	.append("svg")
                                	    	.attr("x",0)
                                	    	.attr("y",10);
                        	    

	    footfall_overview_count_svg
	    	.append("text")	
	    	.attr('xml:space', 'preserve')
	    	.attr('class', 'small_text bold_text')
	    	.text((single_item_data.nameStr))
	    	.attr("x", 0 )
	    	.attr("y", su_8 )
	    	;
    	
		   
	    footfall_overview_count_svg
        	.append("circle")
        	.attr("style","fill:var(--visit_color)")	    	
        	.attr("cx", visit_diameter/2)
            .attr("cy", visit_diameter/2+circle_buffer)
            .attr("r", visit_diameter/2);
    	;
    	

	    footfall_overview_count_svg
    		.append("line")
    		.style("stroke", "black")
    		.attr("x1", visit_diameter+su_8)
    		.attr("y1", visit_diameter/2+circle_buffer) 
    		.attr("x2", label_x)    
    		.attr("y2", visit_diameter/2+circle_buffer)
		;
	    
	    footfall_overview_count_svg
	    	.append("text")	
	    	.attr('xml:space', 'preserve')
	    	.attr('class', 'small_text bold_text')
	    	.text(("Visits"))
	    	.attr("x", label_x +su_8)
	    	.attr("y", visit_diameter/2-su_8+circle_buffer)
	    	;
    	
	    
	    footfall_overview_count_svg
	    	.append("text")	
	    	.attr('xml:space', 'preserve')
	    	.attr('class', 'normal_text')
	    	.text((single_item_data.visitCount))
	    	.attr("x", label_x +su_8)
	    	.attr("y", visit_diameter/2+su_8+circle_buffer)
	    	;    	
    	
	    if (purchase_diameter<50){
			circle_buffer += 30;
		};
		    
	    footfall_overview_count_svg
			 .append("circle")
			 .attr("style","fill:var(--purchase_color)")		 
//		    	 .attr("opacity",0.5)
			 .attr("cx", visit_diameter/2)
	         .attr("cy", visit_diameter+purchase_diameter/2+circle_buffer)
	         .attr("r", purchase_diameter/2);
			 ;
		    	    	
	    footfall_overview_count_svg
			.append("line")
			.style("stroke", "black")
			.attr("x1", visit_diameter/2+purchase_diameter/2+su_8)
			.attr("y1", visit_diameter+purchase_diameter/2+circle_buffer)
			.attr("x2", label_x)    
    		.attr("y2", visit_diameter+purchase_diameter/2+circle_buffer)
			;	
	    
	    
	    footfall_overview_count_svg
	    	.append("text")	
	    	.attr('xml:space', 'preserve')
	    	.attr('class', 'small_text bold_text')
	    	.text(("Purchases"))
	    	.attr("x", label_x +su_8)
	    	.attr("y", visit_diameter+purchase_diameter/2+circle_buffer-su_8)
	    	;
	    
	    footfall_overview_count_svg
	    	.append("text")	
	    	.attr('xml:space', 'preserve')
	    	.attr('class', 'normal_text')
	    	.text((single_item_data.purchaseCount))
	    	.attr("x", label_x +su_8)
	    	.attr("y", visit_diameter+purchase_diameter/2+circle_buffer+su_8)
	    	;
		    	    

		    	    
	    
	    if (purchase_diameter<50){
	    	circle_buffer += 30;
	    };
	    
	    
	    footfall_overview_count_svg
			.append("circle")
			.attr("style","fill:var(--cartexit_color)")			
//			.attr("opacity",0.5)
			.attr("cx", visit_diameter/2)
			.attr("cy", visit_diameter+purchase_diameter+cartexit_diameter/2+circle_buffer)
			.attr("r", function(){return (cartexit_diameter/2<=3)?3:cartexit_diameter/2;})
			;
	    
	    footfall_overview_count_svg
    		.append("line")
    		.style("stroke", "black")
    		.attr("x1", visit_diameter/2+cartexit_diameter/2+su_8)
    		.attr("y1", visit_diameter+purchase_diameter+cartexit_diameter/2+circle_buffer)
    		.attr("x2", label_x)    
    		.attr("y2", visit_diameter+purchase_diameter+cartexit_diameter/2+circle_buffer)
    		;		    
	    
	    
	    footfall_overview_count_svg
	    	.append("text")	
	    	.attr('xml:space', 'preserve')
	    	.attr('class', 'small_text bold_text')
	    	.text(("Cart Exits"))
	    	.attr("x", label_x +su_8)
	    	.attr("y", visit_diameter+purchase_diameter+cartexit_diameter/2+circle_buffer-su_8)	    		    
	    	;
	    
	    footfall_overview_count_svg
	    	.append("text")	
	    	.attr('xml:space', 'preserve')
	    	.attr('class', 'normal_text')
	    	.text((single_item_data.cartexitCount))
	    	.attr("x", label_x +su_8)
	    	.attr("y", visit_diameter+purchase_diameter+cartexit_diameter/2+circle_buffer+su_8)
	    	;
		    	    
	  		        	
    	
	    
	    var footfall_overview_count_tool_ul = $("<ul class ='footfall_overview_count_tool_ul normal_text'></ul>")
												.appendTo(tool_dot_class_name+" .tool_box_content");

        $("<li class ='footfall_overview_count_tool_li'>" +
        "<div class ='footfall_overview_count_tool_li_header'> Compared To Last Week" +
        "</div>" +	    		
        "</li>")
        .appendTo(footfall_overview_count_tool_ul);
        
        
        $("<li class ='footfall_overview_count_tool_li small_text '>" +
        "<div class ='footfall_overview_count_tool_li_tt_name bold_text'> Visits </div>" +
        "<div class ='arrow_up'> </div>" +
        "<div class ='footfall_overview_count_tool_li_tt_value'> 30% </div>" +
        "</li>")
        .appendTo(footfall_overview_count_tool_ul);
        
        
        $("<li class ='footfall_overview_count_tool_li small_text '>" +
        "<div class ='footfall_overview_count_tool_li_tt_name bold_text'> Purchases </div>" +	    
        "<div class ='arrow_down'> </div>" +
        "<div class ='footfall_overview_count_tool_li_tt_value'> -12% </div>" +
        "</li>")
        .appendTo(footfall_overview_count_tool_ul);
        
        
        $("<li class ='footfall_overview_count_tool_li small_text '>" +
        "<div class ='footfall_overview_count_tool_li_tt_name bold_text'> Cart Exits </div>" +
        "<div class ='arrow_up'> </div>" +
        "<div class ='footfall_overview_count_tool_li_tt_value'> 10% </div>" +
        "</li>")
        .appendTo(footfall_overview_count_tool_ul);

	    
	    
	    
	    
	    
	    
	    
    	
	};
	_draw_count_chart();
	
	
	
	height_cascade();

}




function draw_predictions_item()
{

	var tool_class_name = "predictions ";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*3;
	var tool_max_h = su*3;

	

	$("<div class='"+tool_class_name+"layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Predictions </div>"+
			"<div class='tool_box_header_btn expand_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<div class='tool_box_content_comment'> Based on last 5 user selections </div>"+
			"</div>"+
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:(tool_w),
			"min-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col");
	
	
	 $("<div class='tool_box_content_block tool_box_content_block_image'><img src='content/svg/prediction_btn.svg' alt='*'></div>")
 		.appendTo(tool_dot_class_name+".tool_box_content");
 
	 $("<div class='tool_box_content_block tool_box_content_block_box'>" +
			 "<div class='tool_box_content_block_box_header small_text bold_text'>Closely Predicted</div>"+
			 "<div class='tool_box_content_block_box_content large_text'>5</div>"+
	   "</div>")
 		.appendTo(tool_dot_class_name+".tool_box_content");
 

	
	
	height_cascade();

	
	
}




function draw_promotions_item()
{

	var tool_class_name = "promotions ";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*3;
	var tool_max_h = su*3;

	

	$("<div class='"+tool_class_name+"layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Promotions </div>"+
			"<div class='tool_box_header_btn expand_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<div class='tool_box_content_comment'> Based on last 5 user selections </div>"+
			"</div>"+
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:(tool_w),
			"min-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".middle_col");
	
	
	 $("<div class='tool_box_content_block tool_box_content_block_image'><img src='content/svg/promotions_btn.svg' alt='*'></div>")
 		.appendTo(tool_dot_class_name+".tool_box_content");
 
	 $("<div class='tool_box_content_block tool_box_content_block_box'>" +
			 "<div class='tool_box_content_block_box_header small_text bold_text'> Total Promotions </div>"+
			 "<div class='tool_box_content_block_box_content large_text'>5</div>"+
	   "</div>")
 		.appendTo(tool_dot_class_name+".tool_box_content");
 


		
	 $(tool_dot_class_name+" .tool_box_header_btn")
		.click(function(){
		    
			window.location ="user/item/promotions?item_id="+current_item_id;
		    
		});
		
	
	height_cascade();

	
	
}




function draw_stylewith_item()
{

	var tool_class_name = "stylewith ";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*3;
	var tool_max_h = su*3;

	

	$("<div class='"+tool_class_name+"layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Style with </div>"+
			"<div class='tool_box_header_btn expand_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<div class='tool_box_content_comment'> Based on last 5 user selections </div>"+
			"</div>"+
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:(tool_w),
			"min-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".middle_col");
	
	
	 $("<div class='tool_box_content_block tool_box_content_block_image'><img src='content/svg/stylewith_btn.svg' alt='*'></div>")
 		.appendTo(tool_dot_class_name+".tool_box_content");
 
	 $("<div class='tool_box_content_block tool_box_content_block_box'>" +
			 "<div class='tool_box_content_block_box_header small_text bold_text'> Total Style With </div>"+
			 "<div class='tool_box_content_block_box_content large_text'>5</div>"+
	   "</div>")
 		.appendTo(tool_dot_class_name+".tool_box_content");


		
	 $(tool_dot_class_name+" .tool_box_header_btn")
		.click(function(){
		    
			window.location ="user/item/stylewith?item_id="+current_item_id;
		    
		});
		
	
	
	height_cascade();

	
	
}







function draw_item_info_tool()
{

	var tool_class_name = "item_info ";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*3;
	var tool_max_h = su*9;

	
	
	

	$("<div class='"+tool_class_name+"layer1 tool_box large_text'> " +
			"<div class='tool_box_header'></div>" +	
			"<div class='tool_box_content'></div>"+
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:(tool_w),
			height:tool_max_h,
			"max-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".right_col");
	




	$( tool_dot_class_name+".tool_box_header" )
		.append($(
				"<div class='tool_box_header_name'> Product Information </div>"+					
				"<div class='tool_box_header_btn search_btn flat_btn'></div>"
				 
				))
				;
	
	

	var	 tool_box_ul = $( "<ul> </ul>" ).addClass("tool_box_ul").css({
		
		"max-height" : (tool_max_h),
		
	})
	.appendTo(tool_dot_class_name+".tool_box_content");
	

	
	
}







function update_item_info()
{
	console.log(single_item_data);
	
	
	var item_info_data = single_item_data;
	
	
	var tool_box_ul = $(".item_info .tool_box_ul");
	
	
	

	
	$("<li class='tool_box_ul_li normal_text'>" +
			  "<div class='tool_box_ul_li_img'> <img src='content/image/image1.jpg' alt='*'> </div>"+
	"</li>")
		  .appendTo(tool_box_ul)	   
		  ;

	
	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> name </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"+item_info_data.nameStr +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> categories </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"
		  	+
//		  	string_trim(
//		  			item_info_data.categoryStr.trim().replace(/\s{2,}/g,">").slice(3), 
//		  			30 
//		  			)
		  	"Category 1"		
		  	+"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> Description </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"+string_trim(item_info_data.descrStr,30 )+"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
		
	
	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> price </div>"+
		  "<div class='tool_box_ul_li_value '><span> "+item_info_data.price +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	

	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> rank </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"+item_info_data.rankF +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> footfall Percentage </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"+item_info_data.footfallPerc +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> footfall  </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"+item_info_data.footfall +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> visit count  </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"+item_info_data.visitCount +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> purchase Count  </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"+item_info_data.purchaseCount +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
	
	$("<li class='tool_box_ul_li normal_text'>" +
		  "<div class='tool_box_ul_li_name large_text'> cart exit Count  </div>"+
		  "<div class='tool_box_ul_li_value '> <span>"+item_info_data.cartexitCount +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
}








function get_single_item_data(item_id)
{
	var deferred = new $.Deferred();
	
	$.ajax({
		type: "POST",
	    url: "item/get",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify( {"itemId": current_item_id}),
	    success: function(data)
	    {
	    	console.log(data);

	    	single_item_data = data;
	    	
	    	deferred.resolve(single_item_data);
	 	    	    
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

	    	item_prediction_data = data;
	    	
	    	deferred.resolve(item_prediction_data);
	 	    	    
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



