function appendTo<T extends Node>(element: T, parent: Node): T {
  parent.appendChild(element);
  return element;
}

export { appendTo };