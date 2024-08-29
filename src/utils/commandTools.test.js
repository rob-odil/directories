import { parseCommand, validateCommand, validateArgs } from './commandTools.js';

describe('Command Tools Test', () => {
    describe('parseCommand', () => {
        it('should correctly parse a command with no arguments', () => {
            const commandInput = 'CREATE';
            const result = parseCommand(commandInput);
            expect(result).toEqual({
                commandName: 'CREATE',
                args: []
            });
        });

        it('should correctly parse a command with arguments', () => {
            const commandInput = 'MOVE a/b/c d/e/f';
            const result = parseCommand(commandInput);
            expect(result).toEqual({
                commandName: 'MOVE',
                args: ['a/b/c', 'd/e/f']
            });
        });

        it('should correctly parse a command with multiple spaces', () => {
            const commandInput = 'LIST    a/b/c   d/e/f';
            const result = parseCommand(commandInput);
            expect(result).toEqual({
                commandName: 'LIST',
                args: ['a/b/c', 'd/e/f']
            });
        });
    });

    describe('validateCommand', () => {
        it('should return true for a valid command', () => {
            const command = { commandName: 'CREATE' };
            const result = validateCommand(command);
            expect(result).toBe(true);
        });

        it('should return false for an invalid command', () => {
            const command = { commandName: 'INVALID' };
            const result = validateCommand(command);
            expect(result).toBe(false);
        });
    });

    describe('validateArgs', () => {
        it('should return true for valid arguments', () => {
            const command = { args: ['a/b/c', 'd/e/f'] };
            const result = validateArgs(command);
            expect(result).toBe(true);
        });

        it('should return false for arguments with leading slash', () => {
            const command = { args: ['/a/b/c', 'd/e/f'] };
            const result = validateArgs(command);
            expect(result).toBe(false);
        });

        it('should return false for arguments with trailing slash', () => {
            const command = { args: ['a/b/c/', 'd/e/f'] };
            const result = validateArgs(command);
            expect(result).toBe(false);
        });

        it('should return false for arguments with invalid characters', () => {
            const command = { args: ['a/b/c*', 'd/e/f'] };
            const result = validateArgs(command);
            expect(result).toBe(false);
        });

        it('should return true for arguments with valid characters', () => {
            const command = { args: ['a-b_c', 'd/e/f'] };
            const result = validateArgs(command);
            expect(result).toBe(true);
        });
    });
});
