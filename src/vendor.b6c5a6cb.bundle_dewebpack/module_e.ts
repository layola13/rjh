function createElement(tagName: string, className: string): HTMLElement {
    const element = document.createElement(tagName);
    element.className = className;
    return element;
}

export { createElement };