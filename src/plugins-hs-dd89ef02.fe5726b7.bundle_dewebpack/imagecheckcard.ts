import React from 'react';

interface ButtonItem {
  isChecked: boolean;
  img: string;
  txt: string;
}

interface ImageCheckCardData {
  title: string;
  subTitle?: string;
  className?: string;
  buttonArr: ButtonItem[];
  onCheck?: (index: number) => void;
}

interface ImageCheckCardProps {
  data: ImageCheckCardData;
}

interface ImageCheckCardState {
  buttonArr: ButtonItem[];
}

export class ImageCheckCard extends React.Component<ImageCheckCardProps, ImageCheckCardState> {
  static defaultProps: ImageCheckCardProps = {
    data: {
      title: "",
      subTitle: "",
      className: "",
      buttonArr: [
        {
          isChecked: true,
          img: "",
          txt: "彩图模式"
        },
        {
          isChecked: false,
          img: "",
          txt: "黑白模式"
        }
      ],
      onCheck: () => {}
    }
  };

  constructor(props: ImageCheckCardProps) {
    super(props);
    const { buttonArr } = props.data;
    this.state = {
      buttonArr
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: ImageCheckCardProps): void {
    this.setState({
      buttonArr: nextProps.data.buttonArr
    });
  }

  onCheck = (selectedIndex: number): void => {
    const { buttonArr } = this.state;
    const length = buttonArr.length;
    
    for (let i = 0; i < length; i++) {
      buttonArr[i].isChecked = i === selectedIndex;
    }
    
    this.setState({ buttonArr }, () => {
      this.props.data.onCheck?.(selectedIndex);
    });
  };

  render(): JSX.Element {
    const { data } = this.props;
    const { title, subTitle, className } = data;
    const { buttonArr } = this.state;
    const length = buttonArr.length;
    const buttonElements: JSX.Element[] = [];

    for (let index = 0; index < length; index++) {
      let groupClassName = "setting-image-check-group ";
      
      if (buttonArr[index].isChecked) {
        groupClassName += "setting-image-check-group-checked ";
      }
      
      groupClassName += `setting-image-check-group${index}`;

      buttonElements.push(
        <div
          className={groupClassName}
          key={index}
          onClick={() => this.onCheck(index)}
        >
          {buttonArr[index].isChecked && (
            <div className="setting-image-check-button" />
          )}
          <img
            className="setting-image-check-button-image"
            src={buttonArr[index].img}
          />
          <div className="setting-image-check-button-text">
            <span className="setting-image-check-button-label">
              {buttonArr[index].txt}
            </span>
          </div>
        </div>
      );
    }

    let wrapperClassName = "setting-window-image-check-card-wrapper ";
    if (className) {
      wrapperClassName += className;
    }

    return (
      <div className={wrapperClassName}>
        <div className="image-check-card-left-part">
          <div className="image-check-card-title">{title}</div>
          {subTitle && (
            <div className="image-check-card-sub-title">{subTitle}</div>
          )}
        </div>
        <div className="image-check-card-right-part">{buttonElements}</div>
      </div>
    );
  }
}