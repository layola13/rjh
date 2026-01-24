/**
 * Customized cabinet system type definitions
 * Provides enums and constants for cabinet components, parts, surfaces, and handle orientations
 */

/**
 * Cabinet molding enumeration
 * Re-exported from HSCatalog.CabinetMoldingEnum
 */
export declare const CabinetMoldingEnum: typeof HSCatalog.CabinetMoldingEnum;

/**
 * Defines the different parts of a customized cabinet
 * @readonly
 */
export declare const CustomizedCabinetPartEnum: {
  /** Main cabinet body structure */
  readonly Body: "body";
  /** Cabinet door panel */
  readonly Door: "door";
  /** Cabinet handle or knob */
  readonly Handle: "handle";
  /** Additional attached components */
  readonly Attachment: "attachment";
};

/**
 * Type representing valid cabinet part values
 */
export declare type CustomizedCabinetPart = typeof CustomizedCabinetPartEnum[keyof typeof CustomizedCabinetPartEnum];

/**
 * Defines the different surface types of a customized cabinet
 * @readonly
 */
export declare const CustomizedCabinetSurfaceTypeEnum: {
  /** Top horizontal surface */
  readonly CounterTop: "countertop";
  /** Vertical wall protection surface behind cabinet */
  readonly Backsplash: "backsplash";
  /** Decorative trim along top edge */
  readonly TopLine: "topLine";
  /** Base trim covering gap at floor level */
  readonly ToeKick: "toeKick";
};

/**
 * Type representing valid cabinet surface type values
 */
export declare type CustomizedCabinetSurfaceType = typeof CustomizedCabinetSurfaceTypeEnum[keyof typeof CustomizedCabinetSurfaceTypeEnum];

/**
 * Defines the component identifiers for customized cabinets
 * @readonly
 */
export declare const CustomizedCabinetComponentEnum: {
  /** Cabinet body component identifier */
  readonly Body: "cbnt_body";
};

/**
 * Type representing valid cabinet component values
 */
export declare type CustomizedCabinetComponent = typeof CustomizedCabinetComponentEnum[keyof typeof CustomizedCabinetComponentEnum];

/**
 * Defines the orientation options for cabinet handles
 * @readonly
 */
export declare const CustomizedCabinetHandleOrientation: {
  /** Handle oriented horizontally */
  readonly Horizontal: "horizontal";
  /** Handle oriented vertically */
  readonly Vertical: "vertical";
};

/**
 * Type representing valid handle orientation values
 */
export declare type HandleOrientation = typeof CustomizedCabinetHandleOrientation[keyof typeof CustomizedCabinetHandleOrientation];

/**
 * Global HSCatalog namespace declaration
 */
declare global {
  namespace HSCatalog {
    const CabinetMoldingEnum: Record<string, string>;
  }
}