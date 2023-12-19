const fs = require("fs");
const path = require("path");

const input = fs
	.readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
	

const [_instructions,..._points] = input.split('\n')
_points.shift()

const instructions = _instructions.split('').map(dir => dir === 'L' ? 0 : 1);
const startingPoints = [];
const completedPoints = new Set(); 
const points = _points.reduce((acc, coordinates) => {
    const matches = coordinates.match(/\b[A-Z\d]{3}\b/g);
    if (matches && matches.length === 3) {
        const [location, left, right] = matches;
        acc[location] = [left, right];
		if(location[2]==='A'){
			const ob = {
				current: location, // Assuming 'location' is defined somewhere in your scope
				steps: 0,
				makeStep: function() {
					const nextInstruction = instructions[this.steps % instructions.length];
					this.current = points[this.current][nextInstruction];
					this.steps++;
				}
			};
			startingPoints.push(ob)
		}
    }
    return acc;
}, {});
startingPoints.forEach((ob, index) => {
    ob.makeStep = function() {
        if (this.current[2] === 'Z') {
            completedPoints.add(index); // Mark as complete
            return;
        }
        const nextInstruction = instructions[this.steps % instructions.length];
        this.current = points[this.current][nextInstruction];
        this.steps++;
    };
});

while (completedPoints.size < startingPoints.length) {
    startingPoints.forEach((obj, index) => {
        if (!completedPoints.has(index)) {
            obj.makeStep();
        }
    });
}

console.log("All objects have returned true.", startingPoints);
// let steps = 0
// const takeStep = (target) => {
    

    
//     const nextInstruction = instructions[steps % instructions.length];
//     current = points[current][nextInstruction];
//     return current[2] === 'Z';
// };
//const numSteps = takeStep('AAA',instructions)
//console.log(numSteps)

/*
part 1 
const fs = require("fs");
const path = require("path");

const input = fs
	.readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
	

const [_instructions,..._points] = input.split('\n')
_points.shift()

const instructions = _instructions.split('').map((dir)=> dir === 'L' ? 0 : 1 )
const points = _points.reduce((acc, coordinates) => {
    const matches = coordinates.match(/\b[A-Z]{3}\b/g);
    if (matches && matches.length === 3) {
        const [location, left, right] = matches;
        acc[location] = [left, right];
    }
    return acc;
}, {});


let steps = 0
const takeStep = (current, instructions) => {
    let steps = 0;
    while (current !== 'ZZZ') {
        const nextInstruction = instructions[steps % instructions.length];
        current = points[current][nextInstruction];
        steps++;
        if (steps > 1000000) { // Safeguard to prevent infinite loops
            console.log("Too many steps, exiting...");
            return -1;
        }
    }
    return steps;
};
const numSteps = takeStep('AAA',instructions)
console.log(numSteps)

*/