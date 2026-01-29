const styles = `.round-select-wrapper {
  position: relative;
}

.round-select-wrapper.round-select-wrapper-unmounted .ant-select-selector {
  opacity: 0;
}

.round-select-wrapper.round-select-wrapper-unmounted .icon {
  opacity: 0;
}

.round-select-wrapper .round-select {
  width: 100%;
  position: relative;
  height: 32px;
  opacity: 100%;
}

.round-select-wrapper .round-select .ant-select-selector {
  border-radius: 18px !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  transition: opacity 0.6s;
  height: 32px;
}

.round-select-wrapper .round-select .ant-select-selector .ant-select-selection-item {
  line-height: 32px !important;
  padding-left: 18px !important;
  font-size: 12px;
  font-weight: bold;
}

.round-select-wrapper .icon {
  font-size: 12px;
  opacity: 1;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translate(0, -50%);
  transition: opacity 0.6s;
}

.round-select-wrapper .suffix-icon {
  font-size: 12px;
}

.round-select-wrapper .ant-select-arrow {
  top: 50%;
}

.round-select-wrapper.teaching-light .round-select .ant-select-selector {
  background: rgba(111, 129, 175, 0.1) !important;
}

.round-select-wrapper.teaching-light .round-select .ant-select-selector .ant-select-selection-item {
  color: #33353b;
}

.round-select-wrapper.teaching-light .round-select .ant-select-arrow {
  color: #33353b;
}

.round-select-wrapper.teaching-light .round-select .ant-select-open .ant-select-selector {
  border: 1px solid #396efe !important;
}

.round-select-wrapper.teaching-light .icon {
  color: #33353b;
}

.round-select-wrapper.teaching-light .suffix-icon {
  color: #33353b;
}

.round-select-wrapper.teaching-black .round-select .ant-select-selector {
  background: rgba(255, 255, 255, 0.1) !important;
}

.round-select-wrapper.teaching-black .round-select .ant-select-selector .ant-select-selection-item {
  color: #fff;
}

.round-select-wrapper.teaching-black .round-select .ant-select-arrow {
  color: #fff;
}

.round-select-wrapper.teaching-black .round-select .ant-select-open .ant-select-selector {
  border: 1px solid #396efe !important;
}

.round-select-wrapper.teaching-black .icon {
  color: #fff;
}

.round-select-wrapper.teaching-black .suffix-icon {
  color: #fff;
}`;

export default styles;