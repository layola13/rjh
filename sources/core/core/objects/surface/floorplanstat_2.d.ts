/**
 * 户型图性能统计类
 * 用于收集和计算户型图保存(dump)和打开(open)过程中的性能指标
 */
export declare class FloorplanStat {
  /**
   * dump操作开始时间戳（毫秒）
   */
  dumpStartTime: number | null;

  /**
   * dump操作结束时间戳（毫秒）
   */
  dumpEndTime: number | null;

  /**
   * JSON序列化开始时间戳（毫秒）
   */
  dumpStringifyStartTime: number | null;

  /**
   * JSON序列化结束时间戳（毫秒）
   */
  dumpStringifyEndTime: number | null;

  /**
   * JSON解析开始时间戳（毫秒）
   */
  openJsonParseStartTime: number | null;

  /**
   * JSON解析结束时间戳（毫秒）
   */
  openJsonParseEndTime: number | null;

  /**
   * 实体加载开始时间戳（毫秒）
   */
  openLoadEntitiesStartTime: number | null;

  /**
   * 实体加载结束时间戳（毫秒）
   */
  openLoadEntitiesEndTime: number | null;

  /**
   * 后处理开始时间戳（毫秒）
   */
  openPostProcessStartTime: number | null;

  /**
   * 后处理结束时间戳（毫秒）
   */
  openPostProcessEndTime: number | null;

  /**
   * 获取dump操作总耗时（毫秒）
   * @returns dump操作耗时，如果开始或结束时间未记录则返回0
   */
  get dumpTime(): number;

  /**
   * 获取JSON序列化耗时（毫秒）
   * @returns JSON序列化耗时，如果开始或结束时间未记录则返回0
   */
  get dumpStringifyTime(): number;

  /**
   * 获取JSON解析耗时（毫秒）
   * @returns JSON解析耗时，如果开始或结束时间未记录则返回0
   */
  get openJsonParseTime(): number;

  /**
   * 获取实体加载耗时（毫秒）
   * @returns 实体加载耗时，如果开始或结束时间未记录则返回0
   */
  get openLoadEntitiesTime(): number;

  /**
   * 获取后处理耗时（毫秒）
   * @returns 后处理耗时，如果开始或结束时间未记录则返回0
   */
  get openPostProcessTime(): number;

  /**
   * 获取FloorplanStat单例实例
   * @returns FloorplanStat的唯一实例
   */
  static instance(): FloorplanStat;
}