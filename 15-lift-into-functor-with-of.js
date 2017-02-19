const Task = require('data.task');
const Box = require('./lib/box');

const res = Task.of('hello');
const res2 = Box.of(3);

console.log(res, res2);