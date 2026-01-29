interface CSSModule {
  push(data: [string, string]): void;
}

interface CSSExports {
  (hot: boolean): CSSModule;
}

const cssContent = `.createwall {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: unset;
  height: 24px;
  border-radius: 50px;
  padding: 3px 12px;
  background-color: rgba(255, 255, 255, 0.9);
}

.createwall .dropdownlist {
  width: auto;
  font-size: 12px;
  color: #808080;
  display: flex;
  align-items: center;
}

.createwall .dropdownlist img, 
.createwall .dropdownlist img {
  margin: 3px 0 0 4px;
  width: 40px;
  height: 15px;
  float: left;
}

.createwall .dropdownlist button {
  height: 22px;
  width: 137px;
  font-size: 12px;
  text-align: left;
  padding: 0 0;
  outline: none;
  background-color: #ffffff;
  border: solid 1px #dcdce1;
  padding-right: 0px;
  border-radius: 2px;
}

.createwall .dropdownlist .utitle {
  font-size: 12px;
  margin-right: 6px;
  margin-left: 0px;
  vertical-align: super;
  font-weight: normal;
  color: #33353B;
}

.createwall .dropdownlist button img {
  margin: 3px 0 0 4px;
  width: 40px;
  height: 15px;
  float: left;
}

.createwall .dropdownlist .utext {
  margin-left: 0px;
  line-height: 22px;
  height: 22px;
  width: 83px;
}

.createwall .dropdownlist .caret-icon {
  float: right;
  margin: 7px 8px 0 0;
}

.createwall .ulcontainer:hover .caretContainerBorder .caret-icon .anticon {
  color: #327dff !important;
}

.createwall .dropdownlist .ulcontainer {
  display: flex;
  width: inherit;
  margin-left: 0px;
}

.createwall .dropdownlist .ulcontainer .right_length_input .input:focus {
  border-color: #c3c6d1;
}

.createwall .dropdownlist .ulcontainer:hover .right_length_input .input, 
.createwall .dropdownlist .ulcontainer:hover .caretContainerBorder, 
.createwall .dropdownlist .ulcontainer:hover .caretContainerBorder .caret {
  border-color: #396EFE;
  color: #396EFE;
}

.mintoolbarcontainer .card {
  margin-top: 3px;
}

.createwall .hide {
  display: none;
}

.createwall .dropdownul {
  display: block;
  position: absolute;
  width: 145px;
  padding: 0px 0;
  border: 1px solid #dcdce1;
  border-radius: 2px;
  text-align: left;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  z-index: 1000;
  max-height: 136px;
  overflow: auto;
  padding-top: 2px;
  padding-bottom: 2px;
}

.createwall .dropdowneditul {
  display: block;
  position: absolute;
  margin-top: 28px;
  width: 64px;
  border: none;
  z-index: 1000;
  overflow: hidden;
  padding: 4px 0;
  background: #fff;
  box-shadow: 0px 5px 50px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.createwall .dropdowneditul::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  z-index: -1;
}

.createwall .dropdowneditul .dropdownli {
  padding: 3px 9px;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
  position: relative;
}

.createwall .dropdowneditul .dropdownli span {
  color: #33353B;
  font-weight: 300;
}

.createwall .dropdowneditul .dropdownli:hover {
  background: #F5F5F5 !important;
}

.createwall .dropdowneditul .dropdownli:hover span {
  color: #33353B;
  font-weight: 300;
}

.createwall .dropdowneditul .dropdownli.highlight {
  background-color: #fff;
}

.createwall .dropdowneditul .dropdownli.highlight span {
  color: #396EFE !important;
  font-weight: 300;
}

.createwall .viewsel {
  height: 12px;
  width: 12px;
  background-size: 100%;
  position: absolute;
  left: 4px;
  top: 5px;
}

.createwall .dropdownli .utext {
  margin-left: -1px;
}

.createwall .dropdownli:hover {
  cursor: pointer;
  background-color: rgba(83, 171, 238, 0.3);
}

.createwall .caretContainer {
  display: inline-block;
  width: 10px;
  float: right;
  height: 22px;
}

.createwall .caretContainerBorder {
  display: block;
  border: 1px solid rgba(28, 28, 28, 0.3);
  border-left: none;
  width: 15px;
  float: right;
  background-color: transparent;
  margin-top: 0;
  height: 22px;
  margin-left: 0;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  cursor: pointer;
}

.createwall .dropdownitemspan {
  width: 16px;
  float: left;
  height: 22px;
  margin-left: 2px;
}

.createwall .dropdownlist .right_length_input {
  position: relative;
  height: 24px;
  display: inline-block;
  overflow: hidden;
  margin-right: 0px;
  width: 48px;
  border-radius: 4px 0px 0px 4px;
}

.createwall .right_length_input input {
  margin-top: 0;
  width: 100%;
  height: 20px;
  display: block;
  text-indent: 4px;
  padding: 1px 0 1px 12px;
  font-size: 11px;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  border: 1px solid rgba(28, 28, 28, 0.3);
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: #19191e;
  background: transparent !important;
}

.createwall .vdivider {
  vertical-align: super;
  padding: 15px 0px;
  margin: 0px 6px;
  border-left: unset;
}

.createwall .wallcreate_thirdrowhdivider {
  border: 0.5px solid #c3c6d1;
}

.createwall .orthoModePropertyBar {
  display: inline-block;
}

.createwall .orthoModePropertyBar .imglabel {
  height: 33px;
  width: 60px;
  margin-right: 0px;
  float: left;
}

.createwall .orthoModePropertyBar .imglabel .label {
  color: #808080 !important;
  font-weight: normal !important;
  height: 33px;
  line-height: 33px;
  padding: 0px 0px !important;
  text-align: left;
  font-size: 12px;
  width: 60px;
}

.createwall .orthoModePropertyBar .svgIconContainer {
  display: block;
  width: 12px;
  height: 12px;
  display: float;
  float: left;
  padding: 3px 3px;
  border-radius: 2px;
  border: 1px solid #dcdce1;
}

.createwall .orthoModePropertyBar .svgIconContainer svg {
  width: 12px !important;
  height: 12px !important;
  position: relative;
  top: -8px;
}

.createwall .orthoModePropertyBarActive .svgIconContainer {
  background-color: #4d9bd6;
  border: 1px solid #3085c4;
  fill: white;
  border-radius: 2px;
}

.createwall .checkboxContainer {
  height: 33px;
}

.createwall .checkboxContainer .inputlabel {
  font-size: 12px;
  font-weight: 300;
  color: #19191e;
  line-height: 12px;
  margin-left: 3px;
}

.createwall .checkboxContainer .checkbtn {
  width: 12px;
  height: 12px;
  border: 1px solid #c3c6d1;
}

.createwall .checkboxContainer .checkbtn::after {
  top: -1px;
  width: 4px;
  height: 7px;
}

.createwall .checkboxContainer .checkbtn-checked {
  border: unset;
}

.createwall .checkboxContainer .inputlabel {
  color: #33353B;
}

.createwall .autoWallWidthRadioBtn ul.ToggleBtn {
  border: unset;
}

.createwall .autoWallWidthTooltip {
  margin-top: -9px;
  margin-left: 5px;
}

.createwall .autoWallWidthTooltip .imageButton {
  display: inline-block;
  height: 27px;
}

.createwall .autoWallWidthTooltip .helptipContainer .tooltipContainer {
  position: absolute;
  width: 60px;
  top: 78px;
  left: 81px;
  border: solid 1px #717171;
  border-radius: 4px;
}

.createwall .react-radio .radio-title {
  font-size: 12px;
  font-weight: 300;
  color: #19191e;
  line-height: 30px;
  margin-right: 7px;
}

.createwall .react-radio .react-radio-btn {
  width: 80px;
  min-height: 20px;
  height: 20px;
  margin: 4px 0px;
}`;

export default cssContent;