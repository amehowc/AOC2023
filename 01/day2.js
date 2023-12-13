

const fs = require("fs");
const path = require("path");
const input = fs
	.readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
	.split("\n");

/*
const rules = {
	red: 12,
	green: 13,
	blue: 14,
};

const games = input.map((game) => {
    let acc = 0
	let [id, plays] = game.split(":");
	id = id.match(/\d+/g)[0];
	let rounds = plays.split(";").map((round) => {
		const hands = round.split(",").map((hand) => {
			const [_, amount, color] = hand.split(" ");
            let isValid = true
            for(let rule in rules){
                if(color === rule && amount > rules[color] ){
                    isValid = false
                }
            }
			return isValid;
		});
		return !hands.some(hand=> hand === false);
	}).some(round=> round === false);
    return id * !rounds
	
}).reduce((acc,curr)=> acc += curr);

console.log(games);
*/

const rules = {
	red: 0,
	green: 0,
	blue: 0,
};

const games = input.map((game) => {
    let acc = 0
	let [id, plays] = game.split(":");
	id = id.match(/\d+/g)[0];
    const rules = {
        red: 0,
        green: 0,
        blue: 0,
    };
	let rounds = plays.split(";").map((round) => {
        
		const hands = round.split(",").map((hand) => {
			const [_, amount, color] = hand.split(" ");
            
            for(let rule in rules){
                if(color === rule && amount > rules[color] ){
                    rules[color] = parseInt(amount)
                }
            }
			return 0;
		});
		return rules;
	});
    return rounds[0]
	
}).reduce((acc,curr)=>{
    const {red,blue,green} = curr
    console.log(curr)
    acc += (red * blue * green)
    return acc
},0);

console.log(games);