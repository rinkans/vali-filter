# vali-filter

Module that filters and validates data.

## Features
  * Validate deeply nested data
  * validate lists
  * validate strings
  * return data that is ready to be inserted into the database!
  * Almost all Laravel validators implemented (more to come)

## Example:
```js
var body = {
	info: {
		name: 'Rinalds',
		surname: 'Zukulis',
		age: 20
	},
	cards: [1,3,4,5,3,2,14,12,21,2,23],
	group: [
		{
			name: 'janis',
			evil: 'yes'
		},
		{
			name: 'peteris',
			evil: 'yes'
		},
		{
			name: 'juris',
			evil: 'yes'
		},
	],
	agreed: true,
	agreedOn: '2015-01-01T05:06:07',
	password: 'rerere',
	password_confirmation: 'rerere',
	j: '{"name":"Rinalds"}'
}

var validate = require('vali-filter')();

var data = validate(body, {
	info: {
		name: 'required|alpha_num|min:2|max:10',
		surname: 'required|alpha_num|min:2|max:10',
		age: 'integer|digits_between:2,3',
	},
	cards: ['required|min:2|max:15', 'integer|max:200'],
	group: ['required|min:2|max:15', {
		name: 'required|integer'
	}],
	agreed: 'required|accepted',
	agreedOn: 'required|date',
	password: 'required|confirmed|in:rerere,rer,asdasd',
	j: 'required|json'
});

if(data.invalid)
	return console.log(data.errors);

console.log(data);
```

## Installation
```bash
$ npm install vali-filter
```
## Docs & Community
  * [validators](http://laravel.com/docs/5.1/validation)
