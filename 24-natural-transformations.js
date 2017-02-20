/*
nt(x).map(f) == nt(x.map(f))
*/

const Task = require('data.task');
const Either = require('./lib/either');
const {Right, Left, fromNullable} = Either;
const Box = require('./lib/box');

const eitherToTask = e =>
	e.fold(Task.rejected, Task.of);

const boxToEither = b => 
	b.fold(Right);

// eitherToTask(Right('nightingale'))
// .fork(e => console.error('err', e), r => console.log('res', r));

// eitherToTask(Left('errrrrr'))
// .fork(e => console.error('err', e), r => console.log('res', r));

const res = boxToEither(Box(100));

const res1 = boxToEither(Box(100)).map(x => x * 2);
const res2 = boxToEither(Box(100).map(x => x * 2));

const first = xs =>
	fromNullable(xs[0]);

const res3 = first([1,2,3]).map(x => x + 1)
const res4 = first([1,2,3].map(x => x + 1))

console.log(res3, res4);