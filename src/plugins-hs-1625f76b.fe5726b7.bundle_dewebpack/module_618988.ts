const styles = `
.dialogToolbarTips {
  z-index: 102;
  position: fixed;
  top: 100px;
  left: 50%;
  width: 300px;
  background: #ffffff;
  margin-left: -150px;
  border-radius: 5px;
}

.dialogToolbarTips .itemToolbarTip {
  height: 50px;
  line-height: 50px;
  color: #A8A8A8;
  clear: none;
}

.dialogToolbarTips .itemToolbarTip .svgItem {
  width: 50px;
  height: 50px;
  display: inline-block;
  float: left;
}

.dialogToolbarTips .itemToolbarTip .itemTxt {
  float: left;
}

.dialogToolbarTips .itemToolbarTip .itemTxt .boldItemFont {
  color: #4B4B4B;
}

.hide {
  display: none;
}

.checkbox_lock_scale_v2 {
  width: 100% !important;
  height: unset !important;
  margin: 10px 2px 0px -5px !important;
}
`;

export default styles;