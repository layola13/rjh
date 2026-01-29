const styles = `@keyframes hoverAnimation {
  100% {
    transform: scale(1.01);
    border-bottom: none;
    box-shadow: 0px 4px 16px 0px rgba(25, 25, 50, 0.24);
  }
}
.catalog-image-button {
  position: relative;
  width: 62px;
  overflow: visible;
  font-size: 12px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  cursor: pointer;
}
.catalog-image-button-disable {
  filter: opacity(40%);
  pointer-events: none;
}
.catalog-image-button-disable .iconfont-area {
  cursor: not-allowed;
}
.catalog-image-button-disable .hsc-iconfont-view {
  cursor: not-allowed;
}
.catalog-image-button img {
  margin-top: 12px;
  width: 50px;
  height: 50px;
}
.catalog-image-button .text-description {
  margin-top: 4px;
  line-height: 12px;
  align-self: center;
  text-align: center;
  color: #60646f;
}
.catalog-image-button .text-description-shortcut {
  margin-top: 5px;
  color: #60646f;
  line-height: 12px;
}
.catalog-image-button.hover {
  background-color: #f5f5f5;
  border-radius: 4px;
}
.catalog-image-button .catalog-image-button-beta-icon {
  position: absolute;
  top: 0px;
  right: 5px;
}
.catalog-image-button .catalog-image-new-icon {
  position: absolute;
  top: 0px;
  right: 5px;
  width: 30px;
  height: 12px;
}
.catalog-image-button .catalog-image-new-icon img {
  margin-top: 5px;
  width: 30px;
  height: 12px;
}`;

export default styles;