const fs = require("fs");
const path = require("path");

function isCharNumber(char) {
	return !isNaN(parseInt(char));
}

function isDot(char) {
	return char === ".";
}

function get(i, j, [y, x]) {
	const chars = input[i + y];
	if (chars === undefined) {
		return undefined;
	}
	return chars[j + x];
}
// part 1
// const input = fs
// .readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
// .split("\n")
// .map((x) => x.split(""));
// const dirs = [
// 	[-1, -1],
// 	[0, -1],
// 	[1, -1],
// 	[-1, 0],
//     [1,0],
// 	[-1, 1],
// 	[0, 1],
// 	[1, 1],
// ];
// let sum = 0;
// for (let y = 0; y < input.length; y++) {
// 	const row = input[y];
// 	let isNumber = false;
// 	let currentNumber = "";
// 	let check = true;
// 	for (let x = 0; x < row.length; x++) {
// 		isNumber = isCharNumber(get(y, x, [0, 0]));
// 		if (!isNumber && !check) {
// 			sum += parseInt(currentNumber);
// 		}
//         if(!isNumber){
//             currentNumber = "";
// 			check = true;
//         }
// 		if (isNumber && check) {
// 			const is = dirs.reduce((acc, [dy, dx]) => {
// 				const char = get(y, x, [dy, dx]);
// 				return acc || (!isDot(char) && !isCharNumber(char) && char !== undefined);
// 			}, false);

// 			if (is) {
// 				check = false;
// 			}
// 		}

// 		if (isNumber) {
// 			currentNumber += get(y, x, [0, 0]);
// 		}
// 	}
//     if (isNumber && !check) {
//         sum += parseInt(currentNumber);
//     }
// }

// part 2
const input = fs
	.readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
	.split("\n");

function processRow(row) {
	let result = "";
	let i = 0;

	while (i < row.length) {
		if (isCharNumber(row[i])) {
			let count = 1;

			// Count consecutive digits
			while (i + count < row.length && isCharNumber(row[i + count])) {
				count++;
			}

			// Replace digits with their count
			result += count.toString().repeat(count);
			i += count;
		} else {
			result += row[i];
			i++;
		}
	}

	return result;
}

function toNumberGrid(input) {
	return input.map((row) => processRow(row));
}

const numgrids = toNumberGrid(input);
console.log(numgrids);
