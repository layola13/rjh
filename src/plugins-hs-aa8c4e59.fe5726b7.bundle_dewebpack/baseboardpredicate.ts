import { Predicate } from './Predicate';
import { ModelClassName } from './ModelClassName';

interface ModelType {
  classType: string;
  contentType?: string;
}

interface ModelCategory {
  categoryType: string;
}

interface ModelEntity {
  type: ModelType;
  category?: ModelCategory;
}

export class TypePredicate extends Predicate {
  protected classType: string;
  protected contentType?: string;
  protected categoryType?: string;

  constructor(classType: string, contentType?: string, categoryType?: string) {
    super();
    this.classType = classType;
    this.contentType = contentType;
    this.categoryType = categoryType;
  }

  execute(entity: ModelEntity): boolean {
    return (
      entity.type.classType === this.classType &&
      (!this.contentType || entity.type.contentType === this.contentType) &&
      !(this.categoryType && (!entity.category || entity.category.categoryType !== this.categoryType))
    );
  }
}

export class LayerPredicate extends TypePredicate {
  constructor() {
    super(ModelClassName.Layer);
  }
}

export class RoomPredicate extends TypePredicate {
  constructor() {
    super(ModelClassName.Room);
  }
}

export class TypeArrayPredicate extends Predicate {
  protected classTypes: Set<string>;
  protected contentType?: string;
  protected categoryType?: string;

  constructor(classTypes: string[], contentType?: string, categoryType?: string) {
    super();
    this.contentType = contentType;
    this.categoryType = categoryType;
    this.classTypes = new Set(classTypes);
  }

  execute(entity: ModelEntity): boolean {
    return (
      this.classTypes.has(entity.type.classType) &&
      (!this.contentType || entity.type.contentType === this.contentType) &&
      !(this.categoryType && (!entity.category || entity.category.categoryType !== this.categoryType))
    );
  }
}

export class FacePredicate extends TypeArrayPredicate {
  constructor() {
    super([ModelClassName.NgFloor, ModelClassName.NgFace, ModelClassName.NgCeiling]);
  }
}

export class WallPredicate extends TypePredicate {
  constructor() {
    super(ModelClassName.NgWall);
  }
}

export class SlabPredicate extends TypePredicate {
  constructor() {
    super(ModelClassName.Slab);
  }
}

export class PavePredicate extends TypePredicate {
  constructor() {
    super(ModelClassName.MixPaint);
  }
}

export class OpeningPredicate extends TypeArrayPredicate {
  constructor() {
    super([
      ModelClassName.NgHole,
      ModelClassName.NgDoor,
      ModelClassName.NgWindow,
      ModelClassName.NgOpening
    ]);
  }
}

export class ParametricWindowPredicate extends TypeArrayPredicate {
  constructor() {
    super([
      ModelClassName.NgCornerWindow,
      ModelClassName.NgBayWindow,
      ModelClassName.NgCornerFlatWindow,
      ModelClassName.NgPOrdinaryWindow
    ]);
  }
}

export class ParametricOpeningPredicate extends TypeArrayPredicate {
  constructor() {
    super([ModelClassName.ParametricOpening]);
  }
}

export class PocketPredicate extends TypePredicate {
  constructor() {
    super(ModelClassName.NgPocket);
  }
}

export class ParametricPocketPredicate extends TypeArrayPredicate {
  constructor() {
    super([
      ModelClassName.NgParametricWindowPocket,
      ModelClassName.NCustomizedModelMolding
    ]);
  }
}

export class ContentPredicate extends TypeArrayPredicate {
  constructor() {
    super([
      ModelClassName.NgContent,
      ModelClassName.NgSoftCloth,
      ModelClassName.NgCurtain
    ]);
  }
}

export class NormalMoldingPredicate extends TypeArrayPredicate {
  constructor() {
    super([
      ModelClassName.NgMolding,
      ModelClassName.NgWallMolding,
      ModelClassName.NgCornice,
      ModelClassName.NgBaseboard
    ]);
  }
}

export class CustomizedMoldingPredicate extends TypeArrayPredicate {
  constructor() {
    super([
      ModelClassName.CustomizedModelMolding,
      ModelClassName.CustomizedModelLightSlot,
      ModelClassName.CustomizedModelLightBand
    ]);
  }
}

export class NCustomizedMoldingPredicate extends TypeArrayPredicate {
  constructor() {
    super([
      ModelClassName.NCustomizedModelMolding,
      ModelClassName.NCustomizedModelLightSlot,
      ModelClassName.NCustomizedModelLightBand
    ]);
  }
}

export class CornicePredicate extends TypeArrayPredicate {
  constructor() {
    super([ModelClassName.NgCornice]);
  }
}

export class BaseboardPredicate extends TypeArrayPredicate {
  constructor() {
    super([ModelClassName.NgBaseboard]);
  }
}

export class CustomizedBackgroundWallPredicate extends TypeArrayPredicate {
  constructor() {
    super([
      ModelClassName.NCustomizedBackgroundWall,
      ModelClassName.CustomizedBackgroundWall
    ]);
  }
}

export class CustomizedCeilingPredicate extends TypeArrayPredicate {
  constructor() {
    super([
      ModelClassName.NCustomizedCeilingModel,
      ModelClassName.CustomizedCeilingModel
    ]);
  }
}

export class CustomizedPlatformPredicate extends TypeArrayPredicate {
  constructor() {
    super([
      ModelClassName.NCustomizedPlatform,
      ModelClassName.CustomizedPlatform
    ]);
  }
}

export class ConcealedWorkPredicate extends TypePredicate {
  constructor() {
    super(ModelClassName.ConcealedWork);
  }
}

export class NParametricWindowSillPredicate extends TypeArrayPredicate {
  constructor() {
    super([ModelClassName.NgParametricWindowSill]);
  }
}