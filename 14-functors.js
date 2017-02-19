/* A functor is a type with a map method that follows these rules:

	1) fx.map(f).map(g) == fx.map(g(f(x))) (function composition is preserved)

	2) fx.map(id) == id(fx)

	Box, Task, Right, Left, List and Map are functors.
*/
const Task = require('data.task');
const Box = require('./lib/box');

const res1 = Box('squirrels')
	.map(s => s.substr(5))
	.map(s => s.toUpperCase());

const res2 = Box('squirrels')
	.map(s => s.substr(5).toUpperCase());

//console.log(res1, res2);

const id = x => x;

const res3 = Box('crayons').map(id);

const res4 = id(Box('crayons'));

console.log(res3, res4);