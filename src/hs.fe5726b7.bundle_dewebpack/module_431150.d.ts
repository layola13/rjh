/**
 * RGB色值的最小值
 */
declare const RGB_MIN_VALUE = 0;

/**
 * RGB色值的最大值
 */
declare const RGB_MAX_VALUE = 255;

/**
 * 颜色解析器的配置接口
 */
interface ColorParser {
  /**
   * 用于匹配颜色字符串的正则表达式
   */
  re: RegExp;
  
  /**
   * 示例颜色字符串数组
   */
  example: string[];
  
  /**
   * 处理正则匹配结果的函数
   * @param matches - 正则表达式匹配的结果数组
   * @returns RGB三色通道值数组 [r, g, b]
   */
  process(matches: RegExpExecArray): [number, number, number];
}

/**
 * 预定义的HTML颜色名称映射表类型
 */
type NamedColors = Record<string, string>;

/**
 * RGB颜色解析器类
 * 用于解析各种格式的颜色字符串（十六进制、rgb()、颜色名称）并提供转换功能
 * 
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * @link http://www.phpied.com/rgb-color-parser-in-javascript/
 * @license Use it if you like it
 */
declare class RGBColor {
  /**
   * 红色通道值 (0-255)
   */
  r: number;
  
  /**
   * 绿色通道值 (0-255)
   */
  g: number;
  
  /**
   * 蓝色通道值 (0-255)
   */
  b: number;
  
  /**
   * 标识颜色是否成功解析
   */
  ok: boolean;
  
  /**
   * 构造函数 - 解析颜色字符串
   * @param colorString - 颜色字符串，支持格式：
   *   - 十六进制: "#ffffff" 或 "#fff"
   *   - RGB函数: "rgb(255, 255, 255)"
   *   - 颜色名称: "red", "blue" 等HTML标准颜色名
   */
  constructor(colorString: string);
  
  /**
   * 将颜色转换为RGB函数字符串格式
   * @returns RGB格式字符串，如 "rgb(255, 0, 0)"
   */
  toRGB(): string;
  
  /**
   * 将颜色转换为十六进制字符串格式
   * @returns 十六进制颜色字符串，如 "#ff0000"
   */
  toHex(): string;
  
  /**
   * 生成包含所有支持颜色格式示例的HTML列表元素
   * @returns 包含颜色示例的HTML ul元素
   * @deprecated 此方法包含DOM操作，不建议在现代应用中使用
   */
  getHelpXML(): HTMLUListElement;
}

/**
 * 全局RGBColor类声明
 */
interface Window {
  /**
   * RGB颜色解析器类
   */
  RGBColor: typeof RGBColor;
}