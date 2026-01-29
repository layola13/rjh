const styles = `.react-radio {
  display: flex;
}
.react-radio .radio-title {
  width: 36px;
  font-size: 12px;
  font-weight: 400;
  color: #96969b;
  padding: 0px;
  text-align: left;
  margin-right: 6px;
  display: flex;
  align-items: center;
}
.react-radio .react-radio-btn {
  border: none;
  min-height: 24px;
  height: 24px;
  border-radius: 2px;
  background-color: #FFFFFF;
  display: flex;
}
.react-radio .react-radio-btn .radio-item {
  height: auto;
  cursor: pointer;
  padding: 0 0px;
  float: left;
  line-height: 21px;
  width: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.react-radio .react-radio-btn .radio-item .inputlabel {
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  margin: 0 5px;
  color: #343A40;
}
.react-radio .react-radio-btn .radio-item img {
  width: 22px;
  height: 22px;
}
.react-radio .react-radio-btn .radio-item.active-item {
  background: linear-gradient(90deg, #327dff 0%, #4b96ff 100%);
}
.react-radio .react-radio-btn .radio-item.active-item .inputlabel {
  color: white;
}
.react-radio .react-radio-btn .radio-item:not(:first-child):not(:last-child) {
  border: 1px solid #dcdce1;
}
.react-radio .react-radio-btn .radio-item:nth-child(1) {
  border: 1px solid #dcdce1;
  border-right: none;
}
.react-radio .react-radio-btn .radio-item:nth-last-child(1) {
  border: 1px solid #dcdce1;
  border-left: none;
}
.react-radio .radio-label .label-tooltip {
  font-size: 12px;
  color: #19191E;
  font-weight: 400;
  padding: 0 5px 0 0;
}
.react-radio .radio-label.label-hidden {
  display: none;
}
.react-radio .imageButton {
  margin-top: 7px;
  width: 14px;
  margin-left: 4px;
  cursor: pointer;
}
.react-radio.disabled {
  cursor: no-drop;
}
.react-radio.disabled .radio-item {
  cursor: no-drop;
}
.react-radio.disabled .radio-item .inputlabel {
  cursor: no-drop;
}
.react-radio.disabled .imageButton {
  cursor: no-drop;
}`;

export default styles;