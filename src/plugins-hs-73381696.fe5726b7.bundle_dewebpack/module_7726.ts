import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

class LightMixPlugin extends HSApp.Plugin.IPlugin {
  private _postprocessing: HSApp.View.T3d.Render.PostProcessing;

  constructor() {
    super({
      name: "LightMix Plugin",
      description: "WebT3D Post Processing for Light mix",
      dependencies: []
    });
    this._postprocessing = new HSApp.View.T3d.Render.PostProcessing();
  }

  onActive(context: unknown, options: unknown): void {
    super.onActive(context, options);
  }

  start(scene: unknown, camera: unknown, renderer: unknown): void {
    this._postprocessing.start(scene, camera, renderer);
  }

  finish(): void {
    this._postprocessing.finish();
  }

  update(deltaTime: number): void {
    this._postprocessing.update(deltaTime);
  }

  resize(width: number, height: number): void {
    this._postprocessing.resize(width, height);
  }

  loadLightTexture(
    textureUrl: string,
    index: number,
    width: number,
    height: number
  ): Promise<unknown> {
    return this._postprocessing.loadLightTexture(textureUrl, index, width, height);
  }

  setLightExposure(index: number, exposure: number): void {
    this._postprocessing.setLightExposure(index, exposure);
  }

  setLightOriginColorTemperature(index: number, temperature: number): void {
    this._postprocessing.setLightOriginColorTemperature(index, temperature);
  }

  setLightTargetColorTemperature(index: number, temperature: number): void {
    this._postprocessing.setLightTargetColorTemperature(index, temperature);
  }

  setHighlightBurnIntensity(intensity: number): void {
    this._postprocessing.setHighlightBurnIntensity(intensity);
  }

  loadBaseColorTexture(textureUrl: string): Promise<unknown> {
    return this._postprocessing.loadBaseColorTexture(textureUrl);
  }

  loadFilmicTexture(textureUrl: string): Promise<unknown> {
    return this._postprocessing.loadFilmicTexture(textureUrl);
  }

  loadColorCurveTexture(textureUrl: string): Promise<unknown> {
    return this._postprocessing.loadColorCurveTexture(textureUrl);
  }

  setCVarName(name: string): void {
    this._postprocessing.setCVarName(name);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.LightMix, LightMixPlugin);