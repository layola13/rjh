/**
 * 墙体相关命令类型定义
 * 包含墙体操作、装饰、材质等相关命令的命名空间映射
 * @module WallCommands
 */

/**
 * 墙体命令类型枚举
 * 定义了所有墙体相关操作的命令标识符
 */
interface WallCommands {
  /** 隐藏墙体命令 */
  readonly HideWall: "hsw.cmd.wall.CmdHideWall";
  
  /** 转换为弧形墙体命令 */
  readonly ToArcWall: "hsw.cmd.wall.CmdToArcWall";
  
  /** 修改墙体矢高命令 */
  readonly ChangeWallSagitta: "hsw.cmd.wall.CmdChangeWallSagitta";
  
  /** 创建切线墙体命令 */
  readonly CreateTgWall: "hsw.cmd.wall.CmdCreateTgWall";
  
  /** 创建矩形切线墙体命令 */
  readonly CreateRectTgWall: "hsw.cmd.wall.CmdCreateRectTgWall";
  
  /** 创建多边形切线墙体命令 */
  readonly CreatePolygonTgWall: "hsw.cmd.wall.CmdCreatePolygonTgWall";
  
  /** 创建自由形式新一代墙体命令 */
  readonly CreateFreeformNGWall: "hsw.cmd.wall.CmdCreateFreeformNGWall";
  
  /** 移动新一代墙体命令 */
  readonly MoveNGWall: "hsw.cmd.wall.CmdMoveNGWall";
  
  /** 移动新一代墙体点命令 */
  readonly MoveNGWallPoint: "hsw.cmd.wall.CmdMoveNGWallPoint";
  
  /** 删除新一代墙体命令 */
  readonly DeleteNGWall: "hsw.cmd.wall.CmdDeleteNGWall";
  
  /** 批量删除新一代墙体命令 */
  readonly DeleteNGWalls: "hsw.cmd.wall.CmdDeleteNGWalls";
  
  /** 分割新一代墙体命令 */
  readonly SplitNGWall: "hsw.cmd.wall.CmdSplitNGWall";
  
  /** 在点上合并新一代墙体命令 */
  readonly MergeNGWallOnPoint: "hsw.cmd.wall.CmdMergeNGWallOnPoint";
  
  /** 修改新一代墙体类型命令 */
  readonly ChangeNGWallType: "hsw.cmd.wall.CmdChangeNGWallType";
  
  /** 调整墙体尺寸命令 */
  readonly ResizeWalls: "hsw.cmd.wall.ResizeWalls";
  
  /** 修改墙体宽度命令 */
  readonly ChangeWallsWidth: "hsw.cmd.wall.CmdChangeWallsWidth";
  
  /** 修改墙体自动连接命令 */
  readonly ChangeWallAutoConnect: "hsw.cmd.wall.CmdChangeWallAutoConnect";
  
  /** 修改新一代墙体矢高命令 */
  readonly ChangeNGWallSagitta: "hsw.cmd.wall.CmdChangeNGWallSagitta";
  
  /** 自由裁剪墙体命令 */
  readonly FreeCutWall: "hsw.cmd.wall.CmdFreeCutWall";
  
  /** 裁剪墙体命令 */
  readonly CutWall: "hsw.cmd.wall.CmdCutWall";
  
  /** 合并墙体命令 */
  readonly MergeWall: "hsw.cmd.wall.CmdMergeWall";
  
  /** 对齐墙体命令 */
  readonly AlignWall: "hsw.cmd.wall.CmdAlignWall";
  
  /** 创建矩形新一代墙体组命令 */
  readonly CreateRectNGWalls: "hsw.cmd.wall.CmdCreateRectNGWalls";
  
  /** 编辑材质命令 */
  readonly EditMaterial: "hsw.plugin.walldecoration.cmd.CmdEditMaterial";
  
  /** 装饰命令 */
  readonly Decoration: "hsw.plugin.walldecoration.cmd.CmdDecoration";
  
  /** 扩展装饰命令 */
  readonly DecorationEx: "hsw.plugin.walldecoration.cmd.CmdDecorationEx";
  
  /** 自定义瓷砖命令 */
  readonly CustomizedTiles: "hsw.plugin.CustomizedTiles.CustomizedTilesCmd";
  
  /** 单元样式命令 */
  readonly UnitStyle: "hsw.plugin.CustomizedTiles.UnitStyleCmd";
  
  /** 修改参数单元尺寸命令 */
  readonly ChangeParamUnitSize: "hsw.plugin.CustomizedTiles.ChangeParamUnitSzieCmd";
  
  /** 重置参数单元命令 */
  readonly ResetParamUnit: "hsw.plugin.CustomizedTiles.ResetParamUnitCmd";
  
  /** 修改参数单元材质命令 */
  readonly ChangeParamUnitMaterial: "hsw.plugin.CustomizedTiles.ChangeParamUnitMaterialCmd";
  
  /** 添加材质命令 */
  readonly AddMaterial: "hsw.plugin.facematerial.CmdAddMaterial";
  
  /** 添加DIY材质命令 */
  readonly AddDIYMaterial: "hsw.plugin.facematerial.CmdAddDIYMaterial";
  
  /** 混合装饰命令 */
  readonly MixDecoration: "hsw.plugin.mixpaint.cmd.CmdMixDecoration";
  
  /** 形状装饰命令 */
  readonly ShapeDecoration: "hsw.plugin.mixpaint.cmd.CmdShapeMixDecoration";
}

/**
 * 墙体命令常量对象
 * 所有命令类型的不可变实例
 */
declare const wallCommands: Readonly<WallCommands>;

export default wallCommands;