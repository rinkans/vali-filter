var validators = require('./validators');
var errorMessages = require('./errorMessages');

function createErrorMessage(rule, property, argument) {
	if(!errorMessages[rule])
		throw new Error('No error message for ' + rule);
	var errorMessage = errorMessages[rule].replace(':property', property).replace(':argument', argument);

	if(argument && argument.indexOf(',') != -1) {
		
		argument.split(',').forEach(function(a, i) {
			errorMessage = errorMessage.replace(':argument_' + (i + 1), a);
		});
	}

	return errorMessage;
}

function validateRuleString(value, ruleString, property, data) {
	var rules = ruleString.split('|');
	var errors = [];

	if(!validators['required'](value)) {
		if(rules.indexOf('required') != -1) {
			errors.push(createErrorMessage('required', property));
			return { invalid: true, errors: errors };
		}
		else {
			return '';
		}
	}

	if(rules.indexOf('required') != -1)
		rules.splice(rules.indexOf('required'), 1);

	rules.forEach(function(rule) {
		var temp = rule.split(':');
		rule = temp.splice(0, 1)[0];
		var argument = temp.join(':');

		var v = (rule == 'confirmed')? data[property + '_confirmation'] : '';
		var v = (rule == 'different')? data[argument] : v;
		var v = (rule == 'same')? data[argument] : v;

		if(!validators[rule])
			throw new Error('No such validator "' + rule + '"');

		if(!validators[rule](value, argument, v)) {
			errors.push(createErrorMessage(rule, property, argument));
		}
	});

	if(errors.length > 0)
		return { invalid: true, errors: errors };
	return value;
}

function validateObject(data, rules, property) {
	var errors = {};
	var resultData = {};

	if(typeof data != 'object') {
		errors[property] = [ createErrorMessage('object', property) ];
		return { invalid: true, errors: errors }
	}

	Object.keys(rules).forEach(function(property) {
		
		var result = validate(data[property], rules[property], property, data);
		
		if(result.invalid) {
			errors[property] = result.errors;
		}
		else {
			resultData[property] = result;
		}
	});

	if(Object.keys(errors).length > 0)
		return { invalid: true, errors: errors };
	return resultData;
}

function validateArray(value, rules, property, data) {
	if(value && !Array.isArray(value))
		return { invalid: true, errors: [createErrorMessage('array', property)] };

	var errors = [];
	var resultData = [];

	var elementRules = rules[1];
	var arrayRules = rules[0];

	var result = validateRuleString(value, arrayRules, property, data);
	if(result.invalid)
		return result;

	value.forEach(function(val) {
		var result = validate(val, elementRules, 'item of ' + property, data);
		if(result.invalid) {
			if(Array.isArray(result.errors))
				result.errors.forEach(function(error) {
					if(errors.indexOf(error) == -1)
						errors.push(error);
				});
			else
				Object.keys(result.errors).forEach(function(key) {
					result.errors[key].forEach(function(error) {
						if(errors.indexOf(error) == -1)
							errors.push(error);
					});
				});
		}
		else {
			resultData.push(result);
		}
	});

	if(errors.length > 0)
		return { invalid: true, errors: errors };
	return resultData;

}

function validate(value, rules, property, data) {
	if(Array.isArray(rules)) {
		return validateArray(value, rules, property, data);
	}
	else if(typeof rules == 'object') {
		return validateObject(value, rules, property, data)
	}
	else {
		return validateRuleString(value, rules, property, data);
	}
}

function errorResponse() {
	return { status: 'failed', errors: this.errors };
}

module.exports = function(options) {
	if(options) {
		if(options.extraRules) {
			Object.keys(options.extraRules).forEach(function(validatorName) {
				validators[validatorName] = options.extraRules[validatorName];
			});
		}

		if(options.errorMessages) {
			errorMessages = options.errorMessages;
		}
	}

	return validateObject;
};