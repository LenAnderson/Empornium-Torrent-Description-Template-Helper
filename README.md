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


### Example

Template:

```
[b]${title:text}[/b]

[center]${cover:image}[/center]

${description:textarea}

[hr]

${largeScreenshots:image[]}

[screens]
${screenshots:image}
```

Result:

```
[b]My Torrent[/b]

[center][img]coverImage.jpg[/img][/center]

This is my description.

More text here.

[hr]

[img]largeScreen1.jpg[/img]
[img]largeScreen2.jpg[/img]
[img]largeScreen3.jpg[/img]

[screens]
[img]coverSheet.jpg[/img]
```