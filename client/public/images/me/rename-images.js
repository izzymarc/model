// Script to rename images in the me folder to more appropriate names
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory using ES modules approach
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the folder path
const meFolder = __dirname;

// Define the new image names and their purposes
const imageMap = [
  { oldName: 'photo_2025-04-16 18.06.19.jpg', newName: 'portrait-main.jpg', purpose: 'Main profile portrait' },
  { oldName: 'photo_2025-04-16 18.06.30.jpg', newName: 'fashion-editorial-1.jpg', purpose: 'Fashion editorial shot' },
  { oldName: 'photo_2025-04-16 18.06.39.jpg', newName: 'runway-1.jpg', purpose: 'Runway modeling shot' },
  { oldName: 'photo_2025-04-16 18.06.45.jpg', newName: 'commercial-1.jpg', purpose: 'Commercial modeling' },
  { oldName: 'photo_2025-04-16 18.06.50.jpg', newName: 'portrait-casual.jpg', purpose: 'Casual portrait' },
  { oldName: 'photo_2025-04-16 18.06.56.jpg', newName: 'beauty-1.jpg', purpose: 'Beauty closeup' },
  { oldName: 'photo_2025-04-16 18.07.01.jpg', newName: 'fashion-editorial-2.jpg', purpose: 'Fashion editorial shot' },
  { oldName: 'photo_2025-04-16 18.07.06.jpg', newName: 'portrait-profile.jpg', purpose: 'Profile picture' },
  { oldName: 'photo_2025-04-17 00.49.52.jpg', newName: 'commercial-2.jpg', purpose: 'Commercial modeling' },
  { oldName: 'photo_2025-04-17 00.49.56.jpg', newName: 'runway-2.jpg', purpose: 'Runway modeling shot' },
  { oldName: 'photo_2025-04-17 00.50.01.jpg', newName: 'fashion-editorial-3.jpg', purpose: 'Fashion editorial shot' },
  { oldName: 'photo_2025-04-17 00.50.05.jpg', newName: 'beauty-2.jpg', purpose: 'Beauty closeup' },
  { oldName: 'photo_2025-04-17 00.50.09.jpg', newName: 'portrait-headshot.jpg', purpose: 'Professional headshot' },
  { oldName: 'photo_2025-04-17 00.50.17.jpg', newName: 'fashion-editorial-4.jpg', purpose: 'Fashion editorial shot' },
  { oldName: 'photo_2025-04-17 00.50.22.jpg', newName: 'commercial-3.jpg', purpose: 'Commercial modeling' }
];

// Function to rename the files
async function renameFiles() {
  console.log('Starting image renaming process...');
  
  for (const image of imageMap) {
    const oldPath = path.join(meFolder, image.oldName);
    const newPath = path.join(meFolder, image.newName);
    
    try {
      // Check if the old file exists
      if (fs.existsSync(oldPath)) {
        // Rename the file
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${image.oldName} → ${image.newName} (${image.purpose})`);
      } else {
        console.error(`Error: File not found - ${image.oldName}`);
      }
    } catch (error) {
      console.error(`Error renaming ${image.oldName}:`, error);
    }
  }
  
  console.log('Image renaming completed.');
}

// Execute the renaming function
renameFiles();

// Rename script for new images
const fs = require('fs');
const path = require('path');

// Path to the images directory
const imagesDir = path.resolve(__dirname);

// Map of timestamped image filenames to new names
const renameMap = {
  'photo_2025-04-21 13.29.39.jpg': 'editorial-red-top.jpg',
  'photo_2025-04-21 13.29.43.jpg': 'editorial-black-dress.jpg',
  'photo_2025-04-21 13.29.47.jpg': 'beauty-black-top.jpg',
  'photo_2025-04-21 13.29.51.jpg': 'beauty-natural.jpg',
  'photo_2025-04-21 13.29.55.jpg': 'commercial-pattern-dress.jpg',
  'photo_2025-04-21 13.29.59.jpg': 'commercial-casual.jpg',
  'photo_2025-04-21 13.30.02.jpg': 'commercial-blue-pattern.jpg',
  'photo_2025-04-21 13.30.06.jpg': 'beauty-headshot.jpg',
  'photo_2025-04-21 13.30.10.jpg': 'beauty-natural-portrait.jpg',
  'photo_2025-04-21 13.30.15.jpg': 'beauty-closeup.jpg',
  'photo_2025-04-21 13.30.18.jpg': 'beauty-profile.jpg',
  'photo_2025-04-21 13.28.56.jpg': 'editorial-casual.jpg',
  'photo_2025-04-21 13.29.03.jpg': 'editorial-evening.jpg',
  'photo_2025-04-21 13.29.10.jpg': 'beauty-minimal.jpg',
  'photo_2025-04-21 13.29.14.jpg': 'commercial-casual-2.jpg',
  'photo_2025-04-21 13.29.18.jpg': 'commercial-pattern-2.jpg',
  'photo_2025-04-21 13.29.31.jpg': 'runway-evening.jpg',
  'photo_2025-04-21 13.29.34.jpg': 'portrait-elegant.jpg'
};

// Function to rename files
function renameFiles() {
  console.log('Starting image renaming process...');

  Object.entries(renameMap).forEach(([oldName, newName]) => {
    const oldPath = path.join(imagesDir, oldName);
    const newPath = path.join(imagesDir, newName);

    // Check if old file exists
    if (fs.existsSync(oldPath)) {
      // Rename the file
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${oldName} -> ${newName}`);
    } else {
      console.log(`Warning: ${oldName} not found in directory`);
    }
  });

  console.log('Image renaming completed!');
}

// Execute the renaming process
renameFiles(); 