const add = x => y => x + y;
const inc = add(1);;


const modulo = divisor => dividend => dividend % divisor;
const isOdd = modulo(2);

const filter = pred => xs => xs.filter(pred);
const getAllOdds = filter(isOdd);

const map = f => xs => xs.map(f);

const replace = regex => repl => str => str.replace(regex, repl);

const censor = replace(/[aeiou]/ig)('*');
const censorAll = map(censor);

console.log(censorAll(['hello','world']));