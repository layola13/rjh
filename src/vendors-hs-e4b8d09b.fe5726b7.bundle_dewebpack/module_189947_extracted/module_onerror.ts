interface ErrorEvent extends Event {
  target: HTMLImageElement;
}

function handleImageError(e: ErrorEvent): void {
  e.target.onerror = null;
  e.target.src = `${ie.Config.RES_BASEPATH}v2/image/logo/cateloglargeviewlogo.png`;
}