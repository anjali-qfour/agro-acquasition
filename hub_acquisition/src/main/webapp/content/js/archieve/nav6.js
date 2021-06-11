
var nav_count = 1;
var menu_svg;

function init_nav()
{
	
	console.log("init_nav");
	
	menu_svg = d3.select(".nav_svg");
						
	

	
	
	
	menu_svg  	 
		.append("g")
		.attr("class","primary_nav")
	 	.attr("transform", "translate("+ (0) + "," +(su_3-su_3/2)+ ")")
	 	;

	menu_svg  	 
		.append("g")
		.attr("class","secondary_nav")
	 	.attr("transform", "translate("+ (0) + "," +(su*1)+ ")")
	 	;

	draw_primary_nav();
	
}


function draw_primary_nav()
{
	
	home_btn.init();
	
	
	
	
}

function draw_nav_time_chart()
{
	
	delete_btn.init(0);
	
}








/** ----------------< Home specific >---------------- */


var home_btn = 
{
		init : function init(){
			
//			console.log("nav.pred_search_nav_btn.init - ");
			

			var svg = d3.select(".primary_nav");
			var x = su/2 - symb_s*btn_scale/2;
			var y = 0;
			
			++nav_count;
			
			$.get("content/svg/home_btn.svg", function(text_data){
				
				svg.append("g")
					.attr("class","flat_btn home_nav_btn")
					.attr("data-item_id","-1")
					.html(text_data)
					.attr("transform","translate("+( x )+", "+( y ) +" ) scale("+(btn_scale)+")")
					;
				
				$(".home_nav_btn")
					
					.click(
							function() {  
								
								window.location = "user";
								
							}
					)					
					;
				
			}, "text");	
			
		}
}





/** ----------------< Delete specific >---------------- */


var delete_btn = 
{
	init : function init(position_index){
			
//			console.log("nav.pred_search_nav_btn.init - ");
			

			var svg = d3.select(".secondary_nav");
			var x = 10;
			var y = position_index*symb_s*btn_scale;
			
			var this_btn = this;
			
			
			$.get("content/svg/delete_btn.svg", function(text_data){
				
				svg.append("g")
					.attr("class","flat_btn delete_nav_btn")
					.attr("data-item_id","-1")
					.html(text_data)
					.attr("transform","translate("+( x )+", "+( y ) +" ) scale("+(btn_scale)+")")
					;
				
				$(".delete_nav_btn")
					
					.click(
							function() {  
								

								console.log("delete_nav_btn click");

								if (this_btn.click_status==0){
									this_btn.click_status=1;
									
									$(".delete_nav_btn circle").css("fill","#009fff");
									
									$('.delete_nav_btn g').children().css('fill', 'white');
									$('.delete_nav_btn g').children().css('stroke', 'white');
									
									
									$("body").css({ "overflow-y": "hidden"});

									
									create_layer2();
									
//									d3.select(".delete_nav_btn g g")
//										.attr("fill","white")
//										.attr("Stroke","white");
//									$(".delete_nav_btn circle").css("background","black");
									
									
//									d3.select(".delete_nav_btn").style("fill","#000");
									
									console.log( $('.delete_nav_btn g').children()  );
									
									console.log($(".delete_nav_btn circle"));
									
									
								}
								
								else if (this_btn.click_status==1){
									this_btn.click_status=0;
									
									
									$(".delete_nav_btn circle").css("fill","white");
									
									$('.delete_nav_btn g').children().css('fill', '009fff');
									$('.delete_nav_btn g').children().css('stroke', '009fff');
									
									$("body").css({ "overflow-y": "scroll"});
									
									remove_layer2();
								
								}
								
								
								
								
								console.log(delete_btn);

								
								
								
								
								delete_btn.func11();
								
							}
					)					
					;
				
			}, "text");	
			
		},

		
	click_function : function(func){
		
		
		this.func11 = func;		
		
		

		
	}, 
	
	inactive: function(){
		
		$(".delete_nav_btn circle").css("fill","white");
		
		$('.delete_nav_btn g').children().css('fill', '009fff');
		$('.delete_nav_btn g').children().css('stroke', '009fff');
		
		$("body").css({ "overflow-y": "scroll"});
		
		remove_layer2();
	
		
		
	},
	
	func11:null,
	
	click_status:0,

	

}








/** ----------------< Upload btn >---------------- */


var upload_nav_btn = 
{
	init : function init(position_index){
			
//			console.log("nav.pred_search_nav_btn.init - ");
			

			var svg = d3.select(".secondary_nav");
			var x = su/2 - symb_s*btn_scale/2;

			var y = position_index*symb_s*btn_scale;
			
			var this_btn = this;
			
			++nav_count;
			
			
			
			$.get("content/svg/add_btn.svg", function(text_data){
				
				svg.append("g")
					.attr("class","flat_btn add_nav_btn")
					.attr("data-item_id","-1")
					.html(text_data)
					.attr("transform","translate("+( x )+", "+( y ) +" ) scale("+(btn_scale)+")")
					;
				
				$(".add_nav_btn")
					
					.click(
							function() {  
								

								console.log("add_nav_btn click");
								console.log("add_nav_btn click : this_btn.click_status = "+this_btn.click_status);

								if (this_btn.click_status==0){
									this_btn.click_status=1;
									
									$(".add_nav_btn circle").css("fill","#009fff");
									
									$('.add_nav_btn g').children().css('fill', 'white');
									$('.add_nav_btn g').children().css('stroke', 'white');
									
									
									$("body").css({ "overflow-y": "hidden"});

									
									create_layer2();
									
//									d3.select(".delete_nav_btn g g")
//										.attr("fill","white")
//										.attr("Stroke","white");
//									$(".delete_nav_btn circle").css("background","black");
									
									
//									d3.select(".delete_nav_btn").style("fill","#000");
									
									console.log( $('.add_nav_btn g').children()  );
									
									console.log($(".add_nav_btn circle"));
									
									
									add_nav_btn.func11();
								}
								
								else if (this_btn.click_status==1){
									this_btn.click_status=0;
									
									
									$(".add_nav_btn circle").css("fill","white");
									
									$('.add_nav_btn g').children().css('fill', '009fff');
									$('.add_nav_btn g').children().css('stroke', '009fff');
									
									$("body").css({ "overflow-y": "scroll"});
									remove_layer2();
									add_nav_btn.inactive();
									add_nav_btn.func12();

								
								}
								
								
								
								
								console.log(delete_btn);

								
								
								
							
								
							}
					)					
					;
				
			}, "text");	
			
		},

		
	set_click_function : function(func){
		
		
		this.func11 = func;		
				
	},
	
	set_remove_function : function(func){
		
		
		this.func12 = func;		
				
	}, 
	
	
	inactive: function(){
		
		$(".add_nav_btn circle").css("fill","white");
		
		$('.add_nav_btn g').children().css('fill', '009fff');
		$('.add_nav_btn g').children().css('stroke', '009fff');
		
		$("body").css({ "overflow-y": "scroll"});
		
		this.click_status=0;
		
		remove_layer2();
	
		
		
	},
	
	func11:null,
	func12:null,
	
	click_status:0,

	

}








/** ----------------< Add specific >---------------- */


var add_nav_btn = 
{
	init : function init(position_index){
			
//			console.log("nav.pred_search_nav_btn.init - ");
			

			var svg = d3.select(".secondary_nav");
			var x = su/2 - symb_s*btn_scale/2;

			var y = position_index*symb_s*btn_scale;
			
			var this_btn = this;
			
			++nav_count;
			
			
			
			$.get("content/svg/add_btn.svg", function(text_data){
				
				svg.append("g")
					.attr("class","flat_btn add_nav_btn")
					.attr("data-item_id","-1")
					.html(text_data)
					.attr("transform","translate("+( x )+", "+( y ) +" ) scale("+(btn_scale)+")")
					;
				
				$(".add_nav_btn")
					
					.click(
							function() {  
								

								console.log("add_nav_btn click");
								console.log("add_nav_btn click : this_btn.click_status = "+this_btn.click_status);

								if (this_btn.click_status==0){
									this_btn.click_status=1;
									
									$(".add_nav_btn circle").css("fill","#009fff");
									
									$('.add_nav_btn g').children().css('fill', 'white');
									$('.add_nav_btn g').children().css('stroke', 'white');
									
									
									$("body").css({ "overflow-y": "hidden"});

									
									create_layer2();
									
//									d3.select(".delete_nav_btn g g")
//										.attr("fill","white")
//										.attr("Stroke","white");
//									$(".delete_nav_btn circle").css("background","black");
									
									
//									d3.select(".delete_nav_btn").style("fill","#000");
									
									console.log( $('.add_nav_btn g').children()  );
									
									console.log($(".add_nav_btn circle"));
									
									
									add_nav_btn.func11();
								}
								
								else if (this_btn.click_status==1){
									this_btn.click_status=0;
									
									
									$(".add_nav_btn circle").css("fill","white");
									
									$('.add_nav_btn g').children().css('fill', '009fff');
									$('.add_nav_btn g').children().css('stroke', '009fff');
									
									$("body").css({ "overflow-y": "scroll"});
									remove_layer2();
									add_nav_btn.inactive();
									add_nav_btn.func12();

								
								}
								
								
								
								
								console.log(delete_btn);

								
								
								
							
								
							}
					)					
					;
				
			}, "text");	
			
		},

		
	set_click_function : function(func){
		
		
		this.func11 = func;		
				
	},
	
	set_remove_function : function(func){
		
		
		this.func12 = func;		
				
	}, 
	
	
	inactive: function(){
		
		$(".add_nav_btn circle").css("fill","white");
		
		$('.add_nav_btn g').children().css('fill', '009fff');
		$('.add_nav_btn g').children().css('stroke', '009fff');
		
		$("body").css({ "overflow-y": "scroll"});
		
		this.click_status=0;
		
		remove_layer2();
	
		
		
	},
	
	func11:null,
	func12:null,
	
	click_status:0,

	

}









/** ----------------< Time Chart specific >---------------- */


var time_chart_nav_btn = 
{
		
	init : function init(position_index, selection){
			
//			console.log("nav.pred_search_nav_btn.init - ");
			

			var svg = d3.select(".secondary_nav");
			var x = 10;
			var y = position_index*symb_s*btn_scale;
			
			var this_btn = this;
			
			
			$.get("content/svg/time_chart_btn.svg", function(text_data){
				
				var _nav_btn = svg.append("g")
									.attr("class","flat_btn time_chart_nav_btn")
									.attr("data-item_id","-1")
									.html(text_data)
									.attr("transform","translate("+( x )+", "+( y ) +" ) scale("+(btn_scale)+")")
									;
				
				
				if (selection==1){
					
					_nav_btn.select("circle").style("fill","#009fff");
					_nav_btn.select("g").selectAll("*").style("fill","white");
					_nav_btn.select("g").selectAll("*").style("stroke","white");
					select_status=1;
					
				}
				else if (selection==0){
					
				};
				
				
				$(".time_chart_nav_btn")					
					.click(
							function() {  
								
								if (selection==0){
									
									window.location = "user/project/search?projectId="+project_id +"&projectStr="+project_str+"&searchStr="+search_str;

									
									
								}
								
								
							}
					)					
					;
				
				
				
			}, "text");	
			
			
			return time_chart_nav_btn;
			
		},

		
	click_function : function(func){
		
		
		this.func11 = func;		
		
		

		
	}, 
	
	
	inactive: function(){
		
		$(".time_chart_nav_btn circle").css("fill","white");		
		$('.time_chart_nav_btn g').children().css('fill', '009fff');
		$('.time_chart_nav_btn g').children().css('stroke', '009fff');
		
		$("body").css({ "overflow-y": "scroll"});
		
		remove_layer2();
	
		
		
	},
	
	
	select : function(){
		
		
		console.log("time_chart_nav_btn.select - ");

		console.log( d3.select(".time_chart_nav_btn") );
		console.log( $(".time_chart_nav_btn") );

		
		d3.select(".time_chart_nav_btn circle").attr("fill","#009fff");		
		$(".time_chart_nav_btn circle").css("fill","#009fff");		

		
//		$('.time_chart_nav_btn g').children().css('fill', 'white');
//		$('.time_chart_nav_btn g').children().css('stroke', 'white');
		this.click_status = 1;
			
		
	},
	
	
	unselect : function(){
		
		$(".time_chart_nav_btn circle").css("fill","white");		
		$('.time_chart_nav_btn g').children().css('fill', '009fff');
		$('.time_chart_nav_btn g').children().css('stroke', '009fff');
		this.click_status = 0;
			
		
	},
	
	
	func11:null,
	
	
	click_status:0,
	
	
	select_status:0,

	

}







/** ----------------< Topics chart specific >---------------- */


var topics_chart_nav_btn = 
{
		
	init : function init(position_index, selection){
			
//			console.log("nav.pred_search_nav_btn.init - ");
			

			var svg = d3.select(".secondary_nav");
			var x = 10;
			var y = position_index*symb_s*btn_scale;
			
			var this_btn = this;
			
			
			$.get("content/svg/topics_chart_btn.svg", function(text_data){
				
				var _nav_btn = svg.append("g")
									.attr("class","flat_btn topics_chart_nav_btn")
									.attr("data-item_id","-1")
									.html(text_data)
									.attr("transform","translate("+( x )+", "+( y ) +" ) scale("+(btn_scale)+")")
									;
				
				
				if (selection==1){
					
					_nav_btn.select("circle").style("fill","#009fff");
					_nav_btn.select("g").selectAll("*").style("fill","white");
					_nav_btn.select("g").selectAll("*").style("stroke","white");
					select_status=1;
					
				}
				else if (selection==0){
					
				};
				
				
				$(".topics_chart_nav_btn")					
					.click(
							function() {  
								

								if (selection==0){

									
									window.location = "user/project/search/graph?projectId="+project_id +"&projectStr="+project_str+"&searchStr="+search_str;
						
									
								}
								
								
							}
					)					
					;
				
				
				
			}, "text");	
			
			
			return time_chart_nav_btn;
			
		},

		
	click_function : function(func){
		
		
		this.func11 = func;		
		
		

		
	}, 
	
	
	inactive: function(){
		
		$(".topics_chart_nav_btn circle").css("fill","white");		
		$('.topics_chart_nav_btn g').children().css('fill', '009fff');
		$('.topics_chart_nav_btn g').children().css('stroke', '009fff');
		
		$("body").css({ "overflow-y": "scroll"});
		
		remove_layer2();
	
		
		
	},
	
	
	select : function(){
		
		
		console.log("time_chart_nav_btn.select - ");

		console.log( d3.select(".time_chart_nav_btn") );
		console.log( $(".time_chart_nav_btn") );

		
		d3.select(".time_chart_nav_btn circle").attr("fill","#009fff");		
		$(".time_chart_nav_btn circle").css("fill","#009fff");		

		
//		$('.time_chart_nav_btn g').children().css('fill', 'white');
//		$('.time_chart_nav_btn g').children().css('stroke', 'white');
		this.click_status = 1;
			
		
	},
	
	
	unselect : function(){
		
		$(".time_chart_nav_btn circle").css("fill","white");		
		$('.time_chart_nav_btn g').children().css('fill', '009fff');
		$('.time_chart_nav_btn g').children().css('stroke', '009fff');
		this.click_status = 0;
			
		
	},
	
	
	func11:null,
	
	
	click_status:0,
	
	
	select_status:0,

	

}








/** ----------------< Phrase cloud specific >---------------- */


var phrasecloud_chart_nav_btn = 
{
		
	init : function init(position_index, selection){
			
//			console.log("nav.pred_search_nav_btn.init - ");
			

			var svg = d3.select(".secondary_nav");
			var x = 10;
			var y = position_index*symb_s*btn_scale;
			
			var this_btn = this;
			
			
			$.get("content/svg/phrasecloud_btn.svg", function(text_data){
				
				var _nav_btn = svg.append("g")
									.attr("class","flat_btn phrasecloud_chart_nav_btn")
									.attr("data-item_id","-1")
									.html(text_data)
									.attr("transform","translate("+( x )+", "+( y ) +" ) scale("+(btn_scale)+")")
									;
				
				
				if (selection==1){
					
					_nav_btn.select("circle").style("fill","#009fff");
					_nav_btn.select("g").selectAll("*").style("fill","white");
					_nav_btn.select("g").selectAll("*").style("stroke","white");
					select_status=1;
					
				}
				else if (selection==0){
					
				};
				
				
				$(".phrasecloud_chart_nav_btn")					
					.click(
							function() {  
								
								if (selection==0){
									
									window.location = "user/project/search/phrasecloud?projectId="+project_id +"&projectStr="+project_str+"&searchStr="+search_str;
									
								}
								
								
							}
					)					
					;
				
				
				
			}, "text");	
			
			
			return time_chart_nav_btn;
			
		},

		
	click_function : function(func){
		
		
		this.func11 = func;		
		
		

		
	}, 
	
	
	inactive: function(){
		
		$(".phrasecloud_chart_nav_btn circle").css("fill","white");		
		$('.phrasecloud_chart_nav_btn g').children().css('fill', '009fff');
		$('.phrasecloud_chart_nav_btn g').children().css('stroke', '009fff');
		
		$("body").css({ "overflow-y": "scroll"});
		
		remove_layer2();
	
		
		
	},
	
	
	
	
	unselect : function(){
		
		$(".phrasecloud_chart_nav_btn circle").css("fill","white");		
		$('.phrasecloud_chart_nav_btn g').children().css('fill', '009fff');
		$('.phrasecloud_chart_nav_btn g').children().css('stroke', '009fff');
		this.select_status = 0;
			
		
	},
	
	
	func11:null,
	
	
	click_status:0,
	
	
	select_status:0,

	

}












/** ----------------< File Portal specific >---------------- */


var file_portal_nav_btn = 
{
		
	init : function init(position_index, selection){
			
//			console.log("nav.pred_search_nav_btn.init - ");
			

			var svg = d3.select(".secondary_nav");
			var x = 10;
			var y = position_index*symb_s*btn_scale;
			
			var this_btn = this;
			
			
			$.get("content/svg/files_btn.svg", function(text_data){
				
				var _nav_btn = svg.append("g")
									.attr("class","flat_btn file_portal_nav_btn")
									.attr("data-item_id","-1")
									.html(text_data)
									.attr("transform","translate("+( x )+", "+( y ) +" ) scale("+(btn_scale)+")")
									;
				
				
				if (selection==1){
					
					_nav_btn.select("circle").style("fill","#009fff");
					_nav_btn.select("g").selectAll("*").style("fill","white");
					_nav_btn.select("g").selectAll("*").style("stroke","white");
					select_status=1;
					
				}
				else if (selection==0){
					
				};
				
				
				$(".file_portal_nav_btn")					
					.click(
							function() {  
								
								if (selection==0){
									
									window.location = "user/project/fileportal?projectId="+project_id +"&projectStr="+project_str+ "&searchStr="+search_str;

									
								}
								
								
							}
					)					
					;
				
				
				
			}, "text");	
			
			
			return time_chart_nav_btn;
			
		},

		
	click_function : function(func){
		
		
		this.func11 = func;		
		
		

		
	}, 
	
	
	inactive: function(){
		
		$(".file_portal_nav_btn circle").css("fill","white");		
		$('.file_portal_nav_btn g').children().css('fill', '009fff');
		$('.file_portal_nav_btn g').children().css('stroke', '009fff');
		
		$("body").css({ "overflow-y": "scroll"});
		
		remove_layer2();
	
		
		
	},
	
	
	
	
	unselect : function(){
		
		$(".file_portal_nav_btn circle").css("fill","white");		
		$('.file_portal_nav_btn g').children().css('fill', '009fff');
		$('.file_portal_nav_btn g').children().css('stroke', '009fff');
		this.select_status = 0;
			
		
	},
	
	
	func11:null,
	
	
	click_status:0,
	
	
	select_status:0,

	

}










