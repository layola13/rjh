import { HSCore } from '../path/to/HSCore';
import { getDeleteItem } from '../utils/deleteItem';
import { ParametricContentBase } from './strategies/parametricContentBase';
import { meshContent, tpzz } from './strategies/meshContent';
import { face } from './strategies/face';
import { wainScot, customizedModel, customizedPMInstanceModel } from './strategies/wainScot';
import { molding } from './strategies/molding';
import { hole, NCustomizedStructure, wall, parametricOpening, opening } from './strategies/hole';
import { NCustomizedParametricRoof } from './strategies/parametricRoof';
import { NCustomizedParametricStairs } from './strategies/parametricStairs';
import { softCloth, group, content } from './strategies/content';

interface StrategyItem {
  // Define based on getDeleteItem return type
  [key: string]: unknown;
}

interface Strategy {
  name: string;
  isApplied: (items: unknown[]) => boolean;
  getItems: (items: unknown[]) => StrategyItem[];
}

const auxiliary: Strategy = {
  name: "auxiliary",
  isApplied: (items: unknown[]): boolean => {
    return items[0] instanceof HSCore.Model.AuxiliaryLine;
  },
  getItems: (items: unknown[]): StrategyItem[] => {
    return [getDeleteItem(items)];
  }
};

export const strategies: Strategy[] = [
  ParametricContentBase,
  meshContent,
  tpzz,
  face,
  wainScot,
  customizedModel,
  customizedPMInstanceModel,
  molding,
  auxiliary,
  hole,
  NCustomizedStructure,
  NCustomizedParametricRoof,
  NCustomizedParametricStairs,
  wall,
  parametricOpening,
  opening,
  softCloth,
  group,
  content
];