import { 
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage';
import { storage } from './config';

export const uploadFile = async (file: File, path: string) => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFile = async (path: string) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

export const listFiles = async (path: string) => {
  try {
    const listRef = ref(storage, path);
    const res = await listAll(listRef);
    const files = await Promise.all(
      res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          name: itemRef.name,
          url,
          path: itemRef.fullPath
        };
      })
    );
    return files;
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};

export const uploadImage = async (file: File, path: string) => {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    // Create a unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `${timestamp}.${extension}`;
    const fullPath = `${path}/${filename}`;

    // Upload the file
    const downloadURL = await uploadFile(file, fullPath);

    return {
      url: downloadURL,
      path: fullPath,
      filename,
      type: file.type
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}; 