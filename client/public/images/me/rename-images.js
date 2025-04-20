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