/**
 * 操作标识符枚举
 * 定义了应用中所有可能的用户操作类型
 */
export enum OperationId {
  /** 其他操作 */
  Others = "Others",
  /** 撤销操作 */
  Undo = "Undo",
  /** 恢复/重做操作 */
  Redo = "Restore",
  /** 退出操作 */
  Exit = "Exit",
  /** 创建平面图 */
  CreateFloorplan = "Create Floor Plan",
  /** 重命名房间 */
  RenameRooms = "Rename Rooms",
  /** 保存设计 */
  SaveDesign = "Save Design",
  /** 模型操作 */
  ModelOperation = "Model Operation",
  /** 布局房间 */
  LayoutRooms = "Layout",
  /** 图片转3D模型 */
  ImageTo3DModel = "Image To Model",
  /** 提交渲染 */
  RenderSubmit = "Render",
  /** 视图控制/切换视角 */
  ViewControl = "Switch Perspective",
  /** 查看相册 */
  ViewAlbum = "View Album",
  /** 调试选择 */
  DebugSelection = "Debug_Selection"
}

/**
 * 推荐操作类型映射
 * 根据当前操作推荐用户接下来可能执行的操作列表
 */
export type RecommendedOperationTypes = Readonly<{
  [OperationId.CreateFloorplan]: readonly [
    OperationId.LayoutRooms,
    OperationId.ImageTo3DModel,
    OperationId.ViewControl,
    OperationId.RenderSubmit
  ];
  [OperationId.RenameRooms]: readonly [
    OperationId.ImageTo3DModel,
    OperationId.LayoutRooms,
    OperationId.ViewControl,
    OperationId.Undo
  ];
  [OperationId.ModelOperation]: readonly [
    OperationId.ImageTo3DModel,
    OperationId.ViewControl,
    OperationId.RenderSubmit,
    OperationId.Undo,
    OperationId.Redo
  ];
  [OperationId.LayoutRooms]: readonly [
    OperationId.LayoutRooms,
    OperationId.ImageTo3DModel,
    OperationId.ViewControl,
    OperationId.RenderSubmit
  ];
  [OperationId.ViewControl]: readonly [
    OperationId.RenderSubmit,
    OperationId.ViewAlbum,
    OperationId.ImageTo3DModel,
    OperationId.LayoutRooms
  ];
  [OperationId.RenderSubmit]: readonly [
    OperationId.RenderSubmit,
    OperationId.ViewAlbum,
    OperationId.Exit
  ];
  [OperationId.ViewAlbum]: readonly [
    OperationId.RenderSubmit,
    OperationId.Exit,
    OperationId.ViewAlbum
  ];
  [OperationId.Exit]: readonly [
    OperationId.LayoutRooms,
    OperationId.ImageTo3DModel,
    OperationId.ViewControl,
    OperationId.RenderSubmit
  ];
  [OperationId.Undo]: readonly [
    OperationId.Redo,
    OperationId.Undo,
    OperationId.ViewControl
  ];
  [OperationId.Redo]: readonly [
    OperationId.Undo,
    OperationId.Redo,
    OperationId.ViewControl
  ];
  [OperationId.Others]: readonly [
    OperationId.CreateFloorplan,
    OperationId.ImageTo3DModel,
    OperationId.LayoutRooms,
    OperationId.ViewControl,
    OperationId.RenderSubmit
  ];
}>;

/**
 * 推荐操作类型映射实例
 */
export declare const RecommendedOperationTypes: RecommendedOperationTypes;

/**
 * 操作参数类型枚举
 * 定义操作的具体参数分类
 */
export enum OperationParamType {
  /** 布局类型参数 */
  Layout = "Layout",
  /** 放置类型参数 */
  Place = "Place"
}