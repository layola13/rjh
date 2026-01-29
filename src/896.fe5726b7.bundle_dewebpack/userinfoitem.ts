import React, { useMemo } from 'react';
import { getConfig, getUserInfoTopRightIcon, getUserInfoBottom } from './vipConfig';

interface UserVipInfo {
  vipType: string;
  status: string;
  showSale?: boolean;
}

interface UserInfoItemProps {
  userVipInfo: UserVipInfo;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

interface UserInfoItemStyle {
  [key: string]: string | number;
}

interface UserInfoTitle {
  name?: string;
  color: string;
}

interface VipConfig {
  name: string;
  icon?: string | Record<string, string>;
  getUserInfoItemStyle?: (vipInfo: UserVipInfo) => UserInfoItemStyle;
  userInfoTitle: (vipInfo: UserVipInfo) => UserInfoTitle;
  getUserInfoTopRightIcon?: (vipInfo: UserVipInfo) => React.ReactNode;
  getUserInfoBottom?: (vipInfo: UserVipInfo) => React.ReactNode;
}

declare const ResourceManager: {
  getString: (key?: string) => string;
};

export function UserInfoItem({ userVipInfo, onClick }: UserInfoItemProps): JSX.Element {
  const itemStyle = useMemo(() => {
    const config = getConfig(userVipInfo.vipType) as VipConfig;
    return config?.getUserInfoItemStyle?.(userVipInfo) ?? {};
  }, [userVipInfo]);

  const iconSrc = useMemo(() => {
    const config = getConfig(userVipInfo.vipType) as VipConfig;
    const icon = config.icon;
    if (icon) {
      return typeof icon === 'string' ? icon : icon[userVipInfo.status];
    }
    return undefined;
  }, [userVipInfo]);

  const titleInfo = useMemo(() => {
    const config = getConfig(userVipInfo.vipType) as VipConfig;
    const title = config.userInfoTitle(userVipInfo);
    return {
      name: ResourceManager.getString(title?.name ?? config.name),
      color: title.color
    };
  }, [userVipInfo]);

  const topRightIcon = useMemo(() => {
    const config = getConfig(userVipInfo.vipType) as VipConfig;
    const getIconFunc = config.getUserInfoTopRightIcon ?? getUserInfoTopRightIcon;
    return getIconFunc(userVipInfo);
  }, [userVipInfo]);

  const bottomContent = useMemo(() => {
    const config = getConfig(userVipInfo.vipType) as VipConfig;
    const getBottomFunc = config.getUserInfoBottom ?? getUserInfoBottom;
    return getBottomFunc(userVipInfo);
  }, [userVipInfo]);

  return (
    <div className="user-vip-info-item" style={itemStyle} onClick={onClick}>
      <div className="item-top">
        {iconSrc && <img src={iconSrc} className="icon" />}
        <div className="text" style={{ color: titleInfo.color }}>
          {titleInfo.name}
        </div>
        <div className="right-icon">{topRightIcon}</div>
      </div>
      {bottomContent && <div className="item-bottom">{bottomContent}</div>}
      {userVipInfo.showSale && <div className="new-user-sale">九块九特惠</div>}
    </div>
  );
}