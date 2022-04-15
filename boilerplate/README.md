# ReactJS Kindle WAF Template

Building applications for Kindle has never been that easy. Now with ReactJS, you can build simple applications faster and easier.

**NOTICE: Kindle firmware 5.12 and up is required**

# Get started

Assume that you've already familiar with ReactJS.

0. Make sure you have NodeJS installed on your machine. Version >= 14 is recommended.
1. Copy this boilerplate to your workspace
2. Open `package.json` and replace `name`, `waf_application_name`
3. Run `npm i` to install all dependencies
4. Run `npm run build` to build the KUAL package
5. Copy `build/your.app.id` to kindle `extensions/your.app.id`
6. Open KUAL. Click on your app name.

# Limitations

Due to limitation from kindle's webkit engine, many features are not available:
- "Modern" web features: WebSocket, WebRTC,...
- "Modern" CSS features: flexbox, calc,...
- `window.prompt` (In fact, this is a TODO. The Experimental Web Browser actually handle `alert` and `prompt` by generating HTML content, then use `kindle.chrome.createDialog` to display them on screen)
- `kindle.filesystem`: used by system's `htmlviewer` package, but seems to be removed due to security reason

# Debugging

A production WAF will read HTML/JS/CSS files directly on your Kindle. However, imagine each time you want to change something, you will need to build, then copy the app to your Kindle.

This module allows connecting Kindle to ReactJS dev server running on a computer. Requirement: both Kindle and the computer are on the same network.

1. Open `extensions/your.app.id/waf`
2. Rename `index.html` => `index.html.bk`
3. Open `index_debug.html`, replace the IP `192.168.1.100` to you computer's local IP address
4. Rename `index_debug.html` => `index.html`
5. On computer, make sure dev server is up (or `npm start`)
6. Launch the app from KUAL

# Author

This project is made by [ngxson](https://ngxson.com)
