function handleImageError(event: Event): void {
  const target = event.target as HTMLImageElement;
  target.onerror = null;
  target.src = `${CONFIG.RES_BASEPATH}v2/image/logo/cateloglargeviewlogo.png`;
}

const CONFIG = {
  RES_BASEPATH: ''
};