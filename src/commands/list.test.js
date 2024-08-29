import listCmd from './list.js';
import * as directoryService from '../services/directoryService.js';

describe('List Command Test', () => {
    let getDirectoriesMock;

    beforeEach(() => {
        getDirectoriesMock = jest.spyOn(directoryService, 'getDirectories');
    });

    afterEach(() => {
        getDirectoriesMock.mockRestore();
    });

    it('should return an empty string when there are no directories', () => {
        getDirectoriesMock.mockReturnValue([]);
        const result = listCmd();
        expect(result).toBe('');
    });

    it('should return a formatted directory structure', () => {
        getDirectoriesMock.mockReturnValue([
            {
                name: 'a',
                children: [
                    {
                        name: 'b',
                        children: [
                            { name: 'c', children: [] },
                            { name: 'd', children: [] }
                        ]
                    },
                    {
                        name: 'e',
                        children: []
                    }
                ]
            }
        ]);

        const result = listCmd();
        const expectedOutput = `a\n  b\n    c\n    d\n  e\n`;
        expect(result).toBe(expectedOutput);
    });
});
