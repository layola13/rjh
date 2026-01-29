import { GenericNode } from './GenericNode';

interface RealNode {
  id: string;
}

export class StructureNode extends GenericNode {
  public childNodes: StructureNode[];
  public realNode: RealNode;

  constructor(realNode: RealNode) {
    super(realNode.id);
    this.childNodes = [];
    this.realNode = realNode;
  }
}