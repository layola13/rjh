interface MessageBoxOptions {
  title?: string;
  disablemask?: boolean;
  contentsSelectable?: boolean;
  dontShowAgain?: boolean;
  checkboxContent?: string;
  isChecked?: boolean;
  extraContent?: ExtraContent;
}

interface ExtraContent {
  style?: React.CSSProperties;
  strs: string[];
}

interface LinkContent {
  link: string;
  str: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

interface CheckboxConfig {
  checkboxText: string;
  checkState: boolean;
  callback: (checked: boolean) => void;
}

interface ModalConfig {
  content: React.ReactElement;
  okButtonContent: string;
  cancelButtonContent: string;
  hideCancelButton: boolean;
  mask: boolean;
  title: string;
  enableCheckbox: string;
  contentsSelectable: boolean;
  closable: boolean;
  checkbox: CheckboxConfig;
  onOk: () => void;
  onCancel: () => void;
  onClose: () => void;
  closeByOkButton?: boolean;
}

interface ShowOptions {
  closeByOkButton?: boolean;
}

type MessageBoxCallback = (buttonIndex: number, _?: undefined, checked?: boolean) => void;

class MessageBox {
  private msg: string = '';
  private buttons: string[] = [];
  private defaultbtnIndex: number = 0;
  private title: string = '';
  private disablemask: boolean = false;
  private contentsSelectable: boolean = false;
  private dontShowAgain: boolean = false;
  private tabindex: number = 0;
  private checkboxContent: string = '';
  private isChecked: boolean = false;
  private linkContent: LinkContent | null = null;
  private extraContent?: ExtraContent;

  static create(
    message: string,
    buttons: string[],
    defaultBtnIndex: number,
    options: MessageBoxOptions,
    linkContent: LinkContent | null
  ): MessageBox {
    const messageBox = new MessageBox();
    messageBox._init(message, buttons, defaultBtnIndex, options, linkContent);
    return messageBox;
  }

  private _init(
    message: string,
    buttons: string[],
    defaultBtnIndex: number,
    options: MessageBoxOptions,
    linkContent: LinkContent | null
  ): void {
    this.msg = message || '';
    this.buttons = buttons || [];
    this.defaultbtnIndex = defaultBtnIndex || 0;
    const opts = options || {};
    this.title = opts.title || '';
    this.disablemask = opts.disablemask || false;
    this.contentsSelectable = opts.contentsSelectable || false;
    this.dontShowAgain = opts.dontShowAgain || false;
    this.tabindex = 0;
    this.checkboxContent = opts.checkboxContent || '';
    this.isChecked = opts.isChecked || false;
    this.linkContent = linkContent || null;
    this.extraContent = opts.extraContent;
  }

  show(callback: MessageBoxCallback, options: ShowOptions = { closeByOkButton: true }): void {
    const modalConfig: ModalConfig = {
      content: React.createElement(
        'div',
        { className: this.linkContent ? 'linkContent' : '' },
        React.createElement('span', {
          dangerouslySetInnerHTML: { __html: this.msg }
        }),
        this.linkContent && React.createElement(
          'a',
          {
            href: this.linkContent.link,
            target: '_blank',
            style: this.linkContent.style,
            onClick: () => this.linkContent?.onClick?.()
          },
          this.linkContent.str
        ),
        this.extraContent && React.createElement(
          'div',
          { style: this.extraContent.style },
          this.extraContent.strs.map((str) =>
            React.createElement('div', null, str)
          )
        )
      ),
      okButtonContent: this.buttons[1] ? this.buttons[1] : this.buttons[0],
      cancelButtonContent: this.buttons[0],
      hideCancelButton: !this.buttons[1],
      mask: !this.disablemask,
      title: this.title,
      enableCheckbox: this.checkboxContent,
      contentsSelectable: this.contentsSelectable,
      closable: this.buttons[2] !== false,
      checkbox: {
        checkboxText: this.checkboxContent,
        checkState: this.isChecked,
        callback: (checked: boolean) => callback?.(-1, undefined, checked)
      },
      onOk: () => callback?.(0),
      onCancel: () => callback?.(1),
      onClose: () => callback?.(2),
      ...options
    };

    Modal.basic(modalConfig);
  }

  close(): void {
    Modal.close('basic');
  }
}

const Modal = {
  basic(config: ModalConfig): void {
    // Modal implementation
  },
  close(type: string): void {
    // Modal close implementation
  }
};

if (typeof window !== 'undefined') {
  (window as any).MessageBox = MessageBox;
}

export default MessageBox;