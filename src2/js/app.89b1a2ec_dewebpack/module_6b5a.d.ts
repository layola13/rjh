/**
 * 门窗系统配置类型定义
 * 包含框型连接类型、方向、企口类型、组件类型、开启方式、尺寸类型等配置项
 */

/**
 * 框型连接类型枚举
 * 定义门窗框架之间的连接方式
 */
export type FrameConnectionType =
  | '0'  // 无-无
  | '1'  // 无-边框
  | '2'  // 无-中梃
  | '3'  // 边框-边框
  | '4'  // 边框-中梃
  | '5'  // 中梃-中梃
  | '6'  // 边封-边封
  | '7'  // 边封-边框
  | '8'  // 边封-中梃
  | '9'  // 边框-上滑
  | '11' // 上滑-下滑
  | '12' // 边框-下滑
  | '13' // 边框-固上滑
  | '14' // 固上滑-中梃
  | '15' // 固上滑-下滑
  | '16' // 固上滑-固下滑
  | '17' // 边框-固下滑
  | '18' // 固下滑-中梃
  | '19' // 上滑-固下滑
  | '20' // 上滑-上下滑
  | '21' // 上下滑-上下滑
  | '22' // 下滑-上下滑
  | '23' // 固下滑-上下滑
  | '24' // 固上滑-上下滑
  | '25' // 无-边封
  | '26' // 边封-双边封
  | '27' // 双边封-边框
  | '28' // 双边封-中挺
  | '29' // 无-双边封
  | '30' // 双边封-双边封
  | '31' // 无-固上滑
  | '32'; // 无-上滑

/**
 * 方向类型
 */
export type Direction = 'up' | 'down' | 'left' | 'right';

/**
 * 企口类型
 * 定义推拉窗的企口形式
 */
export type EdgeType = 'edge' | 'single' | 'double';

/**
 * 对碰位置类型
 */
export type CollisionType = 'collisionLeft' | 'collisionRight';

/**
 * 布尔类型（中文）
 */
export type YesNo = 'yes' | 'no';

/**
 * 框架组件类型
 * 定义门窗的基本框架构成部件
 */
export type FrameComponentType =
  | 'frame'              // 边框
  | 'mullion'            // 中梃
  | 'fixedBead'          // 固玻压线
  | 'cornerJoiner'       // 转角
  | 'connector'          // 连接件
  | 'sideTrack'          // 边封
  | 'DoubleSideTrack'    // 双边封
  | 'fixedDownTrack'     // 固下滑
  | 'fixedUpTrack'       // 固上滑
  | 'downTrack'          // 下滑
  | 'upTrack'            // 上滑
  | 'turningFrame'       // 固转框
  | 'sashTurningFrame'   // 副框
  | 'trackBar'           // 轨道料
  | 'upDownTrack'        // 上下滑
  | 'antiTheft'          // 防盗框
  | 'AntiTheft';         // 防盗框（备用）

/**
 * 边封组件类型
 */
export type SideTrackComponentType =
  | 'sideTrackFixed'           // 边封盖板
  | 'sideTrackThroughFixed'    // 边封通盖板
  | 'sideTrackSlide'           // 边封锁条
  | 'sideTrackSlideEmbedded'   // 边封扣条
  | 'sideTrackCouple';         // 边封拼盖板

/**
 * 压线类型
 */
export type BeadType =
  | 'fixedNetBead'   // 固纱压线
  | 'fixedPanelBead' // 板材压线
  | 'sashBead'       // 玻扇压线
  | 'screenBead'     // 纱扇压线
  | 'panelBead'      // 板材压线
  | 'shadeSashBead'; // 百叶扇压线

/**
 * 扇体类型
 */
export type SashType =
  | 'doubleSash'    // 对开玻扇
  | 'doubleScreen'  // 对开纱扇
  | 'sash'          // 玻扇
  | 'Sash'          // 玻扇（备用）
  | 'screen'        // 纱扇
  | 'Screen'        // 纱扇（备用）
  | 'foldSash'      // 折叠玻扇
  | 'foldScreen'    // 折叠纱扇
  | 'slide'         // 推拉扇
  | 'ShadePushSash' // 百叶扇
  | 'screenFrame';  // 纱框

/**
 * 扇体中梃类型
 */
export type SashMullionType =
  | 'sashMullion'     // 玻扇中梃
  | 'screenMullion'   // 纱扇中梃
  | 'shadeMullion'    // 百叶条
  | 'antitheftMullion'; // 防盗杆

/**
 * 开启方式类型
 * 定义门窗扇的开启形式
 */
export type OpeningType =
  | 'DSI'  // 内开
  | 'DSO'  // 外开
  | 'IL'   // 内左
  | 'IR'   // 内右
  | 'ID'   // 内倒
  | 'IDL'  // 内开内倒-左
  | 'IDR'  // 内开内倒-右
  | 'OL'   // 外左
  | 'OR'   // 外右
  | 'OU'   // 外悬
  | 'OUL'  // 外悬-左
  | 'OUR'  // 外悬-右
  | 'IU'   // 内悬
  | 'IUR'  // 上悬右
  | 'IUL'  // 上悬左
  | 'IF'   // 平推
  | 'C';   // 自定义

/**
 * 填充物类型
 */
export type FillingType =
  | 'fixedGlass'  // 固玻
  | 'fixedNet'    // 固纱
  | 'sashGlass'   // 扇玻
  | 'screenNet'   // 纱网
  | 'fixedPanel'  // 板材
  | 'sashPanel'   // 板材
  | 'sashShade';  // 扇百叶

/**
 * 装饰构件类型
 */
export type DecorationComponentType =
  | 'decorationBar'      // 格条
  | 'sashCornerBrace'    // 玻扇角码
  | 'screenCornerBrace'; // 纱扇角码

/**
 * 配件类型
 * 定义各类门窗配件的分类
 */
export type AddonType =
  | 'frameAddon'              // 外框配件
  | 'sashAddon'               // 玻扇配件
  | 'screenAddon'             // 纱扇配件
  | 'mullionAddon'            // 中挺配件
  | 'glassAddon'              // 玻璃配件
  | 'doubleSashAddon'         // 对开扇配件
  | 'slideAddon'              // 推拉扇配件
  | 'foldAddon'               // 折叠扇配件
  | 'panelAddon'              // 板材配件
  | 'slideCollisionAddon'     // 对碰位配件
  | 'frameConnectAddon'       // 拼框配件
  | 'holeAddon'               // 洞口配件
  | 'theftAddon'              // 防盗框配件
  | 'slideLockAddon'          // 锁配件
  | 'slideEdgeAddon'          // 光企配件
  | 'slideSingleAddon'        // 单勾企配件
  | 'slideDoubleAddon'        // 双勾企配件
  | 'slideUpAddon'            // 上方配件
  | 'slideDownAddon'          // 下方配件
  | 'slideCollisionLeftAddon' // 左对碰配件
  | 'slideCollisionRightAddon'; // 右对碰配件

/**
 * 尺寸类型
 */
export type SizeType = 'size_type0' | 'size_type1';

/**
 * 计价方式
 */
export type PricingMethod = 'pricing_method1' | 'pricing_method2';

/**
 * 副料计价方式
 */
export type SubbarPricingMethod = 'subbar_pricing_method1' | 'subbar_pricing_method2';

/**
 * 中梃方向
 */
export type MullionDirection = 'mullion0' | 'mullion1';

/**
 * 空值类型
 */
export type NoneType = 'none';

/**
 * 门窗配置字典
 * 包含所有配置项的中文显示名称
 */
export interface WindowConfigDictionary {
  // 框型连接类型
  readonly '0': '无-无';
  readonly '1': '无-边框';
  readonly '2': '无-中梃';
  readonly '3': '边框-边框';
  readonly '4': '边框-中梃';
  readonly '5': '中梃-中梃';
  readonly '6': '边封-边封';
  readonly '7': '边封-边框';
  readonly '8': '边封-中梃';
  readonly '9': '边框-上滑';
  readonly '11': '上滑-下滑';
  readonly '12': '边框-下滑';
  readonly '13': '边框-固上滑';
  readonly '14': '固上滑-中梃';
  readonly '15': '固上滑-下滑';
  readonly '16': '固上滑-固下滑';
  readonly '17': '边框-固下滑';
  readonly '18': '固下滑-中梃';
  readonly '19': '上滑-固下滑';
  readonly '20': '上滑-上下滑';
  readonly '21': '上下滑-上下滑';
  readonly '22': '下滑-上下滑';
  readonly '23': '固下滑-上下滑';
  readonly '24': '固上滑-上下滑';
  readonly '25': '无-边封';
  readonly '26': '边封-双边封';
  readonly '27': '双边封-边框';
  readonly '28': '双边封-中挺';
  readonly '29': '无-双边封';
  readonly '30': '双边封-双边封';
  readonly '31': '无-固上滑';
  readonly '32': '无-上滑';

  // 方向
  readonly up: '上';
  readonly down: '下';
  readonly left: '左';
  readonly right: '右';

  // 企口类型
  readonly edge: '光企';
  readonly single: '单勾企';
  readonly double: '双勾企';

  // 对碰位置
  readonly collisionLeft: '左对碰';
  readonly collisionRight: '右对碰';

  // 布尔值
  readonly yes: '是';
  readonly no: '否';

  // 框架组件
  readonly frame: '边框';
  readonly mullion: '中梃';
  readonly fixedBead: '固玻压线';
  readonly cornerJoiner: '转角';
  readonly connector: '连接件';
  readonly sideTrack: '边封';
  readonly DoubleSideTrack: '双边封';
  readonly fixedDownTrack: '固下滑';
  readonly fixedUpTrack: '固上滑';
  readonly downTrack: '下滑';
  readonly upTrack: '上滑';
  readonly turningFrame: '固转框';
  readonly sashTurningFrame: '副框';
  readonly trackBar: '轨道料';
  readonly upDownTrack: '上下滑';
  readonly antiTheft: '防盗框';
  readonly AntiTheft: '防盗框';

  // 边封组件
  readonly sideTrackFixed: '边封盖板';
  readonly sideTrackThroughFixed: '边封通盖板';
  readonly sideTrackSlide: '边封锁条';
  readonly sideTrackSlideEmbedded: '边封扣条';
  readonly sideTrackCouple: '边封拼盖板';

  // 压线类型
  readonly fixedNetBead: '固纱压线';
  readonly fixedPanelBead: '板材压线';
  readonly sashBead: '玻扇压线';
  readonly screenBead: '纱扇压线';
  readonly panelBead: '板材压线';
  readonly shadeSashBead: '百叶扇压线';

  // 扇体类型
  readonly screenFrame: '纱框';
  readonly doubleSash: '对开玻扇';
  readonly doubleScreen: '对开纱扇';
  readonly sash: '玻扇';
  readonly Sash: '玻扇';
  readonly screen: '纱扇';
  readonly Screen: '纱扇';
  readonly foldSash: '折叠玻扇';
  readonly foldScreen: '折叠纱扇';
  readonly slide: '推拉扇';
  readonly ShadePushSash: '百叶扇';

  // 扇体中梃
  readonly sashMullion: '玻扇中梃';
  readonly screenMullion: '纱扇中梃';
  readonly shadeMullion: '百叶条';
  readonly antitheftMullion: '防盗杆';

  // 开启方式
  readonly DSI: '内开';
  readonly DSO: '外开';
  readonly IL: '内左';
  readonly IR: '内右';
  readonly ID: '内倒';
  readonly IDL: '内开内倒-左';
  readonly IDR: '内开内倒-右';
  readonly OL: '外左';
  readonly OR: '外右';
  readonly OU: '外悬';
  readonly OUL: '外悬-左';
  readonly OUR: '外悬-右';
  readonly IU: '内悬';
  readonly IUR: '上悬右';
  readonly IUL: '上悬左';
  readonly IF: '平推';
  readonly C: '自定义';

  // 填充物类型
  readonly fixedGlass: '固玻';
  readonly fixedNet: '固纱';
  readonly sashGlass: '扇玻';
  readonly screenNet: '纱网';
  readonly fixedPanel: '板材';
  readonly sashPanel: '板材';
  readonly sashShade: '扇百叶';

  // 装饰构件
  readonly decorationBar: '格条';
  readonly sashCornerBrace: '玻扇角码';
  readonly screenCornerBrace: '纱扇角码';

  // 配件类型
  readonly frameAddon: '外框配件';
  readonly sashAddon: '玻扇配件';
  readonly screenAddon: '纱扇配件';
  readonly mullionAddon: '中挺配件';
  readonly glassAddon: '玻璃配件';
  readonly doubleSashAddon: '对开扇配件';
  readonly slideAddon: '推拉扇配件';
  readonly foldAddon: '折叠扇配件';
  readonly panelAddon: '板材配件';
  readonly slideCollisionAddon: '对碰位配件';
  readonly frameConnectAddon: '拼框配件';
  readonly holeAddon: '洞口配件';
  readonly theftAddon: '防盗框配件';
  readonly slideLockAddon: '锁配件';
  readonly slideEdgeAddon: '光企配件';
  readonly slideSingleAddon: '单勾企配件';
  readonly slideDoubleAddon: '双勾企配件';
  readonly slideUpAddon: '上方配件';
  readonly slideDownAddon: '下方配件';
  readonly slideCollisionLeftAddon: '左对碰配件';
  readonly slideCollisionRightAddon: '右对碰配件';

  // 尺寸类型
  readonly size_type0: '宽';
  readonly size_type1: '高';

  // 计价方式
  readonly pricing_method1: '按尺寸';
  readonly pricing_method2: '按数量';

  // 副料计价方式
  readonly subbar_pricing_method1: '按尺寸';
  readonly subbar_pricing_method2: '按重量';

  // 中梃方向
  readonly mullion0: '水平';
  readonly mullion1: '垂直';

  // 空值
  readonly none: '无';
}

/**
 * 门窗配置字典实例
 */
declare const windowConfigDictionary: WindowConfigDictionary;

export default windowConfigDictionary;