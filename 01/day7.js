const fs = require("fs");
const path = require("path");

const input = fs
	.readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
	.split("\n");

const table = {
	T: 10,
	Q: 12,
	J: 0,
	K: 13,
	A: 14,
};

const getScore = (arr) => {
	if (arr[0][1] === 5) return 7;
	if (arr[0][1] === 4) return 6;
	if (arr[0][1] === 3 && arr[1][1] === 2) return 5;
	if (arr[0][1] === 3) return 4;
	if (arr[0][1] === 2 && arr[1][1] === 2) return 3;
	if (arr[0][1] === 2) return 2;
	return 1;
};
let h = 0
const handleJoker =(numbers)=>{

	
	const getJoker = numbers['0'] ?? 0
	delete numbers['0']
	const hand = Object.entries(numbers).sort((a, b) => b[1] - a[1])
	
	if(!hand[0]){
		hand[0] = ['0', getJoker]
	} else {
		hand[0][1] = Math.min(getJoker + hand[0][1], 5)
	}
	
	
	return hand
}


const countNumbers = (arr) => {
	const numbers = {};
	for (let i = 0; i < arr.length; i++) {
		const number = arr[i];
		if (numbers.hasOwnProperty(number)) {
			numbers[number]++;
		} else {
			numbers[number] = 1;
		}
	}

	const withJokers = getScore(handleJoker(numbers))
	return withJokers;
};

const compareHands = (b, a) => {
	const handB = countNumbers(b);
	const handA = countNumbers(a);
	if (handA !== handB) {
		return handA < handB ? -1 : 1;
	} else {
		let win = 0;
		for (let i = 0; i < b.length; i++) {
			if (b[i] === a[i]) continue;
			win = a[i] < b[i] ? -1 : 1;
			break;
		}
		return win;
	}
};

const games = input
	.map((game) => {
		const [hand, bet] = game.split(" ");
		const numberedHand = hand
			.split("")
			.map((char) => (table.hasOwnProperty(char) ? table[char] : parseInt(char)));
		return { hand: numberedHand, bid: parseInt(bet) };
	})
	.sort((a, b) => compareHands(b.hand, a.hand))
	.reduce((acc, curr, i) => {
		return (acc += curr.bid * (i + 1));
	}, 0);

console.log(games);

/*
part 1
const table = {
	T: 10,
	J: 11,
	Q: 12,
	K: 13,
	A: 14,
};

const getScore =(arr)=>{

	if(arr[0][1] === 5) return 7
	if(arr[0][1] === 4) return 6
	if(arr[0][1] === 3 && arr[1][1] === 2) return 5
	if(arr[0][1] === 3) return 4
	if(arr[0][1] === 2 && arr[1][1] === 2) return 3
	if(arr[0][1] === 2 ) return 2
	return 1

}

const countNumbers = (arr) => {
	const numbers = {};
	for (let i = 0; i < arr.length; i++) {
		const number = arr[i];
		if (numbers.hasOwnProperty(number)) {
			numbers[number]++;
		} else {
			numbers[number] = 1;
		}
	}
	const countArray = getScore(Object.entries(numbers).sort((a, b) => b[1] - a[1]));
	return countArray;
};

const compareHands = (b, a) => {
	const handB = countNumbers(b)
	const handA = countNumbers(a)
	if( handA !== handB){
		return handA < handB ? -1 : 1
	}else{
		let win = 0
		for(let i =0; i<b.length;i++){
			if(b[i] === a[i]) continue
			win = a[i] < b[i] ? -1 : 1; break
		}
		return win

	}
};

const games = input
	.map((game) => {
		const [hand, bet] = game.split(" ");
		const numberedHand = hand
			.split("")
			.map((char) => (table.hasOwnProperty(char) ? table[char] : parseInt(char)));
		return { hand: numberedHand, bid: parseInt(bet) };
	})
	.sort((a, b) => compareHands(b.hand, a.hand)).reduce((acc,curr,i)=>{
		return acc += curr.bid * (i+1)
	},0);

console.log(games);
*/