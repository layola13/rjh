interface CssExport {
  push(item: [string, string]): void;
}

interface WebpackModule {
  id: string;
  exports: CssExport;
}

interface WebpackRequire {
  (moduleId: number): (isSourceMap: boolean) => CssExport;
}

export default function (
  module: WebpackModule,
  _exports: unknown,
  require: WebpackRequire
): void {
  const cssContent = `
.curtain_complete_button .btn-default {
  width: 36px;
  height: 20px;
  background-color: #237ab9;
  border-color: #2e6da4;
  color: #FFF;
}

.curtain_complete_button .btn-default:hover {
  color: #FFF;
  background-color: #36a1f0;
  border-color: #204d74;
}

.curtain_cancel_button .btn-default {
  width: 36px;
  height: 20px;
  background-color: #fff;
  border-color: #ccc;
  color: #333;
}

.curtain_cancel_button .btn-default:hover {
  color: #333;
  background-color: #e6e6e6;
  border-color: #adadad;
}

.rightpropertybar .curtain_thirdRow {
  margin-top: 9px;
}

.rightpropertybar .curtain_loopTop {
  margin-top: 9px;
}

.rightpropertybar .curtain_loopBottom {
  margin-top: 9px;
}

.rightpropertybar .curtain_screenTop {
  margin-top: 9px;
}

.rightpropertybar .curtain_screenBottom {
  margin-top: 9px;
}

.rightpropertybar .curtain_railTop {
  margin-top: 9px;
}

.rightpropertybar .curtain_railBottom {
  margin-top: 9px;
}
`;

  const cssExporter = require(986380)(false);
  module.exports = cssExporter;
  cssExporter.push([module.id, cssContent, '']);
}