import { loadProduct } from './loadProduct';
import { CabinetStyle } from './CabinetStyle';

interface Metadata {
  model?: {
    objUrl?: string;
  };
  unit?: string;
  extension?: {
    objInfo?: {
      planes?: Record<string, PlaneData>;
    };
  };
  contentType?: {
    isTypeOf: (type: any) => boolean;
  };
}

interface ContentItem {
  metadata?: Metadata;
}

interface Assembly {
  contents: Record<string, ContentItem>;
}

interface PlaneData {
  points: Array<{ x: number; y: number; z: number }>;
}

interface GeometryObject {
  name: string;
  geometry: {
    vertices: number[];
  };
}

interface AppInstance {
  floorplan: {
    forEachPAssembly: (callback: (assembly: Assembly) => void) => void;
  };
  transManager: any;
}

declare const HSApp: {
  App: {
    getApp: () => AppInstance;
  };
  Ext?: {
    Threejs?: {
      OBJLoader: new () => OBJLoader;
    };
  };
  Util: {
    Url: {
      isCrossOriginUrl: (url: string) => boolean;
      useCORSProxy: (url: string) => string;
    };
  };
};

declare const HSCore: {
  Util: {
    Unit: {
      ConvertToMeterFactor: Record<string, number>;
    };
  };
};

declare const HSCatalog: {
  ContentTypeEnum: {
    Sink: any;
  };
};

interface OBJLoader {
  loadex: (
    url: string,
    onLoad: (object: any) => void,
    onProgress: null,
    onError: () => void,
    params: null,
    skipMaterials: boolean
  ) => void;
}

type SinkPosition = 'top' | 'middle' | 'bottom';

const PLANE_NAMES_BY_POSITION: Record<SinkPosition, string[]> = {
  top: ['cbnt_snap_plane'],
  middle: ['cbnt_top_plane', 'cbnt_snap_plane'],
  bottom: ['cbnt_top_plane', 'cbnt_snap_plane']
};

export default async function loadHelperPlanes(
  assemblies: Assembly[] | null,
  cabinetStyle?: CabinetStyle,
  onProgress?: any
): Promise<void> {
  const product = await loadProduct();
  
  const style = assemblies || cabinetStyle || CabinetStyle.getCabinetStyle();
  
  if (style.isEmpty()) {
    await style.loadStyles();
  }
  
  const sinkPosition: SinkPosition = 
    style.getValueByParamId('cabinet_countertop_sinkposition') || 'top';
  
  await loadHelperPlanesFromObjs(assemblies, sinkPosition);
  
  const app = HSApp.App.getApp();
  const transManager = app.transManager;
  
  const transactions = generateTransactions(transManager, product, style, onProgress);
  transactions.forEach(transaction => transManager.commit(transaction));
}

export function loadHelperPlanesFromObjs(
  assemblies: Assembly[] | null,
  sinkPosition: SinkPosition
): Promise<ContentItem[]> {
  let sinkItems: ContentItem[] = [];
  
  if (assemblies) {
    assemblies.forEach(assembly => {
      sinkItems = sinkItems.concat(extractSinkItems(assembly));
    });
  } else {
    const app = HSApp.App.getApp();
    app.floorplan.forEachPAssembly(assembly => {
      sinkItems = sinkItems.concat(extractSinkItems(assembly));
    });
  }
  
  sinkItems = Array.from(new Set(sinkItems));
  
  return Promise.all(
    sinkItems.map(item => loadPlanesForItem(item, sinkPosition))
  );
}

function extractSinkItems(assembly: Assembly): ContentItem[] {
  const sinkItems: ContentItem[] = [];
  
  Object.values(assembly.contents).forEach(content => {
    if (
      content.metadata?.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.Sink)
    ) {
      sinkItems.push(content);
    }
  });
  
  return sinkItems;
}

function loadPlanesForItem(
  item: ContentItem,
  sinkPosition: SinkPosition
): Promise<ContentItem> {
  if (!item.metadata?.model?.objUrl) {
    return Promise.resolve(item);
  }
  
  const planeNames = PLANE_NAMES_BY_POSITION[sinkPosition] || PLANE_NAMES_BY_POSITION.top;
  const missingPlaneNames: string[] = [];
  
  if (item.metadata.extension?.objInfo?.planes) {
    planeNames.forEach(planeName => {
      if (!item.metadata.extension!.objInfo!.planes![planeName]) {
        missingPlaneNames.push(planeName);
      }
    });
    
    if (missingPlaneNames.length === 0) {
      return Promise.resolve(item);
    }
  } else {
    planeNames.forEach(planeName => {
      missingPlaneNames.push(planeName);
    });
  }
  
  const unitFactor = HSCore.Util.Unit.ConvertToMeterFactor[item.metadata.unit ?? ''];
  
  const processGeometry = (geometry: GeometryObject, factor?: number): void => {
    if (missingPlaneNames.includes(geometry.name)) {
      if (!item.metadata!.extension!.objInfo!.planes) {
        item.metadata!.extension!.objInfo!.planes = {};
      }
      
      addPlaneFromVertices(
        item.metadata!.extension!.objInfo!.planes,
        geometry.name,
        geometry.geometry.vertices,
        factor
      );
    }
  };
  
  if (HSApp?.Ext?.Threejs?.OBJLoader) {
    const loader = new HSApp.Ext.Threejs.OBJLoader();
    
    return new Promise<ContentItem>(resolve => {
      const objUrl = prepareObjUrl(item.metadata!.model!.objUrl!);
      
      loader.loadex(
        objUrl,
        (object: any) => {
          object.traverse((node: any) => processGeometry(node, unitFactor));
          resolve(item);
        },
        null,
        () => {
          resolve(item);
        },
        null,
        true
      );
    });
  }
  
  return Promise.resolve(item);
}

function prepareObjUrl(url: string): string {
  if (HSApp.Util.Url.isCrossOriginUrl(url)) {
    return HSApp.Util.Url.useCORSProxy(url);
  }
  return url;
}

function addPlaneFromVertices(
  planes: Record<string, PlaneData>,
  planeName: string,
  vertices: number[],
  factor: number = 1
): void {
  planes[planeName] = { points: [] };
  
  for (let i = 0; i < vertices.length; i += 3) {
    planes[planeName].points.push({
      x: vertices[i] * factor,
      y: vertices[i + 1] * factor,
      z: vertices[i + 2] * factor
    });
  }
}

function generateTransactions(
  transManager: any,
  product: any,
  style: any,
  onProgress?: any
): any[] {
  // Implementation placeholder - requires additional context
  return [];
}