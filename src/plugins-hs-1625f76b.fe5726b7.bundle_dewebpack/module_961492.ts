const styles = `
.img-box {
  position: relative;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  transition: transform 1s ease;
}

.img-box img {
  -webkit-user-drag: none;
  position: absolute;
  max-width: none;
  left: 0;
}

.anchor-point {
  position: absolute;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin-top: -5px;
  margin-left: -5px;
  background-color: #fff;
  border: 2px solid #000;
  cursor: pointer;
}

.img-mask {
  position: absolute;
  background-color: #000;
  opacity: 0.4;
  cursor: crosshair;
}

.clip-box {
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  cursor: move;
}

.img-view {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.handle {
  position: absolute;
  background-color: #fff;
  display: flex;
  align-items: center;
}

.handle-top {
  width: 22px;
  height: 4px;
  left: calc(50% - 11px);
  top: -2px;
  cursor: n-resize;
}

.handle-bottom {
  width: 22px;
  height: 4px;
  left: calc(50% - 11px);
  top: calc(100% - 2px);
  cursor: s-resize;
}

.handle-left {
  width: 4px;
  height: 22px;
  left: -2px;
  top: calc(50% - 11px);
  cursor: w-resize;
}

.handle-right {
  width: 4px;
  height: 22px;
  left: calc(100% - 2px);
  top: calc(50% - 11px);
  cursor: e-resize;
}

.handle-area {
  width: 15px;
  height: 15px;
}

.handle-lefttop {
  width: 10px;
  height: 4px;
  top: -2px;
  left: -1px;
  cursor: nw-resize;
}

.handle-lefttop::after {
  content: '';
  background-color: #fff;
  position: absolute;
  width: 4px;
  height: 10px;
  top: 0px;
  pointer-events: none;
}

.handle-leftbottom {
  width: 10px;
  height: 4px;
  left: -1px;
  top: calc(100% - 2px);
  cursor: sw-resize;
}

.handle-leftbottom::after {
  content: '';
  background-color: #fff;
  position: absolute;
  width: 4px;
  height: 10px;
  top: -6px;
  pointer-events: none;
}

.handle-righttop {
  width: 10px;
  height: 4px;
  left: calc(100% - 9px);
  top: -2px;
  cursor: ne-resize;
}

.handle-righttop::after {
  content: '';
  background-color: #fff;
  position: absolute;
  width: 4px;
  height: 10px;
  left: 6px;
  top: 0px;
  pointer-events: none;
}

.handle-rightbottom {
  width: 10px;
  height: 4px;
  top: calc(100% - 2px);
  left: calc(100% - 9px);
  cursor: se-resize;
}

.handle-rightbottom::after {
  content: '';
  background-color: #fff;
  position: absolute;
  width: 4px;
  height: 10px;
  top: -6px;
  left: 6px;
  pointer-events: none;
}

.animation {
  transition: all 0.2s ease;
}
`;

export default styles;