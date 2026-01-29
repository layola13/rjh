function traverseFloorplanLayers(callback: (layer: Layer) => void): void {
  const floorplan = d.HSApp.App.getApp().floorplan;
  
  let currentLayer: Layer | null = floorplan.scene.rootLayer;
  while (currentLayer) {
    callback(currentLayer);
    currentLayer = currentLayer.next;
  }
  
  currentLayer = floorplan.scene.rootLayer.prev;
  while (currentLayer) {
    callback(currentLayer);
    currentLayer = currentLayer.prev;
  }
}

interface Layer {
  next: Layer | null;
  prev: Layer | null;
}

interface Scene {
  rootLayer: Layer;
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

declare const d: {
  HSApp: HSApp;
};