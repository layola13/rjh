interface Position {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

interface CustomizedLargeViewData {
  customizedData?: Record<string, any>;
  image?: string;
}

interface LargeViewData {
  getCustomizedLargeViewData?: Promise<CustomizedLargeViewData>;
  customizedData?: Record<string, any>;
  image?: string;
  [key: string]: any;
}

type RelatedModelSelectCallback = (() => void) | undefined;
type FavFuncCallback = (() => void) | undefined;

class LargeViewController {
  private hideLargeViewTimer: number | undefined;
  private isHoverLargeView: boolean;

  constructor() {
    this.hideLargeViewTimer = undefined;
    this.isHoverLargeView = false;

    const containerDiv = document.createElement("div");
    containerDiv.className = "largeview-panel-container";
    const uiContainer = document.querySelector("#ui-container");
    if (uiContainer) {
      uiContainer.appendChild(containerDiv);
    }
  }

  /**
   * Adjusts the large view position to ensure it stays within viewport bounds
   */
  private changeLargeViewPosition = (element: HTMLElement): void => {
    const rect = element.getBoundingClientRect();
    const { height, bottom } = rect;
    const viewportHeight = document.documentElement.offsetHeight;

    if (bottom > viewportHeight) {
      element.style.top = `${viewportHeight - height - 5}px`;
    }
  };

  private largeViewMouseEnter = (): void => {
    if (this.hideLargeViewTimer) {
      clearTimeout(this.hideLargeViewTimer);
    }
    this.isHoverLargeView = true;
  };

  private largeViewMouseLeave = (): void => {
    this.isHoverLargeView = false;
    this.hideLargeView();
  };

  /**
   * Shows the large view panel with provided data
   */
  async showLargeView(
    data: LargeViewData = {},
    position: Position,
    showVariation: boolean = true,
    onRelatedModelSelect?: RelatedModelSelectCallback,
    onFavFunc?: FavFuncCallback
  ): Promise<void> {
    if (this.hideLargeViewTimer) {
      clearTimeout(this.hideLargeViewTimer);
    }

    const app = HSApp.App.getApp();

    // Fetch customized data if available
    if (data.getCustomizedLargeViewData) {
      try {
        const result = await data.getCustomizedLargeViewData;
        const { customizedData, image } = result;

        if (customizedData) {
          Object.assign(data, { customizedData });
        }

        if (image) {
          Object.assign(data, { image });
        }
      } catch (error) {
        // Handle error silently
      }
    }

    const largeViewContainer = app.pluginManager
      .getPlugin(HSFPConstants.PluginType.Catalog)
      .getLargeViewContainer();

    const containerElement = document.querySelector<HTMLElement>(".largeview-panel-container");
    if (!containerElement) {
      return;
    }

    ReactDOM.render(
      React.createElement(
        "div",
        {
          className: "large-view-area",
          onMouseEnter: () => this.largeViewMouseEnter(),
          onMouseLeave: () => this.largeViewMouseLeave(),
        },
        React.createElement(largeViewContainer, {
          data,
          showVariation,
          onRelatedModelSelect,
          onFavFunc,
          changeLargeViewPosition: () => this.changeLargeViewPosition(containerElement),
        })
      ),
      containerElement,
      () => {
        const { top, bottom, left, right } = position;
        const rect = containerElement.getBoundingClientRect();
        const { height, width } = rect;
        const viewportHeight = document.documentElement.offsetHeight;
        const viewportWidth = document.documentElement.offsetWidth;

        if (top !== undefined) {
          containerElement.style.top =
            top + height > viewportHeight ? `${viewportHeight - height}px` : `${top}px`;
        } else if (bottom !== undefined) {
          containerElement.style.top = `${viewportHeight - bottom - height}px`;
        }

        if (left !== undefined) {
          containerElement.style.left = `${left}px`;
        } else if (right !== undefined) {
          containerElement.style.left = `${viewportWidth - right - width}px`;
        }
      }
    );
  }

  /**
   * Hides the large view panel after a delay
   */
  hideLargeView(): void {
    if (this.hideLargeViewTimer) {
      clearTimeout(this.hideLargeViewTimer);
    }

    const containerElement = document.querySelector<HTMLElement>(".largeview-panel-container");

    this.hideLargeViewTimer = window.setTimeout(() => {
      if (containerElement && !this.isHoverLargeView) {
        ReactDOM.unmountComponentAtNode(containerElement);
        containerElement.removeAttribute("style");
      }
    }, 400);
  }
}

const largeViewController = new LargeViewController();

export default largeViewController;