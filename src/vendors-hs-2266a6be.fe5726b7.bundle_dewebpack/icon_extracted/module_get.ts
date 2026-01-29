function getPopupContainer(this: { props: { getPopupContainer?: (node: Element) => HTMLElement } }): HTMLElement {
  const containerGetter = this.props.getPopupContainer;
  const defaultGetter = (): HTMLElement => document.body;
  const getter = containerGetter ?? defaultGetter;
  
  const domNode = ReactDOM.findDOMNode(this) as Element;
  return getter(domNode) || document.body;
}