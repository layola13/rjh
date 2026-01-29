const cssContent = `.house-type-button {
  position: relative;
  cursor: pointer;
  width: 105px;
  height: 108px;
  background: #f0f2f5;
  border: 0.5px solid #33353b;
  border-radius: 10px;
  margin-left: 18px;
  color: #33353b;
}

.house-type-button:hover {
  background: #DEE0E6;
}

.house-type-button .content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 10px 0 14px;
  max-width: 100%;
  overflow: hidden;
}

.house-type-button .content .content-text {
  font-size: 16px;
  font-weight: bold;
  flex: auto;
  overflow: hidden;
}

.house-type-button .content .content-text .content-text-smart {
  width: 100%;
}

.house-type-button .house-type-tip {
  margin-top: 6px;
  margin-left: 14px;
  color: #60646F;
}

.house-type-button .house-type-icon {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 50px;
}

.house-type-button .house-type-img {
  position: absolute;
  right: 0.5px;
  bottom: 0.5px;
  width: 75px;
  height: 60px;
  border-radius: 10px;
}

.house-type-button .house-type-new {
  display: inline-block;
  margin-top: 8px;
  margin-left: 8px;
  padding: 1px 4px;
  background: #EB5D46;
  border-radius: 9px 3px 9px 9px;
  font-family: AlibabaPuHuiTi-Bold !important;
  font-size: 12px;
  color: #fff;
}

.house-type-button .house-type-dot {
  position: absolute;
  top: 10px;
  right: 8px;
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: red;
}`;

export default cssContent;