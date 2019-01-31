const lol = (number, list) => {
	console.log(number)
	console.log(list)
}

const parent = [1, 2, 3, 4].map(number => {
	lol(number, parent)
	return Math.pow(number, 2)
})