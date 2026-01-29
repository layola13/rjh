import { ExtrudedBody } from './ExtrudedBody';

export class WindowCeiling extends ExtrudedBody {
  constructor(
    arg1: unknown,
    arg2: unknown,
    arg3: unknown,
    arg4: unknown
  ) {
    super(arg1, arg2, arg3, arg4);
  }

  onUpdate(): void {
    super.onUpdate();
  }

  async toGraphicsDataAsync(): Promise<GraphicsData> {
    try {
      return await super.toGraphicsDataAsync();
    } catch (error) {
      return {
        meshDefs: [],
        objects: []
      };
    }
  }

  toGraphicsData(): GraphicsData {
    return super.toGraphicsData();
  }
}

interface GraphicsData {
  meshDefs: unknown[];
  objects: unknown[];
}