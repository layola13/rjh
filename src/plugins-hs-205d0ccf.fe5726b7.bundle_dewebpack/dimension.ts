import { Vector2, Arc2d, Line2d, MathUtil } from './math';
import { PathItem } from './PathItem';
import { InputBoxComp, InputBoxType } from './InputBoxComp';
import { DimensionShadowAttr, DimensionAttr, InvalidDimensionAttr, InvalidTextAttr, TextAttr } from './attributes';
import { TextItem } from './TextItem';
import { MarkerItem, IMarkerType } from './MarkerItem';
import { getUnitParam } from './utils';

const DEFAULT_ARC_ANGLE_THRESHOLD = 30;
const DEFAULT_LINE_LENGTH_RATIO = 0.8;
const DEFAULT_OFFSET_ADJUSTMENT = 30;

interface Curve {
  clone(): Curve;
  isArc2d(): boolean;
  getRadius(): number;
  setA(value: number): void;
  setB(value: number): void;
  offset(value: number): void;
  getMidPt(): Vector2;
  getLength(): number;
  getCenter(): Vector2;
  getRange(): { getLength(): number };
}

interface Context {
  // Add context properties as needed
}

interface DimensionProps {
  editable?: boolean;
  type?: InputBoxType;
  value?: number;
  onEnter?: (event: unknown, value: number, dimension: Dimension) => void;
  onTab?: (event: unknown, value: number, dimension: Dimension) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
}

interface DimensionSetting {
  offset: number;
  offsetByScreen: boolean;
}

interface UpdateDataParams {
  curve?: Curve;
  offset?: number;
  max?: number;
}

class EditableComponent {
  private inputComponent: InputBoxComp;
  private textItem: TextItem;
  private _editable: boolean;

  constructor(inputComponent: InputBoxComp, textItem: TextItem, editable: boolean) {
    this.inputComponent = inputComponent;
    this.textItem = textItem;
    this._editable = editable;
    
    if (this._editable) {
      this.textItem.hide();
    } else {
      this.inputComponent.hide();
    }
  }

  setEditable(editable: boolean, shouldShow: boolean): void {
    if (this._editable !== editable) {
      this._editable = editable;
      this.textItem.hide();
      this.inputComponent.hide();
      
      if (shouldShow) {
        if (this._editable) {
          this.inputComponent.show();
        } else {
          this.textItem.show();
        }
      }
    }
  }

  get editable(): boolean {
    return this._editable;
  }

  show(): void {
    if (this._editable) {
      this.inputComponent.show();
    } else {
      this.textItem.show();
    }
  }

  hide(): void {
    if (this._editable) {
      this.inputComponent.hide();
    } else {
      this.textItem.hide();
    }
  }

  dispose(): void {
    this.inputComponent.dispose();
    this.textItem.dispose();
  }
}

export class Dimension {
  static defaultSetting: DimensionSetting = {
    offset: 24,
    offsetByScreen: true
  };

  private _context: Context;
  private _props?: DimensionProps;
  private _pathItem: PathItem;
  private _pathShadowItem: PathItem;
  private _inputObj: EditableComponent;
  private _curve?: Curve;
  private _setting: DimensionSetting;
  private _inputPosition: Vector2;
  private _isShow: boolean;

  constructor(context: Context, props?: DimensionProps, setting?: DimensionSetting) {
    this._context = context;
    this._props = props;
    this._inputPosition = Vector2.O();
    this._isShow = true;

    this._pathShadowItem = new PathItem(context).attr(DimensionShadowAttr);
    this._pathShadowItem.marker(new MarkerItem(context, IMarkerType.DimensionShadow).getNode());
    
    this._pathItem = new PathItem(context).attr(DimensionAttr);
    this._pathItem.marker(new MarkerItem(context, IMarkerType.Dimension).getNode());

    this._setting = setting || {
      offset: Dimension.defaultSetting.offset,
      offsetByScreen: Dimension.defaultSetting.offsetByScreen
    };

    const isEditable = this._props?.editable ?? false;

    this._inputObj = new EditableComponent(
      new InputBoxComp(context, {
        type: this._props?.type || InputBoxType.Number,
        value: this._props?.value,
        onEnter: this._onEnter,
        onTab: this._onTab,
        onKeyDown: this._onKeyDown,
        show: isEditable
      }),
      new TextItem(context),
      isEditable
    );

    this.hide();
  }

  private _onEnter = (event: unknown, value: number): void => {
    this._props?.onEnter?.(event, value, this);
  };

  private _onTab = (event: unknown, value: number): void => {
    this._props?.onTab?.(event, value, this);
  };

  private _onKeyDown = (event: KeyboardEvent): void => {
    this._props?.onKeyDown?.(event);
  };

  supportActive(): boolean {
    return this.isShow && this._inputObj.editable;
  }

  updateData(params: UpdateDataParams): void {
    const { curve, offset, max } = params;

    if (offset !== undefined) {
      this._setting.offset = offset;
    }

    if (max !== undefined) {
      this._inputObj.inputComponent.updateData({
        config: { max }
      });
    }

    if (curve) {
      this._curve = curve;
      this.update();
    }
  }

  updateProps(props: Partial<DimensionProps>): void {
    if (this._props) {
      const { onTab, onEnter, onKeyDown, editable } = props;

      if (onTab !== undefined) {
        this._props.onTab = onTab;
      }
      if (onEnter !== undefined) {
        this._props.onEnter = onEnter;
      }
      if (onKeyDown) {
        this._props.onKeyDown = onKeyDown;
      }
      if (editable !== undefined) {
        this.editable = editable;
      }
    } else {
      this._props = props as DimensionProps;
    }
  }

  setInvalid(isInvalid: boolean): void {
    if (isInvalid) {
      this._pathItem.attr(InvalidDimensionAttr);
      this._inputObj.textItem.attr(InvalidTextAttr);
    } else {
      this._pathItem.attr(DimensionAttr);
      this._inputObj.textItem.attr(TextAttr);
    }
  }

  set editable(value: boolean) {
    this._inputObj.setEditable(value, this._isShow);
  }

  set path(curve: Curve) {
    this.updateData({ curve });
  }

  get curve(): Curve | undefined {
    return this._curve;
  }

  get isFocus(): boolean {
    return this.canFocus && this._inputObj.inputComponent.focus;
  }

  get canFocus(): boolean {
    return this._inputObj.editable;
  }

  get inputPosition(): Vector2 {
    return this._inputPosition;
  }

  get isShow(): boolean {
    return this._isShow;
  }

  get inputBoxType(): InputBoxType | undefined {
    return this._props?.type;
  }

  update(): void {
    if (!this._curve) {
      return;
    }

    let offset = this._setting.offset;
    if (offset === undefined) {
      offset = Dimension.defaultSetting.offset;
    }

    const extendedCurve = this._getExtendCurve(this._curve, offset);
    this._pathItem.path = extendedCurve;
    this._pathShadowItem.path = extendedCurve;

    if (this._inputObj.editable) {
      this._updateInputItem(extendedCurve);
    } else {
      this._inputObj.textItem.setCurve(extendedCurve);
    }
  }

  focus(): void {
    if (this.canFocus) {
      this._inputObj.inputComponent.updateData({ focus: true });
    }
  }

  blur(): void {
    if (this.canFocus) {
      this._inputObj.inputComponent.updateData({ focus: false });
    }
  }

  show(): void {
    if (!this._isShow) {
      this._isShow = true;
      this._pathItem.show();
      this._pathShadowItem.show();
      this._inputObj.show();
    }
  }

  hide(): void {
    if (this._isShow) {
      this._isShow = false;
      this._pathItem.hide();
      this._pathShadowItem.hide();
      this._inputObj.hide();
    }
  }

  dispose(): void {
    this._pathItem.dispose();
    this._pathShadowItem.dispose();
    this._inputObj.dispose();
  }

  private _getExtendCurve(curve: Curve, offset: number): Curve {
    let adjustedOffset = offset;
    
    if (this._setting.offsetByScreen) {
      adjustedOffset /= HSApp.View.SVG.Util.ModelToScreenFactor(this._context);
    }

    const clonedCurve = curve.clone();

    if (clonedCurve.isArc2d()) {
      const radius = clonedCurve.getRadius();
      clonedCurve.setA(radius + adjustedOffset);
      clonedCurve.setB(radius + adjustedOffset);
    } else {
      clonedCurve.offset(adjustedOffset);
    }

    return clonedCurve;
  }

  private _updateInputItem(curve: Curve): void {
    const position = this._getFitMiddlePoint(curve);
    this._inputPosition = position;

    this._inputObj.inputComponent.updateData({
      position,
      value: curve.isArc2d() 
        ? this._getArcAngle(curve) 
        : curve.getLength() * getUnitParam(),
      config: {
        precision: -Math.log10(getUnitParam() / 1000)
      }
    });
  }

  private _getFitMiddlePoint(curve: Curve): Vector2 {
    const midPoint = curve.getMidPt();
    let threshold: number | undefined;
    let measureValue: number | undefined;

    if (curve instanceof Arc2d) {
      threshold = DEFAULT_ARC_ANGLE_THRESHOLD;
      measureValue = this._getArcAngle(curve);
    } else if (curve instanceof Line2d) {
      threshold = DEFAULT_LINE_LENGTH_RATIO;
      measureValue = curve.getLength();
    }

    if (threshold === undefined || measureValue === undefined || measureValue >= threshold) {
      return midPoint;
    }

    const additionalOffset = 
      (-DEFAULT_OFFSET_ADJUSTMENT / threshold * measureValue + DEFAULT_OFFSET_ADJUSTMENT) / 
      HSApp.View.SVG.Util.ModelToScreenFactor(this._context);

    if (curve instanceof Arc2d) {
      const radialVector = midPoint.subtracted(curve.getCenter());
      return curve.getCenter().added(
        radialVector.normalized().multiplied(radialVector.getLength() + additionalOffset)
      );
    }

    const offsetCurve = curve.clone();
    offsetCurve.offset(this._setting.offset > 0 ? additionalOffset : -additionalOffset);
    return offsetCurve.getMidPt();
  }

  private _getArcAngle(arc: Curve): number {
    return (180 * arc.getRange().getLength()) / Math.PI;
  }

  static sort(dimensions: Dimension[]): void {
    dimensions.sort((a, b) => {
      if (MathUtil.isNearlyEqual(a.inputPosition.y, b.inputPosition.y)) {
        return a.inputPosition.x - b.inputPosition.x;
      }
      return b.inputPosition.y - a.inputPosition.y;
    });
  }

  static getNextDimension(dimensions: Dimension[], currentDimension?: Dimension): Dimension | undefined {
    const activeDimensions = dimensions.filter(dim => dim.supportActive());

    if (activeDimensions.length === 0) {
      return undefined;
    }

    Dimension.sort(activeDimensions);

    const currentIndex = activeDimensions.findIndex(dim => dim === currentDimension);

    if (currentIndex >= 0) {
      return activeDimensions[(currentIndex + 1) % activeDimensions.length];
    }

    return activeDimensions[0];
  }
}