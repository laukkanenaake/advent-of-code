const inputText = await Bun.file("input.txt").text();
let result: number = -1;
for (let i = 3; i < inputText.length; i++) {
	if (new Set(Array.from(inputText.substring(i - 3, i + 1))).size === 4) {
		result = i + 1;
		break;
	}
}

console.log("result: ", result);
