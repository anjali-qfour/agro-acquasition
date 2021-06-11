





const input_text_label_list = document.querySelectorAll(".input_text_label");
			



input_text_label_list.forEach(function(btn) {
	
	  btn.addEventListener('click', function() {
	    console.log("click");
	    console.log(this);
	    console.log(this.previousSibling);
	    this.previousSibling.focus();
	    
	    
	  });
	  
	  
});


