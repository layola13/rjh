import { Opening, Opening_IO } from './Opening';
import { Entity } from './Entity';
import { Manager } from './Manager';
import { WindowSill, WindowSillSideType } from './WindowSill';
import { Wall } from './Wall';
import { ParametricModel } from './ParametricModel';
import { PocketSideType } from './Pocket';
import { Logger } from './Logger';
import { NCustomizedParametricRoof } from './NCustomizedParametricRoof';

interface WindowLoadData {
  __indent?: number;
  __thickness: number;
}

interface ModelMetadata {
  type: string;
  [key: string]: unknown;
}

interface UserFreeData {
  models?: ModelMetadata[];
}

interface WindowMetadata {
  userFreeData?: UserFreeData;
}

interface PartInfo {
  partName: string;
  [key: string]: unknown;
}

interface SillPartInfo {
  points: THREE.Vector2[];
  innerSillPoints: THREE.Vector2[];
  outerSillPoints: THREE.Vector2[];
  doubleSillPoints: THREE.Vector2[];
  elevation: number;
  moldingIndices: number[];
  secondMoldingIndices: number[];
  outerMoldingIndices: number[];
  moldingFlip: boolean;
}

interface BoundingsInfo {
  outline: THREE.Vector2[];
  innerBound: THREE.Vector2[];
  innerPoints: THREE.Vector2[];
  outerPoints: THREE.Vector2[];
}

interface PartsInfo {
  Sill?: SillPartInfo;
  boundings?: BoundingsInfo;
}

interface BuildOptions {
  previewDirty?: boolean;
}

export class Window_IO extends Opening_IO {
  load(data: WindowLoadData, context: unknown, options: unknown): void {
    const windowData = data;
    super.load(windowData, context, options);
    
    if (!windowData.__indent) {
      windowData.__indent = windowData.__thickness / 2;
    }
  }
}

export class Window extends Opening {
  private partsInfo?: PartsInfo;
  private _boundDirty = false;

  constructor(id = '', metadata?: WindowMetadata) {
    super(id, metadata);
    this.topView = HSConstants.Resources?.svgs.default_window_symbol;
    this.z = HSConstants.Constants.DEFAULT_WINDOW_ELEVATION;
  }

  getWindowSills(): WindowSill[] {
    const sills: WindowSill[] = [];
    this.forEachChild((child: Entity) => {
      if (child instanceof WindowSill) {
        sills.push(child);
      }
    }, this);
    return sills;
  }

  getWindowSill(): WindowSill | null {
    const sills = this.getWindowSills();
    DEBUG && Logger.console.assert(sills.length < 2, 'wrong window sill numbers');
    return sills.length > 0 ? sills[0] : null;
  }

  addSill(): void {
    if (this.isShowSill()) return;
    
    let sill = this.getWindowSill();
    if (!sill) {
      sill = this.createWindowSill();
      if (sill) {
        this.addChild(sill);
      }
    }
    
    if (sill) {
      sill.setFlagOff(HSCore.Model.EntityFlagEnum.hidden);
      this.buildPartsInfo();
    } else {
      Logger.console.assert(false, 'error get or create windowSill');
    }
  }

  removeSill(): void {
    this.getWindowSills().forEach((sill: WindowSill) => {
      this.removeChild(sill);
    });
    
    if (this.isShowPocket()) {
      this.getPocket().dirtyGeometry();
    }
  }

  canAddSill(): boolean {
    return !this.contentType || !this.contentType.isTypeOf(HSCatalog.ContentTypeEnum.BayWindow);
  }

  isShowSill(): boolean {
    const sill = this.getWindowSill();
    return !!sill && sill.isFlagOff(HSCore.Model.EntityFlagEnum.hidden);
  }

  getSillHeight(): number {
    const sill = this.getWindowSill();
    return sill?.parameters?.height || 0;
  }

  createWindowSill(): ParametricModel | null {
    const metadata = this.metadata as WindowMetadata;
    const userFreeData = metadata?.userFreeData;
    const models = userFreeData?.models;
    let windowSillMeta: ModelMetadata = HSConstants.Constants.DEFAULT_WINDOWSILL_MODEL_META;
    
    if (models && models.length > 0) {
      for (const model of models) {
        if (model.type === 'windowSill') {
          windowSillMeta = model;
          break;
        }
      }
    }
    
    return Manager.instance().createParametricModel(windowSillMeta);
  }

  getIndentVector(): HSCore.Util.Math.Vec2 {
    return this.getIndentDirection().setLength(this.indent - this.thickness / 2);
  }

  getIndentVector3(): THREE.Vector3 {
    return this.getIndentDirection3().multiply(this.indent - this.thickness / 2);
  }

  protected _setThickness(thickness: number): void {
    if (this.__thickness !== thickness) {
      this.__indent = thickness / 2;
    }
    super._setThickness(thickness);
  }

  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void {
    super.onFieldChanged(fieldName, newValue, oldValue);
    
    if (fieldName === 'XScale' || fieldName === 'YScale' || fieldName === 'ZScale') {
      this.buildPartsInfo();
    }
    
    this._boundDirty = true;
  }

  onPocketAdded(): void {
    super.onPocketAdded();
    this.buildPartsInfo();
  }

  onPocketRemoved(): void {
    super.onPocketRemoved();
    this.buildPartsInfo();
  }

  onPocketSizeChanged(): void {
    super.onPocketSizeChanged();
    this.buildPartsInfo();
  }

  onHostChanged(): void {
    super.onHostChanged();
    this.buildPartsInfo();
  }

  getWindowSillSide(): WindowSillSideType {
    const sills = this.getWindowSills();
    DEBUG && Logger.console.assert(sills.length < 2, 'wrong window sill numbers');
    const sill = sills.length > 0 ? sills[0] : null;
    return sill ? sill.side : WindowSillSideType.INNER;
  }

  buildPartsInfo(parts?: PartInfo[], options?: BuildOptions): void {
    const partInfoMap: Record<string, PartInfo> = {};
    
    if (parts) {
      parts.forEach((part: PartInfo) => {
        partInfoMap[part.partName] = part;
      });
    } else {
      Object.values(this.children).forEach((child: Entity) => {
        if (child instanceof ParametricModel) {
          partInfoMap[child.parameters.partName] = child.parameters;
        }
      });
    }
    
    if (!partInfoMap.Sill) return;
    
    const toVector2 = (vec: { x: number; y: number }): THREE.Vector2 => {
      return new THREE.Vector2(vec.x, vec.y);
    };
    
    const host = this.getHost();
    if (!(host instanceof Wall || host instanceof NCustomizedParametricRoof)) return;
    
    let hostThickness = 0;
    if (host instanceof Wall) {
      hostThickness = host ? host.width : HSConstants.Constants.MAX_WALL_THICKNESS;
    } else if (host instanceof NCustomizedParametricRoof) {
      hostThickness = (host.getThickness(this.getHostRoofFaceId()) ?? 0) / 1000;
    }
    
    const rightVector = new HSCore.Util.Math.Vec2(1, 0);
    const forwardVector = rightVector.clone().invert().clone().rotate(Math.PI / 2);
    const startPoint = new HSCore.Util.Math.Vec2().add(forwardVector.clone().scale(-this.indent));
    const windowWidth = this.XSize;
    const sillDepth = hostThickness - this.indent;
    
    const innerRightFront = toVector2(startPoint.clone().add(rightVector.clone().scale(windowWidth / 2)).add(forwardVector.clone().scale(hostThickness - sillDepth)));
    const outerRightFront = toVector2(startPoint.clone().add(rightVector.clone().scale(windowWidth / 2)).add(forwardVector.clone().scale(hostThickness)));
    const innerLeftFront = toVector2(startPoint.clone().add(rightVector.clone().invert().scale(windowWidth / 2)).add(forwardVector.clone().scale(hostThickness - sillDepth)));
    const outerLeftFront = toVector2(startPoint.clone().add(rightVector.clone().invert().scale(windowWidth / 2)).add(forwardVector.clone().scale(hostThickness)));
    const innerRightBack = toVector2(startPoint.clone().add(rightVector.clone().scale(windowWidth / 2)));
    const innerLeftBack = toVector2(startPoint.clone().add(rightVector.clone().invert().scale(windowWidth / 2)));
    const outerRightBack = innerRightBack.clone().add(forwardVector.clone().scale(hostThickness));
    const outerLeftBack = innerLeftBack.clone().add(forwardVector.clone().scale(hostThickness));
    
    let innerEarWidth = HSConstants.Constants.DEFAULT_WINDOWSILL_EAR_WIDTH;
    let outerEarWidth = HSConstants.Constants.DEFAULT_WINDOWSILL_EAR_WIDTH;
    let innerEarDepth = HSConstants.Constants.DEFAULT_WINDOWSILL_EAR_THICKNESS;
    let outerEarDepth = HSConstants.Constants.DEFAULT_WINDOWSILL_EAR_THICKNESS;
    
    if (host && this.isShowPocket()) {
      const pocket = this.getPocket();
      switch (pocket.side) {
        case PocketSideType.Inner:
          innerEarWidth = pocket.XSize;
          innerEarDepth = pocket.YSize;
          break;
        case PocketSideType.Outer:
          outerEarWidth = pocket.XSize;
          outerEarDepth = pocket.YSize;
          break;
        case PocketSideType.Both:
          innerEarWidth = pocket.XSize;
          innerEarDepth = pocket.YSize;
          outerEarWidth = pocket.XSize;
          outerEarDepth = pocket.YSize;
          break;
      }
    }
    
    let innerSillPoints: THREE.Vector2[] = [
      innerRightBack,
      innerLeftBack,
      innerLeftFront,
      innerRightFront,
      innerRightBack
    ];
    
    let outerSillPoints: THREE.Vector2[] = [
      outerLeftBack,
      outerRightBack,
      outerRightFront,
      outerLeftFront,
      outerLeftBack
    ];
    
    let doubleSillPoints: THREE.Vector2[] = [
      innerRightBack,
      innerLeftBack,
      outerLeftBack,
      outerRightBack,
      innerRightBack
    ];
    
    let outerMoldingIndices: number[] = [2, 3];
    
    const { innerExtend, outerExtend } = this.getWindowSill();
    innerEarDepth += innerExtend;
    outerEarDepth += outerExtend;
    
    if (innerEarDepth > 0 || outerEarDepth > 0 || innerEarWidth > 0) {
      const innerRightEar = innerRightBack.clone().add(rightVector.clone().scale(innerEarWidth));
      const innerLeftEar = innerLeftBack.clone().add(rightVector.clone().invert().scale(innerEarWidth));
      const outerRightEar = outerRightBack.clone().add(rightVector.clone().scale(outerEarWidth));
      const outerLeftEar = outerLeftBack.clone().add(rightVector.clone().invert().scale(outerEarWidth));
      
      innerSillPoints = [
        innerRightEar.clone().add(forwardVector.clone().invert().scale(innerEarDepth)),
        innerLeftEar.clone().add(forwardVector.clone().invert().scale(innerEarDepth)),
        innerLeftEar,
        innerLeftBack,
        innerLeftFront,
        innerRightFront,
        innerRightBack,
        innerRightEar,
        innerRightEar.clone().add(forwardVector.clone().invert().scale(innerEarDepth))
      ];
      
      outerSillPoints = [
        outerLeftEar.clone().add(forwardVector.clone().scale(outerEarDepth)),
        outerRightEar.clone().add(forwardVector.clone().scale(outerEarDepth)),
        outerRightEar,
        outerRightBack,
        innerRightFront,
        innerLeftFront,
        outerLeftBack,
        outerLeftEar,
        outerLeftEar.clone().add(forwardVector.clone().scale(innerEarDepth))
      ];
      
      doubleSillPoints = [
        innerRightEar.clone().add(forwardVector.clone().invert().scale(innerEarDepth)),
        innerLeftEar.clone().add(forwardVector.clone().invert().scale(innerEarDepth)),
        innerLeftEar,
        innerLeftBack,
        outerLeftFront,
        outerLeftEar,
        outerLeftEar.clone().add(forwardVector.clone().scale(outerEarDepth)),
        outerRightEar.clone().add(forwardVector.clone().scale(outerEarDepth)),
        outerRightEar,
        outerRightFront,
        innerRightBack,
        innerRightEar,
        innerRightEar.clone().add(forwardVector.clone().invert().scale(innerEarDepth))
      ];
      
      outerMoldingIndices = [6, 7];
    }
    
    let finalSillPoints = innerSillPoints;
    let secondMoldingIndices: number[] = [];
    
    switch (this.getWindowSillSide()) {
      case WindowSillSideType.OUTER:
        finalSillPoints = outerSillPoints;
        break;
      case WindowSillSideType.DOUBLE:
        finalSillPoints = doubleSillPoints;
        secondMoldingIndices = outerMoldingIndices;
        break;
    }
    
    const sillInfo: SillPartInfo = {
      points: finalSillPoints,
      innerSillPoints,
      outerSillPoints,
      doubleSillPoints,
      elevation: 0,
      moldingIndices: [0, 1],
      secondMoldingIndices,
      outerMoldingIndices,
      moldingFlip: false
    };
    
    const boundingsInfo: BoundingsInfo = {
      outline: [
        innerRightBack.clone(),
        outerRightFront.clone(),
        outerLeftFront.clone(),
        innerLeftBack.clone(),
        innerRightBack.clone()
      ],
      innerBound: [
        innerRightBack.clone(),
        innerLeftBack.clone(),
        innerLeftFront.clone(),
        innerRightFront.clone(),
        innerRightBack.clone()
      ],
      innerPoints: [innerRightBack.clone(), innerLeftBack.clone()],
      outerPoints: [outerRightFront.clone(), outerLeftFront.clone()]
    };
    
    this.partsInfo = {
      Sill: sillInfo,
      boundings: boundingsInfo
    };
    
    if (!options || !options.previewDirty) {
      this.forEachChild((child: Entity) => {
        if (!(child instanceof ParametricModel)) return;
        
        const parametricChild = child;
        const updatedParams = {};
        Object.assign(updatedParams, parametricChild.parameters, this.partsInfo[parametricChild.parameters.partName]);
        parametricChild.parameters = updatedParams;
      });
    }
    
    this._boundDirty = true;
    
    if (!options || !options.previewDirty) {
      this.dirtyGeometry();
    }
  }

  getIO(): Window_IO {
    return Window_IO.instance();
  }
}

Entity.registerClass(HSConstants.ModelClass.NgWindow, Window);