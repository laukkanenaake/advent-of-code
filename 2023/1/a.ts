const inputText = await Bun.file("input.txt").text();
const result = inputText
	.split("\n")
	.map((string) => {
		const numbers = Array.from(string.trim()).filter(
			(char) => !isNaN(parseInt(char)),
		);
		return parseInt(numbers[0] + numbers[numbers.length - 1]);
	})
	.reduce((a, b) => a + b);

console.log("result: ", result);
