const fs = require("fs");
const path = require("path");

const input = fs
	.readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
	.split("\n");
/*
part 1
const score = input.map((card)=>{
    const [winning,scratched] = card.split('|')
    const winningNumbers = new Set(winning.split(':')[1].match(/\d+/g).map(num => parseInt(num)))
    const matchingNumbers = scratched.match(/\d+/g).filter(num => winningNumbers.has(parseInt(num)))
    return matchingNumbers.reduce((acc,curr,index,arr)=>{
        if(arr.length === 0) return acc
        if(index === 0) return acc = 1
        return acc *= 2
    },0)
}).reduce((acc,curr)=> acc += curr)
*/

const getCardScore = (card, index) => {
	const [winning, scratched] = card.split("|");
	const winningNumbers = new Set(
		winning
			.split(":")[1]
			.match(/\d+/g)
			.map((num) => parseInt(num))
	);
	const matchingNumbers = scratched
		.match(/\d+/g)
		.filter((num) => winningNumbers.has(parseInt(num)));
	const score = matchingNumbers.reduce((acc, curr, index, arr) => {
		if (arr.length === 0) return acc;
		if (index === 0) return (acc = 1);
		return (acc *= 2);
	}, 0);
	return { id: index + 1, matching: matchingNumbers.length, score: score };
};

const cards = input.map((card, index) => {
	return  getCardScore(card, index);
});

const pileToProcess = new Array(cards.length).fill(0).map((_,i)=> i)
const seenCards = {}
const count = {}

while(pileToProcess.length){
    const id = pileToProcess.pop()
    const card = seenCards[id] ? seenCards[id] : cards.find((card)=> card.id === (id+1))
    seenCards[id] = card
    const points = new Array(card['matching']).fill(card['id']).map((val,i)=> val+=(i)) 
    
    points.forEach((x)=>{
        count[x] = count[x] ? count[x] + 1 : 1
        pileToProcess.push(x)
    })
}

const total = Object.keys(count).reduce((acc,curr)=>{
    return acc + count[curr]
},cards.length)
console.log(total)
