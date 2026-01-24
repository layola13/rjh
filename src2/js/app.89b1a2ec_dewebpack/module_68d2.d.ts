/**
 * 门窗系统配置常量类型定义
 * 包含连接类型、开启方向、组件类型等配置项的映射关系
 */

/**
 * 连接类型枚举
 * 定义两个组件之间的连接方式
 */
export type ConnectionType =
  | '0'  // none-none: 无连接
  | '1'  // none-frame: 无与框架连接
  | '2'  // none-mullion: 无与中挺连接
  | '3'  // frame-frame: 框架与框架连接
  | '4'  // frame-mullion: 框架与中挺连接
  | '5'  // mullion-mullion: 中挺与中挺连接
  | '6'  // SideTrack-SideTrack: 侧轨与侧轨连接
  | '7'  // SideTrack-frame: 侧轨与框架连接
  | '8'  // SideTrack-mullion: 侧轨与中挺连接
  | '9'  // frame-UpTrack: 框架与上轨连接
  | '11' // UpTrack-DownTrack: 上轨与下轨连接
  | '12' // frame-DownTrack: 框架与下轨连接
  | '13' // frame-FixedUpTrack: 框架与固定上轨连接
  | '14' // FixedUpTrack-mullion: 固定上轨与中挺连接
  | '15' // FixedUpTrack-DownTrack: 固定上轨与下轨连接
  | '16' // FixedUpTrack-FixedDownTrack: 固定上轨与固定下轨连接
  | '17' // frame-FixedDownTrack: 框架与固定下轨连接
  | '18' // FixedDownTrack-mullion: 固定下轨与中挺连接
  | '19' // UpTrack-FixedDownTrack: 上轨与固定下轨连接
  | '20' // UpTrack-UpDownTrack: 上轨与上下轨连接
  | '21' // UpDownTrack-UpDownTrack: 上下轨与上下轨连接
  | '22' // DownTrack-UpDownTrack: 下轨与上下轨连接
  | '23' // FixedDownTrack-UpDownTrack: 固定下轨与上下轨连接
  | '24' // FixedUpTrack-UpDownTrack: 固定上轨与上下轨连接
  | '25' // none-SideTrack: 无与侧轨连接
  | '26' // SideTrack-DoubleSideTrack: 侧轨与双侧轨连接
  | '27' // DoubleSideTrack-frame: 双侧轨与框架连接
  | '28' // DoubleSideTrack-mullion: 双侧轨与中挺连接
  | '29' // none-DoubleSideTrack: 无与双侧轨连接
  | '30' // DoubleSideTrack-DoubleSideTrack: 双侧轨与双侧轨连接
  | '31' // none-FixedUpTrack: 无与固定上轨连接
  | '32'; // none-UpTrack: 无与上轨连接

/**
 * 开启方向枚举
 */
export type OpeningDirection =
  | 'up'    // 上悬窗（向上开启）
  | 'down'  // 下悬窗（向下开启）
  | 'left'  // 左开启
  | 'right' // 右开启
  | 'none'; // 无开启方向（固定窗）

/**
 * 碰撞方向枚举
 */
export type CollisionDirection =
  | 'collisionLeft'  // 左侧碰撞
  | 'collisionRight'; // 右侧碰撞

/**
 * 互锁类型枚举
 */
export type InterlockType =
  | 'single' // 单互锁
  | 'double' // 双互锁
  | 'edge';  // 边缘互锁

/**
 * 布尔值字符串枚举
 */
export type BooleanString = 'yes' | 'no';

/**
 * 组件类型枚举
 * 定义门窗系统中的各种组件
 */
export type ComponentType =
  | 'frame'                      // 框架
  | 'mullion'                    // 中挺（竖向或横向分隔）
  | 'fixedBead'                  // 固定压条
  | 'cornerJoiner'               // 角连接件
  | 'connector'                  // 连接件
  | 'sideTrack'                  // 侧轨
  | 'DoubleSideTrack'            // 双侧轨
  | 'fixedDownTrack'             // 固定下轨
  | 'fixedUpTrack'               // 固定上轨
  | 'downTrack'                  // 下轨
  | 'upTrack'                    // 上轨
  | 'turningFrame'               // 转向框
  | 'sashTurningFrame'           // 扇转向框
  | 'sideTrackFixed'             // 固定侧轨
  | 'sideTrackThroughFixed'      // 贯通固定侧轨
  | 'sideTrackSlide'             // 滑动侧轨
  | 'sideTrackSlideEmbedded'     // 嵌入式滑动侧轨
  | 'sideTrackCouple'            // 联动侧轨
  | 'fixedNetBead'               // 固定纱网压条
  | 'fixedPanelBead'             // 固定面板压条
  | 'trackBar'                   // 轨道条
  | 'upDownTrack'                // 上下轨
  | 'screenFrame';               // 纱窗框

/**
 * 窗扇类型枚举
 */
export type SashType =
  | 'doubleSash'   // 双开扇
  | 'doubleScreen' // 双纱窗
  | 'sash'         // 单开扇
  | 'Sash'         // 单开扇（大写）
  | 'screen'       // 纱窗
  | 'Screen'       // 纱窗（大写）
  | 'sashBead'     // 扇压条
  | 'screenBead'   // 纱窗压条
  | 'sashMullion'  // 扇中挺
  | 'screenMullion'// 纱窗中挺
  | 'panelBead'    // 面板压条
  | 'foldSash'     // 折叠扇
  | 'foldScreen'   // 折叠纱窗
  | 'slide';       // 推拉窗

/**
 * 开启类型代码枚举
 */
export type OpeningCode =
  | 'DSI'  // 双开内开
  | 'DSO'  // 双开外开
  | 'IL'   // 内开左
  | 'IR'   // 内开右
  | 'ID'   // 内开下悬
  | 'IDL'  // 内开下悬左
  | 'IDR'  // 内开下悬右
  | 'OL'   // 外开左
  | 'OR'   // 外开右
  | 'OU'   // 外开上悬
  | 'OUL'  // 外开上悬左
  | 'OUR'  // 外开上悬右
  | 'IU'   // 内开上悬
  | 'IUR'  // 内开上悬右
  | 'IUL'  // 内开上悬左
  | 'IF'   // 内平开
  | 'C';   // 固定窗

/**
 * 玻璃和填充类型枚举
 */
export type GlassType =
  | 'fixedGlass'  // 固定玻璃
  | 'fixedNet'    // 固定纱网
  | 'sashGlass'   // 扇玻璃
  | 'screenNet'   // 纱窗网
  | 'fixedPanel'  // 固定面板
  | 'sashPanel';  // 扇面板

/**
 * 附件类型枚举
 */
export type AddonType =
  | 'decorationBar'            // 装饰条
  | 'frameAddon'               // 框架附件
  | 'sashAddon'                // 扇附件
  | 'screenAddon'              // 纱窗附件
  | 'mullionAddon'             // 中挺附件
  | 'glassAddon'               // 玻璃附件
  | 'doubleSashAddon'          // 双扇附件
  | 'slideAddon'               // 推拉附件
  | 'foldAddon'                // 折叠附件
  | 'panelAddon'               // 面板附件
  | 'slideCollisionAddon'      // 推拉碰撞附件
  | 'frameConnectAddon'        // 框架连接附件
  | 'holeAddon'                // 孔附件
  | 'theftAddon'               // 防盗附件
  | 'slideLockAddon'           // 推拉锁附件
  | 'slideEdgeAddon'           // 推拉边缘附件
  | 'slideSingleAddon'         // 推拉单互锁附件
  | 'slideDoubleAddon'         // 推拉双互锁附件
  | 'slideUpAddon'             // 推拉上附件
  | 'slideDownAddon'           // 推拉下附件
  | 'slideCollisionLeftAddon'  // 推拉左碰撞附件
  | 'slideCollisionRightAddon';// 推拉右碰撞附件

/**
 * 遮阳组件类型枚举
 */
export type ShadeType =
  | 'ShadePushSash'  // 遮阳推拉扇
  | 'shadeMullion'   // 遮阳中挺
  | 'shadeSashBead'  // 遮阳扇压条
  | 'sashShade';     // 扇遮阳

/**
 * 防盗组件类型枚举
 */
export type AntiTheftType =
  | 'antitheftMullion' // 防盗中挺
  | 'antiTheft'        // 防盗框
  | 'AntiTheft';       // 防盗框（大写）

/**
 * 尺寸类型枚举
 */
export type SizeType =
  | 'size_type0' // 宽度
  | 'size_type1'; // 高度

/**
 * 计价方式枚举
 */
export type PricingMethod =
  | 'pricing_method1' // 按面积计价
  | 'pricing_method2'; // 按数量计价

/**
 * 副框计价方式枚举
 */
export type SubbarPricingMethod =
  | 'subbar_pricing_method1' // 按尺寸计价
  | 'subbar_pricing_method2'; // 按重量计价

/**
 * 中挺方向枚举
 */
export type MullionDirection =
  | 'mullion0' // 横向中挺
  | 'mullion1'; // 竖向中挺

/**
 * 门窗配置常量映射接口
 * 包含所有配置项的键值对映射
 */
export interface WindowConfigConstants {
  // 连接类型映射
  readonly '0': 'none-none';
  readonly '1': 'none-frame';
  readonly '2': 'none-mullion';
  readonly '3': 'frame-frame';
  readonly '4': 'frame-mullion';
  readonly '5': 'mullion-mullion';
  readonly '6': 'SideTrack-SideTrack';
  readonly '7': 'SideTrack-frame';
  readonly '8': 'SideTrack-mullion';
  readonly '9': 'frame-UpTrack';
  readonly '11': 'UpTrack-DownTrack';
  readonly '12': 'frame-DownTrack';
  readonly '13': 'frame-FixedUpTrack';
  readonly '14': 'FixedUpTrack-mullion';
  readonly '15': 'FixedUpTrack-DownTrack';
  readonly '16': 'FixedUpTrack-FixedDownTrack';
  readonly '17': 'frame-FixedDownTrack';
  readonly '18': 'FixedDownTrack-mullion';
  readonly '19': 'UpTrack-FixedDownTrack';
  readonly '20': 'UpTrack-UpDownTrack';
  readonly '21': 'UpDownTrack-UpDownTrack';
  readonly '22': 'DownTrack-UpDownTrack';
  readonly '23': 'FixedDownTrack-UpDownTrack';
  readonly '24': 'FixedUpTrack-UpDownTrack';
  readonly '25': 'none-SideTrack';
  readonly '26': 'SideTrack-DoubleSideTrack';
  readonly '27': 'DoubleSideTrack-frame';
  readonly '28': 'DoubleSideTrack-mullion';
  readonly '29': 'none-DoubleSideTrack';
  readonly '30': 'DoubleSideTrack-DoubleSideTrack';
  readonly '31': 'none-FixedUpTrack';
  readonly '32': 'none-UpTrack';

  // 开启方向（越南语显示）
  readonly up: 'Cửa bật';      // 上悬窗
  readonly down: 'Cửa hất';    // 下悬窗
  readonly left: 'Lề trái';    // 左开
  readonly right: 'Lề phải';   // 右开
  readonly none: 'Không hướng mở'; // 无开启方向

  // 边缘和互锁类型
  readonly edge: 'edge';
  readonly single: 'interlockSingle';   // 单互锁
  readonly double: 'interlockDouble';   // 双互锁

  // 碰撞类型
  readonly collisionLeft: 'collisionLeft';
  readonly collisionRight: 'collisionRight';

  // 布尔值
  readonly yes: 'yes';
  readonly no: 'no';

  // 组件类型（越南语显示）
  readonly frame: 'Khung';              // 框架
  readonly mullion: 'Chia dọc-ngang';   // 中挺
  readonly fixedBead: 'Nẹp vách';       // 固定压条
  readonly cornerJoiner: 'cornerJoiner';
  readonly connector: 'Nối khung';      // 连接件
  readonly sideTrack: 'sideTrack';
  readonly DoubleSideTrack: 'DoubleSideTrack';
  readonly fixedDownTrack: 'fixedDownTrack';
  readonly fixedUpTrack: 'fixedUpTrack';
  readonly downTrack: 'downTrack';
  readonly upTrack: 'upTrack';
  readonly turningFrame: 'turningFrame';
  readonly sashTurningFrame: 'sashTurningFrame';
  readonly sideTrackFixed: 'sideTrackFixed';
  readonly sideTrackThroughFixed: 'sideTrackThroughFixed';
  readonly sideTrackSlide: 'sideTrackSlide';
  readonly sideTrackSlideEmbedded: 'sideTrackSlideEmbedded';
  readonly sideTrackCouple: 'sideTrackCouple';
  readonly fixedNetBead: 'fixedNetBead';
  readonly fixedPanelBead: 'fixedPanelBead';
  readonly trackBar: 'trackBar';
  readonly upDownTrack: 'upDownTrack';
  readonly screenFrame: 'screenFrame';

  // 窗扇类型（越南语显示）
  readonly doubleSash: 'Cửa mở 2 cánh';          // 双开扇
  readonly doubleScreen: 'Lưới muỗi 2 cánh';     // 双纱窗
  readonly sash: 'Cửa mở 1 cánh';                // 单开扇
  readonly screen: 'Lưới muỗi';                  // 纱窗
  readonly sashBead: 'Nẹp cửa';                  // 扇压条
  readonly screenBead: 'screenBead';
  readonly sashMullion: 'sashMullion';
  readonly screenMullion: 'screenMullion';
  readonly panelBead: 'panelBead';
  readonly foldSash: 'Cửa gấp xếp';              // 折叠扇
  readonly foldScreen: 'Cửa lưới muỗi gấp xếp';  // 折叠纱窗
  readonly slide: 'Cửa lùa';                     // 推拉窗
  readonly Sash: 'Cửa mở 1 cánh';                // 单开扇
  readonly Screen: 'Lưới muỗi';                  // 纱窗

  // 开启类型代码
  readonly DSI: 'DSI';
  readonly DSO: 'DSO';
  readonly IL: 'IL';
  readonly IR: 'IR';
  readonly ID: 'ID';
  readonly IDL: 'IDL';
  readonly IDR: 'IDR';
  readonly OL: 'OL';
  readonly OR: 'OR';
  readonly OU: 'OU';
  readonly OUL: 'OUL';
  readonly OUR: 'OUR';
  readonly IU: 'IU';
  readonly IUR: 'IUR';
  readonly IUL: 'IUL';
  readonly IF: 'IF';
  readonly C: 'C';

  // 玻璃和填充类型
  readonly fixedGlass: 'fixedGlass';
  readonly fixedNet: 'fixedNet';
  readonly sashGlass: 'sashGlass';
  readonly screenNet: 'screenNet';
  readonly fixedPanel: 'fixedPanel';
  readonly sashPanel: 'sashPanel';

  // 附件类型
  readonly decorationBar: 'decorationBar';
  readonly frameAddon: 'frameAddon';
  readonly sashAddon: 'sashAddon';
  readonly screenAddon: 'screenAddon';
  readonly mullionAddon: 'mullionAddon';
  readonly glassAddon: 'glassAddon';
  readonly doubleSashAddon: 'doubleSashAddon';
  readonly slideAddon: 'slideAddon';
  readonly foldAddon: 'foldAddon';
  readonly panelAddon: 'panelAddon';
  readonly slideCollisionAddon: 'slideCollisionAddon';
  readonly frameConnectAddon: 'frameConnectAddon';
  readonly holeAddon: 'holeAddon';
  readonly theftAddon: 'theftAddon';
  readonly slideLockAddon: 'slideLockAddon';
  readonly slideEdgeAddon: 'slideEdgeAddon';
  readonly slideSingleAddon: 'interlockSingleAddon';
  readonly slideDoubleAddon: 'interlockDoubleAddon';
  readonly slideUpAddon: 'slideUpAddon';
  readonly slideDownAddon: 'slideDownAddon';
  readonly slideCollisionLeftAddon: 'slideCollisionLeftAddon';
  readonly slideCollisionRightAddon: 'slideCollisionRightAddon';

  // 遮阳组件
  readonly ShadePushSash: 'ShadePushSash';
  readonly shadeMullion: 'shadeMullion';
  readonly shadeSashBead: 'shadeSashBead';
  readonly sashShade: 'sashShade';

  // 防盗组件（越南语显示）
  readonly antitheftMullion: 'antitheftMullion';
  readonly antiTheft: 'Khung bảo vệ';   // 防盗框
  readonly AntiTheft: 'Khung bảo vệ';   // 防盗框

  // 尺寸类型（越南语显示）
  readonly size_type0: 'Chiều rộng';    // 宽度
  readonly size_type1: 'Chiều cao';     // 高度

  // 计价方式
  readonly pricing_method1: 'asArea';      // 按面积
  readonly pricing_method2: 'asQuantity';  // 按数量

  // 副框计价方式
  readonly subbar_pricing_method1: 'asSize';   // 按尺寸
  readonly subbar_pricing_method2: 'asWeight'; // 按重量

  // 中挺方向
  readonly mullion0: 'horizontal';  // 横向
  readonly mullion1: 'vertical';    // 竖向
}

/**
 * 门窗配置常量对象
 * 导出的默认常量配置
 */
declare const windowConfigConstants: WindowConfigConstants;

export default windowConfigConstants;