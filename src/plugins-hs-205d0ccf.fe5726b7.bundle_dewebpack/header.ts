import React, { Component, ReactNode } from 'react';

interface HeaderProps {
  title: string;
  customClass?: string;
  onBackClick?: () => void;
  showBrowserLite?: boolean;
  showTeachingBtn?: boolean;
  data?: unknown;
}

interface TeachingAbilityPlugin {
  getTeachingAbilityButton(options: TeachingButtonOptions): ReactNode;
  registerEnvConfig(env: string, config: EnvConfig): void;
}

interface TeachingButtonOptions {
  theme: string;
  className: string;
}

interface EnvConfig {
  getTheme: () => string;
  getTargetRect: () => DOMRect | undefined;
}

interface UserInfoPlugin {
  getUserInfoButton(): ReactNode;
}

interface FullScreenComponent {
  getRenderItem(options: FullScreenOptions): ReactNode;
}

interface FullScreenOptions {
  fontSize: string;
  color: string;
}

interface SparkPicImagePlugin {
  imageBrowserLite(data: unknown): ReactNode;
}

interface PluginManager {
  getPlugin(pluginType: string): unknown;
}

interface HSApp {
  App: {
    getApp(): {
      pluginManager: PluginManager;
    };
  };
}

interface Icons {
  type: string;
  style?: React.CSSProperties;
  className?: string;
}

declare const HSApp: HSApp;
declare const HSFPConstants: {
  PluginType: {
    TeachingAbility: string;
    SparkPicImage: string;
  };
};
declare const Icons: React.FC<Icons>;
declare function getString(key: string): string;

export class Header extends Component<HeaderProps> {
  private _teachingAbilityButton: ReactNode = undefined;
  private _fullScreenCom: ReactNode = undefined;
  private _userInfoButton: ReactNode | null = undefined;
  private sparkpicImagePlugin: SparkPicImagePlugin | undefined = undefined;

  constructor(props: HeaderProps) {
    super(props);

    const userInfoPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      'hsw.plugin.userInfo.Plugin'
    ) as UserInfoPlugin | undefined;
    
    this._userInfoButton = userInfoPlugin?.getUserInfoButton() ?? null;

    const teachingAbilityPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.TeachingAbility
    ) as TeachingAbilityPlugin | undefined;

    this._teachingAbilityButton = teachingAbilityPlugin?.getTeachingAbilityButton({
      theme: 'teaching-black',
      className: 'render-teaching-button',
    });

    teachingAbilityPlugin?.registerEnvConfig('render', {
      getTheme: () => 'teaching-black',
      getTargetRect: () => {
        const element = document.querySelector('.render-teaching-button');
        return element?.getBoundingClientRect();
      },
    });

    const fullScreenComponent = new (class implements FullScreenComponent {
      getRenderItem(options: FullScreenOptions): ReactNode {
        return null;
      }
    })();

    this._fullScreenCom = fullScreenComponent.getRenderItem({
      fontSize: '20px',
      color: 'rgba(255, 255, 255, 0.86)',
    });

    this.sparkpicImagePlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.SparkPicImage
    ) as SparkPicImagePlugin | undefined;
  }

  render(): ReactNode {
    const {
      title,
      customClass = '',
      onBackClick,
      showBrowserLite = false,
      showTeachingBtn = false,
      data,
    } = this.props;

    const rightItems: ReactNode[] = [this._userInfoButton, this._fullScreenCom];

    if (showTeachingBtn) {
      rightItems.unshift(this._teachingAbilityButton);
    }

    if (showBrowserLite && this.sparkpicImagePlugin) {
      rightItems.unshift(this.sparkpicImagePlugin.imageBrowserLite(data));
    }

    return (
      <div className={`header_area ${customClass}`}>
        <div className="left_area">
          <div className="ai_pic_back_btn" onClick={onBackClick}>
            <Icons
              type="hs_xian_fanhui"
              style={{ fontSize: '20px' }}
              className="arrow-icon"
            />
            <span className="btn_content">{getString(title)} </span>
          </div>
        </div>
        <div className="right_area">
          {rightItems.map((item, index) => (
            <div key={index} className="right_item">
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }
}