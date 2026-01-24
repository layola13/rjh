/**
 * 命令类型定义模块
 * 定义了各种命令的参数获取逻辑和描述信息
 * @module CommandTypes
 */

/**
 * 命令参数返回结果
 */
interface CommandParams {
  /** 操作类型标识 */
  actionType?: string;
  /** 操作描述 */
  description?: string;
  /** 是否为无用命令 */
  notUseful?: boolean;
}

/**
 * 命令事件参数
 */
interface CommandEventArg {
  /** 触发事件对象 */
  event?: Event | WheelEvent | KeyboardEvent | MouseEvent;
  [key: string]: unknown;
}

/**
 * 命令对象
 */
interface Command {
  /** 命令参数列表 */
  args?: CommandEventArg[];
  [key: string]: unknown;
}

/**
 * 命令上下文
 */
interface CommandContext {
  /** 命令详情 */
  cmd?: Command;
  [key: string]: unknown;
}

/**
 * 应用视图状态
 */
interface AppViewState {
  /** 主视图模式 */
  primaryViewMode: string;
  /**
   * 判断是否为2D视图激活状态
   * @returns 是否为2D视图
   */
  is2DViewActive(): boolean;
}

/**
 * 命令类型配置项
 */
interface CommandTypeConfig {
  /**
   * 获取命令参数
   * @param viewState - 应用视图状态
   * @param context - 命令上下文
   * @returns 命令参数对象
   */
  getParams?(viewState: AppViewState, context: CommandContext): CommandParams;
  [key: string]: unknown;
}

/**
 * 命令类型映射表
 * 包含各种命令的配置和参数获取逻辑
 */
export declare const CommandTypes: {
  /** 移动南北墙命令 */
  [HSFPConstants.CommandType.MoveNGWall]: true;
  
  /** 移动3D相机命令 */
  [HSFPConstants.CommandType.MoveCamera3D]: CommandTypeConfig;
  
  /** 移动内容命令 */
  [HSFPConstants.CommandType.MoveContent]: CommandTypeConfig;
  
  /** 旋转内容命令 */
  [HSFPConstants.CommandType.RotateContent]: CommandTypeConfig;
};

/**
 * 全局HSApp命名空间声明
 */
declare global {
  namespace HSApp {
    namespace View {
      /** 视图模式枚举 */
      enum ViewModeEnum {
        /** 第一人称视角 */
        FirstPerson = 'FirstPerson',
        /** 鸟瞰视角 */
        OrbitView = 'OrbitView'
      }
    }
  }

  namespace HSFPConstants {
    /** 命令类型常量 */
    enum CommandType {
      /** 移动南北墙 */
      MoveNGWall = 'MoveNGWall',
      /** 移动3D相机 */
      MoveCamera3D = 'MoveCamera3D',
      /** 移动内容 */
      MoveContent = 'MoveContent',
      /** 旋转内容 */
      RotateContent = 'RotateContent'
    }
  }
}