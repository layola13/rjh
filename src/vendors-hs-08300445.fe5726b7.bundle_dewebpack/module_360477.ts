interface DraggableProps {
  axis: 'both' | 'x' | 'y';
  scale: number;
  bounds?: Bounds | string;
  offsetParent?: HTMLElement;
}

interface DraggableState {
  x: number;
  y: number;
}

interface DraggableComponent {
  props: DraggableProps;
  state: DraggableState;
  lastX?: number;
  lastY?: number;
  findDOMNode(): HTMLElement | null;
}

interface CoreData {
  node: HTMLElement;
  deltaX: number;
  deltaY: number;
  lastX: number;
  lastY: number;
  x: number;
  y: number;
}

interface DraggableData {
  node: HTMLElement;
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  lastX: number;
  lastY: number;
}

interface Bounds {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}

type Position = [number, number];

export function canDragX(component: DraggableComponent): boolean {
  return component.props.axis === 'both' || component.props.axis === 'x';
}

export function canDragY(component: DraggableComponent): boolean {
  return component.props.axis === 'both' || component.props.axis === 'y';
}

export function createCoreData(
  component: DraggableComponent,
  x: number,
  y: number
): CoreData {
  const isFirstMove = !isNum(component.lastX);
  const node = getDOMNode(component);

  if (isFirstMove) {
    return {
      node,
      deltaX: 0,
      deltaY: 0,
      lastX: x,
      lastY: y,
      x,
      y
    };
  }

  return {
    node,
    deltaX: x - component.lastX!,
    deltaY: y - component.lastY!,
    lastX: component.lastX!,
    lastY: component.lastY!,
    x,
    y
  };
}

export function createDraggableData(
  component: DraggableComponent,
  coreData: CoreData
): DraggableData {
  const scale = component.props.scale;

  return {
    node: coreData.node,
    x: component.state.x + coreData.deltaX / scale,
    y: component.state.y + coreData.deltaY / scale,
    deltaX: coreData.deltaX / scale,
    deltaY: coreData.deltaY / scale,
    lastX: component.state.x,
    lastY: component.state.y
  };
}

export function getBoundPosition(
  component: DraggableComponent,
  x: number,
  y: number
): Position {
  if (!component.props.bounds) {
    return [x, y];
  }

  let bounds = component.props.bounds;

  if (typeof bounds === 'string') {
    const node = getDOMNode(component);
    const ownerWindow = node.ownerDocument.defaultView!;
    let boundingElement: Element;

    if (bounds === 'parent') {
      boundingElement = node.parentNode as Element;
    } else {
      boundingElement = node.getRootNode().querySelector(bounds)!;
    }

    if (!(boundingElement instanceof ownerWindow.HTMLElement)) {
      throw new Error(`Bounds selector "${bounds}" could not find an element.`);
    }

    const boundingHTMLElement = boundingElement as HTMLElement;
    const nodeStyle = ownerWindow.getComputedStyle(node);
    const boundingStyle = ownerWindow.getComputedStyle(boundingHTMLElement);

    bounds = {
      left: -node.offsetLeft + int(boundingStyle.paddingLeft) + int(nodeStyle.marginLeft),
      top: -node.offsetTop + int(boundingStyle.paddingTop) + int(nodeStyle.marginTop),
      right: innerWidth(boundingHTMLElement) - outerWidth(node) - node.offsetLeft + int(boundingStyle.paddingRight) - int(nodeStyle.marginRight),
      bottom: innerHeight(boundingHTMLElement) - outerHeight(node) - node.offsetTop + int(boundingStyle.paddingBottom) - int(nodeStyle.marginBottom)
    };
  } else {
    bounds = {
      left: bounds.left,
      top: bounds.top,
      right: bounds.right,
      bottom: bounds.bottom
    };
  }

  if (isNum(bounds.right)) {
    x = Math.min(x, bounds.right);
  }
  if (isNum(bounds.bottom)) {
    y = Math.min(y, bounds.bottom);
  }
  if (isNum(bounds.left)) {
    x = Math.max(x, bounds.left);
  }
  if (isNum(bounds.top)) {
    y = Math.max(y, bounds.top);
  }

  return [x, y];
}

export function getControlPosition(
  event: MouseEvent | TouchEvent,
  touchIdentifier: number | undefined,
  component: DraggableComponent
): { x: number; y: number } | null {
  const touchObj = typeof touchIdentifier === 'number' ? getTouch(event, touchIdentifier) : null;

  if (typeof touchIdentifier === 'number' && !touchObj) {
    return null;
  }

  const node = getDOMNode(component);
  const offsetParent = component.props.offsetParent || node.offsetParent || node.ownerDocument.body;

  return offsetXYFromParent(touchObj || event, offsetParent as HTMLElement, component.props.scale);
}

export function snapToGrid(
  grid: Position,
  x: number,
  y: number
): Position {
  const snappedX = Math.round(x / grid[0]) * grid[0];
  const snappedY = Math.round(y / grid[1]) * grid[1];

  return [snappedX, snappedY];
}

function getDOMNode(component: DraggableComponent): HTMLElement {
  const node = component.findDOMNode();
  if (!node) {
    throw new Error('<DraggableCore>: Unmounted during event!');
  }
  return node;
}

function isNum(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

function int(value: string): number {
  return parseInt(value, 10) || 0;
}

function getTouch(event: MouseEvent | TouchEvent, identifier: number): Touch | undefined {
  return (event as TouchEvent).touches?.find(touch => touch.identifier === identifier);
}

function offsetXYFromParent(
  event: MouseEvent | TouchEvent | Touch,
  offsetParent: HTMLElement,
  scale: number
): { x: number; y: number } {
  const isTouch = 'clientX' in event;
  const clientX = isTouch ? event.clientX : (event as MouseEvent).clientX;
  const clientY = isTouch ? event.clientY : (event as MouseEvent).clientY;
  
  const parentRect = offsetParent.getBoundingClientRect();
  
  return {
    x: (clientX - parentRect.left) / scale,
    y: (clientY - parentRect.top) / scale
  };
}

function innerWidth(element: HTMLElement): number {
  const style = window.getComputedStyle(element);
  return element.clientWidth - int(style.paddingLeft) - int(style.paddingRight);
}

function innerHeight(element: HTMLElement): number {
  const style = window.getComputedStyle(element);
  return element.clientHeight - int(style.paddingTop) - int(style.paddingBottom);
}

function outerWidth(element: HTMLElement): number {
  const style = window.getComputedStyle(element);
  return element.offsetWidth + int(style.marginLeft) + int(style.marginRight);
}

function outerHeight(element: HTMLElement): number {
  const style = window.getComputedStyle(element);
  return element.offsetHeight + int(style.marginTop) + int(style.marginBottom);
}