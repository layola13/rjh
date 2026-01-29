export class Utils {
  /**
   * Sorts loop curves based on roof type
   * @param loop - The loop containing curves to sort
   * @param roofType - The type of roof structure
   * @returns A new Loop with sorted curves
   */
  static sortLoopByType(loop: any, roofType: ENParamRoofType): any {
    const curves = loop.getAllCurves();

    // Special handling for specific roof types
    if (
      roofType === ENParamRoofType.HerringBone ||
      roofType === ENParamRoofType.SaltBox ||
      roofType === ENParamRoofType.BoxGable
    ) {
      const firstCurve = curves[0];
      const secondCurve = curves[1];

      if (firstCurve.getLength() > secondCurve.getLength()) {
        const extracted = curves.splice(1, 3).reverse();
        extracted.forEach((curve: any) => curves.unshift(curve));
      }

      return new Loop(curves);
    }

    // Find the longest curve
    let longestCurveIndex = curves.findIndex((curve: any) => curve.isLine2d());
    const hasLine2d = longestCurveIndex > -1;
    let maxLength = hasLine2d ? curves[longestCurveIndex].getLength() : 0;

    for (let i = longestCurveIndex + 1; i < curves.length; i++) {
      const currentCurve = curves[i];

      if ((hasLine2d && currentCurve.isLine2d()) || !hasLine2d) {
        const currentLength = currentCurve.getLength();
        if (currentLength > maxLength) {
          maxLength = currentLength;
          longestCurveIndex = i;
        }
      }
    }

    // Special handling for Pitched roof type
    if (roofType === ENParamRoofType.Pitched) {
      const initialCurves = HSCore.Util.Roof.getInitialCurves(curves);

      if (initialCurves.length > 0) {
        let longestInitialCurve = initialCurves[0];
        let longestInitialLength = longestInitialCurve.getLength();

        for (let i = 1; i < initialCurves.length; i++) {
          const currentLength = initialCurves[i].getLength();
          if (currentLength > longestInitialLength) {
            longestInitialCurve = initialCurves[i];
            longestInitialLength = currentLength;
          }
        }

        const pitchedIndex = curves.findIndex((curve: any) =>
          curve.equals(longestInitialCurve)
        );

        if (pitchedIndex > -1) {
          longestCurveIndex = pitchedIndex;
        }
      }
    }

    // Rotate curves to start from the longest curve
    if (longestCurveIndex > 0) {
      const extracted = curves.splice(longestCurveIndex, curves.length - longestCurveIndex).reverse();
      extracted.forEach((curve: any) => curves.unshift(curve));
    }

    return new Loop(curves);
  }
}

enum ENParamRoofType {
  HerringBone = 'HerringBone',
  SaltBox = 'SaltBox',
  BoxGable = 'BoxGable',
  Pitched = 'Pitched'
}