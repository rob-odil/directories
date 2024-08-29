import readline from 'readline';
import { parseCommand, validateCommand, validateArgs } from './utils/commandTools.js';
import createCmd from './commands/create.js';
import deleteCmd from './commands/delete.js';
import listCmd from './commands/list.js';
import moveCmd from './commands/move.js';

const commands = {
    CREATE: createCmd,
    DELETE: deleteCmd,
    LIST: listCmd,
    MOVE: moveCmd,
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
});

rl.prompt();

rl.on('line', (input) => {
    try {
        const command = parseCommand(input);
        if (!validateCommand(command)) {
            throw new Error(`Invalid command '${command.commandName}'. Use one of CREATE, DELETE, LIST, or MOVE.`);
        }
        if (!validateArgs(command)) {
            throw new Error('Invalid args');
        }
        const output = commands[command.commandName](command.args);
        if (output) console.log(output);
    } catch (err) {
        console.error('Error:', err.message);
    }
    
    rl.prompt();
});

rl.on('close', () => {
    console.log('\nExiting directories');
    process.exit(0);
});
