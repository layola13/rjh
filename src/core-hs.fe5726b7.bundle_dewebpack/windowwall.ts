import { ExtrudedBody_IO, ExtrudedBody } from './ExtrudedBody';
import { Entity } from './Entity';
import { EntityField } from './decorators';
import { MaterialData } from './MaterialData';

interface WindowWallParameters {
  innerFrom: THREE.Vector3;
  innerTo: THREE.Vector3;
  outerFrom: THREE.Vector3;
  outerTo: THREE.Vector3;
  elevation: number;
  height: number;
  innerMaterialData?: unknown;
  materialData?: MaterialData;
  points?: THREE.Vector3[];
  direction?: THREE.Vector3;
}

export class WindowWall_IO extends ExtrudedBody_IO {
  load(entity: any, data: any, context: any): void {
    super.load(entity, data, context);
    const parameters = data.parameters;
    
    if (parameters?.innerMaterialData) {
      entity.setMaterial("sideface0", parameters.innerMaterialData);
    } else {
      const materialManager = HSCore.Material.Manager.instance();
      entity.setMaterial("sideface0", materialManager.getDefaultMaterialData("DEFAULT_WALL_WHITE_PAINT").clone());
    }
  }
}

export class WindowWall extends ExtrudedBody {
  @EntityField()
  declare parameters: WindowWallParameters;

  constructor(name: string = "", data?: any) {
    super(name, data);
    this.parameters.innerFrom = new THREE.Vector3(0, 0, 0);
    this.parameters.innerTo = new THREE.Vector3(0, 0, 0);
    this.parameters.outerFrom = new THREE.Vector3(0, 0, 0);
    this.parameters.outerTo = new THREE.Vector3(0, 0, 0);
    this.parameters.elevation = 0;
    this.parameters.height = 0;
  }

  initByParameters(parameters: WindowWallParameters): void {
    parameters.direction = new THREE.Vector3(0, 0, 1);
    super.initByParameters(parameters);
    this.parameters.materialData = MaterialData.create(HSConstants.Constants.DEFAULT_WALL_INNER_MATERIAL);
    this.addSnappingFaceKey("sideface0");
  }

  onParametersChanged(): void {
    super.onParametersChanged();
    const params = this.parameters;
    
    if (params.innerMaterialData) {
      this.setMaterial("sideface0", params.innerMaterialData);
    } else {
      const materialManager = HSCore.Material.Manager.instance();
      this.setMaterial("sideface0", materialManager.getDefaultMaterialData("DEFAULT_WALL_WHITE_PAINT").clone());
    }
    
    if (params.innerFrom && params.innerTo && params.outerTo && params.outerFrom) {
      this.parameters.points = [params.innerFrom, params.innerTo, params.outerTo, params.outerFrom];
    }
  }

  getIO(): WindowWall_IO {
    return WindowWall_IO.instance();
  }
}

Entity.registerClass(HSConstants.ModelClass.NgParametricWall, WindowWall);