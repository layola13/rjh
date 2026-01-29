export interface HSConstantsType {
  [key: string]: unknown;
}

export interface LogType {
  [key: string]: unknown;
}

export interface NWTKType {
  [key: string]: unknown;
}

declare const HSConstants: HSConstantsType;
declare const log: LogType;
declare const NWTK: NWTKType;

export class RegisterManager {
  private static hsConstants?: HSConstantsType;
  private static log?: LogType;
  private static nwtk?: NWTKType;

  /**
   * Register HSConstants globally
   */
  static registerHSConstants(constants: HSConstantsType): void {
    this.hsConstants = constants;
  }

  /**
   * Register log utility globally
   */
  static registerLog(logger: LogType): void {
    this.log = logger;
  }

  /**
   * Register NWTK globally
   */
  static registerNWTK(nwtk: NWTKType): void {
    this.nwtk = nwtk;
  }

  static getHSConstants(): HSConstantsType | undefined {
    return this.hsConstants;
  }

  static getLog(): LogType | undefined {
    return this.log;
  }

  static getNWTK(): NWTKType | undefined {
    return this.nwtk;
  }
}

/**
 * Initialize the meta manager with global dependencies
 */
export function initMetaManager(): void {
  RegisterManager.registerHSConstants(HSConstants);
  RegisterManager.registerLog(log);
  RegisterManager.registerNWTK(NWTK);
}

export * from './register-manager';