
var nav_count = 1;
var menu_svg;



function init_nav()
{
	
//	console.log("init_nav");
	
	
	add_nav_home_btn();
	
	
	

	
	
}




function init_nav_footfall()
{
	
//	console.log("init_nav");
	
	
	init_nav();
	
	
	add_nav_seperator();
	
	
	add_nav_prediction_btn(false);
	
	
	add_nav_footfall_btn(true);
	
	
	add_nav_seperator();
	
	
	add_nav_export_btn(false);
	
	
	add_nav_faq_btn(false);


}



function init_nav_predictions()
{
	
//	console.log("init_nav");
	
	
	init_nav();
	
	
	add_nav_seperator();
	
	
	add_nav_prediction_btn(true);
	
	
	add_nav_footfall_btn(false);
	
	
	add_nav_seperator();
	
	
	add_nav_export_btn(false);
	
	
	add_nav_faq_btn(false);


}





function add_nav_seperator()
{
	
	$(" <div class='nav_seperator'> "+
			
	"</div>")
		.css({
			left:(0),
			top: (0),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".nav_tool");
	
	
	
	

	


}





function add_nav_home_btn(selected)
{
	
	$(" <div class='nav_btn flat_btn nav_home_btn '> "+
			
	"</div>")
		.css({
			left:(0),
			top: (0),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".nav_tool");
	
	
	
	

	

	var _draw_nav_btn = function ()
	{
		$.get("content/svg/home_btn.svg", function(text_data){
						
			
			d3.select(".nav_home_btn")
					.append("svg")
					.attr("height",lu/3)
					.attr("width",lu/3)
					.attr("preserveAspectRatio","xMidYMid")
					.append("g")					
					.html(text_data)
					.attr("transform","translate("
							+( 0 )+", "
							+( 0 )								
							+" ) scale("+(btn_scale)+")")	
					
					.on("click", function(d) {
						

					})

					;
			if (selected){

				d3.select(".nav_home_btn g g")					
					.selectAll("*")
					.attr("fill",colors.focus)
					.attr("stroke",colors.focus)
					;
				
			};
			
			
			
			
		}, "text");	
	};
	
	_draw_nav_btn();

	
	
	
	
	


}






function add_nav_prediction_btn(selected)
{
	
	$(" <div class='nav_btn flat_btn nav_prediction_btn'> "+
			
	"</div>")
		.css({
			left:(0),
			top: (0),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".nav_tool");
	
	
	
	var _draw_nav_btn = function ()
	{
		$.get("content/svg/prediction_btn.svg", function(text_data){
						
			
			d3.select(".nav_prediction_btn")
					.append("svg")
					.attr("height",lu/3)
					.attr("width",lu/3)
					.attr("preserveAspectRatio","xMidYMid")
					.append("g")
					.attr("data-selected",selected)
					.html(text_data)
					.attr("transform","translate("
							+( 0 )+", "
							+( 0 )								
							+" ) scale("+(btn_scale)+")")	
					
					.on("click", function(d) {

						console.log(d3.select(this));
						console.log(d3.select(this).attr("data-selected"));
							
						
						if (d3.select(this).attr("data-selected")=="false"){
							
							window.location ="user/item/predictions?i="+getUrlParameter("i");
							
						};


					})

					;
			if (selected){

				d3.select(".nav_prediction_btn g g")					
					.selectAll("*")
					.attr("fill",colors.focus_btn)
					.attr("stroke",colors.focus_btn)
					;
				
				console.log(d3.select(".nav_prediction_btn").selectAll("circle"));
				d3.select(".nav_prediction_btn")					
					.selectAll("circle")
					.attr("fill",colors.blue)
					.attr("stroke",colors.blue)
					;
				
			};
			
			
			
			
		}, "text");	
	};
	
	_draw_nav_btn();

	
	




}






function add_nav_footfall_btn(selected)
{
	
	$(" <div class='nav_btn flat_btn nav_footfall_btn'> "+
			
	"</div>")
		.css({
			left:(0),
			top: (0),
//			"background-color" : selected ? colors.nomral : colors.focus_bg ,
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".nav_tool");
	
	
	
	
	

	var _draw_nav_btn = function ()
	{
		$.get("content/svg/footfall_btn.svg", function(text_data){
						
			
			d3.select(".nav_footfall_btn")
					.append("svg")
					.attr("height",lu/3)
					.attr("width",lu/3)					
					.attr("preserveAspectRatio","xMidYMid")
					.append("g")
					.attr("data-selected",selected)
					.html(text_data)
					.attr("transform","translate("
							+( 0 )+", "
							+( 0 )								
							+" ) scale("+(btn_scale)+")")	
					
					.on("click", function(d) {
						
						console.log(d3.select(this));
						console.log(d3.select(this).attr("data-selected"));
												
						
						if (d3.select(this).attr("data-selected")=="false"){
							
//							console.log(d3.select(this).attr("data-selected"));
							
							window.location ="user/item/footfall?i="+getUrlParameter("i");
							
						};
						
						

					})
					;
			
			
			if (selected){

				d3.select(".nav_footfall_btn g g")					
					.selectAll("*")
					.attr("fill",colors.focus_btn)
					.attr("stroke",colors.focus_btn)
					;
				
				d3.select(".nav_footfall_btn")					
					.selectAll("circle")
					.attr("fill",colors.blue)
					.attr("stroke",colors.blue)
					;
				
			};
			
			
			
			
		}, "text");	
	};
	
	_draw_nav_btn();

	


}






function add_nav_export_btn(selected)
{
	
	$(" <div class='nav_btn flat_btn nav_export_btn'> "+
			
	"</div>")
		.css({
			left:(0),
			top: (0),			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".nav_tool");
	
	
	
	
	

	var _draw_nav_btn = function ()
	{
		$.get("content/svg/export_btn.svg", function(text_data){
						
			
			d3.select(".nav_export_btn")
					.append("svg")
					.attr("height",lu/3)
					.attr("width",lu/3)
					.attr("preserveAspectRatio","xMidYMid")
					.append("g")	
					.attr("data-selected",selected)
					.html(text_data)
					.attr("transform","translate("
							+( 0 )+", "
							+( 0 )								
							+" ) scale("+(btn_scale)+")")	
					
					.on("click", function(d) {
						

					})
					;

			
			
	
			
			if (selected){

				d3.select(".nav_export_btn g g")					
					.selectAll("*")
					.attr("fill",colors.focus_btn)
					.attr("stroke",colors.focus_btn)
					;
				
				d3.select(".nav_export_btn")					
					.selectAll("circle")
					.attr("fill",colors.blue)
					.attr("stroke",colors.blue)
					;
				
			};
			
			
			
			
		}, "text");	
	};
	
	_draw_nav_btn();

	


}








function add_nav_faq_btn(selected)
{
	
	$(" <div class='nav_btn flat_btn nav_faq_btn'> "+
			
	"</div>")
		.css({
			left:(0),
			top: (0),			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".nav_tool");
	
	
	
	
	

	var _draw_nav_btn = function ()
	{
		$.get("content/svg/faq_btn.svg", function(text_data){
						
			
			d3.select(".nav_faq_btn")
					.append("svg")
					.attr("height",lu/3)
					.attr("width",lu/3)
					.attr("preserveAspectRatio","xMidYMid")
					.append("g")					
					.html(text_data)
					.attr("transform","translate("
							+( 0 )+", "
							+( 0 )								
							+" ) scale("+(btn_scale)+")")	
					
					.on("click", function(d) {
						

					})

					;
			if (selected){

				d3.select(".nav_faq_btn g g")					
					.selectAll("*")
					.attr("fill",colors.focus)
					.attr("stroke",colors.focus)
					;
				
			};
			
			
			
			
		}, "text");	
	};
	
	_draw_nav_btn();

	


}







