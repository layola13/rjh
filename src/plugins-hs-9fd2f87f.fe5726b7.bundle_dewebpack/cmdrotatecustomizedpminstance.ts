import { Vector3 } from 'three';
import { HSCore } from '../core';

interface RotationAngles {
  angle: number;
  offset: number;
  mark: number;
}

interface DragMoveEvent {
  delta: number;
}

type EventType = 'mouseup' | 'dragend' | 'dragmove' | string;
type Plane = 'xy' | 'yz' | 'xz';

interface CustomizedPMInstance {
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

interface TransactionSession {
  commit(): void;
  abort(): void;
}

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(requestType: string, params: unknown[]): unknown;
  commit(request: unknown): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  cancel(command: Command): void;
  complete(command: Command): void;
}

abstract class Command {
  protected context!: CommandContext;
  protected mgr!: CommandManager;

  abstract onExecute(event?: unknown): void;
  abstract onComplete(): void;
  abstract onCancel(): void;
  abstract onReceive(eventType: EventType, eventData?: unknown): boolean;
  abstract getDescription(): string;
  abstract getCategory(): string;
}

export class CmdRotateCustomizedPMInstance extends Command {
  private readonly _instance: CustomizedPMInstance;
  private lastTargetingAngle: number;
  private originalAngle: [number, number, number];
  private readonly plane: Plane;
  private _rotation: [number, number, number];
  private _session: TransactionSession | null;

  constructor(instance: CustomizedPMInstance | undefined, plane: Plane) {
    super();

    const selectedInstance = HSApp.Selection.Manager.selected()[0] as CustomizedPMInstance;
    this._instance = instance ?? selectedInstance;
    this.lastTargetingAngle = 0;
    this.originalAngle = [0, 0, 0];
    this.plane = plane;
    this._rotation = [0, 0, 0];
    this._session = null;
  }

  onExecute(event?: DragMoveEvent): void {
    this._session = this.context.transManager.startSession();

    const instance = this._instance;
    if (!instance) {
      this.mgr.cancel(this);
      return;
    }

    this.originalAngle = [instance.XRotation, instance.YRotation, instance.ZRotation];

    if (this.plane === 'xy') {
      this.lastTargetingAngle = instance.ZRotation;
    } else if (this.plane === 'yz') {
      this.lastTargetingAngle = instance.YRotation;
    } else if (this.plane === 'xz') {
      this.lastTargetingAngle = instance.XRotation;
    }

    if (event) {
      this.onReceive('dragmove', event);
    }
  }

  onComplete(): void {
    if (this._session) {
      this._session.commit();
    }
  }

  onCancel(): void {
    if (this._session) {
      this._session.abort();
    }
  }

  onReceive(eventType: EventType, eventData?: unknown): boolean {
    let shouldContinue = true;

    switch (eventType) {
      case 'mouseup':
      case 'dragend': {
        const transManager = this.context.transManager;
        const request = transManager.createRequest(
          HSFPConstants.RequestType.RotateCustomizedPMInstanceModel,
          [this._instance, this.originalAngle, this._rotation]
        );
        transManager.commit(request);
        this.mgr.complete(this);
        break;
      }

      case 'dragmove': {
        const event = eventData as DragMoveEvent;
        const delta = event.delta;

        if (isNaN(delta)) {
          break;
        }

        let targetAngle = (this.lastTargetingAngle + delta) % 360;
        this.lastTargetingAngle = targetAngle;

        const angleConfig: RotationAngles = {
          angle: targetAngle,
          offset: 10,
          mark: 45
        };

        const snappedAngle = HSApp.View.T3d.Util.snapToAngle(angleConfig);
        if (snappedAngle !== undefined) {
          targetAngle = snappedAngle;
        }

        this._instance.XRotation = this.originalAngle[0];
        this._instance.YRotation = this.originalAngle[1];
        this._instance.ZRotation = this.originalAngle[2];

        if (this.plane === 'xy') {
          this.rotateAroundWorldAxis(new Vector3(0, 0, 1), targetAngle - this.originalAngle[2]);
        } else if (this.plane === 'xz') {
          this.rotateAroundWorldAxis(new Vector3(1, 0, 0), targetAngle - this.originalAngle[0]);
        } else if (this.plane === 'yz') {
          this.rotateAroundWorldAxis(new Vector3(0, 1, 0), targetAngle - this.originalAngle[1]);
        }

        this._rotation = [this._instance.XRotation, this._instance.YRotation, this._instance.ZRotation];
        break;
      }

      default:
        shouldContinue = super.onReceive(eventType, eventData);
    }

    return shouldContinue;
  }

  private rotateAroundWorldAxis(axis: Vector3, angle: number): void {
    HSCore.Util.Content.rotateAroundWorldAxis(this._instance, axis, angle);
  }

  getDescription(): string {
    return '旋转自由造型模型';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}