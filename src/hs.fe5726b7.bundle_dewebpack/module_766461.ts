import imageUrl from './path/to/image';

interface CSSExports {
  push(item: [string, string]): void;
  id: string;
}

const cssContent = `
.right_imgbtn {
  position: relative;
  height: 45px;
  display: flex;
  min-width: 50%;
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
  color: #96969B;
  font-weight: normal;
  padding-left: 0;
  padding: 0 2px 0 0;
}

.right_imgbtn .imgdiv {
  position: relative;
  margin: auto;
  width: 32px;
  height: 32px;
  border: #c3c3c3 solid 1px;
  display: inline-block;
  cursor: pointer;
  border-radius: 2px;
}

.moldingPanelDiv .imgdiv {
  margin-left: 21px;
  border: 1px solid #ababaf;
}

.moldingPanelDiv .imgtriangle .imgtriangle1 {
  border-bottom: 7px solid #327dff;
  border-left: 7px solid transparent;
}

.moldingPanelDiv .imgdiv:hover:after {
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

.moldingPanelDiv .imgdiv:hover .imgtriangle {
  display: none;
}

.right_imgbtn .imgdiv:hover {
  border-color: #55acee;
}

.right_imgbtn .imgdiv .image-wrap {
  background-color: transparent!important;
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
  border-bottom: 5px solid #ffffff;
  border-left: 5px solid transparent;
}

.right_imgbtn .imgtriangle1 {
  position: absolute;
  bottom: -5px;
  right: 0;
  border-bottom: 4px solid #808080;
  border-left: 4px solid transparent;
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
  left: 0px;
  color: #96969B;
  text-shadow: #f3f3f3 -0.07em -0.07em 0px, #f3f3f3 0.07em -0.07em 0px, #f3f3f3 -0.07em 0.07em 0px, #f3f3f3 0.07em 0.07em 0px;
  text-align: center;
  width: 33px;
  font-size: 11px;
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
}
`;

export default cssContent;