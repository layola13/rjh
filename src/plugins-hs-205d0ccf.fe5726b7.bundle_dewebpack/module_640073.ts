import { CSSResult } from './types';

interface CSSModule {
  push(data: [string, string]): void;
}

const styles: string = `.status-bar {
  position: absolute;
  bottom: 2px;
  left: 0px;
  right: 248px;
  width: auto;
  height: 36px;
  z-index: 105;
  pointer-events: none;
}
.status-bar .disable {
  filter: opacity(0.4);
  cursor: not-allowed;
}
.status-bar .disable > div {
  pointer-events: none;
}
.status-bar .status-bar-contents {
  width: 100%;
  height: 30px;
}
.status-bar .hidden-bar-mixin.hidden-bar {
  visibility: hidden;
}
.status-bar .left-status-bar {
  margin-left: 18px;
  height: 100%;
  float: left;
  display: flex;
  pointer-events: auto;
  border-radius: 30px 0px 0px 30px;
}
.status-bar .left-status-bar.hidden-bar {
  visibility: hidden;
}
.status-bar .left-status-bar .vdivider-status-bar {
  margin-top: 6px;
  position: relative;
  right: 1px;
}
.status-bar .status-bar-plugin-container {
  height: 100%;
}
.status-bar .status-bar-plugin-container .viewswitch .views {
  display: flex;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: unset;
  border-radius: 0px 30px 30px 0px;
  right: 11px;
  padding-left: 10px;
  padding-right: 14px;
}
.status-bar .status-bar-plugin-container .viewswitch .viewlevels .view {
  margin-top: 0px;
}
.status-bar .status-bar-plugin-container .viewswitch .view {
  font-size: 12px;
  color: #19191e;
  height: 26px;
  padding: 0 0;
  margin-top: 3px;
}
.status-bar .status-bar-plugin-container .viewswitch .view .img {
  display: none;
}
.status-bar .status-bar-plugin-container .viewswitch .view .text {
  line-height: 27px;
  top: 0;
}
.status-bar .status-bar-plugin-container .viewswitch .view .arrow {
  position: absolute;
  top: 21px;
  right: 9px;
  width: 0;
  height: 0px;
  display: block;
  border-bottom: 4px solid #5f5f5f;
  border-left: 4px solid transparent;
}
.status-bar .status-bar-plugin-container .viewswitch .view:hover {
  color: #396EFE;
}
.status-bar .status-bar-plugin-container .viewswitch .view:hover .hot-key-view {
  color: #396EFE;
}
.status-bar .status-bar-plugin-container .viewswitch .viewactive .text,
.status-bar .status-bar-plugin-container .viewswitch .viewactive:hover .text {
  color: #396EFE;
}
.status-bar .status-bar-plugin-container .viewswitch .viewactive .hot-key-view,
.status-bar .status-bar-plugin-container .viewswitch .viewactive:hover .hot-key-view {
  color: #396EFE;
}
.status-bar .right-status-bar {
  margin-right: 8px;
  padding: 0px 5px;
  height: 100%;
  float: right;
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
  align-items: center;
  pointer-events: auto;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 30px;
}
.status-bar .right-status-bar.hidden-bar {
  visibility: hidden;
}
.status-bar .right-status-bar .fit-button-in-2d,
.status-bar .right-status-bar .fit-button-in-mixpaint {
  margin-left: 6px;
  margin-right: 0px;
}
.status-bar .right-status-bar .imagebutton-wrapper.fit-button-in-2d {
  margin-left: 2px;
}
.status-bar .right-status-bar.empty-right-items {
  padding: 0;
}
.status-bar .verticaldivider {
  width: 5px;
}`;

export default styles;