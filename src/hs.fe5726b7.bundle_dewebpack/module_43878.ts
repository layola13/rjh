interface CssExport {
  push(item: [string, string, string]): void;
}

const cssLoader: (sourceMap: boolean) => CssExport = require(986380);
const urlLoader: (url: string) => string = require(992716);

const arrowImageLight: string = require(28918);
const arrowImageDark: string = require(42248);

const styles: CssExport = cssLoader(false);

styles.push([
  module.id,
  `.scroll-tip-container {
    position: absolute;
    right: 0;
    bottom: 0;
    pointer-events: all;
    z-index: 100;
  }

  .scroll-tip-container .scroll-tip {
    background: #D5E5FF;
    height: 18px;
    opacity: 0.9;
  }

  .scroll-tip-container .arrow-container {
    position: relative;
    width: 14px;
    height: 18px;
    margin: -18px auto 0 auto;
  }

  .scroll-tip-container .arrow-container .arrow {
    background: url(${urlLoader(arrowImageLight)});
    background-repeat: no-repeat;
    width: 14px;
    height: 10px;
    position: absolute;
    top: 5px;
  }

  .scroll-tip-container.themeClass .scroll-tip {
    background-image: linear-gradient(#5973B0, #334C89);
    opacity: 0.8;
  }

  .scroll-tip-container.themeClass .arrow-container .arrow {
    background: url(${urlLoader(arrowImageDark)});
    background-repeat: no-repeat;
  }`,
  ""
]);

export default styles;