export function isCopyable(entity: Entity): boolean {
  let copyable = true;
  const contentType = entity.metadata?.contentType;
  
  if (contentType && HSCatalog.ContentTypeEnum.ext_Uncopyable.find((type) => contentType.isTypeOf(type))) {
    copyable = false;
  }
  
  return copyable;
}

export function isCuttable(entity: Entity): boolean {
  let cuttable = true;
  const contentType = entity.metadata?.contentType;
  
  if (contentType && HSCatalog.ContentTypeEnum.ext_Uncuttable.find((type) => contentType.isTypeOf(type))) {
    cuttable = false;
  }
  
  return cuttable;
}

interface Entity {
  metadata?: {
    contentType?: ContentType;
  };
}

interface ContentType {
  isTypeOf(type: unknown): boolean;
}

declare namespace HSCatalog {
  namespace ContentTypeEnum {
    const ext_Uncopyable: unknown[];
    const ext_Uncuttable: unknown[];
  }
}