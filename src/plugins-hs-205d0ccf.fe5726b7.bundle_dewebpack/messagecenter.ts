interface MessageData {
  type: string;
  data?: any;
}

interface WebSocketMessage {
  type: string;
  data?: {
    message?: string;
    [key: string]: any;
  };
}

interface ConnectSignalPayload {
  socket: WebSocket;
  messageCenter: MessageCenter;
}

type MessageListener = (data: any, type: string) => void;

interface ListenMap {
  [key: string]: MessageListener[];
}

interface TokenResponse {
  token: string | null;
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

type ConnectionStatus = "new" | "opening" | "opened" | "closed";

const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 20000;

export class MessageCenter {
  private socket?: WebSocket;
  private connectCount: number = 0;
  private status: ConnectionStatus = "new";
  private listenMap: ListenMap = {};
  private heart: HeartBeat = new HeartBeat();
  public connectSignal: any;

  constructor() {
    this.connectSignal = new (window as any).HSCore.Util.Signal();

    (window as any).adskUser.signalLoginCompleted.listen((event: any) => {
      const isNotFpTenant = (window as any).HSApp.Config.TENANT !== "fp";
      const isUserLoggedIn = event?.data?.isLogin;
      
      if (isNotFpTenant && isUserLoggedIn) {
        this.open();
      }
    });

    window.addEventListener("unload", () => {
      this.close();
    });
  }

  send(message: MessageData): void {
    let serializedMessage = "";
    try {
      serializedMessage = JSON.stringify(message);
    } catch (error) {
      // Serialization failed
    }
    this.socket?.send(serializedMessage);
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

  unlisten(eventType: string, listener: MessageListener): void {
    if (this.listenMap[eventType]) {
      const index = this.listenMap[eventType].indexOf(listener);
      if (index !== -1) {
        this.listenMap[eventType].splice(index, 1);
      }
    }
  }

  private emit(message: WebSocketMessage): void {
    const { type, data } = message;
    const listeners = this.listenMap[type];
    
    if (listeners) {
      [...listeners].forEach((listener) => {
        listener?.(data, type);
      });
    }
  }

  private async getToken(): Promise<TokenResponse> {
    try {
      return await (window as any).HSCore.API.getWebsocketToken();
    } catch (error) {
      return { token: null };
    }
  }

  private connect(token: string): void {
    this.close();
    this.status = "opening";

    const wsBaseUrl = (window as any).HSApp.Config.WS_NOTIFICATION_3D;
    const wsUrl = `${wsBaseUrl}/websocket/common/${token}`;

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
        if (event.data === "pang") {
          return;
        }

        const message: WebSocketMessage = JSON.parse(event.data);
        
        if (message.type === "message" && message.data?.message === "连接成功") {
          this.connectCount = 0;
          this.heart.reset(this.socket).start();
          this.connectSignal.dispatch({
            socket: this.socket,
            messageCenter: this
          });
        }

        this.emit(message);
      } catch (error) {
        // Message parsing failed
      }
    };
  }

  private reopen(): void {
    this.close();
    
    setTimeout(() => {
      this.connectCount++;
      
      if (this.connectCount > MAX_RECONNECT_ATTEMPTS) {
        (window as any).HSApp.Logger.errorLogger.push("message-websockt-error", {
          description: "message中心websocket连接失败"
        }, {});
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