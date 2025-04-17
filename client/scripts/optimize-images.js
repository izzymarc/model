const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const glob = require('glob');

// Configuration
const SOURCE_DIR = path.resolve(__dirname, '../../public/images');
const OUTPUT_DIR = path.resolve(__dirname, '../../public/images/optimized');
const QUALITY = 80; // WebP quality (0-100)
const MAX_WIDTH = 1200; // Maximum width for images

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Create subdirectories if they don't exist
const subdirs = ['instagram', 'portfolio', 'fallback'];
subdirs.forEach(dir => {
  const dirPath = path.join(OUTPUT_DIR, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Process all images
async function processImages() {
  console.log('Starting image optimization...');
  
  // Find all image files
  const imageFiles = glob.sync(`${SOURCE_DIR}/**/*.{jpg,jpeg,png}`);
  
  console.log(`Found ${imageFiles.length} images to process`);
  
  for (const file of imageFiles) {
    const relativePath = path.relative(SOURCE_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, relativePath.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    
    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    try {
      // Process image with sharp
      await sharp(file)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outputPath);
      
      console.log(`✓ Optimized: ${relativePath} -> ${path.relative(SOURCE_DIR, outputPath)}`);
    } catch (error) {
      console.error(`✗ Error processing ${relativePath}:`, error.message);
    }
  }
  
  console.log('Image optimization complete!');
}

// Run the script
processImages().catch(console.error); 