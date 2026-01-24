/**
 * 日志分组类型枚举
 * 用于统一管理各业务模块的日志分类标识
 */
export enum LogGroupTypes {
  /** 墙体操作 */
  WallOperation = "wallOperation",
  /** 楼板操作 */
  SlabOperation = "slabOperation",
  /** 空间操作 */
  SpaceOperation = "spaceOperation",
  /** 图层操作 */
  LayerOperation = "layerOperation",
  /** 内容/模型操作 */
  ContentOperation = "contentOperation",
  /** 目录操作 */
  CatalogOperation = "catalogOperation",
  /** 模板设计 */
  TemplateDesign = "templateDesign",
  /** 智能搭配 */
  SmartCollocation = "smartCollocation",
  /** 视图操作 */
  ViewOperation = "viewOperation",
  /** 打开设计 */
  OpenDesign = "openDesign",
  /** 保存设计 */
  SaveDesign = "saveDesign",
  /** 导入操作 */
  ImportOperation = "importOperation",
  /** 导出操作 */
  ExportOperation = "exportOperation",
  /** 墙面操作 */
  FaceOperation = "faceOperation",
  /** 硬装操作 */
  HardOperation = "hardOperation",
  /** 灵图操作 */
  SparkPic = "SparkPicOperation",
  /** 灵图图册操作 */
  SparkPicAlbum = "sparkPicAlbumOperation",
  /** 内容属性操作 */
  ContentPropertiesOperation = "contentPropertiesOperation",
  /** 风格操作 */
  StyleOperation = "styleOperation",
  /** 灯光位置操作 */
  LightPositionOperation = "lightPositionOperation",
  /** 灯光属性操作 */
  LightPropertyOperation = "lightPropertyOperation",
  /** 灯光模板 */
  LightTemplate = "lightTemplateOperation",
  /** 渲染操作 */
  Render = "renderOperation",
  /** 图册操作 */
  Album = "albumOperation",
  /** 图片编辑 */
  EditImage = "editImage",
  /** 灯光混合操作 */
  LightMix = "lightMixOperation",
  /** 视频渲染操作 */
  VideoRender = "videoRenderOperation",
  /** 分类目录 */
  Category = "categoryCatalog",
  /** 收藏目录 */
  Favorite = "favoriteCatalog",
  /** 筛选目录 */
  Filter = "filterCatalog",
  /** 搜索目录 */
  Search = "searchCatalog",
  /** 滚动页面目录 */
  ScrollPage = "scrollPageCatalog",
  /** 放置到画布目录 */
  PlaceToCanvas = "placeToCanvasCatalog",
  /** 隐蔽工程V2（水电2.0） */
  ConcealedWorkV2 = "concealedWorkV2",
  /** 自动放置内容 */
  AutoPlaceContent = "autoPlaceContent",
  /** 自动配电设置 */
  AutoPowerSetting = "autoPowerSetting",
  /** 配置配电设置 */
  ConfigurePowerSetting = "configurePowerSetting",
  /** 自动回路 */
  AutoCircuit = "autoCircuit",
  /** 配置回路 */
  ConfigureCircuit = "configureCircuit",
  /** 自动灯光控制 */
  AutoLightCtrl = "autoLightControl",
  /** 配置灯光控制 */
  ConfigureLightCtrl = "configureLightCtrl",
  /** 手动放置管道 */
  ManualPlaceTube = "manualPlaceTube",
  /** 手动放置管道3D */
  ManualPlaceTube3D = "manualPlaceTube3D",
  /** 自动放置管道 */
  AutoPlaceTube = "autoPlaceTube",
  /** 参数化背景墙 */
  ParametricBackgroundWall = "parametricBackgroundWall",
  /** 草图绘制 */
  Sketch = "sketch",
  /** 异形草图2D */
  ExtraordinarySketch2d = "extraordinarySketch2d",
  /** 剖面图 */
  Section = "section",
  /** 立面图 */
  Elevation = "elevation",
  /** 参数化背景墙单元 */
  ParametricBackgroundWallUnit = "parametricBackgroundWallUnit",
  /** 参数化窗帘 */
  ParametricCurtain = "parametricCurtain",
  /** 参数化浴室柜 */
  ParametricBathroomCabinet = "parametricBathroomCabinet",
  /** 参数化内容基础 */
  ParametricContentBase = "parametricContentBase",
  /** 参数化模型 */
  ParametricModel = "parametricModel",
  /** 楼板编辑 */
  SlabEdit = "slabEdit",
  /** 缩略图视图 */
  ThumbnaiView = "thumbnaiView",
  /** 屋顶绘制 */
  RoofsDrawing = "roofsDrawing",
  /** 室外绘制 */
  OutdoorDrawing = "outdoorDrawing",
}

/**
 * 日志分组类型中文名称映射表
 * 将枚举值映射为对应的中文描述，用于UI展示和日志记录
 */
export const LogGroupTypesName: Record<LogGroupTypes, string> = {
  [LogGroupTypes.WallOperation]: "画墙操作",
  [LogGroupTypes.SlabOperation]: "楼板编辑操作",
  [LogGroupTypes.SpaceOperation]: "空间操作",
  [LogGroupTypes.LayerOperation]: "层操作",
  [LogGroupTypes.ContentOperation]: "模型操作",
  [LogGroupTypes.CatalogOperation]: "找模型",
  [LogGroupTypes.TemplateDesign]: "速搭工作流",
  [LogGroupTypes.SmartCollocation]: "智能搭配",
  [LogGroupTypes.ViewOperation]: "视图操作",
  [LogGroupTypes.OpenDesign]: "打开设计",
  [LogGroupTypes.SaveDesign]: "保存设计",
  [LogGroupTypes.ImportOperation]: "导入操作",
  [LogGroupTypes.ExportOperation]: "导出操作",
  [LogGroupTypes.FaceOperation]: "墙面操作",
  [LogGroupTypes.HardOperation]: "硬装操作",
  [LogGroupTypes.SparkPic]: "灵图面板操作",
  [LogGroupTypes.SparkPicAlbum]: "图册集操作",
  [LogGroupTypes.ContentPropertiesOperation]: "修改柜子属性",
  [LogGroupTypes.StyleOperation]: "修改风格",
  [LogGroupTypes.LightPositionOperation]: "灯光位置操作",
  [LogGroupTypes.LightPropertyOperation]: "灯光属性操作",
  [LogGroupTypes.LightTemplate]: "灯光模板操作",
  [LogGroupTypes.Render]: "渲染面板操作",
  [LogGroupTypes.Album]: "图册操作",
  [LogGroupTypes.EditImage]: "美图",
  [LogGroupTypes.LightMix]: "调光操作",
  [LogGroupTypes.VideoRender]: "视频+路径编辑相关",
  [LogGroupTypes.Category]: "切换目录节点",
  [LogGroupTypes.Favorite]: "收藏功能",
  [LogGroupTypes.Filter]: "筛选项",
  [LogGroupTypes.Search]: "搜索功能",
  [LogGroupTypes.ScrollPage]: "滚动条",
  [LogGroupTypes.PlaceToCanvas]: "放置模型至画布",
  [LogGroupTypes.ConcealedWorkV2]: "水电2.0",
  [LogGroupTypes.AutoPlaceContent]: "自动布点",
  [LogGroupTypes.AutoPowerSetting]: "自动配电",
  [LogGroupTypes.ConfigurePowerSetting]: "配电设置",
  [LogGroupTypes.AutoCircuit]: "自动设置回路点位",
  [LogGroupTypes.ConfigureCircuit]: "回路设置",
  [LogGroupTypes.AutoLightCtrl]: "自动设置灯控关系及点位",
  [LogGroupTypes.ConfigureLightCtrl]: "灯控设置",
  [LogGroupTypes.ManualPlaceTube]: "手动布管",
  [LogGroupTypes.ManualPlaceTube3D]: "手动布管3D",
  [LogGroupTypes.AutoPlaceTube]: "自动布管",
  [LogGroupTypes.ParametricBackgroundWall]: "参数化背景墙",
  [LogGroupTypes.Sketch]: "画区域",
  [LogGroupTypes.ExtraordinarySketch2d]: "ExtraordinarySketch2d",
  [LogGroupTypes.Section]: "剖面",
  [LogGroupTypes.Elevation]: "立面",
  [LogGroupTypes.ParametricBackgroundWallUnit]: "参数化背景墙单元",
  [LogGroupTypes.ParametricCurtain]: "参数化窗帘",
  [LogGroupTypes.ParametricBathroomCabinet]: "参数化浴室柜",
  [LogGroupTypes.ParametricContentBase]: "参数化软装",
  [LogGroupTypes.ParametricModel]: "参数化模型",
  [LogGroupTypes.SlabEdit]: "楼板编辑",
  [LogGroupTypes.ThumbnaiView]: "小窗口",
  [LogGroupTypes.RoofsDrawing]: "屋顶绘制",
  [LogGroupTypes.OutdoorDrawing]: "室外绘制",
};