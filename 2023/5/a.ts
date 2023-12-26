const inputText = await Bun.file("input.txt").text();

const [seedsString, ...sourceDestinationMaps] = inputText.split("\n\n");

type SourceDestinationMap = {
	sourceType: string;
	destinationType: string;
	ranges: Range[];
};

type Range = {
	destinationRangeStart: number;
	sourceRangeStart: number;
	rangeLength: number;
};

const parseAlmanac = () =>
	sourceDestinationMaps.map((map) => {
		const [mapInfo, rangesString] = map.split(":\n");
		const ranges = rangesString
			.split("\n")
			.map((range) => {
				const [destinationRangeStart, sourceRangeStart, rangeLength] =
					range
						.split(" ")
						.map((valueText) => parseInt(valueText.trim()));
				return {
					destinationRangeStart,
					sourceRangeStart,
					rangeLength,
				};
			})
			.sort((a, b) => a.sourceRangeStart - b.sourceRangeStart);
		const [sourceType, to, destinationType] = mapInfo.split("-");
		return {
			destinationType,
			sourceType,
			ranges,
		};
	});

const getValueFromMap = (mapIndex: number, sourceValue: number) => {
	let destinationValue: number = -1;
	const map = maps[mapIndex];
	map.ranges.forEach((range) => {
		if (
			sourceValue > range.sourceRangeStart &&
			sourceValue < range.sourceRangeStart + range.rangeLength
		) {
			destinationValue =
				sourceValue +
				range.destinationRangeStart -
				range.sourceRangeStart;
			return;
		}
	});
	if (destinationValue === -1) {
		destinationValue = sourceValue;
	}
	if (mapIndex + 1 < maps.length) {
		destinationValue = getValueFromMap(mapIndex + 1, destinationValue);
	}
	return destinationValue;
};

const seeds = seedsString
	.split(" ")
	.map((seed) => parseInt(seed.trim()))
	.filter((seed) => !isNaN(seed));

const maps: SourceDestinationMap[] = parseAlmanac();

const result = seeds
	.map((seed) => getValueFromMap(0, seed))
	.sort((a, b) => a - b)[0];

console.log("result: ", result);
