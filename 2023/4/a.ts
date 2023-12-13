const inputText = await Bun.file("input.txt").text();
const result = inputText
    .split("\n")
    .map(card => {
        const [winningNumbers, cardNumbers] = card
            .slice(card.indexOf(":") + 1)
            .trim()
            .split("|")
            .map(numbersString => (
                numbersString
                    .split(" ")
                    .map(num => parseInt(num.trim()))
                    .filter(num => !isNaN(num))
            ));

        const includedWinningNumbers = winningNumbers.filter(number => cardNumbers.includes(number))
        const points = includedWinningNumbers.length ? Math.pow(2, includedWinningNumbers.length - 1) : 0;
        return points;
    })
    .reduce((a, b) => a + b);

console.log("result: ", result);
