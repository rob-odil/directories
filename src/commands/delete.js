import { removeDirectory } from '../services/directoryService.js';

export default (params) => {
    removeDirectory(params[0]);
};