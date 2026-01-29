interface ErrorState {
  errorThrown: boolean;
  error: unknown;
}

interface Config {
  useDeprecatedSynchronousErrorHandling: boolean;
}

let currentErrorState: ErrorState | null = null;

export function errorContext(callback: () => void): void {
  const config: Config = (globalThis as any).config || { useDeprecatedSynchronousErrorHandling: false };

  if (config.useDeprecatedSynchronousErrorHandling) {
    const isNewContext = !currentErrorState;

    if (isNewContext) {
      currentErrorState = {
        errorThrown: false,
        error: null
      };
    }

    callback();

    if (isNewContext) {
      const state = currentErrorState;
      const hasError = state.errorThrown;
      const capturedError = state.error;

      currentErrorState = null;

      if (hasError) {
        throw capturedError;
      }
    }
  } else {
    callback();
  }
}

export function captureError(error: unknown): void {
  const config: Config = (globalThis as any).config || { useDeprecatedSynchronousErrorHandling: false };

  if (config.useDeprecatedSynchronousErrorHandling && currentErrorState) {
    currentErrorState.errorThrown = true;
    currentErrorState.error = error;
  }
}