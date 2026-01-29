import { Signal } from './Signal';
import { EntityTransactionType } from './EntityTransactionType';

interface ComposeSpec {
  type?: string;
  data?: unknown;
}

interface Message {
  msg: string;
  param?: unknown;
  async?: boolean;
}

interface ComposedEventData {
  composedRequest: Request;
  otherRequest: Request;
}

interface TransactionOptions {
  [key: string]: unknown;
}

export class Request {
  public type: string = "";
  public isCommitted: boolean = false;
  public result: unknown = undefined;
  public args: unknown[] = [];
  public messages: Message[] = [];
  public signalComposed: Signal<ComposedEventData>;

  constructor() {
    this.signalComposed = new Signal(this);
  }

  public activate(): void {
    this.onActivate();
  }

  protected onActivate(): void {}

  public abort(): void {
    this.onAbort();
    this.messages = [];
  }

  public commit(): unknown {
    this.onPreCommit();
    this.result = this.onCommit();
    this.onPostCommit();
    this.isCommitted = true;
    this.messages = [];
    return this.result;
  }

  public async commitAsync(): Promise<unknown> {
    await this.onPreCommitAsync();
    this.result = await this.onCommitAsync();
    await this.onPostCommitAsync();
    this.isCommitted = true;
    return this.result;
  }

  public dispose(): void {}

  public undo(): void {
    this.onUndo();
  }

  public redo(): void {
    this.onRedo();
  }

  public compose(otherRequest: Request): boolean {
    let spec = otherRequest.getComposeSpec();
    
    if (!spec.type) {
      spec = {
        type: otherRequest.type,
        data: spec
      };
    }

    const composed = this.onCompose(spec, otherRequest);
    
    if (composed) {
      this.result = otherRequest.result;
      this.signalComposed.dispatch({
        composedRequest: this,
        otherRequest: otherRequest
      });
    }

    return composed;
  }

  public receive(msg: string, param?: unknown): boolean {
    const message: Message = {
      msg: msg,
      param: param
    };
    this.messages.push(message);
    return this.onReceive(msg, param);
  }

  public async receiveAsync(msg: string, param?: unknown): Promise<boolean> {
    const message: Message = {
      msg: msg,
      param: param,
      async: true
    };
    this.messages.push(message);
    return await this.onReceiveAsync(msg, param);
  }

  protected onReceive(msg: string, param?: unknown): boolean {
    return false;
  }

  protected async onReceiveAsync(msg: string, param?: unknown): Promise<boolean> {
    return false;
  }

  protected onAbort(): void {
    this.undo();
  }

  protected onPreCommit(): void {}

  protected onCommit(): unknown {
    return undefined;
  }

  protected onPostCommit(): void {}

  protected async onPreCommitAsync(): Promise<void> {
    this.onPreCommit();
  }

  protected async onCommitAsync(): Promise<unknown> {
    return this.onCommit();
  }

  protected async onPostCommitAsync(): Promise<void> {
    this.onPostCommit();
  }

  protected onUndo(): void {}

  protected onRedo(): void {}

  public static async preCreate(args: unknown[]): Promise<void> {}

  public static stringifyRequestArgs(args: unknown[]): string | undefined {
    return undefined;
  }

  public static async stringifyRequestArgsAsync(args: unknown[]): Promise<string | undefined> {
    return undefined;
  }

  public static parseRequestArgs(argsString: string): unknown[] | undefined {
    return undefined;
  }

  public static async parseRequestArgsAsync(argsString: string): Promise<unknown[] | undefined> {
    return undefined;
  }

  public static stringifyReceiveMsgs(messages: Message[]): string | undefined {
    return undefined;
  }

  public static async stringifyReceiveMsgsAsync(messages: Message[]): Promise<string | undefined> {
    return undefined;
  }

  public static parseReceiveMsgs(msgsString: string): Message[] | undefined {
    return undefined;
  }

  public static async parseReceiveMsgsAsync(msgsString: string): Promise<Message[] | undefined> {
    return undefined;
  }

  public canTransact(): boolean {
    return false;
  }

  public blockSignal(signal: unknown, blocked: boolean): boolean {
    return false;
  }

  public transact(
    entity: unknown,
    description: string = "",
    transactionType: EntityTransactionType = EntityTransactionType.Modification,
    options: TransactionOptions = {}
  ): void {}

  protected onCompose(spec: ComposeSpec, otherRequest: Request): boolean {
    return false;
  }

  public getComposeSpec(): ComposeSpec {
    return this.args || [];
  }

  public getDescription(): string {
    return "";
  }

  public isInteractive(): boolean {
    return false;
  }

  public getCategory(): string {
    return "";
  }
}