


//$('[data-toggle="tooltip"]').tooltip();


var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var daysMin = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];



var MAX_UPLOAD_FILE_SIZE = 3;

var ALLOW_FILE_EXTENTIONS = ["jpg", "png","jpeg"];

var ALLOW_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];





function include(file) {

	var script = document.createElement('script');
	script.src = file;
	script.type = 'text/javascript';
	script.defer = true;

	document.body.appendChild(script);

}

//include("content/js/upload.js");







function validated_file_type(file_type) {

	return (ALLOW_FILE_TYPES.indexOf(file_type.toLowerCase()) > -1) ? true : false;
}




function validated_file_extention(file_name) {
	var file_extention = file_name.split('.').pop()
	return (ALLOW_FILE_EXTENTIONS.indexOf(file_extention.toLowerCase()) > -1) ? true : false;
}




function validated_file_size(file_size) {


	return ((file_size / 1000000) < MAX_UPLOAD_FILE_SIZE) ? true : false;

}







$("#logout_btn").click(function() {


	console.log("logout_btn click");

	var html = '';

	html = ' <div class="modal fade" id="modal_centered" tabindex="-1" role="dialog" aria-labelledby="modal_centered" aria-hidden="true"> ';
	html += ' <div class="modal-dialog modal-dialog-centered" role="document"> ';
	html += '     <div class="modal-content"> ';
	html += '         <div class="modal-header"> ';
	html += '             <h5 class="modal-title text-gray-900 " id="modal_centered">Log out </h5> ';
	html += '             <button class="close text-danger" type="button" data-dismiss="modal" aria-label="Close"> ';
	html += '						<span aria-hidden="true">x</span> ';
	html += '			  </button> ';
	html += '         </div> ';
	html += '         <div class="modal-body"> Are you sure you want to log out?</div> ';
	html += '        <div class="modal-footer"> ';
	html += '		 	<button class="btn btn-danger" type="button" data-dismiss="modal">Close</button> ';
	html += '	     </div> ';
	html += '    </div> ';
	html += '</div> ';
	html += '</div> ';

	console.log(html);


	$("#content-wrapper").append($(html));



});









function draw_modal_centered(modal_header, modal_msg) {





	html = ' <div class="modal fade" id="modal_centered" tabindex="-1" role="dialog" aria-labelledby="modal_centered" aria-hidden="true"> ';
	html += ' <div class="modal-dialog modal-dialog-centered" role="document"> ';
	html += '     <div class="modal-content"> ';
	html += '         <div class="modal-header"> ';
	html += '             <h5 class="modal-title text-gray-900 " id="modal_centered">' + modal_header + '</h5> ';
	html += '             <button class="close text-danger" type="button" data-dismiss="modal" aria-label="Close"> ';
	html += '						<span aria-hidden="true">x</span> ';
	html += '			  </button> ';
	html += '         </div> ';
	html += '         <div class="modal-body">' + modal_msg + '</div> ';
	html += '        <div class="modal-footer"> ';
	html += '		 	<button class="btn btn-danger" type="button" data-dismiss="modal">Close</button> ';
	html += '	     </div> ';
	html += '    </div> ';
	html += '</div> ';
	html += '</div> ';



	$(".container-fluid").append($(html));

	$("#modal_centered").modal('show');



}









function create_primary_id() {


	return random_string(4) + "-" + random_numeric(4);

}










function create_consignment_id() {


	return random_string(3) + "-" + random_numeric(3) + "-" + random_string(2) + "-" + random_numeric(3);

}





function is_email(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}


function random_alphanumeric(length) {
	var result = '';
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}


function random_string(length) {
	var result = '';
	var characters = 'abcdefghijklmnopqrstuvwxyz';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}


function random_numeric(length) {
	var result = '';
	var characters = '0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}




function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
};








String.prototype.short = function(n) {

	var s = this;
	if (this.length > n) {

		s = this.substring(0, n - 3) + "..."
	}

	return s;
}





String.prototype.cleanse = function() {


	var s = String(this);

	var regExp = new RegExp("^[A-Za-z_-\\s][A-Za-z0-9_-\\s]*$");

	//	this.match("^[a-z\d\-_\s]")

	if (regExp.test(s)) {
		//		console.log(typeof s);
		return s;
	} else {
		return "_invalid_input";
	}



}




String.prototype.textonly = function() {




	//	return String(this).replace(/^[a-zA-Z0-9.-]+$/, '');


	return String(this)
		.replace(/[^0-9a-zA-Z.-\\'\s]/gi, '')
		.replace(/[<>;/]/gi, '')
		.replace(/\s\s+/g, ' ')
		;

}






String.prototype.is_name = function() {


	var regexPattern = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g);

	return regexPattern.test(this);

}

String.prototype.numberonly = function() {


	return String(this).replace(/[^0-9.]/gi, '');

}



String.prototype.is_email = function() {

	var regexPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

	return regexPattern.test(this);

}





String.prototype.hashCode = function() {

	var word_num_str = "";
	var word = this.toLowerCase();
	var word_num = 0;

	for (var i = 0; i < word.length; i++) {
		var character = (word.charCodeAt(i));
		if ((character > -1)
			//        		&& (word_num_str.length<6)
		) {
			word_num = word_num + character;
		};
		//        console.log(word_num);
	}

	return word_num;
}




Date.prototype.getWeek = function() {
	var onejan = new Date(this.getFullYear(), 0, 1);
	return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}



Date.prototype.getDayOfYear = function() {


	var start = new Date(this.getFullYear(), 0, 0);
	var diff = this - start;
	var oneDay = 1000 * 60 * 60 * 24;
	var day = Math.floor(diff / oneDay);

	return day;
}




Date.prototype.getStdFormat = function() {


	return this.toDateString();
}



function round_ratio(number) {

	return number.toFixed(3);

}



Number.prototype.moneyFormat = function(c, d, t) {
	var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};



//Exemples:
//value = 15900;
//new Number(value).formatMoney() -> $15,900.00
//new Number(value).formatMoney('2', 'R$', '.', ',') -> R$15.900,00
//new Number(value).formatMoney('0', 'USD', '.') -> USD15.900


Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "$";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var number = this,
		negative = number < 0 ? "-" : "",
		i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
		j = (j = i.length) > 3 ? j % 3 : 0;
	return symbol + " " + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};







Number.prototype.abbreviate = function() {

	var num = this;
	var fixed = 1;
	if (num === null) { return null; } // terminate early
	if (num === 0) { return '0'; } // terminate early
	fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
	var b = (num).toPrecision(2).split("e"), // get power
		k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
		c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
		d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
		e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
	return e;


};










function validate_email(input_id, required) {

	var deferred = new $.Deferred();
	//	console.log(input_id);

	var valid = false;


	input_elem = $(input_id);


	text_value = input_elem.val();



	if (!text_value.is_email()) {


		if (required) {

			input_elem.removeClass("border-blue");
			input_elem.siblings("label").removeClass("text-blue")

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}
		else {

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}

		deferred.resolve([valid, text_value, input_id]);


	}
	else {
		valid = true;
		if (required) {

			input_elem.removeClass("border-danger border-danger");
			input_elem.siblings("label").removeClass("text-danger text-danger")

			input_elem.addClass("border-blue");
			input_elem.siblings("label").addClass("text-blue")
		}
		else {

			input_elem.removeClass("border-danger");
			input_elem.siblings("label").removeClass("text-danger")
		}

		deferred.resolve([valid, text_value, input_id]);

	}







	return deferred.promise();



}










function validate_name(input_id, required) {

	var deferred = new $.Deferred();

	//	console.log(input_id);

	var valid = false;


	input_elem = $(input_id);


	text_value = input_elem.val();


	//	console.log("ise name = " +text_value.is_name());


	if (!text_value.is_name()) {



		if (required) {



			input_elem.removeClass("border-blue");
			input_elem.siblings("label").removeClass("text-blue")

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}
		else {

			console.log("required = " + required);

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}

		deferred.resolve([valid, text_value, input_id]);


	}
	else {
		valid = true;
		if (required) {

			input_elem.removeClass("border-danger border-danger");
			input_elem.siblings("label").removeClass("text-danger text-danger")

			input_elem.addClass("border-blue");
			input_elem.siblings("label").addClass("text-blue")
		}
		else {

			input_elem.removeClass("border-danger");
			input_elem.siblings("label").removeClass("text-danger")
		}


		deferred.resolve([valid, text_value, input_id]);

	}

	return deferred.promise();

}







function validate_vehicle_number(input_id, required) {

	//	mm-03-gb-0000
	var deferred = new $.Deferred();

	input_elem = $(input_id);


	var vehicle_num = input_elem.val();

	var regexPattern = new RegExp(/^[a-zA-Z]{2}[ -][0-9]{1,2}[ -][a-zA-Z]{1,2}[ -][0-9]{1,4}$/);

	var valid = regexPattern.test(vehicle_num);



	if (!valid) {


		if (required) {

			input_elem.removeClass("border-blue");
			input_elem.siblings("label").removeClass("text-blue")

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}
		else {

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}

		deferred.resolve([valid, vehicle_num, input_id]);


	}
	else {
		valid = true;




		if (required) {

			input_elem.removeClass("border-danger border-danger");
			input_elem.siblings("label").removeClass("text-danger text-danger")

			input_elem.addClass("border-blue");
			input_elem.siblings("label").addClass("text-blue")
		}
		else {

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}

		deferred.resolve([valid, vehicle_num, input_id]);
	}


	return deferred.promise();

}









function validate_phone(input_id, required) {

	var deferred = new $.Deferred();



	input_elem = $(input_id);


	var phone_value = input_elem.val().numberonly();

	var regexPattern = new RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/);    // regular expression pattern

	var valid = regexPattern.test(phone_value);



	if (!valid) {


		if (required) {

			input_elem.removeClass("border-blue");
			input_elem.siblings("label").removeClass("text-blue")

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}
		else {

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}

		deferred.resolve([valid, phone_value, input_id]);

	}
	else {
		valid = true;

		deferred.resolve([valid, phone_value, input_id]);

		if (required) {

			input_elem.removeClass("border-danger border-danger");
			input_elem.siblings("label").removeClass("text-danger text-danger")

			input_elem.addClass("border-blue");
			input_elem.siblings("label").addClass("text-blue")
		}
		else {

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}
	}


	return deferred.promise();
}




function validate_age(input_id, required) {


	var valid = false;

	input_elem = $(input_id);


	console.log(input_elem.val());

	console.log(input_elem.val().numberonly());

	var age_value = parseFloat(input_elem.val().numberonly());


	console.log(isNaN(age_value));
	console.log(age_value);



	if (isNaN(age_value) || ((age_value < 0) || (age_value > 100))) {


		if (required) {

			input_elem.removeClass("border-blue");
			input_elem.siblings("label").removeClass("text-blue")

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}
		else {

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}


	}
	else {
		valid = true;
		if (required) {

			input_elem.removeClass("border-danger border-danger");
			input_elem.siblings("label").removeClass("text-danger text-danger")

			input_elem.addClass("border-blue");
			input_elem.siblings("label").addClass("text-blue")
		}
		else {

			input_elem.removeClass("border-danger");
			input_elem.siblings("label").removeClass("text-danger")
		}
	}




	return [valid, age_value, input_id];

}






function validate_pincode(input_id, required) {

	var deferred = new $.Deferred();

	var valid = false;

	input_elem = $(input_id);


	var pincode_value = parseFloat(input_elem.val().numberonly());


	//	console.log(pincode_value);



	if (isNaN(pincode_value) || (input_elem.val().length != 6)) {


		if (required) {

			input_elem.removeClass("border-blue");
			input_elem.siblings("label").removeClass("text-blue")

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}
		else {

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}

		deferred.resolve([valid, pincode_value, input_id]);

	}
	else {
		valid = true;

		if (required) {

			input_elem.removeClass("border-danger border-danger");
			input_elem.siblings("label").removeClass("text-danger text-danger")

			input_elem.addClass("border-blue");
			input_elem.siblings("label").addClass("text-blue")
		}
		else {

			input_elem.removeClass("border-danger");
			input_elem.siblings("label").removeClass("text-danger")
		}

		deferred.resolve([valid, pincode_value, input_id]);
	}



	return deferred.promise();

}









function validate_number(input_id, required) {

	var deferred = new $.Deferred();


	var valid = false;

	input_elem = $(input_id);



	var number_value = parseFloat(input_elem.val().numberonly());




	if (isNaN(number_value)) {


		if (required) {

			input_elem.removeClass("border-blue");
			input_elem.siblings("label").removeClass("text-blue")

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}
		else {

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}

		deferred.resolve([valid, number_value, input_id]);


	}
	else {
		valid = true;
		if (required) {

			input_elem.removeClass("border-danger border-danger");
			input_elem.siblings("label").removeClass("text-danger text-danger")

			input_elem.addClass("border-blue");
			input_elem.siblings("label").addClass("text-blue")
		}
		else {

			input_elem.removeClass("border-danger");
			input_elem.siblings("label").removeClass("text-danger")
		}

		deferred.resolve([valid, number_value, input_id]);
	}





	return deferred.promise();
}






function validate_text(input_id, required) {

	var deferred = new $.Deferred();

	//	console.log(input_id);

	var valid = false;

	input_elem = $(input_id);


	text_value = input_elem.val().textonly();




	if (text_value.length < 3) {


		if (required) {

			input_elem.removeClass("border-blue");
			input_elem.siblings("label").removeClass("text-blue")

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}
		else {

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}


		deferred.resolve([valid, text_value, input_id]);


	}
	else {

		valid = true;

		if (required) {

			input_elem.removeClass("border-danger border-danger");
			input_elem.siblings("label").removeClass("text-danger text-danger")

			input_elem.addClass("border-blue");
			input_elem.siblings("label").addClass("text-blue")
		}
		else {

			input_elem.removeClass("border-danger");
			input_elem.siblings("label").removeClass("text-danger")
		}

		deferred.resolve([valid, text_value, input_id]);
	}





	return deferred.promise();


}




function validate_select(input_id, required) {

	var deferred = new $.Deferred();
	var valid = false;

	input_elem = $(input_id);


	var option_select = $(input_id + " option:selected").data("id")

	//	console.log(option_select);
	//	console.log($( input_id+" option:selected" ));
	//	console.log($( input_id+" option:selected" ).data());


	if (option_select == "not_selected") {

		valid = false;

		if (required) {

			input_elem.removeClass("border-blue");
			input_elem.siblings("label").removeClass("text-blue")

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}
		else {

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}


		deferred.resolve([valid, option_select]);

	}
	else {

		valid = true;


		if (required) {

			input_elem.removeClass("border-danger border-danger");
			input_elem.siblings("label").removeClass("text-danger text-danger")

			input_elem.addClass("border-blue");
			input_elem.siblings("label").addClass("text-blue")
		}
		else {

			input_elem.removeClass("border-danger");
			input_elem.siblings("label").removeClass("text-danger")
		}



		deferred.resolve([valid, option_select]);
	}




	return deferred.promise();

}







function validate_date(input_id, required) {

	var deferred = new $.Deferred();
	var valid = false;

	input_elem = $(input_id);



	var date_selected = $(input_id).datepicker('getDate');


	if (date_selected == null) {

		valid = false;

		if (required) {

			input_elem.removeClass("border-blue");
			input_elem.siblings("label").removeClass("text-blue")

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}
		else {

			input_elem.addClass("border-danger");
			input_elem.siblings("label").addClass("text-danger")
		}


		deferred.resolve([valid, date_selected]);

	}
	else {

		valid = true;


		if (required) {

			input_elem.removeClass("border-danger border-danger");
			input_elem.siblings("label").removeClass("text-danger text-danger")

			input_elem.addClass("border-blue");
			input_elem.siblings("label").addClass("text-blue")
		}
		else {

			input_elem.removeClass("border-danger");
			input_elem.siblings("label").removeClass("text-danger")
		}



		deferred.resolve([valid, date_selected]);
	}


	return deferred.promise();

}












function get_index_list(_index_list) {


	console.log(_index_list);

	selected_index = 1;


	current_index = 1;


	for (var i = 0; i < _index_list.length; i++) {



		if (typeof _index_list.find(d1 => d1 == current_index) == "undefined") {


			_index_list.push(current_index);


			return [current_index, _index_list];


		};


		current_index = current_index + 1;

		if (i + 1 == _index_list.length) {


			_index_list.push(current_index);

			return [current_index, _index_list];

		};



	}



	if (_index_list.length == 0) {

		console.log("is zero");
		_index_list.push(current_index);

	};


	return [current_index, _index_list];


}








 /**
 * converts a base64 encoded data url SVG image to a PNG image
 * @param originalBase64 data url of svg image
 * @param width target width in pixel of PNG image
 * @return {Promise<String>} resolves to png data url of the image
 */
function base64SvgToBase64Png(originalBase64, width) {
	return new Promise(resolve => {
		let img = document.createElement('img');
		img.onload = function() {
			document.body.appendChild(img);
			let canvas = document.createElement("canvas");
			let ratio = (img.clientWidth / img.clientHeight) || 1;
			document.body.removeChild(img);
			canvas.width = width;
			ight = width / ratio;
			let ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			try {
				let data = canvas.toDataURL('image/png');
				resolve(data);
			} catch (e) {
				resolve(null);
			}
		};
		img.src = originalBase64;
	});
}





function create_barcode_png_dataurl(barcode_str)
{
	var deferred = new $.Deferred();

	barcode_svg_html = $('<svg id="barcode" class="barcode_svg"></svg>').appendTo("body");   
	
	JsBarcode("#barcode", barcode_str, {
		
//		width: 3.6,
		displayValue: false

		
	});
	
	
	
	
	var serializer = new XMLSerializer();
	var barcode_svg_str = serializer.serializeToString(barcode_svg_html[0]);


	var $canvas = $('<canvas/>');
	$canvas.attr('width', '300px');
	$canvas.appendTo('body');
	
	canvg($canvas.get(0), barcode_svg_str);
	
	
	
	
	html2canvas($canvas, 
				{
					
					quality: 4,
					onrendered: function (canvas) {
												    
												    var barcode_DataURL = canvas.toDataURL('image/png');
																																				
													$canvas.remove();
													
													$("#barcode").remove();
													
													
													
													deferred.resolve(barcode_DataURL);
												    
												  }
	});
	

	

	return deferred.promise();

}




 const fileToBase64 = (filename, filepath) => {
  return new Promise(resolve => {
    var file = new File([filename], filepath);
    var reader = new FileReader();
    // Read file content on file loaded event
    reader.onload = function(event) {
      resolve(event.target.result);
    };
    
    // Convert data to base64 
    reader.readAsDataURL(file);
  });
};






function readAsDataURL(file) {
	
	console.log()
	return new Promise((resolve, reject)=>{
		let fileReader = new FileReader();
		fileReader.onload = function(){
			
			
			return resolve({data:fileReader.result, name:file.name, size: file.size, type: file.type});
		}
		fileReader.readAsDataURL(file);
	})
} 




function getBase64Image(src, outputFormat) {
	
	var deferred = new $.Deferred();
	
	
	const img = new Image();
	img.crossOrigin = 'Anonymous';
	
	img.onload = () => {
		
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let dataURL;
        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);

		
		deferred.resolve(dataURL);
		
        
  	};

	img.src = src;
	
	if (img.complete || img.complete === undefined) {
	    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
	    img.src = src;
	}

	return deferred.promise();

}

