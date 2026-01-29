import React from 'react';
import PropTypes from 'prop-types';

interface AsyncParamResult {
  imgSrc?: string;
}

interface AsyncTextParamResult {
  text?: string;
}

interface Metadata {
  showfavorite?: boolean;
  [key: string]: any;
}

interface ImageButtonData {
  src?: string;
  panelPosition?: any;
  color?: number;
  className?: string;
  meta?: Metadata | null;
  seekId?: string;
  asyncParam?: Promise<AsyncParamResult>;
  asyncTextParam?: Promise<AsyncTextParamResult>;
  tooltip?: string;
  label?: string;
  disabled?: boolean;
  onclick?: (event: React.MouseEvent) => void;
}

interface ImageButtonProps {
  data: ImageButtonData;
  src?: string;
  id?: string;
  color?: string;
  label?: string;
  className?: string;
  imageCustom?: string;
  rightFirstLineText?: string;
  rightSecondLineText?: string;
}

interface ImageButtonState {
  data: ImageButtonData;
  src?: string;
  id?: string;
  panelPosition?: any;
  color?: number;
  className?: string;
  imageCustom?: string;
  metadata: Metadata | null;
  text?: string;
}

declare const HSApp: any;
declare const HSFPConstants: any;
declare const React: any;

class ImageButton extends React.Component<ImageButtonProps, ImageButtonState> {
  static propTypes = {
    data: PropTypes.object,
    src: PropTypes.string,
    id: PropTypes.string,
    color: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    imageCustom: PropTypes.string,
    rightFirstLineText: PropTypes.string,
    rightSecondLineText: PropTypes.string
  };

  static defaultProps: Partial<ImageButtonProps> = {
    data: {},
    src: '',
    id: '',
    color: '',
    label: '',
    className: '',
    imageCustom: '',
    rightFirstLineText: '',
    rightSecondLineText: ''
  };

  private imgbtn: HTMLElement | null = null;

  constructor(props: ImageButtonProps) {
    super(props);
    this.state = {
      data: props.data,
      src: props.data.src,
      id: props.id,
      panelPosition: props.data.panelPosition,
      color: props.data.color,
      className: props.data.className,
      imageCustom: props.data.className,
      metadata: props.data.meta ?? null
    };
  }

  componentDidMount(): void {
    const { data } = this.state;

    if (data.asyncParam instanceof Promise) {
      data.asyncParam.then((result) => {
        if (result?.imgSrc) {
          this.setState({ src: result.imgSrc });
        }
      });
    }

    if (data.asyncTextParam instanceof Promise) {
      data.asyncTextParam.then((result) => {
        if (result?.text) {
          this.setState({ text: result.text });
        }
      });
    }

    if (this.state.color !== undefined && this.state.color !== '' && !this.state.src) {
      this.applyBackgroundColor(this.state.color);
    }

    if (data.meta) {
      this.setState({ metadata: data.meta });
    } else if (data.seekId) {
      this.setMetadataBySeekId(data.seekId);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: ImageButtonProps): void {
    const { data } = nextProps;
    const color = data.color;
    const className = data.className ?? this.state.className;
    const id = nextProps.id ?? this.state.id;
    const imageCustom = nextProps.imageCustom ?? this.state.imageCustom;

    if (data.asyncParam instanceof Promise) {
      data.asyncParam.then((result) => {
        if (result?.imgSrc) {
          this.setState({
            data,
            src: result.imgSrc,
            color,
            className,
            id,
            imageCustom
          });
        }
      });
    } else if (data.asyncTextParam instanceof Promise) {
      data.asyncTextParam.then((result) => {
        this.setState({
          data,
          src: nextProps.data.src,
          color,
          text: result?.text ?? '',
          className,
          id,
          imageCustom
        });
      });
    } else {
      this.setState({
        data,
        src: nextProps.data.src,
        color,
        text: '',
        className,
        id,
        imageCustom
      });
    }

    if (data.meta) {
      this.setState({ metadata: data.meta });
    } else if (data.seekId) {
      this.setMetadataBySeekId(data.seekId);
    } else {
      this.setState({ metadata: null });
    }
  }

  componentDidUpdate(): void {
    if (this.state.color !== undefined && this.state.color !== '' && !this.state.src) {
      this.applyBackgroundColor(this.state.color);
    }
  }

  private applyBackgroundColor(color: number): void {
    if (!this.imgbtn) return;
    
    let hexColor = color.toString(16);
    const paddingLength = 6 - hexColor.length;
    hexColor = `#${'0'.repeat(paddingLength)}${hexColor}`;
    this.imgbtn.style.backgroundColor = hexColor;
  }

  private setMetadataBySeekId(seekId: string): void {
    if (!seekId || seekId === 'local') return;

    const app = HSApp.App.getApp();
    const cachedMetadata = app.materialManager.getMetaData(seekId);

    if (cachedMetadata) {
      this.setState({ metadata: cachedMetadata });
    } else {
      app.catalogManager.getProductBySeekId(seekId)
        .then((metadata: Metadata) => {
          this.setState({ metadata });
        })
        .catch(() => {
          // Error handling
        });
    }
  }

  private showDetailsPanel(): void {
    if (this.state.metadata) {
      this.renderDetailsPanel();
    }
  }

  private hideDetailsPanel(): void {
    if (this.state.metadata) {
      this.renderUnmountDetailsPanel();
    }
  }

  private renderDetailsPanel(): void {
    if (!this.state.metadata) return;

    const app = HSApp.App.getApp();
    const guidePlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Guide);

    if (guidePlugin?.showGuide()) return;

    const metadata = { ...this.state.metadata, showfavorite: true };
    const rightPropertyBarPosition = app.layoutMgr.getPosition('RightPropertyBar');
    const buttonRect = this.imgbtn?.getBoundingClientRect();
    
    if (!buttonRect) return;

    const position = {
      top: buttonRect.top,
      right: document.documentElement.offsetWidth - rightPropertyBarPosition.left + 8
    };

    // Assuming DetailsPanelService is imported
    // DetailsPanelService.showLargeView(metadata, position, false);
  }

  private renderUnmountDetailsPanel(): void {
    // Assuming DetailsPanelService is imported
    // DetailsPanelService.hideLargeView();
  }

  render(): React.ReactNode {
    const { data, src, id, className, text } = this.state;
    const { rightFirstLineText, rightSecondLineText } = this.props.data;
    const { tooltip, label, disabled, onclick } = data;

    const labelVisibilityClass = tooltip ? '' : 'labelHidden';
    const disabledClass = disabled ? 'disable' : '';

    let textElement: React.ReactNode = null;
    if (text !== undefined && text !== '') {
      const doubleLineClass = text.length > 5 ? ' double_line' : '';
      textElement = React.createElement('p', { className: `imgbtn_text${doubleLineClass}` }, text);
    }

    return React.createElement(
      'div',
      { id, className: `right_imgbtn ${className ?? ''}` },
      React.createElement(
        'div',
        { className: `imglabel ${labelVisibilityClass}` },
        React.createElement('span', { className: 'label' }, tooltip)
      ),
      React.createElement(
        'div',
        {
          className: `imgdiv ${disabledClass}`,
          onClick: (event: React.MouseEvent) => {
            if (!disabled && onclick) {
              onclick(event);
            }
          },
          onMouseEnter: this.showDetailsPanel.bind(this),
          onMouseLeave: this.hideDetailsPanel.bind(this)
        },
        src
          ? React.createElement(
              'div',
              { className: 'image-wrap' },
              React.createElement('img', {
                className: 'imgbtn',
                src,
                ref: (element: HTMLImageElement) => { this.imgbtn = element; },
                alt: ''
              })
            )
          : React.createElement('div', {
              className: 'imgbtn',
              ref: (element: HTMLDivElement) => { this.imgbtn = element; },
              alt: ''
            }),
        textElement,
        React.createElement(
          'div',
          { className: 'imgtriangle' },
          React.createElement('div', { className: 'imgtriangle1' })
        ),
        React.createElement('div', { className: 'footlable' }, label)
      ),
      (rightFirstLineText || rightSecondLineText) &&
        React.createElement(
          'div',
          { className: 'image-button-right-part' },
          rightFirstLineText &&
            React.createElement(
              'div',
              { className: 'image-button-right-first-line-text' },
              rightFirstLineText
            ),
          rightSecondLineText &&
            React.createElement(
              'div',
              { className: 'image-button-right-second-line-text' },
              rightSecondLineText
            )
        )
    );
  }
}

export default ImageButton;