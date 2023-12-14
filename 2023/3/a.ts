const inputText = await Bun.file("input.txt").text();

type NumberString = {
	startIndex: number;
	value: string;
};

const getNumberStrings = (row: string) => {
	let numberStrings: NumberString[] = [];
	const emptyNumberString: NumberString = {
		startIndex: -1,
		value: "",
	};
	let currNumberString = { ...emptyNumberString };
	Array.from(row).forEach((char, charIndex) => {
		if (!isNaN(parseInt(char))) {
			currNumberString.value += char;
			if (currNumberString.startIndex === -1) {
				currNumberString.startIndex = charIndex;
			}
		} else {
			if (currNumberString.value !== "") {
				numberStrings.push(currNumberString);
				currNumberString = { ...emptyNumberString };
			}
		}
	});
	if (currNumberString.value) {
		numberStrings.push(currNumberString);
	}
	return numberStrings;
};

const result = inputText
	.split("\n")
	.map((row, rowIndex, rows) => {
		const numberStrings = getNumberStrings(row);

		const checkAdjacentSymbol = (rowIndex: number, charIndex: number) => {
			if (
				rowIndex < 0 ||
				charIndex < 0 ||
				rowIndex >= rows.length ||
				charIndex >= row.length
			) {
				return false;
			}
			const adjacentSymbol = rows[rowIndex][charIndex];
			return isNaN(parseInt(adjacentSymbol)) && adjacentSymbol !== "."; // not a number or a period
		};

		const partNumbers = numberStrings
			.filter((num) =>
				Array.from(num.value).some((char, charIndex) => {
					const index = num.startIndex + charIndex;
					const offsets = [-1, 0, +1];
					return offsets.some((rowOffset) =>
						offsets.some((charOffset) =>
							checkAdjacentSymbol(
								rowIndex + rowOffset,
								index + charOffset,
							),
						),
					);
				}),
			)
			.map((num) => parseInt(num.value));

		const sum =
			partNumbers.length > 0 ? partNumbers.reduce((a, b) => a + b) : 0;
		return sum;
	})
	.reduce((a, b) => a + b);

console.log("result: ", result);
