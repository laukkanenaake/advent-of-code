const inputFile = await Bun.file("input.txt").text();

const [originalStacksString, moves] = inputFile.split("\n\n");

const crateStacksCount = parseInt(
	originalStacksString[originalStacksString.length - 2],
);

const stacks = new Array(crateStacksCount).fill("").map((stack, i) =>
	originalStacksString
		.split("\n")
		.map((crateLine) => crateLine[1 + 4 * i])
		.filter(
			(crate, index, arr) => crate !== " " && index !== arr.length - 1,
		)
		.reverse(),
);

moves.split("\n").forEach((move) => {
	const [amount, fromStack, toStack] = move
		.split(/move|from|to| /)
		.filter((char) => char !== "")
		.map((number) => parseInt(number));

	stacks[toStack - 1] = [
		...stacks[toStack - 1],
		...stacks[fromStack - 1].splice(
			stacks[fromStack - 1].length - amount,
			amount,
		),
	];
});

const answer = stacks.map((stack) => stack[stack.length - 1]).join("");

console.log(answer);
