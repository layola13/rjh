const COOKIE_NAME = "plugin_customizedModeling_top_bar_edit_cookie";

interface JQueryStatic {
  cookie(name: string): string | undefined;
  cookie(name: string, value: boolean): void;
}

declare const $: JQueryStatic;
declare const ReactDOM: {
  unmountComponentAtNode(container: Element): void;
};

export default class TopBarEditTip {
  static create(): void {
    if (!this.getCookie()) {
      const toolbar = document.querySelector<HTMLLIElement>(
        'li[data-toolbar-path="plugin_customized_toolBar_edit"]'
      );
      
      if (toolbar) {
        const tipContainer = document.createElement("div");
        tipContainer.setAttribute("id", "top-bar-edit-tip");
        toolbar.appendChild(tipContainer);
      }
    }
  }

  static getCookie(): string | undefined {
    return $.cookie(COOKIE_NAME);
  }

  static setCookie(): void {
    $.cookie(COOKIE_NAME, true);
  }

  static destroy(): void {
    const tipElement = document.getElementById("top-bar-edit-tip");
    
    if (tipElement) {
      ReactDOM.unmountComponentAtNode(tipElement);
      tipElement.parentNode?.removeChild(tipElement);
    }
    
    this.setCookie();
  }
}