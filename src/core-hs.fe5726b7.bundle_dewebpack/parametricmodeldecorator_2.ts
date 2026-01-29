import { Matrix4 } from './Matrix4';

interface ModelData {
  dataModel: {
    brepShells: BrepShell[];
  };
}

interface BrepShell {
  eId?: string;
  shells: Shell[];
  materials: Map<string, Material>;
}

interface Shell {
  tag: string;
  getFaces(): Face[];
  getFaceByTag(tag: string): Face | undefined;
}

interface Face {
  tag: string;
}

interface Material {
  refVariable?: string;
  regions?: unknown;
  pats?: unknown;
}

interface WallSegment {
  from: { x: number; y: number };
  to: { x: number; y: number };
  width: number;
}

interface FaceInfo {
  entity: ParametricEntity;
  faceTag: string;
  isFaceSupportPaintMaterial: boolean;
}

interface ParametricEntity {
  tag: string;
  parameters?: {
    modelData?: ModelData;
  };
  outline: Array<{ x: number; y: number }>;
  facematerialmap: Map<string, unknown>;
  Class?: string;
  parent?: ParametricEntity;
  refreshBoundInternal(): void;
  getUniqueParent(): ParametricEntity | undefined;
  forEachChild(callback: (child: ParametricEntity) => void): void;
  getLocalToWorldMatrix(): { toArray(): number[] };
}

export class ParametricModelDecorator {
  private entity: ParametricEntity;

  constructor(entity: ParametricEntity) {
    this.entity = entity;
  }

  getModelData(): ModelData | undefined {
    return this.entity.parameters?.modelData;
  }

  getVariableNameByRef(ref: string): string | undefined {
    let variableName: string | undefined;
    const modelData = this.getModelData();
    const brepShells = modelData?.dataModel.brepShells;

    if (!brepShells || !Array.isArray(brepShells)) {
      return undefined;
    }

    const refParts = ref.split(`${this.entity.tag}/`)[1].split('/');
    const entityId = refParts[0];
    const materialKey = refParts[1] === entityId 
      ? `${refParts[1]}/${refParts[2]}` 
      : refParts[1];

    for (const shell of brepShells) {
      let isMatch = false;

      if (this.isTopLevelModel()) {
        isMatch = entityId === shell.eId;
      } else if (this.isSubpart()) {
        isMatch = !!shell.shells.find(s => s.tag === entityId);
      }

      if (!isMatch) {
        continue;
      }

      const materialWithKey = shell.materials.get(materialKey);
      const material = !materialWithKey || materialWithKey.regions || materialWithKey.pats
        ? shell.materials.get('')
        : shell.materials.get(materialKey);

      if (!material) {
        continue;
      }

      const refVariable = material.refVariable;
      if (refVariable) {
        variableName = refVariable.includes('#') 
          ? refVariable.split('#')[1] 
          : refVariable;
        break;
      }
    }

    return variableName;
  }

  isTopLevelModel(): boolean {
    return (
      this.entity instanceof HSCore.Model.NCustomizedParametricBackgroundWall ||
      this.entity instanceof HSCore.Model.NCPBackgroundWallUnit ||
      this.entity instanceof HSCore.Model.ParametricBathroomCabinet ||
      this.entity instanceof HSCore.Model.ParametricCurtain
    );
  }

  isSubpart(): boolean {
    return (
      this.entity instanceof HSCore.Model.NCPBackgroundWallSubpart ||
      this.entity instanceof HSCore.Model.ParametricContentSubpart
    );
  }

  getFaceTagsByVariableNames(variableNames: string[]): string[] {
    const faceTags: string[] = [];
    const modelData = this.getModelData();
    const brepShells = modelData?.dataModel?.brepShells;

    if (!brepShells || !Array.isArray(brepShells)) {
      return [];
    }

    for (const shell of brepShells) {
      for (const materialKey of shell.materials.keys()) {
        const material = shell.materials.get(materialKey);
        const refVariable = material?.refVariable;

        if (!refVariable) {
          continue;
        }

        const variableName = refVariable.includes('#') 
          ? refVariable.split('#')[1] 
          : refVariable;
        const rootVariables = HSCore.Util.NCustomizedFeatureModel.getRefRootVariables(
          this.entity,
          variableName
        );

        if (variableNames.find(name => rootVariables.includes(name))) {
          for (const childShell of shell.shells) {
            const faces = materialKey && materialKey !== ''
              ? (childShell.getFaceByTag(materialKey) ? [childShell.getFaceByTag(materialKey)!] : [])
              : childShell.getFaces();

            faces.forEach(face => {
              if (typeof shell.eId === 'string') {
                const tag = face.tag.replace(shell.eId + '/', '');
                faceTags.push(tag);
              } else {
                faceTags.push(face.tag);
              }
            });
          }
        }
      }
    }

    return faceTags;
  }

  getFacesInfoByVariableName(variableName: string): FaceInfo[] {
    if (!variableName || !this.entity) {
      return [];
    }

    const facesInfo: FaceInfo[] = [];

    const processEntity = (entity: ParametricEntity): void => {
      const modelData = new ParametricModelDecorator(entity).getModelData();

      if (modelData?.dataModel.brepShells) {
        for (const shell of modelData.dataModel.brepShells) {
          for (const materialKey of shell.materials.keys()) {
            const material = shell.materials.get(materialKey);

            if (material?.refVariable) {
              const refVariableName = material.refVariable.includes('#')
                ? material.refVariable.split('#')[1]
                : material.refVariable;
              const rootVariables = HSCore.Util.NCustomizedFeatureModel.getRefRootVariables(
                entity,
                refVariableName
              );

              if (rootVariables.includes(variableName)) {
                if (materialKey === '') {
                  shell.shells.forEach(childShell => {
                    childShell.getFaces().forEach(face => {
                      facesInfo.push({
                        entity,
                        faceTag: face.tag,
                        isFaceSupportPaintMaterial: entity.facematerialmap.has(face.tag)
                      });
                    });
                  });
                } else {
                  shell.shells.forEach(childShell => {
                    childShell.getFaces().forEach(face => {
                      if (face.tag === materialKey) {
                        facesInfo.push({
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

        entity.forEachChild(child => {
          if (
            child instanceof HSCore.Model.NCPBackgroundWallSubpart ||
            child instanceof HSCore.Model.ParametricContentSubpart
          ) {
            processEntity(child);
          }
        });
      }
    };

    processEntity(this.entity);
    return facesInfo;
  }

  getMinMoveVecToWall(wall: WallSegment): { x: number; y: number } {
    this.entity.refreshBoundInternal();

    const getVectorToSegment = (point: { x: number; y: number }): HSCore.Util.Math.Vec2 => {
      const closestPoint = HSCore.Util.Math.getClosestSegmentPoint(point, wall.from, wall.to);
      return new HSCore.Util.Math.Vec2(closestPoint.x - point.x, closestPoint.y - point.y);
    };

    const entityVector = getVectorToSegment(this.entity);

    if (HSCore.Util.Math.isZero(entityVector.magnitude())) {
      return { x: 0, y: 0 };
    }

    let minVector: HSCore.Util.Math.Vec2 | undefined;
    let minDotProduct: number = 0;

    this.entity.outline.forEach(point => {
      const pointVector = getVectorToSegment(point);
      const dotProduct = HSCore.Util.Math.Vec2.dot(pointVector, entityVector);

      if (minVector) {
        if (dotProduct < minDotProduct) {
          minDotProduct = dotProduct;
          minVector = pointVector;
        }
      } else {
        minDotProduct = Number.MAX_VALUE;
        minVector = pointVector;
      }
    });

    const offset = entityVector.normalize().scale(wall.width / 2);
    return minVector!.subtract(offset);
  }

  static getParentByEntityTypes(
    entity: ParametricEntity,
    entityTypes: string[]
  ): ParametricEntity | undefined {
    let parent = entity.getUniqueParent();

    while (parent) {
      if (parent.Class && entityTypes.includes(parent.Class)) {
        return parent;
      }
      parent = parent.getUniqueParent();
    }

    return undefined;
  }

  getTopLevelModel(): ParametricEntity | undefined {
    if (
      this.entity instanceof HSCore.Model.NCustomizedParametricBackgroundWall ||
      this.entity instanceof HSCore.Model.NCPBackgroundWallUnit ||
      this.entity instanceof HSCore.Model.ParametricCurtain ||
      this.entity instanceof HSCore.Model.ParametricBathroomCabinet
    ) {
      return this.entity;
    }

    if (
      this.entity instanceof HSCore.Model.NCPBackgroundWallBase ||
      this.entity instanceof HSCore.Model.NCPBackgroundWallArray ||
      this.entity instanceof HSCore.Model.NCPBackgroundWallContent ||
      this.entity instanceof HSCore.Model.ParametricContentBase ||
      this.entity instanceof HSCore.Model.ParametricModelArray ||
      this.entity instanceof HSCore.Model.ParametricModelContent
    ) {
      const topLevel = ParametricModelDecorator.getParentByEntityTypes(this.entity, [
        HSConstants.ModelClass.NCustomizedParametricBackgroundWall,
        HSConstants.ModelClass.NCPBackgroundWallUnit,
        HSConstants.ModelClass.ParametricCurtain,
        HSConstants.ModelClass.ParametricBathroomCabinet
      ]);

      if (topLevel) {
        return topLevel;
      }
    }

    return undefined;
  }

  static getLocalToBaseMatrix(
    entity: ParametricEntity,
    matrix?: Matrix4
  ): Matrix4 {
    const resultMatrix = matrix ?? new Matrix4();

    if (entity instanceof HSCore.Model.ParametricModelArray) {
      if (entity.parent) {
        this.getLocalToBaseMatrix(entity.parent, resultMatrix);
      }
    } else if (
      entity instanceof HSCore.Model.ParametricModelContent ||
      entity instanceof HSCore.Model.NCPBackgroundWallBase ||
      entity instanceof HSCore.Model.ParametricContentBase
    ) {
      const localToWorld = new Matrix4().fromArray(
        entity.getLocalToWorldMatrix().toArray()
      );
      resultMatrix.preMultiply(localToWorld);

      if (entity.parent) {
        this.getLocalToBaseMatrix(entity.parent, resultMatrix);
      }
    }

    return resultMatrix;
  }
}