/**
 * 抽象基类：定义格式刷（Format Painter）的核心接口
 * 用于实现"吸取格式"和"应用格式"功能
 */
export default abstract class FormatPainter {
  /**
   * 获取格式刷类名
   * @returns 格式刷的类名标识符
   */
  get ClassName(): string {
    return "";
  }

  /**
   * 判断目标元素是否可以被吸取格式
   * @param target - 待检测的目标元素
   * @returns 如果可以吸取格式返回true，否则返回false
   * @throws {Error} 子类必须实现此方法
   */
  abstract isSuckable(target: unknown): boolean;

  /**
   * 从目标元素吸取格式数据
   * @param target - 要吸取格式的源元素
   * @returns 吸取到的格式数据
   * @throws {Error} 子类必须实现此方法
   */
  abstract suck(target: unknown): unknown;

  /**
   * 判断格式是否可以应用到目标元素
   * @param target - 待应用格式的目标元素
   * @param formatData - 要应用的格式数据
   * @returns 如果可以应用返回true，否则返回false
   * @throws {Error} 子类必须实现此方法
   */
  abstract isAppliable(target: unknown, formatData: unknown): boolean;

  /**
   * 将格式数据应用到目标元素
   * @param target - 目标元素
   * @param formatData - 要应用的格式数据
   * @throws {Error} 子类必须实现此方法
   */
  abstract apply(target: unknown, formatData: unknown): void;

  /**
   * 获取撤销操作所需的数据
   * @param context - 操作上下文
   * @returns 撤销数据
   * @throws {Error} 子类必须实现此方法
   */
  abstract getUndoData(context: unknown): unknown;

  /**
   * 获取重做操作所需的数据
   * @param context - 操作上下文
   * @returns 重做数据
   * @throws {Error} 子类必须实现此方法
   */
  abstract getRedoData(context: unknown): unknown;

  /**
   * 执行撤销操作
   * @param context - 操作上下文
   * @param undoData - 撤销数据
   * @throws {Error} 子类必须实现此方法
   */
  abstract undo(context: unknown, undoData: unknown): void;

  /**
   * 执行重做操作
   * @param context - 操作上下文
   * @param redoData - 重做数据
   * @throws {Error} 子类必须实现此方法
   */
  abstract redo(context: unknown, redoData: unknown): void;
}