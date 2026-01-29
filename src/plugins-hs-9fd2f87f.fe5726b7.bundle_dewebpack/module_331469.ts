import { HSCore } from './HSCore';

interface PropertyTreeNode {
  eId?: string;
  children?: PropertyTreeNode[];
  onEnter?(node: PropertyTreeNode, newValue: unknown): void;
  onRightTitleClick?(node: PropertyTreeNode): void;
}

interface ContentParameters {
  roomLoop: unknown;
  propertytree?: {
    children?: PropertyTreeNode[];
  };
}

interface Content {
  parameters: ContentParameters;
  setRotation(value: number): void;
  initCeilingDocument(roomLoop: unknown, flag: boolean): void;
  constructBrep(): void;
}

interface ActionData {
  node: PropertyTreeNode;
  newValue: unknown;
}

type MessageType =
  | 'ceilingchangeend'
  | 'ceilingReset'
  | 'rotationchangeend'
  | 'ceilingResetIncludeRotate'
  | 'onBoolInputDataChange';

export default class CeilingStateRequest extends HSCore.Transaction.Common.StateRequest {
  private _msg: MessageType;
  private _content: Content;
  private _node: PropertyTreeNode;
  private _newValue: unknown;

  constructor(content: Content, msg: MessageType, actionData: ActionData) {
    super();
    this._content = content;
    this._msg = msg;
    this._node = actionData.node;
    this._newValue = actionData.newValue;
  }

  doRequest(): void {
    switch (this._msg) {
      case 'ceilingchangeend':
        if (this._node.onEnter) {
          this._node.onEnter(this._node, this._newValue);
        } else {
          const node = this._getNodeById(this._node.eId);
          if (node?.onEnter) {
            node.onEnter(node, this._newValue);
          }
        }
        break;

      case 'ceilingReset':
        if (this._node.onRightTitleClick) {
          this._node.onRightTitleClick(this._node);
        } else {
          const node = this._getNodeById(this._node.eId);
          if (node?.onRightTitleClick) {
            node.onRightTitleClick(node);
          }
        }
        break;

      case 'rotationchangeend':
        this._content.setRotation(this._newValue as number);
        break;

      case 'ceilingResetIncludeRotate':
        if (this._node.onRightTitleClick) {
          this._node.onRightTitleClick(this._node);
        } else {
          const node = this._getNodeById(this._node.eId);
          if (node?.onRightTitleClick) {
            node.onRightTitleClick(node);
          }
        }
        this._content.setRotation(0);
        break;

      case 'onBoolInputDataChange':
        this._node.onEnter?.(this._node, this._newValue);
        break;
    }
  }

  onCommit(): void {
    this.doRequest();
    super.onCommit();
  }

  onUndo(): void {
    super.onUndo();
    if (this._msg === 'rotationchangeend' || this._msg === 'ceilingResetIncludeRotate') {
      this._content.initCeilingDocument(this._content.parameters.roomLoop, false);
    } else {
      this._content.constructBrep();
    }
  }

  onRedo(): void {
    super.onRedo();
    if (this._msg === 'rotationchangeend' || this._msg === 'ceilingResetIncludeRotate') {
      this._content.initCeilingDocument(this._content.parameters.roomLoop, false);
    } else {
      this._content.constructBrep();
    }
  }

  private _getNodeById(targetId: string | undefined): PropertyTreeNode | undefined {
    if (!targetId) {
      return undefined;
    }

    let foundNode: PropertyTreeNode | undefined;

    const searchNodes = (nodes: PropertyTreeNode[]): void => {
      for (const node of nodes) {
        if (foundNode) {
          return;
        }

        if (node.eId === targetId) {
          foundNode = node;
          return;
        }

        if (node.children && Array.isArray(node.children) && node.children.length > 0) {
          searchNodes(node.children);
        }
      }
    };

    const propertyTree = this._content.parameters.propertytree;
    if (propertyTree?.children) {
      searchNodes(propertyTree.children);
    }

    return foundNode;
  }

  canTransactField(): boolean {
    return true;
  }
}