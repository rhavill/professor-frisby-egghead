const {Map, List} = require('immutable-ext');
const {Sum} = require('./lib/monoid');

const res = [Sum(1), Sum(2), Sum(3)]
	.reduce((acc, x) => acc.concat(x), Sum.empty());

/* res2 is the same as res. */
const res2 = List.of(Sum(1), Sum(2), Sum(3))
	.fold(Sum.empty());

const res3 = Map({brian: Sum(3), sarah: Sum(5)})
	.fold(Sum.empty());

/* res4 is the same as res3 above. */
const res4 = Map({brian: 3, sarah:5})
	.map(Sum)
	.fold(Sum.empty());

/* res5 is the same as res3 and res4 above. */
const res5 = Map({brian: 3, sarah:5})
	.foldMap(Sum, Sum.empty());

console.log(res5);