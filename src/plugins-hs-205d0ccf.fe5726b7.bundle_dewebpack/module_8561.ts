const styles = `.rightmenu {
  position: fixed;
  z-index: 102;
}
.rightmenu .rightmenumask {
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
.rightmenu .hide {
  display: none;
}
.rightmenu .mainland {
  background: #fafafa;
  border: solid 1px #d6d6d6;
  box-shadow: 0px 2px 7px 0.16px rgba(52, 58, 64, 0.25);
  border-radius: 4px;
  color: #444b52;
  font-size: 12px;
  padding: 3px 0;
  display: block;
}
.rightmenu .rightitem {
  min-width: 92px;
  height: 25px;
  line-height: 25px;
  padding-left: 33px;
  padding-right: 10px;
  cursor: pointer;
  position: relative;
  font-size: 12px;
}
.rightmenu .rightitem:hover {
  background-color: rgba(85, 172, 238, 0.15);
}
.rightmenu .rightitem.disable {
  cursor: default;
  opacity: 0.5;
}
.rightmenu .rightitem .next-icon {
  position: relative;
  float: right;
  top: -19px;
}
.rightmenu .rightitem .rightlabel {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rightmenu .rightdive {
  border-bottom: 1px solid #e1e1e1;
  margin: 2px 0;
}
.rightmenu .righticon {
  width: 13px;
  height: 13px;
  position: absolute;
  left: 10px;
  top: 6px;
}
.rightmenu .rightadd {
  display: inline-block;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent transparent #808080;
  float: right;
  margin: 7px;
}
.rightmenu .mintoolbarcontainer {
  position: absolute;
  min-width: 132px;
  top: -42px;
  min-height: 30px;
  margin-bottom: 5px;
  background: #fafafa;
  border: solid 1px #d6d6d6;
  box-shadow: 0px 2px 7px 0.16px rgba(52, 58, 64, 0.25);
  border-radius: 4px;
  color: #444b52;
  font-size: 12px;
  padding: 3px 0;
  padding-right: 3px;
}
.rightmenu .mintoolbarcontainer .roomTypeDropdownRightMenu {
  width: 179px !important;
  margin: 2px auto -2px;
}
.rightmenu .mintoolbarcontainer .roomTypeDropdownRightMenu .roomNameInput.readonly {
  background: #eaeaea;
  width: 75px;
  font-size: 13px;
  border: solid 1px #cfcfcf;
  height: 24px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  line-height: 28px;
  color: #808080;
}
.rightmenu .mintoolbarcontainer .roomTypeDropdownRightMenu .roomNameInput {
  width: 70px;
  height: 20px;
  padding-left: 4px;
  position: relative;
  top: -7px;
}
.rightmenu .mintoolbarcontainer .roomTypeDropdownRightMenu .button {
  border-color: #55acee;
  box-shadow: 0px 0px 3px 0px rgba(77, 155, 214, 0.6);
}
.rightmenu .wtitle {
  font-size: 12px;
}
.rightmenu .sub-menu {
  padding-left: 120px;
  position: relative;
  top: -25px;
}
.rightmenu .sub-menu .mainland {
  position: absolute;
  z-index: 1;
}`;

export default styles;