import React, { useMemo } from 'react';
import { getConfig } from './config';
import { IconfontView } from './IconfontView';

interface VipInfo {
  vipType: string;
  [key: string]: unknown;
}

interface FloatButtonInfo {
  background?: string | [string, string];
  icon: string;
  text: string;
  rightIconColor: string;
}

interface FloatButtonProps {
  userVipInfo: VipInfo;
  onClick: () => void;
  isExpand: boolean;
}

export const FloatButton: React.FC<FloatButtonProps> = ({
  userVipInfo,
  onClick,
  isExpand
}) => {
  const floatButtonInfo = useMemo<FloatButtonInfo | null>(() => {
    return getConfig(userVipInfo.vipType).getFloatButtonInfo(userVipInfo);
  }, [userVipInfo]);

  const backgroundStyle = useMemo<React.CSSProperties>(() => {
    if (floatButtonInfo?.background) {
      return {
        background:
          typeof floatButtonInfo.background === 'string'
            ? floatButtonInfo.background
            : `linear-gradient(to right, ${floatButtonInfo.background[0]}, ${floatButtonInfo.background[1]})`
      };
    }
    return {};
  }, [floatButtonInfo]);

  if (!floatButtonInfo) {
    return null;
  }

  return (
    <div
      className={`float-button ${isExpand ? 'expand' : ''}`}
      style={backgroundStyle}
      onClick={onClick}
    >
      <img src={floatButtonInfo.icon} className="icon" />
      <div className="text">{floatButtonInfo.text}</div>
      <div className="right-icon">
        <IconfontView
          showType="hs_xiao_danjiantou_you"
          customStyle={{
            fontSize: '6px',
            color: floatButtonInfo.rightIconColor
          }}
        />
      </div>
    </div>
  );
};