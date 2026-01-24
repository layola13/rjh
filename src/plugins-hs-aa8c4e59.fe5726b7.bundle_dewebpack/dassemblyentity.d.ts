import { CustomizationEntity } from './CustomizationEntity';
import { Parameter, DataType } from './Parameter';
import { CustomizationEntityFactory } from './CustomizationEntityFactory';
import { HSConstants } from './HSConstants';
import { CustomizationParamKey } from './CustomizationParamKey';
import { genMaterialInfoFromMeta } from './MaterialUtils';

/**
 * Interface representing the input data for DAssemblyEntity instances
 */
interface DAssemblyEntityData {
  /** Size in X dimension (width) */
  XSize: number;
  /** Size in Y dimension (depth) */
  YSize: number;
  /** Size in Z dimension (height) */
  ZSize: number;
  /** Indicates if this entity is a countertop */
  isCountertop?: boolean;
  /** Material identifier (seek ID) */
  materialId?: string;
  /** Fixed K parameter for corner size calculation */
  fixK?: number;
  /** Fixed S parameter for corner size calculation */
  fixS?: number;
}

/**
 * Interface for countertop dimension information
 */
interface CounterTopInfo {
  /** Width of the countertop */
  width: number;
  /** Depth of the countertop */
  depth: number;
}

/**
 * Interface for customized products plugin
 */
interface CustomizedProductsPlugin {
  /**
   * Retrieves countertop dimension information
   * @param data - The assembly entity data
   * @returns Countertop info or undefined
   */
  getCounterTopInfo(data: DAssemblyEntityData): CounterTopInfo | undefined;
}

/**
 * DAssemblyEntity represents a customizable assembly component in the design system.
 * It handles size customization, material assignment, and corner sizing for assembly objects.
 * 
 * This entity supports special handling for countertop assemblies and integrates with
 * the plugin system for extended customization capabilities.
 */
export class DAssemblyEntity extends CustomizationEntity {
  /**
   * Generates instance-specific customization data for the assembly entity.
   * 
   * This method processes entity data to extract:
   * - Dimensional parameters (with special countertop handling)
   * - Material information from the catalog
   * - Corner size parameters (if applicable)
   * 
   * @param data - The assembly entity data containing dimensions, material, and other properties
   * @returns Customization instance data with all relevant parameters
   */
  getInstanceData(data: DAssemblyEntityData): InstanceData {
    // Default dimensions from entity data
    let dimensions: [number, number, number] = [data.XSize, data.YSize, data.ZSize];

    // Handle countertop-specific dimension calculation
    if (data.isCountertop) {
      const pluginManager = HSApp.App.getApp().pluginManager;
      const customizedProductsPlugin = pluginManager.getPlugin(
        HSFPConstants.PluginType.CustomizedProducts
      ) as CustomizedProductsPlugin | null;

      if (customizedProductsPlugin?.getCounterTopInfo) {
        const counterTopInfo = customizedProductsPlugin.getCounterTopInfo(data);
        if (counterTopInfo) {
          // Use countertop-specific width and depth, preserve original height
          dimensions = [counterTopInfo.width, counterTopInfo.depth, data.ZSize];
        }
      }
    }

    // Get base instance data from parent class
    const instanceData = super.getInstanceData(data);

    // Add size parameter with calculated dimensions
    instanceData.addParameter(
      new Parameter(
        CustomizationParamKey.Size,
        dimensions,
        DataType.ArrayPoint3D
      )
    );

    // Add material parameter if materialId is provided
    const materialId = data.materialId;
    if (typeof materialId === 'string') {
      const catalogManager = HSApp.App.getApp().catalogManager;
      const productMeta = catalogManager.getProductBySeekIdSync(materialId);
      
      if (productMeta) {
        const materialInfo = genMaterialInfoFromMeta(productMeta);
        instanceData.addParameter(
          new Parameter(
            CustomizationParamKey.Material,
            materialInfo,
            DataType.Object
          )
        );
      }
    }

    // Add corner size parameter if both fixK and fixS are provided
    const fixK = data.fixK;
    const fixS = data.fixS;
    
    if (typeof fixK === 'number' && typeof fixS === 'number') {
      // Convert from millimeters to meters
      const MILLIMETERS_TO_METERS = 1000;
      instanceData.addParameter(
        new Parameter(
          CustomizationParamKey.CornerSize,
          [fixK / MILLIMETERS_TO_METERS, fixS / MILLIMETERS_TO_METERS],
          DataType.ArrayPoint2D
        )
      );
    }

    return instanceData;
  }
}

// Register DAssemblyEntity as the creator for DAssembly model class
CustomizationEntityFactory.registerEntityCreator(
  HSConstants.ModelClass.DAssembly,
  DAssemblyEntity
);