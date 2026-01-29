import React from 'react';
import baseVipIconDefault from './icons/base-vip-icon';
import highVipIconDefault from './icons/high-vip-icon';
import finishedVipIconDefault from './icons/finished-vip-icon';
import { RenewalButton } from './components/RenewalButton';
import { IconfontView } from './components/IconfontView';
import { ExpireTimeDesc } from './components/ExpireTimeDesc';
import { ScaleAble } from './components/ScaleAble';

type VipStatus = 'in_use' | 'finished' | 'not_started';

interface UserVipInfo {
  status: VipStatus;
  isAboutToExpire: boolean;
  vipType: 'notVip' | 'base' | 'high';
}

interface UserInfoTitleStyle {
  name?: string;
  color?: string;
}

interface UserInfoItemStyle {
  background: string;
  border?: string;
}

interface FloatButtonInfo {
  background: [string, string];
  icon: React.ComponentType;
  text: string;
  rightIconColor: string;
}

interface VipConfig {
  name: string;
  icon: React.ComponentType | { in_use: React.ComponentType; finished: React.ComponentType };
  userInfoTitle: (userInfo: UserVipInfo) => UserInfoTitleStyle;
  getUserInfoClassName?: (userInfo: UserVipInfo) => string | undefined;
  getUserInfoItemStyle: (userInfo: UserVipInfo) => UserInfoItemStyle;
  getUserInfoBottom?: (userInfo: UserVipInfo) => React.ReactElement | null;
  getUserInfoTopRightIcon?: (userInfo: UserVipInfo) => React.ReactElement;
  getFloatButtonInfo: (userInfo: UserVipInfo) => FloatButtonInfo | false;
}

type VipConfigMap = Record<'notVip' | 'base' | 'high', VipConfig>;

const ARROW_ICON_STYLE = {
  fontSize: '10px',
  color: '#fff',
  paddingRight: '6px'
} as const;

const SCALE_RATIO = 0.91;

export function getUserInfoBottom(userInfo: UserVipInfo): React.ReactElement | null {
  if (userInfo.status === 'finished') {
    return null;
  }

  if (userInfo.isAboutToExpire) {
    return (
      <ScaleAble scale={SCALE_RATIO}>
        <ExpireTimeDesc userVipInfo={userInfo} />
      </ScaleAble>
    );
  }

  return null;
}

export function getUserInfoTopRightIcon(userInfo: UserVipInfo): React.ReactElement {
  if (userInfo.isAboutToExpire || userInfo.status === 'finished') {
    return <RenewalButton />;
  }

  return (
    <IconfontView
      showType="hs_xiao_danjiantou_you"
      customStyle={ARROW_ICON_STYLE}
    />
  );
}

const vipConfigMap: VipConfigMap = {
  notVip: {
    name: '',
    userInfoTitle: (userInfo: UserVipInfo) => ({
      name: 'user_vip_update_vip'
    }),
    icon: baseVipIconDefault,
    getUserInfoClassName: (userInfo: UserVipInfo) => undefined,
    getUserInfoItemStyle: (userInfo: UserVipInfo) => ({
      background: 'linear-gradient(to right, #0B51FF, #E318B4)'
    }),
    getUserInfoBottom: (userInfo: UserVipInfo) => (
      <ScaleAble scale={SCALE_RATIO}>
        {ResourceManager.getString('user_vip_update_vip_desc')}
      </ScaleAble>
    ),
    getUserInfoTopRightIcon: () => (
      <IconfontView
        showType="hs_xiao_danjiantou_you"
        customStyle={ARROW_ICON_STYLE}
      />
    ),
    getFloatButtonInfo: (userInfo: UserVipInfo) => ({
      background: ['#0B51FF', '#E318B4'],
      icon: baseVipIconDefault,
      text: ResourceManager.getString('user_vip_buy_vip'),
      rightIconColor: '#E318B4'
    })
  },
  base: {
    name: 'user_vip_base_vip',
    icon: baseVipIconDefault,
    getUserInfoClassName: (userInfo: UserVipInfo) => {
      if (userInfo.status !== 'finished') {
        return 'user-info-menu-base';
      }
      return undefined;
    },
    userInfoTitle: (userInfo: UserVipInfo) => {
      if (userInfo.status === 'finished') {
        return { color: '#8E8E8E' };
      }
      return {};
    },
    getUserInfoItemStyle: (userInfo: UserVipInfo) => {
      if (userInfo.status === 'finished') {
        return {
          background: '#E4E4E4',
          border: '1px solid rgba(229, 229, 229, 1)'
        };
      }
      return {
        background: 'linear-gradient(to right, #0B51FF, #C8DFFF)'
      };
    },
    getFloatButtonInfo: (userInfo: UserVipInfo) => {
      if (userInfo.status === 'finished') {
        return {
          background: ['#0B51FF', '#E318B4'],
          icon: baseVipIconDefault,
          text: ResourceManager.getString('user_vip_buy_vip'),
          rightIconColor: '#E318B4'
        };
      }
      return {
        background: ['#600000', '#000000'],
        icon: highVipIconDefault,
        text: ResourceManager.getString('user_vip_update_high_vip'),
        rightIconColor: '#000000'
      };
    }
  },
  high: {
    name: 'user_vip_high_vip',
    icon: {
      in_use: highVipIconDefault,
      finished: finishedVipIconDefault
    },
    userInfoTitle: (userInfo: UserVipInfo) => {
      if (userInfo.status === 'finished') {
        return { color: '#8E8E8E' };
      }
      return {};
    },
    getUserInfoClassName: (userInfo: UserVipInfo) => {
      if (userInfo.status !== 'finished') {
        return 'user-info-menu-high';
      }
      return undefined;
    },
    getUserInfoItemStyle: (userInfo: UserVipInfo) => {
      if (userInfo.status === 'finished') {
        return {
          background: '#E4E4E4',
          border: '1px solid rgba(229, 229, 229, 1)'
        };
      }
      return {
        background: 'linear-gradient(to right, #000000, #600000)'
      };
    },
    getFloatButtonInfo: (userInfo: UserVipInfo) => {
      if (userInfo.status === 'finished') {
        return {
          background: ['#0B51FF', '#E318B4'],
          icon: baseVipIconDefault,
          text: ResourceManager.getString('user_vip_buy_vip'),
          rightIconColor: '#E318B4'
        };
      }
      return false;
    }
  }
};

export function getConfig(vipType: string): VipConfig {
  const configKey = (Object.keys(vipConfigMap) as Array<keyof VipConfigMap>).find(
    (key) => vipType.includes(key)
  ) ?? 'notVip';

  return vipConfigMap[configKey];
}