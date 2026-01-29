import * as React from 'react';
import PropTypes from 'prop-types';

interface Offset {
  x: number;
  y: number;
}

type Placement = 'top' | 'right' | 'bottom' | 'left';
type Trigger = 'click' | 'hover' | 'manual' | 'new';

interface TooltipProps {
  className?: string;
  placement?: Placement;
  trigger?: Trigger;
  title: string;
  delay?: number;
  offset?: Offset;
  delayOpen?: number | null;
  delayClose?: number | null;
  onOpen?: () => void;
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isParentLocation?: boolean;
  showDot?: boolean;
  canRemove?: boolean;
  children?: React.ReactNode;
}

interface TooltipState {
  keepOpen: boolean;
}

interface TriggerInstance {
  isOpened(): boolean;
  open(): void;
  close(force?: boolean): void;
  toggle(): void;
}

interface PopoverProps {
  className?: string;
  placement?: Placement;
  type?: string;
  showDot?: boolean;
  canRemove?: boolean;
  trigger?: Trigger;
  onRemove: () => void;
  setKeepOpen: (keepOpen: boolean) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: React.ReactNode;
}

declare const TriggerComponent: React.ComponentType<{
  ref?: (instance: TriggerInstance | null) => void;
  trigger?: Trigger;
  delay?: number;
  delayOpen?: number | null;
  delayClose?: number | null;
  onOpen?: () => void;
  onClose?: () => void;
  offset?: Offset;
  isParentLocation?: boolean;
  keepOpen?: boolean;
  popover?: React.ReactElement;
  children?: React.ReactNode;
}>;

declare const PopoverComponent: React.ComponentType<PopoverProps>;

class Tooltip extends React.Component<TooltipProps, TooltipState> {
  static propTypes = {
    className: PropTypes.string,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    trigger: PropTypes.oneOf(['click', 'hover', 'manual', 'new']),
    title: PropTypes.string.isRequired,
    delay: PropTypes.number,
    offset: PropTypes.object,
    delayOpen: PropTypes.number,
    delayClose: PropTypes.number,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    isParentLocation: PropTypes.bool
  };

  static defaultProps: Partial<TooltipProps> = {
    className: '',
    placement: 'top',
    trigger: 'hover',
    showDot: false,
    canRemove: false,
    delay: 200,
    delayOpen: null,
    delayClose: null,
    title: '',
    offset: {
      x: 0,
      y: 0
    },
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    isParentLocation: false
  };

  triggerInst: TriggerInstance | null = null;

  constructor(props: TooltipProps) {
    super(props);
    this.state = {
      keepOpen: false
    };
  }

  isOpened(): boolean {
    return !!this.triggerInst && this.triggerInst.isOpened();
  }

  open(): void {
    this.triggerInst?.open();
  }

  close(force?: boolean): void {
    this.triggerInst?.close(force);
  }

  toggle(): void {
    this.triggerInst?.toggle();
  }

  setKeepOpen(keepOpen: boolean): void {
    this.setState({ keepOpen });
  }

  render(): React.ReactElement {
    return React.createElement(
      TriggerComponent,
      {
        ref: (instance: TriggerInstance | null) => {
          this.triggerInst = instance;
        },
        trigger: this.props.trigger,
        delay: this.props.delay,
        delayOpen: this.props.delayOpen,
        delayClose: this.props.delayClose,
        onOpen: this.props.onOpen,
        onClose: this.props.onClose,
        offset: this.props.offset,
        isParentLocation: this.props.isParentLocation,
        keepOpen: this.state.keepOpen,
        popover: React.createElement(
          PopoverComponent,
          {
            className: this.props.className,
            placement: this.props.placement,
            type: this.props.type,
            showDot: this.props.showDot,
            canRemove: this.props.canRemove,
            trigger: this.props.trigger,
            onRemove: () => this.close(true),
            setKeepOpen: (keepOpen: boolean) => this.setKeepOpen(keepOpen),
            onMouseEnter: this.props.onMouseEnter,
            onMouseLeave: this.props.onMouseLeave
          },
          this.props.title
        )
      },
      this.props.children
    );
  }
}

export default Tooltip;