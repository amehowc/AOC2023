// const fs = require("fs").promises; // Use the promise-based version of fs

// let content = ""; // Global variable to store file content

// async function readFile(filePath) {
// 	try {
// 		const data = await fs.readFile(filePath, "utf8");
// 		// console.log('File read successfully');
// 		return data; // Store the file content in the global variable
// 	} catch (err) {
// 		console.error("Error reading the file:", err);
// 	}
// }

// fist part
/*
readFile('./input.txt').then((answer) => {
    
    const data = answer.split('\n').map((coord)=>{
        const numbers = coord.match(/\d/g).reduce((acc, curr, index, src)=>{
            if (index === 0) {
                acc += curr;
            }
            if (index === src.length - 1) {
                acc += curr;
            }
            return acc;
        },'')
        console.log(numbers)
        
        
        return parseInt(numbers)
    }).reduce((acc,curr) => acc+=curr)
    console.log(data)
});
*/

// second part

	// readFile("./input.txt").then((answer) => {
	// 	const replaceNumberWords = (str) => {
	// 		const numberWords = {
    //             'one': '1',
    //             'two': '2',
    //             'three': '3',
    //             'four': '4',
    //             'five': '5',
    //             'six': '6',
    //             'seven': '7',
    //             'eight': '8',
    //             'nine': '9'
    //         };
        
    //         let result = '';
    //         let i = 0;
        
    //         while (i < str.length) {
    //             let found = false;
        
    //             for (let word in numberWords) {
    //                 if (str.startsWith(word, i)) {
    //                     result += numberWords[word];
    //                     i += word.length;
    //                     found = true;
    //                     break;
    //                 }
    //             }
        
    //             if (!found) {
    //                 result += str[i];
    //                 i++;
    //             }
    //         }
            
    //         return result;
	// 	};

	// 	const data = answer
	// 		.split("\n")
	// 		.map((coord) => {
	// 			const toNumbers = replaceNumberWords(coord);
	// 			//console.log(toNumbers);
	// 			const numbers = toNumbers.match(/\d/g).reduce((acc, curr, index, src) => {
	// 				if (index === 0) {
	// 					acc += curr;
	// 				}
	// 				if (index === src.length - 1) {
	// 					acc += curr;
	// 				}
	// 				return acc;
	// 			}, "");
    //             if(numbers < 10) console.log(numbers);
				

	// 			return parseInt(numbers);
	// 		})
	// 		.reduce((acc, curr) => (acc += curr));
	// 	console.log(data);
	// });

    const fs = require("fs");
    const path = require("path");
    const input = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
    
    const numbersMap = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9
    }
    
    let result = 0;
    for (const line of input) {
        const numbers = [];
        for (const [key, value] of Object.entries(numbersMap)) {
            numbers.push(...line.matchAll(new RegExp(key, "g")), ...line.matchAll(new RegExp(value, "g")));
        }
        numbers.sort((a, b) => a.index - b.index);
    
        result += parseInt(`${
            numbers[0][0].length > 1 ? numbersMap[numbers[0][0]] : parseInt(numbers[0][0])
        }${
            numbers[numbers.length - 1][0].length > 1 ? numbersMap[numbers[numbers.length - 1][0]] : parseInt(numbers[numbers.length - 1][0])
        }`);
    }
    
    console.log(result);