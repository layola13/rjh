import { registerProvider } from './register-provider';
import { wrapPromiseEntities } from './wrap-promise-entities';
import { CustomizationEntityFactory } from './customization-entity-factory';

interface CustomizationEntity {
  // Define entity structure based on your domain model
  Class: string;
  [key: string]: unknown;
}

interface SceneChild {
  Class: string;
  [key: string]: unknown;
}

interface SceneLayer {
  forEachChild(callback: (child: SceneChild) => void): void;
}

interface FloorplanScene {
  forEachLayer(callback: (layer: SceneLayer) => void): void;
}

interface HSAppInstance {
  floorplan: {
    scene: FloorplanScene;
  };
}

interface HSAppGlobal {
  App: {
    getApp(): HSAppInstance;
  };
}

declare global {
  const HSApp: HSAppGlobal;
}

function collectEntity(): Promise<CustomizationEntity[]> {
  const entities: CustomizationEntity[] = [];

  const collectedEntities: CustomizationEntity[] = [];

  HSApp.App.getApp().floorplan.scene.forEachLayer((layer: SceneLayer) => {
    layer.forEachChild((child: SceneChild) => {
      const entity = CustomizationEntityFactory.createEntity(child.Class, child);
      if (entity) {
        collectedEntities.push(entity);
      }
    });
  });

  entities.push(...collectedEntities);

  return wrapPromiseEntities(entities);
}

registerProvider(
  {
    type: 'Customization'
  },
  {
    collectEntity
  }
);