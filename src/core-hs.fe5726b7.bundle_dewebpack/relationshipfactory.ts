export class RelationshipFactory {
  createRelationshipModel(
    type: string | null | undefined,
    configRegister: { isAvailableType(type: string): boolean },
    options?: unknown
  ): Node | null {
    return type && configRegister.isAvailableType(type)
      ? new Node(type, configRegister, options)
      : null;
  }
}

interface Node {
  new (
    type: string,
    configRegister: { isAvailableType(type: string): boolean },
    options?: unknown
  ): Node;
}