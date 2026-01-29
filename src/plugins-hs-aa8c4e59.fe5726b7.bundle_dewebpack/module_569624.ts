import { HSPaveSDK, HSCore, HSCatalog } from './path-to-sdk';
import { categoryI18n } from './i18n-config';

const DOLLAR_CONVERSION_RATE = 0.1571;

const contentTypeCache = new Map<string, HSCatalog.ContentType>();

interface Size {
  x: number;
  y: number;
  z: number;
}

interface EntityWithType {
  type?: {
    contentType?: string;
  };
}

interface ElementWithContentType {
  contentType?: string;
}

interface GroupEntity<T = unknown> {
  groupKey: string;
  entities: T[];
}

interface Bom2Builder<T, R> {
  buildBom2Data(entity: T): R;
}

interface ParameterInstance {
  getParameter(name: string): unknown;
  getParameterValue(name: string): unknown;
}

interface ParameterContainer {
  instance: ParameterInstance;
}

export function addEntityContentToElement(
  entity: EntityWithType,
  element: ElementWithContentType
): void {
  if (entity.type?.contentType) {
    element.contentType = entity.type.contentType.split(', ').join('/');
  }
}

export function contentTypeIsTypeOf(
  contentType: string | undefined,
  targetType: string
): boolean {
  if (!contentType) {
    return false;
  }

  if (!contentTypeCache.has(contentType)) {
    contentTypeCache.set(
      contentType,
      new HSCatalog.ContentType(contentType.split(', '))
    );
  }

  return contentTypeCache.get(contentType)!.isTypeOf(targetType);
}

export function dollarTransfer(
  value: number | undefined,
  decimalPlaces?: number
): number | string | undefined {
  if (value === undefined) {
    return value;
  }

  const convertedValue = +value * DOLLAR_CONVERSION_RATE;

  if (decimalPlaces === undefined) {
    return convertedValue;
  }

  if (decimalPlaces <= 0) {
    return Math.round(convertedValue);
  }

  const multiplier = Math.pow(10, decimalPlaces);
  return (Math.round(convertedValue * multiplier) / multiplier).toFixed(decimalPlaces);
}

export function genBom2DataFromGroup<TEntity, TBom2Data>(
  groups: GroupEntity<TEntity>[],
  groupKey: string,
  builder: Bom2Builder<TEntity, TBom2Data>
): TBom2Data[] {
  const targetGroup = groups.find(group => group.groupKey === groupKey);

  return targetGroup
    ? targetGroup.entities.map(entity => builder.buildBom2Data(entity))
    : [];
}

export function getArea(
  regions: HSPaveSDK.Region[],
  clipRegion?: HSPaveSDK.Region
): number {
  const processedRegions = clipRegion
    ? HSPaveSDK.ClipperService.ins.clip(regions, clipRegion, HSPaveSDK.ClipMode.Inter)
    : regions;

  let totalArea = 0;

  processedRegions.forEach(region => {
    const outerVectors = HSPaveSDK.MathService.ins.getVectorsFromCurves(region.outer);
    let regionArea = HSPaveSDK.MathService.ins.getArea(outerVectors);

    region.holes.forEach(hole => {
      const holeVectors = HSPaveSDK.MathService.ins.getVectorsFromCurves(hole);
      const holeArea = HSPaveSDK.MathService.ins.getArea(holeVectors);
      regionArea -= holeArea;
    });

    totalArea += regionArea;
  });

  return totalArea;
}

export function getColor(material: HSCore.Material): unknown | undefined {
  let color: unknown | undefined;

  if (HSCore.Material.Util.isUseColorOfMaterial(material)) {
    color = material.color;
  } else if (HSCore.Material.Util.isUseBlendOfMaterial(material)) {
    color = material.blendColor;
  }

  return color;
}

export function getEnCategoryTypeName(chineseName: string): string {
  const zhKeys = Object.keys(categoryI18n.zh_CN);
  let matchedKey = '';

  for (let i = 0; i < zhKeys.length; i++) {
    if (categoryI18n.zh_CN[zhKeys[i]] === chineseName) {
      matchedKey = zhKeys[i];
      break;
    }
  }

  return categoryI18n.en_US[matchedKey];
}

export function isGlobal(): boolean {
  return HSApp.Config.TENANT === 'fp';
}

export function needCalculateBrickCount(productId: string): boolean {
  const app = HSApp.App.getApp();
  const productMeta = app.catalogManager.getBuildingProductMeta(productId);

  return productMeta
    ? new HSPaveSDK.MetaDecorator(productMeta).needConvertPavePattern()
    : false;
}

export function setObjectParameterValues<T extends Record<string, unknown>>(
  targetObject: T,
  parameterContainer: ParameterContainer,
  parameterMapping: Record<string, keyof T>,
  shouldValidate: boolean = false
): void {
  for (const parameterName in parameterMapping) {
    setParameterValue(
      targetObject,
      parameterMapping[parameterName],
      parameterContainer,
      parameterName,
      shouldValidate
    );
  }
}

function setParameterValue<T extends Record<string, unknown>>(
  targetObject: T,
  targetKey: keyof T,
  parameterContainer: ParameterContainer,
  parameterName: string,
  shouldValidate: boolean
): void {
  if (shouldValidate) {
    const parameter = parameterContainer.instance.getParameter(parameterName);
    if (!parameter) {
      console.error('读取缺少对应的参数', parameterName, targetKey, parameterContainer, targetObject);
    }
  }

  const parameterValue = parameterContainer.instance.getParameterValue(parameterName);

  if (parameterValue !== undefined) {
    targetObject[targetKey] = parameterValue as T[keyof T];
  }
}

export function turnNumberArrayToSize(array: number[]): Size | undefined {
  if (array?.length >= 3) {
    return {
      x: array[0],
      y: array[1],
      z: array[2]
    };
  }
  return undefined;
}