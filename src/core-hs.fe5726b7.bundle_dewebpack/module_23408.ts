interface PAssembly {
  getPaths(): any[][][] | null;
  z: number;
  height: number;
  boundInternal: Bound;
  contentType?: ContentType;
  localId: string;
  states: Record<string, State>;
  XSize: number;
  YSize: number;
  doorThickness: number;
  metadata: { contentType: ContentType };
  outline: Point[];
  rotation: number;
  XLength: number;
  ZLength: number;
  children: Record<string, any>;
  getChild(localId: string): any;
  forEachChild(callback: (child: any) => void): void;
  getStateById(id: string): State | undefined;
  removeChild(id: string): void;
  addState(state: State): void;
  addConstraint(constraint: EquationConstraint): void;
  removeStatesByChildId(localId: string): void;
  removeConstraintsByChildId(localId: string, flag: boolean): void;
  insertChild(child: any): void;
  compute(): void;
  getUniqueParent(): any;
}

interface Point {
  x: number;
  y: number;
  z?: number;
}

interface Bound {
  reset(): void;
  appendPoint(point: Point): void;
}

interface ContentType {
  isTypeOf(types: ContentType | ContentType[]): boolean;
}

interface State {
  __value?: number;
  value: number;
  init(config: StateConfig): void;
}

interface StateConfig {
  _des: string;
  isEditable: boolean;
  localId: string;
  value: number;
}

interface EquationConstraint {
  init(config: EquationConstraintConfig, states: Record<string, State>): void;
}

interface EquationConstraintConfig {
  _des: string;
  localId: string;
  type: string;
  equation: string;
}

interface DoorCoreBoard {
  parameters?: {
    x: string;
    y: string;
    z: string;
    XLength: string;
    YLength: string;
    ZLength: string;
  };
  localId?: string;
  layoutInfo?: {
    start: number;
    direction: string;
  };
  needClip?: boolean;
}

interface PAssemblyBody {
  isFiveCornerCabinet(assembly: PAssembly): boolean;
  isStrightCornerCabinet(assembly: PAssembly): boolean;
  isCornerWardrobe(assembly: PAssembly): boolean;
}

declare const HSCore: {
  Util: {
    Entity: {
      getParentPAssembly(entity: any): PAssembly | null;
    };
    Math: {
      rotatePointCW(origin: Point, point: Point, rotation: number): { add(point: Point): Point };
    };
  };
  Model: {
    PAssembly: any;
    NgPExtruding: any;
    NgPMolding: any;
  };
  State: {
    State: new () => State;
  };
  Constraint: {
    EquationConstraint: new () => EquationConstraint;
  };
};

declare const HSCatalog: {
  ContentTypeEnum: {
    ParamSwingDoor: ContentType;
    CabinetDoor: ContentType;
    CabinetDrawer: ContentType;
    DrawerDoor: ContentType;
    CabinetFlipDoor: ContentType;
    ext_CabinetMolding: ContentType[];
    Countertop: ContentType;
    UnitWardrobe: ContentType;
  };
};

declare const HSConstants: {
  ModelClass: {
    NgPExtruding: string;
    NgPMolding: string;
  };
};

import { PAssemblyBody } from './PAssemblyBody';

export const PAssemblyUtil = {
  getPExtrudingHeight(assembly: PAssembly): number {
    const paths = assembly.getPaths();
    const parentAssembly = HSCore.Util.Entity.getParentPAssembly(assembly);
    let height = assembly.z + assembly.height;

    if (paths && paths[0] && paths[0][0]) {
      height += paths[0][0].z;
    }

    if (parentAssembly) {
      height += parentAssembly.z;
    }

    return height;
  },

  getSwingDoor(assembly: PAssembly): PAssembly[] {
    const swingDoors: PAssembly[] = [];

    assembly.forEachChild((child: any) => {
      if (
        child instanceof HSCore.Model.PAssembly &&
        child.contentType &&
        child.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParamSwingDoor)
      ) {
        swingDoors.push(child);
      }
    });

    return swingDoors;
  },

  getBounding(assembly: PAssembly, expansion?: number): Bound {
    const bound = assembly.boundInternal;
    bound.reset();

    const doorContentTypes = [
      HSCatalog.ContentTypeEnum.CabinetDoor,
      HSCatalog.ContentTypeEnum.CabinetDrawer,
      HSCatalog.ContentTypeEnum.DrawerDoor,
      HSCatalog.ContentTypeEnum.CabinetFlipDoor
    ];

    const origin: Point = { x: 0, y: 0 };
    const doorAssembly = assembly.getChild('doorAssembly');
    let doorThickness = 0;
    let doorGapState = assembly.getStateById('ID_door_gap');
    const doorGap = doorGapState ? doorGapState.__value ?? 0 : 0;
    let indentFront = 0;

    if (
      !PAssemblyBody.isFiveCornerCabinet(assembly) &&
      !PAssemblyBody.isStrightCornerCabinet(assembly) &&
      !PAssemblyBody.isCornerWardrobe(assembly)
    ) {
      if (doorAssembly) {
        if (doorAssembly._content) {
          const content = doorAssembly._content;
          const doorChild = Object.values(content.children).find(
            (child: any) =>
              child._content &&
              child._content.metadata &&
              child._content.metadata.contentType &&
              child._content.metadata.contentType.isTypeOf(doorContentTypes)
          );

          if (doorChild) {
            doorThickness = doorChild.YLength;
          }
          doorThickness += doorGap;
        }
      } else {
        let swingDoors = this.getSwingDoor(assembly);
        swingDoors = swingDoors.filter((door) => Object.values(door.children).length > 0);

        if (swingDoors.length > 0) {
          const indentStateId = swingDoors[0].localId + '_indent_front';
          indentFront = assembly.states[indentStateId] ? assembly.states[indentStateId].__value ?? 0 : 0;
          doorThickness = indentFront + doorGap;
        }
      }
    }

    assembly.doorThickness = doorThickness;

    let minX = -assembly.XSize / 2;
    let maxX = assembly.XSize / 2;
    let minY = -assembly.YSize / 2;
    let maxY = assembly.YSize / 2;

    if (typeof expansion === 'number') {
      minX -= expansion;
      maxX += expansion;
      minY -= expansion;
      maxY += expansion;
    }

    const moldingContentTypes = HSCatalog.ContentTypeEnum.ext_CabinetMolding.concat([
      HSCatalog.ContentTypeEnum.Countertop
    ]);

    if (assembly.metadata.contentType.isTypeOf(moldingContentTypes)) {
      const extrudingChildren: any[] = [];

      assembly.forEachChild((child: any) => {
        if (
          child.instanceOf(HSConstants.ModelClass.NgPExtruding) ||
          child.instanceOf(HSConstants.ModelClass.NgPMolding)
        ) {
          extrudingChildren.push(child);
        }
      });

      extrudingChildren.sort((a, b) =>
        a.instanceOf(HSConstants.ModelClass.NgPExtruding) ? -1 : 1
      );

      if (extrudingChildren.length > 0) {
        const firstChild = extrudingChildren[0];
        firstChild.refreshBoundInternal();

        if (Array.isArray(firstChild.outline) && firstChild.outline.length > 0) {
          minX = firstChild.outline[0].x;
          maxX = firstChild.outline[1].x;
          maxY = firstChild.outline[2].y;
          minY = firstChild.outline[0].y;
        }
      }
    }

    assembly.outline[3] = { x: minX, y: maxY };
    assembly.outline[2] = { x: maxX, y: maxY };
    assembly.outline[1] = { x: maxX, y: minY - doorThickness };
    assembly.outline[0] = { x: minX, y: minY - doorThickness };

    for (let i = 0; i < assembly.outline.length; ++i) {
      assembly.outline[i] = HSCore.Util.Math.rotatePointCW(origin, assembly.outline[i], assembly.rotation).add(
        assembly
      );
      bound.appendPoint(assembly.outline[i]);
    }

    return bound;
  },

  isUnitWardrobeInFrame(entity: any): boolean {
    return (
      entity instanceof HSCore.Model.PAssembly &&
      !!(entity.contentType && entity.contentType.isTypeOf(HSCatalog.ContentTypeEnum.UnitWardrobe)) &&
      entity.getUniqueParent() instanceof HSCore.Model.PAssembly
    );
  },

  removeChildByLocalId(assembly: PAssembly, localId: string): void {
    const child = assembly.getChild(localId);
    if (child) {
      assembly.removeChild(child.ID);
    }
  },

  operateDoorCoreBoard(
    assembly: PAssembly,
    doorCoreBoard: DoorCoreBoard,
    index: number,
    shouldAdd: boolean,
    needClip: boolean,
    startPosition: number | undefined,
    direction: string
  ): void {
    const prefix = `id_doorcore_${index}`;

    doorCoreBoard.parameters = {
      x: `${prefix}_position_x`,
      y: `${prefix}_position_y`,
      z: `${prefix}_position_z`,
      XLength: `${prefix}_length_x`,
      YLength: `${prefix}_length_y`,
      ZLength: `${prefix}_length_z`
    };

    doorCoreBoard.localId = prefix;

    if (needClip) {
      doorCoreBoard.layoutInfo = {
        start: startPosition!,
        direction: direction
      };
      doorCoreBoard.needClip = true;
    } else {
      doorCoreBoard.layoutInfo = undefined;
      doorCoreBoard.needClip = false;
    }

    const stateConfigs: StateConfig[] = [
      {
        _des: `门芯${index} x位置方向`,
        isEditable: false,
        localId: `${prefix}_position_x`,
        value: 0
      },
      {
        _des: `门芯${index} y位置方向`,
        isEditable: false,
        localId: `${prefix}_position_y`,
        value: 0
      },
      {
        _des: `门芯${index} z位置方向`,
        isEditable: false,
        localId: `${prefix}_position_z`,
        value: 0
      },
      {
        _des: `门芯${index} XLength`,
        isEditable: false,
        localId: `${prefix}_length_x`,
        value: 0.10313
      },
      {
        _des: `门芯${index} YLength`,
        isEditable: false,
        localId: `${prefix}_length_y`,
        value: 0.00707
      },
      {
        _des: `门芯${index} ZLength`,
        isEditable: false,
        localId: `${prefix}_length_z`,
        value: 0.55971
      }
    ];

    let equationConfigs: EquationConstraintConfig[] | undefined;

    if (direction === 'x') {
      equationConfigs = [
        {
          _des: `计算门芯${index} ZLength`,
          localId: `${prefix}_length_z_eq`,
          type: 'position',
          equation: `${prefix}_length_z = HEIGHT`
        }
      ];
    } else if (direction === 'z') {
      equationConfigs = [
        {
          _des: `计算门芯${index} XLength`,
          localId: `${prefix}_length_x_eq`,
          type: 'position',
          equation: `${prefix}_length_x = WIDTH`
        }
      ];
    }

    if (shouldAdd) {
      stateConfigs.forEach((config) => {
        const stateConfigCopy = JSON.parse(JSON.stringify(config));
        const state = new HSCore.State.State();
        state.init(stateConfigCopy);
        assembly.addState(state);
      });

      if (equationConfigs) {
        equationConfigs.forEach((config) => {
          const constraintConfigCopy = JSON.parse(JSON.stringify(config));
          const constraint = new HSCore.Constraint.EquationConstraint();
          constraint.init(constraintConfigCopy, assembly.states);
          assembly.addConstraint(constraint);
        });
      }

      assembly.insertChild(doorCoreBoard);
    } else {
      stateConfigs.forEach((config) => {
        assembly.removeStatesByChildId(config.localId);
      });

      if (equationConfigs) {
        equationConfigs.forEach((config) => {
          assembly.removeConstraintsByChildId(config.localId, true);
        });
      }

      this.removeChildByLocalId(assembly, prefix);
    }
  },

  resizeParamGussetDoor(assembly: PAssembly, dimensions: { XLength: number; YLength: number; ZLength: number }, doorCoreBoard: DoorCoreBoard): void {
    const boardWidth = dimensions.XLength;
    const boardHeight = dimensions.ZLength;
    let requiredCount: number;
    let currentChildCount: number;
    let remainder: number;
    let states: State[];
    let widthState: State;

    if (boardWidth < boardHeight) {
      requiredCount = Math.ceil(assembly.XLength / boardWidth);
      remainder = assembly.XLength % boardWidth;
      currentChildCount = Object.values(assembly.children).length;

      if (currentChildCount < requiredCount) {
        if (!currentChildCount) {
          this.operateDoorCoreBoard(assembly, doorCoreBoard, currentChildCount, false, false, undefined, 'x');
        }
        currentChildCount = Object.values(assembly.children).length;

        for (let i = currentChildCount; i < requiredCount; i++) {
          this.operateDoorCoreBoard(assembly, doorCoreBoard, i + 1, true, i === requiredCount - 1, remainder, 'x');
        }
      } else {
        for (let i = currentChildCount; i > requiredCount; i--) {
          this.operateDoorCoreBoard(assembly, doorCoreBoard, i, false, i === requiredCount - 1, remainder, 'x');
        }
      }

      states = Object.values(assembly.states);
      widthState = assembly.states.WIDTH;

      for (let i = 0; i < states.length; i++) {
        const positionXState = assembly.states[`id_doorcore_${i + 1}_position_x`];
        if (positionXState) {
          positionXState.value = -widthState.value / 2 + (i + 1) * dimensions.XLength - dimensions.XLength / 2;
        }
      }
    } else {
      requiredCount = Math.ceil(assembly.ZLength / boardHeight);
      currentChildCount = Object.values(assembly.children).length;
      remainder = assembly.ZLength % boardHeight;

      if (currentChildCount < requiredCount) {
        if (!currentChildCount) {
          this.operateDoorCoreBoard(assembly, doorCoreBoard, currentChildCount, false, false, undefined, 'z');
        }
        currentChildCount = Object.values(assembly.children).length;

        for (let i = currentChildCount; i < requiredCount; i++) {
          this.operateDoorCoreBoard(assembly, doorCoreBoard, i + 1, true, i === requiredCount - 1, remainder, 'z');
        }
      } else {
        for (let i = currentChildCount; i > requiredCount; i--) {
          this.operateDoorCoreBoard(assembly, doorCoreBoard, i, false, i === requiredCount - 1, remainder, 'z');
        }
      }

      states = Object.values(assembly.states);
      const heightState = assembly.states.HEIGHT;

      for (let i = 0; i < states.length; i++) {
        const positionZState = assembly.states[`id_doorcore_${i + 1}_position_z`];
        if (positionZState) {
          positionZState.value = heightState.value - (i + 1) * dimensions.ZLength;
        }
      }
    }

    states = Object.values(assembly.states);

    for (let i = 0; i < states.length; i++) {
      const lengthXState = assembly.states[`id_doorcore_${i + 1}_length_x`];
      const lengthYState = assembly.states[`id_doorcore_${i + 1}_length_y`];
      const lengthZState = assembly.states[`id_doorcore_${i + 1}_length_z`];

      if (lengthXState && lengthYState && lengthZState) {
        lengthXState.value = dimensions.XLength;
        lengthYState.value = dimensions.YLength;
        lengthZState.value = dimensions.ZLength;
      }
    }

    assembly.compute();
  }
};