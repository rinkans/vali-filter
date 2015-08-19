module.exports = {
	accepted: ':property is must be truthy',
	after: ':property is not after :argument',
	alpha: ':property can only consist of letters',
	alpha_dash: ':property can only consist of letters, numbers, dashes or undersocore',
	alpha_num: ':property can only consist of letters and numbers',

	before: ':property is not before :argument',
	between: ':property should be lower or equal than :argument_1 and higher or equal than :argument_2',
	boolean: ':property is neither true, false, 0 or 1',

	confirmed: ':property doesn\'t match',

	date: ':property is not a date',
	different: ':property should be different than :argument',
	digits: ':property should be exactly 2 digits long',
	digits_between: ':property should be lower or equal than :argument_1 digits and higher or equal than :argument_2 digits',

	email: ':property is not an email',

	image: ':property is not an image',
	in: ':property is not present in values: :argument',
	integer: ':property is not an integer',
	ip: ':property is not an ip',

	json: ':property is not an JSON',

	max: ':property should be lower or equal than :argument',
	min: ':property should be higher or equal than :argument',
	mimes: ':property doen\'t have one of the mimes: :argument',

	not_in: ':property should no be present in values: :argument',
	numeric: ':property is not numeric',
	
	regex: ':property is not valid',
	required: ':property is required',

	same: ':property should match :argument',
	size: ':property should be exactly :argument long',
	string: ':property should be a string',
	timezone: ':property should be a timezone',
	url: ':property should be an url',
	
	object: ':property is not an object',
	array: ':property is not an array',
	
}