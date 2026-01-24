import { HSCore } from './hscore-types';
import { InstanceData, Parameter, DataType } from './instance-types';
import { PolygonUtils } from './polygon-utils';

/**
 * 点坐标接口（2D）
 */
interface Point2D {
  x: number;
  y: number;
  X?: number;
  Y?: number;
}

/**
 * 点坐标接口（3D）
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 内容元数据接口
 */
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

/**
 * 内容对象接口
 */
interface Content {
  id: string;
  seekId?: string;
  metadata?: ContentMetadata;
  Class?: string;
  contentType?: {
    _types: string[];
  };
  parent?: {
    id: string;
  };
  x: number;
  y: number;
  z: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  getMaterialList?: () => [string, { seekId: string }][];
  getFirstParent?: () => { id: string } | null;
}

/**
 * 分类数据接口
 */
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

/**
 * 实体类型接口
 */
interface EntityType {
  classType?: string;
  contentType?: string;
}

/**
 * 材质信息接口
 */
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

/**
 * 材质映射表
 */
interface MaterialMap {
  [key: string]: {
    seekId: string;
  };
}

/**
 * 检查内容是否属于两个房间
 * @param content - 要检查的内容对象
 * @returns 如果内容属于多个房间则返回 true
 */
export function checkBelongTwoRooms(content: Content): boolean {
  return HSCore.Util.Room.getRoomsContentIn(content).length > 1;
}

/**
 * 从内容对象生成分类数据
 * @param content - 内容对象
 * @returns 格式化的分类数据
 */
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
    let dimensions: number[] = [
      content.metadata.XLength ?? 0,
      content.metadata.YLength ?? 0,
      content.metadata.ZLength ?? 0,
    ];

    if (
      content.metadata.hasOwnProperty('profileSizeX') &&
      typeof content.metadata.profileSizeX === 'number'
    ) {
      dimensions = [
        content.metadata.profileSizeX,
        content.metadata.profileSizeY ?? 0,
        content.metadata.profileSizeZ ?? 0,
      ];
    }

    categoryData.size = Utils.formatNumberPoints(dimensions);
  }

  return categoryData;
}

/**
 * 从内容对象生成实体类型
 * @param content - 内容对象
 * @returns 实体类型信息
 */
export function genEntityTypeFromContent(content: Content): EntityType {
  return {
    classType: content.Class,
    contentType: content.contentType?._types.join(', '),
  };
}

/**
 * 从内容对象生成实例数据
 * @param content - 内容对象
 * @returns 包含所有实例参数的实例数据对象
 */
export function genInstanceDataFromContent(content: Content): InstanceData {
  const instanceData = new InstanceData(content.id);

  const scaledSize = Utils.formatNumberPoints([
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
    new Parameter('size', scaledSize, DataType.ArrayPoint3D),
    new Parameter('materials', getComponentMaterials(content))
  );

  if (content.metadata) {
    let metaSize: number[] = [
      content.metadata.XLength ?? 0,
      content.metadata.YLength ?? 0,
      content.metadata.ZLength ?? 0,
    ];

    if (content.metadata.XLength === undefined) {
      metaSize = scaledSize;
    }

    instanceData.addParameter(
      new Parameter('metaSize', Utils.formatNumberPoints(metaSize))
    );
  }

  return instanceData;
}

/**
 * 从元数据生成材质信息
 * @param metadata - 内容元数据
 * @returns 材质信息对象
 */
export function genMaterialInfoFromMeta(
  metadata?: ContentMetadata
): MaterialInfo {
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

/**
 * 计算2D路径长度
 * @param path - 2D点数组
 * @param isClosed - 路径是否闭合（默认false）
 * @returns 格式化的路径长度
 */
export function get2DPathLength(
  path: Point2D[],
  isClosed = false
): number {
  const normalizePoint = (point: Point2D): Point2D => ({
    x: point.X !== undefined ? point.X : point.x,
    y: point.Y !== undefined ? point.Y : point.y,
  });

  const pathCopy = path.slice();

  if (
    isClosed &&
    !HSCore.Util.Math.isSamePoint(pathCopy[0], pathCopy[pathCopy.length - 1])
  ) {
    pathCopy.push(pathCopy[0]);
  }

  let totalLength = 0;
  for (let i = 0; i < pathCopy.length - 1; i++) {
    const currentPoint = normalizePoint(pathCopy[i]);
    const nextPoint = normalizePoint(pathCopy[i + 1]);
    totalLength += HSCore.Util.Math.getDistance(currentPoint, nextPoint);
  }

  return Utils.formatNumberPoints(totalLength);
}

/**
 * 计算3D路径长度
 * @param path - 3D点数组
 * @param isClosed - 路径是否闭合（默认true）
 * @returns 格式化的路径长度
 */
export function get3DPathLength(
  path: Point3D[],
  isClosed = true
): number {
  const pathCopy = path.slice();

  if (
    isClosed &&
    !HSCore.Util.Math.isSamePoint3(pathCopy[0], pathCopy[pathCopy.length - 1])
  ) {
    pathCopy.push(pathCopy[0]);
  }

  let totalLength = 0;
  const segmentCount = pathCopy.length - 1;

  for (let i = 0; i < segmentCount; i++) {
    const currentPoint = pathCopy[i];
    const nextPoint = pathCopy[i + 1];
    totalLength += HSCore.Util.Math.getDistance3(currentPoint, nextPoint);
  }

  return Utils.formatNumberPoints(totalLength);
}

/**
 * 计算多边形面积
 * @param polygon - 多边形顶点数组
 * @returns 格式化的面积值（保留两位小数）
 */
export function getArea(polygon: Point2D[]): number {
  const area = PolygonUtils.getArea(polygon);
  return Utils.formatNumberPoints(Math.round(100 * area) / 100);
}

/**
 * 获取组件的材质列表
 * @param content - 内容对象
 * @returns 材质映射表
 */
export function getComponentMaterials(content: Content): MaterialMap {
  const materials: MaterialMap = {};

  if (!(content && content instanceof HSCore.Model.Content)) {
    return materials;
  }

  const materialList = content.getMaterialList?.() ?? [];

  for (let i = 0; i < materialList.length; i++) {
    const materialEntry = materialList[i];
    if (materialEntry.length === 2) {
      materials[materialEntry[0]] = {
        seekId: materialEntry[1].seekId,
      };
    }
  }

  return materials;
}

/**
 * 获取实体所在的图层
 * @param entity - 实体对象
 * @returns 图层对象，如果未找到则返回 undefined
 */
export function getEntityLayer(
  entity: Content
): HSCore.Model.Layer | undefined {
  let currentEntity: Content | HSCore.Model.Layer | null = entity;
  const visitedEntities = new Set<Content | HSCore.Model.Layer>();

  while (currentEntity) {
    if (visitedEntities.has(currentEntity)) {
      return undefined;
    }

    visitedEntities.add(currentEntity);

    if (currentEntity instanceof HSCore.Model.Layer) {
      return currentEntity;
    }

    currentEntity = currentEntity.parent as Content | HSCore.Model.Layer | null;
  }

  return undefined;
}

/**
 * 获取父级ID
 * @param content - 内容对象
 * @returns 父级ID，如果没有父级则返回 undefined
 */
export function getParentId(content: Content): string | undefined {
  const parent = content.getFirstParent?.();
  return parent?.id;
}

/**
 * 计算路径长度（支持2D和3D路径）
 * @param path - 点数组或点数组的数组
 * @param isClosed - 路径是否闭合（默认true）
 * @returns 格式化的路径长度
 */
export function getPathLength(
  path: Point3D[] | Point3D[][],
  isClosed = true
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

/**
 * 工具类命名空间
 */
namespace Utils {
  /**
   * 格式化数字或数字数组
   * @param value - 数字或数字数组
   * @returns 格式化后的值
   */
  export function formatNumberPoints(value: number | number[]): any {
    // 实现省略，依赖外部工具类
    return value;
  }
}