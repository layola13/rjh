interface TypeConfig {
  isVoid: boolean;
  name: string;
  argPackAdvance: number;
  fromWireType: () => void;
  toWireType: (context: unknown, value: unknown) => void;
}

function registerVoidType(typeId: unknown, typeName: string): void {
  const normalizedName = normalizeTypeName(typeName);
  
  const config: TypeConfig = {
    isVoid: true,
    name: normalizedName,
    argPackAdvance: 0,
    fromWireType: function(): void {},
    toWireType: function(context: unknown, value: unknown): void {}
  };
  
  registerType(typeId, config);
}