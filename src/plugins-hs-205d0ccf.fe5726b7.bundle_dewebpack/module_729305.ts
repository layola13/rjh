const styles = `
.home-page-wrapper {
  margin-bottom: 6px;
}

.home-page-top-left {
  height: 40px;
  width: 165px;
  position: relative;
  overflow: hidden;
}

.home-page-top-left .teaching-homepage-top-title {
  font-family: AlibabaPuHuiTi-Bold !important;
  font-size: 18px;
  transform: skew(-12deg);
  margin-top: 11px;
  margin-left: 8px;
}

.home-page-top-left .teaching-homepage-top-title.teaching-light {
  color: #33353b;
}

.home-page-top-left .teaching-homepage-top-title.teaching-black {
  color: #fff;
}

.home-page-top-left .top-select {
  transition: all 0.3s linear;
  position: absolute;
  top: 4px;
}

.home-page-top-left .top-select-hidden {
  top: 40px;
}

.select-container {
  margin-left: 18px;
  margin-top: 16px;
  margin-bottom: 14px;
  width: 154px;
  height: 32px;
  transition: all 0.3s linear;
  overflow: hidden;
}

.select-container.select-container-hidden {
  height: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.period-wrapper {
  max-height: 300px;
  overflow: hidden;
}

.period-wrapper.hidden-period-wrapper {
  max-height: 0;
}

.global-en .select-container {
  width: calc(100% - 36px);
}
`;

export default styles;