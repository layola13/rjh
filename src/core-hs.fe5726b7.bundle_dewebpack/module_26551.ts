import defineExport from './79227';
import getFunctionFromArray from './61259';
import isArray from './86761';

const nativeReverse = getFunctionFromArray<any[]>([].reverse);
const testArray = [1, 2];

defineExport({
  target: "Array",
  proto: true,
  forced: String(testArray) === String(testArray.reverse())
}, {
  reverse: function <T>(this: T[]): T[] {
    if (isArray(this)) {
      this.length = this.length;
    }
    return nativeReverse(this);
  }
});