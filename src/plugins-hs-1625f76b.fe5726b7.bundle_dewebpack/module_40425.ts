const cssContent = `.float-toggle-button-container {
  position: absolute;
  z-index: 110;
  display: inline-flex;
  justify-content: flex-end;
  right: 0;
  animation: showAnimation 1s forwards;
  -moz-animation: showAnimation 1s forwards;
  -webkit-animation: showAnimation 1s forwards;
  -o-animation: showAnimation 1s forwards;
}

@keyframes showAnimation {
  from {
    bottom: 0px;
  }
  to {
    bottom: 33px;
  }
}

.float-toggle-button-container * {
  box-sizing: border-box;
}

.float-toggle-button-container .float-toggle-button {
  --circle-size: 40px;
  --single-button-width: 116px;
  display: flex;
  position: relative;
  cursor: pointer;
  width: 40px;
  height: var(--circle-size);
  flex-direction: row;
  box-shadow: 0px 2px 4px 0px rgba(25, 25, 50, 0.3);
  border-radius: calc(var(--circle-size) / 2);
  transition: box-shadow 100ms 700ms, right 100ms 700ms;
  right: 18px;
}

.float-toggle-button-container .float-toggle-button .float-button-container {
  overflow: hidden;
  height: 40px;
  align-items: center;
  background-color: #fff;
  border-radius: 25px;
  justify-content: center;
  transition: width 500ms 200ms, margin 500ms 200ms, box-shadow 100ms 700ms;
}

.float-toggle-button-container .float-toggle-button .float-button-container.one-btn-container {
  background: transparent;
}

.float-toggle-button-container .float-toggle-button .float-button-container .float-circle-image-container {
  background: #fff;
  transition: opacity 100ms 700ms;
  background-color: #fff;
  width: var(--circle-size);
  height: var(--circle-size);
  border-radius: calc(var(--circle-size));
  display: flex;
  justify-content: center;
  align-items: center;
}

.float-toggle-button-container .float-toggle-button .float-button-container .float-circle-image-container .float-circle-image {
  width: 18px;
  height: 18px;
  position: relative;
  transform: translateX(1px);
}

.float-toggle-button-container .float-toggle-button .float-button-container .float-group-buttons {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: var(--circle-size);
  flex-direction: row;
  width: 280px;
  top: -100%;
}

.float-toggle-button-container .float-toggle-button .float-button-container .float-group-buttons .float-group-button {
  width: var(--single-button-width);
  height: 30px;
  background: rgba(244, 244, 244, 0.8);
  display: flex;
  border-radius: 25px;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: left 700ms;
}

.float-toggle-button-container .float-toggle-button .float-button-container .float-group-buttons .float-group-button .float-group-button-image {
  display: inline-block;
  position: relative;
  margin-right: 5px;
  opacity: 0;
  transition: opacity 200ms;
}

.float-toggle-button-container .float-toggle-button .float-button-container .float-group-buttons .float-group-button .float-group-button-label {
  color: #19191e;
  font-family: PingFangSC-Regular !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 300ms;
  font-weight: bold;
  margin-left: 4px;
}

.float-toggle-button-container .float-toggle-button .float-button-container .float-group-buttons .float-group-button.float-group-button0 {
  left: calc(var(--circle-size));
}

.float-toggle-button-container .float-toggle-button .float-button-container .float-group-buttons .float-group-button.float-group-button1 {
  border-left: 0px;
  left: calc(var(--circle-size) + var(--single-button-width) + 15px);
}

.float-toggle-button-container .float-toggle-button .float-button-container .float-group-buttons .float-group-button.float-group-button-hover {
  background: #396efe;
}

.float-toggle-button-container .float-toggle-button .float-button-container .float-group-buttons .float-group-button.float-group-button-hover .float-group-button-label {
  color: #ffffff;
}

.float-toggle-button-container .float-toggle-button .float-button-container .float-group-buttons .float-group-button.float-group-button-hover.float-group-button1 {
  border-left: 0px;
}

.float-toggle-button-container .float-toggle-button:hover {
  transition: box-shadow 100ms 200ms;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  right: 0;
}

.float-toggle-button-container .float-toggle-button:hover .float-button-container {
  background-color: #fff;
  transition: width 500ms 200ms, margin 500ms 200ms;
  margin-left: -240px;
}

.float-toggle-button-container .float-toggle-button:hover .float-button-container .float-circle-image-container {
  transition: opacity 100ms 200ms;
  opacity: 0;
}

.float-toggle-button-container .float-toggle-button:hover .float-button-container .float-group-buttons .float-group-button {
  transition: left 500ms 300ms;
}

.float-toggle-button-container .float-toggle-button:hover .float-button-container .float-group-buttons .float-group-button .float-group-button-image {
  opacity: 1;
  transition: opacity 200ms 500ms;
}

.float-toggle-button-container .float-toggle-button:hover .float-button-container .float-group-buttons .float-group-button .float-group-button-label {
  opacity: 1;
  transition: opacity 200ms 500ms;
}

.float-toggle-button-container .float-toggle-button:hover .float-button-container .float-group-buttons .float-group-button.float-group-button0 {
  left: 18px;
}

.float-toggle-button-container .float-toggle-button:hover .float-button-container .float-group-buttons .float-group-button.float-group-button1 {
  left: calc(18px + var(--single-button-width) + 12px);
}

.float-toggle-button-container .float-toggle-button:hover .float-button-container.one-btn-container {
  background: transparent;
}

.float-toggle-button-container .float-toggle-button:hover .float-button-container.one-btn-container .float-group-buttons .float-group-button.float-group-button0 {
  left: calc(18px + var(--single-button-width) + 12px);
}`;

export default cssContent;