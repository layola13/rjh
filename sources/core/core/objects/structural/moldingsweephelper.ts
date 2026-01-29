import * as math from './math';
import { ISweeperParent, SweepHelper } from './SweepHelper';
import { Logger } from './Logger';

export { ISweeperParent };

interface AssertHelper {
  assert(condition: boolean, message: string, author: string, date: string): void;
}

const assertHelper: AssertHelper = {
  assert(condition: boolean, message: string, author: string, date: string): void {
    if (!condition) {
      Logger.console.error(message, author, date);
    }
  }
};

interface MoldingProfileParams {
  profile: string;
  profileWidth: number;
  profileHeight: number;
  offsetX: number;
  offsetY: number;
  flip: boolean;
  flipX: boolean;
  flipY: boolean;
  contentType: string;
  pVersion?: number;
  profileFlipX?: boolean;
}

interface Point2D {
  x: number;
  y: number;
}

export class MoldingSweepHelper extends SweepHelper {
  private static _moldingInstance: MoldingSweepHelper | null = null;

  /**
   * Get molding profile from SVG string
   */
  getMoldingProfile(svgString: string, contentType: string, version: number = 0): math.Loop | undefined {
    if (contentType === '') {
      assertHelper.assert(false, 'contentType无效', 'zhouyang', '2020-12-28');
      return;
    }

    const polyCurves = math.SVGParser.stringToPolyCurves(svgString);
    
    if (polyCurves.length === 0) {
      assertHelper.assert(false, 'SVGParser转换结果为空', 'luolei', '2020-12-25');
    }

    const firstPolyCurve = polyCurves[0];
    
    if (firstPolyCurve.getAllCurves().length === 0) {
      assertHelper.assert(false, 'loop为空', 'zhouyang', '2020-09-22');
      return;
    }

    const curves = firstPolyCurve.getAllCurves();
    const points = curves.map(curve => curve.getStartPt());
    points.push(curves[curves.length - 1].getEndPt());

    if (points.length < 2) {
      return;
    }

    const origin: Point2D = { x: 0, y: 0 };
    if (!points[0].equals(origin) && !points[points.length - 1].equals(origin)) {
      points.unshift(math.Vector2.O());
    }

    const lines: math.Line2d[] = [];
    for (let i = 0; i < points.length; ++i) {
      if (i === points.length - 1) {
        lines.push(new math.Line2d(points[i], points[0]));
      } else {
        lines.push(new math.Line2d(points[i], points[i + 1]));
      }
    }

    const loop = new math.Loop(lines);

    if (contentType.includes('cornice')) {
      loop.transform(math.Matrix3.makeMirror(math.Vector2.O(), math.Vector2.X()));
    } else if (contentType.includes('pocket')) {
      const boundingBox = firstPolyCurve.getBoundingBox();
      const center = boundingBox.min.interpolated(boundingBox.max, 0.5);
      if (center.x > 0 && center.y > 0) {
        loop.transform(math.Matrix3.makeMirror(math.Vector2.O(), math.Vector2.X()));
      }
    }

    return loop;
  }

  /**
   * Calculate molding profile loop based on parameters
   */
  calcMoldingProfileLoop(params: MoldingProfileParams): math.Loop | undefined {
    const {
      profile,
      profileWidth,
      profileHeight,
      offsetX,
      offsetY,
      flip,
      flipX,
      flipY,
      contentType,
      pVersion,
      profileFlipX
    } = params;

    const DEFAULT_VERSION = 1000;
    const version = pVersion ?? DEFAULT_VERSION;

    if (contentType === '') {
      return;
    }

    const profileLoop = this.getMoldingProfile(profile, contentType, version);
    
    if (!profileLoop) {
      return undefined;
    }

    const scaleVector = new math.Vector2(profileWidth, profileHeight);
    profileLoop.transform(math.Matrix3.makeScale(math.Vector2.O(), scaleVector));

    if (version <= 1) {
      profileLoop.translate({ x: offsetX, y: offsetY });
    }

    if (profileFlipX) {
      profileLoop.transform(math.Matrix3.makeMirror(math.Vector2.O(), math.Vector2.Y()));
    }

    if (!profileFlipX && flip) {
      const mirrorMatrix = math.Matrix3.makeMirror(math.Vector2.O(), math.Vector2.Y());
      const rotateMatrix = math.Matrix3.makeRotate(math.Vector2.O(), math.CONST.PI_2);
      profileLoop.transform(mirrorMatrix.preMultiply(rotateMatrix));
    } else if (profileFlipX && flip) {
      const mirrorMatrix = math.Matrix3.makeMirror(math.Vector2.O(), math.Vector2.Y());
      const rotateMatrix = math.Matrix3.makeRotate(math.Vector2.O(), -math.CONST.PI_2);
      profileLoop.transform(mirrorMatrix.preMultiply(rotateMatrix));
    }

    if (flipY) {
      profileLoop.transform(math.Matrix3.makeMirror(math.Vector2.O(), math.Vector2.X()));
    }

    if (flipX) {
      profileLoop.transform(math.Matrix3.makeMirror(math.Vector2.O(), math.Vector2.Y()));
    }

    if (version > 1) {
      profileLoop.translate({ x: offsetX, y: offsetY });
    }

    return profileLoop;
  }

  /**
   * Calculate molding parameters
   */
  calcMoldingParameters(
    param1: unknown,
    param2: unknown,
    params: MoldingProfileParams,
    transformable: { getLocalToWorldMatrix: () => math.Matrix4 }
  ): MoldingProfileParams {
    const paramVariations = this.generateMaybeParams(params);
    
    for (const variation of paramVariations) {
      const profileLoop = this.calcMoldingProfileLoop(variation);
      Logger.console.log(
        profileLoop?.getAllCurves().map(curve => [curve.getStartPt(), curve.getEndPt()])
      );
      
      const shape3ds = this.genShape3dsFrom2ds(profileLoop).map(shape =>
        shape.transform(transformable.getLocalToWorldMatrix())
      );
      Logger.console.log(shape3ds);
    }

    return paramVariations[0];
  }

  /**
   * Generate 3D shapes from 2D loop
   */
  genShape3dsFrom2ds(loop: math.Loop | undefined): math.Vector3[] {
    const points3d: math.Vector3[] = [];
    
    if (!loop) {
      return points3d;
    }

    const curves = loop.getAllCurves();
    
    for (let i = 0; i < curves.length; i++) {
      const curve = curves[i];
      const startPt = curve.getStartPt();
      const startVec3 = new math.Vector3(startPt.x, startPt.y, 0);
      points3d.push(startVec3);

      if (i === curves.length - 1) {
        const endPt = curve.getEndPt();
        const endVec3 = new math.Vector3(endPt.x, endPt.y, 0);
        points3d.push(endVec3);
      }
    }

    return points3d;
  }

  /**
   * Generate all possible parameter variations
   */
  generateMaybeParams(params: MoldingProfileParams): MoldingProfileParams[] {
    const { profile, profileWidth, profileHeight, offsetX, offsetY, contentType } = params;

    const createVariation = (
      width: number,
      height: number,
      x: number,
      y: number,
      flip: boolean,
      flipX: boolean,
      flipY: boolean
    ): MoldingProfileParams => ({
      profile,
      profileHeight: height,
      profileWidth: width,
      offsetX: x,
      offsetY: y,
      flip,
      flipX,
      flipY,
      contentType
    });

    return [
      createVariation(profileWidth, profileHeight, offsetX, offsetY, false, false, false),
      createVariation(profileHeight, profileWidth, offsetX, offsetY, false, false, false),
      createVariation(profileWidth, profileHeight, offsetY, offsetX, false, false, false),
      createVariation(profileHeight, profileWidth, offsetY, offsetX, false, false, false),
      createVariation(profileWidth, profileHeight, offsetX, offsetY, true, false, false),
      createVariation(profileHeight, profileWidth, offsetX, offsetY, true, false, false),
      createVariation(profileWidth, profileHeight, offsetY, offsetX, true, false, false),
      createVariation(profileHeight, profileWidth, offsetY, offsetX, true, false, false),
      createVariation(profileWidth, profileHeight, offsetX, offsetY, false, true, false),
      createVariation(profileHeight, profileWidth, offsetX, offsetY, false, true, false),
      createVariation(profileWidth, profileHeight, offsetY, offsetX, false, true, false),
      createVariation(profileHeight, profileWidth, offsetY, offsetX, false, true, false),
      createVariation(profileWidth, profileHeight, offsetX, offsetY, false, false, true),
      createVariation(profileHeight, profileWidth, offsetX, offsetY, false, false, true),
      createVariation(profileWidth, profileHeight, offsetY, offsetX, false, false, true),
      createVariation(profileHeight, profileWidth, offsetY, offsetX, false, false, true),
      createVariation(profileWidth, profileHeight, offsetX, offsetY, true, true, false),
      createVariation(profileHeight, profileWidth, offsetX, offsetY, true, true, false),
      createVariation(profileWidth, profileHeight, offsetY, offsetX, true, true, false),
      createVariation(profileHeight, profileWidth, offsetY, offsetX, true, true, false),
      createVariation(profileWidth, profileHeight, offsetX, offsetY, false, true, true),
      createVariation(profileHeight, profileWidth, offsetX, offsetY, false, true, true),
      createVariation(profileWidth, profileHeight, offsetY, offsetX, false, true, true),
      createVariation(profileHeight, profileWidth, offsetY, offsetX, false, true, true),
      createVariation(profileWidth, profileHeight, offsetX, offsetY, true, false, true),
      createVariation(profileHeight, profileWidth, offsetX, offsetY, true, false, true),
      createVariation(profileWidth, profileHeight, offsetY, offsetX, true, false, true),
      createVariation(profileHeight, profileWidth, offsetY, offsetX, true, false, true),
      createVariation(profileWidth, profileHeight, offsetX, offsetY, true, true, true),
      createVariation(profileHeight, profileWidth, offsetX, offsetY, true, true, true),
      createVariation(profileWidth, profileHeight, offsetY, offsetX, true, true, true),
      createVariation(profileHeight, profileWidth, offsetY, offsetX, true, true, true)
    ];
  }

  /**
   * Get singleton instance
   */
  static getInstance(): MoldingSweepHelper {
    if (!this._moldingInstance) {
      this._moldingInstance = new MoldingSweepHelper();
    }
    return this._moldingInstance;
  }
}