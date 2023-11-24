const inputText = await Bun.file("input.txt").text();

const inputArray = inputText.split('\n');
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getSharedElement = (string1: string, string2: string) => {
    for (let char of string1) {
        if (string2.includes(char)) {
            return char;
        }
    }
    return "";
}

const totalSumOfPriorities = inputArray
    .map(rucksack => getSharedElement(
        rucksack.substring(0, rucksack.length / 2), 
        rucksack.substring(rucksack.length / 2)
    ))
    .map(char => alphabet.indexOf(char) + 1)
    .reduce((acc, curr) => acc + curr);

console.log("total sum: ", totalSumOfPriorities)


