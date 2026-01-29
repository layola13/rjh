import { HSCore } from './core';
import { HSApp } from './app';
import { HSFPConstants } from './constants';

interface Signal<T = unknown> {
  dispatch(...args: unknown[]): void;
  add(listener: Function, context?: unknown): void;
  remove(listener: Function, context?: unknown): void;
}

interface SingleRoomModeSignals {
  signalEnterSingleRoomMode: Signal;
  signalExitSingleRoomMode: Signal;
  signalChangeSingleRoomMode: Signal;
}

interface IPlugin {
  onActive(context: unknown, handler: unknown): void;
  onDeactive(): void;
}

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

class SingleRoomHandler {
  constructor(handlerContext: unknown, signals: SingleRoomModeSignals);
  init(): void;
  refreshTargetRoomWithActiveView(view: unknown): void;
  cancelSingleRoom(): void;
  setTargetRoom(room: unknown): void;
  getTargetRoom(): unknown;
  cmdSetTargetRoom(roomId: string, option: unknown, callback?: Function): void;
  updateSingleRoomMode(mode: unknown): void;
  enterSingleRoomMode(): void;
  exitSingleRoomMode(): void;
  switchRoomById(roomId: string, animated: boolean): void;
}

class SingleRoomPlugin extends HSApp.Plugin.IPlugin {
  private handler?: SingleRoomHandler;
  public signalEnterSingleRoomMode?: Signal;
  public signalExitSingleRoomMode?: Signal;
  public signalChangeSingleRoomMode?: Signal;

  constructor() {
    const config: PluginConfig = {
      name: "Single room plugin",
      description: "single room mode switch",
      dependencies: [HSFPConstants.PluginType.ResizeWidget]
    };
    super(config);
  }

  onActive(context: unknown, handlerContext: unknown): void {
    this.signalEnterSingleRoomMode = new HSCore.Util.Signal(this);
    this.signalExitSingleRoomMode = new HSCore.Util.Signal(this);
    this.signalChangeSingleRoomMode = new HSCore.Util.Signal(this);

    this.handler = new SingleRoomHandler(handlerContext, {
      signalEnterSingleRoomMode: this.signalEnterSingleRoomMode,
      signalExitSingleRoomMode: this.signalExitSingleRoomMode,
      signalChangeSingleRoomMode: this.signalChangeSingleRoomMode
    });

    this.handler.init();
  }

  onDeactive(): void {
    // Cleanup logic can be added here if needed
  }

  refreshTargetRoom(view: unknown): void {
    this.handler?.refreshTargetRoomWithActiveView(view);
  }

  cancelSingleRoom(): void {
    this.handler?.cancelSingleRoom();
  }

  setTargetRoom(room: unknown): void {
    this.handler?.setTargetRoom(room);
  }

  getTargetRoom(): unknown {
    return this.handler?.getTargetRoom();
  }

  cmdSetTargetRoom(roomId: string, option: unknown, callback?: Function): void {
    this.handler?.cmdSetTargetRoom(roomId, option, callback);
  }

  updateSingleRoomMode(mode: unknown): void {
    this.handler?.updateSingleRoomMode(mode);
  }

  enterSingleRoomMode(): void {
    this.handler?.enterSingleRoomMode();
  }

  exitSingleRoomMode(): void {
    this.handler?.exitSingleRoomMode();
  }

  switchRoomById(roomId: string, animated: boolean): void {
    this.handler?.switchRoomById(roomId, animated);
  }
}

HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.SingleRoom, SingleRoomPlugin);