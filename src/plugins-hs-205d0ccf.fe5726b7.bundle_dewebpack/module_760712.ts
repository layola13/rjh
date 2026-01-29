import ReactDOM from 'react-dom';
import RightMenuComponent from './RightMenuComponent';
import RightMenuUtils from './RightMenuUtils';
import rightMenuTemplate from './rightMenuTemplate';

enum PropertyBarControlTypeEnum {
  divider = 'divider'
}

interface Position {
  x: number;
  y: number;
}

interface MenuItem {
  type: PropertyBarControlTypeEnum | string;
  keep?: boolean;
  disable?: boolean;
  order?: number;
}

interface Signals {
  signalPopulateMinBar: Signal;
  signalPopulateCustomizedItems: Signal;
  signalItemClickEventTrack: Signal;
}

interface Signal {
  dispatch(data?: unknown): void;
  unlistenAll?(): void;
}

interface MouseEventData {
  data: {
    event?: MouseEvent;
    type: string;
  };
}

declare const HSDevice: {
  Mouse: {
    bind(context: unknown, handler: (event: MouseEventData) => boolean): void;
  };
  MouseEvents: {
    Click: string;
  };
};

declare const getXMLResource: (
  template: unknown,
  callback: (resource: string) => void,
  selector: string
) => void;

declare const PropertyBarControlTypeEnum: {
  divider: PropertyBarControlTypeEnum.divider;
};

export default class RightMenuManager {
  private signalPopulateMinBar!: Signal;
  private signalPopulateCustomizedItems!: Signal;
  private signalItemClickEventTrack!: Signal;
  private _showRightMenu: boolean = false;
  private enableMenu: boolean = false;
  private _cabinetApp?: boolean;
  private _isDisableRightmenu: boolean = false;
  private _signalHook?: { unlistenAll(): void };
  private documentClicked: (event: MouseEvent) => void;

  constructor() {
    this.documentClicked = this.handleDocumentClick.bind(this);
  }

  init(editorElement: unknown, options: unknown, signals: Signals): void {
    this.signalPopulateMinBar = signals.signalPopulateMinBar;
    this.signalPopulateCustomizedItems = signals.signalPopulateCustomizedItems;
    this.signalItemClickEventTrack = signals.signalItemClickEventTrack;
    this._showRightMenu = false;

    getXMLResource(rightMenuTemplate, (resource: string) => {
      $('#editor').append($(resource));
    }, '.rightmenu');

    $(document).bind('keydown', 'esc', this.escHideRightMenu.bind(this));

    window.oncontextmenu = () => false;

    this.enableMenu = false;

    if (this.enableMenu) {
      HSDevice.Mouse.bind(this, (event: MouseEventData) => {
        const mouseEvent = event.data.event || window.event as MouseEvent;
        if (event.data.type === HSDevice.MouseEvents.Click && mouseEvent.which === 3) {
          const menuData = this.initData(this.signalPopulateCustomizedItems);
          this.showRightMenuBar(
            { x: mouseEvent.pageX, y: mouseEvent.pageY },
            menuData
          );
          return true;
        }
        return false;
      });
    }

    document.addEventListener('mousedown', this.documentClicked);
  }

  private handleDocumentClick(event: MouseEvent): void {
    const composedEvent = event || window.event;
    const eventPath = (composedEvent as any).path || composedEvent.composedPath?.() || [];

    const isRightMenuClick = event.target && eventPath.find((element: HTMLElement) => {
      return element.className === 'rightmenu';
    });

    if (!isRightMenuClick) {
      this.hideRightMenu();
    }
  }

  uninit(): void {
    this._signalHook?.unlistenAll();
    document.removeEventListener('mousedown', this.documentClicked);
  }

  onItemClickEventTrack(): void {
    this.signalItemClickEventTrack.dispatch();
  }

  renderMenu(position: Position, menuData: MenuItem[], forceUpdate: boolean = false): void {
    const menuElement = document.querySelector('.rightmenu') as HTMLElement;

    if (forceUpdate) {
      ReactDOM.unmountComponentAtNode(menuElement);
    }

    ReactDOM.render(
      React.createElement(RightMenuComponent, {
        data: menuData,
        onItemClickEventTrack: this.onItemClickEventTrack.bind(this)
      }),
      menuElement
    );

    menuElement.style.display = 'block';
    this._showRightMenu = true;

    const minToolbarSelector = '.mintoolbarcontainer';
    $(minToolbarSelector).hide();
    this.signalPopulateMinBar.dispatch({ selector: minToolbarSelector });

    this.autoFitMenu(position, menuData, menuElement);
  }

  private autoFitMenu(position: Position, menuData: MenuItem[], menuElement: HTMLElement): void {
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    
    const MENU_WIDTH = 140;
    const ITEM_HEIGHT = 25;
    const OFFSET = 3;
    
    let posX = position.x + OFFSET;
    let posY = position.y + OFFSET;

    let itemCount = 0;
    menuData.forEach((item) => {
      if (item.type !== PropertyBarControlTypeEnum.divider) {
        itemCount++;
      }
    });

    if (posX + MENU_WIDTH > clientWidth) {
      posX = clientWidth - MENU_WIDTH;
    }

    const menuHeight = ITEM_HEIGHT * itemCount;
    if (posY + menuHeight > clientHeight / 1.1) {
      posY -= menuHeight + ITEM_HEIGHT - OFFSET;
      posX -= OFFSET;
    }

    menuElement.style.left = `${posX}px`;
    menuElement.style.top = `${posY}px`;
  }

  filterSortItems(items: MenuItem[]): MenuItem[] {
    let filteredItems = items.filter((item) => {
      return item.keep || !item.disable;
    });

    filteredItems.forEach((item, index) => {
      if (item && item.order === undefined) {
        item.order = index;
      }
    });

    filteredItems.sort((a, b) => {
      return (a.order ?? 0) - (b.order ?? 0);
    });

    return this.filterRepetitiveItems(filteredItems);
  }

  private filterRepetitiveItems(items: MenuItem[]): MenuItem[] {
    const result: MenuItem[] = [];

    for (const [index, item] of items.entries()) {
      const nextItem = items[index + 1];
      
      const isConsecutiveDivider = nextItem && 
        item.type === nextItem.type && 
        item.type === PropertyBarControlTypeEnum.divider;
      
      const isLastDivider = !nextItem && item.type === PropertyBarControlTypeEnum.divider;

      if (!isConsecutiveDivider && !isLastDivider) {
        result.push(item);
      }
    }

    return result.filter((item, index) => {
      return index !== 0 || item.type !== PropertyBarControlTypeEnum.divider;
    });
  }

  initData(signal: Signal): MenuItem[] {
    return RightMenuUtils.getRightMenuItem(this._cabinetApp, signal);
  }

  showRightMenuBar(position: Position, menuData?: MenuItem[], forceUpdate: boolean = false): void {
    if (this._isDisableRightmenu || !this.enableMenu) {
      return;
    }

    if (!menuData) {
      menuData = this.initData(this.signalPopulateCustomizedItems);
    }

    const filteredData = this.filterSortItems(menuData);
    
    if (filteredData.length !== 0) {
      this.renderMenu(position, filteredData, forceUpdate);
    }
  }

  showRightMenu(): void {
    this._cabinetApp = true;
  }

  disableRightmenu(): void {
    this._isDisableRightmenu = true;
  }

  enableRightmenu(): void {
    this._isDisableRightmenu = false;
  }

  isRightMenuShowed(): boolean {
    return this._showRightMenu;
  }

  hideRightMenu(): void {
    this._showRightMenu = false;
    const menuElement = document.querySelector('.rightmenu') as HTMLElement;
    if (menuElement) {
      menuElement.style.display = 'none';
    }
  }

  escHideRightMenu(event: JQuery.Event | KeyboardEvent): void {
    const keyboardEvent = (event as any).originalEvent || event as KeyboardEvent;
    if (keyboardEvent.code === 'Escape') {
      this.hideRightMenu();
    }
  }

  setRightMenuStatusMap(statusMap: unknown): void {
    RightMenuUtils.setRightMenuStatusMap(statusMap);
  }

  setRightMenuStatus(enabled: boolean): void {
    this.enableMenu = enabled;
  }
}