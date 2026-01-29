export default class ToggleCatalogSidebar {
  private toggleCon: HTMLDivElement | null = null;

  /**
   * Initialize the toggle catalog sidebar container
   */
  init(): void {
    this.toggleCon = document.querySelector<HTMLDivElement>(".toggle-catalog-sidebar-container");

    if (!this.toggleCon) {
      const uiContainer = document.querySelector("#ui-container");
      const container = document.createElement("div");
      container.className = "toggle-catalog-sidebar-container";
      
      if (uiContainer) {
        uiContainer.appendChild(container);
      }
      
      this.toggleCon = container;
    }

    if (this.toggleCon) {
      const React = (window as any).React;
      const ReactDOM = (window as any).ReactDOM;
      const SidebarComponent = (window as any).SidebarComponent;
      
      ReactDOM.render(React.createElement(SidebarComponent, null), this.toggleCon);
    }
  }

  /**
   * Unmount the sidebar React component
   */
  unmountSideBar(): void {
    if (this.toggleCon) {
      const ReactDOM = (window as any).ReactDOM;
      ReactDOM.unmountComponentAtNode(this.toggleCon);
    }
  }

  /**
   * Check if current environment is default app
   */
  isDefaultApp(): boolean {
    const HSApp = (window as any).HSApp;
    return HSApp?.App?.getApp()?.activeEnvironmentId === "default";
  }

  /**
   * Expand or collapse sidebar based on flag
   */
  expandSideBar(shouldExpand: boolean): void {
    if (shouldExpand) {
      this.showSideBar();
    } else {
      this.hideSideBar();
    }
  }

  /**
   * Show the sidebar
   */
  showSideBar(): void {
    this.recoverSideBar();
    
    this.toggleCon?.classList.add("toggle-catalog-sidebar-container-show");
    this.toggleCon?.classList.remove("toggle-catalog-sidebar-container-hide");

    const btnContent = document.querySelector<HTMLElement>(".hsc-btn-content");
    btnContent?.classList.remove("btn-content-folded");
  }

  /**
   * Hide the sidebar
   */
  hideSideBar(): void {
    this.toggleCon?.classList.remove("toggle-catalog-sidebar-container-show");
    this.toggleCon?.classList.add("toggle-catalog-sidebar-container-hide");

    const HSApp = (window as any).HSApp;
    const HSFPConstants = (window as any).HSFPConstants;
    
    if (HSApp?.App?.getApp()?.activeEnvironmentId !== HSFPConstants?.Environment?.CustomizedPM) {
      const btnContent = document.querySelector<HTMLElement>(".hsc-btn-content");
      btnContent?.classList.add("btn-content-folded");
    }
  }

  /**
   * Remove sidebar from display
   */
  removeSideBar(): void {
    if (this.toggleCon) {
      this.toggleCon.style.display = "none";
    }
  }

  /**
   * Recover sidebar display
   */
  recoverSideBar(): void {
    if (this.toggleCon) {
      this.toggleCon.style.display = "block";
    }
  }

  /**
   * Change the top margin of sidebar
   */
  changeTop(topOffset: number = 0): void {
    const sidebar = document.querySelector<HTMLElement>(".toggle-catalog-sidebar");
    
    if (sidebar) {
      sidebar.style.marginTop = `${topOffset}px`;
    }
  }
}