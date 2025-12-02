# LinkedIn Theme Restorer Extension 🌗

> Automatically restores your preferred LinkedIn theme (dark/light/system) by recreating the `li_theme` cookie on startup.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🧐 Why this exists
If you configure your browser to **delete cookies on exit** or use **Session-Only** browsing, LinkedIn forgets your Dark Mode preference every time you restart your browser. You are greeted with a blinding white screen until you manually change the setting.

This extension solves that by automatically injecting the specific `li_theme` cookie immediately upon browser startup.

## 🚀 Features
* **Privacy Focused:** Only touches the `li_theme` cookie. Does not read your session or password.
* **Lightweight:** Zero analytics, zero tracking code.
* **Cross-Browser:** Supports Chrome (MV3), Edge, and Firefox.
* **Configurable:** Choose between Dark, Light, or System Default in the extension settings.

## 🛠️ Development (Source Code)
* **Chrome:** Load the folder directly. The browser reads `manifest.json`.
* **Firefox:** You must temporarily rename `manifest-firefox.json` to `manifest.json` to test locally.

## 📦 Installation (Developer Mode)

Since this is a niche privacy tool, you can install it manually without waiting for Store approval:

### Chrome / Edge
1.  Download or Clone this repository.
2.  Open `chrome://extensions/` or `edge://extensions/`.
3.  Enable **Developer mode** (top right toggle).
4.  Click **Load unpacked**.
5.  Select the folder containing this repository.

### Firefox
1.  Open `about:debugging#/runtime/this-firefox`.
2.  Click **Load Temporary Add-on...**.
3.  Delete `manifest.json`.
4.  Rename `manifest-firefox.json` to `manifest.json`.
5.  Select the `manifest.json` file from this repository.

## 📦 Installation (For Users)
Go to the **[Releases]** page to download the ready-to-use version for your browser:
* **Chrome/Edge:** Download `chrome-extension.zip`
* **Firefox:** Download `firefox-extension.zip`

## 🛡️ Privacy Policy
This extension does **not** collect, store, or transmit any user data.
It simply checks your local storage preference and sets a specific cookie (`li_theme`) on `linkedin.com`.

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License
[MIT](LICENSE)