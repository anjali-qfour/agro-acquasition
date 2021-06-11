
var nav_count = 1;
var menu_svg;






function init_nav_overview()
{
	
//	console.log("init_nav");
		
	add_nav_home_btn(true);
		
	add_nav_search_btn(false);
	
	add_nav_seperator();
	
	add_nav_timeline_btn(false);
	
	add_nav_price_btn(false);
	
	add_nav_map_btn(false);
	
	add_flow_of_interest_btn(false);
	
	
}




function init_nav_overview_timeline()
{
	add_nav_home_btn(false);
	
	add_nav_search_btn(false);
	
	add_nav_seperator();
	
	add_nav_timeline_btn(true);
	
	add_nav_price_btn(false);
	
	add_nav_map_btn(false);
	
	add_flow_of_interest_btn(false);
	
}



function init_nav_overview_pricing_landscape()
{
	add_nav_home_btn(false);
	
	add_nav_search_btn(false);
	
	add_nav_seperator();
	
	add_nav_timeline_btn(false);
	
	add_nav_price_btn(true);
	
	add_nav_map_btn(false);
	
	add_flow_of_interest_btn(false);
	
	
}



function init_nav_overview_map()
{
	add_nav_home_btn(false);
	
	add_nav_search_btn(false);
	
	add_nav_seperator();
	
	add_nav_timeline_btn(false);
	
	add_nav_price_btn(false);
	
	add_nav_map_btn(true);
	
	add_flow_of_interest_btn(false);
	
	
}



function init_nav_overview_foi()
{
	add_nav_home_btn(false);
	
	add_nav_search_btn(false);
	
	add_nav_seperator();
	
	add_nav_timeline_btn(false);
	
	add_nav_price_btn(false);
	
	add_nav_map_btn(false);
	
	add_flow_of_interest_btn(true);
	
	
}




function init_nav_search_results()
{
	add_nav_home_btn(false);
	
	add_nav_search_btn(true);
	
	add_nav_seperator();

	add_nav_timeline_btn(false);
	
	add_nav_price_btn(false);
	
	add_nav_map_btn(false);
	
	add_flow_of_interest_btn(false);
	
	
}












function init_nav_item_overview()
{
	
	add_nav_home_btn(false);
	
	
	add_nav_search_btn(false);
	
	add_nav_seperator();
	
	
	add_nav_item_overview_btn(true);
	
	
	add_nav_seperator();
	
	
	
	add_nav_item_prediction_btn(false);
	
	
	add_nav_item_footfall_btn(false);

	add_nav_item_timeline_btn(false);
	
	
	add_nav_item_map_btn(false);

	add_nav_item_promotions_btn(false);
	
	
	add_nav_item_stylewith_btn(false);
	
	
	add_nav_seperator();
	
	
	add_nav_export_btn(false);
	
	
	add_nav_faq_btn(false);

}








function init_nav_item_prediction()
{

	add_nav_home_btn();
	
	
	add_nav_search_btn(false);
	
	add_nav_seperator();
	
	
	add_nav_item_overview_btn(false);
	
	
	add_nav_seperator();
	
	
	
	add_nav_item_prediction_btn(true);
	
	
	add_nav_item_footfall_btn(false);
	
	
	add_nav_item_map_btn(false);
	
	
	add_nav_item_timeline_btn(false);
	
	
	add_nav_item_promotions_btn(false);
	
	
	add_nav_item_stylewith_btn(false);
	
	
	add_nav_seperator();
	
	
	add_nav_export_btn(false);
	
	
	add_nav_faq_btn(false);




}





function init_nav_item_footfall()
{

	add_nav_home_btn();
	
	
	add_nav_search_btn(false);
	
	add_nav_seperator();
	
	
	add_nav_item_overview_btn(false);
	
	
	add_nav_seperator();
	
	
	
	add_nav_item_prediction_btn(false);
	
	
	add_nav_item_footfall_btn(true);
	
	
	add_nav_item_map_btn(false);
	
	
	add_nav_item_timeline_btn(false);
	
	
	add_nav_item_promotions_btn(false);
	
	
	add_nav_item_stylewith_btn(false);
	
	
	add_nav_seperator();
	
	
	add_nav_export_btn(false);
	
	
	add_nav_faq_btn(false);




}





function init_nav_item_timeline()
{
	
//	console.log("init_nav");

	add_nav_home_btn();
	
	
	add_nav_search_btn(false);
	
	add_nav_seperator();
	
	
	add_nav_item_overview_btn(false);
	
	
	add_nav_seperator();
	
	
	
	add_nav_item_prediction_btn(false);
	
	
	add_nav_item_footfall_btn(false);
	
	
	
	
	add_nav_item_timeline_btn(true);
	
	
	add_nav_item_map_btn(false);

	
	
	add_nav_item_promotions_btn(false);
	
	
	add_nav_item_stylewith_btn(false);
	
	
	add_nav_seperator();
	
	
	add_nav_export_btn(false);
	
	
	add_nav_faq_btn(false);




}



function init_nav_item_map()
{


	add_nav_home_btn();
	
	
	add_nav_search_btn(false);
	
	add_nav_seperator();
	
	
	add_nav_item_overview_btn(false);
	
	
	add_nav_seperator();
	
	
	
	add_nav_item_prediction_btn(false);
	
	
	add_nav_item_footfall_btn(false);
	
	add_nav_item_timeline_btn(false);

	add_nav_item_map_btn(true);
	
	
	
	
	add_nav_item_promotions_btn(false);
	
	
	add_nav_item_stylewith_btn(false);
	
	
	add_nav_seperator();
	
	
	add_nav_export_btn(false);
	
	
	add_nav_faq_btn(false);





}






function init_nav_item_promotions()
{


	add_nav_home_btn();
	
	
	add_nav_search_btn(false);
	
	add_nav_seperator();
	
	
	add_nav_item_overview_btn(false);
	
	
	add_nav_seperator();
	
	
	
	add_nav_item_prediction_btn(false);
	
	
	add_nav_item_footfall_btn(false);
	
	
	add_nav_item_map_btn(false);
	
	
	add_nav_item_timeline_btn(false);
	
	
	add_nav_item_promotions_btn(true);
	
	
	add_nav_item_stylewith_btn(false);
	
	
	add_nav_seperator();
	
	
	add_nav_export_btn(false);
	
	
	add_nav_faq_btn(false);





}





function init_nav_item_stylewith()
{


	add_nav_home_btn();
	
	
	add_nav_search_btn(false);
	
	add_nav_seperator();
	
	
	add_nav_item_overview_btn(false);
	
	
	add_nav_seperator();
	
	
	
	add_nav_item_prediction_btn(false);
	
	
	add_nav_item_footfall_btn(false);
	
	
	add_nav_item_map_btn(false);
	
	
	add_nav_item_timeline_btn(false);
	
	
	add_nav_item_promotions_btn(false);
	
	
	add_nav_item_stylewith_btn(true);
	
	
	add_nav_seperator();
	
	
	add_nav_export_btn(false);
	
	
	add_nav_faq_btn(false);





}





////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////





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
	var class_name = "home_btn ";
	var dot_class_name = " ."+class_name;
	var nav_class_name = "nav_"+class_name;
	var dot_nav_class_name = " ."+nav_class_name;
	
	

	var nav_btn = $(" <div class='nav_btn "+class_name+" "+nav_class_name+" '> </div>")
					.css({
						left:(0),
						top: (0),
						
					})	
					.addClass(function(){
						return (selected)?"active_btn":"";
					})
					.appendTo(".nav_tool");
	

	
	$(dot_nav_class_name)
		.on("mouseenter",function(d,e,g){
						
			var tooltip_dim = $(this)[0].getClientRects()[0];
						
			var x_coord = tooltip_dim.x+tooltip_dim.width+su_3;
			var y_coord = tooltip_dim.y+tooltip_dim.height/2-13+window.scrollY;;
			
			draw_div_tooltip($(this),"Home",x_coord,y_coord);			
						
		})
		.on("mouseleave",function(e){
						
			remove_tooltip();
			
		})
		.on("click", function(d) {
			
			window.location = "user/overview";

		})		
		;

}






function add_nav_search_btn(selected)
{

	var class_name = "search_btn ";
	var dot_class_name = " ."+class_name;
	var nav_class_name = "nav_"+class_name;
	var dot_nav_class_name = " ."+nav_class_name;
	
	

	var nav_btn = $(" <div class='nav_btn "+class_name+" "+nav_class_name+" '> </div>")
					.css({
						left:(0),
						top: (0),
						
					})	
					.addClass(function(){
						return (selected)?"active_btn":"";
					})
					.appendTo(".nav_tool");
	

	
	$(dot_nav_class_name)
		.on("mouseenter",function(d,e,g){
						
			var tooltip_dim = $(this)[0].getClientRects()[0];
						
			var x_coord = tooltip_dim.x+tooltip_dim.width+su_3;
			var y_coord = tooltip_dim.y+tooltip_dim.height/2-13+window.scrollY;;
			
			draw_div_tooltip($(this),"Search",x_coord,y_coord);			
						
		})
		.on("mouseleave",function(e){
						
			remove_tooltip();
			
		})
		.on("click", function(d) {
			
			window.location = "user/search/results";

		})		
		;
		

}





function add_nav_timeline_btn(selected)
{

	var class_name = "timeline_btn ";
	var dot_class_name = " ."+class_name;
	var nav_class_name = "nav_"+class_name;
	var dot_nav_class_name = " ."+nav_class_name;
	
	

	var nav_btn = $(" <div class='nav_btn "+class_name+" "+nav_class_name+" '> </div>")
					.css({
						left:(0),
						top: (0),
						
					})	
					.addClass(function(){
						return (selected)?"active_btn":"";
					})
					.appendTo(".nav_tool");
	

	
	$(dot_nav_class_name)
		.on("mouseenter",function(d,e,g){
						
			var tooltip_dim = $(this)[0].getClientRects()[0];
						
			var x_coord = tooltip_dim.x+tooltip_dim.width+su_3;
			var y_coord = tooltip_dim.y+tooltip_dim.height/2-13+window.scrollY;;
			
			draw_div_tooltip($(this),"Overview Timelines",x_coord,y_coord);			
						
		})
		.on("mouseleave",function(e){
						
			remove_tooltip();
			
		})
		.on("click", function(d) {
			
			window.location = "user/overview/timeline";

		})	
		;


}





function add_nav_price_btn(selected)
{

	var class_name = "price_btn ";
	var dot_class_name = " ."+class_name;
	var nav_class_name = "nav_"+class_name;
	var dot_nav_class_name = " ."+nav_class_name;
	
	

	var nav_btn = $(" <div class='nav_btn "+class_name+" "+nav_class_name+" '> </div>")
					.css({
						left:(0),
						top: (0),
						
					})	
					.addClass(function(){
						return (selected)?"active_btn":"";
					})
					.appendTo(".nav_tool");
	

	
	$(dot_nav_class_name)
		.on("mouseenter",function(d,e,g){
						
			var tooltip_dim = $(this)[0].getClientRects()[0];
						
			var x_coord = tooltip_dim.x+tooltip_dim.width+su_3;
			var y_coord = tooltip_dim.y+tooltip_dim.height/2-13+window.scrollY;;
			
			draw_div_tooltip($(this),"Pricing Landscape ",x_coord,y_coord);			
						
		})
		.on("mouseleave",function(e){
						
			remove_tooltip();
			
		})
		.on("click", function(d) {
			
			window.location = "user/overview/price_optimization";

		})	
		;

}







function add_flow_of_interest_btn(selected)
{
	var class_name = "flow_of_interest_btn ";
	var dot_class_name = " ."+class_name;
	var nav_class_name = "nav_"+class_name;
	var dot_nav_class_name = " ."+nav_class_name;
	
	

	var nav_btn = $(" <div class='nav_btn "+class_name+" "+nav_class_name+" '> </div>")
					.css({
						left:(0),
						top: (0),
						
					})	
					.addClass(function(){
						return (selected)?"active_btn":"";
					})
					.appendTo(".nav_tool");
	

	
	$(dot_nav_class_name)
		.on("mouseenter",function(d,e,g){
						
			var tooltip_dim = $(this)[0].getClientRects()[0];
						
			var x_coord = tooltip_dim.x+tooltip_dim.width+su_3;
			var y_coord = tooltip_dim.y+tooltip_dim.height/2-13+window.scrollY;;
			
			draw_div_tooltip($(this),"Flow of Interest ",x_coord,y_coord);			
						
		})
		.on("mouseleave",function(e){
						
			remove_tooltip();
			
		})
		.on("click", function(d) {
			
			window.location = "user/overview/category_foi";

		})	
		;
		;

}









function add_popular_btn(selected)
{
	var class_name = "popular_btn ";
	var dot_class_name = " ."+class_name;
	var nav_class_name = "nav_"+class_name;
	var dot_nav_class_name = " ."+nav_class_name;
	
	

	var nav_btn = $(" <div class='nav_btn "+class_name+" "+nav_class_name+" '> </div>")
					.css({
						left:(0),
						top: (0),
						
					})	
					.addClass(function(){
						return (selected)?"active_btn":"";
					})
					.appendTo(".nav_tool");
	

	
	$(dot_nav_class_name)
		.on("mouseenter",function(d,e,g){
						
			var tooltip_dim = $(this)[0].getClientRects()[0];
						
			var x_coord = tooltip_dim.x+tooltip_dim.width+su_3;
			var y_coord = tooltip_dim.y+tooltip_dim.height/2-13+window.scrollY;;
			
			draw_div_tooltip($(this),"Popular Products ",x_coord,y_coord);			
						
		})
		.on("mouseleave",function(e){
						
			remove_tooltip();
			
		})
		;

}












function add_nav_map_btn(selected)
{

	var class_name = "map_btn ";
	var dot_class_name = " ."+class_name;
	var nav_class_name = "nav_"+class_name;
	var dot_nav_class_name = " ."+nav_class_name;
	
	

	var nav_btn = $(" <div class='nav_btn "+class_name+" "+nav_class_name+" '> </div>")
					.css({
						left:(0),
						top: (0),
						
					})	
					.addClass(function(){
						return (selected)?"active_btn":"";
					})
					.appendTo(".nav_tool");
	

	
	$(dot_nav_class_name)
		.on("mouseenter",function(d,e,g){
						
			var tooltip_dim = $(this)[0].getClientRects()[0];
						
			var x_coord = tooltip_dim.x+tooltip_dim.width+su_3;
			var y_coord = tooltip_dim.y+tooltip_dim.height/2-13+window.scrollY;;
			
			draw_div_tooltip($(this),"Heatmap ",x_coord,y_coord);			
						
		})
		.on("mouseleave",function(e){
						
			remove_tooltip();
			
		})
		.on("click", function(d) {
			
			window.location = "user/overview/map";

		})	
		;
				

}













function add_nav_item_overview_btn(selected)
{
	
	
	var class_name = "item_overview_btn ";
	var dot_class_name = " ."+class_name;
	var nav_class_name = "nav_"+class_name;
	var dot_nav_class_name = " ."+nav_class_name;
	
	

	var nav_btn = $(" <div class='nav_btn "+class_name+" "+nav_class_name+" '> </div>")
					.css({
						left:(0),
						top: (0),
						
					})	
					.addClass(function(){
						return (selected)?"active_btn":"";
					})
					.appendTo(".nav_tool");
	

	
	$(dot_nav_class_name)
		.on("mouseenter",function(d,e,g){
						
			var tooltip_dim = $(this)[0].getClientRects()[0];
						
			var x_coord = tooltip_dim.x+tooltip_dim.width+su_3;
			var y_coord = tooltip_dim.y+tooltip_dim.height/2-13+window.scrollY;;
			
			draw_div_tooltip($(this),"Overview of Product ",x_coord,y_coord);			
						
		})
		.on("mouseleave",function(e){
						
			remove_tooltip();
			
		})
		.on("click", function(d) {
			
			window.location ="user/item/overview?i="+current_item_id;

		})	
		;
	

}





function add_nav_item_prediction_btn(selected)
{

	
	var class_name = "prediction_btn";
	var dot_class_name = " ."+class_name;
	var nav_class_name = "nav_"+class_name;
	var dot_nav_class_name = " ."+nav_class_name;
	
	

	var nav_btn = $(" <div class='nav_btn "+class_name+" "+nav_class_name+" '> </div>")
					.css({
						left:(0),
						top: (0),
						
					})	
					.addClass(function(){
						return (selected)?"active_btn":"";
					})
					.appendTo(".nav_tool");
	

	
	$(dot_nav_class_name)
		.on("mouseenter",function(d,e,g){
						
			var tooltip_dim = $(this)[0].getClientRects()[0];
						
			var x_coord = tooltip_dim.x+tooltip_dim.width+su_3;
			var y_coord = tooltip_dim.y+tooltip_dim.height/2-13+window.scrollY;;
			
			draw_div_tooltip($(this),"Prediction ",x_coord,y_coord);			
						
		})
		.on("mouseleave",function(e){
						
			remove_tooltip();
			
		})
		.on("click", function(d) {
			
			window.location ="user/item/prediction?i="+getUrlParameter("i");

		})	
		;
	



}





function add_nav_item_footfall_btn(selected)
{
	
	

	var class_name = "footfall_btn ";
	var dot_class_name = " ."+class_name;
	var nav_class_name = "nav_"+class_name;
	var dot_nav_class_name = " ."+nav_class_name;
	
	

	var nav_btn = $(" <div class='nav_btn "+class_name+" "+nav_class_name+" '> </div>")
					.css({
						left:(0),
						top: (0),
						
					})	
					.addClass(function(){
						return (selected)?"active_btn":"";
					})
					.appendTo(".nav_tool");
	

	
	$(dot_nav_class_name)
		.on("mouseenter",function(d,e,g){
						
			var tooltip_dim = $(this)[0].getClientRects()[0];
						
			var x_coord = tooltip_dim.x+tooltip_dim.width+su_3;
			var y_coord = tooltip_dim.y+tooltip_dim.height/2-13+window.scrollY;
			
			draw_div_tooltip($(this),"Footfall ",x_coord,y_coord);			
						
		})
		.on("mouseleave",function(e){
						
			remove_tooltip();
			
		})
		.on("click", function(d) {
			
			window.location ="user/item/footfall?i="+getUrlParameter("i");

		})	
		;
	
	


}




function add_nav_item_timeline_btn(selected)
{

	var class_name = "timeline_btn ";
	var dot_class_name = " ."+class_name;
	var nav_class_name = "nav_"+class_name;
	var dot_nav_class_name = " ."+nav_class_name;
	
	

	var nav_btn = $(" <div class='nav_btn "+class_name+" "+nav_class_name+" '> </div>")
					.css({
						left:(0),
						top: (0),
						
					})	
					.addClass(function(){
						return (selected)?"active_btn":"";
					})
					.appendTo(".nav_tool");
	

	
	$(dot_nav_class_name)
		.on("mouseenter",function(d,e,g){
						
			var tooltip_dim = $(this)[0].getClientRects()[0];
						
			var x_coord = tooltip_dim.x+tooltip_dim.width+su_3;
			var y_coord = tooltip_dim.y+tooltip_dim.height/2-13+window.scrollY;;
			
			draw_div_tooltip($(this),"Overview Timelines",x_coord,y_coord);			
						
		})
		.on("mouseleave",function(e){
						
			remove_tooltip();
			
		})
		.on("click", function(d) {
			
			window.location ="user/item/timeline?i="+current_item_id;

		})	
		;


}



function add_nav_item_map_btn(selected)
{

	var class_name = "map_btn ";
	var dot_class_name = " ."+class_name;
	var nav_class_name = "nav_"+class_name;
	var dot_nav_class_name = " ."+nav_class_name;
	
	

	var nav_btn = $(" <div class='nav_btn "+class_name+" "+nav_class_name+" '> </div>")
					.css({
						left:(0),
						top: (0),
						
					})	
					.addClass(function(){
						return (selected)?"active_btn":"";
					})
					.appendTo(".nav_tool");
	

	
	$(dot_nav_class_name)
		.on("mouseenter",function(d,e,g){
						
			var tooltip_dim = $(this)[0].getClientRects()[0];
						
			var x_coord = tooltip_dim.x+tooltip_dim.width+su_3;
			var y_coord = tooltip_dim.y+tooltip_dim.height/2-13+window.scrollY;;
			
			draw_div_tooltip($(this),"Heatmap ",x_coord,y_coord);			
						
		})
		.on("mouseleave",function(e){
						
			remove_tooltip();
			
		})
		.on("click", function(d) {
			
			window.location ="user/item/map?i="+current_item_id;

		})	
		;
				

}









function add_nav_item_promotions_btn(selected)
{

	var class_name = "promotion_btn ";
	var dot_class_name = " ."+class_name;
	var nav_class_name = "nav_"+class_name;
	var dot_nav_class_name = " ."+nav_class_name;
	
	

	var nav_btn = $(" <div class='nav_btn "+class_name+" "+nav_class_name+" '> </div>")
					.css({
						left:(0),
						top: (0),
						
					})	
					.addClass(function(){
						return (selected)?"active_btn":"";
					})
					.appendTo(".nav_tool");
	

	
	$(dot_nav_class_name)
		.on("mouseenter",function(d,e,g){
						
			var tooltip_dim = $(this)[0].getClientRects()[0];
						
			var x_coord = tooltip_dim.x+tooltip_dim.width+su_3;
			var y_coord = tooltip_dim.y+tooltip_dim.height/2-13+window.scrollY;
			
			draw_div_tooltip($(this),"Promotions ",x_coord,y_coord);			
						
		})
		.on("mouseleave",function(e){
						
			remove_tooltip();
			
		})
		.on("click", function(d) {
			
			window.location ="user/item/promotions?i="+current_item_id;

		})	
		;
	
	


	
	

}







function add_nav_item_stylewith_btn(selected)
{
	
	var class_name = "stylewith_btn ";
	var dot_class_name = " ."+class_name;
	var nav_class_name = "nav_"+class_name;
	var dot_nav_class_name = " ."+nav_class_name;
	
	

	var nav_btn = $(" <div class='nav_btn "+class_name+" "+nav_class_name+" '> </div>")
					.css({
						left:(0),
						top: (0),
						
					})	
					.addClass(function(){
						return (selected)?"active_btn":"";
					})
					.appendTo(".nav_tool");
	

	
	$(dot_nav_class_name)
		.on("mouseenter",function(d,e,g){
						
			var tooltip_dim = $(this)[0].getClientRects()[0];
						
			var x_coord = tooltip_dim.x+tooltip_dim.width+su_3;
			var y_coord = tooltip_dim.y+tooltip_dim.height/2-13+window.scrollY;
			
			draw_div_tooltip($(this),"Style it with ",x_coord,y_coord);			
						
		})
		.on("mouseleave",function(e){
						
			remove_tooltip();
			
		})
		.on("click", function(d) {
			
			window.location ="user/item/stylewith?i="+current_item_id;

		})	
		;
	
	

	

}








function add_nav_export_btn(selected)
{
	var class_name = "nav_export_btn";

	
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
					.on("mouseenter",function(d,e,g){
                        
                        draw_svg_tooltip(("Export"),d3.select("."+class_name+" svg"),[su_2,4]);
                      
                        d3.select(this).attr("fill-opacity",1);
		    	  

					})
					.on("mouseleave",function(e){
						d3.select(this).attr("fill-opacity",0.95);
						remove_tooltip();
					})
					;

			
			if (selected){

				d3.select("."+class_name+" .back_circle")										
					.attr("fill",colors.focus_btn_bg)
					.attr("stroke",colors.focus_btn_bg)
					;
				
				d3.select("."+class_name+" .symb_g")					
    				.selectAll("*")
    				.attr("fill",colors.focus_btn_fg)
    				.attr("stroke",colors.focus_btn_fg)
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







