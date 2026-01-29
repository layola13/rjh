import React, { Component, ReactElement, cloneElement, Children } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { createCSSTransform, createSVGTransform } from './positionFns';
import { canDragX, canDragY, createDraggableData, getBoundPosition } from './utils';
import { dontSetMe } from './propValidation';
import DraggableCore, { DraggableCoreProps } from './DraggableCore';
import log from './log';

interface Position {
  x: number;
  y: number;
}

interface PositionOffset {
  x: number | string;
  y: number | string;
}

interface Bounds {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

type Axis = 'both' | 'x' | 'y' | 'none';

export interface DraggableProps extends Omit<DraggableCoreProps, 'onStart' | 'onDrag' | 'onStop'> {
  axis?: Axis;
  bounds?: Bounds | string | false;
  defaultClassName?: string;
  defaultClassNameDragging?: string;
  defaultClassNameDragged?: string;
  defaultPosition?: Position;
  positionOffset?: PositionOffset;
  position?: Position;
  scale?: number;
  children: ReactElement;
  onStart?: (e: MouseEvent | TouchEvent, data: DraggableData) => boolean | void;
  onDrag?: (e: MouseEvent | TouchEvent, data: DraggableData) => boolean | void;
  onStop?: (e: MouseEvent | TouchEvent, data: DraggableData) => boolean | void;
  className?: never;
  style?: never;
  transform?: never;
}

export interface DraggableData {
  node: HTMLElement;
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  lastX: number;
  lastY: number;
}

interface DraggableState {
  dragging: boolean;
  dragged: boolean;
  x: number;
  y: number;
  prevPropsPosition?: Position;
  slackX: number;
  slackY: number;
  isElementSVG: boolean;
}

export default class Draggable extends Component<DraggableProps, DraggableState> {
  static displayName = 'Draggable';

  static propTypes = {
    ...DraggableCore.propTypes,
    axis: PropTypes.oneOf(['both', 'x', 'y', 'none']),
    bounds: PropTypes.oneOfType([
      PropTypes.shape({
        left: PropTypes.number,
        right: PropTypes.number,
        top: PropTypes.number,
        bottom: PropTypes.number
      }),
      PropTypes.string,
      PropTypes.oneOf([false])
    ]),
    defaultClassName: PropTypes.string,
    defaultClassNameDragging: PropTypes.string,
    defaultClassNameDragged: PropTypes.string,
    defaultPosition: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    positionOffset: PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    }),
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    className: dontSetMe,
    style: dontSetMe,
    transform: dontSetMe
  };

  static defaultProps = {
    ...DraggableCore.defaultProps,
    axis: 'both' as Axis,
    bounds: false,
    defaultClassName: 'react-draggable',
    defaultClassNameDragging: 'react-draggable-dragging',
    defaultClassNameDragged: 'react-draggable-dragged',
    defaultPosition: { x: 0, y: 0 },
    scale: 1
  };

  static getDerivedStateFromProps(
    props: DraggableProps,
    state: DraggableState
  ): Partial<DraggableState> | null {
    const { position } = props;
    const { prevPropsPosition } = state;

    if (!position || (prevPropsPosition && position.x === prevPropsPosition.x && position.y === prevPropsPosition.y)) {
      return null;
    }

    log('Draggable: getDerivedStateFromProps %j', {
      position,
      prevPropsPosition
    });

    return {
      x: position.x,
      y: position.y,
      prevPropsPosition: { ...position }
    };
  }

  constructor(props: DraggableProps) {
    super(props);

    this.state = {
      dragging: false,
      dragged: false,
      x: props.position ? props.position.x : props.defaultPosition!.x,
      y: props.position ? props.position.y : props.defaultPosition!.y,
      prevPropsPosition: props.position ? { ...props.position } : undefined,
      slackX: 0,
      slackY: 0,
      isElementSVG: false
    };

    if (props.position && !props.onDrag && !props.onStop) {
      console.warn(
        'A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element.'
      );
    }
  }

  componentDidMount(): void {
    if (typeof window.SVGElement !== 'undefined' && this.findDOMNode() instanceof window.SVGElement) {
      this.setState({ isElementSVG: true });
    }
  }

  componentWillUnmount(): void {
    if (this.state.dragging) {
      this.setState({ dragging: false });
    }
  }

  findDOMNode(): HTMLElement | null {
    return this.props.nodeRef?.current ?? ReactDOM.findDOMNode(this) as HTMLElement;
  }

  onDragStart = (e: MouseEvent | TouchEvent, coreData: DraggableData): boolean | void => {
    log('Draggable: onDragStart: %j', coreData);

    if (this.props.onStart?.(e, createDraggableData(this, coreData)) === false) {
      return false;
    }

    this.setState({
      dragging: true,
      dragged: true
    });
  };

  onDrag = (e: MouseEvent | TouchEvent, coreData: DraggableData): boolean | void => {
    if (!this.state.dragging) return false;

    log('Draggable: onDrag: %j', coreData);

    const draggableData = createDraggableData(this, coreData);
    const newState: Partial<DraggableState> = {
      x: draggableData.x,
      y: draggableData.y,
      slackX: 0,
      slackY: 0
    };

    if (this.props.bounds) {
      const { x: originalX, y: originalY } = newState;
      newState.x = (newState.x ?? 0) + this.state.slackX;
      newState.y = (newState.y ?? 0) + this.state.slackY;

      const [boundedX, boundedY] = getBoundPosition(this, newState.x, newState.y);
      newState.x = boundedX;
      newState.y = boundedY;
      newState.slackX = this.state.slackX + ((originalX ?? 0) - newState.x);
      newState.slackY = this.state.slackY + ((originalY ?? 0) - newState.y);

      draggableData.x = newState.x;
      draggableData.y = newState.y;
      draggableData.deltaX = newState.x - this.state.x;
      draggableData.deltaY = newState.y - this.state.y;
    }

    if (this.props.onDrag?.(e, draggableData) === false) {
      return false;
    }

    this.setState(newState as DraggableState);
  };

  onDragStop = (e: MouseEvent | TouchEvent, coreData: DraggableData): boolean | void => {
    if (!this.state.dragging) return false;

    if (this.props.onStop?.(e, createDraggableData(this, coreData)) === false) {
      return false;
    }

    log('Draggable: onDragStop: %j', coreData);

    const newState: Partial<DraggableState> = {
      dragging: false,
      slackX: 0,
      slackY: 0
    };

    if (this.props.position) {
      const { x, y } = this.props.position;
      newState.x = x;
      newState.y = y;
    }

    this.setState(newState as DraggableState);
  };

  render(): ReactElement {
    const {
      axis,
      bounds,
      children,
      defaultPosition,
      defaultClassName,
      defaultClassNameDragging,
      defaultClassNameDragged,
      position,
      positionOffset,
      scale,
      ...draggableCoreProps
    } = this.props;

    let style: React.CSSProperties = {};
    let svgTransform: string | null = null;

    const controlled = Boolean(position);
    const draggable = !controlled || this.state.dragging;
    const validPosition = position ?? defaultPosition!;

    const transformPosition: Position = {
      x: canDragX(this) && draggable ? this.state.x : validPosition.x,
      y: canDragY(this) && draggable ? this.state.y : validPosition.y
    };

    if (this.state.isElementSVG) {
      svgTransform = createSVGTransform(transformPosition, positionOffset);
    } else {
      style = createCSSTransform(transformPosition, positionOffset);
    }

    const className = clsx(
      children.props.className ?? '',
      defaultClassName,
      {
        [defaultClassNameDragging!]: this.state.dragging,
        [defaultClassNameDragged!]: this.state.dragged
      }
    );

    return (
      <DraggableCore
        {...draggableCoreProps}
        onStart={this.onDragStart}
        onDrag={this.onDrag}
        onStop={this.onDragStop}
      >
        {cloneElement(Children.only(children), {
          className,
          style: { ...children.props.style, ...style },
          transform: svgTransform
        })}
      </DraggableCore>
    );
  }
}

export { DraggableCore };