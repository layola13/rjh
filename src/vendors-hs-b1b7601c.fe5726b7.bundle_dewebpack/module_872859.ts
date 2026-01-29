export interface Config {
  onUnhandledError: ((error: unknown) => void) | null;
  onStoppedNotification: ((notification: unknown) => void) | null;
  Promise: PromiseConstructorLike | undefined;
  useDeprecatedSynchronousErrorHandling: boolean;
  useDeprecatedNextContext: boolean;
}

export const config: Config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: undefined,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};