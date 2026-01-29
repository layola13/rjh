import { concatAll } from './concatAll';
import { popScheduler } from './popScheduler';
import { from } from './from';

export function concat<T>(...sources: Array<any>): any {
    const scheduler = popScheduler(sources);
    return concatAll()(from(sources, scheduler));
}