interface CSSExports {
  push(content: [string, string]): void;
  id: string;
}

const cssLoader = (useSoureMaps: boolean): CSSExports => {
  // CSS loader implementation placeholder
  return {
    push: () => {},
    id: ''
  };
};

const requireImage = (path: string): string => {
  // Image path resolver placeholder
  return path;
};

// CSS Module Export
const cssContent = `
.viewswitch {
  position: relative;
  margin-left: 10px;
}

.viewswitch .views {
  position: relative;
  background-color: #f8f8fa;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 0px 0px 2px 0px rgba(52, 58, 64, 0.5);
}

.viewswitch .views .viewlevels-item-switch {
  align-items: center;
}

.viewswitch .views .viewlevels-item-switch .view {
  height: 30px;
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.viewswitch .views .view {
  position: relative;
  display: inline-block;
  width: -moz-max-content;
  width: max-content;
  height: 51px;
  font-size: 12px;
  text-align: center;
  vertical-align: top;
  padding: 0 4px !important;
  min-width: 54px;
}

.viewswitch .views .view:hover {
  color: #686868;
}

.viewswitch .views .view:hover .iconplane,
.viewswitch .views .view:hover .iconsvg {
  background-image: url(${requireImage('956018')});
}

.viewswitch .views .view:hover .iconrcp {
  background-image: url(${requireImage('240915')});
}

.viewswitch .views .view:hover .iconfirstperson {
  background-image: url(${requireImage('305941')});
}

.viewswitch .views .view:hover .iconorbitview {
  background-image: url(${requireImage('714871')});
}

.viewswitch .views .view:hover .icon3DCamera {
  background-image: url(${requireImage('818948')});
}

.viewswitch .views .view:hover .iconOrthoCamera {
  background-image: url(${requireImage('302687')});
}

.viewswitch .views .view:hover .icon2DView {
  background-image: url(${requireImage('302687')});
}

.viewswitch .views .view .img {
  width: 20px;
  height: 20px;
  margin: 10px auto 5px;
}

.viewswitch .views .view .iconplane,
.viewswitch .views .view .iconsvg {
  background-image: url(${requireImage('995195')});
}

.viewswitch .views .view .iconrcp {
  background-image: url(${requireImage('816758')});
}

.viewswitch .views .view .iconfirstperson {
  background-image: url(${requireImage('864256')});
}

.viewswitch .views .view .iconorbitview {
  background-image: url(${requireImage('518626')});
}

.viewswitch .views .view .icon3DCamera {
  background-image: url(${requireImage('558303')});
}

.viewswitch .views .view .iconOrthoCamera {
  background-image: url(${requireImage('452694')});
}

.viewswitch .views .view .icon2DView {
  background-image: url(${requireImage('452694')});
}

.viewswitch .views .disable,
.viewswitch .views .disable:hover {
  font-weight: normal;
  color: #808080;
  cursor: default;
  opacity: 0.4;
}

.viewswitch .views .disable .icon2DView,
.viewswitch .views .disable:hover .icon2DView {
  background-image: url(${requireImage('452694')});
}

.viewswitch .views .viewactive,
.viewswitch .views .viewactive:hover {
  color: #4d9bd6;
  font-weight: normal;
}

.viewswitch .views .viewactive .iconplane,
.viewswitch .views .viewactive:hover .iconplane,
.viewswitch .views .viewactive .iconsvg,
.viewswitch .views .viewactive:hover .iconsvg {
  background-image: url(${requireImage('596689')});
}

.viewswitch .views .viewactive .iconrcp,
.viewswitch .views .viewactive:hover .iconrcp {
  background-image: url(${requireImage('29608')});
}

.viewswitch .views .viewactive .iconfirstperson,
.viewswitch .views .viewactive:hover .iconfirstperson {
  background-image: url(${requireImage('134302')});
}

.viewswitch .views .viewactive .iconorbitview,
.viewswitch .views .viewactive:hover .iconorbitview {
  background-image: url(${requireImage('724536')});
}

.viewswitch .views .viewactive .icon3DCamera,
.viewswitch .views .viewactive:hover .icon3DCamera {
  background-image: url(${requireImage('477025')});
}

.viewswitch .views .viewactive .iconOrthoCamera,
.viewswitch .views .viewactive:hover .iconOrthoCamera {
  background-image: url(${requireImage('740668')});
}

.viewswitch .views .viewactive .icon2DView,
.viewswitch .views .viewactive:hover .icon2DView {
  background-image: url(${requireImage('740668')});
}

.viewswitch .views .viewactive .hot-key-view,
.viewswitch .views .viewactive:hover .hot-key-view {
  color: #396EFE;
}

.viewswitch .views .viewlevels {
  display: inline-flex;
  align-items: flex-end;
  margin-bottom: 1px;
  margin-right: 4px;
}

.viewswitch .views .viewlevels .arrow-icon {
  position: absolute;
  top: 15px;
  right: 0px;
  display: block;
}

.viewswitch .views .viewlevels .viewsul {
  flex-direction: column-reverse;
  position: absolute;
  bottom: 100%;
  display: flex;
  margin-bottom: 4px;
  background: #fff;
  border-radius: 8px;
  padding: 4px;
  display: none;
}

.viewswitch .views .viewlevels:hover .viewsul {
  display: flex;
}

.viewswitch .views .viewlevels:hover .viewhover {
  display: inline-block;
}

.viewswitch .views .viewlevels:hover .arrow-icon .hs-iconfont-view .hover-icon-bg .anticon {
  color: #396EFE !important;
}

.viewswitch .views-v2 .view {
  font-size: 12px;
  font-family: PingFangSC-Light;
  color: #19191e;
  line-height: 12px;
  padding: 0px 3px;
  margin: 0px;
}

.viewswitch .views-v2 .view .img {
  width: 26px;
  height: 26px;
  margin: 2px 7px;
  margin-top: 3px;
}

.viewswitch .views-v2 .view .text {
  position: relative;
  top: 2px;
}

.viewswitch .views-v2 .view .text .hot-key-view {
  padding: 4px;
  display: inline-block;
  line-height: 12px;
  color: #a4a6ad;
}

.viewswitch .views-v2 .view .text .hot-key-view-active {
  color: #396EFE;
}

.viewswitch .views-v2 .view:hover {
  color: #396EFE;
}

.viewswitch .views-v2 .view:hover .hot-key-view {
  color: #396EFE;
}

.viewswitch .views-v2 .viewactive,
.viewswitch .views-v2 .viewactive:hover {
  color: #396EFE;
}

.viewswitch .views-v2 .viewactive .hot-key-view,
.viewswitch .views-v2 .viewactive:hover .hot-key-view {
  color: #396EFE;
}

.viewswitch .viewswitchtip .tooltipContainer {
  left: -25px;
}

.viewswitch .viewSwitchTip {
  position: absolute;
  top: 3px;
  left: 127px;
  z-index: 3000;
  width: 174px;
  height: 67px;
  font-size: 12px;
  background: #fff;
  border: solid 1px #d9dbdf;
  filter: drop-shadow(0px 0px 1px rgba(190, 190, 200, 0.5));
}

.viewswitch .viewSwitchTip .left {
  float: left;
  width: 5px;
  height: 67px;
  background: #c1dff6;
}

.viewswitch .viewSwitchTip .right {
  float: right;
  width: 157px;
  height: 52px;
  padding: 3px 6px;
}

.viewswitch .viewSwitchTip .right .colorTipIcon {
  display: block;
  float: left;
  width: 10px;
  height: 10px;
  margin: 2px 1px 0 0;
  background: url(${requireImage('71493')}) center center no-repeat;
}

.viewswitch .viewSwitchTip .right p {
  float: left;
  width: 146px;
  color: #808080;
  line-height: 1.4;
}

.viewswitch .viewSwitchTip .right .knowed {
  cursor: pointer;
  float: right;
  color: #4d9bd6;
  position: absolute;
  bottom: 3px;
  right: 5px;
}

.viewswitch .viewSwitchTip .right .iconArrow {
  width: 0;
  height: 0;
  border-width: 4px;
  border-style: solid;
  border-color: transparent #c1dff6 transparent transparent;
  position: absolute;
  top: 20px;
  left: -8px;
}
`;

export default cssContent;