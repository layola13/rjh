// @ts-nocheck
import HSCore from './HSCore';
import HSApp from './HSApp';

interface Component {
  ID: string;
  localId: string;
  z: number;
  parents: Record<string, Assembly>;
  __z: { value: number };
}

interface Position {
  z: number;
}

interface State {
  localId: string;
  value: number;
}

interface Assembly {
  states: Record<string, State>;
  compute(): void;
  removeConstraintsByOutputStateId(stateId: string): void;
}

interface GizmoManager {
  _onSelectionChanged(): void;
}

interface View {
  gizmoManager: GizmoManager;
}

interface App {
  activeView: View;
}

export default class MoveComponentZRequest extends HSCore.Transaction.Request {
  private _component: Component;
  private _position: Position;
  private parentPassembly: Assembly;
  private _app: App;
  private dim: unknown;
  private componentIndex: string;
  private gizmoManager: GizmoManager;
  private prePrePosition: number;

  constructor(component: Component, position: Position, dim: unknown) {
    super();
    
    this._component = component;
    this._position = position;
    this.parentPassembly = Object.values(this._component.parents)[0];
    this._app = HSApp.App.getApp();
    this.dim = dim;
    this.componentIndex = this._component.ID;
    this.gizmoManager = HSApp.App.getApp().activeView.gizmoManager;
  }

  onCommit(): void {
    this.prePrePosition = this._component.z;
    this._move(this._position.z);
    this.parentPassembly.compute();
    this.gizmoManager._onSelectionChanged();
  }

  onUndo(): void {
    this._move(this.prePrePosition);
    this.parentPassembly.compute();
    this.gizmoManager._onSelectionChanged();
  }

  onRedo(): void {
    this._move(this._position.z);
    this.parentPassembly.compute();
    this.gizmoManager._onSelectionChanged();
  }

  private _move(zValue: number): void {
    let statePrefix: string | null = null;
    
    if (this._component.localId.indexOf("id_param_drawer") > -1) {
      statePrefix = "id_param_drawer";
    }

    const stateKey = statePrefix 
      ? `${statePrefix}${this.componentIndex}_z`
      : `${this._component.localId}_z`;
    
    const state = this.parentPassembly.states[stateKey] ?? 
                  this.parentPassembly.states[`${this._component.localId}_z`];

    if (state) {
      state.value = zValue;
      this.parentPassembly.removeConstraintsByOutputStateId(state.localId);
    } else {
      this._component.__z.value = zValue;
    }
  }
}