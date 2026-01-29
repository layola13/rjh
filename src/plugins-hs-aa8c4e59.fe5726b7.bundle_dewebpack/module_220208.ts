interface ProductData {
  id: string;
  entityId?: string;
  metadata: unknown;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  host?: unknown;
  materialMap?: unknown;
  isCustomizedCabinetProducts?: boolean;
  sub_list?: ProductData[];
}

interface MetaData {
  XLength: number;
  YLength: number;
  ZLength: number;
}

interface AllMetaData {
  [key: string]: MetaData;
}

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Rotation {
  x: number;
  y: number;
  z: number;
}

interface Scale {
  XScale: number;
  YScale: number;
  ZScale: number;
}

interface Size {
  XSize: number;
  YSize: number;
  ZSize: number;
}

interface MoveData extends ProductData {
  calculateHost?: unknown;
}

interface NoHostData {
  id: string;
  meta: MetaData;
  position: Position;
  rotation: Rotation;
  scale: Scale;
  size: Size;
}

interface ContentEntity {
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  rotation: number;
  zIndex: number;
  XSize: number;
  YSize: number;
  ZSize: number;
  id: string;
  metadata: unknown;
  XLength: number;
  YLength: number;
  ZLength: number;
  getHost(): unknown;
}

interface MoveContentTarget {
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  rotation: number;
  host: unknown;
}

interface GetHostParams {
  hostType?: string;
  meta: MetaData;
  position: Position;
  room: unknown;
  size: Size;
  rotation: Rotation;
  scale: Scale;
}

interface SnappedFaceParams {
  room: unknown;
  position: Position;
  size: Size;
  meta: MetaData;
  scale: Scale;
  rotation: Rotation;
}

const SNAP_TO_FLOOR_Z_INDEX = HSApp.Snapping.SnappingZIndex.SnapToFloorZIndex;
const SNAP_TO_FLOOR_WALL_Z_INDEX = HSApp.Snapping.SnappingZIndex.SnapToFloorWallZIndex;

export default class SmartCollocationCommand extends HSApp.Cmd.Command {
  private _productData: ProductData[];
  private _previousData: ContentEntity[];
  private _room: unknown;
  private _isRestore: boolean;
  private _moveData: MoveData[];
  private _moveDataId: string[];
  private _allContents: unknown[];
  private _noHostData: NoHostData[];
  private _allMetaData: AllMetaData;
  private mergePreviousRequest: boolean = false;
  private output: unknown[] = [];

  constructor(
    productData: ProductData[] = [],
    previousData: ContentEntity[] = [],
    room?: unknown,
    isRestore: boolean = false,
    allMetaData?: AllMetaData
  ) {
    super();
    this._productData = productData;
    this._previousData = previousData;
    this._room = room;
    this._isRestore = isRestore;
    this._moveData = [];
    this._moveDataId = [];
    this._allContents = [];
    this._noHostData = [];
    this._allMetaData = allMetaData;
  }

  onExecute(): unknown[] {
    this.mergePreviousRequest = false;

    if (this._isRestore) {
      this._restore(this._previousData, this._productData, this._room);
    } else {
      this._handleRecommendContents(this._previousData, this._productData, this._room);
    }

    this.mgr.complete(this);
    return this._allContents;
  }

  private _restore(previousData: ContentEntity[], productData: ProductData[], room: unknown): void {
    const transManager = this.context.transManager;
    const session = transManager.startSession();

    previousData.forEach((previousItem) => {
      const productIndex = productData.findIndex((product) => product.id === previousItem.id);

      if (productIndex > -1) {
        const [movedProduct] = productData.splice(productIndex, 1);
        this._moveContent(previousItem, movedProduct, room);
      } else {
        const deleteRequest = transManager.createRequest(
          HSFPConstants.RequestType.DeleteProduct,
          [previousItem]
        );
        transManager.commit(deleteRequest, this.mergePreviousRequest);
        this.mergePreviousRequest = true;
      }
    });

    productData.forEach((product) => {
      const { metadata, position, rotation, scale, host, materialMap, isCustomizedCabinetProducts } = product;

      const pos: Position = {
        x: position[0],
        y: position[1],
        z: position[2]
      };

      const scaleObj: Scale = {
        XScale: scale[0],
        YScale: scale[1],
        ZScale: scale[2]
      };

      if (!isCustomizedCabinetProducts) {
        const rotationZ = rotation[2];
        const addRequest = transManager.createRequest(
          HSFPConstants.RequestType.AddProduct,
          [metadata, pos, rotationZ, scaleObj, host, materialMap]
        );
        transManager.commit(addRequest, this.mergePreviousRequest);
        this.mergePreviousRequest = true;
        this._allContents.push(addRequest.result);
      }
    });

    this.output = this._allContents;
    session.commit();
  }

  private _handleRecommendContents(previousData: ContentEntity[], productData: ProductData[], room: unknown): void {
    const transManager = this.context.transManager;
    const additionalContents: unknown[] = [];
    const session = transManager.startSession();

    for (let i = 0; i < productData.length; i++) {
      this._addContents(productData[i], this._allMetaData, room);
    }

    previousData.forEach((previousItem) => {
      if (this._moveDataId.includes(previousItem.id)) {
        const moveDataItem = this._moveData.find((item) => item.entityId === previousItem.id);
        this._moveContent(previousItem, moveDataItem, room);
      } else {
        const deleteRequest = transManager.createRequest(
          HSFPConstants.RequestType.DeleteProduct,
          [previousItem]
        );
        transManager.commit(deleteRequest, this.mergePreviousRequest);
        this.mergePreviousRequest = true;
      }
    });

    this._noHostData.forEach((noHostItem) => {
      const { meta, position, rotation, scale, size } = noHostItem;

      const outline = HSCore.Util.Math.computeOutline(
        { x: position.x, y: position.y },
        size.XSize,
        size.YSize,
        rotation.z
      );

      let bestHost: ContentEntity | undefined;

      for (let i = 0; i < this._allContents.length; i++) {
        const content = this._allContents[i] as ContentEntity;

        if (content.zIndex === SNAP_TO_FLOOR_Z_INDEX || content.zIndex === SNAP_TO_FLOOR_WALL_Z_INDEX) {
          const contentOutline = HSCore.Util.Math.computeOutline(
            { x: content.x, y: content.y },
            content.XSize,
            content.YSize,
            content.rotation
          );

          if (HSCore.Util.Math.isPolygonOverlapped(outline, contentOutline) && position.z >= content.z) {
            const currentDistance = position.z - (content.z + content.ZSize);

            if (bestHost) {
              const bestDistance = Math.abs(position.z - (bestHost.z + bestHost.ZSize));
              if (GeLib.MathUtils.largerOrEqual(currentDistance, 0) && GeLib.MathUtils.larger(bestDistance, currentDistance)) {
                bestHost = content;
              }
            } else {
              bestHost = content;
            }
          }
        }
      }

      const finalHost = bestHost ?? room;

      const addRequest = transManager.createRequest(
        HSFPConstants.RequestType.AddProduct,
        [meta, position, rotation.z, scale, finalHost]
      );
      transManager.commit(addRequest, this.mergePreviousRequest);
      this.mergePreviousRequest = true;
      additionalContents.push(addRequest.result);
    });

    this._allContents.concat(additionalContents);
    this.output = this._allContents;
    session.commit();
  }

  private _addSubListContent(product: ProductData, allMetaData: AllMetaData, room: unknown, parentContent?: unknown): void {
    product.sub_list?.forEach((subProduct) => {
      this._addContents(subProduct, allMetaData, room, parentContent);
    });
  }

  private _addContents(product: ProductData, allMetaData: AllMetaData, room: unknown, parentContent?: unknown): void {
    const meta = allMetaData[product.id];
    if (!meta) {
      return;
    }

    const position: Position = {
      x: product.position[0],
      y: product.position[1],
      z: product.position[2]
    };

    const rotation: Rotation = {
      x: product.rotation[0],
      y: product.rotation[1],
      z: product.rotation[2]
    };

    const scale: Scale = {
      XScale: product.scale[0],
      YScale: product.scale[1],
      ZScale: product.scale[2]
    };

    const size: Size = {
      XSize: product.scale[0] * meta.XLength,
      YSize: product.scale[1] * meta.YLength,
      ZSize: product.scale[2] * meta.ZLength
    };

    const host = parentContent ?? this._getHost({
      hostType: product.host as string,
      meta,
      position,
      room,
      size,
      rotation,
      scale
    });

    if (product.entityId) {
      this._moveData.push({
        ...product,
        calculateHost: host
      });
      this._moveDataId.push(product.entityId);
    } else if (host) {
      const transManager = this.context.transManager;
      const addRequest = transManager.createRequest(
        HSFPConstants.RequestType.AddProduct,
        [meta, position, rotation.z, scale, host]
      );
      transManager.commit(addRequest, this.mergePreviousRequest);
      this.mergePreviousRequest = true;
      this._allContents.push(addRequest.result);
      this._addSubListContent(product, allMetaData, room, addRequest.result);
    } else {
      const noHostData: NoHostData = {
        id: product.id,
        meta,
        position,
        rotation,
        scale,
        size
      };
      this._noHostData.push(noHostData);
    }
  }

  private _getHost(params: GetHostParams): unknown {
    const { hostType, meta, position, room, size, rotation, scale } = params;
    let host: unknown;

    switch (hostType) {
      case "wall":
        host = HSApp.SnappingHelper.getSnappedFace({
          room,
          position,
          size,
          meta,
          scale,
          rotation
        } as SnappedFaceParams);
        break;
      case "ceiling":
        host = HSCore.Util.Floor.getFloorCeiling(room);
        break;
      case "floor":
        host = room;
        break;
    }

    if (!host) {
      host = HSApp.SnappingHelper.getHost({
        meta,
        position,
        room,
        size,
        rotation,
        scale
      });
    }

    return host;
  }

  private _moveContent(previousItem: ContentEntity, product: ProductData, room: unknown): void {
    const transManager = this.context.transManager;
    const { rotation, position, scale, calculateHost } = product as MoveData;

    const host = calculateHost ?? HSApp.SnappingHelper.getHost({
      meta: previousItem.metadata as MetaData,
      position: {
        x: position[0],
        y: position[1],
        z: position[2]
      },
      room,
      size: {
        XSize: scale[0] * previousItem.XLength,
        YSize: scale[1] * previousItem.YLength,
        ZSize: scale[2] * previousItem.ZLength
      },
      rotation,
      scale
    });

    const finalHost = host ?? room;

    const targetState: MoveContentTarget = {
      x: position[0],
      y: position[1],
      z: position[2],
      XRotation: rotation[0],
      YRotation: rotation[1],
      rotation: rotation[2],
      host: finalHost
    };

    const originalState: MoveContentTarget = {
      x: previousItem.x,
      y: previousItem.y,
      z: previousItem.z,
      XRotation: previousItem.XRotation,
      YRotation: previousItem.YRotation,
      rotation: previousItem.rotation,
      host: previousItem.getHost()
    };

    const moveRequest = transManager.createRequest(
      HSFPConstants.RequestType.MoveContentRequest,
      [previousItem, originalState, targetState]
    );
    transManager.commit(moveRequest, this.mergePreviousRequest);
    this.mergePreviousRequest = true;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.SmartCollocation;
  }

  getDescription(): string {
    return this._isRestore ? "智能搭配:一键还原" : "智能搭配:换一套";
  }

  isInteractive(): boolean {
    return true;
  }
}