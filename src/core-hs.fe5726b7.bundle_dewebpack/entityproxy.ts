export enum EntityProxyTypeEnum {
  CustomizationProduct = "Customization-Product-Proxy-ID",
  CustomizedPMInstance = "CustomizedPMInstanceModel-Proxy-ID",
}

export interface EntitySizeLimitation {
  // Define specific properties based on your domain requirements
}

export class EntityProxyObject {
  getEntitySizeLimitation(entity: unknown): EntitySizeLimitation {
    return {};
  }
}

type ProxyObjectEntry = [EntityProxyObject, unknown];

export class EntityProxyFactory {
  private static _proxyObjectById = new Map<string, ProxyObjectEntry>();

  static registerProxyObject(
    id: string,
    proxyObject: EntityProxyObject,
    metadata: unknown
  ): void {
    this._proxyObjectById.set(id, [proxyObject, metadata]);
  }

  static getProxyObject(id: string): EntityProxyObject | undefined {
    const entry = this._proxyObjectById.get(id);
    return entry?.[0];
  }
}