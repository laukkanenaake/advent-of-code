import { Directory, getFiles } from "./helpers";

const currentDirectory = await getFiles();

let directorySizesIncludingDirectories: number[] = [];
let directorySizesWithoutDirectories: number[] = [];

const getDirectorySize: (directory: Directory) => number = (
	directory: Directory,
) => {
	const directorySizes = Array.from(directory.directories).map(
		([key, directory]) => getDirectorySize(directory),
	);
	const sizeIncludingDirectories = [
		...directory.files,
		...directorySizes,
	].reduce((acc, curr) => acc + curr);
	const sizeWithoutDirectories = directory.files.length
		? directory.files.reduce((acc, curr) => acc + curr)
		: 0;
	directorySizesIncludingDirectories.push(sizeIncludingDirectories);
	directorySizesWithoutDirectories.push(sizeWithoutDirectories);
	return sizeIncludingDirectories;
};

getDirectorySize(currentDirectory);

const usedSpaceOnDisk = directorySizesWithoutDirectories.reduce(
	(acc, curr) => acc + curr,
);
const freeSpaceOnDisk = 70000000 - usedSpaceOnDisk;
const spaceRequiredForUpdate = 30000000 - freeSpaceOnDisk;

const result = directorySizesIncludingDirectories
	.filter((dirSize) => dirSize > spaceRequiredForUpdate)
	.sort((a, b) => a - b)
	.shift();

console.log("result: ", result);
