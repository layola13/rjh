const styles = `.toggle-button {
  display: inline-flex;
  height: 34px;
  align-items: center;
}

.toggle-button .toggle-title {
  font-size: 12px;
  font-family: PingFangSC-Light;
  font-weight: normal;
  color: #96969b;
  margin-right: 6px;
  margin-left: 0px;
}

.toggle-button .ant-switch {
  height: 20px;
  min-width: 40px;
}

.toggle-button .ant-switch::after {
  height: 16px;
  width: 16px;
}

.toggle-button .ant-switch-handle {
  height: 16px;
  width: 16px;
}

.toggle-button .ant-switch-checked {
  background-color: #327DFF;
}

.toggle-button .ant-switch-checked .ant-switch-handle {
  left: calc(100% - 16px - 2px);
}

.toggle-button-compact {
  display: inline-flex;
  height: 24px;
  align-items: center;
}

.toggle-button-compact .toggle-title {
  font-size: 12px;
  font-family: PingFangSC-Light;
  font-weight: normal;
  color: #96969b;
  margin-right: 6px;
  margin-left: 0px;
}

.toggle-button-compact .ant-switch {
  height: 20px;
  min-width: 40px;
}

.toggle-button-compact .ant-switch::after {
  height: 16px;
  width: 16px;
}

.toggle-button-compact .ant-switch-checked {
  background-color: #327DFF;
}`;

export default styles;