// @ts-nocheck
interface Position {
  x: number;
  y: number;
  z: number;
}

interface ConstraintConfig {
  equation: string;
  localId: string;
  type: string;
  _des: string;
}

interface DimensionType {
  type: 'top' | 'bottom' | 'toFloor' | 'left' | 'right';
  parent?: any;
  draw(): void;
}

export default class ComponentPositionRequest extends HSCore.Transaction.Request {
  private _component: HSCore.Model.PExtruding | HSCore.Model.PBox | HSCore.Model.PAssembly;
  private _position: Position;
  private _parentPassembly: any;
  private _app: any;
  private dim: DimensionType;
  private gizmoManager: any;
  private isAddedComponent: boolean;
  private _prePosition?: Position;
  private componentIndex: string;
  private componentNameStr: string;
  private isBackBoardUp?: boolean;
  private isBackBoardBottom?: boolean;

  constructor(
    component: HSCore.Model.PExtruding | HSCore.Model.PBox | HSCore.Model.PAssembly,
    position: Position,
    dimension: DimensionType
  ) {
    super();
    this._component = component;
    this._position = position;
    this._parentPassembly = Object.values(this._component.parents)[0];
    this._app = HSApp.App.getApp();
    this.dim = dimension;
    this.gizmoManager = HSApp.App.getApp().activeView.gizmoManager;
    this.isAddedComponent =
      this._component.localId.indexOf('id_vertical') > -1 ||
      this._component.localId.indexOf('id_horizontal') > -1 ||
      this._component.localId.indexOf('id_passembly_lightstrip_board') > -1;
  }

  onCommit(): void {
    let indexStr = '';
    let componentName = '';

    this._component.localId.split('').forEach((char: string) => {
      if (Number.isInteger(parseInt(char))) {
        indexStr += char;
      }
    });

    const parsedIndex = Number.isInteger(parseInt(indexStr)) ? indexStr : '';
    componentName = parsedIndex === '' 
      ? this._component.localId 
      : this._component.localId.split(parsedIndex)[0];

    this.componentIndex = parsedIndex;
    this.componentNameStr = componentName;

    if (this._component instanceof HSCore.Model.PExtruding) {
      const zState = this._getZState();

      if (zState) {
        this._parentPassembly.removeConstraintsByStateId(zState.localId, true);
        this._parentPassembly.removeConstraintsByStateId(`${zState.localId}_eq`, true);
      }

      if (zState) {
        this._prePosition = {
          x: this._component.x,
          y: this._component.y,
          z: this._component.z
        };
        zState.value = this._position.z;
      } else {
        this.isBackBoardUp = this._parentPassembly.constraints[
          `${componentName}${parsedIndex}_pt1_z_eq`
        ].equation.indexOf('ID_backboard_up_stdh_input') !== -1;

        this.isBackBoardBottom = this._parentPassembly.constraints[
          `${componentName}${parsedIndex}_pt1_z_eq`
        ].equation.indexOf('ID_backboard_bottom_stdh_input') !== -1;

        const zOffset = this._position.z - this._component.paths[0].children[0].z;

        if (this.isBackBoardUp) {
          if (this._parentPassembly.constraints.ID_backboard_up_stdh_input_eq) {
            this._parentPassembly.removeConstraintsByStateId('ID_backboard_up_stdh_input_eq', true);
          }

          const constraint = new HSCore.Constraint.EquationConstraint();
          constraint.init(
            {
              equation: '',
              localId: 'ID_backboard_up_stdh_input_eq',
              type: 'position',
              _des: '覆盖ID_backboard_up_stdh_input_eq'
            },
            this._parentPassembly.states
          );
          this._parentPassembly.addConstraint(constraint);

          this._prePosition = {
            x: this._component.x,
            y: this._component.y,
            z: this._parentPassembly.getStateById('ID_backboard_up_stdh_input').value
          };

          this._parentPassembly.getStateById('ID_backboard_up_stdh_input').value -= zOffset;
        } else if (this.isBackBoardBottom) {
          if (this._parentPassembly.constraints.ID_backboard_bottom_stdh_input_eq) {
            this._parentPassembly.removeConstraintsByStateId('ID_backboard_up_stdh_input_eq', true);
          }

          const constraint = new HSCore.Constraint.EquationConstraint();
          constraint.init(
            {
              equation: '',
              localId: 'ID_backboard_bottom_stdh_input_eq',
              type: 'position',
              _des: '覆盖ID_backboard_bottom_stdh_input_eq'
            },
            this._parentPassembly.states
          );

          this._prePosition = {
            x: this._component.x,
            y: this._component.y,
            z: this._parentPassembly.getStateById('ID_backboard_bottom_stdh_input').value
          };

          this._parentPassembly.getStateById('ID_backboard_bottom_stdh_input').value += zOffset;
        }
      }
    } else if (this._component instanceof HSCore.Model.PBox) {
      if (this.dim.type === 'top' || this.dim.type === 'bottom' || this.dim.type === 'toFloor') {
        this._prePosition = {
          x: this._component.x,
          y: this._component.y,
          z: this._component.z
        };

        if (this.isAddedComponent) {
          if (this._parentPassembly.constraints[`id_horizontal${parsedIndex}_z_eq`]) {
            this._parentPassembly.removeConstraintsByStateId(`id_horizontal${parsedIndex}_z`, true);
          }

          const stateId = `id_horizontal${parsedIndex}_distance_z`;
          const stateValue = this._position.z;
          this.addState(
            stateId,
            stateValue,
            '修改层板距离后新建的state, 该state为距离边框的距离，和其他层板无约束关系',
            this._parentPassembly
          );

          const constraint = new HSCore.Constraint.EquationConstraint();
          const config: ConstraintConfig = {
            equation: `id_horizontal${parsedIndex}_z=id_horizontal${parsedIndex}_distance_z`,
            localId: `id_horizontal${parsedIndex}_z_eq`,
            type: 'position',
            _des: '层板高度定义'
          };
          constraint.init(config, this._parentPassembly.states);
          this._parentPassembly.addConstraint(constraint);
        } else {
          if (this._parentPassembly.constraints[`${componentName}${parsedIndex}_z_eq`]) {
            this._parentPassembly.removeConstraintsByStateId(`${componentName}${parsedIndex}_z`, true);
          }

          const stateId = `${componentName}${parsedIndex}_distance_z`;
          const stateValue = this._position.z;
          this.addState(
            stateId,
            stateValue,
            '修改层板距离后新建的state, 该state为距离边框的距离，和其他层板无约束关系',
            this._parentPassembly
          );

          const constraint = new HSCore.Constraint.EquationConstraint();
          const config: ConstraintConfig = {
            equation: `${componentName}${parsedIndex}_z=${componentName}${parsedIndex}_distance_z`,
            localId: `${componentName}${parsedIndex}_z_eq`,
            type: 'position',
            _des: '层板高度定义'
          };
          constraint.init(config, this._parentPassembly.states);
          this._parentPassembly.addConstraint(constraint);
        }
      } else if (this.dim.type === 'left' || this.dim.type === 'right') {
        this._prePosition = {
          x: this._component.x,
          y: this._component.y,
          z: this._component.z
        };

        if (this.isAddedComponent) {
          if (this._parentPassembly.constraints[`id_vertical${parsedIndex}_x_eq`]) {
            this._parentPassembly.removeConstraintsByStateId(`id_vertical${parsedIndex}_x`, true);
          }

          const stateId = `id_vertical${parsedIndex}_distance_x`;
          const stateValue = this._position.x;
          this.addState(
            stateId,
            stateValue,
            '修改层板距离后新建的state, 该state为距离边框的距离，和其他层板无约束关系',
            this._parentPassembly
          );

          const constraint = new HSCore.Constraint.EquationConstraint();
          const config: ConstraintConfig = {
            equation: `id_vertical${parsedIndex}_x=id_vertical${parsedIndex}_distance_x`,
            localId: `id_vertical${parsedIndex}_x_eq`,
            type: 'position',
            _des: '层板高度定义'
          };
          constraint.init(config, this._parentPassembly.states);
          this._parentPassembly.addConstraint(constraint);
        } else {
          if (this._parentPassembly.constraints[`${componentName}${parsedIndex}_x_eq`]) {
            this._parentPassembly.removeConstraintsByStateId(`${componentName}${parsedIndex}_x`, true);
          }

          const stateId = `${componentName}${parsedIndex}_distance_x`;
          const stateValue = this._position.x;
          this.addState(
            stateId,
            stateValue,
            '修改层板距离后新建的state, 该state为距离边框的距离，和其他层板无约束关系',
            this._parentPassembly
          );

          const constraint = new HSCore.Constraint.EquationConstraint();
          const config: ConstraintConfig = {
            equation: `${componentName}${parsedIndex}_x=${componentName}${parsedIndex}_distance_x`,
            localId: `${componentName}${parsedIndex}_x_eq`,
            type: 'position',
            _des: '层板高度定义'
          };
          constraint.init(config, this._parentPassembly.states);
          this._parentPassembly.addConstraint(constraint);
        }
      }
    } else if (
      this._component instanceof HSCore.Model.PAssembly &&
      (this.dim.type === 'top' || this.dim.type === 'bottom' || this.dim.type === 'toFloor')
    ) {
      this._prePosition = {
        x: this._component.x,
        y: this._component.y,
        z: this._component.z
      };

      if (this.isAddedComponent) {
        if (this._parentPassembly.constraints[`id_passembly_lightstrip_board${parsedIndex}_z_eq`]) {
          this._parentPassembly.removeConstraintsByStateId(
            `id_passembly_lightstrip_board${parsedIndex}_z`,
            true
          );
        }

        const stateId = `id_passembly_lightstrip_board${parsedIndex}_distance_z`;
        const stateValue = this._position.z;
        this.addState(
          stateId,
          stateValue,
          '修改层板距离后新建的state, 该state为距离边框的距离，和其他层板无约束关系',
          this._parentPassembly
        );

        const constraint = new HSCore.Constraint.EquationConstraint();
        const config: ConstraintConfig = {
          equation: `id_passembly_lightstrip_board${parsedIndex}_z=id_passembly_lightstrip_board${parsedIndex}_distance_z`,
          localId: `id_passembly_lightstrip_board${parsedIndex}_z_eq`,
          type: 'position',
          _des: '层板高度定义'
        };
        constraint.init(config, this._parentPassembly.states);
        this._parentPassembly.addConstraint(constraint);
      } else {
        if (this._parentPassembly.constraints[`${componentName}${parsedIndex}_z_eq`]) {
          this._parentPassembly.removeConstraintsByStateId(`${componentName}${parsedIndex}_z`, true);
        }

        const stateId = `${componentName}${parsedIndex}_distance_z`;
        const stateValue = this._position.z;
        this.addState(
          stateId,
          stateValue,
          '修改层板距离后新建的state, 该state为距离边框的距离，和其他层板无约束关系',
          this._parentPassembly
        );

        const constraint = new HSCore.Constraint.EquationConstraint();
        const config: ConstraintConfig = {
          equation: `${componentName}${parsedIndex}_z=${componentName}${parsedIndex}_distance_z`,
          localId: `${componentName}${parsedIndex}_z_eq`,
          type: 'position',
          _des: '层板高度定义'
        };
        constraint.init(config, this._parentPassembly.states);
        this._parentPassembly.addConstraint(constraint);
      }
    }

    this._parentPassembly.compute();
    this.gizmoManager._onSelectionChanged();
  }

  onUndo(): void {
    if (this._component instanceof HSCore.Model.PExtruding) {
      const zState = this._getZState();
      if (zState) {
        zState.value = this._prePosition!.z;
      } else if (this.isBackBoardUp) {
        this._parentPassembly.getStateById('ID_backboard_up_stdh_input').value = this._prePosition!.z;
      } else if (this.isBackBoardBottom) {
        this._parentPassembly.getStateById('ID_backboard_bottom_stdh_input').value = this._prePosition!.z;
      }
    } else if (this._component instanceof HSCore.Model.PBox) {
      if (this.dim.type === 'top' || this.dim.type === 'bottom' || this.dim.type === 'toFloor') {
        if (this.isAddedComponent) {
          this._parentPassembly.getStateById(`id_horizontal${this.componentIndex}_distance_z`).value =
            this._prePosition!.z;
        } else {
          this._parentPassembly.getStateById(
            `${this.componentNameStr}${this.componentIndex}_distance_z`
          ).value = this._prePosition!.z;
        }
      } else if (this.dim.type === 'left' || this.dim.type === 'right') {
        if (this.isAddedComponent) {
          this._parentPassembly.getStateById(`id_vertical${this.componentIndex}_distance_x`).value =
            this._prePosition!.x;
        } else {
          this._parentPassembly.getStateById(
            `${this.componentNameStr}${this.componentIndex}_distance_x`
          ).value = this._prePosition!.x;
        }
      }
    } else if (this._component instanceof HSCore.Model.PAssembly) {
      this._changePAssemblyState(this._prePosition!.z);
    }

    this._parentPassembly.compute();
    if (this.dim.parent) {
      this.dim.parent.draw();
    } else {
      this.dim.draw();
    }
    this.gizmoManager._onSelectionChanged();
  }

  onRedo(): void {
    if (this._component instanceof HSCore.Model.PExtruding) {
      const zOffset = this._position.z - this._component.paths[0].children[0].z;
      const zState = this._getZState();

      if (zState) {
        zState.value = this._position.z;
      } else if (this.isBackBoardUp) {
        this._parentPassembly.getStateById('ID_backboard_up_stdh_input').value -= zOffset;
      } else if (this.isBackBoardBottom) {
        this._parentPassembly.getStateById('ID_backboard_bottom_stdh_input').value += zOffset;
      }
    } else if (this._component instanceof HSCore.Model.PBox) {
      if (this.dim.type === 'top' || this.dim.type === 'bottom' || this.dim.type === 'toFloor') {
        if (this.isAddedComponent) {
          this._parentPassembly.getStateById(`id_horizontal${this.componentIndex}_distance_z`).value =
            this._position.z;
        } else {
          this._parentPassembly.getStateById(
            `${this.componentNameStr}${this.componentIndex}_distance_z`
          ).value = this._position.z;
        }
      } else if (this.dim.type === 'left' || this.dim.type === 'right') {
        if (this.isAddedComponent) {
          this._parentPassembly.getStateById(`id_vertical${this.componentIndex}_distance_x`).value =
            this._position.x;
        } else {
          this._parentPassembly.getStateById(
            `${this.componentNameStr}${this.componentIndex}_distance_x`
          ).value = this._position.x;
        }
      }
    } else if (this._component instanceof HSCore.Model.PAssembly) {
      this._changePAssemblyState(this._position.z);
    }

    this._parentPassembly.compute();
    if (this.dim.parent) {
      this.dim.parent.draw();
    } else {
      this.dim.draw();
    }
    this.gizmoManager._onSelectionChanged();
  }

  private _getZState(): any {
    return (
      this._parentPassembly.getStateById(`id_shelfBoard${this.componentIndex}_z`) ||
      (this.isAddedComponent && this._parentPassembly.getStateById(`${this._component.localId}_z`))
    );
  }

  private _changePAssemblyState(zValue: number): void {
    if (this.dim.type === 'top' || this.dim.type === 'bottom' || this.dim.type === 'toFloor') {
      let stateId = `${this.componentNameStr}${this.componentIndex}_distance_z`;
      if (this.isAddedComponent) {
        stateId = `id_passembly_lightstrip_board${this.componentIndex}_distance_z`;
      }

      const state = this._parentPassembly.getStateById(stateId);
      if (state) {
        state.value = zValue;
      }
    }
  }

  private addState(stateId: string, value: number, description: string, parentAssembly: any): void {
    const state = (window as any).getState(stateId, value, description, parentAssembly);
    state.__value = value;
  }
}