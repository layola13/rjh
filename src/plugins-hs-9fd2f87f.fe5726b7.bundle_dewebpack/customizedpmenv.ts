import { MessageHandler } from './MessageHandler';

export class CustomizedPmEnv extends HSApp.Environment.CommonEnvironment {
  constructor(config: unknown) {
    super(config);
  }

  onActivate(): void {
    // Activation logic placeholder
  }

  onDeactivate(): void {
    // Deactivation logic placeholder
  }

  getToolbarId(): string {
    return "";
  }

  onActivateToolbar(toolbarId: string): boolean {
    return true;
  }

  resume(): void {
    MessageHandler.instance().resumeDIY();
  }
}