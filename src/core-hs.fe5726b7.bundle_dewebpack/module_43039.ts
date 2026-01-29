import toObject from './72839';
import { add } from './68801';
import getSetRecord from './75673';
import getIteratorFlattenable from './84100';
import iterate from './29190';

export default function union<T>(iterable: Iterable<T>): Set<T> {
  const currentSet = toObject(this);
  const iterator = getIteratorFlattenable(iterable).getIterator();
  const setRecord = getSetRecord(currentSet);
  
  iterate(iterator, (element: T) => {
    add(setRecord, element);
  });
  
  return setRecord;
}