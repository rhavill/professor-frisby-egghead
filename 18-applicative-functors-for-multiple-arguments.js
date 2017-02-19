/*
Applicative functors have an "ap" method.

F(x).map(f) == F(f).ap(F(x))

*/

const Box = require('./lib/Box');

const res = Box(x => x + 1).ap(Box(2));

const add = x => y => x + y;

const res2 = Box(add).ap(Box(2)).ap(Box(3));

const res3 = Box(3).map(x => x + 1);
const res4 = Box(x => x + 1).ap(Box(3));

const liftA2 = (f, fx, fy) =>
	fx.map(f).ap(fy);
const res5 = liftA2(add, Box(2), Box(4));

const liftA3 = (f, fx, fy, fz) =>
	fx.map(f).ap(fy).map(f).ap(fz);
const res6 = liftA3(add, Box(2), Box(4), Box(2));

console.log(res6);