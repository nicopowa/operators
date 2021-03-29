"use strict";
window.onload = main;

var o = {a: 5, b: 70, t: 50, u: true, z: 0};
	
	var tests = [
		"(!u)",
		"a&&!u",
		"a|| b ||!t",
		"a|| b ||(!t)",
		"(a <b&& b > t) && (a != t) && !u",
		"a&&b||t",
		"a* b+t *z",
		"(a+b*t) * z",
		"a  %b+  t || u || z",
		"(a&&b||u)&&a-b||t",
		"(a<b&&(b>t||t<b))&&(a!=t)",
		"(a < b & & ( b > t | | t < b ) ) & & ( a !== t ) | | ! u ",
		"a < b && u",
		"a * 5 && b * t",
		"(a > b) || (b > t)",
		"a^b",
		"a^ b+t *z",
		"a !== b && !u"
	];

function main() {
	
	console.log(o);
	console.log("");
	
	test();
	//heavyTest();
}

/**
* @method opeval : parse expression with JS eval method to compare outputs
* @param {!Object} subject : object with values
* @param {string} expression : expression string
* @return {*}
*/
function opeval(subject, expression) {

	// no whitespaces plz
	expression = expression
	.replace(/\s/g, ""); 

	// get subject values
	let values = Object.keys(subject);

	for(let i = 0; i < values.length; i++) {

		let value = values[i];

		// replace values in expression
		expression = expression
		.replace(
			new RegExp("\W?" + value + "\W?", "g"), 
			subject[value]
		);
	
	}

	// go
	return eval(expression);

}

function test() {
	var i, l, t, parsed, evaled;
	for(i = 0, l = tests.length; i < l; i++) {
		t = tests[i]; // current expression
		console.log(t);
		parsed = Operate.parse(o, t); // parse result
		evaled = opeval(o, t); // eval result
		console.log(parsed + " / eval " + evaled + " (" + typeof parsed + ") " + (parsed === evaled ? "OK" : "FAIL"));
		console.log("");
	}
}

function heavyTest() {
	var i, l, t, parsed, evaled, iterations = 1000;
	console.time("operate");
	for(var k = 0; k < iterations; k++) {
		for(i = 0, l = tests.length; i < l; i++) {
			t = tests[i]; // current expression
			parsed = Operate.parse(o, t); // parse result
		}
	}
	console.timeEnd("operate");
	
	console.time("eval");
	for(var k = 0; k < iterations; k++) {
		for(i = 0, l = tests.length; i < l; i++) {
			t = tests[i]; // current expression
			evaled = opeval(o, t); // eval result
		}
	}
	console.timeEnd("eval");
}