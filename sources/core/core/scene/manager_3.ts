import { ExtrudedBody } from './ExtrudedBody';
import { WindowWall } from './WindowWall';
import { WindowFrame } from './WindowFrame';
import { WindowSill } from './WindowSill';
import { WindowCeiling } from './WindowCeiling';
import { WindowHole } from './WindowHole';
import { WindowPocket } from './WindowPocket';
import { ParametricModelType } from './ParametricModelType';

interface ParametricModelParameters {
  type: ParametricModelType;
  [key: string]: unknown;
}

interface ParametricModel {
  initByParameters(parameters: ParametricModelParameters): void;
}

type ParametricModelCreator = new (context: unknown) => ParametricModel;

/**
 * Manager for creating parametric models based on their type.
 * Implements singleton pattern and factory pattern.
 */
export class Manager {
  private static _instance: Manager;
  private readonly _creators: Map<ParametricModelType, ParametricModelCreator>;

  constructor() {
    this._creators = new Map<ParametricModelType, ParametricModelCreator>();
  }

  /**
   * Gets the singleton instance of the Manager.
   * @returns The Manager instance
   */
  static instance(): Manager {
    this._instance = this._instance ?? new Manager();
    return this._instance;
  }

  /**
   * Registers a creator function for a specific parametric model type.
   * @param type - The parametric model type
   * @param creator - The creator constructor for the model
   */
  registerCreator(type: ParametricModelType, creator: ParametricModelCreator): void {
    this._creators.set(type, creator);
  }

  /**
   * Creates a parametric model instance based on the provided parameters.
   * @param parameters - The model parameters including type
   * @param context - The context to pass to the model constructor
   * @returns The created parametric model instance or null if invalid
   */
  createParametricModel(parameters: ParametricModelParameters | null | undefined, context: unknown): ParametricModel | null {
    if (!parameters?.type) {
      return null;
    }

    const creator = this._creators.get(parameters.type);
    if (creator) {
      const instance = new creator(context);
      instance.initByParameters(parameters);
      return instance;
    }

    return null;
  }
}

// Register default parametric model creators
Manager.instance().registerCreator(ParametricModelType.extrudedBody, ExtrudedBody);
Manager.instance().registerCreator(ParametricModelType.windowWall, WindowWall);
Manager.instance().registerCreator(ParametricModelType.windowFrame, WindowFrame);
Manager.instance().registerCreator(ParametricModelType.windowSill, WindowSill);
Manager.instance().registerCreator(ParametricModelType.windowCeiling, WindowCeiling);
Manager.instance().registerCreator(ParametricModelType.windowHole, WindowHole);
Manager.instance().registerCreator(ParametricModelType.windowPocket, WindowPocket);