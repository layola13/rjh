/**
 * Utility class for managing architectural openings (windows, doors, etc.) in building models.
 * Provides methods to validate opening types and calculate default height values based on opening characteristics.
 */
declare module 'OpeningUtil' {
  import { HSCore } from 'HSCore';
  import { HSCatalog } from 'HSCatalog';
  import { HSConstants } from 'HSConstants';

  /**
   * Window type classification used for parametric openings.
   * - 'L': Single linear opening (ordinary window, floor-based window, bay window, etc.)
   * - 'LL': Two linear segments (corner window, corner bay window)
   * - 'LLL': Three linear segments (inner bay window)
   * - 'A': Arc-based opening (curved bay window)
   */
  type WindowType = 'L' | 'LL' | 'LLL' | 'A';

  /**
   * Metadata interface for architectural openings.
   */
  interface OpeningMetadata {
    /** Content type classifier for the opening */
    contentType: HSCatalog.ContentType;
    /** Default height value for this opening type (in meters) */
    defaultHeight?: number;
    /** Z-axis length/dimension of the opening */
    ZLength?: number;
  }

  /**
   * Base interface for architectural opening models.
   */
  interface OpeningModel {
    /** Metadata containing opening properties and classification */
    metadata: OpeningMetadata;
  }

  /**
   * Utility class for architectural opening operations.
   * Cannot be instantiated - all methods are static.
   */
  export class OpeningUtil {
    /**
     * Private constructor prevents instantiation.
     * Use static methods directly on the class.
     */
    private constructor();

    /**
     * Determines if a given opening can be installed on a roof structure.
     * 
     * @param opening - The opening object to validate (Window or ParametricOpening)
     * @returns `true` if the opening is supported for roof installation, `false` otherwise
     * 
     * @remarks
     * Supported roof openings include:
     * - Windows (except bay windows)
     * - Parametric ordinary windows (POOrdinaryWindow)
     * - Parametric floor-based windows (POFloorBasedWindow)
     */
    static isSupportedRoofOpening(
      opening: HSCore.Model.Window | HSCore.Model.ParametricOpening
    ): boolean;

    /**
     * Calculates the appropriate default height for an opening based on its type and characteristics.
     * 
     * @param opening - The opening object (Window or ParametricOpening)
     * @returns Default height value in meters
     * 
     * @remarks
     * Height calculations vary by window type:
     * - **Type 'L' (single segment):**
     *   - Ordinary window: 1.0m
     *   - Floor-based window: 0.2m
     *   - Bay window: 0.6m
     *   - Single door / Door window: 0.0m
     *   - Special-shaped bay window: 1.0m
     *   - Component / Door plate: default
     * - **Type 'LL' (corner):**
     *   - Corner window: 1.0m
     *   - Corner bay window: 0.6m
     *   - Component: default
     * - **Type 'LLL' (inner bay):**
     *   - Inner bay window: 0.0m
     * - **Type 'A' (arc):**
     *   - Curved bay window: 1.0m
     * 
     * For non-parametric openings, uses metadata defaults with special handling for:
     * - Ventilation: `HSConstants.Constants.DEFAULT_VENTILATION_Z`
     * - Ceiling-attached: `activeLayer.height - ZLength`
     */
    static getDefaultHeight(
      opening: HSCore.Model.Window | HSCore.Model.ParametricOpening
    ): number;
  }

  /**
   * Extended HSCore namespace with Model definitions.
   */
  declare namespace HSCore {
    namespace Model {
      /**
       * Represents a standard window in the building model.
       */
      class Window implements OpeningModel {
        metadata: OpeningMetadata;
        contentType: HSCatalog.ContentType;
      }

      /**
       * Represents a parametric opening with configurable geometry.
       */
      class ParametricOpening implements OpeningModel {
        metadata: OpeningMetadata;

        /**
         * Determines the window type classification from metadata.
         * 
         * @param metadata - Opening metadata to analyze
         * @returns Window type code ('L', 'LL', 'LLL', or 'A')
         */
        static getWindowType(metadata: OpeningMetadata): WindowType;
      }
    }

    namespace Doc {
      /**
       * Retrieves the active document manager instance.
       * @returns The singleton document manager
       */
      function getDocManager(): DocumentManager;

      /**
       * Manages building documents and scene hierarchies.
       */
      interface DocumentManager {
        /** Currently active document */
        activeDocument: Document;
      }

      /**
       * Represents a building design document.
       */
      interface Document {
        /** The 3D scene containing all model elements */
        scene: Scene;
      }

      /**
       * 3D scene containing layers and geometry.
       */
      interface Scene {
        /** Currently active layer in the scene */
        activeLayer: Layer;
      }

      /**
       * Represents a floor/level layer in the building.
       */
      interface Layer {
        /** Total height of this layer (in meters) */
        height: number;
      }
    }

    namespace Util {
      namespace Math {
        /**
         * Checks if two floating-point numbers are approximately equal within epsilon tolerance.
         * 
         * @param a - First number
         * @param b - Second number
         * @param epsilon - Optional tolerance value (default implementation-defined)
         * @returns `true` if numbers are nearly equal
         */
        function nearlyEquals(a: number, b: number, epsilon?: number): boolean;
      }
    }
  }

  /**
   * Catalog system for classifying building components.
   */
  declare namespace HSCatalog {
    /**
     * Enumeration of all available content types for openings.
     */
    enum ContentTypeEnum {
      BayWindow = 'bay window',
      POOrdinaryWindow = 'ordinary window',
      POFloorBasedWindow = 'floor-based window',
      ext_Ventilation = 'ext_ventilation',
      ext_CeilingAttached = 'ext_ceiling_attached',
    }

    /**
     * Content type classifier with hierarchical type checking.
     */
    interface ContentType {
      /**
       * Checks if this content type matches or inherits from the specified type.
       * 
       * @param typeName - Type name or enum value to check
       * @returns `true` if this type matches or is a subtype of the specified type
       */
      isTypeOf(typeName: string | ContentTypeEnum): boolean;
    }
  }

  /**
   * Application-wide constants.
   */
  declare namespace HSConstants {
    namespace Constants {
      /**
       * Default Z-coordinate (height) for ventilation openings (in meters).
       */
      const DEFAULT_VENTILATION_Z: number;
    }
  }
}