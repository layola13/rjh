import { MathUtil } from './MathUtil';
import { HSCore } from './HSCore';

export enum OptionTypeEnum {
  Translate = "translate",
  TransformAlone = "transformAlone",
  MultipleScale = "multipleScale",
  ReplaceParent = "replaceParent",
  ReplaceHost = "replaceHost"
}

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface MoveEntity {
  content: any;
  position: Vector3;
  scale: Vector3;
}

interface TranslateOption {
  offset?: Vector3;
}

interface TransformAloneOption {
  trans?: Array<{
    content: any;
    scale?: Vector3;
    rotation?: Vector3;
    position?: Vector3;
  }>;
}

interface MultipleScaleOption {
  center?: Vector3;
  scale?: number;
}

interface ReplaceParentOption {
  parentLayer?: any;
}

interface ReplaceHostOption {
  host?: any;
}

type TransformOption = 
  | TranslateOption 
  | TransformAloneOption 
  | MultipleScaleOption 
  | ReplaceParentOption 
  | ReplaceHostOption;

export class TransformInHardDecorationRequest extends HSCore.Transaction.Common.StateRequest {
  private _moveEntities: MoveEntity[];

  constructor(moveEntities: MoveEntity[]) {
    super();
    this._moveEntities = moveEntities;
  }

  onCommit(): any[] {
    this._updateContent();
    return super.onCommit([]);
  }

  onReceive(optionType: OptionTypeEnum, option: TransformOption): boolean {
    switch (optionType) {
      case OptionTypeEnum.Translate:
        if ((option as TranslateOption).offset) {
          this._moveContent((option as TranslateOption).offset!);
        }
        return true;

      case OptionTypeEnum.TransformAlone:
        if ((option as TransformAloneOption).trans) {
          this._transFormContent((option as TransformAloneOption).trans!);
        }
        return true;

      case OptionTypeEnum.MultipleScale:
        const multiScaleOpt = option as MultipleScaleOption;
        if (multiScaleOpt.center && multiScaleOpt.scale) {
          this._scaleMultiContents(multiScaleOpt.center, multiScaleOpt.scale);
        }
        return true;

      case OptionTypeEnum.ReplaceParent:
        if ((option as ReplaceParentOption).parentLayer) {
          this._replaceParent((option as ReplaceParentOption).parentLayer!);
        }
        return true;

      case OptionTypeEnum.ReplaceHost:
        if ((option as ReplaceHostOption).host) {
          this._replaceHost((option as ReplaceHostOption).host!);
        }
        return true;

      default:
        return super.onReceive(optionType, option);
    }
  }

  private _moveContent(offset: Vector3): void {
    this._moveEntities.forEach((entity) => {
      this._setPosition(entity.content, entity.position.added(offset));
    });
  }

  private _scaleMultiContents(center: Vector3, scale: number): void {
    const contents = this._moveEntities.map((entity) => entity.content);
    HSCore.Util.NCPBackgroundWallBase.resizeParametricWalls(contents, center, scale);
  }

  private _transFormContent(transformations: Array<{
    content: any;
    scale?: Vector3;
    rotation?: Vector3;
    position?: Vector3;
  }>): void {
    transformations.forEach((trans) => {
      const entity = this._moveEntities.find((e) => e.content === trans.content);
      if (entity) {
        if (trans.scale) {
          this._setScale(entity.content, trans.scale);
        }
        if (trans.rotation) {
          this._setRotation(entity.content, trans.rotation);
        }
        if (trans.position) {
          this._setPosition(entity.content, trans.position);
        }
      }
    });
  }

  private _replaceParent(parentLayer: any): void {
    this._moveEntities.forEach((entity) => {
      if (entity.content.replaceParent) {
        entity.content.replaceParent(parentLayer);
      }
    });
  }

  private _replaceHost(host: any): void {
    this._moveEntities.forEach((entity) => {
      if (entity.content.getHost() !== host && entity.content.assignTo) {
        entity.content.assignTo(host);
      }
    });
  }

  private _setPosition(content: any, position: Vector3): void {
    if (!MathUtil.isNearlyEqual(content.x, position.x)) {
      content.x = position.x;
    }
    if (!MathUtil.isNearlyEqual(content.y, position.y)) {
      content.y = position.y;
    }
    if (!MathUtil.isNearlyEqual(content.z, position.z)) {
      content.z = position.z;
    }
  }

  private _setScale(content: any, scale: Vector3): void {
    if (!MathUtil.isNearlyEqual(content.XScale, scale.x)) {
      content.XScale = scale.x;
    }
    if (!MathUtil.isNearlyEqual(content.YScale, scale.y)) {
      content.YScale = scale.y;
    }
    if (!MathUtil.isNearlyEqual(content.ZScale, scale.z)) {
      content.ZScale = scale.z;
    }
  }

  private _setRotation(content: any, rotation: Vector3): void {
    if (!MathUtil.isNearlyEqual(content.XRotation, rotation.x)) {
      content.XRotation = rotation.x;
    }
    if (!MathUtil.isNearlyEqual(content.YRotation, rotation.y)) {
      content.YRotation = rotation.y;
    }
    if (!MathUtil.isNearlyEqual(content.ZRotation, rotation.z)) {
      content.ZRotation = rotation.z;
    }
  }

  private _updateContent(): void {
    this._moveEntities.forEach((entity) => {
      const content = entity.content;
      if (content instanceof HSCore.Model.NCPBackgroundWallBase) {
        const isScaleUnchanged = 
          MathUtil.isNearlyEqual(entity.scale.x, content.XScale) &&
          MathUtil.isNearlyEqual(entity.scale.y, content.YScale) &&
          MathUtil.isNearlyEqual(entity.scale.z, content.ZScale);

        if (isScaleUnchanged) {
          content.dirtyClipGeometry();
          content.dirtyChildModels(true, false, true);
        } else {
          content.initBySize();
        }
      }
    });
    this._updateWallFaceAssemblyBound();
  }

  private _updateWallFaceAssemblyBound(): void {
    const assemblySet = new Set<any>();
    const decorator = new HSCore.Model.WallFaceAssemblyDecorator();
    
    this._moveEntities.forEach((entity) => {
      const assembly = decorator.getWallFaceAssemblyParent(entity.content);
      if (assembly) {
        assemblySet.add(assembly);
      }
    });

    assemblySet.forEach((assembly) => {
      assembly.dirtyPosition();
      assembly.bound;
    });
  }

  undo(): void {
    super.undo();
    this._updateWallFaceAssemblyBound();
  }

  redo(): void {
    super.redo();
    this._updateWallFaceAssemblyBound();
  }

  getDescription(): string {
    return "移动硬装物品";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}