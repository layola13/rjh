/**
 * 参数化背景墙材质应用请求
 * 
 * 用于处理N制定参数化背景墙的材质应用、撤销和重做操作
 */
declare module ApplyNCustomizedParametricBackgroundWallRequest {
  
  import { HSCore } from 'HSCore';
  
  /**
   * 材质元数据接口
   */
  interface MaterialMeta {
    /** 材质查找ID */
    seekId: string | number;
  }
  
  /**
   * 参数化背景墙实体接口
   */
  interface ParametricBackgroundWallEntity {
    /** 参数配置 */
    parameters: {
      /** 属性树 */
      propertytree: unknown;
    };
    /** 构建边界表示 */
    constructBrep(): void;
    /** 标记子模型为脏数据 */
    dirtyChildModels(dirty: boolean): void;
  }
  
  /**
   * N定制参数化背景墙材质应用请求类
   * 
   * 继承自StateRequest，负责处理参数化背景墙的材质应用事务操作
   */
  export class ApplyNCustomizedParametricBackgroundWallRequest extends HSCore.Transaction.Common.StateRequest {
    /** 背景墙实体 */
    private _entity: ParametricBackgroundWallEntity;
    
    /** 面ID列表 */
    private _faceIds?: string[];
    
    /** 材质元数据 */
    private _materialMeta: MaterialMeta;
    
    /** 参数化模型内容 */
    private _content?: HSCore.Model.ParametricModelContent;
    
    /**
     * 构造函数
     * 
     * @param entity - 背景墙实体对象
     * @param faceIds - 要应用材质的面ID数组
     * @param materialMeta - 材质元数据信息
     * @param content - 参数化模型内容（可选）
     */
    constructor(
      entity: ParametricBackgroundWallEntity,
      faceIds: string[] | undefined,
      materialMeta: MaterialMeta,
      content?: HSCore.Model.ParametricModelContent
    );
    
    /**
     * 提交事务时执行
     * 
     * 根据面ID和内容获取变量名，查找对应节点并执行其onEnter回调
     */
    onCommit(): void;
    
    /**
     * 撤销操作时执行
     * 
     * 重新构建实体的边界表示并标记子模型为脏数据
     */
    onUndo(): void;
    
    /**
     * 重做操作时执行
     * 
     * 重新构建实体的边界表示并标记子模型为脏数据
     */
    onRedo(): void;
    
    /**
     * 判断是否可以进行事务字段操作
     * 
     * @returns 始终返回true
     */
    canTransactField(): boolean;
    
    /**
     * 获取日志分类
     * 
     * @returns 参数化背景墙日志组类型
     */
    getCategory(): HSFPConstants.LogGroupTypes;
    
    /**
     * 获取操作描述
     * 
     * @returns 操作描述字符串："参数化背景墙赋材质"
     */
    getDescription(): string;
  }
}

export = ApplyNCustomizedParametricBackgroundWallRequest;