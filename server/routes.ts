import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

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

  const httpServer = createServer(app);
  return httpServer;
}
