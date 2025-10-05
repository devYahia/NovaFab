import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import logger from "@/lib/logger";

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let userId: string | undefined;
  
  try {
    // Log request start
    logger.info("File upload request started", "UPLOAD");
    
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "novafab";
    userId = formData.get("userId") as string || undefined;

    logger.debug("Upload request details", "UPLOAD", { 
      fileName: file?.name, 
      fileSize: file?.size, 
      folder,
      userId 
    });

    if (!file) {
      logger.warn("Upload failed: No file provided", "UPLOAD", null, userId);
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      logger.warn("Upload failed: File size too large", "UPLOAD", { 
        fileName: file.name, 
        fileSize: file.size, 
        maxSize 
      }, userId);
      return NextResponse.json(
        { error: "File size too large. Maximum size is 10MB." },
        { status: 400 },
      );
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "model/stl",
      "application/octet-stream", // For STL files
    ];

    if (!allowedTypes.includes(file.type)) {
      logger.warn("Upload failed: Invalid file type", "UPLOAD", { 
        fileName: file.name, 
        fileType: file.type, 
        allowedTypes 
      }, userId);
      return NextResponse.json(
        {
          error:
            "Invalid file type. Allowed types: JPEG, PNG, GIF, WebP, PDF, STL",
        },
        { status: 400 },
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), "public", "uploads", folder);
    if (!existsSync(uploadDir)) {
      logger.debug("Creating upload directory", "UPLOAD", { uploadDir }, userId);
      await mkdir(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const fileName = `${timestamp}.${fileExtension}`;
    const filePath = join(uploadDir, fileName);

    logger.debug("Saving file", "UPLOAD", { 
      originalName: file.name, 
      fileName, 
      filePath 
    }, userId);

    // Convert file to buffer and save
    await writeFile(filePath, buffer);

    const duration = Date.now() - startTime;
    const fileUrl = `/uploads/${folder}/${fileName}`;
    
    // Log successful upload
    logger.upload(file.name, file.size, true, userId);
    logger.api("POST", "/api/upload", 200, duration, userId);

    // Return success response with file URL
    return NextResponse.json({
      message: "File uploaded successfully",
      url: fileUrl,
      public_id: fileName,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Upload failed with error", "UPLOAD", error, userId);
    logger.api("POST", "/api/upload", 500, duration, userId);
    
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const startTime = Date.now();
  let userId: string | undefined;
  
  try {
    logger.info("File delete request started", "UPLOAD");
    
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get("public_id");
    userId = searchParams.get("userId") || undefined;

    logger.debug("Delete request details", "UPLOAD", { publicId, userId });

    if (!publicId) {
      logger.warn("Delete failed: public_id is required", "UPLOAD", null, userId);
      return NextResponse.json(
        { error: "public_id is required" },
        { status: 400 },
      );
    }

    // Extract folder and filename from public_id
    const pathParts = publicId.split("/");
    const folder = pathParts.length > 1 ? pathParts[0] : "novafab";
    const fileName = pathParts.length > 1 ? pathParts[1] : pathParts[0];

    const filePath = join(process.cwd(), "public", "uploads", folder, fileName);

    logger.debug("Attempting to delete file", "UPLOAD", { filePath }, userId);

    // Check if file exists
    if (!existsSync(filePath)) {
      logger.warn("Delete failed: File not found", "UPLOAD", { filePath }, userId);
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Delete the file
    const fs = require("fs").promises;
    await fs.unlink(filePath);

    const duration = Date.now() - startTime;
    logger.info("File deleted successfully", "UPLOAD", { fileName, filePath }, userId);
    logger.api("DELETE", "/api/upload", 200, duration, userId);

    return NextResponse.json({ message: "File deleted successfully" });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Delete failed with error", "UPLOAD", error, userId);
    logger.api("DELETE", "/api/upload", 500, duration, userId);
    
    console.error("Delete API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}