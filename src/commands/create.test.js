import * as directoryService from '../services/directoryService.js';
import createCmd from './create.js';

describe('Create Command Test', () => {
    let addDirectoryMock;

    beforeEach(() => {
        addDirectoryMock = jest.spyOn(directoryService, 'addDirectory').mockImplementation(() => {});
    });

    afterEach(() => {
        addDirectoryMock.mockRestore();
    });

    it('should call addDirectory with the correct parameter', () => {
        const params = ['a/b/c'];
        createCmd(params);

        expect(addDirectoryMock).toHaveBeenCalledWith('a/b/c');
        expect(addDirectoryMock).toHaveBeenCalledTimes(1);
    });
});
