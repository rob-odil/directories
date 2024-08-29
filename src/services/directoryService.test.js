import { resetDirectories, getDirectories, addDirectory, moveDirectory, removeDirectory } from './directoryService.js';

describe('Directory Service Test', () => {
    beforeEach(() => {
        resetDirectories();
    });

    it('Should have an empty dir to start', () => {
        const directories = getDirectories();
        expect(directories).toBeInstanceOf(Array);
        expect(directories).toHaveLength(0);
    });

    it('Should be able to create a directory', () => {
        addDirectory('a/b/c');
        const directories = getDirectories();
        expect(directories).toEqual([
            {
                name: 'a', children: [
                    {
                        name: 'b', children: [
                            { name: 'c', children: [] }
                        ]
                    }
                ],
            }
        ]);
    });

    it('Should be able to create a sub directory', () => {
        addDirectory('a/b/c');
        addDirectory('a/b/d');
        const directories = getDirectories();
        expect(directories).toEqual([
            {
                name: 'a', children: [
                    {
                        name: 'b', children: [
                            { name: 'c', children: [] },
                            { name: 'd', children: [] }
                        ]
                    }
                ],
            }
        ]);
    });

    it('Should be able to move a sub directory', () => {
        addDirectory('a/b/c');
        addDirectory('z/x/y');
        moveDirectory('z/x', 'a/b/c');
        const directories = getDirectories();
        expect(directories).toEqual([
            {
                name: 'a',
                children: [
                    {
                        name: 'b',
                        children: [
                            {
                                name: 'c',
                                children: [
                                    {
                                        name: 'x',
                                        children: [
                                            {
                                                name: 'y',
                                                children: []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: 'z',
                children: []
            }
        ]);
    });

    it('Should throw error on move a non-existent sub directory', () => {
        addDirectory('a/b/c/d');
        expect(() => moveDirectory('a/c', 'a/b')).toThrow('Directory not found');
    });

    it('Should throw error on move to a non-existent sub directory', () => {
        addDirectory('a/b/c/d');
        expect(() => moveDirectory('a/b', 'a/c')).toThrow('Directory not found');
    });

    it('Should be able to remove a sub directory', () => {
        addDirectory('a/b/c/d');
        addDirectory('a/b/e/f');
        removeDirectory('a/b');
        const directories = getDirectories();
        expect(directories).toEqual([
            {
                name: 'a', children: [],
            }
        ]);
    });

    it('Should throw error on remove a non-existent sub directory', () => {
        addDirectory('a/b/c/d');
        expect(() => removeDirectory('a/c')).toThrow('Directory not found');
    });
});
