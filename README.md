# LocalLLMChat Extension

LocalLLMChat is a Chrome extension that displays a collapsible chat sidebar on any page. Messages
are sent to a language model through a URL you configure.

## Features

- Manifest V3 extension named **"Sidebar Chat"** with a service worker background script
  configured in `manifest.json`【F:manifest.json†L1-L15】.
- Options page (`options.html`) lets you store the LLM endpoint and API key using
  `chrome.storage.local`【F:options.html†L7-L15】【F:options.js†L1-L18】.
- A toggle button created in `content.js` shows or hides the sidebar iframe
  that loads `chat.html`【F:content.js†L8-L83】.
- `chat.js` sends your message to the configured LLM and displays responses in the sidebar.
  It requires both a URL and API key to be saved in options【F:chat.js†L46-L71】.

## Installation

1. Clone this repository.
2. Open `chrome://extensions` in Chrome and enable **Developer mode**.
3. Click **Load unpacked** and select this project directory.
4. Open the extension options and enter your LLM URL and API key.

## Usage

Visit any webpage and click the extension's button to open the chat sidebar. Type your message
and press **Send**; the sidebar displays your conversation history and keeps the newest
200 messages【F:chat.js†L25-L38】.

## Chat Window - Active
<img width="956" alt="sidebar-chat-img-1" src="https://github.com/user-attachments/assets/a9e47a26-2dc9-466a-80e7-1fc91ea8cd31" />

## Chat Window - Collapsed
<img width="959" alt="side-bar-chat-collapsed-img-1" src="https://github.com/user-attachments/assets/17239ccb-57f9-4d6f-9830-6699e547ff5d" />

## Development

The project consists of HTML, CSS, and JavaScript files only; there is no build step. Update the
files directly and reload the extension in Chrome after making changes.

