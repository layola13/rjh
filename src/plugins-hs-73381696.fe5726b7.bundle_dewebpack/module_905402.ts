import { HSCore } from './HSCore';
import { PropertyBarControlTypeEnum } from './PropertyBarControlTypeEnum';
import { HSFPConstants } from './HSFPConstants';
import { ResourceManager } from './ResourceManager';
import { HSApp } from './HSApp';
import { SvgMap } from './SvgMap';

interface Entity {
  extOption?: string;
}

interface GetItemsParams {
  entities: HSCore.Model.Entity[];
  is3D: boolean;
  app: HSApp.App;
}

interface PropertyBarItem {
  id: string;
  type: PropertyBarControlTypeEnum;
  order: number;
  src?: string;
  disable?: boolean;
  label: string;
  onClick: (event?: Event) => void;
}

interface MaterialData {
  seekId?: string;
  categoryId?: string;
}

interface MaterialMetaData {
  isUserProduct: boolean;
}

interface PluginMaterialBrush {
  suckMaterialFromMesh(entity: Entity): { materialData: MaterialData | null };
}

interface PluginWallDecoration {
  handler: {
    enterMixpaintEnv(): void;
    clearMaterial(): void;
  };
}

interface PluginOutdoorDrawing {
  couldDeleteOutdoorFace(floor: HSCore.Model.Floor): boolean;
  enterOutdoorDrawing(): void;
}

/**
 * Gets property bar items for face group operations
 */
function getFaceGroupItems(params: GetItemsParams): PropertyBarItem[] {
  const { entities, app, is3D } = params;
  const items: PropertyBarItem[] = [];
  const isSameGroup = HSApp.Util.Face.isSameFaceGroup(entities);

  items.push(
    {
      id: 'newFaceGroupButton',
      type: PropertyBarControlTypeEnum.imageButton,
      order: -99,
      src: SvgMap.facegroup,
      disable: !isSameGroup || is3D,
      label: ResourceManager.getString('mixpaint_multiple_face_connect'),
      onClick: (event?: Event) => {
        const cmdManager = app.cmdManager;
        const command = cmdManager.createCommand(
          HSFPConstants.CommandType.MixPaint.CmdSelectFacesToConnect,
          [entities, event]
        );
        cmdManager.execute(command);
      }
    },
    {
      id: 'walldecorationAdvanced',
      type: PropertyBarControlTypeEnum.imageButton,
      order: 102,
      src: SvgMap.wallDecorationAdvanced,
      disable: !isSameGroup || is3D,
      label: ResourceManager.getString('plugin_walldecoration_advanced'),
      onClick: (event?: Event) => {
        const environmentId = app.environmentManager.activeEnvironmentId;
        const eventTracker = HSApp.Util.EventTrack.instance();
        const viewType = app.is3DViewActive() ? '3D' : '2D';

        eventTracker.track(
          HSApp.Util.EventGroupEnum.Rightmenu,
          'plugin_walldecoration_advanced_event',
          {
            entrance: 'leftmenu',
            IF_env: environmentId,
            viewType
          }
        );

        const plugin = app.pluginManager.getPlugin(
          HSFPConstants.PluginType.WallDecoration
        ) as PluginWallDecoration;
        plugin.handler.enterMixpaintEnv();
        event?.stopPropagation();
      }
    },
    {
      id: 'faceGroupButton',
      type: PropertyBarControlTypeEnum.imageButton,
      order: 103,
      src: SvgMap.facegroup,
      disable: isSameGroup || is3D,
      label: ResourceManager.getString('mixpaint_multiple_face_connect'),
      onClick: () => {
        const cmdManager = app.cmdManager;
        const command = cmdManager.createCommand(
          HSFPConstants.CommandType.MixPaint.CmdConnectFaces,
          [entities.slice()]
        );
        cmdManager.execute(command);
        cmdManager.complete(command);
      }
    },
    {
      id: 'faceunGroupButton',
      type: PropertyBarControlTypeEnum.imageButton,
      order: 104,
      src: SvgMap.facegroup,
      disable: !isSameGroup || is3D,
      label: ResourceManager.getString('mixpaint_multiple_face_disconnect'),
      onClick: () => {
        const cmdManager = app.cmdManager;
        const selectionManager = app.selectionManager;
        const command = cmdManager.createCommand(
          HSFPConstants.CommandType.MixPaint.CmdDisConnectFaces,
          [entities.slice()]
        );
        cmdManager.execute(command);
        cmdManager.complete(command);
        selectionManager.unselectAll();
      }
    }
  );

  return items;
}

/**
 * Gets the delete item configuration
 */
function getDeleteItem(params: GetItemsParams): PropertyBarItem {
  // Implementation would be imported from another module
  return {} as PropertyBarItem;
}

/**
 * Gets the hide item configuration
 */
function getHideItem(params: GetItemsParams): PropertyBarItem {
  // Implementation would be imported from another module
  return {} as PropertyBarItem;
}

/**
 * Gets the favorite item configuration
 */
function getFavoriteItem(params: { seekId?: string }): PropertyBarItem {
  // Implementation would be imported from another module
  return {} as PropertyBarItem;
}

export const face = {
  name: 'face',

  /**
   * Checks if the face handler is applicable to the given entities
   */
  isApplied(entities: HSCore.Model.Entity[]): boolean {
    return entities.some((entity) => entity instanceof HSCore.Model.Face);
  },

  /**
   * Gets the property bar items for face entities
   */
  getItems(params: GetItemsParams): PropertyBarItem[] {
    const { entities, is3D, app } = params;
    const items: PropertyBarItem[] = [];

    // Add face group items if multiple entities selected and contains floor
    if (
      entities.length > 1 &&
      entities.some((entity) => entity instanceof HSCore.Model.Floor)
    ) {
      items.push(...getFaceGroupItems(params));
    }

    // Add elevation view item for valid wall faces in 3D
    const validWallFace = HSApp.Util.Face.getValidSelectedWallFace();
    const activeCamera = HSApp.App.getApp().floorplan.active_camera;

    if (
      is3D &&
      validWallFace &&
      activeCamera &&
      activeCamera.type !== HSCore.Model.CameraTypeEnum.OrthView
    ) {
      const master = validWallFace.getMaster();
      const isValidWall =
        master &&
        master instanceof HSCore.Model.Wall &&
        !master.isArcWall();
      const isValidColumn =
        master &&
        (master instanceof HSCore.Model.NCustomizedSquareColumn ||
          master instanceof HSCore.Model.NCustomizedFlue ||
          master instanceof HSCore.Model.NCustomizedRiser);

      if (isValidWall || isValidColumn) {
        items.push({
          id: 'elevation',
          type: PropertyBarControlTypeEnum.imageButton,
          order: 999,
          src: SvgMap.limian,
          disable: HSApp.Util.Face.isFaceGroup(validWallFace),
          label: ResourceManager.getString('contextmenu_viewmode_elevation'),
          onClick: () => {
            HSApp.App.getApp().switchPrimaryViewMode(
              HSApp.View.ViewModeEnum.Elevation,
              {}
            );
          }
        });
      }
    }

    // Return early if multiple entities
    if (entities.length > 1) {
      return items;
    }

    const firstEntity = entities[0];

    // Add hide item for ceiling in last layer
    if (firstEntity instanceof HSCore.Model.Ceiling) {
      const parent = firstEntity.getUniqueParent();
      if (parent instanceof HSCore.Model.Layer && !parent.next) {
        items.push(getHideItem(params));
      }
    }

    // Add delete item for outdoor floor
    if (!is3D && firstEntity instanceof HSCore.Model.Floor) {
      const outdoorPlugin = app.pluginManager.getPlugin(
        HSFPConstants.PluginType.OutdoorDrawing
      ) as PluginOutdoorDrawing;

      if (
        firstEntity.parent === app.floorplan.scene.outdoorLayer &&
        outdoorPlugin.couldDeleteOutdoorFace(firstEntity)
      ) {
        items.push(getDeleteItem(params));
      }
    }

    // Add material-related items
    const currentCommand = app.cmdManager.current;
    const isDefaultEnvironment = app.isUnderDefaultEnvironment();
    const isPlaneView = app.viewMode2D === HSApp.View.ViewModeEnum.Plane;
    const isSvgColorModelZero = app.appSettings.svgColorModel === 0;
    const isNotDivideSpaceCommand =
      !currentCommand || currentCommand.type !== 'hsw.cmd.layer.CmdDivideSpace';
    const isNotFloor = !(firstEntity instanceof HSCore.Model.Floor);

    if (
      is3D ||
      (isDefaultEnvironment &&
        isPlaneView &&
        isSvgColorModelZero &&
        isNotDivideSpaceCommand &&
        isNotFloor)
    ) {
      const selectedEntity = app.selectionManager.selected(false)[0] as Entity;
      selectedEntity.extOption = '';

      const materialBrushPlugin = app.pluginManager.getPlugin(
        HSFPConstants.PluginType.MaterialBrush
      ) as PluginMaterialBrush | undefined;

      let seekId: string | undefined;

      if (materialBrushPlugin) {
        const materialData = materialBrushPlugin.suckMaterialFromMesh(selectedEntity).materialData;
        if (materialData) {
          seekId = materialData.seekId;
        }
      }

      const metaData = HSCore.Material.Manager.instance().getMetaData(seekId);

      if (metaData && !metaData.isUserProduct) {
        items.push(getFavoriteItem({ seekId }));
      }

      items.push({
        id: 'clearmaterial',
        type: PropertyBarControlTypeEnum.imageButton,
        label: ResourceManager.getString('mixpaint_clearshape_material'),
        src: SvgMap.clearmaterial,
        order: 165,
        onClick: () => {
          const wallDecorationPlugin = HSApp.App.getApp().pluginManager.getPlugin(
            HSFPConstants.PluginType.WallDecoration
          ) as PluginWallDecoration;
          wallDecorationPlugin.handler.clearMaterial();
        }
      });
    }

    // Add outdoor drawing item for outdoor floor
    if (firstEntity instanceof HSCore.Model.Floor) {
      const activeEnvironmentId = app.environmentManager.activeEnvironmentId;
      const parent = firstEntity.getUniqueParent();

      if (
        parent instanceof HSCore.Model.Layer &&
        parent === parent.doc.scene.outdoorLayer &&
        activeEnvironmentId === HSFPConstants.Environment.Default
      ) {
        items.push({
          id: 'outdoorDrawing',
          type: PropertyBarControlTypeEnum.imageButton,
          label: ResourceManager.getString('category_draw_area'),
          src: 'hs_mian_waibuquyu',
          order: -100,
          onClick: () => {
            HSApp.Util.EventTrack.instance().track(
              HSApp.Util.EventGroupEnum.Outdoor,
              'enter_draw_env_event',
              { src: 'leftMenu' }
            );

            const outdoorPlugin = HSApp.App.getApp().pluginManager.getPlugin(
              HSFPConstants.PluginType.OutdoorDrawing
            ) as PluginOutdoorDrawing;
            outdoorPlugin?.enterOutdoorDrawing();
          }
        });
      }
    }

    return items;
  }
};