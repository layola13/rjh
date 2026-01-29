const styles = `
.camera-clip .title {
  margin: 0 16px;
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.14);
}

.camera-clip .title span {
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
}

.camera-clip .title .hs-iconfont-view {
  margin-left: 4px;
}

.camera-clip .title .camera-clip-switch {
  margin-left: 10px;
  background: #396efe;
  width: 30px;
  min-width: 30px;
  height: 17px;
  line-height: 17px;
}

.camera-clip .title .camera-clip-switch .ant-switch-handle {
  width: 13px;
  height: 13px;
}

.camera-clip .title .camera-clip-switch .ant-switch-handle::before {
  background: rgba(255, 255, 255, 0.9);
}

.camera-clip .title .ant-switch-checked .ant-switch-handle {
  left: calc(100% - 13px - 2px);
}

.camera-clip .title .ant-switch-checked:focus {
  box-shadow: none;
}

.camera-clip .content {
  margin: 0 16px 8px 16px;
}

.camera-clip .content .camera-clip-slider-container {
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
}

.camera-clip .content .camera-clip-slider-container .homestyler-ui-components.ant-slider .ant-slider-step {
  background: #6B6C6D !important;
  border-radius: 1.5px !important;
}

.camera-clip .content .camera-clip-slider-container .ant-slider-handle {
  background: #2B2C2E !important;
  box-shadow: none !important;
  border: 2px solid #396EFE !important;
}

.camera-clip .content .camera-clip-slider-container .ant-slider-handle::before {
  border: 2px solid #2B2C2E !important;
  border-radius: 50% !important;
}

.disable-clip .ant-switch {
  background: rgba(255, 255, 255, 0.2) !important;
}

.disable-clip .content .slide-name {
  color: #78787D;
}

.camera-clip-slider .ant-slider {
  width: 128px;
  margin-left: 0;
  margin-bottom: 0;
}

.camera-clip-slider .ant-slider:hover .ant-slider-track {
  background-color: #396EFE;
}

.camera-clip-slider .ant-slider .ant-slider-rail {
  background-color: rgba(255, 255, 255, 0.1);
}

.camera-clip-slider .ant-slider .ant-slider-step {
  background: transparent;
}

.camera-clip-slider .ant-slider .ant-slider-handle {
  background: #2b2c2e;
}

.camera-clip-slider .ant-slider .ant-slider-handle::before {
  border-color: #2b2c2e;
}
`;

export default styles;