const inputText = await Bun.file("input.txt").text();

type Record = {
	time: number;
	distance: number;
};

const parseRecord = () => {
	const [timeString, distanceString] = inputText
		.split("\n")
		.map((string) => string.split(":")[1].replaceAll(" ", ""));

	return {
		time: parseInt(timeString),
		distance: parseInt(distanceString),
	};
};

const record: Record = parseRecord();

const calculateWaysToWin = () => {
	let waysToWin = 0;
	for (let i = 0; i <= record.time; i++) {
		const distance = (record.time - i) * i;
		if (distance > record.distance) {
			waysToWin++;
		}
	}
	return waysToWin;
};

const result = calculateWaysToWin();
console.log("result: ", result);
