import { InstanceData, Parameter, DataType } from './321465';
import { HSCore } from './635589';
import PolygonUtils from './565274';
import { Utils } from './919367';

interface Point2D {
  x: number;
  y: number;
  X?: number;
  Y?: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ContentMetadata {
  aliModelId?: string;
  categories?: string[];
  name?: string;
  images?: string[];
  v?: string;
  vId?: string;
  price?: number;
  XLength?: number;
  YLength?: number;
  ZLength?: number;
  profileSizeX?: number;
  profileSizeY?: number;
  profileSizeZ?: number;
  seekId?: string;
  textureURI?: string;
  tileSize_x?: number;
  tileSize_y?: number;
}

interface Content {
  seekId?: string;
  metadata?: ContentMetadata;
  Class?: string;
  contentType?: {
    _types: string[];
  };
  id: string;
  XLength: number;
  YLength: number;
  ZLength: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  parent?: {
    id: string;
  };
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  getMaterialList?: () => [string, { seekId: string }][];
}

interface CategoryData {
  seekId?: string;
  aliModelId?: string;
  categoryType?: string;
  displayName?: string;
  textureUrl?: string;
  brand?: string;
  brandId?: string;
  price?: number;
  size?: number[];
}

interface EntityTypeData {
  classType?: string;
  contentType?: string;
}

interface MaterialInfo {
  category?: {
    seekId?: string;
    aliModelId?: string;
    categoryType?: string;
    displayName?: string;
    textureUrl?: string;
    size?: number[];
    brand?: string;
    brandId?: string;
  };
}

interface MaterialsMap {
  [key: string]: {
    seekId: string;
  };
}

export function checkBelongTwoRooms(element: unknown): boolean {
  return HSCore.Util.Room.getRoomsContentIn(element).length > 1;
}

export function genCategoryDataFromContent(content: Content): CategoryData {
  const categoryData: CategoryData = {
    seekId: content.seekId,
    aliModelId: content.metadata?.aliModelId,
    categoryType: content.metadata?.categories?.join(', '),
    displayName: content.metadata?.name,
    textureUrl: content.metadata?.images?.[0],
    brand: content.metadata?.v,
    brandId: content.metadata?.vId,
    price: content.metadata?.price,
  };

  if (content.metadata) {
    let size: number[] = [
      content.metadata.XLength ?? 0,
      content.metadata.YLength ?? 0,
      content.metadata.ZLength ?? 0,
    ];

    if (
      content.metadata.hasOwnProperty('profileSizeX') &&
      typeof content.metadata.profileSizeX === 'number'
    ) {
      size = [
        content.metadata.profileSizeX,
        content.metadata.profileSizeY ?? 0,
        content.metadata.profileSizeZ ?? 0,
      ];
    }

    categoryData.size = Utils.formatNumberPoints(size);
  }

  return categoryData;
}

export function genEntityTypeFromContent(content: Content): EntityTypeData {
  return {
    classType: content.Class,
    contentType: content.contentType?._types.join(', '),
  };
}

export function genInstanceDataFromContent(content: Content): InstanceData {
  const instanceData = new InstanceData(content.id);
  const size = Utils.formatNumberPoints([
    content.XLength * content.XScale,
    content.YLength * content.YScale,
    content.ZLength * content.ZScale,
  ]);

  instanceData.addParameter(
    new Parameter('parentId', content.parent?.id, DataType.String),
    new Parameter(
      'center',
      Utils.formatNumberPoints([content.x, content.y, content.z]),
      DataType.ArrayPoint3D
    ),
    new Parameter(
      'rotation',
      [content.XRotation, content.YRotation, content.ZRotation],
      DataType.ArrayPoint3D
    ),
    new Parameter(
      'scale',
      [content.XScale, content.YScale, content.ZScale],
      DataType.ArrayPoint3D
    ),
    new Parameter('size', size, DataType.ArrayPoint3D),
    new Parameter('materials', getComponentMaterials(content))
  );

  if (content.metadata) {
    let metaSize: number[] = [
      content.metadata.XLength ?? 0,
      content.metadata.YLength ?? 0,
      content.metadata.ZLength ?? 0,
    ];

    if (content.metadata.XLength === undefined) {
      metaSize = size;
    }

    instanceData.addParameter(
      new Parameter('metaSize', Utils.formatNumberPoints(metaSize))
    );
  }

  return instanceData;
}

export function genMaterialInfoFromMeta(metadata?: ContentMetadata): MaterialInfo {
  if (!metadata) {
    return {};
  }

  return {
    category: {
      seekId: metadata.seekId,
      aliModelId: metadata.aliModelId,
      categoryType: metadata.categories?.join(', '),
      displayName: metadata.name,
      textureUrl: metadata.textureURI,
      size: Utils.formatNumberPoints([
        metadata.tileSize_x ?? 0,
        metadata.tileSize_y ?? 0,
      ]),
      brand: metadata.v,
      brandId: metadata.vId,
    },
  };
}

export function get2DPathLength(path: Point2D[], isClosed: boolean): number {
  const normalizePoint = (point: Point2D): { x: number; y: number } => ({
    x: point.X !== undefined ? point.X : point.x,
    y: point.Y !== undefined ? point.Y : point.y,
  });

  const pathCopy = path.slice();

  if (isClosed && !HSCore.Util.Math.isSamePoint(pathCopy[0], pathCopy[pathCopy.length - 1])) {
    pathCopy.push(pathCopy[0]);
  }

  let totalLength = 0;

  for (let i = 0; i < pathCopy.length - 1; i++) {
    const point1 = normalizePoint(pathCopy[i]);
    const point2 = normalizePoint(pathCopy[i + 1]);
    totalLength += HSCore.Util.Math.getDistance(point1, point2);
  }

  return Utils.formatNumberPoints(totalLength);
}

export function get3DPathLength(path: Point3D[], isClosed: boolean): number {
  const pathCopy = path.slice();

  if (isClosed && !HSCore.Util.Math.isSamePoint3(pathCopy[0], pathCopy[pathCopy.length - 1])) {
    pathCopy.push(pathCopy[0]);
  }

  let totalLength = 0;
  const pointCount = pathCopy.length - 1;

  for (let i = 0; i < pointCount; i++) {
    const point1 = pathCopy[i];
    const point2 = pathCopy[i + 1];
    totalLength += HSCore.Util.Math.getDistance3(point1, point2);
  }

  return Utils.formatNumberPoints(totalLength);
}

export function getArea(polygon: Point2D[]): number {
  return Utils.formatNumberPoints(Math.round(100 * PolygonUtils.getArea(polygon)) / 100);
}

export function getComponentMaterials(content: Content): MaterialsMap {
  const materials: MaterialsMap = {};

  if (!(content && content instanceof HSCore.Model.Content)) {
    return materials;
  }

  const materialList = content.getMaterialList?.() ?? [];

  for (let i = 0; i < materialList.length; i++) {
    const material = materialList[i];
    if (material.length === 2) {
      materials[material[0]] = {
        seekId: material[1].seekId,
      };
    }
  }

  return materials;
}

export function getEntityLayer(entity: unknown): typeof HSCore.Model.Layer | undefined {
  let current = entity;
  const visited = new Set();

  while (current) {
    if (visited.has(current)) {
      return undefined;
    }

    visited.add(current);

    if (current instanceof HSCore.Model.Layer) {
      return current;
    }

    current = (current as any).parent;
  }

  return undefined;
}

export function getParentId(entity: { getFirstParent: () => { id: string } | undefined }): string | undefined {
  const parent = entity.getFirstParent();
  return parent?.id;
}

export function getPathLength(
  path: Point3D[] | Point3D[][],
  isClosed: boolean = true
): number {
  let totalLength = 0;

  if (path[0] && Number.isFinite((path[0] as Point3D).x)) {
    return get3DPathLength(path as Point3D[], isClosed);
  }

  (path as Point3D[][]).forEach((subPath) => {
    totalLength += get3DPathLength(subPath, isClosed);
  });

  return Utils.formatNumberPoints(totalLength);
}