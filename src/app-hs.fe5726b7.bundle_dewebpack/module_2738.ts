class TypeIdManager {
  private _typeMaxId: Map<string, number>;
  private _typeEntityIdMaps: Map<string, string>;
  private _entityTypeIdMaps: Map<string, string>;

  constructor() {
    this._typeMaxId = new Map();
    this._typeEntityIdMaps = new Map();
    this._entityTypeIdMaps = new Map();
  }

  /**
   * Generate a unique type ID for the given type and entity ID
   * @param type - The type string
   * @param entityId - The entity identifier
   * @returns The generated type ID in format "type/number"
   */
  generateTypeId(type: string, entityId: string): string {
    const currentMaxId = this._typeMaxId.get(type) ?? 0;
    const newId = currentMaxId + 1;
    this._typeMaxId.set(type, newId);
    
    const typeId = `${type}/${newId}`;
    
    this._typeEntityIdMaps.set(typeId, entityId);
    this._entityTypeIdMaps.set(entityId, typeId);
    
    return typeId;
  }

  /**
   * Get entity ID by type ID
   * @param typeId - The type ID to lookup
   * @returns The entity ID if found, undefined otherwise
   */
  getEntityId(typeId: string): string | undefined {
    return this._typeEntityIdMaps.get(typeId);
  }

  /**
   * Get type ID by entity ID
   * @param entityId - The entity ID to lookup
   * @returns The type ID if found, undefined otherwise
   */
  getTypeId(entityId: string): string | undefined {
    return this._entityTypeIdMaps.get(entityId);
  }

  /**
   * Get a snapshot of current type max IDs
   * @returns A new Map containing the current state
   */
  getSnapshot(): Map<string, number> {
    return new Map(this._typeMaxId);
  }

  /**
   * Reset all internal state
   */
  reset(): void {
    this._typeMaxId.clear();
    this._typeEntityIdMaps.clear();
    this._entityTypeIdMaps.clear();
  }
}

export const P = new TypeIdManager();