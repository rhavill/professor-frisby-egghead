/* A monoid is a semi-group with a special element that acts as a neutral identity. 
	You can reduce any number of monoids (even none) and return something, which makes
	it a safe operation. 
*/

const Sum = x => ({
	x,
	concat: ({x: y}) => Sum(x + y),
	inspect: () => `Sum(${x})`
});
Sum.empty = () => Sum(0);

// const res = Sum.empty().concat(Sum(1)).concat(Sum(2));

const All = x => ({
	x,
	concat: ({x: y}) => All(x && y),
	inspect: () => `All(${x})`
});
All.empty = () => All(true);

// const res = All.empty().concat(All(true));

/* The First semi-group cannot be promoted to a monoid because it has no neutral element. */
const First = x => ({
	x,
	concat: _ => First(x),
	inspect: () => `First(${x})`
});

const sum = xs =>
	xs.reduce((acc, x) => acc + x, 0);

// const res = sum([1,2,3]);
/* sum can handle an empty list */
// const res = sum([]);

const all = xs =>
	xs.reduce((acc, x) => acc && x, true);

// const res = all([true, false, true]);
/* all can handle an empty list */
// const res = all([]);

const first = xs =>
	xs.reduce((acc, x) => acc );

// const res = first([1, 2, 3]);

/* first cannot handle an empty list. This throws a Type error: */
const res = first([]);

console.log(res);