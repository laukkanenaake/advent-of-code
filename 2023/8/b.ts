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

// get all starting points

let currentNodes: string[] = Object.keys(map).filter(
	(node) => node[node.length - 1] === "A",
);

// follow map and calculate steps

const nodeSteps = currentNodes.map((currentNode, index) => {
	let instructionIndex = 0;
	let steps = 0;
	while (currentNode[currentNode.length - 1] !== "Z") {
		const node = map[currentNode] ?? { L: "", R: "" };
		const nextNode = node[instructionsArr[instructionIndex]];
		currentNode = nextNode;
		steps++;
		instructionIndex =
			instructionIndex < instructionsArr.length - 1
				? instructionIndex + 1
				: 0;
	}
	return steps;
});

const greatestCommonDenominator: (a: number, b: number) => number = (
	a: number,
	b: number,
) => (b === 0 ? a : greatestCommonDenominator(b, a % b));

const leastCommonMultiple = (numbers: number[]) => {
	if (numbers.length < 2) {
		return 0;
	}
	return numbers.reduce((a, b) => (a * b) / greatestCommonDenominator(a, b));
};

const result = leastCommonMultiple(nodeSteps);

console.log("result: ", result);
