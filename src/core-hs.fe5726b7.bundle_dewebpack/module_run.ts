async function run<T>(...args: unknown[]): Promise<T> {
    this._state = TaskState.Running;
    const result = await executeTask<T>(...args);
    this._completeTask();
    return result;
}