import { Material, MaterialApi } from './Material';
import { WallFaceAssemblyDecorator } from './WallFaceAssemblyDecorator';
import { Vector3 } from './Vector3';
import { NCParametricModelMaterialUtil } from './NCParametricModelMaterialUtil';
import { NCPConstantEnum } from './NCPConstantEnum';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface FaceInfo {
  newOuter: Point3D[];
  D?: number;
}

interface TargetFaceInfo {
  outer: Point3D[];
  holes: unknown[];
  D?: number;
}

interface PropertyNode {
  friendlyName: string;
  name: string;
  value: unknown;
  type?: string;
  limitType?: string;
  eId?: string;
  children?: PropertyNode[];
}

interface PropertyTree {
  children: PropertyNode[];
}

interface MaterialInfo {
  seekId: string;
  rotation: number;
  offsetX: number;
  offsetY: number;
  scaleX: number;
  scaleY: number;
}

interface MaterialGroupExtraInfo {
  name: string;
  materialInfo: MaterialInfo;
}

interface DumpResult {
  seekId: string;
  propertymp: Map<string, PropertyValue>;
  outerBySize: Point3D[];
  D?: number;
  isAutoFit: boolean;
  isScalable: boolean;
  materialGroupExtraInfo: MaterialGroupExtraInfo[];
}

interface PropertyValue {
  type: string;
  value: unknown;
}

interface FaceEntityInfo {
  entity: unknown;
  faceTag: string;
  isFaceSupportPaintMaterial: boolean;
}

interface EntityParameters {
  isAutoFit?: boolean;
  targetFaceInfo?: TargetFaceInfo;
  propertytree?: PropertyTree;
  modelData?: {
    dataModel: {
      brepShells?: BrepShell[];
    };
  };
}

interface BrepShell {
  materials: Map<string, MaterialReference>;
  shells: Shell[];
}

interface MaterialReference {
  refVariable?: string;
}

interface Shell {
  getFaces(): Face[];
}

interface Face {
  tag: string;
}

interface Entity {
  parameters: EntityParameters;
  metadata: { seekId: string };
  isScalable: boolean;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  defaultmaterialmap: Map<string, { material: unknown }>;
  facematerialmap: Map<string, { material: unknown }>;
  getTargetFaceInfoBySize(info?: FaceInfo): FaceInfo;
  openDocument(info: TargetFaceInfo, flag: boolean): void;
  constructBrep(properties: Record<string, unknown>, flag1: boolean, flag2: boolean): void;
  dirtyChildModels(flag: boolean, deep?: boolean): void;
  dirtyGeometry(): void;
  setMaterialData(faceTag: string, material: unknown): void;
  initByMeta(meta: unknown): void;
  getSizeRangeInterval(): { W?: [number, number] };
  forEachChild(callback: (child: unknown) => void): void;
}

interface SizeLimit {
  minValue: number;
  maxValue: number;
}

export class NCPBackgroundWallBaseDecorator {
  private readonly _entity: Entity;

  constructor(entity: Entity) {
    this._entity = entity;
  }

  dump(offset: Point3D): DumpResult | undefined {
    const targetFaceInfo = this._entity.parameters.isAutoFit
      ? this._entity.parameters.targetFaceInfo
      : this._entity.getTargetFaceInfoBySize(this._entity.parameters.targetFaceInfo);

    const materialPropertyNodes = this._getMaterialPropertyNodes(this._entity.parameters.propertytree);
    const materialGroupExtraInfo: MaterialGroupExtraInfo[] = [];

    for (const node of materialPropertyNodes) {
      const variableName = node.name;
      const materialInfo = this.getMaterialInfoByVariableName(variableName);
      if (materialInfo) {
        materialGroupExtraInfo.push({
          name: variableName,
          materialInfo
        });
      }
    }

    const isAutoFit = !!this._entity.parameters.isAutoFit;
    const hostedFace = HSCore.Util.Content.getHostedFace(this._entity);
    
    if (!hostedFace) return;

    const worldToLocalMatrix = new WallFaceAssemblyDecorator()
      .getFaceLocalCoordinate(hostedFace)
      .getWorldToLocalMatrix();

    const outerBySize = this._entity.getTargetFaceInfoBySize(undefined).newOuter;
    const transformedOuter = outerBySize
      .map(point => new Vector3(point).transform(worldToLocalMatrix))
      .map(transformed => ({
        x: transformed.x - offset.x,
        y: transformed.y - offset.y,
        z: transformed.z - offset.z
      }));

    return {
      seekId: this._entity.metadata.seekId,
      propertymp: this.getProperties(),
      outerBySize: transformedOuter,
      D: isAutoFit || !targetFaceInfo ? undefined : targetFaceInfo.D,
      isAutoFit,
      isScalable: this._entity.isScalable,
      materialGroupExtraInfo
    };
  }

  static create(
    recordData: DumpResult,
    metadata: unknown,
    localToWorldMatrix: unknown,
    face?: unknown
  ): Entity | undefined {
    if (!metadata) return;

    let EntityClass: unknown;

    if (metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedBackgroundWall)) {
      EntityClass = HSCore.Model.Entity.getClass(HSConstants.ModelClass.NCustomizedParametricBackgroundWall);
    } else if (metadata.contentType.isTypeOf(HSCatalog.ContentTypeEnum.BackgroundWallUnit)) {
      EntityClass = HSCore.Model.Entity.getClass(HSConstants.ModelClass.NCPBackgroundWallUnit);
    }

    if (!EntityClass) return;

    const entity = new EntityClass() as Entity;
    entity.initByMeta(metadata);
    entity.parameters.isAutoFit = recordData.isAutoFit;
    entity.isScalable = recordData.isScalable;

    const targetFaceInfo: TargetFaceInfo = {
      outer: recordData.outerBySize.map(point => {
        const transformed = new Vector3(point).transform(localToWorldMatrix);
        return {
          x: transformed.x,
          y: transformed.y,
          z: transformed.z
        };
      }),
      holes: [],
      D: recordData.D
    };

    entity.openDocument(targetFaceInfo, false);
    entity.parameters.targetFaceInfo = targetFaceInfo;
    entity.constructBrep(this._mapToRecordObj(recordData.propertymp), false, false);
    entity.dirtyChildModels(true);
    entity.XRotation = 0;
    entity.YRotation = 0;

    if (face && face instanceof HSCore.Model.Face && 
        !(face instanceof HSCore.Model.Floor || face instanceof HSCore.Model.Ceiling)) {
      const curve = face.faceInfo.curve;
      if (curve) {
        const startPoint = curve.getStartPt();
        const endPoint = curve.getEndPt();
        const angle = -HSCore.Util.Math.getAngleHorizontaleCCW(startPoint, endPoint);
        const normalizeAngle = (value: number): number => {
          let normalized = value % 360;
          if (normalized > 180) normalized -= 360;
          else if (normalized < -180) normalized += 360;
          return normalized;
        };
        entity.ZRotation = normalizeAngle(angle);
      }
    }

    const decorator = new NCPBackgroundWallBaseDecorator(entity);
    for (const materialGroup of recordData.materialGroupExtraInfo) {
      const facesInfo = decorator.getFacesInfoByVariableName(materialGroup.name);
      const materialInfo = materialGroup.materialInfo;
      decorator.setMaterial(facesInfo, materialInfo);
    }

    return entity;
  }

  setMaterial(facesInfo: FaceEntityInfo[], materialInfo: MaterialInfo): void {
    const entity = this._entity;

    for (const faceInfo of facesInfo) {
      if (!faceInfo.isFaceSupportPaintMaterial) {
        const materialWrapper = faceInfo.entity.defaultmaterialmap.get(faceInfo.faceTag);
        const defaultMaterial = materialWrapper?.material;
        if (!defaultMaterial) continue;

        const clonedMaterial = defaultMaterial.clone();
        if (clonedMaterial && clonedMaterial instanceof HSCore.Material.MaterialData) {
          if (materialInfo.rotation !== undefined) {
            clonedMaterial.rotation = materialInfo.rotation;
          }
          if (materialInfo.offsetX !== undefined) {
            clonedMaterial.offsetX = materialInfo.offsetX;
          }
          if (materialInfo.offsetY !== undefined) {
            clonedMaterial.offsetY = materialInfo.offsetY;
          }

          if (clonedMaterial.tileSize_x && clonedMaterial.tileSize_y &&
              clonedMaterial.initTileSize_x && clonedMaterial.initTileSize_y) {
            const materialScale = new Material().setFrom({
              scaleX: clonedMaterial.tileSize_x / clonedMaterial.initTileSize_x,
              scaleY: clonedMaterial.tileSize_y / clonedMaterial.initTileSize_y
            });

            MaterialApi.editScale(materialScale, {
              lockRatio: false,
              scaleX: materialInfo.scaleX,
              scaleY: materialInfo.scaleY
            });

            clonedMaterial.tileSize_x = clonedMaterial.initTileSize_x * materialScale.scaleX;
            clonedMaterial.tileSize_y = clonedMaterial.initTileSize_y * materialScale.scaleY;
          }

          faceInfo.entity.setMaterialData(faceInfo.faceTag, clonedMaterial);
        }
      }
    }

    entity.dirtyGeometry();
    entity.dirtyChildModels(true, true);
  }

  private _getMaterialPropertyNodes(propertyTree?: PropertyTree): PropertyNode[] {
    if (!propertyTree) return [];

    const result: PropertyNode[] = [];

    const traverse = (nodes: PropertyNode[]): void => {
      for (const node of nodes) {
        if (node.type && node.type === 'MATERIIAL' && 
            node.limitType && node.limitType !== 'FIXED') {
          result.push({
            friendlyName: node.friendlyName,
            name: node.name,
            value: node.value
          });
        } else if (node.children && node.children.length > 0) {
          traverse(node.children);
        }
      }
    };

    traverse(propertyTree.children);
    return result;
  }

  getMaterialInfoByVariableName(variableName: string): MaterialInfo | undefined {
    if (!variableName || !this._entity) return;

    const facesInfo = this.getFacesInfoByVariableName(variableName);
    if (facesInfo.length > 0) {
      const faceInfo = facesInfo[0];
      const materialWrapper = faceInfo.isFaceSupportPaintMaterial
        ? faceInfo.entity.facematerialmap.get(faceInfo.faceTag)
        : faceInfo.entity.defaultmaterialmap.get(faceInfo.faceTag);

      if (materialWrapper) {
        const materialInfo = NCParametricModelMaterialUtil.getMaterialInfo(materialWrapper.material);
        return {
          seekId: materialInfo.seekId,
          rotation: materialInfo.rotation,
          offsetX: materialInfo.offsetX,
          offsetY: materialInfo.offsetY,
          scaleX: materialInfo.scaleX,
          scaleY: materialInfo.scaleY
        };
      }
    }
  }

  getFacesInfoByVariableName(variableName: string): FaceEntityInfo[] {
    if (!variableName || !this._entity) return [];

    const result: FaceEntityInfo[] = [];

    const processEntity = (entity: Entity): void => {
      const modelData = entity.parameters?.modelData;
      if (modelData?.dataModel.brepShells) {
        for (const brepShell of modelData.dataModel.brepShells) {
          for (const materialKey of brepShell.materials.keys()) {
            const materialRef = brepShell.materials.get(materialKey);
            if (materialRef?.refVariable) {
              const refVariableName = materialRef.refVariable.includes('#')
                ? materialRef.refVariable.split('#')[1]
                : materialRef.refVariable;

              if (HSCore.Util.NCustomizedFeatureModel.getRefRootVariables(entity, refVariableName)
                    .includes(variableName)) {
                if (materialKey === '') {
                  brepShell.shells.forEach(shell => {
                    shell.getFaces().forEach(face => {
                      result.push({
                        entity,
                        faceTag: face.tag,
                        isFaceSupportPaintMaterial: entity.facematerialmap.has(face.tag)
                      });
                    });
                  });
                } else {
                  brepShell.shells.forEach(shell => {
                    shell.getFaces().forEach(face => {
                      if (face.tag === materialKey) {
                        result.push({
                          entity,
                          faceTag: face.tag,
                          isFaceSupportPaintMaterial: entity.facematerialmap.has(face.tag)
                        });
                      }
                    });
                  });
                }
              }
            }
          }
        }
      }

      entity.forEachChild((child: unknown) => {
        if (child instanceof HSCore.Model.NCPBackgroundWallSubpart) {
          processEntity(child as Entity);
        }
      });
    };

    processEntity(this._entity);
    return result;
  }

  static getRecordSeekIdsByRecordData(recordData: { propertymp: Map<string, PropertyValue> }): unknown[] {
    const seekIds: unknown[] = [];
    for (const [, propertyValue] of recordData.propertymp) {
      if (propertyValue.type === 'MATERIIAL') {
        seekIds.push(propertyValue.value);
      }
    }
    return seekIds;
  }

  getProperties(): Map<string, PropertyValue> {
    const properties = new Map<string, PropertyValue>();
    if (!this._entity.parameters.propertytree) return properties;
    
    this._traversePropertyTree(this._entity.parameters.propertytree, properties);
    return properties;
  }

  private _traversePropertyTree(node: PropertyNode | PropertyTree, properties: Map<string, PropertyValue>): void {
    if (!node) return;

    if (node.value !== undefined && node.eId) {
      const propertyNode = node as PropertyNode;
      properties.set(propertyNode.name, {
        type: propertyNode.type!,
        value: propertyNode.value
      });
    }

    if (node.children) {
      for (const child of node.children) {
        this._traversePropertyTree(child, properties);
      }
    }
  }

  private static _mapToRecordObj(propertyMap: Map<string, PropertyValue>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, value] of propertyMap) {
      result[key] = value.value;
    }
    return result;
  }

  getXSizeLimit(): SizeLimit {
    let minValue = NCPConstantEnum.PARAMETRIC_MODEL_SIZE_MIN;
    let maxValue = NCPConstantEnum.PARAMETRIC_MODEL_SIZE_MAX;

    const sizeRangeInterval = this._entity.getSizeRangeInterval();
    const isSizeLimitUnlocked = HSCore.Doc.getDocManager().designMetadata.get('sizeLimitUnlock');

    if (!isSizeLimitUnlocked && sizeRangeInterval.W) {
      minValue = sizeRangeInterval.W[0];
      maxValue = sizeRangeInterval.W[1];
    }

    return {
      minValue,
      maxValue
    };
  }
}