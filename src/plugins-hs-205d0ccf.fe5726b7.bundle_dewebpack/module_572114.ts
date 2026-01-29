const styles = `.round-icon {
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  cursor: pointer;
  transition: all 0.3s linear;
  border-radius: 15px;
  height: 30px;
}
.round-icon .icon {
  overflow: visible;
}
.round-icon .text {
  font-size: 16px;
  margin-left: 2px;
  font-family: AlibabaPuHuiTi-Bold !important;
}
.round-icon.teaching-light {
  color: #000000;
}
.round-icon.teaching-light .text {
  color: #33353b;
}
.round-icon.teaching-light:hover {
  background-color: rgba(111, 129, 175, 0.1);
}
.round-icon.teaching-black {
  color: #fff;
}
.round-icon.teaching-black .text {
  color: #fff;
}
.round-icon.teaching-black:hover {
  background-color: rgba(255, 255, 255, 0.1);
}`;

export default styles;