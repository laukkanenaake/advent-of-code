// 1. get hands from the input

type Hand = {
	hand: string;
	bid: number;
};

const inputText = await Bun.file("input.txt").text();

const hands: Hand[] = inputText.split("\n").map((handString) => {
	const [hand, bid] = handString.split(" ");
	return {
		hand,
		bid: parseInt(bid),
	};
});

// 2. filter hands by the type

enum HandType {
	FIVE_OF_A_KIND,
	FOUR_OF_A_KIND,
	FULL_HOUSE,
	THREE_OF_A_KIND,
	TWO_PAIR,
	ONE_PAIR,
	HIGH_CARD,
}

const getCardValue = (card: string) => {
	switch (card) {
		case "A":
			return 13;
		case "K":
			return 12;
		case "Q":
			return 11;
		case "T":
			return 10;
		case "J":
			return 1;
		default:
			return parseInt(card);
	}
};

const getTheTypeOfHand: (string: string) => HandType = (string: string) => {
	if (string === "JJJJJ") {
		return HandType.FIVE_OF_A_KIND;
	}

	const amountsOfChars = new Map<string, number>();
	let jokerAmount = 0;

	Array.from(string).forEach((char) => {
		if (!amountsOfChars.get(char)) {
			const amountOfCharacter =
				string.match(new RegExp(char, "g"))?.length ?? 0;

			if (char === "J") {
				jokerAmount = amountOfCharacter;
			} else {
				amountsOfChars.set(char, amountOfCharacter);
			}
		}
	});

	const cardsByAmount: [string, number][] = Array.from(
		amountsOfChars.entries(),
	).sort((a, b) => b[1] - a[1]);

	let [mostAppearingCard, mostAppearingCardAmount] = cardsByAmount[0];
	let [secondMostAppearingCard, secondMostAppearingCardAmount] =
		cardsByAmount[1] !== undefined ? cardsByAmount[1] : ["", 0];

	const mostAppearingCardIsTheMostValued =
		getCardValue(mostAppearingCard) > getCardValue(secondMostAppearingCard);

	if (
		mostAppearingCardAmount !== secondMostAppearingCardAmount ||
		mostAppearingCardIsTheMostValued
	) {
		// make jokers the card that appears the most
		mostAppearingCardAmount += jokerAmount;
	} else {
		// make the jokers the most valuable card
		const tempMostAppearingCardAmount = mostAppearingCardAmount;
		mostAppearingCardAmount = secondMostAppearingCardAmount + jokerAmount;
		secondMostAppearingCardAmount = tempMostAppearingCardAmount;
	}

	switch (mostAppearingCardAmount) {
		case 5:
			return HandType.FIVE_OF_A_KIND;
		case 4:
			return HandType.FOUR_OF_A_KIND;
		case 3:
			if (secondMostAppearingCardAmount >= 2) {
				return HandType.FULL_HOUSE;
			} else {
				return HandType.THREE_OF_A_KIND;
			}
		case 2:
			if (secondMostAppearingCardAmount >= 2) {
				return HandType.TWO_PAIR;
			} else {
				return HandType.ONE_PAIR;
			}
		default:
			return HandType.HIGH_CARD;
	}
};

const filteredHands: Map<number, Hand[]> = new Map();

hands.forEach((hand) => {
	const handType = getTheTypeOfHand(hand.hand);
	const handGroup = filteredHands.get(handType) ?? [];
	handGroup.push(hand);
	filteredHands.set(handType, handGroup);
});

// 3. sort each hand group and concat them into one array

const sortHands = (handsArr: Hand[]) =>
	handsArr.sort((a, b) => {
		let firstDifferentCardIndex = 0;
		for (let j = 0; j < 5; j++) {
			if (a.hand[j] !== b.hand[j]) {
				firstDifferentCardIndex = j;
				break;
			}
		}
		return (
			getCardValue(b.hand[firstDifferentCardIndex]) -
			getCardValue(a.hand[firstDifferentCardIndex])
		);
	});

const handsAmount = Object.keys(HandType).length / 2;

let allSortedHands: Hand[] = [];

for (let i = 0; i < handsAmount; i++) {
	const handsArr = filteredHands.get(i);
	if (!handsArr) continue;
	const sortedArr = sortHands(handsArr);
	allSortedHands = allSortedHands.concat(sortedArr);
}

// 4 loop through the concated array, map hand => winning

const result = allSortedHands
	.reverse()
	.map((hand, index) => (index + 1) * hand.bid)
	.reduce((a, b) => a + b);

console.log("result: ", result);
