export class Runner<T = any> {
  public items: T[];
  private _name: string;
  private _aliasCount: number;

  constructor(name: string) {
    this.items = [];
    this._name = name;
    this._aliasCount = 0;
  }

  public emit(
    arg0?: unknown,
    arg1?: unknown,
    arg2?: unknown,
    arg3?: unknown,
    arg4?: unknown,
    arg5?: unknown,
    arg6?: unknown,
    arg7?: unknown
  ): this {
    if (arguments.length > 8) {
      throw new Error("max arguments reached");
    }

    const methodName = this.name;
    const items = this.items;

    this._aliasCount++;

    for (let index = 0, length = items.length; index < length; index++) {
      (items[index] as any)[methodName](arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
    }

    if (items === this.items) {
      this._aliasCount--;
    }

    return this;
  }

  public dispatch(
    arg0?: unknown,
    arg1?: unknown,
    arg2?: unknown,
    arg3?: unknown,
    arg4?: unknown,
    arg5?: unknown,
    arg6?: unknown,
    arg7?: unknown
  ): this {
    return this.emit(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
  }

  public run(
    arg0?: unknown,
    arg1?: unknown,
    arg2?: unknown,
    arg3?: unknown,
    arg4?: unknown,
    arg5?: unknown,
    arg6?: unknown,
    arg7?: unknown
  ): this {
    return this.emit(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
  }

  private ensureNonAliasedItems(): void {
    if (this._aliasCount > 0 && this.items.length > 1) {
      this._aliasCount = 0;
      this.items = this.items.slice(0);
    }
  }

  public add(item: T): this {
    if ((item as any)[this._name]) {
      this.ensureNonAliasedItems();
      this.remove(item);
      this.items.push(item);
    }
    return this;
  }

  public remove(item: T): this {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.ensureNonAliasedItems();
      this.items.splice(index, 1);
    }
    return this;
  }

  public contains(item: T): boolean {
    return this.items.indexOf(item) !== -1;
  }

  public removeAll(): this {
    this.ensureNonAliasedItems();
    this.items.length = 0;
    return this;
  }

  public destroy(): void {
    this.removeAll();
    this.items = null!;
    this._name = null!;
  }

  public get empty(): boolean {
    return this.items.length === 0;
  }

  public get name(): string {
    return this._name;
  }
}