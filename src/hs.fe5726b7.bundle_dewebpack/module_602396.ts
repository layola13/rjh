import React from 'react';

interface TriggerInstance {
  close(): void;
  open(): void;
  isOpened(): boolean;
  toggle(): void;
}

type TriggerType = 'click' | 'hover' | 'manual' | 'new';
type PlacementType = 'top' | 'right' | 'bottom' | 'left';

interface PopoverTriggerProps {
  trigger?: TriggerType;
  delay?: number;
  delayOpen?: number | null;
  delayClose?: number | null;
  className?: string;
  placement?: PlacementType;
  imageUrl?: string | null;
  videoUrl?: string | null;
  text?: string | null;
  showBtn?: boolean;
  onBtnClick?: () => void;
  btnText?: string;
  linkText?: string;
  linkUrl?: string | null;
  onOpen?: () => void;
  onClose?: () => void;
  showConfirm?: boolean;
  cancelText?: string;
  okText?: string;
  onOk?: (event: React.MouseEvent) => void;
  onCancel?: (event: React.MouseEvent) => void;
  dismissOnClick?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: React.ReactNode;
}

interface PopoverTriggerState {}

class PopoverTrigger extends React.Component<PopoverTriggerProps, PopoverTriggerState> {
  static defaultProps: Partial<PopoverTriggerProps> = {
    placement: 'top',
    trigger: 'manual',
    className: '',
    delay: 200,
    delayOpen: null,
    delayClose: null,
    imageUrl: null,
    videoUrl: null,
    text: null,
    linkUrl: null,
    showBtn: false,
    onBtnClick: () => {},
    linkText: '视频教程',
    showConfirm: false,
    onOk: null,
    onCancel: null,
    dismissOnClick: false,
    onMouseEnter: () => {},
    onMouseLeave: () => {}
  };

  state: PopoverTriggerState = {};
  triggerInst: TriggerInstance | null = null;

  constructor(props: PopoverTriggerProps) {
    super(props);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onOk = this.onOk.bind(this);
    this.documentClickedHidePopup = this.documentClickedHidePopup.bind(this);
  }

  componentDidMount(): void {
    if (this.props.showConfirm) {
      document.addEventListener('mousedown', this.documentClickedHidePopup);
    }
  }

  componentWillUnmount(): void {
    if (this.props.showConfirm) {
      document.removeEventListener('mousedown', this.documentClickedHidePopup);
    }
  }

  documentClickedHidePopup(event: MouseEvent): void {
    const popoverElement = $('.hs-popover-heavy');
    const isClickOutside = !popoverElement.is(event.target) && 
                          popoverElement.has(event.target as HTMLElement).length === 0;
    
    if (isClickOutside && this.triggerInst) {
      this.triggerInst.close();
    }
  }

  handleBtnClick(): void {
    this.props.onBtnClick?.();
    this.triggerInst?.close();
  }

  onOk(event: React.MouseEvent): void {
    this.props.onOk?.(event);
    this.triggerInst?.close();
  }

  onCancel(event: React.MouseEvent): void {
    this.props.onCancel?.(event);
    this.triggerInst?.close();
  }

  isOpened(): boolean {
    return this.triggerInst?.isOpened() ?? false;
  }

  open(): void {
    this.triggerInst?.open();
  }

  close(): void {
    this.triggerInst?.close();
  }

  toggle(): void {
    this.triggerInst?.toggle();
  }

  render(): React.ReactNode {
    const {
      btnText = ResourceManager.getString('toolBar_tip_I_know'),
      okText = ResourceManager.getString('confirm'),
      cancelText = ResourceManager.getString('cancel')
    } = this.props;

    return React.createElement(
      Trigger,
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
        popover: React.createElement(Popover, {
          className: this.props.className,
          placement: this.props.placement,
          imageUrl: this.props.imageUrl,
          videoUrl: this.props.videoUrl,
          text: this.props.text,
          showBtn: this.props.showBtn,
          onBtnClick: this.handleBtnClick,
          btnText: btnText,
          linkText: this.props.linkText,
          linkUrl: this.props.linkUrl,
          showConfirm: this.props.showConfirm,
          cancelText: cancelText,
          okText: okText,
          onOk: this.onOk,
          onCancel: this.onCancel,
          onMouseEnter: this.props.onMouseEnter,
          onMouseLeave: this.props.onMouseLeave
        })
      },
      this.props.children
    );
  }
}

export default PopoverTrigger;