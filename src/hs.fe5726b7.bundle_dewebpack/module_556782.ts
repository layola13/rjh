import React from 'react';

interface AsyncParamResult {
  imgSrc?: string;
}

interface AsyncTextParamResult {
  text?: string;
}

interface ImageButtonData {
  src?: string;
  color?: number;
  label?: string;
  tooltip?: string;
  className?: string;
  disabled?: boolean;
  disable?: boolean;
  asyncParam?: Promise<AsyncParamResult>;
  asyncTextParam?: Promise<AsyncTextParamResult>;
  onclick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

interface ImageButtonProps {
  data: ImageButtonData;
  id?: string;
  imageCustom?: string;
}

interface ImageButtonState {
  data: ImageButtonData;
  src?: string;
  id?: string;
  color?: number;
  text: string;
  className?: string;
  imageCustom?: string;
}

class ImageButton extends React.Component<ImageButtonProps, ImageButtonState> {
  private imgbtn: HTMLDivElement | HTMLImageElement | null = null;

  constructor(props: ImageButtonProps) {
    super(props);
    
    const { data, id } = props;
    const { src, color, className } = data;

    this.state = {
      data,
      src,
      id,
      color,
      text: '',
      className,
      imageCustom: className
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: ImageButtonProps): void {
    const { data, id, imageCustom } = nextProps;
    const { color, className } = data;
    
    const updatedClassName = className || this.state.className;
    const updatedId = id || this.state.id;
    const updatedImageCustom = imageCustom || this.state.imageCustom;

    if (data.asyncParam instanceof Promise) {
      data.asyncParam.then((result) => {
        if (result?.imgSrc) {
          this.setState({
            data,
            src: result.imgSrc,
            color,
            className: updatedClassName,
            id: updatedId,
            imageCustom: updatedImageCustom
          });
        }
      });
    } else if (data.asyncTextParam instanceof Promise) {
      data.asyncTextParam.then((result) => {
        if (result?.text) {
          this.setState({
            data,
            src: nextProps.data.src,
            color,
            text: result.text,
            className: updatedClassName,
            id: updatedId,
            imageCustom: updatedImageCustom
          });
        } else {
          this.setState({
            data,
            src: nextProps.data.src,
            color,
            text: '',
            className: updatedClassName,
            id: updatedId,
            imageCustom: updatedImageCustom
          });
        }
      });
    } else {
      this.setState({
        data,
        src: nextProps.data.src,
        color,
        text: '',
        className: updatedClassName,
        id: updatedId,
        imageCustom: updatedImageCustom
      });
    }
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

    this.applyBackgroundColor();
  }

  componentDidUpdate(): void {
    this.applyBackgroundColor();
  }

  private applyBackgroundColor(): void {
    const { color } = this.state;
    
    if (color != null && color !== '' && this.imgbtn) {
      const hexColor = this.convertToHexColor(color);
      (this.imgbtn as HTMLElement).style.backgroundColor = hexColor;
    }
  }

  private convertToHexColor(color: number): string {
    const hexString = color.toString(16);
    const paddingLength = 6 - hexString.length;
    const paddedHex = '0'.repeat(Math.max(0, paddingLength)) + hexString;
    return `#${paddedHex}`;
  }

  private handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const { data } = this.state;
    if (!data.disable && data.onclick) {
      data.onclick(event);
    }
  };

  render(): React.ReactNode {
    const { data, src, id, text, className } = this.state;
    const { tooltip, label, disabled, disable } = data;

    const labelVisibilityClass = tooltip ? '' : 'labelHidden';
    const disabledClass = disabled || disable ? 'disable' : '';

    let textElement: React.ReactNode = null;
    if (text != null && text !== '') {
      const TEXT_LENGTH_THRESHOLD = 5;
      const doubleLineClass = text.length > TEXT_LENGTH_THRESHOLD ? ' double_line' : '';
      textElement = (
        <span className={`imgbtn_text${doubleLineClass}`}>
          {text}
        </span>
      );
    }

    const commonContent = (
      <>
        <div className={`imglabel ${labelVisibilityClass}`}>
          <span className="label">{tooltip}:</span>
        </div>
        <div className={`imgdiv ${disabledClass}`} onClick={this.handleClick}>
          {src ? (
            <div className="image-wrap">
              <img
                className="imgbtn"
                src={src}
                ref={(el) => (this.imgbtn = el)}
              />
            </div>
          ) : (
            <div
              className="imgbtn"
              ref={(el) => (this.imgbtn = el)}
            />
          )}
          {textElement}
          <div className="imgtriangle">
            <div className="imgtriangle1" />
          </div>
          <div className="footlable">{label}</div>
        </div>
      </>
    );

    return (
      <div id={id} className={`right_imgbtn ${className ?? ''}`}>
        {commonContent}
      </div>
    );
  }
}

export default ImageButton;