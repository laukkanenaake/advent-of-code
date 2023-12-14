const file = Bun.file("input.txt");
const inputText = await file.text();
const inputArray = inputText.split("\n");
inputArray.slice();

let mostCaloriesOnElf = 0;
let caloriesOnCurrentElf = 0;
inputArray.forEach((calory, index) => {
	if (calory === "") {
		if (caloriesOnCurrentElf > mostCaloriesOnElf) {
			mostCaloriesOnElf = caloriesOnCurrentElf;
		}
		caloriesOnCurrentElf = 0;
		return;
	}
	caloriesOnCurrentElf += parseInt(calory);
});

console.log("most calories on elf: ", mostCaloriesOnElf);
