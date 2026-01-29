interface CSSModule {
  push(data: [string, string, string]): void;
}

interface ModuleExports {
  id: string;
  exports: CSSModule;
}

const cssContent = `.ai-material-content-col {
  border-radius: 16px;
  min-height: 750px;
  height: -moz-max-content;
  height: max-content;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: white;
}

.ai-material-content-col .hidden {
  display: none;
}

.ai-material-content-col.mobile {
  min-height: unset;
}

.ai-material-content-col .content-box {
  position: relative;
  padding-bottom: 36px;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.ai-material-content-col .flex-c-c {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.ai-material-content-col .step {
  color: #1c1c1c;
  font-family: AlibabaSans-HeavyItalic !important;
  font-size: 20px;
  line-height: 20px;
  margin-right: 11px;
  height: 21px;
  white-space: nowrap;
  display: inline-block;
}

.ai-material-content-col .ant-upload {
  display: block;
}

.ai-material-content-col .scroll-height {
  height: 120px;
  margin-bottom: 22px;
}

.ai-material-content-col .scroll-height .scroll-list-wrap .tag-item {
  width: 80px;
}

.ai-material-content-col .scroll-height .act-wrap .left {
  width: 56px;
  left: -18px;
  padding-left: 14px;
}

.ai-material-content-col .scroll-height .act-wrap .left.right {
  right: -18px;
  left: inherit;
}

.ai-material-content-col .scroll-height .act-wrap .left .btn {
  width: 24px;
  height: 24px;
  line-height: 20px;
  border: 0;
  margin-top: -26px;
}

.ai-material-content-col .form-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
  position: relative;
}

.ai-material-content-col .form-block .form-label {
  font-size: 16px;
  color: #1c1c1c;
  line-height: 16px;
  width: 120px;
}

.ai-material-content-col .form-block .form-input {
  width: 254px;
}

.ai-material-content-col .form-block .form-input.form-input-error .el-input__inner {
  border-color: #ff2e2e;
}

.ai-material-content-col .form-block .form-input.form-input-error .el-input__inner:focus {
  border-color: #ff2e2e;
}

.ai-material-content-col .form-block .form-input .el-input__inner {
  color: #1c1c1c;
}

.ai-material-content-col .form-block .form-input.is-active .el-input__inner,
.ai-material-content-col .form-block .form-input .el-input__inner:focus {
  border-color: #1c1c1c;
}

.ai-material-content-col .form-block .form-select {
  width: 120px;
}

.ai-material-content-col .form-block .form-select .el-input__inner {
  color: #1c1c1c;
}

.ai-material-content-col .form-block .form-unit {
  font-size: 16px;
  line-height: 40px;
  color: #1c1c1c;
  padding-right: 7px;
}

.ai-material-content-col .dimension-form {
  margin-bottom: 36px;
}

.ai-material-content-col .dimension-form .dimension-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  position: relative;
}

.ai-material-content-col .dimension-form .dimension-row .dimension-label {
  font-size: 16px;
  color: #1c1c1c;
  line-height: 16px;
  min-width: 60px;
  margin-right: 16px;
}

.ai-material-content-col .dimension-form .dimension-row .dimension-input-wrapper {
  flex: 1;
  max-width: 280px;
  position: relative;
  display: flex;
}

.ai-material-content-col .dimension-form .dimension-row .dimension-input-wrapper .dimension-input {
  flex: 1;
  border-radius: 6px;
  box-shadow: unset;
}

.ai-material-content-col .dimension-form .dimension-row .dimension-input-wrapper .dimension-input:hover {
  border-color: #1c1c1c;
}

.ai-material-content-col .dimension-form .dimension-row .dimension-input-wrapper .dimension-input:focus {
  border-color: #1c1c1c;
  box-shadow: none;
  outline: none;
}

.ai-material-content-col .dimension-form .dimension-row .dimension-input-wrapper .dimension-input.input-error {
  border-color: #ff2e2e;
}

.ai-material-content-col .dimension-form .dimension-row .dimension-input-wrapper .dimension-input.input-error:hover {
  border-color: #ff2e2e !important;
}

.ai-material-content-col .dimension-form .dimension-row .dimension-input-wrapper .dimension-input.input-error:focus {
  border-color: #ff2e2e !important;
}

.ai-material-content-col .dimension-form .dimension-row .dimension-input-wrapper .dimension-input .dimension-unit {
  font-size: 16px;
  color: #1c1c1c;
  font-weight: normal;
}

.ai-material-content-col .dimension-form .dimension-row .dimension-input-wrapper .dimension-error {
  position: absolute;
  font-size: 14px;
  color: #ff2e2e;
  line-height: 16px;
  top: 35px;
  white-space: nowrap;
  right: 0;
}

.ai-material-content-col .form-block-error {
  width: 100%;
  position: absolute;
  font-size: 14px;
  line-height: 16px;
  color: #ff2e2e;
  font-family: AlibabaSans-Regular !important;
}

.ai-material-content-col .form-block-error.form-error-right {
  width: 254px;
}

.ai-material-content-col .form-block-error .icon-zhuyi::before {
  content: '\\e9e';
  color: #ff2e2e;
  font-size: 12px;
  margin-right: 4px;
}

.ai-material-content-col .buy-more {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: AlibabaSans-HeavyItalic !important;
  font-size: 16px;
  color: #1c1c1c;
  line-height: 24px;
  margin-top: 24px;
}

.ai-material-content-col .buy-more .logo {
  width: 30px;
  margin-right: 5px;
}

.ai-material-content-col .buy-more .icon-into::before {
  margin-left: 10px;
  font-size: 20px;
}

.ai-material-content-col .generate-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  position: absolute;
  bottom: 24px;
  width: 100%;
}

.ai-material-content-col .generate-footer.mobile {
  position: unset;
  margin: auto;
}

.ai-material-content-col .generate-footer .generate-cost-tips {
  width: 100%;
  color: #60646f;
  font-size: 14px;
  text-align: center;
}

.ai-material-content-col .generate-button {
  text-align: center;
  width: 100%;
  max-width: 510px;
  font-family: AlibabaSans-Bold !important;
  background-color: #1c1c1c;
  border-radius: 32px;
  line-height: 22px;
  color: #fff;
  height: 50px;
  font-size: 20px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-material-content-col .generate-button .free-trial-badge {
  background-color: #5DFFB9;
  font-size: 14px;
  font-family: AlibabaSans-Bold !important;
  color: #000;
  border-radius: 4px;
  white-space: nowrap;
  position: absolute;
  top: -11px;
  right: 0;
  height: 24px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  padding: 3px 5px 3px 3px;
}

.ai-material-content-col .generate-button .free-trial-badge .free-trial-count {
  background-color: #000;
  color: #FFFFFF;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
}

.ai-material-content-col .generate-button span {
  white-space: initial;
  font-family: AlibabaSans-Bold !important;
}

.ai-material-content-col .generate-button.is-disabled {
  background-color: rgba(28, 28, 28, 0.4);
  cursor: not-allowed;
}

.ai-material-content-col .generate-button.is-disabled .anticon {
  animation: rotate 0.6s linear infinite;
}

.ai-material-content-col .generate-button.is-disabled:hover {
  background-color: rgba(28, 28, 28, 0.4);
  transform: none;
}

.ai-material-content-col .generate-button .icon-into::before {
  color: #fff;
  font-size: 18px;
  margin-left: 8px;
}

.ai-material-content-col .text-center {
  text-align: center;
}

.ai-material-content-col .upload-img {
  width: 40px;
  margin-bottom: 10px;
}

.ai-material-content-col .dimension-title,
.ai-material-content-col .upload-title {
  font-family: AlibabaSans-Medium !important;
  padding-top: 2px;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.ai-material-content-col .upload-wrap {
  width: 100%;
  height: 200px;
  border: 1px dashed #696969;
  border-radius: 16px;
  font-family: AlibabaSans-Medium !important;
  cursor: pointer;
  position: relative;
  text-align: center;
  font-size: 14px;
  color: rgba(28, 28, 28, 0.6);
  line-height: 14px;
  background-image: url('https://prod-hsm-designs.oss-accelerate.aliyuncs.com/staging/upload/images/40ec4442-8708-4513-b459-982892da4962.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.ai-material-content-col .upload-wrap > span:first-child {
  width: 100%;
  height: 100%;
  display: block;
}

.ai-material-content-col .upload-wrap .upload-card .upload-icon {
  width: 64px;
  height: 64px;
}

.ai-material-content-col .upload-wrap .ant-upload.ant-upload-drag {
  border: unset;
}

.ai-material-content-col .upload-wrap .ant-upload.ant-upload-drag:hover {
  border-color: unset;
}

.ai-material-content-col .upload-wrap .icon-close::before {
  content: '\\e887';
  position: absolute;
  font-size: 25px;
  right: 8px;
  top: 9px;
  z-index: 111;
}

.ai-material-content-col .upload-wrap:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.ai-material-content-col .upload-wrap .upload-card {
  background-color: rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 140px;
  background-image: url('https://prod-hsm-designs.oss-accelerate.aliyuncs.com/staging/upload/images/40ec4442-8708-4513-b459-982892da4962.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
}

.ai-material-content-col .upload-wrap .image-preview-wrapper {
  width: 100%;
  height: 100%;
}

.ai-material-content-col .upload-wrap .image-preview-wrapper .img {
  width: 100%;
  height: 100%;
  -o-object-fit: contain;
  object-fit: contain;
}

.ai-material-content-col .upload-wrap .image-preview-wrapper .close-wrapper {
  position: absolute;
  right: 12px;
  top: 12px;
  width: 25px;
  height: 25px;
  background-color: rgba(0, 0, 0);
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-material-content-col .upload-wrap .image-preview-wrapper .close-wrapper .close-icon {
  width: 12px;
  height: 12px;
  font-size: 12px;
  border-radius: 6px;
  color: #fff;
}

.ai-material-content-col .upload-wrap .image-preview-wrapper .manual-crop-button-wrapper {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.ai-material-content-col .upload-wrap .image-preview-wrapper .manual-crop-button-wrapper .manual-crop-button {
  border-radius: 16px;
  color: #33353B;
  font-size: 14px;
  padding: 7px 14px;
  height: 28px;
  line-height: 1;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
  white-space: nowrap;
}

.ai-material-content-col .upload-wrap .image-preview-wrapper .manual-crop-button-wrapper .manual-crop-button .manual-crop-icon {
  margin-right: 4px;
}

.ai-material-content-col .upload-wrap .upload-ipad-img {
  vertical-align: middle;
  display: inline-block;
  position: relative;
  z-index: 1;
  margin-left: -80px;
  width: inherit;
  max-width: 100%;
  height: 100%;
  margin-left: 0;
  -o-object-fit: contain;
  object-fit: contain;
}

.ai-material-content-col .upload-wrap .upload-card {
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  border-radius: 16px;
}

.ai-material-content-col .upload-wrap .upload-img-del::before {
  content: '\\e93a';
  font-size: 25px;
  position: absolute;
  right: 13px;
  top: 13px;
}

.ai-material-content-col .album-empty {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.ai-material-content-col .album-empty > img {
  width: 560px;
  height: 400px;
}`;

export const styles = cssContent;