export default function listCacheClear<T = unknown>(this: { __data__: Array<[string, T]>; size: number }): void {
  this.__data__ = [];
  this.size = 0;
}