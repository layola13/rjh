function getPopupContainer(this: { props: { getPopupContainer?: (node: HTMLElement) => HTMLElement } }): HTMLElement {
  const getContainer = this.props.getPopupContainer;
  
  const containerFn = getContainer ?? (() => document.body);
  
  const domNode = ReactDOM.findDOMNode(this) as HTMLElement;
  
  return containerFn(domNode) || document.body;
}