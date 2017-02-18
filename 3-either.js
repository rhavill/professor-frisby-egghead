
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

//const result = Right(2).map(x => x + 1).map(x => x / 2).fold(x => 'error', x => x);
// const result = Left(2).map(x => x + 1).map(x => x / 2).fold(x => 'error', x => x);

// const findColor = name =>
// 	({red: '#ff0000', green: '#00ff00', blue: '#0000ff'})[name]
// const result = findColor('green').slice(1).toUpperCase();

// const findColor = name => {
// 	const found = ({red: '#ff0000', green: '#00ff00', blue: '#0000ff'})[name];
// 	return found ? Right(found) : Left(null)
// };
const fromNullable = x =>
	x != null ? Right(x) : Left(null);
const findColor = name => 
	fromNullable(({red: '#ff0000', green: '#00ff00', blue: '#0000ff'})[name]);

const result = findColor('green')
	.map(c => c.slice(1))
	.fold(
		e => 'no color', 
		c => c.toUpperCase()
	);

console.log(result);