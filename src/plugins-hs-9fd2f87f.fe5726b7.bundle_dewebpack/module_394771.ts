interface CirclePointConfig {
  circlePoint: number;
  diameter: number;
  gap?: number;
  width: number;
  height: number;
  startX: number;
  startY: number;
  startZ: number;
  startXEQ?: string;
  evenOddGapEQ?: string;
}

interface Point2D {
  x: number;
  y: number;
}

interface EquationConfig {
  _des: string;
  localId: string;
  type: string;
  equation: string;
}

interface ExtrudingParameters {
  height: number | string;
  paths: Array<Array<unknown>>;
  x: number | string;
  y: number | string;
  z: number | string;
}

interface PointStateValue {
  x: string;
  y: string;
  z: string;
}

interface PointStateInit {
  localId: string;
  type: string;
  value: PointStateValue;
}

/**
 * Creates reference circle points for rod positioning
 */
function createRodCircleReferencePoints(
  stateManager: HSCore.State.StateManager,
  config: CirclePointConfig
): void {
  const { circlePoint, diameter, startY, startZ } = config;
  const initialPoint: Point2D = { x: diameter / 2, y: 0 };
  const baseId = 'ID_rod_circle_ref';

  for (let index = 0; index < circlePoint; index++) {
    const rotatedPoint = HSCore.Util.Math.rotatePointCW(
      { x: 0, y: 0 },
      initialPoint,
      360 * -index / circlePoint
    );

    const xState = new HSCore.State.State();
    xState.localId = `${baseId}_pt${index}_x`;
    xState.__value = rotatedPoint.x;
    xState.name = 'x';
    xState.isEditable = undefined;
    stateManager.addState(xState);

    const yState = new HSCore.State.State();
    yState.localId = `${baseId}_pt${index}_y`;
    yState.__value = startY;
    yState.name = 'y';
    yState.isEditable = undefined;
    stateManager.addState(yState);

    const zState = new HSCore.State.State();
    zState.localId = `${baseId}_pt${index}_z`;
    zState.__value = rotatedPoint.y;
    zState.name = 'z';
    zState.isEditable = undefined;
    stateManager.addState(zState);

    const pointState = new HSCore.State.PointState();
    pointState.init(
      {
        localId: `${baseId}_pt${index}`,
        type: 'point',
        value: {
          x: `${baseId}_pt${index}_x`,
          y: `${baseId}_pt${index}_y`,
          z: `${baseId}_pt${index}_z`,
        },
      },
      stateManager.states
    );
    stateManager.addState(pointState);
  }

  const refZState = new HSCore.State.State();
  refZState.localId = `${baseId}_z`;
  refZState.__value = startZ;
  refZState.name = 'refZ';
  refZState.isEditable = undefined;
  stateManager.addState(refZState);
}

/**
 * Creates states and constraints for rod circle points
 */
function createRodCirclePointStates(
  rodId: string,
  stateManager: HSCore.State.StateManager,
  config: CirclePointConfig
): void {
  const { circlePoint, startX, startY, startZ } = config;

  for (let index = 0; index < circlePoint; index++) {
    const referenceState = stateManager.states[`ID_rod_circle_ref_pt${index}`];

    const xState = new HSCore.State.State();
    xState.localId = `${rodId}_pt${index}_x`;
    xState.__value = referenceState.x + startX;
    xState.name = 'x';
    xState.isEditable = undefined;
    stateManager.addState(xState);

    const yState = new HSCore.State.State();
    yState.localId = `${rodId}_pt${index}_y`;
    yState.__value = startY;
    yState.name = 'y';
    yState.isEditable = undefined;
    stateManager.addState(yState);

    const zState = new HSCore.State.State();
    zState.localId = `${rodId}_pt${index}_z`;
    zState.__value = startZ + referenceState.y;
    zState.name = 'z';
    zState.isEditable = undefined;
    stateManager.addState(zState);

    const pointState = new HSCore.State.PointState();
    pointState.init(
      {
        localId: `${rodId}_pt${index}`,
        type: 'point',
        value: {
          x: `${rodId}_pt${index}_x`,
          y: `${rodId}_pt${index}_y`,
          z: `${rodId}_pt${index}_z`,
        },
      },
      stateManager.states
    );
    stateManager.addState(pointState);

    let constraint = new HSCore.Constraint.EquationConstraint();
    let equationConfig: EquationConfig = {
      _des: '计算y',
      localId: `${rodId}_pt${index}_y_eq`,
      type: 'position',
      equation: `${rodId}_pt${index}_y = DEPTH / 2`,
    };
    constraint.init(equationConfig, stateManager.states);
    stateManager.addConstraint(constraint);

    constraint = new HSCore.Constraint.EquationConstraint();
    equationConfig = {
      _des: '计算x',
      localId: `${rodId}_pt${index}_x_eq`,
      type: 'position',
      equation: `${rodId}_pt${index}_x = ID_rod_circle_ref_pt${index}_x + ${config.startXEQ ?? 0}`,
    };
    constraint.init(equationConfig, stateManager.states);
    stateManager.addConstraint(constraint);

    constraint = new HSCore.Constraint.EquationConstraint();
    equationConfig = {
      _des: '计算z',
      localId: `${rodId}_pt${index}_z_eq`,
      type: 'position',
      equation: `${rodId}_pt${index}_z = ID_rod_circle_ref_pt${index}_z + ID_rod_circle_ref_z`,
    };
    constraint.init(equationConfig, stateManager.states);
    stateManager.addConstraint(constraint);
  }

  const refZConstraint = new HSCore.Constraint.EquationConstraint();
  const refZConfig: EquationConfig = {
    _des: '计算refz',
    localId: 'ID_rod_circle_ref_z_eq',
    type: 'position',
    equation: 'ID_rod_circle_ref_z = HEIGHT / 2',
  };
  refZConstraint.init(refZConfig, stateManager.states);
  stateManager.addConstraint(refZConstraint);

  const depthState = new HSCore.State.State();
  depthState.localId = `${rodId}_d`;
  depthState.__value = 0;
  depthState.name = 'rodD';
  depthState.isEditable = undefined;
  stateManager.addState(depthState);

  const depthConstraint = new HSCore.Constraint.EquationConstraint();
  const depthConfig: EquationConfig = {
    _des: '计算拉伸长度',
    localId: `${rodId}_d_eq`,
    type: 'position',
    equation: `${rodId}_d = DEPTH`,
  };
  depthConstraint.init(depthConfig, stateManager.states);
  stateManager.addConstraint(depthConstraint);
}

/**
 * Creates extruded rod geometry
 */
function createExtrudedRod(
  rodId: string,
  stateManager: HSCore.State.StateManager,
  config: CirclePointConfig,
  material: unknown
): void {
  const { circlePoint } = config;

  const initialParameters = {
    localId: rodId,
    material,
    parameters: {
      height: config.height,
      paths: [[] as unknown[]],
      x: 0,
      y: 0,
      z: 0,
    },
  };

  for (let index = 0; index < circlePoint; index++) {
    initialParameters.parameters.paths[0].push(
      stateManager.states[`${rodId}_pt${index}`]
    );
  }

  const extrudedModel = HSCore.Model.PExtruding.create(initialParameters);

  const bindParameters: ExtrudingParameters = {
    height: `${rodId}_d`,
    paths: [[]],
    x: `${rodId}_x`,
    y: `${rodId}_y`,
    z: `${rodId}_z`,
  };

  for (let index = 0; index < circlePoint; index++) {
    bindParameters.paths[0].push(`${rodId}_pt${index}`);
  }

  HSCore.Util.Object.bindFieldsByState(
    extrudedModel,
    bindParameters,
    stateManager.states
  );
  stateManager.addChild(extrudedModel);
}

/**
 * Finds a style by ID from styles array
 */
function findStyleById(styles: unknown[], styleId: string): unknown | null {
  if (!styles) return null;

  for (const style of styles) {
    if ((style as { id: string }).id === styleId) {
      return style;
    }
  }

  return null;
}

/**
 * Finds the rod parameter assembly
 */
function findRodParameterAssembly(
  assembly: HSCore.Model.PAssembly
): HSCore.Model.PAssembly | undefined {
  const isRodAssembly = (entity: unknown): entity is HSCore.Model.PAssembly => {
    return (
      entity instanceof HSCore.Model.PAssembly &&
      (entity.metadata.localId === 'id_param_rod' ||
        entity.metadata.contentType._types[0] === 'param drawer rod')
    );
  };

  if (isRodAssembly(assembly)) {
    return assembly;
  }

  return Object.values(assembly.children).find(isRodAssembly);
}

/**
 * Cleans up rod-related states and constraints
 */
function cleanupRodAssembly(rodAssembly: HSCore.Model.PAssembly): void {
  if (!rodAssembly) return;

  const children: unknown[] = [];
  rodAssembly.forEachChild((child: unknown) => {
    children.push(child);
  });

  children.forEach((child: HSCore.Model.Entity) => {
    rodAssembly.removeChild(child.ID);
    child.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
  });

  const rodPrefixes = ['id_rod'];
  const statesToRemove: HSCore.State.State[] = [];

  Object.values(rodAssembly.states).forEach((state) => {
    rodPrefixes.forEach((prefix) => {
      if (state.localId.toLowerCase().indexOf(prefix) === 0) {
        statesToRemove.push(state);
      }
    });
  });

  statesToRemove.forEach((state) => rodAssembly.removeState(state));

  const constraintsToRemove: HSCore.Constraint.Constraint[] = [];

  Object.values(rodAssembly.constraints).forEach((constraint) => {
    rodPrefixes.forEach((prefix) => {
      if (constraint.localId.toLowerCase().indexOf(prefix) === 0) {
        constraintsToRemove.push(constraint);
      }
    });
  });

  constraintsToRemove.forEach((constraint) =>
    rodAssembly.removeConstraint(constraint)
  );

  rodAssembly.dirtyGeometry();
}

/**
 * Processes rod assembly and generates rod geometry
 */
function processRodAssembly(
  parentAssembly: HSCore.Model.PAssembly,
  forceRebuild?: boolean
): void {
  const rodAssembly = Object.values(parentAssembly.children).find(
    (child): child is HSCore.Model.PAssembly => {
      return (
        child instanceof HSCore.Model.PAssembly &&
        (child.metadata.localId === 'id_param_rod' ||
          child.metadata.contentType._types[0] === 'param drawer rod')
      );
    }
  );

  if (!rodAssembly) return;

  const diameterState = rodAssembly.states.ID_builtin_rod_diameter;
  const gapState = rodAssembly.states.ID_builtin_rod_gap;
  const countState = rodAssembly.states.ID_builtin_rod_count;

  if (!gapState || !diameterState || !countState) return;

  const currentGapState = rodAssembly.states.ID_current_rod_gap;
  currentGapState.value = rodAssembly.states.ID_builtin_rod_gap.value;

  const widthState = parentAssembly.states.ID_DBSPACE_W;
  const depthState = parentAssembly.states.ID_DBSPACE_D;
  const heightState = parentAssembly.states.ID_DBSPACE_H;
  const yState = parentAssembly.states.ID_DBSPACE_Y;
  const zState = parentAssembly.states.ID_DBSPACE_Z;

  if (!widthState || !depthState || !heightState || !yState || !zState) return;

  const materialStyle = findStyleById(
    parentAssembly.metadata.styles,
    'cabinet_body_material'
  );
  const material = materialStyle ? (materialStyle as { meta: unknown }).meta : null;

  const boardThicknessState = parentAssembly.states.ID_board_thickness;
  const boardThickness = boardThicknessState ? boardThicknessState.value : 0.02;

  const rodCount = Math.floor(widthState.value / currentGapState.value);
  const finalRodCount = rodCount < 1 ? 1 : rodCount;

  const currentRodCountState = rodAssembly.states.ID_current_rod_count;
  currentRodCountState.value = finalRodCount;

  const config: CirclePointConfig = {
    circlePoint: 12,
    diameter: diameterState.value,
    width: widthState.value,
    height: depthState.value,
    startX: 0,
    startY: yState.value + depthState.value / 2,
    startZ: heightState.value / 2,
  };

  createRodCircleReferencePoints(rodAssembly, config);

  let baseOffset = 0;
  let startIndex = 0;

  if (currentRodCountState.value % 2 === 1) {
    const centerRodId = 'id_rod_0';
    config.startX = 0;
    createRodCirclePointStates(centerRodId, rodAssembly, config);
    createExtrudedRod(centerRodId, rodAssembly, config, material);
    baseOffset = currentGapState.value;
    config.evenOddGapEQ = '0';
    startIndex = 1;
  } else {
    baseOffset = currentGapState.value / 2;
    config.evenOddGapEQ = 'ID_current_rod_gap / 2';
  }

  for (let index = startIndex; index < currentRodCountState.value; index++) {
    const rodId = `id_rod_${index}`;
    const multiplier = index % 2 === 0 ? 1 : -1;

    if (startIndex === 1) {
      config.startX =
        multiplier *
        (baseOffset + Math.floor((index + 1) / 2) * currentGapState.value);
      config.startXEQ = `${multiplier} * (${config.evenOddGapEQ} + ${Math.floor((index + 1) / 2)} * ID_current_rod_gap)`;
    } else {
      config.startX =
        multiplier *
        (baseOffset + Math.floor(index / 2) * currentGapState.value);
      config.startXEQ = `${multiplier} * (${config.evenOddGapEQ} + ${Math.floor(index / 2)} * ID_current_rod_gap)`;
    }

    createRodCirclePointStates(rodId, rodAssembly, config);
    createExtrudedRod(rodId, rodAssembly, config, material);
  }

  HSCore.Util.Object.bindFieldsByState(
    rodAssembly,
    {
      XLength: 'ID_DBSPACE_W',
      YLength: 'ID_DBSPACE_D',
      ZLength: 'ID_DBSPACE_H',
      x: 'ID_DBSPACE_X',
      y: 'ID_DBSPACE_Y',
      z: 'ID_DBSPACE_Z',
    },
    parentAssembly.states
  );

  rodAssembly.compute();
  parentAssembly.addChild(rodAssembly);
}

/**
 * Adjusts rod configuration based on assembly dimensions
 */
export function adjustRod(
  assembly: HSCore.Model.PAssembly,
  shouldRebuild?: boolean
): boolean {
  if (!(assembly instanceof HSCore.Model.PAssembly)) {
    return false;
  }

  const rodAssembly = findRodParameterAssembly(assembly);
  if (!rodAssembly) {
    return false;
  }

  const currentCountState = rodAssembly.states.ID_current_rod_count;
  const currentGapState = rodAssembly.states.ID_current_rod_gap;
  const widthState = assembly.states.ID_DBSPACE_W;

  const newRodCount = Math.floor(widthState.value / currentGapState.value) + 1;

  if (currentCountState.value === newRodCount) {
    return;
  }

  if (shouldRebuild) {
    cleanupRodAssembly(rodAssembly);
  }

  processRodAssembly(assembly, true);
  return true;
}

/**
 * Post-processor for rod assembly
 */
export function rodPostProcessor(
  entity: unknown,
  assembly: HSCore.Model.PAssembly
): void {
  processRodAssembly(assembly, true);
}