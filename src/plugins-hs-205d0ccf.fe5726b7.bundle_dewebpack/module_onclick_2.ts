interface ClickHandlerOptions {
  callback?: () => void;
}

function onClick(event: Event, options: ClickHandlerOptions): void {
  if (options.callback) {
    options.callback();
  }
  event.stopPropagation();
}