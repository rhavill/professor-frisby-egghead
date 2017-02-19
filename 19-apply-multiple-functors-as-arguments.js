const Either =  require('./lib/Either');


const liftA2 = (f, fx, fy) =>
	fx.map(f).ap(fy);

const $ = selector =>
	Either.of({selector, height: 10});

// const getScreenSize = (screen, head, foot) =>
// 	screen - (head.height + foot.height);

// const res = $('header').chain(head =>
// 	$('footer').map(footer =>
// 		getScreenSize(800, head, footer)));

const getScreenSize = screen => head => foot =>
	screen - (head.height + foot.height);

const res = Either.of(getScreenSize(800))
	.ap($('header'))
	.ap($('footer'));
const res2 = liftA2(getScreenSize(800), $('header'), $('footer'));

console.log(res, res2);