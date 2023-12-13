const inputText = await Bun.file("input.txt").text();

type Card = {
    pointsCount: number;
    cardCount: number;
}

const cards: Card[] = inputText
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
        return {
            cardCount: 1,
            pointsCount: includedWinningNumbers.length
        };
    })

let newCards = [...cards];

newCards.forEach((card, index) => {
    for (let i = 0; i < card.cardCount; i++) {
        for (let j = index + 1; j <= index + card.pointsCount; j++) {
            cards[j].cardCount++;
        }
    }
})

const result = newCards.map(card => card.cardCount).reduce((a, b) => a + b);
console.log("result: ", result);
