const inputText = await Bun.file("input.txt").text();
const inputArray = inputText.trim().split("\n");
let totalScore = 0;

const map = new Map([
	["A X", "Scissors"],
	["A Y", "Rock"],
	["A Z", "Paper"],
	["B X", "Rock"],
	["B Y", "Paper"],
	["B Z", "Scissors"],
	["C X", "Paper"],
	["C Y", "Scissors"],
	["C Z", "Rock"],
]);

inputArray.forEach((game) => {
	const input = game[0];
	const output = map.get(game);

	let score = 0;
	if (
		(output === "Rock" && input === "A") ||
		(output === "Paper" && input === "B") ||
		(output === "Scissors" && input === "C")
	) {
		score = 3;
	} else if (
		(output === "Rock" && input === "C") ||
		(output === "Paper" && input === "A") ||
		(output === "Scissors" && input === "B")
	) {
		score = 6;
	}
	switch (output) {
		case "Rock":
			score += 1;
			break;
		case "Paper":
			score += 2;
			break;
		case "Scissors":
			score += 3;
			break;
	}
	totalScore += score;
});

console.log("totalscore: ", totalScore);
