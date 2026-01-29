const styles = `.radio-button-card-wrapper {
  display: flex;
  height: 58px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
  box-sizing: border-box;
}
.radio-button-card-wrapper .radio-button-card-left-part {
  display: inline-flex;
  color: #33353B;
  font-size: 14px;
  font-weight: bold;
}
.radio-button-card-wrapper .radio-button-card-right-part {
  display: inline-flex;
  font-size: 12px;
}
.radio-button-card-wrapper .radio-button-card-right-part .radio-container:not(:last-child) {
  margin-right: 20px;
}
.radio-button-card-wrapper.right-property-bar-radio-button {
  height: 30px;
  border-bottom: 0;
  justify-content: left;
}
.radio-button-card-wrapper.right-property-bar-radio-button .radio-button-card-left-part {
  color: #96969b;
  font-size: 12px;
  font-weight: 400;
  margin-right: 35px;
}
.radio-button-card-wrapper.right-property-bar-radio-button .radio-button-card-right-part .radio-container:not(:last-child) {
  margin-right: 5px;
}
.global-en .radio-button-card-wrapper.right-property-bar-radio-button .radio-button-card-left-part {
  word-break: normal;
}`;

export default styles;