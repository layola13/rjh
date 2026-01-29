interface LayoutConstraint {
  isModal?: boolean;
  left?: number;
  display?: string;
}

interface LayoutManager {
  register(name: string, element: HTMLElement): void;
  addConstrain(
    source: string,
    target: string,
    callback: (constraint: LayoutConstraint) => void
  ): void;
}

interface AppInstance {
  layoutMgr: LayoutManager;
}

interface HSAppStatic {
  App: {
    getApp(): AppInstance;
  };
}

declare const HSApp: HSAppStatic;

interface CommissionBarComponent extends React.ComponentType<Record<string, never>> {}

declare const React: {
  createElement(
    component: CommissionBarComponent,
    props: Record<string, never> | null
  ): React.ReactElement;
};

declare const ReactDOM: {
  render(
    element: React.ReactElement,
    container: HTMLElement,
    callback?: () => void
  ): void;
};

export default class CommissionBarManager {
  private barContainer: HTMLElement | null = null;

  /**
   * Initialize the commission bar container and render the component
   */
  init(): void {
    if (this.barContainer = document.querySelector(".toggle-commission-container"), !this.barContainer) {
      const pluginContainer = document.getElementById("plugin-container");
      const containerElement = document.createElement("div");
      containerElement.className = "toggle-commission-container";
      
      if (pluginContainer) {
        pluginContainer.appendChild(containerElement);
      }
      
      this.barContainer = containerElement;
    }

    if (this.barContainer && !this.barContainer.hasChildNodes()) {
      const CommissionBarComponent = {} as CommissionBarComponent;
      
      ReactDOM.render(
        React.createElement(CommissionBarComponent, null),
        this.barContainer,
        () => {
          const layoutManager = HSApp.App.getApp().layoutMgr;
          layoutManager.register("CommissionBar", this.barContainer!);
          layoutManager.addConstrain(
            "PropertyBar",
            "CommissionBar",
            (constraint: LayoutConstraint) => {
              return this.positionChange(constraint);
            }
          );
        }
      );
    }
  }

  /**
   * Handle position changes based on layout constraints
   */
  positionChange(constraint: LayoutConstraint): void {
    if (!this.barContainer) {
      return;
    }

    if (constraint.isModal !== undefined) {
      this.barContainer.style.right = constraint.isModal ? "0px" : "248px";
    } else if (constraint.left !== undefined) {
      const rightOffset = document.documentElement.clientWidth - constraint.left;
      const adjustedOffset = rightOffset > 0 ? rightOffset + 8 : rightOffset;
      this.barContainer.style.right = `${adjustedOffset}px`;
    } else if (constraint.display === "block") {
      this.barContainer.style.right = "248px";
    } else if (constraint.display === "none") {
      this.barContainer.style.right = "0px";
    }
  }
}