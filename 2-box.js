// const moneyToFloat = str =>
// 	parseFloat(str.replace(/\$/g, ''));

// const percentToFloat = str => {
// 	const replaced = str.replace(/\%/g, '');
// 	const number = parseFloat(replaced);
// 	return number * 0.01;
// }

// const applyDiscount = (price, discount) => {
// 	const cost = moneyToFloat(price);
// 	const savings = percentToFloat(discount);
// 	return cost - cost * savings;
// };

const Box = x => ({
	map: f => Box(f(x)),
	fold: f => f(x),
	inspect: () => `Box(${x})`
});

const moneyToFloat = str =>
	Box(str)
	.map(s => s.replace(/\$/g, ''))
	.map(s => parseFloat(s));

const percentToFloat = str =>
	Box(str)
	.map(s => s.replace(/\%/g, ''))
	.map(s => parseFloat(s))
	.map(n => n * 0.01);

const applyDiscount = (price, discount) => 
	moneyToFloat(price)
	.fold(cost => 
		percentToFloat(discount)
		.fold(savings => 
			cost - cost * savings));

const result = applyDiscount('$5.00', '20%');
console.log(result);