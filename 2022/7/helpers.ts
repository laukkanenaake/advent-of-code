export class Directory {
	directories: Map<string, Directory>;
	files: number[];
	parentDirectory?: Directory;

	constructor(parentDirectory?: Directory) {
		this.directories = new Map();
		this.files = [];
		this.parentDirectory = parentDirectory;
	}
}

export const getFiles: () => Promise<Directory> = async () => {
	const inputText = await Bun.file("input.txt").text();

	let currentDirectory = new Directory();

	inputText.split("\n$ ").forEach((line) => {
		if (line[0] === "c") {
			// change directory (cd)
			const dirName = line.substring(line.lastIndexOf(" ")).trim();
			if (dirName === "..") {
				currentDirectory =
					currentDirectory.parentDirectory ?? currentDirectory;
				return;
			}
			currentDirectory =
				currentDirectory.directories.get(dirName) ?? currentDirectory;
		} else {
			// list directory (ls)
			let directoryFiles: number[] = [];
			const contents = line.split("\n");
			contents.shift();
			contents.forEach((dirContent) => {
				const spaceIndex = dirContent.lastIndexOf(" ");
				if (dirContent[0] === "d") {
					const dirName = dirContent.substring(spaceIndex).trim();
					if (!currentDirectory.directories.has(dirName)) {
						currentDirectory.directories.set(
							dirName,
							new Directory(currentDirectory),
						);
					}
				} else {
					directoryFiles.push(
						parseInt(dirContent.substring(0, spaceIndex)),
					);
				}
			});
			currentDirectory.files = directoryFiles;
		}
	});

	// change to root directory
	while (currentDirectory.parentDirectory) {
		currentDirectory = currentDirectory.parentDirectory;
	}

	return currentDirectory;
};
