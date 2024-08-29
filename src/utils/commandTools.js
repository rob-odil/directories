export const parseCommand = (commandInput) => {
    const command = commandInput.split(" ").filter(a => a);
    const commandName = command[0];
    const args = command.slice(1);
    return { commandName, args };
};

export const validateCommand = (command) => {
    const validCommands = ["CREATE", "LIST", "MOVE", "DELETE"];
    return validCommands.includes(command.commandName);
};

export const validateArgs = (command) => {
    const { args } = command;
    return args.every((arg) => {
        if (arg[0] === '/') return false;
        if (arg[arg.length - 1] === '/') return false;
        return arg.match(/^[a-zA-Z0-9_\-/]*[a-zA-Z0-9_\-]$/)
    });
};