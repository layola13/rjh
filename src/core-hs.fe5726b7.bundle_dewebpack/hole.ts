import { Content } from './Content';
import { HoleDataProvider } from './HoleDataProvider';
import { FaceGeometry } from './FaceGeometry';
import { Pocket } from './Pocket';
import { TransUtil } from './TransUtil';
import { EntityEventType } from './EntityEventType';

interface ClipAidCSG {
  csg: THREE.Mesh;
  box: THREE.Box3;
}

interface ClipAidCSGResult {
  csgs: ClipAidCSG[];
  node: THREE.Object3D;
}

interface ExtrudeSettings {
  amount: number;
  bevelEnabled: boolean;
}

interface RoomInfo {
  faces: HSCore.Model.Face[];
}

interface EntityEvent {
  data: {
    entity?: HSCore.Model.Entity;
    type?: string;
    newParent?: HSCore.Model.Entity;
  };
}

export class Hole extends Content {
  private _dataProvider?: HoleDataProvider;
  private _clipAidCSGs?: ClipAidCSGResult;
  private _modelMatrixLocal?: THREE.Matrix4;
  private _matrixLocal?: THREE.Matrix4;

  constructor(
    entity: HSCore.Model.Hole,
    parent: Content | null,
    context: unknown
  ) {
    super(entity, parent, context);
  }

  onChildAdded(event: EntityEvent): void {
    const entity = event.data.entity;
    if (entity?.instanceOf(HSConstants.ModelClass.NgPocket)) {
      const pocketObject = this.createPocketObject(entity);
      this.childNodes?.set(entity.id, pocketObject);
    }
  }

  createFaceObject(face: HSCore.Model.Face): FaceGeometry {
    return new FaceGeometry(face, this.context, this, this.dataProvider, undefined);
  }

  createPocketObject(pocket: HSCore.Model.Pocket): Pocket {
    return new Pocket(pocket, null, this.context, this);
  }

  get dataProvider(): HoleDataProvider {
    if (!this._dataProvider) {
      this._dataProvider = new HoleDataProvider(this.entity);
    }
    return this._dataProvider;
  }

  onInit(): void {
    const pocket = this.entity.getPocket();
    if (pocket) {
      const pocketObject = this.createPocketObject(pocket);
      this.childNodes?.set(pocket.id, pocketObject);
    }
  }

  onEntityDirty(event: EntityEvent): void {
    this.childNodes?.forEach((childNode) => {
      childNode.geometryDirty = this.geometryDirty;
      childNode.positionDirty = this.positionDirty;
    }, this);

    if (
      event.data.type !== EntityEventType.Geometry &&
      event.data.type !== EntityEventType.Position
    ) {
      this._clipAidCSGs = undefined;
    }
  }

  getClipAidCSGs(face?: HSCore.Model.Face): ClipAidCSGResult {
    if (face && this.entity instanceof HSCore.Model.Door) {
      return this._createClipAidCSGs(face);
    }
    
    if (!this._clipAidCSGs) {
      this._clipAidCSGs = this._createClipAidCSGs();
    }
    return this._clipAidCSGs;
  }

  private _createClipAidCSGs(face?: HSCore.Model.Face): ClipAidCSGResult {
    const entity = this.entity;
    const openingLoop = this.getOpeningLoop(face);
    
    const extrudeSettings: ExtrudeSettings = {
      amount: 2,
      bevelEnabled: false
    };

    const shape = new THREE.Shape(openingLoop);
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.25
    });
    const mesh = new THREE.Mesh(geometry, material);

    const position = new THREE.Vector3(0, 0, -extrudeSettings.amount / 2);
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3(1, 1, 1);
    const matrix = new THREE.Matrix4().compose(position, quaternion, scale);

    const meshGeometry = mesh.geometry;
    meshGeometry.vertices = meshGeometry.vertices.map((vertex) =>
      vertex.applyMatrix4(matrix)
    );

    const contentNode = HSCore.Geometry.Util.getContentNode(entity);
    const entityLayer = HSCore.Util.Layer.getEntityLayer(this.entity);
    
    let altitude = 0;
    if (entityLayer instanceof HSCore.Model.Layer) {
      altitude = HSCore.Util.Layer.getAltitude(entityLayer);
    }

    contentNode.position.y -= entity.ZSize / 2 - altitude;
    contentNode.add(mesh);
    contentNode.updateMatrixWorld();

    const csgMesh = mesh;
    const boundingBox = new THREE.Box3();
    boundingBox.setFromObject(contentNode);

    const csgs: ClipAidCSG[] = [];
    csgs.push({
      csg: csgMesh,
      box: boundingBox
    });

    return {
      csgs,
      node: contentNode
    };
  }

  getOpeningLoop(face?: HSCore.Model.Face, applyOffset: boolean = true): THREE.Vector2[] {
    const entity = this.entity;
    const pocket = entity.getPocket();
    let pocketSize = pocket ? pocket.XSize : 0;

    if (pocket && face instanceof HSCore.Model.Face) {
      let shouldApplyOffset = face.roomInfos.length > 0;
      
      if (face.roomInfos.length > 0) {
        const host = pocket.parent instanceof HSCore.Model.Opening 
          ? pocket.parent.host 
          : undefined;
          
        if (host instanceof HSCore.Model.Wall) {
          const faceType = HSCore.Util.Face.getFaceType(face);
          const leftFaces = Object.values(host.leftFaces);
          const rightFaces = Object.values(host.rightFaces);
          const roomFaces = host.roomInfos.map((info: RoomInfo) => info.faces).flat();
          
          const hasLeftFaces = roomFaces.some((roomFace) => leftFaces.includes(roomFace));
          const hasRightFaces = roomFaces.some((roomFace) => rightFaces.includes(roomFace));
          
          if (hasLeftFaces && hasRightFaces) {
            shouldApplyOffset = faceType === 'left';
          }
        }
      }

      const outerThickness = pocket.side === 'inner' ? 0 : (pocket.outerThickness || 0);
      const innerThickness = pocket.side === 'outer' ? 0 : (pocket.thickness || 0);
      let thickness = shouldApplyOffset ? innerThickness : outerThickness;
      
      if (pocket.parent instanceof HSCore.Model.Hole) {
        thickness = pocket.thickness;
      }
      
      pocketSize = thickness;
    }

    let profile = HSCore.Util.ProfileParser.parseOpeningProfile(entity);
    if (!profile || profile.length === 0) {
      return [];
    }

    if (pocketSize && applyOffset) {
      profile.forEach((point) => {
        point.x *= entity.XScale;
        point.y *= entity.ZScale;
      });

      const offsetPolygons = HSCore.Util.Collision.OffsetPolygon([profile], pocketSize);
      offsetPolygons[0].forEach((point) => {
        point.x /= entity.XScale;
        point.y /= entity.ZScale;
      });

      profile = offsetPolygons[0];

      const shouldAdjustBottomEdge = 
        (entity.instanceOf(HSConstants.ModelClass.NgHole) && entity.z > 0) ||
        (entity.instanceOf(HSConstants.ModelClass.NgWindow) && !entity.getWindowSill());

      if (!shouldAdjustBottomEdge) {
        profile.forEach((point) => {
          if (GeLib.MathUtils.smallerOrEqual(point.y, pocketSize)) {
            point.y = 0;
          }
        });
      }
    }

    let minY: number | undefined;
    let maxY: number | undefined;

    profile.forEach((point) => {
      if (minY === undefined) {
        minY = point.y;
        maxY = point.y;
      } else {
        minY = point.y < minY ? point.y : minY;
        maxY = point.y > (maxY ?? point.y) ? point.y : maxY;
      }
    });

    const isAtGroundLevel = HSCore.Util.Math.nearlyEquals(entity.z, 0);

    const result = profile.map((point) => {
      if (isAtGroundLevel && HSCore.Util.Math.nearlyEquals(point.y, maxY!)) {
        return new THREE.Vector2(point.x, point.y + 0.005);
      } else if (isAtGroundLevel && HSCore.Util.Math.nearlyEquals(point.y, minY!)) {
        return new THREE.Vector2(point.x, point.y - 0.005);
      } else {
        return new THREE.Vector2(point.x, point.y);
      }
    });

    return result;
  }

  onCleanup(): void {
    super.onCleanup();
    this._dataProvider = undefined;
  }

  onParentReplaced(event: EntityEvent): void {
    this.parent.childNodes.delete(this.entity.id);
    this.parent = this.context.WallGeometryService.getGeometryObject(
      event.data.newParent!.id
    );
    this.parent.childNodes.set(this.entity.id, this);
  }

  getModelMatrix(): THREE.Matrix4 | undefined {
    return this._modelMatrixLocal || this._matrixLocal;
  }

  private _computeLocalMatrix(applyScale: boolean = true): THREE.Matrix4 {
    const entity = this.entity;
    
    const degreesToRadians = (degrees: number): number => 
      ((degrees || 0) % 360) * Math.PI / 180;

    const x = entity.x || 0;
    const y = entity.y || 0;
    const z = entity.z || 0;
    const translation = new THREE.Vector3(x, y, z);

    const xRotation = degreesToRadians(entity.XRotation);
    const yRotation = degreesToRadians(entity.YRotation);
    const zRotation = degreesToRadians(entity.ZRotation);
    const euler = new THREE.Euler(-xRotation, -yRotation, -zRotation, 'XYZ');
    const rotationMatrix = new THREE.Matrix4().makeRotationFromEuler(euler);

    let xScale = entity.XScale || 1;
    let yScale = entity.YScale || 1;
    let zScale = entity.ZScale || 1;

    if (entity instanceof HSCore.Model.Window) {
      let xMultiplier = 1;
      let yMultiplier = 1;

      switch (entity.swing) {
        case 1:
          xMultiplier = -xMultiplier;
          break;
        case 2:
          yMultiplier = -yMultiplier;
          xMultiplier = -xMultiplier;
          break;
        case 3:
          yMultiplier = -yMultiplier;
          break;
      }

      xScale *= yMultiplier;
      yScale *= xMultiplier;

      const indentVector = entity.getIndentVector3();
      translation.x += indentVector.x;
      translation.y += indentVector.y;
      translation.z += indentVector.z;
    }

    if (!applyScale) {
      xScale = 1;
      yScale = 1;
      zScale = 1;
    }

    const scaleMatrix = new THREE.Matrix4().makeScale(xScale, yScale, zScale);
    const centerOffset = new THREE.Matrix4().makeTranslation(0, 0, -entity.ZLength / 2);
    
    const directionVector = new THREE.Vector3(0, 0, 1)
      .transformDirection(rotationMatrix)
      .multiplyScalar((entity.ZLength * zScale) / 2);
    
    const directionTranslation = new THREE.Matrix4().makeTranslation(
      directionVector.x,
      directionVector.y,
      directionVector.z
    );

    const localMatrix = new THREE.Matrix4();
    localMatrix
      .multiply(directionTranslation)
      .multiply(rotationMatrix)
      .multiply(scaleMatrix)
      .multiply(centerOffset);

    const translationMatrix = new THREE.Matrix4().makeTranslation(
      translation.x,
      translation.y,
      translation.z
    );
    
    localMatrix.premultiply(translationMatrix);

    return localMatrix;
  }

  onUpdatePosition(): void {
    this._matrixLocal = this._computeLocalMatrix(true);
    TransUtil.convertMatrixUnit(this._matrixLocal, undefined);

    if (this.entity instanceof HSCore.Model.Door) {
      this._modelMatrixLocal = this._computeLocalMatrix(false);
      TransUtil.convertMatrixUnit(this._modelMatrixLocal, undefined);
    }
  }
}