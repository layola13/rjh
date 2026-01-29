interface CssExports {
  push(item: [string, string]): void;
}

const cssModule = (moduleId: string, cssLoaderFactory: (sourceMap: boolean) => CssExports, assetLoader: (path: string) => string): CssExports => {
  const checkIconUrl = assetLoader('./assets/check-icon.png');
  
  const styles = `
.viewdrop {
  position: relative;
}

.viewdrop .hide {
  display: none;
}

.viewdiv {
  margin: 0;
  border-right: solid 1px #ccc;
  padding: 3px 6px;
}

.viewdiv .viewbutton {
  height: 26px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  margin: 0pc 10px 0px 10px;
}

.viewdiv .viewp {
  font-size: 13px;
  line-height: 26px;
  background-color: rgba(85, 172, 238, 0.15);
  color: #444b52;
  padding: 0 0 0 5px;
}

.viewdiv .viewp .viewspan {
  display: inline-block;
  min-width: 84px;
}

.viewdiv .viewp .viewright {
  display: inline-block;
  border-left: 1px solid #ccc;
  background-color: #e4e4e4;
  padding: 0 2px;
}

.viewdiv .viewp .viewright .viewcaret {
  display: inline-block;
  width: 0;
  height: 0;
  vertical-align: middle;
  border-bottom: 3px dashed;
  border-right: 3px solid transparent;
  border-left: 3px solid transparent;
}

.viewul {
  display: block;
  position: absolute;
  top: -78px;
  width: 130px;
  padding: 4px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: left;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  background-color: #fafafa;
  z-index: 1000;
}

.viewul .viewli {
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  cursor: pointer;
  padding-left: 18px;
  position: relative;
}

.viewul .viewli:hover {
  background-color: rgba(85, 172, 238, 0.15);
}

.viewul .viewli .viewsel {
  height: 12px;
  width: 12px;
  background: url(${checkIconUrl}) no-repeat center center;
  background-size: 100%;
  position: absolute;
  left: 4px;
  top: 5px;
}
`;

  const cssExports = cssLoaderFactory(false);
  cssExports.push([moduleId, styles]);
  
  return cssExports;
};

export default cssModule;