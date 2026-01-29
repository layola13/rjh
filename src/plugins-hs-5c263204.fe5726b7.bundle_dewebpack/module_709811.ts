const styles = `
.feedback-statistics-wrapper {
  display: flex;
  margin: 0 40px;
  box-sizing: border-box;
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 50px 0 rgba(124, 128, 139, 0.11);
}

.feedback-statistics-wrapper .feedback-statistics {
  width: 100%;
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback-statistics-wrapper .feedback-statistics .feedback-statistic {
  width: 100%;
}

.feedback-statistics-wrapper .feedback-statistics .feedback-statistic .feedback-statistic-title {
  font-family: PingFangSC !important;
  font-weight: 300;
  font-size: 12px;
  color: #33353B;
  text-align: center;
}

.feedback-statistics-wrapper .feedback-statistics .feedback-statistic .feedback-statistic-count {
  text-align: center;
  font-family: 'AlibabaPuHuiTi-Bold' !important;
  font-size: 30px;
  color: #1C1C1C;
  line-height: 27px;
}

.feedback-statistics-wrapper .feedback-statistics .ant-divider {
  background: #EAECF1;
}

.feedback-statistics-wrapper.feedback-black {
  background: rgba(255, 255, 255, 0.1);
}

.feedback-statistics-wrapper.feedback-black .feedback-statistics .feedback-statistic .feedback-statistic-title {
  color: rgba(255, 255, 255, 0.86);
}

.feedback-statistics-wrapper.feedback-black .feedback-statistics .feedback-statistic .feedback-statistic-count {
  color: #F7F7F7;
}

.feedback-statistics-wrapper.feedback-black .feedback-statistics .ant-divider {
  background: #47484b;
}
`;

export default styles;