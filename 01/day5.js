const fs = require("fs");
const path = require("path");

const input = fs
	.readFileSync(path.resolve(__dirname, "input.txt"), "utf8")
	.split("\n\n");

const mapTo = (value, mapping) => {
	let mapped = -1;
	for (const row of mapping) {
		const [end, start, count] = row.split(" ").map(Number);
		if (value >= start && value <= start + count) {
			mapped = end - start + value;
			break;
		}
	}
	return mapped === -1 ? value : mapped;
};

const splitArrayIntoPairs=(arr)=>{
    let result = [];
    for (let i = 0; i < arr.length; i += 2) {
        result.push(arr.slice(i, i + 2));
    }
    return result;
}

const seeds = input[0]
	.split("seeds:")
	.filter((x) => x)[0]
	.split(" ")
	.map((x) => parseInt(x.trim()))
	.filter((x) => !isNaN(x));

const ranges = splitArrayIntoPairs(seeds).map((ranged)=>{
    const [start,range] = ranged
    console.log(start,range)
    return 0
})[0]
console.log(ranges)

let [, ...seedToSoil] = input[1].split("\n");
let [, ...soilToFertilizers] = input[2].split("\n");
let [, ...fertilizerToWater] = input[3].split("\n");
let [, ...waterToLight] = input[4].split("\n");
let [, ...ligthToTemp] = input[5].split("\n");
let [, ...tempToHumidity] = input[6].split("\n");
let [, ...humidityToLocation] = input[7].split("\n");

const findLocation = seeds
	.map((seed) => mapTo(seed, seedToSoil))
	.map((seed) => mapTo(seed, soilToFertilizers))
    .map((seed) => mapTo(seed, fertilizerToWater))
    .map((seed) => mapTo(seed, waterToLight))
    .map((seed) => mapTo(seed, ligthToTemp))
    .map((seed) => mapTo(seed, tempToHumidity))
    .map((seed) => mapTo(seed, humidityToLocation))
console.log(Math.min(...findLocation));


/*
const seeds = input[0]
	.split("seeds:")
	.filter((x) => x)[0]
	.split(" ")
	.map((x) => parseInt(x.trim()))
	.filter((x) => !isNaN(x));

let [, ...seedToSoil] = input[1].split("\n");
let [, ...soilToFertilizers] = input[2].split("\n");
let [, ...fertilizerToWater] = input[3].split("\n");
let [, ...waterToLight] = input[4].split("\n");
let [, ...ligthToTemp] = input[5].split("\n");
let [, ...tempToHumidity] = input[6].split("\n");
let [, ...humidityToLocation] = input[7].split("\n");

const findLocation = seeds
	.map((seed) => mapTo(seed, seedToSoil))
	.map((seed) => mapTo(seed, soilToFertilizers))
    .map((seed) => mapTo(seed, fertilizerToWater))
    .map((seed) => mapTo(seed, waterToLight))
    .map((seed) => mapTo(seed, ligthToTemp))
    .map((seed) => mapTo(seed, tempToHumidity))
    .map((seed) => mapTo(seed, humidityToLocation))
console.log(Math.min(...findLocation));
*/