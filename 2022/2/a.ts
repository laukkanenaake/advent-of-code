const inputText = await Bun.file("input.txt").text();
const inputArray = inputText.trim().split("\n");
let totalScore = 0;
inputArray.forEach((game) => {
	const input = game[0];
	const output = game[2];

	let score = 0;
	if (
		(output === "X" && input === "A") ||
		(output === "Y" && input === "B") ||
		(output === "Z" && input === "C")
	) {
		score = 3;
	} else if (
		(output === "X" && input === "C") ||
		(output === "Y" && input === "A") ||
		(output === "Z" && input === "B")
	) {
		score = 6;
	}
	switch (output) {
		case "X":
			score += 1;
			break;
		case "Y":
			score += 2;
			break;
		case "Z":
			score += 3;
			break;
	}
	totalScore += score;
});

console.log("totalscore: ", totalScore);
