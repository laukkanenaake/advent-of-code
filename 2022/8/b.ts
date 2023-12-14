const inputText = await Bun.file("input.txt").text();
const result =
	inputText
		.split("\n")
		.map((treeRow) => Array.from(treeRow))
		.map(
			(treeRow, rowIndex, rowsArr) =>
				treeRow
					.map((tree, treeIndex) => {
						let visibleTreesToLeft = 0;
						let visibleTreesToRight = 0;
						let visibleTreesToUp = 0;
						let visibleTreesToDown = 0;

						for (let i = 1; i <= treeIndex; i++) {
							const b = treeRow[treeIndex - i];
							if (b >= tree || i === treeIndex) {
								visibleTreesToLeft = i;
								break;
							}
						}

						for (let i = 1; i < treeRow.length - treeIndex; i++) {
							const b = treeRow[treeIndex + i];
							if (
								b >= tree ||
								i === treeRow.length - treeIndex - 1
							) {
								visibleTreesToRight = i;
								break;
							}
						}

						for (let i = 1; i <= rowIndex; i++) {
							const b = rowsArr[rowIndex - i][treeIndex];
							if (b >= tree || i === rowIndex) {
								visibleTreesToUp = i;
								break;
							}
						}

						for (let i = 1; i < rowsArr.length - rowIndex; i++) {
							const b = rowsArr[rowIndex + i][treeIndex];
							if (
								b >= tree ||
								i === rowsArr.length - rowIndex - 1
							) {
								visibleTreesToDown = i;
								break;
							}
						}

						return (
							visibleTreesToLeft *
							visibleTreesToRight *
							visibleTreesToUp *
							visibleTreesToDown
						);
					})
					.sort((a, b) => a - b)
					.pop() ?? 0,
		)
		.sort((a, b) => a - b)
		.pop() ?? 0;

console.log("result: ", result);
