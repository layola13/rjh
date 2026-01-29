import { CustomizedFeatureModel_IO, CustomizedFeatureModel } from './CustomizedFeatureModel';
import { Entity } from './Entity';
import * as THREE from 'three';

interface LoadOptions {
  version?: string;
}

export class CustomizedBackgroundWall_IO extends CustomizedFeatureModel_IO {
  load(
    entity: CustomizedBackgroundWall,
    data: unknown,
    options: LoadOptions = {}
  ): void {
    super.load(entity, data, options);

    if (HSCore.Util.Version.isEarlierThan(options.version, '0.28')) {
      const sketch = entity.sketch;
      const height = sketch.bound.getSize().height;
      const translationMatrix = new THREE.Matrix3().translate(0, height);
      sketch.transform(translationMatrix);

      let inverseConvertMatrix = new THREE.Matrix4().getInverse(
        sketch.convert3dMatrix
      );
      inverseConvertMatrix.premultiply(
        new THREE.Matrix4().makeTranslation(0, height, 0)
      );
      inverseConvertMatrix = new THREE.Matrix4().getInverse(
        inverseConvertMatrix
      );
      sketch.convert3dMatrix = inverseConvertMatrix;
    }
  }
}

export class CustomizedBackgroundWall extends CustomizedFeatureModel {
  constructor(id: string = '', parent: unknown = undefined) {
    super(id, parent);
  }

  getIO(): CustomizedBackgroundWall_IO {
    return CustomizedBackgroundWall_IO.instance();
  }

  protected _getZOffsetScale(): number {
    return 0.5;
  }
}

Entity.registerClass(
  HSConstants.ModelClass.CustomizedBackgroundWall,
  CustomizedBackgroundWall
);