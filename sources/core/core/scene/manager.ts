export class Manager {
  private static _instance: Manager;
  private _creators: Map<string, new (e: any, t: any, o: any, i: any) => any>;

  constructor() {
    this._creators = new Map();
  }

  static instance(): Manager {
    if (!Manager._instance) {
      Manager._instance = new Manager();
    }
    return Manager._instance;
  }

  registerCreator(
    type: string,
    creator: new (e: any, t: any, o: any, i: any) => any
  ): void {
    this._creators.set(type, creator);
  }

  createParametricModel(
    config: any,
    param1: any,
    param2: any,
    param3: any
  ): any | null {
    if (!config?.parameters?.type) {
      return null;
    }

    const creator = this._creators.get(config.parameters.type);
    return creator ? new creator(config, param1, param2, param3) : null;
  }
}

Manager.instance().registerCreator("extrudedBody", ExtrudedBody);
Manager.instance().registerCreator("wall", Wall);
Manager.instance().registerCreator("window", Window);
Manager.instance().registerCreator("windowSill", WindowSill);
Manager.instance().registerCreator("windowCeiling", WindowCeiling);
Manager.instance().registerCreator("windowHole", WindowHole);
Manager.instance().registerCreator("windowPocket", WindowPocket);