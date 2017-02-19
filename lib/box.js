const Box = x => ({
	map: f => Box(f(x)),
	chain: f => f(x),
	fold: f => f(x),
	inspect: () => `Box(${x})`
});
Box.of = x => Box(x);

module.exports = Box;