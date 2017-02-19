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

const All = x => ({
	x,
	concat: ({x: y}) => All(x && y),
	inspect: () => `All(${x})`
});
All.empty = () => All(true);

const Product = x => ({
	x,
	concat: ({x: y}) => Product(x * y),
	inspect: () => `Product(${x})`
});
Product.empty = () => Product(1);

const Any = x => ({
	x,
	concat: ({x: y}) => Any(x || y),
	inspect: () => `Any(${x})`
});
Any.empty = () => Any(false);

const Max = x => ({
	x,
	concat: ({x: y}) => Max(Math.max(x, y)),
	inspect: () => `Max(${x})`
});
Max.empty = () => Max(-Infinity);

const Min = x => ({
	x,
	concat: ({x: y}) => Min(Math.min(x, y)),
	inspect: () => `Min(${x})`
});
Min.empty = () => Min(Infinity);

const Right = x => ({
	map: f => Right(f(x)),
	fold: (f, g) => g(x),
	inspect: () => `Right(${x})`,
	concat: o =>
		o.fold(
			e => Left(e),
			r => Right(x.concat(r)))
});

const Left = x => ({
	map: f => Left(x),
	fold: (f, g) => f(x),
	inspect: () => `Left(${x})`,
	concat: o => Left(x)
});

module.exports = {Sum};