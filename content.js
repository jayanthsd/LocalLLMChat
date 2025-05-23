(async function () {
    const iframe = document.createElement('iframe');
    iframe.src = chrome.runtime.getURL('chat.html');
    iframe.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      width: 300px;
      height: 100%;
      z-index: 9999;
      border: none;
      box-shadow: -2px 0 5px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(iframe);
  })();
  