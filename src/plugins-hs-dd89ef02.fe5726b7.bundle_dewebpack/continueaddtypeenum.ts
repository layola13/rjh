export enum ContinueAddTypeEnum {
  none = "none",
  up = "up",
  down = "down"
}

interface ImageInput {
  imageData: string;
  designData?: unknown;
  type: ContinueAddTypeEnum;
}

interface FloorplanJSON {
  [key: string]: unknown;
}

interface App {
  floorplan: {
    saveToJSON(): FloorplanJSON;
    scene: {
      activeLayer: unknown;
      lastLayer: unknown;
      lowestLayer: unknown;
    };
  };
  transManager: {
    startSession(): Session;
  };
  cmdManager: {
    cancel(): void;
    createCommand(type: string, args?: unknown[]): Command;
    execute(command: Command): void;
    receive(action: string, data?: unknown): void;
    complete(): void;
  };
}

interface Session {
  commit(): void;
}

interface Command {
  [key: string]: unknown;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

interface HSFPConstants {
  CommandType: {
    UpdateUnderlay: string;
    ActiveLayer: string;
    InsertLayer: string;
  };
}

declare const HSApp: HSApp;
declare const HSFPConstants: HSFPConstants;

import { newDesign } from './designUtils';

export async function convertJsonByImages(images: ImageInput[]): Promise<FloorplanJSON | undefined> {
  const app = HSApp.App.getApp();
  const initialJSON = app.floorplan.saveToJSON();
  const imageCount = images.length;
  const session = app.transManager.startSession();
  
  app.cmdManager.cancel();
  
  let resultJSON: FloorplanJSON | undefined;

  for (let index = 0; index < imageCount; index++) {
    const currentImage = images[index];
    
    const updateCommand = app.cmdManager.createCommand(HSFPConstants.CommandType.UpdateUnderlay);
    app.cmdManager.execute(updateCommand);
    app.cmdManager.receive("drawunderlay", currentImage.imageData);
    app.cmdManager.complete();

    if (currentImage.designData) {
      resultJSON = await newDesign(currentImage.designData, initialJSON);
    }

    if (currentImage.type !== ContinueAddTypeEnum.none && index < imageCount - 1) {
      const activeLayer = app.floorplan.scene.activeLayer;
      
      const insertLayer = (targetLayer: unknown, insertType: ContinueAddTypeEnum): void => {
        if (activeLayer !== targetLayer) {
          const activateCommand = app.cmdManager.createCommand(
            HSFPConstants.CommandType.ActiveLayer,
            [app, targetLayer]
          );
          app.cmdManager.execute(activateCommand);
          app.cmdManager.complete();
        }

        const insertCommand = app.cmdManager.createCommand(
          HSFPConstants.CommandType.InsertLayer,
          [insertType]
        );
        app.cmdManager.execute(insertCommand);
        app.cmdManager.receive("fitSlab");
        app.cmdManager.receive("complete");
        app.cmdManager.complete();
      };

      let targetLayer = activeLayer;
      if (currentImage.type === ContinueAddTypeEnum.up) {
        targetLayer = app.floorplan.scene.lastLayer;
      } else if (currentImage.type === ContinueAddTypeEnum.down) {
        targetLayer = app.floorplan.scene.lowestLayer;
      }

      insertLayer(targetLayer, currentImage.type);
    }
  }

  session.commit();
  return resultJSON;
}