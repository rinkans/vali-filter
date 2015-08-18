var validators = require('./validators');
var errorMessages = require('./errorMessages');

function createErrorMessage(rule, property, argument) {
	var errorMessage = errorMessages[rule].replace(':property', property).replace(':argument', argument);

	if(argument.indexOf(',') != -1) {
		
		argument.split(',').forEach(function(a, i) {
			errorMessage = errorMessage.replace(':argument_' + (i + 1), a);
		});
	}

	return errorMessage;
}

function validateRuleString(ruleString, value, property, data) {
	var rules = ruleString.split('|');
	var errors = [];

	if(!validators['required'](value)) {
		if(rules.indexOf('required') != -1) {
			errors.push(createErrorMessage('required', property));
			return errors;
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

		if(!validators[rule](value, argument, v)) {
			errors.push(createErrorMessage(rule, property, argument));
		}
	});

	if(errors.length > 0)
		return errors;
	return value;
}

function validate(data, rules) {
	var errors = {};
	var resultData = {};

	Object.keys(rules).forEach(function(property) {
		var r = validateRuleString(rules[property], data[property], property, data);
		if(Array.isArray(r)) {
			errors[property] = r;
		}
		else {
			resultData[property] = r;
		}
	});

	if(Object.keys(errors).length > 0)
		return { invalid: true, errors: errors, errorResponse: errorResponse };
	return resultData;
}

function errorResponse() {
	return { status: 'failed', errors: this.errors };
}

module.exports = function(options) {
	if(options.extraRules) {
		Object.keys(options.extraRules).forEach(function(validatorName) {
			validators[validatorName] = options.extraRules[validatorName];
		});
	}

	if(options.errorMessages) {
		errorMessages = options.errorMessages;
	}

	return validate;
};