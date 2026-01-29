export async function takeModelCapture(models: any[] = []): Promise<string> {
  const app = HSApp.App.getApp();
  const brepBound = new HSCore.Util.BrepBound();
  
  let largestModel: { model?: any; volume: number } = { volume: -Infinity };
  let minZ = Infinity;
  let maxZ = -Infinity;

  const isModelIncluded = (model: any): boolean => {
    return model === app.floorplan.scene.activeLayer || models.includes(model);
  };

  for (const model of models) {
    brepBound.appendBound(model.bound);
    minZ = Math.min(minZ, model.z);
    maxZ = Math.max(maxZ, model.z + model.ZLength);
    
    const volume = model.XLength * model.YLength * model.ZLength * 
                   model.XScale * model.YScale * model.ZScale;
    
    if (volume > largestModel.volume) {
      largestModel.model = model;
      largestModel.volume = volume;
    }
  }

  const camera = HSCore.Model.Camera.create(HSCore.Model.CameraTypeEnum.OrbitView);
  camera.view_type = HSCore.Model.CameraViewTypeEnum.Orthographic;

  const center = brepBound.center();
  camera.target_x = center.x;
  camera.target_y = center.y;
  camera.target_z = (minZ + maxZ) / 2;

  const boundingDiagonal = Math.hypot(brepBound.width, brepBound.height, maxZ - minZ);
  camera.zoom = 1 / (0.5 / boundingDiagonal);

  const ELEVATION_ANGLE = Math.PI / 6;
  let azimuthAngle = -Math.PI / 8;

  if (largestModel.model) {
    azimuthAngle -= largestModel.model.ZRotation * Math.PI / 180;
  }

  const elevationDistance = Math.sin(ELEVATION_ANGLE) * boundingDiagonal;
  const horizontalDistance = Math.cos(ELEVATION_ANGLE) * boundingDiagonal;
  const offsetX = Math.sin(azimuthAngle) * horizontalDistance;
  const offsetY = Math.cos(azimuthAngle) * horizontalDistance;

  camera.x = camera.target_x + offsetX;
  camera.z = camera.target_z + elevationDistance / 4;
  camera.y = camera.target_y - offsetY;

  setBackgroundVisible(false);

  const previousRenderingMode = app.appSettings.renderingMode;
  app.appSettings.renderingMode = HSApp.App.RenderingMode.ShadingWithEdges;

  const previousSelection = app.selectionManager.selected();
  app.selectionManager.unselectAll();

  const previousFilter = app.selectionManager.getCurrentFilter();
  app.selectionManager.activateFilter(new HSApp.Selection.Filter());

  const was3DViewActive = app.is3DViewActive();
  if (!was3DViewActive) {
    app.switchTo3DView();
  }

  const wasAux3DViewActive = app.isAux3DViewActive();
  let previousAuxState: { auxOptions: any; envName: string } | undefined;

  if (wasAux3DViewActive) {
    const activeView = app.getActive3DView();
    previousAuxState = {
      auxOptions: activeView.context.auxOptions,
      envName: activeView.context.environmentId
    };
  } else {
    app.switchToAux3DView();
  }

  const auxView = app.getAux3DView();
  
  if (wasAux3DViewActive) {
    auxView.clear();
  }

  auxView.onSizeChange();
  auxView.setupCanvas({
    camera,
    canCreateEntity: isModelIncluded,
    forceNoFit: true
  });

  await new Promise<void>(resolve => setTimeout(resolve, 1200));

  const CAPTURE_WIDTH = 800;
  const CAPTURE_HEIGHT = 400;

  let imageDataUrl = await auxView.toImage({
    width: CAPTURE_WIDTH,
    height: CAPTURE_HEIGHT
  });

  const image = new Image();
  image.src = imageDataUrl;
  await new Promise<void>(resolve => { image.onload = () => resolve(); });

  const squareSize = image.height;
  const cropX = image.height / 2;

  const canvas = document.createElement('canvas');
  canvas.width = squareSize;
  canvas.height = squareSize;

  const context = canvas.getContext('2d');
  context?.drawImage(image, cropX, 0, squareSize, squareSize, 0, 0, squareSize, squareSize);

  imageDataUrl = canvas.toDataURL('image/jpeg', 1);

  if (auxView) {
    auxView.context.environmentId = undefined;
  }

  if (wasAux3DViewActive && previousAuxState) {
    const activeView = app.getActive3DView();
    activeView.clear();
    activeView.setupCanvas({
      ...previousAuxState.auxOptions,
      forceNoFit: true
    });
    activeView.context.environmentId = previousAuxState.envName;
    
    if (!was3DViewActive) {
      app.switchTo2DView();
    }
  } else {
    if (!was3DViewActive) {
      app.switchTo2DView();
    }
    app.switchToMainView();
  }

  app.selectionManager.activateFilter(previousFilter);

  for (const item of previousSelection) {
    app.selectionManager.select(item);
  }

  if (previousRenderingMode) {
    app.appSettings.renderingMode = previousRenderingMode;
  }

  setBackgroundVisible(true);

  return imageDataUrl;
}

function setBackgroundVisible(visible: boolean = true): void {
  const app = HSApp.App.getApp();
  app.getActive3DView().renderScene.background.setVisible(visible);
  app.getActive3DView().background.dirty = true;
}