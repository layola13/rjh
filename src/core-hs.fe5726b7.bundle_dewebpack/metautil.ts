interface MetaData {
  version: string;
  data?: Entity[];
  products?: Product[];
  meta?: {
    version: string;
  };
}

interface Entity {
  l?: string;
  Class?: string;
  seekId?: string;
  material?: MaterialReference;
  paintData?: {
    mixpaint?: {
      data?: PaintData;
    };
  };
  mixpaint?: {
    data?: PaintData;
  };
  templateInfo?: {
    materials?: Record<string, MaterialReference>;
  };
  boundaryMaterial?: MaterialReference;
  cornerMaterial?: MaterialReference;
}

interface MaterialReference {
  id?: string;
  seekId?: string;
}

interface Product {
  id?: string;
  seekId?: string;
  productType?: string;
  [key: string]: unknown;
}

interface PaintData {
  type?: string;
  backgroundMaterial?: MaterialReference;
  paints?: Paint[];
  boundaries?: Boundary[];
}

interface Paint {
  material?: MaterialReference;
  grid?: {
    gridPolygons?: GridPolygon[];
  };
  pattern?: string | PatternReference;
  waistline?: {
    waistlinePolygons?: Paint[];
  };
}

interface GridPolygon {
  material?: MaterialReference;
  originalMaterial?: MaterialReference;
}

interface PatternReference {
  seekId?: string;
}

interface Boundary {
  wallPolygons: WallPolygon[];
  wallCorners: WallCorner[];
}

interface WallPolygon {
  material?: MaterialReference;
}

interface WallCorner {
  material?: MaterialReference;
}

interface Material {
  [key: string]: unknown;
}

enum ProductTypeEnum {
  PAssemblyPackage = 'PAssemblyPackage',
  DAssembly = 'DAssembly'
}

enum OriginalMetaCreatorType {
  TPZZ = 'TPZZ'
}

enum MetaCreatorType {
  TPZZ = 'TPZZ'
}

const logger = log.logger('MetaUtil');

const PaveMetaPrefix = 'pave_meta_';

function createPaveMetaUUID(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

function getRefreshMaterialSeekIds(metaData: MetaData): string[] {
  const seekIdSet = new Set<string>();
  const meta = metaData?.meta;
  
  if (meta && HSCore.Util.Version.isEarlierThan(meta.version, '0.29')) {
    const materialShortName = HSConstants.ClassLNameToSName.get(HSConstants.ModelClass.NgMaterial);
    
    for (const entity of metaData.data ?? []) {
      const entityClass = entity.l || entity.Class;
      const seekId = entity.seekId;
      
      switch (entityClass) {
        case materialShortName:
        case HSConstants.ModelClass.NgMaterial:
          if (HSCore.Util.Entity.isValidSeekId(seekId)) {
            seekIdSet.add(seekId);
          }
          break;
      }
    }
  }
  
  return Array.from(seekIdSet);
}

function getFreshIds(metaData: MetaData): string[] {
  if (!metaData?.products) {
    return [];
  }
  
  let freshIds: string[] = [];
  
  metaData.products.forEach((product) => {
    const shouldInclude = isValidProduct(product);
    
    if (shouldInclude) {
      const productId = product.id || product.seekId;
      if (productId) {
        freshIds.push(productId);
      }
    }
  });
  
  if (HSCore.Util.Version.isEarlierThan(metaData.meta.version, '0.28')) {
    collectPaveIds(metaData, freshIds);
  }
  
  const materialSeekIds = getRefreshMaterialSeekIds(metaData);
  freshIds = freshIds.concat(materialSeekIds);
  freshIds = freshIds.filter(HSCore.Util.Entity.isValidSeekId);
  
  return freshIds;
}

function isValidProduct(product: Product): boolean {
  const excludedTypes = [ProductTypeEnum.PAssemblyPackage];
  
  if (product && excludedTypes.includes(product.productType as ProductTypeEnum)) {
    return false;
  }
  
  return HSCore.Util.Entity.isValidSeekId(product.id || product.seekId);
}

async function getProductsMap(seekIds: string[]): Promise<Map<string, Product>> {
  const productsMap = new Map<string, Product>();
  const manager = r.Manager.instance();
  const products = await manager.getProductsBySeekIds(seekIds, true, true);
  
  Object.entries(products).forEach(([seekId, product]) => {
    productsMap.set(seekId, product);
  });
  
  return productsMap;
}

async function getDesignProductsMap(encodedContent: string, decryptionKey?: string): Promise<Map<string, Product>> {
  const productsMap = new Map<string, Product>();
  
  if (!encodedContent) {
    return productsMap;
  }
  
  const decodedContent = HSCore.Util.DocCrypto.toDecodeContent(encodedContent, decryptionKey);
  
  const normalizeSeekId = (id?: string, fallbackId?: string): string => {
    if (!id || typeof id !== 'string') {
      return fallbackId || '';
    }
    
    let normalizedId = id;
    const idParts = id.split('/');
    
    if (idParts.length >= 3) {
      normalizedId = idParts[2];
    }
    
    return normalizedId || '';
  };
  
  if (!decodedContent?.products) {
    return productsMap;
  }
  
  const isEmptyProduct = (product: Product): boolean => {
    const keys = Object.keys(product);
    keys.sort();
    return JSON.stringify(['id', 'seekId']) === JSON.stringify(keys);
  };
  
  for (const product of decodedContent.products) {
    const seekId = normalizeSeekId(product.id, product.seekId);
    
    if (seekId && !productsMap.get(seekId) && !isEmptyProduct(product)) {
      if (product.productType === ProductTypeEnum.DAssembly) {
        const metaWrapper = {
          data: product,
          version: decodedContent.meta.version
        };
        
        const productInstance = r.Manager.instance().getProductBySeekIdSync(
          seekId,
          metaWrapper,
          OriginalMetaCreatorType.TPZZ,
          MetaCreatorType.TPZZ
        );
        
        productsMap.set(seekId, productInstance);
      } else {
        const productInstance = r.Manager.instance().getProductBySeekIdSync(seekId, { data: product });
        productsMap.set(seekId, productInstance);
      }
    }
  }
  
  const freshIds = getFreshIds(decodedContent);
  const freshProductsMap = await getProductsMap(freshIds);
  
  for (const [seekId, freshProduct] of freshProductsMap.entries()) {
    const existingProduct = productsMap.get(seekId);
    
    if (existingProduct) {
      Object.assign(existingProduct, freshProduct);
    } else {
      productsMap.set(seekId, freshProduct);
    }
  }
  
  for (const product of decodedContent.products) {
    const seekId = normalizeSeekId(product.id, product.seekId);
    
    if (seekId && !productsMap.get(seekId)) {
      logger.warning(`Failed to get meta of ${seekId}`);
    }
  }
  
  return productsMap;
}

function collectPaveIds(metaData: MetaData, targetIds: string[]): void {
  if (!metaData?.data) {
    return;
  }
  
  metaData.data.forEach((entity) => {
    if (
      entity.Class === HSConstants.ModelClass.Polygon ||
      entity.Class === HSConstants.ModelClass.Region ||
      entity.Class === HSConstants.ModelClass.MixBlock
    ) {
      if (entity.material) {
        const materialId = entity.material.seekId || entity.material.id;
        
        if (materialId && materialId !== HSCore.Material.MaterialIdEnum.generated && !targetIds.includes(materialId)) {
          targetIds.push(materialId);
        }
      }
    } else if (entity.Class === HSConstants.ModelClass.NgMaterial) {
      const paintData = entity.paintData?.mixpaint;
      
      if (!entity.mixpaint && paintData?.data && paintData.data.type !== 'normal') {
        collectPaintDataIds(paintData.data, targetIds);
      }
    } else if (entity.l === 'WatJTile' || entity.Class === HSConstants.ModelClass.WaterJetTile) {
      const materials = entity.templateInfo?.materials;
      
      if (materials) {
        Object.values(materials).forEach((material) => {
          if (material.id) {
            targetIds.push(material.id);
          }
        });
      }
    } else if (entity.Class === HSConstants.ModelClass.Boundary && HSCore.Util.Version.isEarlierThan(metaData.meta.version, '0.14')) {
      const boundaryMaterialId = entity.boundaryMaterial?.seekId;
      if (boundaryMaterialId) {
        targetIds.push(boundaryMaterialId);
      }
      
      const cornerMaterialId = entity.cornerMaterial?.seekId;
      if (cornerMaterialId) {
        targetIds.push(cornerMaterialId);
      }
    }
  });
}

function collectPaintDataIds(paintData: PaintData, targetIds: string[]): void {
  const addMaterialId = (material?: MaterialReference, ids: string[]): void => {
    if (material) {
      const materialId = material.seekId || material.id;
      
      if (materialId && materialId !== HSCore.Material.MaterialIdEnum.generated && !ids.includes(materialId)) {
        ids.push(materialId);
      }
    }
  };
  
  addMaterialId(paintData.backgroundMaterial, targetIds);
  
  const paints = paintData.paints;
  
  if (!paints || !Array.isArray(paints)) {
    return;
  }
  
  const processPaint = (paint: Paint, ids: string[]): void => {
    addMaterialId(paint.material, ids);
    
    if (paint.grid?.gridPolygons) {
      for (const gridPolygon of paint.grid.gridPolygons) {
        addMaterialId(gridPolygon.material || gridPolygon.originalMaterial, ids);
      }
    }
    
    if (paint.pattern) {
      const patternType = typeof paint.pattern;
      const patternId = patternType === 'object' 
        ? (paint.pattern as PatternReference).seekId 
        : patternType === 'string' 
        ? paint.pattern 
        : undefined;
      
      if (patternId && !ids.includes(patternId)) {
        ids.push(patternId);
      }
    }
  };
  
  for (let index = 0, length = paints.length; index < length; ++index) {
    const paint = paints[index];
    
    processPaint(paint, targetIds);
    
    if (paint.waistline?.waistlinePolygons && Array.isArray(paint.waistline.waistlinePolygons)) {
      const waistlinePolygons = paint.waistline.waistlinePolygons;
      
      for (let waistlineIndex = 0, waistlineLength = waistlinePolygons.length; waistlineIndex < waistlineLength; ++waistlineIndex) {
        processPaint(waistlinePolygons[waistlineIndex], targetIds);
      }
    }
  }
  
  const boundaries = paintData.boundaries;
  
  if (boundaries) {
    boundaries.forEach((boundary) => {
      addMaterialId(boundary.wallPolygons[0]?.material, targetIds);
      addMaterialId(boundary.wallCorners[0]?.material, targetIds);
    });
  }
}

function createPaveMetaFromGeneratedMaterial(material: Material): Product {
  const metaId = `${PaveMetaPrefix}${createPaveMetaUUID()}`;
  const metaData = n.Util._getMetaDataFromMaterial(material);
  
  metaData.id = metaId;
  metaData.seekId = metaId;
  
  return r.Manager.instance().getProductBySeekIdSync(metaId, { data: metaData });
}

export const MetaUtil = {
  getRefreshMaterialSeekIds,
  getFreshIds,
  getProductsMap,
  getDesignProductsMap,
  collectPaveIds,
  collectPaintDataIds,
  createPaveMetaFromGeneratedMaterial
};