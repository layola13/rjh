interface MessageData {
  type: string;
  data?: {
    message?: string;
    isLogin?: boolean;
    [key: string]: unknown;
  };
}

type MessageListener = (data: unknown, type: string) => void;

type MessageStatus = "new" | "opening" | "opened" | "closed";

interface WebsocketTokenResponse {
  token: string | null;
}

interface HSAppConfig {
  TENANT: string;
  VERSION: string;
  WS_NOTIFICATION_3D: string;
}

interface Logger {
  errorLogger: {
    push(key: string, data: { description: string }, options: Record<string, unknown>): void;
  };
}

interface HSApp {
  Config: HSAppConfig;
  Logger: Logger;
}

interface AdskUser {
  signalLoginCompleted: {
    listen(callback: (event: { data?: { isLogin?: boolean } }) => void): void;
  };
}

declare const adskUser: AdskUser;
declare const HSApp: HSApp;

function getWebsocketToken(): Promise<WebsocketTokenResponse> {
  // Implementation should be imported from the actual module
  throw new Error("Not implemented");
}

class HeartBeat {
  private websocket?: WebSocket;
  private readonly timeout: number = 48000;
  private serverTimeoutObj?: number;

  reset(websocket?: WebSocket): this {
    this.websocket = websocket;
    if (this.serverTimeoutObj !== undefined) {
      clearInterval(this.serverTimeoutObj);
    }
    return this;
  }

  start(): void {
    this.serverTimeoutObj = window.setInterval(() => {
      const socket = this.websocket;
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send("ping");
      }
    }, this.timeout);
  }
}

class MessageCenter {
  private socket?: WebSocket;
  private connectCount: number = 0;
  private status: MessageStatus;
  private listenMap: Record<string, MessageListener[]>;
  private heart: HeartBeat;

  constructor() {
    this.status = "new";
    this.listenMap = {};
    this.heart = new HeartBeat();

    adskUser.signalLoginCompleted.listen((event) => {
      if (HSApp.Config.TENANT !== "fp" && event.data?.isLogin) {
        this.open();
      }
    });

    window.addEventListener("unload", () => {
      this.close();
    });
  }

  close(): void {
    if (this.socket) {
      this.socket.onclose = null;
      this.socket.onerror = null;
      this.socket.onmessage = null;
      this.socket.onopen = null;
      this.socket.close();
      this.heart.reset();
      this.status = "closed";
    }
  }

  listen(eventType: string, listener: MessageListener): void {
    if (!this.listenMap[eventType]) {
      this.listenMap[eventType] = [];
    }
    this.listenMap[eventType].push(listener);
  }

  emit(event: MessageData): void {
    const { type, data } = event;
    const listeners = this.listenMap[type];
    if (listeners) {
      [...listeners].forEach((listener) => {
        listener?.(data, type);
      });
    }
  }

  private async getToken(): Promise<WebsocketTokenResponse> {
    return getWebsocketToken().catch(() => ({ token: null }));
  }

  private connect(token: string): void {
    this.close();
    this.status = "opening";

    const wsBase = HSApp.Config.WS_NOTIFICATION_3D;
    const wsUrl =
      HSApp.Config.VERSION === "ea"
        ? `${wsBase}/websocket/ea/${token}`
        : `${wsBase}/websocket/user/${token}`;

    try {
      this.socket = new WebSocket(wsUrl);
    } catch (error) {
      this.reopen();
      return;
    }

    this.socket.onopen = () => {
      this.status = "opened";
    };

    this.socket.onclose = () => {
      if (this.status !== "closed") {
        this.reopen();
      }
    };

    this.socket.onerror = () => {
      this.reopen();
    };

    this.socket.onmessage = (event: MessageEvent) => {
      try {
        if (event.data === "pang") return;

        const message: MessageData = JSON.parse(event.data);
        if (message.type === "message" && message.data?.message === "连接成功") {
          this.connectCount = 0;
          this.heart.reset(this.socket).start();
        }
        this.emit(message);
      } catch (error) {
        // Ignore parsing errors
      }
    };
  }

  private reopen(): void {
    this.close();
    const RECONNECT_DELAY = 20000;
    const MAX_RECONNECT_ATTEMPTS = 5;

    setTimeout(() => {
      this.connectCount++;
      if (this.connectCount > MAX_RECONNECT_ATTEMPTS) {
        HSApp.Logger.errorLogger.push(
          "feedback-websockt-error",
          { description: "反馈websocket连接失败" },
          {}
        );
      } else {
        this.open();
      }
    }, RECONNECT_DELAY);
  }

  async open(): Promise<void> {
    if (this.status === "opening" || this.status === "opened") {
      return;
    }

    this.status = "opening";
    const { token } = await this.getToken();

    if (!token) {
      this.reopen();
      return;
    }

    this.connect(token);
  }
}

export const messageCenter = new MessageCenter();
export { MessageCenter };