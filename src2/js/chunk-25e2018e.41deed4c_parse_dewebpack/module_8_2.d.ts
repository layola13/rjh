/**
 * 基于结果的编译器模块
 * 提供门窗配置计算和类型匹配功能
 */

/**
 * 匹配目标类型枚举
 * 定义了门窗系统中所有可计算的组件类型
 */
export enum MatchTarget {
  /** 框架 */
  Frame = "frame",
  /** 玻璃扇 */
  GlassSash = "sash",
  /** 纱窗扇 */
  ScreenSash = "screen",
  /** 防盗网 */
  AntiTheft = "antiTheft",
  /** 扇玻璃 */
  SashGlass = "sashGlass",
  /** 固定玻璃 */
  FixedGlass = "fixedGlass",
  /** 角连接件 */
  CornerJoiner = "cornerJoiner",
  /** 连接件 */
  Connector = "connector",
  /** 固定格 */
  FixedCell = "fixedCell",
  /** 开启格 */
  OpenCell = "openCell",
  /** 固定遮阳 */
  FixedShade = "fixedShade",
  /** 扇遮阳 */
  SashShade = "sashShade",
  /** 装饰条 */
  DecorationBar = "decorationBar",
  /** 子母扇 */
  DoubleSash = "doubleSash"
}

/**
 * 值类型枚举
 * 定义计算结果的度量单位类型
 */
export enum ValueType {
  /** 长度类型（米、毫米等） */
  Length = 0,
  /** 面积类型（平方米等） */
  Area = 1
}

/**
 * 编译器接口
 * 定义了编译器必须实现的核心方法
 */
interface ICompiler {
  /** 临时信息缓存 */
  tmpInfo: Array<{ frameId: string }>;
  
  /**
   * 重新加载临时信息
   * @param frameId - 框架ID
   */
  reloadTmpInfo(frameId: string): void;
  
  /**
   * 推送临时键值对
   * @param key - 键名
   * @param value - 键值
   */
  pushTmpKey(key: string, value: string): void;
}

/**
 * 计算目标对象接口
 * 描述门窗组件的通用属性
 */
interface ICalcTarget {
  /** 组件类型 */
  type: string;
  /** 扇分配方式（开启方式编码） */
  sashAssignWay?: number;
  /** 是否为门 */
  isDoor?: boolean;
  /** 是否为推拉 */
  isSlide?: boolean;
  /** 宿主类型 */
  hostType?: string;
  /** 固定扇宽度（用于子母扇判断） */
  widthFixedSash?: number;
  /** 规格说明 */
  specs?: string;
  /** 是否为异形 */
  innerPoly?: boolean;
  /** 型材面宽 */
  profileSize?: number;
  /** 原始角度 */
  origin_angle?: number;
  /** 是否可开启 */
  openable?: boolean;
}

/**
 * 绘图信息接口
 */
interface IDrawingInfo {
  /** 框架ID */
  frameId: string;
}

/**
 * 计算目标集合接口
 * 包含所有类型的门窗组件集合
 */
interface ICalcTargetCollection {
  /** 条形组件（型材等） */
  bar: ICalcTarget[];
  /** 附加组件 */
  addition: ICalcTarget[];
  /** 玻璃组件 */
  glass: ICalcTarget[];
  /** 多边形玻璃组件 */
  polyGLass: ICalcTarget[];
}

/**
 * 基于结果的编译器类
 * 负责门窗配置的解析、变量推送和目标计算
 */
export class ResultBasedCompile {
  /** 编译器实例 */
  private readonly compiler: ICompiler;
  
  /**
   * 值类型映射表
   * 将组件类型映射到其计算单位（长度或面积）
   */
  private readonly valueTypeMap: Map<MatchTarget, ValueType>;

  /**
   * 构造函数
   * @param compiler - 编译器实例
   */
  constructor(compiler: ICompiler) {
    this.compiler = compiler;
    this.valueTypeMap = new Map<MatchTarget, ValueType>([
      [MatchTarget.Frame, ValueType.Area],
      [MatchTarget.GlassSash, ValueType.Area],
      [MatchTarget.ScreenSash, ValueType.Area],
      [MatchTarget.AntiTheft, ValueType.Area],
      [MatchTarget.SashGlass, ValueType.Area],
      [MatchTarget.FixedGlass, ValueType.Area],
      [MatchTarget.CornerJoiner, ValueType.Length],
      [MatchTarget.Connector, ValueType.Length],
      [MatchTarget.FixedCell, ValueType.Area],
      [MatchTarget.OpenCell, ValueType.Area],
      [MatchTarget.FixedShade, ValueType.Area],
      [MatchTarget.SashShade, ValueType.Area],
      [MatchTarget.DecorationBar, ValueType.Area]
    ]);
  }

  /**
   * 推送绘图信息到编译器
   * @param drawingInfo - 绘图信息对象，包含frameId
   */
  pushDrawingInfos(drawingInfo?: IDrawingInfo): void {
    if (drawingInfo) {
      this.compiler.reloadTmpInfo(drawingInfo.frameId);
    } else if (this.compiler.tmpInfo.length > 0) {
      this.compiler.reloadTmpInfo(this.compiler.tmpInfo[0].frameId);
    }
  }

  /**
   * 为目标组件推送变量到编译器
   * 根据组件类型和属性，推送相应的键值对变量
   * @param target - 计算目标对象
   */
  pushVariablesForTarget(target?: ICalcTarget): void {
    if (!target) {
      return;
    }

    // 处理可推送面积类型的组件
    if (this.isPushableArea(target)) {
      const openToward = this.getOpenToward(target.sashAssignWay);
      if (openToward) {
        this.compiler.pushTmpKey("开向", openToward);
      }

      const openMethod = this.getOpenMethod(target.sashAssignWay);
      if (openMethod) {
        this.compiler.pushTmpKey("开启方式", openMethod);
      }

      this.compiler.pushTmpKey("门窗类型", target.isDoor ? "门" : "窗");
      this.compiler.pushTmpKey("平移平开", target.isSlide ? "是" : "否");

      // 处理子母扇类型
      if (target.hostType?.toLowerCase() === "doublesash") {
        let sashType: string;
        if (target.widthFixedSash !== undefined) {
          sashType = target.widthFixedSash ? "子" : "母";
        } else {
          sashType = "无";
        }
        this.compiler.pushTmpKey("子母扇", sashType);
      }
    }

    // 处理填充物（玻璃等）
    if (this.isFiller(target)) {
      if (target.specs) {
        this.compiler.pushTmpKey("玻璃", target.specs);
        this.compiler.pushTmpKey("glass", target.specs);
      }
      this.compiler.pushTmpKey("异形", target.innerPoly ? "是" : "否");
    }

    // 推送其他属性
    if (target.profileSize !== undefined) {
      this.compiler.pushTmpKey("面宽", String(target.profileSize));
    }

    if (target.origin_angle !== undefined) {
      this.compiler.pushTmpKey("角度", String(target.origin_angle));
    }

    if (target.openable !== undefined) {
      this.compiler.pushTmpKey("可开启", target.openable ? "是" : "否");
    }
  }

  /**
   * 获取计算目标集合
   * 根据目标类型和值类型，从集合中筛选匹配的组件
   * @param targetType - 目标组件类型
   * @param collection - 组件集合
   * @returns 匹配的组件数组
   */
  fetchCalcTargets(
    targetType: MatchTarget,
    collection: ICalcTargetCollection
  ): ICalcTarget[] {
    const valueType = this.valueTypeMap.get(targetType);

    if (valueType === ValueType.Length) {
      return collection.bar.filter(
        item => item.type.toLowerCase() === targetType.toLowerCase()
      );
    }

    return [
      ...collection.addition,
      ...collection.glass,
      ...collection.polyGLass
    ].filter(item => item.type.toLowerCase() === targetType.toLowerCase());
  }

  /**
   * 判断是否为填充物组件
   * @param target - 计算目标对象
   * @returns 如果是填充物类型返回true
   */
  private isFiller(target: ICalcTarget): boolean {
    const fillerTypes = [
      MatchTarget.FixedGlass,
      MatchTarget.FixedCell,
      MatchTarget.SashGlass
    ];

    return fillerTypes.some(
      type => type.toLowerCase() === target.type.toLowerCase()
    );
  }

  /**
   * 判断是否为可推送面积变量的组件
   * @param target - 计算目标对象
   * @returns 如果是可推送类型返回true
   */
  private isPushableArea(target: ICalcTarget): boolean {
    const pushableTypes = [
      MatchTarget.GlassSash,
      MatchTarget.ScreenSash,
      MatchTarget.OpenCell
    ];

    const isPushableType = pushableTypes.some(
      type => type.toLowerCase() === target.type.toLowerCase()
    );

    const validHostTypes = ["sash", "doublesash", "fold"];
    const hasValidHostType = target.hostType
      ? validHostTypes.some(
          type => type.toLowerCase() === target.hostType!.toLowerCase()
        )
      : false;

    return isPushableType && hasValidHostType;
  }

  /**
   * 获取开向描述
   * @param sashAssignWay - 扇分配方式编码
   * @returns 开向描述字符串
   */
  private getOpenToward(sashAssignWay?: number): string | undefined {
    // 实现需要依赖 Utils.getOpenToward
    // 此处为类型定义，具体实现需要导入相应模块
    return undefined;
  }

  /**
   * 获取开启方式描述
   * @param sashAssignWay - 扇分配方式编码
   * @returns 开启方式描述字符串
   */
  private getOpenMethod(sashAssignWay?: number): string | undefined {
    // 实现需要依赖 Utils.getOpenMethod
    // 此处为类型定义，具体实现需要导入相应模块
    return undefined;
  }
}