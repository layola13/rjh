import { Opening } from './Opening';

interface ColorStyle {
  color: string;
  lightColor?: string;
  fillColor?: string;
}

interface ColorDefinition {
  Template: ColorStyle;
  Replace: ColorStyle;
  Normal: ColorStyle;
  NormalHover: ColorStyle;
}

interface TemplateOptions {
  isTemplate?: boolean;
}

type AttributeFilter = (element: SVGElement) => boolean;

const colorDef: ColorDefinition = {
  Template: { color: '#000000' },
  Replace: { color: '#000000' },
  Normal: { color: '#000000' },
  NormalHover: { color: '#000000' }
};

export default class TemplateOpening extends Opening {
  public isTemplate: boolean;
  protected colorDef: ColorDefinition;
  private _isHoverOn: boolean = false;

  constructor(
    e: unknown,
    n: unknown,
    a: unknown,
    i: unknown,
    r?: TemplateOptions
  ) {
    super(e, n, a, i, r);
    this.isTemplate = r?.isTemplate ?? false;
    this.colorDef = colorDef;
  }

  protected _updateSelectionStatus(): void {
    if (this.element) {
      const colorStyle = this.getColorStyle();
      this._updateColorStyle(colorStyle);
    }
  }

  private _updateColorStyle(colorStyle: ColorStyle): void {
    const { color, lightColor, fillColor } = colorStyle;

    this._updateAttributeToShape('stroke', color, (element: SVGElement) => {
      return !element.hasAttribute('hsw-stroke-plan');
    });

    if (lightColor) {
      this._updateAttributeToShape('stroke', lightColor, (element: SVGElement) => {
        return (
          element.hasAttribute('hsw-stroke-plan') &&
          element.getAttribute('hsw-stroke-plan') === 'light'
        );
      });
    }

    if (fillColor) {
      this._updateAttributeToShape('fill', fillColor, (element: SVGElement) => {
        return !element.hasAttribute('hsw-stroke-plan');
      });
    }
  }

  protected _insertNodeFromResourceById(element: Element, resourceId: string): void {
    if (!this.resourceUrl) {
      return;
    }

    this._getResourceDoc().then((resourceDoc: Document) => {
      const resourceElement = resourceDoc.getElementById(resourceId);
      if (resourceElement) {
        element.appendChild(resourceElement.cloneNode(true));
        this.onViewBoxChanged();
        this.draw();
      }
    });
  }

  protected getColorStyle(): ColorStyle {
    const colorDefinition = this.colorDef;
    let style: ColorStyle;

    if (this.isTemplate) {
      style = colorDefinition.Template;
    } else if (this.entity.isFlagOn(HSCore.Model.ContentFlagEnum.replace)) {
      style = colorDefinition.Replace;
    } else {
      style = this._isHoverOn ? colorDefinition.NormalHover : colorDefinition.Normal;
    }

    return style;
  }

  public bindCommand(): void {
    const context = this.context;
    const element = this.element;

    if (!element) {
      throw new Error('should have a base element available before binding commands to');
    }

    const eventHook = new HSApp.View.SVG.Events.Hook(element, this.entity, this.context);
    this._eventHooks.push(eventHook);

    eventHook
      .mouseover(() => {
        if (!this.isTemplate) {
          this._isHoverOn = true;
          context.cursorStatus.setCurrentStatus(HSApp.View.CursorEnum.pointer);
          this.draw();
        }
      })
      .mouseout(() => {
        if (!this.isTemplate) {
          this._isHoverOn = false;
          context.cursorStatus.setCurrentStatus(HSApp.View.CursorEnum.default);
          this.draw();
        }
      });
  }
}