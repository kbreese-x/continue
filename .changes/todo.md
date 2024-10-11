## Changes to be Made

## Extension Manifest
1. Customize for XiFin
   - [package.json](/extensions/vscode/src/commands.ts)

### SRC
1. Change default config to Sagemaker setup
   - [default.ts](/core/config/default.ts)
2. Add sagemaker reranker
   - [index.ts](/core/context/rerankers/index.ts)

### GUI
1. Create dedicated settings GUI instead of modifying config.json manually
   - [settings.tsx](/gui/src/pages/settings.tsx)
2. Ensure proper tutorial card behavior when loading for the first time
3. (Maybe): Customize the `More` page to show the tutorial, reroute links, remove unecessary
   - [More.tsx](/gui/src/pages/More/More.tsx)
5. (Maybe): Change model select dropdown to show inference settings ui (temp, max tokens slider, penalties, etc)

### Click on Extension in Status Bar
1. Add GUI for autocomplete options when clicking extension in status bar
2. Reroute where feedback goes
   - [VSCode Extension Commands](/extensions/vscode/src/commands.ts)
   - [GUI Webview Hooks](/gui/src/hooks/useNavigationListener.tsx)
   - [Settings Configuration Page](/gui/src/pages/settings.tsx)

### Docs
1. Customize for XiFin
2. Self host

### General
1. Remove all unused providers, pages, views, and functionality
2. Feedback form created [here](https://forms.office.com/r/BEHVNtUETS)
  - [commands.ts](\extensions\vscode\src\commands.ts)
  - [More.tsx](\gui\src\pages\More\More.tsx)