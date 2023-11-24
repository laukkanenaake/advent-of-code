import { Directory, getFiles } from "./helpers";

const currentDirectory = await getFiles();

let directoriesUnder100kSizes: number[] = [];

const getDirectorySize: (directory: Directory) => number = (directory: Directory) => {
    const directorySizes = Array.from(directory.directories).map(([key, directory]) => getDirectorySize(directory));
    const size = [...directory.files, ...directorySizes].reduce((acc, curr) => acc + curr);
    if (size < 100000) {
        directoriesUnder100kSizes.push(size)
    }
    return size;
}

getDirectorySize(currentDirectory);

const result = directoriesUnder100kSizes.reduce((acc, curr) => acc + curr);
console.log("result: ", result);
