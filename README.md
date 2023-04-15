# fftext

> Convert images to colorized ANSI or IRC halfblocks

## Requirements

- Node.js
- Chromium-based browser
  - Chromium
  - Chrome
  - Brave
  - Edge
  - Vivaldi

## 0.1.0

- [ ] Save & Save As
- [x] Paste image
- [x] Dragdrop image
- [ ] Crop, Reset Crop
- [ ] Show dimensions somewhere
- [ ] `chokidar` watch on input file, preference option
- [ ] Block all webRequests (just in case)
- [ ] Format numbers on controls
- [ ] Catch all Ctrl+R
- [ ] Preference to set width on import
- [ ] Pipeline control
- [ ] Error boundary
- [ ] Linux Lite build
  - [x] transform core/package.json/main `src/core.ts` -> `lib/core.js`
  - [x] transform host/package.json/dependencies/@fftext/core `workspace:*` -> `file:../core`
  - [x] install script
    - [x] package check/install
    - [x] Create application entry
      - [x] run bash explicitly so profile is loaded
      - [ ] Ask if user wants to make application entry
  - [ ] make `dev` `install` `uninstall` commands
- [ ] About
- [ ] Website

## 0.2.0

- [ ] Windows Lite build

## 0.3.0

- [ ] Electron builds

## Backlog

- MacOS Lite build?
