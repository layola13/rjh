/**
 * Helper plane loading utilities for cabinet sink positioning
 * Handles loading and processing of 3D model planes from OBJ files
 */

import { loadProduct } from './product-loader';
import { CabinetStyle } from './cabinet-style';

/**
 * Supported sink position types for cabinet countertops
 */
type SinkPosition = 'top' | 'middle' | 'bottom';

/**
 * 3D point in meter units
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Plane definition with vertex points
 */
interface PlaneInfo {
  points: Point3D[];
}

/**
 * Mapping of plane names to their geometric data
 */
interface PlanesMap {
  [planeName: string]: PlaneInfo;
}

/**
 * OBJ model metadata
 */
interface ModelMetadata {
  objUrl?: string;
}

/**
 * Extension information containing OBJ plane data
 */
interface ExtensionInfo {
  objInfo?: {
    planes?: PlanesMap;
  };
}

/**
 * Content metadata with model and extension information
 */
interface ContentMetadata {
  model?: ModelMetadata;
  unit?: string;
  extension?: ExtensionInfo;
  contentType?: {
    isTypeOf(type: unknown): boolean;
  };
}

/**
 * Assembly content item (e.g., sink component)
 */
interface ContentItem {
  metadata?: ContentMetadata;
}

/**
 * Product assembly containing multiple content items
 */
interface ProductAssembly {
  contents: Record<string, ContentItem>;
}

/**
 * Transaction command for state management
 */
interface TransactionCommand {
  execute(): void;
  undo(): void;
}

/**
 * Transaction manager for command pattern execution
 */
interface TransactionManager {
  commit(command: TransactionCommand): void;
}

/**
 * Application instance with floorplan access
 */
interface AppInstance {
  floorplan: {
    forEachPAssembly(callback: (assembly: ProductAssembly) => void): void;
  };
  transManager: TransactionManager;
}

/**
 * Global HSApp namespace
 */
declare const HSApp: {
  App: {
    getApp(): AppInstance;
  };
  Ext?: {
    Threejs?: {
      OBJLoader: new () => OBJLoader;
    };
  };
  Util?: {
    Url: {
      isCrossOriginUrl(url: string): boolean;
      useCORSProxy(url: string): string;
    };
  };
};

/**
 * Global HSCore namespace
 */
declare const HSCore: {
  Util: {
    Unit: {
      ConvertToMeterFactor: Record<string, number>;
    };
  };
};

/**
 * Global HSCatalog namespace
 */
declare const HSCatalog: {
  ContentTypeEnum: {
    Sink: unknown;
  };
};

/**
 * 3D Object with geometry
 */
interface Object3D {
  name: string;
  geometry?: {
    vertices: number[];
  };
  traverse(callback: (obj: Object3D) => void): void;
}

/**
 * OBJ file loader
 */
interface OBJLoader {
  loadex(
    url: string,
    onLoad: (object: Object3D) => void,
    onProgress: null,
    onError: () => void,
    metadata: null,
    skipMaterials: boolean
  ): void;
}

/**
 * Plane name mapping based on sink position
 */
const PLANE_NAME_MAP: Record<SinkPosition, string[]> = {
  top: ['cbnt_snap_plane'],
  middle: ['cbnt_top_plane', 'cbnt_snap_plane'],
  bottom: ['cbnt_top_plane', 'cbnt_snap_plane'],
};

/**
 * Default sink position when not specified
 */
const DEFAULT_SINK_POSITION: SinkPosition = 'top';

/**
 * Vertex components per point (x, y, z)
 */
const VERTEX_STRIDE = 3;

/**
 * Main entry point for loading helper planes and applying transformations
 * 
 * @param cabinetStyle - Optional cabinet style configuration
 * @param transformConfig - Transformation configuration parameter
 * @param additionalParam - Additional processing parameter
 */
export default async function loadHelperPlanesAndApplyTransforms(
  cabinetStyle?: CabinetStyle | null,
  transformConfig?: unknown,
  additionalParam?: unknown
): Promise<void> {
  const productData = await loadProduct();

  const style = cabinetStyle ?? CabinetStyle.getCabinetStyle();
  
  if (style.isEmpty()) {
    await style.loadStyles();
  }

  const sinkPosition = (style.getValueByParamId('cabinet_countertop_sinkposition') as SinkPosition) ?? DEFAULT_SINK_POSITION;

  await loadHelperPlanesFromObjs(null, sinkPosition);

  const app = HSApp.App.getApp();
  const transactionManager = app.transManager;

  const commands = generateTransactionCommands(transactionManager, productData, style, transformConfig, additionalParam);
  
  commands.forEach((command) => transactionManager.commit(command));
}

/**
 * Load helper planes from OBJ files for specified assemblies
 * 
 * @param assemblies - Optional array of assemblies to process (null processes all)
 * @param sinkPosition - Position of sink relative to countertop
 * @returns Promise resolving to array of processed content items
 */
export async function loadHelperPlanesFromObjs(
  assemblies: ProductAssembly[] | null,
  sinkPosition?: SinkPosition
): Promise<ContentItem[]> {
  let sinkContentItems: ContentItem[] = [];

  if (assemblies) {
    assemblies.forEach((assembly) => {
      sinkContentItems = sinkContentItems.concat(extractSinkContents(assembly));
    });
  } else {
    const app = HSApp.App.getApp();
    app.floorplan.forEachPAssembly((assembly) => {
      sinkContentItems = sinkContentItems.concat(extractSinkContents(assembly));
    });
  }

  const uniqueContentItems = Array.from(new Set(sinkContentItems));

  return Promise.all(
    uniqueContentItems.map((contentItem) =>
      loadPlanesForContentItem(contentItem, sinkPosition ?? DEFAULT_SINK_POSITION)
    )
  );
}

/**
 * Extract sink content items from an assembly
 * 
 * @param assembly - Product assembly to search
 * @returns Array of sink content items
 */
function extractSinkContents(assembly: ProductAssembly): ContentItem[] {
  const sinkItems: ContentItem[] = [];

  Object.values(assembly.contents).forEach((content) => {
    if (
      content.metadata?.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.Sink)
    ) {
      sinkItems.push(content);
    }
  });

  return sinkItems;
}

/**
 * Load plane data from OBJ file for a content item
 * 
 * @param contentItem - Content item to process
 * @param sinkPosition - Sink position determining which planes to load
 * @returns Promise resolving to the updated content item
 */
async function loadPlanesForContentItem(
  contentItem: ContentItem,
  sinkPosition: SinkPosition
): Promise<ContentItem> {
  const metadata = contentItem.metadata;
  
  if (!metadata?.model?.objUrl) {
    return contentItem;
  }

  const requiredPlaneNames = PLANE_NAME_MAP[sinkPosition] ?? PLANE_NAME_MAP.top;

  const missingPlaneNames = identifyMissingPlanes(metadata, requiredPlaneNames);

  if (missingPlaneNames.length === 0) {
    return contentItem;
  }

  const unitConversionFactor = HSCore.Util.Unit.ConvertToMeterFactor[metadata.unit ?? ''] ?? 1;

  const processPlane = (object: Object3D, conversionFactor: number): void => {
    if (!missingPlaneNames.includes(object.name)) {
      return;
    }

    if (!metadata.extension) {
      metadata.extension = {};
    }
    if (!metadata.extension.objInfo) {
      metadata.extension.objInfo = {};
    }
    if (!metadata.extension.objInfo.planes) {
      metadata.extension.objInfo.planes = {};
    }

    storePlaneData(
      metadata.extension.objInfo.planes,
      object.name,
      object.geometry?.vertices ?? [],
      conversionFactor
    );
  };

  if (HSApp?.Ext?.Threejs?.OBJLoader) {
    const loader = new HSApp.Ext.Threejs.OBJLoader();
    
    return new Promise<ContentItem>((resolve) => {
      const objUrl = ensureCORSProxyUrl(metadata.model!.objUrl!);

      loader.loadex(
        objUrl,
        (loadedObject) => {
          loadedObject.traverse((obj) => processPlane(obj, unitConversionFactor));
          resolve(contentItem);
        },
        null,
        () => resolve(contentItem),
        null,
        true
      );
    });
  }

  return contentItem;
}

/**
 * Identify which required planes are missing from metadata
 * 
 * @param metadata - Content metadata to check
 * @param requiredPlaneNames - Names of required planes
 * @returns Array of missing plane names
 */
function identifyMissingPlanes(
  metadata: ContentMetadata,
  requiredPlaneNames: string[]
): string[] {
  const existingPlanes = metadata.extension?.objInfo?.planes;

  if (!existingPlanes) {
    return [...requiredPlaneNames];
  }

  return requiredPlaneNames.filter((planeName) => !existingPlanes[planeName]);
}

/**
 * Store plane vertex data in metadata
 * 
 * @param planesMap - Map to store plane data
 * @param planeName - Name of the plane
 * @param vertices - Flat array of vertex coordinates [x1,y1,z1, x2,y2,z2, ...]
 * @param conversionFactor - Factor to convert units to meters
 */
function storePlaneData(
  planesMap: PlanesMap,
  planeName: string,
  vertices: number[],
  conversionFactor: number
): void {
  planesMap[planeName] = { points: [] };

  for (let i = 0; i < vertices.length; i += VERTEX_STRIDE) {
    planesMap[planeName].points.push({
      x: vertices[i] * conversionFactor,
      y: vertices[i + 1] * conversionFactor,
      z: vertices[i + 2] * conversionFactor,
    });
  }
}

/**
 * Ensure URL uses CORS proxy if cross-origin
 * 
 * @param url - Original URL
 * @returns Proxied URL if cross-origin, otherwise original
 */
function ensureCORSProxyUrl(url: string): string {
  if (HSApp.Util?.Url.isCrossOriginUrl(url)) {
    return HSApp.Util.Url.useCORSProxy(url);
  }
  return url;
}

/**
 * Generate transaction commands for applying transformations
 * (Implementation depends on external module)
 * 
 * @param transactionManager - Transaction manager instance
 * @param productData - Loaded product data
 * @param style - Cabinet style configuration
 * @param transformConfig - Transformation configuration
 * @param additionalParam - Additional parameter
 * @returns Array of transaction commands
 */
declare function generateTransactionCommands(
  transactionManager: TransactionManager,
  productData: unknown,
  style: CabinetStyle,
  transformConfig: unknown,
  additionalParam: unknown
): TransactionCommand[];