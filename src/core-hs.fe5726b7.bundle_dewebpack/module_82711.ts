import { proto } from './68801';
import moduleFunction from './12551';

export default moduleFunction(proto, "size", "get") || function (e: { size: number }): number {
    return e.size;
};