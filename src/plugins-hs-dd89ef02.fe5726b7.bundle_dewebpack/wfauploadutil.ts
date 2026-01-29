import { Vector3 } from './Vector3';
import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { WFABgFace } from './WFABgFace';

interface CaptureOptions {
  width: number;
  height: number;
}

interface ImageOptions {
  format: string;
  width: number;
  height: number;
  forground: boolean;
}

interface WallFaceAssemblyParams {
  xSize: number;
  ySize: number;
  zSize: number;
  x: number;
  y: number;
  z: number;
  wallFace: WallFace;
  associatedContents: Content[];
  position: Position;
}

interface Position {
  x: number;
  y: number;
  z: number;
}

interface WallFace {
  surfaceObj: {
    surface: Surface;
  };
  contents: Record<string, Content>;
  getUniqueParent(): unknown;
}

interface Surface {
  getProjectedPtBy(point: Position): Position;
  getNorm(): Vector3;
}

interface Content {
  setFlagOn(flag: number): void;
  setFlagOff(flag: number): void;
}

interface ProductParams {
  description: string;
  thumb: string;
  name: string;
  categories: string[];
  productType: string;
  contentType: string;
  attributes: unknown[];
  free: string;
}

interface ProductResult {
  productId: string;
}

interface CatalogPlugin {
  addCustomizedProduct(
    params: ProductParams,
    categoryType: string,
    flag: boolean
  ): Promise<ProductResult>;
}

interface FavoritePlugin {
  showPopupGroupPanel(id: string, flag: boolean, name: string): Promise<void>;
  getFavoritesData(): Set<string>;
  removeFavorite(id: string): Promise<void>;
}

export class WFAUploadUtil {
  /**
   * Captures an image from orthographic camera view of a wall face assembly
   */
  static async captureInOrthCamera(
    params: WallFaceAssemblyParams,
    captureOptions: CaptureOptions = { width: 1000, height: 1000 }
  ): Promise<string> {
    const view3D = HSApp.App.getApp().getActive3DView();
    const cameraEntity = view3D.camera.entity;
    
    const originalTarget = new Vector3(
      cameraEntity.target_x,
      cameraEntity.target_y,
      cameraEntity.target_z
    );
    const originalPosition = new Vector3(
      cameraEntity.x,
      cameraEntity.y,
      cameraEntity.z
    );
    const originalZoom = cameraEntity.zoom;
    const originalViewType = cameraEntity.view_type;

    const orthCamera = view3D.orthCamera;
    const { position, wallFace, xSize, ySize, zSize } = params;
    
    const surface = wallFace.surfaceObj.surface;
    const centerPoint = surface.getProjectedPtBy({
      x: position.x,
      y: position.y,
      z: position.z + zSize / 2
    });

    let horizontalSize = Math.sqrt(xSize * xSize + ySize * ySize);
    let verticalSize = zSize;

    if (verticalSize > horizontalSize) {
      const aspectRatio =
        view3D.context.clientRect.width / view3D.context.clientRect.height;
      horizontalSize = aspectRatio * verticalSize;
    }

    const normal = surface.getNorm();
    const normalVector = new Vector3(normal.x, normal.y, normal.z);
    const centerVector = new Vector3(centerPoint.x, centerPoint.y, centerPoint.z);

    const floorplan = HSApp.App.getApp().floorplan;
    const scene = floorplan.scene;
    const layerAltitude = scene.getLayerAltitude(scene.activeLayer);
    centerVector.z += layerAltitude;

    const cameraPosition = centerVector.add(normalVector);
    orthCamera.setCameraParam(centerVector, cameraPosition, horizontalSize);

    const clientRect = captureOptions ?? view3D.context.clientRect;
    const imageOptions: ImageOptions = {
      format: 'image/png',
      width: clientRect.width,
      height: clientRect.height,
      forground: false
    };

    const imageData = await view3D.toImage(imageOptions);
    
    orthCamera.setCameraParam(
      originalTarget,
      originalPosition,
      originalZoom,
      originalViewType
    );

    return imageData;
  }

  /**
   * Uploads a wall face assembly to the catalog
   */
  static async uploadWallFaceAssembly(
    params: WallFaceAssemblyParams
  ): Promise<string> {
    const { xSize, ySize, zSize, x, y, z, wallFace, associatedContents } = params;

    const connectedFaces =
      HSCore.Util.SameLineFace.getSameLineConnectedFaces(wallFace);
    const decorator = new HSCore.Model.WallFaceAssemblyDecorator(params);
    const productData = decorator.getWFAProductData(connectedFaces);
    const productDataJson = JSON.stringify(productData);

    const hiddenContents: Content[] = [];
    connectedFaces.forEach((face) => {
      Object.values(face.contents).forEach((content) => {
        if (!associatedContents.includes(content)) {
          content.setFlagOn(HSCore.Model.EntityFlagEnum.hidden);
          hiddenContents.push(content);
        }
      });
    });

    const bgFace = new WFABgFace(wallFace.getUniqueParent());
    const normal = wallFace.surfaceObj.surface.getNorm();
    const centerPosition = new Vector3(x, y, z + zSize / 2).translate(
      normal.reversed().normalized().multiplied(ySize / 2)
    );
    bgFace.init(xSize, zSize, centerPosition, normal);

    const uploadDataPromise = HSApp.Io.Request.Design.uploadFile(
      productDataJson,
      {
        resType: 'model',
        contentType: 'application/json'
      }
    );

    let dataUrl: string;

    return uploadDataPromise
      .then((url) => {
        dataUrl = url;
        return this.captureInOrthCamera(params);
      })
      .then((imageData) => {
        hiddenContents.forEach((content) =>
          content.setFlagOff(HSCore.Model.EntityFlagEnum.hidden)
        );
        bgFace.destroy();

        return HSApp.Io.Request.Design.uploadFile(imageData, {
          resType: 'model'
        });
      })
      .then((thumbUrl) => {
        const displayName = ResourceManager.getString(
          'plugin_wallface_assembly_leftmenu_group_all'
        );
        const contentType = `${HSCatalog.ContentTypeEnum.CustomizedContent}/${HSCatalog.ContentTypeEnum.WallFaceAssembly}`;

        const productParams: ProductParams = {
          description: displayName,
          thumb: thumbUrl,
          name: displayName,
          categories: ['1d376529-e666-420f-a7f6-3259c752ca2b'],
          productType: HSCatalog.ProductTypeEnum.Model,
          contentType,
          attributes: [],
          free: JSON.stringify({ dataUrl })
        };

        const catalogPlugin = HSApp.App.getApp().pluginManager.getPlugin(
          HSFPConstants.PluginType.Catalog
        ) as CatalogPlugin | null;

        if (!catalogPlugin) {
          return Promise.reject(new Error('Catalog plugin not found'));
        }

        return catalogPlugin.addCustomizedProduct(
          productParams,
          HSCatalog.CategoryTypeEnum.WallFaceAssembly,
          true
        );
      })
      .then((result) => result.productId);
  }

  /**
   * Adds a product to favorites
   */
  static addToFavorite(productId: string, groupName?: string): Promise<void> {
    const name =
      groupName ??
      ResourceManager.getString('plugin_wallface_assembly_leftmenu_group_all');

    const favoritePlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.Favorite
    ) as FavoritePlugin;

    return favoritePlugin.showPopupGroupPanel(productId, true, name);
  }

  /**
   * Checks if a product is favorited
   */
  static isFavorited(productId: string): boolean {
    const favoritePlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.Favorite
    ) as FavoritePlugin;

    return favoritePlugin.getFavoritesData().has(productId);
  }

  /**
   * Removes a product from favorites
   */
  static async removeFavorite(productId: string): Promise<boolean> {
    const favoritePlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.Favorite
    ) as FavoritePlugin;

    await Promise.resolve(favoritePlugin.removeFavorite(productId));
    
    return !favoritePlugin.getFavoritesData().has(productId);
  }
}