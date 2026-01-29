interface CSSExports {
  push(args: [string, string]): void;
}

const cssContent = `.hotkey-modal {
  position: absolute;
  overflow: hidden;
}

.hotkey-modal.black {
  color: #fff;
}

.hotkey-modal.black .zoom-content {
  background-color: #2b2c2e;
}

.hotkey-modal.black .hotkey-container {
  background-color: #2b2c2e;
}

.hotkey-modal.black .hotkey-container-right-title {
  color: #fff;
}

.hotkey-modal.black .item-box {
  color: #2b2c2e;
}

.hotkey-modal.black .hotkey-container-left .hotkey-container-left-item:hover {
  background-color: #5a5b5d;
  color: #fff;
}

.hotkey-modal.black .hotkey-container-left .selected {
  background-color: #5a5b5d;
  color: font-color;
}

.hotkey-modal.light {
  color: #33353B;
}

.hotkey-modal.light .zoom-content {
  background-color: #fff;
}

.hotkey-modal.light .hotkey-container {
  background-color: #fff;
}

.hotkey-modal.light .hotkey-container-right-title {
  color: #33353B;
}

.hotkey-modal.light .item-box {
  color: #33353B;
}

.hotkey-modal.light .hotkey-container-left .hotkey-container-left-item:hover {
  background-color: #F2F2F2;
  color: #33353B;
}

.hotkey-modal.light .hotkey-container-left .selected {
  background-color: #F2F2F2;
  color: #33353B;
}

.hotkey-modal .hotkey-title {
  font-size: 20px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  margin: 0 20px 10px 18px;
}

.hotkey-modal .hotkey-title .hotkey-title-text {
  font-family: AlibabaPuHuiTi-Bold !important;
  transform: skew(-12deg);
  width: 100%;
  font-size: 17px;
}

.hotkey-modal .hotkey-title .close-icon {
  cursor: pointer;
}

.hotkey-modal .hotkey-container {
  margin: 0 10px;
  display: flex;
  height: 400px;
}

.hotkey-modal .hotkey-container .hotkey-container-left {
  width: 124px;
  overflow: hidden;
}

.hotkey-modal .hotkey-container .hotkey-container-left .red-dot {
  border-radius: 5px;
  width: 5px;
  height: 5px;
  background: #EB5D46;
  margin-top: -10px;
}

.hotkey-modal .hotkey-container .hotkey-container-left .hotkey-container-left-item {
  display: flex;
  align-items: center;
  min-height: 38px;
  line-height: 14px;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
}

.hotkey-modal .hotkey-container .hotkey-container-left .selected {
  font-weight: 500;
}

.hotkey-modal .hotkey-container .hotkey-container-right {
  width: 366px;
  padding: 0 12px;
  overflow-y: auto;
}

.hotkey-modal .hotkey-container .hotkey-container-right .ps__scrollbar-x-rail {
  display: none !important;
}

.hotkey-modal .hotkey-container .hotkey-container-right .hotkey-container-right-card {
  border-radius: 4px;
}

.hotkey-modal .hotkey-container .hotkey-container-right .hotkey-container-right-title {
  font-size: 14px;
  line-height: 40px;
  height: 28px;
  font-weight: 500;
}

.hotkey-modal .hotkey-container .hotkey-container-right .hotkey-container-right-item-wrapper {
  box-shadow: 0 2px 50px 0 rgba(0, 0, 0, 0.03);
  border-radius: 4px;
  margin-top: 12px;
}

.hotkey-modal .hotkey-container .hotkey-container-right .hotkey-container-right-item {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  line-height: 38px;
  height: 38px;
  font-size: 12px;
}

.hotkey-modal .hotkey-container .hotkey-container-right .hotkey-container-right-item > div {
  display: flex;
  align-items: center;
}

.hotkey-modal .hotkey-container .hotkey-container-right .hotkey-container-right-item > div .hotkey-container-right-item-text {
  line-height: 12px;
  display: flex;
  align-items: center;
}

.hotkey-modal .hotkey-container .hotkey-container-right .hotkey-container-right-item > div .new-red-icon {
  height: 14px;
  width: 36px;
  background-color: #EB5D46;
  border-radius: 9px 9px 9px 3px;
  margin: -1px 0 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hotkey-modal .hotkey-container .hotkey-container-right .hotkey-container-right-item > div .new-red-icon .new-red-icon-text {
  height: 12px;
  width: 28px;
  font-family: AlibabaPuHuiTi-Bold !important;
  font-size: 12px;
  color: #FFFFFF !important;
  line-height: 12px;
  font-weight: 500;
}

.hotkey-modal .hotkey-container .hotkey-container-right .hotkey-container-right-item .item-box-wrapper {
  padding: 9px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 4px;
}

.hotkey-modal .hotkey-container .hotkey-container-right .hotkey-container-right-item .item-box-wrapper .item-box {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  text-align: center;
  background: #F5F5F5;
  border: 1px solid #D4D7E1;
  border-radius: 2px;
  background-color: #F5F5F5;
  padding: 0 3px;
  min-width: 20px;
  margin-right: 4px;
}

.hotkey-modal .hotkey-container .hotkey-container-right .hotkey-container-right-item .item-box-wrapper .item-box-add {
  margin-right: 4px;
  width: 10px;
  text-align: center;
}`;

export const styles = cssContent;