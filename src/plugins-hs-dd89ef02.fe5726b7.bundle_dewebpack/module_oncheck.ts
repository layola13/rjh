interface DataHandlerConfig {
  digits: number;
}

function setDigitsHandler(e: boolean): void {
  n.setDataHandler({
    digits: e ? -1 : 0
  });
}