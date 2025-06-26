(async function () {
  //const SIDEBAR_ID = 'my-extension-sidebar';
  const SIDEBAR_ID = 'ai-chat-sidebar'
  const WRAPPER_ID = 'my-extension-page-wrapper';
  const SIDEBAR_WIDTH = 300;

  if (document.getElementById(SIDEBAR_ID)) return;

    const iframe = document.createElement('iframe');
    iframe.src = chrome.runtime.getURL('chat.html');
    iframe.id = 'ai-chat-sidebar-iframe';
    iframe.className = 'collapsed'; // default state
    document.body.appendChild(iframe);

     // Create wrapper for the page content
  const wrapper = document.createElement('div');
  wrapper.id = WRAPPER_ID;
  wrapper.style.cssText = `
    // margin-right: ${SIDEBAR_WIDTH}px;
    transition: margin-right 0.2s ease;
  `;

  // Move all existing body children into the wrapper (except sidebar)
  const bodyChildren = Array.from(document.body.children).filter(
    el => el.id !== SIDEBAR_ID
  );

  for (const el of bodyChildren) {
    wrapper.appendChild(el);
  }

  document.body.appendChild(wrapper);

   const observer = new ResizeObserver(() => {
    const width = iframe.getBoundingClientRect().width;
    wrapper.style.marginRight = `${width}px`;
  });

  observer.observe(iframe);

  // Create the toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'sidebar-toggle-btn';
  toggleBtn.innerHTML = '>';
  toggleBtn.style.cssText = `
    position: fixed;
    top: 50%;
    right: 300px; /* match sidebar width */
    z-index: 10000; /* higher than iframe */
    width: 32px;
    height: 60px;
    border-radius: 18px 0 0 18px;
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 22px;
    transform: translateY(-50%);
  `;
  document.body.appendChild(toggleBtn);

  // Toggle sidebar open/close
  toggleBtn.addEventListener('click', () => {
    const iframe = document.getElementById('ai-chat-sidebar-iframe');
    if (iframe.classList.contains('open')) {
      iframe.classList.remove('open');
      toggleBtn.style.right = '0px';
      toggleBtn.innerHTML = '>';
    } else {
      iframe.classList.add('open');
      toggleBtn.style.right = '300px';
      toggleBtn.innerHTML = '<';
    }
  });
})();
  