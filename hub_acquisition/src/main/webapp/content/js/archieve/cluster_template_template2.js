


var cluster_template_data = null;



var list_header = "<li class='tool_box_ul_li_header normal_text bold_text' > " +

	"<div class='tool_box_ul_li_header_col template_header_name'>Name</div>"+
	"<div class='tool_box_ul_li_header_col template_header_createdon'>Created On</div>"+
	

"</li>";


var list_loading = "<li class='list_loading template_li shine'>  &nbsp; </li>";


var list_no_cluster_template = "<li class='list_no_result template_li small_text bold_text faint_text' > " +
"<div class='tool_box_ul_li_header_col'>  No Cluster Template Created ...</div>"+
"</li>";

var filter_index = 1;





var filter_list_data = [];




function init_cluster_template_template()
{

    $("<div class=' layer1 left_col col'> </div>").appendTo(".main_content");
  
    draw_template_overview();
    
    if (typeof current_cluster_template_id === 'undefined'){
    	
    	
    	
    }
    else{
    	
    	Promise.all([get_cluster_template()]).then(function (){
    		
        	update_template_overview();

    	}); 
    	
    	
    }
    	
    
    
    height_cascade();

    
    
}








function draw_template_overview()
{
	
	
	
	var tool_class_name = "template_overview ";
	var tool_dot_class_name = " ."+tool_class_name;

	  
    var tool_width = full_tool_width;
    var tool_min_h = full_tool_height;
   
	
	$("<div class='"+tool_class_name+" layer1 tool_box normal_text'> " +
				
			"<div class='tool_box_content'>" +
			
			
				"<div class='input_text_group search_users_input_group'>" +
					"<input type='input' class='input_text_field cluster_template_name_input_text' placeholder='search_users' name='name'   " +
					" value='' required />" +
					"<label for='name' class='input_text_label'>Name</label>" +
				"</div>" +

				"<div class='tool_box_section_text_btn small_text bold_text add_filter_btn'> Add Filter </div>"+
				
				"<ul id='sortable' class='filter_ul'>  </ul>"+
				
				"<div class='filter_error_group '> " +
					"<div class='error_message small_text filter_error_message'> </div>" +
				"</div>"+

				
				"<div class='tool_box_section_text_btn small_text bold_text save_cluster_template_btn'> Save </div>"+

			
			"</div>"+
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:tool_width,
			"min-height": tool_min_h		
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col");
	

//	$( "#sortable" ).sortable();	
//	$( "#sortable" ).disableSelection();
    
    

	$(".add_filter_btn").click(function(){
		
		
		if (validate_last_filter()){
			draw_filter();	
			filter_index = filter_index+1;
		};
	
		
		height_cascade();
		
		$(".save_cluster_template_btn").css({"display":"inline-block"});
		
	});

	
	


	$(".save_cluster_template_btn").click(function(){
		
		
		

		if (validate_last_filter() ){
			
			if ($(".cluster_template_name_input_text").val().length==0){
				
				$(".filter_error_message")
					.css({"opacity":1})
					.text("Error : Give name to this Cluster Template.");
				
			}
			else{
				
				save_cluster_template();
				
			};
				
		};
		
		
		
	});

	
}




var attribute_map={
		
		"age":"Age",
		"visit_count":"Visit Count",
		"purchase_count":"Purchase Count",
		"total_purchase_amount":"Total Purchase Amount",
		"cartexit_count":"Cart Exit Count",
		
		
};


var relation_map={
		
		"none":"&#61;&#62;&#60;",
		"eq":"&#61;&#61;",
		"gr":"&#62;",
		"le":"&#60",
		"eqgr":"&#61;&#62;",
		"eqle":"&#61;&#60;",
		"noteqle":"&#33;&#61;",
		
		
};




var andor_map={
		
		"none":"AND/OR",
		"and":"AND",
		"or":"OR",
		
};




function update_template_overview()
{
	
	
	$(".cluster_template_name_input_text").val(cluster_template_data.name);
	
	
	var filterList = JSON.parse(cluster_template_data.filterListJson);
	
	console.log(filterList);
	
	$.each(filterList,function(i,data_elem){
		
		
		var rnd = random_string(2);

		$("<li class='ui-state-default'>" +
				"<div class='toolbox_section cluster_template_section ' data-filter_index="+filter_index+ ">"+
			
					"<div class='filter_index bold_text'> " +(i+1) + " </div>" +
					

					"<div class='dropdown_group attribute_dropdown' data-selector_type='attribute'>"+
						"<button class='dropdown_btn normal_text bold_text' data-value='"+data_elem.attribute+"' >"+attribute_map[data_elem.attribute]+"</button>"+
						"<div class='dropdown_content small_text'>"+
						    "<div class='dropdown_content_elem' data-attr_name='Age' data-attr_value='age'>Age</div>"+
						    "<div class='dropdown_content_elem' data-attr_name='Visit Count' data-attr_value='visit_count'>Visit Count</div>"+
						    "<div class='dropdown_content_elem' data-attr_name='Purchase Count' data-attr_value='purchase_count'>Purchase Count</div>"+
						    "<div class='dropdown_content_elem' data-attr_name='Total Purchase Amount' data-attr_value='total_purchase_amount'>Total Purchase Amount</div>"+					    
						    "<div class='dropdown_content_elem' data-attr_name='Cart Exit Count' data-attr_value='cartexit_count'>Cart Exit Count</div>"+
						"</div>"+
					"</div>"+
					

					"<div class='filter_symbol'> &#61; </div>" +

					"<div class='filter_symbol'> &#91; </div>" +
					
					
					"<div class='dropdown_group relations_dropdown relations_1' data-selector_type='relations'>"+
						"<button class='dropdown_btn normal_text bold_text' data-value='" +data_elem.relation1+ "' > "+relation_map[data_elem.relation1]+" </button>"+
						"<div class='dropdown_content small_text'>"+
						    "<div class='dropdown_content_elem' data-attr_name=' &#61;&#61;' data-attr_value='eq'> == </div>"+
						    "<div class='dropdown_content_elem' data-attr_name=' &#62;'      data-attr_value='gr' > > </div>"+
						    "<div class='dropdown_content_elem' data-attr_name=' &#60;'      data-attr_value='le' > < </div>"+
						    "<div class='dropdown_content_elem' data-attr_name=' &#61;&#62;' data-attr_value='eqgr'> => </div>"+
						    "<div class='dropdown_content_elem' data-attr_name=' &#61;&#60;' data-attr_value='eqle'> =< </div>"+
						    "<div class='dropdown_content_elem' data-attr_name=' &#33;&#61;' data-attr_value='noteqle'> (not)= </div>"+
					    "</div>"+
					"</div>"+


					"<div class='value_input_text_group'>" +
						"<input type='input' class='value_input_text large_text value_input_text_1' placeholder='' name='name'   " +
						" value='" +data_elem.value1+"' required />" +
						"<label for='name' class=' value_input_text_label'>Value = </label>" +
					"</div>" +


					"<div class='filter_symbol'> &#93; </div>" +


					"<div class='dropdown_group andor_dropdown ' data-selector_type='andor'>"+
						"<button class='dropdown_btn normal_text bold_text'  data-value='"+data_elem.andor+ "' > "+andor_map[data_elem.andor]+" </button>"+
						"<div class='dropdown_content small_text'>"+
							"<div class='dropdown_content_elem' data-attr_name='AND/OR' data-attr_value='none'>None</div>"+
							"<div class='dropdown_content_elem' data-attr_name='AND' data-attr_value='and'>AND</div>"+
							"<div class='dropdown_content_elem' data-attr_name='OR' data-attr_value='or'>OR</div>"+					    
						"</div>"+
					"</div>"+
					
					"<div class='filter_symbol'> &#91; </div>" +

					"<div class='dropdown_group relations_dropdown relations_2' data-selector_type='relations'>"+
						"<button class='dropdown_btn normal_text bold_text' data-value='" +data_elem.relation2+ "' > "+relation_map[data_elem.relation2]+" </button>"+
						"<div class='dropdown_content small_text'>"+
						    "<div class='dropdown_content_elem' data-attr_name=' &#61;&#61;' data-attr_value='eq'> == </div>"+
						    "<div class='dropdown_content_elem' data-attr_name=' &#62;'      data-attr_value='gr' > > </div>"+
						    "<div class='dropdown_content_elem' data-attr_name=' &#60;'      data-attr_value='le' > < </div>"+
						    "<div class='dropdown_content_elem' data-attr_name=' &#61;&#62;' data-attr_value='eqgr'> => </div>"+
						    "<div class='dropdown_content_elem' data-attr_name=' &#61;&#60;' data-attr_value='eqle'> =< </div>"+
						    "<div class='dropdown_content_elem' data-attr_name=' &#33;&#61;' data-attr_value='noteqle'> (not)= </div>"+
					    "</div>"+
					"</div>"+


					"<div class='value_input_text_group'>" +
						"<input type='input' class='value_input_text large_text value_input_text_2' placeholder='' name='name'   " +
						" value='" +data_elem.value2+"' required />" +
						"<label for='name' class=' value_input_text_label'>Value = </label>" +
					"</div>" +
					
					"<div class='filter_symbol'> &#93; </div>" +
					
					"<div class='filter_cancel_btn filter_cancel_btn_"+rnd+" delete_btn'>  </div>" +

				"</div>" +
		"</li>")
		.appendTo(".filter_ul")
		;
			
		
	});
		

	
	$(".dropdown_content_elem").click(function(){
				
		var dropdown_group = $(this).parent().parent();
		
		console.log(dropdown_group.data("selector_type"));
		
		
		var dropdown_btn = dropdown_group.find(".dropdown_btn");
		
		dropdown_btn.data("name",$(this).data("attr_name"));
		dropdown_btn.data("value",$(this).data("attr_value"));
		
		console.log(dropdown_group.find(".dropdown_btn"));
		
		console.log($(this).html());
		
		
		dropdown_btn.html($(this).data("attr_name"));
		
		console.log(dropdown_btn.data("value"));
		
	});
	
	
	$(".save_cluster_template_btn").css({"display":"inline-block"});

	
	
	
	
	
	
}








function validate_last_filter()
{
	
	var valid = true;
	
	$(".filter_error_message")
		.css({"opacity":0})
		.text("");
	
	console.log($("[data-filter_index="+(filter_index-1)+"]"));
	
	var filter_li = $("[data-filter_index="+(filter_index-1)+"]").parent();
	
	
	

	if(filter_li.length>0){
		
		console.log("length = "+filter_li.length);
		
		console.log("andor value = "+filter_li.find(".relations_2 .dropdown_btn").data("value"));
	
		if ( filter_li.find(".andor_dropdown .dropdown_btn").data("value")!="none" ){
			
			
			console.log("relations_2 value = "+filter_li.find(".andor_dropdown .dropdown_btn").data("value"));
			
			
			if( 
					(isNaN( filter_li.find(".value_input_text_2").val() ))
					||
					(filter_li.find(".value_input_text_2").val().length==0)
			){
				
				console.log("Second value is in inccorect format.");
				
				$(".filter_error_message")
					.css({"opacity":1})
					.text("Error : Second value is in inccorect format.");
				
				valid = false;
				
			};
			
			
	
			if ( filter_li.find(".relations_2 .dropdown_btn").data("value")=="none" ){
				
				console.log("Please select Second relation");
				
				$(".filter_error_message")
					.css({"opacity":1})
					.text("Error : Please select Second relation.");
				
				valid = false;
				
			};
			
			
		};
	
	};
	
	

	
	
	
	if(filter_li.length>0){
		
		console.log(" length = " + filter_li.find(".value_input_text_1").val().length );
		
		if( 
				(isNaN( filter_li.find(".value_input_text_1").val() ))
				||
				(filter_li.find(".value_input_text_1").val().length==0)
		){
			
			console.log("First value is in inccorect format.");
			
			$(".filter_error_message")
				.css({"opacity":1})
				.text("Error : First value is in inccorect format.");
			
			valid = false;
			
		};
		
		
	};
		
			
	


	
	if ( filter_li.find(".relations_1 .dropdown_btn").data("value")=="none" ){
		
		console.log("Please select relation");
		
		$(".filter_error_message")
			.css({"opacity":1})
			.text("Error : Please select first relation.");
		
		valid = false;
		
	};
	
	
	

	if (filter_li.find(".attribute_dropdown .dropdown_btn").data("value")=="none"){
		
		console.log("Please select attribute_dropdown");
		
		$(".filter_error_message")
			.css({"opacity":1})
			.text("Error : Please select attribute.");
		
		valid = false;
		
	};
		
	
	
	
	
		
	return valid;
}




function save_cluster_template()
{
	
	filter_list_data = [];
	
	
	$(".filter_ul li").each(function(i,data_elem){
		
		
		console.log("---- ---- ---- ---- ");
		console.log($(data_elem).find(".filter_index").text());
		
		console.log($(data_elem).find(".attribute_dropdown .dropdown_btn").data());
		
		console.log($(data_elem).find(".relations_1 .dropdown_btn").data());
		console.log($(data_elem).find(".value_input_text_1").val());
		
		console.log($(data_elem).find(".andor_dropdown .dropdown_btn").data());
		
		console.log($(data_elem).find(".relations_2 .dropdown_btn").data());
		console.log($(data_elem).find(".value_input_text_1").val());
		
		
		var filter_data = {
				
				"filter_index":$(data_elem).find(".filter_index").text(),
				"attribute":$(data_elem).find(".attribute_dropdown .dropdown_btn").data("value"),
				"relation1":$(data_elem).find(".relations_1 .dropdown_btn").data("value"),
				"value1":$(data_elem).find(".value_input_text_1").val(),
				"andor":$(data_elem).find(".andor_dropdown .dropdown_btn").data("value"),
				"relation2":$(data_elem).find(".relations_2 .dropdown_btn").data("value"),
				"value2":$(data_elem).find(".value_input_text_2").val(),
				
		};
		
		
		filter_list_data.push(filter_data);
		
		console.log(filter_data);
		
		
		
	});	
	
	
	
	console.log(filter_list_data);
	
	console.log(JSON.stringify(filter_list_data));
	
	set_cluster_template();


}








function draw_filter()
{
	
	var rnd = random_string(2);
	
		$("<li class='ui-state-default'>" +
				
			"<div class='toolbox_section cluster_template_section ' data-filter_index="+filter_index+ ">"+
			
			"<div class='filter_index bold_text'> " + filter_index + " </div>" +

			
			"<div class='dropdown_group attribute_dropdown' data-selector_type='attribute'>"+
				"<button class='dropdown_btn normal_text bold_text' data-value='none' >Select Attribute</button>"+
				"<div class='dropdown_content small_text'>"+
				    "<div class='dropdown_content_elem' data-attr_name='Age' data-attr_value='age'>Age</div>"+
				    "<div class='dropdown_content_elem' data-attr_name='Visit Count' data-attr_value='visit_count'>Visit Count</div>"+
				    "<div class='dropdown_content_elem' data-attr_name='Purchase Count' data-attr_value='purchase_count'>Purchase Count</div>"+
				    "<div class='dropdown_content_elem' data-attr_name='Total Purchase Amount' data-attr_value='total_purchase_amount'>Total Purchase Amount</div>"+					    
				    "<div class='dropdown_content_elem' data-attr_name='Cart Exit Count' data-attr_value='cartexit_count'>Cart Exit Count</div>"+
				"</div>"+
			"</div>"+

			"<div class='filter_symbol'> &#61; </div>" +

			"<div class='filter_symbol'> &#91; </div>" +
			
			
			"<div class='dropdown_group relations_dropdown relations_1' data-selector_type='relations'>"+
				"<button class='dropdown_btn normal_text bold_text' data-value='none' > =>< </button>"+
				"<div class='dropdown_content small_text'>"+
				    "<div class='dropdown_content_elem' data-attr_name=' &#61;&#61;' data-attr_value='eq'> == </div>"+
				    "<div class='dropdown_content_elem' data-attr_name=' &#62;'      data-attr_value='gr' > > </div>"+
				    "<div class='dropdown_content_elem' data-attr_name=' &#60;'      data-attr_value='le' > < </div>"+
				    "<div class='dropdown_content_elem' data-attr_name=' &#61;&#62;' data-attr_value='eqgr'> => </div>"+
				    "<div class='dropdown_content_elem' data-attr_name=' &#61;&#60;' data-attr_value='eqle'> =< </div>"+
				    "<div class='dropdown_content_elem' data-attr_name=' &#33;&#61;' data-attr_value='noteqle'> (not)= </div>"+
			    "</div>"+
			"</div>"+
			
			"<div class='value_input_text_group'>" +
				"<input type='input' class='value_input_text large_text value_input_text_1' placeholder='' name='name'   " +
				" value='' required />" +
				"<label for='name' class=' value_input_text_label'>Value = </label>" +
			"</div>" +

			"<div class='filter_symbol'> &#93; </div>" +


			"<div class='dropdown_group andor_dropdown ' data-selector_type='andor'>"+
				"<button class='dropdown_btn normal_text bold_text'  data-value='none' > AND/OR </button>"+
				"<div class='dropdown_content small_text'>"+
					"<div class='dropdown_content_elem' data-attr_name='AND/OR' data-attr_value='none'>None</div>"+
					"<div class='dropdown_content_elem' data-attr_name='AND' data-attr_value='and'>AND</div>"+
					"<div class='dropdown_content_elem' data-attr_name='OR' data-attr_value='or'>OR</div>"+					    
				"</div>"+
			"</div>"+
			
			"<div class='filter_symbol'> &#91; </div>" +

			"<div class='dropdown_group relations_dropdown relations_2' data-selector_type='relations'>"+
				"<button class='dropdown_btn normal_text bold_text'  data-value='none' > =>< </button>"+
				"<div class='dropdown_content small_text'>"+
				 	"<div class='dropdown_content_elem' data-attr_name=' &#61;&#61;' data-attr_value='eq'> == </div>"+
				    "<div class='dropdown_content_elem' data-attr_name=' &#62;' data-attr_value='gr'> &#62; </div>"+
				    "<div class='dropdown_content_elem' data-attr_name=' &#60;' data-attr_value='le'>&#60; </div>"+
				    "<div class='dropdown_content_elem' data-attr_name=' &#61;&#62;' data-attr_value='eqgr'> => </div>"+
				    "<div class='dropdown_content_elem' data-attr_name=' &#61;&#60;' data-attr_value='eqle'> =< </div>"+
				    "<div class='dropdown_content_elem' data-attr_name=' &#33;&#61;' data-attr_value='noteqle'> (not)= </div>"+
			    "</div>"+
			"</div>"+
			
			
			
			"<div class='value_input_text_group'>" +
				"<input type='input' class='value_input_text large_text value_input_text_2' placeholder='' name='name'   " +
				" value='' required />" +
				"<label for='name' class=' value_input_text_label'>Value = </label>" +
			"</div>" +
			
			"<div class='filter_symbol'> &#93; </div>" +
			
			"<div class='filter_cancel_btn filter_cancel_btn_"+rnd+" delete_btn'>  </div>" +

			
		"</div>" +
		"</li>")
		.appendTo(".filter_ul")
		;
		
		
		

		
		$(".dropdown_content_elem").click(function(){
					
			var dropdown_group = $(this).parent().parent();
			
			console.log(dropdown_group.data("selector_type"));
			
			
			var dropdown_btn = dropdown_group.find(".dropdown_btn");
			
			dropdown_btn.data("name",$(this).data("attr_name"));
			dropdown_btn.data("value",$(this).data("attr_value"));
			
			console.log(dropdown_group.find(".dropdown_btn"));
			
			console.log($(this).html());
			
			
			dropdown_btn.html($(this).data("attr_name"));
			
			console.log(dropdown_btn.data("value"));
			
		});
		
		
		
		$(".filter_cancel_btn_"+rnd).click(function(){
			
			
			var deleted_filter_index = $(this).parent().find(".filter_index").text();
			
			console.log("deleted_filter_index = "+deleted_filter_index);
			
			$(this).parent().parent().remove();
			
			var filter_size = $(".filter_ul .filter_index").length;
			
			
			
			
			
			
			$(".filter_ul .filter_index").each(function(i,data_elem){
				
				
//				console.log("i = "+i);
//				console.log(data_elem);
//				console.log("i="+$(data_elem).text());
//				
				var this_filter_index = parseInt($(data_elem).text());
				
				
				
				if (deleted_filter_index < this_filter_index){
					
					console.log("this_filter_index = "+this_filter_index);
					
					this_filter_index = this_filter_index - 1;
				
					$(data_elem).text(this_filter_index);
					
					$(data_elem).parent().data("filter_index",filter_index);
					
					filter_index = filter_index - 1;
					
				};
				
				
				if (filter_size==(i+1)){
					
//					$(this).parent().remove();
					
					filter_index = filter_size + 1;
					
				};
				
				
			})
			
			
//			$(this).parent().remove();
//			
//			filter_index = filter_index - 1;
			
			
			

		});
		

}




function get_cluster_template()
{
	var deferred = new $.Deferred();
	
	$.ajax({
		type: "POST",
	    url: "clustertemplate/get/byId",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify( {
	    	"dashboardUserId":  "parnil@qfour.com",
	    	"clusterTemplateId" : current_cluster_template_id
	    	
	    }),
	    success: function(data)
	    {
	    	console.log(data);
	    	console.log(data.length);
	    	cluster_template_data = data[0];
	    	
	    
	    	
	    	deferred.resolve(cluster_template_data);
	 	    	    
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



function set_cluster_template()
{
	var deferred = new $.Deferred();
	
	$.ajax({
		type: "POST",
	    url: "clustertemplate/set",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify( {
	    	"dashboardUserId":  "parnil@qfour.com",
	    	"name":  $(".cluster_template_name_input_text").val(),
	    	"filterListJson":  JSON.stringify(filter_list_data),

	    }),
	    success: function(data)
	    {
	    	console.log(data);

	    	
	    	cluster_template_data = data;
	    	
	    
	    	
	    	deferred.resolve(cluster_template_data);
	 	    	    
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




