

file_map = {};


/*
	s3_folder_path needs to be withouht "/"
	
*/





function set_upload_event(upload_input_id, s3_folder_path, unique_id)
{

	var upload_field = upload_input_id.split("_upload_input")[0].replace("#","");
	
	
	file_map[upload_input_id] = {};
	
	
	
	$(upload_input_id).on("change",function(){
		
		var upload_html_elem = $(this);

		var file_data = $(this).prop('files')[0];
		
		
		
		
		
		
		if ($(this).siblings(".upload_message").hasClass("visible")){
			
			$(this).siblings(".upload_message").toggleClass("visible invisible");
			
		}
		
		
		
		
		
		
		
		
		if (!validated_file_extention(file_data.name) || (!validated_file_type(file_data.type)) ){
			
			
			
			$(this).siblings(".upload_message")
					.toggleClass("visible invisible")
					.find("small")
						.attr("class","text-warning")
						.text("File type is not allowed");
			
			
			return;
		}
		
	
	
		if (!validated_file_size(file_data.size)){
			
			console.log("validated_file_size");
			
			
			$(this).siblings(".upload_message")
					.toggleClass("visible invisible")
					.find("small")
						.attr("class","text-warning")
						.text("File size can not be more than "+MAX_UPLOAD_FILE_SIZE+"Mb");
			
			return;
	
		}
		
		
		
		file_name = unique_id+"-"+upload_field+"-"+random_numeric(4)+"."+file_data.name.split('.').pop();

		var upload_full_path = s3_folder_path+file_name;
			
						
		var file_elem = 		
				$(  
					'<div  class="d-flex mb-2 align-items-center uploaded_file_name">'+	
					'	<div class="float-left w-100">'+									
					'		<a class="d-flex align-items-center" href="user/api/farmer/download/'+upload_field+'?i='+file_data.name+'&f='+file_data.name+'" download="'+file_name+'">'+
					'			<div class="float-left"><i class="fas fa-file-image fa-2x text-info mr-1 float-left"></i></div>'+
					'			<div class="ml-1">'+file_name+' </div>'+
					'		</a>'+
					'	</div>'+																								
					'	<div  class="btn btn-sm btn-danger btn-md ml-2 shadow-sm btn-icon btn-circle float-right flex-shrink-1 cursor_on delete_uploaded_file">'+
					'		<i class="fas fa-trash-alt"></i>'+ 
					'	</div>'+
					'</div>'
					
				)
				.data(
					{file_name:file_name,upload_full_path:upload_full_path}
				);		
	
	
		upload_html_elem.closest(".row")
						.find(".uploaded_file_name_list")
						.append(
							file_elem
						);
			
			
		console.log(upload_html_elem.find(".delete_uploaded_file"));
		
						
		file_elem.find(".delete_uploaded_file")
						.click(function(d){

//							delete_uploaded_file($(this), upload_full_path,file_name);
							
							
							delete_uploaded_file($(this), upload_input_id, file_name);
							
							
						});
	
		
		
		
		
//		file_map[upload_input_id].push({file_name:file_name,file:file_data});
		
		
		file_map[upload_input_id][file_name] = {
													file : file_data,
													upload_full_path: upload_full_path
			
			
												};
		
		
//		.push({file_name:file_name,file:file_data});

	
	
	
	});
	
	
}











function delete_uploaded_file(delete_btn_elem, upload_input_id, file_name)
{
	console.log(delete_btn_elem);
	console.log(upload_input_id);
	console.log(file_name);
	
	
	
	
	
	console.log(delete_btn_elem.closest(".uploaded_file_name").data());
	
	
	var deleted_file_name = delete_btn_elem.closest(".uploaded_file_name").data().file_name;
	
	delete file_map[upload_input_id][deleted_file_name];
	
	
	
	$(delete_btn_elem).closest(".uploaded_file_name").remove();

	
	
}











var upload_input_file_list ;


function upload_files_sequentially()
{
	
	upload_input_file_list = $("[type=file]");
	
	
	console.log(upload_input_file_list);
	
	
	
	var file_map_keys = Object.keys(file_map);
	
	console.log( file_map_keys);


	var promises = [];
	

	for (var i=0; i<file_map_keys.length; i++){
		
		var file_list_key = Object.keys(file_map[file_map_keys[i]]); 
		
		console.log(file_list_key);
		
		
		for (var j=0; j<file_list_key.length; j++){
			
			console.log(file_map[file_map_keys[i]][file_list_key[j]]);
			
			var file_elem = file_map[file_map_keys[i]][file_list_key[j]];
			
			var form_data = new FormData();
			
			form_data.append('file', file_elem.file);
			
			
			
		
			form_data.append('fileInfo', new Blob(
											    [ JSON.stringify({
														 "upload_full_path" : file_elem.upload_full_path,
															                   
												  })
												], 
												{
													type: "application/json"
												}
											)
						);
						
						
						
			promises.push(upload_file( form_data ));
	
		
			
		}
		
		
		
		
		
				
		
		
	
		
		
	}
	
	
	
	

	

	const callTasks = () => {
		
		
		return promises.reduce((prev, task) => {
		    return prev
				      .then(task)
				      .catch(err => {
				        console.warn('err', err.message);
				      });
		}, Promise.resolve());



	};




	callTasks();
	
	
	
}






function set_upload_event1(upload_input_id, s3_folder_path, unique_id)
{
	
	console.log(upload_input_id);
	
	console.log(s3_folder_path);
	
	console.log(unique_id);
	
	
	
	
	var upload_field = upload_input_id.split("_upload_input")[0].replace("#","");
	
	

	$(upload_input_id).on("change",function(){
	
	
	
		console.log("set_upload_event:change");

	
		
	
		var file_data = $(this).prop('files')[0];	
		
		
		var upload_html_elem = $(this);
		
		
		
		
		
		
		if ($(this).siblings(".upload_message").hasClass("visible")){
			
			$(this).siblings(".upload_message").toggleClass("visible invisible")
			
		}
		
		
		
		
		
		
		if (!validated_file_extention(file_data.name) || (!validated_file_type(file_data.type)) ){
			
			
			
			$(this).siblings(".upload_message")
					.toggleClass("visible invisible")
					.find("small")
						.attr("class","text-warning")
						.text("File type is not allowed");
			
			
			return;
		}
		
	
	
		if (!validated_file_size(file_data.size)){
			
			console.log("validated_file_size");
			
			
			$(this).siblings(".upload_message")
					.toggleClass("visible invisible")
					.find("small")
						.attr("class","text-warning")
						.text("File size can not be more than "+MAX_UPLOAD_FILE_SIZE+"Mb");
			
			return;
	
		}
		
		
	
	
		$(this).siblings(".upload_message")
					.find("small")
						.attr("class","text-info")
						.text("Loading...");
						
		$(this).siblings(".upload_message")
			.append(
					$(  '<div class="load-wrapp d-flex align-items-center ">'+
						'   <div class="load-10">'+
						'       <div class="bar"></div>'+
						'  </div>'+
						'</div>')
				);				
						
		
		if (!$(this).siblings(".upload_message").hasClass("visible")){
			
			$(this).siblings(".upload_message")
					.toggleClass("visible invisible");		
			
		}
		
		
	
	
	
	
	
	
		
		
		var form_data = new FormData();
	
		form_data.append('file', file_data);
	
		console.log(s3_folder_path);
		console.log(unique_id);
		console.log(upload_field);	
		
		
		file_name = unique_id+"-"+upload_field+"-"+random_numeric(4)+"."+file_data.name.split('.').pop();

		var upload_full_path = s3_folder_path+file_name;
	
		form_data.append('fileInfo', new Blob(
											    [ JSON.stringify({
														 "upload_full_path" : upload_full_path,
															                   
												  })
												], 
												{
													type: "application/json"
												}
											)
						);
	
		
		
		console.log(form_data);	
		
		
		
		
	
		Promise.all([upload_file( form_data)]).then(function ([data]){
			
			
			console.log("uploaded");
			
			console.log(data);
			
			
			upload_html_elem.siblings(".upload_message").find(".load-wrapp ").remove();
			
			
			
			if (data.message=="success"){
				
				
				upload_html_elem.siblings(".upload_message")
								.find("small")
									.attr("class","text-success")
									.text(" Uploaded, click Save to confirm ");
									
									
						
			
	
				upload_html_elem.siblings("label").addClass("text-success").text("Upload More...");
					
				upload_html_elem.val("");
				
								
				
				console.log(upload_html_elem.closest(".row"));
								
				
				console.log(upload_html_elem.closest(".row")
								.find(".uploaded_file_name_list"));
											
						
						
				var file_elem = 		
						$(  
							'<div data-file_name='+file_name+' class="d-flex mb-2 align-items-center uploaded_file_name">'+	
							'	<div class="float-left w-100">'+									
							'		<a class="d-flex align-items-center" href="user/api/farmer/download/'+upload_field+'?i='+farmer_id+'&f='+file_name+'" download="'+file_name+'">'+
							'			<div class="float-left"><i class="fas fa-file-image fa-2x text-info mr-1 float-left"></i></div>'+
							'			<div class="ml-1">'+file_name+' </div>'+
							'		</a>'+
							'	</div>'+																								
							'	<div  class="btn btn-sm btn-danger btn-md ml-2 shadow-sm btn-icon btn-circle float-right flex-shrink-1 cursor_on delete_uploaded_file">'+
							'		<i class="fas fa-trash-alt"></i>'+ 
							'	</div>'+
							'</div>'
							
						);		
	
				upload_html_elem.closest(".row")
								.find(".uploaded_file_name_list")
								.append(
									file_elem
								);
					
					
				console.log(upload_html_elem.find(".delete_uploaded_file"));
				
								
				file_elem.find(".delete_uploaded_file")
								.click(function(d){
	
									delete_uploaded_file($(this), upload_full_path,file_name)
									
								});
	
	
	
			}
			else {
				
				console.log("here");
				
				upload_html_elem.siblings(".upload_message")
								.find("small")
									.attr("class","text-danger")
									.text("Something went wrong try again");
		
				
	
			}
		
		
		
		
		}); 
						
						
	
	});

	
	
}













function delete_uploaded_file1(delete_btn_elem, upload_full_path, file_name)
{
	
	console.log("delete_uploaded_file");	
	
	console.log( delete_btn_elem );
	
	console.log( $(delete_btn_elem) );
	
	
	
	
	
	Promise.all([delete_file(upload_full_path,file_name)]).then(function ([data]){
		
		
		console.log();
		
		var upload_message_elem = $(delete_btn_elem).closest(".row")
														.find(".uploaded_file_input .upload_message ");
														
		console.log(upload_message_elem);
		
														
	
		if (!upload_message_elem.hasClass("visible")){
										
			upload_message_elem.toggleClass("visible invisible");		
			
		}
		
		if (data.message=="success"){
			
			
			
			upload_message_elem.find("small")									
								.attr("class","text-success")
								.text(" File deleted");
								
								
			$(delete_btn_elem).closest(".uploaded_file_name").remove();
			
								
			
		}
		else{
			
			upload_message_elem.find("small")									
								.attr("class","text-danger")
								.text("Error in deleting File ");
			
		}
		
	
	
	});

	
	
}








function extract_uploaded_file_names(upload_input_id)
{

	var upload_input_elem = $(upload_input_id);
	
	
	var file_list = [];
	
	upload_input_elem.closest(".row")
						.find(".uploaded_file_name_list .uploaded_file_name")
						.each( (i,d)=>file_list.push ($(d).attr("data-file_name") ) );
	
	
	return file_list;
}











function upload_file(form_data)
{

	
    var deferred = new $.Deferred();

	
	var data = {'message':'error'};


	$.ajax({
            url: "user/api/file/upload",
            type: "POST",
            data: form_data,
			contentType:false,
            cache: false,
            processData:false,
            success: function(data){
    
	            console.log(data);


			
				
		    	deferred.resolve(data);

            },
			error: function() {

			console.log("error ");

	    	console.log(jqXHR);
	    	console.log(textStatus);
	    	console.log(errorThrown);
	      
	    	deferred.resolve(data);	    
		}
     });

	return deferred.promise();

}








function delete_file(upload_full_path, file_name)
{
		            

 	var deferred = new $.Deferred();
    
        
    var data = {'message':'error'};
    

	
	$.ajax({
		type: "POST",
	    url: "user/api/file/delete",	    
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    data:  JSON.stringify({ 
	    	
	    	"upload_full_path" : upload_full_path,
			
	    }),	    
	    success: function(data)
	    {
	    	console.log("delete_file");
	    	
	    	
	    	console.log(data);
	    	
	    	deferred.resolve(data);
	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	    	

			console.log("error ");

	    	console.log(jqXHR);
	    	console.log(textStatus);
	    	console.log(errorThrown);
	      
	    	deferred.resolve(data);
	    }
	});
	
	return deferred.promise();

}



