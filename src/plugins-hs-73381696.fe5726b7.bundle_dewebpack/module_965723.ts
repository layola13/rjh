interface SeamedImageProcessHandlers {
  check: (material: Material) => boolean;
  do: (material: Material) => Promise<string>;
}

interface Material {
  seamFillerSupported?: boolean;
  seamWidth?: number;
  textureURI: string;
  seamColor?: string;
  tileSize_x: number;
  tileSize_y: number;
}

interface AjaxResponse {
  data?: {
    url?: string;
  };
}

interface AppConfig {
  app: {
    materialManager: {
      registerSeamedImageProcess(
        pluginType: string,
        handlers: SeamedImageProcessHandlers
      ): void;
    };
  };
}

interface Canvas extends HTMLCanvasElement {
  xRelease(): void;
}

declare const HSFPConstants: {
  PluginType: {
    MaterialImage: string;
  };
};

declare const HSApp: {
  Config: {
    INTERFACE_API: string;
  };
  Util: {
    Url: {
      addParams(url: string, params: Record<string, string | number>): string;
    };
  };
};

declare const HSCore: {
  Material: {
    Util: {
      convertColorToString(color: string): string;
    };
  };
  Util: {
    ObjectPool: {
      getInstance(): {
        get(type: string): Canvas;
      };
    };
  };
};

declare const NWTK: {
  ajax: {
    get(url: string): Promise<AjaxResponse>;
  };
};

export default class SeamedImageProcessor {
  private _app: AppConfig['app'];
  private _materialUrlCache: Map<string, Promise<string>>;

  constructor() {
    this._materialUrlCache = new Map();
  }

  init(config: AppConfig): void {
    this._app = config.app;
    this._app.materialManager.registerSeamedImageProcess(
      HSFPConstants.PluginType.MaterialImage,
      {
        check: this.isSeamSupportedMaterial.bind(this),
        do: this.generateSeamedImage.bind(this),
      }
    );
    this._materialUrlCache = new Map();
  }

  getMaterialUrlWithSeamFiller(
    materialUrl: string,
    seamWidth: number,
    seamColor: string,
    aspectRatio?: number
  ): Promise<string> {
    const encodedUrl = encodeURIComponent(materialUrl);
    const apiEndpoint = `${HSApp.Config.INTERFACE_API}/image/api/v1/borderline`;
    const colorString = HSCore.Material.Util.convertColorToString(seamColor);

    const rgbValues: number[] = [];
    for (let offset = 0; offset < 6; offset += 2) {
      rgbValues.push(parseInt('0x' + colorString.slice(offset, offset + 2)));
    }

    const [red, green, blue] = rgbValues;
    const thickness = seamWidth;

    const requestUrl = aspectRatio
      ? HSApp.Util.Url.addParams(apiEndpoint, {
          r: red,
          t: thickness,
          url: encodedUrl,
          g: green,
          b: blue,
          ratio: aspectRatio,
        })
      : HSApp.Util.Url.addParams(apiEndpoint, {
          r: red,
          t: thickness,
          url: encodedUrl,
          g: green,
          b: blue,
        });

    const cachedPromise = this._materialUrlCache.get(requestUrl);
    if (cachedPromise) {
      return cachedPromise;
    }

    const urlPromise = NWTK.ajax
      .get(requestUrl)
      .then((response) => {
        if (response?.data?.url) {
          return response.data.url;
        }
        return Promise.reject(new Error('Invalid response: missing URL'));
      })
      .then((url) => {
        this._materialUrlCache.set(requestUrl, urlPromise);
        return url;
      });

    return urlPromise;
  }

  resetMaterialUrlCache(): void {
    this._materialUrlCache.clear();
  }

  getSeamImageUrl(
    width: number,
    height: number,
    fillColor: string
  ): string {
    const canvas = HSCore.Util.ObjectPool.getInstance().get('Canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Failed to get 2D context');
    }

    canvas.width = width;
    canvas.height = height;
    context.fillStyle = fillColor;
    context.fillRect(0, 0, width, height);

    const dataUrl = canvas.toDataURL('image/png');
    canvas.xRelease();

    return dataUrl;
  }

  isSeamSupportedMaterial(material: Material | null | undefined): boolean {
    return !!material && (!!material.seamFillerSupported || !!material.seamWidth);
  }

  generateSeamedImage(material: Material): Promise<string> {
    const textureUrl = material.textureURI;
    const seamWidth = material.seamWidth !== undefined ? material.seamWidth : 2;
    const seamColor = material.seamColor !== undefined ? material.seamColor : 'FFFFFF';
    const aspectRatio = material.tileSize_x / material.tileSize_y;

    return this.getMaterialUrlWithSeamFiller(
      textureUrl,
      seamWidth,
      seamColor,
      aspectRatio
    );
  }

  addPreZero(value: string | number): string {
    return ('000000' + value).slice(-6);
  }
}