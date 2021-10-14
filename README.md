# Empornium - Torrent Description Template Helper

## Installation
You need to have a UserScript extension (e.g. Tampermonkey for Chrome, Greasemonkey for Firefox) installed to run this script.

[Install this UserScript](https://github.com/LenAnderson/Empornium-Torrent-Description-Template-Helper/raw/master/Empornium-Torrent-Description-Template-Helper.user.js)


## How to use
You can use the following placeholders in your torrent description:

| placeholder in description | replacement | input |
|---|---|---|
| `${someName:text}` | unaltered text | single-line textbox |
| `${someName:textarea}` | unaltered text | multi-line textbox / textarea |
| `${someName:image}` | BBCode image: `[img]entered text[/img]` | single-line textbox for the image URL |
| `${someName:image[]}` | one line with `[img]entered text[/img]` for each URL | multi-line textbox for the image URLs (one URL per line) |