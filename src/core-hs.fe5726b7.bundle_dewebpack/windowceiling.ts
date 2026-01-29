import { ExtrudedBody_IO, ExtrudedBody } from './ExtrudedBody';
import { Entity } from './Entity';
import { MaterialData } from './MaterialData';

class WindowCeiling_IO extends ExtrudedBody_IO {
  load(entity: WindowCeiling, data: unknown, context: unknown): void {
    super.load(entity, data, context);
    entity.onParametersChanged();
  }

  static instance(): WindowCeiling_IO {
    return new WindowCeiling_IO();
  }
}

interface WindowCeilingParameters {
  direction?: THREE.Vector3;
  materialData?: MaterialData;
  innerMaterialData?: MaterialData;
}

class WindowCeiling extends ExtrudedBody {
  declare parameters: WindowCeilingParameters;

  constructor(id: string = '', type?: unknown) {
    super(id, type);
  }

  initByParameters(params: WindowCeilingParameters): void {
    params.direction = new THREE.Vector3(0, 0, -1);
    super.initByParameters(params);
    this.addSnappingFaceKey('extrudedface');
    this.parameters.materialData = MaterialData.create(
      HSConstants.Constants.DEFAULT_WALL_INNER_MATERIAL
    );
  }

  getIO(): WindowCeiling_IO {
    return WindowCeiling_IO.instance();
  }

  onParametersChanged(): void {
    super.onParametersChanged();
    const params = this.parameters;

    if (params?.innerMaterialData) {
      this.setMaterial('extrudedface', params.innerMaterialData);
    } else {
      const materialManager = HSCore.Material.Manager.instance();
      this.setMaterial(
        'extrudedface',
        materialManager.getDefaultMaterialData('DEFAULT_WALL_WHITE_PAINT').clone()
      );
    }
  }
}

Entity.registerClass(HSConstants.ModelClass.NgParametricWindowCeiling, WindowCeiling);

export { WindowCeiling_IO, WindowCeiling };