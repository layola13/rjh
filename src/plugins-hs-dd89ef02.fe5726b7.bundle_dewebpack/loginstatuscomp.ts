import { Menu, Dropdown } from 'antd';
import { Folder } from './Folder';
import { Divider } from './Divider';
import { Button } from './Button';
import { log } from './analytics';

interface UserInfoDropdownItem {
  visible?: boolean;
  disabled?: boolean;
  type?: 'folder' | 'divider' | 'custom' | 'button';
  label?: string;
  childItems?: UserInfoDropdownItem[];
  showRedDot?: boolean;
  onClick?: () => void;
  className?: string;
  order?: number;
}

interface LoginStatusState {
  unreadMsgNums: number;
  needNoticeTip: boolean;
  needGuide: boolean;
  memberType: string;
  score: number;
  userInfoRedDot: boolean;
  defaultAvatarLogo: string;
}

interface UpdateUserInfoSignalData {
  data: Partial<LoginStatusState>;
}

interface WhiteLabelSettingData {
  data?: {
    logoSetting?: {
      avatarDefaultLogo?: string;
    };
  };
}

interface UserInfoPlugin {
  getUserInfoDropdown(): UserInfoDropdownItem[];
  getTheme(): string;
  getLoginMenuClassNames(): Array<{ className: string }>;
  getUserInfoRedDot(): boolean;
  getUpdateUserInfoSignal(): unknown;
}

interface FirstLoginPlugin {
  signalWhiteLabelSetting: unknown;
}

interface SignalHook {
  listen(signal: unknown, callback: (data: any) => void): void;
}

declare const HSApp: {
  App: {
    getApp(): {
      pluginManager: {
        getPlugin(type: string): any;
      };
    };
  };
  Config: {
    RES_BASEPATH: string;
  };
  Util: {
    Url: {
      getQueryStrings(): Record<string, string>;
    };
  };
};

declare const HSFPConstants: {
  PluginType: {
    UserInfo: string;
  };
};

declare const adskUser: {
  photo?: string;
  name: string;
  isLogin(): boolean;
  openLoginWindow(): void;
};

declare const ResourceManager: {
  getString(key: string): string;
};

declare const HSCore: {
  Util: {
    SignalHook: new (component: any) => SignalHook;
    Object: {
      nullFunction: () => void;
    };
  };
};

const DEFAULT_AVATAR_PLACEHOLDER = 'default_avatar_placeholder_url';

const IMAGE_RESIZE_PARAMS = {
  mode: 'fixed',
  width: 200,
  height: 200,
  quality: 100,
} as const;

export class LoginStatusComp extends React.Component<{}, LoginStatusState> {
  private userInfoPlugin: UserInfoPlugin;
  private signalHook: SignalHook;
  private firstLoginPlugin: FirstLoginPlugin;

  constructor(props: {}) {
    super(props);

    this.signalHook = new HSCore.Util.SignalHook(this);
    this.userInfoPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.UserInfo
    );
    this.firstLoginPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      'hsw.brand.ezhome.firstlogin.Plugin'
    );

    const defaultAvatarPath = `${HSApp.Config.RES_BASEPATH}v2/image/logo/default_avatar.png`;
    const queryStrings = HSApp.Util.Url.getQueryStrings();
    const useAlternativeAvatar = queryStrings.hxrr === 'true';

    this.state = {
      unreadMsgNums: 0,
      needNoticeTip: true,
      needGuide: true,
      memberType: '',
      score: 0,
      userInfoRedDot: this.userInfoPlugin.getUserInfoRedDot(),
      defaultAvatarLogo: useAlternativeAvatar ? DEFAULT_AVATAR_PLACEHOLDER : defaultAvatarPath,
    };
  }

  componentDidMount(): void {
    this.signalHook.listen(
      this.userInfoPlugin.getUpdateUserInfoSignal(),
      this.onUpdateUserInfoSignal.bind(this)
    );
    this.signalHook.listen(
      this.firstLoginPlugin.signalWhiteLabelSetting,
      this.updateDefaultAvatar.bind(this)
    );
  }

  private onUpdateUserInfoSignal(signal: UpdateUserInfoSignalData): void {
    const updatedState = { ...this.state, ...signal.data };
    this.setState(updatedState);
  }

  private updateDefaultAvatar = (event: WhiteLabelSettingData): void => {
    const avatarDefaultLogo = event.data?.logoSetting?.avatarDefaultLogo;
    if (avatarDefaultLogo) {
      this.setState({ defaultAvatarLogo: avatarDefaultLogo });
    }
  };

  private buildImageUrl(photoUrl: string | undefined, fallbackUrl: string): string {
    if (!photoUrl) {
      return fallbackUrl;
    }
    const { mode, width, height, quality } = IMAGE_RESIZE_PARAMS;
    return `${photoUrl}?x-oss-process=image/resize,m_${mode},w_${width},h_${height}/quality,Q_${quality}`;
  }

  private renderDropdownItem = (
    item: UserInfoDropdownItem = {},
    theme?: string
  ): React.ReactNode => {
    const {
      visible,
      disabled,
      type,
      label,
      childItems,
      showRedDot,
      onClick = HSCore.Util.Object.nullFunction,
      className,
    } = item;

    if (!visible) {
      return null;
    }

    let baseClassName = theme ? `cli ${theme}` : 'cli light';
    if (disabled) {
      baseClassName += ' userinfo-button-disabled';
    }

    switch (type) {
      case 'folder':
        return (
          <Menu.Item disabled={disabled} className={baseClassName}>
            <Folder
              key={label}
              label={label}
              childItems={childItems}
              showRedDot={true}
              theme={theme}
            />
          </Menu.Item>
        );

      case 'divider':
        return (
          <Menu.Item className={`${baseClassName} userInfo-divider`}>
            <Divider visible={visible} />
          </Menu.Item>
        );

      case 'custom':
        return (
          <Menu.Item disabled={disabled} className={`${baseClassName} ${className ?? ''}`}>
            {label}
          </Menu.Item>
        );

      default:
        return (
          <Menu.Item disabled={disabled} className={baseClassName} onClick={onClick}>
            <Button
              key={label}
              label={label}
              visible={visible}
              className={baseClassName}
              showRedDot={showRedDot}
              disabled={false}
            />
          </Menu.Item>
        );
    }
  };

  private getMenuContent = (defaultAvatarUrl: string): React.ReactNode => {
    const dropdownItems = [...this.userInfoPlugin.getUserInfoDropdown()];
    
    dropdownItems.sort((a, b) => {
      const orderA = a.order ?? Number.MAX_VALUE;
      const orderB = b.order ?? Number.MAX_VALUE;
      return orderA - orderB;
    });

    const userPhoto = adskUser.photo;
    const theme = this.userInfoPlugin.getTheme();
    const customClassNames = this.userInfoPlugin
      .getLoginMenuClassNames()
      .map((item) => item.className);

    const avatarUrl = this.buildImageUrl(userPhoto, defaultAvatarUrl);

    return (
      <Menu className={`menus ${theme} ${customClassNames.join(' ')}`}>
        <Menu.Item className="user-info-userdetail">
          <img className="user-info-userdetail-avatar" src={avatarUrl} />
          <div className="user-info-userdetail-name">{adskUser.name}</div>
        </Menu.Item>
        {dropdownItems.map((item) => this.renderDropdownItem(item, theme))}
      </Menu>
    );
  };

  private handleDropdownVisibleChange = (visible: boolean): void => {
    if (visible) {
      log({
        actionType: 'user-info',
        description: '下拉个人中心菜单',
        clicksRatio: {
          id: 'user-info',
          name: '个人中心',
        },
      });
    }
  };

  render(): React.ReactNode {
    const { userInfoRedDot, defaultAvatarLogo } = this.state;
    const menuContent = this.getMenuContent(defaultAvatarLogo);
    const userPhoto = adskUser.photo;
    const theme = this.userInfoPlugin.getTheme();

    const avatarUrl = this.buildImageUrl(userPhoto, defaultAvatarLogo);

    if (adskUser.isLogin()) {
      return (
        <>
          <Dropdown
            overlay={menuContent}
            onVisibleChange={this.handleDropdownVisibleChange}
            className={`user-info-menu ${theme}`}
            overlayClassName={`user-info-menu ${theme}`}
          >
            <div className="user-info-usericon">
              <img className="user-info-usericon-avatar" src={avatarUrl} />
              {userInfoRedDot && <span className="user-info-usericon-reddot" />}
            </div>
          </Dropdown>
        </>
      );
    }

    return (
      <div className={`user-info no-login ${theme}`}>
        <div className="menu user-info-usericon" onClick={() => adskUser.openLoginWindow()}>
          <img className="user-info-usericon-avatar" src={defaultAvatarLogo} />
          <span className="user-info-name">{ResourceManager.getString('signin_btn')}</span>
        </div>
      </div>
    );
  }
}