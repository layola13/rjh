interface Position {
  x: number;
  y: number;
  z?: number;
}

interface Rotation {
  x?: number;
  y?: number;
  z: number;
}

interface Scale {
  XScale: number;
  YScale: number;
  ZScale: number;
}

interface SnappedObject {
  seekId?: string;
  childId?: string;
  offset?: Position;
  rotation?: Rotation;
  force?: Position;
}

interface PAssemblyMeta {
  userSchema?: unknown;
  userFreeData?: {
    assemblies?: Array<{
      peerSnappingObjects?: SnappedObject[];
    }>;
    peerSnappingObjects?: SnappedObject[];
  };
  pAssemblyVersion?: number;
}

interface PAssemblySpec {
  host?: unknown;
  parent?: unknown;
  pAssembly?: unknown;
}

interface PAssembly {
  x: number;
  y: number;
  z: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  ZLength: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  getChild(childId: string): PAssembly | null;
}

interface PAssemblyClass {
  create(meta: PAssemblyMeta, schema: unknown): PAssembly;
}

interface AddContentRequest {
  onCommit(): void;
  onUndo(): void;
  onRedo(): void;
}

type Processor = (meta: PAssemblyMeta, schemaOrAssembly: unknown) => void;

function getNestedProperty(keys: string[], obj: unknown): unknown {
  return keys.reduce((acc: unknown, key: string) => {
    return acc && typeof acc === 'object' && key in acc ? (acc as Record<string, unknown>)[key] : null;
  }, obj);
}

export default class AddPAssemblyRequest extends HSCore.Transaction.Request {
  private _meta: PAssemblyMeta;
  private _schema: unknown;
  private _snappedObjects: SnappedObject[] | null;
  private _position: Position;
  private _rotation: number | Rotation;
  private _host: unknown;
  private _scale?: Scale;
  private _flip: number;
  private _spec!: PAssemblySpec;
  private _addSnappedContentRequsts?: AddContentRequest[];
  
  public prevProcessors: Processor[];
  public postProcessors: Processor[];

  constructor(
    meta: PAssemblyMeta,
    position?: Position,
    rotation?: number | Rotation,
    scale?: Scale,
    host?: unknown,
    flip?: number
  ) {
    super();
    
    this._meta = meta;
    this._schema = meta.userSchema || JSON.parse(JSON.stringify(meta.userFreeData));
    delete this._meta.userSchema;

    if (this._meta.pAssemblyVersion === 1) {
      if (
        this._meta.userFreeData?.assemblies?.[0]?.peerSnappingObjects
      ) {
        this._meta.userFreeData.peerSnappingObjects = 
          this._meta.userFreeData.assemblies[0].peerSnappingObjects;
        delete this._meta.userFreeData.assemblies[0].peerSnappingObjects;
      }
      this._snappedObjects = getNestedProperty(
        ['userFreeData', 'peerSnappingObjects'],
        meta
      ) as SnappedObject[] | null;
    } else {
      this._snappedObjects = getNestedProperty(
        ['userFreeData', 'assemblies', '0', 'peerSnappingObjects'],
        meta
      ) as SnappedObject[] | null;
    }

    this._position = position || { x: 0, y: 0, z: undefined };
    this._rotation = rotation || 0;
    this._host = host;
    this._scale = scale;
    this._flip = flip || 0;
    
    this.prevProcessors = HSCore.Model.PAssemblyProcessor.getPrevProcessorsForNewDataModel();
    this.postProcessors = HSCore.Model.PAssemblyProcessor.getPostProcessorsForNewDataModel();
  }

  private _addPAssembly(spec: PAssemblySpec): void {
    HSCore.Util.Content.addPAssembly(spec);
  }

  public onCommit(): PAssembly {
    const app = HSApp.App.getApp();
    const floorplan = app.floorplan;

    this.prevProcessors.forEach((processor) => {
      processor(this._meta, this._schema);
    });

    const type = (this._schema as { type: string }).type;
    const pAssemblyClass = this.getPAssemblyClass(type);
    const pAssembly = pAssemblyClass.create(this._meta, this._schema);

    this.postProcessors.forEach((processor) => {
      try {
        processor(this._meta, pAssembly);
      } catch (error) {
        console.error(`${processor.name} error: ${error}`);
        const errorMessage = '[Plugin contentedit]: oncommit error';
        app.errorLogger.push(errorMessage, {
          errorStack: new Error(errorMessage),
          description: errorMessage,
          errorInfo: {
            info: error,
            path: {
              file: 'homestyler-tools-web/web/plugin/contentedit/request/addpassemblyrequest.js',
              functionName: 'onCommit()',
            },
          },
        });
      }
    });

    const activeLayer = floorplan.scene.activeLayer;
    this._spec = HSCore.Util.Content.getPAssemblySpec(pAssembly);
    this._spec.host = this._host;
    this._spec.parent = activeLayer;
    this._addPAssembly(this._spec);

    pAssembly.x = this._position.x;
    pAssembly.y = this._position.y;

    if (this._scale) {
      pAssembly.XScale = this._scale.XScale;
      pAssembly.YScale = this._scale.YScale;
      pAssembly.ZScale = this._scale.ZScale;
    }

    if (this._position.z !== undefined) {
      pAssembly.z = this._position.z;
    }

    if (typeof this._rotation === 'number') {
      pAssembly.ZRotation = this._rotation;
    } else {
      pAssembly.XRotation = this._rotation.x || 0;
      pAssembly.YRotation = this._rotation.y || 0;
      pAssembly.ZRotation = this._rotation.z;
    }

    this._createSnappedObject(pAssembly);

    return pAssembly;
  }

  public getPAssemblyClass(type: string): PAssemblyClass {
    const typeMap: Record<string, string> = {};
    typeMap[HSCore.Model.PModelTypes.ePAssembly] = HSConstants.ModelClass.NgPAssembly;
    typeMap[HSCore.Model.PModelTypes.ePSlidingDoor] = HSConstants.ModelClass.NgPSlidingDoor;
    typeMap[HSCore.Model.PModelTypes.ePSlidingDoorLeaf] = HSConstants.ModelClass.NgPSlidingDoorLeaf;
    
    return HSCore.Model.Entity.getClass(typeMap[type]);
  }

  private _createSnappedObject(pAssembly: PAssembly): void {
    if (!this._snappedObjects) {
      return;
    }

    this._addSnappedContentRequsts = [];
    
    this._snappedObjects.forEach((snappedObj) => {
      const request = this._createSnappedObjectRequest(snappedObj, pAssembly);
      if (request) {
        this._addSnappedContentRequsts!.push(request);
      }
    });

    this._addSnappedContentRequsts.forEach((request) => {
      request.onCommit();
    });
  }

  private _createSnappedObjectRequest(
    snappedObj: SnappedObject,
    pAssembly: PAssembly
  ): AddContentRequest | null {
    const seekId = snappedObj.seekId;
    const childId = snappedObj.childId;

    if (!seekId) {
      return null;
    }

    const productMeta = HSApp.App.getApp().catalogManager.getBuildingProductMeta(seekId);
    if (!productMeta) {
      return null;
    }

    let offset: Position | null = null;
    if (snappedObj.offset) {
      offset = { ...snappedObj.offset };
    }

    let position: Position = { x: 0, y: 0, z: 0 };
    let targetAssembly: PAssembly = pAssembly;
    let targetHeight = pAssembly.z + pAssembly.ZLength * pAssembly.ZScale;

    if (childId) {
      const child = pAssembly.getChild(childId);
      if (child) {
        targetAssembly = child;
        if (child instanceof HSCore.Model.PExtruding) {
          targetHeight = HSCore.Util.PAssembly.getPExtrudingHeight(child);
        }
      }
    }

    position = {
      x: pAssembly.x,
      y: pAssembly.y,
      z: targetHeight,
    };

    const contentType = productMeta.contentType;
    const planeZ = getNestedProperty(
      ['metadata', 'extension', 'objInfo', 'planes', 'cbnt_snap_plane', 'points', '0', 'z'],
      productMeta
    ) as number | null;

    if (planeZ) {
      position.z -= planeZ;
    } else if (
      contentType.isTypeOf([
        HSCatalog.ContentTypeEnum.Cabinet,
        HSCatalog.ContentTypeEnum.Sink,
      ])
    ) {
      position.z -= 0.194;
    } else if (
      contentType.isTypeOf([
        HSCatalog.ContentTypeEnum.VentilationWallAttached,
        HSCatalog.ContentTypeEnum.VentilationCeilingAttached,
      ])
    ) {
      position.z = targetAssembly.z;
    }

    if (offset) {
      const rotationValue = typeof this._rotation === 'number' ? this._rotation : this._rotation.z;
      
      if (!HSCore.Util.Math.nearlyEquals(0, rotationValue)) {
        const rotatedPoint = HSCore.Util.Math.rotatePointCW(
          { x: 0, y: 0 },
          offset,
          rotationValue
        );
        offset.x = rotatedPoint.x;
        offset.y = rotatedPoint.y;
      }

      position.x += offset.x;
      position.y += offset.y;
      position.z += offset.z || 0;
    }

    let finalRotation = typeof this._rotation === 'number' ? this._rotation : this._rotation.z;
    if (snappedObj.rotation) {
      finalRotation += snappedObj.rotation.z;
    }

    if (snappedObj.force) {
      if (!Number.isNaN(snappedObj.force.z)) {
        position.z = snappedObj.force.z;
      }
    }

    return HSApp.App.getApp().transManager.createRequest(
      HSFPConstants.RequestType.AddContent,
      [productMeta, position, finalRotation, null, pAssembly]
    );
  }

  public onUndo(): void {
    HSCore.Util.Content.removePAssembly(this._spec.pAssembly);
    
    if (this._addSnappedContentRequsts) {
      this._addSnappedContentRequsts.forEach((request) => {
        request.onUndo();
      });
    }

    super.onUndo();
  }

  public onRedo(): void {
    super.onRedo();

    if (this._addSnappedContentRequsts) {
      this._addSnappedContentRequsts.forEach((request) => {
        request.onRedo();
      });
    }

    this._addPAssembly(this._spec);
  }

  public createPAssembly(meta: PAssemblyMeta, position: Position): void {
    const transManager = HSApp.App.getApp().transManager;
    const request = transManager.createRequest(
      HSFPConstants.RequestType.AddPAssembly,
      [meta, position]
    );
    transManager.commit(request);
  }
}