import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FALLBACK_IMAGES = {
  fashion: {
    text: 'Fashion',
    color: '#FF6B6B',
    width: 800,
    height: 1000
  },
  portrait: {
    text: 'Portrait',
    color: '#4ECDC4',
    width: 800,
    height: 1000
  },
  instagram: {
    text: 'Instagram',
    color: '#FFD166',
    width: 800,
    height: 800
  },
  default: {
    text: 'Image',
    color: '#6A0572',
    width: 800,
    height: 600
  }
};

const generateImage = (config, outputPath) => {
  const canvas = createCanvas(config.width, config.height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = config.color;
  ctx.fillRect(0, 0, config.width, config.height);

  // Add text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(config.text, config.width / 2, config.height / 2);

  // Save to file
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(outputPath, buffer);
};

const main = () => {
  const fallbackDir = path.join(__dirname, '../client/public/images/fallback');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(fallbackDir)) {
    fs.mkdirSync(fallbackDir, { recursive: true });
  }

  // Generate images
  Object.entries(FALLBACK_IMAGES).forEach(([name, config]) => {
    const outputPath = path.join(fallbackDir, `${name}.jpg`);
    generateImage(config, outputPath);
    console.log(`Generated ${name}.jpg`);
  });
};

main(); 