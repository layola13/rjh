import { createLogData } from './858122';

interface KeyboardEvent {
  code: string;
  keyCode: number;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
}

interface KeyboardEventData {
  data: KeyboardEvent;
}

interface HotkeyEventData {
  data?: {
    identifier?: string;
  };
}

interface TrackLog {
  customizedInfo?: {
    keyCode?: number;
    shortCutName?: string;
    group?: string;
    type?: string;
  };
}

interface LogGroup {
  description?: string;
  group?: string;
}

interface ClicksRatio {
  id: string | number;
  name: string;
}

interface LogDataParams {
  description?: string;
  shortCutName?: string;
  keyCode?: number;
  activeSection?: string;
  clicksRatio?: ClicksRatio;
  type?: string;
  viewMode?: string;
  viewModeName?: string;
  group?: string;
}

interface KeyboardManager {
  signalKeyDown: unknown;
}

interface CommandManager {
  current?: {
    type: string;
  };
}

interface SelectionManager {
  selected(): unknown[];
}

interface HotkeyManager {
  hotkeyHandleSignal: unknown;
  getLogGroupByHotkey(identifier: string): LogGroup | undefined;
}

interface UserTrackLogger {
  getLastTrackLog(): TrackLog | undefined;
}

interface Application {
  keyboardManager: KeyboardManager;
  hotkey: HotkeyManager;
  cmdManager: CommandManager;
  selectionManager: SelectionManager;
  userTrackLogger: UserTrackLogger;
  is2DViewActive(): boolean;
  getOldViewMode: string;
}

interface ListenerConfig {
  getListenSignal(app: Application): unknown;
  listen(event: KeyboardEventData | HotkeyEventData): Array<ReturnType<typeof createLogData>> | undefined;
}

// WASD + QE camera movement keys
const WASD_CAMERA_KEYS: Record<number, string> = {
  87: '相机前进', // W
  83: '相机后退', // S
  65: '相机左移', // A
  68: '相机右移', // D
  81: '相机上移', // Q
  69: '相机下移', // E
};

// Arrow keys camera movement
const ARROW_CAMERA_KEYS: Record<number, string> = {
  37: '相机左移', // Left Arrow
  38: '相机前进', // Up Arrow
  39: '相机右移', // Right Arrow
  40: '相机后退', // Down Arrow
};

// View mode switch keys (1-5)
const VIEW_MODE_KEYS: Record<number, string> = {
  49: HSApp.View.ViewModeEnum.Plane,       // 1
  50: HSApp.View.ViewModeEnum.RCP,         // 2
  51: HSApp.View.ViewModeEnum.OrbitView,   // 3
  52: HSApp.View.ViewModeEnum.FirstPerson, // 4
  53: HSApp.View.ViewModeEnum.Elevation,   // 5
};

const SPECIAL_HOTKEYS = ['esc', 'meta+z', 'backspace'];

const listeners: ListenerConfig[] = [
  {
    getListenSignal(app: Application): unknown {
      return app.keyboardManager.signalKeyDown;
    },

    listen(event: KeyboardEventData): Array<ReturnType<typeof createLogData>> | undefined {
      const { data } = event;
      const { code, keyCode, ctrlKey, shiftKey, altKey, metaKey } = data;

      // Ignore modified key combinations
      if (ctrlKey || shiftKey || altKey || metaKey) {
        return;
      }

      const app = HSApp.App.getApp();

      // Only handle when no command is active or camera movement is active
      if (!app.cmdManager.current || app.cmdManager.current.type === HSFPConstants.CommandType.MoveCamera3D) {
        const lastTrackLog = app.userTrackLogger.getLastTrackLog();
        const lastCustomInfo = lastTrackLog?.customizedInfo ?? {};

        // Avoid duplicate logging
        if (lastCustomInfo.keyCode === keyCode) {
          return;
        }

        const wasdKeys = Object.keys(WASD_CAMERA_KEYS);
        const arrowKeys = Object.keys(ARROW_CAMERA_KEYS);
        const viewModeKeys = Object.keys(VIEW_MODE_KEYS);

        const keyCodeStr = String(keyCode);
        const hasSelection = app.selectionManager.selected().length > 0;

        // Handle camera movement keys (WASD + Arrow keys)
        if (wasdKeys.includes(keyCodeStr) || (arrowKeys.includes(keyCodeStr) && !hasSelection)) {
          // Skip WASD keys in 2D view
          if (wasdKeys.includes(keyCodeStr) && app.is2DViewActive()) {
            return;
          }

          const allCameraKeys = { ...WASD_CAMERA_KEYS, ...ARROW_CAMERA_KEYS };
          const actionName = allCameraKeys[keyCode];
          const description = `使用${code}快捷键操作-${actionName}`;

          return [
            createLogData('hotkey.Command', {
              description,
              shortCutName: code,
              keyCode,
              activeSection: HSApp.Util.EventGroupEnum.Hotkey,
              clicksRatio: {
                id: code,
                name: description,
              },
            }),
          ];
        }

        // Handle view mode switch keys (1-5)
        if (viewModeKeys.includes(keyCodeStr)) {
          const newViewMode = VIEW_MODE_KEYS[keyCode];
          const oldViewMode = app.getOldViewMode;

          if (newViewMode !== oldViewMode) {
            const oldViewName = HSFPConstants.viewNames[oldViewMode];
            const newViewName = HSFPConstants.viewNames[newViewMode];
            const description = `主视图操作: ${oldViewName}视图切换到${newViewName}视图`;

            return [
              createLogData(
                'hotkey.Command',
                {
                  type: 'mainView',
                  viewMode: newViewMode,
                  viewModeName: newViewName,
                  description,
                  group: HSFPConstants.LogGroupTypes.ViewOperation,
                  keyCode,
                  activeSection: HSApp.Util.EventGroupEnum.Hotkey,
                  clicksRatio: {
                    id: keyCode,
                    name: description,
                  },
                },
                false
              ),
            ];
          }
        }
      }
    },
  },

  {
    getListenSignal(app: Application): unknown {
      return app.hotkey.hotkeyHandleSignal;
    },

    listen(event: HotkeyEventData): Array<ReturnType<typeof createLogData>> | undefined {
      const { data } = event;
      const identifier = data?.identifier ?? '';

      const app = HSApp.App.getApp();
      const logGroup = app.hotkey.getLogGroupByHotkey(identifier);
      const description = logGroup?.description ?? '';

      const lastTrackLog = app.userTrackLogger.getLastTrackLog();
      const lastCustomInfo = lastTrackLog?.customizedInfo ?? {};

      // Avoid duplicate logging
      if (lastCustomInfo.shortCutName === identifier) {
        return;
      }

      const logParams: LogDataParams = {
        description,
        shortCutName: identifier,
      };

      // Add group if available
      if (logGroup?.group) {
        logParams.group = logGroup.group;
      } else if (SPECIAL_HOTKEYS.includes(identifier) && lastCustomInfo.group) {
        // For special hotkeys, inherit group from last log
        logParams.group = lastCustomInfo.group;

        if (lastCustomInfo.type) {
          logParams.type = lastCustomInfo.type;
        }
      }

      logParams.activeSection = HSApp.Util.EventGroupEnum.Hotkey;
      logParams.clicksRatio = {
        id: identifier,
        name: description,
      };

      return [createLogData('hotkey.Command', logParams)];
    },
  },
];

export default listeners;