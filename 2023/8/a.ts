// parse map and instructions

const inputText = await Bun.file("input.txt").text();

const [instructions, mapString] = inputText.split("\n\n");

const map: { [key: string]: { L: string; R: string } } = {};
mapString.split("\n").forEach((nodeString) => {
	const [node, directions] = nodeString.split(" = ");
	const newDirections = directions.trim().replace(/["'()]/g, "");
	const [left, right] = newDirections.split(", ");
	map[node.trim()] = {
		L: left.trim(),
		R: right.trim(),
	};
});

const instructionsArr: ("L" | "R")[] = Array.from(instructions) as (
	| "L"
	| "R"
)[];

// follow map and calculate steps

let currentNode = "AAA";
let instructionIndex = 0;
let steps = 0;
while (currentNode !== "ZZZ") {
	const node = map[currentNode] ?? { L: "", R: "" };
	const nextNode = node[instructionsArr[instructionIndex]];
	currentNode = nextNode;
	steps++;
	instructionIndex =
		instructionIndex < instructionsArr.length - 1
			? instructionIndex + 1
			: 0;
}

const result = steps;
console.log("result: ", result);
