import { getDirectories } from '../services/directoryService.js';


// recursive depth first iteration
const listCmd = (directories, depth) => {
    let result = '';
    for (let i = 0; i < directories.length; i++) {
        const directory = directories[i];
        result += `${' '.repeat(depth * 2)}${directory.name}\n`;
        if (directory.children.length > 0) {
            result += listCmd(directory.children, depth + 1);
        }
    }
    return result;
};

export default () => {
    const directories = getDirectories();
    return listCmd(directories, 0);
};