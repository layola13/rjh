import { groupBy } from './utils/groupBy';
import { HSPaveSDK } from './HSPaveSDK';
import { Utils } from './Utils';
import { ParameterNames } from './ParameterNames';

interface Vector2D {
  data: number[];
}

interface PathData {
  outer: number[][];
  holes: number[][][];
}

interface TypeInfo {
  classType?: string;
  [key: string]: unknown;
}

interface CategoryInfo {
  seekId?: string;
  [key: string]: unknown;
}

interface InstanceData {
  id: string;
  parentId?: string;
  center?: unknown;
  rotation?: unknown;
  scale?: unknown;
  size?: unknown;
  path?: unknown;
  area?: unknown;
  [key: string]: unknown;
}

interface Bom3Entity {
  type?: TypeInfo;
  category?: CategoryInfo;
  instance: InstanceData;
}

interface ContentsInfo {
  type?: TypeInfo;
  category?: CategoryInfo;
  count: number;
  instances: InstanceData[];
}

interface GroupedEntities<T> {
  entities: T[];
}

interface Entity {
  type: TypeInfo;
  category?: CategoryInfo;
  getInstanceId(): string;
  getId(): string;
  prefix?: string;
  traverse(callback: (entity: Entity) => boolean): void;
  getParameterValue(parameterName: string): unknown;
}

interface Bom3DataBuilder {
  buildBom3Data(entity: Entity): unknown[] | null;
}

interface SketchRegion {
  entity: Bom3Entity;
  regions: unknown[];
}

interface TurnPaveEntityResult {
  sketches: SketchRegion[];
  waterJets: unknown[];
}

interface Region {
  outer: unknown;
  holes: unknown[];
}

interface TurnEntityOptions {
  ignoreType?: boolean;
  ignoreCategory?: boolean;
}

interface ParameterMapping {
  [parameterName: string]: string;
}

export function formatNumberPoints(points: unknown): unknown {
  return Utils.formatNumberPoints(points);
}

export function genBom3DataFromGroup(
  groupMap: Map<string, Entity[]>,
  groupKey: string,
  builder: Bom3DataBuilder
): unknown[] {
  if (!groupMap.has(groupKey)) {
    return [];
  }

  return groupMap.get(groupKey)!.map((entity) => builder.buildBom3Data(entity));
}

export function genContentsInfo(entities: Entity[]): ContentsInfo[] {
  const grouped = groupBy(entities, (entity) => entity.category?.seekId);

  return grouped.map((group: GroupedEntities<Entity>) => {
    const info: ContentsInfo = {} as ContentsInfo;
    const firstEntity = turnEntityToBom3Entity(group.entities[0]);

    info.type = firstEntity.type;
    info.category = firstEntity.category;
    info.count = group.entities.length;
    info.instances = group.entities.map((entity) =>
      turnEntityToBom3Entity(entity, {
        ignoreType: true,
        ignoreCategory: true,
      }).instance
    );

    return info;
  });
}

export function getPathToXY(regions: Region[], clipRegion?: unknown): PathData[] {
  const result: PathData[] = [];
  const processedRegions = clipRegion
    ? HSPaveSDK.ClipperService.ins.clip(regions, clipRegion, HSPaveSDK.ClipMode.Inter)
    : regions;

  processedRegions.forEach((region) => {
    const outer = HSPaveSDK.MathService.ins
      .getVectorsFromCurves(region.outer)
      .map((vector: Vector2D) => vector.data);

    const holes = region.holes.map((hole) =>
      HSPaveSDK.MathService.ins
        .getVectorsFromCurves(hole)
        .map((vector: Vector2D) => vector.data)
    );

    result.push({ outer, holes });
  });

  return result;
}

export function setObjectParameterValues(
  target: Record<string, unknown>,
  entity: Entity,
  parameterMapping: ParameterMapping,
  strictMode = false
): void {
  for (const parameterName in parameterMapping) {
    setParameterValue(target, parameterMapping[parameterName], entity, parameterName, strictMode);
  }
}

export function turnEntityToBom3Entity(
  entity: Entity,
  options?: TurnEntityOptions
): Bom3Entity {
  const result: Bom3Entity = {
    instance: {
      id: entity.getInstanceId(),
    },
  };

  setObjectParameterValues(
    result.instance,
    entity,
    {
      [ParameterNames.parentId]: 'parentId',
      [ParameterNames.center]: 'center',
      [ParameterNames.rotation]: 'rotation',
      [ParameterNames.scale]: 'scale',
      [ParameterNames.size]: 'size',
      [ParameterNames.path]: 'path',
      [ParameterNames.area]: 'area',
    }
  );

  const shouldIgnoreType = options?.ignoreType ?? false;
  const shouldIgnoreCategory = options?.ignoreCategory ?? false;

  if (!shouldIgnoreType) {
    result.type = { ...entity.type };
  }

  if (!shouldIgnoreCategory) {
    result.category = entity.category ? { ...entity.category } : {};
  }

  return result;
}

export function turnEntityToBom3EntityPre(entity: Entity): Bom3Entity {
  const result = turnEntityToBom3Entity(entity);
  result.instance.id = entity.getId();
  result.instance.parentId = `${entity.prefix ?? ''}${result.instance.parentId ?? ''}`;
  return result;
}

export function turnPaveEntityToBom3Data(
  entities: Entity[],
  builder: Bom3DataBuilder
): TurnPaveEntityResult {
  const sketches: SketchRegion[] = [];
  const waterJets: unknown[] = [];

  entities.forEach((entity) => {
    const isWaterJetTile =
      entity.type.classType === HSPaveSDK.BomClassType[HSPaveSDK.WaterJetTileComp.Type];

    if (isWaterJetTile) {
      const data = builder.buildBom3Data(entity);
      if (data) {
        waterJets.push(...data);
      }
    } else {
      const entityData = turnEntityToBom3EntityPre(entity);
      const regions: unknown[] = [];

      entity.traverse((childEntity) => {
        const childData = builder.buildBom3Data(childEntity);
        if (childData) {
          regions.push(...childData);
          return true;
        }
        return false;
      });

      sketches.push({
        entity: entityData,
        regions,
      });
    }
  });

  return { sketches, waterJets };
}

function setParameterValue(
  target: Record<string, unknown>,
  targetKey: string,
  entity: Entity,
  parameterName: string,
  strictMode: boolean
): void {
  if (strictMode && !entity.getParameterValue(parameterName)) {
    console.error('读取缺少对应的参数', parameterName, targetKey, entity);
  }

  const value = entity.getParameterValue(parameterName);
  if (value !== undefined) {
    target[targetKey] = value;
  }
}