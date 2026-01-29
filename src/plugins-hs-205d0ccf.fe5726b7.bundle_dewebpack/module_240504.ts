const cssContent = `.article-page {
  background-image: url("${require('./assets/light-bg.png')}");
  background-repeat: no-repeat;
  background-size: 100% auto;
  position: relative;
}

.article-page .article-iframe-wrapper {
  width: 100%;
  height: 100%;
}

.article-page .article-iframe-wrapper .article-iframe {
  width: 100%;
  height: 100%;
  padding-left: 18px;
  padding-top: 18px;
}

.article-page .article-iframe-header-cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 60px;
  padding: 0 24px;
  font-family: PingFangSC-Semibold !important;
  font-size: 18px;
  color: #333333;
  line-height: 24px;
}

.article-page.teaching-light {
  background-color: #fff;
  background-image: url("${require('./assets/light-bg.png')}");
}

.article-page.teaching-light .article-iframe-wrapper {
  background-color: #fff;
}

.article-page.teaching-light .article-iframe-header-cover {
  background-color: #fff;
}

.article-page.teaching-black {
  background-color: #2b2c2e;
  background-image: url("${require('./assets/dark-bg.png')}");
}

.article-page.teaching-black .article-iframe-wrapper {
  background-color: #fff;
}

.article-page.teaching-black .article-iframe-header-cover {
  background-color: #2b2c2e;
}`;

export default cssContent;