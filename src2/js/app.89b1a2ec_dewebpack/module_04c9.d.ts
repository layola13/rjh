/**
 * 门窗系统配置常量映射表
 * 定义了门窗组件类型、连接关系、方向、操作类型等枚举值的字符串映射
 */
declare module 'module_04c9' {
  /**
   * 门窗系统配置常量接口
   * 包含组件连接类型、方向、锁定状态、组件类型、尺寸类型、定价方法等配置项
   */
  interface WindowSystemConfig {
    // ========== 组件连接类型映射 (数字键) ==========
    /** 无连接-无连接 */
    '0': 'none-none';
    /** 无连接-框架 */
    '1': 'none-frame';
    /** 无连接-中梃 */
    '2': 'none-mullion';
    /** 框架-框架 */
    '3': 'frame-frame';
    /** 框架-中梃 */
    '4': 'frame-mullion';
    /** 中梃-中梃 */
    '5': 'mullion-mullion';
    /** 侧轨-侧轨 */
    '6': 'SideTrack-SideTrack';
    /** 侧轨-框架 */
    '7': 'SideTrack-frame';
    /** 侧轨-中梃 */
    '8': 'SideTrack-mullion';
    /** 框架-上轨 */
    '9': 'frame-UpTrack';
    /** 上轨-下轨 */
    '11': 'UpTrack-DownTrack';
    /** 框架-下轨 */
    '12': 'frame-DownTrack';
    /** 框架-固定上轨 */
    '13': 'frame-FixedUpTrack';
    /** 固定上轨-中梃 */
    '14': 'FixedUpTrack-mullion';
    /** 固定上轨-下轨 */
    '15': 'FixedUpTrack-DownTrack';
    /** 固定上轨-固定下轨 */
    '16': 'FixedUpTrack-FixedDownTrack';
    /** 框架-固定下轨 */
    '17': 'frame-FixedDownTrack';
    /** 固定下轨-中梃 */
    '18': 'FixedDownTrack-mullion';
    /** 上轨-固定下轨 */
    '19': 'UpTrack-FixedDownTrack';
    /** 上轨-上下轨 */
    '20': 'UpTrack-UpDownTrack';
    /** 上下轨-上下轨 */
    '21': 'UpDownTrack-UpDownTrack';
    /** 下轨-上下轨 */
    '22': 'DownTrack-UpDownTrack';
    /** 固定下轨-上下轨 */
    '23': 'FixedDownTrack-UpDownTrack';
    /** 固定上轨-上下轨 */
    '24': 'FixedUpTrack-UpDownTrack';
    /** 无连接-侧轨 */
    '25': 'none-SideTrack';
    /** 侧轨-双侧轨 */
    '26': 'SideTrack-DoubleSideTrack';
    /** 双侧轨-框架 */
    '27': 'DoubleSideTrack-frame';
    /** 双侧轨-中梃 */
    '28': 'DoubleSideTrack-mullion';
    /** 无连接-双侧轨 */
    '29': 'none-DoubleSideTrack';
    /** 双侧轨-双侧轨 */
    '30': 'DoubleSideTrack-DoubleSideTrack';
    /** 无连接-固定上轨 */
    '31': 'none-FixedUpTrack';
    /** 无连接-上轨 */
    '32': 'none-UpTrack';

    // ========== 方向类型 ==========
    /** 向上方向 */
    up: 'up';
    /** 向下方向 */
    down: 'down';
    /** 向左方向 */
    left: 'left';
    /** 向右方向 */
    right: 'right';
    /** 边缘 */
    edge: 'edge';

    // ========== 互锁类型 ==========
    /** 单互锁 */
    single: 'interlockSingle';
    /** 双互锁 */
    double: 'interlockDouble';

    // ========== 碰撞类型 ==========
    /** 左侧碰撞 */
    collisionLeft: 'collisionLeft';
    /** 右侧碰撞 */
    collisionRight: 'collisionRight';

    // ========== 布尔值映射 ==========
    /** 是 */
    yes: 'yes';
    /** 否 */
    no: 'no';

    // ========== 基础组件类型 ==========
    /** 框架 */
    frame: 'frame';
    /** 中梃 */
    mullion: 'mullion';
    /** 固定压条 */
    fixedBead: 'fixedBead';
    /** 转角连接件 */
    cornerJoiner: 'cornerJoiner';
    /** 连接件 */
    connector: 'connector';

    // ========== 轨道类型 ==========
    /** 侧轨 */
    sideTrack: 'sideTrack';
    /** 双侧轨 */
    DoubleSideTrack: 'DoubleSideTrack';
    /** 固定下轨 */
    fixedDownTrack: 'fixedDownTrack';
    /** 固定上轨 */
    fixedUpTrack: 'fixedUpTrack';
    /** 下轨 */
    downTrack: 'downTrack';
    /** 上轨 */
    upTrack: 'upTrack';
    /** 上下轨 */
    upDownTrack: 'upDownTrack';
    /** 轨道条 */
    trackBar: 'trackBar';

    // ========== 框架类型 ==========
    /** 旋转框架 */
    turningFrame: 'turningFrame';
    /** 扇旋转框架 */
    sashTurningFrame: 'sashTurningFrame';
    /** 纱窗框架 */
    screenFrame: 'screenFrame';

    // ========== 侧轨变体 ==========
    /** 侧轨固定 */
    sideTrackFixed: 'sideTrackFixed';
    /** 侧轨贯通固定 */
    sideTrackThroughFixed: 'sideTrackThroughFixed';
    /** 侧轨滑动 */
    sideTrackSlide: 'sideTrackSlide';
    /** 侧轨滑动嵌入 */
    sideTrackSlideEmbedded: 'sideTrackSlideEmbedded';
    /** 侧轨联动 */
    sideTrackCouple: 'sideTrackCouple';

    // ========== 压条类型 ==========
    /** 固定纱网压条 */
    fixedNetBead: 'fixedNetBead';
    /** 固定面板压条 */
    fixedPanelBead: 'fixedPanelBead';
    /** 扇压条 */
    sashBead: 'sashBead';
    /** 纱窗压条 */
    screenBead: 'screenBead';
    /** 面板压条 */
    panelBead: 'panelBead';
    /** 遮阳扇压条 */
    shadeSashBead: 'shadeSashBead';

    // ========== 扇类型 ==========
    /** 双扇 */
    doubleSash: 'doubleSash';
    /** 双纱 */
    doubleScreen: 'doubleScreen';
    /** 扇 */
    sash: 'sash';
    /** 纱窗 */
    screen: 'screen';
    /** 折叠扇 */
    foldSash: 'foldSash';
    /** 折叠纱 */
    foldScreen: 'foldScreen';
    /** 推拉 */
    slide: 'slide';
    /** 扇(首字母大写) */
    Sash: 'Sash';
    /** 纱窗(首字母大写) */
    Screen: 'Screen';
    /** 遮阳推拉扇 */
    ShadePushSash: 'ShadePushSash';
    /** 扇遮阳 */
    sashShade: 'sashShade';

    // ========== 中梃变体 ==========
    /** 扇中梃 */
    sashMullion: 'sashMullion';
    /** 纱窗中梃 */
    screenMullion: 'screenMullion';
    /** 防盗中梃 */
    antitheftMullion: 'antitheftMullion';
    /** 遮阳中梃 */
    shadeMullion: 'shadeMullion';

    // ========== 开启类型标识 ==========
    /** 内左开 */
    DSI: 'DSI';
    /** 内右开 */
    DSO: 'DSO';
    /** 内左开 */
    IL: 'IL';
    /** 内右开 */
    IR: 'IR';
    /** 内下悬 */
    ID: 'ID';
    /** 内下左悬 */
    IDL: 'IDL';
    /** 内下右悬 */
    IDR: 'IDR';
    /** 外左开 */
    OL: 'OL';
    /** 外右开 */
    OR: 'OR';
    /** 外上悬 */
    OU: 'OU';
    /** 外上左悬 */
    OUL: 'OUL';
    /** 外上右悬 */
    OUR: 'OUR';
    /** 内上悬 */
    IU: 'IU';
    /** 内上右悬 */
    IUR: 'IUR';
    /** 内上左悬 */
    IUL: 'IUL';
    /** 内固定 */
    IF: 'IF';
    /** 中心旋转 */
    C: 'C';

    // ========== 防盗类型 ==========
    /** 防盗 */
    antiTheft: 'antiTheft';
    /** 防盗(首字母大写) */
    AntiTheft: 'antiTheft';

    // ========== 填充类型 ==========
    /** 固定玻璃 */
    fixedGlass: 'fixedGlass';
    /** 固定纱网 */
    fixedNet: 'fixedNet';
    /** 扇玻璃 */
    sashGlass: 'sashGlass';
    /** 纱窗网 */
    screenNet: 'screenNet';
    /** 固定面板 */
    fixedPanel: 'fixedPanel';
    /** 扇面板 */
    sashPanel: 'sashPanel';

    // ========== 附加组件类型 ==========
    /** 装饰条 */
    decorationBar: 'decorationBar';
    /** 框架附件 */
    frameAddon: 'frameAddon';
    /** 扇附件 */
    sashAddon: 'sashAddon';
    /** 纱窗附件 */
    screenAddon: 'screenAddon';
    /** 中梃附件 */
    mullionAddon: 'mullionAddon';
    /** 玻璃附件 */
    glassAddon: 'glassAddon';
    /** 双扇附件 */
    doubleSashAddon: 'doubleSashAddon';
    /** 推拉附件 */
    slideAddon: 'slideAddon';
    /** 折叠附件 */
    foldAddon: 'foldAddon';
    /** 面板附件 */
    panelAddon: 'panelAddon';
    /** 推拉碰撞附件 */
    slideCollisionAddon: 'slideCollisionAddon';
    /** 框架连接附件 */
    frameConnectAddon: 'frameConnectAddon';
    /** 孔位附件 */
    holeAddon: 'holeAddon';
    /** 防盗附件 */
    theftAddon: 'theftAddon';
    /** 推拉锁附件 */
    slideLockAddon: 'slideLockAddon';
    /** 推拉边缘附件 */
    slideEdgeAddon: 'slideEdgeAddon';
    /** 推拉单互锁附件 */
    slideSingleAddon: 'interlockSingleAddon';
    /** 推拉双互锁附件 */
    slideDoubleAddon: 'interlockDoubleAddon';
    /** 推拉向上附件 */
    slideUpAddon: 'slideUpAddon';
    /** 推拉向下附件 */
    slideDownAddon: 'slideDownAddon';
    /** 推拉左碰撞附件 */
    slideCollisionLeftAddon: 'slideCollisionLeftAddon';
    /** 推拉右碰撞附件 */
    slideCollisionRightAddon: 'slideCollisionRightAddon';

    // ========== 尺寸类型 ==========
    /** 尺寸类型0: 宽度 */
    size_type0: 'width';
    /** 尺寸类型1: 高度 */
    size_type1: 'height';

    // ========== 定价方法 ==========
    /** 定价方法1: 按面积 */
    pricing_method1: 'asArea';
    /** 定价方法2: 按数量 */
    pricing_method2: 'asQuantity';

    // ========== 副框定价方法 ==========
    /** 副框定价方法1: 按尺寸 */
    subbar_pricing_method1: 'asSize';
    /** 副框定价方法2: 按重量 */
    subbar_pricing_method2: 'asWeight';

    // ========== 中梃方向 ==========
    /** 中梃方向0: 水平 */
    mullion0: 'horizontal';
    /** 中梃方向1: 垂直 */
    mullion1: 'vertical';

    // ========== 其他 ==========
    /** 无/空 */
    none: 'none';
  }

  /**
   * 门窗系统配置常量对象
   * 导出类型安全的配置映射表
   */
  const config: WindowSystemConfig;

  export default config;
}