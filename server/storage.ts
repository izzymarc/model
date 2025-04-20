import { users, type User, type InsertUser } from "@shared/schema";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Media file interfaces
export interface MediaFile {
  id: string;
  name: string;
  originalName: string;
  path: string;
  url: string;
  size: number;
  dimensions?: string;
  type: string;
  category: string;
  uploadDate: string;
  isVideo: boolean;
}

export interface MediaFileInput {
  originalName: string;
  buffer: Buffer;
  size: number;
  mimetype: string;
  category: string;
  isVideo?: boolean;
}

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Media file methods
  getAllMedia(): Promise<MediaFile[]>;
  getMediaByCategory(category: string): Promise<MediaFile[]>;
  saveMediaFile(file: MediaFileInput): Promise<MediaFile>;
  deleteMediaFile(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private mediaFiles: Map<string, MediaFile>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.mediaFiles = new Map();
    this.currentId = 1;
    
    // Create necessary directories if they don't exist
    this.ensureDirectoriesExist();
  }
  
  private ensureDirectoriesExist() {
    const baseDir = path.join(process.cwd(), 'public');
    const dirs = [
      'images',
      'images/portfolio',
      'images/blog',
      'images/instagram',
      'images/press',
      'images/about',
      'images/hero',
      'images/gallery',
      'videos'
    ];
    
    for (const dir of dirs) {
      const fullPath = path.join(baseDir, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Media file methods
  async getAllMedia(): Promise<MediaFile[]> {
    return Array.from(this.mediaFiles.values());
  }
  
  async getMediaByCategory(category: string): Promise<MediaFile[]> {
    return Array.from(this.mediaFiles.values())
      .filter(file => file.category === category);
  }
  
  async saveMediaFile(fileInput: MediaFileInput): Promise<MediaFile> {
    const id = uuidv4();
    const fileName = this.generateFileName(fileInput.originalName, fileInput.isVideo);
    const category = fileInput.category;
    
    // Determine file path
    let relativePath = fileInput.isVideo 
      ? `/videos/${fileName}`
      : `/images/${category}/${fileName}`;
    
    // Full filesystem path
    const fullPath = path.join(process.cwd(), 'public', relativePath);
    
    // Write file to disk
    fs.writeFileSync(fullPath, fileInput.buffer);
    
    // Create media file record
    const mediaFile: MediaFile = {
      id,
      name: fileName,
      originalName: fileInput.originalName,
      path: relativePath,
      url: relativePath,
      size: fileInput.size,
      type: fileInput.mimetype,
      category,
      uploadDate: new Date().toISOString().split('T')[0],
      isVideo: fileInput.isVideo || false
    };
    
    // Store in memory
    this.mediaFiles.set(id, mediaFile);
    
    return mediaFile;
  }
  
  async deleteMediaFile(id: string): Promise<boolean> {
    const mediaFile = this.mediaFiles.get(id);
    if (!mediaFile) return false;
    
    // Full filesystem path
    const fullPath = path.join(process.cwd(), 'public', mediaFile.path);
    
    // Delete the file
    try {
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
      
      // Remove from memory store
      this.mediaFiles.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  private generateFileName(originalName: string, isVideo = false): string {
    // Generate a unique name for the file
    const timestamp = Date.now();
    const ext = path.extname(originalName);
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9]/g, '-');
    
    return `${baseName}-${timestamp}${ext}`;
  }
}

export const storage = new MemStorage();
