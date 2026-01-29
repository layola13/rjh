import { ParametricModel_IO, ParametricModel } from './ParametricModel';
import { Entity } from './Entity';
import { EntityField } from './decorators';

interface WindowParameters {
  from: THREE.Vector3;
  to: THREE.Vector3;
  elevation: number;
  height: number;
  window?: {
    materialData?: {
      seamWidth: number;
    };
  };
}

export class WindowFrame_IO extends ParametricModel_IO {
  
}

export class WindowFrame extends ParametricModel {
  @EntityField()
  parameters!: WindowParameters;

  constructor(id: string = "", parent?: unknown) {
    super(id, parent);
    
    this.parameters = {
      from: new THREE.Vector3(0, 0, 0),
      to: new THREE.Vector3(0, 0, 0),
      elevation: 0,
      height: 0
    };
  }

  initByParameters(params: WindowParameters): void {
    super.initByParameters(params);
    
    if (params.window?.materialData) {
      params.window.materialData.seamWidth = 0;
    }
  }

  getIO(): WindowFrame_IO {
    return WindowFrame_IO.instance();
  }
}

Entity.registerClass(HSConstants.ModelClass.NgParametricWindow, WindowFrame);