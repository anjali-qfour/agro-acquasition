


function init_search_results()
{
	


	$("<div class='layer1 middle_col col'> </div>").appendTo(".main_content");

	

	draw_search_result_tool();
	
	
	height_cascade();

	
}






function draw_search_result_tool()
{
	
	var tool_class_name = "search";
	var tool_dot_class_name = "."+tool_class_name;

	
	var tool_dot_class_name = "."+tool_class_name;
	
	var tool_w = lu*6;
	var tool_max_h = lu*5;
	
	
	var filesportal_list = [];
	

	
	$(".middle_col").css({
		left: "calc(100vw * 0.5 - calc("+tool_w+"px * 0.5))",
	});
	


	$("<div class='"+tool_class_name+"layer1 tool_box large_text'> " +
			"<div class='tool_box_header'></div>" +	
			"<div class='tool_box_content'></div>"+
	"</div>")
		.css({
			left:(0),
			top: (su+su_8),
			width:(tool_w),
			height:tool_max_h,
			"max-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".middle_col");
	




	$( ".tool_box_header" )
		.append($(
				"<div class='tool_box_header_name'> Search </div>"+
				"<input class='input_text search_input normal_text' type='text' value='"+search_str+"'>"+		
				"<div class='tool_box_header_btn search_btn flat_btn'></div>"

				 
				))
				;
	
	
	$(".search_input").keypress(function (e) {
		
		var key = e.which;
		if(key == 13)  // the enter key code
		{
			window.location ="user/search/results?q="+$(".search_input").val();

			
		    return false;  
		}
		
	});   
	
	
	
	var _draw_search_btn = function ()
	{
		$.get("content/svg/search_btn.svg", function(text_data){
						
			
			d3.select(".search_btn")
					.append("svg")
					.attr("height",lu/3)
					.attr("width",lu/3)
					.attr("preserveAspectRatio","xMidYMid")
					.append("g")
					.attr("class","upload_confirm upload_btn")
					.html(text_data)
					.attr("transform","translate("
							+( 0 )+", "
							+( 0 )								
							+" ) scale("+(btn_scale)+")")				
					.on("click", function(d) {
						
						
						console.log($(".search_input").val().length);
						
						if ($(".search_input").val().length<3){
							$(".modal_error_msg").text("[ Project name is too short ]");
						}
						else{
							
							
							window.location ="user/search/results?q="+$(".search_input").val();
							
							
							
						};
						
						


					});
			
			
		}, "text");	
	}

	_draw_search_btn();
	
	
	

	var tool_box_ul = $( "<ul> </ul>" ).addClass("tool_box_ul search_results_ul").css({
		
		"max-height" : (tool_max_h-lu),
		
	})
	.appendTo(".tool_box_content");
	
	
	
	
	
	
	Promise.all([get_search_item_results(search_str)]).then(update_draw_search_result_list);

	
	
	
	
	
	
	
}






function update_draw_search_result_list([data])
{
	
	console.log("update_draw_search_result_list ==> ");
	
	
	console.log("data:=");
	console.log(data);
	
	
	$.each(data,function(k,v){
		
		var li = $("<li class='tool_box_ul_li normal_text' data-file_id='"+ v.itemId +"'> " +
				"<div class='tool_box_ul_li_bullet'> </div>"+
				"<div class='tool_box_ul_li_name'>"+ string_trim(v.nameStr,30) +"</div>"+
			"</li>"
			)
			.data("project",v)
			
			
			.appendTo($(".search_results_ul"))
			;
		
		var li_btn_footfall = $("<div class='tool_box_ul_li_value flat_btn footfall_btn'> </div>")
								.click(function(){
										
										console.log("clicked");
										console.log($(this).attr("data-file_id"));
										
							    		window.location ="user/item/footfall?i="+v.itemId ;
										
								});;
								
		
		var li_btn_prediction = $("<div class='tool_box_ul_li_value flat_btn prediction_btn'>"+ +"</div>")
									.click(function(){
										
											console.log("clicked");
											console.log($(this).attr("data-file_id"));
											
								    		window.location ="user/item/predictions?i="+v.itemId ;
											
									});;

		
		li.append(li_btn_footfall);
		li.append(li_btn_prediction);
		
		
		
	});
	
	
	

}






function get_search_item_results(search_str)
{
	
	
	var deferred = new $.Deferred();

	
	$.ajax({
		    type: "POST",
		    url: "item/search",	    
		    contentType: "application/json; charset=utf-8",
		    dataType: "json",
		    data: JSON.stringify({
		    	"nameStr": search_str
		    }),
		    success: function(data)
		    {
		    	console.log("get_search_item_results data := ");	
				console.log(data);
				console.log(data.length);	
//				reshape_data(data);

//				reshape_update(reshape_data(data));
				
				
				deferred.resolve(data);
		 	    	    
		    },
		    error: function (jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
              console.log(textStatus);
              console.log(errorThrown);
//			              relogin();
              
              return [];


		    }
		});
	
	
	return deferred.promise();

};