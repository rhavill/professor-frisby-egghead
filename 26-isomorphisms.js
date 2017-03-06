/*
from(to(x)) = x;
to(from(x)) = x;
*/

const Either = require('./lib/either');
const {Right, Left, fromNullable} = Either;
const {List, Map} = require('immutable-ext');

// string is isomorphic to an array of characters
// String ~ [Char]
const Iso = (to, from) => ({
	to,
	from
});

const chars = Iso(s => s.split(''), c => c.join(''));
const res = chars.from(chars.to('hello world'));

const truncate = str =>
	chars.from(chars.to(str).slice(0, 3)).concat('...');
const res2 = truncate('hello world');	 

// singleton array with "a" is ismorphic with Either, null or "a"
// [a] ~ Either null a
const singleton = Iso(
	e => e.fold(() => [], x => [x]),
	([x]) => x ? Right(x) : Left()
);

const filterEither = (e, pred) =>
	singleton.from(singleton.to(e).filter(pred));

const res3 = filterEither(Right('hello'), x => x.match(/h/ig))
	.map(x => x.toUpperCase());

console.log(res3);