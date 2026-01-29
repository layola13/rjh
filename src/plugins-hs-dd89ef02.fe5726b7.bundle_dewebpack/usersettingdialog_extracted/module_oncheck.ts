interface DataHandlerConfig {
  digits: number;
}

interface DataHandler {
  setDataHandler(config: DataHandlerConfig): void;
}

declare const n: DataHandler;

function moduleOnCheck(enabled: boolean): void {
  n.setDataHandler({
    digits: enabled ? -1 : 0
  });
}

export { moduleOnCheck };