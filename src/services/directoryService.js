const directories = [];

function clone(nodes) {
    return nodes.map(node => ({
        name: node.name,
        children: clone(node.children)
    }));
}

export const getDirectories = () => {
    return clone(directories);
};

export const resetDirectories = () => {
    directories.length = 0;
};

export const addDirectory = (newDirectoryStr) => {
    const newDirectory = newDirectoryStr.split('/');
    var currentDirectory = directories;
    newDirectory.forEach((partialDirectory) => {
        const exist = currentDirectory.find((item) => item.name === partialDirectory);
        if (!exist) {
            const newDirectoryObj = { name: partialDirectory, children: [] };
            currentDirectory.push(newDirectoryObj);
            currentDirectory.sort((a, b) => a.name.localeCompare(b.name));
            currentDirectory = newDirectoryObj.children;
        } else {
            currentDirectory = exist.children;
        }
    });
};

export const moveDirectory = (oldDirectoryStr, newDirectoryStr) => {
    const oldDirectory = oldDirectoryStr.split('/');
    let oldCurrentDirectory = directories;
    let target = null;
    oldDirectory.forEach((partialDirectory) => {
        const exist = oldCurrentDirectory.find((item) => item.name === partialDirectory);
        if (!exist) {
            throw new Error('Directory not found');
        } else {
            target = exist;
            oldCurrentDirectory = exist.children;
        }
    });
    removeDirectory(oldDirectoryStr);

    const newDirectory = newDirectoryStr.split('/');
    let newCurrentDirectory = directories;
    newDirectory.forEach((partialDirectory) => {
        const exist = newCurrentDirectory.find((item) => item.name === partialDirectory);
        if (!exist) {
            throw new Error('Directory not found');
        } else {
            newCurrentDirectory = exist.children;
        }
    });
    newCurrentDirectory.push(target);
}

export const removeDirectory = (oldDirectoryStr) => {
    const oldDirectory = oldDirectoryStr.split('/');
    var currentDirectory = directories;
    var parent;
    for (let index = 0; index < oldDirectory.length; index++) {
        const partialDirectory = oldDirectory[index];
        const exist = currentDirectory.find((item) => item.name === partialDirectory);
        if (exist) {
            if (index === oldDirectory.length - 1) {
                const index = currentDirectory.indexOf(exist);
                currentDirectory.splice(index, 1);
            } else {
                parent = currentDirectory;
                currentDirectory = exist.children;
            }
        } else {
            throw new Error('Directory not found');
        }
    }
};