import { SVGParser, Matrix3, Vector3 } from './SVGParser';

interface Size {
  x: number;
  y: number;
}

export class ProfileUtil {
  /**
   * Calculates a scale matrix to fit an SVG profile to a target size
   * @param svgString - SVG path string to parse
   * @param targetSize - Target dimensions to scale to
   * @returns Scale transformation matrix, or undefined if parsing fails
   */
  static calcProfileScaleMatrix(
    svgString: string,
    targetSize: Size
  ): Matrix3 | undefined {
    const polyCurves = SVGParser.stringToPolyCurves(svgString);
    const firstCurve = polyCurves[0];
    
    if (!firstCurve) {
      return undefined;
    }
    
    const boundingBox = firstCurve.getBoundingBox();
    const currentSize = boundingBox.getSize();
    
    const scaleMatrix = new Matrix3();
    return scaleMatrix.applyScale(Vector3.O(), {
      x: targetSize.x / currentSize.x,
      y: targetSize.y / currentSize.y
    });
  }
}