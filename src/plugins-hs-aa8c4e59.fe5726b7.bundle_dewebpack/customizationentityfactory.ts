export class CustomizationEntityFactory {
  private static readonly _classMap: Map<string, new () => CustomizationEntity> = new Map();

  private constructor() {}

  static registerEntityCreator(type: string, creator: new () => CustomizationEntity): void {
    if (this._classMap.has(type)) {
      console.warn("duplicate register");
    }
    this._classMap.set(type, creator);
  }

  static createEntity<T>(type: string, data: unknown): T | undefined {
    const EntityConstructor = this._classMap.get(type);
    if (EntityConstructor) {
      return new EntityConstructor().accept(data) as T;
    }
    return undefined;
  }
}

interface CustomizationEntity {
  accept(data: unknown): unknown;
}