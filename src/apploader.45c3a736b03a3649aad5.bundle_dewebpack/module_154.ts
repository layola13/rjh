const cssContent = `#login-root-dom {
    background-size: cover;
}
#login-root-dom .global-bg-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 11000;
}
#login-root-dom .global-bg-mask .user-msg {
    opacity: 0.6;
    font-size: 14px;
    color: #fff;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 40px;
    left: 40px;
    display: flex;
    align-items: center;
}
#login-root-dom .global-bg-mask .user-msg img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.5);
}
#login-root-dom .global-bg-mask .decorate-img {
    width: 50%;
    position: absolute;
    top: 0;
    left: 0;
}
#login-root-dom .global-bg-mask .decorate-img img {
    width: 100%;
}
#login-root-dom .global-bg-mask .right {
    width: 50%;
    height: 100vh;
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
}
#login-root-dom #global-bg-image {
    width: 100vw;
    height: 100vh;
    background-size: cover;
}
#login-root-dom #global-iframe-popup {
    width: 340px;
    min-height: 570px;
    border-width: 0px;
    display: block;
    position: absolute;
    overflow: hidden;
    box-shadow: 0 30px 50px 0 rgba(0, 0, 0, 0.3);
    border-radius: 16px;
    backdrop-filter: blur(10px);
}
@media only screen and (max-width: 720px) {
    #login-root-dom .global-bg-mask .right {
        width: 100%;
    }
}`;

export default cssContent;