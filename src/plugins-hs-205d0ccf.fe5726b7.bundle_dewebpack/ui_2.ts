import { Signal } from './Signal';
import { ThemeContext } from './ThemeContext';
import { TeachingAbilityButton } from './TeachingAbilityButton';
import { RemindMain } from './RemindMain';
import { contentConfig } from './contentConfig';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface ButtonRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PageSize {
  width?: number;
  height?: number;
}

interface PageDragConfig {
  pageSize?: PageSize;
  zoomable?: boolean;
}

interface ShowPageData {
  name?: string;
  data?: unknown;
}

interface ShowModelData {
  showPage?: ShowPageData;
  [key: string]: unknown;
}

interface ShowModelOptions {
  button?: string | HTMLElement | ButtonRect;
  data: ShowModelData;
  theme?: string;
}

interface ShowRemindOptions {
  key: string;
  type: string;
  [key: string]: unknown;
}

interface ContentConfigItem {
  zIndex?: number;
}

interface ContentConfigMap {
  [key: string]: ContentConfigItem;
}

interface TeachingAbilityButtonOptions {
  buttonTheme?: string;
  showModel?: (context: { button: HTMLElement | null }) => void;
  className?: string;
}

class DefaultPageDragHelper {
  getDefaultPageDrag(name: string, data: ShowModelData): PageDragConfig | null {
    return null;
  }
}

const defaultPageDragHelper = new DefaultPageDragHelper();

export const signalShowModel = new Signal();

export class UI {
  private containerDom?: HTMLDivElement;
  private remindContainerDom?: HTMLDivElement;
  private remindKey?: string;
  public signalShowModel: Signal;

  constructor() {
    this.showModel = this.showModel.bind(this);
    this.closeModel = this.closeModel.bind(this);
    this.signalShowModel = signalShowModel;
  }

  init(): void {
    const pluginContainer = document.querySelector<HTMLElement>("#plugin-container");
    
    if (!this.containerDom) {
      const container = document.createElement("div");
      container.className = "teaching-ability-container";
      this.containerDom = container;
      pluginContainer?.appendChild(container);
    }
    
    if (!this.remindContainerDom) {
      const remindContainer = document.createElement("div");
      remindContainer.className = "teaching-ability-container";
      this.remindContainerDom = remindContainer;
      pluginContainer?.appendChild(remindContainer);
    }
  }

  getTeachingAbilityButton(options: TeachingAbilityButtonOptions): React.ReactElement {
    const { buttonTheme = "teaching-light", showModel, className } = options;
    const buttonRef = React.createRef<HTMLElement>();
    
    return React.createElement(TeachingAbilityButton, {
      ref: buttonRef,
      onClick: () => {
        showModel?.({ button: buttonRef.current });
      },
      theme: buttonTheme,
      className
    });
  }

  showModel(options: ShowModelOptions): void {
    this.signalShowModel.dispatch({});
    
    const { button, data, theme = "teaching-light" } = options;
    let buttonRect: ButtonRect | undefined;

    if (button) {
      if (typeof button === "string") {
        const element = document.querySelector<HTMLElement>(button);
        buttonRect = element?.getBoundingClientRect() as ButtonRect | undefined;
      } else if (button instanceof HTMLElement) {
        buttonRect = button.getBoundingClientRect() as ButtonRect;
      } else {
        buttonRect = button;
      }
    } else {
      const defaultButton = document.querySelector<HTMLElement>(".teaching-ability-button-wrapper");
      buttonRect = defaultButton?.getBoundingClientRect() as ButtonRect | undefined;
    }

    const rect: ButtonRect = buttonRect ?? { x: 0, y: 0, width: 50, height: 50 };
    const { x, y, height } = rect;
    
    let width = 300;
    let height = 470;
    let zoomable: boolean | undefined;

    if (data.showPage?.name && data.showPage?.data) {
      const pageDragConfig = defaultPageDragHelper.getDefaultPageDrag(
        data.showPage.name,
        data
      );
      
      width = pageDragConfig?.pageSize?.width ?? 300;
      height = pageDragConfig?.pageSize?.height ?? 470;
      zoomable = pageDragConfig?.zoomable;
    }

    const defaultPositionX = Math.max(0, x - width + 100);
    const defaultPositionY = Math.max(0, y + height);

    if (this.containerDom) {
      ReactDOM.render(
        React.createElement(
          ThemeContext.Provider,
          { value: theme },
          React.createElement(ModelComponent, {
            width,
            height,
            zoomAble: zoomable,
            defaultPositionX,
            defaultPositionY,
            close: this.closeModel,
            data
          })
        ),
        this.containerDom
      );
    }
  }

  showRemind(options: ShowRemindOptions): void {
    this.remindKey = options.key;
    
    const configItem = (contentConfig as ContentConfigMap)[options.type];
    const zIndex = configItem?.zIndex?.toString() ?? "";
    
    if (this.remindContainerDom) {
      this.remindContainerDom.style.zIndex = zIndex;
      ReactDOM.render(React.createElement(RemindMain, options), this.remindContainerDom);
    }
  }

  closeRemind(): void {
    if (this.remindContainerDom) {
      ReactDOM.unmountComponentAtNode(this.remindContainerDom);
    }
  }

  closeModel(): void {
    if (this.containerDom) {
      ReactDOM.unmountComponentAtNode(this.containerDom);
    }
  }
}