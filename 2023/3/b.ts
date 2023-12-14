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

let gearLocations: Map<
	string,
	{
		charIndex: number;
		rowIndex: number;
		value: number;
	}[]
> = new Map();

inputText.split("\n").forEach((row, rowIndex, rows) => {
	const numberStrings = getNumberStrings(row);

	const checkAdjacentGear = (charIndex: number, rowIndex: number) => {
		if (
			rowIndex < 0 ||
			charIndex < 0 ||
			rowIndex >= rows.length ||
			charIndex >= row.length
		) {
			return false;
		}
		const adjacentSymbol = rows[rowIndex][charIndex];
		return adjacentSymbol === "*";
	};

	numberStrings.forEach((num) => {
		Array.from(num.value).forEach((char, charIndex) => {
			const index = num.startIndex + charIndex;
			const offsets = [-1, 0, +1];
			return offsets.forEach((rowOffset) =>
				offsets.forEach((charOffset) => {
					const x = index + charOffset;
					const y = rowIndex + rowOffset;
					if (checkAdjacentGear(x, y)) {
						const gearLocation = JSON.stringify({ x, y });
						let adjacentNumbers = [
							...(gearLocations.get(gearLocation) ?? []),
						];
						const newAdjacentNumber = {
							charIndex: num.startIndex,
							rowIndex: rowIndex,
							value: parseInt(num.value),
						};
						const isDuplicate = adjacentNumbers.some(
							(number) =>
								number.charIndex ===
									newAdjacentNumber.charIndex &&
								number.rowIndex ===
									newAdjacentNumber.rowIndex &&
								number.value === newAdjacentNumber.value,
						);
						if (!isDuplicate) {
							adjacentNumbers.push(newAdjacentNumber);
						}
						gearLocations.set(gearLocation, adjacentNumbers);
					}
				}),
			);
		});
	});
});

const gearRatios = Array.from(gearLocations.values())
	.filter((arr) => arr.length === 2)
	.map((arr) => arr[0].value * arr[1].value);

const result = gearRatios.length > 0 ? gearRatios.reduce((a, b) => a + b) : 0;

console.log("result: ", result);
