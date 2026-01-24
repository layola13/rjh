/**
 * 将几何材质应用到开口（门窗洞口）的请求模块
 * 原始模块ID: 654246
 */

/**
 * 将几何材质应用到开口的复合请求类
 * 继承自 HSCore.Transaction.Common.CompositeRequest
 * 用于批量处理实体材质应用，包括门窗及其关联的口袋、窗台等组件
 */
export declare class ApplyGeometryMaterialToOpeningRequest extends HSCore.Transaction.Common.CompositeRequest {
  /**
   * 模板实体，作为材质来源
   */
  templateEntity: HSCore.Model.Entity;

  /**
   * 目标实体数组，将应用模板实体的材质到这些实体
   */
  entities: HSCore.Model.Entity[];

  /**
   * 构造函数
   * @param templateEntity - 模板实体，提供材质和几何信息
   * @param entities - 需要应用材质的目标实体数组
   */
  constructor(templateEntity: HSCore.Model.Entity, entities: HSCore.Model.Entity[]);

  /**
   * 提交请求时的处理逻辑
   * 遍历所有目标实体，执行以下操作：
   * 1. 替换产品（使用模板元数据）
   * 2. 复制开口属性（swing、anchor、angle等）
   * 3. 应用材质列表
   * 4. 如果存在口袋（pocket），应用材质到口袋
   * 5. 如果是窗户且有窗台（sill），应用材质到窗台
   */
  onCommit(): void;
}

/**
 * 应用几何材质到开口的命令类
 * 继承自 HSApp.Cmd.Command
 * 用于处理用户交互层面的材质应用操作
 */
export default class ApplyGeometryMaterialToOpeningCommand extends HSApp.Cmd.Command {
  /**
   * 目标实体（门、窗或洞口）
   */
  entity: HSCore.Model.Entity;

  /**
   * 构造函数
   * @param entity - 需要应用材质的实体
   */
  constructor(entity: HSCore.Model.Entity);

  /**
   * 执行命令的核心逻辑
   * @param entities - 可选的实体数组，作为材质应用的来源
   * 如果提供有效的实体数组，则创建并提交 ApplyGeometryMaterialToOpeningRequest
   * 执行完成后显示提示信息并标记命令完成
   */
  onExecute(entities?: HSCore.Model.Entity[]): void;

  /**
   * 判断命令是否可撤销/重做
   * @returns false - 该命令不支持撤销/重做操作
   */
  canUndoRedo(): boolean;

  /**
   * 显示实时提示信息
   * 根据实体类型显示不同的提示文本：
   * - NgDoor: "plugin_contentstyler_door_pocket_applied"
   * - NgWindow: "plugin_contentstyler_window_pocket_applied"
   * - NgHole: "plugin_contentstyler_hole_pocket_applied"
   * 提示持续8秒，可关闭
   */
  showLiveHint(): void;
}