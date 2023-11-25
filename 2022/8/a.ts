const inputText = await Bun.file("input.txt").text();
const result = inputText
    .split("\n")
    .map(treeRow => (
        Array.from(treeRow)
    ))
    .map((treeRow, rowIndex, rowsArr) => (
        treeRow.filter((tree, treeIndex) => {
            if (
                rowIndex === 0 || 
                rowIndex === rowsArr.length - 1 || 
                treeIndex === 0 || 
                treeIndex === treeRow.length - 1
            ) {
                return true;
            }

            let visibleFromLeft = true;
            let visibleFromRight = true;
            let visibleFromUp = true;
            let visibleFromDown = true;

            for (let i = 0; i < treeIndex; i++) {
                if (treeRow[i] >= tree) {
                    visibleFromLeft = false;
                    break;
                }
            }
            
            for (let i = treeIndex + 1; i < treeRow.length; i++) {
                if (treeRow[i] >= tree) {
                    visibleFromRight = false;
                    break;
                }
            }

            for (let i = 0; i < rowIndex; i++) {
                if (rowsArr[i][treeIndex] >= tree) {
                    visibleFromUp = false;
                    break;
                }
            }

            for (let i = rowIndex + 1; i < rowsArr.length; i++) {
                if (rowsArr[i][treeIndex] >= tree) {
                    visibleFromDown = false;
                    break;
                }
            }

            return (visibleFromLeft || visibleFromRight || visibleFromUp || visibleFromDown)

        }).length
    ))
    .reduce((acc, curr) => acc + curr);

console.log("result: ", result);
    