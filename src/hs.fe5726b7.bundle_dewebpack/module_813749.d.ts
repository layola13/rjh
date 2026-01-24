/**
 * 屋顶插件命令常量定义
 * 
 * 该模块定义了屋顶相关操作的命令字符串常量，用于插件系统的命令调度。
 * 所有命令遵循 hsw.plugin.roof.* 命名空间规范。
 * 
 * @module RoofCommands
 */

/**
 * 屋顶操作命令集合
 * 
 * @remarks
 * 该对象包含所有屋顶插件支持的命令标识符。
 * 使用 Object.freeze 确保运行时不可变性。
 */
export interface RoofCommands {
  /**
   * 添加屋顶命令
   * 用于向场景中添加新的屋顶对象
   */
  readonly AddRoof: 'hsw.plugin.roof.cmd.CmdAddRoof';

  /**
   * 创建屋顶命令
   * 用于初始化屋顶创建流程
   */
  readonly CreateRoof: 'hsw.plugin.roof.CmdCreateRoof';

  /**
   * 结束屋顶预览命令
   * 用于退出屋顶预览模式
   */
  readonly EndRoofPreview: 'hsw.plugin.roof.CmdEndRoofPreview';

  /**
   * 修改屋顶参数命令
   * 用于更新已存在屋顶的参数配置
   */
  readonly ChangeRoofParam: 'hsw.plugin.roof.CmdChangeRoofParam';

  /**
   * 切换生成屋顶命令
   * 用于启用/禁用屋顶自动生成功能
   */
  readonly ToggleGenerateRoof: 'hsw.plugin.roof.CmdToggleGenerateRoof';

  /**
   * 替换屋顶命令
   * 用于替换现有屋顶为新的屋顶类型
   */
  readonly ReplaceRoof: 'hsw.plugin.roof.CmdReplaceRoof';

  /**
   * 更新屋顶方向命令
   * 用于调整屋顶的朝向或方向属性
   */
  readonly UpdateRoofDirection: 'hsw.plugin.roof.CmdUpdateRoofDirection';

  /**
   * 添加屋顶材质命令
   * 用于为屋顶添加或更换材质
   */
  readonly AddRoofMaterial: 'hsw.plugin.roof.CmdAddRoofMaterial';
}

/**
 * 屋顶命令常量实例
 * 
 * @example
 *