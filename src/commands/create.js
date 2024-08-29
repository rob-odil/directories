import { addDirectory } from '../services/directoryService.js';

export default (params) => {
    addDirectory(params[0]);
};