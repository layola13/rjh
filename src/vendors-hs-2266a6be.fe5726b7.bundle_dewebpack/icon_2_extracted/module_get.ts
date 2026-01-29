interface ComponentProps {
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
}

interface Component {
  props: ComponentProps;
}

function getPopupContainer(this: Component): HTMLElement {
  const customGetContainer = this.props.getPopupContainer;
  
  const getContainer = customGetContainer ?? (() => document.body);
  
  const domNode = findDOMNode(this);
  
  return getContainer(domNode) || document.body;
}

function findDOMNode(component: Component): HTMLElement {
  // Implementation depends on the actual library being used (React, etc.)
  return document.body;
}