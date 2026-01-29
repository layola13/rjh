import clone from './module_3532';
import getSymbols from './module_4847';

export default function cloneSymbols<T extends object>(source: T, target: T): T {
    return clone(source, getSymbols(source), target);
}