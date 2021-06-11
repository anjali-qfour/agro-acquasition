

var quill = null;
var email_js = $("<div></div>");
var css_val = null;

var email_html = null;
var html_doc = null;


var add_ai_reco_btn = null;
var ai_reco_image_link=null;
var ai_reco_item_name=null;
var ai_reco_item_link=null;


var single_email_template_data = null;
var email_template_data = null;

var email_name_found_array = [];

var template_status  = 0; // 0 for new ; 1 for pre-existing 


var current_email_path = "";

var wait_flag = 0;


var item_map = {};
var item_map_value = [];


function init_overview_emailer()
{
	
    $("<div class='layer1 left_col col'> </div>").css({
		"width": "calc(100% - calc(var(--su) * 1.666) )" }).appendTo(".main_content");
    
    console.log(current_email_name);
    
    Promise.all([get_email_templates_all()]).then(function (){		
    	
	});
    
    
    
    if (current_email_name!="new-email-template"){
    	
    	template_status  = 1;
    	
        Promise.all([get_email_template(current_email_name)]).then(function (){
    		
        	if (single_email_template_data.emailPath==null){
				window.location = "user/communication/email";

        	}
        	else{

            	draw_editor_tool();        	
            	draw_test_email_tool();        	
            	draw_send_bulk_email_tool();
            		
        	};
    	});
    	
    }
    else{
    	
    	draw_editor_tool();    	
    	draw_test_email_tool();
    	draw_send_bulk_email_tool();
    	
    };
    
    
    Promise.all([get_all_sim_data()]).then(function (){
    	
//    	console.log(sim_data);
    	Promise.all([compute_top_recommendations()]).then(function (){
    		
    		update_ai_recommendation();
    	
    	}); 

    }); 
    
    
	

}



function compute_top_recommendations()
{
	var deferred = new $.Deferred();
	
	
    var sim_data_l = sim_data.length;

    for (var i=0; i<sim_data_l; i++){
    	    	
    	var data_elem = sim_data[i];
    	var simItems_str = data_elem.simItems.toString().replace(/i/g, "\"i\"").replace(/s/g, "\"s\"");
    	var simItems = JSON.parse(simItems_str);    	    	

//    	console.log(simItems);
    	
    	
    	
    	$.each(simItems,function(j,d){
    		
    		
    		if (item_map.hasOwnProperty(d.i)){
    			
    			item_map[d.i].count = item_map[d.i].count + d.s; 
    		}
    		else{
    			item_map[d.i] = { 
        				
        				"item_id": d.i,
        				"count" : d.s,        				
        		};
    		};
    		
    		

    	});
    	
    	

		
		if (i+1==sim_data_l){
			
			item_map_value = Object.values(item_map)
			
			item_map_value.sort((a,b) => b.count - a.count);
			
//    		console.log(item_map_value);
    		
    		deferred.resolve(item_map_value);

		};
    	
    }	
    
    
    return deferred.promise();

}



function update_ai_recommendation()
{
	
	
	setTimeout(function(){ 
		
		$(".ai_reccomends_section ul").empty();
		
		var promise_all = [];
		
		
	    var item_map_value_l = item_map_value.length;
	    
	    for(var i=0; i<6; i++){
	    	
	    	
	    	promise_all.push(get_single_item_data(item_map_value[i].item_id));
	    	
	    	if (6==i+1){
	    		
	    		Promise.all(promise_all).then(function(item_info_array) {
	    			
	    			var item_info_array_l = item_info_array.length;
					  
					  for (var j=0; j<item_info_array_l; j++){					  
						  
						  var data_elem = item_info_array[j];
						  
//					    	console.log(data_elem);
					    	
					    	var li = $("<li>" +
									"<div class='item_box  '>" +
										"<div class='item_image  '> <img class=' ' src='"+ data_elem.imageUrl +"'/> </div>" +
										"<div class='item_name small_text '> "+ string_trim(data_elem.nameStr,26) +" </div>" +
									"</div>" +
							 "</li>")
							 .data(data_elem)
							 .click(function(){
								 console.log("clicked");
								 console.log($(this).data());
								 ai_reco_image_link = $(this).data().imageUrl;
								 ai_reco_item_link = $(this).data().imageUrl;
								 ai_reco_item_name=$(this).data().nameStr;
								 
								 
								 $(".ql-ai_reco_btn").trigger("click");
								 
							 });

					    	$(".ai_reccomends_section ul").append(li);
					  }
	    			
	    		});
	    	};
	    }
	    
//	    for(var i=0; i<7; i++){
//	    	
//	    	console.log(i);
//	    	
//	    	var li = $("<li>" +
//							"<div class='item_box  '>" +
//								"<div class='item_image ' src=''></div>" +
//								"<div class='item_name '> </div>" +
//							"</div>" +
//					 "</li>");
//	    	
//	    	$(".ai_reccomends_section ul").append(li);
//	    	
//	    }

		
		
		
		
	},2000);
	
}








function draw_editor_tool()
{
	
	var tool_class_name = "editor";
	var tool_dot_class_name = " ."+tool_class_name;

	
	

	var tool_w = su*19;
	var tool_max_h = lu*14;
		

	var subject_text =  ((single_email_template_data==null)||(single_email_template_data.subject==null))  ? "" : single_email_template_data.subject  ;
	
	var senders_name_text =  ((single_email_template_data==null)||(single_email_template_data.sendersName==null))  ? "" : single_email_template_data.sendersName  ;
	
	var senders_email_text =  ((single_email_template_data==null)||(single_email_template_data.sendersEmail==null))  ? "" : single_email_template_data.sendersEmail  ;
	
	console.log(senders_name_text);
	
	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			
			"<div class='tool_box_header'>" +
			
				"<div class='tool_box_header_name'> Email Template </div>"+
				"<input type='text' class='input_text template_name_input_text ' title='Click To Edit ...' name='fname' " +
				" value='" +((current_email_name == "new-email-template")? "" : single_email_template_data.emailName )+
				"'  >"+

				
			"</div>" +	
			
			"<div class='tool_box_content'>" +
				
			"<div class='input_text_group senders_Name'>" +
				"<input type='input' class='input_text_field senders_name_input_text' placeholder='Senders_Name' name='name'   " +
				" value='" + senders_name_text + "' required />" +
				"<label for='name' class='input_text_label'>Sender's Name </label>" +
			"</div>" +
			
			
			"<div class='input_text_group displayed_email'>" +
				"<input type='input' class='input_text_field senders_email_input_text' placeholder='displayed_email' name='name'  " +
				" value='" + senders_email_text + "' required />" +
				
				"<label for='name' class='input_text_label'>Sender's Email </label>" +
			"</div>" +
			

			"<div class='input_text_group email_subject'>" +
				"<input type='input' class='input_text_field email_subject_input_text' placeholder='displayed_email' name='name'   " +
				" value='" + subject_text + "' required />" +
				"<label for='name' class='input_text_label'> Subject </label>" +
			"</div>" +
			
			
			"<div class='ai_reccomends_section '> " +
				"<label for='name' class='input_text_label'> Insight ai reccomends </label>" +
				"<ul>" +
					"<li>" +
						"<div class='item_box  '>" +
							"<div class='item_image shine' src=''></div>" +
							"<div class='item_name shine'> </div>" +
						"</div>" +
					"</li>" +
					"<li>" +
					"<div class='item_box  '>" +
						"<div class='item_image shine' src=''></div>" +
						"<div class='item_name shine'> </div>" +
					"</div>" +
					"</li>" +
					"<li>" +
					"<div class='item_box  '>" +
						"<div class='item_image shine' src=''></div>" +
						"<div class='item_name shine'> </div>" +
					"</div>" +
					"</li>" +
					"<li>" +
					"<div class='item_box  '>" +
						"<div class='item_image shine' src=''></div>" +
						"<div class='item_name shine'> </div>" +
					"</div>" +
					"</li>" +
					"<li>" +
					"<div class='item_box '>" +
						"<div class='item_image shine' src=''></div>" +
						"<div class='item_name shine'> </div>" +
					"</div>" +
					"</li>" +
					"<li>" +
					"<div class='item_box '>" +
						"<div class='item_image shine' src=''></div>" +
						"<div class='item_name shine'> </div>" +
					"</div>" +
					"<li>" +
					"<div class='item_box '>" +
						"<div class='item_image shine' src=''></div>" +
						"<div class='item_name shine'> </div>" +
					"</div>" +
				
				"</ul>" +
				
			"</div>" +
			
			
			"<div class='ai_product_section '> " +
				"<label for='name' class='input_text_label'> Personalized AI Prediction </label>" +
				"<div class='tool_box_section_text_btn small_text bold_text add_ai_product_btn'> Add AI Product </div>"+

			"</div>" +

			"<div id='editor'>"+
			  "<p>Write your email here...</p>"+
			"</div>" +
			
			"<div class='tool_box_section_text_btn small_text bold_text save_email_template_btn'> Save </div>"+
			
			"<div class='toolbox_section_error small_text save_btn_msg'> </div>"+

			
		    "</div>" +
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:"100%",
//			height:tool_max_h,
//			"min-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col")
		;
	
	
	
	
	
	$(".ql-editor").click(function(){
		
		$(".save_btn_msg").css("opacity",0);
		
		console.log('$(".ql-editor").click');
				
	});
	

	
	


	$(".save_email_template_btn").click(function(){

		if (wait_flag==1){
			return;
		};
		
		
		
		$(".save_email_template_btn").addClass("active_text_btn");
		
		$(".save_btn_msg")
			.removeClass("toolbox_section_error")
			.addClass("toolbox_section_success")
			.css("opacity",1)						
			.text(" Processing ... ")
			;
		
		save_email_template();
		
	});
	
	
	
	$(".add_ai_product_btn").click(function(){

		if (wait_flag==1){
			return;
		};
		
		$(".ql-add_product").trigger("click");
		
		
	});
	
	
	


	
	

	
	
	update_editor_tool();
	
	height_cascade();
	
	
	
}



function draw_test_email_tool()
{
	
	var tool_class_name = "testemail";
	var tool_dot_class_name = " ."+tool_class_name;

	
	

	var tool_w = su*19;
	var tool_max_h = lu*14;
		

	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			
			"<div class='tool_box_header'>" +
			
				"<div class='tool_box_header_name'> Test Email </div>"+

				
			"</div>" +	
			
			"<div class='tool_box_content'>" +

//				"<div class='toolbox_section'>" +
//					"<div class='toolbox_section_header small_text bold_text'> Send to Email </div>"+
//					"<div class='tool_box_section_sep '> </div>"+
//					"<input type='text' class='input_text send_test_email_input_text ' name='fname'>"+
//					"<div class='tool_box_section_text_btn small_text bold_text send_test_email'> Send </div>"+
//					"<div class='toolbox_section_error small_text  send_test_email_btn_msg'> </div>"+
//				"</div>"+
			


			"<div class='input_text_group send_test_email_input_group'>" +
				"<input type='input' class='input_text_field send_test_email_input_text' placeholder='test_email' name='name'   required />" +
				"<label for='name' class='input_text_label'> To Email </label>" +
			"</div>" +
		
			"<div class='tool_box_section_text_btn small_text bold_text send_test_email_btn'> Send </div>"+
			
			"<div class='toolbox_section_error small_text  send_test_email_btn_msg'> </div>"+
				
		    "</div>" +
	"</div>")
		.css({
			left:(0),
			top: (su_3),			
			width:"100%",
//			height:tool_max_h,
//			"min-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col")
		;
	
 
	
	
	

	$(".send_test_email_btn").click(function(){
		
		

		if (wait_flag==1){
			console.log("deactivated");
			return;
		};
		
		
		export_script(quill.root.innerHTML);


		console.log( is_email($(".send_test_email_input_text").val() ) );
		
		if (is_email($(".send_test_email_input_text").val() )){
			
			$(".send_test_email_btn").addClass("active_text_btn");

			
			$(".send_test_email_btn_msg")
				.removeClass("toolbox_section_error")
				.addClass("toolbox_section_success")
				.css("opacity",1)						
				.text(" Processing email ... ")
				;
		
			current_email_path = single_email_template_data.emailPath;		
			

			Promise.all([send_test_email()]).then(function ([data]){			
				
//				console.log(data);
				
				if (data=="success"){
					
					$(".send_test_email_btn_msg")
							.removeClass("toolbox_section_error")
							.addClass("toolbox_section_success")
							.css("opacity",1)						
							.text(" Sent  ")
							;	
					
				}
				else{

					$(".send_test_email_btn_msg")
						.removeClass("toolbox_section_success")
						.addClass("toolbox_section_error")
						.css("opacity",1)
						.text(" Error saving the file ... ")					
						;				
				};	
				
				
				$(".send_test_email_btn").removeClass("active_text_btn");

				
			});
				
				
			
		}
		else{
			
			
			$(".send_test_email_btn_msg")
				.removeClass("toolbox_section_success")
				.addClass("toolbox_section_error")
				.css("opacity",1)						
				.text(" Incorrect email address ... ")
				;
		
		
			setTimeout(function(){ 
				$(".save_btn_msg").css("opacity",0); 
				
			},5000);
			
			
		};
		
		
				
	});
	
	
	
	height_cascade();
	
	
	
}



function draw_send_bulk_email_tool()
{
	
	var tool_class_name = "sendbulk";
	var tool_dot_class_name = " ."+tool_class_name;

	
	

	var tool_w = su*19;
	var tool_max_h = su*4;
		

	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			
			"<div class='tool_box_header bulk_send_header'>" +
			
				"<div class='tool_box_header_name bulk_send_header_name cartexit_text '> Send Bulk Email </div>"+
				"<div class=' bulk_email_lock switch_tool small_text bold_text'> " +
					"<div class=' switch_left_name '> Lock </div>" +
					"<div class=' switch_box small_text '> " +
						"<input type='checkbox' id='switch' /><label for='switch'>Toggle</label>  " +	  
					"</div> " +
					"<div class=' switch_right_name '>Unlock</div>" +
				"</div>"+
				
			"</div>" +	
			
			"<div class='tool_box_content bulk_send_content'>" +
				
				"<div class='bulk_send_half_section'>" +
					"<div class='toolbox_section_header bulk_send_section_header small_text bold_text faint_text '> Number of emails sent till now </div>"+
					"<div class='toolbox_section_header bulk_send_section_value nomral_text  faint_text '> 6,233 </div>"+
				"</div>"+
				
				"<div class='bulk_send_half_section'>" +
					"<div class='toolbox_section_header bulk_send_section_header small_text bold_text faint_text '> Number of emails in database  </div>"+
					"<div class='toolbox_section_header bulk_send_section_value nomral_text  faint_text '> 36,844 </div>"+
				"</div>"+
				
				"<div class='bulk_send_half_section'>" +
					"<div class='toolbox_section_header bulk_send_section_header small_text bold_text  faint_text '> Latest time of bulk send </div>"+
					"<div class='toolbox_section_header bulk_send_section_value nomral_text  faint_text '> 12/5/2020 : 5:30pm </div>"+
				"</div>"+
				
				"<div class='bulk_send_half_section'>" +
					"<div class='toolbox_section_header bulk_send_section_header small_text bold_text faint_text '> Latest time of end of send  </div>"+
					"<div class='toolbox_section_header bulk_send_section_value nomral_text  faint_text '> 12/5/2020 : 6:34pm  </div>"+
				"</div>"+
				
				
				"<div class='bulk_send_section'>" +
					"<div class='toolbox_section_header bulk_send_section_header small_text bold_text cartexit_text faint_text '> Start sending bulk emails  </div>"+
					
					"<div class='tool_box_section_text_btn small_text bold_text send_bulk_email_btn deactivate_text_btn'> Send </div>"+
				"</div>"+
				
				"<div class='bulk_send_section'>" +
					"<div class='toolbox_section_header bulk_send_section_header small_text bold_text  cartexit_text faint_text '> Stop sending bulk emails </div>"+
					
					"<div class='tool_box_section_text_btn small_text bold_text stop_bulk_email_btn deactivate_text_btn'> Stop </div>"+
				"</div>"+	
				
		    "</div>" +
	"</div>")
		.css({
			left:(0),
			top: (su_3*2),
			width:"100%",
//			height:tool_max_h,
			"min-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col")
		;
	

	
	$( ".switch_tool input[type=checkbox]" ).on( "click", function(){
		
		var n = $( "input:checked" ).length;
		  
		var checkbox_values = ["all","visit","purchase","cartexit"];

		
		if (n==1){
			
			$(".send_bulk_email_btn").removeClass("deactivate_text_btn").addClass( "red_text_btn" );
			$(".stop_bulk_email_btn").removeClass("deactivate_text_btn").addClass( "red_text_btn" );
			$(".bulk_send_section_header").removeClass("faint_text");
			$(".bulk_send_section_value").removeClass("faint_text");
			
		}
		else{
			
			$(".send_bulk_email_btn").addClass( "deactivate_text_btn" );
			$(".stop_bulk_email_btn").addClass( "deactivate_text_btn" );
			$(".bulk_send_section_header").addClass("faint_text");
			$(".bulk_send_section_value").addClass("faint_text");
		};

		height_cascade();
		
	} );
	
	
	
	
	
	
	height_cascade();
	
	
	
}



function save_email_template()
{
	var current_save_input_text = $(".template_name_input_text").val();
	
	export_script(quill.root.innerHTML);
	
	$(".save_btn_msg")
		.removeClass("toolbox_section_error")
		.addClass("toolbox_section_success")
		.css("opacity",1)						
		.text(" Processing ... ")
		;
		
	
	
	
	console.log(current_save_input_text);
	console.log(email_name_found_array);
	
	
    if ($(".template_name_input_text").val().length==0){
    	
//    	console.log("Type a Name");
		
    	$(".save_btn_msg").css("opacity",1).text("Give a name to email template ");
		
	} 
	else if (template_status==0){
		
		
//		console.log("save New ones");
		
		current_email_name = $(".template_name_input_text").val();
		current_email_path = $(".template_name_input_text").val().replace(/\s/g,'')								
								+random_string(4)
								+"_"
								+email_template_data.length
//								+"_"
//								+".html"
								;
		
		console.log(current_email_path);
		
		Promise.all([add_email_templates()]).then(function ([data]){			
									
//			console.log(data);
			
			if (data=="success"){
				
				$(".save_btn_msg")
						.removeClass("toolbox_section_error")
						.addClass("toolbox_section_success")
						.css("opacity",1)						
						.text(" Saved ")
						;	
				
				window.location = "user/communication/email/editor?en="+current_email_path;
				
			}
			else{

				$(".save_btn_msg")
					.removeClass("toolbox_section_success")
					.addClass("toolbox_section_error")
					.css("opacity",1)
					.text(" Error saving the file ... ")					
					;				
			};				
			

			$(".save_email_template_btn").removeClass("active_text_btn");
			resume_after_completion();
			
			setTimeout(function(){ 
				$(".save_btn_msg").css("opacity",0); 

				
			},10000);
		
		});
		
		
		
	}
	
	else if (template_status==1){
		
		console.log("update current ");
		
		current_email_name = $(".template_name_input_text").val();
		current_email_path = single_email_template_data.emailPath;	
		
		wait_for_completion();
		
		
		Promise.all([update_email_templates()]).then(function ([data]){	
			
			console.log(data);
			
				
			
			if (data=="success"){
				
				$(".save_btn_msg")
					.removeClass("toolbox_section_error")
					.addClass("toolbox_section_success")
					.css("opacity",1)						
					.text(" Saved ")
					;
				
				 

			}
			else{
				
				$(".save_btn_msg")
					.removeClass("toolbox_section_success")
					.addClass("toolbox_section_error")
					.css("opacity",1)
					.text(" Error saving the file ... ")					
					;
				
				 
				
			};
				

			$(".save_email_template_btn").removeClass("active_text_btn");
			resume_after_completion();
			
			setTimeout(function(){ 
				$(".save_btn_msg").css("opacity",0); 

				
			},10000);
		
				
			
		});
		
		
		
		
	}
	
	


}




function update_editor_tool()
{
//	var Embed = Quill.import('blots/block/embed');
	
	 var DirectionAttribute = Quill.import('attributors/attribute/direction');
     Quill.register(DirectionAttribute,true);

     var AlignClass = Quill.import('attributors/class/align');
     Quill.register(AlignClass,true);

     var BackgroundClass = Quill.import('attributors/class/background');
     Quill.register(BackgroundClass,true);

     var ColorClass = Quill.import('attributors/class/color');
     Quill.register(ColorClass,true);

     var DirectionClass = Quill.import('attributors/class/direction');
     Quill.register(DirectionClass,true);

     var FontClass = Quill.import('attributors/class/font');
     Quill.register(FontClass,true);

     var SizeClass = Quill.import('attributors/class/size');
     Quill.register(SizeClass,true);

     var AlignStyle = Quill.import('attributors/style/align');
     Quill.register(AlignStyle,true);

     var BackgroundStyle = Quill.import('attributors/style/background');
     Quill.register(BackgroundStyle,true);

     var ColorStyle = Quill.import('attributors/style/color');
     Quill.register(ColorStyle,true);

     var DirectionStyle = Quill.import('attributors/style/direction');
     Quill.register(DirectionStyle,true);

     var FontStyle = Quill.import('attributors/style/font');
     Quill.register(FontStyle,true);

     var SizeStyle = Quill.import('attributors/style/size');
     Quill.register(SizeStyle,true);
     
     var formatsList = Quill.import('formats/list');
     Quill.register(formatsList,true);
     
     var formatsListItem = Quill.import('formats/list/item');
     Quill.register(formatsListItem,true);
     

     
     // specify the fonts you would 
	var fonts = ['Arial', 'Courier', 'Garamond', 'Tahoma', 'Times New Roman', 'Verdana'];
	// generate code friendly names
	function getFontName(font) {
	    return font.toLowerCase().replace(/\s/g, "-");
	}
	var fontNames = fonts.map(font => getFontName(font));
	// add fonts to style
	var fontStyles = "";
	fonts.forEach(function(font) {
	    var fontName = getFontName(font);
	    fontStyles += ".ql-snow .ql-picker.ql-font .ql-picker-label[data-value=" + fontName + "]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=" + fontName + "]::before {" +
	        "content: '" + font + "';" +
	        "font-family: '" + font + "', sans-serif;" +
	        "}" +
	        ".ql-font-" + fontName + "{" +
	        " font-family: '" + font + "', sans-serif;" +
	        "}";
	});
	var node = document.createElement('style');
	node.innerHTML = fontStyles;
	document.body.appendChild(node);
	
     
     
     
	 var toolbarOptions = [
         ['bold', 'italic', 'underline', 'strike'],        // toggled buttons         
         [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
         [{ 'font': fontNames }],
         ['blockquote', 'code-block'],

//         [{ 'header': 1 }, { 'header': 2 }],               // custom button values
         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
         [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
         [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

//         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
         [ 'link', 'image' ],          // add's image support
         [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//         [{ 'font':  fonts.whitelist  }],
         [{ 'align': [] }],
         
//         ['clean'],                                         // remove formatting button
//         [{ 'add_product': ['top_left', 'top_right', 'bottom_left', 'Bottom_right', 'middle', ] }],
         ['add_product'],   
         
//         ['export'],    

     ];
	 
	 
	 
	// Add fonts to whitelist
	 var Font = Quill.import('formats/font');
	 Font.whitelist = fontNames;
	 Quill.register(Font, true);

	 
	 
	 
	 quill = new Quill('#editor', {
         theme: 'snow',
         modules: {
        	 imageResize: {
                 displaySize: true
               },
             toolbar: {
                 container: toolbarOptions,
                 handlers: {
                	 "add_product" : add_product_Handler,
                	 "export" : export_Handler,
                	 "image" : image_handler,
               }
             }
         },
     });
	 
	 
	
	 
	 
	 
	 
	 
	 
	 
	 const nametag_items = {
			    'Name Only': '{Name}',
			    'Name + Surname ': '{Name Surname}',			    
			    'Email Id Only': '{emailid}',
			    'Full Email': '{emailid@abcd.com}'
			};

	 const nametag_dropdown = new QuillToolbarDropDown({
	    label: "# Name tag   ",
	    rememberSelection: false
	 });

	 nametag_dropdown.onSelect = function(label, value, quill) {
		 
		 console.log(label);
		 console.log(value);

		 const { index, length } = quill.selection.savedRange;


//         quill.pasteHTML(index, $("<h1 id='product_tag' > "+value+" </h1>").html() );

         quill.pasteHTML(index,  "<div id='product_tag' > "+value+" </div>"  );

         
//         quill.insertEmbed(index, 'div', "" );


				    
	 };
	 
	 nametag_dropdown.setItems(nametag_items);
	 
	 nametag_dropdown.attach(quill);
	 
	 
	 

	 
	 add_ai_reco_btn = new QuillToolbarButton({
		 	id : "ai_reco_btn",
		    icon: `<svg viewBox="0 0 18 18"> <path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"></path></svg>`
	 }) 
	 
	 
	 add_ai_reco_btn.onClick = function(quill) {


		 var { index, length } = quill.selection.savedRange;
//		 quill.pasteHTML(index,  `<a>No way</a>`  );
		 quill.insertText(index, "\n");
		 quill.pasteHTML(index+1, `<a href="${ai_reco_item_link}"><img src="${ai_reco_image_link}" class="img-fluid" alt="Product Image"></a>`);
		 quill.insertText(index+2, "\n");
		 quill.pasteHTML(index+3, `<a href="${ai_reco_item_link}"><br/>${ai_reco_item_name}</a>`);
		 var { index, length } = quill.selection.savedRange;
		 quill.insertText(index, "\n");
		 quill.pasteHTML(index+1, `<p>${ai_reco_item_link}</p>`);
		 var { index, length } = quill.selection.savedRange;
		 quill.insertText(index, "\n");



	 }
	 
	 
	 add_ai_reco_btn.attach(quill);
	 
	 $(".ql-ai_reco_btn").parent().css("display","none");
	 
	 

	 function image_handler(value){
		 
		 var _this = this;
		 
		 $(".file_upload").remove();
		 
//		 var file_input = this.container.querySelector("input.ql-image[type=file]");
		 
//		 console.log(file_input);

		 
		 if (file_input==null){
			 
//			 file_input = document.createElement("input");
//			 file_input.setAttribute("type","file");
//			 file_input.setAttribute("accept","image/png, image/jpg, image/jpeg");
//			 file_input.classList.add("ql-image");

			 $("<input type='file' class='file_upload' style='display: none' />")
			 						.attr("accept","image/png, image/jpg, image/jpeg")			 						
			 						.appendTo("body")
			 						.trigger("click");
			 
			 var file_input = document.getElementsByClassName("file_upload")[0];
			 
			 
			 file_input.addEventListener("change",function(event){
				 
				
				 
				 if (file_input.files!=null && file_input.files[0]!=null){
					 
					
					 console.log(file_input.files);
					 
					 var max_size = 512000;
					 
					 var file_size = file_input.files[0].size;					 
					 console.log(file_size);

					 if (file_size<=max_size){
						 
							var range = quill.getSelection(true);
							console.log(range);
							console.log(event);
							console.log( event.target.result );

							 
							 var reader = new FileReader();
					            
							 reader.onload = function(event) {
					               var res = event.target.result;
//					               console.log(res)
				                   quill.editor.insertEmbed(range.index, 'image', event.target.result );

				                   $(".file_upload").remove();
							 };
							 
							 reader.readAsDataURL(file_input.files[0]);
						 
					 }
					 else{
						 
						 $(".file_upload").remove();
						 
						 draw_modal_warning("Excceded maximum size of 512k.");
						 
						 $(".file_upload").remove();
					 }
					 ;
					 
					 
				 };
				 
			 });
			 
		 }
		 
		 
//		 document.body.appendChild(file_input);
		 
		 
	 };
	
	 
	 
	 function add_product_Handler(value) {

         var range = this.quill.getSelection();

         var value = "content/svg/ai_recommended_img.svg";
         
         if(value){
        	 
//             this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
             
             quill.pasteHTML(range.index, `<a class="product_tag" href="${value}"><img src="${value}" class="img-fluid" ></a>`);

             
             
//             console.log(getQuillHtml());
             
         }

	 }
	 
	 
	 
//	 // We need to manually supply the HTML content of our custom dropdown list
//	 const add_product_items = Array.prototype.slice.call(document.querySelectorAll('.ql-add_product .ql-picker-item'));
//	 add_product_items.forEach(item => item.textContent = item.dataset.value);
//	 document.querySelector('.ql-add_product .ql-picker-label').innerHTML
//	            = 'Add Product' + document.querySelector('.ql-add_product .ql-picker-label').innerHTML;
	 
	 
	 
	 


	 
	 function getQuillHtml() { return quill.root.innerHTML; }


	 function export_Handler(value) {

//         console.log(getQuillHtml());
         
		 email_js = $("<div></div>");
		 css_val = null;
		 
         export_script(quill.root.innerHTML);

	 }
	 
	 
	 
	 
	 $(".ql-add_product").text("# Product Tag");
	 
//	 $(".ql-name_tag").text("# Name Tag");
	 
	 $(".ql-export").text("Export");
	 
	 
	 
	 if (template_status==1){
		 
		 $(".ql-editor")
		 	.html($(single_email_template_data.htmlStr).html())
		 	;
		 
		 
//		 console.log($(single_email_template_data.htmlStr).html());
		 
		 
	 };
	 
	
	 
	 
	 
	 
	
}






function wait_for_completion()
{
//	deactivate_text_btn
	
	wait_flag = 1;
	
	$(".send_test_email_btn").addClass("deactivate_text_btn");
	

	
}






function resume_after_completion()
{
//	deactivate_text_btn
	
	wait_flag = 0;
	
	$(".send_test_email_btn").removeClass("deactivate_text_btn");
	

	
}








function export_script(html_script)
{
	$(email_js).html("");
	
	get_children($(".ql-editor").clone());
	
	
//	console.log($(email_js).html());
	
	
//	get_item_location_all();
	
	
	return $(email_js).html();
}










function view_email(html_script)
{
	
	
	get_children($(".ql-editor").clone());
	
	
	console.log($(email_js).html());
	
	
	
	
	
	
}
























function css(a) {
    var sheets = document.styleSheets, o = {};
    var len = sheets.length;
    
    for (var i in sheets) {
    	
        var rules = sheets[i].rules || sheets[i].cssRules;
        
        for (var r in rules) {
        	
//        	console.log(rules[r].style);
        	
//        	console.log(a.attr('style'));
        	
        	if (a.is(rules[r].selectorText)) {
                o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
            }
        }
        

        
    }
    
    
    return o;
}







function css2json(css) {
    var s = {};
    if (!css) return s;
    if (css instanceof CSSStyleDeclaration) {
        for (var i in css) {
            if ((css[i]).toLowerCase) {
            	
            	
            	
                s[(css[i]).toLowerCase()] = (css[css[i]]);
            }
        }
    } else if (typeof css == "string") {
        css = css.split("; ");
        for (var i in css) {
            var l = css[i].split(": ");
            s[l[0].toLowerCase()] = (l[1]);
        }
    }
    return s;
}





function get_children(js_elem)
{

	var this_elem = js_elem;
	
//	console.log(this_elem);
	
	
	
	css_val = css(this_elem);
	delete css_val[Object.keys(css_val).filter(d=>d.length<3)];
	
//	console.log(css(this_elem));	
	this_elem.css(css_val);
	
		
	
	if (js_elem.children().length>0){
		
		js_elem.children().each(function(i,d){
			
//			console.log($(d));
			
//			console.log(css($(d)));
			
			$(this_elem).append($(d));

//			console.log(this_elem);
			
			get_children($(d));
			
//			console.log(css($(d)));		
			
			
			
		});
	}
	
	
	if ($(js_elem).hasClass("ql-editor")){
		
		$(email_js).append($(this_elem));

		$(email_js).find("ol li").each(function(i,d){
			
//			console.log(d);
//			console.log("1: "+$(d).css("list-style-type"));
			
			var left_space = $(d).css("padding-left");
			
			$(d).css(
				"list-style-type", "space-counter"
			);
			
//			console.log("2: "+$(d).attr("style"));
			
			$(d).attr("style", $(d).attr("style").replace("list-style-type: none;", "list-style-type: space-counter;"));
			
			$(d).css("padding-left", "0.5em");
			$(d).css("margin-left", left_space);
			
			
//			$(d).attr("style", "list-style-type: space-counter");
			
//			console.log("3: "+$(d).css("padding-left"));
			
		})
		
		
		
		
		
		$(email_js).find("ul li").each(function(i,d){
			

			
			var left_space = $(d).css("padding-left");
			
			$(d).css("list-style-type", "space-counter");
			
			
			$(d).attr("style", $(d).attr("style").replace("list-style-type: none;", "list-style-type: disc;"));
			
			$(d).css("padding-left", "0.5em");
			$(d).css("margin-left", left_space);
			
			
			

			
		})
		
		
		
	};
		
	
	
//	console.log($(this_elem));
//	console.log($(this_elem).attr("class"));
	
//	if (!$(this_elem).hasClass("ql-editor")){
//		if ($(this_elem).children()>0){
//			$(email_js).append($(this_elem));
//		};
//			
//	};
	
	return js_elem;	
	
}
























function get_email_templates_all()
{
//	console.log("footfalls.get_item_location : item_id :=" +item_id);

	var deferred = new $.Deferred();

	$.ajax({
		type: "POST",
	    url: "email_templates/get/all",	    
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
//	    data:  JSON.stringify( {"htmlStr": $(email_js).html()}),
	    success: function(data)
	    {
//	    	console.log("get_email_templates_all : 1.data :=");
//	    	console.log(data);
	    	
	    	email_template_data = data;
	    	
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















function get_email_template(email_path)
{
//	console.log("footfalls.get_item_location : item_id :=" +item_id);

	var deferred = new $.Deferred();

	$.ajax({
		type: "POST",
	    url: "email_templates/get/by/email_path",	    
	    contentType: "application/json; charset=utf-8",
//	    dataType: "json",
	    data:  JSON.stringify({ "emailPath" : email_path }),
	    success: function(data)
	    {
	    	console.log("single_email_template_data : 1.data :=");
	    	console.log(data);
	    	
	    	single_email_template_data = data;
	    	
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











function add_email_templates()
{
	
	
	
	
	var deferred = new $.Deferred();
	
	
	
	$.ajax({
		type: "POST",
	    url: "email_templates/add",	    
	    contentType: "application/json; charset=utf-8",
//	    dataType: "json",
	    data:  JSON.stringify(
	    		{
	    			
	    			"dashboardUserId": profileJson[0][0].email,
	    			"emailPath": current_email_path,
	    			"emailName": $(".template_name_input_text").val(),

	    			"sendersName": $(".senders_name_input_text").val(),
	    			"sendersEmail": $(".senders_email_input_text").val(),

	    			"subject": $(".email_subject_input_text").val(),
	    			"modifiedTs": (new Date()).getTime(),
	    			"sentbulkTs": (new Date()).getTime(),
	    			
	    			"htmlStr" : $(email_js).html(),
	    			
	    			
	    		}),	    		
	    success: function(data,status,jqXHR)
	    {
//	    	console.log("add_email_templates : 1.data :=");
//	    	console.log(JSON.parse(data) );
	        console.log(jqXHR.getAllResponseHeaders());

	    	template_status=1;
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













function update_email_templates()
{
//	console.log("footfalls.get_item_location : item_id :=" +item_id);

	var deferred = new $.Deferred();
	
	console.log(single_email_template_data.emailPath);
	console.log($(".template_name_input_text").val());
	console.log($(".email_subject_input_text").val());
	
	
	$.ajax({
		type: "POST",
	    url: "email_templates/update",	    
	    contentType: "application/json; charset=utf-8",
//	    headers: {
//            'Access-Control-Allow-Origin ': '*'
//        },
//	    dataType: "json",
	    data:  JSON.stringify(
	    		{
	    			"dashboardUserId": profileJson[0][0].email,
	    			"emailPath": current_email_path,
	    			"emailName": $(".template_name_input_text").val(),

	    			"sendersName": $(".senders_name_input_text").val(),
	    			"sendersEmail": $(".senders_email_input_text").val(),

	    			"subject": $(".email_subject_input_text").val(),
	    			"modifiedTs": (new Date()).getTime(),
	    			"sentbulkTs": (new Date()).getTime(),
	    			
	    			"htmlStr" : $(email_js).html(),

	    		}),
	    success: function(data,status,jqXHR)
	    {
//	    	console.log("add_email_templates : 1.data :=");
//	    	console.log(jqXHR);
//	        console.log(jqXHR.getAllResponseHeaders());

	    	template_status=1;
	    	deferred.resolve(data);
	    	
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	           console.log(jqXHR.getAllResponseHeaders());
	           console.log(textStatus);
	           console.log(errorThrown);
	    }
	    
	});
	
	return deferred.promise();

	
}










function overwrite_email_templates()
{
//	console.log("footfalls.get_item_location : item_id :=" +item_id);

	var deferred = new $.Deferred();
	
//	console.log($(".save_email_template_input_text").val());
//	console.log(current_email_path);

	$.ajax({
		type: "POST",
	    url: "email_templates/overwrite",	    
	    contentType: "application/json; charset=utf-8",
//	    dataType: "json",
	    data:  JSON.stringify(
	    		{
	    			"dashboardUserId": profileJson[0][0].email,
	    			"emailName": $(".save_email_template_input_text").val(),
	    			"emailPath": current_email_path,
	    			"subject": $(".email_subject_input_text").val(),
	    			"htmlStr" : $(email_js).html(),

	    			
	    		}),
	    success: function(data)
	    {
//	    	console.log("overwrite_email_templates : 1.data :=");
//	    	console.log(data );
	    	
	    	template_status=1;
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








function send_test_email()
{
//	console.log("footfalls.get_item_location : item_id :=" +item_id);

	var deferred = new $.Deferred();
	
//	console.log($(".save_email_template_input_text").val());
//	console.log(profileJson[0][0].email+"_"+$(".save_email_template_input_text").val()+".html");

	$.ajax({
		type: "POST",
	    url: "email_templates/sendtestemail",	    
	    contentType: "application/json; charset=utf-8",
//	    dataType: "json",
	    data:  JSON.stringify(
	    		{
	    			"emailPath": current_email_path,
	    			"emailName": $(".send_test_email_input_text").val(),
	    			"sendersName": $(".senders_name_input_text").val(),
	    			"sendersEmail": $(".senders_email_input_text").val(),
	    			"subject": $(".email_subject_input_text").val(),

	    			
	    		}),
	    success: function(data)
	    {
	    	console.log("add_email_templates : 1.data :=");
//	    	console.log(JSON.parse(data) );
	    	console.log(data);
	    	
	    	template_status=1;
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














