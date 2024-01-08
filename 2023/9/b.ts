const inputText = await Bun.file("input.txt").text();

const getNextValue: (sequence: number[]) => number = (sequence: number[]) => {
	let differences: number[] = [];
	for (let i = 0; i < sequence.length - 1; i++) {
		const diff = sequence[i + 1] - sequence[i];
		differences.push(diff);
	}
	if (!differences.every((num) => num === 0)) {
		return sequence[sequence.length - 1] + getNextValue(differences);
	} else {
		return sequence[0]; // all numbers are same
	}
};

const lines = inputText.split("\n");
const result = lines
	.map((line) => {
		const sequence = line
			.split(" ")
			.map((num) => parseInt(num))
			.reverse();
		return getNextValue(sequence);
	})
	.reduce((a, b) => a + b);

console.log("result: ", result);
