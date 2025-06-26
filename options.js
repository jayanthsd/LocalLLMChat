document.getElementById('saveButton').addEventListener('click', () => {
  const llmUrlInput = document.getElementById('llmUrlInput').value;
  const llmApiKeyInput = document.getElementById('llmApiKey').value;
  chrome.storage.local.set({ llmUrlInput,llmApiKeyInput }, () => {
    document.getElementById('status').textContent = 'API Key and URL saved.';
  });
});


