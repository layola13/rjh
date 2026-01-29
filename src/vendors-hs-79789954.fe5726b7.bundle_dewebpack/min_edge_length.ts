const MIN_EDGE_LENGTH = 0.3;
const MIN_INTERSECTED_LENGTH = 0.1;
const MAX_LINE_DISTANCE = 0.2;

interface MatJson {
  products: string[];
  productIds: string[];
  generatedProducts: Array<{
    id: string;
    name?: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

interface ElementType {
  contentId: string;
  categories: string[];
  contentType: string;
}

interface Content {
  id: string;
  x: number;
  y: number;
  XSize: number;
  YSize: number;
  rotation: number;
  metadata?: {
    categories?: string[];
  };
  contentType?: {
    getTypeString(): string;
  };
}

interface BackLineInfo {
  line: Line2d;
  content: Content;
}

interface WallFace {
  curves: Curve2d[];
  area: number;
  matJson: MatJson;
  elementTypes?: ElementType[];
}

interface ExtractResult {
  floor: MatJson | undefined;
  ceiling: MatJson | undefined;
  wallFaces: Array<{
    area: number;
    matJson: MatJson;
    elementTypes: ElementType[];
  }>;
}

interface Material {
  saveToJSON?(): {
    products: Array<{ id: string } | Meta>;
    [key: string]: unknown;
  };
}

interface Meta {
  id: string;
  name?: string;
  toJSON(): {
    id: string;
    name?: string;
    [key: string]: unknown;
  };
}

interface Floor {
  material?: Material;
}

interface Face {
  id: string;
  material?: Material;
  faceInfo?: {
    curve?: Curve2d;
  };
  getArea(): number;
}

interface Point2D {
  x: number;
  y: number;
}

interface Vector2 {
  add(point: Point2D): Point2D;
}

interface Line2d {
  getDirection(): Direction;
  getRange(): Range;
}

interface Direction {
  isSameDirection(other: Direction): boolean;
}

interface Range {
  intersected(other: Range): RangeSegment[];
}

interface RangeSegment {
  getLength(): number;
}

interface Curve2d {
  isLine2d(): boolean;
  getLength(): number;
  getDirection(): Direction;
  getRange(): Range;
}

class MaterialsExtractor {
  private floor: Floor;
  private contents: Content[];
  private structureFaces: Face[];

  constructor(floor: Floor, mode: string = "centroid", contents?: Content[]) {
    this.floor = floor;
    this.contents = contents ?? [];
    this.structureFaces = getStructureFaces(floor);
  }

  private _getMatJson(material?: Material): MatJson | undefined {
    const jsonData = material?.saveToJSON();
    if (!jsonData) {
      return undefined;
    }

    const productIds: string[] = [];
    const generatedProducts: Array<{ id: string; name?: string; [key: string]: unknown }> = [];

    jsonData.products.forEach((product) => {
      if (product?.id?.length === 36) {
        productIds.push(product.id);
      } else if (isMeta(product)) {
        generatedProducts.push(product.toJSON());
      }
    });

    return {
      ...jsonData,
      products: jsonData.products.map((p) => p.id),
      productIds,
      generatedProducts,
    };
  }

  private _getUniqueName(matJson?: MatJson): string {
    if (!matJson?.products || matJson.products.length === 0) {
      return "";
    }

    const { products, productIds, generatedProducts } = matJson;

    return products
      .map((productId) => {
        let uniqueName = productIds.find((pid) => pid === productId);
        
        if (!uniqueName) {
          const generated = generatedProducts.find((gp) => gp.id === productId);
          if (generated?.name && generated.name.length > 36) {
            uniqueName = generated.name.slice(0, 36);
          }
        }

        return uniqueName || "";
      })
      .join();
  }

  private _isSameMatJson(matJson1?: MatJson, matJson2?: MatJson): boolean {
    return this._getUniqueName(matJson1) === this._getUniqueName(matJson2);
  }

  private _getBackLine(content: Content): Line2d {
    const origin: Point2D = { x: 0, y: 0 };
    
    const topLeft = rotatePointCW(
      origin,
      { x: -content.XSize / 2, y: content.YSize / 2 },
      content.rotation
    ).add(content);
    
    const topRight = rotatePointCW(
      origin,
      { x: content.XSize / 2, y: content.YSize / 2 },
      content.rotation
    ).add(content);

    return new Line2d(new Vector2(topLeft), new Vector2(topRight));
  }

  private _getBackLineInfos(): BackLineInfo[] {
    return this.contents.map((content) => ({
      line: this._getBackLine(content),
      content,
    }));
  }

  private _getElementType(content: Content): ElementType {
    return {
      contentId: content.id,
      categories: content.metadata?.categories ?? [],
      contentType: content.contentType?.getTypeString() ?? "",
    };
  }

  extract(): ExtractResult {
    const floorMaterial = this._getMatJson(this.floor.material);
    const ceilingMaterial = this._getMatJson(getCeilingByFloor(this.floor)?.material);

    const faceGroups: Face[][] = [];
    this.structureFaces.forEach((face) => {
      const allGroupedFaces = faceGroups.reduce((acc, group) => acc.concat(group), []);
      
      if (!allGroupedFaces.includes(face)) {
        const groupFaces = getGroupFaces(face);
        faceGroups.push(groupFaces);
      }
    });

    const allGroupedFaceIds = faceGroups.reduce((acc, group) => acc.concat(group), []);
    this.structureFaces.forEach((face) => {
      if (!allGroupedFaceIds.includes(face)) {
        faceGroups.push([face]);
      }
    });

    const wallFaceData: WallFace[] = [];
    const processedFaceIds: string[] = [];

    faceGroups.forEach((group) => {
      const firstFace = group[0];
      if (!firstFace || processedFaceIds.includes(firstFace.id)) {
        return;
      }

      processedFaceIds.push(firstFace.id);

      group.forEach((face) => {
        if (!face?.faceInfo?.curve) {
          return;
        }

        const materialJson = this._getMatJson(firstFace.material);
        if (!materialJson?.products || materialJson.products.length === 0) {
          return;
        }

        const existing = wallFaceData.find((item) =>
          this._isSameMatJson(item.matJson, materialJson)
        );

        if (existing) {
          existing.curves.push(face.faceInfo.curve);
          existing.area += face.getArea();
        } else {
          wallFaceData.push({
            curves: [face.faceInfo.curve],
            area: face.getArea(),
            matJson: materialJson,
          });
        }
      });
    });

    wallFaceData.sort((a, b) => b.area - a.area);

    let wallFaces: Array<{ area: number; matJson: MatJson; elementTypes: ElementType[] }> = [];

    if (wallFaceData.length > 0) {
      const allCurvesTooShort = wallFaceData.every((item) =>
        item.curves.every((curve) => curve.getLength() < MIN_EDGE_LENGTH)
      );

      if (allCurvesTooShort) {
        wallFaces = [
          {
            elementTypes: [],
            area: wallFaceData[0].area,
            matJson: wallFaceData[0].matJson,
          },
        ];
      } else {
        const validWallFaces = wallFaceData.filter((item) =>
          item.curves.some((curve) => curve.getLength() >= MIN_EDGE_LENGTH)
        );

        if (validWallFaces.length === 1) {
          wallFaces = [
            {
              elementTypes: [],
              area: validWallFaces[0].area,
              matJson: validWallFaces[0].matJson,
            },
          ];
        } else {
          const backLineInfos = this._getBackLineInfos();

          wallFaceData.forEach((wallFaceItem) => {
            const matchedContents: Content[] = [];

            wallFaceItem.curves
              .filter((curve) => curve.isLine2d() && curve.getLength() >= MIN_EDGE_LENGTH)
              .forEach((curve) => {
                const intersections: Array<{ interLength: number; content: Content }> = [];

                backLineInfos.forEach((backLineInfo) => {
                  if (!backLineInfo.line.getDirection().isSameDirection(curve.getDirection())) {
                    return;
                  }

                  const projection = projectLine1ToLine2(backLineInfo.line, curve);
                  const intersectedRange = curve.getRange().intersected(projection)[0];

                  if (!intersectedRange || intersectedRange.getLength() <= MIN_INTERSECTED_LENGTH) {
                    return;
                  }

                  const distance = calculateDistanceCurve2dToCurve2d(backLineInfo.line, curve);
                  if (distance <= MAX_LINE_DISTANCE) {
                    intersections.push({
                      interLength: intersectedRange.getLength(),
                      content: backLineInfo.content,
                    });
                  }
                });

                intersections.forEach((intersection) => {
                  if (!matchedContents.includes(intersection.content)) {
                    matchedContents.push(intersection.content);
                  }
                });
              });

            wallFaces.push({
              area: wallFaceItem.area,
              matJson: wallFaceItem.matJson,
              elementTypes: matchedContents.map((content) => this._getElementType(content)),
            });
          });
        }
      }
    }

    return {
      floor: floorMaterial,
      ceiling: ceilingMaterial,
      wallFaces,
    };
  }
}

// External utility functions (stubs - implementation from external modules)
function getStructureFaces(floor: Floor): Face[] {
  throw new Error("Not implemented");
}

function getCeilingByFloor(floor: Floor): Floor | undefined {
  throw new Error("Not implemented");
}

function getGroupFaces(face: Face): Face[] {
  throw new Error("Not implemented");
}

function rotatePointCW(origin: Point2D, point: Point2D, rotation: number): Vector2 {
  throw new Error("Not implemented");
}

function projectLine1ToLine2(line1: Line2d, line2: Curve2d): Range {
  throw new Error("Not implemented");
}

function calculateDistanceCurve2dToCurve2d(curve1: Line2d, curve2: Curve2d): number {
  throw new Error("Not implemented");
}

function isMeta(product: unknown): product is Meta {
  return typeof product === "object" && product !== null && "toJSON" in product;
}

class Line2d {
  constructor(start: Vector2, end: Vector2) {}
  getDirection(): Direction {
    throw new Error("Not implemented");
  }
  getRange(): Range {
    throw new Error("Not implemented");
  }
}

class Vector2 {
  constructor(point: Point2D) {}
  add(point: Point2D): Point2D {
    throw new Error("Not implemented");
  }
}

export { MaterialsExtractor, MAX_LINE_DISTANCE, MIN_INTERSECTED_LENGTH, MIN_EDGE_LENGTH };