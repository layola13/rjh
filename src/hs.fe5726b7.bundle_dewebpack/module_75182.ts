import { Message } from './message';
import { uuid } from './uuid';
import './styles';

Message.config({
  single: true
});

enum StatusEnum {
  LOADING = "loading",
  WARNING = "warning",
  COMPLETED = "completed",
  CANOPS = "canops"
}

interface AppParams {
  mode: string;
}

interface App {
  appParams?: AppParams;
  activeEnvironmentId?: string;
  pluginManager: {
    getPlugin(type: string): {
      getToolbarHeight(): number;
    };
  };
}

interface HSApp {
  App: {
    getApp(): App;
    ModeTypeEnum: {
      iframe: string;
    };
  };
  Config: {
    IS_TOOLBAR_SHOW_TOOLTIP: boolean;
  };
}

interface HSFPConstants {
  Environment: {
    CustomizedModeling: string;
  };
  PluginType: {
    Toolbar: string;
  };
}

declare const HSApp: HSApp;
declare const HSFPConstants: HSFPConstants;

interface MessageOptions {
  onClose?: () => void;
  status?: StatusEnum;
  id?: string;
  canclose?: boolean;
  top?: number;
  animation?: boolean;
  append?: string;
  closeCallback?: () => void;
}

interface MessageConfig {
  closable?: boolean;
  duration?: number;
  always?: boolean;
  className?: string;
  top?: number;
  closeHandler?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
}

class LiveHint {
  private _uuid: string = "";
  private readonly _offsetTopHide: number = -100;
  private readonly _app: App;
  public readonly statusEnum = StatusEnum;
  public id: string = "";

  constructor() {
    this._app = HSApp.App.getApp();
  }

  /**
   * Bind default action handlers to action elements
   */
  bindDefaultAction(handlers: EventListener | EventListener[]): void {
    const container = document.getElementById(this._uuid);
    const actionElements = container?.querySelectorAll<HTMLSpanElement>("span.action");

    if (!actionElements || actionElements.length === 0 || !handlers) {
      return;
    }

    if (Array.isArray(handlers)) {
      for (let i = 0; i < actionElements.length; i++) {
        actionElements[i].addEventListener("click", handlers[i], false);
      }
    } else {
      actionElements[0].addEventListener("click", handlers, false);
    }
  }

  private createMarkup(html: string): { __html: string } {
    return {
      __html: html
    };
  }

  private _getOffsetClassName(): string {
    const isIframeMode = this._app?.appParams?.mode === HSApp.App.ModeTypeEnum.iframe;
    const isCustomizedModeling = this._app.activeEnvironmentId === HSFPConstants.Environment.CustomizedModeling;
    const isToolbarTooltipShown = HSApp.Config.IS_TOOLBAR_SHOW_TOOLTIP;

    if (isIframeMode) {
      return "iframe-livehint";
    }

    if (isCustomizedModeling) {
      return "customized-modeling-livehint";
    }

    return isToolbarTooltipShown ? "default-livehint" : "toolbar-livehint";
  }

  /**
   * Configure single message pattern
   */
  setSinglePattern(single: boolean): void {
    Message.config({
      single
    });
  }

  /**
   * Show live hint message
   */
  show(
    content: string,
    duration?: number,
    actions?: EventListener | EventListener[],
    options: MessageOptions = {}
  ): void {
    this._uuid = uuid();

    const {
      onClose,
      status,
      id,
      canclose,
      top,
      animation = true,
      append,
      closeCallback
    } = options;

    const toolbarHeight = this._app.pluginManager
      .getPlugin(HSFPConstants.PluginType.Toolbar)
      .getToolbarHeight();

    this.id = id ?? this._uuid;

    const isAlways = !duration;
    let className = this._getOffsetClassName();

    if (!animation) {
      className += " no-animiation";
    }

    const messageConfig: MessageConfig = {
      closable: canclose,
      duration,
      always: isAlways,
      className,
      top: top ?? toolbarHeight,
      closeHandler: () => {
        this.id = this._uuid;
        closeCallback?.();
      }
    };

    if (actions) {
      Object.assign(messageConfig, {
        onOpen: () => this.bindDefaultAction(actions)
      });
    }

    if (onClose) {
      messageConfig.onClose = onClose;
    }

    const finalContent = append ? content + append : content;

    const element = React.createElement("div", {
      id: this._uuid,
      className: "hs-livehint-content",
      dangerouslySetInnerHTML: this.createMarkup(finalContent)
    });

    switch (status) {
      case StatusEnum.LOADING:
        Message.loading(element, messageConfig);
        break;
      case StatusEnum.WARNING:
        Message.warning(element, messageConfig);
        break;
      case StatusEnum.COMPLETED:
        Message.success(element, messageConfig);
        break;
      case StatusEnum.CANOPS:
      default:
        Message.info(element, messageConfig);
    }
  }

  /**
   * Hide live hint message
   */
  hide(): void {
    this.id = this._uuid;
    Message.clear();
  }

  /**
   * Change z-index of message
   */
  changeZIndex(zIndex: number): void {
    Message.changeZIndex(zIndex);
  }
}

export default new LiveHint();