interface CSSExports {
  push(item: [string, string, string]): void;
}

const cssModule = (moduleId: string, cssLoaderModule: (hot: boolean) => CSSExports, assetLoader: (path: string) => string): CSSExports => {
  const iconPath1 = assetLoader(/* asset ID */ "202479");
  const iconPath2 = assetLoader(/* asset ID */ "88166");

  const cssContent = `
.toggle-catalog-sidebar {
  position: absolute;
  pointer-events: none;
  height: 110vh;
  width: 340px;
  background: linear-gradient(to right, rgba(245, 245, 245, 0.9) 20%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0));
  z-index: 100;
}

.toggle-catalog-sidebar-container-hide .toggle-catalog-sidebar {
  width: 80px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.7) 20%, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
}

.catalogLibContainer .hsc-menu-container {
  background: unset;
  backdrop-filter: unset;
}

#header header.in-default-env {
  background: unset !important;
}

.btn-content-folded {
  transition: all 0.3s;
  height: 264px;
  background-image: url(${iconPath1}), url(${iconPath2});
}
`;

  const exports = cssLoaderModule(false);
  exports.push([moduleId, cssContent, ""]);
  
  return exports;
};

export default cssModule;