export class Component {
  private _referObject: unknown;

  constructor() {}

  set referObject(value: unknown) {
    this._referObject = value;
  }

  get type(): string {
    return (Component as any).Type;
  }

  refs(): void {}

  clone(): Component {
    return new Component();
  }

  dump(): { tp: string } {
    return {
      tp: ""
    };
  }
}