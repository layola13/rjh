interface WidgetData {
  id?: string;
  src?: string;
  popover?: PopoverConfig | boolean;
  tooltip?: TooltipConfig | string;
  helptips?: string;
  [key: string]: unknown;
}

interface PopoverConfig {
  placement?: string;
  trigger?: string;
  delay?: number;
  imageUrl?: string;
  videoUrl?: string;
  text?: string;
  showBtn?: boolean;
  onBtnClick?: () => void;
  btnText?: string;
  linkText?: string;
  linkUrl?: string;
}

interface TooltipConfig {
  placement?: string;
  trigger?: string;
  title?: string;
  delay?: number;
}

interface Widget {
  update(data: WidgetData): void;
}

interface ImageButton extends Widget {
  // Additional ImageButton specific properties/methods
}

declare const HSApp: {
  UI: {
    Popover: {
      Heavy: React.ComponentType<PopoverConfig & { children?: React.ReactNode }>;
      Tooltip: React.ComponentType<TooltipConfig & { children?: React.ReactNode }>;
    };
  };
};

declare const CImageButton: {
  create(element: JQuery, data: WidgetData): ImageButton;
};

class MiniHelpWidget {
  element: HTMLElement;
  mainWidget: Widget | undefined;
  helpWidget: ImageButton | null;

  constructor(element: HTMLElement, data: WidgetData) {
    this.element = element;
    this.mainWidget = this.createMainWidget(element, data);
    this.helpWidget = this.createHelpWidget(element, data);
  }

  update(data?: WidgetData): void {
    if (data) {
      this.mainWidget?.update(data);
      this.helpWidget?.update(this._getHelpData(data));
    }
  }

  private _getHelpData(data?: WidgetData): WidgetData {
    return {
      id: "help",
      src: "plugin/commonUI/res/question.svg"
    };
  }

  private _getPopoverWidget(data: WidgetData, children: React.ReactElement): React.ReactElement | null {
    const { popover, helptips } = data;
    let { tooltip } = data;
    let result: React.ReactElement | null = null;

    if (helptips) {
      tooltip = helptips;
    }

    if (popover && typeof popover === "object") {
      result = React.createElement(HSApp.UI.Popover.Heavy, {
        placement: popover.placement ?? "top",
        trigger: popover.trigger ?? "hover",
        delay: popover.delay ?? 200,
        imageUrl: popover.imageUrl,
        videoUrl: popover.videoUrl,
        text: popover.text,
        showBtn: popover.showBtn,
        onBtnClick: popover.onBtnClick,
        btnText: popover.btnText,
        linkText: popover.linkText,
        linkUrl: popover.linkUrl
      }, children);
    } else if (tooltip && typeof tooltip === "string") {
      result = React.createElement(HSApp.UI.Popover.Tooltip, {
        placement: "top",
        trigger: "hover",
        delay: 200,
        title: tooltip
      }, children);
    } else if (tooltip && typeof tooltip === "object") {
      result = React.createElement(HSApp.UI.Popover.Tooltip, {
        placement: tooltip.placement ?? "top",
        trigger: tooltip.trigger ?? "hover",
        title: tooltip.title,
        delay: tooltip.delay ?? 200
      }, children);
    }

    return result;
  }

  createHelpWidget(element: HTMLElement, data: WidgetData): ImageButton | null {
    const popoverWidget = this._getPopoverWidget(
      data,
      React.createElement("span", { className: "miniHelpBtn" })
    );

    if (popoverWidget) {
      const helpData = this._getHelpData(data);
      const $element = $(element);
      $element.append('<span class="miniHelpBtnWrapper"></span>');
      ReactDOM.render(popoverWidget, $element.find(".miniHelpBtnWrapper").get(0));
      return CImageButton.create($element.find(".miniHelpBtn"), helpData);
    }

    return null;
  }

  createMainWidget(element: HTMLElement, data: WidgetData): Widget | undefined {
    // Implementation needed
    return undefined;
  }
}

export default MiniHelpWidget;