export interface TaskConfigData {
  description?: string;
  taskCode?: string;
  showWalkthrough?: boolean;
  showWelcome?: boolean;
  tips?: string[];
  isUpload?: boolean;
}

export class TaskConfig {
  description?: string;
  taskCode?: string;
  showWalkthrough?: boolean;
  showWelcome?: boolean;
  tips?: string[];
  isUpload?: boolean;

  constructor() {
    this.description = undefined;
    this.taskCode = undefined;
    this.showWalkthrough = undefined;
    this.showWelcome = undefined;
    this.tips = undefined;
    this.isUpload = undefined;
  }

  static load(data: TaskConfigData): TaskConfig {
    const instance = new TaskConfig();
    instance.description = data.description;
    instance.taskCode = data.taskCode;
    instance.showWalkthrough = data.showWalkthrough;
    instance.showWelcome = data.showWelcome;
    instance.tips = data.tips;
    instance.isUpload = data.isUpload;
    return instance;
  }
}