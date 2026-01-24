/**
 * 房间类型匹配结果接口
 */
interface RoomTypeMatchResult {
  /** 匹配得分，大于3表示有效匹配 */
  score: number;
  /** 房间类型标识 */
  roomType: string;
}

/**
 * 房间类型规则接口
 */
interface RoomTypeRule {
  /**
   * 根据类别或内容类型匹配房间类型
   * @param input - 待匹配的输入数据
   * @returns 匹配结果，包含得分和房间类型
   */
  matchByCategoryOrContentType(input: unknown): RoomTypeMatchResult;
}

/**
 * 房间类型规则集合
 */
export declare const RoomTypeRules: readonly RoomTypeRule[];

/**
 * 确定房间类型
 * 
 * 该函数会遍历所有房间类型规则，对输入进行匹配评分，
 * 筛选出得分大于3的结果，并按得分降序排序，
 * 最终返回得分最高的房间类型。
 * 
 * @param input - 待分析的输入数据（可能是类别或内容类型信息）
 * @returns Promise，解析为房间类型字符串。如果没有匹配结果则返回空字符串
 * 
 * @example
 *