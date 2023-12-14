const inputText = await Bun.file("input.txt").text();

const overlappingAssignmentsPairsCount = inputText
	.split("\n")
	.filter((pair) => {
		const b = pair.split(",").map((elf) => elf.split("-"));
		const min1 = parseInt(b[0][0]);
		const min2 = parseInt(b[1][0]);
		const max1 = parseInt(b[0][1]);
		const max2 = parseInt(b[1][1]);

		return (
			(min1 >= min2 && min1 <= max2) ||
			(max1 >= min2 && max1 <= max2) ||
			(min2 >= min1 && min2 <= max1) ||
			(max2 >= min1 && max2 <= max1)
		);
	}).length;

console.log("result: ", overlappingAssignmentsPairsCount);
