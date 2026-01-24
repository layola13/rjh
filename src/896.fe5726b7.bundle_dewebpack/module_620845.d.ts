/**
 * 风格选择器管理类
 * 用于管理房间风格选择组件的生命周期和数据绑定
 */
declare class StyleSelectorManager {
  /**
   * 风格类型列表
   * @private
   */
  private _styleTypeList: StyleType[];

  /**
   * 当前选中的风格值
   * @private
   */
  private _resultValue: string | number | undefined;

  /**
   * 原始风格值（用于判断是否变更）
   * @private
   */
  private _originValue: string | number | undefined;

  /**
   * 风格选择视图的React元素
   * @private
   */
  private _styleSelectViewElem: React.ReactElement | undefined;

  /**
   * 保存的DOM节点引用
   * @private
   */
  private _savedDomNode: HTMLElement | undefined;

  /**
   * 构造函数
   * @param styleTypeList - 可选的风格类型列表
   */
  constructor(styleTypeList: StyleType[]);

  /**
   * 绑定数据到组件
   * @param data - 包含房间风格信息的数据对象
   */
  bindData(data: BindDataParams): void;

  /**
   * 在指定DOM节点中渲染组件
   * @param domNode - 目标DOM节点
   */
  show(domNode: HTMLElement): void;

  /**
   * 隐藏并卸载组件
   */
  hide(): void;

  /**
   * 检查风格值是否已变更
   * @returns 如果当前值与原始值不同返回true
   */
  isChanged(): boolean;

  /**
   * 将选中的风格值写入结果对象
   * @param result - 结果对象
   */
  writeResult(result: WriteResultParams): void;

  /**
   * 是否需要后处理
   * @returns 始终返回false
   */
  needPostProcess(): boolean;
}

/**
 * 风格类型定义
 */
interface StyleType {
  id: string | number;
  name: string;
  [key: string]: unknown;
}

/**
 * bindData方法的参数类型
 */
interface BindDataParams {
  /**
   * 房间风格ID
   */
  roomStyle: string | number;
  [key: string]: unknown;
}

/**
 * writeResult方法的参数类型
 */
interface WriteResultParams {
  /**
   * 易家房间风格（写入目标）
   */
  ezhomeRoomStyle: string | number | undefined;
  [key: string]: unknown;
}

export default StyleSelectorManager;