const fs = require('fs');

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

const fromNullable = x =>
	x != null ? Right(x) : Left(null);

const tryCatch = f => {
	try {
		return Right(f());
	} catch(e) {
		return Left(e);
	}
};

let user = 'admin';

const renderPage = user => `Render page for ${user}.`;
const showLogin = () => 'Show login.';

// const openSite = () => {
// 	if (user) {
// 		return renderPage(user);
// 	}
// 	else {
// 		return showLogin();
// 	}
// };

const openSite = () => 
	fromNullable(user)
	.fold(showLogin, renderPage);

// console.log(openSite());

user = {
	name: 'admin',
	premium: true,
	preferences: 'my prefs',
	address: { street: { name: 'Maple'}}
};

const loadPrefs = prefs => `Load prefs ${prefs}.`;
const defaultPrefs = 'Default prefs.';

// const getPrefs = user => {
// 	if (user.premium) {
// 		return loadPrefs(user.preferences)
// 	}
// 	else {
// 		return defaultPrefs;
// 	}
// };

const getPrefs = user => 
	(user.premium ? Right(user) : Left('not premium'))
	.map(u => u.preferences)
	.fold(() => defaultPrefs, prefs => loadPrefs(prefs))
;

//console.log(getPrefs(user));

// const streetName = user => {
// 	const address = user.address;

// 	if (address) {
// 		const street = address.street;

// 		if (street) {
// 			return street.name;
// 		}
// 	}
// 	return 'no street';
// };

const streetName = user => 
	fromNullable(user.address)
	.chain(a => fromNullable(a.street))
	.map(s => s.name)
	.fold(e => 'no street', n => n);

// console.log(streetName(user));

// const concatUniq = (x, ys) => {
// 	const found = ys.filter(y => y === x)[0]
// 	return found ? ys : ys.concat(x);
// };

const concatUniq = (x, ys) => 
	fromNullable(ys.filter(y => y === x)[0])
	.fold(() => ys.concat(x), y => ys);

// console.log(concatUniq(1, [2,3]))

const example = {previewPath: './config.json'};

// const wrapExample = example => {
// 	if(example.previewPath) {
// 		try {
// 			example.preview = fs.readFileSync(example.previewPath);
// 		} catch(e) {console.log(e)}
// 	}
// 	return example;
// };

const readFile = x => tryCatch(() => fs.readFileSync(x));

const wrapExample = example => 
	fromNullable(example.previewPath)
	.chain(readFile)
	.fold(() => example, ex => Object.assign({}, example, {preview: ex}));

// console.log(wrapExample(example));

const cfg = '{"url": "postgres://user:pass@host:3333/db_name"}';

// const parseDbUrl = cfg => {
// 	try {
// 		const c = JSON.parse(cfg);
// 		if (c.url) {
// 			return c.url.match(/postgres:\/\/([^:]+):([^\@+]+)@([^:]+):(\d+)\/(.+)/)
// 		}
// 	} catch(e) {
// 		return null;
// 	}
// };

const parseDbUrl = cfg => 
	tryCatch(() => JSON.parse(cfg))
	.chain(c => fromNullable(c.url))
	.fold(
		e => null,
		u => u.match(/postgres:\/\/([^:]+):([^\@+]+)@([^:]+):(\d+)\/(.+)/));

console.log(parseDbUrl(cfg));
