interface ResourceManager {
  injectSVGImage(element: SVGElement | HTMLElement): void;
}

declare const ResourceManager: ResourceManager;

function moduleRef(element: SVGElement | HTMLElement): void {
  ResourceManager.injectSVGImage(element);
}

export default moduleRef;