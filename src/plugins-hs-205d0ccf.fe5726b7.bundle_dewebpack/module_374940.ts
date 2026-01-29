const cssContent = `.teaching-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  z-index: 1;
  cursor: default;
}

.teaching-main .view-wrapper {
  position: absolute;
  right: 0;
  width: 100%;
  top: 0;
  bottom: 0;
}

.teaching-main .hidden-view-wrapper {
  display: none;
  right: 100%;
}

.teaching-main.teaching-light {
  background-image: url("light-background.png");
  color: #60646f;
  background-color: #fff;
}

.teaching-main.teaching-black {
  background-image: url("dark-background.png");
  color: #cccccd;
  background-color: #2b2c2e;
}`;

export default cssContent;