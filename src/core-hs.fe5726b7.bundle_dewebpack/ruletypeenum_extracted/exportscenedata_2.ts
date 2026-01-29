interface DesignData {
  designData?: unknown;
  designMeta?: unknown;
  pano?: unknown;
  parsedFgiResult?: FgiResult;
  isUsePengpai?: boolean;
}

interface FgiResult {
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
  [key: string]: unknown;
}

interface Furniture {
  id: string;
  [key: string]: unknown;
}

interface Mesh {
  id: string;
  [key: string]: unknown;
}

interface Material {
  jid: string;
  texture?: string;
  normaltexture?: string;
  hsMaterialParameter?: unknown;
  contentType?: string[];
  colorMode?: number;
  [key: string]: unknown;
}

interface Door {
  ID: string;
  [key: string]: unknown;
}

interface Skeleton {
  [key: string]: unknown;
}

interface Group {
  type: string;
  jid: string;
  members: string[];
}

interface PanoConnector {
  inDoors: Array<{ ID: string }>;
  outDoors: Array<{ ID: string }>;
  [key: string]: unknown;
}

interface Snapshot {
  pos: number[];
  target: number[];
  up: number[];
  near: number;
  far: number;
  fov: number;
  name: string;
  thumbnail?: string;
  sunLightAngles?: unknown;
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
  lights: Light[];
  extension: {
    door: Door[];
    outdoor: string;
    pano: unknown[];
    mini_map: {
      svg: unknown;
    };
    perspective_view: Record<string, unknown>;
    area: unknown[];
    panoconnect?: PanoConnector[];
    snapshots: Snapshot[];
    temperature: number;
    skybox: unknown;
    vrayToUeContents: string[];
    pengpaiParams?: unknown;
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
  groups: Group[];
  materialList: string[];
}

interface Light {
  [key: string]: unknown;
}

interface ProductInfo {
  renderpara?: unknown;
  contentType?: {
    _types: string[];
    isTypeOf: (type: unknown) => boolean;
  };
  [key: string]: unknown;
}

export class ExportSceneData {
  static async getSceneDataAsync(
    designData: DesignData,
    fillMaterialData = false,
    returnObject = false
  ): Promise<string | SceneData> {
    let sceneData = await ExportSceneData.getRenderSceneData(designData);
    sceneData = await ExportSceneData._fillMaterialDataAsync(sceneData, fillMaterialData);
    return returnObject ? sceneData : JSON.stringify(sceneData);
  }

  static _collectGroups(document: HSCore.Model.Document): Group[] {
    const groupsMap = new Map<string, Group>();
    
    document.forEachGroup((group: HSCore.Model.Group) => {
      if (group instanceof HSCore.Model.Group && group.seekId && group.seekId !== 'none') {
        const memberIds = group.members.map(member => member.id);
        groupsMap.set(group.id, {
          type: 'standardModel',
          jid: group.seekId,
          members: memberIds
        });
      }
    });

    return Array.from(groupsMap.values());
  }

  static _dealPanoConnectInfo(panoConnectors: PanoConnector[]): void {
    panoConnectors.forEach(connector => {
      connector.inDoors = connector.inDoors.map(door => ({ ID: door.ID }));
      connector.outDoors = connector.outDoors.map(door => ({ ID: door.ID }));
    });
  }

  static async _designOpen(
    docManager: HSCore.Doc.DocManager,
    designData: DesignData
  ): Promise<PanoConnector[] | undefined> {
    if (designData?.designData) {
      await docManager.openDocument(designData.designData, designData.designMeta, '');
      if (designData.pano) {
        return HSCore.Util.Pano.getPanosConnectors(designData.pano);
      }
    }
    return undefined;
  }

  static async getRenderSceneData(designData: DesignData): Promise<SceneData> {
    const docManager = HSCore.Doc.getDocManager();
    const activeDocument = docManager.activeDocument;
    const panoConnectors = await ExportSceneData._designOpen(docManager, designData);

    let fgiResult = designData.parsedFgiResult;
    if (!fgiResult) {
      const graphicsData = await docManager.geometryManager.getAllGraphicsDataAsync(true, []);
      fgiResult = HSCore.FgiParser.parseFgiData(graphicsData);
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
    } = fgiResult;

    HSCore.Logger.console.assert(Boolean(materialList), 'invalid scene data');

    if (panoConnectors) {
      ExportSceneData._dealPanoConnectInfo(panoConnectors);
    }

    let allLights: Light[] = [];
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

    sceneNode.room.forEach(room => {
      if (room.type === 'non') {
        room.type = 'none';
      }
    });

    const snapshots: Snapshot[] = [];
    activeDocument.snapshots.forEach(snapshot => {
      const camera = snapshot.camera;
      const targetVector = new THREE.Vector2();
      targetVector.subVectors(
        new THREE.Vector2(camera.target_x, camera.target_y),
        new THREE.Vector2(camera.x, camera.y)
      );

      const verticalOffset = Math.tan(THREE.Math.degToRad(camera.pitch)) * targetVector.length();
      const targetZ = camera.z + verticalOffset;
      const directionVector = new THREE.Vector3(
        camera.target_x - camera.x,
        camera.target_y - camera.y,
        targetZ - camera.z
      );

      const rightVector = new THREE.Vector3().crossVectors(
        directionVector,
        new THREE.Vector3(0, 0, 1)
      );
      const upVector = new THREE.Vector3().crossVectors(rightVector, directionVector);
      upVector.normalize();

      const templateName = activeDocument.renderOptions.currentTemplate.name;
      const sunLightAngles = HSCore.getAutoSunLightAngles(camera, activeDocument, templateName);

      snapshots.push({
        pos: [camera.x, camera.z, -camera.y],
        target: [camera.target_x, targetZ, -camera.target_y],
        up: [upVector.x, upVector.z, -upVector.y],
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
      designData,
      mesh,
      meshToRoomIdMap
    );
    if (lightExportResult.allLights) {
      allLights = allLights.concat(lightExportResult.allLights);
    }

    const vrayToUeContents: string[] = [];
    Object.values(activeDocument.contents).forEach((content: HSCore.Model.Content) => {
      if (content.isFlagOn(HSCore.Model.ContentFlagEnum.uepointflag)) {
        vrayToUeContents.push(content.id);
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
        vrayToUeContents
      },
      scene: sceneNode,
      skeletons,
      groups: ExportSceneData._collectGroups(activeDocument),
      materialList: Array.from(materialList || [])
    };

    if (designData.isUsePengpai) {
      const pengpaiParams = activeDocument.designMetadata.get('pengpaiParams');
      if (pengpaiParams) {
        sceneData.extension.pengpaiParams = pengpaiParams;
      }
    }

    return sceneData;
  }

  static async _fillMaterialDataAsync(
    sceneData: SceneData,
    fetchProductInfo = false
  ): Promise<SceneData> {
    const materialList = sceneData.materialList;
    if (!materialList?.length) {
      return sceneData;
    }

    const fillMaterialInfo = (productsMap: Map<string, ProductInfo>) => {
      sceneData.material.forEach(material => {
        if (productsMap.has(material.jid)) {
          const productInfo = productsMap.get(material.jid)!;
          if (productInfo.renderpara) {
            material.hsMaterialParameter = productInfo.renderpara;
          }
          if (productInfo.contentType?._types) {
            material.contentType = productInfo.contentType._types;
            if (productInfo.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Paint)) {
              material.colorMode = HSCore.Material.ColorModeEnum.color;
            }
          }
        }

        if (typeof material.texture === 'string') {
          const queryIndex = material.texture.indexOf('?');
          if (queryIndex !== -1) {
            material.texture = material.texture.substring(0, queryIndex);
          }
        }

        if (typeof material.normaltexture === 'string') {
          const queryIndex = material.normaltexture.indexOf('?');
          if (queryIndex !== -1) {
            material.normaltexture = material.normaltexture.substring(0, queryIndex);
          }
        }
      });
    };

    let productsInfo: Record<string, ProductInfo> = {};
    
    try {
      if (fetchProductInfo) {
        const BATCH_SIZE = 10;
        const batches: string[][] = [];
        
        for (let i = 0; i < materialList.length; i += BATCH_SIZE) {
          batches.push(materialList.slice(i, i + BATCH_SIZE));
        }

        const batchPromises = batches.map(batch =>
          HSCatalog.Manager.instance().getProductsBySeekIds(batch, true)
        );
        const batchResults = await Promise.all(batchPromises);

        for (const batchResult of batchResults) {
          Object.keys(batchResult).forEach(key => {
            productsInfo[key] = batchResult[key];
          });
        }

        const productsMap = new Map<string, ProductInfo>();
        for (const key in productsInfo) {
          productsMap.set(key, productsInfo[key]);
        }
        fillMaterialInfo(productsMap);
      } else {
        productsInfo = await HSCatalog.Manager.instance().getProductsBySeekIds(materialList, true);
        const productsMap = new Map<string, ProductInfo>();
        for (const key in productsInfo) {
          productsMap.set(key, productsInfo[key]);
        }
        fillMaterialInfo(productsMap);
      }
    } catch (error) {
      HSCore.Logger.console.error(error);
    }

    return sceneData;
  }
}