const inputFile = await Bun.file("input.txt").text();

const [originalStacksString, moves] = inputFile.split("\n\n");

const crateStacksCount = parseInt(originalStacksString[originalStacksString.length - 2]);

const stacks = (new Array(crateStacksCount)).fill("").map((stack, i) => (
    originalStacksString
        .split("\n")
        .map(crateLine => crateLine[1 + 4 * i])
        .filter((crate, index, arr) => crate !== " " && index !== arr.length - 1)
));

moves.split("\n").forEach(move => {

    const [amount, fromStack, toStack] = move
        .split(/move|from|to| /)
        .filter(char => char !== "")
        .map(number => parseInt(number));

    for (let i = 0; i < amount; i++) {
        const crate = stacks[fromStack - 1].shift();
        if (crate) {
            stacks[toStack - 1].unshift(crate);
        }
    }

})

const answer = stacks.map(stack => stack[0]).join("");
console.log(answer);
