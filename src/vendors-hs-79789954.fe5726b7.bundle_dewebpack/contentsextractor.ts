import { Box2, Box3, Line2d, Loop, Vector2, Vector3 } from './geometry';
import hull from './hull-algorithm';
import { getTargetContent, isParametricContent } from './content-utils';
import { Extractor } from './Extractor';

interface ContentMetadata {
  categories: string[];
  productStyle?: string;
  name: string;
}

interface ContentBound {
  width: number;
  height: number;
  center(): Vector3;
}

interface ContentType {
  getTypeString(): string;
}

interface Content {
  id: string;
  seekId: string;
  contentType: ContentType;
  metadata: ContentMetadata;
  bound: ContentBound;
  XSize: number;
  YSize: number;
  ZSize: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  x: number;
  y: number;
  z: number;
  getUniqueParent(): { contents: Record<string, Content> };
}

interface ContentInfo {
  id: string;
  contentType: string;
  categoryIds: string[];
  seekId: string;
  style?: string;
  entityId: string;
  name: string;
  position: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  size: { x: number; y: number; z: number };
  box3: Box3;
  box2: Box2;
}

interface ConcaveHullResult {
  hullPoints: Vector2[];
  hullLines: Line2d[];
}

interface ExtractResult {
  contents: ContentInfo[];
  contentsBox3D: Box3;
  content3dBoxes: Box3[];
  contentsBox2D: Box2;
  content2dBoxes: Box2[];
  content2dBoxesPoints: Vector2[];
  contentsConcaveHull: ConcaveHullResult;
}

export class ContentsExtractor extends Extractor {
  private _hullConcavity: number = 1;
  private _box3ds?: Box3[];
  private _box3d?: Box3;
  private _box2ds?: Box2[];
  public allContents: Content[];
  public contents: Content[];

  constructor(
    content: Content,
    mode: string = 'centroid',
    loopPoints?: Vector2[]
  ) {
    super(content, mode);

    if (loopPoints) {
      this.translate2D = this._getTranslate2D(new Loop(loopPoints));
    }

    const targetContents: Content[] = [];
    Object.values(content.getUniqueParent().contents).forEach(item =>
      getTargetContent(item, targetContents, content)
    );

    this.allContents = targetContents;
    this.contents = targetContents.filter(c => !isParametricContent(c));

    const boundingBox = new Box3();
    const boxes: Box3[] = [];

    this.contents.forEach(item => {
      const { width, height } = item.bound;
      this._hullConcavity = Math.max(width, height, this._hullConcavity);

      const center = item.bound.center();
      const box = new Box3().setFromCenterAndSize(
        { x: center.x, y: center.y, z: item.ZSize / 2 },
        { x: width, y: height, z: item.ZSize }
      );

      boxes.push(box);
      boundingBox.union(box);
    });

    this._box3ds = boxes;
    this._box3d = boundingBox;

    const { hullLines } = this.getContentsConcaveHull();
    const hullLoop = new Loop(hullLines);
    this._getTranslate2D(hullLoop);
  }

  setTranslate2d(translate: Vector2): void {
    this.translate2D = translate;
  }

  private _getContentInfo(content: Content): ContentInfo {
    const { width, height } = content.bound;
    const center = content.bound.center();
    center.z = content.ZSize / 2;

    const box3 = new Box3().setFromCenterAndSize(center, {
      x: width,
      y: height,
      z: content.ZSize
    });

    const box2 = new Box2().setFromPoints(box3.getCornerPts());

    return {
      id: content.id,
      contentType: content.contentType.getTypeString(),
      categoryIds: content.metadata.categories,
      seekId: content.seekId,
      style: content.metadata.productStyle,
      entityId: content.id,
      name: content.metadata.name,
      position: this.normalize(new Vector3(center)).toXYZ(),
      scale: {
        x: content.XScale,
        y: content.YScale,
        z: content.ZScale
      },
      rotation: {
        x: content.XRotation,
        y: content.YRotation,
        z: content.ZRotation
      },
      size: {
        x: content.XSize,
        y: content.YSize,
        z: content.ZSize
      },
      box3: box3.translate(this.translate2D),
      box2: box2.translate(this.translate2D)
    };
  }

  getContentsBox3d(): Box3 {
    if (!this._box3d) {
      const boundingBox = new Box3();
      const boxes: Box3[] = [];

      this.contents.forEach(item => {
        const { width, height } = item.bound;
        this._hullConcavity = Math.max(width, height, this._hullConcavity);

        const center = item.bound.center();
        const box = new Box3().setFromCenterAndSize(
          { x: center.x, y: center.y, z: item.ZSize / 2 },
          { x: width, y: height, z: item.ZSize }
        );

        boxes.push(box);
        boundingBox.union(box);
      });

      this._box3ds = boxes;
      this._box3d = boundingBox;
    }

    return this._box3d;
  }

  getContentsBox2d(): Box2 {
    return new Box2().setFromPoints(this._box3d!.getCornerPts());
  }

  getContentsConcaveHull(): ConcaveHullResult {
    const points = this.getContent2dBoxes().reduce((acc, box) => {
      box.getCornerPts().forEach(point => acc.push([point.x, point.y]));
      return acc;
    }, [] as number[][]);

    if (!points.length) {
      return {
        hullPoints: [],
        hullLines: []
      };
    }

    const hullPointsArray = hull(points, this._hullConcavity);
    const lines: Line2d[] = [];

    for (let i = 0; i < hullPointsArray.length; i++) {
      const [x1, y1] = hullPointsArray[i];
      const [x2, y2] = hullPointsArray[(i + 1) % hullPointsArray.length];

      lines.push(
        new Line2d(
          Vector2.make({ x: x1, y: y1 }),
          Vector2.make({ x: x2, y: y2 })
        )
      );
    }

    return {
      hullPoints: hullPointsArray.map(point => new Vector2(point)),
      hullLines: lines
    };
  }

  getContent3dBoxes(): Box3[] {
    if (!this._box3ds) {
      this._box3ds = this.contents.map(content =>
        new Box3().setFromCenterAndSize(
          { x: content.x, y: content.y, z: content.z },
          { x: content.XSize, y: content.YSize, z: content.ZSize }
        )
      );
    }

    return this._box3ds;
  }

  getContent2dBoxes(): Box2[] {
    if (!this._box2ds) {
      this._box2ds = this.getContent3dBoxes().map(box =>
        new Box2().setFromPoints(box.getCornerPts())
      );
    }

    return this._box2ds;
  }

  hasParametricModel(): boolean {
    return this.allContents.some(content => isParametricContent(content));
  }

  extract(): ExtractResult {
    const { hullLines, hullPoints } = this.getContentsConcaveHull();

    return {
      contents: this.contents.map(content => this._getContentInfo(content)),
      contentsBox3D: this.getContentsBox3d().translate(this.translate2D),
      content3dBoxes: this._box3ds!.map(box =>
        box.clone().translate(this.translate2D)
      ),
      contentsBox2D: this.getContentsBox2d().translate(this.translate2D),
      content2dBoxes: this._box3ds!
        .map(box => new Box2(box.getCornerPts()))
        .map(box => box.translate(this.translate2D)),
      content2dBoxesPoints: this._box3ds!
        .reduce((acc, box) => {
          acc.push(...new Box2(box.getCornerPts()).getCornerPts());
          return acc;
        }, [] as Vector2[])
        .map(point => point.translate(this.translate2D)),
      contentsConcaveHull: {
        hullLines: hullLines.map(line => line.translate(this.translate2D)),
        hullPoints: hullPoints.map(point => point.translate(this.translate2D))
      }
    };
  }
}