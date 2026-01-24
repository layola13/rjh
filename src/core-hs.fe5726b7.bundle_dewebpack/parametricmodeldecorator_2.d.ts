/**
 * 参数化模型装饰器模块
 * 提供参数化模型的数据访问、变量查询、面片操作等功能
 */

import { Matrix4 } from './Matrix4';

/**
 * 材质信息接口
 */
interface MaterialInfo {
  /** 引用的变量名，可能包含"#"分隔符 */
  refVariable?: string;
  /** 材质区域 */
  regions?: unknown;
  /** 材质图案 */
  pats?: unknown;
}

/**
 * BRep壳体数据结构
 */
interface BrepShell {
  /** 实体ID */
  eId: string | number;
  /** 子壳体集合 */
  shells: Shell[];
  /** 材质映射表 */
  materials: Map<string, MaterialInfo>;
}

/**
 * 壳体接口
 */
interface Shell {
  /** 壳体标签 */
  tag: string;
  /** 获取所有面片 */
  getFaces(): Face[];
  /** 根据标签获取面片 */
  getFaceByTag(tag: string): Face | undefined;
}

/**
 * 面片接口
 */
interface Face {
  /** 面片标签 */
  tag: string;
}

/**
 * 模型数据结构
 */
interface ModelData {
  dataModel: {
    /** BRep壳体数组 */
    brepShells: BrepShell[];
  };
}

/**
 * 参数化实体接口
 */
interface ParametricEntity {
  /** 实体标签 */
  tag: string;
  /** 参数配置 */
  parameters?: {
    modelData?: ModelData;
  };
  /** 面片材质映射表 */
  facematerialmap: Map<string, unknown>;
  /** 轮廓点集合 */
  outline: Array<{ x: number; y: number }>;
  /** 刷新内部边界 */
  refreshBoundInternal(): void;
  /** 获取唯一父级实体 */
  getUniqueParent(): ParametricEntity | null;
  /** 实体类型 */
  Class?: string;
  /** 父级实体 */
  parent?: ParametricEntity;
  /** 遍历子实体 */
  forEachChild(callback: (child: ParametricEntity) => void): void;
  /** 获取局部到世界坐标变换矩阵 */
  getLocalToWorldMatrix(): { toArray(): number[] };
}

/**
 * 墙体线段接口
 */
interface WallSegment {
  /** 起点 */
  from: { x: number; y: number };
  /** 终点 */
  to: { x: number; y: number };
  /** 墙体宽度 */
  width: number;
}

/**
 * 面片信息接口
 */
interface FaceInfo {
  /** 所属实体 */
  entity: ParametricEntity;
  /** 面片标签 */
  faceTag: string;
  /** 面片是否支持涂料材质 */
  isFaceSupportPaintMaterial: boolean;
}

/**
 * 二维向量接口
 */
interface Vec2 {
  x: number;
  y: number;
  /** 计算向量长度 */
  magnitude(): number;
  /** 归一化向量 */
  normalize(): Vec2;
  /** 缩放向量 */
  scale(factor: number): Vec2;
  /** 向量减法 */
  subtract(other: Vec2): Vec2;
}

/**
 * 参数化模型装饰器类
 * 用于封装对参数化模型的常用操作，包括变量查询、面片检索、坐标变换等
 */
export class ParametricModelDecorator {
  /** 被装饰的实体对象 */
  private readonly entity: ParametricEntity;

  /**
   * 构造函数
   * @param entity - 要装饰的参数化实体
   */
  constructor(entity: ParametricEntity) {
    this.entity = entity;
  }

  /**
   * 获取模型数据
   * @returns 模型数据对象，如果不存在则返回 undefined
   */
  getModelData(): ModelData | undefined {
    return this.entity.parameters?.modelData;
  }

  /**
   * 根据引用路径获取变量名
   * @param reference - 引用路径字符串，格式如 "tag/eId/materialKey"
   * @returns 变量名，如果未找到则返回 undefined
   */
  getVariableNameByRef(reference: string): string | undefined {
    let variableName: string | undefined;
    const modelData = this.getModelData();
    const brepShells = modelData?.dataModel.brepShells;

    if (!brepShells || !Array.isArray(brepShells)) {
      return undefined;
    }

    // 解析引用路径: 移除实体标签前缀并分割
    const pathSegments = reference.split(`${this.entity.tag}/`)[1].split('/');
    const shellId = pathSegments[0];
    const materialKey =
      pathSegments[1] === shellId
        ? `${pathSegments[1]}/${pathSegments[2]}`
        : pathSegments[1];

    // 遍历所有 BRep 壳体查找匹配项
    for (const shell of brepShells) {
      let isMatchingShell = false;

      // 判断是否为匹配的壳体
      if (this.isTopLevelModel()) {
        isMatchingShell = shellId === shell.eId;
      } else if (this.isSubpart()) {
        isMatchingShell = !!shell.shells.find((s) => s.tag === shellId);
      }

      if (!isMatchingShell) {
        continue;
      }

      // 查找材质信息
      const specificMaterial = shell.materials.get(materialKey);
      const material =
        !specificMaterial || specificMaterial.regions || specificMaterial.pats
          ? shell.materials.get('')
          : specificMaterial;

      if (!material) {
        continue;
      }

      const refVariable = material.refVariable;
      if (refVariable) {
        // 提取变量名（处理可能的 "#" 分隔符）
        variableName = refVariable.includes('#')
          ? refVariable.split('#')[1]
          : refVariable;
        break;
      }
    }

    return variableName;
  }

  /**
   * 判断是否为顶层模型
   * @returns 如果是顶层模型则返回 true
   */
  isTopLevelModel(): boolean {
    return (
      this.entity instanceof HSCore.Model.NCustomizedParametricBackgroundWall ||
      this.entity instanceof HSCore.Model.NCPBackgroundWallUnit ||
      this.entity instanceof HSCore.Model.ParametricBathroomCabinet ||
      this.entity instanceof HSCore.Model.ParametricCurtain
    );
  }

  /**
   * 判断是否为子部件
   * @returns 如果是子部件则返回 true
   */
  isSubpart(): boolean {
    return (
      this.entity instanceof HSCore.Model.NCPBackgroundWallSubpart ||
      this.entity instanceof HSCore.Model.ParametricContentSubpart
    );
  }

  /**
   * 根据变量名数组获取所有关联的面片标签
   * @param variableNames - 变量名数组
   * @returns 面片标签数组
   */
  getFaceTagsByVariableNames(variableNames: string[]): string[] {
    const faceTags: string[] = [];
    const modelData = this.getModelData();
    const brepShells = modelData?.dataModel?.brepShells;

    if (!brepShells || !Array.isArray(brepShells)) {
      return [];
    }

    // 遍历所有壳体和材质
    for (const shell of brepShells) {
      for (const materialKey of shell.materials.keys()) {
        const material = shell.materials.get(materialKey);
        const refVariable = material?.refVariable;

        if (!refVariable) {
          continue;
        }

        // 提取变量名
        const variableName = refVariable.includes('#')
          ? refVariable.split('#')[1]
          : refVariable;

        // 获取根变量集合
        const rootVariables = HSCore.Util.NCustomizedFeatureModel.getRefRootVariables(
          this.entity,
          variableName
        );

        // 检查是否匹配任意输入变量
        if (variableNames.find((name) => rootVariables.includes(name))) {
          for (const subShell of shell.shells) {
            // 获取面片集合
            const faces =
              materialKey && materialKey !== ''
                ? subShell.getFaceByTag(materialKey)
                  ? [subShell.getFaceByTag(materialKey)!]
                  : []
                : subShell.getFaces();

            // 处理面片标签
            faces.forEach((face) => {
              if (typeof shell.eId === 'string') {
                const relativeTag = face.tag.replace(shell.eId + '/', '');
                faceTags.push(relativeTag);
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

  /**
   * 根据变量名获取面片详细信息
   * 会递归遍历所有子部件
   * @param variableName - 变量名
   * @returns 面片信息数组
   */
  getFacesInfoByVariableName(variableName: string): FaceInfo[] {
    if (!variableName || !this.entity) {
      return [];
    }

    const facesInfo: FaceInfo[] = [];

    /**
     * 递归处理实体及其子实体
     * @param entity - 要处理的实体
     */
    const processEntity = (entity: ParametricEntity): void => {
      const decorator = new ParametricModelDecorator(entity);
      const modelData = decorator.getModelData();

      if (modelData?.dataModel.brepShells) {
        for (const shell of modelData.dataModel.brepShells) {
          for (const materialKey of shell.materials.keys()) {
            const material = shell.materials.get(materialKey);

            if (material?.refVariable) {
              // 提取变量名
              const currentVariableName = material.refVariable.includes('#')
                ? material.refVariable.split('#')[1]
                : material.refVariable;

              // 获取根变量并检查匹配
              const rootVariables = HSCore.Util.NCustomizedFeatureModel.getRefRootVariables(
                entity,
                currentVariableName
              );

              if (rootVariables.includes(variableName)) {
                // 空材质键表示所有面片
                if (materialKey === '') {
                  shell.shells.forEach((subShell) => {
                    subShell.getFaces().forEach((face) => {
                      facesInfo.push({
                        entity,
                        faceTag: face.tag,
                        isFaceSupportPaintMaterial: entity.facematerialmap.has(face.tag),
                      });
                    });
                  });
                } else {
                  // 特定材质键
                  shell.shells.forEach((subShell) => {
                    subShell.getFaces().forEach((face) => {
                      if (face.tag === materialKey) {
                        facesInfo.push({
                          entity,
                          faceTag: face.tag,
                          isFaceSupportPaintMaterial: entity.facematerialmap.has(face.tag),
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

      // 递归处理子部件
      entity.forEachChild((child) => {
        if (
          child instanceof HSCore.Model.NCPBackgroundWallSubpart ||
          child instanceof HSCore.Model.ParametricContentSubpart
        ) {
          processEntity(child);
        }
      });
    };

    processEntity(this.entity);
    return facesInfo;
  }

  /**
   * 计算实体移动到墙体的最小向量
   * @param wall - 墙体线段信息
   * @returns 最小移动向量 {x, y}
   */
  getMinMoveVecToWall(wall: WallSegment): { x: number; y: number } {
    this.entity.refreshBoundInternal();

    /**
     * 计算点到墙体线段的最近向量
     * @param point - 点坐标
     * @returns 最近向量
     */
    const getVectorToWall = (point: { x: number; y: number }): Vec2 => {
      const closestPoint = HSCore.Util.Math.getClosestSegmentPoint(
        point,
        wall.from,
        wall.to
      );
      return new HSCore.Util.Math.Vec2(
        closestPoint.x - point.x,
        closestPoint.y - point.y
      );
    };

    const entityVector = getVectorToWall(this.entity);

    // 实体已在墙上
    if (HSCore.Util.Math.isZero(entityVector.magnitude())) {
      return { x: 0, y: 0 };
    }

    let minVector: Vec2 | undefined;
    let minDotProduct: number = Number.MAX_VALUE;

    // 遍历实体轮廓点，找到最小投影向量
    this.entity.outline.forEach((point) => {
      const vector = getVectorToWall(point);
      const dotProduct = HSCore.Util.Math.Vec2.dot(vector, entityVector);

      if (!minVector || dotProduct < minDotProduct) {
        minDotProduct = dotProduct;
        minVector = vector;
      }
    });

    // 考虑墙体宽度补偿
    const wallWidthOffset = entityVector.normalize().scale(wall.width / 2);
    return minVector!.subtract(wallWidthOffset);
  }

  /**
   * 根据实体类型向上查找父级实体
   * @param entity - 起始实体
   * @param entityTypes - 目标实体类型数组
   * @returns 匹配的父级实体，未找到则返回 undefined
   */
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

  /**
   * 获取顶层模型实体
   * @returns 顶层模型实体，未找到则返回 undefined
   */
  getTopLevelModel(): ParametricEntity | undefined {
    // 已经是顶层模型
    if (
      this.entity instanceof HSCore.Model.NCustomizedParametricBackgroundWall ||
      this.entity instanceof HSCore.Model.NCPBackgroundWallUnit ||
      this.entity instanceof HSCore.Model.ParametricCurtain ||
      this.entity instanceof HSCore.Model.ParametricBathroomCabinet
    ) {
      return this.entity;
    }

    // 向上查找顶层模型
    if (
      this.entity instanceof HSCore.Model.NCPBackgroundWallBase ||
      this.entity instanceof HSCore.Model.NCPBackgroundWallArray ||
      this.entity instanceof HSCore.Model.NCPBackgroundWallContent ||
      this.entity instanceof HSCore.Model.ParametricContentBase ||
      this.entity instanceof HSCore.Model.ParametricModelArray ||
      this.entity instanceof HSCore.Model.ParametricModelContent
    ) {
      const topLevelModel = ParametricModelDecorator.getParentByEntityTypes(
        this.entity,
        [
          HSConstants.ModelClass.NCustomizedParametricBackgroundWall,
          HSConstants.ModelClass.NCPBackgroundWallUnit,
          HSConstants.ModelClass.ParametricCurtain,
          HSConstants.ModelClass.ParametricBathroomCabinet,
        ]
      );

      if (topLevelModel) {
        return topLevelModel;
      }
    }

    return undefined;
  }

  /**
   * 递归计算实体相对于基准坐标系的变换矩阵
   * @param entity - 实体对象
   * @param matrix - 累积变换矩阵（可选，用于递归）
   * @returns 变换矩阵
   */
  static getLocalToBaseMatrix(
    entity: ParametricEntity,
    matrix?: Matrix4
  ): Matrix4 {
    if (!matrix) {
      matrix = new Matrix4();
    }

    if (entity instanceof HSCore.Model.ParametricModelArray) {
      // 数组模型：继续向上递归
      if (entity.parent) {
        this.getLocalToBaseMatrix(entity.parent, matrix);
      }
    } else if (
      entity instanceof HSCore.Model.ParametricModelContent ||
      entity instanceof HSCore.Model.NCPBackgroundWallBase ||
      entity instanceof HSCore.Model.ParametricContentBase
    ) {
      // 内容模型：应用局部变换并继续递归
      const localMatrix = new Matrix4().fromArray(
        entity.getLocalToWorldMatrix().toArray()
      );
      matrix.preMultiply(localMatrix);

      if (entity.parent) {
        this.getLocalToBaseMatrix(entity.parent, matrix);
      }
    }

    return matrix;
  }
}