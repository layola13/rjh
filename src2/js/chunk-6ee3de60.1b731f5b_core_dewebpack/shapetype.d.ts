/**
 * 形状类型枚举
 * 定义门窗系统中所有可能的形状和组件类型
 * @module ShapeType
 */
export enum ShapeType {
  /** 无类型 */
  None = "None",
  
  /** 洞口 */
  Hole = "Hole",
  
  /** 墙体 */
  Wall = "Wall",
  
  /** 框架 */
  Frame = "Frame",
  
  /** 副框 */
  SubFrame = "SubFrame",
  
  /** 局部副框 */
  PartialSubFrame = "PartialSubFrame",
  
  /** 杆/条 */
  Bar = "Bar",
  
  /** 窗扇 */
  Sash = "Sash",
  
  /** 护栏窗扇 */
  GuardSash = "GuardSash",
  
  /** 圆形窗扇 */
  CircleSash = "CircleSash",
  
  /** 肯德基门窗扇 */
  KfcSash = "KfcSash",
  
  /** 双肯德基门窗扇 */
  DoubleKfcSash = "DoubleKfcSash",
  
  /** 纱窗 */
  Screen = "Screen",
  
  /** 双窗扇 */
  DoubleSash = "DoubleSash",
  
  /** 双纱窗 */
  DoubleScreen = "DoubleScreen",
  
  /** 玻璃 */
  Glass = "Glass",
  
  /** 面板 */
  Panel = "Panel",
  
  /** 压条 */
  Bead = "Bead",
  
  /** 把手 */
  Handle = "Handle",
  
  /** 合页 */
  Hinge = "Hinge",
  
  /** 锁 */
  Lock = "Lock",
  
  /** 指示器 */
  Indicator = "Indicator",
  
  /** 框中梃 */
  FrameMullion = "FrameMullion",
  
  /** 扇中梃 */
  SashMullion = "SashMullion",
  
  /** 肯德基门腰线 */
  KfcWaist = "KfcWaist",
  
  /** 纱窗中梃 */
  ScreenMullion = "ScreenMullion",
  
  /** 尺寸标注 */
  Dim = "Dim",
  
  /** 装饰条 */
  DecorationBar = "DecorationBar",
  
  /** 额外尺寸标注 */
  ExtraDim = "ExtraDim",
  
  /** 额外人物图像 */
  ExtraPersonImage = "ExtraPersonImage",
  
  /** 文本尺寸标注 */
  TextDim = "TextDim",
  
  /** 防盗 */
  AntiTheft = "AntiTheft",
  
  /** 防盗中梃 */
  AntiTheftMullion = "AntiTheftMullion",
  
  /** 防盗洞口高度 */
  AntiTheftHoleHeight = "AntiTheftHoleHeight",
  
  /** 防盗间隙 */
  AntiTheftGap = "AntiTheftGap",
  
  /** 防盗把手宽度 */
  AntiTheftHandleW = "AntiTheftHandleW",
  
  /** 折叠窗扇 */
  FoldSash = "FoldSash",
  
  /** 折叠纱窗 */
  FoldScreen = "FoldScreen",
  
  /** 折叠遮阳 */
  FoldShade = "FoldShade",
  
  /** 滑动 */
  Slide = "Slide",
  
  /** 上轨道 */
  UpTrack = "UpTrack",
  
  /** 固定上轨道 */
  FixedUpTrack = "FixedUpTrack",
  
  /** 下轨道 */
  DownTrack = "DownTrack",
  
  /** 固定下轨道 */
  FixedDownTrack = "FixedDownTrack",
  
  /** 上下轨道 */
  UpDownTrack = "UpDownTrack",
  
  /** 侧轨道 */
  SideTrack = "SideTrack",
  
  /** 双侧轨道 */
  DoubleSideTrack = "DoubleSideTrack",
  
  /** 顶视图 */
  TopView = "TopView",
  
  /** 转角连接件 */
  CornerJoiner = "CornerJoiner",
  
  /** 墙体转角连接件 */
  WallCornerJoiner = "WallCornerJoiner",
  
  /** 全景转角连接件 */
  PanoramicCornerJoiner = "PanoramicCornerJoiner",
  
  /** 连接器 */
  Connector = "Connector",
  
  /** 备注 */
  Note = "Note",
  
  /** 遮阳 */
  Shade = "Shade",
  
  /** 遮阳中梃 */
  ShadeMullion = "ShadeMullion",
  
  /** 遮阳推拉扇 */
  ShadePushSash = "ShadePushSash",
  
  /** 遮阳推拉扇中梃 */
  ShadePushSashMullion = "ShadePushSashMullion",
  
  /** 双遮阳推拉扇 */
  DoubleShadePushSash = "DoubleShadePushSash",
  
  /** 推拉窗扇上横杆 */
  SlideSashUpBar = "SlideSashUpBar",
  
  /** 推拉窗扇下横杆 */
  SlideSashDownBar = "SlideSashDownBar",
  
  /** 推拉窗扇左侧防撞杆 */
  SlideSashCollisionLeftBar = "SlideSashCollisionLeftBar",
  
  /** 推拉窗扇右侧防撞杆 */
  SlideSashCollisionRightBar = "SlideSashCollisionRightBar",
  
  /** 推拉窗扇边缘杆 */
  SlideSashEdgeBar = "SlideSashEdgeBar",
  
  /** 推拉窗扇单杆 */
  SlideSashSingleBar = "SlideSashSingleBar",
  
  /** 推拉窗扇双杆 */
  SlideSashDoubleBar = "SlideSashDoubleBar",
  
  /** 推拉窗扇无杆 */
  SlideSashNoneBar = "SlideSashNoneBar",
  
  /** 玻璃洞口 */
  GLassHole = "GLassHole",
  
  /** 肯德基门窗扇上横杆 */
  KfcSashUpBar = "KfcSashUpBar",
  
  /** 肯德基门窗扇下横杆 */
  KfcSashDownBar = "KfcSashDownBar",
  
  /** 肯德基门窗扇左竖杆 */
  KfcSashLeftBar = "KfcSashLeftBar",
  
  /** 肯德基门窗扇右竖杆 */
  KfcSashRightBar = "KfcSashRightBar",
  
  /** 铣削框架 */
  MillingFrame = "MillingFrame",
  
  /** 铣削窗扇 */
  MillingSash = "MillingSash",
  
  /** 玻璃间隙 */
  GlassGap = "GlassGap"
}