import { Component } from 'react';
import * as React from 'react';

interface HelpbarItemData {
  enable: boolean;
  badge?: string;
  visible?: boolean;
  showRedDot?: boolean;
  onclick?: () => void;
  icon?: string;
  label?: string;
  isPressed?: boolean;
  showNew?: boolean;
  countNumber?: number;
  popover?: unknown;
  width?: number;
  hotkey?: string;
  customTip?: string;
  hasDot?: boolean;
  showRedDotKey?: string;
}

interface HelpbarItem {
  name: string;
  type: string;
  data: HelpbarItemData;
  childItems?: HelpbarItem[];
  hasChildPressed?: boolean;
  hasBadgeDot?: boolean;
  signalChanged?: unknown;
  getPath: () => string;
}

interface HelpbarRoot {
  childItems: HelpbarItem[];
  data: HelpbarItemData;
}

interface Helpbar {
  getRoot: () => HelpbarRoot;
}

interface Signal<T = void> {
  listen: (callback: () => T) => void;
  unlisten: (callback: () => T) => void;
}

interface HelpbarProps {
  helpbar: Helpbar;
  signalRefreshHelpUi: Signal;
}

interface HelpbarState {
  childItems: HelpbarItem[];
}

interface RedDotResponse {
  ret: string[];
  data?: Record<string, boolean>;
}

interface Storage {
  get: (key: string) => unknown;
}

const ITEM_TYPE = {
  folder: 'folder',
  button: 'button'
};

class HelpbarComponent extends Component<HelpbarProps, HelpbarState> {
  private _localStorage: Storage;
  private _refresh: () => void;

  constructor(props: HelpbarProps) {
    super(props);
    
    this._localStorage = new (window as any).HSApp.Util.Storage('hsw.ezhome.plugin.persistence');
    this.state = {
      childItems: []
    };
    
    this._refresh = this.refresh.bind(this);
    this.showHelpBarRedDot = this.showHelpBarRedDot.bind(this);
    this.handleHelpbarClick = this.handleHelpbarClick.bind(this);
  }

  componentDidMount(): void {
    this.props.signalRefreshHelpUi.listen(this._refresh);
    this.showHelpBarRedDot();
  }

  componentWillUnmount(): void {
    this.props.signalRefreshHelpUi.unlisten(this._refresh);
  }

  refresh(): void {
    this.forceUpdate();
  }

  setShowRedDot(item: HelpbarRoot | HelpbarItem, redDotData: Record<string, boolean>): HelpbarItem[] {
    let hasRedDot = false;
    
    const processedChildItems = item.childItems?.map((childItem) => {
      if (childItem.data?.showRedDotKey) {
        const redDotKey = childItem.data.showRedDotKey;
        const redDotKeys = Object.keys(redDotData);
        
        if (redDotKeys.includes(redDotKey)) {
          childItem.data.showRedDot = redDotData[redDotKey];
          hasRedDot = redDotData[redDotKey] || hasRedDot;
        } else if (this._localStorage.get(redDotKey)) {
          childItem.data.showRedDot = false;
        } else {
          childItem.data.showRedDot = true;
          hasRedDot = true;
        }
      }
      
      if (childItem.childItems?.length) {
        this.setShowRedDot(childItem, redDotData);
      }
      
      return childItem;
    }) ?? [];
    
    item.data.showRedDot = hasRedDot;
    
    return processedChildItems;
  }

  showHelpBarRedDot(): void {
    const root = this.props.helpbar.getRoot();
    
    (window as any).NWTK.mtop.MemberGrade.showHelpBarRedDot()
      .then((response: RedDotResponse) => {
        if (response?.ret?.[0]?.includes('SUCCESS') && response.data) {
          const processedItems = this.setShowRedDot(root, response.data);
          this.setState({
            childItems: processedItems
          });
        } else {
          this.setState({
            childItems: root.childItems
          });
        }
      })
      .catch(() => {
        this.setState({
          childItems: root.childItems
        });
      });
  }

  handleHelpbarClick(): void {
    this.showHelpBarRedDot();
  }

  render(): React.ReactElement {
    const { childItems } = this.state;
    
    return React.createElement(
      'div',
      {
        className: 'helpbar',
        onClick: this.handleHelpbarClick
      },
      childItems.map((item) => {
        const { data } = item;
        const { enable, badge, visible, showRedDot, onclick } = data;
        
        let element: React.ReactElement;
        
        switch (item.type) {
          case ITEM_TYPE.folder:
            element = React.createElement((window as any).FolderComponent, {
              key: item.name,
              enable,
              visible,
              badge,
              icon: data.icon,
              label: data.label,
              childItems: item.childItems,
              isPressed: data.isPressed,
              hasChildPressed: item.hasChildPressed,
              hasDot: item.hasBadgeDot,
              path: item.getPath(),
              showRedDot,
              showNew: data.showNew,
              countNumber: data.countNumber,
              onClick: onclick
            });
            break;
          case ITEM_TYPE.button:
          default:
            element = React.createElement((window as any).Button, {
              key: item.name,
              enable,
              badge,
              signalChanged: item.signalChanged,
              icon: data.icon,
              label: data.label,
              popover: data.popover,
              onclick: data.onclick,
              width: data.width,
              isPressed: data.isPressed,
              path: item.getPath(),
              hotkey: data.hotkey,
              customTip: data.customTip,
              hasDot: data.hasDot,
              showRedDot,
              showNew: data.showNew,
              countNumber: data.countNumber
            });
        }
        
        return element;
      })
    );
  }
}

export default HelpbarComponent;