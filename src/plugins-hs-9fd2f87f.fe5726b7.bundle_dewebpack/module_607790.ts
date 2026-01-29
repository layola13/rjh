import { createCabinetByTypeAndSize, createCabinetByDetailType, CabinetType, CabinetDetailType } from './cabinet-factory';
import { generateToekick, generateWrapToekick } from './toekick-generator';
import { loadCabinetStyleFromDesign, loadCabinetStyle, loadDefaultStyle } from './style-loader';
import { getDesignStyles, getStylesMetaMap } from './style-converter';
import { adjustGrid } from './grid-adjuster';
import { adjustRod } from './rod-adjuster';
import { placeAccessoriesInKitchen } from './kitchen-accessories';
import { placeAccessoriesInCabinets } from './cabinet-accessories';
import { placeAccessoriesInWardrobes } from './wardrobe-accessories';
import { refreshThumbnail } from './thumbnail-refresher';
import { handleOnTopDoors, handleOnBottomDoors } from './handle-utils';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface CabinetStyle {
  [key: string]: unknown;
}

interface Room {
  [key: string]: unknown;
}

interface Handler {
  [key: string]: unknown;
}

class CustomizedCabinetServicePlugin extends HSApp.Plugin.IPlugin {
  private _activeRoom?: Room;
  private handler: Handler | null = null;

  constructor() {
    super({
      name: "Customized Cabinet Service plugin",
      description: "Customized Cabinet Service Plugin",
      dependencies: []
    } as PluginConfig);
  }

  onActive(firstParam: unknown, secondParam: unknown): void {
    this.handler = new Handler(firstParam, secondParam);
  }

  onDeactive(): void {
    this.handler = null;
  }

  createCabinetByTypeAndSize(
    cabinetType: string,
    width: number,
    height: number,
    depth: number,
    position: unknown,
    rotation: unknown,
    options: unknown
  ): unknown {
    return createCabinetByTypeAndSize(cabinetType, width, height, depth, position, rotation, options);
  }

  createCabinetByDetailType(
    detailType: string,
    width: number,
    height: number,
    depth: number,
    position: unknown,
    rotation: unknown
  ): unknown {
    return createCabinetByDetailType(detailType, width, height, depth, position, rotation);
  }

  createCountertop(config: unknown, room?: Room): unknown {
    return createCountertopInternal(config, undefined, room ?? this._activeRoom);
  }

  createToekick(config: unknown, room?: Room): unknown {
    return generateToekick(config, room ?? this._activeRoom);
  }

  createWrapToekick(config: unknown): unknown {
    return generateWrapToekick(config, undefined, this._activeRoom);
  }

  createTopline(config: unknown, room?: Room): unknown {
    return createToplineInternal(config, room ?? this._activeRoom);
  }

  createLightline(config: unknown, options: unknown, extraParam: unknown): unknown {
    return createLightlineInternal(config, options, extraParam, this.activeRoom);
  }

  loadStyleFromDesign(designId: string, styleId: string): CabinetStyle {
    return loadCabinetStyleFromDesign(designId, styleId);
  }

  loadCabinetStyle(styleId: string): CabinetStyle {
    return loadCabinetStyle(styleId);
  }

  loadDefaultStyle(): CabinetStyle {
    return loadDefaultStyle();
  }

  cabinetType(): typeof CabinetType {
    return CabinetType;
  }

  cabinetDetailType(): typeof CabinetDetailType {
    return CabinetDetailType;
  }

  adjustGrid(): typeof adjustGrid {
    return adjustGrid;
  }

  adjustRod(): typeof adjustRod {
    return adjustRod;
  }

  getCabinetStyleToPlain(styles: unknown): unknown {
    return getDesignStyles(styles);
  }

  collectCabinetStylesMap(styles: unknown): Map<string, unknown> {
    return getStylesMetaMap(styles);
  }

  placeAccessoriesInKitchen(
    room: Room | undefined = undefined,
    forceRefresh = false,
    autoDeselect = true
  ): Promise<void> {
    const kitchenAccessoriesPromise = placeAccessoriesInKitchen(room, forceRefresh, autoDeselect).then(() => {});
    const cabinetAccessoriesPromise = placeAccessoriesInCabinets(room, false, autoDeselect).then(() => {});

    return Promise.all([kitchenAccessoriesPromise, cabinetAccessoriesPromise]).then(() => {
      const app = HSApp.App.getApp();
      if (app.selectionManager) {
        app.selectionManager.unselectAll();
      }
    });
  }

  placeAccessoriesInWardrobes(
    room: Room | undefined = undefined,
    includeInterior = true,
    autoDeselect = true
  ): Promise<unknown> {
    return placeAccessoriesInWardrobes(room, includeInterior, autoDeselect);
  }

  placeAccessoriesInCabinets(room: Room): Promise<unknown> {
    return placeAccessoriesInCabinets(room, true);
  }

  refreshPAssemblyThumbnail(assembly: unknown): Promise<unknown> {
    return refreshThumbnail(assembly);
  }

  getHandleOnTopDoors(): unknown {
    return handleOnTopDoors();
  }

  getHandleOnBottomDoors(): unknown {
    return handleOnBottomDoors();
  }

  get activeRoom(): Room | undefined {
    return this._activeRoom;
  }

  set activeRoom(room: Room | undefined) {
    this._activeRoom = room;
  }
}

HSApp.Plugin.registerPlugin("hsw.plugin.customizedcabinetservice.Plugin", CustomizedCabinetServicePlugin);

function createCountertopInternal(config: unknown, _unused: undefined, room: Room | undefined): unknown {
  // Implementation placeholder
  return null;
}

function createToplineInternal(config: unknown, room: Room | undefined): unknown {
  // Implementation placeholder
  return null;
}

function createLightlineInternal(config: unknown, options: unknown, extraParam: unknown, room: Room | undefined): unknown {
  // Implementation placeholder
  return null;
}

class Handler {
  constructor(firstParam: unknown, secondParam: unknown) {
    // Implementation placeholder
  }
}