interface TypeInfo {
  isVoid: boolean;
  name: string;
  argPackAdvance: number;
  fromWireType: () => void;
  toWireType: (context: unknown, value: unknown) => void;
}

function registerVoidType(typeId: unknown, rawTypeName: unknown): void {
  const typeName = convertRawTypeName(rawTypeName);
  
  registerType(typeId, {
    isVoid: true,
    name: typeName,
    argPackAdvance: 0,
    fromWireType: function(): void {},
    toWireType: function(context: unknown, value: unknown): void {}
  });
}

function registerType(typeId: unknown, typeInfo: TypeInfo): void {
  // Implementation depends on external registration system
}

function convertRawTypeName(rawName: unknown): string {
  // Implementation depends on external name conversion system
  return String(rawName);
}