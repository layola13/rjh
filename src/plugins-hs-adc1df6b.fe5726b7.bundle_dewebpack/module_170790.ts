const styles = `.angle-input-gizmo-container {
  position: absolute;
  margin: 0px;
  width: 45px;
  height: 20px;
  background-color: transparent;
  z-index: 7;
}

.angle-input-gizmo-container .angle-input-gizmo-suffix {
  position: absolute;
  top: 2px;
  right: 4px;
  width: 6px;
  height: 6px;
  color: #5f5f5f;
  cursor: text;
}

.angle-input-gizmo-container input {
  box-sizing: border-box;
  padding-right: 10px;
  width: 45px;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  text-indent: 0px;
  text-align: center;
  color: #5f5f5f;
  border: 1px solid #cfcfcf;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
}

.angle-input-gizmo-container.move .angle-input-gizmo-suffix {
  color: #327DFF;
}

.angle-input-gizmo-container.move input {
  border-color: #327DFF;
  color: #327DFF;
}

.angle-input-gizmo-container.focus .angle-input-gizmo-suffix {
  color: #327DFF;
}

.angle-input-gizmo-container.focus input {
  border-color: #327DFF;
  color: #327DFF;
}

.angle-input-gizmo-container.error .angle-input-gizmo-suffix {
  color: #ea3324;
}

.angle-input-gizmo-container.error input {
  border-color: #ea3324;
  color: #ea3324;
}`;

export default styles;