/**
 * Environment scope definitions for different editor modes and features
 * @module EnvScope
 */

/**
 * Environment identifiers for various editor modes and tools
 * Frozen object containing all available environment types
 */
export declare const environment: Readonly<{
  /** Empty environment state */
  Empty: "empty";
  /** Default environment */
  Default: "default";
  /** Concealed work version 2 environment */
  ConcealedWorkV2: "concealedworkv2";
  /** Content material replacement mode */
  ContentMaterialReplace: "contentmaterialreplace";
  /** Content part material replacement mode */
  ContentPartMaterialReplace: "contentpartmaterialreplace";
  /** Customized modeling environment */
  CustomizedModeling: "customizedmodeling";
  /** Mix paint tool environment */
  MixPaint: "mixpaint";
  /** Opening styler tool */
  OpeningStyler: "openingstyler";
  /** Customized background wall feature model */
  CustomizedBackgroundWall: "customizedfeaturemodel.customizedbackgroundwall";
  /** Customized ceiling model */
  CustomizedCeilingModel: "customizedfeaturemodel.customizedceilingmodel";
  /** Customized platform feature */
  CustomizedPlatform: "customizedfeaturemodel.customizedplatform";
  /** New customized background wall feature model */
  NCustomizedBackgroundWall: "ncustomizedfeaturemodel.ncustomizedbackgroundwall";
  /** New customized ceiling model */
  NCustomizedCeilingModel: "ncustomizedfeaturemodel.ncustomizedceilingmodel";
  /** New customized platform feature */
  NCustomizedPlatform: "ncustomizedfeaturemodel.ncustomizedplatform";
  /** Face material editing environment */
  FaceMaterial: "facematerial";
  /** Rendering environment */
  Render: "render";
  /** Manual lighting adjustment mode */
  ManualLighting: "manuallighting";
  /** Customized product management */
  CustomizedPM: "customizedpm";
  /** Slab editing environment */
  SlabEdit: "slabedit";
  /** Add roof environment */
  AddRoofEnv: "AddRoofEnv";
  /** TPZZ cabinet mode */
  TPZZCabinet: "tpzz-cabinet";
  /** TPZZ environment */
  TPZZ: "tpzz";
  /** Bill of materials environment */
  Bom: "bom";
  /** Focus mode environment */
  FocusModeEnv: "focusmodeenv";
  /** Focus mode editing environment */
  FocusModeEditEnv: "focusmodeeditenv";
  /** Add to cart environment */
  AddCartEnv: "AddCartEnv";
  /** Add to cart environment version 2 */
  AddCartEnvV2: "AddCartEnvV2";
  /** Content capture environment */
  ContentCaptureEnv: "contentcaptureenv";
  /** Sliding door generation environment */
  SlidingDoor: "GenerateSlidingDoorEnv";
  /** Elevation view environment */
  Elevation: "ElevationEnv";
  /** Molding environment */
  MoldingEnv: "MoldingEnv";
  /** Equalization environment */
  EqualizationEnv: "EqualizationEnv";
  /** Group library editing environment */
  GroupLibEditEnv: "GroupLibEditEnv";
  /** Handle installation environment */
  HandleInstallEnv: "HandleInstallEnv";
  /** Original mold environment */
  OriginalMoldEnv: "OriginalMoldEnv";
  /** Board editing environment */
  BoardEditEnv: "BoardEditEnv";
  /** Candidate configuration environment */
  CandidateConfigureEnv: "CandidateConfigureEnv";
  /** Edit original design mode */
  EditOriginDesign: "edit.origin.design";
  /** Export DWG environment */
  ExportDWGEnv: "ExportDWGEnv";
  /** Drawing generation environment */
  Draw: "GenerateDraw";
  /** CAD editor environment */
  CadEditorEnv: "CadEditorEnv";
  /** Spark picture environment */
  SparkPicEnv: "SparkPicEnv";
  /** Roofs drawing environment */
  RoofsDrawing: "RoofsDrawing";
  /** Outdoor drawing environment */
  OutdoorDrawing: "OutdoorDrawing";
}>;

/**
 * Environment scope enumeration
 * Extended with additional scope identifiers
 */
export declare enum EnvScope {
  /** Spark picture image scope */
  SparkPicImage = "sparkPicImage"
}

/**
 * Type alias for all possible environment values
 */
export type EnvironmentType = typeof environment[keyof typeof environment];