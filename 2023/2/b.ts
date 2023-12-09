const inputText = await Bun.file("input.txt").text();
const result = inputText
    .split("\n")
    .map(gameString => {
        const minAmountsOfColors: Map<string, number> = new Map();
        gameString
            .split(": ")[1]
            .split(";")
            .forEach(set => {
                set.split(",").forEach(cubesString => {
                    const [amount, color] = cubesString.trim().split(" ");
                    const amountNumber = parseInt(amount.trim())
                    const minAmount = minAmountsOfColors.get(color) ?? 0;
                    if (minAmount < amountNumber) {
                        minAmountsOfColors.set(color, amountNumber);
                    }
                });
            });
        return (
            Array
               .from(minAmountsOfColors.values())
                .reduce((a, b) => a * b)
        )
    })
    .reduce((a, b) => a + b);

console.log("result: ", result);