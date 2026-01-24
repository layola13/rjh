/**
 * 参数化楼梯命令常量定义
 * 定义了楼梯插件相关的命令标识符
 */

/**
 * 参数化楼梯命令类型
 */
export interface ParametricStairCommands {
  /**
   * 修改参数化楼梯属性命令
   * 用于修改楼梯的参数化属性
   */
  readonly ChangeParametricStairProperty: 'hsw.transaction.stair.Cmdchangeparametricstairproperty';

  /**
   * 替换参数化楼梯材质命令
   * 用于替换楼梯的材质
   */
  readonly ReplaceParametricStairMaterial: 'hsw.plugin.stair.CmdReplaceMaterial';

  /**
   * 替换参数化楼梯命令
   * 用于替换整个楼梯对象
   */
  readonly ReplaceParametricStair: 'hsw.plugin.stair.CmdReplaceStair';
}

/**
 * 参数化楼梯命令常量对象
 * 包含所有楼梯相关操作的命令标识符
 */
declare const parametricStairCommands: Readonly<ParametricStairCommands>;

export default parametricStairCommands;