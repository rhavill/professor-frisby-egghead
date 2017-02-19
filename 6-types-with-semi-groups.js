/* A semu-group is a type with a concat method that is associative. */

// String semi-group
// const res = "a".concat("b").concat("c");

// Array semi-group
// const res = [1, 2].concat([3, 4]).concat([5, 6]);

// Associativity 
// const res = "a".concat("b".concat("c")); 

// Let's make a Sum semi-group for addition
const Sum = x => ({
	x,
	concat: ({x: y}) => Sum(x + y),
	inspect: () => `Sum(${x})`
});

// const res = Sum(1).concat(Sum(2));

const All = x => ({
	x,
	concat: ({x: y}) => All(x && y),
	inspect: () => `All(${x})`
});

// const res = All(true).concat(All(false)).concat(All(true));

const First = x => ({
	x,
	concat: _ => First(x),
	inspect: () => `First(${x})`
});

const res = First('one').concat(First('two')).concat(First('three'));

console.log(res);