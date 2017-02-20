/*
nt(x).map(f) == nt(x.map(f))
*/

const {List} = require('immutable-ext');
const {fromNullable} = require('./lib/either');

/* array does not have a chain function
['hello', 'world']
.chain(x => x.split(''))

The constructor for List is a natural transformation
*/
const res = List(['hello', 'world'])
.chain(x => List(x.split('')));

const first = xs =>
	fromNullable(xs[0]);

const largeNumbers = xs =>
	xs.filter(x => x > 100);

const larger = x =>
	x * 2;

// const app = xs =>
// 	first(largeNumbers(xs).map(larger));
const app = xs =>
	first(largeNumbers(xs)).map(larger);

const res2 = app([2, 400, 5, 1000]);

const Task = require('data.task');
const {Right, Left} = require('./lib/either');
const Box = require('./lib/box');


const fake = id =>
	({id: id, name: 'user1', best_friend_id: id + 1});

const Db = ({
	find: id =>
		new Task((rej, res) =>
			res(id > 2 ? Right(fake(id)): Left('not found')))
});

const eitherToTask = e =>
	e.fold(Task.rejected, Task.of);

Db.find(3) // Task(Right(user))
.chain(eitherToTask)
.chain(user =>
	Db.find(user.best_friend_id))
.chain(eitherToTask)
.fork(e => console.error(e), r => console.log(r));


