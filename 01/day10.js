const fs = require("fs");
const _path = require("path");

const input = fs
	.readFileSync(_path.resolve(__dirname, "input.txt"), "utf8")
	.split("\n")
	.map((seq) => seq.split(""));

const dirs = [
	[-1, -1],
	[0, -1],
	[1, -1],
	[-1, 0],
	[1, 0],
	[-1, 1],
	[0, 1],
	[1, 1],
];

/*
| is a vertical pipe connecting N and S.
- is a horizontal pipe connecting E and W.
L is a 90-degree bend connecting N and E.
J is a 90-degree bend connecting N and W.
7 is a 90-degree bend connecting S and W.
F is a 90-degree bend connecting S and E.
*/

/*

function getNextStep(){
    const current = ''

}

*/

const selectPath = (start) => {
	const { x, y } = start;

	if (get(y + 1, x) === "|" || get(y + 1, x) === "L" || get(y + 1, x) === "J") {
		return { dir: "S", y: y + 1, x: x };
	}
	if (get(y - 1, x) === "|" || get(y - 1, x) === "F" || get(y - 1, x) === "7") {
		return { dir: "N", y: y - 1, x: x };
	}
	return { dir: "E", y: y, x: x + 1 };
};

function get(i, j, [y, x] = [0, 0]) {
	const chars = input[i + y];
	if (chars === undefined) {
		return undefined;
	}
	return chars[j + x];
}

const findStartingPoint = (input) => {
	for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
		const columnIndex = input[rowIndex].indexOf("S");
		if (columnIndex !== -1) {
			return { y: rowIndex, x: columnIndex };
		}
	}
	return null; // Return null if 'S' is not found
};

const start = findStartingPoint(input);
let { dir, x, y } = selectPath(start);
const path = [start, { x, y }];
let steps = 1;

while (x !== start.x || y !== start.y) {
	let candidateX = 0;
	let candidateY = 0;
	const char = `${get(y, x)} : ${dir}`;

	switch (char) {
		case "| : S":
			candidateY = 1;
			break;
		case "| : N":
			candidateY = -1;
			break;
		case "- : E":
			candidateX = 1;
			break;
		case "- : W":
			candidateX = -1;
			break;
		case "L : S":
			candidateX = 1;
			break;
		case "L : W":
			candidateY = -1;
			break;
		case "J : S":
			candidateX = -1;
			break;
		case "J : E":
			candidateY = -1;
			break;
		case "7 : N":
			candidateX = -1;
			break;
		case "7 : E":
			candidateY = 1;
			break;
		case "F : N":
			candidateX = 1;
			break;
		case "F : W":
			candidateY = 1;
			break;
		default:
			break;
	}
	if (candidateY === 1) {
		dir = "S";
	} else if (candidateY === -1) {
		dir = "N";
	} else if (candidateX === -1) {
		dir = "W";
	} else {
		dir = "E";
	}
	x += candidateX;
	y += candidateY;
	steps++;
	path.push({ x, y });
}

console.log(steps / 2);
