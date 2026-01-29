const cssContent = `.valid-area-container {
  min-width: 136px;
}
.valid-area-container .valid-area-body {
  display: flex;
  height: 28px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background-color: #DEE6F9;
  border: 1px solid rgba(196, 212, 229, 0.31);
  padding-left: 8px;
  padding-right: 8px;
  cursor: pointer;
}
.valid-area-container .valid-area-body.disabled-Arrow {
  cursor: not-allowed;
}
.valid-area-container .valid-area-body.body-calculate-success {
  background-color: #C8D7FF;
  padding-right: 0px;
  border-right: 0px;
}
.valid-area-container .valid-area-body .valid-area-title {
  width: auto;
  max-width: 73px;
  color: #1C1C1C;
}
.valid-area-container .valid-area-body .valid-area-suffix .floorplan-disable {
  display: flex;
  pointer-events: none;
  margin-left: 3px;
}
.valid-area-container .valid-area-body .valid-area-suffix .floorplan-disable .suffix-disable {
  color: #9B9FAB;
  margin-left: 10px;
}
.valid-area-container .valid-area-body .valid-area-suffix .suffix-normal {
  margin-left: 22px;
  color: #396EFE;
  font-family: AlibabaPuHuiTi-Bold !important;
}
.valid-area-container .valid-area-body .valid-area-suffix .suffix-retry {
  margin-left: 10px;
  color: #396EFE;
  font-family: AlibabaPuHuiTi-Bold !important;
}
.valid-area-container .valid-area-body .valid-area-suffix .loading-img {
  width: 16px;
  height: 16px;
  margin-left: 26px;
}
.valid-area-container .valid-area-body .valid-area-suffix .loading-img img {
  width: inherit;
  height: inherit;
}
.valid-area-container .valid-area-body .valid-area-suffix .calculate-success {
  display: flex;
  align-items: center;
}
.valid-area-container .valid-area-body .valid-area-suffix .calculate-success .calculate-area {
  margin-left: 3px;
  font-family: AlibabaPuHuiTi-Bold !important;
  font-size: 14px;
  color: #1C1C1C;
  font-weight: bold;
  padding-bottom: 3px;
}
.valid-area-container .valid-area-body .valid-area-suffix .calculate-success .calculate-unit {
  font-family: AlibabaPuHuiTi-Bold !important;
  font-size: 12px;
  color: #1C1C1C;
  margin-right: 3px;
}
.valid-area-container .valid-area-body .valid-area-suffix .calculate-success .calculate-retry {
  width: 30px;
  height: 30px;
  background-color: #DEE6F9;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0% 8px 8px 0%;
  margin-left: 5px;
}`;

export default cssContent;