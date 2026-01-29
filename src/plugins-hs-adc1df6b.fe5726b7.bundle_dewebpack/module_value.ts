interface DrawLineConfig {
  context: CanvasRenderingContext2D;
  displayLayers: {
    temp: HTMLCanvasElement | CanvasRenderingContext2D;
  };
}

function createDrawLine(config: DrawLineConfig): DrawLine {
  return new DrawLine(
    config.context,
    config.displayLayers.temp,
    this,
    false
  );
}