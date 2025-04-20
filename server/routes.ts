import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import multer from "multer";
import path from "path";

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
});

// Define the type for a request with multer file
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(2, { message: "Subject is required." }),
  projectType: z.string().optional(),
  date: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to our terms and conditions." }),
  }),
});

const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      // In a real app, here you would:
      // 1. Save the contact form data to the database
      // 2. Send an email notification
      // For now, we'll just simulate success

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      res.status(200).json({ 
        success: true, 
        message: "Contact form submitted successfully" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while processing your request" 
        });
      }
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = newsletterSchema.parse(req.body);
      
      // In a real app, here you would:
      // 1. Save the email to a newsletter subscribers list
      // 2. Send a confirmation email
      // For now, we'll just simulate success

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      res.status(200).json({ 
        success: true, 
        message: "Subscribed to newsletter successfully" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while processing your request" 
        });
      }
    }
  });

  // Media Endpoints
  // Get all media files
  app.get("/api/media", async (_req: Request, res: Response) => {
    try {
      const mediaFiles = await storage.getAllMedia();
      res.status(200).json({ 
        success: true, 
        data: mediaFiles 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve media files" 
      });
    }
  });

  // Get media files by category
  app.get("/api/media/:category", async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const mediaFiles = await storage.getMediaByCategory(category);
      res.status(200).json({ 
        success: true, 
        data: mediaFiles 
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve media files" 
      });
    }
  });

  // Upload media file
  app.post("/api/media/upload", upload.single("file"), async (req: MulterRequest, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          success: false, 
          message: "No file uploaded" 
        });
      }

      const { buffer, originalname, mimetype, size } = req.file;
      const category = req.body.category || "gallery";
      const isVideo = mimetype.startsWith("video/");

      const mediaFile = await storage.saveMediaFile({
        buffer,
        originalName: originalname,
        mimetype,
        size,
        category,
        isVideo
      });

      // Get dimensions for images (if possible)
      // In a real implementation, you'd use a library like sharp to get image dimensions

      res.status(201).json({ 
        success: true, 
        data: mediaFile 
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to upload file" 
      });
    }
  });

  // Delete media file
  app.delete("/api/media/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteMediaFile(id);
      
      if (deleted) {
        res.status(200).json({ 
          success: true, 
          message: "File deleted successfully" 
        });
      } else {
        res.status(404).json({ 
          success: false, 
          message: "File not found" 
        });
      }
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete file" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
