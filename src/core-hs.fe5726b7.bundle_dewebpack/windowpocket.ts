import { ParametricModel_IO, ParametricModel } from './ParametricModel';
import { Entity } from './Entity';
import { EntityField } from './EntityField';
import { PocketSideType } from './PocketSideType';

interface WindowPocketParameters {
  outerMoldingSizeX?: number;
  outerMoldingSizeY?: number;
  side?: PocketSideType;
  profileData: {
    profileSizeX: number;
    profileSizeY: number;
  };
}

interface LoadOptions {
  [key: string]: unknown;
}

export class WindowPocket_IO extends ParametricModel_IO {
  private static _instance: WindowPocket_IO;

  static instance(): WindowPocket_IO {
    if (!WindowPocket_IO._instance) {
      WindowPocket_IO._instance = new WindowPocket_IO();
    }
    return WindowPocket_IO._instance;
  }

  load(
    entity: WindowPocket,
    source: { parameters: WindowPocketParameters },
    options: LoadOptions = {}
  ): void {
    super.load(entity, source, options);

    if (!entity.parameters.outerMoldingSizeX) {
      entity.parameters.outerMoldingSizeX = source.parameters.profileData.profileSizeX;
    }

    if (!entity.parameters.outerMoldingSizeY) {
      entity.parameters.outerMoldingSizeY = source.parameters.profileData.profileSizeY;
    }
  }
}

export class WindowPocket extends ParametricModel {
  @EntityField()
  parameters!: WindowPocketParameters;

  @EntityField({
    get(this: WindowPocket): PocketSideType {
      return this.parameters.side ?? PocketSideType.Inner;
    },
    partialSet(this: WindowPocket, value: PocketSideType): void {
      this.parameters.side = value;
      const parent = this.getFirstParentOfNonTypes([HSCore.Model.Layer]);
      parent?.buildPartsInfo();
    }
  })
  side!: PocketSideType;

  constructor(id: string = "", parent?: unknown) {
    super(id, parent);
  }

  initByParameters(params: WindowPocketParameters): void {
    super.initByParameters(params);
    this.parameters.outerMoldingSizeX = params.profileData.profileSizeX;
    this.parameters.outerMoldingSizeY = params.profileData.profileSizeY;
  }

  getDefaultSide(): PocketSideType {
    let defaultSide: PocketSideType = PocketSideType.Both;

    const parent = this.getFirstParentOfNonTypes([HSCore.Model.Layer]);
    const host = parent?.getHost();

    if (host instanceof HSCore.Model.Wall) {
      const wallInfo = HSCore.Doc.getDocManager().geometryManager.getWallInfo(host);
      
      if (wallInfo && !wallInfo.shared && wallInfo.outerWallSide) {
        defaultSide = PocketSideType.Inner;
      }
    }

    return defaultSide;
  }

  getIO(): WindowPocket_IO {
    return WindowPocket_IO.instance();
  }
}

Entity.registerClass(HSConstants.ModelClass.NgParametricWindowPocket, WindowPocket);