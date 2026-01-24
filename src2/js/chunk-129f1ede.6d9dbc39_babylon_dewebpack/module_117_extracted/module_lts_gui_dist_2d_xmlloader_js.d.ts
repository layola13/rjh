/**
 * XML布局加载器，用于从XML文件加载和构建Babylon.js GUI控件树
 */
export declare class XmlLoader {
  /**
   * 存储所有已创建的GUI节点，以ID为键
   */
  private _nodes: Record<string, any>;

  /**
   * XML节点类型枚举
   */
  private readonly _nodeTypes: {
    element: 1;
    attribute: 2;
    text: 3;
  };

  /**
   * 标记布局是否已加载完成
   */
  private _isLoaded: boolean;

  /**
   * 需要从类属性获取的特殊对象属性映射
   * 包括对齐方式、拉伸模式等枚举类型属性
   */
  private readonly _objectAttributes: {
    textHorizontalAlignment: 1;
    textVerticalAlignment: 2;
    horizontalAlignment: 3;
    verticalAlignment: 4;
    stretch: 5;
  };

  /**
   * 根节点引用
   */
  private _rootNode: any | null;

  /**
   * 父类上下文，用于解析数据绑定和方法链
   */
  private _parentClass: any | null;

  /**
   * 创建XML加载器实例
   * @param parentClass 可选的父类上下文，用于数据绑定和方法链解析
   */
  constructor(parentClass?: any | null);

  /**
   * 通过链式路径获取对象属性（如 "obj.prop.subprop"）
   * @param path 点分隔的属性路径字符串
   * @returns 解析后的属性值
   */
  private _getChainElement(path: string): any;

  /**
   * 获取BABYLON.GUI类的静态属性（如枚举值）
   * @param attributePath 格式为 "ClassName.PropertyName" 的属性路径
   * @returns 类的静态属性值
   */
  private _getClassAttribute(attributePath: string): any;

  /**
   * 根据XML元素创建对应的GUI控件
   * @param xmlElement XML元素节点
   * @param parentControl 父控件容器
   * @param addToParent 是否自动添加到父容器，默认true
   * @returns 创建的GUI控件实例
   * @throws 当控件类型不存在或属性解析失败时抛出异常
   */
  private _createGuiElement(
    xmlElement: Element,
    parentControl?: any,
    addToParent?: boolean
  ): any;

  /**
   * 解析Grid控件的行列结构
   * @param xmlElement Grid元素节点
   * @param gridControl Grid控件实例
   * @param parentControl 父控件容器
   * @throws 当行列定义不符合规范时抛出异常
   */
  private _parseGrid(
    xmlElement: Element,
    gridControl: any,
    parentControl: any
  ): void;

  /**
   * 解析普通元素节点及其子节点
   * @param xmlElement XML元素节点
   * @param control 当前控件实例
   * @param parentControl 父控件容器
   */
  private _parseElement(
    xmlElement: Element,
    control: any,
    parentControl: any
  ): void;

  /**
   * 准备数据源绑定的子元素
   * @param xmlElement 带有dataSource属性的XML元素
   * @param control 当前控件实例
   * @param iteratorName 迭代器变量名
   * @param dataSource 数据源数组或对象
   * @param key 当前数据项的键或索引
   */
  private _prepareSourceElement(
    xmlElement: Element,
    control: any,
    iteratorName: string,
    dataSource: any[] | Record<string, any>,
    key: string | number
  ): void;

  /**
   * 解析带有dataSource属性的元素，实现数据绑定和模板循环
   * @param xmlElement 带有dataSource属性的XML元素
   * @param control 当前控件实例
   * @param parentControl 父控件容器
   * @throws 当dataSource语法不正确时抛出异常
   */
  private _parseElementsFromSource(
    xmlElement: Element,
    control: any,
    parentControl: any
  ): void;

  /**
   * 递归解析XML节点树
   * @param xmlNode 当前XML节点
   * @param parentControl 父控件容器
   * @param autoGenerateId 是否自动生成ID，默认false
   */
  private _parseXml(
    xmlNode: Node,
    parentControl: any,
    autoGenerateId?: boolean
  ): void;

  /**
   * 检查布局是否已加载完成
   * @returns 加载完成返回true
   */
  isLoaded(): boolean;

  /**
   * 通过ID获取已创建的GUI节点
   * @param id 节点ID
   * @returns 对应的GUI控件实例，不存在返回undefined
   */
  getNodeById(id: string): any | undefined;

  /**
   * 获取所有已创建的GUI节点字典
   * @returns 以ID为键的节点映射对象
   */
  getNodes(): Record<string, any>;

  /**
   * 释放所有资源，销毁根节点及子节点
   */
  dispose(): void;

  /**
   * 从URL加载XML布局文件（回调方式）
   * @param url XML文件的URL路径
   * @param parentControl 根父控件容器
   * @param onSuccess 加载成功回调函数
   * @param onError 加载失败回调函数
   * @throws 当XML格式错误时抛出异常
   */
  loadLayout(
    url: string,
    parentControl: any,
    onSuccess?: (() => void) | null,
    onError?: ((error: string) => void) | null
  ): void;

  /**
   * 从URL加载XML布局文件（Promise方式）
   * @param url XML文件的URL路径
   * @param parentControl 根父控件容器
   * @returns Promise，成功时resolve，失败时reject并返回错误信息
   */
  loadLayoutAsync(url: string, parentControl: any): Promise<void>;
}