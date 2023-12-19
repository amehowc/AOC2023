const fs = require("fs");
const _path = require("path");

const input = fs
	.readFileSync(_path.resolve(__dirname, "input.txt"), "utf8")
	.split("\n")
	.filter((n) => n)
	.map((seq) => seq.split(""));

const galaxies = [];

for (let i = 0; i < input.length; i++) {
	for (let j = 0; j < input[i].length; j++) {
		if (input[j][i] === "#") {
			galaxies.push([i, j]);
		}
	}
}

for (let y = input.length - 1; y >= 0; y--) {
	let emptyRow = true;
	for (let x = 0; x < input[0].length; x++) {
		if (input[y][x] !== ".") {
			emptyRow = false;
			break;
		}
	}

	if (emptyRow) {
		for (let c = 0; c < galaxies.length; c++) {
			if (galaxies[c][1] > y) {
                //galaxy[c][1] += 1
				galaxies[c][1] += 999999;
			}
		}
	}
}

for (let x = input[0].length - 1; x >= 0; x--) {
	let emptyCols = true;
	for (let y = 0; y < input.length; y++) {
		if (input[y][x] !== ".") {
			emptyCols = false;
			break;
		}
	}

	if (emptyCols) {
		for (const galaxy of galaxies) {
			if (galaxy[0] > x) {
                //galaxy[0] += 1
				galaxy[0] += 999999;
			}
		}
	}
}

const calculateDistance = (p1, p2) =>
	Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);

let sum = 0;
for (let i = 0; i < galaxies.length; i++) {
	for (let j = 0; j < galaxies.length; j++) {
		sum += calculateDistance(galaxies[i], galaxies[j]);
	}
}
console.log(sum / 2);
