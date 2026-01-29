type CommitCallback<K, V> = (context: DataContext<K, V>) => void;

class DataContext<K = unknown, V = unknown> {
  private commitCallbackFunc?: CommitCallback<K, V>;
  private dataMap: Map<K, V>;

  constructor(commitCallbackFunc: CommitCallback<K, V>) {
    this.commitCallbackFunc = commitCallbackFunc;
    this.dataMap = new Map();
  }

  addData(key: K, value: V): void {
    this.dataMap.set(key, value);
  }

  getData(key: K): V | undefined {
    return this.dataMap.get(key);
  }

  commit(): void {
    if (this.commitCallbackFunc) {
      const callback = this.commitCallbackFunc;
      this.commitCallbackFunc = undefined;
      callback(this);
    }
    this.destroy();
  }

  destroy(): void {
    this.commitCallbackFunc = undefined;
    this.dataMap.clear();
  }
}

export default DataContext;