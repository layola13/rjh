export default function getChildren<T extends { children?: unknown }>(element: T): T['children'] {
  return element.children;
}