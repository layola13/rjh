export default class ConvexFaceValidator {
  static isPathOnBackgroundPolyline(
    path: Array<{ x: number; y: number; z: number }>,
    sketch: any,
    entity: any
  ): boolean {
    if (path.length < 2) return false;

    const backgroundOuter = sketch.getBackgroundOuter();
    if (!backgroundOuter || backgroundOuter.length < 3) return false;

    const entityMatrix = HSCore.Util.Matrix3DHandler.getMatrix4(entity);
    const transformedOuter = backgroundOuter.map((point: { x: number; y: number; z: number }) =>
      new THREE.Vector3(point.x, point.y, point.z).applyMatrix4(sketch.convert3dMatrix)
    );

    const plane = new THREE.Plane().setFromCoplanarPoints(
      transformedOuter[0],
      transformedOuter[1],
      transformedOuter[transformedOuter.length - 1]
    );

    const projectedPath = path.map((point) => {
      const vec = new THREE.Vector3(point.x, point.y, point.z);
      vec.applyMatrix4(entityMatrix);
      return plane.projectPoint(vec);
    });

    const lineSegments: THREE.Line3[] = [];
    for (let i = 0; i < transformedOuter.length; ++i) {
      let segment: THREE.Line3;
      if (i < transformedOuter.length - 1) {
        segment = new THREE.Line3(transformedOuter[i], transformedOuter[i + 1]);
      } else {
        segment = new THREE.Line3(transformedOuter[i], transformedOuter[0]);
      }
      lineSegments.push(segment);
    }

    for (const segment of lineSegments) {
      let matchCount = 0;
      for (const pathPoint of projectedPath) {
        if (
          GeLib.LineUtils.isPointOnLineSegment(
            pathPoint,
            segment,
            HSCore.Util.Math.defaultTolerance
          ) &&
          ++matchCount > 1
        ) {
          break;
        }
      }
      if (matchCount > 1) return true;
    }

    return false;
  }

  static getDocIdByMeshName(meshName: string, entity: any): string | undefined {
    let docId: string | undefined;
    if (meshName) {
      const parts = meshName.split('/');
      docId = parts[parts.length - 2];
    }
    return docId;
  }

  static getFaceParallelToBackgroundFace(
    meshName: string,
    faceId: string,
    modelInfo: any,
    faceNormal: THREE.Vector3,
    isFloorplanMode?: boolean
  ): { meshId: number; meshName: string; faceMeshNormal: THREE.Vector3; needNegate?: boolean } | undefined {
    if (!meshName || !faceId || !modelInfo || !faceNormal) {
      return undefined;
    }

    let docId = this.getDocIdByMeshName(meshName, modelInfo.entity);
    let webCADDocument = modelInfo.entity.webCADDocument;

    if (modelInfo.entity instanceof HSCore.Model.CustomizedModelLightSlot) {
      webCADDocument = modelInfo.entity.getUniqueParent().webCADDocument;
      docId = modelInfo.entity.lightSlotId;
    }

    const segmentSubPath = WebCADModelAPI.getSegmentSubPath(webCADDocument, faceId, docId);
    if (!segmentSubPath || segmentSubPath.size <= 0) {
      return undefined;
    }

    const downVector = new THREE.Vector3(0, 0, -1);

    for (const [currentMeshName, meshNormal] of segmentSubPath.entries()) {
      if (meshNormal && GeLib.VectorUtils.isNormalParallel(faceNormal, meshNormal, 0.001)) {
        const mesh = modelInfo.getMeshByName(currentMeshName);
        if (!mesh) continue;

        return {
          meshId: mesh.mRuntimeId,
          meshName: currentMeshName,
          faceMeshNormal: meshNormal
        };
      }

      if (
        isFloorplanMode &&
        meshNormal &&
        GeLib.VectorUtils.isPerpendicular(downVector, meshNormal, 0.001)
      ) {
        const mesh = modelInfo.getMeshByName(currentMeshName);
        if (!mesh) continue;

        const result: { meshId: number; meshName: string; faceMeshNormal: THREE.Vector3; needNegate?: boolean } = {
          meshId: mesh.mRuntimeId,
          meshName: currentMeshName,
          faceMeshNormal: meshNormal
        };

        if (modelInfo.app.floorplan.active_camera.z < 0) {
          result.needNegate = true;
        }

        return result;
      }
    }

    return undefined;
  }

  static isSelectingMinExtrusionValueFace(sketch: any, faceId: string): boolean {
    if (!sketch || !faceId) return false;

    const currentExtrusion = sketch.getExtrusionValue(faceId);
    let minExtrusion = 10000;

    for (const face of sketch.faces) {
      const extrusion = sketch.getExtrusionValue(face.id);
      if (extrusion < minExtrusion) {
        minExtrusion = extrusion;
      }
    }

    return HSCore.Util.Math.nearlyEquals(currentExtrusion, minExtrusion, 0.01);
  }

  static isThisCurveCorrespondPath(
    curve: any,
    path: THREE.Vector3[],
    sketch: any
  ): boolean {
    const TOLERANCE = 0.001;

    if (path.length === 2 && curve instanceof HSCore.Model.Line2d) {
      const transformedPoints = curve.points.map((point: { x: number; y: number }) =>
        new THREE.Vector3(point.x, point.y, 0).applyMatrix4(sketch.convert3dMatrix)
      );

      if (
        (HSCore.Util.Math.isSamePoint(path[0], transformedPoints[0], TOLERANCE) &&
          HSCore.Util.Math.isSamePoint(path[1], transformedPoints[1], TOLERANCE)) ||
        (HSCore.Util.Math.isSamePoint(path[0], transformedPoints[1], TOLERANCE) &&
          HSCore.Util.Math.isSamePoint(path[1], transformedPoints[0], TOLERANCE))
      ) {
        return true;
      }
    } else if (path.length > 2 && !(curve instanceof HSCore.Model.Line2d)) {
      const center = curve.center;
      const transformedCenter = new THREE.Vector3(center.x, center.y, 0).applyMatrix4(
        sketch.convert3dMatrix
      );

      const radiusFromPath = HSCore.Util.Math.getDistance3(transformedCenter, path[0]);
      if (!HSCore.Util.Math.nearlyEquals(radiusFromPath, curve.radius, TOLERANCE)) {
        return false;
      }

      let allPointsOnCircle = true;
      for (const pathPoint of path) {
        const distance = HSCore.Util.Math.getDistance3(transformedCenter, pathPoint);
        if (!HSCore.Util.Math.nearlyEquals(distance, radiusFromPath, TOLERANCE)) {
          allPointsOnCircle = false;
          break;
        }
      }

      if (allPointsOnCircle) return true;
    }

    return false;
  }

  static getPathCorrespondSketchLoopInfo(
    sketch: any,
    faceId: string,
    path: Array<{ x: number; y: number; z: number }>,
    entity: any
  ): { loop: any; loopType: 'outerLoop' | 'innerLoop' } | undefined {
    const backgroundOuter = sketch.getBackgroundOuter();
    if (!backgroundOuter || backgroundOuter.length < 3) {
      return undefined;
    }

    const transformedOuter = backgroundOuter.map((point: { x: number; y: number; z: number }) =>
      new THREE.Vector3(point.x, point.y, point.z).applyMatrix4(sketch.convert3dMatrix)
    );

    const plane = new THREE.Plane().setFromCoplanarPoints(
      transformedOuter[0],
      transformedOuter[1],
      transformedOuter[transformedOuter.length - 1]
    );

    const entityMatrix = HSCore.Util.Matrix3DHandler.getMatrix4(entity);
    const projectedPath = path.map((point) => {
      const vec = new THREE.Vector3(point.x, point.y, point.z);
      vec.applyMatrix4(entityMatrix);
      return plane.projectPoint(vec);
    });

    for (const face of sketch.faces) {
      if (face.id === faceId) {
        const outerLoop = face.outerLoop;
        for (const curve of outerLoop.curves) {
          if (this.isThisCurveCorrespondPath(curve, projectedPath, sketch)) {
            return { loop: outerLoop, loopType: 'outerLoop' };
          }
        }

        const innerLoops = Object.values(face.innerLoops);
        for (const innerLoop of innerLoops as any[]) {
          for (const curve of innerLoop.curves) {
            if (this.isThisCurveCorrespondPath(curve, projectedPath, sketch)) {
              return { loop: innerLoop, loopType: 'innerLoop' };
            }
          }
        }
      }
    }

    return undefined;
  }

  static isSelectConvexFace(
    meshName: string,
    modelInfo: any,
    path: Array<{ x: number; y: number; z: number }>,
    isInnerLoop: boolean,
    isFloorplanMode?: boolean
  ): boolean {
    if (!meshName || !modelInfo || !path || !modelInfo.entity) return false;

    const entity = modelInfo.entity;
    if (
      !(
        entity instanceof HSCore.Model.CustomizedCeilingModel ||
        entity instanceof HSCore.Model.CustomizedBackgroundWall ||
        entity instanceof HSCore.Model.NCustomizedCeilingModel ||
        entity instanceof HSCore.Model.NCustomizedBackgroundWall
      )
    ) {
      return false;
    }

    const sketch = entity.sketch;
    if (!sketch) return false;

    const firstSlash = meshName.indexOf('/');
    const secondSlash = meshName.indexOf('/', firstSlash + 1);
    const faceId = meshName.slice(firstSlash + 1, secondSlash);

    if (this.isSelectingMinExtrusionValueFace(sketch, faceId)) return false;
    if (this.isPathOnBackgroundPolyline(path, sketch, entity)) return false;

    if (isInnerLoop) {
      let targetInnerLoop: any;
      for (const face of sketch.faces) {
        if (face.id === faceId) {
          const innerLoops = Object.values(face.innerLoops);
          if (innerLoops.length === 1) {
            targetInnerLoop = innerLoops[0];
          } else if (innerLoops.length > 1) {
            const pathSlice = path.slice(0, 2);
            const loopInfo = this.getPathCorrespondSketchLoopInfo(sketch, faceId, pathSlice, entity);
            if (loopInfo && loopInfo.loopType === 'innerLoop') {
              targetInnerLoop = loopInfo.loop;
            }
          }
          break;
        }
      }

      if (!targetInnerLoop) return false;

      let matchingFaceId: string | undefined;
      for (const face of sketch.faces) {
        if (face.id !== faceId) {
          const outerLoop = face.outerLoop;
          if (
            HSCore.Util.Math.isSamePolygon(
              outerLoop.discretePoints,
              targetInnerLoop.discretePoints,
              0.001
            )
          ) {
            matchingFaceId = face.id;
            break;
          }
        }
      }

      if (!matchingFaceId) return false;

      const matchingExtrusion = sketch.getExtrusionValue(matchingFaceId);
      const currentExtrusion = sketch.getExtrusionValue(faceId);

      if (GeLib.MathUtils.smaller(matchingExtrusion, currentExtrusion)) return true;
    } else {
      let targetOuterLoop: any;
      for (const face of sketch.faces) {
        if (face.id === faceId) {
          targetOuterLoop = face.outerLoop;
          break;
        }
      }

      if (!targetOuterLoop) return false;

      let matchingFaceId: string | undefined;
      for (const face of sketch.faces) {
        if (face.id !== faceId) {
          const innerLoops = Object.values(face.innerLoops);
          for (const innerLoop of innerLoops as any[]) {
            if (
              HSCore.Util.Math.isSamePolygon(
                targetOuterLoop.discretePoints,
                innerLoop.discretePoints
              )
            ) {
              matchingFaceId = face.id;
              break;
            }
          }
          if (matchingFaceId) break;
        }
      }

      if (!matchingFaceId) return false;

      const currentExtrusion = sketch.getExtrusionValue(faceId);
      const matchingExtrusion = sketch.getExtrusionValue(matchingFaceId);

      if (GeLib.MathUtils.smaller(matchingExtrusion, currentExtrusion)) return true;
    }

    return false;
  }

  static isSelectLineOnConvexFace(
    meshName: string,
    modelInfo: any,
    path: Array<{ x: number; y: number; z: number }>,
    entity: any
  ): boolean {
    if (!meshName || !modelInfo || !path || path.length < 2 || !modelInfo.entity) {
      return false;
    }

    const firstSlash = meshName.indexOf('/');
    const secondSlash = meshName.indexOf('/', firstSlash + 1);
    const faceId = meshName.slice(firstSlash + 1, secondSlash);

    const targetEntity = modelInfo.entity;
    if (
      !(
        targetEntity instanceof HSCore.Model.CustomizedCeilingModel ||
        targetEntity instanceof HSCore.Model.CustomizedBackgroundWall ||
        targetEntity instanceof HSCore.Model.NCustomizedCeilingModel ||
        targetEntity instanceof HSCore.Model.NCustomizedBackgroundWall
      )
    ) {
      return false;
    }

    const sketch = targetEntity.sketch;
    if (!sketch) return false;

    if (this.isSelectingMinExtrusionValueFace(sketch, faceId)) return false;
    if (this.isPathOnBackgroundPolyline(path, sketch, targetEntity)) return false;

    const loopInfo = this.getPathCorrespondSketchLoopInfo(sketch, faceId, path, targetEntity);
    if (!loopInfo) return false;

    if (loopInfo.loopType === 'innerLoop') {
      const targetLoop = loopInfo.loop;
      let matchingFaceId: string | undefined;

      for (const face of sketch.faces) {
        if (face.id !== faceId) {
          const outerLoop = face.outerLoop;
          if (
            HSCore.Util.Math.isSamePolygon(targetLoop.discretePoints, outerLoop.discretePoints, 0.001)
          ) {
            matchingFaceId = face.id;
            break;
          }
        }
      }

      if (!matchingFaceId) return true;

      const matchingExtrusion = sketch.getExtrusionValue(matchingFaceId);
      const currentExtrusion = sketch.getExtrusionValue(faceId);

      if (GeLib.MathUtils.smaller(matchingExtrusion, currentExtrusion)) return true;
    } else if (loopInfo.loopType === 'outerLoop') {
      const targetLoop = loopInfo.loop;
      let matchingFaceId: string | undefined;

      for (const face of sketch.faces) {
        if (face.id !== faceId) {
          const innerLoops = Object.values(face.innerLoops);
          for (const innerLoop of innerLoops as any[]) {
            if (HSCore.Util.Math.isSamePolygon(innerLoop.discretePoints, targetLoop.discretePoints)) {
              matchingFaceId = face.id;
              break;
            }
          }
          if (matchingFaceId) break;
        }
      }

      if (!matchingFaceId) return false;

      const currentExtrusion = sketch.getExtrusionValue(faceId);
      const matchingExtrusion = sketch.getExtrusionValue(matchingFaceId);

      if (GeLib.MathUtils.smaller(matchingExtrusion, currentExtrusion)) return true;
    }

    return false;
  }
}