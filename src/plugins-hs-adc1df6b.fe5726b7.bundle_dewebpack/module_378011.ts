const cssContent = `.btn {
  border-radius: 2px;
  padding: 4px 7px;
  margin: 0 5px;
}
.btn.btn-primary {
  background: #4d9bd6;
}
.btn.btn-primary:hover {
  background: #4d9bd6;
}
.btn.btn-default {
  background: #fff;
  border: solid 1px #d9dbdf;
}
.btn.btn-default:hover {
  background: #fff;
  border: solid 1px #4d9bd6;
}
.modalCover {
  position: fixed;
  left: 0px;
  top: 0px;
  display: block;
  border: 0px;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  cursor: auto;
}
.hs-pictureView .img {
  position: absolute;
  display: block;
  margin: auto;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  padding: 0px;
  border-radius: 0px;
  z-index: 1;
}
.hs-pictureView .maskBkg {
  background-color: rgba(128, 128, 128, 0.28);
  opacity: 1;
  position: absolute;
  display: block;
  margin: auto;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  padding: 0px;
  border-radius: 0px;
  z-index: 2;
}
.hs-pictureView .maskBkg .loadingMaskSymbol {
  display: block;
  position: absolute;
  margin: auto;
  width: 50%;
  height: 50%;
  padding: 0;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  animation: rotateit 1.1s linear infinite;
}
.hs-pictureView .maskBkg .errorMaskSymbol {
  display: block;
  position: absolute;
  margin: auto;
  width: 50%;
  height: 50%;
  padding: 0;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
}
.popupcontainer .mygroup-dialog .md-overlay {
  z-index: 3002;
}
.popupcontainer .mygroup-dialog .popupwindows {
  border-radius: 8px;
  box-shadow: 0px 4px 16px 0px rgba(25, 25, 30, 0.15);
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper {
  border-radius: 8px;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowHeader {
  display: flex;
  align-items: center;
  padding: 15px 30px 20px;
  border-bottom: unset;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowHeader .title {
  line-height: 20px;
  color: #33353b;
  font-weight: bold;
  font-size: 20px;
  text-align: left;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowHeader .closeBtn {
  position: absolute;
  top: 14px;
  right: 14px;
  height: 14px;
  width: 14px;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowHeader .closeBtn:hover svg path {
  fill: #327dff;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents {
  border-radius: 8px;
  background: #fff;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform {
  padding-left: 30px;
}
@media screen {
  .popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform {
    max-height: 500px;
  }
}
@media screen and (max-height: 600px) {
  .popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform {
    max-height: 500px;
  }
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row {
  display: flex;
  margin-bottom: 30px;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row .form-label {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 4em;
  margin-right: 20px;
  font-size: 14px;
  color: #60646F;
  position: relative;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row input:focus,
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row button:focus {
  border: 0.5px solid #327dff;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row input,
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row button {
  width: 358px;
  height: 32px;
  border: 0.5px solid #D4D7E1;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: none;
  text-indent: 10px;
  color: #19191e;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row input::-webkit-input-placeholder,
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row button::-webkit-input-placeholder {
  color: #D4D7E1;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row input:-moz-placeholder,
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row button:-moz-placeholder {
  color: #D4D7E1;
  opacity: 1;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row input::-moz-placeholder,
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row button::-moz-placeholder {
  color: #D4D7E1;
  opacity: 1;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row input:-ms-input-placeholder,
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row button:-ms-input-placeholder {
  color: #D4D7E1;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row input.error,
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row button.error {
  border: 0.5px solid #EB5D46;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-row button {
  text-indent: 12px;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-title .form-label {
  top: -7px;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-title .form-label .label-required {
  color: #EB5D46;
  margin-right: 4px;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-title .form-row-content .design-name-length {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  color: #9B9FAB;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-title .form-row-content .error-hints {
  color: #EB5D46;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-upload .form-row-content {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-upload .form-row-content .upload-zone {
  cursor: pointer;
  width: 100px;
  height: 100px;
  position: relative;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-upload .form-row-content .upload-zone .hs-pictureView {
  width: 100%;
  height: 100%;
  background-color: #f2f1f8;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-upload .form-row-content .upload-zone .hs-pictureView img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-upload .form-row-content .upload-zone .hs-pictureView .maskBkg {
  background-color: #1c1c1c;
  opacity: 0.7;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-upload .form-row-content .upload-zone .hs-pictureView .maskBkg .hs-iconfont-view {
  width: 25%;
  height: 25%;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-upload .form-row-content .upload-zone .upload-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #D8D8D8;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-upload .form-row-content .upload-actions {
  margin-left: 9px;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-upload .form-row-content .upload-actions .upload-tips {
  margin-bottom: 6px;
  color: #9B9FAB;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-upload .form-row-content .upload-actions .restore {
  color: #396efe;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .mainfields .form-upload .form-row-content .upload-actions .restore.disabled {
  color: #999999;
  cursor: default;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .actionbuttons {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-right: 30px;
  margin-top: 7px;
  float: right;
  cursor: pointer;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .actionbuttons .cancel-design {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: unset;
  color: #33353b;
  width: 100px;
  height: 36px;
  font-size: 13px;
  font-weight: bold;
  border-radius: 30px;
  background: #f2f2f2;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .actionbuttons .cancel-design:hover {
  color: #396efe;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .actionbuttons .save-design {
  margin-left: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 36px;
  font-size: 13px;
  font-weight: bold;
  border-radius: 30px;
  color: #FFFFFF;
  background: #396efe;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .actionbuttons .save-design:hover {
  background: #305dd7;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform .actionbuttons .save-design.disabled {
  opacity: 0.3;
  cursor: default;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform input.focus,
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform input:focus,
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform textarea.focus,
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform textarea:focus {
  border-color: #4d9bd6;
  color: #343a40;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform input:disabled,
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform select:disabled,
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform textarea:disabled {
  border-color: #e6e6e6;
}
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform input.error,
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform select.error,
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform textarea.error,
.popupcontainer .mygroup-dialog .popupwindows .windowWrapper .windowContents .designform button.error {
  border-color: #EB5D46;
}`;

export default cssContent;