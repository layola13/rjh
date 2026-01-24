/**
 * Handler for customized molding property bar operations
 * Manages property bar items, material editing, and parameter changes for N-Customized moldings
 */
export declare class NCustomizedMoldingPropertyBarHandler {
  /**
   * Application instance
   */
  private app: HSApp.App;

  /**
   * Catalog plugin instance for content management
   */
  private catalogPlugin: HSFPConstants.Plugin;

  /**
   * Command manager for executing and managing commands
   */
  private cmdMgr: HSApp.CommandManager;

  /**
   * Whether texture scale ratio is locked
   */
  private lockTextureScale: boolean;

  /**
   * Whether image scale ratio is locked
   */
  private lockImageScaleRatio: boolean;

  /**
   * Helper for mix paint plugin operations
   */
  private _mixPaintPluginHelper: HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper;

  /**
   * Initializes the handler with app, plugin, and command manager references
   */
  constructor();

  /**
   * Prepares for showing independent panel by canceling commands and closing catalog
   * @private
   */
  private _willShowIndependentPanel(): void;

  /**
   * Replaces texture for N-Customized molding(s)
   * @param moldings - Single molding or array of moldings to apply texture to
   */
  replaceNCustomizedMoldingTexture(
    moldings: HSCore.Model.NCustomizedModelMolding | HSCore.Model.NCustomizedModelMolding[]
  ): void;

  /**
   * Changes the type/profile of N-Customized molding(s)
   * @param moldings - Single molding or array of moldings to change type
   */
  replaceNCustomizedMoldingType(
    moldings: HSCore.Model.NCustomizedModelMolding | HSCore.Model.NCustomizedModelMolding[]
  ): void;

  /**
   * Generates property bar items for the specified molding
   * @param environment - The environment containing the molding
   * @param moldingId - ID of the molding to generate properties for
   * @returns Array of property bar item configurations
   */
  getNCustomizedMoldingItems(
    environment: HSCore.Model.Environment,
    moldingId: string
  ): PropertyBarItem[];

  /**
   * Gets blend color property configuration
   * @param moldings - Array of moldings to configure
   * @param material - Material instance
   * @returns Blend color property configuration
   * @private
   */
  private _getBlendColorProps(
    moldings: HSCore.Model.NCustomizedModelMolding[],
    material: HSCore.Material.Material
  ): BlendColorProps;

  /**
   * Gets picture/texture property configuration
   * @param moldings - Array of moldings to configure
   * @param material - Material instance
   * @returns Picture property configuration
   * @private
   */
  private _getPictureProps(
    moldings: HSCore.Model.NCustomizedModelMolding[],
    material: HSCore.Material.Material
  ): PictureProps;

  /**
   * Gets paving option property configuration
   * @param moldings - Array of moldings to configure
   * @returns Paving option property configuration
   * @private
   */
  private _getPavingOptionProps(
    moldings: HSCore.Model.NCustomizedModelMolding[]
  ): PavingOptionProps;

  /**
   * Gets scale card property configuration
   * @param moldings - Array of moldings to configure
   * @param material - Material instance
   * @returns Scale property configuration
   * @private
   */
  private _getScaleCardProps(
    moldings: HSCore.Model.NCustomizedModelMolding[],
    material: HSCore.Material.Material
  ): ScaleCardProps;
}

/**
 * Property bar item configuration
 */
interface PropertyBarItem {
  /** Unique identifier */
  id: string;
  /** Parent item ID for nested items */
  parentId?: string;
  /** Display label (localized) */
  label?: string;
  /** Property bar item type */
  type: HSFPConstants.PropertyBarType;
  /** Child items */
  items?: PropertyBarItem[];
  /** Display order */
  order: number;
  /** Item data and callbacks */
  data?: Record<string, unknown>;
  /** Custom render function */
  getRenderItem?: () => React.ReactElement;
}

/**
 * Blend color property configuration
 */
interface BlendColorProps {
  /** Callback when blend radio option is checked */
  blendRadioOnCheck: (mode: HSCore.Material.ColorModeEnum) => void;
  /** Callback when wallpaper button is clicked */
  wallpaperOnClick: () => void;
  /** Callback when color mode is toggled */
  colorModeOnClick: () => void;
  /** Callback when blend color value changes */
  colorOnValueChange: (color: HSCore.Color) => void;
}

/**
 * Picture/texture property configuration
 */
interface PictureProps {
  /** Whether image scale ratio is locked */
  lockImageScaleRatio: boolean;
  /** Callback when width value changes */
  onWidthValueChange: (event: CustomEvent<{ value: number }>) => void;
  /** Callback when height value changes */
  onHeightValueChange: (event: CustomEvent<{ value: number }>) => void;
  /** Callback when lock button is clicked */
  onLockClick: () => void;
  /** Callback when flip option changes */
  onFlipChange: (isVertical: boolean) => void;
}

/**
 * Paving option property configuration
 */
interface PavingOptionProps {
  /** Callback to reset position and rotation */
  onResetClick: () => void;
  /** Callback when alignment changes */
  onAlignmentChange: (alignType: number) => void;
  /** Callback when rotation changes */
  onRotationChange: (event: CustomEvent<{ value: number }>) => void;
  /** Callback when X offset changes */
  onOffsetXChange: (event: CustomEvent<{ value: number }>) => void;
  /** Callback when Y offset changes */
  onOffsetYChange: (event: CustomEvent<{ value: number }>) => void;
}

/**
 * Scale property configuration
 */
interface ScaleCardProps {
  /** Whether texture scale is locked */
  lockTextureScale: boolean;
  /** Callback when X scale changes */
  onScaleXChanged: (event: CustomEvent<{ value: number }>) => void;
  /** Callback when Y scale changes */
  onScaleYChanged: (event: CustomEvent<{ value: number }>) => void;
  /** Callback when lock button is clicked */
  onLockClick: () => void;
  /** Callback to reset scale to default */
  onReset: () => void;
}