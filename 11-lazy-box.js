const Box = x => ({
	map: f => Box(f(x)),
	fold: f => f(x),
	inspect: () => `Box(${x})`
});

// const nextCharForNumberString = str => 
// 	Box(str) 
// 	.map(s => s.trim())
// 	.map(s => parseInt(s))
// 	.map(x => x + 1)
// 	.fold(x => String.fromCharCode(x)); 

const LazyBox = g => ({
	map: f => LazyBox(() => f(g())),
	fold: f => f(g()),
	inspect: () => `LazyBox(${x})`
});

const nextCharForNumberString = str => 
	LazyBox(() => str) 
	.map(s => s.trim())
	.map(s => parseInt(s))
	.map(x => x + 1)
	.fold(x => String.fromCharCode(x)); 


console.log(nextCharForNumberString('64'));