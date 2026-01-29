export enum EnvScope {
  SparkPicImage = "sparkPicImage"
}

export const environment = {
  Empty: "empty",
  Default: "default",
  ConcealedWorkV2: "concealedworkv2",
  ContentMaterialReplace: "contentmaterialreplace",
  ContentPartMaterialReplace: "contentpartmaterialreplace",
  CustomizedModeling: "customizedmodeling",
  MixPaint: "mixpaint",
  OpeningStyler: "openingstyler",
  CustomizedBackgroundWall: "customizedfeaturemodel.customizedbackgroundwall",
  CustomizedCeilingModel: "customizedfeaturemodel.customizedceilingmodel",
  CustomizedPlatform: "customizedfeaturemodel.customizedplatform",
  NCustomizedBackgroundWall: "ncustomizedfeaturemodel.ncustomizedbackgroundwall",
  NCustomizedCeilingModel: "ncustomizedfeaturemodel.ncustomizedceilingmodel",
  NCustomizedPlatform: "ncustomizedfeaturemodel.ncustomizedplatform",
  FaceMaterial: "facematerial",
  Render: "render",
  ManualLighting: "manuallighting",
  CustomizedPM: "customizedpm",
  SlabEdit: "slabedit",
  AddRoofEnv: "AddRoofEnv",
  TPZZCabinet: "tpzz-cabinet",
  TPZZ: "tpzz",
  Bom: "bom",
  FocusModeEnv: "focusmodeenv",
  FocusModeEditEnv: "focusmodeeditenv",
  AddCartEnv: "AddCartEnv",
  AddCartEnvV2: "AddCartEnvV2",
  ContentCaptureEnv: "contentcaptureenv",
  SlidingDoor: "GenerateSlidingDoorEnv",
  Elevation: "ElevationEnv",
  MoldingEnv: "MoldingEnv",
  EqualizationEnv: "EqualizationEnv",
  GroupLibEditEnv: "GroupLibEditEnv",
  HandleInstallEnv: "HandleInstallEnv",
  OriginalMoldEnv: "OriginalMoldEnv",
  BoardEditEnv: "BoardEditEnv",
  CandidateConfigureEnv: "CandidateConfigureEnv",
  EditOriginDesign: "edit.origin.design",
  ExportDWGEnv: "ExportDWGEnv",
  Draw: "GenerateDraw",
  CadEditorEnv: "CadEditorEnv",
  SparkPicEnv: "SparkPicEnv",
  RoofsDrawing: "RoofsDrawing",
  OutdoorDrawing: "OutdoorDrawing"
} as const;

Object.freeze(environment);

export type EnvironmentType = typeof environment[keyof typeof environment];