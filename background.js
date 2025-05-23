const OPENAI_API_KEY = 'sk-REPLACE_THIS_WITH_YOUR_API_KEY'; // 🔒 Never expose in production

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'chat') {
    const userMessage = request.message;

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    })
      .then(res => res.json())
      .then(data => {
        const reply = data.choices?.[0]?.message?.content || "No reply from OpenAI";
        sendResponse({ reply });
      })
      .catch(err => {
        console.error("OpenAI API Error:", err);
        sendResponse({ reply: "Error calling OpenAI API" });
      });

    return true; // Keeps `sendResponse` alive
  }
});
