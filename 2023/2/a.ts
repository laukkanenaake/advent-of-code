const inputText = await Bun.file("input.txt").text();
const result = inputText
	.split("\n")
	.filter(
		(gameString) =>
			!gameString
				.split(": ")[1]
				.split(";")
				.some((set) =>
					set.split(",").some((cubesString) => {
						const [amount, color] = cubesString.trim().split(" ");
						const amountNumber = parseInt(amount.trim());
						return (
							(amountNumber > 12 && color === "red") ||
							(amountNumber > 13 && color === "green") ||
							(amountNumber > 14 && color === "blue")
						);
					}),
				),
	)
	.map((gameString) =>
		parseInt(gameString.substring(4, gameString.indexOf(":"))),
	)
	.reduce((a, b) => a + b);

console.log("result: ", result);
