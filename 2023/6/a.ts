const inputText = await Bun.file("input.txt").text();

type Record = {
	time: number;
	distance: number;
};

const parseRecords = () => {
	const [timeStrings, distanceStrings] = inputText
		.split("\n")
		.map((string) => string.split(":")[1].trim().match(/\d+/g));

	let records: Record[] = [];

	if (timeStrings && distanceStrings) {
		records = timeStrings.map((time, index) => ({
			time: parseInt(time),
			distance: parseInt(distanceStrings[index]),
		}));
	}

	return records;
};

const records = parseRecords();

const result = records
	.map((record) => {
		let waysToWin = 0;
		for (let i = 0; i <= record.time; i++) {
			const distance = (record.time - i) * i;
			if (distance > record.distance) {
				waysToWin++;
			}
		}
		return waysToWin;
	})
	.reduce((a, b) => a * b);

console.log("result: ", result);
