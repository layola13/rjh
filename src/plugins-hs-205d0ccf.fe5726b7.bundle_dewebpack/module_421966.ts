interface CSSModule {
  id: string;
  push: (data: [string, string, string]) => void;
}

interface CSSLoaderFunction {
  (sourceMap: boolean): CSSModule;
}

interface RequireFunction {
  (moduleId: number): any;
}

const cssLoaderRequire: RequireFunction = (moduleId: number): any => {
  // This would be resolved by the module system
  throw new Error(`Module ${moduleId} should be provided by the build system`);
};

const getAssetUrl = (assetPath: string): string => {
  // Asset URL resolver - in production this would return the processed asset path
  return assetPath;
};

const LIGHT_THEME_ASSET_ID = 651055;
const DARK_THEME_ASSET_ID = 651055;

const userGuideStyles = `
.user-guide {
  padding: 0 15px;
  margin-bottom: 10px;
}

.user-guide-item {
  width: 264px;
  height: 40px;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  line-height: 40px;
  background-size: cover;
  font-weight: bold;
}

.user-guide-item .text {
  font-family: AlibabaPuHuiTi-Bold !important;
  font-size: 16px;
  transform: skew(-12deg);
  display: inline-block;
}

.user-guide-item .teaching-iconfont {
  position: absolute;
  top: 14px;
  left: 236px;
  transition: 0.5s;
}

.user-guide-item:hover .teaching-iconfont {
  transform: translateX(6px);
}

.user-guide.teaching-light {
  color: #000000;
}

.user-guide.teaching-light .text {
  color: #33353b;
}

.user-guide.teaching-light .user-guide-item {
  background-image: url(${getAssetUrl('light-theme-bg.png')});
}

.user-guide.teaching-light .user-guide-item .teaching-light:hover {
  color: #33353b;
}

.user-guide.teaching-black {
  color: #fff;
}

.user-guide.teaching-black .text {
  color: #fff;
}

.user-guide.teaching-black .user-guide-item {
  background-image: url(${getAssetUrl('dark-theme-bg.png')});
}

.user-guide.teaching-black .user-guide-item .teaching-black:hover {
  color: #fff;
}
`;

export default userGuideStyles;