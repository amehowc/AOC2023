const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8");

const sequences = input
	.split("\n")
	.map((x) => x.match(/[+-]?\d+/g).map((y) => parseInt(y)));

function reduc(sequence) {
	const history = [sequence];
	let current = sequence;

	while (true) {
		let next = [];
		for (let i = 0; i < current.length - 1; i++) {
			next.push(current.at(i + 1) - current.at(i));
		}
		history.push(next);
		if (next.some((x) => x)) {
			current = next;
			next = [];
		} else {
			break;
		}
	}
	return history;
}

const expand =(sequences)=>{
    sequences.reverse()
    sequences.forEach(seq => seq.reverse())
    for (let i = 0; i < sequences.length - 1; i++) {
        const sum = sequences.at(i+1).at(-1) - sequences.at(i).at(-1)
        sequences.at(i+1).push(sum)
		
	}
	return sequences.at(-1).at(-1)
}


const projection = sequences.map(sequence => expand(reduc(sequence))).reduce((acc,curr)=> {
    return acc += curr
},0)

console.log(projection)
/*
part 1
function reduc(sequence) {
	const history = [sequence];
	let current = sequence;

	while (true) {
		let next = [];
		for (let i = 0; i < current.length - 1; i++) {
			next.push(current.at(i + 1) - current.at(i));
		}
		history.push(next);
		if (next.some((x) => x)) {
			current = next;
			next = [];
		} else {
			break;
		}
	}
	return history;
}
function expand(sequences) {
	sequences.reverse();

	for (let i = 0; i < sequences.length - 1; i++) {
        const sum = sequences.at(i).at(-1) + sequences.at(i+1).at(-1)
        sequences.at(i+1).push(sum)
		
	}
	return sequences.at(-1).at(-1)
}

const projection = sequences.map(sequence => expand(reduc(sequence))).reduce((acc,curr)=> {
    return acc += curr
},0)

console.log(projection)
*/
