interface Material {
  mixpaint?: MixPaint;
  clone(): Material;
}

interface MixPaint {
  faceGroup?: FaceGroup;
  faceEntity?: Face;
  mixPave?: {
    BBox?: BoundingBox;
  };
  updateBackgroundPolygon(path: unknown, options: BackgroundOptions): void;
  transform(matrix: Matrix3): void;
}

interface FaceGroup {
  clear(): void;
}

interface BoundingBox {
  min: { x: number; y: number };
  max: { x: number; y: number };
}

interface BackgroundOptions {
  basePoint: Vector2;
}

interface Face {
  material?: Material;
  structureFaces?: Face[];
}

interface Vector2 {
  x: number;
  y: number;
}

interface Matrix3 {
  toArray(): number[];
  inversed(): Matrix3 | null;
  isIdentity(): boolean;
  fromArray(array: number[]): Matrix3;
}

interface TransactionManager {
  createRequest(type: RequestType, args: unknown[]): Transaction;
  commit(transaction: Transaction, immediate: boolean): void;
}

interface Transaction {}

enum RequestType {
  SplitFaceGroupMixPaint = 'SplitFaceGroupMixPaint'
}

/**
 * Processes face materials and splits face group mix paint
 * @param floor - The floor face to process
 */
function processFaceGroupMixPaint(floor: Face): void {
  const transactionManager: TransactionManager = HSApp.App.getApp().transManager;
  
  const ceiling = DecorationUtil.getCeilingByFloor(floor);
  const structureFaces = floor.structureFaces ?? [];
  const facesToProcess = [floor, ceiling, ...structureFaces];

  facesToProcess.forEach((face: Face) => {
    if (!(face instanceof HSCore.Model.Face)) {
      return;
    }

    const groupFaces = HSCore.Util.FaceGroup.getGroupFaces(face);
    
    if (groupFaces.length <= 1 || !groupFaces[0].material) {
      return;
    }

    const baseMaterial = groupFaces[0].material;
    const mixPaints: MixPaint[] = [];

    for (const groupFace of groupFaces) {
      const clonedMaterial = baseMaterial.clone();
      const mixPaint = clonedMaterial.mixpaint ?? {};
      
      mixPaint.faceGroup?.clear();
      mixPaint.faceEntity = groupFace;

      const faceTransform = HSCore.Util.FaceGroup.getFaceGroupTransform(groupFace);
      
      if (!faceTransform) {
        continue;
      }

      const curvePath = HSCore.Util.BackgroundPath.getCurvePath(groupFace);
      const boundingBox = mixPaint.mixPave?.BBox ?? { min: { x: 0, y: 0 }, max: { x: 0, y: 0 } };
      const backgroundOptions: BackgroundOptions = {
        basePoint: new Vector2(boundingBox.min.x, boundingBox.max.y)
      };

      if (faceTransform.isIdentity()) {
        mixPaint.updateBackgroundPolygon(curvePath, backgroundOptions);
      } else {
        const transformedPath = MathIntegration.ins.transformPath(curvePath, faceTransform);
        mixPaint.updateBackgroundPolygon(transformedPath, backgroundOptions);

        const inversedTransform = faceTransform.inversed() ?? new Matrix3();
        const matrix = new Matrix3().fromArray(inversedTransform.toArray());
        mixPaint.transform(matrix);
      }

      mixPaints.push(mixPaint);
    }

    const request = transactionManager.createRequest(
      RequestType.SplitFaceGroupMixPaint,
      [groupFaces, mixPaints, []]
    );
    transactionManager.commit(request, true);
  });
}

export { processFaceGroupMixPaint };