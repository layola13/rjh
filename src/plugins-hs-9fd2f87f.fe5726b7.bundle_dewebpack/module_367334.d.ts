/**
 * 窗户编辑命令类型定义
 * 用于处理参数化窗户模型的编辑操作
 */

/**
 * 参数化窗户模型接口
 */
interface IParametricWindowModel extends HSCore.Model.Parametrization.Window {
  /** 窗户参数配置 */
  parameters: {
    /** 窗框参数 */
    frame: {
      /** 窗框宽度 */
      width: number;
      /** 材质数据 */
      materialData?: IMaterialData;
    };
    /** 材质数据（非窗框类型） */
    materialData?: IMaterialData;
    /** 型材数据 */
    profileData?: {
      /** 型材ID */
      seekId: string;
    };
  };

  /**
   * 标记几何体需要更新
   */
  dirtyGeometry(): void;

  /**
   * 获取唯一父级模型
   */
  getUniqueParent(): IParametricWindowModel;

  /**
   * 检查实例类型
   * @param modelClass 模型类名
   */
  instanceOf(modelClass: string): boolean;
}

/**
 * 材质数据接口
 */
interface IMaterialData {
  /** 材质唯一标识 */
  seekId: string;
  /** 产品类型 */
  productType: HSCatalog.ProductTypeEnum;
}

/**
 * 型材数据接口
 */
interface IProfileData {
  /** 型材唯一标识 */
  seekId: string;
  /** 产品类型 */
  productType: HSCatalog.ProductTypeEnum;
}

/**
 * 键盘事件数据接口
 */
interface IKeyboardEventData {
  /** 按键代码 */
  keyCode: number;
}

/**
 * 内容消息数据接口
 */
interface IContentMessageData {
  /** 产品类型 */
  productType: HSCatalog.ProductTypeEnum;
  /** 产品唯一标识 */
  seekId: string;
}

/**
 * 窗户编辑命令类
 * 继承自 HSApp.Cmd.Command，用于处理窗户的各种编辑操作
 */
export default class CornerWindowEditCommand extends HSApp.Cmd.Command {
  /** 参数化窗户模型集合 */
  private _parametricmodels: IParametricWindowModel[];

  /** 正在编辑的组件 */
  private _editingComponent: unknown;

  /** 操作类型描述 */
  private _actionType: string;

  /** 编辑会话 */
  private _session: any;

  /** 原始宽度（用于撤销） */
  private _oldWidth: number;

  /**
   * 构造函数
   * @param parametricModels 参数化窗户模型数组
   */
  constructor(parametricModels: IParametricWindowModel[]);

  /**
   * 判断是否可以执行撤销/重做操作
   * @returns 始终返回 false
   */
  canUndoRedo(): boolean;

  /**
   * 命令执行时的回调
   * 启动事务会话并保存初始状态
   */
  onExecute(): void;

  /**
   * 获取角窗对象
   * @returns 返回第一个模型的父级，如果没有模型则返回 null
   */
  getCornerWindow(): IParametricWindowModel | null;

  /**
   * 接收并处理各种消息事件
   * @param message 消息类型
   * @param data 消息数据
   * @returns 是否处理了该消息
   */
  onReceive(message: string, data: any): boolean;

  /**
   * 取消编辑操作
   * 中止会话并完成命令
   */
  private _cancelEdit(): void;

  /**
   * 应用编辑操作
   * 提交会话并完成命令
   */
  private _applyEdit(): void;

  /**
   * 应用材质到窗户
   * @param materialData 材质数据
   */
  private _applyMaterial(materialData: IMaterialData): void;

  /**
   * 显示或隐藏角窗子组件（窗台石/窗套）
   * @param isHide 是否隐藏
   */
  private _isHideCornerWindow(isHide: boolean): void;

  /**
   * 将窗户材质改为与宿主墙一致
   * @param sameToHost 是否与宿主一致
   */
  private _changeMaterialTohost(sameToHost: boolean): void;

  /**
   * 旋转窗户材质
   */
  private _changeMaterialRotation(): void;

  /**
   * 修改窗框单元数
   * @param frameNumber 单元数（将乘以1000后传递）
   */
  private _changeWindowFrameNumber(frameNumber: number): void;

  /**
   * 修改窗框宽度（提交事务）
   * @param width 新宽度值
   */
  private _changeWindowFrameWidth(width: number): void;

  /**
   * 修改窗框宽度（实时更新，不提交事务）
   * @param width 新宽度值
   */
  private _changeWindowFrameWidthOnValueChange(width: number): void;

  /**
   * 修改窗洞宽度
   * @param width 窗洞宽度
   */
  private _changeCornerWindowPocketWidth(width: number): void;

  /**
   * 修改窗洞厚度
   * @param thickness 窗洞厚度
   */
  private _changeCornerWindowPocketThickness(thickness: number): void;

  /**
   * 修改窗洞外部宽度
   * @param outerWidth 外部宽度
   */
  private _changeCornerWindowPocketOuterWidth(outerWidth: number): void;

  /**
   * 修改窗洞外部厚度
   * @param outerThickness 外部厚度
   */
  private _changeCornerWindowPocketOuterThickness(outerThickness: number): void;

  /**
   * 获取操作描述（用于日志记录）
   * @returns 返回"编辑窗户{操作类型}"格式的描述
   */
  getDescription(): string;

  /**
   * 获取操作分类（用于日志分组）
   * @returns 返回内容操作类型
   */
  getCategory(): string;
}