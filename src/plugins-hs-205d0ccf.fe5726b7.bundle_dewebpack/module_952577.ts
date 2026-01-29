const styles = `.slider-input {
  position: relative;
  width: 208px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 46px;
}

.slider-input .slider-outer {
  width: 128px;
}

.slider-input .slider-outer .ant-slider-rail,
.slider-input .slider-outer .ant-slider-step {
  background: rgba(255, 255, 255, 0.1);
}

.slider-input .slider-outer .ant-slider-dot {
  background: #6c6b6d;
}

.slider-input .slider-outer .ant-slider-dot-active {
  background: #396efe;
}

.slider-input .slider-outer .ant-slider-handle {
  background: #2b2c2e;
}

.slider-input .slider-outer .ant-slider-handle::before {
  border-color: #2b2c2e;
}

.slider-input .slider-outer:hover .ant-slider-track {
  background: #396efe;
}`;

export default styles;