// @ts-nocheck
import { requireModule } from './module-resolver';

const imageUrlHelper = requireModule(992716);
const cssLoader = requireModule(986380);

interface CSSExport {
  push(entry: [string, string]): void;
}

const styles: CSSExport = cssLoader(false);

styles.push([
  'module_400704',
  `.beginner-steps-dialog .popup {
  pointer-events: visible;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.66);
  z-index: 4900;
}
.beginner-steps-dialog .popupoverlay {
  z-index: 4100 !important;
}
.beginner-steps-dialog .guide-pop {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 550px;
  width: 500px;
  background-color: rgba(250, 250, 250);
  z-index: 4900;
  overflow: hidden;
  transform: translate(-50%, -50%);
  background-image: url(https://img.alicdn.com/imgextra/i4/O1CN010aTLx02431klfZrEP_!!6000000007334-2-tps-1000-592.png);
  background-size: 500px 300px;
  background-repeat: no-repeat;
}
.beginner-steps-dialog .guide-pop-top {
  width: 100%;
  position: relative;
}
.beginner-steps-dialog .guide-pop-top-background {
  position: absolute;
  width: 500px;
  height: 300px;
  background-image: url('https://img.alicdn.com/imgextra/i4/O1CN010aTLx02431klfZrEP_!!6000000007334-2-tps-1000-592.png');
  background-size: cover;
}
.beginner-steps-dialog .guide-pop-top-logo {
  position: absolute;
  width: 96px;
  height: 120px;
  background-size: cover;
  transform: translate(395px, 40px);
}
.beginner-steps-dialog .guide-pop-top-header-label {
  font-size: 30px;
  color: black;
  font-weight: bold;
  padding-top: 65px;
}
.beginner-steps-dialog .guide-pop-top-dialog-close {
  cursor: pointer;
  display: block;
  position: absolute;
  right: 35px;
  top: 26px;
  width: 30px;
  border-radius: 15px;
  height: 30px;
  background: rgba(0, 0, 0, 0);
}
.beginner-steps-dialog .guide-pop-top-dialog-close:hover {
  background: rgba(0, 0, 0, 0.04);
}
.beginner-steps-dialog .guide-pop-top-dialog-close .hs-iconfont-view {
  margin-left: 6px;
  margin-top: 6px;
}
.beginner-steps-dialog .guide-pop-top-qrcode {
  padding-top: 60px;
  width: 200px;
  margin: 0 auto;
  z-index: 2;
  padding-bottom: 20px;
}
.beginner-steps-dialog .guide-pop-bottom {
  width: 100%;
  height: 300px;
}
.beginner-steps-dialog .guide-pop-bottom-recommendations {
  width: 740px;
  height: 250px;
  margin: 0 auto;
  position: absolute;
  transform: translate(80px, -140px);
}
.beginner-steps-dialog .guide-pop-bottom-recommendations-item {
  padding: 0 24px 0 0;
  background: #fff;
  display: grid;
  height: 116px;
  border-radius: 8px;
  text-decoration: none;
  grid-template-columns: 167px auto 68px;
  margin-bottom: 24px;
}
.beginner-steps-dialog .guide-pop-bottom-recommendations-item-arrow {
  margin-top: 48px;
  padding-left: 53px;
}
.beginner-steps-dialog .guide-pop-bottom-recommendations-item-info {
  padding: 24px;
}
.beginner-steps-dialog .guide-pop-bottom-recommendations-item-img {
  width: 167px;
  height: 116px;
  border-radius: 8px;
  background-size: 167px 116px;
  background-repeat: no-repeat;
}
.beginner-steps-dialog .guide-pop-bottom-recommendations-item .help {
  background-image: url(${imageUrlHelper(requireModule(974126))});
}
.beginner-steps-dialog .guide-pop-bottom-recommendations-item .design {
  background-image: url(${imageUrlHelper(requireModule(507221))});
}
.beginner-steps-dialog .guide-pop-bottom-recommendations-item-title {
  display: block;
  color: #000;
  font-size: 18px;
  line-height: 39px;
  font-weight: 500;
}
.beginner-steps-dialog .guide-pop-bottom-recommendations-item-desc {
  font-size: 14px;
  color: #96969b;
  display: block;
  line-height: 22px;
}
.beginner-steps-dialog .guide-pop-bottom-chat {
  color: #1C1C1C;
  font-size: 16px;
  line-height: 22px;
}
.beginner-steps-dialog .guide-pop-bottom-ok {
  font-family: 'AlibabaPuHuiTi-Bold' !important;
  pointer-events: visible;
  background: #396efe;
  height: 46px;
  min-width: 176px;
  padding: 0 12px;
  position: absolute;
  color: #fff;
  font-size: 18px;
  line-height: 46px;
  border-radius: 23px;
  text-align: center;
  cursor: pointer;
  bottom: 40px;
}
.beginner-steps-dialog .guide-pop-bottom-ok:hover {
  background: #305DD7;
}`
]);

export default styles;