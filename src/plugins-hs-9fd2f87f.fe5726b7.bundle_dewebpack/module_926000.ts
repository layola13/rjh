abstract class CustomizedModelingEnv extends HSApp.Environment.CommonEnvironment {
  constructor(config: unknown) {
    super(config);
  }

  onActivate(): void {
    // Override in subclass
  }

  onDeactivate(): void {
    // Override in subclass
  }

  getToolbarId(): string {
    return "";
  }

  onActivateToolbar(toolbar: unknown): boolean {
    return true;
  }
}

export { CustomizedModelingEnv };