import { getValueByPath } from './utils';

interface Cabinet {
  z: number;
  ZLength: number;
  ZScale: number;
  contents: Record<string, Content>;
  contentType: ContentType;
  getChild(moldingType: HSCore.Model.CabinetMoldingEnum): MoldingChild | null;
}

interface Content {
  z: number;
  contentType: ContentType;
  metadata?: {
    extension?: {
      objInfo?: {
        planes?: {
          cbnt_snap_plane?: {
            points?: Array<{ z: number }>;
          };
        };
      };
    };
    contentType?: ContentType;
  };
}

interface ContentType {
  isTypeOf(type: HSCatalog.ContentTypeEnum | HSCatalog.ContentTypeEnum[]): boolean;
}

interface MoldingChild {
  paths?: Array<Array<{ z: number }>>;
}

type ContentMap = Map<Content, [number, number]>;
type CabinetMap = Map<Cabinet, ContentMap>;

const SINK_DEFAULT_OFFSET = 0.194;

export default class CountertopHeightAdjustmentRequest extends HSCore.Transaction.Request {
  private _previousMap: CabinetMap = new Map();
  private readonly _cabinets: Cabinet[];
  private readonly _height: number;

  constructor(cabinets: Cabinet[], height: number) {
    super();
    this._cabinets = cabinets;
    this._height = height;
  }

  public onCommit(): void {
    this._previousMap = this._generationMap();
    this._adjustSubContent(this._previousMap, true);
  }

  public onUndo(): void {
    this._adjustSubContent(this._previousMap, false);
  }

  public onRedo(): void {
    this._adjustSubContent(this._previousMap, true);
  }

  private _generationMap(): CabinetMap {
    const cabinetMap = new Map<Cabinet, ContentMap>();

    this._cabinets.forEach((cabinet) => {
      const contentMap = new Map<Content, [number, number]>();

      Object.values(cabinet.contents).forEach((content) => {
        if (content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_OnTopCenterOfContent)) {
          let newZ = cabinet.z + cabinet.ZLength * cabinet.ZScale + this._height;
          
          let snapPlaneZ = getValueByPath<number>(
            ['metadata', 'extension', 'objInfo', 'planes', 'cbnt_snap_plane', 'points', '0', 'z'],
            content
          );

          const contentType = getValueByPath<ContentType>(
            ['metadata', 'contentType'],
            content
          );

          if (!snapPlaneZ && contentType?.isTypeOf([HSCatalog.ContentTypeEnum.Sink])) {
            snapPlaneZ = SINK_DEFAULT_OFFSET;
          }

          if (snapPlaneZ) {
            newZ -= snapPlaneZ;
          }

          contentMap.set(content, [content.z, newZ]);
        } else if (
          cabinet.contentType.isTypeOf(HSCatalog.ContentTypeEnum.Countertop) &&
          content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_OnTopOfOthers)
        ) {
          const noDripEdge = cabinet.getChild(HSCore.Model.CabinetMoldingEnum.NoDripEdge);

          if (noDripEdge?.paths && Array.isArray(noDripEdge.paths)) {
            let baseZ = 0;

            if (noDripEdge.paths[0]?.[0]) {
              baseZ = noDripEdge.paths[0][0].z;
            }

            const newZ = baseZ + this._height;
            contentMap.set(content, [content.z, newZ]);
          }
        }
      });

      cabinetMap.set(cabinet, contentMap);
    });

    return cabinetMap;
  }

  private _adjustSubContent(cabinetMap: CabinetMap, applyNewZ: boolean): void {
    for (const [, contentMap] of cabinetMap.entries()) {
      for (const [content, [oldZ, newZ]] of contentMap.entries()) {
        content.z = applyNewZ ? newZ : oldZ;
      }
    }
  }
}