export interface PropertyMapping {
  [key: string]: string;
}

export const SingleDoor: PropertyMapping = {
  MK: "W",
  CD: "W",
  W1: "D",
  ZG: "H",
  ACTSZ: "CZ",
  zk: "ZYKM",
  LDGD: "LD"
};

export const POrdinaryWindow: PropertyMapping = {
  w: "W",
  W1: "D",
  h: "H",
  xtCZ: "CZ",
  ld: "LD"
};

export const BayWindow: PropertyMapping = {
  w: "W",
  h: "H",
  d: "D",
  xtCZ: "CZ",
  ld: "LD"
};

export const FloorBasedWindow: PropertyMapping = {
  w: "W",
  h: "H",
  xtCZ: "CZ",
  ld: "LD"
};

export const CornerWindow: PropertyMapping = {
  LA: "W2",
  LB: "W1",
  h: "H",
  xtCZ: "CZ",
  ld: "LD"
};

export const CornerBayWindow: PropertyMapping = {
  b: "W1",
  c: "W2",
  a: "D1",
  d: "D2",
  e: "H",
  xtCZ: "CZ",
  f: "LD"
};

export const InnerBayWindow: PropertyMapping = {
  SDD: "D1",
  SDD2: "D2",
  h: "H",
  ctscz: "CZ"
};

export const CurvedWindow: PropertyMapping = {
  xc: "W",
  diffH1: "H",
  ctCZ: "CZ"
};

export const DoorWindow: PropertyMapping = {
  ZG: "H",
  LZCZ: "CZ",
  zk: "ZYKM"
};

export const SpecialShapedWindow: PropertyMapping = {
  w: "W",
  GDD: "H",
  ckcz: "CZ"
};

export const CurveChild: PropertyMapping = {
  cz: "CZ"
};

export const LChild: PropertyMapping = {
  cz: "CZ"
};