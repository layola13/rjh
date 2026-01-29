import { HSCore } from './635589';

interface ClipCSG {
  csg: any;
  box: THREE.Box3;
}

interface ClipAidCSGsResult {
  csgs: ClipCSG[];
  node: any;
}

interface ClipMeshesResult {
  clipMeshes: any[];
  cutPlanes: any[];
  nodeMap: Map<string, any>;
}

type ObstacleContent = 
  | HSCore.Model.Obstacle 
  | HSCore.Model.CustomizedModel 
  | any;

export default class ObstacleClipHelper {
  /**
   * Get obstacle contents from a face entity
   * @param entity - The entity to check for obstacles
   * @param targetFace - The target face to compare against
   * @returns Array of obstacle contents found on the face
   */
  private _getObstacleContents(
    entity: any,
    targetFace: HSCore.Model.Face
  ): ObstacleContent[] {
    const obstacleContents: ObstacleContent[] = [];
    const hostFace = entity.getHost() === targetFace ? targetFace : undefined;

    if (!hostFace) {
      return [];
    }

    const faceContents = Object.values(hostFace.parent.contents).filter(
      (content: any) => content.getHost() === hostFace
    );

    for (const content of faceContents) {
      if (content.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
        continue;
      }

      const isValidObstacle =
        content instanceof HSCore.Model.Obstacle ||
        content.instanceOf(HSConstants.ModelClass.NgCornerWindow) ||
        content instanceof HSCore.Model.CustomizedModel;

      if (
        isValidObstacle &&
        !content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Wainscot)
      ) {
        obstacleContents.push(content);
      }
    }

    for (const openingKey in hostFace.openings) {
      const opening = hostFace.openings[openingKey];
      if (opening.parameters && opening.parameters.type === 'windowHole') {
        continue;
      }
      obstacleContents.push(opening);
    }

    const parametricOpenings = Object.values(hostFace.parent.parametricOpenings);
    for (const parametricOpening of parametricOpenings) {
      obstacleContents.push(parametricOpening);
    }

    if (!(hostFace && hostFace instanceof HSCore.Model.Face)) {
      return [];
    }

    const app = HSApp.App.getApp();
    const faceRoomInfo = app.geometryManager.getFaceRoomInfo(hostFace);

    if (!faceRoomInfo) {
      return [];
    }

    const previousWallFace = faceRoomInfo.getPrevWallFace(hostFace);

    if (previousWallFace) {
      const prevFaceContents = Object.values(
        previousWallFace.parent.contents
      ).filter((content: any) => content.getHost() === previousWallFace);

      for (const content of prevFaceContents) {
        const isCornerWindow =
          content.instanceOf(HSConstants.ModelClass.NgCornerWindow) &&
          !content.instanceOf(HSConstants.ModelClass.NgPOrdinaryWindow) &&
          !content.instanceOf(HSConstants.ModelClass.NgBayWindow);

        if (isCornerWindow) {
          obstacleContents.push(content);
        }
      }
    }

    return obstacleContents;
  }

  /**
   * Get all clip meshes for the given entity and object
   * @param entity - The entity to process
   * @param object3D - The Three.js object to clip against
   * @returns Object containing clip meshes, cut planes, and node map
   */
  public getAllClipMeshes(
    entity: any,
    object3D: THREE.Object3D
  ): ClipMeshesResult | undefined {
    const hostFace = entity.getHost();

    if (!(hostFace && hostFace instanceof HSCore.Model.Face)) {
      return undefined;
    }

    const nodeMap = new Map<string, any>();
    const obstacleContents = this._getObstacleContents(entity, hostFace);

    object3D.updateMatrixWorld();

    const boundingBox = new THREE.Box3();
    boundingBox.setFromObject(object3D);

    const app = HSApp.App.getApp();
    const clipMeshes: any[] = [];

    obstacleContents.forEach((obstacleContent) => {
      const geometryObject = app.geometryManager.getGeometryObject(
        obstacleContent.ID
      );

      if (!geometryObject) {
        return;
      }

      const isDoor = geometryObject.entity instanceof HSCore.Model.Door;
      const clipAidCSGs: ClipAidCSGsResult | undefined = isDoor
        ? geometryObject.getClipAidCSGs(hostFace)
        : geometryObject.getClipAidCSGs();

      if (!clipAidCSGs) {
        return;
      }

      const { csgs, node } = clipAidCSGs;

      if (csgs && Array.isArray(csgs)) {
        csgs.forEach((clipCSG) => {
          const { csg, box } = clipCSG;

          if (boundingBox.intersectsBox(box)) {
            clipMeshes.push(csg);
            nodeMap.set(csg.uuid, node);
          }
        });
      }
    });

    const cutPlanes = HSCore.Geometry.Util.getHostFaceClipContentPlanes(
      entity,
      hostFace,
      object3D.matrixWorld
    );

    return {
      clipMeshes,
      cutPlanes,
      nodeMap,
    };
  }
}