import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';
import { HSConstants } from './HSConstants';

interface OriginData {
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  rotation: number;
}

interface OriginDataMap {
  [contentId: string]: OriginData;
}

interface GroupConfig {
  id: string;
  contentType: string;
  XLength: number;
  YLength: number;
  ZLength: number;
}

interface Content {
  id: string;
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  group?: Group;
}

interface Group {
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  members: Content[];
  addItem(content: Content): void;
  removeItem(content: Content): void;
  assignTo(target: null): void;
}

type RotationPlane = 'xy' | 'xz' | 'yz';

interface DragMoveMessage {
  value: number;
}

type MessageData = DragMoveMessage | Record<string, unknown>;

export class CmdRotateContents extends HSApp.Cmd.Command {
  private group?: Group;
  private contents: Content[];
  private plane: RotationPlane;
  private _originData: OriginDataMap;

  constructor(contents: Content[], plane: RotationPlane) {
    super();
    this.contents = contents;
    this.plane = plane;
    this._originData = {};
  }

  onExecute(): void {
    const selectionManager = HSApp.Selection.Manager;
    
    this.contents.forEach((content) => {
      this._originData[content.id] = {
        x: content.x,
        y: content.y,
        z: content.z,
        XRotation: content.XRotation,
        YRotation: content.YRotation,
        rotation: content.ZRotation
      };
      
      if (!selectionManager.hasSelected(content)) {
        selectionManager.select(content);
      }
    });
    
    this._createGroup();
  }

  private _createGroup(): void {
    const selectedContents = this.contents || HSApp.App.getApp().selectionManager.selected(true);
    
    const groupConfig: GroupConfig = {
      id: 'none',
      contentType: HSCore.Util.Content.getGroupContentType(selectedContents),
      XLength: 1,
      YLength: 1,
      ZLength: 1
    };
    
    this.group = HSCore.Model.Group.create(groupConfig);
    
    this.contents.forEach((content) => {
      if (!content.group) {
        this.group!.addItem(content);
      }
    });
  }

  onReceive(messageType: string, messageData: MessageData): unknown {
    switch (messageType) {
      case 'drag_move':
        const dragData = messageData as DragMoveMessage;
        const rotationValue = dragData.value;
        
        if (isNaN(rotationValue)) {
          break;
        }
        
        if (this.plane === 'xy') {
          this.group!.ZRotation = rotationValue;
        } else if (this.plane === 'xz') {
          this.group!.XRotation = rotationValue;
        } else if (this.plane === 'yz') {
          this.group!.YRotation = rotationValue;
        }
        break;
        
      case 'drag_end':
        this._dealRotateRequest();
        this.mgr.complete(this);
        break;
        
      case 'reset':
        this._dealRotateRequest();
        break;
    }
    
    return super.onReceive?.(messageType, messageData);
  }

  private _dealRotateRequest(): void {
    const transManager = this.context.transManager;
    const requests: unknown[] = [];
    
    this.contents.forEach((content) => {
      const originData = this._originData[content.id];
      const currentData: OriginData = {
        x: content.x,
        y: content.y,
        z: content.z,
        XRotation: content.XRotation,
        YRotation: content.YRotation,
        rotation: content.ZRotation
      };
      
      const moveRequest = transManager.createRequest(
        HSFPConstants.RequestType.MoveContentRequest,
        [content, originData, currentData, true]
      );
      
      requests.push(moveRequest);
    });
    
    const compositeRequest = transManager.createRequest(
      HSConstants.RequestType.Composite,
      [requests]
    );
    
    transManager.commit(compositeRequest);
  }

  onCleanup(): void {
    this._removeGroup();
    super.onCleanup?.();
  }

  private _removeGroup(): void {
    const group = this.group;
    
    if (!group) {
      return;
    }
    
    const selectionManager = HSApp.Selection.Manager;
    let wasSelected = false;
    
    if (selectionManager.hasSelected(group)) {
      wasSelected = true;
      selectionManager.unselect(group);
    }
    
    group.members.slice(0).forEach((member) => {
      group.removeItem(member);
      
      if (wasSelected) {
        selectionManager.select(member);
      }
    });
    
    group.assignTo(null);
  }

  getDescription(): string {
    return '旋转多选模型';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}