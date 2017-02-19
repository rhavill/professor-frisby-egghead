const fromNullable = x =>
	x != null ? Right(x) : Left(null);

const Right = x => ({
	map: f => Right(f(x)),
	fold: (f, g) => g(x),
	chain: f => f(x),
	ap: b2 => b2.map(x),
	inspect: () => `Right(${x})`
});

const Left = x => ({
	map: f => Left(x),
	fold: (f, g) => f(x),
	chain: f => Left(x),
	ap: b2 =>  Left(x),
	inspect: () => `Left(${x})`
});

module.exports = {
	fromNullable, 
	Right, 
	Left,
	of: x => Right(x)
};