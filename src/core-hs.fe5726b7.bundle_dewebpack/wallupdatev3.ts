import { MathUtil, Vector2, Vector3, Line3d, Plane } from './math-util';
import { PavingOptionApi } from './paving-option-api';

interface Material {
  mixpaint?: MixPaint;
}

interface MixPaint {
  mixPave?: MixPave;
}

interface MixPave {
  BBox: BoundingBox;
  regions: Region[];
}

interface BoundingBox {
  min: Vector2;
  max: Vector2;
  isValid(): boolean;
}

interface Region {
  pattern: Pattern;
  path: {
    BBox: BoundingBox;
  };
}

interface Pattern {
  pavingOption: PavingOption;
}

interface PavingOption {
  rotation: number;
  point: Vector2;
  sliderOffsetX: number;
  sliderOffsetY: number;
}

interface SurfaceObject {
  surface: Surface;
  getNormal(): Vector3;
  getCurve2ds(lines: Line3d[]): Curve2d[];
  sameDirWithSurface: boolean;
}

interface Surface {
  isPlane(): boolean;
  getCoord(): Coordinate;
}

interface Coordinate {
  getOrigin(): Vector3;
  getLocalToWorldMatrix(): Matrix4x4;
}

interface Curve2d {
  getStartPt(): Vector2;
  getEndPt(): Vector2;
}

interface Matrix4x4 {}

interface Face {
  material?: Material;
  surfaceObj: SurfaceObject;
}

interface WallEntity {
  ZRotation?: number;
  faces: Record<string, Face>;
  bottomFaces: Face[];
}

declare const HSCore: {
  Util: {
    Paints: {
      updateFaceMixpaint(face: Face): void;
    };
  };
};

export class WallUpdateV3 {
  migrationOpeningFaces(wallEntity: WallEntity): void {
    const zRotation = wallEntity.ZRotation ?? 0;

    for (const faceKey in wallEntity.faces) {
      const face = wallEntity.faces[faceKey];

      if (!face.material?.mixpaint) {
        continue;
      }

      const isBottomFace = wallEntity.bottomFaces.indexOf(face) > -1;
      if (isBottomFace) {
        continue;
      }

      const normal = face.surfaceObj.getNormal();
      const isVerticalOrHorizontal =
        MathUtil.isNearlySmaller(normal.z, 0) ||
        MathUtil.isNearlyEqual(normal.z, 1);

      if (isVerticalOrHorizontal) {
        this.migrationHoleFace(face, zRotation);
      }
    }
  }

  migrationHoleFace(face: Face, zRotation: number): void {
    const mixPave = face.material?.mixpaint?.mixPave;
    if (!mixPave) {
      return;
    }

    const boundingBox = mixPave.BBox;
    if (!boundingBox.isValid()) {
      return;
    }

    HSCore.Util.Paints.updateFaceMixpaint(face);

    if (!face.surfaceObj.surface.isPlane()) {
      return;
    }

    const firstRegion = mixPave.regions[0];
    if (!firstRegion) {
      return;
    }

    const pattern = firstRegion.pattern;
    const newRotation = pattern.pavingOption.rotation + zRotation + 180;

    const bboxTopLeft = new Vector2(boundingBox.min.x, boundingBox.max.y);
    const inverseRotation = 180 - zRotation;

    const xAxis = Vector3.X(1).vecRotate(
      Vector3.Z(1),
      (inverseRotation * Math.PI) / 180
    );

    const surfaceOrigin = face.surfaceObj.surface.getCoord().getOrigin();
    const plane = Plane.makePlaneByPointNormal(
      surfaceOrigin,
      Vector3.Z(1),
      xAxis
    );

    const localToWorldMatrix = plane.getCoord().getLocalToWorldMatrix();
    const originalPoint = pattern.pavingOption.point;

    const line3d = new Line3d(
      Vector3.XY(bboxTopLeft),
      Vector3.XY(originalPoint)
    ).transformed(localToWorldMatrix);

    const curve2dArray = face.surfaceObj.getCurve2ds([line3d]);
    const curve2d = curve2dArray[0];

    const targetPoint = face.surfaceObj.sameDirWithSurface
      ? curve2d.getStartPt()
      : curve2d.getEndPt();

    let rotationAngle = (zRotation / 180) * Math.PI;
    rotationAngle = Math.PI - rotationAngle;

    const translatedPoint = originalPoint.added(bboxTopLeft);
    translatedPoint.vecRotate(-rotationAngle);
    translatedPoint.add(targetPoint);

    const regionBBoxTopLeft = new Vector2(
      firstRegion.path.BBox.min.x,
      firstRegion.path.BBox.max.y
    );

    const finalPoint = translatedPoint.subtracted(regionBBoxTopLeft);

    new PavingOptionApi().setPavingOption(firstRegion, {
      point: finalPoint,
      rotation: newRotation,
      sliderOffsetX: pattern.pavingOption.sliderOffsetX,
      sliderOffsetY: pattern.pavingOption.sliderOffsetY
    });
  }
}