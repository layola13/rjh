/**
 * 表示时间结构的接口，类似于 C 语言的 struct tm
 */
interface TimeStructure {
  /** 星期几，范围 0-6（0=星期日，1=星期一，...，6=星期六） */
  tm_wday: number;
  [key: string]: unknown;
}

/**
 * 标准化星期字段值
 * 将星期日从 0 转换为 7，使其符合 ISO 8601 标准（1=星期一，7=星期日）
 * 
 * @param timeStruct - 包含 tm_wday 字段的时间结构对象
 * @returns 标准化后的星期值（1-7）
 * 
 * @example
 *