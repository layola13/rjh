interface CommandContext {
  primaryViewMode: number;
  is2DViewActive(): boolean;
}

interface CommandArgs {
  event?: Event;
}

interface CommandData {
  cmd?: {
    args?: CommandArgs[];
  };
}

interface CommandParams {
  actionType?: string;
  description?: string;
  notUseful?: boolean;
}

interface CommandTypeConfig {
  getParams?(context: CommandContext, data: CommandData): CommandParams;
}

type CommandTypesMap = Record<string, boolean | CommandTypeConfig>;

const ViewModeEnum = {
  FirstPerson: HSApp.View.ViewModeEnum.FirstPerson,
  OrbitView: HSApp.View.ViewModeEnum.OrbitView,
} as const;

export const CommandTypes: CommandTypesMap = {
  [HSFPConstants.CommandType.MoveNGWall]: true,
  
  [HSFPConstants.CommandType.MoveCamera3D]: {
    getParams(context: CommandContext, data: CommandData): CommandParams {
      const firstPersonMode = ViewModeEnum.FirstPerson;
      const orbitViewMode = ViewModeEnum.OrbitView;

      if (![firstPersonMode, orbitViewMode].includes(context.primaryViewMode)) {
        return { notUseful: true };
      }

      const commandArgs = data?.cmd?.args;
      const eventArg = commandArgs?.find((arg) => arg.event);

      if (!eventArg) {
        return { notUseful: true };
      }

      if (context.primaryViewMode === firstPersonMode) {
        if (eventArg.event instanceof WheelEvent) {
          return {
            actionType: `${HSFPConstants.CommandType.MoveCamera3D}.${firstPersonMode}.WheelEvent`,
            description: '3D漫游视图滚轮画布',
          };
        }

        if (eventArg.event instanceof KeyboardEvent || eventArg.event instanceof MouseEvent) {
          return {
            actionType: `${HSFPConstants.CommandType.MoveCamera3D}.${firstPersonMode}.ExplorerView`,
            description: '3D漫游视图浏览视图',
          };
        }
      } else {
        if (eventArg.event instanceof WheelEvent) {
          return {
            actionType: `${HSFPConstants.CommandType.MoveCamera3D}.${orbitViewMode}.WheelEvent`,
            description: '3D鸟瞰视图滚轮画布',
          };
        }

        if (eventArg.event instanceof KeyboardEvent || eventArg.event instanceof MouseEvent) {
          return {
            actionType: `${HSFPConstants.CommandType.MoveCamera3D}.${orbitViewMode}.ExplorerView`,
            description: '3D鸟瞰视图浏览画布',
          };
        }
      }

      return { notUseful: true };
    },
  },

  [HSFPConstants.CommandType.MoveContent]: {
    getParams(context: CommandContext, data: CommandData): CommandParams {
      if (context.is2DViewActive()) {
        return {
          actionType: `${HSFPConstants.CommandType.MoveContent}2D`,
          description: '2D移动模型',
        };
      }

      return {
        actionType: `${HSFPConstants.CommandType.MoveContent}3D`,
        description: '3D移动模型',
      };
    },
  },

  [HSFPConstants.CommandType.RotateContent]: {
    getParams(context: CommandContext, data: CommandData): CommandParams {
      if (context.is2DViewActive()) {
        return {
          actionType: `${HSFPConstants.CommandType.RotateContent}2D`,
          description: '2D旋转模型',
        };
      }

      return {
        actionType: `${HSFPConstants.CommandType.RotateContent}3D`,
        description: '3D旋转模型',
      };
    },
  },
};