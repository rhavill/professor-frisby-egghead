/* A monoid is a semi-group with a special element that acts as a neutral identity. 
	You can reduce any number of monoids (even none) and return something, which makes
	it a safe operation. 
*/
const {List} = require("immutable-ext");

const fromNullable = x =>
	x != null ? Right(x) : Left(null);

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

const Product = x => ({
	x,
	concat: ({x: y}) => Product(x * y),
	inspect: () => `Product(${x})`
});
Product.empty = () => Product(1);

// const res = Product.empty().concat(Product(1)).concat(Product(2));

const Any = x => ({
	x,
	concat: ({x: y}) => Any(x || y),
	inspect: () => `Any(${x})`
});
Any.empty = () => Any(false);

// const res = Any.empty().concat(Any(true)).concat(Any(false));

const Max = x => ({
	x,
	concat: ({x: y}) => Max(Math.max(x, y)),
	inspect: () => `Max(${x})`
});
Max.empty = () => Max(-Infinity);

// const res = Max.empty().concat(Max(11)).concat(Max(-1));

const Min = x => ({
	x,
	concat: ({x: y}) => Min(Math.min(x, y)),
	inspect: () => `Min(${x})`
});
Min.empty = () => Min(Infinity);

// const res = Min.empty().concat(Min(11)).concat(Min(-1));

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

const stats = List.of(
	{page: 'Home', views: 40},
	{page: 'About', views: 10},
	{page: 'Blog', views: 4}
);

// const res = stats
// 	.map(x => x.views)
// 	.map(Sum)
// 	.fold(Sum.empty());

const res = stats.foldMap(x =>
	fromNullable(x.views).map(Sum), Right(Sum(0)))
	.fold(e => e, x => x);

console.log(res);