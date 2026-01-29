import { Extractor } from './Extractor';
import { HSCore } from './HSCore';
import { Vector2, Line2d, MathUtil, MathAlg } from './Math';
import { Meta } from './Meta';
import { RoomTypeUtil } from './RoomTypeUtil';

interface BoundPoints {
  topLeft: Vector2;
  topRight: Vector2;
  bottomLeft: Vector2;
  bottomRight: Vector2;
}

interface Point2D {
  x: number;
  y: number;
}

interface Opening {
  XSize: number;
  YSize: number;
  ZSize: number;
  rotation: number;
  archHeight?: number;
  swing?: number;
  roomInfo?: RoomInfo;
  structureFaces?: StructureFace[];
  linkFaces?: StructureFace[];
  pathSegments?: Curve2D[];
  host?: HSCore.Model.Wall;
  contentType: ContentType;
  id: string;
  getConnectFloors(): Floor[];
  dump(arg1?: unknown, arg2?: boolean, context?: DumpContext): unknown;
}

interface RoomInfo {
  ceilings?: Ceiling[];
  spaceInfos?: SpaceInfo[];
}

interface SpaceInfo {
  floors: Floor[];
  ceilings?: Ceiling[];
  structureFaces?: StructureFace[];
}

interface Floor {
  roomType: string;
  roomInfo?: RoomInfo;
  worldRawPath2d: {
    outer: Curve2D[];
  };
}

interface Ceiling {
  id: string;
}

interface StructureFace {
  faceInfo?: {
    curve: Curve2D;
  };
  openings: Opening[];
  parametricOpenings: ParametricOpening[];
  material?: unknown;
}

interface Curve2D {
  clone(): Curve2D;
  isLine2d(): boolean;
  getDirection(): Vector2;
}

interface ContentType {
  getTypeString(): string;
}

interface DumpContext {
  materialsData: Map<string, unknown>;
  productsMap: Map<string, unknown>;
}

interface MaterialData {
  key: string;
  value: unknown;
}

interface OpeningDumpInfo {
  dump: unknown;
  materialsData: MaterialData[];
  products: string[];
  productIds: string[];
  generatedProducts: unknown[];
  XSize: number;
  YSize: number;
  ZSize: number;
  archHeight?: number;
}

interface OpeningsByType {
  [key: string]: Opening[];
}

interface ExtractResult {
  door: Record<string, OpeningDumpInfo[]>;
  hole: Record<string, OpeningDumpInfo[]>;
  window: Record<string, OpeningDumpInfo[]>;
  parametricOpening: Record<string, OpeningDumpInfo[]>;
}

interface EntityInfos {
  door: OpeningsByType;
  hole: OpeningsByType;
  window: OpeningsByType;
  parametricOpening: OpeningsByType;
}

interface OpeningWithMaterial {
  opening: Opening | ParametricOpening;
  material?: unknown;
}

type ParametricOpening = Opening;
type Door = Opening;
type Window = Opening;
type Hole = Opening;

type ExtractionMode = 'all' | 'doorOnly' | 'exculdeDoor';
type AnchorMode = 'centroid' | string;

const PRODUCT_ID_LENGTH = 36;

export function getOpeningBoundPts(opening: Opening): BoundPoints {
  const origin: Point2D = { x: 0, y: 0 };
  const center = HSCore.Util.Math.Vec2.fromCoordinate(opening);
  
  const topLeft = HSCore.Util.Math.rotatePointCW(
    origin,
    { x: -opening.XSize / 2, y: opening.YSize / 2 },
    opening.rotation
  ).add(opening);
  
  const topRight = HSCore.Util.Math.rotatePointCW(
    origin,
    { x: opening.XSize / 2, y: opening.YSize / 2 },
    opening.rotation
  ).add(opening);
  
  const bottomLeft = new Vector2(
    2 * center.x - topRight.x,
    2 * center.y - topRight.y
  );
  
  const bottomRight = new Vector2(
    2 * center.x - topLeft.x,
    2 * center.y - topLeft.y
  );
  
  return { topLeft, topRight, bottomLeft, bottomRight };
}

export function getOpeningBoundBackLine(opening: Opening): Line2d {
  const { topLeft, topRight, bottomLeft, bottomRight } = getOpeningBoundPts(opening);
  
  if (opening instanceof HSCore.Model.Hole) {
    return new Line2d(new Vector2(topRight), new Vector2(topLeft));
  }
  
  if (opening.swing === 0 || opening.swing === 3) {
    return new Line2d(new Vector2(bottomLeft), new Vector2(bottomRight));
  }
  
  return new Line2d(new Vector2(topRight), new Vector2(topLeft));
}

export function getOpeningBoundMainLines(opening: Opening): Line2d[] {
  const { topLeft, topRight, bottomLeft, bottomRight } = getOpeningBoundPts(opening);
  
  return [
    new Line2d(new Vector2(topLeft), new Vector2(topRight)),
    new Line2d(new Vector2(bottomLeft), new Vector2(bottomRight))
  ];
}

export function getStructureFaces(floor: Floor): StructureFace[] {
  let structureFaces = floor.structureFaces;
  const spaceInfos = floor.roomInfo?.spaceInfos;
  
  if (spaceInfos) {
    const spaceInfo = spaceInfos.find(info => info.floors.includes(floor));
    if (spaceInfo?.structureFaces) {
      structureFaces = spaceInfo.structureFaces;
    }
  }
  
  return (structureFaces ?? []).filter(face => !!face.faceInfo?.curve);
}

export function getCeilingByFloor(floor: Floor): Ceiling | undefined {
  let ceiling = floor.roomInfo?.ceilings?.[0];
  const spaceInfos = floor.roomInfo?.spaceInfos;
  
  if (spaceInfos) {
    const spaceInfo = spaceInfos.find(info => info.floors.includes(floor));
    if (spaceInfo?.ceilings && spaceInfo.ceilings.length > 0) {
      ceiling = spaceInfo.ceilings[0];
    }
  }
  
  return ceiling;
}

export function openingInFloorOnly(opening: Opening, floor: Floor): boolean {
  const connectedFloors = opening.getConnectFloors();
  return connectedFloors.length === 1 && connectedFloors[0] === floor;
}

export function isOpeningUniqueFloor(
  opening: Opening,
  floor: Floor,
  structureFaces: StructureFace[]
): boolean {
  if (openingInFloorOnly(opening, floor)) {
    return true;
  }
  
  if (opening instanceof HSCore.Model.ParametricOpening) {
    if (opening?.pathSegments) {
      const direction = Vector2.X().vecRotated(-MathUtil.degreeToRadius(opening.rotation));
      const mergedCurves = HSCore.Util.Roof.mergeCurves(
        opening.pathSegments.map(segment => segment.clone())
      ).filter(
        curve => curve.isLine2d() && curve.getDirection().equals(direction)
      );
      
      return structureFaces.some(face =>
        mergedCurves.some(curve =>
          MathAlg.CalculateOverlap.curve2ds(face.faceInfo!.curve, curve).some(
            overlap => !!overlap.isSameDirection
          )
        )
      );
    }
  } else if (opening instanceof HSCore.Model.Window || opening instanceof HSCore.Model.Hole) {
    const backLine = getOpeningBoundBackLine(opening);
    return structureFaces.some(face =>
      MathAlg.CalculateOverlap.curve2ds(face.faceInfo!.curve, backLine).some(
        overlap => !!overlap.isSameDirection
      )
    );
  } else if (opening instanceof HSCore.Model.Door) {
    const bathroomTypes = RoomTypeUtil.bathrooms;
    
    if (bathroomTypes.includes(floor.roomType)) {
      return getOpeningBoundMainLines(opening).some(line =>
        floor.worldRawPath2d.outer.some(
          outerCurve => MathAlg.CalculateOverlap.curve2ds(outerCurve, line).length > 0
        )
      );
    }
    
    if (opening.host instanceof HSCore.Model.Wall) {
      const bathroomFloors: Floor[] = [];
      
      opening.host.roomInfos?.forEach(roomInfo => {
        roomInfo.floors.forEach(roomFloor => {
          if (bathroomTypes.includes(roomFloor.roomType) && !bathroomFloors.includes(roomFloor)) {
            bathroomFloors.push(roomFloor);
          }
        });
      });
      
      if (bathroomFloors.length > 0) {
        const hasOverlap = getOpeningBoundMainLines(opening).some(line =>
          bathroomFloors.some(bathroomFloor =>
            bathroomFloor.worldRawPath2d.outer.some(
              outerCurve => MathAlg.CalculateOverlap.curve2ds(outerCurve, line).length > 0
            )
          )
        );
        
        if (hasOverlap) {
          return false;
        }
      }
    }
    
    const backLine = getOpeningBoundBackLine(opening);
    return structureFaces.some(face =>
      MathAlg.CalculateOverlap.curve2ds(face.faceInfo!.curve, backLine).some(
        overlap => !!overlap.isSameDirection
      )
    );
  }
  
  return false;
}

export function getOpeningLinkFace(
  opening: Opening,
  floor: Floor,
  structureFaces: StructureFace[]
): StructureFace | undefined {
  if (isOpeningUniqueFloor(opening, floor, structureFaces)) {
    return opening.linkFaces?.find(face => structureFaces.includes(face));
  }
  
  return undefined;
}

export class OpeningDumpsExtractor extends Extractor {
  private readonly structureFaces: StructureFace[];
  
  constructor(floor: Floor, anchorMode: AnchorMode = 'centroid') {
    super(floor, anchorMode);
    this.structureFaces = getStructureFaces(floor);
  }
  
  private _createOpeningDumpInfo(opening: Opening): OpeningDumpInfo {
    const context: DumpContext = {
      materialsData: new Map(),
      productsMap: new Map()
    };
    
    const dumpResult = opening.dump(undefined, true, context);
    
    const materialsData: MaterialData[] = [];
    context.materialsData?.forEach((value, key) => {
      materialsData.push({ key, value });
    });
    
    const products: string[] = [];
    const productIds: string[] = [];
    const generatedProducts: unknown[] = [];
    
    context.productsMap?.forEach((value, key) => {
      products.push(key);
      
      if (key.length === PRODUCT_ID_LENGTH) {
        productIds.push(key);
      } else if (value instanceof Meta) {
        generatedProducts.push(value.toJSON());
      }
    });
    
    return {
      dump: dumpResult,
      materialsData,
      products,
      productIds,
      generatedProducts,
      XSize: opening.XSize,
      YSize: opening.YSize,
      ZSize: opening.ZSize,
      archHeight: opening.archHeight
    };
  }
  
  private _extractOpening(
    result: EntityInfos,
    category: keyof EntityInfos,
    opening: Opening
  ): boolean {
    if (isOpeningUniqueFloor(opening, this.floor, this.structureFaces)) {
      const categoryResult = result[category];
      const typeString = opening.contentType.getTypeString();
      const existingList = categoryResult[typeString];
      
      if (existingList) {
        existingList.push(opening);
      } else {
        categoryResult[typeString] = [opening];
      }
      
      return true;
    }
    
    return false;
  }
  
  extract(): ExtractResult {
    const result: ExtractResult = {
      door: {},
      hole: {},
      window: {},
      parametricOpening: {}
    };
    
    const entityInfos = this.extractEntityInfos();
    
    Object.entries(entityInfos).forEach(([category, typeMap]) => {
      Object.entries(typeMap).forEach(([typeString, openings]) => {
        result[category as keyof ExtractResult][typeString] = openings.map(opening =>
          this._createOpeningDumpInfo(opening)
        );
      });
    });
    
    return result;
  }
  
  extractEntityInfos(mode: ExtractionMode = 'all'): EntityInfos {
    const result: EntityInfos = {
      door: {},
      hole: {},
      window: {},
      parametricOpening: {}
    };
    
    const processedIds: string[] = [];
    
    this.structureFaces.forEach(face => {
      face.openings.forEach(opening => {
        if (processedIds.includes(opening.id)) {
          return;
        }
        
        if (opening instanceof HSCore.Model.Door && (mode === 'all' || mode === 'doorOnly')) {
          if (this._extractOpening(result, 'door', opening)) {
            processedIds.push(opening.id);
          }
        } else if (opening instanceof HSCore.Model.Window && (mode === 'all' || mode === 'exculdeDoor')) {
          if (this._extractOpening(result, 'window', opening)) {
            processedIds.push(opening.id);
          }
        } else if (opening instanceof HSCore.Model.Hole && (mode === 'all' || mode === 'exculdeDoor')) {
          if (this._extractOpening(result, 'hole', opening)) {
            processedIds.push(opening.id);
          }
        }
      });
      
      face.parametricOpenings.forEach(opening => {
        if (processedIds.includes(opening.id)) {
          return;
        }
        
        if (opening instanceof HSCore.Model.ParametricOpening && (mode === 'all' || mode === 'exculdeDoor')) {
          if (this._extractOpening(result, 'parametricOpening', opening)) {
            processedIds.push(opening.id);
          }
        }
      });
    });
    
    return result;
  }
  
  getAllOpenings(): OpeningWithMaterial[] {
    const openings: OpeningWithMaterial[] = [];
    
    this.structureFaces.forEach(face => {
      face.openings.forEach(opening => {
        const isValidType = opening instanceof HSCore.Model.Door ||
                           opening instanceof HSCore.Model.Window ||
                           opening instanceof HSCore.Model.Hole;
        
        if (isValidType && !openings.some(item => item.opening === opening)) {
          const linkFace = getOpeningLinkFace(opening, this.floor, this.structureFaces);
          const material = linkFace?.material;
          
          openings.push({ opening, material });
        }
      });
      
      face.parametricOpenings.forEach(opening => {
        if (opening instanceof HSCore.Model.ParametricOpening && !openings.some(item => item.opening === opening)) {
          const linkFace = getOpeningLinkFace(opening, this.floor, this.structureFaces);
          const material = linkFace?.material;
          
          openings.push({ opening, material });
        }
      });
    });
    
    return openings;
  }
}