interface Point {
  x: number;
  y: number;
}

interface PathCommand {
  cmd: string;
  arg: string;
}

interface ProfileData {
  profile: string;
  swing: number;
}

const CURVE_SEGMENTS = 10;
const CURVE_STEP = 0.1;

const COMMAND_REGEX = /^\s*([CLMQ])\s*([\-0-9, . E|e]+)/;
const COORDINATE_REGEX = /^\s*([\-0-9.E|e]+)\s*,\s*([\-0-9.E|e]+)/;

function parseCoordinates(input: string, shouldRound: boolean): Point[] {
  const points: Point[] = [];
  let remaining = input;

  while (remaining.length > 0) {
    const match = COORDINATE_REGEX.exec(remaining);
    if (!match) break;

    const x = shouldRound
      ? Number(parseFloat(match[1]).toFixed(4))
      : parseFloat(match[1]);
    const y = shouldRound
      ? Number(parseFloat(match[2]).toFixed(4))
      : parseFloat(match[2]);

    points.push({ x, y });
    remaining = remaining.replace(match[0], "");
  }

  return points;
}

function calculateCubicBezier(
  start: Point,
  control1: Point,
  control2: Point,
  end: Point
): Point[] {
  const points: Point[] = [];

  for (let i = 1; i < CURVE_SEGMENTS; i++) {
    const t = CURVE_STEP * i;
    const oneMinusT = 1 - t;
    const oneMinusTSquared = oneMinusT * oneMinusT;
    const oneMinusTCubed = oneMinusTSquared * oneMinusT;
    const tSquared = t * t;
    const tCubed = tSquared * t;

    const x =
      oneMinusTCubed * start.x +
      3 * t * oneMinusTSquared * control1.x +
      3 * tSquared * oneMinusT * control2.x +
      tCubed * end.x;

    const y =
      oneMinusTCubed * start.y +
      3 * t * oneMinusTSquared * control1.y +
      3 * tSquared * oneMinusT * control2.y +
      tCubed * end.y;

    points.push({ x, y });
  }

  points.push(end);
  return points;
}

function calculateQuadraticBezier(
  start: Point,
  control: Point,
  end: Point
): Point[] {
  const points: Point[] = [];

  for (let i = 1; i < CURVE_SEGMENTS; i++) {
    const t = CURVE_STEP * i;
    const oneMinusT = 1 - t;
    const oneMinusTSquared = oneMinusT * oneMinusT;
    const tSquared = t * t;

    const x =
      oneMinusTSquared * start.x +
      2 * t * oneMinusT * control.x +
      tSquared * end.x;

    const y =
      oneMinusTSquared * start.y +
      2 * t * oneMinusT * control.y +
      tSquared * end.y;

    points.push({ x, y });
  }

  points.push(end);
  return points;
}

const pathCommands = {
  currentPos: null as Point | null,

  M(argument: string, shouldRound: boolean): Point[] {
    const points = parseCoordinates(argument, shouldRound);
    pathCommands.currentPos = points[0];
    return [points[0]];
  },

  L(argument: string, shouldRound: boolean): Point[] {
    const points = parseCoordinates(argument, shouldRound);
    pathCommands.currentPos = points[0];
    return [points[0]];
  },

  C(argument: string, shouldRound: boolean): Point[] {
    const points = parseCoordinates(argument, shouldRound);
    if (points.length !== 3) return [];

    const start = pathCommands.currentPos!;
    const control1 = points[0];
    const control2 = points[1];
    const end = points[2];

    const curvePoints = calculateCubicBezier(start, control1, control2, end);
    pathCommands.currentPos = end;
    return curvePoints;
  },

  Q(argument: string, shouldRound: boolean): Point[] {
    const points = parseCoordinates(argument, shouldRound);
    if (points.length !== 2) return [];

    const start = pathCommands.currentPos!;
    const control = points[0];
    const end = points[1];

    const curvePoints = calculateQuadraticBezier(start, control, end);
    pathCommands.currentPos = end;
    return curvePoints;
  },
};

export function parse(pathString: string, shouldRound: boolean = true): Point[] {
  if (!pathString) return [];

  const commands: PathCommand[] = [];
  let remaining = pathString;

  while (remaining.length > 0) {
    const match = COMMAND_REGEX.exec(remaining);
    if (!match) break;

    commands.push({
      cmd: match[1],
      arg: match[2],
    });
    remaining = remaining.replace(match[0], "");
  }

  let result: Point[] = [];

  for (let i = 0, length = commands.length; i < length; i++) {
    const command = commands[i];
    const commandHandler = pathCommands[command.cmd as keyof typeof pathCommands];

    if (typeof commandHandler === "function") {
      const points = commandHandler(command.arg, shouldRound);
      result = result.concat(points);
    }
  }

  return result;
}

export function parseOpeningProfile(profileData: ProfileData): Point[] {
  let points = parse(profileData.profile);

  if (profileData.swing === 2 || profileData.swing === 3) {
    points = points.map((point) => ({
      x: -point.x,
      y: point.y,
    }));
  }

  return points;
}

export function simplifyProfile(points: Point[]): Point[] | undefined {
  if (points.length < 3) return;

  if (!HSCore.Util.Math.isSamePoint(points[0], points[points.length - 1])) {
    points.push(points[0]);
  }

  const simplified: Point[] = [points[0], points[1]];

  for (let i = 1, length = points.length; i < length - 1; i++) {
    const simplifiedLength = simplified.length;
    const tolerance = HSCore.Util.Math.defaultTolerance;

    if (
      HSCore.Util.Math.isParallel(
        points[i],
        points[i + 1],
        simplified[simplifiedLength - 2],
        simplified[simplifiedLength - 1],
        tolerance
      )
    ) {
      simplified.pop();
    }

    simplified.push(points[i + 1]);
  }

  simplified.pop();
  return simplified;
}

declare global {
  const HSCore: {
    Util: {
      Math: {
        isSamePoint(point1: Point, point2: Point): boolean;
        isParallel(
          point1: Point,
          point2: Point,
          point3: Point,
          point4: Point,
          tolerance: number
        ): boolean;
        defaultTolerance: number;
      };
    };
  };
}