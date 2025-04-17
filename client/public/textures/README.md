# Industrial UI Textures

This directory contains textures used in the industrial UI design for the portfolio website.

## Included Textures

1. **dark-metal.png** - A dark metal texture with noise and scratches used as a background texture
2. **grid.png** - A technical grid overlay pattern used for technical UI elements

## Generating Textures

The `generate-textures.js` file contains JavaScript functions that can be run in a browser console to programmatically generate these textures. This is especially useful if you want to create custom variations of the textures.

Instructions for generating textures:

1. Open your browser's developer console
2. Copy and paste the functions from `generate-textures.js`
3. Run the generator functions (e.g., `generateDarkMetalTexture()` or `generateGridTexture()`)
4. Use the returned data URL directly in your CSS or save it as a file

Example for saving a generated texture:

```js
const darkMetalUrl = generateDarkMetalTexture();
const link = document.createElement('a');
link.download = 'dark-metal.png';
link.href = darkMetalUrl;
link.click();
```

## Usage in CSS

These textures are used in the CSS as background images. For example:

```css
.metal-background {
  background-image: url('/textures/dark-metal.png');
  background-repeat: repeat;
}

.grid-overlay {
  background-image: url('/textures/grid.png');
  background-repeat: repeat;
  opacity: 0.3;
  mix-blend-mode: overlay;
}
``` 