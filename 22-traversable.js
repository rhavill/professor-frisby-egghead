const fs = require('fs');
const Task = require('data.task');
const futurize = require('futurize').futurize(Task);
const {List} = require('immutable-ext');

const readFile = futurize(fs.readFile);

// const files = ['lib/box.js', 'config.json'];
// const res = files.map(fn => readFile(fn, 'utf-8'));
// console.log(res);

const files = List(['lib/box.js', 'config.json']);
files.traverse(Task.of, fn => readFile(fn, 'utf-8'))
.fork(console.error, console.log);
