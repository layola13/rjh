export enum ModelingMessageName {
  Modeling = "modeling",
  CommandSelection = "command.selection",
  CommandMeasure = "command.measure",
  CommandRect = "command.rect",
  CommandCircle = "command.circle",
  CommandPolygon = "command.polygon",
  CommandLine = "command.line",
  CommandExtrusion = "command.extrusion",
  CommandFillet = "command.fillet",
  CommandArch = "command.arch",
  CommandSweep = "command.sweep",
  CommandMolding = "command.molding",
  CommandLightband = "command.lightband",
  CommandLightbandSettings = "command.lightbandsettings",
  CommandLightslot = "command.lightslot",
  CommandAddContent = "command.addcontent",
  CommandOffset = "command.offset",
  CommandMove = "command.move",
  CommandLineRaid = "command.lineraid",
  CommandRadioRaid = "command.radioraid",
  CommandMirror = "command.mirror",
  CommandGuideLine = "command.guideline",
  CommandRotateGuideLine = "command.rotateGuideline",
  CommandPaste = "command.paste",
  CommandCopy = "command.copy",
  CommandUse2DCamera = "command.use2Dcamera",
  CommandUse3DCamera = "command.use3Dcamera",
  CommandUseOrthoCamera = "command.useOrthoCamera",
  CommandSnapFrom = "command.snapFrom",
  WebcadLog = "webcad.log",
  Shortcut = "shortcut.onPassed",
  CommandCad = "command.cad",
  CommandPlaneProjection = "command.planeProjection",
  CommandEndPlaneProjection = "command.endPlaneProjection",
  CommandRotate = "command.rotate",
  CommandSave = "command.save",
  CommandGenerateCeiling = "command.generateCeiling",
  CommandEscape = "command.escape",
  CommandEllipse = "command.ellipse",
  CommandText = "command.text"
}

export enum ModelingMessageAction {
  Start = "start",
  End = "end",
  Enable = "enable",
  Disable = "disable",
  Hint = "hint",
  SelectionNull = "selection.null",
  SelectionMult = "selection.mult",
  SelectionLine = "selection.line",
  SelectionRect = "selection.rect",
  SelectionLightband = "selection.lightband",
  SelectionMolding = "selection.molding",
  SelectionGroup = "selection.group",
  SelectionContent = "selection.content",
  SelectionGuideLine = "selection.guideLine",
  SelectionLightSlot = "selection.lightslot",
  SelectionText = "selection.text",
  EditGroup = "editGroup",
  Onescape = "onescape",
  StepOutEditGroup = "stepOutEditGroup",
  MoldingToolCloseCatalog = "moldingToolCloseCatalog",
  UserInput = "userInput",
  RefreshPropertyBar = "refreshPropertyBar",
  UpdateLength = "updateLength",
  UpdateRotateAngle = "updateRotateAngle",
  FocusWidthInput = "focusWidthInput",
  UpdateHeightDelta = "updateHeightDelta",
  Complete = "complete",
  OnUndoRedo = "onUndoRedo",
  Show = "show",
  ImportFinish = "importFinish",
  ImportFail = "importFail",
  ShowEditBox = "showEditBox",
  RequestSave = "requestSave",
  OnError = "onError",
  ShowCatalog = "showCatalog",
  Tab = "tab",
  C_p = "C_p",
  C_h = "C_h",
  Alt_2 = "Alt_2",
  Alt_3 = "Alt_3",
  Alt_4 = "Alt_4"
}

interface ContentType {
  isTypeOf(contentType: HSCatalog.ContentTypeEnum): boolean;
}

export function ContentTypeToPlugin(content: ContentType): string {
  if (content.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedFeaturewall)) {
    return "plugin_customizedModeling_type_feature_wall";
  }
  
  if (
    content.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedCeiling) ||
    content.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedCeiling)
  ) {
    return "plugin_customizedModeling_type_ceiling";
  }
  
  if (content.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedPlatform)) {
    return "plugin_customizedModeling_type_platform";
  }
  
  return "plugin_customizedModeling_type_personalized";
}