function isImageLoadedOrNotImgTag(this: { isImageLoaded: boolean; imageRef: HTMLElement | null }): boolean {
  return this.isImageLoaded || (this.imageRef !== null && this.imageRef.tagName !== "IMG");
}