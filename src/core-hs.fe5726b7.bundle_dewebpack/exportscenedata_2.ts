interface SceneDataOptions {
  designData?: any;
  designMeta?: any;
  pano?: any;
  parsedFgiResult?: ParsedFgiResult;
  isUsePengpai?: boolean;
}

interface ParsedFgiResult {
  materialList: string[];
  sceneRoom: Room[];
  furniture: Furniture[];
  mesh: Mesh[];
  material: Material[];
  doors: Door[];
  meshToRoomIdMap: Map<string, string>;
  skeletons: Skeleton[];
}

interface Room {
  type: string;
  [key: string]: any;
}

interface Furniture {
  id: string;
  [key: string]: any;
}

interface Mesh {
  id: string;
  [key: string]: any;
}

interface Material {
  jid: string;
  texture?: string;
  normaltexture?: string;
  hsMaterialParameter?: any;
  contentType?: string[];
  colorMode?: number;
  [key: string]: any;
}

interface Door {
  ID: string;
  [key: string]: any;
}

interface Skeleton {
  [key: string]: any;
}

interface GroupData {
  type: string;
  jid: string;
  members: string[];
}

interface PanoConnector {
  inDoors: Array<{ ID: string }>;
  outDoors: Array<{ ID: string }>;
  [key: string]: any;
}

interface Snapshot {
  pos: number[];
  target: number[];
  up: number[];
  near: number;
  far: number;
  fov: number;
  name: string;
  thumbnail: string;
  sunLightAngles: any;
}

interface SceneData {
  uid: string;
  jobid: string;
  design_version: string;
  code_version: string;
  north_vector: number[];
  furniture: Furniture[];
  mesh: Mesh[];
  material: Material[];
  lights: any[];
  extension: {
    door: Door[];
    outdoor: string;
    pano: any[];
    mini_map: {
      svg: any;
    };
    perspective_view: Record<string, any>;
    area: any[];
    panoconnect?: PanoConnector[];
    snapshots: Snapshot[];
    temperature: number;
    skybox: any;
    vrayToUeContents: string[];
    pengpaiParams?: any;
  };
  scene: {
    ref: string;
    pos: number[];
    rot: number[];
    scale: number[];
    room: Room[];
    boundingBox: {
      min: number[];
      max: number[];
    };
  };
  skeletons: Skeleton[];
  groups: GroupData[];
  materialList: string[];
}

interface Product {
  renderpara?: any;
  contentType?: {
    _types?: string[];
    isTypeOf: (type: any) => boolean;
  };
  [key: string]: any;
}

export class ExportSceneData {
  /**
   * Get scene data asynchronously
   * @param options - Scene data options
   * @param fillMaterialData - Whether to fill material data
   * @param returnObject - Whether to return object or JSON string
   * @returns Scene data as object or JSON string
   */
  static async getSceneDataAsync(
    options: SceneDataOptions,
    fillMaterialData: boolean = false,
    returnObject: boolean = false
  ): Promise<SceneData | string> {
    let sceneData = await ExportSceneData.getRenderSceneData(options);
    sceneData = await ExportSceneData._fillMaterialDataAsync(sceneData, fillMaterialData);
    return returnObject ? sceneData : JSON.stringify(sceneData);
  }

  /**
   * Collect groups from document
   */
  private static _collectGroups(document: any): GroupData[] {
    const groupMap = new Map<string, GroupData>();

    document.forEachGroup((group: any) => {
      if (group instanceof HSCore.Model.Group && group.seekId && group.seekId !== 'none') {
        const memberIds = group.members.map((member: any) => member.id);
        groupMap.set(group.id, {
          type: 'standardModel',
          jid: group.seekId,
          members: memberIds
        });
      }
    });

    return Array.from(groupMap.values());
  }

  /**
   * Process panorama connection information
   */
  private static _dealPanoConnectInfo(panoConnectors: PanoConnector[]): void {
    panoConnectors.forEach((connector) => {
      connector.inDoors = connector.inDoors.map((door) => ({ ID: door.ID }));
      connector.outDoors = connector.outDoors.map((door) => ({ ID: door.ID }));
    });
  }

  /**
   * Open design document and get panorama connectors
   */
  private static async _designOpen(
    docManager: any,
    options: SceneDataOptions
  ): Promise<PanoConnector[] | undefined> {
    if (options?.designData) {
      await docManager.openDocument(options.designData, options.designMeta, '');
      if (options.pano) {
        return HSCore.Util.Pano.getPanosConnectors(options.pano);
      }
    }
    return undefined;
  }

  /**
   * Get render scene data
   */
  static async getRenderSceneData(options: SceneDataOptions): Promise<SceneData> {
    const docManager = HSCore.Doc.getDocManager();
    const activeDocument = docManager.activeDocument;
    const panoConnectors = await ExportSceneData._designOpen(docManager, options);

    let parsedData = options.parsedFgiResult;

    if (!parsedData) {
      const graphicsData = await docManager.geometryManager.getAllGraphicsDataAsync(true, []);
      parsedData = HSCore.FgiParser.parseFgiData(graphicsData);
    }

    const {
      materialList,
      sceneRoom,
      furniture,
      mesh,
      material,
      doors,
      meshToRoomIdMap,
      skeletons
    } = parsedData;

    HSCore.Logger.console.assert(Boolean(materialList), 'invalid scene data');

    if (panoConnectors) {
      ExportSceneData._dealPanoConnectInfo(panoConnectors);
    }

    let allLights: any[] = [];

    const { unitPos, unitQuat, unitScale } = HSCore.Util.Transform.getUnitTransData();
    const scene = activeDocument.scene;
    const activeLayer = scene.activeLayer;
    const bound = scene.bound;
    const minX = bound.left;
    const maxX = bound.left + bound.width;
    const minY = bound.top;
    const maxY = bound.top + bound.height;
    const minZ = scene.getLayerAltitude(activeLayer);
    const maxZ = minZ + activeLayer.getHeight();

    const sceneNode = {
      ref: '-1',
      pos: Object.values(unitPos),
      rot: Object.values(unitQuat),
      scale: Object.values(unitScale),
      room: sceneRoom || [],
      boundingBox: {
        min: [minX, minZ, -minY],
        max: [maxX, maxZ, -maxY]
      }
    };

    sceneNode.room.forEach((room) => {
      if (room.type === 'non') {
        room.type = 'none';
      }
    });

    const snapshots: Snapshot[] = [];

    activeDocument.snapshots.forEach((snapshot: any) => {
      const camera = snapshot.camera;
      const targetVec = new THREE.Vector2();
      targetVec.subVectors(
        new THREE.Vector2(camera.target_x, camera.target_y),
        new THREE.Vector2(camera.x, camera.y)
      );

      const pitchOffset = Math.tan(THREE.Math.degToRad(camera.pitch)) * targetVec.length();
      const targetZ = camera.z + pitchOffset;
      const direction = new THREE.Vector3(
        camera.target_x - camera.x,
        camera.target_y - camera.y,
        targetZ - camera.z
      );

      const right = new THREE.Vector3().crossVectors(direction, new THREE.Vector3(0, 0, 1));
      const up = new THREE.Vector3().crossVectors(right, direction);
      up.normalize();

      const templateName = activeDocument.renderOptions.currentTemplate.name;
      const sunLightAngles = HSCore.getAutoSunLightAngles(camera, activeDocument, templateName);

      snapshots.push({
        pos: [camera.x, camera.z, -camera.y],
        target: [camera.target_x, targetZ, -camera.target_y],
        up: [up.x, up.z, -up.y],
        near: camera.near || 0.1,
        far: camera.far || 200,
        fov: camera.horizontal_fov,
        name: '',
        thumbnail: snapshot.thumbnail,
        sunLightAngles
      });
    });

    const lightExportResult = HSCore.ExportLights.exportAliRenderParameters(
      activeDocument,
      options,
      mesh,
      meshToRoomIdMap
    );

    if (lightExportResult.allLights) {
      allLights = allLights.concat(lightExportResult.allLights);
    }

    const vrayToUeContentIds: string[] = [];
    Object.values(activeDocument.contents).forEach((content: any) => {
      if (content.isFlagOn(HSCore.Model.ContentFlagEnum.uepointflag)) {
        vrayToUeContentIds.push(content.id);
      }
    });

    const skybox = activeDocument.skybox;

    const sceneData: SceneData = {
      uid: activeDocument.designMetadata.get('designId'),
      jobid: '',
      design_version: activeDocument.designMetadata.get('designVersion') || '',
      code_version: '0.12',
      north_vector: [0, 1, 0],
      furniture,
      mesh,
      material,
      lights: allLights,
      extension: {
        door: doors,
        outdoor: '',
        pano: [],
        mini_map: {
          svg: undefined
        },
        perspective_view: {},
        area: [],
        panoconnect: panoConnectors,
        snapshots,
        temperature: activeDocument.renderOptions.temperature,
        skybox: HSCore.Util.Skybox.getSkyboxData(skybox),
        vrayToUeContents: vrayToUeContentIds
      },
      scene: sceneNode,
      skeletons,
      groups: ExportSceneData._collectGroups(activeDocument),
      materialList: Array.from(materialList || [])
    };

    if (options.isUsePengpai) {
      const pengpaiParams = activeDocument.designMetadata.get('pengpaiParams');
      if (pengpaiParams) {
        sceneData.extension.pengpaiParams = pengpaiParams;
      }
    }

    return sceneData;
  }

  /**
   * Fill material data asynchronously
   */
  private static async _fillMaterialDataAsync(
    sceneData: SceneData,
    fetchProducts: boolean = false
  ): Promise<SceneData> {
    const materialList = sceneData.materialList;

    if (!materialList || materialList.length === 0) {
      return sceneData;
    }

    const applyProductData = (productMap: Map<string, Product>): void => {
      const productLookup = new Map<string, Product>();
      for (const key in productMap) {
        productLookup.set(key, productMap[key]);
      }

      sceneData.material.forEach((mat) => {
        if (productLookup.has(mat.jid)) {
          const product = productLookup.get(mat.jid)!;

          if (product.renderpara) {
            mat.hsMaterialParameter = product.renderpara;
          }

          if (product.contentType?._types) {
            mat.contentType = product.contentType._types;

            if (product.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Paint)) {
              mat.colorMode = HSCore.Material.ColorModeEnum.color;
            }
          }
        }

        if (typeof mat.texture === 'string') {
          const queryIndex = mat.texture.indexOf('?');
          if (queryIndex !== -1) {
            mat.texture = mat.texture.substring(0, queryIndex);
          }
        }

        if (typeof mat.normaltexture === 'string') {
          const queryIndex = mat.normaltexture.indexOf('?');
          if (queryIndex !== -1) {
            mat.normaltexture = mat.normaltexture.substring(0, queryIndex);
          }
        }
      });
    };

    let products: Record<string, Product> = {};

    try {
      if (fetchProducts) {
        const BATCH_SIZE = 10;
        const batches: string[][] = [];

        for (let i = 0; i < materialList.length; i += BATCH_SIZE) {
          batches.push(materialList.slice(i, i + BATCH_SIZE));
        }

        const promises = batches.map((batch) =>
          HSCatalog.Manager.instance().getProductsBySeekIds(batch, true)
        );

        const results = await Promise.all(promises);

        for (const result of results) {
          Object.keys(result).forEach((key) => {
            products[key] = result[key];
          });
        }

        applyProductData(products as any);
      } else {
        products = await HSCatalog.Manager.instance().getProductsBySeekIds(materialList, true);
        applyProductData(products as any);
      }
    } catch (error) {
      HSCore.Logger.console.error(error);
    }

    return sceneData;
  }
}