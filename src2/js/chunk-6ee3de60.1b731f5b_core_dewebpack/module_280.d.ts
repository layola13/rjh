/**
 * DXF绘图文档类
 * 用于创建和管理DXF格式的CAD图形文件
 */
declare class Drawing {
  /**
   * AutoCAD颜色索引（ACI）常量
   */
  static readonly ACI: {
    /** 使用图层颜色 */
    LAYER: 0;
    /** 红色 */
    RED: 1;
    /** 黄色 */
    YELLOW: 2;
    /** 绿色 */
    GREEN: 3;
    /** 青色 */
    CYAN: 4;
    /** 蓝色 */
    BLUE: 5;
    /** 洋红色 */
    MAGENTA: 6;
    /** 白色 */
    WHITE: 7;
  };

  /**
   * 预定义的线型
   */
  static readonly LINE_TYPES: ReadonlyArray<{
    /** 线型名称 */
    name: string;
    /** 线型描述 */
    description: string;
    /** 线型元素定义（虚线模式） */
    elements: number[];
  }>;

  /**
   * 预定义的图层
   */
  static readonly LAYERS: ReadonlyArray<{
    /** 图层名称 */
    name: string;
    /** 颜色编号 */
    colorNumber: number;
    /** 线型名称 */
    lineTypeName: string;
  }>;

  /**
   * DXF单位类型枚举
   */
  static readonly UNITS: {
    Unitless: 0;
    Inches: 1;
    Feet: 2;
    Miles: 3;
    Millimeters: 4;
    Centimeters: 5;
    Meters: 6;
    Kilometers: 7;
    Microinches: 8;
    Mils: 9;
    Yards: 10;
    Angstroms: 11;
    Nanometers: 12;
    Microns: 13;
    Decimeters: 14;
    Decameters: 15;
    Hectometers: 16;
    Gigameters: 17;
    "Astronomical units": 18;
    "Light years": 19;
    Parsecs: 20;
  };

  /** 所有图层的集合 */
  layers: Record<string, Layer>;

  /** 当前激活的图层 */
  activeLayer: Layer | null;

  /** 所有线型的集合 */
  lineTypes: Record<string, LineType>;

  /** DXF文件头部信息 */
  headers: Record<string, Array<[number, unknown]>>;

  /**
   * 构造函数
   * 初始化默认图层、线型和单位
   */
  constructor();

  /**
   * 添加自定义线型
   * @param name - 线型名称
   * @param description - 线型描述
   * @param elements - 线型元素数组（正数表示实线长度，负数表示空白长度）
   * @returns 返回Drawing实例以支持链式调用
   */
  addLineType(name: string, description: string, elements: number[]): this;

  /**
   * 添加新图层
   * @param name - 图层名称
   * @param colorNumber - 颜色编号（使用ACI颜色索引）
   * @param lineTypeName - 线型名称
   * @returns 返回Drawing实例以支持链式调用
   */
  addLayer(name: string, colorNumber: number, lineTypeName: string): this;

  /**
   * 设置当前激活图层
   * @param name - 图层名称
   * @returns 返回Drawing实例以支持链式调用
   */
  setActiveLayer(name: string): this;

  /**
   * 在当前图层绘制直线
   * @param x1 - 起点X坐标
   * @param y1 - 起点Y坐标
   * @param x2 - 终点X坐标
   * @param y2 - 终点Y坐标
   * @returns 返回Drawing实例以支持链式调用
   */
  drawLine(x1: number, y1: number, x2: number, y2: number): this;

  /**
   * 在当前图层绘制点
   * @param x - 点的X坐标
   * @param y - 点的Y坐标
   * @returns 返回Drawing实例以支持链式调用
   */
  drawPoint(x: number, y: number): this;

  /**
   * 在当前图层绘制矩形
   * @param x1 - 左下角X坐标
   * @param y1 - 左下角Y坐标
   * @param x2 - 右上角X坐标
   * @param y2 - 右上角Y坐标
   * @returns 返回Drawing实例以支持链式调用
   */
  drawRect(x1: number, y1: number, x2: number, y2: number): this;

  /**
   * 在当前图层绘制圆弧
   * @param x - 圆心X坐标
   * @param y - 圆心Y坐标
   * @param radius - 半径
   * @param startAngle - 起始角度（度）
   * @param endAngle - 结束角度（度）
   * @returns 返回Drawing实例以支持链式调用
   */
  drawArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): this;

  /**
   * 在当前图层绘制圆
   * @param x - 圆心X坐标
   * @param y - 圆心Y坐标
   * @param radius - 半径
   * @returns 返回Drawing实例以支持链式调用
   */
  drawCircle(x: number, y: number, radius: number): this;

  /**
   * 在当前图层绘制文本
   * @param x - 文本插入点X坐标
   * @param y - 文本插入点Y坐标
   * @param height - 文字高度
   * @param rotation - 旋转角度（度）
   * @param text - 文本内容
   * @param horizontalAlignment - 水平对齐方式，默认"left"
   * @param verticalAlignment - 垂直对齐方式，默认"baseline"
   * @returns 返回Drawing实例以支持链式调用
   */
  drawText(
    x: number,
    y: number,
    height: number,
    rotation: number,
    text: string,
    horizontalAlignment?: "left" | "center" | "right",
    verticalAlignment?: "baseline" | "bottom" | "middle" | "top"
  ): this;

  /**
   * 在当前图层绘制2D多段线
   * @param points - 点坐标数组
   * @param closed - 是否闭合，默认false
   * @param startWidth - 起始宽度，默认0
   * @param endWidth - 结束宽度，默认0
   * @returns 返回Drawing实例以支持链式调用
   */
  drawPolyline(points: number[][], closed?: boolean, startWidth?: number, endWidth?: number): this;

  /**
   * 在当前图层绘制3D多段线
   * @param points - 3D点坐标数组，每个点必须包含[x, y, z]
   * @returns 返回Drawing实例以支持链式调用
   * @throws 如果点坐标不是3D坐标则抛出错误
   */
  drawPolyline3d(points: [number, number, number][]): this;

  /**
   * 设置当前图层的真彩色
   * @param rgbColor - RGB颜色值
   * @returns 返回Drawing实例以支持链式调用
   */
  setTrueColor(rgbColor: number): this;

  /**
   * 在当前图层绘制3D面
   * @param x1 - 第一个顶点X坐标
   * @param y1 - 第一个顶点Y坐标
   * @param z1 - 第一个顶点Z坐标
   * @param x2 - 第二个顶点X坐标
   * @param y2 - 第二个顶点Y坐标
   * @param z2 - 第二个顶点Z坐标
   * @param x3 - 第三个顶点X坐标
   * @param y3 - 第三个顶点Y坐标
   * @param z3 - 第三个顶点Z坐标
   * @param x4 - 第四个顶点X坐标
   * @param y4 - 第四个顶点Y坐标
   * @param z4 - 第四个顶点Z坐标
   * @returns 返回Drawing实例以支持链式调用
   */
  drawFace(
    x1: number, y1: number, z1: number,
    x2: number, y2: number, z2: number,
    x3: number, y3: number, z3: number,
    x4: number, y4: number, z4: number
  ): this;

  /**
   * 设置DXF文件头部变量
   * @param key - 头部变量名称（不含$前缀）
   * @param value - 头部变量值数组，格式为[组码, 值]
   * @returns 返回Drawing实例以支持链式调用
   */
  header(key: string, value: Array<[number, unknown]>): this;

  /**
   * 设置绘图单位
   * @param unit - 单位名称（必须是UNITS中定义的键）
   * @returns 返回Drawing实例以支持链式调用
   */
  setUnits(unit: keyof typeof Drawing.UNITS): this;

  /**
   * 生成完整的DXF格式字符串
   * @returns DXF文件内容
   */
  toDxfString(): string;

  /**
   * 生成DXF线型表（内部方法）
   * @private
   */
  private _getDxfLtypeTable(): string;

  /**
   * 生成DXF图层表（内部方法）
   * @private
   */
  private _getDxfLayerTable(): string;

  /**
   * 生成DXF头部信息（内部方法）
   * @private
   */
  private _getHeader(key: string, value: Array<[number, unknown]>): string;
}

/**
 * DXF图层类（来自模块282）
 */
declare class Layer {
  constructor(name: string, colorNumber: number, lineTypeName: string);
  addShape(shape: Shape): void;
  setTrueColor(rgbColor: number): void;
  toDxfString(): string;
  shapesToDxf(): string;
}

/**
 * DXF线型类（来自模块281）
 */
declare class LineType {
  constructor(name: string, description: string, elements: number[]);
  toDxfString(): string;
}

/**
 * 图形基类或直线类（来自模块283）
 */
declare class Shape {
  constructor(x1: number, y1: number, x2: number, y2: number);
}

export = Drawing;