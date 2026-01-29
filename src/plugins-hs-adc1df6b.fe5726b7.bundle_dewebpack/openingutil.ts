interface ContentType {
  isTypeOf(type: string | HSCatalog.ContentTypeEnum): boolean;
}

interface Metadata {
  contentType: ContentType;
  defaultHeight?: number;
  ZLength?: number;
}

interface ParametricOpeningMetadata extends Metadata {
  contentType: ContentType;
}

interface Layer {
  height: number;
}

interface Scene {
  activeLayer: Layer;
}

interface Document {
  scene: Scene;
}

interface DocumentManager {
  activeDocument: Document;
}

namespace HSCore {
  export namespace Model {
    export class Window {
      contentType: ContentType;
    }

    export class ParametricOpening {
      metadata: ParametricOpeningMetadata;

      static getWindowType(metadata: ParametricOpeningMetadata): string;
    }
  }

  export namespace Doc {
    export function getDocManager(): DocumentManager;
  }

  export namespace Util {
    export namespace Math {
      export function nearlyEquals(a: number, b: number): boolean;
    }
  }
}

namespace HSCatalog {
  export enum ContentTypeEnum {
    BayWindow = 'bay window',
    POOrdinaryWindow = 'ordinary window',
    POFloorBasedWindow = 'floor-based window',
    ext_Ventilation = 'ventilation',
    ext_CeilingAttached = 'ceiling attached'
  }
}

namespace HSConstants {
  export namespace Constants {
    export const DEFAULT_VENTILATION_Z: number;
  }
}

type Opening = HSCore.Model.Window | HSCore.Model.ParametricOpening | { metadata: Metadata };

export class OpeningUtil {
  static isSupportedRoofOpening(opening: Opening): boolean {
    if (opening instanceof HSCore.Model.Window) {
      return !opening.contentType.isTypeOf(HSCatalog.ContentTypeEnum.BayWindow);
    }
    
    return opening.contentType.isTypeOf(HSCatalog.ContentTypeEnum.POOrdinaryWindow) ||
           opening.contentType.isTypeOf(HSCatalog.ContentTypeEnum.POFloorBasedWindow);
  }

  static getDefaultHeight(opening: Opening): number {
    if (opening instanceof HSCore.Model.ParametricOpening) {
      let defaultHeight = 1;
      const metadata = opening.metadata;
      const windowType = HSCore.Model.ParametricOpening.getWindowType(metadata);

      if (windowType === 'L') {
        if (metadata.contentType.isTypeOf('ordinary window')) {
          defaultHeight = 1;
        } else if (metadata.contentType.isTypeOf('floor-based window')) {
          defaultHeight = 0.2;
        } else if (metadata.contentType.isTypeOf('bay window')) {
          defaultHeight = 0.6;
        } else if (metadata.contentType.isTypeOf('single door') || metadata.contentType.isTypeOf('door window')) {
          defaultHeight = 0;
        } else if (metadata.contentType.isTypeOf('special - shaped bay window')) {
          defaultHeight = 1;
        } else if (metadata.contentType.isTypeOf('component') || metadata.contentType.isTypeOf('door plate')) {
          // Keep default
        }
      } else if (windowType === 'LL') {
        if (metadata.contentType.isTypeOf('corner window')) {
          defaultHeight = 1;
        } else if (metadata.contentType.isTypeOf('corner bay window')) {
          defaultHeight = 0.6;
        } else if (metadata.contentType.isTypeOf('component')) {
          // Keep default
        }
      } else if (windowType === 'LLL') {
        if (metadata.contentType.isTypeOf('inner bay window')) {
          defaultHeight = 0;
        }
      } else if (windowType === 'A') {
        if (metadata.contentType.isTypeOf('curved bay window')) {
          defaultHeight = 1;
        }
      }

      return defaultHeight;
    }

    const metadata = opening.metadata;
    const activeLayer = HSCore.Doc.getDocManager().activeDocument.scene.activeLayer;
    let height = metadata?.defaultHeight ?? 0;
    const contentType = metadata?.contentType;

    if (HSCore.Util.Math.nearlyEquals(0, height) && contentType) {
      if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Ventilation)) {
        height = HSConstants.Constants.DEFAULT_VENTILATION_Z;
      } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttached)) {
        height = activeLayer.height - (metadata.ZLength ?? 0);
      }
    }

    return height;
  }
}