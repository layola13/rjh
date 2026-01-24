import { CompositeRequest } from 'HSCore/Transaction/Common';

/**
 * 删除硬装造型的事务请求类
 * 用于处理天花板附着照明设备的移除操作，支持撤销/重做
 */
export default class RemoveCustomizedModelRequest extends CompositeRequest {
  /** 自定义模型实例 */
  private _customizedModel: any;
  
  /** 存储子元素原始高度的映射表，用于撤销操作 */
  private _childrenHeight: Map<string, number>;
  
  /** 模型规格数据，用于撤销时恢复 */
  private _spec: any;

  /**
   * 构造函数
   * @param customizedModel - 要删除的自定义模型对象
   */
  constructor(customizedModel: any) {
    super();
    this._customizedModel = customizedModel;
    this._childrenHeight = new Map<string, number>();
  }

  /**
   * 提交删除操作
   * @returns 被删除的自定义模型
   */
  onCommit(): any {
    // 移除自定义模型并保存规格信息用于撤销
    this._spec = HSCore.Util.Content.removeCustomizedModel(this._customizedModel);
    
    // 记录所有照明设备的当前高度
    this._getLightingsOffsetHeight();
    
    // 调用父类的提交方法
    super.onCommit();
    
    // 移动附着的内容到重做状态
    this._moveAttachedContents('onRedo');
    
    return this._customizedModel;
  }

  /**
   * 获取并存储天花板附着照明设备的偏移高度
   * 遍历模型中的所有内容，记录非管灯类型的天花板照明设备的Z轴坐标
   * @private
   */
  private _getLightingsOffsetHeight(): void {
    this._customizedModel.forEachContent((content: any) => {
      // 筛选天花板附着照明设备（排除灯管）
      if (
        content.contentType &&
        !content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_tubeLamp) &&
        content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttachedLighting)
      ) {
        this._childrenHeight.set(content.ID, content.z);
      }
    });
  }

  /**
   * 移动附着的内容到指定状态的位置
   * @param action - 操作类型：'onRedo' 重做时移动到天花板高度，'onUndo' 撤销时恢复原始高度
   * @private
   */
  private _moveAttachedContents(action: 'onRedo' | 'onUndo'): void {
    const document = HSCore.Doc.getDocManager().activeDocument;
    const activeLayerHeight = document.scene.activeLayer?.height ?? document.global_wall_height3d;

    this._customizedModel.forEachContent((content: any) => {
      // 只处理天花板附着照明设备（排除灯管）
      if (
        content.contentType &&
        !content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_tubeLamp) &&
        content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttachedLighting)
      ) {
        // 重做：移动到天花板位置；撤销：恢复原始高度
        content.z = action === 'onRedo' 
          ? activeLayerHeight - content.ZSize 
          : this._childrenHeight.get(content.ID);
        
        content.dirtyPosition();
      }
    });
  }

  /**
   * 撤销删除操作
   * 恢复自定义模型并将附着内容移回原位置
   */
  onUndo(): void {
    super.onUndo();
    HSCore.Util.Content.addCustomizedModel(this._spec);
    this._moveAttachedContents('onUndo');
  }

  /**
   * 重做删除操作
   * 再次移除自定义模型并调整附着内容位置
   */
  onRedo(): void {
    HSCore.Util.Content.removeCustomizedModel(this._customizedModel);
    super.onRedo();
    this._moveAttachedContents('onRedo');
  }

  /**
   * 获取操作描述
   * @returns 操作的中文描述
   */
  getDescription(): string {
    return '删除硬装造型';
  }

  /**
   * 获取操作分类
   * @returns 日志分组类型
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}