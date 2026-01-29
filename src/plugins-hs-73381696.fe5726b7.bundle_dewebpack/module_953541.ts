export interface CommandNameConfig {
  duration: Record<string, string>;
  trigger: Record<string, string>;
  excludes: string[];
}

export const commandName: CommandNameConfig = {
  duration: {
    "sketch2d.cmd.CmdDrawLines": "画造型-直线",
    "sketch2d.cmd.CmdDrawRectangle": "画造型-矩形",
    "sketch2d.cmd.CmdDrawRegularPolygon": "画造型-多边形",
    "sketch2d.cmd.CmdDrawCircle": "画造型-圆形",
    "sketch2d.cmd.CmdDrawFillet": "画造型-倒角"
  },
  trigger: {
    [HSFPConstants.CommandType.PlaceProduct]: "复合操作-从目录中拖出物品至画布",
    [HSFPConstants.CommandType.SmartReplaceContent]: "复合操作-打开了替换面板，替换物品",
    [HSFPConstants.CommandType.AddGroup]: "复合操作-组合模型",
    [HSFPConstants.CommandType.PasteSequence]: "复合操作-复制粘贴模型",
    [HSFPConstants.CommandType.DuplicateSequence]: "复合操作-复制操作",
    [HSFPConstants.CommandType.DuplicateManualLight]: "复合操作-快速复制灯光",
    [HSFPConstants.CommandType.PlaceLight]: "复合操作-创建新灯光"
  },
  excludes: [
    HSFPConstants.CommandType.PointSelect,
    HSFPConstants.CommandType.MoveCamera3D,
    HSFPConstants.CommandType.MoveCamera,
    HSFPConstants.CommandType.CmdRequestWrap,
    "hsw.cmd.CompositeCommand",
    "hsw.cmd.SequenceCommand"
  ]
};