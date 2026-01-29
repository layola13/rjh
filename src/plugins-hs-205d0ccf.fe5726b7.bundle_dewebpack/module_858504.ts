interface CSSExports {
  push(data: [string, string, string]): void;
}

interface CSSLoaderModule {
  (sourceMap: boolean): CSSExports;
}

interface ModuleExports {
  id: string;
  exports: CSSExports;
}

const cssContent = `
.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content {
  width: 900px;
  height: 550px;
  padding: 22px 0 0;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 40px 0 40px;
  box-sizing: border-box;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-top-element-container .preview-title {
  display: flex;
  align-items: center;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-top-element-container .preview-title .status-success {
  display: flex;
  background-color: #C8F0E9;
  width: 96px;
  height: 28px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  gap: 4px;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-top-element-container .preview-title .status-success .status-text {
  color: #33353B;
  font-family: AlibabaPuHuiTi_2_85_Bold !important;
  font-size: 14px;
  font-weight: bold;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-top-element-container .preview-title .status-error {
  display: flex;
  background-color: #F9CEC7;
  width: 110px;
  height: 28px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  gap: 4px;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-top-element-container .preview-title .status-error .status-text {
  color: #33353B;
  font-family: AlibabaPuHuiTi_2_85_Bold !important;
  font-size: 14px;
  font-weight: bold;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-top-element-container .preview-title .check-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #52c41a;
  color: white;
  border-radius: 50%;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-top-element-container .preview-title .error-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff4d4f;
  color: white;
  border-radius: 50%;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-top-element-container .preview-title .area-text {
  margin-left: 10px;
  font-family: AlibabaPuHuiTi_2_85_Bold !important;
  font-weight: bold;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding-top: 0px;
  padding-bottom: 0px;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-content .valid-area-preview-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-content .valid-area-preview-content .preview-content {
  flex: 1;
  align-items: center;
  padding: 20px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #EBEDF2;
  border-radius: 8px;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-content .valid-area-preview-content .preview-content img {
  width: 100%;
  height: 100%;
  -o-object-fit: contain;
  object-fit: contain;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-content .valid-area-preview-content .preview-footer {
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-content .valid-area-preview-content .preview-footer .legend {
  display: flex;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-content .valid-area-preview-content .preview-footer .legend .legend-item {
  display: flex;
  align-items: center;
  margin-right: 40px;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-content .valid-area-preview-content .preview-footer .legend .legend-item .color-block {
  width: 16px;
  height: 16px;
  margin-right: 6px;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-content .valid-area-preview-content .preview-footer .legend .legend-item .color-block.valid {
  background: #BAD1FF;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-content .valid-area-preview-content .preview-footer .legend .legend-item .color-block.invalid {
  background: #FFC4B8;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-content .valid-area-preview-content .preview-footer .buttons {
  display: flex;
  justify-content: flex-end;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-content .valid-area-preview-content .preview-footer .buttons .download-btn {
  width: 146px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  cursor: pointer;
  background: #F2F2F2;
  color: #000;
  font-size: 16px;
  font-family: AlibabaPuHuiTi_2_85_Bold !important;
  font-weight: bold;
  margin-right: 12px;
  gap: 7px;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-content .valid-area-preview-content .preview-footer .buttons .download-btn:hover {
  background: #DADADA;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-content .valid-area-preview-content .preview-footer .buttons .confirm-btn {
  width: 146px;
  height: 42px;
  border-radius: 20px;
  cursor: pointer;
  background: #396EFE;
  color: white;
  font-size: 16px;
  font-family: AlibabaPuHuiTi_2_85_Bold !important;
  font-weight: bold;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-content .valid-area-preview-content .preview-footer .buttons .confirm-btn:hover {
  background: #305DD7;
}

.valid-area-preview-modal .homestyler-ui-components.homestyler-modal-content-wrapper .homestyler-modal-content-wrapper-content .homestyler-modal-outer .homestyler-modal-bottom-container {
  margin-top: 0;
}
`;

export function initializeStyleModule(
  moduleExports: ModuleExports,
  cssLoader: CSSLoaderModule
): void {
  const styleExports = cssLoader(false);
  styleExports.push([moduleExports.id, cssContent, ""]);
  moduleExports.exports = styleExports;
}

export default cssContent;