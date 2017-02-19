const Task = require('data.task');

// Task.of(1)
// .fork(
// 	e => console.log('error', e),
// 	x => console.log('success', x)		
// );

// Task.rejeced(1)
// .fork(
// 	e => console.log('error', e),
// 	x => console.log('success', x)		
// );

// Task.rejected(1)
// .map(x => x + 1)
// .fork(
// 	e => console.log('error', e),
// 	x => console.log('success', x)		
// );

// Task.of(1)
// .map(x => x + 1)
// .fork(
// 	e => console.log('error', e),
// 	x => console.log('success', x)		
// );

// Task.of(1)
// .map(x => x + 1)
// .chain(x => Task.of(x + 1))
// .fork(
// 	e => console.log('error', e),
// 	x => console.log('success', x)		
// );

const launchSite = () =>
	new Task((rej, res) => {
		console.log('Launch site!');
		res('site');
	});

// launchSite()
// .map(x => x + '!')
// .fork(
// 	e => console.log('error', e),
// 	x => console.log('success', x)		
// );

/* app deals with all of the side-effects */
const app = launchSite().map(x => x + '!');
app.map(x => x + '!').fork(
	e => console.log('error', e),
	x => console.log('success', x)		
);

