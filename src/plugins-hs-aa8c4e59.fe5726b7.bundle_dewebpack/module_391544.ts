import { HSCWSDK } from './HSCWSDK';
import { registerProvider } from './registerProvider';
import { wrapPromiseEntities } from './wrapPromiseEntities';
import { CWEntity } from './CWEntity';

interface Layer {
  concealedWork?: unknown;
}

interface Scene {
  forEachLayer(callback: (layer: Layer) => void): void;
}

interface Floorplan {
  scene: Scene;
}

interface App {
  floorplan: Floorplan;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

interface ResourceManager {
  getString(key: string): string;
}

declare const HSApp: HSApp;
declare const ResourceManager: ResourceManager;

function collectEntity(): Promise<CWEntity[]> {
  const entities: CWEntity[] = [];

  const app = HSApp.App.getApp();
  const scene = app.floorplan.scene;

  scene.forEachLayer((layer: Layer) => {
    if (!layer.concealedWork) {
      return;
    }

    const getResourceString = (key: string): string => {
      return ResourceManager.getString(key);
    };

    const decorator = new HSCWSDK.Bom4Decorator(layer.concealedWork);
    const cwBom4Data = decorator.getCWBom4Data(scene, getResourceString);

    if (!cwBom4Data) {
      return;
    }

    const cwEntity = new CWEntity();
    cwEntity.accept(cwBom4Data);
    entities.push(cwEntity);
  });

  return wrapPromiseEntities(entities);
}

registerProvider(
  {
    type: 'concealedWork'
  },
  {
    collectEntity
  }
);