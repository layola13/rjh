import { Component, ReactNode, CSSProperties } from 'react';
import { Popover } from 'antd';
import { IconfontView } from './IconfontView';

interface PopoverItemInfo {
  icon: string;
  label?: string;
}

export class PopoverInfo {
  text?: string;
  anchor: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  items: PopoverItemInfo[];

  constructor() {
    this.text = undefined;
    this.anchor = 'top';
    this.items = [];
  }
}

interface InfoPopoverProps {
  data: PopoverInfo;
  children?: ReactNode;
  overlayClassName?: string;
}

export class InfoPopover extends Component<InfoPopoverProps> {
  constructor(props: InfoPopoverProps) {
    super(props);
  }

  render(): ReactNode {
    const { data, children, overlayClassName = '' } = this.props;
    const imageElements: ReactNode[] = [];

    if (data.items) {
      data.items.forEach((item: PopoverItemInfo) => {
        const imageStyle: CSSProperties = {
          backgroundImage: `url(${item.icon})`
        };

        const imageElement = (
          <div className="image-item" key={item.icon}>
            <div style={imageStyle} className="image-main" />
            {item.label && (
              <div className="image-caption">
                {ResourceManager.getString(item.label)}
              </div>
            )}
          </div>
        );

        imageElements.push(imageElement);
      });
    }

    const hasMultipleItems = data.items && data.items.length !== 1 && data.items.length !== 0;
    const itemClassName = hasMultipleItems ? '' : ' max-one-item-class';

    const popoverContent = (
      <div className={`render-popover-tooltip-general${itemClassName}`}>
        {data.text && (
          <div className="tooltip-content">
            {ResourceManager.getString(data.text)}
          </div>
        )}
        {imageElements.length > 0 && (
          <div className="images-group">
            {imageElements}
          </div>
        )}
      </div>
    );

    const defaultIcon = (
      <IconfontView
        showType="hs_shuxingmianban_jieshibai"
        customStyle={{ fontSize: '16px' }}
      />
    );

    return (
      <Popover
        content={popoverContent}
        trigger="hover"
        arrowPointAtCenter={true}
        placement={data.anchor}
        overlayClassName={`${overlayClassName} base-popover-overwrap-dark`}
      >
        {children ?? defaultIcon}
      </Popover>
    );
  }
}