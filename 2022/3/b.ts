const inputText = await Bun.file("input.txt").text();

const inputArray = inputText.split('\n');
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const getSharedElement = (elfGroup: string[]) => {
    for (let char of elfGroup[0]) {
        if (elfGroup[1].includes(char) && elfGroup[2].includes(char)) {
            return char;
        }
    }
    return "";
}

const getElfGroups = () => {
    let elfGroups: string[][] = [];
    for (let i = 0; i < inputArray.length; i += 3) {
        elfGroups.push([
            inputArray[i],
            inputArray[i + 1],
            inputArray[i + 2],
        ])
    }
    return elfGroups;
}

const totalSumOfPriorities = getElfGroups()
    .map(elfGroup => getSharedElement(elfGroup))
    .map(char => alphabet.indexOf(char) + 1)
    .reduce((acc, curr) => acc + curr);

console.log("total sum: ", totalSumOfPriorities)


