import React, { useMemo, useState, useRef } from 'react';
import { Dropdown } from 'antd';
import { IconfontView } from './IconfontView';

interface ChannelItemData {
  skuId: string | number;
  price: number;
  mainImage: string;
  title: string;
  channelIcon?: string;
  channelName: string;
}

interface ChannelGroup {
  items: ChannelItemData[];
}

interface ChannelItemProps {
  channel?: ChannelItemData;
  onClick?: () => void;
  unit?: string;
}

interface SelectChanelProps {
  item: ChannelGroup;
  selctChanelSkuId: string | number;
  onSlected?: (skuId: string | number) => void;
  className?: string;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  unit?: string;
}

export function ChannelItem({ channel, onClick, unit = '$' }: ChannelItemProps): JSX.Element | null {
  const formattedPrice = useMemo(() => {
    return `${unit}${channel?.price ?? ''}`;
  }, [channel?.price, unit]);

  if (!channel) {
    return null;
  }

  return (
    <div className="channel-item" onClick={onClick}>
      <img src={channel.mainImage} className="channel-image" />
      <div className="channel-info">
        <div className="channel-title">{channel.title}</div>
        <div className="channel-shop">
          <div className="channel-site">
            {channel.channelIcon && (
              <img className="site-icon" src={channel.channelIcon} />
            )}
            <span className="size-name">{channel.channelName}</span>
          </div>
          <span className="channel-price">{formattedPrice}</span>
        </div>
      </div>
    </div>
  );
}

export function SelectChanel({
  item,
  selctChanelSkuId,
  onSlected,
  className = '',
  getPopupContainer,
  unit = '$'
}: SelectChanelProps): JSX.Element {
  const selectedChannel = useMemo(() => {
    return item.items.find((channel) => channel.skuId === selctChanelSkuId);
  }, [item, selctChanelSkuId]);

  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const hasMultipleItems = useMemo(() => {
    return (item.items?.length ?? 0) > 1;
  }, [item]);

  const handleVisibleChange = (isVisible: boolean): void => {
    if (hasMultipleItems) {
      setVisible(isVisible);
    }
  };

  const handleItemClick = (skuId: string | number): void => {
    onSlected?.(skuId);
    setVisible(false);
  };

  const overlay = (
    <div className="select-items">
      {item.items.map((channel) => (
        <div key={channel.skuId} className="select-channel-item-wrapper">
          <ChannelItem
            unit={unit}
            channel={channel}
            onClick={() => handleItemClick(channel.skuId)}
          />
        </div>
      ))}
    </div>
  );

  return (
    <Dropdown
      overlayClassName="select-channel-overlay"
      placement="bottomRight"
      onVisibleChange={handleVisibleChange}
      visible={visible}
      trigger={['click']}
      getPopupContainer={getPopupContainer}
      overlay={overlay}
    >
      <div
        ref={wrapperRef}
        className={`select-channel-wrapper ${className} ${visible ? 'visible' : ''}`}
      >
        <div className="select-node">
          <ChannelItem channel={selectedChannel} unit={unit} />
          {hasMultipleItems ? (
            <IconfontView
              customClass="jiantou"
              showType={visible ? 'hs_xiao_danjiantou_shang' : 'hs_xiao_danjiantou_xia'}
              customStyle={{
                fontSize: '12px',
                color: '#33353B'
              }}
              hoverColor="#33353B"
              clickColor="#33353B"
            />
          ) : (
            <div className="jiantou" />
          )}
        </div>
      </div>
    </Dropdown>
  );
}