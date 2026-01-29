import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { Icons } from './Icons';
import { getString } from './ResourceManager';

interface DesignInfoState {
  designName: string;
  designNameLength: number;
  userId: string;
  showdesignName: boolean;
  designNameError: boolean;
  isHover: boolean;
  errorMsg: string;
}

interface DesignInfoProps {
  designName: string;
  userId: string;
  disabled?: boolean;
  onDataChange?: (key: string, value: string) => void;
  signalChanged?: HSCore.Util.Signal<DesignInfoData>;
}

interface MenuItem {
  label: string;
  hotkey?: {
    win: string;
    mac: string;
  };
  disabled?: () => boolean | undefined;
  onClick: () => void;
}

interface DesignInfoData {
  designName: string;
  userId: string;
}

interface LogEvent {
  id: string;
  description: string;
  triggerType?: string;
}

declare const ResourceManager: {
  getString(key: string): string;
};

declare const HSFPConstants: {
  PluginType: {
    Persistence: string;
    EditDesign: string;
    ShareCase: string;
    SignIn: string;
  };
};

declare const adskUser: {
  getBenefitMeta(category: string, key: string): { defaultPublic?: boolean } | null;
};

class DesignInfoComponent extends React.Component<DesignInfoProps, DesignInfoState> {
  private _menuItems: MenuItem[];
  private dropDownDom: HTMLDivElement | null = null;
  private hsdesignInfoDom: HTMLDivElement | null = null;
  private firstPrint: boolean = true;

  constructor(props: DesignInfoProps) {
    super(props);

    this.state = {
      designName: props.designName,
      designNameLength: this.computedNameLength(props.designName),
      userId: props.userId,
      showdesignName: false,
      designNameError: false,
      isHover: false,
      errorMsg: ResourceManager.getString('save_defaultTitle_tips')
        .replace('{min}', '3')
        .replace('{max}', '60'),
    };

    if (props.signalChanged) {
      props.signalChanged.listen((event: { data: Partial<DesignInfoData> }) => {
        this.setState(event.data as Partial<DesignInfoState>);
        const designName = event.data.designName;
        if (designName) {
          const nameLength = this.computedNameLength(designName);
          const hasWhitespace = /^\s+|\s+$/.test(designName);
          this.setState({
            designNameError: nameLength > 100 || nameLength < 3 || hasWhitespace,
            designNameLength: nameLength,
          });
          this.updateErrorMsg(nameLength, hasWhitespace);
        }
      });
    }

    this._menuItems = [
      {
        label: ResourceManager.getString('toolBar_save_as'),
        hotkey: {
          win: 'ctrl+shift+s',
          mac: 'meta+shift+s',
        },
        onClick: () => {
          this.log({
            id: 'designInfo.clickSaveAs',
            description: '另存为',
          });
          const app = HSApp.App.getApp();
          app.cmdManager.cancel();
          app.pluginManager.getPlugin(HSFPConstants.PluginType.Persistence).saveas();
        },
      },
      {
        label: ResourceManager.getString('toolBar_edit_properties'),
        onClick: () => {
          this.log({
            id: 'designInfo.clickEdit',
            description: '编辑详情',
          });
          const plugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.EditDesign);
          plugin?.showDialog();
        },
      },
      {
        label: ResourceManager.getString('toolBar_load_historical_version'),
        onClick: () => {
          this.log({
            id: 'designInfo.versionHistory',
            description: '查看历史版本',
          });
          const plugin = HSApp.App.getApp().pluginManager.getPlugin('hsw.plugin.historicalversion.Plugin');
          plugin?.open();
        },
      },
    ];

    if (HSApp.Config.VERSION !== 'ea') {
      this._menuItems.push({
        label: ResourceManager.getString('toolBar_share_case'),
        disabled: () => {
          const benefit = adskUser.getBenefitMeta('whiteLabel', 'shareViewerUrl');
          return benefit?.defaultPublic;
        },
        onClick: () => {
          this.log({
            id: 'designInfo.shareTheDesign',
            description: '分享案例',
          });
          const plugin = HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.ShareCase);
          plugin?.shareCase();
        },
      });
    }

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onHandleClick = this.onHandleClick.bind(this);
    this.documentClicked = this.documentClicked.bind(this);
    this.updateErrorMsg = this.updateErrorMsg.bind(this);

    document.addEventListener('mousedown', this.documentClicked);
  }

  log(event: LogEvent): void {
    try {
      HSApp.App.getApp().userTrackLogger.push(
        event.id,
        { description: event.description },
        { triggerType: event.triggerType }
      );
    } catch (error) {
      // Silent catch
    }
  }

  componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.documentClicked);
  }

  computedNameLength(name: string): number {
    let length = 0;
    for (const char of name) {
      const charCode = char.charCodeAt(0);
      if (charCode > 127 || charCode === 94) {
        length += 2;
      } else {
        length++;
      }
    }
    return length;
  }

  documentClicked(event: MouseEvent): void {
    if (this.state.isHover && !this.state.designNameError) {
      const path = (event as any).path || event.composedPath?.();
      if (event.target && path) {
        const found = path.find((element: HTMLElement) => {
          return this.dropDownDom && element.className === this.dropDownDom.className;
        });
        if (!found) {
          this.setState({ isHover: false });
        }
      }
    }
  }

  onHandleClick(event: React.MouseEvent<HTMLDivElement>): void {
    if (!this.state.designNameError && 
        event.currentTarget.className === this.hsdesignInfoDom?.className) {
      this.setState({ isHover: !this.state.isHover });
    }
  }

  onMouseOver(): void {
    this.setState({ isHover: true });
  }

  onMouseLeave(): void {
    if (!this.state.designNameError) {
      this.setState({ isHover: false });
    }
  }

  onEditDesignName(event: React.ChangeEvent<HTMLInputElement>): void {
    const designName = event.target.value;
    const nameLength = this.computedNameLength(designName);
    const hasWhitespace = /^\s+|\s+$/.test(designName);

    this.setState({
      designName,
      designNameError: !this.firstPrint && (nameLength > 100 || nameLength < 3 || hasWhitespace),
      designNameLength: nameLength,
    });

    this.updateErrorMsg(nameLength, hasWhitespace);
  }

  updateErrorMsg(length: number, hasWhitespace: boolean): void {
    if (hasWhitespace) {
      this.setState({
        errorMsg: ResourceManager.getString('save_title_error_space_tips'),
      });
    } else if (length < 3) {
      this.setState({
        errorMsg: ResourceManager.getString('save_title_error_less_tips').replace('{min}', '3'),
      });
    } else if (length > 100) {
      this.setState({
        errorMsg: ResourceManager.getString('save_title_error_more_tips').replace('{max}', '100'),
      });
    } else {
      this.setState({
        errorMsg: ResourceManager.getString('save_defaultTitle_tips')
          .replace('{min}', '3')
          .replace('{max}', '100'),
      });
    }
  }

  _inputWidth(text: string): number {
    const length = text.replace(/[^\x00-\xff]/g, 'xx').length;
    if (length > 58) return 520;
    if (length === 0) return 200;
    return 8 * length + 56;
  }

  onSubmitNameChange(): void {
    this.log({
      id: 'designInfo.changeName',
      description: '修改方案名',
    });

    this.firstPrint = false;

    if (!this.state.designNameError && this.props.onDataChange) {
      this.props.onDataChange('designName', this.state.designName);
    }

    if (!this.state.designNameError) {
      this.setState({ showdesignName: false });
    }
  }

  render(): React.ReactElement {
    const { disabled } = this.props;
    const menuItems: React.ReactElement[] = [];

    menuItems.push(
      React.createElement(
        'div',
        { className: 'designinfo-menu-items' },
        this._menuItems.map((item) => {
          if (item.disabled?.()) return null;
          return React.createElement(
            'div',
            { onClick: item.onClick, className: 'designinfo-menu-item' },
            item.label,
            item.hotkey
              ? React.createElement(
                  'span',
                  { className: 'hotkey' },
                  HSApp.Util.Hotkey.getHotkeyDisplayString(item.hotkey)
                )
              : undefined
          );
        })
      )
    );

    let menuClassName = 'menus';
    let limitClassName = 'design-name-limit';

    if (this.state.designNameError) {
      limitClassName += ' design-name-limit-error';
      menuClassName += ' ul-content';
    }

    let menuButtonClassName = 'menu';
    const iconStyle: React.CSSProperties = { fontSize: '8px' };
    let iconType = 'hs_xiao_danjiantou_xia';

    if (this.state.isHover) {
      iconType = 'hs_xiao_danjiantou_shang';
      menuButtonClassName += ' hoverMenu';
      menuClassName += ' ul-content';
      iconStyle.color = '#396efe';
    }

    let containerClassName = 'hs-design-info';
    if (disabled) {
      containerClassName += ' disable';
    }

    return React.createElement(
      'li',
      { className: containerClassName },
      React.createElement(
        'div',
        {
          className: 'designinfo',
          ref: (dom: HTMLDivElement | null) => {
            this.dropDownDom = dom;
          },
        },
        React.createElement(
          'div',
          {
            className: menuButtonClassName,
            onClick: this.onHandleClick,
            ref: (dom: HTMLDivElement | null) => {
              this.hsdesignInfoDom = dom;
            },
          },
          React.createElement(
            'span',
            { className: 'design-name' },
            this.state.designName || getString('pageHeader_name_of_design')
          ),
          React.createElement(Icons, { type: iconType, style: iconStyle })
        ),
        React.createElement(
          'ul',
          { className: menuClassName },
          React.createElement('input', {
            className: this.state.designNameError ? 'design-name-input design-name-error' : 'design-name-input',
            onBlur: () => this.onSubmitNameChange(),
            onChange: (event: React.ChangeEvent<HTMLInputElement>) => this.onEditDesignName(event),
            placeholder: getString('pageHeader_name_of_design'),
            value: this.state.designName,
          }),
          React.createElement('span', { className: limitClassName }, `${this.state.designNameLength}/100`),
          this.state.designNameError &&
            React.createElement('div', { className: 'design-name-error-message' }, this.state.errorMsg),
          menuItems
        )
      )
    );
  }
}

export class DesignInfo {
  private signalChanged: HSCore.Util.Signal<DesignInfoData>;
  private app: any;
  private disabled: boolean;
  private signInPlugin: any;
  private SignalHook: HSCore.Util.SignalHook;
  private data: DesignInfoData;
  private onDataChange: (key: string, value: string) => void;

  constructor(app: any, plugins: Record<string, any>, disabled: boolean = false) {
    this.app = app;
    this.disabled = disabled;
    this.signInPlugin = plugins[HSFPConstants.PluginType.SignIn];
    this.SignalHook = new HSCore.Util.SignalHook(this);
    this.signalChanged = new HSCore.Util.Signal(this);

    this.data = {
      designName: this.app.designMetadata.get('designName'),
      userId: this.app.designMetadata.get('userId'),
    };

    this.SignalHook.listen(this.app.signalMetadataChanged, this._onDesignMetadataChanged.bind(this));
    this.SignalHook.listen(this.app.signalDocumentOpened, this._onDesignOpened.bind(this));

    this.onDataChange = (key: string, value: string) => {
      this.app.designMetadata.set(key, value);
      this.app.designMetadata.flush();
    };
  }

  private _onDesignMetadataChanged(event: { data: Record<string, any> }): void {
    if (event.data.hasOwnProperty('designName') || event.data.hasOwnProperty('userId')) {
      this.data = {
        designName: this.app.designMetadata.get('designName'),
        userId: this.app.designMetadata.get('userId'),
      };
      this.signalChanged.dispatch(this.data);
    }
  }

  private _onDesignOpened(): void {
    this.data = {
      designName: this.app.designMetadata.get('designName'),
      userId: this.app.designMetadata.get('userId'),
    };
    this.signalChanged.dispatch(this.data);
  }

  getRenderItem(): React.ReactElement {
    return React.createElement(DesignInfoComponent, {
      disabled: this.disabled,
      onDataChange: this.onDataChange,
      designName: this.data.designName,
      userId: this.data.userId,
      signalChanged: this.signalChanged,
    });
  }

  setState(state: Partial<DesignInfoData>): void {
    this.signalChanged.dispatch(state);
  }
}