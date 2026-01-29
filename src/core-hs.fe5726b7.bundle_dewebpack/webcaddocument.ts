interface ComputeOptions {
  isDuringFastComputation?: boolean;
}

interface ExtrudedBody {
  pathData: any;
  value: any;
}

type MoldingData = [
  any[],
  any[],
  any,
  number,
  number,
  boolean
];

interface GraphicsData {
  faces: any[];
}

interface DocumentJSON {
  isDuringFastComputation?: boolean;
  [key: string]: any;
}

declare const WebCADModelAPI: {
  getGraphicsData(documentJSON: DocumentJSON, options?: any, computeOptions?: ComputeOptions): GraphicsData;
  getGraphicsDataAsync(documentJSON: DocumentJSON, options?: any, computeOptions?: ComputeOptions): Promise<GraphicsData>;
  offsetPath(documentJSON: DocumentJSON, pathId: any, offset: any): any;
  addPaths(documentJSON: DocumentJSON, paths: any[]): DocumentJSON;
  addPathsAsync(documentJSON: DocumentJSON, paths: any[]): Promise<DocumentJSON>;
  extrudePath(documentJSON: DocumentJSON, pathData: any, value: any): DocumentJSON;
  extrudePathAsync(documentJSON: DocumentJSON, pathData: any, value: any): Promise<DocumentJSON>;
  addMolding(documentJSON: DocumentJSON, path: any, profile: any, param: any, flag1: boolean, flag2: boolean, enabled: boolean): DocumentJSON;
  addMoldingAsync(documentJSON: DocumentJSON, path: any, profile: any, param: any, flag1: boolean, flag2: boolean, enabled: boolean): Promise<DocumentJSON>;
  setFPMaterialData(documentJSON: DocumentJSON, materialMap: Map<any, any>): DocumentJSON;
  setSnappingPlanes(documentJSON: DocumentJSON, planes: any): any;
  createSnappingOBJ(documentJSON: DocumentJSON): any;
};

declare namespace HSCore.Material {
  class MaterialData {
    toJson(): any;
  }
}

declare namespace THREE {
  class Vector3 {
    type?: string;
  }
  class Vector2 {
    type?: string;
  }
  class Plane {
    type?: string;
  }
}

export class WebCadDocument {
  private _paths: any[] = [];
  private _moldings: Map<any, MoldingData> = new Map();
  private _documentJSON: DocumentJSON;
  private _meshes: any[];
  
  public extrudedBodies: ExtrudedBody[] = [];
  public dirty: boolean = true;

  constructor(documentJSON?: DocumentJSON) {
    this._documentJSON = documentJSON ?? {};
    this._meshes = documentJSON 
      ? WebCADModelAPI.getGraphicsData(this._documentJSON).faces 
      : [];
  }

  addPath(path: any): this {
    this._paths.push(path);
    this.dirty = true;
    return this;
  }

  addPaths(paths: any[]): this {
    paths.forEach(path => {
      this._paths.push(path);
    });
    this.dirty = true;
    return this;
  }

  getOffsetPath(pathId: any, offset: any): any {
    return WebCADModelAPI.offsetPath(this._documentJSON, pathId, offset);
  }

  addMolding(
    key: any,
    paths: any[],
    profiles: any[],
    param: any,
    flag1: number = 0,
    flag2: number = 0,
    enabled: boolean = true
  ): this {
    this._moldings.set(key, [paths, profiles, param, flag1, flag2, enabled]);
    this.dirty = true;
    return this;
  }

  async computeAsync(options?: ComputeOptions): Promise<any[]> {
    const addTypeAnnotations = (obj: any): void => {
      for (const key in obj) {
        const value = obj[key];
        if (typeof value === "object") {
          if (value instanceof THREE.Vector3) {
            value.type = "Vector3";
          } else if (value instanceof THREE.Vector2) {
            value.type = "Vector2";
          } else if (value instanceof THREE.Plane) {
            value.type = "Plane";
            addTypeAnnotations(value);
          } else {
            addTypeAnnotations(value);
          }
        }
      }
    };

    if (this.dirty) {
      this.dirty = false;

      if (options?.isDuringFastComputation) {
        this._documentJSON.isDuringFastComputation = options.isDuringFastComputation;
      }

      addTypeAnnotations(this._paths);
      this._documentJSON = await WebCADModelAPI.addPathsAsync(this._documentJSON, this._paths);
      this._paths = [];

      const extrudePromises: Promise<void>[] = [];
      const extrudeBody = async (body: ExtrudedBody): Promise<void> => {
        if (options?.isDuringFastComputation) {
          this._documentJSON.isDuringFastComputation = options.isDuringFastComputation;
        }
        this._documentJSON = await WebCADModelAPI.extrudePathAsync(
          this._documentJSON,
          body.pathData,
          body.value
        );
      };

      for (let i = 0, length = this.extrudedBodies.length; i < length; i++) {
        addTypeAnnotations(this.extrudedBodies[i]);
        extrudePromises.push(extrudeBody(this.extrudedBodies[i]));
      }

      await Promise.all(extrudePromises);
      this.extrudedBodies = [];

      const moldingPromises: Promise<void>[] = [];
      const addMoldingAsync = async (
        moldingData: MoldingData,
        path: any,
        profile: any
      ): Promise<void> => {
        if (options?.isDuringFastComputation) {
          this._documentJSON.isDuringFastComputation = options.isDuringFastComputation;
        }
        this._documentJSON = await WebCADModelAPI.addMoldingAsync(
          this._documentJSON,
          path,
          profile,
          moldingData[2],
          !!(1 & moldingData[4]),
          !!(1 & moldingData[3]),
          moldingData[5]
        );
      };

      this._moldings.forEach(moldingData => {
        addTypeAnnotations(moldingData);
        const paths = moldingData[0];
        const profiles = moldingData[1];
        for (let i = 0, length = paths.length; i < length; i++) {
          moldingPromises.push(addMoldingAsync(moldingData, paths[i], profiles[i]));
        }
      });

      await Promise.all(moldingPromises);
      this._moldings.clear();

      const graphicsData = await WebCADModelAPI.getGraphicsDataAsync(
        this._documentJSON,
        undefined,
        options
      );
      this._meshes = graphicsData.faces;
    }

    return this._meshes ?? [];
  }

  compute(options?: ComputeOptions): void {
    if (this.dirty) {
      if (options?.isDuringFastComputation) {
        this._documentJSON.isDuringFastComputation = options.isDuringFastComputation;
      }

      this._documentJSON = WebCADModelAPI.addPaths(this._documentJSON, this._paths);
      this._paths = [];

      this.extrudedBodies.forEach(body => {
        if (options?.isDuringFastComputation) {
          this._documentJSON.isDuringFastComputation = options.isDuringFastComputation;
        }
        this._documentJSON = WebCADModelAPI.extrudePath(
          this._documentJSON,
          body.pathData,
          body.value
        );
      });
      this.extrudedBodies = [];

      this._moldings.forEach(moldingData => {
        const paths = moldingData[0];
        const profiles = moldingData[1];
        for (let i = 0; i < paths.length; ++i) {
          if (options?.isDuringFastComputation) {
            this._documentJSON.isDuringFastComputation = options.isDuringFastComputation;
          }
          this._documentJSON = WebCADModelAPI.addMolding(
            this._documentJSON,
            paths[i],
            profiles[i],
            moldingData[2],
            !!(1 & moldingData[4]),
            !!(1 & moldingData[3]),
            moldingData[5]
          );
        }
      });
      this._moldings.clear();

      const graphicsData = WebCADModelAPI.getGraphicsData(
        this._documentJSON,
        undefined,
        options
      );
      this._meshes = graphicsData.faces;
      this.dirty = false;
    }
  }

  addExtrudedBody(pathData: any, value: any): this {
    this.extrudedBodies.push({ pathData, value });
    this.dirty = true;
    return this;
  }

  setFPMaterialData(materialDataMap: Map<any, any>): DocumentJSON {
    const jsonMap = new Map<any, any>();
    for (const [key, value] of materialDataMap) {
      if (value instanceof HSCore.Material.MaterialData) {
        jsonMap.set(key, value.toJson());
      } else {
        jsonMap.set(key, value);
      }
    }
    this._documentJSON = WebCADModelAPI.setFPMaterialData(this._documentJSON, jsonMap);
    return this._documentJSON;
  }

  setSnappingPlanes(planes: any): any {
    return WebCADModelAPI.setSnappingPlanes(this._documentJSON, planes);
  }

  createSnappingOBJ(): any {
    this._documentJSON.isDuringFastComputation = true;
    return WebCADModelAPI.createSnappingOBJ(this._documentJSON);
  }

  getGraphicsData(options?: ComputeOptions): any[] {
    this.compute(options);
    return this._meshes ?? [];
  }

  async getGraphicsDataAsync(options?: ComputeOptions): Promise<any[]> {
    return this.computeAsync(options)
      .then(meshes => meshes ?? [])
      .catch(() => {
        this.compute(options);
        return new Promise<any[]>(resolve => {
          this._meshes = this._meshes ?? [];
          resolve(this._meshes);
        });
      });
  }

  getDocumentJSON(): DocumentJSON {
    this.compute();
    return this._documentJSON;
  }
}