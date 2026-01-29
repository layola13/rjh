import { MeshLambertMaterial, LineBasicMaterial, RasterizerCullMode } from './core';

const RENDER_PRIMITIVE_GROUPS = [
  'RPG_OpaqueLit',
  'RPG_OpaqueUnlit',
  'RPG_TranslucentLit',
  'RPG_TranslucentUnlit'
] as const;

Object.freeze(RENDER_PRIMITIVE_GROUPS);

export class T3dOBJLoader2 {
  static async = true;

  isAsync: boolean;
  crossOrigin?: string;
  private _defaultFaceMaterial?: MeshLambertMaterial;
  private _defaultLineMaterial?: LineBasicMaterial;

  constructor() {
    this.isAsync = T3dOBJLoader2.async;
    this._defaultFaceMaterial = undefined;
    this._defaultLineMaterial = undefined;
  }

  private _getDefaultFaceMaterial(): MeshLambertMaterial {
    if (!this._defaultFaceMaterial) {
      this._defaultFaceMaterial = new MeshLambertMaterial({
        cullMode: RasterizerCullMode.CM_None
      });
    }
    return this._defaultFaceMaterial;
  }

  private _getDefaultLineMaterial(): LineBasicMaterial {
    if (!this._defaultLineMaterial) {
      this._defaultLineMaterial = new LineBasicMaterial();
    }
    return this._defaultLineMaterial;
  }

  setAsyncDownload(isAsync: boolean): void {
    this.isAsync = isAsync;
  }

  setCrossOrigin(crossOrigin: string): void {
    this.crossOrigin = crossOrigin;
  }
}