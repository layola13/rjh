interface FloorplanInterface {
  forEachPocket(callback: (pocket: PocketInterface | null) => void): void;
}

interface PocketInterface {
  seekId: string;
  material?: MaterialInterface;
  host?: HostInterface;
  sideFaces: FaceInterface[];
  metadata: PocketMetadata;
  getBottomFace(): FaceInterface | null;
}

interface MaterialInterface {
  seekId: string;
}

interface HostInterface {
  direction: Vector3Interface;
  transDirection: Vector3Interface;
  leftFaces: Record<string, FaceInterface>;
  rightFaces: Record<string, FaceInterface>;
}

interface Vector3Interface {
  x: number;
  y: number;
}

interface FaceInterface {
  [key: string]: unknown;
}

interface PocketMetadata {
  defaultPocketMaterialUrl?: string;
  extension?: {
    objInfo?: {
      pocketMaterial?: {
        tileSize?: {
          x: number;
          y: number;
        };
      };
    };
  };
}

interface GuessYourFavoriteProductsResult {
  profiles: string[];
  materials: string[];
}

interface PocketMaterialMeta {
  tileSize_x: number;
  tileSize_y: number;
  textureUrl: string;
  id: string;
}

enum PocketSideType {
  Inner = 'Inner',
  Outer = 'Outer',
  Both = 'Both'
}

declare const HSApp: {
  App: {
    getApp(): { floorplan: FloorplanInterface };
  };
};

declare const HSCore: {
  Model: {
    PocketSideType: typeof PocketSideType;
  };
  Material: {
    MaterialIdEnum: {
      customURI: string;
    };
  };
  Paint: {
    MaterialUtil: {
      alignHoleFaceToHostFace(
        pocket: PocketInterface,
        hostFace: FaceInterface,
        sideFace: FaceInterface
      ): void;
    };
  };
};

declare const GeLib: {
  VectorUtils: {
    isSameDirection(dir1: Vector3Interface, dir2: Vector3Interface): boolean;
  };
};

export function getGuessYourFavoriteProducts(
  excludePocket?: PocketInterface
): GuessYourFavoriteProductsResult {
  const floorplan = HSApp.App.getApp().floorplan;
  const profileIds = new Set<string>();
  const materialIds = new Set<string>();

  floorplan.forEachPocket((pocket: PocketInterface | null) => {
    if (pocket) {
      profileIds.add(pocket.seekId);
    }
    if (pocket?.material) {
      materialIds.add(pocket.material.seekId);
    }
  });

  if (excludePocket) {
    profileIds.delete(excludePocket.seekId);
    if (excludePocket.material) {
      materialIds.delete(excludePocket.material.seekId);
    }
  }

  return {
    profiles: Array.from(profileIds.values()),
    materials: Array.from(materialIds.values())
  };
}

export function getPocketMaterialMeta(
  pocket: PocketInterface
): PocketMaterialMeta | null {
  const { metadata } = pocket;
  const tileSize = metadata.extension?.objInfo?.pocketMaterial?.tileSize;
  const textureUrl = metadata.defaultPocketMaterialUrl;

  if (textureUrl && tileSize) {
    return {
      tileSize_x: tileSize.x,
      tileSize_y: tileSize.y,
      textureUrl,
      id: HSCore.Material.MaterialIdEnum.customURI
    };
  }

  return null;
}

export function updateDoorSideFaceMaterial(
  pocket: PocketInterface,
  sideType: PocketSideType
): void {
  if (sideType === HSCore.Model.PocketSideType.Both || !pocket.host?.direction) {
    return;
  }

  const { host } = pocket;
  const { direction, transDirection } = host;
  const isSameDir = GeLib.VectorUtils.isSameDirection(direction, transDirection);

  const shouldUseLeftFace =
    (sideType === HSCore.Model.PocketSideType.Inner && !isSameDir) ||
    (sideType === HSCore.Model.PocketSideType.Outer && isSameDir);

  const hostFace = shouldUseLeftFace
    ? Object.values(host.leftFaces)[0]
    : Object.values(host.rightFaces)[0];

  const bottomFace = pocket.getBottomFace();

  pocket.sideFaces.forEach((sideFace: FaceInterface) => {
    if (sideFace !== bottomFace) {
      HSCore.Paint.MaterialUtil.alignHoleFaceToHostFace(pocket, hostFace, sideFace);
    }
  });
}