/**
 * 填充图案类型枚举
 * 定义了所有可用的填充图案类型
 */
export enum FillPatternType {
  /** 纱窗图案 */
  FlyScreen = "flyscreen",
  /** 高亮纱窗图案 */
  FlyScreenHighlight = "flyscreen_highlight",
  /** 砖块图案 */
  Brick = "brick",
  /** 高亮砖块图案 */
  BrickHighlight = "brick_highlight",
  /** 男性图标 */
  Man = "man",
  /** 女性图标 */
  Woman = "woman"
}

/**
 * 图案渲染完成回调函数类型
 * @param image 渲染完成的图像对象
 */
type PatternCallback = (image: HTMLImageElement) => void;

/**
 * 填充图案管理类
 * 单例模式，负责生成和管理各种填充图案
 */
export declare class FillPattern {
  /**
   * 存储所有已渲染的图案
   * key: 图案类型
   * value: 对应的图像对象
   */
  private readonly Patterns: Map<FillPatternType, HTMLImageElement>;

  /**
   * 私有构造函数，防止外部实例化
   */
  private constructor();

  /**
   * 获取FillPattern单例实例
   */
  static readonly Instance: FillPattern;

  /**
   * 预加载所有图案
   * 初始化时调用，渲染所有类型的填充图案
   */
  Prepare(): void;

  /**
   * 渲染纱窗图案
   * 生成20x20像素的对角线交叉图案
   * @param callback 渲染完成后的回调函数
   * @param backgroundColor 可选的背景颜色
   */
  renderFlyScreen(callback: PatternCallback, backgroundColor?: string): void;

  /**
   * 渲染高亮纱窗图案
   * 使用高亮背景色的纱窗图案
   * @param callback 渲染完成后的回调函数
   */
  renderHighlightFlyScreen(callback: PatternCallback): void;

  /**
   * 渲染砖块图案
   * 生成240x160像素的砖墙纹理
   * @param callback 渲染完成后的回调函数
   * @param fillColor 砖块填充颜色，默认使用ShapeColor.brick
   */
  renderBrick(callback: PatternCallback, fillColor?: string): void;

  /**
   * 渲染高亮砖块图案
   * 使用高亮颜色的砖块图案
   * @param callback 渲染完成后的回调函数
   */
  renderHighlightBrick(callback: PatternCallback): void;

  /**
   * 渲染男性图标
   * 从FillImageData加载男性图标数据
   * @param callback 渲染完成后的回调函数
   */
  renderManImage(callback: PatternCallback): void;

  /**
   * 渲染女性图标
   * 从FillImageData加载女性图标数据
   * @param callback 渲染完成后的回调函数
   */
  renderWomenImage(callback: PatternCallback): void;
}

/**
 * 纱窗图案类型别名
 * @deprecated 使用 FillPatternType.FlyScreen
 */
export type FlyScreen = FillPatternType.FlyScreen;

/**
 * 高亮纱窗图案类型别名
 * @deprecated 使用 FillPatternType.FlyScreenHighlight
 */
export type FlyScreenHighlight = FillPatternType.FlyScreenHighlight;

/**
 * 砖块图案类型别名
 * @deprecated 使用 FillPatternType.Brick
 */
export type Brick = FillPatternType.Brick;

/**
 * 高亮砖块图案类型别名
 * @deprecated 使用 FillPatternType.BrickHighlight
 */
export type BrickHighlight = FillPatternType.BrickHighlight;

/**
 * 男性图标类型别名
 * @deprecated 使用 FillPatternType.Man
 */
export type Man = FillPatternType.Man;

/**
 * 女性图标类型别名
 * @deprecated 使用 FillPatternType.Woman
 */
export type Woman = FillPatternType.Woman;