<div align="center">

<img src="https://raw.githubusercontent.com/K3lvin4SY/Steam-Inventory-History-Filter-Extension/f450b5e99695a358713265bb35a4ccb522fb33df/History%20Utility%20Filter%20Logo.svg" alt="CS:GO History Utility Filter" width="110" />

# CS:GO History Utility Filter

**Automate, filter, search, and analyze your Steam inventory history — all in one extension.**

<br/>

![Version](https://img.shields.io/badge/version-1.7.3-blue?style=for-the-badge)
![Manifest](https://img.shields.io/badge/Manifest-v3-4A90D9?style=for-the-badge&logo=googlechrome&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Install-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/csgo-history-utility-filt/deikmkamfnmgcpdncpekplbihdnhgncd?pli=1)

</div>

---

## Overview

Browsing your Steam inventory history is tedious by default — endless "load more" clicks, no filtering, and no way to make sense of your data over time. **CS:GO History Utility Filter** fixes that entirely.

Install the extension, navigate to your Steam inventory history page, and immediately gain access to automated loading, powerful multi-parameter filtering, a built-in search engine, and rich visual statistics — all without leaving the page.

---

## Features

| Feature | Description |
|---|---|
| **Auto-Load History** | Automatically fetches your entire inventory history in one go. A loading indicator keeps you informed throughout the process |
| **Multi-Parameter Filtering** | Filter rows by event type, item name, quality, type, collection, rarity, exterior, and weapon class — simultaneously |
| **Saved Filter Profiles** | Save and reload your frequently used filter configurations with a single click |
| **Simple Search Bar** | Instantly search across all loaded history rows by keyword |
| **Detailed Statistics** | See counts for cases, capsules, packages, knives, covert items, classified items, and more |
| **Interactive Charts** | Bar and line charts with zoom and pan support — visualize drops and openings by type over time |
| **Excel Export** | Export your filtered history data directly to `.xlsx` format |

---

## How It Works

The extension injects into Steam's inventory history page and enhances it with a full UI layer:

### Filtering Engine

Each history row is annotated with data attributes at load time. When a filter is applied, rows are evaluated against all active filter parameters simultaneously — a row must satisfy **every** active condition to remain visible. Supported filter axes:

| Parameter | Examples |
|---|---|
| **Event type** | Case drop, case opening, trade, market purchase |
| **Item name** | Specific item text search |
| **Quality** | StatTrak™, Souvenir, normal |
| **Item type** | Case, capsule, sticker, graffiti |
| **Collection** | Operation Bravo, Chroma, Prisma |
| **Rarity** | Covert, Classified, Restricted, Mil-Spec |
| **Exterior** | Factory New, Minimal Wear, Field-Tested, etc. |
| **Weapon class** | AK-47, AWP, M4A4, knife, etc. |

### Statistics & Charts

Once history is fully loaded, the stats panel aggregates and visualizes your data using Chart.js with zoom/pan support. Breakdowns include:

- Total cases, capsules, and packages opened
- Knife, covert, and classified item counts
- Drop and opening frequency graphs by type

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **JavaScript** | Core extension logic and DOM manipulation |
| **jQuery** | Event handling and DOM traversal |
| **Chart.js** | Statistics charts and graphs |
| **chartjs-plugin-zoom** | Zoom and pan interaction on charts |
| **SheetJS (xlsx)** | Excel export of filtered history data |
| **Chrome Extension Manifest v3** | Extension runtime and permissions model |

---

## Project Structure

```
Steam-Inventory-History-Filter-Extension/
├── manifest.json               # Extension manifest (v3)
├── content.js                  # Core filtering engine and DOM annotation
├── load.js                     # History auto-loader and pagination handler
├── components/
│   ├── filterWindow.html       # Main filter UI panel
│   └── popup.html              # Extension popup
├── css/
│   ├── filterStyle.css
│   ├── advancedOptionsDialog.css
│   ├── filterHandlerDialog.css
│   ├── filterOptionsDialog.css
│   ├── generalDialog.css
│   ├── simpleSearchBar.css
│   ├── statsDialog.css
│   └── settings.css
└── js/
    ├── buttonLinker.js          # UI button wiring
    ├── contentLoader.js         # DOM content helpers
    ├── dialog.js                # Dialog component logic
    ├── filterStorage.js         # Filter profile save/load (chrome.storage)
    ├── statsGraphsNDiagrams.js  # Stats aggregation and chart rendering
    └── background/
        ├── globalsV.js          # Shared global variables
        ├── hover.js             # Hover interaction handlers
        ├── jQuery.min.js
        ├── Chart.min.js
        ├── chartjs-plugin-zoom.min.js
        └── xlsx.full.min.js
```

---

## Installation

### From the Chrome Web Store

The easiest way to get started — no build step required:

[![Install on Chrome](https://img.shields.io/badge/Install%20on%20Chrome-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/csgo-history-utility-filt/deikmkamfnmgcpdncpekplbihdnhgncd?pli=1)

### Manual Installation (Developer Mode)

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked** and select the repository folder
5. Navigate to your [Steam Inventory History](https://steamcommunity.com/id/me/inventoryhistory/) page — the extension activates automatically

---

## Usage

1. Go to your **Steam Inventory History** page
2. The extension will begin **auto-loading** all history entries automatically
3. Once loading completes, open the **filter panel** to apply any combination of filters
4. Use the **search bar** for quick keyword lookups
5. Open the **stats panel** to view charts and aggregate data
6. Optionally **export** your filtered results to Excel via the export button
