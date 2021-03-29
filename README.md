# operators
parse logical expressions without JS eval method

how to use :
```javascript
Operate.initialize(verbose);

var myObject = {a: 5, b: 7, c: true};
var myExpression = "a < b && c";
var result = Operate.parse(myObject, myExpression);
console.log(result);
```

[try it](https://nicopowa.github.io/operators/) (console output)