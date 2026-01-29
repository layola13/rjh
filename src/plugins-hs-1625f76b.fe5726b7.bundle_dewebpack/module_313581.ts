const styles = `.carousel-panel-nav {
  display: inline-flex;
}

.carousel-panel-nav-container {
  width: 550px;
  height: 90px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.carousel-panel-nav-item {
  margin-right: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-panel-nav-item-img {
  width: 85px;
  height: 48px;
  background-repeat: no-repeat;
  background-size: 86px 49px;
  border-radius: 6px;
  border: 2px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-panel-nav-item-img:hover {
  cursor: pointer;
  border: 2px solid #396efe;
}

.carousel-panel-nav-item-label {
  margin-top: 8px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #33353b;
  text-align: center;
}

.carousel-panel-nav-item--active .carousel-panel-nav-item-img {
  border: 2px solid #396efe;
}`;

export default styles;