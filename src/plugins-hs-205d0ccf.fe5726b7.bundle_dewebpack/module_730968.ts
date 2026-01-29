import { Loop } from './Loop';
import { CmdCreateTgWall, CmdCreateRectTgWall } from './commands';
import { CmdCreatePolygonTgWall } from './polygonCommands';
import { CreateTgWallRequest, SwitchArcWallRequest } from './requests';

interface Point {
  x: number;
  y: number;
}

interface PluginContext {
  app: {
    cmdManager: {
      register(commands: Array<[string, new (...args: unknown[]) => unknown]>): void;
    };
    transManager: {
      register(requests: Array<[string, new (...args: unknown[]) => unknown]>): void;
    };
  };
}

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

class TgWallEditingPlugin extends HSApp.Plugin.IPlugin {
  constructor() {
    super({
      name: "tgwall editing",
      description: "Process wall edit commands and its gizmos.",
      dependencies: []
    });
  }

  onActive(context: PluginContext): void {
    context.app.cmdManager.register([
      [HSFPConstants.CommandType.CreateTgWall, CmdCreateTgWall],
      [HSFPConstants.CommandType.CreateRectTgWall, CmdCreateRectTgWall],
      [HSFPConstants.CommandType.CreatePolygonTgWall, CmdCreatePolygonTgWall]
    ]);

    context.app.transManager.register([
      [HSFPConstants.RequestType.CreateTgWall, CreateTgWallRequest],
      [HSFPConstants.RequestType.SwitchArcWall, SwitchArcWallRequest]
    ]);
  }

  onDeactive(): void {
    // Cleanup logic if needed
  }

  getConvexPath(width: number = 5, height: number = 5): unknown[] {
    const halfWidth = width / 2;
    const quarterWidth = width / 4;
    const halfHeight = height / 2;

    const points: Point[] = [
      { x: halfWidth, y: -halfHeight },
      { x: halfWidth, y: 0 },
      { x: quarterWidth, y: 0 },
      { x: quarterWidth, y: halfHeight },
      { x: -quarterWidth, y: halfHeight },
      { x: -quarterWidth, y: 0 },
      { x: -halfWidth, y: 0 },
      { x: -halfWidth, y: -halfHeight }
    ];

    return new Loop(points).getAllCurves();
  }

  getLPath(width: number = 5, height: number = 5): unknown[] {
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const points: Point[] = [
      { x: halfWidth, y: -halfHeight },
      { x: halfWidth, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: halfHeight },
      { x: -halfWidth, y: halfHeight },
      { x: -halfWidth, y: -halfHeight }
    ];

    return new Loop(points).getAllCurves();
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.TgWall, TgWallEditingPlugin);