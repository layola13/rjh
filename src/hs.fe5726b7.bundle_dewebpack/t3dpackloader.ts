import { App } from './App';
import { MeshLambertMaterial, RasterizerCullMode, MeshComponent } from './MaterialSystem';

interface LoadOptions {
  cachePack: boolean;
}

interface PackNode {
  mRootNode: {
    getComponentsInChildren(componentType: typeof MeshComponent): MeshComponent[];
  };
}

class LineMeshMaterial {
  // Implementation details would be defined based on actual usage
}

export class T3dPackLoader {
  private crossOrigin?: string;
  private _defaultFaceMaterial?: MeshLambertMaterial;
  private _defaultLineMaterial?: LineMeshMaterial;

  /**
   * Sets the cross-origin attribute for resource loading
   */
  public setCrossOrigin(crossOrigin: string): void {
    this.crossOrigin = crossOrigin;
  }

  /**
   * Gets or creates the default face material
   */
  private _getDefaultFaceMaterial(): MeshLambertMaterial {
    if (!this._defaultFaceMaterial) {
      this._defaultFaceMaterial = new MeshLambertMaterial({
        cullMode: RasterizerCullMode.CM_CW
      });
    }
    return this._defaultFaceMaterial;
  }

  /**
   * Gets or creates the default line material
   */
  private _getDefaultLineMaterial(): LineMeshMaterial {
    if (!this._defaultLineMaterial) {
      this._defaultLineMaterial = new LineMeshMaterial();
    }
    return this._defaultLineMaterial;
  }

  /**
   * Loads a 3D pack asset from the given URL
   */
  public load(
    url: string,
    onSuccess: (pack: PackNode) => void,
    onProgress?: (progress: number) => void,
    onError?: (error: Error) => void
  ): void {
    App.Instance.getFileSystem();
    
    const loadOptions: LoadOptions = {
      cachePack: false
    };

    App.Instance.getAssetManager()
      .loadAsync(url, undefined, loadOptions)
      .then((pack: PackNode) => {
        const meshComponents = pack.mRootNode.getComponentsInChildren(MeshComponent);
        
        for (let i = 0, length = meshComponents.length; i < length; i++) {
          const meshComponent = meshComponents[i];
          if (meshComponent) {
            meshComponent.setMaterial(this._getDefaultFaceMaterial());
          }
        }
        
        onSuccess(pack);
      })
      .catch((error: Error) => {
        if (onError) {
          onError(error);
        }
      });
  }

  /**
   * Extracts the model ID from a file path
   */
  private _getModelId(filePath: string): string {
    const pathSegments = filePath.split('/');
    
    if (pathSegments.length === 0) {
      return '';
    }
    
    const fileName = pathSegments[pathSegments.length - 1];
    return fileName.split('.')[0];
  }
}