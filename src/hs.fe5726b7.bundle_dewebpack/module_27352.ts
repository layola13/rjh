import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

interface Position {
  top: number;
  left: number;
  height: number;
  width: number;
}

interface Offset {
  x: number;
  y: number;
}

type TriggerType = 'click' | 'hover' | 'manual' | 'new';

type Placement = 'right' | 'left' | 'top' | 'bottom' | 'topL' | 'topR' | 'bottomL' | 'bottomR' | 'leftT' | 'leftB' | 'rightT' | 'rightB';

interface PopoverProps {
  placement: Placement;
  onMediaLoaded?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  ref?: (node: PopoverNode | null) => void;
}

interface PopoverNode {
  setPosition: (left: number, top: number) => void;
}

interface DOMUtils {
  offset: (element: Element) => { top: number; left: number };
}

interface PopoverManagerProps {
  trigger?: TriggerType;
  delay?: number;
  delayOpen?: number | null;
  delayClose?: number | null;
  popover: React.ReactElement<PopoverProps>;
  onOpen?: () => void;
  onClose?: () => void;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  offset?: Offset;
  keepOpen?: boolean;
  isParentLocation?: boolean;
  children: React.ReactElement;
}

interface PopoverManagerState {
  isPopoverActive: boolean;
}

declare const DOMUtil: DOMUtils;

function chainFunctions(...funcs: Array<(() => void) | undefined>): () => void {
  return function chainedFunction() {
    funcs.forEach(func => {
      if (func) {
        func.apply(this, arguments);
      }
    });
  };
}

class PopoverManager extends React.Component<PopoverManagerProps, PopoverManagerState> {
  static propTypes = {
    trigger: PropTypes.oneOf(['click', 'hover', 'manual', 'new']),
    delay: PropTypes.number,
    delayOpen: PropTypes.number,
    delayClose: PropTypes.number,
    popover: PropTypes.node.isRequired,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    offset: PropTypes.object,
    keepOpen: PropTypes.bool,
    isParentLocation: PropTypes.bool
  };

  static defaultProps = {
    trigger: 'click' as TriggerType,
    delay: 200,
    offset: { x: 0, y: 0 },
    delayOpen: null,
    delayClose: null,
    keepOpen: false,
    isParentLocation: false
  };

  private isMounted: boolean = false;
  private _popoverRoot: HTMLDivElement | null = null;
  private _popoverNode: PopoverNode | null = null;
  private _hoverDelay: number | null = null;
  private _isOpened: boolean = false;

  constructor(props: PopoverManagerProps) {
    super(props);
    this.state = {
      isPopoverActive: false
    };

    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.handleDelayedOpen = this.handleDelayedOpen.bind(this);
    this.handleDelayedClose = this.handleDelayedClose.bind(this);
  }

  componentDidMount(): void {
    this.isMounted = true;
    this._popoverRoot = document.createElement('div');
    document.body.appendChild(this._popoverRoot);

    if (this.props.trigger === 'new') {
      this.open();
      if (this.props.delayClose) {
        setTimeout(this.close, this.props.delayClose);
      }
    }
  }

  componentWillUnmount(): void {
    if (this._hoverDelay !== null) {
      clearTimeout(this._hoverDelay);
    }
    if (this._popoverRoot) {
      ReactDOM.unmountComponentAtNode(this._popoverRoot);
    }
  }

  getPosition(): Position {
    let element = ReactDOM.findDOMNode(this) as Element;
    if (this.props.isParentLocation && element.parentNode) {
      element = element.parentNode as Element;
    }

    const offset = DOMUtil.offset(element);
    const htmlElement = element as HTMLElement;

    return {
      ...offset,
      height: htmlElement.offsetHeight,
      width: htmlElement.offsetWidth
    };
  }

  isOpened(): boolean {
    return this._isOpened;
  }

  open(): void {
    this._isOpened = true;
    this.props.onOpen?.();
    this.setState({ isPopoverActive: true });
  }

  close(force?: boolean): void {
    if (this.props.trigger === 'hover' && this.props.keepOpen && !force) {
      return;
    }

    this._isOpened = false;
    this.props.onClose?.();
    this.setState({ isPopoverActive: false });
  }

  toggle(): void {
    if (this.state.isPopoverActive) {
      this.close();
    } else {
      this.open();
    }
  }

  handleMouseOver(): void {
    if (this.props.trigger === 'hover') {
      this.open();
    }
  }

  handleMouseOut(): void {
    if (this.props.trigger === 'hover') {
      this.close();
    }
  }

  handleClick(): void {
    if (this.props.trigger === 'click') {
      this.toggle();
    }
  }

  handleDelayedOpen(): void {
    if (this._hoverDelay !== null) {
      clearTimeout(this._hoverDelay);
      this._hoverDelay = null;
      return;
    }

    const delay = this.props.delayOpen ?? this.props.delay;

    if (delay) {
      this._hoverDelay = window.setTimeout(() => {
        this._hoverDelay = null;
        this.open();
      }, delay);
    } else {
      this.open();
    }
  }

  handleDelayedClose(): void {
    if (this._hoverDelay !== null) {
      clearTimeout(this._hoverDelay);
      this._hoverDelay = null;
      return;
    }

    const delay = this.props.delayClose ?? this.props.delay;

    if (delay) {
      if (delay === 0) {
        this._hoverDelay = null;
        this.close();
      } else {
        this._hoverDelay = window.setTimeout(() => {
          this._hoverDelay = null;
          this.close();
        }, delay);
      }
    } else {
      this.close();
    }
  }

  updatePopoverPosition(): void {
    if (this.isMounted && this._popoverNode) {
      const position = this.calcPopoverPosition();
      this._popoverNode.setPosition(position.left, position.top);
    }
  }

  calcPopoverPosition(): { top: number; left: number } {
    const anchorPosition = this.getPosition();
    const popoverElement = this._popoverRoot!.childNodes[0] as HTMLElement;
    const popoverHeight = popoverElement.offsetHeight;
    const popoverWidth = popoverElement.offsetWidth;
    const popover = this.props.popover;
    const offset = this.props.offset!;

    const SPACING = 5;
    const ARROW_OFFSET = 4;

    switch (popover.props.placement) {
      case 'right':
        return {
          top: anchorPosition.top + anchorPosition.height / 2 - popoverHeight / 2,
          left: anchorPosition.left + anchorPosition.width + SPACING + offset.x
        };

      case 'left':
        return {
          top: anchorPosition.top + anchorPosition.height / 2 - popoverHeight / 2,
          left: anchorPosition.left - popoverWidth - SPACING - offset.x
        };

      case 'top':
        return {
          top: anchorPosition.top - popoverHeight - SPACING - offset.y,
          left: anchorPosition.left + anchorPosition.width / 2 - popoverWidth / 2
        };

      case 'bottom':
        return {
          top: anchorPosition.top + anchorPosition.height + SPACING + offset.y,
          left: anchorPosition.left + anchorPosition.width / 2 - popoverWidth / 2
        };

      case 'topL':
        return {
          top: anchorPosition.top - popoverHeight - SPACING - offset.y,
          left: anchorPosition.left + anchorPosition.width / 2 - popoverWidth / 5 - ARROW_OFFSET - offset.x
        };

      case 'topR':
        return {
          top: anchorPosition.top - popoverHeight - SPACING - offset.y,
          left: anchorPosition.left + anchorPosition.width / 2 - 4 * popoverWidth / 5 - ARROW_OFFSET + offset.x
        };

      case 'bottomL':
        return {
          top: anchorPosition.top + anchorPosition.height + SPACING + offset.y,
          left: anchorPosition.left + anchorPosition.width / 2 - popoverWidth / 5 - ARROW_OFFSET - offset.x
        };

      case 'bottomR':
        return {
          top: anchorPosition.top + anchorPosition.height + SPACING + offset.y,
          left: anchorPosition.left + anchorPosition.width / 2 - 4 * popoverWidth / 5 - ARROW_OFFSET + offset.x
        };

      case 'leftT':
        return {
          top: anchorPosition.top + anchorPosition.height / 2 - popoverHeight / 5 - ARROW_OFFSET - offset.y,
          left: anchorPosition.left - popoverWidth - SPACING - offset.x
        };

      case 'leftB':
        return {
          top: anchorPosition.top + anchorPosition.height / 2 - 4 * popoverHeight / 5 - ARROW_OFFSET + offset.y,
          left: anchorPosition.left - popoverWidth - SPACING - offset.x
        };

      case 'rightT':
        return {
          top: anchorPosition.top + anchorPosition.height / 2 - popoverHeight / 5 - ARROW_OFFSET - offset.y,
          left: anchorPosition.left + anchorPosition.width + SPACING + offset.x
        };

      case 'rightB':
        return {
          top: anchorPosition.top + anchorPosition.height / 2 - 4 * popoverHeight / 5 - ARROW_OFFSET + offset.y,
          left: anchorPosition.left + anchorPosition.width + SPACING + offset.x
        };

      default:
        throw new Error(`calcPopoverPosition(): No such placement of [${popover.props.placement}] found.`);
    }
  }

  handleMediaLoaded(): void {
    this.updatePopoverPosition();
  }

  handlePopoverMouseOver(): void {
    if (this.props.trigger === 'hover') {
      this.handleDelayedOpen();
    }
  }

  handlePopoverMouseOut(): void {
    if (this.props.trigger === 'hover') {
      this.handleDelayedClose();
    }
  }

  renderPopover(): void {
    if (!this.isMounted || !this._popoverRoot) {
      return;
    }

    if (this.state.isPopoverActive) {
      const popover = React.cloneElement(this.props.popover, {
        onMediaLoaded: () => this.handleMediaLoaded(),
        onMouseOver: () => this.handlePopoverMouseOver(),
        onMouseOut: () => this.handlePopoverMouseOut(),
        ref: (node: PopoverNode | null) => {
          this._popoverNode = node;
        }
      });

      ReactDOM.render(popover, this._popoverRoot, () => {
        this.updatePopoverPosition();
      });
    } else {
      ReactDOM.render(React.createElement('span', null), this._popoverRoot, () => {
        this.updatePopoverPosition();
      });
    }
  }

  render(): React.ReactElement {
    this.renderPopover();

    const child = React.Children.only(this.props.children);
    const props: Record<string, unknown> = {};

    props.onClick = chainFunctions(child.props.onClick, this.props.onClick);

    if (this.props.trigger === 'click') {
      props.onClick = chainFunctions(this.toggle, props.onClick as (() => void) | undefined);
    }

    if (this.props.trigger === 'hover') {
      props.onMouseOver = chainFunctions(this.handleDelayedOpen, this.props.onMouseOver);
      props.onMouseOut = chainFunctions(this.handleDelayedClose, this.props.onMouseOut);
    }

    if (this.props.trigger === 'focus') {
      props.onFocus = chainFunctions(this.handleDelayedOpen, this.props.onFocus);
      props.onBlur = chainFunctions(this.handleDelayedClose, this.props.onBlur);
    }

    return React.cloneElement(child, props);
  }
}

export default PopoverManager;