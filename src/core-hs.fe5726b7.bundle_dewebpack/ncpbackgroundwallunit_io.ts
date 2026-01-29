import { Entity } from './Entity';
import { NCPBackgroundWallBase_IO, NCPBackgroundWallBase } from './NCPBackgroundWallBase';
import { NCustomizedModelMolding } from './NCustomizedModelMolding';
import { Coordinate3, Line3d, Vector2, Vector3, Matrix4, MathUtil, Loop } from './GeometryTypes';
import { Face } from './Face';
import { Floor } from './Floor';
import { NCPBackgroundWallBaseUtil } from './NCPBackgroundWallBaseUtil';

interface SelfMoldingConfig {
  selfMoldingType: string;
  coord: Coordinate3;
  path: Line3d[];
  faceTag: string;
  profileHeight: number;
  profileWidth: number;
  flipX?: boolean;
  flipY?: boolean;
  flip?: boolean;
  offsetX?: number;
  offsetY?: number;
  materialData: unknown;
  offset?: number;
}

interface MoldingMetadata {
  seekId: string;
  profile: unknown;
  normalTexture: unknown;
  normalTextureHigh: unknown;
  iconSmallURI: string;
  contentType: {
    getTypeString(): string;
  };
}

interface SystemParams {
  W: number;
  D: number;
  H: number;
}

interface ModelData {
  systemParams?: SystemParams;
  meta?: unknown;
}

interface OpenDocumentExtra {
  wdh: unknown;
  unitScale: number;
  wallLine: unknown;
  dontCalcPosition: boolean;
  calcPosWithWDH: boolean;
  useMinMax: boolean;
}

interface TargetFaceInfo {
  outer?: unknown[];
}

interface ModelParameters {
  targetFaceInfo?: TargetFaceInfo;
}

interface SweepPathResult {
  relyerId: string;
  pathCoedge3dsTags: Line3d[];
  faceTag: string;
}

interface MirrorOperation {
  matrix4: Matrix4;
}

export class NCPBackgroundWallUnit_IO extends NCPBackgroundWallBase_IO {}

export class NCPBackgroundWallUnit extends NCPBackgroundWallBase {
  selfHostCosmeticMoldings: NCustomizedModelMolding[] = [];
  private _singleHooKOnHost: HSCore.Util.SignalHook<this>;
  private useMinMax?: boolean;
  parameters!: ModelParameters;

  constructor(id: string = "", metadata?: unknown) {
    super(id, metadata);
    this._singleHooKOnHost = new HSCore.Util.SignalHook(this);
  }

  getOpenDocumentExtra(targetFace: unknown, useMinMaxOverride?: boolean): OpenDocumentExtra {
    const faceInfo = this.getInfoByTargetFace(targetFace);
    const sizeLimitUnlock = this.doc.designMetadata.get("sizeLimitUnlock");
    this.useMinMax = useMinMaxOverride ? this.useMinMax : !sizeLimitUnlock;

    return {
      wdh: faceInfo.wdh,
      unitScale: 0.001,
      wallLine: faceInfo.wallLine,
      dontCalcPosition: false,
      calcPosWithWDH: true,
      useMinMax: this.useMinMax
    };
  }

  updateModelFromData(data: ModelData, skipPositionUpdate: boolean): void {
    if (data.systemParams) {
      if (!skipPositionUpdate) {
        const targetFaceOuter = this.parameters.targetFaceInfo?.outer;
        if (targetFaceOuter && Array.isArray(targetFaceOuter) && targetFaceOuter.length > 0) {
          this.updatePositionFromMeta(data.meta, skipPositionUpdate);
        }

        const { W, D, H } = data.systemParams;
        this.XLength = W / 1000;
        this.YLength = D / 1000;
        this.ZLength = H / 1000;
        this.XScale = 1;
        this.YScale = 1;
        this.ZScale = 1;
      }
    } else if (data.meta) {
      this.updatePositionFromMeta(data.meta, skipPositionUpdate);
      this.updateSizeFromMeta(data.meta);
    }

    if (!skipPositionUpdate) {
      this.updateSelfMoldingPosition();
    }
  }

  generateSelfMolding(config: SelfMoldingConfig, metadata: MoldingMetadata): void {
    const moldingId = `parametricBackgroundWallUnitAddMolding-${config.selfMoldingType}-${this.id}`;
    const existingMoldings = this.selfHostCosmeticMoldings.filter(m => m.moldingId === moldingId);

    if (existingMoldings.length !== 0) {
      const existingMolding = existingMoldings[0];
      const { relyerId, pathCoedge3dsTags, faceTag } = this.calcSelfMoldingSweepPath(config);

      existingMolding.parameters = {
        ...existingMolding.parameters,
        coord: config.coord,
        relyerId,
        pathCoedge3dsTags,
        faceTag,
        seekId: metadata.seekId,
        profile: metadata.profile,
        previewProfile: metadata.profile,
        profileHeight: config.profileHeight,
        profileWidth: config.profileWidth,
        materialData: config.materialData,
        normalTexture: metadata.normalTexture,
        normalTextureHigh: metadata.normalTextureHigh,
        iconSmall: metadata.iconSmallURI,
        contentType: metadata.contentType.getTypeString(),
        offset: config.offset
      };

      existingMolding.metadata = metadata;
      this.addChild(existingMolding);
      existingMolding.dirtyGeometry();
      return;
    }

    const newMolding = new NCustomizedModelMolding();
    const { relyerId, pathCoedge3dsTags, faceTag } = this.calcSelfMoldingSweepPath(config);

    const parameters = {
      seekId: metadata.seekId,
      profile: metadata.profile,
      previewProfile: metadata.profile,
      relyerId,
      profileHeight: config.profileHeight,
      profileWidth: config.profileWidth,
      flipHorizontal: config.flipX,
      flipVertical: config.flipY,
      flip: config.flip,
      offsetX: config.offsetX,
      offsetY: config.offsetY,
      pathCoedge3dsTags,
      faceTag,
      materialData: config.materialData,
      normalTexture: metadata.normalTexture,
      normalTextureHigh: metadata.normalTextureHigh,
      iconSmall: metadata.iconSmallURI,
      contentType: metadata.contentType.getTypeString(),
      coord: config.coord,
      offset: config.offset
    };

    newMolding.init(
      {
        ...metadata,
        contentTypeStr: metadata.contentType.getTypeString()
      },
      parameters
    );
    newMolding.moldingId = moldingId;

    const existingIndex = this.selfHostMoldings.findIndex(m => m.moldingId === newMolding.moldingId);
    if (existingIndex !== -1) {
      this.selfHostCosmeticMoldings.splice(existingIndex, 1, newMolding);
    } else {
      this.selfHostCosmeticMoldings.push(newMolding);
    }

    this.addChild(newMolding);
  }

  calcSelfMoldingSweepPath(config: SelfMoldingConfig): SweepPathResult {
    return {
      relyerId: this.id,
      pathCoedge3dsTags: config.path,
      faceTag: config.faceTag
    };
  }

  clearSelfMoldingByType(moldingType: string): void {
    const children = Object.values(this.children);
    for (const child of children) {
      if (child instanceof NCustomizedModelMolding) {
        const parts = child.moldingId.split("-");
        if (parts[0] === "parametricBackgroundWallUnitAddMolding" && parts[1] === moldingType) {
          this.removeChild(child);
        }
      }
    }
  }

  findSelfMoldingByType(moldingType: string): NCustomizedModelMolding | undefined {
    return Object.values(this.children).find((child): child is NCustomizedModelMolding => {
      if (!(child instanceof NCustomizedModelMolding)) {
        return false;
      }
      const parts = child.moldingId.split("-");
      return parts[0] === "parametricBackgroundWallUnitAddMolding" && parts[1] === moldingType;
    });
  }

  updateSelfMoldingPosition(): void {
    const children = Object.values(this.children);
    const { XSize, YSize, ZSize } = this;

    for (const child of children) {
      if (!(child instanceof NCustomizedModelMolding) || !child.moldingId) {
        continue;
      }

      const parts = child.moldingId.split("-");
      if (!parts[0] || parts[0] !== "parametricBackgroundWallUnitAddMolding") {
        continue;
      }

      const moldingType = parts[1];

      if (moldingType === "left") {
        child.parameters = {
          ...child.parameters,
          coord: new Coordinate3(
            { x: -XSize / 2, y: -YSize / 2, z: ZSize },
            { x: 1, y: 0, z: 0 },
            { x: 0, y: -1, z: 0 }
          ),
          pathCoedge3dsTags: [
            new Line3d(
              { x: -XSize / 2, y: -YSize / 2, z: ZSize },
              { x: -XSize / 2, y: -YSize / 2, z: 0 }
            )
          ]
        };
        child.dirtyGeometry();
      } else if (moldingType === "right") {
        child.parameters = {
          ...child.parameters,
          coord: new Coordinate3(
            { x: XSize / 2, y: -YSize / 2, z: ZSize },
            { x: -1, y: 0, z: 0 },
            { x: 0, y: -1, z: 0 }
          ),
          pathCoedge3dsTags: [
            new Line3d(
              { x: XSize / 2, y: -YSize / 2, z: 0 },
              { x: XSize / 2, y: -YSize / 2, z: ZSize }
            )
          ]
        };
        child.dirtyGeometry();
      }
    }
  }

  getOutlineIncludeMolding(): Vector2[] {
    const leftMolding = this.findSelfMoldingByType("left");
    const rightMolding = this.findSelfMoldingByType("right");

    let leftOffset = 0;
    let rightOffset = 0;

    if (leftMolding) {
      const offset = leftMolding.parameters?.offset;
      leftOffset = offset ? offset / 1000 : 0;
    }

    if (rightMolding) {
      const offset = rightMolding.parameters?.offset;
      rightOffset = offset ? offset / 1000 : 0;
    }

    const vertices = this.getEntireBoundVertexes();
    vertices[0] = new Vector2(vertices[0].x - leftOffset, vertices[0].y);
    vertices[3] = new Vector2(vertices[3].x - leftOffset, vertices[3].y);
    vertices[1] = new Vector2(vertices[1].x + rightOffset, vertices[1].y);
    vertices[2] = new Vector2(vertices[2].x + rightOffset, vertices[2].y);

    const origin = new Vector2();
    const position = new Vector2(this.x, this.y);
    const rotationRad = THREE.Math.degToRad(this.rotation || 0);

    return vertices.map(vertex => {
      const scaled = new Vector2(vertex.x * this.XScale, vertex.y * this.YScale);
      scaled.rotate(origin, -rotationRad);
      scaled.add(position);
      return scaled;
    });
  }

  getLoopOnWallFace(): Loop | undefined {
    const leftMolding = this.findSelfMoldingByType("left");
    const rightMolding = this.findSelfMoldingByType("right");

    const leftOffset = leftMolding?.parameters?.offset ? leftMolding.parameters.offset / 1000 : 0;
    const rightOffset = rightMolding?.parameters?.offset ? rightMolding.parameters.offset / 1000 : 0;

    const localVertices = [
      { x: -(this.XSize / 2 + leftOffset), y: this.YSize / 2, z: 0 },
      { x: this.XSize / 2 + rightOffset, y: this.YSize / 2, z: 0 },
      { x: this.XSize / 2 + rightOffset, y: this.YSize / 2, z: this.ZSize },
      { x: -(this.XSize / 2 + leftOffset), y: this.YSize / 2, z: this.ZSize }
    ];

    const position = new Vector3(this.x, this.y, this.z);
    const transformMatrix = Matrix4.makeRotateZ(-MathUtil.degreeToRadius(this.rotation))
      .applyTranslate(position);

    const worldVertices: Array<{ x: number; y: number; z: number }> = [];
    localVertices.forEach(vertex => {
      const transformed = new Vector3(vertex).transform(transformMatrix);
      worldVertices.push({ x: transformed.x, y: transformed.y, z: transformed.z });
    });

    const hostFace = this.host;
    if (!hostFace || !(hostFace instanceof HSCore.Model.Face)) {
      return undefined;
    }
    if (hostFace instanceof HSCore.Model.Ceiling || hostFace instanceof HSCore.Model.Floor) {
      return undefined;
    }

    const inverseMatrix = new Matrix4()
      .fromArray(hostFace.surfaceObj.localToWorld.toArray())
      .inverse();

    if (!inverseMatrix) {
      return undefined;
    }

    const localVertices2D: Array<{ x: number; y: number }> = [];
    worldVertices.forEach(vertex => {
      const local = new Vector3(vertex).transform(inverseMatrix);
      localVertices2D.push({ x: local.x, y: local.y });
    });

    return new Loop(localVertices2D);
  }

  getIO(): NCPBackgroundWallUnit_IO {
    return NCPBackgroundWallUnit_IO.instance();
  }

  getBaseboardCutterInfo(targetFace?: Face): unknown {
    const face = this.host instanceof Face ? this.host : targetFace;
    return super.getBaseboardCutterInfo(face);
  }

  protected _setHost(host: unknown): void {
    super._setHost(host);
    this._listenSignalOnHost(host);
  }

  private _listenSignalOnHost(host: unknown): void {
    this._singleHooKOnHost.unlistenAll();

    if (host && host instanceof Face && !(host instanceof Floor)) {
      NCPBackgroundWallBaseUtil.getSameLineFaceForClip(host).forEach(face => {
        this._singleHooKOnHost.listen(face.signalDirty, (event: { data: { type: string } }) => {
          if (event.data.type === "geometry") {
            this.dirtyClipGeometry();
            this.dirtyMaterial();
            this.dirtyChildModels(true, true, true);
          }
        });
      });
    }
  }

  mirror(operation: MirrorOperation): void {
    super.mirror(operation);

    const outer = this.parameters.targetFaceInfo?.outer;
    if (!(Array.isArray(outer) && outer.length > 0)) {
      const transformed = new Vector3(this);
      transformed.transform(operation.matrix4);
      this.x = transformed.x;
      this.y = transformed.y;
      this.z = transformed.z;
    }
  }
}

Entity.registerClass(HSConstants.ModelClass.NCPBackgroundWallUnit, NCPBackgroundWallUnit);