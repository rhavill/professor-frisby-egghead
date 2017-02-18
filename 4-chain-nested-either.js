
const Right = x => ({
	chain: f => f(x),
	map: f => Right(f(x)),
	fold: (f, g) => g(x),
	inspect: () => `Right(${x})`
});

const Left = x => ({
	chain: f => Left(x),
	map: f => Left(x),
	fold: (f, g) => f(x),
	inspect: () => `Left(${x})`
});

const fs = require('fs');

// const getPort = () => {
// 	try {
// 		const str = fs.readFileSync('config.json');
// 		const config = JSON.parse(str);
// 		return config.port;
// 	} catch(e) {
// 		return 3000;
// 	}
// };

const tryCatch = f => {
	try {
		return Right(f());
	} catch(e) {
		return Left(e);
	}
};

const getPort = () => 
	tryCatch(() => fs.readFileSync('config.json'))
	.chain(s => tryCatch(() => JSON.parse(s)))
	.fold(
		e => 3000,
		config => config.port
	);

const result = getPort();

console.log(result);