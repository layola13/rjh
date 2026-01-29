const cssContent = `ul li {
  list-style: none;
}

.favGroup_panel_mask {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 200;
  top: 0;
  left: 0;
  text-align: 2px;
}

.favGroup_panel_mask .favGroup_panel {
  width: 400px;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 4px;
  position: absolute;
  top: 45%;
  left: 50%;
  color: #343a40;
  list-style: none;
  font-size: 12px;
  font-weight: 300;
  border: 1px solid #4d9bd6;
}

.favGroup_panel_mask .favGroup_panel .scroll_wrapper {
  width: 100%;
  max-height: 85px;
  margin-top: 5px;
}

.favGroup_panel_mask .favGroup_panel .scroll_wrapper .scrollbar-container {
  position: relative;
  max-height: 84px;
}

.favGroup_panel_mask .favGroup_panel .scroll_wrapper .scrollbar-container .allGroup {
  width: 100%;
  padding-bottom: 5px;
}

.favGroup_panel_mask .favGroup_panel .scroll_wrapper .scrollbar-container .allGroup li {
  clear: both;
  line-height: 21.5px;
  text-align: 2px;
  height: 21.5px;
  display: block;
  padding-left: 8px;
  padding-right: 10px;
  font-size: 12px;
  position: relative;
}

.favGroup_panel_mask .favGroup_panel .scroll_wrapper .scrollbar-container .allGroup li .radio_input {
  width: 12px;
  height: 12px;
  border-radius: 12px;
  border: 1px solid #a9a7a5;
  box-sizing: border-box;
  display: inline-block;
  top: 6px;
  position: absolute;
  cursor: pointer;
}

.favGroup_panel_mask .favGroup_panel .scroll_wrapper .scrollbar-container .allGroup li .radio_input .radio_input_inner {
  width: 4px;
  height: 4px;
  border-radius: 4px;
  opacity: 0;
  display: inline-block;
}

.favGroup_panel_mask .favGroup_panel .scroll_wrapper .scrollbar-container .allGroup li .radio_input:after {
  width: 4px;
  height: 4px;
  border-radius: 4px;
  background-color: #FAFAFA;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  transition: transform 0.15s cubic-bezier(0.71, -0.46, 0.88, 0.6);
}

.favGroup_panel_mask .favGroup_panel .scroll_wrapper .scrollbar-container .allGroup li .radio_input_checked {
  border-color: #499ef7;
  background: #499ef7;
}

.favGroup_panel_mask .favGroup_panel .scroll_wrapper .scrollbar-container .allGroup li .text {
  position: absolute;
  left: 23px;
  border: none;
  flex-basis: auto;
  flex-shrink: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  outline: none;
  width: 80%;
}

.favGroup_panel_mask .favGroup_panel .scroll_wrapper .scrollbar-container .allGroup li .textInput {
  display: none;
}

.favGroup_panel_mask .favGroup_panel .scroll_wrapper .scrollbar-container .allGroup li:hover {
  background: rgba(185, 200, 212, 0.2);
}

.favGroup_panel_mask .favGroup_panel .add_group {
  padding-left: 8px;
  padding-right: 6px;
  padding-bottom: 6px;
  position: relative;
}

.favGroup_panel_mask .favGroup_panel .add_group .add_group_img {
  display: inline-block;
  position: absolute;
  width: 10px;
  height: 10px;
  cursor: pointer;
  left: 110px;
  top: 5px;
}

.favGroup_panel_mask .favGroup_panel .add_group .add_group_text {
  border-radius: 2px;
  border: 0.5px solid #d1d1d1;
  max-width: 115px;
  text-indent: 2px;
  height: 18px;
}

.favGroup_panel_mask .favGroup_panel .add_group .add_group_text:focus {
  border: 0.5px solid #4d9bd6;
}

.favGroup_panel_mask .favGroup_panel .add_group .redBorder {
  border: 0.5px solid red;
}

.favGroup_panel_mask .favGroup_panel .add_group .redBorder:focus {
  border: 0.5px solid red;
}

.favGroup_panel_mask .hoverPanel:before {
  content: '';
  position: absolute;
  top: -5px;
  left: 13px;
  width: 0;
  height: 0;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #4d9bd6;
  border-left: 5px solid transparent;
}

.favGroup_panel_mask .hoverPanel:after {
  content: '';
  position: absolute;
  top: -4.3px;
  left: 13px;
  width: 0;
  height: 0;
  border-bottom: 4px solid #f7f7f7;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}

.favGroup_panel_mask.rightfavorite .hoverPanel:before {
  left: 110px;
}

.favGroup_panel_mask.rightfavorite .hoverPanel:after {
  left: 110px;
}

.popupPanel {
  background: rgba(0, 0, 0, 0.3);
}

.popupPanel .favGroup_panel {
  border: 1px solid #AEAEAE;
  width: 178px;
  max-height: 240px;
}

.popupPanel .favGroup_panel .scroll_wrapper {
  max-height: 172px;
  min-height: 112px;
  height: auto;
}

.popupPanel .favGroup_panel .scroll_wrapper .scrollbar-container {
  max-height: 171px;
  min-height: 111px;
}

.popupPanel .favGroup_panel .scroll_wrapper .scrollbar-container .allGroup li {
  height: 21.5px;
  line-height: 21.5px;
  padding-left: 10px;
}

.popupPanel .favGroup_panel .scroll_wrapper .scrollbar-container .allGroup li .text {
  left: 26px;
}

.popupPanel .favGroup_panel .scroll_wrapper .scrollbar-container .allGroup li .radio_input {
  top: 4px;
}

.popupPanel .favGroup_panel .add_group {
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 10px;
}

.popupPanel .favGroup_panel .add_group .add_group_text {
  width: 97%;
  max-width: 97%;
  height: 18px;
}

.popupPanel .favGroup_panel .add_group .add_group_text:focus {
  border: 0.5px solid #4d9bd6;
}

.popupPanel .favGroup_panel .add_group .add_group_img {
  left: 150px;
  top: 10px;
}

.popupPanel .favGroup_panel .add_group .redBorder {
  border: 0.5px solid red;
}

.popupPanel .favGroup_panel .add_group .redBorder:focus {
  border: 0.5px solid red;
}

.popupPanel .favGroup_panel .header {
  overflow: hidden;
  background-color: #fff;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom: 1px solid #d1d1d1;
  font-size: 14px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  position: relative;
}

.popupPanel .favGroup_panel .header label {
  color: #333;
  display: block;
  font-weight: 400;
  text-align: center;
  padding: 0;
  font-weight: normal;
  display: inline-block;
}

.popupPanel .favGroup_panel .header .closeBtn {
  float: right;
  position: relative;
  right: 8px;
  top: -1px;
  cursor: pointer;
}

.popupPanel .favGroup_panel .header .closeBtn img {
  width: 10px;
  height: 10px;
}

#favGroup_panel_collection {
  background: rgba(0, 0, 0, 0.3);
}

#favGroup_panel_collection .favGroup_panel {
  border: 1px solid #AEAEAE;
  width: 178px;
  max-height: 240px;
}

#favGroup_panel_collection .favGroup_panel .scroll_wrapper {
  max-height: 172px;
  min-height: 112px;
  height: auto;
}

#favGroup_panel_collection .favGroup_panel .scroll_wrapper .scrollbar-container {
  max-height: 171px;
  min-height: 111px;
}

#favGroup_panel_collection .favGroup_panel .scroll_wrapper .scrollbar-container .allGroup li {
  height: 21.5px;
  line-height: 21.5px;
  padding-left: 10px;
}

#favGroup_panel_collection .favGroup_panel .scroll_wrapper .scrollbar-container .allGroup li .text {
  left: 26px;
}

#favGroup_panel_collection .favGroup_panel .scroll_wrapper .scrollbar-container .allGroup li .radio_input {
  top: 4px;
}

#favGroup_panel_collection .favGroup_panel .add_group {
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 10px;
}

#favGroup_panel_collection .favGroup_panel .add_group .add_group_text {
  width: 97%;
  max-width: 97%;
  height: 18px;
}

#favGroup_panel_collection .favGroup_panel .add_group .add_group_text:focus {
  border: 0.5px solid #4d9bd6;
}

#favGroup_panel_collection .favGroup_panel .add_group .add_group_img {
  left: 150px;
  top: 10px;
}

#favGroup_panel_collection .favGroup_panel .add_group .redBorder {
  border: 0.5px solid red;
}

#favGroup_panel_collection .favGroup_panel .add_group .redBorder:focus {
  border: 0.5px solid red;
}

#favGroup_panel_collection .favGroup_panel .header {
  overflow: hidden;
  background-color: #fff;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom: 1px solid #d1d1d1;
  font-size: 14px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  position: relative;
}

#favGroup_panel_collection .favGroup_panel .header label {
  color: #333;
  display: block;
  font-weight: 400;
  text-align: center;
  padding: 0;
  font-weight: normal;
  display: inline-block;
}

#favGroup_panel_collection .favGroup_panel .header .closeBtn {
  float: right;
  position: relative;
  right: 8px;
  top: -1px;
  cursor: pointer;
}

#favGroup_panel_collection .favGroup_panel .header .closeBtn img {
  width: 10px;
  height: 10px;
}`;

export default cssContent;