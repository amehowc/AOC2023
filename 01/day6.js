const fs = require("fs");
const path = require("path");

const input = fs
	.readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
	.split("\n");

const duration = parseInt(input[0].match(/\d+/g).join(''));
const record = parseInt(input[1].match(/\d+/g).join(''));
console.log(duration,record)
//console.log(duration,record)

const run = (race) => {
	let wins = 0;
	const { duration, record } = race;

	// Calculate wins for the first half of the curve
	for (let i = 0; i < Math.floor(duration / 2); i++) {
		const hold = i;
		const movement = (duration - hold) * hold;
		if (movement > record) {
			wins += 2; // Two wins because of symmetry
		}
	}

	// Adjust wins if duration is odd
	if (duration % 2 === 1) {
		const middleMovement = (duration / 2) * (duration / 2);
		if (middleMovement > record) {
			wins += 1; // One extra win for the middle point
		}
	}

	return wins + 1;
};

const race = run({duration,record})
console.log(race)
/*
part 1
const durations = input[0].match(/\d+/g);
const records = input[1].match(/\d+/g);
const pairs = durations.map((duration, i) => {
	return { duration: parseInt(duration), record: parseInt(records[i]) };
});

const races = pairs.reduce((acc, pair) => {
	return (acc *= run(pair));
}, 1);
console.log(races);
*/