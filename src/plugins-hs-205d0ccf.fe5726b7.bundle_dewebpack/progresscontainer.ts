export enum ProgressModeEnum {
  Simple = "Simple",
  Common = "Common"
}

interface ProgressContainerProps {
  customClassName?: string;
  processSchedule: number;
  processRemainingDuration?: number;
  mode?: ProgressModeEnum;
}

interface ResourceManager {
  getString(key: string): string;
}

declare const ResourceManager: ResourceManager;
declare const React: any;

export const ProgressContainer: React.FC<ProgressContainerProps> = ({
  customClassName = "",
  processSchedule,
  processRemainingDuration,
  mode = ProgressModeEnum.Common
}) => {
  let leftText = `${processSchedule}%`;
  let rightText = "";

  if (mode === ProgressModeEnum.Simple) {
    rightText = leftText;
    leftText = "";
  }

  if (processRemainingDuration !== undefined) {
    const seconds = `${Math.floor(processRemainingDuration % 60)}`.padStart(2, "0");
    const minutes = `${Math.floor(processRemainingDuration / 60)}`.padStart(2, "0");

    const calculatedText = processRemainingDuration < 60
      ? ResourceManager.getString("plugin_render_waiting_seconds").replace("#SECOND#", String(Math.floor(processRemainingDuration)))
      : ResourceManager.getString("plugin_render_waiting_minutes").replace("#MINUTE#", String(Math.floor(processRemainingDuration / 60)));

    rightText = calculatedText ?? ResourceManager.getString("plugin_render_waiting_times_calculate");

    if (mode === ProgressModeEnum.Simple) {
      leftText = `00:${minutes}:${seconds}`;
    }
  }

  return React.createElement(
    "div",
    { className: `progress_container ${customClassName}` },
    React.createElement(
      "div",
      { className: "process-info" },
      React.createElement("div", { className: "process-left" }, leftText),
      React.createElement("div", { className: "process-right" }, rightText)
    ),
    React.createElement(Progress, {
      percent: processSchedule,
      showInfo: false,
      width: 120,
      strokeWidth: 5
    })
  );
};

interface ProgressProps {
  percent: number;
  showInfo: boolean;
  width: number;
  strokeWidth: number;
}

declare const Progress: React.ComponentType<ProgressProps>;