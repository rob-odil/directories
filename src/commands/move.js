import { moveDirectory } from '../services/directoryService.js';

export default (params) => {
    moveDirectory(params[0], params[1]);
};