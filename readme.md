# vali-filter

Module that filters and validates data

### How to use

    var validator = require('./index');
    
    var validate = validator({
    	errorMessages: null,
    	extraRules: null
    });
    
    var body = {
    	name: 'Rinalds',
    	surname: 'Zukulis',
    	age: 20,
    	cards: '',
    	group: null,
    	agreed: true,
    	agreedOn: '2015-01-01T05:06:07',
    	password: 'rerere',
    	password_confirmation: 'rerere',
    	j: '{"name";:"Rinalds"}'
    }
    
    var data = validate(body, {
    	name: 'required|alpha_num|min:2|max:10',
    	surname: 'required|alpha_num|min:2|max:10',
    	age: 'integer|digits_between:2,3',
    	cards: 'integer',
    	group: 'integer',
    	agreed: 'required|accepted',
    	agreedOn: 'required|date',
    	password: 'required|confirmed|in:rerere,rer,asdasd',
    	j: 'required|json'
    });
    
    if(data.invalid)
    	return console.log('errors', data.errorResponse());
    
    console.log('data', data);

### Validators
All validator names are the same as [laravels](http://laravel.com/docs/5.1/validation)
