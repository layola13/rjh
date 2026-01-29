interface PanelLoadingOptions {
  color?: string;
  ispanelcenter?: boolean;
  iscontainercenter?: boolean;
  iscontainerleft?: boolean;
  ispagecenter?: boolean;
}

export class PageLoading {
  private layername: string;
  private loadname: string;

  constructor() {
    this.layername = "fullcover";
    this.loadname = "loadingsvg";
  }

  startLoading(): void {
    if (!document.querySelector(`.${this.loadname}`)) {
      const layerElement = document.createElement("div");
      layerElement.className = this.layername;

      const loadElement = document.createElement("div");
      loadElement.className = this.loadname;

      const imageSrc = (window as any).HSApp?.Config?.TENANT === "ezhome" 
        ? "/path/to/ezhome/loading.svg" 
        : "/path/to/default/loading.svg";

      loadElement.innerHTML = `<div class="load-container">
 <img src="${imageSrc}" />
 </div>`;

      if (!this._isInPage(loadElement) && !this._isInPage(layerElement)) {
        document.body.appendChild(layerElement);
        document.body.appendChild(loadElement);
      }
    }
  }

  private _isInPage(element: HTMLElement): boolean {
    return element !== document.body && document.body.contains(element);
  }

  stopLoading(): void {
    const layerElement = document.querySelector(`.${this.layername}`);
    const loadElement = document.querySelector(`.${this.loadname}`);

    if (layerElement && this._isInPage(layerElement as HTMLElement)) {
      layerElement.parentNode?.removeChild(layerElement);
    }

    if (loadElement && this._isInPage(loadElement as HTMLElement)) {
      loadElement.parentNode?.removeChild(loadElement);
    }
  }
}

export class PanelLoading {
  private parentEl: HTMLElement | null;
  private color: string;
  private isPanelCenter: boolean;
  private isContainerCenter: boolean;
  private isContainerLeft: boolean;
  private loaderName: string;
  private isPageCenter: boolean;

  constructor(parentElement: HTMLElement | null, options?: PanelLoadingOptions) {
    this._initAttr(parentElement, options);
  }

  private _initAttr(parentElement: HTMLElement | null, options?: PanelLoadingOptions): void {
    this.parentEl = parentElement;
    this.color = options?.color ?? "#237ab9";
    this.isPanelCenter = options?.ispanelcenter ?? false;
    this.isContainerCenter = options?.iscontainercenter ?? false;
    this.isContainerLeft = options?.iscontainerleft ?? false;
    this.loaderName = "rotatesvgtarget";
    this.isPageCenter = options?.ispagecenter ?? false;
  }

  show(): void {
    const loaderElement = document.createElement("div");
    loaderElement.className = this.loaderName;

    if (this.isPanelCenter) {
      loaderElement.className += " panelcenter";
    }

    if (this.isContainerCenter) {
      loaderElement.className += " containercenter";
    }

    if (this.isContainerLeft) {
      loaderElement.className += " containerleft";
    }

    loaderElement.innerHTML = `<img src="/path/to/rotate.svg"/>`;

    if (this.isPageCenter) {
      const coverElement = document.createElement("div");
      coverElement.className = "fullcover greycolor";
      loaderElement.classList.add("pagecenter");
      document.querySelector("body")?.appendChild(loaderElement);
      document.querySelector("body")?.appendChild(coverElement);
      return;
    }

    if (this.parentEl && !this.parentEl.querySelector(`.${this.loaderName}`)) {
      this.parentEl.appendChild(loaderElement);
    }
  }

  hide(): void {
    if (this.isPageCenter) {
      const loaderElement = document.querySelector(`.${this.loaderName}.pagecenter`);
      const coverElement = document.querySelector(".fullcover.greycolor");

      if (loaderElement) {
        loaderElement.parentNode?.removeChild(loaderElement);
      }

      if (coverElement) {
        coverElement.parentNode?.removeChild(coverElement);
      }

      return;
    }

    if (this.parentEl) {
      const loaderElement = this.parentEl.querySelector(`.${this.loaderName}`);
      if (loaderElement) {
        loaderElement.parentNode?.removeChild(loaderElement);
      }
    }
  }
}