import * as directoryService from '../services/directoryService.js';
import deleteCmd from './delete.js';

describe('Delete Command Test', () => {
    let removeDirectoryMock;

    beforeEach(() => {
        removeDirectoryMock = jest.spyOn(directoryService, 'removeDirectory').mockImplementation(() => {});
    });

    afterEach(() => {
        removeDirectoryMock.mockRestore();
    });

    it('should call removeDirectory with the correct parameter', () => {
        const params = ['a/b/c'];
        deleteCmd(params);

        expect(removeDirectoryMock).toHaveBeenCalledWith('a/b/c');
        expect(removeDirectoryMock).toHaveBeenCalledTimes(1);
    });
});
