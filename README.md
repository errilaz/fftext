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

- [ ] FEAT: Crop, Reset Crop
- [ ] FEAT: Show dimensions somewhere
- [ ] FEAT: `chokidar` watch on input file, preference option
- [ ] FEAT: Preference to set width on import
- [ ] FEAT: Pipeline control

- [ ] SEC: Block all webRequests (just in case)
- [ ] BUG: Format numbers on controls
- [ ] BUG: Catch Ctrl+R and other browser shortcuts when focused on inputs
- [ ] BUG: new windows screw up old windows (use a window ID for cache files)
- [ ] BUG: Error boundary

- [ ] Linux Lite build
  - [x] transform core/package.json/main `src/core.ts` -> `lib/core.js`
  - [x] transform host/package.json/dependencies/@fftext/core `workspace:*` -> `file:../core`
  - [x] install script
    - [x] package check/install
    - [x] Create application entry
      - [x] run bash explicitly so profile is loaded
      - [ ] Ask if user wants to make application entry

- [ ] About
- [ ] Website

## 0.2.0

- [ ] Windows Lite build

## 0.3.0

- [ ] Electron builds?
- [ ] MacOS Lite build?
