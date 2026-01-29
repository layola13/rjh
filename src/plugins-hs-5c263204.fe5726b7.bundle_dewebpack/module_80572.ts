interface CSSExports {
  push(item: [string, string, string]): void;
}

const cssLoader: CSSExports = require('./css-loader-module');
const urlHelper: (url: string) => string = require('./url-helper');

const cssContent: string = `.beginner-steps-dialog .popupwindows {
  border-radius: 12px;
  overflow: hidden;
}
.beginner-steps-dialog .popupwindows.md-show {
  display: block !important;
  z-index: 6000;
  overflow: hidden;
}
.beginner-steps-dialog .popupoverlay {
  z-index: 4100 !important;
}
.beginner-steps-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 900px;
  height: 560px;
  background: #fff;
}
.beginner-steps-header {
  position: relative;
  padding: 30px 25px 20px;
}
.beginner-steps-title {
  font-family: 'AlibabaPuHuiTi-Bold' !important;
  font-size: 36px;
  color: #1C1C1C;
}
.beginner-steps-desc {
  font-size: 16px;
  font-style: italic;
  color: #9EA3A6;
}
.beginner-steps-close {
  position: absolute;
  top: 30px;
  right: 24px;
}
.beginner-steps-content {
  flex: 1;
  display: flex;
}
.beginner-steps-left {
  width: 233px;
  border-top-right-radius: 14px;
  background: rgba(55, 55, 55, 0.04);
}
.beginner-steps-items {
  padding-top: 25px;
  padding-left: 50px;
}
.beginner-steps-item {
  position: relative;
  margin-bottom: 40px;
  padding: 13px 0 13px 14px;
  font-family: 'AlibabaPuHuiTi-Bold' !important;
  font-size: 18px;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  color: #9EA3A6;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.beginner-steps-item:first-child {
  cursor: pointer;
}
.beginner-steps-item:not(:last-child):before {
  content: " ";
  position: absolute;
  top: 39px;
  left: -16px;
  width: 1px;
  height: 100%;
  min-height: 50px;
  background: #DFDFDF;
  transition: background-color 0.3s, opacity 0.3s;
}
.beginner-steps-item.done {
  cursor: pointer;
  color: #1C1C1C;
  opacity: 0.66;
}
.beginner-steps-item.done.active {
  opacity: 1;
}
.beginner-steps-item.done:before {
  opacity: 0.66;
  background: rgba(28, 28, 28, 0.76);
}
.beginner-steps-item.active {
  cursor: pointer;
  background: #fff;
  color: #1C1C1C;
}
.beginner-steps-item_dot {
  position: absolute;
  top: 14px;
  left: -24px;
  width: 17px;
  height: 17px;
  opacity: 0.85;
  background: #E7E7E7;
  border-radius: 50%;
  transition: all 0.3s;
}
.beginner-steps-item_dot::after {
  content: " ";
  display: block;
  width: 9px;
  height: 9px;
  margin-top: 4px;
  margin-left: 4px;
  background: #fff;
  border-radius: 50%;
  transition: all 0.3s;
}
.active .beginner-steps-item_dot, 
.done .beginner-steps-item_dot {
  background-image: radial-gradient(closest-corner, rgba(255, 255, 255, 0) 50%, #C6C6C6 100%);
}
.active .beginner-steps-item_dot::after {
  background: #1C1C1C;
}
.done .beginner-steps-item_dot::after {
  width: 16px;
  height: 13px;
  margin-top: 2px;
  margin-left: 2px;
  background: url(${urlHelper('./assets/check-icon.png')}) no-repeat center top / 100% 100%;
}
.beginner-steps-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.beginner-steps-right_top {
  flex: 1;
  padding-left: 30px;
}
.beginner-steps-content_header {
  display: flex;
}
.beginner-steps-content_header_img {
  width: 52px;
  height: 52px;
  margin-right: 10px;
}
.beginner-steps-content_header_title {
  width: 560px;
  margin-bottom: 8px;
  padding-top: 6px;
  font-family: 'AlibabaPuHuiTi-Bold' !important;
  font-size: 24px;
  color: #1C1C1C;
}
.beginner-steps-content_header_desc {
  font-family: 'AlibabaPuHuiTi-Bold' !important;
  font-size: 12px;
  color: #9EA3A6;
}
.beginner-steps-content_header_desc p {
  font-family: 'AlibabaPuHuiTi-Bold' !important;
  display: inline-block;
}
.beginner-steps-tooltip.homestyler-ui-components.homestyler-popover-item {
  width: 220px;
  z-index: 10000;
}
.beginner-steps-tooltip.homestyler-ui-components.homestyler-popover-item .homestyler-popover-content {
  padding: 20px 15px 12px;
}
.beginner-steps-tooltip_btn {
  display: inline-block;
  vertical-align: middle;
  margin-left: 5px;
  margin-top: -2px;
}
.beginner-steps-about_wrapper {
  padding-top: 40px;
  padding-left: 26px;
}
.beginner-steps-about_text {
  margin-bottom: 20px;
  font-family: 'AlibabaPuHuiTi-Bold' !important;
  font-size: 18px;
  color: #1C1C1C;
  line-height: 26px;
}
.beginner-steps-select_wrapper {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-top: -8px;
  cursor: pointer;
}
.beginner-steps-select_content {
  height: 18px;
  font-family: 'AlibabaPuHuiTi-Bold' !important;
  font-style: italic;
  font-size: 18px;
  color: #4191FA;
}
.beginner-steps-select_content.empty {
  min-width: 300px;
  border-bottom: 2px solid #5baaff;
}
.beginner-steps-select_list {
  position: absolute;
  top: 18px;
  left: 0;
  display: none;
  min-width: 330px;
  max-height: 240px;
  padding: 20px 24px;
  background: #F9FAFA;
  border-radius: 12px;
  overflow-y: scroll;
  z-index: 999;
  transition: all 0.3s;
}
.beginner-steps-select_list.show {
  display: block;
}
.beginner-steps-select_tips {
  margin-bottom: 10px;
  font-size: 14px;
  color: #9EA3A6;
}
.beginner-steps-select_item {
  position: relative;
  line-height: 36px;
  padding-right: 10px;
  font-size: 16px;
  color: #333333;
  white-space: nowrap;
  cursor: pointer;
}
.beginner-steps-select_item:hover {
  color: #4191FA;
}
.beginner-steps-select_item.selected {
  color: #4191FA;
}
.beginner-steps-select_item.selected::after {
  content: " ";
  position: absolute;
  top: 8px;
  right: 0;
  display: block;
  width: 14px;
  height: 10px;
  background: url(${urlHelper('./assets/selected-icon.png')}) no-repeat left center / 100% 100%;
}
.beginner-steps-gift_items {
  margin-top: 32px;
  margin-left: 32px;
}
.beginner-steps-gift_item {
  float: left;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  width: 166px;
  height: 85px;
  margin-right: 20px;
  margin-bottom: 27px;
  padding: 0 10px;
  background: #FFF6F6;
  border-radius: 5px;
  text-align: center;
}
.beginner-steps-gift_item-invite_tag {
  min-width: 58px;
  height: 18px;
  background: #1C1C1C;
  line-height: 10px;
  border-radius: 100px 100px 100px 3px;
  position: absolute;
  right: 0;
  top: -6px;
  line-height: 18px;
  display: none;
}
.beginner-steps-gift_item-invite_tag_text {
  background: linear-gradient(-38deg, #61ABFF 0%, #B8A4FF 51%, #FF7266 100%);
  font-size: 12px;
  -webkit-background-clip: text;
  color: transparent;
  font-style: italic;
  transform: scale(0.8);
  display: inline-block;
}
.beginner-steps-gift_item:before {
  content: " ";
  position: absolute;
  top: -6px;
  left: 1px;
  display: block;
  width: 164px;
  height: 13px;
  background: url(${urlHelper('./assets/gift-bg-default.png')}) no-repeat center / 100% 100%;
  z-index: -1;
}
.beginner-steps-gift_item:nth-child(4) {
  background-color: #F2F5FF;
}
.beginner-steps-gift_item:nth-child(4) .beginner-steps-gift_item-invite_tag {
  display: inline-block;
}
.beginner-steps-gift_item:nth-child(4) .beginner-steps-gift_item-gift_desc {
  color: #7D53D8;
}
.beginner-steps-gift_item:nth-child(4):before {
  background-image: url(${urlHelper('./assets/gift-bg-special.png')});
}
.beginner-steps-gift_title {
  font-family: 'AlibabaPuHuiTi-Bold' !important;
  font-size: 16px;
  color: #1C1C1C;
}
.beginner-steps-gift_desc {
  font-size: 14px;
  color: #F45153;
}
.beginner-steps-guide_items {
  display: flex;
  margin-top: 50px;
  margin-left: 25px;
}
.beginner-steps-guide_item {
  position: relative;
  width: 80px;
  margin-right: 36px;
}
.beginner-steps-guide_item:not(:last-child)::after {
  content: " ";
  position: absolute;
  top: 36px;
  right: -27px;
  display: block;
  width: 28px;
  height: 3px;
  background: url(${urlHelper('./assets/arrow-right.png')}) no-repeat center / 100% 100%;
}
.beginner-steps-guide_img {
  display: block;
  width: 70px;
  height: 70px;
  margin-bottom: 18px;
}
.beginner-steps-guide_text {
  position: relative;
  padding-left: 10px;
  font-size: 12px;
  color: #1C1C1C;
}
.beginner-steps-guide_num {
  position: absolute;
  top: -2px;
  left: -8px;
  font-family: 'AlibabaPuHuiTi-Bold' !important;
  font-size: 24px;
  color: #58D1DC;
}
.beginner-steps-tutorial_wrapper {
  margin-top: 16px;
}
.beginner-steps-tutorial_img {
  position: relative;
  display: inline-block;
  width: 250px;
  height: 158px;
  margin-right: 16px;
  background: #D8D8D8;
  border-radius: 8px;
  overflow: hidden;
}
.beginner-steps-tutorial_img:hover .beginner-steps-tutorial_mask {
  opacity: 1;
}
.beginner-steps-tutorial_img img {
  display: block;
  width: 100%;
  height: 100%;
}
.beginner-steps-tutorial_mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  transition: all 0.3s;
}
.beginner-steps-tutorial_check {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  min-width: 140px;
  height: 38px;
  line-height: 38px;
  background: rgba(15, 15, 15, 0.85);
  border-radius: 5px;
  font-size: 16px;
  color: #FFDC0E;
  text-align: center;
}
.beginner-steps-tutorial_check:hover {
  color: #FFDC0E;
}
.beginner-steps-tutorial_check .icon-check {
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
.beginner-steps-tutorial_desc {
  padding-top: 14px;
  padding-bottom: 8px;
  font-size: 14px;
  color: #9EA3A6;
}
.beginner-steps-tutorial_btn {
  display: inline-block;
  height: 28px;
  line-height: 28px;
  margin-right: 8px;
  padding: 0 12px;
  border: 0.75px solid #1C1C1C;
  border-radius: 4px;
  font-size: 12px;
  color: #1C1C1C;
}
.beginner-steps-tutorial_btn:hover {
  color: #1C1C1C;
}
.beginner-steps-tutorial_btn .icon-logo, 
.beginner-steps-tutorial_btn .icon-youtube, 
.beginner-steps-tutorial_btn .icon-arrow {
  display: inline-block;
  vertical-align: middle;
}
.beginner-steps-tutorial_btn .icon-logo, 
.beginner-steps-tutorial_btn .icon-youtube {
  margin-right: 5px;
}
.beginner-steps-tutorial_btn .icon-arrow {
  margin-left: 5px;
}
.beginner-steps-right_bottom {
  padding-bottom: 70px;
}
.beginner-steps-btn {
  display: block;
  width: 250px;
  height: 48px;
  line-height: 48px;
  margin: 0 auto;
  border-radius: 6px;
  background: #1C1C1C;
  font-family: 'AlibabaPuHuiTi-Bold' !important;
  font-size: 16px;
  color: #fff;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.beginner-steps-btn:hover, 
.beginner-steps-btn:active, 
.beginner-steps-btn:focus {
  color: #fff;
}
.beginner-steps-btn.disabled {
  background: #D5D5D6;
  cursor: not-allowed;
}`;

cssLoader.push(['module_80572', cssContent, '']);

export default cssLoader;