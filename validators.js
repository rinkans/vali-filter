module.exports = {
	accepted: function(value) {
		return value == true || value == 1 || value == 'yes' || value == 'on';
	},
	after: function(value, argument) {
		return Date.parse(value) > Date.parse(argument);
	},
	alpha: function(value) {
		return /^[A-z]+$/.test(value);
	},
	alpha_dash: function(value, argument) {
		return /^[A-z0-9\-\_]+$/.test(value);
	},
	alpha_num: function(value, argument) {
		return /^[A-z0-9]+$/.test(value);
	},

	simple_text: function(value, argument) {
		return /^[A-z0-9\ \-\_]+$/.test(value);
	},


	before: function(value, argument) {
		return Date.parse(value) < Date.parse(argument);
	},
	between: function(value, argument) {
		var min = argument.split(',');
		var max = min[1];
		min = min[0];

		return validators['min'](value, min) && validators['max'](value, max);
	},
	boolean: function(value) {
		return value == true || value == false || value == '1' || value == '0' || value == 1 || value == 0;
	},


	confirmed: function(value, argument, v) {
		return value == v;
	},


	date: function(value, argument) {
		return !isNaN(Date.parse(value));
	},
	different: function(value, argument, v) {
		return value != v;
	},
	digits: function(value, argument) {
		return !isNaN(value) && value.toString().length == parseInt(argument);
	},
	digits_between: function(value, argument) {
		var min = argument.split(',');
		var max = min[1];
		min = min[0];

		return !isNaN(value) && value.toString().length >= parseInt(min) && value.toString().length <= parseInt(max);
	},

	email: function(value) {
		return /^.+@.+$/.test(value);
	},

	image: function(value) {
		return true; // jpeg, png, bmp, gif, or svg
	},
	
	in: function(value, argument) {
		return argument.split(',').some(function(v) {
			return value == v;
		});
	},
	integer: function(value, argument) {
		return !isNaN(value);
	},
	ip: function(value) {
		return /^([0-9]+\.?)+$/.test(value);
	},

	json: function(value) {
		var ok = true;
		try {
			var json = JSON.parse(value);
		}
		catch(e) {
				ok = false;
		}
		return ok;
	},

	max: function(value, argument) {
		if(typeof value == 'string' || Array.isArray(value))
			return value.length <= parseInt(argument);
		else
			return parseFloat(value) <= parseInt(argument);	
	},
	// mimes: function() {
	// 	return true; // 'photo' => 'mimes:jpeg,bmp,png'
	// },
	min: function(value, argument) {
		if(typeof value == 'string' || Array.isArray(value))
			return value.length >= parseInt(argument);
		else
			return parseFloat(value) >= parseInt(argument);
	},

	not_in: function(value, argument) {
		return argument.split(',').every(function(v) {
			return value != v;
		});
	},
	numeric: function(value) {
		return /^([0-9]+\.?)+$/.test(value);
	},

	regex: function(value, argument) {
		return (new RegExp(argument)).test(value);
	},
	required: function(value, argument) {
		return !(value == undefined || value == null);
	},

	/*
	required_if:anotherfield,value,...

	The field under validation must be present if the anotherfield field is equal to any value.


	required_with:foo,bar,...

	The field under validation must be present only if any of the other specified fields are present.


	required_with_all:foo,bar,...

	The field under validation must be present only if all of the other specified fields are present.


	required_without:foo,bar,...

	The field under validation must be present only when any of the other specified fields are not present.


	required_without_all:foo,bar,...

	The field under validation must be present only when all of the other specified fields are not present.
	*/

	same: function(value, argument, v) {
		return value == v;
	},
	size: function(value, value) {
		if(typeof value == 'string' || Array.isArray(value))
			return value.length == parseInt(argument);
		else
			return parseFloat(value) == parseInt(argument);	
	},
	string: function(value) {
		return typeof value == 'string';
	},
	timezone: function(value) {
		return true; // The field under validation must be a valid timezone identifier according to the timezone_identifiers_list PHP function.
	},
	url: function(value) {
		return /^http.+$/.test(value);
	},

	color: function(value) {
		return /^#[0-9a-fA-F]+$/.test(value);
	}
}