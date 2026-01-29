import ReactDOM from 'react-dom';
import React from 'react';

interface ItemData {
  id?: string;
  className?: string;
  visible?: boolean;
  hidden?: boolean;
  disable?: boolean;
  position?: string;
  [key: string]: unknown;
}

interface StatusBarItem {
  id?: string;
  type: string;
  data: ItemData;
}

interface PositionChangeOptions {
  isModal?: boolean;
  left?: number;
  display?: string;
}

interface PositionLeftChangeOptions {
  isShow: boolean;
  width: number;
}

interface LayoutManager {
  register(name: string, element: HTMLElement): void;
  addConstrain(source: string, target: string, callback: (options: unknown) => void): void;
  update(name: string, options: { updateLeft: boolean; left: number }): void;
}

interface App {
  layoutMgr: LayoutManager;
  environmentManager: {
    activeEnvironmentId: number;
  };
  activeEnvironmentId: number;
}

class StatusBarItemWrapper {
  public data: ItemData;
  public type: string;
  private statusBar: StatusBar;
  private position: string;

  constructor(data: ItemData, type: string, statusBar: StatusBar, position: string) {
    this.data = data;
    this.type = type;
    this.statusBar = statusBar;
    this.position = position;
  }
}

export default class StatusBar {
  private _disableLeft: boolean = false;
  private _disableRight: boolean = false;
  private _showLeft: boolean = true;
  private _showRight: boolean = true;
  private _app!: App;
  private _rootElement: JQuery<HTMLElement> | null = null;
  private _ItemsMap: Map<string, StatusBarItemWrapper> = new Map();
  private _signalHook!: { unlistenAll(): void };

  public init_(app: App, options?: unknown): void {
    this._app = app;
    this._rootElement = null;
    this._ItemsMap = new Map();
    this._init();
    this._signalHook = new (window as any).HSCore.Util.SignalHook(this);
    window.addEventListener('resize', this.handleResize, false);
  }

  public uninit_(): void {
    this._signalHook.unlistenAll();
  }

  private _init(): void {
    if (!this._rootElement) {
      this._rootElement = $('<div class="status-bar"></div>');
      this._rootElement.hide();
      this.show();
    }
  }

  public positionLeftChange(options: PositionLeftChangeOptions): void {
    if (!this._rootElement) return;

    const activeEnvironmentId = (window as any).HSApp.App.getApp().environmentManager.activeEnvironmentId;
    const { Environment } = (window as any).HSFPConstants;

    if (![Environment.Render, Environment.ManualLighting].includes(activeEnvironmentId)) {
      const leftPosition = options.isShow ? 60 + options.width : 60;
      $(this._rootElement).css('left', `${leftPosition}px`);
      this._app.layoutMgr.update('StatusBar', {
        updateLeft: true,
        left: leftPosition
      });
    }
  }

  public positionChange(options: PositionChangeOptions): void {
    if (!this._rootElement) return;

    if (options.isModal !== undefined) {
      const rightPosition = options.isModal ? 0 : 248;
      $(this._rootElement).css('right', `${rightPosition}px`);
    } else if (options.left !== undefined) {
      const rightOffset = document.documentElement.clientWidth - options.left;
      const adjustedOffset = rightOffset > 0 ? rightOffset + 8 : rightOffset;
      $(this._rootElement).css('right', `${adjustedOffset}px`);
    } else if (options.display === 'block') {
      $(this._rootElement).css('right', '248px');
    } else if (options.display === 'none') {
      $(this._rootElement).css('right', '0px');
    }

    const leftPosition = this.getLeftPosition();
    const rightStatusBar = document.querySelector('.right-status-bar') as HTMLElement;

    if ((leftPosition > 700 && window.innerWidth >= 1390) || leftPosition <= 700) {
      if (rightStatusBar) $(rightStatusBar).css('display', 'flex');
    } else {
      if (rightStatusBar) $(rightStatusBar).css('display', 'none');
    }
  }

  public getLeftPosition(): number {
    const independentContainer = document.querySelector('.detail-page-independent-container-wrapper') as HTMLElement;
    let leftPosition = ($('.entry-container').is(':hidden') ? 0 : $('.entry-container').width() ?? 0) +
      ($('.detail-page-container-wrapper').is(':hidden') ? 0 : $('.detail-page-container-wrapper').width() ?? 0);

    if (independentContainer?.offsetWidth) {
      leftPosition = independentContainer.offsetWidth;
    }

    if (!leftPosition) {
      leftPosition = 0;
    }

    if ((window as any).HSApp.App.getApp().activeEnvironmentId === (window as any).HSFPConstants.Environment.Bom) {
      const constructionList = document.querySelector('.construction-list-wrap') as HTMLElement;
      if (constructionList) {
        leftPosition = constructionList.offsetWidth || 0;
      }
    }

    return leftPosition;
  }

  public show(container?: JQuery<HTMLElement>): void {
    const targetContainer = container ?? $('#plugin-container');
    if (!this._rootElement) return;

    targetContainer.append(this._rootElement);

    if ((window as any).HSApp.App.getApp().activeEnvironmentId === (window as any).HSFPConstants.Environment.Bom) {
      const bomProperty = document.querySelector('.bom-property') as HTMLElement;
      if (bomProperty) {
        const propertyWidth = bomProperty.offsetWidth;
        $(this._rootElement).css('right', `${propertyWidth}px`);
      }
    }

    const StatusBarComponent = (window as any).HSCore.Components.StatusBar;
    ReactDOM.render(
      React.createElement(StatusBarComponent, {
        showLeft: this._showLeft,
        showRight: this._showRight,
        disableLeft: this._disableLeft,
        disableRight: this._disableRight,
        itemsMap: this._ItemsMap,
        onopenpopup: this.onopenpopup,
        onclosepopup: this.onclosepopup
      }),
      this._rootElement[0],
      () => {
        const layoutMgr = (window as any).HSApp.App.getApp().layoutMgr;
        layoutMgr.register('StatusBar', this._rootElement![0]);
        layoutMgr.addConstrain('RightPropertyBar', 'StatusBar', (opts: PositionChangeOptions) => this.positionChange(opts));
        layoutMgr.addConstrain('CatalogLib', 'StatusBar', (opts: PositionLeftChangeOptions) => this.positionLeftChange(opts));
        layoutMgr.addConstrain('PropertyBar', 'StatusBar', (opts: PositionChangeOptions) => this.positionChange(opts));
      }
    );

    this._rootElement.show();
  }

  public hide(): void {
    this._init();
    this._rootElement?.hide();
    this._rootElement?.detach();
  }

  public clear(): void {
    this._removeAll();
    this._init();
  }

  public addItem(item: StatusBarItem, position: string): StatusBarItemWrapper {
    return this._addItem(item, position);
  }

  public update(leftItems?: StatusBarItem[], centerItems?: StatusBarItem[], rightItems?: StatusBarItem[]): void {
    this.clear();

    leftItems?.forEach(item => {
      this._addItem(item, 'left');
    });

    centerItems?.forEach(item => {
      this._addItem(item, 'left');
    });

    rightItems?.forEach(item => {
      const position = item.position === 'rightFloat' ? 'rightFloat' : 'right';
      this._addItem(item, position);
    });

    this.show();
  }

  public getItemById(id: string): StatusBarItemWrapper | undefined {
    return this._ItemsMap.get(id);
  }

  private _removeAll(): void {
    this._ItemsMap.clear();
  }

  public disableStatusBarByType(type: string): void {
    if (type === 'left') {
      this._disableLeft = true;
    } else if (type === 'right') {
      this._disableRight = true;
    }
    this.show();
  }

  public enableStatusBarByType(type: string): void {
    if (type === 'left') {
      this._disableLeft = false;
    } else if (type === 'right') {
      this._disableRight = false;
    }
    this.show();
  }

  public showStatusBar(type: string, visible: boolean): void {
    switch (type) {
      case 'left':
        this._showLeft = visible;
        break;
      case 'right':
        this._showRight = visible;
        break;
      case 'all':
        this._showLeft = visible;
        this._showRight = visible;
        break;
    }
    this.show();
  }

  public isDisabled(type: string): boolean {
    if (type === 'left') {
      return this._disableLeft;
    } else if (type === 'right') {
      return this._disableRight;
    }
    return false;
  }

  public disableAllItems(disable: boolean = true): void {
    this._ItemsMap.forEach(item => {
      item.data.disable = disable;
    });
  }

  public setToolbarEditModel(): void {
    this.disableAllItems(false);
  }

  public setToolbarViewerModel(): void {
    // Implementation needed
  }

  public setToolbarReadonlyModel(): void {
    // Implementation needed
  }

  private _addItem(item: StatusBarItem, position: string): StatusBarItemWrapper {
    const itemData: ItemData = {
      ...item.data,
      id: item.id
    };

    if (itemData.visible === undefined) {
      itemData.visible = !itemData.hidden;
    }

    const itemId = item.id ?? itemData.className ?? (window as any).HSCore.Util.String.randomGUID();
    const wrapper = new StatusBarItemWrapper(itemData, item.type, this, position);
    this._ItemsMap.set(itemId, wrapper);

    return wrapper;
  }

  private handleResize = (): void => {
    // Resize handler implementation
  };

  private onopenpopup = (): void => {
    // Open popup handler implementation
  };

  private onclosepopup = (): void => {
    // Close popup handler implementation
  };
}