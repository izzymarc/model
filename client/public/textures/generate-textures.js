// This file is for documenting how to create textures programmatically
// You can run this in a browser console to generate data URLs for textures

/**
 * Generates a dark metal texture with noise and scratches
 * @returns {string} Data URL for the generated texture
 */
function generateDarkMetalTexture() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set size - power of 2 is better for textures
  canvas.width = 256;
  canvas.height = 256;
  
  // Fill background with dark color
  ctx.fillStyle = '#121416';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add noise
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    // Random noise value
    const noise = Math.random() * 15;
    
    // Add noise to RGB channels
    data[i] = Math.min(255, data[i] + noise); // R
    data[i + 1] = Math.min(255, data[i + 1] + noise); // G
    data[i + 2] = Math.min(255, data[i + 2] + noise); // B
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  // Add scratches
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 0.5;
  
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    const x1 = Math.random() * canvas.width;
    const y1 = Math.random() * canvas.height;
    const x2 = Math.random() * canvas.width;
    const y2 = Math.random() * canvas.height;
    
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  
  // Add some metallic highlights
  ctx.fillStyle = 'rgba(200, 200, 210, 0.03)';
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 20 + 5;
    
    ctx.beginPath();
    ctx.ellipse(x, y, size, size / 2, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  
  return canvas.toDataURL('image/png');
}

/**
 * Generates a grid pattern texture
 * @returns {string} Data URL for the generated texture
 */
function generateGridTexture() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set size
  canvas.width = 256;
  canvas.height = 256;
  
  // Fill with transparent background
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  
  // Major grid lines
  const gridSize = 32;
  for (let x = 0; x <= canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  
  for (let y = 0; y <= canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  
  // Minor grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 0.5;
  
  const minorGridSize = gridSize / 4;
  for (let x = 0; x <= canvas.width; x += minorGridSize) {
    if (x % gridSize !== 0) { // Skip major grid lines
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
  }
  
  for (let y = 0; y <= canvas.height; y += minorGridSize) {
    if (y % gridSize !== 0) { // Skip major grid lines
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }
  
  // Add dots at intersections
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  for (let x = 0; x <= canvas.width; x += gridSize) {
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  return canvas.toDataURL('image/png');
}

// Usage example:
// 1. Run this script in browser console
// 2. const darkMetalUrl = generateDarkMetalTexture();
// 3. const gridUrl = generateGridTexture();
// 4. console.log(darkMetalUrl); // Copy this URL to use in CSS or save as file
// 5. console.log(gridUrl); // Copy this URL to use in CSS or save as file

// To save programmatically:
// const link = document.createElement('a');
// link.download = 'dark-metal.png';
// link.href = darkMetalUrl;
// link.click(); 