const {List} = require('immutable-ext');

//const res = List.of(x => x).ap(List([1,2,3]));

/* This is a loop within a loop */
const res = List.of(x => y => z => `${x}-${y}-${z}`)
	.ap(List(['teeshirt', 'sweater']))
	.ap(List(['large', 'medium', 'small']))
	.ap(List(['black', 'white']));

console.log(res);