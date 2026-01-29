interface DragConstraintResult {
  x: boolean | number;
  y: boolean | number;
}

interface DragConstraintObject {
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
  snapToGrid?: number;
}

type DragConstraint = ((x: number, y: number, matrix: DOMMatrix) => DragConstraintResult | boolean) | DragConstraintObject;

interface Point {
  x: number;
  y: number;
  matrixTransform(matrix: DOMMatrix): Point;
}

interface BBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DragStartPoints {
  point: Point;
  box: BBox;
  transform: any;
}

interface DragEventDetail {
  event: MouseEvent | TouchEvent;
  p?: Point;
  m?: DOMMatrix;
  handler: Draggable;
}

declare namespace SVG {
  class Element {
    remember(key: string, value?: any): any;
    on(event: string, handler: (e: Event) => void): void;
    off(event: string): void;
    fire(event: string, data: any): void;
    event(): { defaultPrevented: boolean };
    parent(type: any): any;
    bbox(): BBox;
    rbox(): BBox;
    x(value?: number): number | this;
    y(value?: number): number | this;
    move(x: number, y: number): this;
    transform(): any;
    matrix(transform: any): this;
    attr(name: string): any;
    node: SVGElement & {
      createSVGPoint?: () => Point;
      getScreenCTM(): DOMMatrix;
      getComputedTextLength?: () => number;
    };
  }
  
  class Text extends Element {}
  class G extends Element {}
  class Use extends Element {}
  class Nested extends Element {}
  class Doc extends Element {}
  
  function on(target: Window | Element, event: string, handler: (e: Event) => void): void;
  function off(target: Window | Element, event: string): void;
  function extend(target: any, methods: any): void;
}

class Draggable {
  private el: SVG.Element;
  private constraint?: DragConstraint;
  private value?: boolean;
  private parent?: SVG.Element;
  private p!: Point;
  private m!: DOMMatrix;
  private startPoints!: DragStartPoints;

  constructor(element: SVG.Element) {
    element.remember('_draggable', this);
    this.el = element;
  }

  public init(constraint: DragConstraint, value: boolean): void {
    this.constraint = constraint;
    this.value = value;

    this.el.on('mousedown.drag', (event: Event) => {
      this.start(event as MouseEvent);
    });

    this.el.on('touchstart.drag', (event: Event) => {
      this.start(event as TouchEvent);
    });
  }

  private transformPoint(event: MouseEvent | TouchEvent, offset?: number): Point {
    const normalizedEvent = event as any;
    const touch = normalizedEvent.changedTouches?.[0] || normalizedEvent;
    
    this.p.x = touch.clientX - (offset || 0);
    this.p.y = touch.clientY;
    
    return this.p.matrixTransform(this.m);
  }

  private getBBox(): BBox {
    let box = this.el.bbox();

    if (this.el instanceof SVG.Nested) {
      box = this.el.rbox();
    }

    if (this.el instanceof SVG.G || this.el instanceof SVG.Use || this.el instanceof SVG.Nested) {
      box.x = this.el.x() as number;
      box.y = this.el.y() as number;
    }

    return box;
  }

  private start(event: MouseEvent | TouchEvent): void {
    const mouseEvent = event as MouseEvent;
    
    if (event.type !== 'click' && event.type !== 'mousedown' && event.type !== 'mousemove' || 
        (mouseEvent.which === 1 || mouseEvent.buttons === 1)) {
      
      this.el.fire('beforedrag', {
        event: event,
        handler: this
      });

      if (this.el.event().defaultPrevented) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      this.parent = this.parent || this.el.parent(SVG.Nested) || this.el.parent(SVG.Doc);
      this.p = (this.parent.node as any).createSVGPoint();
      this.m = this.el.node.getScreenCTM()!.inverse();

      const box = this.getBBox();
      let textOffset: number | undefined;

      if (this.el instanceof SVG.Text) {
        const textLength = this.el.node.getComputedTextLength!();
        const anchor = this.el.attr('text-anchor');
        
        switch (anchor) {
          case 'middle':
            textOffset = textLength / 2;
            break;
          case 'start':
            textOffset = 0;
            break;
        }
      }

      this.startPoints = {
        point: this.transformPoint(event, textOffset),
        box: box,
        transform: this.el.transform()
      };

      SVG.on(window, 'mousemove.drag', (e: Event) => {
        this.drag(e as MouseEvent);
      });

      SVG.on(window, 'touchmove.drag', (e: Event) => {
        this.drag(e as TouchEvent);
      });

      SVG.on(window, 'mouseup.drag', (e: Event) => {
        this.end(e as MouseEvent);
      });

      SVG.on(window, 'touchend.drag', (e: Event) => {
        this.end(e as TouchEvent);
      });

      this.el.fire('dragstart', {
        event: event,
        p: this.startPoints.point,
        m: this.m,
        handler: this
      });
    }
  }

  private drag(event: MouseEvent | TouchEvent): Point {
    const currentBox = this.getBBox();
    const currentPoint = this.transformPoint(event);
    
    let newX = this.startPoints.box.x + currentPoint.x - this.startPoints.point.x;
    let newY = this.startPoints.box.y + currentPoint.y - this.startPoints.point.y;
    
    const constraint = this.constraint;
    let deltaX = currentPoint.x - this.startPoints.point.x;
    let deltaY = currentPoint.y - this.startPoints.point.y;

    this.el.fire('dragmove', {
      event: event,
      p: currentPoint,
      m: this.m,
      handler: this
    });

    if (this.el.event().defaultPrevented) {
      return currentPoint;
    }

    if (typeof constraint === 'function') {
      const result = constraint.call(this.el, newX, newY, this.m);
      let constraintResult: DragConstraintResult;

      if (typeof result === 'boolean') {
        constraintResult = { x: result, y: result };
      } else {
        constraintResult = result;
      }

      if (constraintResult.x === true) {
        this.el.x(newX);
      } else if (constraintResult.x !== false) {
        this.el.x(constraintResult.x);
      }

      if (constraintResult.y === true) {
        this.el.y(newY);
      } else if (constraintResult.y !== false) {
        this.el.y(constraintResult.y);
      }
    } else if (typeof constraint === 'object') {
      if (constraint.minX != null && newX < constraint.minX) {
        newX = constraint.minX;
        deltaX = newX - this.startPoints.box.x;
      } else if (constraint.maxX != null && newX > constraint.maxX - currentBox.width) {
        newX = constraint.maxX - currentBox.width;
        deltaX = newX - this.startPoints.box.x;
      }

      if (constraint.minY != null && newY < constraint.minY) {
        newY = constraint.minY;
        deltaY = newY - this.startPoints.box.y;
      } else if (constraint.maxY != null && newY > constraint.maxY - currentBox.height) {
        newY = constraint.maxY - currentBox.height;
        deltaY = newY - this.startPoints.box.y;
      }

      if (constraint.snapToGrid != null) {
        newX -= newX % constraint.snapToGrid;
        newY -= newY % constraint.snapToGrid;
        deltaX -= deltaX % constraint.snapToGrid;
        deltaY -= deltaY % constraint.snapToGrid;
      }

      if (this.el instanceof SVG.G) {
        this.el.matrix(this.startPoints.transform).transform({
          x: deltaX,
          y: deltaY
        }, true);
      } else {
        this.el.move(newX, newY);
      }
    }

    return currentPoint;
  }

  private end(event: MouseEvent | TouchEvent): void {
    const finalPoint = this.drag(event);

    this.el.fire('dragend', {
      event: event,
      p: finalPoint,
      m: this.m,
      handler: this
    });

    SVG.off(window, 'mousemove.drag');
    SVG.off(window, 'touchmove.drag');
    SVG.off(window, 'mouseup.drag');
    SVG.off(window, 'touchend.drag');
  }
}

SVG.extend(SVG.Element, {
  draggable: function(this: SVG.Element, enabled?: boolean | DragConstraint, constraint?: DragConstraint): SVG.Element {
    let isEnabled = enabled;
    let actualConstraint = constraint;

    if (typeof enabled === 'function' || typeof enabled === 'object') {
      actualConstraint = enabled;
      isEnabled = true;
    }

    const draggable = this.remember('_draggable') || new Draggable(this);

    isEnabled = isEnabled === undefined ? true : isEnabled;

    if (isEnabled) {
      draggable.init(actualConstraint || {}, isEnabled as boolean);
    } else {
      this.off('mousedown.drag');
      this.off('touchstart.drag');
    }

    return this;
  }
});