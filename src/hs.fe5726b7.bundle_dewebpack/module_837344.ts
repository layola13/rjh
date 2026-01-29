interface Bound {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface BoundData {
  id: string;
  bound: Bound;
}

interface Point {
  x: number;
  y: number;
}

interface Rectangle {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface Position {
  left: number;
  right: number;
  width: number;
  bottom: number;
}

interface PropertyBarControl {
  id: string;
  [key: string]: unknown;
}

interface PropertyBar {
  setControls(controls: PropertyBarControl[]): void;
  show(container: JQuery): void;
  getControlById(id: string): PropertyBarControl | undefined;
  signalSizeGrow: {
    listen(callback: (event: { data: BoundData }) => void, context: unknown): void;
    unlisten(callback: (event: { data: BoundData }) => void, context: unknown): void;
  };
  signalSizeShrink: {
    listen(callback: (event: { data: BoundData }) => void, context: unknown): void;
    unlisten(callback: (event: { data: BoundData }) => void, context: unknown): void;
  };
}

interface PropertyBarStatic {
  create(name: string): PropertyBar;
}

declare const PropertyBar: PropertyBarStatic;

interface PropertyBarPopupOptions {
  controls: PropertyBarControl[];
  bounds: Map<string, Bound>;
}

interface JQuery {
  propertybarPopup(options: Partial<PropertyBarPopupOptions>): JQuery;
  propertybarPopup(method: 'updatePos', position: Bound): JQuery;
  propertybarPopup(method: 'setLoseFocusHandler', handler: () => void): JQuery;
  propertybarPopup(method: 'destroy'): JQuery;
  propertybarPopup(method: 'addBound', data: BoundData): JQuery;
  propertybarPopup(method: 'removeBound', data: BoundData): JQuery;
  propertybarPopup(method: 'getControlById', id: string): PropertyBarControl | undefined;
}

declare const $: {
  (selector: string | HTMLElement): JQuery;
  widget(name: string, widget: unknown): void;
  capture(element: JQuery, event: string, handler: (e: MouseEvent) => void): void;
  unbindcapture(element: JQuery, event: string, handler: (e: MouseEvent) => void): void;
};

import trianglePath from './assets/triangle.svg';

class StatusbarPopup {
  private left?: number;
  private top?: number;
  private width?: number;
  private height?: number;

  constructor(controls: PropertyBarControl[], className?: string) {
    $('.statusbarPopup').remove();
    $('body').append("<div class='statusbarPopup'></div>");
    $('.statusbarPopup').propertybarPopup({ controls });

    if (className != null && typeof className === 'string') {
      $('.propertybarPopup').addClass(className);
    }
  }

  static create(...args: [PropertyBarControl[], string?]): StatusbarPopup {
    return new StatusbarPopup(...args);
  }

  updatePosition(position: Bound): void {
    $('.statusbarPopup').propertybarPopup('updatePos', position);
  }

  setLoseFocusHandler(handler: () => void): void {
    $('.statusbarPopup').propertybarPopup('setLoseFocusHandler', handler);
  }

  destroy(): void {
    if ($('.statusbarPopup').html() !== '') {
      $('.statusbarPopup').propertybarPopup('destroy');
    }
  }

  addBound(data: BoundData): void {
    $('.statusbarPopup').propertybarPopup('addBound', data);
  }

  removeBound(data: BoundData): void {
    $('.statusbarPopup').propertybarPopup('removeBound', data);
  }

  getControlById(id: string): PropertyBarControl | undefined {
    return $('.statusbarPopup').propertybarPopup('getControlById', id);
  }
}

$.widget('custom.propertybarPopup', {
  widgetEventPrefix: 'propertybarPopup',
  options: {
    controls: undefined as PropertyBarControl[] | undefined,
    bounds: new Map<string, Bound>()
  },
  onLoseFocus: null as ((e: MouseEvent) => void) | null,
  loseFocusHandler: undefined as (() => void) | undefined,
  propertyBar: undefined as PropertyBar | undefined,
  left: undefined as number | undefined,
  top: undefined as number | undefined,
  width: undefined as number | undefined,
  height: undefined as number | undefined,

  addBound(this: any, data: BoundData): void {
    this.options.bounds.set(data.id, data.bound);
    this.printBounds();
  },

  removeBound(this: any, data: BoundData): void {
    const id = data.id;
    this.options.bounds.delete(id);
    this.printBounds();
  },

  printBounds(this: any): void {
    if (window.DEBUG) {
      this.options.bounds.forEach((bound: Bound, id: string) => {
        JSON.stringify(bound);
      });
    }
  },

  setLoseFocusHandler(this: any, handler: () => void): void {
    this.loseFocusHandler = handler;
  },

  getControlById(this: any, id: string): PropertyBarControl | undefined {
    return this.propertyBar.getControlById(id);
  },

  _init(this: any): void {
    this.onLoseFocus = ((e: MouseEvent) => {
      let isInsideBounds = false;

      this.options.bounds.forEach((bound: Bound) => {
        if (isPointInsideRectangle(bound, { x: e.clientX, y: e.clientY })) {
          isInsideBounds = true;
        }
      });

      if (!isInsideBounds && this.loseFocusHandler) {
        this.loseFocusHandler();
      }
    }).bind(this);

    $.capture($('body'), 'mousedown', this.onLoseFocus);
    this.update();
  },

  update(this: any): void {
    this.element.append(
      `<div class="statusbarTriangle"><img src="${trianglePath}"/></div>`
    );
    this.element.append('<div class="statusbarContainer"></div>');

    this.propertyBar = PropertyBar.create('propertybarPopup');
    this.propertyBar.setControls(this.options.controls);
    this.propertyBar.show(this.element.find('.statusbarContainer'));
    this.propertyBar.signalSizeGrow.listen(this.onSizeGrow, this);
    this.propertyBar.signalSizeShrink.listen(this.onSizeShrink, this);
  },

  onSizeShrink(this: any, event: { data: BoundData }): void {
    this.removeBound(event.data);
  },

  onSizeGrow(this: any, event: { data: BoundData }): void {
    this.addBound(event.data);
  },

  _destroy(this: any): void {
    $.unbindcapture($('body'), 'mousedown', this.onLoseFocus);
    this.propertyBar.signalSizeGrow.unlisten(this.onSizeGrow, this);
    this.propertyBar.signalSizeShrink.unlisten(this.onSizeShrink, this);
    this.options.bounds.clear();
    this.element.html('');
  },

  updatePos(this: any, triggerBound: Bound): void {
    const popupWidth = this.element.find('.propertybarPopup').outerWidth();
    const popupHeight = this.element.find('.propertybarPopup').outerHeight();
    const statusBarHeight = $('.statusBar').height();

    const position: Position = {
      left: triggerBound.left + triggerBound.width / 2,
      right: window.innerWidth - triggerBound.left - triggerBound.width,
      width: triggerBound.width,
      bottom: statusBarHeight
    };

    positionTriangle(this, position);
    calculatePopupPosition(this, position, popupWidth, popupHeight);
    positionContainer(this, position);
    storeBounds(this, triggerBound);
  }
});

function isPointInsideRectangle(bound: Bound, point: Point): boolean {
  const rect: Rectangle = {
    left: bound.left,
    top: bound.top,
    right: bound.left + bound.width,
    bottom: bound.top + bound.height
  };

  return rect.left < point.x && point.x < rect.right && rect.top < point.y && point.y < rect.bottom;
}

function positionTriangle(widget: any, position: Position): void {
  const TRIANGLE_OFFSET = 20;
  const TRIANGLE_ADJUSTMENT = -3;
  const rightPosition = position.right + position.width / 2;
  const bottomPosition = position.bottom + TRIANGLE_OFFSET + TRIANGLE_ADJUSTMENT;

  widget.element.find('.statusbarTriangle').css({
    right: rightPosition,
    bottom: bottomPosition
  });
}

function calculatePopupPosition(
  widget: any,
  position: Position,
  popupWidth: number,
  popupHeight: number
): void {
  const MIN_MARGIN = 10;
  const POPUP_OFFSET = 20;

  let leftPosition = position.left - popupWidth / 2;
  leftPosition = leftPosition < 0 ? MIN_MARGIN : leftPosition;
  leftPosition = position.left + popupWidth / 2 > $(window).width()
    ? $(window).width() - popupWidth - MIN_MARGIN
    : leftPosition;

  const bottomPosition = position.bottom + POPUP_OFFSET;

  widget.left = leftPosition;
  widget.top = $(window).height() - bottomPosition - popupHeight;
  widget.width = popupWidth;
  widget.height = popupHeight;
}

function positionContainer(widget: any, position: Position): void {
  const container = widget.element.find('.statusbarContainer');
  const bottomPosition = $(window).height() - widget.top - widget.height;

  container.css({
    right: position.right,
    bottom: bottomPosition
  });
}

function storeBounds(widget: any, triggerBound: Bound): void {
  widget.addBound({
    id: 'triggerBtnBound',
    bound: triggerBound
  });

  const propertyBarElement = widget.element.find('.statusbarContainer .propertybarPopup');
  const popupBound: Bound = {
    left: propertyBarElement.offset().left,
    top: propertyBarElement.offset().top,
    width: propertyBarElement.outerWidth(),
    height: propertyBarElement.outerHeight()
  };

  widget.addBound({
    id: 'popupBound',
    bound: popupBound
  });
}

export default StatusbarPopup;