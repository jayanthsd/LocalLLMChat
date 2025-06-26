document.getElementById('send-btn').addEventListener('click', async () => {
  const inputEl = document.getElementById('user-input');
  const text = inputEl.value.trim();
  if (!text) return;

  appendMessage('You', text);
  inputEl.value = '';

  const loadingMsg = document.createElement('div');
  loadingMsg.className = 'message ai loading';
  loadingMsg.innerText = 'AI is typing...';
  document.getElementById('messages').appendChild(loadingMsg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  try {
    const reply = await callOpenAI(text);
    loadingMsg.remove();
    appendMessage('AI', reply);
  } catch (err) {
    loadingMsg.remove();
    appendMessage('AI', 'Error: ' + err.message);
  }
});
  
  function appendMessage(sender, message) {
    const messagesContainer = document.getElementById('messages');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'You' ? 'user' : 'ai');
  
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    msgDiv.innerHTML = `<strong>${sender}:</strong><br>${message}<div style="font-size: 11px; text-align: right; color: #666; margin-top: 4px;">${timestamp}</div>`;
  
    messagesContainer.appendChild(msgDiv);
  
    // 🔁 Keep only the last 200 messages
    while (messagesContainer.children.length > 200) {
      messagesContainer.removeChild(messagesContainer.firstChild);
    }
  
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  
  
  
async function callOpenAI(prompt) {
  const { llmUrlInput, llmApiKeyInput } = await new Promise((resolve) => {
    chrome.storage.local.get(['llmUrlInput', 'llmApiKeyInput'], resolve);
  });

  if (!llmUrlInput) {
    throw new Error('LLM URL is not configured in extension options.');
  }
  if (!llmApiKeyInput) {
    throw new Error('LLM API Key is not configured in extension options.');
  }

  const res = await fetch(llmUrlInput, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${llmApiKeyInput}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || 'No response';
}

  
const messagesContainer = document.getElementById('messages');
const scrollBtn = document.getElementById('scroll-btn');

// Show button when not at bottom
messagesContainer.addEventListener('scroll', () => {
  const atBottom = messagesContainer.scrollHeight - messagesContainer.scrollTop <= messagesContainer.clientHeight + 50;
  scrollBtn.style.display = atBottom ? 'none' : 'block';
});

scrollBtn.addEventListener('click', () => {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
  
  