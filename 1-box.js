// const nextCharForNumberString = str => {
// 	const trimmed = str.trim();
// 	const number = parseInt(trimmed);
// 	const nextNuber = number + 1;
// 	return String.fromCharCode(nextNuber);
// };

// const nextCharForNumberString = str => 
// 	String.fromCharCode(parseInt(str.trim()) + 1);

// const nextCharForNumberString = str => 
// 	[str]
// 	.map(s => s.trim())
// 	.map(s => parseInt(s))
// 	.map(x => x + 1)
// 	.map(x => String.fromCharCode(x)); 

const Box = x => ({
	map: f => Box(f(x)),
	fold: f => f(x),
	inspect: () => `Box(${x})`
});

const nextCharForNumberString = str => 
	Box(str) 
	.map(s => s.trim())
	.map(s => parseInt(s))
	.map(x => x + 1)
	.fold(x => String.fromCharCode(x)); 


console.log(nextCharForNumberString('64'));