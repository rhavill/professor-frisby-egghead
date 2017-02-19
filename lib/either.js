const fromNullable = x =>
	x != null ? Right(x) : Left(null);

const Right = x => ({
	map: f => Right(f(x)),
	fold: (f, g) => g(x),
	inspect: () => `Right(${x})`
});

const Left = x => ({
	map: f => Left(x),
	fold: (f, g) => f(x),
	inspect: () => `Left(${x})`
});

module.exports = {fromNullable, Right, Left};