const file = Bun.file("input.txt");
const inputText = await file.text();
const inputArray = inputText.split('\n');
inputArray.slice()

let caloriesOnCurrentElf = 0;
let topThreeElvesCaloriesAmounts = [0, 0, 0];
inputArray.forEach(calory => {
    if (calory !== "") {
        caloriesOnCurrentElf += parseInt(calory);
        return;
    }

    const isElfInTopThree = topThreeElvesCaloriesAmounts.some(calories => calories < caloriesOnCurrentElf);
    if (!isElfInTopThree) {
        caloriesOnCurrentElf = 0;
        return;
    }
        
    let newTopThree = [...topThreeElvesCaloriesAmounts];
    for (let i = 0; i < 3; i++) {
        if (caloriesOnCurrentElf > topThreeElvesCaloriesAmounts[i]) {
            newTopThree[i] = caloriesOnCurrentElf;
            for (let j = i + 1; j < 3; j++) {
                newTopThree[j] = topThreeElvesCaloriesAmounts[j - 1];
            }
            break;
        }
    }

    topThreeElvesCaloriesAmounts = newTopThree;
    caloriesOnCurrentElf = 0;
    
});

const sumOfTopThree = topThreeElvesCaloriesAmounts.reduce((prev, curr) => prev + curr);

console.log("sum of the calories of the top three elves with the most calories: ", sumOfTopThree);

