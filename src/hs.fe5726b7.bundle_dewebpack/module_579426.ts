interface CImageOptions {
  id: string;
  src: string;
  name: string;
  tooltip: string;
  hidden: boolean;
}

interface CImageInstance {
  cimage(action: string): void;
}

interface JQuery {
  cimage(options: Partial<CImageOptions>): CImageInstance;
  cimage(action: string): void;
}

class CImage {
  private instance: CImageInstance | undefined;
  private container: JQuery;
  private param: Partial<CImageOptions>;

  constructor(container: JQuery, param: Partial<CImageOptions>) {
    this.container = container;
    this.param = param;
    this.instance = this.container.cimage(this.param);
  }

  static create(container: JQuery, param: Partial<CImageOptions>): CImage {
    return new CImage(container, param);
  }

  update(options: Partial<CImageOptions>): void {
    this.destroy();
    $.extend(this.param, options);
    this.instance = this.container.cimage(this.param);
  }

  destroy(): void {
    this.instance?.cimage("destroy");
  }
}

interface ResourceManager {
  injectSVGImage(element: HTMLElement): void;
}

declare const ResourceManager: ResourceManager;

interface CImageWidget extends JQuery.Widget {
  options: CImageOptions;
  _$(): JQuery;
  _$(selector: string): JQuery;
}

$.widget("custom.cimage", {
  widgetEventPrefix: "cimage",
  
  options: {
    id: "",
    src: "",
    name: "",
    tooltip: "",
    hidden: false
  },

  _create(this: CImageWidget): void {
    const template = '<span class="image" title="#tooltip"><img/></span><span class="tool-name">#name</span>';
    const html = template
      .replace("#tooltip", this.options.tooltip)
      .replace("#name", this.options.name);
    
    this.element.append($(html));
    
    const imgElement = this.element.find("img");
    const fileExtension = this.options.src.split(".").pop();
    
    if (this.options.src && fileExtension === "svg") {
      ResourceManager.injectSVGImage(imgElement.attr("data-src", this.options.src)[0]);
    } else {
      imgElement.attr("src", this.options.src);
    }
    
    this._$().show();
    
    if (this.options.hidden) {
      this._$().hide();
    }
  },

  _destroy(this: CImageWidget): void {
    this.element.html("");
  },

  _$(this: CImageWidget, selector?: string): JQuery {
    return selector ? this._$().find(selector) : this.element;
  }
});

window.CImage = CImage;

declare global {
  interface Window {
    CImage: typeof CImage;
  }
}