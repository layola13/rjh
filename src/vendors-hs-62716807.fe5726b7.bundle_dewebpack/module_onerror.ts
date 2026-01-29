function handleModuleError(): void {
  const onErrorCallback = globalErrorHandler.onError;
  const result = onErrorCallback ? onErrorCallback() : undefined;
  
  if (result === false) {
    resetErrorState(false);
  }
}