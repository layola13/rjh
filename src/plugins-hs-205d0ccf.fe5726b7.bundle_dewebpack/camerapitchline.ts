import { useState, useEffect } from 'react';
import React from 'react';
import classNames from 'classnames';

enum PitchLineState {
  hidden = 'hidden',
  common = 'common',
  snapping = 'snapping'
}

interface CameraPitchLineProps {
  height: number;
}

interface CommandData {
  cmd?: {
    type?: string;
    signalRenderCameraMoving?: unknown;
  };
}

interface CommandEvent {
  data: CommandData;
}

interface Camera {
  horizontal_fov: number;
  pitch: number;
}

interface FloorPlan {
  active_camera: Camera;
}

interface App {
  floorplan: FloorPlan;
  primaryViewMode: string;
  cmdManager: {
    signalCommandStarting: unknown;
    signalCommandTerminating: unknown;
  };
}

declare const HSApp: {
  App: {
    getApp(): App;
  };
  View: {
    ViewModeEnum: {
      FirstPerson: string;
    };
  };
};

declare const HSCore: {
  Util: {
    SignalHook: new (context: undefined) => {
      listen(signal: unknown, callback: Function): any;
      unlisten(signal: unknown): void;
      unlistenAll(): void;
    };
    Math: {
      nearlyEquals(a: number, b: number): boolean;
    };
  };
};

declare const HSFPConstants: {
  CommandType: {
    MoveCamera3D: string;
  };
};

declare const THREE: {
  Math: {
    degToRad(degrees: number): number;
  };
};

const HIDE_DELAY_MS = 1000;

export const CameraPitchLine: React.FC<CameraPitchLineProps> = ({ height }) => {
  const [lineState, setLineState] = useState<PitchLineState>(PitchLineState.hidden);
  const [lineTopPosition, setLineTopPosition] = useState<number>(height / 2);
  
  const app = HSApp.App.getApp();
  const signalHook = new HSCore.Util.SignalHook(undefined);
  let hideTimer: NodeJS.Timeout | undefined;

  const handleCommandStart = (event: CommandEvent): void => {
    const commandData = event.data ?? {};
    const commandType = commandData.cmd?.type;

    if (commandType === HSFPConstants.CommandType.MoveCamera3D) {
      signalHook.listen(event.data.cmd!.signalRenderCameraMoving, updateCameraPitch);
    }
  };

  const handleCommandEnd = (event: CommandEvent): void => {
    const commandData = event.data ?? {};
    const commandType = commandData.cmd?.type;

    if (commandType === HSFPConstants.CommandType.MoveCamera3D) {
      signalHook.unlisten(commandData.cmd!.signalRenderCameraMoving);
    }
  };

  const updateCameraPitch = (): void => {
    const activeCamera = app.floorplan.active_camera;

    if (app.primaryViewMode === HSApp.View.ViewModeEnum.FirstPerson) {
      const horizontalFovTangent = Math.tan(0.5 * activeCamera.horizontal_fov * Math.PI / 180);
      const pitchRatio = Math.tan(THREE.Math.degToRad(activeCamera.pitch)) / horizontalFovTangent;
      const newState = HSCore.Util.Math.nearlyEquals(pitchRatio, 0) 
        ? PitchLineState.snapping 
        : PitchLineState.common;

      setLineState(newState);
      setLineTopPosition((pitchRatio + 1) * (height / 2));
      scheduleHide();
    } else {
      hideLine();
    }
  };

  const scheduleHide = (): void => {
    if (hideTimer) {
      clearInterval(hideTimer);
    }
    hideTimer = setInterval(() => {
      hideLine();
    }, HIDE_DELAY_MS);
  };

  const hideLine = (): void => {
    if (hideTimer !== undefined) {
      clearInterval(hideTimer);
      hideTimer = undefined;
      setLineState(PitchLineState.hidden);
      setLineTopPosition(0);
    }
  };

  useEffect(() => {
    const commandManager = app.cmdManager;

    signalHook
      .listen(commandManager.signalCommandStarting, handleCommandStart)
      .listen(commandManager.signalCommandTerminating, handleCommandEnd);

    return () => {
      signalHook.unlistenAll();
    };
  }, []);

  return (
    <div className={classNames('pitchLine', { line_disable: lineState === PitchLineState.hidden })}>
      <div
        className={classNames('line_area', { pitch_snap: lineState === PitchLineState.snapping })}
        style={{ top: height / 2 }}
      >
        <div className="line pitch_base_left" />
        <div className="line pitch_base_right" />
      </div>
      <div
        className={classNames('line_area', { line_disable: lineState !== PitchLineState.common })}
        style={{ top: lineTopPosition }}
      >
        <div className="line pitch_left" />
        <div className="line pitch_right" />
      </div>
    </div>
  );
};