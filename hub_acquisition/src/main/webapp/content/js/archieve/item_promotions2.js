


var single_item_data = null;
var current_item_data = null;

var item_stylewith_data = null;


var item_promotion_data = null;

var from_date = null;
var to_date = null;




function draw_promotions()
{

    $("<div class='layer1 left_col col'> </div>").appendTo(".main_content");
    $("<div class='layer1 middle_col col'> </div>")
    	.css({
    	    left:lu*3+su+su
    	})
    	.appendTo(".main_content");
    $("<div class='layer1 right_col col'> </div>").appendTo(".main_content");
    
    
    draw_item_info_tool();	
    
    Promise.all([get_single_item_data(current_item_id)]).then(function (){
    	
    	current_item_data = single_item_data;
    	
    	update_item_info();
    	
    });  
    
    
    draw_promotions_list_tool();
    
    height_cascade();

	
}




function draw_promotions_list_tool()
{

	var tool_class_name = "promotions_list ";
	var tool_dot_class_name = " ."+tool_class_name;

	
	
	var tool_w = lu*8;
	var tool_max_h = su*9;

	

	$("<div class='"+tool_class_name+"layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
			"<div class='tool_box_header_name'> Add Promotion </div>"+
			"<div class='tool_box_header_btn add_btn flat_btn'></div>"+
			"</div>" +	
			"<div class='tool_box_content'>" +
			"<ul class='tool_box_ul promotion_list_ul'>" +
			
			"</ul>" +
			"</div>"+
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:(tool_w),
			"min-height" : (tool_max_h),
			
		})
		.data("view_status",1)
			
		.appendTo(".left_col");
	
	
	$( ".promotion_list_ul" ).css({
		
		"max-height" : (tool_max_h-lu),
		
	});
	
	
	
	$(".add_btn").click(function(){
		console.log("add_btn");
		draw_add_promotion_tool();
	});
	
	
	
    
    Promise.all([get_item_promotion_data()]).then(function (){
    	
    	update_promotions_list();

    });
	
    
    
	height_cascade();

	
	
}




var update_promotions_list = function(){
	
	
	$(".promotion_list_ul").empty();

	
	var li_header = $("<li class='tool_box_ul_li_header small_text bold_text' > " +
						"<div class='tool_box_ul_li_header_col promotion_header_bullet'></div>"+
						"<div class='tool_box_ul_li_header_col promotion_header_name'>Name</div>"+
						"<div class='tool_box_ul_li_header_col promotion_header_from_date'>From Date</div>"+
						"<div class='tool_box_ul_li_header_col promotion_header_to_date'>To Date</div>"+
						"<div class='tool_box_ul_li_header_col promotion_header_status'>Status</div>"+
						"<div class='tool_box_ul_li_header_col promotion_header_delete'>Delete</div>"+
                      "</li>")
                      .appendTo($(".promotion_list_ul"))
	
	
	$.each(item_promotion_data,function(i,v){
		
        var date = new Date(v.timeToEnd); 

		
		
		var from_date = (new Date(v.timeToStart));
		var to_date = (new Date(v.timeToEnd));
		
		var today_date = new Date();
		
		var promotion_status = "active_symb.svg";
		var title_str = "Promotion is currently Active";
		
		if (from_date.getTime()>today_date.getTime()){
			promotion_status = "wait_symb.svg";
			title_str = "Promotion is currently Active";
		};
		
		if (to_date.getTime()<today_date.getTime()){
			promotion_status = "complete_symb.svg";
			title_str = "Promotion is currently Active";
		};
		
		
		
		
		var li = $("<li class='tool_box_ul_li normal_text' > " +
				   "<div class='tool_box_ul_li_bullet'> </div>"+
				   "<div class='tool_box_ul_li_name promotion_name'><span>"+ string_trim(v.name,40) +"</span></div>"+
				   "<div class='tool_box_ul_li_sep'> </div>"+
				   "<div class='tool_box_ul_li_name promotion_from_date small_text'><span>"+ 
				   from_date.toDateString() + 
				   
				   "</span></div>"+
				   "<div class='tool_box_ul_li_sep_arrow large_text'>&rarr;</div>"+
				   "<div class='tool_box_ul_li_name promotion_to_date small_text'><span>"+
				   to_date.toDateString() +
				   "</span></div>"+
				   "<div class='tool_box_ul_li_sep'> </div>"+
				   "<div class='tool_box_ul_li_img delete_promotion' title='Delete Promotion'> " +
		   				"<img src='content/svg/delete_btn.svg' alt='*'>" +    				   		
		   			"</div>"+
				   "<div class='tool_box_ul_li_img promotion_status' data-promostion_index='"+ i +"' title='"+title_str+"'> " +
				   		"<img src='content/svg/"+promotion_status+"' alt='*'>" +    				   		
				   "</div>"+
				   
				   "</li>"
				  )
				  .data("promotion",v)
				  .appendTo($(".promotion_list_ul"))
			;
		
		

	    li.find(".delete_promotion").click(function(){
	    	
	    	console.log("delete_promotion");
	    	
	    	console.log($(this).parent().data());
	    	
	    	draw_delete_promotion_tool($(this).parent().data());
	    	
	    	
	    });


	    
	});
	
};








function draw_delete_promotion_tool(delet_promotion_data)
{
    $(".col").addClass("blur");
	
    $('html, body').css({
	    overflow: 'hidden',
	    height: '100%'
    }); 
    
    var modal_tool_box_screen = $("<div class='modal_tool_box_screen'></div>").appendTo(".main_content");



    var tool_class_name = "delete_promotion_tool_box ";
    var tool_dot_class_name = " ."+tool_class_name;
    
    	
    	
    var tool_w = lu*5;
    var tool_max_h = su*3;
    
    

	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			"<div class='tool_box_header'>" +
				"<div class='tool_box_header_name'> Delete Promotion </div>"+
			"</div>" +	
			"<div class='tool_box_content small_text'> " +
				"<div class='tool_box_content_box delete_promotion_tool_box_text'> Confirm Delete  </div>"+				
				"<div class='tool_box_content_box delete_promotion_cancel_btn flat_btn'> </div>"+
				"<div class='tool_box_content_box delete_promotion_ok_btn flat_btn'> </div>"+
			"</div>"+
	"</div>")
		.css({
			left: ( $(window).width()/2-tool_w/2 ),
			top: ( $(window).height()/2- tool_max_h/2 + window.scrollY - lu ),
			width:(tool_w),
			height:(tool_max_h),
			"max-height" : (tool_max_h),
			
		})
		.data("view_status",1)    			
		.appendTo("body");
	
	
	
	$(tool_dot_class_name+" .tool_box_content_box")
    	.css({
    		"line-height": tool_max_h-su-su_8+"px",
    		"height" : tool_max_h-su-su_8,
    	});
	
	
	
	$(".delete_promotion_ok_btn")
	.css({
		height:(tool_max_h-su)
	})
	.click(function(){
		
		console.log("delete_promotion_ok_btn");
		
		
		console.log($(this));
		
		

	    
	    Promise.all([delete_item_promotion_data(delet_promotion_data.promotion)]).then(function ([data]){
	    	
	    	console.log(data);
	    	console.log(data.status);
	    	
	    	if (data.status.includes("success")){	    		

		    	modal_tool_box_screen.remove();
				
				$(".col").removeClass("blur");
		    	
		    	$('html, body').css({
		    	    overflow: 'auto',
		    	    height: 'auto'
		    	});
		    	
		    	$(tool_dot_class_name).remove();


		        
		        Promise.all([get_item_promotion_data()]).then(function (){
		        	
		        	update_promotions_list();

		        });
		    	
	    		
	    	}
	    	else{
	    		
	    		$(".delete_promotion_tool_box_text").append(
	    				
	    				$("<span> Error in deleting promotion </span>")
	    		);
	    	};
	    	
	    	
	    	

	    });
		
		
		

		
	});
	
	
	
	$(".delete_promotion_cancel_btn")
	.css({
		height:(tool_max_h-su)
	})
	.click(function(){
		
		console.log("delete_promotion_cancel_btn");

		modal_tool_box_screen.remove();
		
		$(".col").removeClass("blur");
    	
    	$('html, body').css({
    	    overflow: 'auto',
    	    height: 'auto'
    	});
    	
    	$(tool_dot_class_name).remove();
		
	})
	;
	
	

}








function draw_add_promotion_tool()
{
    $(".col").addClass("blur");
	
    $('html, body').css({
	    overflow: 'hidden',
	    height: '100%'
    });    
    
    
    

    var tool_class_name = "add_promotion ";
    var tool_dot_class_name = " ."+tool_class_name;
    
    	
    	
    var tool_w = lu*8;
    var tool_max_h = su*9;
    
    

    $("<div class='"+tool_class_name+" layer1 tool_box '> " +
		"<div class='tool_box_header large_text'>" +
		"<div class='tool_box_header_name'> Add Promotion </div>"+
		"<div class='tool_box_header_btn cancel_btn flat_btn'></div>"+
		"</div>" +	
		"<div class='tool_box_content'>" +
		
			"<div class='tool_box_content_box_content name_box normal_text bold_text'> Promotion Name* " +
			"<input type='text' id='promotion_name_input' class='input_text' name='fname'>" +
			"</div>"+
			
			
    		"<div class='tool_box_content_box_content from_box'>" +
    		"<div class='tool_box_content_box_header normal_text bold_text'> FROM* </div>"+
    		"<div class='tool_box_content_box_content '>" +
    		"<div class='tool_box_calendar from_date_calendar'> Date  " +
    		"<span class='from_date_span normal_text bold_text' > No Date Selected </span>" +
    		"</div>"+
    		"</div>"+	 		
    		"</div>"+
    		
    		"<div class='tool_box_content_sep_arrow'>&rarr;</div>"+
    		
    		
    		"<div class='tool_box_content_box_content to_box'>" +			 
			"<div class='tool_box_content_box_header normal_text bold_text'> TO* </div>"+			 
			"<div class='tool_box_content_box_content '>" +
			"<div class='tool_box_calendar to_date_calendar'> Date  " +
    		"<span class='to_date_span normal_text bold_text' > No Date Selected </span>" +			
			"</div>"+			
			"</div>"+
			"</div>"+
			
			
    		"<div class='tool_box_content_box_content modal_add_promotion'>" +			 
			"<div class='tool_box_content_box_header normal_text bold_text'> ADD </div>"+			 
			"<div class='tool_box_content_box_content flat_btn modal_add_btn'>" +
				"<img src='content/svg/blue_add_btn.svg' alt='*'>"+	
			"</div>"+
			"</div>"+
    		
	
		
		"</div>"+
    "</div>")
    .css({
		left:($(window).width()/2),
		top:($(window).height()/2),
//		width:(parent_dim.widht),
//		height:(parent_dim.height),		
	})
	.animate({
	    left:($(window).width()/2-tool_w/2 ),
	    top: (su*2+su_3+window.scrollY),
	    width:(tool_w),
	    height:tool_max_h,
	    "max-height" : (tool_max_h),
	},250)
	.data("view_status",1)
	.click(function(){
	
	})		
	.appendTo("body");
    

    
    $(".tool_box_calendar").datepicker(
    		{
//    			dateFormat: 'dd-mmm-yyyy' ,
    			
    		    onSelect: function() {
    		    	
    		        var date_val = $(this).datepicker().val();
    		        var date_obj = $(this).datepicker("getDate"); 
    		        
    		        console.log(date_val);
    		        console.log(date_obj instanceof Date);
    		        console.log(date_obj.getTime());
    		        
    		        
    		        
    		        if ($(this).hasClass( "from_date_calendar" ))
    		        {
    		        	$(".from_date_span").text(date_val);
    		        	from_date = date_obj.getTime();
    		        };
    		        
    		        if ($(this).hasClass( "to_date_calendar" ))
    		        {
    		        	$(".to_date_span").text(date_val);
    		        	to_date = date_obj.getTime();
    		        };
    		        
    		        
    		        
    		    }
    		}		
    
    );
    
    
    
    $(tool_dot_class_name+".cancel_btn").click(function(){	     	
	
    	$(".col").removeClass("blur");
    	
    	$('html, body').css({
    	    overflow: 'auto',
    	    height: 'auto'
    	});
    	
    	$(tool_dot_class_name).remove();
	
    });
    
    
    
    $(tool_dot_class_name+".modal_add_btn").click(function(){	     	
    	
    	console.log("name = "+$("#promotion_name_input").val().length);
    	
    	console.log("from_date = "+from_date);
    	
    	console.log("to_date = "+to_date);
    	
    	
    	
    	if (from_date==null){
        	console.log("from_date = null");
    		_draw_error_msg("Please fill up all the fields and try again.");
    	}
    	else if (to_date==null){
    		console.log("to_date = null");
    		_draw_error_msg("Please fill up all the fields and try again.");
    	}
    	else if ($("#promotion_name_input").val().length==0){    		
    		console.log("promotion_name_input = null");
    		_draw_error_msg("Please fill up all the fields and try again.");
    	}
    	else{
    		
    		Promise.all([set_item_promotion_data(
    				{
    					"itemId": current_item_id,
            			"timeToStart": from_date,
            			"timeToEnd": to_date,
            			"name": $("#promotion_name_input").val(),	    			
                	}
    				)]).then(function ([data]){
                			
                			console.log(data);
                			console.log(data.status);
                			
                			
                			$(".col").removeClass("blur");
                	    	
                	    	$('html, body').css({
                	    	    overflow: 'auto',
                	    	    height: 'auto'
                	    	});
                	    	
                	    	$(tool_dot_class_name).remove();  
                	    	

                	        
                	        Promise.all([get_item_promotion_data()]).then(function (){
                	        	
                	        	update_promotions_list();

                	        });
                			
    				});
    		
    		
    		;
    		
    		
    		
    	};
    	
    	
    	
    });
    
    
    
    
    var _draw_error_msg = function(error_msg){
    	
    	var error_screen = $("<div class='"+tool_class_name+" error_msg_screen'> " + 
    						 "</div>").appendTo(tool_dot_class_name);
    	
    	var _tool_class_name = "error_msg_tool_box ";
    	var _tool_dot_class_name = " ."+_tool_class_name;

    	
    	
    	var _tool_w = lu*5;
    	var _tool_max_h = su*3;

    	

    	$("<div class='"+_tool_class_name+" layer1 tool_box large_text'> " +
    			"<div class='tool_box_header'>" +
    				"<div class='tool_box_header_name'> Error </div>"+
    			"</div>" +	
    			"<div class='tool_box_content small_text'> " +
    				"<div class='tool_box_content_box error_content_text'> "+error_msg+" </div>"+
    				"<div class='tool_box_content_box error_content_btn error_ok_btn flat_btn'> </div>"+
    			"</div>"+
    	"</div>")
    		.css({
    			left: (tool_w/2-_tool_w/2),
    			top: (tool_max_h/2-_tool_max_h/2),
    			width:(_tool_w),
    			height:(_tool_max_h),
    			"max-height" : (_tool_max_h),
    			
    		})
    		.data("view_status",1)    			
    		.appendTo(tool_dot_class_name);
    	
    	
    	$(_tool_dot_class_name+" .tool_box_content_box").css({
    		'line-height': "120px",
    		'height': "120px",
    	});
    	
    	$(".error_ok_btn")
    	.css({
    		height:(_tool_max_h-su)
    	})
    	.click(function(){
    		
    		console.log("error_tool_box_btn");
    		$(_tool_dot_class_name).remove();
    		error_screen.remove();
    		
    	})
    	;
    	
    	
    };
    
	
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
			
			"min-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".right_col");
	




	$( tool_dot_class_name+".tool_box_header" )
		.append($(
				"<div class='tool_box_header_name'> Product Information </div>"
				 
				))
				;
	
	

	var	 tool_box_ul = $( "<ul> </ul>" ).addClass("tool_box_ul").css({
		
		"max-height" : (tool_max_h),
		
	})
	.appendTo(tool_dot_class_name+".tool_box_content");
	

	
	
}





function update_item_info()
{
//	console.log(single_item_data);
	
	
	var item_info_data = current_item_data;
	
	
	var tool_box_ul = $(".item_info .tool_box_ul");
	

	
	$("<li class='tool_box_ul_li tool_box_ul_li_large normal_text'>" +
			  "<div class=' item_info_image'> <img src='content/image/image1.jpg' alt='*'> </div>"+
	"</li>")
		  .appendTo(tool_box_ul)	   
		  ;

	
	
	
	$("<li class='tool_box_ul_li'>" +
		  "<div class='tool_box_ul_li_small_name small_text bold_text'> name </div>"+
		  "<div class='tool_box_ul_li_small_value normal_text'> <span>"+
		  string_trim(item_info_data.nameStr,25) +
		  "</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	$("<li class='tool_box_ul_li'>" +
		  "<div class='tool_box_ul_li_small_name small_text bold_text'> categories </div>"+
		  "<div class='tool_box_ul_li_small_value normal_text'> <span>"
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

	
	
	
	
	$("<li class='tool_box_ul_li'>" +
		  "<div class='tool_box_ul_li_small_name small_text bold_text'> Description </div>"+
		  "<div class='tool_box_ul_li_small_value normal_text'> <span>"+string_trim(item_info_data.descrStr,30 )+"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
		
	
	
	
	$("<li class='tool_box_ul_li '>" +
		  "<div class='tool_box_ul_li_small_name small_text bold_text'> price </div>"+
		  "<div class='tool_box_ul_li_small_value normal_text'><span> "+item_info_data.price +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	

	
	
	$("<li class='tool_box_ul_li '>" +
		  "<div class='tool_box_ul_li_small_name small_text bold_text'> rank </div>"+
		  "<div class='tool_box_ul_li_small_value normal_text'> <span>"+item_info_data.footfall_rank +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
	
	
	$("<li class='tool_box_ul_li '>" +
		  "<div class='tool_box_ul_li_small_name small_text bold_text'> footfall Percentage </div>"+
		  "<div class='tool_box_ul_li_small_value normal_text'> <span>"+
		  (item_info_data.footfallPerc.toPrecision(3)*100) + " %"+
		  
		  "</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
	
	
	$("<li class='tool_box_ul_li '>" +
		  "<div class='tool_box_ul_li_small_name small_text bold_text'> footfall  </div>"+
		  "<div class='tool_box_ul_li_small_value normal_text'> <span>"+item_info_data.footfall +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
	
	
	$("<li class='tool_box_ul_li '>" +
		  "<div class='tool_box_ul_li_small_name small_text bold_text'> visit count  </div>"+
		  "<div class='tool_box_ul_li_small_value normal_text'> <span>"+item_info_data.visitCount +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
	
	
	$("<li class='tool_box_ul_li '>" +
		  "<div class='tool_box_ul_li_small_name small_text bold_text'> purchase Count  </div>"+
		  "<div class='tool_box_ul_li_small_value normal_text'> <span>"+item_info_data.purchaseCount +"</span> </div>"+
	  "</li>")
	  .appendTo(tool_box_ul)	   
	  ;

	
	
	
	
	$("<li class='tool_box_ul_li '>" +
		  "<div class='tool_box_ul_li_small_name small_text bold_text'> cart exit Count  </div>"+
		  "<div class='tool_box_ul_li_small_value normal_text'> <span>"+item_info_data.cartexitCount +"</span> </div>"+
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







function get_item_promotion_data()
{
	var deferred = new $.Deferred();
	
	$.ajax({
		type: "POST",
	    url: "item/promotion/get",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify( {"itemId": current_item_id}),
	    success: function(data)
	    {
	    	console.log(data);

	    	item_promotion_data = data;
	    	
	    	deferred.resolve(item_promotion_data);
	 	    	    
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





function set_item_promotion_data(promotion_data)
{
	var deferred = new $.Deferred();
	
	console.log(promotion_data);
	
	$.ajax({
		type: "POST",
	    url: "item/promotion/set",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify(
	    		{
	    			"itemId": promotion_data.itemId,
	    			"timeToStart": promotion_data.timeToStart,
	    			"timeToEnd": promotion_data.timeToEnd,
	    			"name": promotion_data.name,	    			
	    		}),
	    success: function(data)
	    {
	    	console.log(data);

	    	
	    	deferred.resolve({status:"success"});
	 	    	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	      console.log(jqXHR);
	      console.log(textStatus);
	      console.log(errorThrown);
//	      relogin();
		      
	      deferred.resolve({status:"error"});
	
	    }
	});
	
	return deferred.promise();

}






function delete_item_promotion_data(promotion_data)
{
	var deferred = new $.Deferred();
	
	console.log(promotion_data);
	
	$.ajax({
		type: "POST",
	    url: "item/promotion/delete",	    
	    contentType: "application/json; charset=utf-8",
//	    dataType: "json",
	    data:  JSON.stringify(
	    		{
	    			"itemId": promotion_data.itemId,
	    			"timeToStart": promotion_data.timeToStart,
	    			"timeToEnd": promotion_data.timeToEnd,
	    			"name": promotion_data.name,	    			
	    		}),
	    success: function(data)
	    {
	    	console.log(data);
	    	
	    	deferred.resolve({status:"success"});	 	    	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	      console.log(jqXHR);
	      console.log(textStatus);
	      console.log(errorThrown);
//	      relogin();
		      
	      deferred.resolve({status:"error"});
	
	    }
	});
	
	return deferred.promise();

}







function get_single_item_data(item_id)
{
	var deferred = new $.Deferred();
	console.log("get_single_item_data");

	$.ajax({
		type: "POST",
	    url: "item/get",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify( {"itemId": item_id}),
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
	      
	      deferred.resolve({error:jqXHR.status});
	
	
	    }
	});
	
	return deferred.promise();

}
















