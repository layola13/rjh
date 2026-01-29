/**
 * Operation identifiers for design workflow actions
 */
export enum OperationId {
  Others = "Others",
  Undo = "Undo",
  Redo = "Restore",
  Exit = "Exit",
  CreateFloorplan = "Create Floor Plan",
  RenameRooms = "Rename Rooms",
  SaveDesign = "Save Design",
  ModelOperation = "Model Operation",
  LayoutRooms = "Layout",
  ImageTo3DModel = "Image To Model",
  RenderSubmit = "Render",
  ViewControl = "Switch Perspective",
  ViewAlbum = "View Album",
  DebugSelection = "Debug_Selection"
}

/**
 * Recommended operations to suggest after each operation type
 */
export const RecommendedOperationTypes: Readonly<Record<OperationId, ReadonlyArray<OperationId>>> = Object.freeze({
  [OperationId.CreateFloorplan]: [
    OperationId.LayoutRooms,
    OperationId.ImageTo3DModel,
    OperationId.ViewControl,
    OperationId.RenderSubmit
  ],
  [OperationId.RenameRooms]: [
    OperationId.ImageTo3DModel,
    OperationId.LayoutRooms,
    OperationId.ViewControl,
    OperationId.Undo
  ],
  [OperationId.ModelOperation]: [
    OperationId.ImageTo3DModel,
    OperationId.ViewControl,
    OperationId.RenderSubmit,
    OperationId.Undo,
    OperationId.Redo
  ],
  [OperationId.LayoutRooms]: [
    OperationId.LayoutRooms,
    OperationId.ImageTo3DModel,
    OperationId.ViewControl,
    OperationId.RenderSubmit
  ],
  [OperationId.ViewControl]: [
    OperationId.RenderSubmit,
    OperationId.ViewAlbum,
    OperationId.ImageTo3DModel,
    OperationId.LayoutRooms
  ],
  [OperationId.RenderSubmit]: [
    OperationId.RenderSubmit,
    OperationId.ViewAlbum,
    OperationId.Exit
  ],
  [OperationId.ViewAlbum]: [
    OperationId.RenderSubmit,
    OperationId.Exit,
    OperationId.ViewAlbum
  ],
  [OperationId.Exit]: [
    OperationId.LayoutRooms,
    OperationId.ImageTo3DModel,
    OperationId.ViewControl,
    OperationId.RenderSubmit
  ],
  [OperationId.Undo]: [
    OperationId.Redo,
    OperationId.Undo,
    OperationId.ViewControl
  ],
  [OperationId.Redo]: [
    OperationId.Undo,
    OperationId.Redo,
    OperationId.ViewControl
  ],
  [OperationId.Others]: [
    OperationId.CreateFloorplan,
    OperationId.ImageTo3DModel,
    OperationId.LayoutRooms,
    OperationId.ViewControl,
    OperationId.RenderSubmit
  ],
  [OperationId.SaveDesign]: [],
  [OperationId.DebugSelection]: []
});

/**
 * Parameter types for operations
 */
export enum OperationParamType {
  Layout = "Layout",
  Place = "Place"
}