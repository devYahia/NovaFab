import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Local storage configuration
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Ensure upload directory exists
function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

// Get file extension from buffer or filename
function getFileExtension(file: Buffer | string, originalName?: string): string {
  if (typeof file === "string" && file.includes(".")) {
    return path.extname(file);
  }
  
  if (originalName) {
    return path.extname(originalName);
  }
  
  // Default to .jpg for unknown types
  return ".jpg";
}

// Upload file to local storage (replaces Cloudinary upload)
export async function uploadToCloudinary(
  file: Buffer | string,
  options: {
    folder?: string;
    public_id?: string;
    resource_type?: "image" | "video" | "raw" | "auto";
    transformation?: Record<string, unknown>[];
    originalName?: string;
  } = {}
) {
  try {
    ensureUploadDir();
    
    let fileBuffer: Buffer;
    let fileName: string;
    let fileExtension: string;
    
    if (Buffer.isBuffer(file)) {
      fileBuffer = file;
      fileExtension = getFileExtension(file, options.originalName);
      fileName = options.public_id 
        ? `${options.public_id}${fileExtension}`
        : `${uuidv4()}${fileExtension}`;
    } else if (typeof file === "string") {
      // Handle base64 data URLs
      if (file.startsWith("data:")) {
        const matches = file.match(/^data:([^;]+);base64,(.+)$/);
        if (!matches) {
          throw new Error("Invalid data URL format");
        }
        
        const mimeType = matches[1];
        const base64Data = matches[2];
        fileBuffer = Buffer.from(base64Data, "base64");
        
        // Get extension from MIME type
        const extensionMap: Record<string, string> = {
          "image/jpeg": ".jpg",
          "image/png": ".png",
          "image/gif": ".gif",
          "image/webp": ".webp",
          "image/svg+xml": ".svg",
        };
        
        fileExtension = extensionMap[mimeType] || ".jpg";
        fileName = options.public_id 
          ? `${options.public_id}${fileExtension}`
          : `${uuidv4()}${fileExtension}`;
      } else {
        // Handle file path
        fileBuffer = fs.readFileSync(file);
        fileExtension = path.extname(file);
        fileName = options.public_id 
          ? `${options.public_id}${fileExtension}`
          : `${uuidv4()}${fileExtension}`;
      }
    } else {
      throw new Error("Invalid file format");
    }
    
    // Create folder structure if specified
    const folderPath = options.folder 
      ? path.join(UPLOAD_DIR, options.folder)
      : UPLOAD_DIR;
    
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    
    const filePath = path.join(folderPath, fileName);
    
    // Write file to disk
    fs.writeFileSync(filePath, fileBuffer);
    
    // Generate public URL
    const relativePath = path.relative(path.join(process.cwd(), "public"), filePath);
    const publicUrl = `${BASE_URL}/${relativePath.replace(/\\/g, "/")}`;
    
    // Generate public_id (path without extension, relative to uploads)
    const relativeToUploads = path.relative(UPLOAD_DIR, filePath);
    const publicId = options.folder 
      ? `${options.folder}/${path.parse(fileName).name}`
      : path.parse(fileName).name;
    
    // Get file stats for metadata
    const stats = fs.statSync(filePath);
    
    return {
      success: true,
      url: publicUrl,
      public_id: publicId,
      width: undefined, // Would need image processing library to get dimensions
      height: undefined,
      format: fileExtension.slice(1), // Remove the dot
      bytes: stats.size,
    };
  } catch (error) {
    console.error("Local storage upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

// Delete file from local storage (replaces Cloudinary destroy)
export async function deleteFromCloudinary(publicId: string) {
  try {
    const filePath = findFilePath(publicId);
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return { success: true };
    }
    return { success: false, error: "File not found" };
  } catch (error) {
    console.error("Local storage delete error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Delete failed",
    };
  }
}

// Find file path by public_id
function findFilePath(publicId: string): string | null {
  const searchInDir = (dir: string): string | null => {
    if (!fs.existsSync(dir)) return null;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        const found = searchInDir(fullPath);
        if (found) return found;
      } else {
        const nameWithoutExt = path.parse(file.name).name;
        const relativePath = path.relative(UPLOAD_DIR, fullPath);
        const relativeId = path.parse(relativePath).dir 
          ? `${path.parse(relativePath).dir}/${nameWithoutExt}`.replace(/\\/g, "/")
          : nameWithoutExt;
        
        if (relativeId === publicId) {
          return fullPath;
        }
      }
    }
    
    return null;
  };
  
  return searchInDir(UPLOAD_DIR);
}

// Get file URL by public_id (replaces Cloudinary URL generation)
export function getCloudinaryUrl(publicId: string): string {
  const findFileUrl = (dir: string, targetId: string): string | null => {
    if (!fs.existsSync(dir)) return null;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        const found = findFileUrl(fullPath, targetId);
        if (found) return found;
      } else {
        const nameWithoutExt = path.parse(file.name).name;
        const relativePath = path.relative(UPLOAD_DIR, fullPath);
        const relativeId = path.parse(relativePath).dir 
          ? `${path.parse(relativePath).dir}/${nameWithoutExt}`.replace(/\\/g, "/")
          : nameWithoutExt;
        
        if (relativeId === targetId) {
          const urlPath = path.relative(path.join(process.cwd(), "public"), fullPath).replace(/\\/g, "/");
          return `${BASE_URL}/${urlPath}`;
        }
      }
    }
    
    return null;
  };
  
  const url = findFileUrl(UPLOAD_DIR, publicId);
  return url || `${BASE_URL}/uploads/`;
}

// Default export for compatibility
export default {
  uploader: {
    upload: uploadToCloudinary,
    destroy: deleteFromCloudinary,
  },
  url: getCloudinaryUrl,
};