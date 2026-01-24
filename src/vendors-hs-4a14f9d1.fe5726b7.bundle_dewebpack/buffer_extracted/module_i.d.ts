/**
 * 将24小时制的小时数转换为12小时制格式
 * @param timeObject - 包含小时信息的时间对象
 * @returns 格式化后的12小时制小时字符串（补零到2位）
 */
declare function formatTo12Hour(timeObject: { tm_hour: number }): string;

/**
 * 时间对象接口，包含小时字段
 */
interface TimeObject {
  /** 24小时制的小时数 (0-23) */
  tm_hour: number;
}

/**
 * 数字格式化函数类型
 * @param value - 要格式化的数值
 * @param width - 目标宽度（用于补零）
 * @returns 格式化后的字符串
 */
declare function B(value: number, width: number): string;