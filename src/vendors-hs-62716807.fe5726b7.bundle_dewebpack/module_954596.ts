import transform from './module_326872';
import prepare from './module_187709';

export default function process<T>(input: T): unknown {
    return transform(prepare(input));
}