/*

Box, Either, Task and List are monads because the have an "of" method
that places a value into the type and a chain method. Monads allow you
to nest computation because of "chain". They follow these rules:

1) join(m.map(join)) == join(join(m)) // "m" is a monad.
2) join(m.of(m2)) == join(m2.map(m.of))

map can be defined by chain and of:

m.chain(x => M.of(f(x)))

Monads are all pointed, applicative functors.

*/

const Box = require('./lib/box');

const join = m =>
	m.chain(x => x);

const m = Box(Box(Box(3)));

const res1 = join(m.map(join));
const res2 = join(join(m));

const m2 = Box('wonder');
const res3 = join(Box.of(m2));
const res4 = join(m2.map(Box.of));
console.log(res3, res4);