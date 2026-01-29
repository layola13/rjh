interface CSSExports {
  push(item: [string, string, string]): void;
}

const cssModule: CSSExports = require('./css-module-loader');

const imageUrl: string = require('../../../assets/images/hover-icon.png');

const cssContent = `.right_imgbtn {
  position: relative;
  height: 45px;
  display: flex;
  min-width: 50%;
}

.right_imgbtn .image-button-right-part {
  font-size: 12px;
  padding-left: 20px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  line-height: 17px;
}

.right_imgbtn .image-button-right-part .image-button-right-first-line-text {
  font-family: PingFangSC-Medium !important;
  color: #000000;
  display: inline-block;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
}

.right_imgbtn .image-button-right-part .image-button-right-second-line-text {
  font-family: PingFangSC-Regular !important;
  color: #96969b;
  display: inline-block;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
}

.right_imgbtn .imglabel {
  height: 45px;
  display: inline-block;
  line-height: 45px;
  min-width: 36px;
}

.countertop-style .imglabel {
  min-width: 100px !important;
}

.right_imgbtn .label {
  font-size: 12px;
  font-weight: normal;
  padding-left: 0;
  padding: 0 2px 0 0;
  font-weight: 400;
  color: #96969b;
}

.right_imgbtn .imgdiv {
  position: relative;
  margin: auto;
  width: 32px;
  height: 32px;
  border: #ababaf solid 1px;
  display: inline-block;
  cursor: pointer;
  border-radius: 2px;
}

.right_imgbtn .imgdiv:hover {
  border-color: #327dff;
}

.right_imgbtn .imgdiv:hover:after {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  padding: 10px;
  content: url(${imageUrl});
  background: #19191e;
  opacity: 0.5;
}

.right_imgbtn .imgdiv:hover .imgtriangle {
  display: none;
}

.right_imgbtn .imgdiv .image-wrap {
  background-color: transparent !important;
  width: 31px;
  height: 31px;
}

.right_imgbtn .rotation {
  position: relative;
  margin: auto;
  width: 25px;
  height: 25px;
  border: transparent solid 1px;
  display: inline-block;
  cursor: pointer;
  border-radius: 2px;
}

.right_imgbtn .rotation:hover {
  border-color: #55acee;
  background-color: rgba(85, 172, 238, 0.15);
}

.right_imgbtn .imgbtn {
  margin: 1px;
  height: 30px;
  width: 30px;
}

.right_imgbtn .rotation .imgbtn {
  height: 22px;
  width: 22px;
}

.right_imgbtn .imgtriangle {
  position: absolute;
  bottom: 1px;
  right: 1px;
  border-bottom: 7px solid #ffffff;
  border-left: 7px solid transparent;
}

.right_imgbtn .imgtriangle1 {
  position: absolute;
  bottom: -7px;
  right: 0;
  border-bottom: 6px solid #327dff;
  border-left: 6px solid transparent;
}

.right_imgbtn .nine-patch-container .nine-patch .nine-patch-row {
  line-height: 12px;
  height: 12px;
}

.right_imgbtn .nine-patch-container .nine-patch .nine-patch-row .nine-patch-block {
  width: 10px;
  height: 10px;
  margin: 0px 1px 2px 1px;
}

.right_imgbtn .nine-patch-container {
  margin: auto;
}

.right_imgbtn svg .selected {
  display: none;
}

.right_imgbtn .match {
  background-color: #4d9bd6;
  border: 1px solid #3085c4;
}

.right_imgbtn .match svg .normal {
  display: none;
}

.right_imgbtn .match svg .selected {
  display: block !important;
}

.right_imgbtn .rotation:hover svg path {
  fill: #808080 !important;
}

.labelHidden {
  display: none !important;
}

.right_imgbtn .imgbtn_text {
  position: absolute;
  top: 12px;
  left: -4px;
  color: #96969b;
  text-shadow: #f3f3f3 -0.07em -0.07em 0px, #f3f3f3 0.07em -0.07em 0px, #f3f3f3 -0.07em 0.07em 0px, #f3f3f3 0.07em 0.07em 0px;
  text-align: center;
  width: 40px;
  font-size: 12px;
  transform: scale(0.8);
}

.right_imgbtn .imgbtn_text.double_line {
  top: 6px;
}

.right_imgbtn .disable {
  color: #ccc;
  cursor: not-allowed;
}

.right_imgbtn .footlable {
  font-size: 12px;
  color: #808080;
  margin-top: 4px;
}`;

const moduleId = 'module_701058';

cssModule.push([moduleId, cssContent, '']);

export default cssModule;