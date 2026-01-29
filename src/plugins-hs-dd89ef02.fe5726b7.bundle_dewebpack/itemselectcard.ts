import React from 'react';

interface ItemChild {
  backgroundColor?: string;
  backgroundImage?: string;
}

interface ItemSelectCardData {
  title: string;
  subTitle?: string;
  className?: string;
  children: ItemChild[];
  selectedItem: number;
  onClick?: (index: number) => void;
}

interface ItemSelectCardProps {
  data: ItemSelectCardData;
}

interface ItemSelectCardState {
  selectedItem: number;
}

export class ItemSelectCard extends React.Component<ItemSelectCardProps, ItemSelectCardState> {
  static defaultProps: ItemSelectCardProps = {
    data: {
      title: "3D背景图颜色",
      subTitle: "",
      className: "",
      children: [],
      selectedItem: 0,
      onClick: () => {}
    }
  };

  constructor(props: ItemSelectCardProps) {
    super(props);
    const selectedItem = props.data.selectedItem;
    this.state = {
      selectedItem
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: ItemSelectCardProps): void {
    this.setState({
      selectedItem: nextProps.data.selectedItem
    });
  }

  onItemSelect = (index: number): void => {
    this.setState(
      {
        selectedItem: index
      },
      () => {
        if (this.props.data?.onClick) {
          this.props.data.onClick(index);
        }
      }
    );
  };

  render(): React.ReactElement {
    const { className, title, subTitle, children } = this.props.data;
    const { selectedItem } = this.state;

    let wrapperClassName = "setting-window-item-select-card-wrapper ";
    if (className) {
      wrapperClassName += className;
    }

    const items: React.ReactElement[] = [];
    const childrenCount = children.length;

    for (let index = 0; index < childrenCount; index++) {
      let itemClassName = "item-select-card-item ";
      if (selectedItem === index) {
        itemClassName += "item-select-card-item-selected";
      }

      const child = children[index];
      const style: React.CSSProperties = {};

      if (child.backgroundColor) {
        style.backgroundColor = child.backgroundColor;
      } else if (child.backgroundImage) {
        style.backgroundImage = `url(${child.backgroundImage})`;
        style.backgroundSize = "cover";
      }

      items.push(
        <ul className={itemClassName} key={index}>
          <li
            className="item-select-card-item item-select-card-item-li"
            style={style}
            onClick={() => this.onItemSelect(index)}
          />
        </ul>
      );
    }

    return (
      <div className={wrapperClassName}>
        <div className="item-select-card-left-part">
          <div className="item-select-card-title">{title}</div>
          {subTitle && (
            <div className="item-select-card-sub-title">{subTitle}</div>
          )}
        </div>
        <div className="item-select-card-right-part">
          <div className="item-select-card-items-wrapper">
            <ul className="item-select-card-items">{items}</ul>
          </div>
        </div>
      </div>
    );
  }
}