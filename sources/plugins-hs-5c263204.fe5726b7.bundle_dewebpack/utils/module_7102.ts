// @ts-nocheck
import HSApp from './HSApp';
import ChildGizmo from './ChildGizmo';

export default class ExtendedGizmo extends HSApp.View.Base.Gizmo {
  constructor(
    element: HTMLElement,
    node: Node,
    index: number,
    options: unknown
  ) {
    super(element, node, index);
    this.addChildGizmo(new ChildGizmo(element, node, index, options));
  }
}