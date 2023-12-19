const fs = require("fs");
const _path = require("path");

const input = fs
	.readFileSync(_path.resolve(__dirname, "input.txt"), "utf8")
	.split("\n")
	.filter((n) => n);


let result = 0;

for (let line of input) {
	let [code, numbers] = line.split(" ");
	numbers = numbers.split(",").map(Number);

	let number = [0];
	let dictionary = "";

	for (let i = 0; i < 5; i++) {
		dictionary = dictionary + (code + "?");
		number = number.concat(numbers);
	}
	let counts = [];
	for (let i = 0; i < dictionary.length; i++) {
		counts[i] = [];
	}

	let calculate = (m, n) => {
		if (m == -1 && n == 0) return 1;
		if (counts[m]) return counts[m][n] ?? 0;
		return 0;
	};

	for (let i = 0; i < number.length; i++) {
		for (let j = 0; j < dictionary.length; j++) {
			let cur = 0;
			if (dictionary[j] != "#") cur += calculate(j - 1, i);
			if (i > 0) {
				let d = true;
				for (let k = 1; k <= number[i]; k++) {
					if (dictionary[j - k] == ".") d = false;
				}
				if (dictionary[j] == "#") d = false;
				if (d) cur += calculate(j - number[i] - 1, i - 1);
			}
			counts[j][i] = cur;
		}
	}
	result += counts[dictionary.length - 1][number.length - 1];
}
console.log(result);

/*
	part 1
let result = 0;

for (let line of input) {
	let [code, numbers] = line.split(" ");
	numbers = numbers.split(",").map(Number);

	let number = [0].concat(numbers);
	let dictionary = 'code + "X";'

	let counts = [];
	for (let i = 0; i < dictionary.length; i++) {
		counts[i] = [];
	}

	let calculate = (m, n) => {
		if (m == -1 && n == 0) return 1;
		if (!!counts[m]) return counts[m][n] ?? 0;
		return 0;
	};
	console.log(numbers)
	for (let i = 0; i < number.length; i++) {
		for (let j = 0; j < dictionary.length; j++) {
			let cur = 0;
			if (dictionary[j] != "#") cur += calculate(j - 1, i);
			if (i > 0) {
				let d = true;
				for (let k = 1; k <= number[i]; k++) {
					if (dictionary[j - k] == ".") d = false;
				}
				if (dictionary[j] == "#") d = false;
				if (d) cur += calculate(j - number[i] - 1, i - 1);
			}
			counts[j][i] = cur;
		}
	}
	result += counts[dictionary.length - 1][number.length - 1];
}

console.log(result);
*/
