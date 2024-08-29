import * as directoryService from '../services/directoryService.js';
import moveCmd from './move.js';

describe('Move Command Test', () => {
    let moveDirectoryMock;

    beforeEach(() => {
        moveDirectoryMock = jest.spyOn(directoryService, 'moveDirectory').mockImplementation(() => {});
    });

    afterEach(() => {
        moveDirectoryMock.mockRestore();
    });

    it('should call moveDirectory with the correct parameter', () => {
        const params = ['a/b/c', 'a/b/c/d'];
        moveCmd(params);

        expect(moveDirectoryMock).toHaveBeenCalledWith('a/b/c', 'a/b/c/d');
        expect(moveDirectoryMock).toHaveBeenCalledTimes(1);
    });
});
