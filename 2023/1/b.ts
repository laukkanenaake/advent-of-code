const inputText = await Bun.file("input.txt").text();
const numberStrings = [
	"one",
	"two",
	"three",
	"four",
	"five",
	"six",
	"seven",
	"eight",
	"nine",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
];

interface NumberType {
	value: string;
	index?: number;
}

const result = inputText
	.split("\n")
	.map((string) => {
		let firstNumber: NumberType = {
			value: "",
			index: undefined,
		};

		let lastNumber: NumberType = {
			value: "",
			index: undefined,
		};

		numberStrings.forEach((number) => {
			const numberFirstIndex = string.indexOf(number);
			const numberLastIndex = string.lastIndexOf(number);
			if (numberFirstIndex === -1) {
				return;
			}
			if (
				firstNumber.index === undefined ||
				numberFirstIndex < firstNumber.index
			) {
				firstNumber = {
					index: numberFirstIndex,
					value: isNaN(parseInt(number))
						? (numberStrings.indexOf(number) + 1).toString()
						: number,
				};
			}
			if (
				lastNumber.index === undefined ||
				numberLastIndex > lastNumber.index
			) {
				lastNumber = {
					index: numberLastIndex,
					value: isNaN(parseInt(number))
						? (numberStrings.indexOf(number) + 1).toString()
						: number,
				};
			}
		});

		return parseInt(firstNumber.value + lastNumber.value);
	})
	.reduce((a, b) => a + b);

console.log("result: ", result);
