interface TimeoutResult<T> {
  timeout: boolean;
  data?: T;
}

export async function withTimeOut<T>(
  promiseFactory: () => Promise<T>,
  defaultTimeout: number = 10000
): Promise<TimeoutResult<T>> {
  return new Promise((resolve, reject) => {
    const timeout = (window as any).saveTimeout || defaultTimeout;

    setTimeout(() => {
      resolve({
        timeout: true
      });
    }, timeout);

    promiseFactory()
      .then((data) => {
        resolve({
          timeout: false,
          data
        });
      })
      .catch(reject);
  });
}