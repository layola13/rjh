interface CropData {
  ratio: number;
  w: number;
  h: number;
  l: number;
  t: number;
}

interface CropWindow {
  width: number;
  height: number;
  left: number;
  top: number;
}

function setRatio(this: CropData, targetRatio: number): void {
  let calculatedRatio: number;

  if (targetRatio === -1) {
    this.ratio = targetRatio;
    calculatedRatio = $(window).width() / $(window).height();
  } else if (targetRatio === 1.5) {
    calculatedRatio = $(window).width() / $(window).height();
    this.ratio = calculatedRatio;
  } else {
    this.ratio = targetRatio;
    calculatedRatio = this.ratio;
  }

  const croppingWindow = this.getCroppingWindow(calculatedRatio);
  
  this.w = croppingWindow[0];
  this.h = croppingWindow[1];
  this.l = croppingWindow[2];
  this.t = croppingWindow[3];
  
  this.updateUIByData();
}