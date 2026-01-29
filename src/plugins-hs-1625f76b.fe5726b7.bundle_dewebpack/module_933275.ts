const cssContent = `.ai-result-page .category-items {
  display: grid;
  grid-template-columns: 50% 50%;
  flex-wrap: wrap;
  margin: 20px 24px;
}

.ai-result-page .category-items .category-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  color: #33353B;
  cursor: pointer;
}

.ai-result-page .category-items .category-item:nth-child(2n) {
  margin-right: 0;
}

.ai-result-page .category-items .category-item .category-image {
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin-bottom: 10px;
}

.ai-result-page .category-items .category-item .data {
  position: absolute;
  top: 54px;
  border-radius: 4px;
  font-size: 12px;
  font-family: AlibabaPuHuiTi-Regular;
  line-height: 14px;
  background: #414141;
  color: white;
}

.ai-result-page .category-items .category-item .data .number {
  scale: 0.83;
}

.ai-result-page .category-items .category-item .data.refill {
  background: #A2EAF5;
  color: black;
}

.ai-result-page .category-items .category-item .text {
  text-align: center;
}`;

export default cssContent;