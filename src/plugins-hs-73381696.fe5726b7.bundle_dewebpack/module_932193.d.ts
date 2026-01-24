/**
 * 命令名称定义模块
 * 
 * 该模块定义了不同类型的命令名称集合，用于墙体、内容和灯光操作。
 * 这些命令名称来自于 HSFPConstants.CommandType 枚举。
 * 
 * @module CommandNames
 */

/**
 * 墙体相关命令名称集合
 * 
 * 包含所有与墙体操作相关的命令类型，包括：
 * - 墙体的显示/隐藏
 * - 墙体的创建、移动、删除
 * - 墙体的形状转换（直线墙转弧形墙）
 * - 墙体的尺寸调整
 * - 墙体的属性修改（类型、厚度、高度、宽度等）
 * - 图层相关操作
 */
export declare const wallCmdNames: readonly string[];

/**
 * 内容相关命令名称集合
 * 
 * 包含与场景内容操作相关的命令类型，包括：
 * - 产品放置
 * - 智能替换内容
 * - 序列的粘贴和复制
 */
export declare const contentCmdNames: readonly string[];

/**
 * 灯光位置相关命令名称集合
 * 
 * 包含与灯光位置操作相关的命令类型，包括：
 * - 手动灯光的复制
 * - 灯光的放置
 */
export declare const lightPositionCmdNames: readonly string[];

/**
 * 灯光属性相关命令名称集合
 * 
 * 包含与灯光属性操作相关的命令类型。
 * 注意：当前此数组为空，可能在未来版本中添加相关命令。
 */
export declare const lightPropertyCmdNames: readonly string[];