import { Plugin as IPlugin } from './IPlugin';
import { PopupWindow } from './PopupWindow';
import DropdownComponent from './DropdownComponent';
import DragPopupWindowComponent from './DragPopupWindowComponent';
import UtilModule from './UtilModule';
import MouseTooltipTemplate from './MouseTooltipTemplate.html';

interface MouseTipOptions {
  background?: string;
  txtColor?: string;
}

interface Position {
  x: number;
  y: number;
}

interface DropdownMenuConfig {
  refname?: string;
  data: unknown[];
  title: string;
  name: string;
  classname?: string;
  onchanged?: (value: unknown) => void;
  placeholder?: string;
}

interface PopupWindowConfig {
  windowname: string;
  title: string;
  contents: React.ReactNode;
  oklabel?: string;
  cancellabel?: string;
  maskClosable?: boolean;
  width?: number;
  height?: number;
  submitcall?: () => void;
  cancelcall?: () => void;
  hasHelp?: boolean;
  tooltipHtml?: string;
  popover?: React.ReactNode;
  tooltip?: string;
}

interface DragPopupWindowConfig {
  ref?: React.Ref<unknown>;
  windowname: string;
  class?: string;
  headername: string;
  contents: React.ReactNode;
  winwidth?: number;
  wintop?: number;
  winright?: number;
  submitcall?: () => void;
  cancelCmd?: () => void;
}

interface UIThreadOptions {
  overridable?: boolean;
  taskId?: string;
  delayLimits?: number;
}

declare global {
  interface Window {
    updateMouseTips: (text: string | null, position: Position, options?: MouseTipOptions) => void;
    runInUIThread?: (callback: () => void, options?: UIThreadOptions) => void;
  }
  
  const HSApp: {
    Plugin: {
      IPlugin: typeof IPlugin;
      registerPlugin: (type: string, pluginClass: typeof CommonUIPlugin) => void;
    };
  };
  
  const HSFPConstants: {
    PluginType: {
      CommonUI: string;
    };
  };
  
  function getXMLResource(template: string, callback: (html: string) => void, selector: string): void;
  function runInUIThread(callback: () => void, options?: UIThreadOptions): void;
}

const MOUSE_TIP_OFFSET_X = 10;
const MOUSE_TIP_OFFSET_Y = -40;
const DEFAULT_BACKGROUND = 'rgba(0, 0, 0, 0.8)';
const DEFAULT_TEXT_COLOR = 'rgba(255, 255, 255, 1)';
const UI_THREAD_DELAY_LIMITS = 10;

/**
 * CommonUI Plugin - Provides UI components for floorplan editor
 */
class CommonUIPlugin extends IPlugin {
  constructor() {
    super({
      name: 'CommonUI plugin',
      description: 'provide CommonUI component for floorplan',
      dependencies: []
    });
    
    window.updateMouseTips = this.updateMouseTips.bind(this);
  }

  /**
   * Called when plugin becomes active
   */
  onActive(context: unknown): void {
    super.onActive(context);
    
    getXMLResource(MouseTooltipTemplate, (html: string) => {
      $('#editor').append($(html));
    }, 'div.mousetooltip');
  }

  /**
   * Called when plugin becomes inactive
   */
  onDeactive(): void {
    // Cleanup if needed
  }

  /**
   * Updates mouse tooltip with optional UI thread throttling
   */
  updateMouseTips(text: string | null, position: Position, options?: MouseTipOptions): void {
    if (window.runInUIThread) {
      runInUIThread(() => {
        this.updateMouseTipsImmediate(text, position, options);
      }, {
        overridable: true,
        taskId: 'updateMouseTips',
        delayLimits: UI_THREAD_DELAY_LIMITS
      });
    } else {
      this.updateMouseTipsImmediate(text, position, options);
    }
  }

  /**
   * Immediately updates mouse tooltip display
   */
  private updateMouseTipsImmediate(text: string | null, position: Position, options?: MouseTipOptions): void {
    const display = text ? 'block' : 'none';
    const tooltipElement = $('div.mousetooltip')[0] as HTMLDivElement;
    
    tooltipElement.style.display = display;
    
    if (text) {
      tooltipElement.style.background = options?.background ?? DEFAULT_BACKGROUND;
      tooltipElement.style.color = options?.txtColor ?? DEFAULT_TEXT_COLOR;
      tooltipElement.style.left = `${position.x + MOUSE_TIP_OFFSET_X}px`;
      tooltipElement.style.top = `${position.y + MOUSE_TIP_OFFSET_Y}px`;
      
      const spanElement = $('div.mousetooltip > span')[0] as HTMLSpanElement;
      spanElement.innerText = text;
    }
  }

  /**
   * Creates a dropdown menu React component
   */
  createDropdownMenu(config: DropdownMenuConfig): React.ReactElement {
    return React.createElement(DropdownComponent, {
      ref: config.refname,
      items: config.data,
      title: config.title,
      name: config.name,
      classname: config.classname,
      onchanged: config.onchanged,
      placeholder: config.placeholder
    });
  }

  /**
   * Creates a popup window React component
   */
  createPopupwindow(config: PopupWindowConfig): React.ReactElement {
    return React.createElement(PopupWindow, {
      windowname: config.windowname,
      headername: config.title,
      contents: config.contents,
      oklabel: config.oklabel,
      cancellabel: config.cancellabel,
      maskClosable: config.maskClosable,
      winwidth: config.width,
      winheight: config.height,
      submitcall: config.submitcall,
      cancelcall: config.cancelcall,
      hasHelp: config.hasHelp,
      tooltipHtml: config.tooltipHtml,
      popover: config.popover,
      tooltip: config.tooltip
    });
  }

  /**
   * Creates a draggable popup window React component
   */
  createDragPopupWindow(config: DragPopupWindowConfig): React.ReactElement {
    return React.createElement(DragPopupWindowComponent, {
      ref: config.ref,
      windowname: config.windowname,
      class: config.class,
      headername: config.headername,
      contents: config.contents,
      winwidth: config.winwidth,
      wintop: config.wintop,
      winright: config.winright,
      submitcall: config.submitcall,
      cancelCmd: config.cancelCmd
    });
  }

  /**
   * Returns utility module
   */
  getUtil(): typeof UtilModule {
    return UtilModule;
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.CommonUI, CommonUIPlugin);

export default CommonUIPlugin;