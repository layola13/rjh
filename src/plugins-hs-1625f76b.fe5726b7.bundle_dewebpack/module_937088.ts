const styles = `
.image-panel-root {
  position: fixed;
}

.image-panel-root .image-panel {
  position: relative;
  background-color: white;
  box-shadow: 0px 4px 20px 0px rgba(86, 95, 121, 0.2);
  border-radius: 10px;
  width: -moz-min-content;
  width: min-content;
}

.image-panel-root .image-panel .image-panel-header {
  position: relative;
  padding-top: 12px;
  padding-left: 12px;
  padding-right: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #1C1C1C;
  width: 100%;
  box-sizing: border-box;
}

.image-panel-root .image-panel .image-panel-header .image-panel-title {
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  overflow: hidden;
}

.image-panel-root .image-panel .image-panel-header .image-panel-button {
  display: flex;
  align-items: center;
  padding: 6px 10px 6px 10px;
  border-radius: 12px;
  cursor: pointer;
}

.image-panel-root .image-panel .image-panel-header .image-panel-button:hover {
  background-color: #F5F5F5;
}

.image-panel-root .image-panel .image-panel-header .image-panel-button .image-panel-button-text {
  margin-left: 2px;
}

.image-panel-root .image-panel .image-panel-content {
  position: relative;
  padding: 8px;
}

.image-panel-root .image-panel .image-panel-content .image-panel-canvas-container {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 7px;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image-panel-small-mode-root {
  position: relative;
  left: 0;
  top: 0;
  height: 400px;
}

.image-panel-small-mode-root .image-panel {
  position: relative;
  background-color: white;
}

.image-panel-small-mode-root .image-panel .image-panel-large-mode-button {
  position: absolute;
  z-index: 1;
  right: 30px;
  top: 50px;
}

.image-panel-small-mode-root .image-panel .image-panel-canvas-container {
  position: relative;
  width: 260px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
}

.image-panel .image-panel-pick-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
`;

export default styles;