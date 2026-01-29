interface SaveServiceInterface {
  app: unknown;
}

interface StageContext {
  saveService: SaveServiceInterface;
}

interface StageResult<T = unknown> {
  status: 'success' | 'error';
  data?: T;
}

interface TaskService<TInput = unknown, TOutput = unknown> {
  execute(input: TInput, signal: AbortSignal, previousData?: unknown): Promise<StageResult<TOutput>>;
}

interface TaskRegistration {
  name: string;
  task: TaskService;
  before?: string | string[];
}

export class SaveStage {
  protected saveService: SaveServiceInterface;

  constructor(context: StageContext) {
    this.saveService = context.saveService;
  }

  async execute<T = unknown>(input: T, signal: AbortSignal): Promise<StageResult> {
    return { status: 'success' };
  }
}

export class SaveHasTaskStage extends SaveStage {
  protected app: unknown;
  protected taskMap: TaskRegistration[];
  protected signal?: AbortSignal;

  constructor(context: StageContext) {
    super(context);
    this.app = context.saveService.app;
    this.taskMap = [];
  }

  getTask(taskName: string): TaskService | undefined {
    return this.taskMap.find((registration) => registration.name === taskName)?.task;
  }

  async execute<T = unknown>(input: T, signal: AbortSignal): Promise<StageResult<Record<string, unknown>>> {
    return this.forEachStage(this.taskMap, input, signal);
  }

  registerTaskService(nameOrOptions: string | Omit<TaskRegistration, 'task'>, task: TaskService): void {
    const registration: TaskRegistration =
      typeof nameOrOptions === 'string'
        ? { task, name: nameOrOptions }
        : { ...nameOrOptions, task };

    this._registerTaskService(registration);
  }

  private _registerTaskService(registration: TaskRegistration): void {
    const existingIndex = this.taskMap.findIndex((item) => item.name === registration.name);

    if (existingIndex === -1 || registration.before) {
      this.unregisterTaskService(registration.name);

      const beforeNames: string[] = [];
      if (typeof registration.before === 'string') {
        beforeNames.push(registration.before);
      } else if (Array.isArray(registration.before)) {
        beforeNames.push(...new Set(registration.before));
      }

      let insertIndex = this.taskMap.length;
      for (let i = 0; i < this.taskMap.length; i++) {
        if (beforeNames.includes(this.taskMap[i].name)) {
          insertIndex = i;
          break;
        }
      }

      this.taskMap.splice(insertIndex, 0, registration);
    } else {
      this.taskMap.splice(existingIndex, 1, registration);
    }
  }

  unregisterTaskService(taskName: string): void {
    const index = this.taskMap.findIndex((item) => item.name === taskName);
    if (index !== -1) {
      this.taskMap.splice(index, 1);
    }
  }

  private async forEachStage<T = unknown>(
    tasks: TaskRegistration[],
    input: T,
    signal: AbortSignal
  ): Promise<StageResult<Record<string, unknown>>> {
    const resultData: Record<string, unknown> = {};
    let previousData: unknown;

    for (const registration of tasks) {
      const { name, task } = registration;

      try {
        const result = await task.execute(input, signal, previousData);

        if (result?.status !== 'success') {
          throw result;
        }

        previousData = result.data;
        if (result.data !== undefined) {
          resultData[name] = result.data;
        }
      } catch (error) {
        const errorWithStatus = error as StageResult & { task?: string };
        if (errorWithStatus?.status) {
          return Promise.reject({
            ...errorWithStatus,
            task: name,
          });
        }
        return Promise.reject(error);
      }
    }

    return {
      status: 'success',
      data: resultData,
    };
  }
}