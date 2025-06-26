document.getElementById('send-btn').addEventListener('click', async () => {
    const inputEl = document.getElementById('user-input');
    const text = inputEl.value.trim();
    if (!text) return;
  
    appendMessage('You', text);
    inputEl.value = '';
  
    try {
      const reply = await callOpenAI(text);
      appendMessage('AI', reply);
    } catch (err) {
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
    let llmUrlInput;
    let llmApiKeyInput;
    chrome.storage.local.get('llmUrlInput', (result) => {
      llmUrlInput = result.llmUrlInput;
      if (!llmUrlInput) {
        return reject('LLM URL is not configured in extension options.');
      }
      console.log("Url: ", llmUrlInput);
    });
    
    chrome.storage.local.get('llmApiKeyInput', (result) => {
      llmApiKeyInput = result.llmApiKeyInput;
      if(!llmApiKeyInput) {
        return reject('LLM API Key is not configured in extension options.');
      } 
      console.log("ApiKey: ", llmApiKeyInput);
    });
  
    const url = "https://api.openai.com/v1/chat/completions";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${llmApiKeyInput}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // or "gpt-3.5-turbo"
        messages: [{ role: "user", content: prompt }]
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
  

document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;
  
    appendMessage('You', text);
    input.value = '';
  
    // Show loading
    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'message ai loading';
    loadingMsg.innerText = 'AI is typing...';
    document.getElementById('messages').appendChild(loadingMsg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer YOUR_API_KEY`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: text }]
        })
      });
  
      const data = await response.json();
      const aiMessage = data.choices[0].message.content;
  
      loadingMsg.remove(); // Remove loading message
      appendMessage('AI', aiMessage);
    } catch (err) {
      loadingMsg.remove();
      appendMessage('AI', '⚠️ Error fetching response.');
    }
  });
  
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('ai-chat-sidebar');
    if (sidebar && !sidebar.querySelector('.close-btn')) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = toggleSidebar;
        sidebar.appendChild(closeBtn);
    }
    // ...existing toggle button code...
});
  
  