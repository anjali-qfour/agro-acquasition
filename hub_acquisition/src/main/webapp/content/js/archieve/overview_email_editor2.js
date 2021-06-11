

var quill = null;
var email_js = $("<div></div>");
var css_val = null;

var email_html = null;
var html_doc = null;


var single_email_template_data = null;
var email_template_data = null;

var email_name_found_array = [];

var template_status  = 0; // 0 for new ; 1 for pre-existing 


var current_email_path = "";





function init_overview_emailer()
{
	
    $("<div class='layer1 left_col col'> </div>").appendTo(".main_content");
    
    Promise.all([get_email_templates_all()]).then(function (){		
    	
	});
    
    
    
    if (current_email_name!="new-email-template"){
    	
    	template_status  = 1;
    	
        Promise.all([get_email_template(current_email_name)]).then(function (){
    		
        	draw_editor_tool();        	
        	draw_test_email_tool();        	
        	draw_send_bulk_email_tool();
        	
    	});
    	
    }
    else{
    	
    	draw_editor_tool();    	
    	draw_test_email_tool();
    	draw_send_bulk_email_tool();
    	
    };
    
	

}





function draw_editor_tool()
{
	
	var tool_class_name = "editor";
	var tool_dot_class_name = " ."+tool_class_name;

	
	

	var tool_w = su*19;
	var tool_max_h = lu*14;
		

	var subject_text =   ((single_email_template_data==null)||(single_email_template_data.subject==null))  ? "" : single_email_template_data.subject  ;
	
	
	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			
			"<div class='tool_box_header'>" +
			
				"<div class='tool_box_header_name'> Template Name </div>"+
				"<input type='text' class='input_text template_name_input_text ' title='Click To Edit ...' name='fname' " +
				" value='" +((current_email_name == "new-email-template")? "" : single_email_template_data.emailName )+
				"'  >"+
				"<div class='tool_box_section_text_btn rename_email_name_btn small_text bold_text '> Rename </div>"+
				"<div class='edit_symb small_text bold_text ' title='Click To Edit ...' >  </div>"+
				
			"</div>" +	
			
			"<div class='tool_box_content'>" +
				
				"<div class='toolbox_section'>" +
					"<div class='toolbox_section_header small_text bold_text'> Subject  </div>"+
					"<div class='tool_box_section_sep '> </div>"+
					"<input type='text' class='input_text email_subject_input_text ' name='fname' " +
					" value = '" + subject_text +
					"' > " +					
				"</div>"+
				
				"<div id='editor'>"+
				  "<p>Write your email here...</p>"+
				"</div>" +
	
				"<div class='tool_box_section_text_btn small_text bold_text save_email_template_btn'> Save </div>"+
				
				"<div class='toolbox_section_error small_text  save_btn_msg'> </div>"+


			
		    "</div>" +
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:(tool_w),
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
	

	$(".rename_email_name_btn").click(function(){
		
		update_email_templates_email_name();
				
	});
	
	
	
	


	$(".save_email_template_btn").click(function(){
		
		save_email_template();
				
	});
	
	
	
	
	
	$(".save_email_template_input_text").val(  (current_email_name == "new-email-template")? "" : current_email_name );
	
	
	$(".save_email_template_input_text").keyup(function(event){
		
		console.log($(".save_email_template_input_text").val());
		
		var current_text = $(".save_email_template_input_text").val();
		
		email_name_found_array  = email_template_data.filter(d=>d.emailName==current_text);
		
		
		if ((email_name_found_array.length>0)&&(current_text.length>0)){
			$(".save_name_error").css("opacity",1).text("Name Exists");
			
		}
		else{
			$(".save_name_error").css("opacity",0).text("");
		};
		
		if (event.keyCode === 13) {
			save_email_template();

        } 
		
	});
	
	

	
	
	$(".send_bulk_email_btn").click(
			function(){
				
				var n = $( "input:checked" ).length;				  				

				if (n==1){					
//					send the bulk messages from here .					
				}
				else{
					
					console.log("no here");
					
					draw_modal_warning("Please Unlock the Bulk Send");
					
				};
			}			
	);

	
	
	
	
	$(".send_test_email_input_text").val(profileJson[0][0].email);
	

	
	
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

				"<div class='toolbox_section'>" +
					"<div class='toolbox_section_header small_text bold_text'> Send to Email </div>"+
					"<div class='tool_box_section_sep '> </div>"+
					"<input type='text' class='input_text send_test_email_input_text ' name='fname'>"+
					"<div class='tool_box_section_text_btn small_text bold_text send_test_email'> Send </div>"+
					"<div class='toolbox_section_error small_text  send_test_email_btn_msg'> </div>"+

				"</div>"+
				
		    "</div>" +
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:(tool_w),
//			height:tool_max_h,
//			"min-height" : (tool_max_h),
			
		})
		.data("view_status",1)
		.click(function(){
		
		})		
		.appendTo(".left_col")
		;
	
 
	
	
	

	$(".send_test_email").click(function(){
		
		export_script(quill.root.innerHTML);

		
		console.log( is_email($(".send_test_email_input_text").val() ) );
		
		if (is_email($(".send_test_email_input_text").val() )){
			
			
			$(".send_test_email_btn_msg")
				.removeClass("toolbox_section_error")
				.addClass("toolbox_section_success")
				.css("opacity",1)						
				.text(" Sending email ... ")
				;
		
			current_email_path = single_email_template_data.emailPath;		
			
			send_test_email();
			
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
	var tool_max_h = lu*14;
		

	$("<div class='"+tool_class_name+" layer1 tool_box large_text'> " +
			
			"<div class='tool_box_header'>" +
			
				"<div class='tool_box_header_name'> Send Bulk Email </div>"+

				
			"</div>" +	
			
			"<div class='tool_box_content'>" +

			"<div class='toolbox_section bulk_send_section'>" +
				"<div class='toolbox_section_header bulk_send_section_header small_text bold_text cartexit_text '> Send Bulk Email </div>"+
				"<div class='tool_box_section_sep '> </div>"+				
				"<div class=' bulk_email_lock switch_tool small_text bold_text'> " +
					"<div class=' switch_left_name '> Lock </div>" +
					"<div class=' switch_box small_text '> " +
						"<input type='checkbox' id='switch' /><label for='switch'>Toggle</label>  " +	  
					"</div> " +
					"<div class=' switch_right_name '>Unlock</div>" +
				"</div>"+
				
				"<div class='tool_box_section_sep '> </div>"+
				"<div class='tool_box_section_text_btn small_text bold_text send_bulk_email_btn deactivate_text_btn'> Send </div>"+
			"</div>"+	
				
		    "</div>" +
	"</div>")
		.css({
			left:(0),
			top: (0),
			width:(tool_w),
//			height:tool_max_h,
//			"min-height" : (tool_max_h),
			
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

		}
		else{
			
			$(".send_bulk_email_btn")
				.addClass( "deactivate_text_btn" )
				
				;
		};


		
	} );
	
	
	
	
	
	
	height_cascade();
	
	
	
}



function save_email_template()
{
	var current_save_input_text = $(".template_name_input_text").val();
	
	export_script(quill.root.innerHTML);
	
	$(".save_btn_msg").css("opacity",0);
	
	
	
	email_name_found_array  = email_template_data.filter(d=>d.emailName==current_save_input_text);
	
	console.log(current_save_input_text);
	console.log(email_name_found_array);
	
	
    if ($(".template_name_input_text").val().length==0){
    	
//    	console.log("Type a Name");
		
    	$(".save_btn_msg").css("opacity",1).text("Give a name to email template ");
		
	} 
	else if (template_status==0){
		
		
//		console.log("save New ones");
		
		current_email_name = $(".template_name_input_text").val();
		current_email_path = $(".template_name_input_text").val()								
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
				
		    	$(".save_btn_msg").css("opacity",1).text(" Saved ... ");
				
//				window.location = "user/overview/emailer/email_editor?en="+current_email_name;
				
			}
			else{

				// Give warning 	
				
			};				
			
		});
		
		
		
	}
	
	else if (template_status==1){
		
		console.log("update current ");
		
		current_email_name = $(".template_name_input_text").val();
		current_email_path = single_email_template_data.emailPath;		
		
		
		Promise.all([update_email_templates_email_name()]).then(function ([data]){	
			
			console.log(data);
			
			Promise.all([overwrite_email_templates()]).then(function ([data]){
				
				console.log(data);
				
				if (data=="success"){
					
					$(".save_btn_msg")
						.removeClass("toolbox_section_error")
						.addClass("toolbox_section_success")
						.css("opacity",1)						
						.text(" Saved ... ")
						;
					
					
					setTimeout(function(){ 
						$(".save_btn_msg").css("opacity",0); 
						
					},5000);

				}
				else{
					
					$(".save_btn_msg")
						.removeClass("toolbox_section_success")
						.addClass("toolbox_section_error")
						.css("opacity",1)
						.text(" Error saving the file ... ")					
						;
					
					
					setTimeout(function(){ 
						$(".save_btn_msg").css("opacity",0); 
						
					},10000);
					
					
				};
				
				
				
			});
			
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
         ['blockquote', 'code-block'],

//         [{ 'header': 1 }, { 'header': 2 }],               // custom button values
         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
         [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
         [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
         [{ 'direction': 'rtl' }],                         // text direction

//         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
         [ 'link', 'image', 'video', 'formula' ],          // add's image support
         [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//         [{ 'font':  fonts.whitelist  }],
         [{ 'align': [] }],
         
         [{ 'font': fontNames }],

         ['clean'],                                         // remove formatting button
//         [{ 'add_product': ['top_left', 'top_right', 'bottom_left', 'Bottom_right', 'middle', ] }],
         ['add_product'],                                         // remove formatting button
         [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
         ['export'],    

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
               }
             }
         },
     });
	 
	 
	 
	
	 
	 
	 function add_product_Handler(value) {

         var range = this.quill.getSelection();

         var value = "content/svg/product_box.svg";
         
         if(value){
        	 
             this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
             
             console.log(getQuillHtml());
             
         }

	 }
	 
	 
	 
//	 // We need to manually supply the HTML content of our custom dropdown list
//	 const add_product_items = Array.prototype.slice.call(document.querySelectorAll('.ql-add_product .ql-picker-item'));
//	 add_product_items.forEach(item => item.textContent = item.dataset.value);
//	 document.querySelector('.ql-add_product .ql-picker-label').innerHTML
//	            = 'Add Product' + document.querySelector('.ql-add_product .ql-picker-label').innerHTML;
	 
	 
	 
	 
	 
	 $(".ql-add_product").text("Add Product");
	 
	 
	 $(".ql-export").text("Export");

	 
	 function getQuillHtml() { return quill.root.innerHTML; }


	 function export_Handler(value) {

//         console.log(getQuillHtml());
         
		 email_js = $("<div></div>");
		 css_val = null;
		 
         export_script(quill.root.innerHTML);

	 }
	 
	 
	 
	 
	 
	 if (template_status==1){
		 
		 $(".ql-editor")
		 	.html($(single_email_template_data.htmlStr).html())
		 	;
		 
		 
//		 console.log($(single_email_template_data.htmlStr).html());
		 
		 
	 };
	 
	
	
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
	    			"emailName": $(".template_name_input_text").val(),
	    			"emailPath": current_email_path,
	    			
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









function update_email_templates_email_name()
{
//	console.log("footfalls.get_item_location : item_id :=" +item_id);

	var deferred = new $.Deferred();
	
//	console.log($(".template_name_input_text").val());
//	console.log(single_email_template_data);

	$.ajax({
		type: "POST",
	    url: "email_templates/rename",	    
	    contentType: "application/json; charset=utf-8",
//	    headers: {
//            'Access-Control-Allow-Origin ': '*'
//        },
//	    dataType: "json",
	    data:  JSON.stringify(
	    		{
	    			"dashboardUserId": profileJson[0][0].email,
	    			"emailName": $(".template_name_input_text").val(),
	    			"emailPath": single_email_template_data.emailPath,	    			
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














