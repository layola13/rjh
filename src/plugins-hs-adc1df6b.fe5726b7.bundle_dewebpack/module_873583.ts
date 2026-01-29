const styles = `.price-bar-container {
  display: flex;
  align-items: center;
  background: #e0e0e0c2;
  border-radius: 4px;
  padding: 0 6px;
}

.price-bar-container .change-currency {
  position: relative;
  font-size: 12px;
}

.price-bar-container .change-currency .current-currency {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 6px;
}

.price-bar-container .change-currency .current-currency .currency-label {
  margin-right: 4px;
}

.price-bar-container .change-currency .currency-list {
  position: absolute;
  top: 100%;
  left: 0;
  background: #e0e0e0c2;
  border-radius: 4px;
  padding: 6px;
  margin-left: -6px;
}

.price-bar-container .change-currency .currency-list .option {
  height: 20px;
  line-height: 20px;
  cursor: pointer;
}

.price-bar-container .change-currency .currency-list .option.current-currency {
  color: #396EFE;
}

.price-bar-container .price-bar {
  max-width: 114px;
  min-width: 58px;
  height: 30px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #1C1C1C;
  cursor: pointer;
}

.price-bar-container .price-bar .price-container {
  margin-right: 2px;
}

.price-bar-container .price-bar .dollar {
  font-size: 12px;
}

.price-bar-container .price-bar .num-container {
  margin: 0 1px;
  font-size: 16px;
}

.price-bar-container .price-bar .num-container .small {
  font-size: 12px;
}

.price-bar-container .price-bar .loading-img {
  width: 16px;
  height: 16px;
}

.price-bar-container .price-bar .loading-img img {
  width: inherit;
  height: inherit;
}

.price-bar-tip-icon {
  display: inline-block;
  position: relative;
  bottom: -2px;
}`;

export default styles;