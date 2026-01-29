import React, { Component, ReactElement, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {
  matchesSelectorAndParentsTo,
  addEvent,
  removeEvent,
  addUserSelectStyles,
  scheduleRemoveUserSelectStyles,
  getTouchIdentifier
} from './domFns';
import {
  getControlPosition,
  createCoreData,
  snapToGrid,
  ControlPosition,
  CoreData
} from './positionFns';
import { dontSetMe } from './shims';
import log from './log';

interface MouseTouchEvent extends MouseEvent, Partial<Touch> {}

interface EventHandler {
  start: string;
  move: string;
  stop: string;
}

const TOUCH_EVENTS: EventHandler = {
  start: 'touchstart',
  move: 'touchmove',
  stop: 'touchend'
};

const MOUSE_EVENTS: EventHandler = {
  start: 'mousedown',
  move: 'mousemove',
  stop: 'mouseup'
};

interface DraggableCoreProps {
  allowAnyClick?: boolean;
  allowMobileScroll?: boolean;
  children: ReactElement;
  disabled?: boolean;
  enableUserSelectHack?: boolean;
  offsetParent?: HTMLElement;
  grid?: [number, number];
  handle?: string;
  cancel?: string;
  nodeRef?: React.RefObject<HTMLElement>;
  onStart?: (event: MouseEvent | TouchEvent, data: CoreData) => void | false;
  onDrag?: (event: MouseEvent | TouchEvent, data: CoreData) => void | false;
  onStop?: (event: MouseEvent | TouchEvent, data: CoreData) => void | false;
  onMouseDown?: (event: ReactMouseEvent | ReactTouchEvent) => void;
  scale?: number;
  className?: never;
  style?: never;
  transform?: never;
}

class DraggableCore extends Component<DraggableCoreProps> {
  static displayName = 'DraggableCore';

  static propTypes = {
    allowAnyClick: PropTypes.bool,
    allowMobileScroll: PropTypes.bool,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    enableUserSelectHack: PropTypes.bool,
    offsetParent: (props: DraggableCoreProps, propName: keyof DraggableCoreProps) => {
      const value = props[propName] as HTMLElement | undefined;
      if (value && value.nodeType !== 1) {
        throw new Error("Draggable's offsetParent must be a DOM Node.");
      }
    },
    grid: PropTypes.arrayOf(PropTypes.number),
    handle: PropTypes.string,
    cancel: PropTypes.string,
    nodeRef: PropTypes.object,
    onStart: PropTypes.func,
    onDrag: PropTypes.func,
    onStop: PropTypes.func,
    onMouseDown: PropTypes.func,
    scale: PropTypes.number,
    className: dontSetMe,
    style: dontSetMe,
    transform: dontSetMe
  };

  static defaultProps: Partial<DraggableCoreProps> = {
    allowAnyClick: false,
    allowMobileScroll: false,
    disabled: false,
    enableUserSelectHack: true,
    onStart: () => {},
    onDrag: () => {},
    onStop: () => {},
    onMouseDown: () => {},
    scale: 1
  };

  private dragging = false;
  private lastX = NaN;
  private lastY = NaN;
  private touchIdentifier: number | null = null;
  private mounted = false;
  private eventHandler: EventHandler = MOUSE_EVENTS;

  componentDidMount(): void {
    this.mounted = true;
    const node = this.findDOMNode();
    if (node) {
      addEvent(node, TOUCH_EVENTS.start, this.onTouchStart, { passive: false });
    }
  }

  componentWillUnmount(): void {
    this.mounted = false;
    const node = this.findDOMNode();
    if (node) {
      const ownerDocument = node.ownerDocument;
      removeEvent(ownerDocument, MOUSE_EVENTS.move, this.handleDrag);
      removeEvent(ownerDocument, TOUCH_EVENTS.move, this.handleDrag);
      removeEvent(ownerDocument, MOUSE_EVENTS.stop, this.handleDragStop);
      removeEvent(ownerDocument, TOUCH_EVENTS.stop, this.handleDragStop);
      removeEvent(node, TOUCH_EVENTS.start, this.onTouchStart, { passive: false });
      if (this.props.enableUserSelectHack) {
        scheduleRemoveUserSelectStyles(ownerDocument);
      }
    }
  }

  findDOMNode(): HTMLElement | null {
    if (this.props.nodeRef) {
      return this.props.nodeRef.current ?? null;
    }
    return ReactDOM.findDOMNode(this) as HTMLElement | null;
  }

  handleDragStart = (event: MouseEvent | TouchEvent): boolean | void => {
    this.props.onMouseDown?.(event as any);

    if (
      this.props.allowAnyClick !== true &&
      typeof (event as MouseEvent).button === 'number' &&
      (event as MouseEvent).button !== 0
    ) {
      return false;
    }

    const node = this.findDOMNode();
    if (!node || !node.ownerDocument || !node.ownerDocument.body) {
      throw new Error('<DraggableCore> not mounted on DragStart!');
    }

    const ownerDocument = node.ownerDocument;

    if (
      this.props.disabled ||
      !(event.target instanceof ownerDocument.defaultView!.Node) ||
      (this.props.handle && !matchesSelectorAndParentsTo(event.target as Node, this.props.handle, node)) ||
      (this.props.cancel && matchesSelectorAndParentsTo(event.target as Node, this.props.cancel, node))
    ) {
      return;
    }

    if (event.type === 'touchstart' && !this.props.allowMobileScroll) {
      event.preventDefault();
    }

    const touchIdentifier = getTouchIdentifier(event);
    this.touchIdentifier = touchIdentifier;

    const position = getControlPosition(event, touchIdentifier, this);
    if (position == null) return;

    const { x, y } = position;
    const coreData = createCoreData(this, x, y);

    log('DraggableCore: handleDragStart: %j', coreData);
    log('calling', this.props.onStart);

    const shouldStart = this.props.onStart?.(event, coreData);
    if (shouldStart === false || this.mounted === false) return;

    if (this.props.enableUserSelectHack) {
      addUserSelectStyles(ownerDocument);
    }

    this.dragging = true;
    this.lastX = x;
    this.lastY = y;

    addEvent(ownerDocument, this.eventHandler.move, this.handleDrag);
    addEvent(ownerDocument, this.eventHandler.stop, this.handleDragStop);
  };

  handleDrag = (event: MouseEvent | TouchEvent): void => {
    const position = getControlPosition(event, this.touchIdentifier, this);
    if (position == null) return;

    let { x, y } = position;

    if (Array.isArray(this.props.grid)) {
      let deltaX = x - this.lastX;
      let deltaY = y - this.lastY;
      const snapped = snapToGrid(this.props.grid, deltaX, deltaY);
      [deltaX, deltaY] = snapped;

      if (!deltaX && !deltaY) return;

      x = this.lastX + deltaX;
      y = this.lastY + deltaY;
    }

    const coreData = createCoreData(this, x, y);
    log('DraggableCore: handleDrag: %j', coreData);

    const shouldContinue = this.props.onDrag?.(event, coreData);
    if (shouldContinue === false || this.mounted === false) {
      try {
        this.handleDragStop(new MouseEvent('mouseup'));
      } catch (error) {
        const mouseEvent = document.createEvent('MouseEvents');
        mouseEvent.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        this.handleDragStop(mouseEvent);
      }
      return;
    }

    this.lastX = x;
    this.lastY = y;
  };

  handleDragStop = (event: MouseEvent | TouchEvent): boolean | void => {
    if (!this.dragging) return;

    const position = getControlPosition(event, this.touchIdentifier, this);
    if (position == null) return;

    let { x, y } = position;

    if (Array.isArray(this.props.grid)) {
      let deltaX = x - this.lastX || 0;
      let deltaY = y - this.lastY || 0;
      const snapped = snapToGrid(this.props.grid, deltaX, deltaY);
      [deltaX, deltaY] = snapped;
      x = this.lastX + deltaX;
      y = this.lastY + deltaY;
    }

    const coreData = createCoreData(this, x, y);

    const shouldStop = this.props.onStop?.(event, coreData);
    if (shouldStop === false || this.mounted === false) {
      return false;
    }

    const node = this.findDOMNode();
    if (node && this.props.enableUserSelectHack) {
      scheduleRemoveUserSelectStyles(node.ownerDocument);
    }

    log('DraggableCore: handleDragStop: %j', coreData);

    this.dragging = false;
    this.lastX = NaN;
    this.lastY = NaN;

    if (node) {
      log('DraggableCore: Removing handlers');
      removeEvent(node.ownerDocument, this.eventHandler.move, this.handleDrag);
      removeEvent(node.ownerDocument, this.eventHandler.stop, this.handleDragStop);
    }
  };

  onMouseDown = (event: ReactMouseEvent): void => {
    this.eventHandler = MOUSE_EVENTS;
    this.handleDragStart(event.nativeEvent);
  };

  onMouseUp = (event: ReactMouseEvent): void => {
    this.eventHandler = MOUSE_EVENTS;
    this.handleDragStop(event.nativeEvent);
  };

  onTouchStart = (event: TouchEvent): void => {
    this.eventHandler = TOUCH_EVENTS;
    this.handleDragStart(event);
  };

  onTouchEnd = (event: ReactTouchEvent): void => {
    this.eventHandler = TOUCH_EVENTS;
    this.handleDragStop(event.nativeEvent);
  };

  render(): ReactElement {
    return React.cloneElement(React.Children.only(this.props.children), {
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onTouchEnd: this.onTouchEnd
    });
  }
}

export default DraggableCore;