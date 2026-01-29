interface CSSExports {
  push: (content: [string, string]) => void;
  id: string;
}

interface WebpackRequire {
  (id: number): unknown;
}

interface ModuleExports {
  exports: CSSExports;
  id: string;
}

const CSS_CONTENT = `.enableoperate {
  pointer-events: auto;
}

.guideloadingWrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4050;
}

.guideloadingWrapper .guideloading {
  position: absolute;
  top: calc(((100% - 560px) / 2) + 285px);
  left: calc(((100% - 840px) / 2) + 238px);
  width: 600px;
  height: 250px;
}

.guideWrapper {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 4100;
}

.guideWrapper .scoreTip {
  position: absolute;
  top: -100px;
  left: 50%;
  z-index: 3004;
  margin-left: -190px;
  width: 380px;
  height: 46px;
  border: 1px solid #e0f3d8;
  background: #f0f8eb;
  font-size: 14px;
  font-weight: bold;
  color: #67c13a;
  border-radius: 4px;
  line-height: 46px;
  transition: top 600ms cubic-bezier(0.78, 0.24, 0.03, 0.17);
}

.guideWrapper .scoreTip span {
  position: relative;
  top: 3px;
  display: inline-block;
  width: 15px;
  height: 15px;
  margin: 0 6px 0 20px;
  background-size: cover;
}

.guideWrapper .guide-build-block-top {
  width: 100%;
  pointer-events: auto;
  position: relative;
  background: rgba(0, 0, 0, 0.66);
}

.guideWrapper .guide-build-block-middle {
  position: relative;
  pointer-events: none;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
}

.guideWrapper .guide-build-block-middle .guide-build-block-middle-left {
  background: rgba(0, 0, 0, 0.66);
  pointer-events: auto;
  height: 100%;
  position: relative;
}

.guideWrapper .guide-build-block-middle .guide-build-block-middle-center {
  position: relative;
  pointer-events: none;
  box-sizing: border-box;
}

.guideWrapper .guide-build-block-middle .guide-build-block-middle-center::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  display: inline-flex;
  border: 4px solid rgba(0, 0, 0, 0.66);
}

.guideWrapper .guide-build-block-middle .guide-build-block-middle-center::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  display: inline-flex;
  border: 4px solid #376eff;
  border-radius: 10px;
}

.guideWrapper .guide-build-block-middle .mask-before-render {
  background: rgba(0, 0, 0, 0.66);
  pointer-events: visible;
}

.guideWrapper .guide-build-block-middle .mask-before-render::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  display: inline-flex;
  border: unset;
}

.guideWrapper .guide-build-block-middle .mask-before-render::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  display: inline-flex;
  border: unset;
  border-radius: 10px;
}

.guideWrapper .guide-build-block-middle .guide-build-block-middle-right {
  background: rgba(0, 0, 0, 0.66);
  pointer-events: auto;
  height: 100%;
  position: relative;
  flex-grow: 1;
}

.guideWrapper .guide-build-block-bottom {
  width: 100%;
  pointer-events: auto;
  position: relative;
  background: rgba(0, 0, 0, 0.66);
}

.guideWrapper .guideToolbarMask {
  background: rgba(0, 0, 0, 0.66);
  height: 51px;
  position: absolute;
  width: 100%;
  z-index: 1020;
}

.guideWrapper .guideMask {
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.66);
  height: calc(100% - 50px);
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 4000;
}

.guideWrapper .guideMasks {
  pointer-events: auto;
}

.guideWrapper .guideMasks .leftMask {
  background: rgba(0, 0, 0, 0.66);
  height: calc(100% - 130px);
  left: 0;
  position: fixed;
  top: 50px;
  width: 363px;
  z-index: 4050;
}

.guideWrapper .guideMasks .leftMask .border {
  position: relative;
  left: 362px;
  top: 0px;
  width: 4px;
  height: 100%;
  background: #376eff;
}

.guideWrapper .guideMasks .rightMask {
  background: rgba(0, 0, 0, 0.66);
  height: calc(100% - 50px);
  right: 0;
  position: fixed;
  top: 50px;
  width: 262px;
  z-index: 4050;
}

.guideWrapper .guideMasks .rightMask .border {
  position: relative;
  left: -2px;
  top: 0;
  width: 4px;
  height: calc(100% - 80px);
  background: #376eff;
}

.guideWrapper .guideMasks .topMask {
  left: 363px;
  position: fixed;
  width: calc(100% - 374px);
  z-index: 1000;
  height: 50px;
  background: rgba(0, 0, 0, 0.66);
}

.guideWrapper .guideMasks .topMask .border {
  position: relative;
  left: 0;
  top: 50px;
  width: calc(100% - 249px);
  height: 2px;
  background: #376eff;
}

.guideWrapper .guideMasks .bottomMask {
  background: rgba(0, 0, 0, 0.66);
  height: 80px;
  bottom: 0;
  position: fixed;
  width: calc(100% - 262px);
  z-index: 4050;
}

.guideWrapper .guideMasks .bottomMask .border {
  position: relative;
  left: 364px;
  top: -2px;
  width: calc(100% - 364px);
  height: 2px;
  background: #376eff;
}

.guideWrapper .guideMasks_twoleveltoolbar .leftMask {
  background: rgba(0, 0, 0, 0.66);
  height: calc(100% - 130px);
  left: 0;
  position: fixed;
  top: 50px;
  width: 363px;
  z-index: 4050;
}

.guideWrapper .guideMasks_twoleveltoolbar .leftMask .border {
  position: relative;
  left: 362px;
  top: 50px;
  width: 4px;
  height: calc(100% - 50px);
  background: #376eff;
}

.guideWrapper .guideMasks_twoleveltoolbar .rightMask {
  background: rgba(0, 0, 0, 0.66);
  height: calc(100% - 50px);
  right: 0;
  position: fixed;
  top: 100px;
  width: 262px;
  z-index: 4050;
}

.guideWrapper .guideMasks_twoleveltoolbar .rightMask .border {
  position: relative;
  left: -2px;
  top: 0;
  width: 4px;
  height: calc(100% - 130px);
  background: #376eff;
}

.guideWrapper .guideMasks_twoleveltoolbar .topMask {
  left: 363px;
  position: fixed;
  width: calc(100% - 363px);
  z-index: 1000;
  top: 50px;
}

.guideWrapper .guideMasks_twoleveltoolbar .topMask .border {
  position: relative;
  left: 0;
  top: 50px;
  width: calc(100% - 249px);
  height: 2px;
  background: #376eff;
}

.guideWrapper .guideMasks_twoleveltoolbar .bottomMask {
  background: rgba(0, 0, 0, 0.66);
  height: 80px;
  bottom: 0;
  position: fixed;
  width: calc(100% - 262px);
  z-index: 4050;
}

.guideWrapper .guideMasks_twoleveltoolbar .bottomMask .border {
  position: relative;
  left: 364px;
  top: -2px;
  width: calc(100% - 364px);
  height: 2px;
  background: #376eff;
}

.brief-Introduction-v2-window .contentsWrapper::after {
  height: 0px;
}`;

export default CSS_CONTENT;