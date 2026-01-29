interface UpdateParams {
  currentValue: number;
  maxValue: number;
}

let minValue: number;
let maxValue: number;
let canvasContext: CanvasRenderingContext2D;
let backgroundColor: string;
let textColor: string;
let formatValue: (value: number) => string;
let unit: string;
let canvasWidth: number;
let canvasHeight: number;
let textX: number;
let textY: number;
let graphImage: HTMLImageElement | HTMLCanvasElement;
let graphX: number;
let barWidth: number;
let graphWidth: number;
let graphHeight: number;

function update(currentValue: number, maxValue: number): void {
  minValue = Math.min(minValue, currentValue);
  maxValue = Math.max(maxValue, currentValue);
  
  canvasContext.fillStyle = backgroundColor;
  canvasContext.globalAlpha = 1;
  canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
  
  canvasContext.fillStyle = textColor;
  canvasContext.fillText(
    `${formatValue(currentValue)} ${unit} (${formatValue(minValue)}-${formatValue(maxValue)})`,
    textX,
    textY
  );
  
  canvasContext.drawImage(
    graphImage,
    graphX + barWidth,
    canvasHeight,
    graphWidth - barWidth,
    graphHeight,
    graphX,
    canvasHeight,
    graphWidth - barWidth,
    graphHeight
  );
  
  canvasContext.fillRect(graphX + graphWidth - barWidth, canvasHeight, barWidth, graphHeight);
  
  canvasContext.fillStyle = backgroundColor;
  canvasContext.globalAlpha = 0.9;
  canvasContext.fillRect(
    graphX + graphWidth - barWidth,
    canvasHeight,
    barWidth,
    formatValue((1 - currentValue / maxValue) * graphHeight)
  );
}