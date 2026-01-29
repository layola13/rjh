import n from './module_7034';
import s from './module_7052';
import o from './module_5277';

export default function<T>(value: T): string[] | PropertyKey[] {
    return o(value) ? n(value, true) : s(value);
}