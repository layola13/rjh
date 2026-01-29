export function allPromiseFinish<T>(promises: Promise<T>[]): Promise<T[]> {
  let hasError = false;
  let remainingCount = promises.length;
  const results: T[] = [];

  if (!promises.length) {
    return Promise.resolve([]);
  }

  return new Promise<T[]>((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .catch((error) => {
          hasError = true;
          return error;
        })
        .then((result) => {
          remainingCount -= 1;
          results[index] = result;

          if (remainingCount <= 0) {
            if (hasError) {
              reject(results);
            } else {
              resolve(results);
            }
          }
        });
    });
  });
}