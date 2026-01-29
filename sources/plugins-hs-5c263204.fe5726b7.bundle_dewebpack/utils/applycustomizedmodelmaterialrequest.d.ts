/**
 * 应用自定义模型材质请求
 * 用于管理实体的面材质应用、撤销和重做操作
 */
export declare class ApplyCustomizedModelMaterialRequest extends HSCore.Transaction.Request {
  /**
   * 目标实体对象
   */
  private _entity: any;

  /**
   * 面ID到材质的映射表
   * - key: 面ID（number）
   * - value: Material对象或清除标记
   */
  private _materialMap: Map<number, HSCore.Material.Material | any>;

  /**
   * 请求选项配置
   */
  private _options: ApplyCustomizedModelMaterialOptions;

  /**
   * 操作前的材质状态快照（用于撤销）
   */
  private _befores: any[];

  /**
   * 操作后的材质状态快照（用于重做）
   */
  private _afters: any[];

  /**
   * 材质笔刷工具实例
   */
  private MaterialBrushUtil: typeof HSApp.PaintPluginHelper.Util.MaterialBrushUtil;

  /**
   * 混合涂装工具实例
   */
  private MixPaintUtil: typeof HSApp.PaintPluginHelper.Util.MixPaintUtil;

  /**
   * 创建应用自定义模型材质请求
   * 
   * @param entity - 要应用材质的实体对象
   * @param materialMap - 面ID到材质的映射关系
   * @param options - 可选配置项
   */
  constructor(
    entity: any,
    materialMap: Map<number, HSCore.Material.Material | any>,
    options?: ApplyCustomizedModelMaterialOptions
  );

  /**
   * 提交材质应用操作
   * 
   * 执行流程：
   * 1. 保存当前材质状态用于撤销
   * 2. 提取自定义模型面组ID
   * 3. 应用新材质或清除现有材质
   * 4. 更新混合涂装的组背景
   * 5. 刷新面材质（如果配置了refreshAll）
   * 6. 保存新状态用于重做
   */
  onCommit(): void;

  /**
   * 撤销材质应用操作
   * 恢复到操作前的材质状态
   */
  onUndo(): void;

  /**
   * 重做材质应用操作
   * 恢复到操作后的材质状态
   */
  onRedo(): void;
}

/**
 * 应用材质请求的配置选项
 */
export interface ApplyCustomizedModelMaterialOptions {
  /**
   * 是否刷新所有受影响的面材质
   * @default false
   */
  refreshAll?: boolean;

  /**
   * 其他扩展选项
   */
  [key: string]: any;
}

/**
 * HSCore命名空间声明（如果全局未定义）
 */
declare global {
  namespace HSCore {
    namespace Material {
      class Material {
        mixpaint?: {
          faceGroupId?: number;
          clear(data: any): void;
          getFaceIds(): number[];
        };
      }
    }

    namespace Transaction {
      class Request {
        onCommit?(): void;
        onUndo?(): void;
        onRedo?(): void;
      }
    }

    namespace Util {
      namespace Paints {
        function updateMixPaintWithGroupBackground(
          entity: any,
          faceGroupIds: number[],
          faceIds: number[]
        ): void;
      }
    }
  }

  namespace HSApp {
    namespace PaintPluginHelper {
      namespace Util {
        const MaterialBrushUtil: {
          getDiyFaceMaterialDump(entity: any, faceIds: number[]): any[];
          setDiyFaceMaterialDump(entity: any, dump: any[]): void;
        };

        const MixPaintUtil: {
          extractCustomizedModelFaceGroupIds(entity: any, faceIds: number[]): number[];
        };
      }
    }
  }
}