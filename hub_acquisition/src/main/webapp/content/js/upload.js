

var file_map = {};

var upload_files_result = [];


var delete_files_result = [];

/*
	s3_folder_path needs to be withouht "/"
	
*/





function set_upload_event(upload_input_id, s3_folder_path, unique_id)
{
	
	console.log("set_upload_event ->");


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

		  upload_full_path = s3_folder_path+file_name;
		
		
						
		var file_elem = 		
				$(  
					'<div  class="d-flex mb-2 align-items-center uploaded_file_name">'+	
					'	<div class="float-left w-100">'+									
					'		<a class="d-flex align-items-center" href="user/api/file/download/?f='+upload_full_path+'" download="'+file_name+'">'+
					'			<div class="float-left"><i class="fas fa-file-image fa-2x text-info mr-1 float-left"></i></div>'+
					'			<div class="ml-1">'+file_name+' </div>'+
					'		</a>'+
					'	</div>'+																								
					'	<div  class="btn btn-sm btn-danger btn-md ml-2 shadow-sm btn-icon btn-circle float-right flex-shrink-1 cursor_on delete_uploaded_file">'+
					'		<i class="fas fa-trash-alt"></i>'+ 
					'	</div>'+
					'</div>'
					
				)
				;		
	
	
		upload_html_elem.closest(".row")
						.find(".uploaded_file_name_list")
						.append(
							file_elem
						);
			
			
		
						
		file_elem.find(".delete_uploaded_file")
						.click(function(d){

							delete_btn_click($(this), upload_input_id, file_name);
							
							
						});
	
		
		
		file_map[upload_input_id][file_name] = {
													file : file_data,
													upload_full_path: upload_full_path,
													status: "new",
			
			
												};
			
		

	
	
	});
	
	
}











function delete_btn_click(delete_btn_elem, upload_input_id, deleted_file_name)
{
	console.log(delete_btn_elem);
	console.log(upload_input_id);
	console.log(deleted_file_name);
	
	
//	
	
	
	deleted_file_elem = file_map[upload_input_id][deleted_file_name];
	
	console.log(deleted_file_elem);
	
	
	
	if (deleted_file_elem.status=="new"){
		
		delete file_map[upload_input_id][deleted_file_name];
	}
	
	if (deleted_file_elem.status=="old"){
		
		file_map[upload_input_id][deleted_file_name].status = "deleted"
	}
	
	
	$(delete_btn_elem).closest(".uploaded_file_name").remove();

	
	
}









function delete_files_sequentially()
{
	var deferred = new $.Deferred();
	
	var file_map_keys = Object.keys(file_map);

	var promises = [];

	
	for (var i=0; i<file_map_keys.length; i++){

		var file_list_key = Object.keys(file_map[file_map_keys[i]]); 

		
		for (var j=0; j<file_list_key.length; j++){
			
			var file_elem = file_map[file_map_keys[i]][file_list_key[j]];
			
			
			if (file_elem.status=="deleted"){
				
				promises.push(delete_file( file_elem.upload_full_path, file_map_keys[i], file_list_key[j] ));

			}
			
			
		}
		
		
	}
	
	
	
	



	const callTasks = () => {
		
		
		return promises.reduce((prev, task) => {
		
				 
			return  prev
				.then(
					(result) => {
						
						if (typeof result!="undefined"){
							
							delete_files_result.push(result);
						}
						
						return task;
					}
				
				)				
				.catch(err => {
			        console.warn('err', err.message);
			    });
		    
		}, Promise.resolve());



	};





	callTasks().then(function(result){
		
		
		console.log("Delete complete");
		
		console.log(delete_files_result);
		
		if (typeof result!="undefined"){
			
			delete_files_result.push(result);
		}
						
		 
	    deferred.resolve();	    

	});
	
	
	
	return deferred.promise();
	
	
}










function upload_files_sequentially()
{
	
	console.log( "upload_files_sequentially");
	
	
	var deferred = new $.Deferred();

	
	
	var file_map_keys = Object.keys(file_map);
	
	


	var promises = [];
	
	var filenames = [];
	

	for (var i=0; i<file_map_keys.length; i++){
		
		var file_list_key = Object.keys(file_map[file_map_keys[i]]); 
		
		console.log(file_list_key);
		
		
		for (var j=0; j<file_list_key.length; j++){
			
			console.log(file_map[file_map_keys[i]][file_list_key[j]]);
			
			var file_elem = file_map[file_map_keys[i]][file_list_key[j]];
			
			
			if (file_elem.status=="new"){
				
				
				filenames.push(file_elem.upload_full_path);
				
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
							
							
							
				promises.push(upload_file( form_data, file_map_keys[i], file_list_key[j] ));
			
			}
			
	
			
		}
		
	}
	
	
	
	console.log(filenames);


	const callTasks = () => {
		
		
		return promises.reduce((prev, task) => {
			
			
				
				 
			return  prev
				.then(
					(result) => {
						
						if (typeof result!="undefined"){
							
							upload_files_result.push(result);
						}
						
						return task;
					}
				
				  
				)
				
				.catch(err => {
			        console.warn('err', err.message);
			    });
		    
		}, Promise.resolve());



	};




	callTasks().then(function(result){
		
		
		console.log("uploads complete");
		
		
		
		if (typeof result!="undefined"){
			upload_files_result.push(result);
		}
						
		 
	    deferred.resolve();	    

	})
	
	return deferred.promise();

}














function extract_deleted_file_names(upload_input_id)
{
	var extracted_file_list = Object.keys(file_map[upload_input_id]).filter(
									
									d=>{
										
										return file_map[upload_input_id][d].status=="deleted"? true:false;
									}
									
									
								);
	
	return extracted_file_list;
}









function extract_upload_file_names(upload_input_id)
{
	var successfull_uploads = [];
	var failed_deletes = [];
	
	
								
	 
	existing_files = Object.keys(file_map[upload_input_id]).filter(
									
									d=>{
										
										return file_map[upload_input_id][d].status=="old"? true:false;
									}
									
									
								);	
								
								
								
	successfull_uploads =
				upload_files_result
						.filter(d=>
									{
										return ((d.upload_input_id==upload_input_id) && (d.message=="success") ) ? true : false;  												
									});
		

	failed_deletes = delete_files_result
										.filter(d=>
													{
														return (d.message=="error")&& (d.upload_input_id==upload_input_id)? true : false;  																
													});
	
	
	return successfull_uploads.concat(failed_deletes).map(d=>d.upload_file_name).concat(existing_files);
}






function extract_upload_file_names1(upload_input_id)
{
	var extracted_file_list = Object.keys(file_map[upload_input_id]).filter(
									
									d=>{
										
										return file_map[upload_input_id][d].status!="deleted"? true:false;
									}
									
									
								);
	
	return extracted_file_list;
}








function upload_file(form_data, upload_input_id, upload_file_name)
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
    
				
				
				data["upload_input_id"]=upload_input_id;
				
				data["upload_file_name"]=upload_file_name;

			
				
		    	deferred.resolve(data);

            },
			error: function() {
				
		    	deferred.resolve({
						"message":"error",
						"upload_input_id" : upload_input_id,
						"upload_file_name" : upload_file_name					
					});
						    
		}
     });

	return deferred.promise();

}








function delete_file(upload_full_path,upload_input_id, upload_file_name)
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
	    	
				
			data["upload_input_id"]=upload_input_id;
			
			data["upload_file_name"]=upload_file_name;

				    	
	    	deferred.resolve(data);
	    
	    },
	    error: function (jqXHR, textStatus, errorThrown) {
	    				
	    	deferred.resolve({
					"message":"error",
					"upload_input_id" : upload_input_id,
					"upload_file_name" : upload_file_name					
				});	  
	    }
	});
	
	return deferred.promise();

}



