import { ExtrudedBody_IO, ExtrudedBody } from './ExtrudedBody';
import { Entity } from './Entity';
import { EntityField } from './decorators';

enum WindowSillSideType {
  INNER = "inner",
  OUTER = "outer",
  DOUBLE = "double"
}

class WindowSill_IO extends ExtrudedBody_IO {}

interface WindowSillParameters {
  direction?: THREE.Vector3;
  points?: Array<unknown>;
  moldingIndices?: number[];
  moldingFlip?: boolean;
  side?: WindowSillSideType;
  extendValue?: number;
  secondExtendValue?: number;
}

class WindowSill extends ExtrudedBody {
  @EntityField()
  parameters!: WindowSillParameters;

  constructor(id: string = "", params?: WindowSillParameters) {
    super(id, params);
  }

  initByParameters(params: WindowSillParameters): void {
    super.initByParameters(params);
    
    this.parameters.direction = new THREE.Vector3(0, 0, 1);
    
    if (params.points) {
      this.parameters.moldingIndices = [1, 0, params.points.length - 2];
    }
    
    if (params.moldingIndices === undefined) {
      this.parameters.moldingIndices = [];
    }
    
    if (params.moldingFlip === undefined) {
      this.parameters.moldingFlip = true;
    }
    
    this.addSnappingFaceKey("extrudedface");
    this.parameters.side = params.side ?? WindowSillSideType.INNER;
  }

  get side(): WindowSillSideType {
    return this.parameters.side ?? WindowSillSideType.INNER;
  }

  get innerExtend(): number {
    return this.parameters.extendValue ?? 0;
  }

  get outerExtend(): number {
    return this.parameters.secondExtendValue ?? 0;
  }

  getIO(): WindowSill_IO {
    return WindowSill_IO.instance();
  }
}

Entity.registerClass(HSConstants.ModelClass.NgParametricWindowSill, WindowSill);

export { WindowSill, WindowSill_IO, WindowSillSideType };